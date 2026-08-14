import { useState } from 'react'
import { Trash2, Plus, AlertTriangle } from 'lucide-react'
import { MOCK_ANALYTICS } from '../../utils/mockData'
import Button from '../../components/common/Button'
import Modal from '../../components/common/Modal'
import Input from '../../components/common/Input'

export default function WasteLog() {
  const [wasteItems, setWasteItems] = useState(MOCK_ANALYTICS.wasteData.topWastedItems)
  const [modalOpen, setModalOpen] = useState(false)

  const totalWaste = wasteItems.reduce((sum, item) => sum + item.cost, 0)

  const addWaste = (e) => {
    e.preventDefault()
    const form = e.target
    const newItem = {
      name: form.itemName.value,
      quantity: form.quantity.value,
      cost: Number(form.cost.value),
      reason: form.reason.value,
    }
    setWasteItems([newItem, ...wasteItems])
    setModalOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Waste Log</h1>
        <Button onClick={() => setModalOpen(true)}>
          <Plus className="w-4 h-4" /> Log Waste
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
          <p className="text-sm text-gray-400">Today's Waste Cost</p>
          <p className="text-2xl font-bold text-red-400">৳{totalWaste}</p>
        </div>
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
          <p className="text-sm text-gray-400">Waste Reduction</p>
          <p className="text-2xl font-bold text-emerald-400">{MOCK_ANALYTICS.wasteData.wasteReduction}%</p>
        </div>
        <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
          <p className="text-sm text-gray-400">Items Wasted</p>
          <p className="text-2xl font-bold text-amber-400">{wasteItems.length}</p>
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase">Item</th>
              <th className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase">Quantity</th>
              <th className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase">Cost</th>
              <th className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase">Reason</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {wasteItems.map((item, idx) => (
              <tr key={idx} className="hover:bg-gray-750">
                <td className="px-4 py-3 text-white font-medium">{item.name}</td>
                <td className="px-4 py-3 text-gray-300">{item.quantity}</td>
                <td className="px-4 py-3 text-red-400 font-medium">৳{item.cost}</td>
                <td className="px-4 py-3">
                  <span className="px-2 py-1 bg-gray-700 text-gray-300 rounded-lg text-xs capitalize">
                    {item.reason || 'over-prepared'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Log Waste" size="md">
        <form onSubmit={addWaste} className="space-y-4">
          <Input label="Item Name" name="itemName" required />
          <Input label="Quantity Wasted" name="quantity" placeholder="e.g., 2.5 kg" required />
          <Input label="Cost (৳)" name="cost" type="number" required />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Reason</label>
            <select name="reason" className="input-field">
              <option value="over-prepared">Over-prepared</option>
              <option value="expired">Expired</option>
              <option value="spoilage">Spoilage</option>
              <option value="customer-return">Customer Return</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button type="submit">Log Waste</Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}