import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapPin, CreditCard, Banknote, Wallet, CheckCircle } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import { useOrder } from '../../context/OrderContext'
import Button from '../../components/common/Button'
import Input from '../../components/common/Input'

export default function Checkout() {
  const navigate = useNavigate()
  const { items, totalPrice, clearCart } = useCart()
  const { placeOrder } = useOrder()
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [isProcessing, setIsProcessing] = useState(false)
  const [formData, setFormData] = useState({
    name: 'John Doe',
    phone: '01711111111',
    address: '123 Gulshan Ave, Dhaka',
    notes: '',
  })

  const deliveryFee = 60
  const tax = Math.round(totalPrice * 0.05)
  const grandTotal = totalPrice + deliveryFee + tax

  const handlePlaceOrder = async () => {
    setIsProcessing(true)
    const order = await placeOrder({
      items,
      total: grandTotal,
      deliveryFee,
      tax,
      paymentMethod,
      deliveryAddress: formData.address,
      customerName: formData.name,
      customerPhone: formData.phone,
      notes: formData.notes,
      type: 'delivery',
    })
    clearCart()
    navigate(`/order-confirmation/${order.id}`)
  }

  const paymentMethods = [
    { id: 'card', label: 'Credit/Debit Card', icon: CreditCard },
    { id: 'cash', label: 'Cash on Delivery', icon: Banknote },
    { id: 'wallet', label: 'Digital Wallet', icon: Wallet },
  ]

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="page-title mb-6">Checkout</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="md:col-span-2 space-y-6">
          {/* Delivery Details */}
          <div className="card">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-primary-600" />
              <h3 className="font-semibold text-gray-900">Delivery Details</h3>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Full Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                <Input
                  label="Phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>
              <Input
                label="Delivery Address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Order Notes</label>
                <textarea
                  rows={3}
                  placeholder="Any special instructions..."
                  className="input-field resize-none"
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="card">
            <h3 className="font-semibold text-gray-900 mb-4">Payment Method</h3>
            <div className="space-y-3">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => setPaymentMethod(method.id)}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${
                    paymentMethod === method.id
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-100 hover:border-gray-200'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    paymentMethod === method.id ? 'bg-primary-100 text-primary-600' : 'bg-gray-100 text-gray-500'
                  }`}>
                    <method.icon className="w-5 h-5" />
                  </div>
                  <span className="font-medium text-gray-900 flex-1 text-left">{method.label}</span>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    paymentMethod === method.id ? 'border-primary-600' : 'border-gray-300'
                  }`}>
                    {paymentMethod === method.id && <div className="w-2.5 h-2.5 bg-primary-600 rounded-full" />}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="space-y-4">
          <div className="card">
            <h3 className="font-semibold text-gray-900 mb-4">Order Summary</h3>
            <div className="space-y-3 mb-4">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-gray-600">{item.quantity}x {item.name}</span>
                  <span className="font-medium">৳{item.price * item.quantity}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-100 pt-3 space-y-2 text-sm">
              <div className="flex justify-between text-gray-500">
                <span>Subtotal</span>
                <span>৳{totalPrice}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Delivery</span>
                <span>৳{deliveryFee}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Tax</span>
                <span>৳{tax}</span>
              </div>
            </div>
            <div className="border-t border-gray-100 mt-3 pt-3 flex justify-between font-bold text-lg text-gray-900">
              <span>Total</span>
              <span>৳{grandTotal}</span>
            </div>
            <Button 
              onClick={handlePlaceOrder} 
              isLoading={isProcessing}
              className="w-full mt-4 py-3"
            >
              Place Order
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}