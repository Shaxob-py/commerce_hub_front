'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { tokenManager } from './api-client'

interface AuthContextType {
  isAuthenticated: boolean
  isLoading: boolean
  login: (accessToken: string, refreshToken: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is already authenticated on mount
    setIsAuthenticated(tokenManager.isAuthenticated())
    setIsLoading(false)
  }, [])

  const login = (accessToken: string, refreshToken: string) => {
    tokenManager.setTokens(accessToken, refreshToken)
    setIsAuthenticated(true)
  }

  const logout = () => {
    tokenManager.clearTokens()
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
