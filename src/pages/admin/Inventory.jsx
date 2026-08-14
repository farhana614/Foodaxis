import { useState } from 'react'
import { Search, Plus, Minus, AlertTriangle, Package } from 'lucide-react'
import { MOCK_INVENTORY } from '../../utils/mockData'
import Table from '../../components/common/Table'
import Button from '../../components/common/Button'
import Modal from '../../components/common/Modal'
import Input from '../../components/common/Input'

export default function Inventory() {
  const [items, setItems] = useState(MOCK_INVENTORY)
  const [search, setSearch] = useState('')
  const [adjustModal, setAdjustModal] = useState({ open: false, item: null, type: 'add' })

  const filteredItems = items.filter(item => 
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    item.category.toLowerCase().includes(search.toLowerCase())
  )

  const getStockColor = (current, min) => {
    if (current <= min) return 'text-red-600 font-bold'
    if (current <= min * 1.5) return 'text-amber-600 font-medium'
    return 'text-emerald-600'
  }

  const columns = [
    { header: 'Item', accessor: 'name', render: (row) => (
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 bg-gray-100 rounded-lg flex items-center justify-center">
          <Package className="w-4 h-4 text-gray-500" />
        </div>
        <div>
          <p className="font-medium text-gray-900">{row.name}</p>
          <p className="text-xs text-gray-500">{row.category}</p>
        </div>
      </div>
    )},
    { header: 'Current Stock', accessor: 'currentStock', render: (row) => (
      <span className={getStockColor(row.currentStock, row.minThreshold)}>
        {row.currentStock} {row.unit}
      </span>
    )},
    { header: 'Min Threshold', accessor: 'minThreshold', render: (row) => `${row.minThreshold} ${row.unit}` },
    { header: 'Max Stock', accessor: 'maxStock', render: (row) => `${row.maxStock} ${row.unit}` },
    { header: 'Supplier', accessor: 'supplier' },
    { header: 'Status', render: (row) => (
      row.currentStock <= row.minThreshold ? (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
          <AlertTriangle className="w-3 h-3" /> Low
        </span>
      ) : (
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700">OK</span>
      )
    )},
    { header: 'Actions', render: (row) => (
      <div className="flex items-center gap-1">
        <button 
          onClick={() => setAdjustModal({ open: true, item: row, type: 'remove' })}
          className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
        >
          <Minus className="w-4 h-4" />
        </button>
        <button 
          onClick={() => setAdjustModal({ open: true, item: row, type: 'add' })}
          className="p-1.5 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    )},
  ]

  const handleAdjust = (quantity) => {
    const { item, type } = adjustModal
    const newQty = type === 'add' 
      ? item.currentStock + Number(quantity)
      : Math.max(0, item.currentStock - Number(quantity))
    
    setItems(prev => prev.map(i => i.id === item.id ? { ...i, currentStock: newQty } : i))
    setAdjustModal({ open: false, item: null, type: 'add' })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="page-title">Inventory</h1>
        <div className="flex gap-3">
          <Button variant="secondary" onClick={() => {}}>
            <AlertTriangle className="w-4 h-4" /> View Alerts
          </Button>
          <Button onClick={() => {}}>
            <Plus className="w-4 h-4" /> Add Item
          </Button>
        </div>
      </div>

      <div className="card">
        <div className="flex items-center gap-3 mb-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search inventory..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20"
            />
          </div>
        </div>
        <Table columns={columns} data={filteredItems} keyExtractor={(row) => row.id} />
      </div>

      {/* Adjust Stock Modal */}
      <Modal 
        isOpen={adjustModal.open} 
        onClose={() => setAdjustModal({ open: false, item: null, type: 'add' })}
        title={`${adjustModal.type === 'add' ? 'Add' : 'Deduct'} Stock`}
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-600">
            {adjustModal.item?.name} — Current: <span className="font-semibold">{adjustModal.item?.currentStock} {adjustModal.item?.unit}</span>
          </p>
          <Input 
            label={`Quantity to ${adjustModal.type}`} 
            type="number" 
            defaultValue="1"
            id="adjustQty"
          />
          <div className="flex justify-end gap-3">
            <Button variant="secondary" onClick={() => setAdjustModal({ open: false, item: null, type: 'add' })}>Cancel</Button>
            <Button onClick={() => handleAdjust(document.getElementById('adjustQty').value)}>Confirm</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}