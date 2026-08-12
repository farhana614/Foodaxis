import { useState } from 'react'
import { User, Mail, Phone, MapPin, Camera } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import Input from '../../components/common/Input'
import Button from '../../components/common/Button'

export default function CustomerProfile() {
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || 'John Doe',
    email: user?.email || 'john@email.com',
    phone: user?.phone || '01711111111',
    address: '123 Gulshan Ave, Dhaka',
  })

  const handleSave = () => {
    setIsEditing(false)
    // API call to update profile
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="page-title mb-6">My Profile</h1>

      <div className="card">
        {/* Avatar */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative">
            <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center text-3xl font-bold text-primary-700">
              {formData.name[0]}
            </div>
            <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center shadow-md hover:bg-primary-700">
              <Camera className="w-4 h-4" />
            </button>
          </div>
          <h2 className="text-xl font-bold text-gray-900 mt-3">{formData.name}</h2>
          <p className="text-gray-500 text-sm">Member since 2025</p>
        </div>

        <div className="space-y-4">
          <Input
            label="Full Name"
            icon={User}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            disabled={!isEditing}
          />
          <Input
            label="Email"
            icon={Mail}
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            disabled={!isEditing}
          />
          <Input
            label="Phone"
            icon={Phone}
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            disabled={!isEditing}
          />
          <Input
            label="Address"
            icon={MapPin}
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            disabled={!isEditing}
          />
        </div>

        <div className="mt-6">
          {isEditing ? (
            <div className="flex gap-3">
              <Button onClick={handleSave} className="flex-1">Save Changes</Button>
              <Button variant="secondary" onClick={() => setIsEditing(false)} className="flex-1">Cancel</Button>
            </div>
          ) : (
            <Button onClick={() => setIsEditing(true)} className="w-full">Edit Profile</Button>
          )}
        </div>
      </div>
    </div>
  )
}