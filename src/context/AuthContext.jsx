import { createContext, useState, useCallback } from 'react'

export const AuthContext = createContext(null)

// Mock user for demo - remove in production
const MOCK_USERS = {
  customer: { id: 1, name: 'John Doe', email: 'john@email.com', role: 'customer' },
  admin: { id: 2, name: 'Admin User', email: 'admin@foodaxis.com', role: 'admin' },
  kitchen: { id: 3, name: 'Chef Mike', email: 'kitchen@foodaxis.com', role: 'kitchen' },
  rider: { id: 4, name: 'Rider Alex', email: 'rider@foodaxis.com', role: 'rider' },
  superadmin: { id: 5, name: 'Super Admin', email: 'super@foodaxis.com', role: 'superadmin' },
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(MOCK_USERS.admin) // Default to admin for dev
  const [isLoading, setIsLoading] = useState(false)

  const login = useCallback(async (email, password, role) => {
    setIsLoading(true)
    // Simulate API call
    await new Promise(r => setTimeout(r, 800))
    const mockUser = MOCK_USERS[role] || MOCK_USERS.customer
    setUser(mockUser)
    setIsLoading(false)
    return mockUser
  }, [])

  const logout = useCallback(() => {
    setUser(null)
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