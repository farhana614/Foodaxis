import { useState, useEffect, useCallback } from 'react'
import { orderService } from '../services/orderService'

export function useOrders(initialParams = {}) {
  const [orders, setOrders] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [params, setParams] = useState(initialParams)

  const fetchOrders = useCallback(async (overrideParams) => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await orderService.getAll(overrideParams || params)
      setOrders(response.data || [])
      return response.data
    } catch (err) {
      setError(err.message || 'Failed to fetch orders')
      return []
    } finally {
      setIsLoading(false)
    }
  }, [params])

  const updateStatus = useCallback(async (orderId, status) => {
    try {
      await orderService.updateStatus(orderId, status)
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o))
      return true
    } catch (err) {
      setError(err.message || 'Failed to update status')
      return false
    }
  }, [])

  const cancelOrder = useCallback(async (orderId) => {
    try {
      await orderService.cancel(orderId)
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: 'cancelled' } : o))
      return true
    } catch (err) {
      setError(err.message || 'Failed to cancel order')
      return false
    }
  }, [])

  useEffect(() => {
    fetchOrders()
  }, [fetchOrders])

  return {
    orders,
    isLoading,
    error,
    params,
    setParams,
    fetchOrders,
    updateStatus,
    cancelOrder,
  }
}