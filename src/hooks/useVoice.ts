import { useState, useEffect, useCallback } from 'react'
import { voiceManager } from '../services/voice/manager'
import { RecordingState, VoiceConfig } from '../services/voice/types'

export function useVoice() {
  const [recordingState, setRecordingState] = useState<RecordingState>({
    isRecording: false,
    isPaused: false,
    duration: 0,
    volume: 0
  })
  const [hasPermission, setHasPermission] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  // Check microphone permission on mount
  useEffect(() => {
    const checkPermission = async () => {
      const permission = await voiceManager.checkMicrophonePermission()
      setHasPermission(permission)
    }
    checkPermission()
  }, [])

  // Update recording state periodically
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (recordingState.isRecording) {
      interval = setInterval(() => {
        const state = voiceManager.getRecordingState()
        setRecordingState(state)
      }, 100)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [recordingState.isRecording])

  const requestPermission = useCallback(async (deviceId?: string) => {
    setIsLoading(true)
    setError(null)
    
    try {
      await voiceManager.requestMicrophoneAccess(deviceId)
      setHasPermission(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to access microphone')
      setHasPermission(false)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const startRecording = useCallback(async (options?: { deviceId?: string }) => {
    if (!hasPermission) {
      await requestPermission(options?.deviceId)
    }

    setIsLoading(true)
    setError(null)

    try {
      await voiceManager.startRecording(options)
      const state = voiceManager.getRecordingState()
      setRecordingState(state)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to start recording')
    } finally {
      setIsLoading(false)
    }
  }, [hasPermission, requestPermission])

  const stopRecording = useCallback(async (): Promise<Blob | null> => {
    setIsLoading(true)
    setError(null)

    try {
      const audioBlob = await voiceManager.stopRecording()
      const state = voiceManager.getRecordingState()
      setRecordingState(state)
      return audioBlob
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to stop recording')
      return null
    } finally {
      setIsLoading(false)
    }
  }, [])

  const pauseRecording = useCallback(() => {
    voiceManager.pauseRecording()
    const state = voiceManager.getRecordingState()
    setRecordingState(state)
  }, [])

  const resumeRecording = useCallback(() => {
    voiceManager.resumeRecording()
    const state = voiceManager.getRecordingState()
    setRecordingState(state)
  }, [])

  const synthesizeSpeech = useCallback(async (text: string, config: VoiceConfig) => {
    setIsLoading(true)
    setError(null)

    try {
      const result = await voiceManager.synthesizeSpeech({ text, config })
      return result
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to synthesize speech')
      return null
    } finally {
      setIsLoading(false)
    }
  }, [])

  const recognizeSpeech = useCallback(async (audioData: Blob, language: string) => {
    setIsLoading(true)
    setError(null)

    try {
      const result = await voiceManager.recognizeSpeech({ audioData, language })
      return result
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to recognize speech')
      return null
    } finally {
      setIsLoading(false)
    }
  }, [])

  const playAudio = useCallback(async (audioUrl: string, volume = 1.0) => {
    setIsLoading(true)
    setError(null)

    try {
      await voiceManager.playAudio(audioUrl, volume)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to play audio')
    } finally {
      setIsLoading(false)
    }
  }, [])

  const cleanup = useCallback(() => {
    voiceManager.cleanup()
    setRecordingState({
      isRecording: false,
      isPaused: false,
      duration: 0,
      volume: 0
    })
  }, [])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cleanup()
    }
  }, [cleanup])

  return {
    recordingState,
    hasPermission,
    isLoading,
    error,
    requestPermission,
    startRecording,
    stopRecording,
    pauseRecording,
    resumeRecording,
    synthesizeSpeech,
    recognizeSpeech,
    playAudio,
    cleanup
  }
}