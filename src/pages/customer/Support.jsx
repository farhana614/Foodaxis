import { useState } from 'react'
import { MessageCircle, Phone, Mail, Send, CheckCircle } from 'lucide-react'
import Input from '../../components/common/Input'
import Button from '../../components/common/Button'

export default function Support() {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    subject: '',
    message: '',
    orderId: '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="max-w-lg mx-auto text-center py-16">
        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-emerald-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Request Submitted!</h2>
        <p className="text-gray-500">We'll get back to you within 24 hours.</p>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="page-title mb-6">Customer Support</h1>

      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        {[
          { icon: Phone, label: 'Call Us', value: '01999999999' },
          { icon: Mail, label: 'Email', value: 'support@foodaxis.com' },
          { icon: MessageCircle, label: 'Live Chat', value: 'Available 9AM-10PM' },
        ].map((contact, idx) => (
          <div key={idx} className="card text-center">
            <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center mx-auto mb-2">
              <contact.icon className="w-5 h-5 text-primary-600" />
            </div>
            <p className="text-xs text-gray-500">{contact.label}</p>
            <p className="text-sm font-semibold text-gray-900">{contact.value}</p>
          </div>
        ))}
      </div>

      <div className="card">
        <h3 className="section-title mb-4">Send us a message</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Subject"
            placeholder="How can we help?"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            required
          />
          <Input
            label="Order ID (optional)"
            placeholder="e.g., ORD-001"
            value={formData.orderId}
            onChange={(e) => setFormData({ ...formData, orderId: e.target.value })}
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Message</label>
            <textarea
              rows={5}
              placeholder="Describe your issue..."
              className="input-field resize-none"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
            />
          </div>
          <Button type="submit" className="w-full">
            <Send className="w-4 h-4" /> Submit Request
          </Button>
        </form>
      </div>
    </div>
  )
}