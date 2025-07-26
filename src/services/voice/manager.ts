import { 
  VoiceProvider, VoiceConfig, SynthesisOptions, SynthesisResult, 
  RecognitionOptions, RecognitionResult, AudioDevice, RecordingState 
} from './types'
import { aiService } from '../ai/manager'

export class VoiceManager {
  private mediaRecorder: MediaRecorder | null = null
  private audioStream: MediaStream | null = null
  private recordingState: RecordingState = {
    isRecording: false,
    isPaused: false,
    duration: 0,
    volume: 0
  }
  private recordingStartTime: number = 0
  private audioChunks: Blob[] = []
  private volumeAnalyzer: AnalyserNode | null = null
  private audioContext: AudioContext | null = null

  // Get available audio devices
  async getAudioDevices(): Promise<AudioDevice[]> {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices()
      return devices
        .filter(device => device.kind === 'audioinput' || device.kind === 'audiooutput')
        .map(device => ({
          deviceId: device.deviceId,
          label: device.label || `${device.kind} ${device.deviceId.slice(0, 8)}`,
          kind: device.kind as 'audioinput' | 'audiooutput',
          groupId: device.groupId
        }))
    } catch (error) {
      console.error('Failed to get audio devices:', error)
      return []
    }
  }

  // Check microphone permissions
  async checkMicrophonePermission(): Promise<boolean> {
    try {
      const result = await navigator.permissions.query({ name: 'microphone' as PermissionName })
      return result.state === 'granted'
    } catch (error) {
      console.error('Failed to check microphone permission:', error)
      return false
    }
  }

  // Request microphone access
  async requestMicrophoneAccess(deviceId?: string): Promise<MediaStream> {
    try {
      const constraints: MediaStreamConstraints = {
        audio: deviceId ? { deviceId: { exact: deviceId } } : true
      }
      
      const stream = await navigator.mediaDevices.getUserMedia(constraints)
      this.audioStream = stream
      
      // Set up volume analysis
      this.setupVolumeAnalysis(stream)
      
      return stream
    } catch (error) {
      console.error('Failed to access microphone:', error)
      throw new Error('Microphone access denied or not available')
    }
  }

  // Start recording
  async startRecording(options?: { deviceId?: string; mimeType?: string }): Promise<void> {
    if (this.recordingState.isRecording) {
      throw new Error('Recording already in progress')
    }

    try {
      // Get audio stream if not already available
      if (!this.audioStream) {
        await this.requestMicrophoneAccess(options?.deviceId)
      }

      // Create MediaRecorder
      const mimeType = options?.mimeType || this.getSupportedMimeType()
      this.mediaRecorder = new MediaRecorder(this.audioStream!, { mimeType })
      
      // Reset audio chunks
      this.audioChunks = []
      
      // Set up event handlers
      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          this.audioChunks.push(event.data)
        }
      }

      this.mediaRecorder.onstart = () => {
        this.recordingStartTime = Date.now()
        this.recordingState = {
          isRecording: true,
          isPaused: false,
          duration: 0,
          volume: 0
        }
      }

      this.mediaRecorder.onstop = () => {
        this.recordingState.isRecording = false
        this.recordingState.isPaused = false
      }

      // Start recording
      this.mediaRecorder.start(100) // Collect data every 100ms
      
      // Start duration tracking
      this.startDurationTracking()
      
    } catch (error) {
      console.error('Failed to start recording:', error)
      throw new Error('Failed to start recording')
    }
  }

  // Stop recording and return audio blob
  async stopRecording(): Promise<Blob> {
    return new Promise((resolve, reject) => {
      if (!this.mediaRecorder || !this.recordingState.isRecording) {
        reject(new Error('No active recording'))
        return
      }

      this.mediaRecorder.onstop = () => {
        const audioBlob = new Blob(this.audioChunks, { 
          type: this.mediaRecorder?.mimeType || 'audio/wav' 
        })
        
        this.recordingState.isRecording = false
        this.recordingState.isPaused = false
        
        resolve(audioBlob)
      }

      this.mediaRecorder.stop()
    })
  }

  // Pause recording
  pauseRecording(): void {
    if (this.mediaRecorder && this.recordingState.isRecording && !this.recordingState.isPaused) {
      this.mediaRecorder.pause()
      this.recordingState.isPaused = true
    }
  }

  // Resume recording
  resumeRecording(): void {
    if (this.mediaRecorder && this.recordingState.isRecording && this.recordingState.isPaused) {
      this.mediaRecorder.resume()
      this.recordingState.isPaused = false
    }
  }

  // Get current recording state
  getRecordingState(): RecordingState {
    return { ...this.recordingState }
  }

  // Synthesize speech
  async synthesizeSpeech(options: SynthesisOptions): Promise<SynthesisResult> {
    try {
      const result = await aiService.synthesizeVoice(options.text, options.config)
      
      return {
        audioUrl: result.audioUrl,
        duration: result.duration,
        format: options.format || 'mp3',
        size: 0 // Size not available from AI service
      }
    } catch (error) {
      console.error('Failed to synthesize speech:', error)
      throw new Error('Speech synthesis failed')
    }
  }

  // Recognize speech from audio
  async recognizeSpeech(options: RecognitionOptions): Promise<RecognitionResult> {
    try {
      const result = await aiService.recognizeSpeech(
        options.audioData,
        options.language
      )
      
      return {
        text: result.text,
        confidence: result.confidence,
        isFinal: true
      }
    } catch (error) {
      console.error('Failed to recognize speech:', error)
      throw new Error('Speech recognition failed')
    }
  }

  // Play audio from URL
  async playAudio(audioUrl: string, volume = 1.0): Promise<void> {
    return new Promise((resolve, reject) => {
      const audio = new Audio(audioUrl)
      audio.volume = Math.max(0, Math.min(1, volume))
      
      audio.onended = () => resolve()
      audio.onerror = () => reject(new Error('Failed to play audio'))
      
      audio.play().catch(reject)
    })
  }

  // Clean up resources
  cleanup(): void {
    if (this.mediaRecorder && this.recordingState.isRecording) {
      this.mediaRecorder.stop()
    }
    
    if (this.audioStream) {
      this.audioStream.getTracks().forEach(track => track.stop())
      this.audioStream = null
    }
    
    if (this.audioContext) {
      this.audioContext.close()
      this.audioContext = null
    }
    
    this.volumeAnalyzer = null
    this.recordingState = {
      isRecording: false,
      isPaused: false,
      duration: 0,
      volume: 0
    }
  }

  // Private methods
  private getSupportedMimeType(): string {
    const types = [
      'audio/webm;codecs=opus',
      'audio/webm',
      'audio/mp4',
      'audio/wav'
    ]
    
    for (const type of types) {
      if (MediaRecorder.isTypeSupported(type)) {
        return type
      }
    }
    
    return 'audio/wav' // Fallback
  }

  private setupVolumeAnalysis(stream: MediaStream): void {
    try {
      this.audioContext = new AudioContext()
      const source = this.audioContext.createMediaStreamSource(stream)
      this.volumeAnalyzer = this.audioContext.createAnalyser()
      
      this.volumeAnalyzer.fftSize = 256
      source.connect(this.volumeAnalyzer)
      
      this.startVolumeMonitoring()
    } catch (error) {
      console.error('Failed to setup volume analysis:', error)
    }
  }

  private startVolumeMonitoring(): void {
    if (!this.volumeAnalyzer) return
    
    const dataArray = new Uint8Array(this.volumeAnalyzer.frequencyBinCount)
    
    const updateVolume = () => {
      if (!this.volumeAnalyzer || !this.recordingState.isRecording) return
      
      this.volumeAnalyzer.getByteFrequencyData(dataArray)
      
      // Calculate RMS volume
      let sum = 0
      for (let i = 0; i < dataArray.length; i++) {
        sum += dataArray[i] * dataArray[i]
      }
      const rms = Math.sqrt(sum / dataArray.length)
      this.recordingState.volume = rms / 255 // Normalize to 0-1
      
      requestAnimationFrame(updateVolume)
    }
    
    updateVolume()
  }

  private startDurationTracking(): void {
    const updateDuration = () => {
      if (!this.recordingState.isRecording) return
      
      this.recordingState.duration = Math.floor((Date.now() - this.recordingStartTime) / 1000)
      
      setTimeout(updateDuration, 1000)
    }
    
    updateDuration()
  }
}

// Singleton instance
export const voiceManager = new VoiceManager()