// Voice service interfaces for speech recognition and synthesis

export interface VoiceProvider {
  name: string
  capabilities: VoiceCapability[]
  supportedLanguages: string[]
}

export type VoiceCapability = 'synthesis' | 'recognition' | 'real-time'

export interface VoiceConfig {
  provider: string
  voiceId: string
  language: string
  speed: number // 0.5 - 2.0
  pitch: number // 0.5 - 2.0
  volume: number // 0.0 - 1.0
}

export interface SynthesisOptions {
  text: string
  config: VoiceConfig
  format?: 'mp3' | 'wav' | 'ogg'
  quality?: 'low' | 'medium' | 'high'
}

export interface SynthesisResult {
  audioUrl: string
  duration: number // seconds
  format: string
  size: number // bytes
}

export interface RecognitionOptions {
  audioData: Blob | string | ArrayBuffer
  language: string
  continuous?: boolean
  interimResults?: boolean
  maxAlternatives?: number
}

export interface RecognitionResult {
  text: string
  confidence: number
  alternatives?: RecognitionAlternative[]
  isFinal: boolean
}

export interface RecognitionAlternative {
  text: string
  confidence: number
}

export interface VoiceSettings {
  defaultVoice: string
  defaultLanguage: string
  autoDetectLanguage: boolean
  noiseReduction: boolean
  echoCancellation: boolean
  voiceActivityDetection: boolean
}

export interface AudioDevice {
  deviceId: string
  label: string
  kind: 'audioinput' | 'audiooutput'
  groupId: string
}

export interface RecordingState {
  isRecording: boolean
  isPaused: boolean
  duration: number
  volume: number
  error?: string
}