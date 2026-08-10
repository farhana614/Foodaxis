import { useState, useEffect, useCallback } from 'react'

// Mock analytics data
const MOCK_ANALYTICS = {
  todaySales: 28450,
  todayOrders: 89,
  avgOrderValue: 319.66,
  activeCustomers: 156,
  salesChange: 12.5,
  ordersChange: 8.3,
  aovChange: -2.1,
  customerChange: 15.2,
  topItems: [
    { name: 'Classic Chicken Burger', orders: 45, revenue: 20250 },
    { name: 'Margherita Pizza', orders: 38, revenue: 25840 },
    { name: 'Grilled Salmon', orders: 22, revenue: 20900 },
    { name: 'Chocolate Lava Cake', orders: 31, revenue: 11780 },
    { name: 'Mango Smoothie', orders: 52, revenue: 11440 },
  ],
  hourlyData: [
    { hour: '8AM', sales: 1200, orders: 4 },
    { hour: '10AM', sales: 3400, orders: 12 },
    { hour: '12PM', sales: 8900, orders: 28 },
    { hour: '2PM', sales: 5600, orders: 18 },
    { hour: '4PM', sales: 4200, orders: 14 },
    { hour: '6PM', sales: 7800, orders: 24 },
    { hour: '8PM', sales: 6500, orders: 20 },
    { hour: '10PM', sales: 2100, orders: 7 },
  ],
  wasteData: {
    totalWaste: 8.5,
    wasteCost: 4250,
    wasteReduction: 15,
    topWastedItems: [
      { name: 'Lettuce', quantity: '2.5 kg', cost: 375 },
      { name: 'Burger Bun', quantity: '18 pcs', cost: 270 },
      { name: 'Tomato', quantity: '1.8 kg', cost: 216 },
    ]
  }
}

export function useAnalytics(period = 'today') {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchAnalytics = useCallback(async (selectedPeriod) => {
    setIsLoading(true)
    setError(null)
    
    try {
      // Simulate API call
      await new Promise(r => setTimeout(r, 700))
      
      // In real app, period would filter the data
      setData(MOCK_ANALYTICS)
      return MOCK_ANALYTICS
    } catch (err) {
      setError(err.message || 'Failed to fetch analytics')
      return null
    } finally {
      setIsLoading(false)
    }
  }, [])

  const getSalesReport = useCallback((startDate, endDate) => {
    // Would fetch date-range specific data
    return data?.hourlyData || []
  }, [data])

  const getWasteReport = useCallback(() => {
    return data?.wasteData || null
  }, [data])

  useEffect(() => {
    fetchAnalytics(period)
  }, [fetchAnalytics, period])

  return {
    data,
    isLoading,
    error,
    fetchAnalytics,
    getSalesReport,
    getWasteReport,
  }
}