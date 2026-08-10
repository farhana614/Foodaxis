import { createContext, useState, useCallback, useContext } from 'react'
import { orderService } from '../services/orderService'

export const OrderContext = createContext(null)

export function OrderProvider({ children }) {
  const [currentOrder, setCurrentOrder] = useState(null)
  const [orderHistory, setOrderHistory] = useState([])
  const [trackingOrder, setTrackingOrder] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const placeOrder = useCallback(async (orderData) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise(r => setTimeout(r, 1000))
      const newOrder = {
        id: `ORD-${Date.now().toString(36).toUpperCase()}`,
        ...orderData,
        status: 'received',
        createdAt: new Date().toISOString(),
        estimatedTime: '25-35 min',
      }
      setCurrentOrder(newOrder)
      setOrderHistory(prev => [newOrder, ...prev])
      return newOrder
    } catch (err) {
      console.error('Order failed:', err)
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  const trackOrder = useCallback(async (orderId) => {
    setIsLoading(true)
    try {
      await new Promise(r => setTimeout(r, 500))
      // Mock tracking data
      const mockTracking = {
        id: orderId,
        status: 'preparing',
        timeline: [
          { status: 'received', time: '12:30 PM', completed: true },
          { status: 'preparing', time: '12:35 PM', completed: true },
          { status: 'ready', time: 'Estimated 12:50 PM', completed: false },
          { status: 'out_for_delivery', time: 'Pending', completed: false },
          { status: 'delivered', time: 'Pending', completed: false },
        ],
        rider: {
          name: 'Alex Rider',
          phone: '01712345678',
          rating: 4.8,
          location: { lat: 23.8103, lng: 90.4125 },
        },
        estimatedArrival: '12:55 PM',
      }
      setTrackingOrder(mockTracking)
      return mockTracking
    } finally {
      setIsLoading(false)
    }
  }, [])

  const updateOrderStatus = useCallback((orderId, status) => {
    setCurrentOrder(prev => prev?.id === orderId ? { ...prev, status } : prev)
    setTrackingOrder(prev => prev?.id === orderId ? { ...prev, status } : prev)
    setOrderHistory(prev => prev.map(o => o.id === orderId ? { ...o, status } : o))
  }, [])

  const clearCurrentOrder = useCallback(() => {
    setCurrentOrder(null)
  }, [])

  const fetchOrderHistory = useCallback(async () => {
    setIsLoading(true)
    try {
      await new Promise(r => setTimeout(r, 600))
      return orderHistory
    } finally {
      setIsLoading(false)
    }
  }, [orderHistory])

  const value = {
    currentOrder,
    orderHistory,
    trackingOrder,
    isLoading,
    placeOrder,
    trackOrder,
    updateOrderStatus,
    clearCurrentOrder,
    fetchOrderHistory,
  }

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  )
}

export const useOrder = () => {
  const ctx = useContext(OrderContext)
  if (!ctx) throw new Error('useOrder must be used within OrderProvider')
  return ctx
}