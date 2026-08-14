import { Package, Star, Clock, MapPin } from 'lucide-react'
import { MOCK_ORDERS } from '../../utils/mockData'

export default function DeliveryHistory() {
  const completedOrders = MOCK_ORDERS.filter(o => o.status === 'delivered')

  return (
    <div className="space-y-6">
      <h1 className="page-title">Delivery History</h1>

      <div className="space-y-4">
        {completedOrders.map(order => (
          <div key={order.id} className="card flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center flex-shrink-0">
              <Package className="w-6 h-6 text-emerald-600" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-900">{order.id}</span>
                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium">Delivered</span>
              </div>
              <p className="text-sm text-gray-500 flex items-center gap-1 mt-0.5">
                <MapPin className="w-3.5 h-3.5" /> {order.address}
              </p>
            </div>
            <div className="text-right">
              <p className="font-bold text-gray-900">৳{order.total}</p>
              <p className="text-xs text-gray-500 flex items-center justify-end gap-1">
                <Clock className="w-3 h-3" /> {order.time.split(' ')[0]}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}