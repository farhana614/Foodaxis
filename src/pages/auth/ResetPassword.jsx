import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Lock, ArrowLeft, CheckCircle } from 'lucide-react'
import Input from '../../components/common/Input'
import Button from '../../components/common/Button'

export default function ResetPassword() {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({ password: '', confirmPassword: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="w-full max-w-md mx-auto text-center">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-emerald-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Password reset!</h2>
        <p className="text-gray-500 mt-2">Your password has been successfully updated.</p>
        <Link to="/login" className="btn-primary inline-block mt-6">Sign in</Link>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Reset password</h2>
        <p className="text-gray-500 mt-1">Enter your new password below</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="New Password"
          type="password"
          placeholder="••••••••"
          icon={Lock}
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
        />

        <Input
          label="Confirm New Password"
          type="password"
          placeholder="••••••••"
          icon={Lock}
          value={formData.confirmPassword}
          onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
          required
        />

        <Button type="submit" className="w-full">
          Reset Password
        </Button>
      </form>

      <Link to="/login" className="flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-gray-700 mt-6">
        <ArrowLeft className="w-4 h-4" /> Back to login
      </Link>
    </div>
  )
}