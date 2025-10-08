import React, { createContext, useContext, useState } from 'react'
import { MOCK_USERS } from '../data/mock'

export type Role = 'Admin' | 'Student' | 'Employer' | 'PO'

export interface User {
  id: string
  name: string
  role: Role
  password?: string
}

interface AuthContextValue {
  user: User | null
  login: (username: string, password: string) => { ok: boolean; message?: string }
  logout: () => void
  setUser: (u: User | null) => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)

  function login(username: string, password: string) {
    const found = MOCK_USERS.find((u) => u.name === username && u.password === password)
    if (found) {
      setUser({ id: found.id, name: found.name, role: found.role })
      return { ok: true }
    }
    return { ok: false, message: 'Invalid credentials' }
  }

  function logout() {
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
