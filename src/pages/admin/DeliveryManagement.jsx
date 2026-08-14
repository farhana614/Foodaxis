import { useState } from 'react'
import { Truck, MapPin, Phone, Star, CheckCircle } from 'lucide-react'
import { MOCK_RIDERS, MOCK_ORDERS } from '../../utils/mockData'
import Table from '../../components/common/Table'
import Button from '../../components/common/Button'

export default function DeliveryManagement() {
  const [riders, setRiders] = useState(MOCK_RIDERS)
  const [orders, setOrders] = useState(MOCK_ORDERS.filter(o => o.type === 'delivery' && o.status !== 'delivered'))

  const assignRider = (orderId, riderId) => {
    const rider = riders.find(r => r.id === riderId)
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, rider: rider.name, status: 'out_for_delivery' } : o))
    setRiders(prev => prev.map(r => r.id === riderId ? { ...r, status: 'busy' } : r))
  }

  const riderColumns = [
    { header: 'Rider', accessor: 'name', render: (row) => (
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 bg-violet-100 rounded-full flex items-center justify-center">
          <span className="font-bold text-violet-700 text-sm">{row.name[0]}</span>
        </div>
        <div>
          <p className="font-medium text-gray-900">{row.name}</p>
          <p className="text-xs text-gray-500">{row.vehicle} • {row.vehicleNumber}</p>
        </div>
      </div>
    )},
    { header: 'Status', render: (row) => (
      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
        row.status === 'available' ? 'bg-emerald-100 text-emerald-700' :
        row.status === 'busy' ? 'bg-amber-100 text-amber-700' :
        'bg-gray-100 text-gray-700'
      }`}>
        {row.status}
      </span>
    )},
    { header: 'Rating', render: (row) => (
      <div className="flex items-center gap-1">
        <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
        <span className="text-sm font-medium">{row.rating}</span>
      </div>
    )},
    { header: 'Deliveries', accessor: 'totalDeliveries' },
    { header: 'Contact', render: (row) => (
      <a href={`tel:${row.phone}`} className="flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700">
        <Phone className="w-3.5 h-3.5" /> {row.phone}
      </a>
    )},
  ]

  return (
    <div className="space-y-6">
      <h1 className="page-title">Delivery Management</h1>

      {/* Pending Deliveries */}
      <div className="card">
        <h2 className="section-title mb-4">Pending Deliveries</h2>
        {orders.length > 0 ? (
          <div className="space-y-4">
            {orders.map(order => (
              <div key={order.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-gray-50 rounded-xl">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-900">{order.id}</span>
                    <span className="text-xs text-gray-500">{order.customer}</span>
                  </div>
                  <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                    <MapPin className="w-3.5 h-3.5" /> {order.address}
                  </p>
                </div>
                {order.status === 'ready' ? (
                  <div className="flex items-center gap-2">
                    <select 
                      className="text-sm border border-gray-200 rounded-lg px-3 py-2 bg-white"
                      onChange={(e) => e.target.value && assignRider(order.id, Number(e.target.value))}
                      defaultValue=""
                    >
                      <option value="" disabled>Assign Rider</option>
                      {riders.filter(r => r.status === 'available').map(r => (
                        <option key={r.id} value={r.id}>{r.name}</option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-sm text-violet-600">
                    <Truck className="w-4 h-4" /> {order.rider}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500 text-sm">No pending deliveries</div>
        )}
      </div>

      {/* Riders Table */}
      <div className="card">
        <h2 className="section-title mb-4">Riders</h2>
        <Table columns={riderColumns} data={riders} keyExtractor={(row) => row.id} />
      </div>
    </div>
  )
}