import { useState, useEffect, useCallback } from 'react'

// Mock data for demo
const MOCK_INVENTORY = [
  { id: 1, name: 'Chicken Breast', unit: 'kg', currentStock: 12, minThreshold: 10, maxStock: 50, category: 'Meat', lastUpdated: '2026-08-10' },
  { id: 2, name: 'Burger Bun', unit: 'pcs', currentStock: 45, minThreshold: 30, maxStock: 200, category: 'Bakery', lastUpdated: '2026-08-10' },
  { id: 3, name: 'Lettuce', unit: 'kg', currentStock: 3, minThreshold: 5, maxStock: 20, category: 'Vegetables', lastUpdated: '2026-08-09' },
  { id: 4, name: 'Tomato', unit: 'kg', currentStock: 8, minThreshold: 5, maxStock: 25, category: 'Vegetables', lastUpdated: '2026-08-10' },
  { id: 5, name: 'Mozzarella Cheese', unit: 'kg', currentStock: 4, minThreshold: 3, maxStock: 15, category: 'Dairy', lastUpdated: '2026-08-08' },
  { id: 6, name: 'Salmon Fillet', unit: 'kg', currentStock: 2, minThreshold: 5, maxStock: 20, category: 'Seafood', lastUpdated: '2026-08-10' },
]

export function useInventory() {
  const [items, setItems] = useState([])
  const [alerts, setAlerts] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchInventory = useCallback(async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise(r => setTimeout(r, 600))
    setItems(MOCK_INVENTORY)
    
    // Calculate alerts
    const lowStock = MOCK_INVENTORY.filter(item => item.currentStock <= item.minThreshold)
    setAlerts(lowStock)
    setIsLoading(false)
  }, [])

  const updateStock = useCallback(async (itemId, newQuantity, reason = 'manual') => {
    setItems(prev => prev.map(item => {
      if (item.id === itemId) {
        const updated = { ...item, currentStock: newQuantity, lastUpdated: new Date().toISOString().split('T')[0] }
        return updated
      }
      return item
    }))
    
    // Recalculate alerts
    setAlerts(prev => {
      const updatedItems = items.map(i => i.id === itemId ? { ...i, currentStock: newQuantity } : i)
      return updatedItems.filter(item => item.currentStock <= item.minThreshold)
    })
  }, [items])

  const deductStock = useCallback(async (itemId, quantity) => {
    const item = items.find(i => i.id === itemId)
    if (!item) return false
    return updateStock(itemId, Math.max(0, item.currentStock - quantity), 'order_deduction')
  }, [items, updateStock])

  const getLowStockAlerts = useCallback(() => {
    return items.filter(item => item.currentStock <= item.minThreshold)
  }, [items])

  useEffect(() => {
    fetchInventory()
  }, [fetchInventory])

  return {
    items,
    alerts,
    isLoading,
    fetchInventory,
    updateStock,
    deductStock,
    getLowStockAlerts,
  }
}