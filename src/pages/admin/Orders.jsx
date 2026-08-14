import { useState } from 'react'
import { Search, Filter, RefreshCw } from 'lucide-react'
import { MOCK_ORDERS } from '../../utils/mockData'
import OrderCard from '../../components/order/OrderCard'
import OrderStatusBadge from '../../components/order/OrderStatusBadge'

export default function Orders() {
  const [orders, setOrders] = useState(MOCK_ORDERS)
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')

  const statusFilters = ['all', 'received', 'preparing', 'ready', 'out_for_delivery', 'delivered', 'cancelled']

  const filteredOrders = orders.filter(order => {
    const matchesFilter = filter === 'all' || order.status === filter
    const matchesSearch = order.id.toLowerCase().includes(search.toLowerCase()) || 
                          order.customer.toLowerCase().includes(search.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const updateStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="page-title">Orders</h1>
        <button onClick={() => setOrders(MOCK_ORDERS)} className="p-2 text-gray-400 hover:text-gray-600">
          <RefreshCw className="w-5 h-5" />
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by order ID or customer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {statusFilters.map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-3 py-2 rounded-lg text-xs font-medium capitalize whitespace-nowrap transition-all ${
                filter === status ? 'bg-primary-600 text-white' : 'bg-white text-gray-600 border border-gray-200'
              }`}
            >
              {status.replace(/_/g, ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Grid */}
      <div className="grid gap-4">
        {filteredOrders.map(order => (
          <div key={order.id} className="card">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div className="flex-1">
                <OrderCard order={order} />
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                {order.status === 'received' && (
                  <button onClick={() => updateStatus(order.id, 'preparing')} className="px-3 py-1.5 bg-amber-100 text-amber-700 rounded-lg text-xs font-medium hover:bg-amber-200">
                    Start Preparing
                  </button>
                )}
                {order.status === 'preparing' && (
                  <button onClick={() => updateStatus(order.id, 'ready')} className="px-3 py-1.5 bg-emerald-100 text-emerald-700 rounded-lg text-xs font-medium hover:bg-emerald-200">
                    Mark Ready
                  </button>
                )}
                {order.status === 'ready' && order.type === 'delivery' && (
                  <button onClick={() => updateStatus(order.id, 'out_for_delivery')} className="px-3 py-1.5 bg-violet-100 text-violet-700 rounded-lg text-xs font-medium hover:bg-violet-200">
                    Assign Rider
                  </button>
                )}
                <button className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium hover:bg-gray-200">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}