import { useParams, Link } from 'react-router-dom'
import { CheckCircle, Clock, MapPin, Phone } from 'lucide-react'
import Button from '../../components/common/Button'

export default function OrderConfirmation() {
  const { id } = useParams()

  return (
    <div className="max-w-lg mx-auto text-center py-12">
      <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle className="w-10 h-10 text-emerald-600" />
      </div>
      
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
      <p className="text-gray-500 mb-2">Your order has been placed successfully</p>
      <p className="text-primary-600 font-semibold text-lg mb-8">Order #{id}</p>

      <div className="bg-white rounded-xl border border-gray-100 p-6 text-left space-y-4 mb-8">
        <div className="flex items-center gap-3">
          <Clock className="w-5 h-5 text-primary-600" />
          <div>
            <p className="text-sm text-gray-500">Estimated Delivery</p>
            <p className="font-semibold text-gray-900">25 - 35 minutes</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <MapPin className="w-5 h-5 text-primary-600" />
          <div>
            <p className="text-sm text-gray-500">Delivering to</p>
            <p className="font-semibold text-gray-900">123 Gulshan Ave, Dhaka</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Phone className="w-5 h-5 text-primary-600" />
          <div>
            <p className="text-sm text-gray-500">Contact</p>
            <p className="font-semibold text-gray-900">01711111111</p>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <Link to={`/track/${id}`} className="flex-1">
          <Button className="w-full">Track Order</Button>
        </Link>
        <Link to="/menu" className="flex-1">
          <Button variant="secondary" className="w-full">Order More</Button>
        </Link>
      </div>
    </div>
  )
}