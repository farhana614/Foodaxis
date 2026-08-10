import { MapPin, Clock, User, Phone, ChevronRight } from 'lucide-react'
import OrderStatusBadge from './OrderStatusBadge'

export default function OrderCard({ order, onClick, showRider = false }) {
  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-xl border border-gray-100 p-4 hover:shadow-card transition-all cursor-pointer"
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-gray-900">{order.id}</span>
            <OrderStatusBadge status={order.status} />
          </div>
          <p className="text-xs text-gray-400 mt-1">{order.time}</p>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-gray-900">৳{order.total}</p>
          <p className="text-xs text-gray-400 capitalize">{order.type}</p>
        </div>
      </div>

      <div className="space-y-2 mb-3">
        {order.items.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between text-sm">
            <span className="text-gray-600">
              <span className="font-medium text-gray-900">{item.qx}x</span> {item.name}
            </span>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-4 pt-3 border-t border-gray-50 text-xs text-gray-500">
        <span className="flex items-center gap-1">
          <User className="w-3.5 h-3.5" /> {order.customer}
        </span>
        {order.table && (
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" /> Table {order.table}
          </span>
        )}
        {order.address && (
          <span className="flex items-center gap-1 truncate max-w-[150px]">
            <MapPin className="w-3.5 h-3.5 flex-shrink-0" /> {order.address}
          </span>
        )}
        {showRider && order.rider && (
          <span className="flex items-center gap-1 ml-auto">
            <Phone className="w-3.5 h-3.5" /> {order.rider}
          </span>
        )}
      </div>

      {onClick && (
        <div className="flex items-center justify-end mt-3 pt-2">
          <span className="text-xs font-medium text-primary-600 flex items-center gap-1">
            View Details <ChevronRight className="w-3.5 h-3.5" />
          </span>
        </div>
      )}
    </div>
  )
}