import React, { createContext, useState, useEffect } from 'react';
import axios from '../api/axios';
import * as authService from '../services/authService';

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('token')
      const storedUser = localStorage.getItem('user')
      
      if (token && storedUser) {
        setUser(JSON.parse(storedUser))
        try {
          const userData = await authService.getCurrentUser()
          setUser(userData)
          localStorage.setItem('user', JSON.stringify(userData))
        } catch (err) {
          console.error('Auth initialization failed:', err)
          localStorage.removeItem('token')
          localStorage.removeItem('user')
        }
      }
      setLoading(false)
    };

    initializeAuth()
  }, [])

  const login = async (email, password) => {
    try {
      setError(null)
      const { token, user: userData } = await authService.login(email, password)
      localStorage.setItem('token', token)
      localStorage.setItem('user', JSON.stringify(userData))
      setUser(userData)
      return { success: true }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
      return { success: false, error: err.response?.data?.message }
    }
  }

  const signup = async (name, email, password) => {
    try {
      setError(null);
      await authService.register(name, email, password)
      return await login(email, password);
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed')
      return { success: false, error: err.response?.data?.message }
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
  }

  const updateProfile = async (userData) => {
    try {
      const updatedUser = await authService.updateProfile(userData)
      setUser(updatedUser)
      localStorage.setItem('user', JSON.stringify(updatedUser))
      return { success: true, user: updatedUser }
    } catch (err) {
      return { success: false, error: err.response?.data?.message }
    }
  }

  const value = {
    user,
    loading,
    error,
    login,
    signup,
    logout,
    updateProfile,
    isAuthenticated: !!user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
