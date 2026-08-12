import { useParams } from 'react-router-dom'
import { useOrder } from '../../context/OrderContext'
import { useEffect } from 'react'
import OrderTimeline from '../../components/order/OrderTimeline'
import LiveMap from '../../components/order/LiveMap'
import Loader from '../../components/common/Loader'

export default function OrderTracking() {
  const { orderId } = useParams()
  const { trackOrder, trackingOrder, isLoading } = useOrder()

  useEffect(() => {
    trackOrder(orderId)
  }, [orderId, trackOrder])

  if (isLoading) return <Loader text="Loading tracking info..." />

  if (!trackingOrder) {
    return <div className="text-center py-20 text-gray-500">Tracking information not available</div>
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center">
        <h1 className="page-title">Track Your Order</h1>
        <p className="text-gray-500">Order #{orderId}</p>
      </div>

      <div className="card">
        <OrderTimeline 
          currentStatus={trackingOrder.status} 
          estimatedTime={trackingOrder.estimatedArrival}
        />
      </div>

      {trackingOrder.rider && (
        <div className="card">
          <h3 className="section-title mb-4">Live Location</h3>
          <LiveMap rider={trackingOrder.rider} />
        </div>
      )}

      <div className="card">
        <h3 className="section-title mb-4">Delivery Updates</h3>
        <div className="space-y-3">
          {trackingOrder.timeline.map((step, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                step.completed ? 'bg-primary-600' : 'bg-gray-300'
              }`} />
              <div>
                <p className={`text-sm font-medium ${step.completed ? 'text-gray-900' : 'text-gray-400'}`}>
                  {step.status.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </p>
                <p className="text-xs text-gray-500">{step.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}