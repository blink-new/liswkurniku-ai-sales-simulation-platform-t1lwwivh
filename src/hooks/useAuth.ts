import { useState, useEffect } from 'react'
import blink from '../blink/client'

interface AuthState {
  user: any | null
  isLoading: boolean
  isAuthenticated: boolean
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false
  })

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setAuthState({
        user: state.user,
        isLoading: state.isLoading,
        isAuthenticated: state.isAuthenticated
      })
    })

    return unsubscribe
  }, [])

  const login = (nextUrl?: string) => {
    blink.auth.login(nextUrl)
  }

  const logout = (redirectUrl?: string) => {
    blink.auth.logout(redirectUrl)
  }

  const updateProfile = async (updates: any) => {
    if (!authState.user) throw new Error('No authenticated user')
    return blink.auth.updateMe(updates)
  }

  return {
    ...authState,
    login,
    logout,
    updateProfile
  }
}