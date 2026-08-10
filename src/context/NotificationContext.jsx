import { createContext, useState, useCallback, useContext, useEffect } from 'react'

export const NotificationContext = createContext(null)

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [pushEnabled, setPushEnabled] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('foodaxis_notifications')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setNotifications(parsed)
        setUnreadCount(parsed.filter(n => !n.read).length)
      } catch (e) {
        console.error('Failed to parse notifications:', e)
      }
    }
  }, [])

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem('foodaxis_notifications', JSON.stringify(notifications))
  }, [notifications])

  const addNotification = useCallback((notification) => {
    const newNotif = {
      id: Date.now(),
      read: false,
      timestamp: new Date().toISOString(),
      ...notification,
    }
    setNotifications(prev => [newNotif, ...prev].slice(0, 50)) // Keep last 50
    setUnreadCount(prev => prev + 1)

    // Browser push notification
    if (pushEnabled && 'Notification' in window && Notification.permission === 'granted') {
      new Notification(notification.title || 'FoodAxis', {
        body: notification.message,
        icon: '/favicon.ico',
        badge: '/favicon.ico',
      })
    }
  }, [pushEnabled])

  const markAsRead = useCallback((id) => {
    setNotifications(prev => prev.map(n => 
      n.id === id ? { ...n, read: true } : n
    ))
    setUnreadCount(prev => Math.max(0, prev - 1))
  }, [])

  const markAllAsRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
    setUnreadCount(0)
  }, [])

  const removeNotification = useCallback((id) => {
    setNotifications(prev => {
      const notif = prev.find(n => n.id === id)
      const filtered = prev.filter(n => n.id !== id)
      if (notif && !notif.read) {
        setUnreadCount(c => Math.max(0, c - 1))
      }
      return filtered
    })
  }, [])

  const clearAll = useCallback(() => {
    setNotifications([])
    setUnreadCount(0)
  }, [])

  const requestPushPermission = useCallback(async () => {
    if (!('Notification' in window)) return false
    const permission = await Notification.requestPermission()
    const granted = permission === 'granted'
    setPushEnabled(granted)
    return granted
  }, [])

  // Order status change notifications
  const notifyOrderStatus = useCallback((orderId, status) => {
    const statusMessages = {
      received: 'Your order has been received!',
      preparing: 'Your order is being prepared.',
      ready: 'Your order is ready for pickup/delivery!',
      out_for_delivery: 'Your order is on the way!',
      delivered: 'Your order has been delivered. Enjoy!',
      cancelled: 'Your order has been cancelled.',
    }
    
    addNotification({
      type: 'order',
      title: `Order #${orderId}`,
      message: statusMessages[status] || `Status updated to: ${status}`,
      orderId,
      status,
    })
  }, [addNotification])

  // Inventory alert notifications
  const notifyInventoryAlert = useCallback((itemName, currentStock) => {
    addNotification({
      type: 'inventory',
      title: 'Low Stock Alert',
      message: `${itemName} is running low (${currentStock} remaining). Please restock soon.`,
      itemName,
      currentStock,
    })
  }, [addNotification])

  // Delivery assignment notification
  const notifyDeliveryAssigned = useCallback((orderId, riderName) => {
    addNotification({
      type: 'delivery',
      title: 'Rider Assigned',
      message: `${riderName} has been assigned to deliver your order #${orderId}.`,
      orderId,
      riderName,
    })
  }, [addNotification])

  const value = {
    notifications,
    unreadCount,
    pushEnabled,
    addNotification,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearAll,
    requestPushPermission,
    notifyOrderStatus,
    notifyInventoryAlert,
    notifyDeliveryAssigned,
  }

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotifications = () => {
  const ctx = useContext(NotificationContext)
  if (!ctx) throw new Error('useNotifications must be used within NotificationProvider')
  return ctx
}