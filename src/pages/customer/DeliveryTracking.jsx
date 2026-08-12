import { useParams } from 'react-router-dom'
import { useOrder } from '../../context/OrderContext'
import { useEffect } from 'react'
import OrderTimeline from '../../components/order/OrderTimeline'
import LiveMap from '../../components/order/LiveMap'
import Loader from '../../components/common/Loader'
import { Phone, MessageSquare } from 'lucide-react'

export default function DeliveryTracking() {
  const { orderId } = useParams()
  const { trackOrder, trackingOrder, isLoading } = useOrder()

  useEffect(() => {
    trackOrder(orderId)
  }, [orderId, trackOrder])

  if (isLoading) return <Loader text="Loading delivery info..." />

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="page-title">Delivery Tracking</h1>

      <div className="card">
        <OrderTimeline currentStatus={trackingOrder?.status || 'out_for_delivery'} />
      </div>

      <div className="card p-0 overflow-hidden">
        <LiveMap rider={trackingOrder?.rider} />
      </div>

      {trackingOrder?.rider && (
        <div className="card flex items-center gap-4">
          <div className="w-14 h-14 bg-violet-100 rounded-full flex items-center justify-center">
            <span className="text-xl font-bold text-violet-700">{trackingOrder.rider.name[0]}</span>
          </div>
          <div className="flex-1">
            <p className="font-semibold text-gray-900">{trackingOrder.rider.name}</p>
            <p className="text-sm text-gray-500">Your delivery partner</p>
          </div>
          <div className="flex gap-2">
            <button className="w-10 h-10 bg-primary-50 text-primary-600 rounded-full flex items-center justify-center hover:bg-primary-100">
              <Phone className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 bg-primary-50 text-primary-600 rounded-full flex items-center justify-center hover:bg-primary-100">
              <MessageSquare className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}