import { useState, useCallback, useEffect, useRef } from 'react'

export function useNotifications() {
  const [notifications, setNotifications] = useState([])
  const [unreadCount, setUnreadCount] = useState(0)
  const intervalRef = useRef(null)

  // Mock notifications for demo
  const MOCK_NOTIFICATIONS = [
    { id: 1, title: 'New Order', message: 'Order #ORD-005 received', type: 'order', read: false, time: new Date().toISOString() },
    { id: 2, title: 'Low Stock Alert', message: 'Lettuce is running low (3kg remaining)', type: 'inventory', read: false, time: new Date(Date.now() - 3600000).toISOString() },
    { id: 3, title: 'Delivery Complete', message: 'Order #ORD-001 has been delivered', type: 'delivery', read: true, time: new Date(Date.now() - 7200000).toISOString() },
  ]

  const fetchNotifications = useCallback(async () => {
    // Simulate API call
    await new Promise(r => setTimeout(r, 300))
    setNotifications(MOCK_NOTIFICATIONS)
    setUnreadCount(MOCK_NOTIFICATIONS.filter(n => !n.read).length)
  }, [])

  const addNotification = useCallback((notification) => {
    const newNotif = {
      id: Date.now(),
      read: false,
      time: new Date().toISOString(),
      ...notification,
    }
    setNotifications(prev => [newNotif, ...prev])
    setUnreadCount(prev => prev + 1)
    
    // Show browser notification if permitted
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(notification.title, {
        body: notification.message,
        icon: '/favicon.ico',
      })
    }
  }, [])

  const markAsRead = useCallback((notificationId) => {
    setNotifications(prev => prev.map(n => 
      n.id === notificationId ? { ...n, read: true } : n
    ))
    setUnreadCount(prev => Math.max(0, prev - 1))
  }, [])

  const markAllAsRead = useCallback(() => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
    setUnreadCount(0)
  }, [])

  const clearNotifications = useCallback(() => {
    setNotifications([])
    setUnreadCount(0)
  }, [])

  const requestPermission = useCallback(async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission()
      return permission === 'granted'
    }
    return false
  }, [])

  // Simulate real-time notifications
  const startPolling = useCallback((interval = 30000) => {
    intervalRef.current = setInterval(() => {
      // In real app, this would check for new notifications from server
      fetchNotifications()
    }, interval)
  }, [fetchNotifications])

  const stopPolling = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  useEffect(() => {
    fetchNotifications()
    return () => stopPolling()
  }, [fetchNotifications, stopPolling])

  return {
    notifications,
    unreadCount,
    fetchNotifications,
    addNotification,
    markAsRead,
    markAllAsRead,
    clearNotifications,
    requestPermission,
    startPolling,
    stopPolling,
  }
}