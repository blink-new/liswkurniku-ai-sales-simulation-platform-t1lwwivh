import { BaseAIProvider } from './base'
import { ConversationMessage, AIConversationConfig, AnalysisResult, VoiceConfig } from '../types'
import blink from '../../../blink/client'

export class BlinkAIProvider extends BaseAIProvider {
  name = 'Blink AI'
  version = '1.0.0'
  capabilities = ['text-generation', 'voice-synthesis', 'speech-recognition', 'analysis']

  async generateResponse(
    messages: ConversationMessage[],
    config: AIConversationConfig
  ): Promise<string> {
    const systemPrompt = this.buildSystemPrompt(config)
    
    const { text } = await blink.ai.generateText({
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages.map(msg => ({
          role: msg.role as 'user' | 'assistant',
          content: msg.content
        }))
      ],
      model: 'gpt-4o-mini',
      maxTokens: 500
    })

    return text
  }

  async streamResponse(
    messages: ConversationMessage[],
    config: AIConversationConfig,
    onChunk: (chunk: string) => void
  ): Promise<void> {
    const systemPrompt = this.buildSystemPrompt(config)
    
    await blink.ai.streamText(
      {
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages.map(msg => ({
            role: msg.role as 'user' | 'assistant',
            content: msg.content
          }))
        ],
        model: 'gpt-4o-mini',
        maxTokens: 500
      },
      onChunk
    )
  }

  async synthesizeVoice(
    text: string,
    config: VoiceConfig
  ): Promise<{ audioUrl: string; duration: number }> {
    const { url } = await blink.ai.generateSpeech({
      text,
      voice: config.voiceId as any,
      speed: config.speed
    })

    // Estimate duration (rough calculation)
    const duration = Math.ceil(text.length / 10) // ~10 chars per second

    return { audioUrl: url, duration }
  }

  async recognizeSpeech(
    audioData: Blob | string,
    language: string
  ): Promise<{ text: string; confidence: number }> {
    let audioInput: string | ArrayBuffer

    if (audioData instanceof Blob) {
      audioInput = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = () => {
          const dataUrl = reader.result as string
          const base64Data = dataUrl.split(',')[1]
          resolve(base64Data)
        }
        reader.onerror = reject
        reader.readAsDataURL(audioData)
      })
    } else {
      audioInput = audioData
    }

    const { text } = await blink.ai.transcribeAudio({
      audio: audioInput,
      language: language as any
    })

    return { text, confidence: 0.95 } // Blink doesn't return confidence, assume high
  }

  async analyzeConversation(
    messages: ConversationMessage[],
    config: AIConversationConfig
  ): Promise<AnalysisResult> {
    const analysisPrompt = this.buildAnalysisPrompt(messages, config)
    
    const { object } = await blink.ai.generateObject({
      prompt: analysisPrompt,
      schema: {
        type: 'object',
        properties: {
          overall_score: { type: 'number', minimum: 0, maximum: 100 },
          communication: {
            type: 'object',
            properties: {
              score: { type: 'number', minimum: 0, maximum: 100 },
              feedback: { type: 'string' },
              examples: { type: 'array', items: { type: 'string' } }
            },
            required: ['score', 'feedback', 'examples']
          },
          content: {
            type: 'object',
            properties: {
              score: { type: 'number', minimum: 0, maximum: 100 },
              feedback: { type: 'string' },
              examples: { type: 'array', items: { type: 'string' } }
            },
            required: ['score', 'feedback', 'examples']
          },
          tone: {
            type: 'object',
            properties: {
              score: { type: 'number', minimum: 0, maximum: 100 },
              feedback: { type: 'string' },
              examples: { type: 'array', items: { type: 'string' } }
            },
            required: ['score', 'feedback', 'examples']
          },
          persuasion: {
            type: 'object',
            properties: {
              score: { type: 'number', minimum: 0, maximum: 100 },
              feedback: { type: 'string' },
              examples: { type: 'array', items: { type: 'string' } }
            },
            required: ['score', 'feedback', 'examples']
          },
          improvements: { type: 'array', items: { type: 'string' } },
          strengths: { type: 'array', items: { type: 'string' } }
        },
        required: ['overall_score', 'communication', 'content', 'tone', 'persuasion', 'improvements', 'strengths']
      }
    })

    return {
      ...object,
      transcript_analysis: messages.map((msg, index) => ({
        timestamp: msg.timestamp,
        text: msg.content,
        speaker: msg.role === 'user' ? 'user' : 'ai',
        sentiment: 'neutral' as const,
        confidence: 0.9,
        tags: []
      }))
    } as AnalysisResult
  }

  private buildSystemPrompt(config: AIConversationConfig): string {
    const { persona, scenario, language } = config
    
    return `You are roleplaying as ${persona.name}, a ${persona.role} in a sales simulation.

Background: ${persona.background}
Personality: ${persona.personality.join(', ')}
Goals: ${persona.goals.join(', ')}
Tone: ${persona.tone}
Difficulty: ${persona.difficulty}

Scenario: ${scenario.title}
Industry: ${scenario.industry}
Product: ${scenario.product}
Objectives: ${scenario.objectives.join(', ')}

${scenario.customInstructions || ''}

Respond naturally as this character would. Use objections: ${persona.objections.join(', ')}
Language: ${language}
Keep responses conversational and realistic for a ${persona.difficulty} level interaction.`
  }

  private buildAnalysisPrompt(messages: ConversationMessage[], config: AIConversationConfig): string {
    const conversation = messages
      .map(msg => `${msg.role}: ${msg.content}`)
      .join('\n')

    return `Analyze this sales conversation and provide detailed feedback:

Scenario: ${config.scenario.title}
Objectives: ${config.scenario.objectives.join(', ')}
Success Criteria: ${config.scenario.successCriteria.join(', ')}

Conversation:
${conversation}

Evaluate the user's performance on:
1. Communication (clarity, listening, questioning)
2. Content (product knowledge, relevance, accuracy)
3. Tone (professionalism, empathy, confidence)
4. Persuasion (objection handling, value proposition, closing)

Provide scores (0-100), specific feedback, examples from the conversation, and actionable improvements.`
  }
}