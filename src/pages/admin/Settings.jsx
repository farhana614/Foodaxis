import { useState } from 'react'
import { Store, Clock, Bell, Shield, Save } from 'lucide-react'
import Input from '../../components/common/Input'
import Button from '../../components/common/Button'

export default function Settings() {
  const [activeTab, setActiveTab] = useState('general')
  const [saved, setSaved] = useState(false)

  const tabs = [
    { id: 'general', label: 'General', icon: Store },
    { id: 'hours', label: 'Business Hours', icon: Clock },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
  ]

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="space-y-6">
      <h1 className="page-title">Settings</h1>

      <div className="flex gap-1 bg-gray-100 p-1 rounded-xl w-fit">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab.id ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <tab.icon className="w-4 h-4" /> {tab.label}
          </button>
        ))}
      </div>

      <div className="card max-w-2xl">
        {activeTab === 'general' && (
          <div className="space-y-4">
            <h3 className="section-title">Restaurant Information</h3>
            <Input label="Restaurant Name" defaultValue="FoodAxis Main Branch" />
            <Input label="Address" defaultValue="123 Gulshan Ave, Dhaka" />
            <div className="grid grid-cols-2 gap-4">
              <Input label="Phone" defaultValue="01999999999" />
              <Input label="Email" defaultValue="info@foodaxis.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
              <textarea rows={3} className="input-field resize-none" defaultValue="Best restaurant in Dhaka serving fresh, delicious food." />
            </div>
          </div>
        )}

        {activeTab === 'hours' && (
          <div className="space-y-4">
            <h3 className="section-title">Business Hours</h3>
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
              <div key={day} className="flex items-center gap-4">
                <span className="w-24 text-sm font-medium text-gray-700">{day}</span>
                <input type="time" defaultValue="09:00" className="input-field w-32" />
                <span className="text-gray-400">to</span>
                <input type="time" defaultValue="22:00" className="input-field w-32" />
                <label className="flex items-center gap-2 text-sm text-gray-600">
                  <input type="checkbox" defaultChecked className="rounded border-gray-300 text-primary-600" />
                  Open
                </label>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="space-y-4">
            <h3 className="section-title">Notification Preferences</h3>
            {[
              { label: 'New Order Alerts', desc: 'Get notified when a new order is placed', checked: true },
              { label: 'Low Stock Alerts', desc: 'Get notified when inventory is running low', checked: true },
              { label: 'Delivery Updates', desc: 'Get notified about delivery status changes', checked: true },
              { label: 'Customer Feedback', desc: 'Get notified about new reviews', checked: false },
            ].map((item, idx) => (
              <div key={idx} className="flex items-start justify-between py-3 border-b border-gray-50 last:border-0">
                <div>
                  <p className="font-medium text-gray-900 text-sm">{item.label}</p>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" defaultChecked={item.checked} className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'security' && (
          <div className="space-y-4">
            <h3 className="section-title">Change Password</h3>
            <Input label="Current Password" type="password" />
            <Input label="New Password" type="password" />
            <Input label="Confirm New Password" type="password" />
          </div>
        )}

        <div className="mt-6 pt-6 border-t border-gray-100 flex items-center gap-3">
          <Button onClick={handleSave}>
            <Save className="w-4 h-4" /> Save Changes
          </Button>
          {saved && <span className="text-sm text-emerald-600 font-medium">Settings saved!</span>}
        </div>
      </div>
    </div>
  )
}