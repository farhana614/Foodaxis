import { createContext, useState, useCallback } from 'react'

export const AuthContext = createContext(null)

const MOCK_USERS = {
  customer: { id: 1, name: 'John Doe', email: 'john@email.com', role: 'customer' },
  admin: { id: 2, name: 'Admin User', email: 'admin@foodaxis.com', role: 'admin' },
  kitchen: { id: 3, name: 'Chef Mike', email: 'kitchen@foodaxis.com', role: 'kitchen' },
  rider: { id: 4, name: 'Rider Alex', email: 'rider@foodaxis.com', role: 'rider' },
  superadmin: { id: 5, name: 'Super Admin', email: 'super@foodaxis.com', role: 'superadmin' },
}

const VALID_CREDENTIALS = {
  'admin@foodaxis.com': { password: 'admin123', role: 'admin' },
  'super@foodaxis.com': { password: 'super123', role: 'superadmin' },
  'kitchen@foodaxis.com': { password: 'kitchen123', role: 'kitchen' },
  'rider@foodaxis.com': { password: 'rider123', role: 'rider' },
  'john@email.com': { password: 'user123', role: 'customer' },
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('foodaxis_user')
    return saved ? JSON.parse(saved) : null
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const login = useCallback(async (email, password, role) => {
    setIsLoading(true)
    setError(null)
    await new Promise(r => setTimeout(r, 800))

    const creds = VALID_CREDENTIALS[email]
    if (!creds || creds.password !== password || creds.role !== role) {
      setIsLoading(false)
      setError('Invalid email, password, or role selected')
      return null
    }

    const mockUser = MOCK_USERS[role]
    setUser(mockUser)
    localStorage.setItem('foodaxis_user', JSON.stringify(mockUser))
    setIsLoading(false)
    return mockUser
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    setError(null)
    localStorage.removeItem('foodaxis_user')
  }, [])

  const clearError = useCallback(() => setError(null), [])

  return (
    <AuthContext.Provider value={{ user, isLoading, isAuthenticated: !!user, error, login, logout, clearError }}>
      {children}
    </AuthContext.Provider>
  )
}