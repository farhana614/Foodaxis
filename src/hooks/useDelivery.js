import { useState, useEffect, useCallback, useRef } from 'react'

// Mock riders data
const MOCK_RIDERS = [
  { id: 1, name: 'Alex Rider', phone: '01712345678', status: 'available', location: { lat: 23.8103, lng: 90.4125 }, rating: 4.8, totalDeliveries: 342 },
  { id: 2, name: 'Sam Courier', phone: '01787654321', status: 'busy', location: { lat: 23.8150, lng: 90.4180 }, rating: 4.6, totalDeliveries: 215 },
  { id: 3, name: 'Mike Deliver', phone: '01711223344', status: 'available', location: { lat: 23.8050, lng: 90.4080 }, rating: 4.9, totalDeliveries: 510 },
]

const MOCK_DELIVERIES = [
  { id: 'DEL-001', orderId: 'ORD-003', riderId: 2, status: 'in_transit', pickupTime: '12:20', estimatedArrival: '12:50', distance: 3.2 },
]

export function useDelivery() {
  const [riders, setRiders] = useState([])
  const [activeDeliveries, setActiveDeliveries] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const watchId = useRef(null)

  const fetchRiders = useCallback(async () => {
    setIsLoading(true)
    await new Promise(r => setTimeout(r, 400))
    setRiders(MOCK_RIDERS)
    setActiveDeliveries(MOCK_DELIVERIES)
    setIsLoading(false)
  }, [])

  const assignRider = useCallback(async (orderId, riderId) => {
    const rider = riders.find(r => r.id === riderId)
    if (!rider || rider.status !== 'available') return false
    
    setRiders(prev => prev.map(r => r.id === riderId ? { ...r, status: 'busy' } : r))
    setActiveDeliveries(prev => [...prev, {
      id: `DEL-${Date.now()}`,
      orderId,
      riderId,
      status: 'assigned',
      pickupTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      estimatedArrival: '--',
      distance: 0,
    }])
    return true
  }, [riders])

  const updateDeliveryStatus = useCallback(async (deliveryId, status) => {
    setActiveDeliveries(prev => prev.map(d => 
      d.id === deliveryId ? { ...d, status } : d
    ))
    
    if (status === 'delivered') {
      const delivery = activeDeliveries.find(d => d.id === deliveryId)
      if (delivery) {
        setRiders(prev => prev.map(r => 
          r.id === delivery.riderId ? { ...r, status: 'available' } : r
        ))
      }
    }
    return true
  }, [activeDeliveries])

  const getRiderLocation = useCallback((riderId) => {
    const rider = riders.find(r => r.id === riderId)
    return rider?.location || null
  }, [riders])

  const trackLocation = useCallback((onLocationUpdate) => {
    if (!navigator.geolocation) return null
    
    watchId.current = navigator.geolocation.watchPosition(
      (position) => {
        onLocationUpdate({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
      },
      (error) => console.error('Geolocation error:', error),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    )
    
    return watchId.current
  }, [])

  const stopTracking = useCallback(() => {
    if (watchId.current !== null) {
      navigator.geolocation.clearWatch(watchId.current)
      watchId.current = null
    }
  }, [])

  useEffect(() => {
    fetchRiders()
    return () => stopTracking()
  }, [fetchRiders, stopTracking])

  return {
    riders,
    activeDeliveries,
    isLoading,
    fetchRiders,
    assignRider,
    updateDeliveryStatus,
    getRiderLocation,
    trackLocation,
    stopTracking,
  }
}