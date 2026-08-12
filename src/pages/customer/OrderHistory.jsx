import { useState } from 'react'
import { DEMO_ORDERS } from '../../utils/constants'
import OrderCard from '../../components/order/OrderCard'
import EmptyState from '../../components/common/EmptyState'

export default function OrderHistory() {
  const [filter, setFilter] = useState('all')
  const filters = ['all', 'ongoing', 'completed', 'cancelled']

  const filteredOrders = DEMO_ORDERS.filter(order => {
    if (filter === 'all') return true
    if (filter === 'ongoing') return ['received', 'preparing', 'ready', 'out_for_delivery'].includes(order.status)
    if (filter === 'completed') return order.status === 'delivered'
    if (filter === 'cancelled') return order.status === 'cancelled'
    return true
  })

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="page-title mb-6">My Orders</h1>

      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize whitespace-nowrap transition-all ${
              filter === f
                ? 'bg-primary-600 text-white'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-primary-300'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {filteredOrders.length > 0 ? (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <OrderCard key={order.id} order={order} onClick={() => {}} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon="noData"
          title="No orders found"
          description="You haven't placed any orders yet"
          action={{ label: 'Browse Menu', onClick: () => window.location.href = '/menu' }}
        />
      )}
    </div>
  )
}