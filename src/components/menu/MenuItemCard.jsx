import { Plus, Minus, Clock, Flame, Star } from 'lucide-react'
import { useState } from 'react'

export default function MenuItemCard({ item, onAddToCart, compact = false }) {
  const [quantity, setQuantity] = useState(1)

  const handleAdd = () => {
    onAddToCart?.(item, quantity)
    setQuantity(1)
  }

  if (compact) {
    return (
      <div className="flex gap-3 bg-white rounded-xl border border-gray-100 p-3 hover:shadow-card transition-shadow">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-gray-900 text-sm truncate">{item.name}</h3>
            <span className="text-sm font-bold text-primary-600 whitespace-nowrap">৳{item.price}</span>
          </div>
          <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{item.description}</p>
          <div className="flex items-center gap-3 mt-2">
            <span className="flex items-center gap-1 text-xs text-gray-400">
              <Clock className="w-3 h-3" /> {item.prepTime}
            </span>
            <button 
              onClick={handleAdd}
              className="ml-auto w-7 h-7 bg-primary-600 text-white rounded-lg flex items-center justify-center hover:bg-primary-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-card transition-all group">
      <div className="relative">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1">
          <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          <span className="text-xs font-semibold text-gray-700">{item.rating}</span>
        </div>
        {!item.isAvailable && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-white text-gray-900 px-4 py-2 rounded-lg text-sm font-medium">Out of Stock</span>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-semibold text-gray-900">{item.name}</h3>
          <span className="text-lg font-bold text-primary-600">৳{item.price}</span>
        </div>
        
        <p className="text-sm text-gray-500 mb-3 line-clamp-2">{item.description}</p>
        
        <div className="flex items-center gap-4 mb-4 text-xs text-gray-400">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> {item.prepTime}
          </span>
          <span className="flex items-center gap-1">
            <Flame className="w-3.5 h-3.5" /> {item.calories} cal
          </span>
        </div>

        {item.isAvailable && (
          <div className="flex items-center gap-3">
            <div className="flex items-center border border-gray-200 rounded-lg">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-9 h-9 flex items-center justify-center text-gray-500 hover:bg-gray-50 rounded-l-lg"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-10 text-center text-sm font-medium">{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="w-9 h-9 flex items-center justify-center text-gray-500 hover:bg-gray-50 rounded-r-lg"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <button 
              onClick={handleAdd}
              className="flex-1 btn-primary text-sm py-2.5"
            >
              Add to Cart
            </button>
          </div>
        )}
      </div>
    </div>
  )
}