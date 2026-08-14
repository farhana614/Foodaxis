import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Printer, Phone, MapPin, Clock } from 'lucide-react'
import { MOCK_ORDERS } from '../../utils/mockData'
import OrderTimeline from '../../components/order/OrderTimeline'
import Button from '../../components/common/Button'

export default function OrderDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const order = MOCK_ORDERS.find(o => o.id === id) || MOCK_ORDERS[0]

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 hover:text-gray-700">
          <ArrowLeft className="w-5 h-5" /> Back
        </button>
        <Button variant="secondary" size="sm">
          <Printer className="w-4 h-4" /> Print
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold text-gray-900">{order.id}</h2>
                <p className="text-sm text-gray-500">{order.time}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                order.status === 'delivered' ? 'bg-emerald-100 text-emerald-700' :
                order.status === 'cancelled' ? 'bg-red-100 text-red-700' :
                'bg-blue-100 text-blue-700'
              }`}>
                {order.status.replace(/_/g, ' ').toUpperCase()}
              </span>
            </div>
            <OrderTimeline currentStatus={order.status} />
          </div>

          <div className="card">
            <h3 className="section-title mb-4">Order Items</h3>
            <div className="space-y-3">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 bg-primary-50 rounded-lg flex items-center justify-center text-sm font-bold text-primary-600">{item.qty}x</span>
                    <span className="font-medium text-gray-900">{item.name}</span>
                  </div>
                  <span className="font-medium text-gray-700">৳{item.price * item.qty}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
              <div className="flex justify-between text-sm text-gray-500">
                <span>Subtotal</span>
                <span>৳{order.total}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>Delivery Fee</span>
                <span>৳60</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-gray-900">
                <span>Total</span>
                <span>৳{order.total + 60}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="card">
            <h3 className="section-title mb-4">Customer</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <span className="font-bold text-gray-600">{order.customer[0]}</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{order.customer}</p>
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <Phone className="w-3 h-3" /> {order.customerPhone}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="section-title mb-4">Delivery Info</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                <span className="text-gray-600">{order.address || `Table ${order.table}`}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">{order.time}</span>
              </div>
            </div>
          </div>

          {order.notes && (
            <div className="card bg-amber-50 border-amber-100">
              <h3 className="section-title text-amber-900 mb-2">Customer Notes</h3>
              <p className="text-sm text-amber-800">{order.notes}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}