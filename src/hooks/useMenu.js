import { useState, useEffect, useCallback } from 'react'
import { DEMO_MENU_ITEMS } from '../utils/constants'

export function useMenu() {
  const [items, setItems] = useState([])
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchMenu = useCallback(async (filters = {}) => {
    setIsLoading(true)
    setError(null)
    
    try {
      // Simulate API call
      await new Promise(r => setTimeout(r, 500))
      let data = [...DEMO_MENU_ITEMS]

      // Apply filters
      if (filters.category && filters.category !== 'all') {
        data = data.filter(item => item.category.toLowerCase() === filters.category.toLowerCase())
      }
      if (filters.search) {
        const search = filters.search.toLowerCase()
        data = data.filter(item => 
          item.name.toLowerCase().includes(search) || 
          item.description.toLowerCase().includes(search)
        )
      }
      if (filters.maxPrice) {
        data = data.filter(item => item.price <= filters.maxPrice)
      }
      if (filters.dietary) {
        // Mock dietary filter
        data = data.filter(item => item.calories < 500)
      }

      setItems(data)
      
      // Extract unique categories
      const cats = [...new Set(DEMO_MENU_ITEMS.map(i => i.category))]
      setCategories(['All Items', ...cats])
      
      return data
    } catch (err) {
      setError(err.message || 'Failed to fetch menu')
      return []
    } finally {
      setIsLoading(false)
    }
  }, [])

  const getItemById = useCallback((id) => {
    return DEMO_MENU_ITEMS.find(item => item.id === Number(id)) || null
  }, [])

  const toggleAvailability = useCallback(async (itemId) => {
    setItems(prev => prev.map(item => 
      item.id === itemId ? { ...item, isAvailable: !item.isAvailable } : item
    ))
    return true
  }, [])

  useEffect(() => {
    fetchMenu()
  }, [fetchMenu])

  return {
    items,
    categories,
    isLoading,
    error,
    fetchMenu,
    getItemById,
    toggleAvailability,
  }
}