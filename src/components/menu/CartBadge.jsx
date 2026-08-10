import { ShoppingCart } from 'lucide-react'

export default function CartBadge({ count, total, onClick }) {
  return (
    <button 
      onClick={onClick}
      className="fixed bottom-6 right-6 z-40 bg-primary-600 text-white rounded-2xl shadow-lg hover:bg-primary-700 transition-all flex items-center gap-3 px-5 py-3.5"
    >
      <div className="relative">
        <ShoppingCart className="w-5 h-5" />
        <span className="absolute -top-2 -right-2 w-5 h-5 bg-white text-primary-600 text-xs font-bold rounded-full flex items-center justify-center">
          {count}
        </span>
      </div>
      <div className="text-left">
        <p className="text-xs text-primary-100">Total</p>
        <p className="font-bold text-sm">৳{total}</p>
      </div>
    </button>
  )
}