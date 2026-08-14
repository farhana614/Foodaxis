import { useState } from 'react'
import { Plus, Search, Pencil, Store, Phone, MapPin } from 'lucide-react'
import { MOCK_RESTAURANTS } from '../../utils/mockData'
import Table from '../../components/common/Table'
import Button from '../../components/common/Button'
import Modal from '../../components/common/Modal'
import Input from '../../components/common/Input'

export default function Restaurants() {
  const [restaurants, setRestaurants] = useState(MOCK_RESTAURANTS)
  const [modalOpen, setModalOpen] = useState(false)

  const columns = [
    { header: 'Restaurant', accessor: 'name', render: (row) => (
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center">
          <Store className="w-5 h-5 text-primary-600" />
        </div>
        <div>
          <p className="font-medium text-gray-900">{row.name}</p>
          <p className="text-xs text-gray-500 flex items-center gap-1">
            <MapPin className="w-3 h-3" /> {row.address}
          </p>
        </div>
      </div>
    )},
    { header: 'Manager', accessor: 'manager' },
    { header: 'Contact', render: (row) => (
      <span className="flex items-center gap-1 text-sm text-gray-600">
        <Phone className="w-3.5 h-3.5" /> {row.phone}
      </span>
    )},
    { header: 'Status', accessor: 'status', render: (row) => (
      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
        row.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600'
      }`}>
        {row.status}
      </span>
    )},
    { header: 'Today', render: (row) => (
      <div className="text-sm">
        <p className="font-medium text-gray-900">{row.ordersToday} orders</p>
        <p className="text-xs text-gray-500">৳{row.revenueToday.toLocaleString()}</p>
      </div>
    )},
    { header: 'Actions', render: () => (
      <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
        <Pencil className="w-4 h-4" />
      </button>
    )},
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="page-title">Restaurants</h1>
        <Button onClick={() => setModalOpen(true)}>
          <Plus className="w-4 h-4" /> Add Restaurant
        </Button>
      </div>

      <div className="card">
        <div className="flex items-center gap-3 mb-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search restaurants..."
              className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20"
            />
          </div>
        </div>
        <Table columns={columns} data={restaurants} keyExtractor={(row) => row.id} />
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Add Restaurant" size="md">
        <div className="space-y-4">
          <Input label="Restaurant Name" />
          <Input label="Address" />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Phone" />
            <Input label="Email" type="email" />
          </div>
          <Input label="Manager Name" />
          <div className="flex justify-end gap-3">
            <Button variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button onClick={() => setModalOpen(false)}>Add Restaurant</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}