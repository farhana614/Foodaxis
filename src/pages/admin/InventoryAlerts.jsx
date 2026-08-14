import { AlertTriangle, Package, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { MOCK_INVENTORY } from '../../utils/mockData'
import Button from '../../components/common/Button'

export default function InventoryAlerts() {
  const lowStockItems = MOCK_INVENTORY.filter(item => item.currentStock <= item.minThreshold)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="page-title">Inventory Alerts</h1>
        <Link to="/admin/inventory">
          <Button variant="secondary">Back to Inventory</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card bg-red-50 border-red-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-red-700">{lowStockItems.length}</p>
              <p className="text-sm text-red-600">Critical Items</p>
            </div>
          </div>
        </div>
        <div className="card bg-amber-50 border-amber-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-amber-700">3</p>
              <p className="text-sm text-amber-600">Expiring Soon</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="section-title mb-4">Low Stock Items</h2>
        <div className="space-y-3">
          {lowStockItems.map(item => (
            <div key={item.id} className="flex items-center justify-between p-4 bg-red-50/50 border border-red-100 rounded-xl">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <Package className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{item.name}</p>
                  <p className="text-sm text-gray-500">{item.category} • Supplier: {item.supplier}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-red-600">{item.currentStock} {item.unit}</p>
                <p className="text-xs text-gray-500">Min: {item.minThreshold} {item.unit}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}