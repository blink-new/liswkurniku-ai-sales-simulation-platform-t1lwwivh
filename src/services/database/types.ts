// Database schema types for the sales simulation platform

export interface User {
  id: string
  email: string
  displayName: string
  role: 'user' | 'manager' | 'admin'
  language: 'en' | 'pl' | 'de'
  teamId?: string
  createdAt: string
  updatedAt: string
  lastLoginAt?: string
  preferences: UserPreferences
}

export interface UserPreferences {
  defaultVoice: string
  voiceSpeed: number
  autoTranscription: boolean
  feedbackLevel: 'basic' | 'detailed' | 'expert'
  notifications: {
    email: boolean
    inApp: boolean
    weeklyReport: boolean
  }
}

export interface Team {
  id: string
  name: string
  managerId: string
  description?: string
  createdAt: string
  updatedAt: string
  settings: TeamSettings
}

export interface TeamSettings {
  allowCustomScenarios: boolean
  requireManagerApproval: boolean
  maxSessionDuration: number
  defaultLanguage: 'en' | 'pl' | 'de'
}

export interface Scenario {
  id: string
  title: string
  description: string
  industry: string
  product: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  duration: number // minutes
  objectives: string[]
  successCriteria: string[]
  customInstructions?: string
  createdBy: string
  teamId?: string
  isPublic: boolean
  tags: string[]
  createdAt: string
  updatedAt: string
  persona: ClientPersona
}

export interface ClientPersona {
  id: string
  name: string
  role: string
  personality: string[]
  background: string
  goals: string[]
  objections: string[]
  tone: 'friendly' | 'professional' | 'skeptical' | 'aggressive' | 'neutral'
  voiceId?: string
  avatarUrl?: string
}

export interface Session {
  id: string
  userId: string
  scenarioId: string
  status: 'active' | 'completed' | 'paused' | 'cancelled'
  mode: 'voice' | 'text'
  language: 'en' | 'pl' | 'de'
  startedAt: string
  endedAt?: string
  duration?: number // seconds
  messageCount: number
  aiProvider: string
  metadata: SessionMetadata
}

export interface SessionMetadata {
  userAgent?: string
  deviceType?: string
  location?: string
  voiceConfig?: {
    provider: string
    voiceId: string
    speed: number
  }
}

export interface Message {
  id: string
  sessionId: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: string
  audioUrl?: string
  transcriptionConfidence?: number
  metadata?: MessageMetadata
}

export interface MessageMetadata {
  sentiment?: 'positive' | 'neutral' | 'negative'
  confidence?: number
  processingTime?: number
  tokens?: number
}

export interface Feedback {
  id: string
  sessionId: string
  userId: string
  overallScore: number
  communication: FeedbackCategory
  content: FeedbackCategory
  tone: FeedbackCategory
  persuasion: FeedbackCategory
  improvements: string[]
  strengths: string[]
  createdAt: string
  aiProvider: string
  version: string
}

export interface FeedbackCategory {
  score: number
  feedback: string
  examples: string[]
}

export interface Goal {
  id: string
  userId: string
  teamId?: string
  title: string
  description: string
  type: 'skill_improvement' | 'scenario_completion' | 'score_target' | 'custom'
  targetValue: number
  currentValue: number
  deadline?: string
  status: 'active' | 'completed' | 'paused' | 'cancelled'
  createdBy: string
  createdAt: string
  updatedAt: string
}

export interface Analytics {
  id: string
  userId?: string
  teamId?: string
  period: 'daily' | 'weekly' | 'monthly'
  date: string
  metrics: AnalyticsMetrics
  createdAt: string
}

export interface AnalyticsMetrics {
  sessionsCompleted: number
  totalDuration: number // seconds
  averageScore: number
  skillScores: {
    communication: number
    content: number
    tone: number
    persuasion: number
  }
  scenariosAttempted: string[]
  improvementTrend: number // percentage change
}