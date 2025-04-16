"use client"

import type React from "react"
import { createContext, useState, useContext, useEffect } from "react"
import { useRouter } from "next/navigation"

const MOCK_USER = {
  email: "teste@teste.com",
  password: "123456",
  name: "Usuário Teste",
  avatar: "/placeholder.svg?height=40&width=40&text=UT",
}

interface User {
  email: string
  name: string
  avatar: string
}

interface AuthContextType {
  isLoggedIn: boolean
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("auth_token")
        const savedUser = localStorage.getItem("user")
        if (token && savedUser) {
          setIsLoggedIn(true)
          setUser(JSON.parse(savedUser))
        }
      }
      setIsLoading(false)
    }
    checkAuth()
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (email === MOCK_USER.email && password === MOCK_USER.password) {
      const token = "mock-jwt-token"
      const userData = {
        email: MOCK_USER.email,
        name: MOCK_USER.name,
        avatar: MOCK_USER.avatar,
      }
      localStorage.setItem("auth_token", token)
      localStorage.setItem("user", JSON.stringify(userData))
      setIsLoggedIn(true)
      setUser(userData)
      setIsLoading(false)
      router.push("/")
      return true
    }
    setIsLoading(false)
    return false
  }

  const logout = () => {
    localStorage.removeItem("auth_token")
    localStorage.removeItem("user")
    setIsLoggedIn(false)
    setUser(null)
    router.push("/login")
  }

  return <AuthContext.Provider value={{ isLoggedIn, user, login, logout, isLoading }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
