// Core AI service interfaces for easy integration of different providers

export interface AIProvider {
  name: string
  version: string
  capabilities: AICapability[]
}

export type AICapability = 'text-generation' | 'voice-synthesis' | 'speech-recognition' | 'analysis' | 'translation'

export interface ConversationMessage {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: number
  metadata?: Record<string, any>
}

export interface AIConversationConfig {
  provider: string
  model: string
  persona: ClientPersona
  scenario: ScenarioConfig
  language: 'en' | 'pl' | 'de'
  mode: 'voice' | 'text'
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
  difficulty: 'beginner' | 'intermediate' | 'advanced'
}

export interface ScenarioConfig {
  id: string
  title: string
  description: string
  industry: string
  product: string
  duration: number // minutes
  objectives: string[]
  successCriteria: string[]
  customInstructions?: string
}

export interface VoiceConfig {
  provider: string
  voiceId: string
  speed: number
  pitch: number
  language: string
}

export interface AnalysisResult {
  overall_score: number
  communication: {
    score: number
    feedback: string
    examples: string[]
  }
  content: {
    score: number
    feedback: string
    examples: string[]
  }
  tone: {
    score: number
    feedback: string
    examples: string[]
  }
  persuasion: {
    score: number
    feedback: string
    examples: string[]
  }
  improvements: string[]
  strengths: string[]
  transcript_analysis: TranscriptAnalysis[]
}

export interface TranscriptAnalysis {
  timestamp: number
  text: string
  speaker: 'user' | 'ai'
  sentiment: 'positive' | 'neutral' | 'negative'
  confidence: number
  tags: string[]
}