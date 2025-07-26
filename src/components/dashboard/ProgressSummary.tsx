import React from 'react';
import { TrendingUp, Target, Calendar, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Progress } from '../ui/progress';

interface ProgressSummaryProps {
  progress: {
    currentLevel: number;
    nextLevel: number;
    progressToNext: number;
    weeklyStats: {
      sessionsCompleted: number;
      successRate: number;
      totalMinutes: number;
      streak: number;
    };
    skillBreakdown: {
      communication: number;
      persuasion: number;
      objectionHandling: number;
      closing: number;
    };
  };
}

export const ProgressSummary: React.FC<ProgressSummaryProps> = ({ progress }) => {
  return (
    <div className="space-y-6">
      {/* Level Progress */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2">
            <Target className="w-5 h-5 text-blue-500" />
            <span>Level Progress</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Level {progress.currentLevel}</span>
            <span className="text-sm text-gray-500">Level {progress.nextLevel}</span>
          </div>
          <Progress value={progress.progressToNext} className="h-2" />
          <p className="text-sm text-gray-600">
            {progress.progressToNext}% to next level
          </p>
        </CardContent>
      </Card>

      {/* Weekly Stats */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="w-5 h-5 text-green-500" />
            <span>This Week</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {progress.weeklyStats.sessionsCompleted}
              </div>
              <div className="text-sm text-gray-500">Sessions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {progress.weeklyStats.successRate}%
              </div>
              <div className="text-sm text-gray-500">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {progress.weeklyStats.totalMinutes}
              </div>
              <div className="text-sm text-gray-500">Minutes</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {progress.weeklyStats.streak}
              </div>
              <div className="text-sm text-gray-500">Day Streak</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Skill Breakdown */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2">
            <Award className="w-5 h-5 text-purple-500" />
            <span>Skill Breakdown</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(progress.skillBreakdown).map(([skill, value]) => (
            <div key={skill} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium capitalize">
                  {skill.replace(/([A-Z])/g, ' $1').trim()}
                </span>
                <span className="text-sm text-gray-500">{value}%</span>
              </div>
              <Progress value={value} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};