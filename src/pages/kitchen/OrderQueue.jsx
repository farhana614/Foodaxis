import { useState } from 'react'
import { Clock, ArrowUpDown, Filter } from 'lucide-react'
import { MOCK_ORDERS } from '../../utils/mockData'
import OrderStatusBadge from '../../components/order/OrderStatusBadge'

export default function OrderQueue() {
  const [orders, setOrders] = useState(MOCK_ORDERS)
  const [sortBy, setSortBy] = useState('time')
  const [filterStatus, setFilterStatus] = useState('all')

  const filtered = filterStatus === 'all' ? orders : orders.filter(o => o.status === filterStatus)

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'time') return new Date(a.time) - new Date(b.time)
    if (sortBy === 'total') return b.total - a.total
    return 0
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Order Queue</h1>
        <div className="flex items-center gap-3">
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-gray-800 text-white border border-gray-700 rounded-lg px-3 py-2 text-sm"
          >
            <option value="time">Sort by Time</option>
            <option value="total">Sort by Total</option>
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-gray-800 text-white border border-gray-700 rounded-lg px-3 py-2 text-sm"
          >
            <option value="all">All Status</option>
            <option value="received">Received</option>
            <option value="preparing">Preparing</option>
            <option value="ready">Ready</option>
          </select>
        </div>
      </div>

      <div className="space-y-3">
        {sorted.map(order => (
          <div key={order.id} className="bg-gray-800 rounded-xl p-4 border border-gray-700 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center">
                <span className="text-lg font-bold text-white">{order.id.split('-')[1]}</span>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white">{order.id}</span>
                  <OrderStatusBadge status={order.status} size="sm" />
                </div>
                <p className="text-sm text-gray-400">{order.customer} • {order.items.length} items</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-white">৳{order.total}</p>
              <p className="text-xs text-gray-500 flex items-center justify-end gap-1">
                <Clock className="w-3 h-3" /> {order.time.split(' ')[1]}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}