import { createContext, useState, useCallback, useEffect } from 'react'

export const AuthContext = createContext(null)

const MOCK_USERS = {
  customer: { id: 1, name: 'John Doe', email: 'john@email.com', role: 'customer' },
  admin: { id: 2, name: 'Admin User', email: 'admin@foodaxis.com', role: 'admin' },
  kitchen: { id: 3, name: 'Chef Mike', email: 'kitchen@foodaxis.com', role: 'kitchen' },
  rider: { id: 4, name: 'Rider Alex', email: 'rider@foodaxis.com', role: 'rider' },
  superadmin: { id: 5, name: 'Super Admin', email: 'super@foodaxis.com', role: 'superadmin' },
}

export function AuthProvider({ children }) {
  // 🔧 FIX #1: Start logged out (null) instead of defaulting to admin
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('foodaxis_user')
    return saved ? JSON.parse(saved) : null
  })
  const [isLoading, setIsLoading] = useState(false)

  const login = useCallback(async (email, password, role) => {
    setIsLoading(true)
    await new Promise(r => setTimeout(r, 800))
    const mockUser = MOCK_USERS[role] || MOCK_USERS.customer
    setUser(mockUser)
    localStorage.setItem('foodaxis_user', JSON.stringify(mockUser))
    setIsLoading(false)
    return mockUser
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    localStorage.removeItem('foodaxis_user')
  }, [])

  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}