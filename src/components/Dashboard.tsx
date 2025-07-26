import React, { useState } from 'react';
import { Grid, List } from 'lucide-react';
import { Button } from './ui/button';
import { WelcomeHeader } from './dashboard/WelcomeHeader';
import { ScenarioCard } from './dashboard/ScenarioCard';
import { ProgressSummary } from './dashboard/ProgressSummary';
import { FeedbackPreview } from './dashboard/FeedbackPreview';
import { VoiceCalibration } from './dashboard/VoiceCalibration';
import { ManagerTools } from './dashboard/ManagerTools';
import { QuickStartCTA } from './dashboard/QuickStartCTA';

// Mock data
const mockUser = {
  name: 'Anna Kowalski',
  level: 3,
  stage: 'Handling Objections',
  avatar: undefined,
  isManager: true
};

const mockScenarios = [
  {
    id: '1',
    name: 'IT Director Meeting',
    industry: 'Healthcare - Hospital, Poland',
    difficulty: 'Advanced' as const,
    lastAttempt: {
      status: 'completed' as const,
      score: 85,
      date: '2 days ago'
    },
    duration: '15-20 min',
    description: 'Convince an IT Director to upgrade their hospital\'s patient management system.'
  },
  {
    id: '2',
    name: 'Budget Objection',
    industry: 'Manufacturing - SME, Germany',
    difficulty: 'Intermediate' as const,
    lastAttempt: {
      status: 'failed' as const,
      score: 45,
      date: '1 week ago'
    },
    duration: '10-15 min',
    description: 'Handle budget concerns from a manufacturing company CFO.'
  },
  {
    id: '3',
    name: 'Cold Outreach',
    industry: 'Technology - Startup, UK',
    difficulty: 'Beginner' as const,
    duration: '5-10 min',
    description: 'Initial cold call to a tech startup CEO about productivity software.'
  },
  {
    id: '4',
    name: 'Contract Negotiation',
    industry: 'Finance - Enterprise, Poland',
    difficulty: 'Advanced' as const,
    duration: '20-25 min',
    description: 'Negotiate contract terms with a large financial institution.'
  }
];

const mockProgress = {
  currentLevel: 3,
  nextLevel: 4,
  progressToNext: 65,
  weeklyStats: {
    sessionsCompleted: 8,
    successRate: 72,
    totalMinutes: 145,
    streak: 5
  },
  skillBreakdown: {
    communication: 78,
    persuasion: 65,
    objectionHandling: 82,
    closing: 58
  }
};

const mockFeedback = {
  sessionId: 'session-123',
  scenarioName: 'IT Director Meeting',
  date: '2 days ago',
  overallScore: 85,
  scores: {
    communication: 88,
    content: 82,
    tone: 90,
    persuasion: 80
  },
  aiComment: 'Excellent rapport building and technical knowledge demonstration. Work on closing techniques for better conversion.',
  improvements: [
    'Practice more assertive closing questions',
    'Reduce filler words during technical explanations',
    'Improve objection handling timing'
  ]
};

interface DashboardProps {
  onNavigate: (page: 'dashboard' | 'scenario-builder' | 'conversation') => void
}

export const Dashboard: React.FC<DashboardProps> = ({ onNavigate }) => {
  const [language, setLanguage] = useState('en');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isVoiceCalibrated, setIsVoiceCalibrated] = useState(false);

  const handleStartSimulation = (scenarioId?: string) => {
    console.log('Starting simulation:', scenarioId || 'quick start');
    onNavigate('conversation');
  };

  const handlePreviewScenario = (scenarioId: string) => {
    console.log('Previewing scenario:', scenarioId);
  };

  const handleRetryScenario = (scenarioId: string) => {
    console.log('Retrying scenario:', scenarioId);
  };

  const handleViewFullReport = (sessionId: string) => {
    console.log('Viewing full report:', sessionId);
  };

  const handleVoiceCalibration = () => {
    console.log('Starting voice calibration...');
    // Simulate calibration
    setTimeout(() => setIsVoiceCalibrated(true), 2000);
  };

  const handleVoiceTest = () => {
    console.log('Testing voice...');
  };

  return (
    <div className="min-h-screen bg-salesplay-gradient">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          {/* Welcome Header */}
          <WelcomeHeader
            user={mockUser}
            language={language}
            onLanguageChange={setLanguage}
          />

          {/* Voice Calibration */}
          <VoiceCalibration
            isCalibrated={isVoiceCalibrated}
            onCalibrate={handleVoiceCalibration}
            onTest={handleVoiceTest}
          />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Scenarios */}
            <div className="lg:col-span-2 space-y-6">
              {/* Quick Start CTA */}
              <QuickStartCTA onStartSimulation={() => handleStartSimulation()} />

              {/* Scenario Library */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-serif font-semibold text-white salesplay-title">
                    Training Scenarios
                  </h2>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant={viewMode === 'grid' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setViewMode('grid')}
                      className={`salesplay-button ${viewMode === 'grid' ? 'salesplay-button-primary' : ''}`}
                    >
                      <Grid className="w-4 h-4" />
                    </Button>
                    <Button
                      variant={viewMode === 'list' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setViewMode('list')}
                      className={`salesplay-button ${viewMode === 'list' ? 'salesplay-button-primary' : ''}`}
                    >
                      <List className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className={`grid gap-4 ${
                  viewMode === 'grid' 
                    ? 'grid-cols-1 md:grid-cols-2' 
                    : 'grid-cols-1'
                }`}>
                  {mockScenarios.map((scenario) => (
                    <ScenarioCard
                      key={scenario.id}
                      scenario={scenario}
                      onStart={handleStartSimulation}
                      onPreview={handlePreviewScenario}
                      onRetry={handleRetryScenario}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Progress & Feedback */}
            <div className="space-y-6">
              <ProgressSummary progress={mockProgress} />
              <FeedbackPreview
                feedback={mockFeedback}
                onViewFullReport={handleViewFullReport}
              />
              
              {/* Manager Tools */}
              {mockUser.isManager && (
                <ManagerTools
                  onScenarioBuilder={() => onNavigate('scenario-builder')}
                  onTeamPerformance={() => console.log('Team Performance')}
                  onFeedbackReview={() => console.log('Feedback Review')}
                  onUserManagement={() => console.log('User Management')}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Floating CTA */}
      <QuickStartCTA
        onStartSimulation={() => handleStartSimulation()}
        isFloating={true}
      />
    </div>
  );
};