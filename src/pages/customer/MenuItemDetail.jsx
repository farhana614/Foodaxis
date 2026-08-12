import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Plus, Minus, Clock, Flame, Star, Heart } from 'lucide-react'
import { useState } from 'react'
import { useMenu } from '../../hooks/useMenu'
import { useCart } from '../../context/CartContext'
import Button from '../../components/common/Button'

export default function MenuItemDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getItemById } = useMenu()
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [liked, setLiked] = useState(false)

  const item = getItemById(id)

  if (!item) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500">Item not found</p>
        <Button onClick={() => navigate('/menu')} className="mt-4">Back to Menu</Button>
      </div>
    )
  }

  const handleAddToCart = () => {
    addItem(item, quantity)
    navigate('/cart')
  }

  return (
    <div className="max-w-4xl mx-auto">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-4">
        <ArrowLeft className="w-5 h-5" /> Back
      </button>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Image */}
        <div className="relative">
          <img src={item.image} alt={item.name} className="w-full h-80 md:h-96 object-cover rounded-2xl" />
          <button 
            onClick={() => setLiked(!liked)}
            className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md"
          >
            <Heart className={`w-5 h-5 ${liked ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
          </button>
        </div>

        {/* Details */}
        <div className="space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{item.name}</h1>
              <div className="flex items-center gap-2 mt-1">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span className="text-sm font-medium">{item.rating}</span>
                <span className="text-gray-300">|</span>
                <span className="text-sm text-gray-500">{item.category}</span>
              </div>
            </div>
            <span className="text-2xl font-bold text-primary-600">৳{item.price}</span>
          </div>

          <p className="text-gray-600">{item.description}</p>

          <div className="flex items-center gap-6 py-4 border-y border-gray-100">
            <span className="flex items-center gap-2 text-sm text-gray-500">
              <Clock className="w-4 h-4" /> {item.prepTime}
            </span>
            <span className="flex items-center gap-2 text-sm text-gray-500">
              <Flame className="w-4 h-4" /> {item.calories} cal
            </span>
          </div>

          {/* Quantity */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">Quantity</label>
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-gray-200 rounded-xl">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 flex items-center justify-center text-gray-500 hover:bg-gray-50 rounded-l-xl"
                >
                  <Minus className="w-5 h-5" />
                </button>
                <span className="w-16 text-center text-lg font-semibold">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 flex items-center justify-center text-gray-500 hover:bg-gray-50 rounded-r-xl"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">Total</p>
                <p className="text-xl font-bold text-gray-900">৳{item.price * quantity}</p>
              </div>
            </div>
          </div>

          <Button onClick={handleAddToCart} className="w-full py-3 text-lg">
            Add to Cart - ৳{item.price * quantity}
          </Button>
        </div>
      </div>
    </div>
  )
}