import { useState } from 'react'
import { Package, MapPin, Phone, Navigation, CheckCircle, Clock } from 'lucide-react'
import { MOCK_ORDERS } from '../../utils/mockData'
import OrderStatusBadge from '../../components/order/OrderStatusBadge'
import Button from '../../components/common/Button'

export default function AssignedOrders() {
  const [orders, setOrders] = useState(MOCK_ORDERS.filter(o => o.status === 'out_for_delivery'))

  const updateStatus = (orderId, status) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o))
  }

  return (
    <div className="space-y-6">
      <h1 className="page-title">My Orders</h1>

      {orders.length === 0 && (
        <div className="text-center py-16">
          <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No active deliveries</p>
        </div>
      )}

      <div className="space-y-4">
        {orders.map(order => (
          <div key={order.id} className="card">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-900">{order.id}</span>
                  <OrderStatusBadge status={order.status} size="sm" />
                </div>
                <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {order.time}
                </p>
              </div>
              <span className="text-lg font-bold text-gray-900">৳{order.total}</span>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 mb-4">
              <div className="flex items-start gap-3 mb-3">
                <MapPin className="w-5 h-5 text-primary-600 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Pickup</p>
                  <p className="text-sm text-gray-500">FoodAxis Main Branch</p>
                </div>
              </div>
              <div className="w-0.5 h-6 bg-gray-200 ml-2" />
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-emerald-600 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Delivery</p>
                  <p className="text-sm text-gray-500">{order.address}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <span className="font-bold text-gray-600 text-sm">{order.customer[0]}</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{order.customer}</p>
                  <p className="text-xs text-gray-500">{order.customerPhone}</p>
                </div>
              </div>
              <a href={`tel:${order.customerPhone}`} className="w-10 h-10 bg-primary-50 text-primary-600 rounded-full flex items-center justify-center hover:bg-primary-100">
                <Phone className="w-5 h-5" />
              </a>
            </div>

            <div className="flex gap-3">
              <Button 
                variant="secondary" 
                className="flex-1"
                onClick={() => window.open(`https://maps.google.com/?q=${order.address}`, '_blank')}
              >
                <Navigation className="w-4 h-4" /> Navigate
              </Button>
              <Button 
                className="flex-1"
                onClick={() => updateStatus(order.id, 'delivered')}
              >
                <CheckCircle className="w-4 h-4" /> Mark Delivered
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}