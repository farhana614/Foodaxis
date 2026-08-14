import { useState } from 'react'
import { Save, Globe, Bell, Shield, Database } from 'lucide-react'
import Button from '../../components/common/Button'

export default function SystemSettings() {
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="space-y-6">
      <h1 className="page-title">System Settings</h1>

      <div className="grid gap-6 max-w-2xl">
        <div className="card">
          <div className="flex items-center gap-3 mb-4">
            <Globe className="w-5 h-5 text-primary-600" />
            <h3 className="section-title">General</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Platform Name</label>
              <input type="text" defaultValue="FoodAxis" className="input-field" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Default Currency</label>
              <select className="input-field">
                <option value="BDT">BDT (৳)</option>
                <option value="USD">USD ($)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center gap-3 mb-4">
            <Bell className="w-5 h-5 text-primary-600" />
            <h3 className="section-title">Notifications</h3>
          </div>
          <div className="space-y-3">
            {['Enable Email Notifications', 'Enable SMS Alerts', 'Enable Push Notifications'].map((label, idx) => (
              <label key={idx} className="flex items-center justify-between py-2">
                <span className="text-sm text-gray-700">{label}</span>
                <input type="checkbox" defaultChecked className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
              </label>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-5 h-5 text-primary-600" />
            <h3 className="section-title">Security</h3>
          </div>
          <div className="space-y-3">
            {['Require 2FA for Admins', 'Force Password Reset (90 days)', 'Enable Login Alerts'].map((label, idx) => (
              <label key={idx} className="flex items-center justify-between py-2">
                <span className="text-sm text-gray-700">{label}</span>
                <input type="checkbox" defaultChecked={idx === 2} className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
              </label>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button onClick={handleSave}>
            <Save className="w-4 h-4" /> Save Changes
          </Button>
          {saved && <span className="text-sm text-emerald-600 font-medium">Saved successfully!</span>}
        </div>
      </div>
    </div>
  )
}