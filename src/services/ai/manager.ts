import { BaseAIProvider } from './providers/base'
import { BlinkAIProvider } from './providers/blink'
import { AIProvider, ConversationMessage, AIConversationConfig, AnalysisResult, VoiceConfig } from './types'

export class AIServiceManager {
  private providers: Map<string, BaseAIProvider> = new Map()
  private defaultProvider: string = 'blink'

  constructor() {
    this.registerProvider('blink', new BlinkAIProvider())
  }

  // Register new AI providers
  registerProvider(name: string, provider: BaseAIProvider): void {
    this.providers.set(name, provider)
  }

  // Get available providers
  getProviders(): AIProvider[] {
    return Array.from(this.providers.values()).map(provider => ({
      name: provider.name,
      version: provider.version,
      capabilities: provider.capabilities as any[]
    }))
  }

  // Set default provider
  setDefaultProvider(name: string): void {
    if (!this.providers.has(name)) {
      throw new Error(`Provider ${name} not found`)
    }
    this.defaultProvider = name
  }

  // Get provider by name
  private getProvider(name?: string): BaseAIProvider {
    const providerName = name || this.defaultProvider
    const provider = this.providers.get(providerName)
    
    if (!provider) {
      throw new Error(`Provider ${providerName} not found`)
    }
    
    return provider
  }

  // Generate conversation response
  async generateResponse(
    messages: ConversationMessage[],
    config: AIConversationConfig,
    providerName?: string
  ): Promise<string> {
    const provider = this.getProvider(providerName)
    return provider.generateResponse(messages, config)
  }

  // Stream conversation response
  async streamResponse(
    messages: ConversationMessage[],
    config: AIConversationConfig,
    onChunk: (chunk: string) => void,
    providerName?: string
  ): Promise<void> {
    const provider = this.getProvider(providerName)
    return provider.streamResponse(messages, config, onChunk)
  }

  // Synthesize voice
  async synthesizeVoice(
    text: string,
    config: VoiceConfig,
    providerName?: string
  ): Promise<{ audioUrl: string; duration: number }> {
    const provider = this.getProvider(providerName)
    
    if (!provider.synthesizeVoice) {
      throw new Error(`Provider ${provider.name} does not support voice synthesis`)
    }
    
    return provider.synthesizeVoice(text, config)
  }

  // Recognize speech
  async recognizeSpeech(
    audioData: Blob | string,
    language: string,
    providerName?: string
  ): Promise<{ text: string; confidence: number }> {
    const provider = this.getProvider(providerName)
    
    if (!provider.recognizeSpeech) {
      throw new Error(`Provider ${provider.name} does not support speech recognition`)
    }
    
    return provider.recognizeSpeech(audioData, language)
  }

  // Analyze conversation
  async analyzeConversation(
    messages: ConversationMessage[],
    config: AIConversationConfig,
    providerName?: string
  ): Promise<AnalysisResult> {
    const provider = this.getProvider(providerName)
    
    if (!provider.analyzeConversation) {
      throw new Error(`Provider ${provider.name} does not support conversation analysis`)
    }
    
    return provider.analyzeConversation(messages, config)
  }

  // Translate text
  async translateText(
    text: string,
    fromLang: string,
    toLang: string,
    providerName?: string
  ): Promise<string> {
    const provider = this.getProvider(providerName)
    
    if (!provider.translateText) {
      throw new Error(`Provider ${provider.name} does not support translation`)
    }
    
    return provider.translateText(text, fromLang, toLang)
  }

  // Health check for providers
  async healthCheck(providerName?: string): Promise<{ provider: string; healthy: boolean }[]> {
    if (providerName) {
      const provider = this.getProvider(providerName)
      const healthy = await provider.healthCheck()
      return [{ provider: provider.name, healthy }]
    }

    const results = []
    for (const [name, provider] of this.providers) {
      const healthy = await provider.healthCheck()
      results.push({ provider: name, healthy })
    }
    
    return results
  }
}

// Singleton instance
export const aiService = new AIServiceManager()