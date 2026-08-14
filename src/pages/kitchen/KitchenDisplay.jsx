import { useState, useEffect } from 'react'
import { Clock, ChefHat, CheckCircle, AlertCircle, Flame } from 'lucide-react'
import { MOCK_ORDERS } from '../../utils/mockData'
import OrderStatusBadge from '../../components/order/OrderStatusBadge'

export default function KitchenDisplay() {
  const [orders, setOrders] = useState(MOCK_ORDERS.filter(o => ['received', 'preparing', 'ready'].includes(o.status)))
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const updateStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: newStatus } : o))
  }

  const getElapsedTime = (orderTime) => {
    const order = new Date(orderTime)
    const diff = Math.floor((currentTime - order) / 1000 / 60)
    return diff
  }

  const getUrgencyColor = (minutes) => {
    if (minutes > 20) return 'border-red-500 bg-red-900/20'
    if (minutes > 10) return 'border-amber-500 bg-amber-900/20'
    return 'border-emerald-500 bg-emerald-900/20'
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ChefHat className="w-7 h-7 text-primary-400" />
          <h1 className="text-2xl font-bold text-white">Kitchen Display</h1>
        </div>
        <div className="text-right">
          <p className="text-3xl font-mono font-bold text-white">{currentTime.toLocaleTimeString()}</p>
          <p className="text-sm text-gray-400">{orders.filter(o => o.status === 'preparing').length} Active • {orders.filter(o => o.status === 'received').length} Pending</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Pending Column */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-gray-300 mb-2">
            <AlertCircle className="w-5 h-5 text-blue-400" />
            <h2 className="font-semibold">Pending ({orders.filter(o => o.status === 'received').length})</h2>
          </div>
          {orders.filter(o => o.status === 'received').map(order => (
            <div key={order.id} className={`p-4 rounded-xl border-2 border-blue-500/30 bg-gray-800 hover:bg-gray-750 transition-all`}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xl font-bold text-white">{order.id}</span>
                <span className="text-sm text-gray-400">{getElapsedTime(order.time)}m ago</span>
              </div>
              <div className="space-y-1 mb-4">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-gray-200">
                    <span className="text-primary-400 font-bold">{item.qty}x</span>
                    <span>{item.name}</span>
                  </div>
                ))}
              </div>
              {order.notes && (
                <p className="text-xs text-amber-400 bg-amber-900/20 p-2 rounded-lg mb-3">📝 {order.notes}</p>
              )}
              <button 
                onClick={() => updateStatus(order.id, 'preparing')}
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                <Flame className="w-4 h-4" /> Start Cooking
              </button>
            </div>
          ))}
        </div>

        {/* Preparing Column */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-gray-300 mb-2">
            <Flame className="w-5 h-5 text-amber-400" />
            <h2 className="font-semibold">Preparing ({orders.filter(o => o.status === 'preparing').length})</h2>
          </div>
          {orders.filter(o => o.status === 'preparing').map(order => (
            <div key={order.id} className={`p-4 rounded-xl border-2 ${getUrgencyColor(getElapsedTime(order.time))}`}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xl font-bold text-white">{order.id}</span>
                <div className="flex items-center gap-1 text-amber-400">
                  <Clock className="w-4 h-4" />
                  <span className="font-mono font-bold">{getElapsedTime(order.time)}m</span>
                </div>
              </div>
              <div className="space-y-1 mb-4">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-gray-200">
                    <span className="text-primary-400 font-bold">{item.qty}x</span>
                    <span>{item.name}</span>
                  </div>
                ))}
              </div>
              <button 
                onClick={() => updateStatus(order.id, 'ready')}
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-4 h-4" /> Mark Ready
              </button>
            </div>
          ))}
        </div>

        {/* Ready Column */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-gray-300 mb-2">
            <CheckCircle className="w-5 h-5 text-emerald-400" />
            <h2 className="font-semibold">Ready ({orders.filter(o => o.status === 'ready').length})</h2>
          </div>
          {orders.filter(o => o.status === 'ready').map(order => (
            <div key={order.id} className="p-4 rounded-xl border-2 border-emerald-500/30 bg-gray-800">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xl font-bold text-white">{order.id}</span>
                <OrderStatusBadge status="ready" size="sm" />
              </div>
              <div className="space-y-1 mb-3">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-gray-200">
                    <span className="text-primary-400 font-bold">{item.qty}x</span>
                    <span>{item.name}</span>
                  </div>
                ))}
              </div>
              <div className="text-sm text-gray-400">
                {order.type === 'dine-in' ? `Table ${order.table}` : `Delivery to ${order.address}`}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}