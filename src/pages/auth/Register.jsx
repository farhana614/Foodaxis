import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Eye, EyeOff, Mail, Lock, User, Phone, MapPin } from 'lucide-react'
import Input from '../../components/common/Input'
import Button from '../../components/common/Button'

export default function Register() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    confirmPassword: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle registration
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Create Account</h2>
        <p className="text-gray-500 mt-1">Join FoodAxis today</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Full Name"
          placeholder="John Doe"
          icon={User}
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />

        <Input
          label="Email"
          type="email"
          placeholder="you@example.com"
          icon={Mail}
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />

        <Input
          label="Phone"
          placeholder="017XXXXXXXX"
          icon={Phone}
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          required
        />

        <Input
          label="Delivery Address"
          placeholder="123 Main St, Dhaka"
          icon={MapPin}
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
        />

        <div className="relative">
          <Input
            label="Password"
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            icon={Lock}
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-[38px] text-gray-400 hover:text-gray-600"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        </div>

        <Input
          label="Confirm Password"
          type="password"
          placeholder="••••••••"
          icon={Lock}
          value={formData.confirmPassword}
          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
          required
        />

        <Button type="submit" className="w-full">
          Create Account
        </Button>
      </form>

      <p className="text-center text-sm text-gray-500 mt-6">
        Already have an account?{' '}
        <Link to="/login" className="text-primary-600 hover:text-primary-700 font-medium">
          Sign in
        </Link>
      </p>
    </div>
  )
}