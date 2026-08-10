import { createContext, useState, useEffect, useContext, useCallback } from 'react'

export const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    // Check localStorage first, then system preference
    const saved = localStorage.getItem('foodaxis_theme')
    if (saved) return saved
    
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark'
    }
    return 'light'
  })

  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    const saved = localStorage.getItem('foodaxis_sidebar')
    return saved === 'true'
  })

  // Apply theme to document
  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(theme)
    localStorage.setItem('foodaxis_theme', theme)
    
    // Optional: Add dark mode class to body for Tailwind dark: variants
    if (theme === 'dark') {
      document.body.classList.add('dark')
    } else {
      document.body.classList.remove('dark')
    }
  }, [theme])

  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }, [])

  const setLightTheme = useCallback(() => setTheme('light'), [])
  const setDarkTheme = useCallback(() => setTheme('dark'), [])

  const toggleSidebar = useCallback(() => {
    setSidebarCollapsed(prev => {
      const newVal = !prev
      localStorage.setItem('foodaxis_sidebar', String(newVal))
      return newVal
    })
  }, [])

  const setSidebarOpen = useCallback((open) => {
    setSidebarCollapsed(!open)
    localStorage.setItem('foodaxis_sidebar', String(!open))
  }, [])

  // Kitchen display specific theme (high contrast mode)
  const [kitchenHighContrast, setKitchenHighContrast] = useState(() => {
    return localStorage.getItem('foodaxis_kitchen_contrast') === 'true'
  })

  const toggleKitchenContrast = useCallback(() => {
    setKitchenHighContrast(prev => {
      const newVal = !prev
      localStorage.setItem('foodaxis_kitchen_contrast', String(newVal))
      return newVal
    })
  }, [])

  const value = {
    theme,
    isDark: theme === 'dark',
    isLight: theme === 'light',
    toggleTheme,
    setLightTheme,
    setDarkTheme,
    sidebarCollapsed,
    toggleSidebar,
    setSidebarOpen,
    kitchenHighContrast,
    toggleKitchenContrast,
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}