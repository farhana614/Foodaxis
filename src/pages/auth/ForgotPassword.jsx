import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react'
import Input from '../../components/common/Input'
import Button from '../../components/common/Button'

export default function ForgotPassword() {
  const [submitted, setSubmitted] = useState(false)
  const [email, setEmail] = useState('')

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
        <h2 className="text-2xl font-bold text-gray-900">Check your email</h2>
        <p className="text-gray-500 mt-2">
          We've sent a password reset link to <span className="font-medium text-gray-700">{email}</span>
        </p>
        <Link to="/login" className="btn-primary inline-flex items-center gap-2 mt-6">
          <ArrowLeft className="w-4 h-4" /> Back to login
        </Link>
      </div>
    )
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Forgot password?</h2>
        <p className="text-gray-500 mt-1">Enter your email to receive a reset link</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Email"
          type="email"
          placeholder="you@example.com"
          icon={Mail}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Button type="submit" className="w-full">
          Send Reset Link
        </Button>
      </form>

      <Link to="/login" className="flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-gray-700 mt-6">
        <ArrowLeft className="w-4 h-4" /> Back to login
      </Link>
    </div>
  )
}