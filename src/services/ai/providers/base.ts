import { AIProvider, ConversationMessage, AIConversationConfig, AnalysisResult, VoiceConfig } from '../types'

export abstract class BaseAIProvider implements AIProvider {
  abstract name: string
  abstract version: string
  abstract capabilities: string[]

  // Text generation for conversation
  abstract generateResponse(
    messages: ConversationMessage[],
    config: AIConversationConfig
  ): Promise<string>

  // Stream response for real-time conversation
  abstract streamResponse(
    messages: ConversationMessage[],
    config: AIConversationConfig,
    onChunk: (chunk: string) => void
  ): Promise<void>

  // Voice synthesis
  abstract synthesizeVoice?(
    text: string,
    config: VoiceConfig
  ): Promise<{ audioUrl: string; duration: number }>

  // Speech recognition
  abstract recognizeSpeech?(
    audioData: Blob | string,
    language: string
  ): Promise<{ text: string; confidence: number }>

  // Conversation analysis
  abstract analyzeConversation?(
    messages: ConversationMessage[],
    config: AIConversationConfig
  ): Promise<AnalysisResult>

  // Translation
  abstract translateText?(
    text: string,
    fromLang: string,
    toLang: string
  ): Promise<string>

  // Health check
  async healthCheck(): Promise<boolean> {
    try {
      // Override in specific providers
      return true
    } catch {
      return false
    }
  }
}