import { useState } from 'react'
import { Plus, Search, Pencil, Trash2, Eye, EyeOff } from 'lucide-react'
import { MOCK_MENU_ITEMS } from '../../utils/mockData'
import Table from '../../components/common/Table'
import Button from '../../components/common/Button'
import Modal from '../../components/common/Modal'
import Input from '../../components/common/Input'

export default function MenuManagement() {
  const [items, setItems] = useState(MOCK_MENU_ITEMS)
  const [search, setSearch] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingItem, setEditingItem] = useState(null)

  const filteredItems = items.filter(item => 
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    item.category.toLowerCase().includes(search.toLowerCase())
  )

  const columns = [
    { header: 'Item', accessor: 'name', render: (row) => (
      <div className="flex items-center gap-3">
        <img src={row.image} alt={row.name} className="w-10 h-10 rounded-lg object-cover" />
        <div>
          <p className="font-medium text-gray-900">{row.name}</p>
          <p className="text-xs text-gray-500">{row.category}</p>
        </div>
      </div>
    )},
    { header: 'Price', accessor: 'price', render: (row) => <span className="font-medium">৳{row.price}</span> },
    { header: 'Prep Time', accessor: 'prepTime' },
    { header: 'Status', accessor: 'isAvailable', render: (row) => (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${row.isAvailable ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-700'}`}>
        {row.isAvailable ? 'Available' : 'Unavailable'}
      </span>
    )},
    { header: 'Actions', render: (row) => (
      <div className="flex items-center gap-2">
        <button 
          onClick={(e) => { e.stopPropagation(); toggleAvailability(row.id) }}
          className="p-1.5 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg"
          title={row.isAvailable ? 'Hide' : 'Show'}
        >
          {row.isAvailable ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
        <button 
          onClick={(e) => { e.stopPropagation(); openEdit(row) }}
          className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
        >
          <Pencil className="w-4 h-4" />
        </button>
        <button 
          onClick={(e) => { e.stopPropagation(); deleteItem(row.id) }}
          className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    )},
  ]

  const toggleAvailability = (id) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, isAvailable: !item.isAvailable } : item))
  }

  const deleteItem = (id) => {
    if (confirm('Are you sure you want to delete this item?')) {
      setItems(prev => prev.filter(item => item.id !== id))
    }
  }

  const openEdit = (item) => {
    setEditingItem(item)
    setIsModalOpen(true)
  }

  const openAdd = () => {
    setEditingItem(null)
    setIsModalOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="page-title">Menu Management</h1>
        <Button onClick={openAdd}>
          <Plus className="w-4 h-4" /> Add Item
        </Button>
      </div>

      <div className="card">
        <div className="flex items-center gap-3 mb-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search menu items..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
            />
          </div>
        </div>
        <Table columns={columns} data={filteredItems} keyExtractor={(row) => row.id} />
      </div>

      {/* Add/Edit Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={editingItem ? 'Edit Menu Item' : 'Add Menu Item'}
      >
        <div className="space-y-4">
          <Input label="Item Name" defaultValue={editingItem?.name} />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Price (৳)" type="number" defaultValue={editingItem?.price} />
            <Input label="Category" defaultValue={editingItem?.category} />
          </div>
          <Input label="Description" defaultValue={editingItem?.description} />
          <div className="grid grid-cols-2 gap-4">
            <Input label="Prep Time" defaultValue={editingItem?.prepTime} />
            <Input label="Calories" type="number" defaultValue={editingItem?.calories} />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button onClick={() => setIsModalOpen(false)}>Save Item</Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}