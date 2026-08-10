import { Outlet, Link, useLocation } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import { 
  Home, Search, ShoppingCart, User, UtensilsCrossed, 
  MapPin, Phone, Clock, Star 
} from 'lucide-react'

export default function CustomerLayout() {
  const { totalItems } = useCart()
  const location = useLocation()
  const isActive = (path) => location.pathname === path

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-9 h-9 bg-primary-600 rounded-lg flex items-center justify-center">
                <UtensilsCrossed className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">FoodAxis</span>
            </Link>

            <div className="hidden md:flex items-center gap-6">
              <Link to="/" className={`text-sm font-medium ${isActive('/') ? 'text-primary-600' : 'text-gray-600 hover:text-gray-900'}`}>
                Home
              </Link>
              <Link to="/menu" className={`text-sm font-medium ${isActive('/menu') ? 'text-primary-600' : 'text-gray-600 hover:text-gray-900'}`}>
                Menu
              </Link>
              <Link to="/orders" className={`text-sm font-medium ${isActive('/orders') ? 'text-primary-600' : 'text-gray-600 hover:text-gray-900'}`}>
                My Orders
              </Link>
            </div>

            <div className="flex items-center gap-3">
              <Link to="/cart" className="relative p-2 text-gray-600 hover:text-gray-900">
                <ShoppingCart className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary-600 text-white text-xs rounded-full flex items-center justify-center font-medium">
                    {totalItems}
                  </span>
                )}
              </Link>
              <Link to="/profile" className="p-2 text-gray-600 hover:text-gray-900">
                <User className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Outlet />
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <div className="flex items-center justify-around py-2">
          <Link to="/" className={`flex flex-col items-center gap-1 p-2 ${isActive('/') ? 'text-primary-600' : 'text-gray-400'}`}>
            <Home className="w-5 h-5" />
            <span className="text-xs">Home</span>
          </Link>
          <Link to="/menu" className={`flex flex-col items-center gap-1 p-2 ${isActive('/menu') ? 'text-primary-600' : 'text-gray-400'}`}>
            <Search className="w-5 h-5" />
            <span className="text-xs">Menu</span>
          </Link>
          <Link to="/cart" className={`flex flex-col items-center gap-1 p-2 ${isActive('/cart') ? 'text-primary-600' : 'text-gray-400'}`}>
            <ShoppingCart className="w-5 h-5" />
            <span className="text-xs">Cart</span>
          </Link>
          <Link to="/orders" className={`flex flex-col items-center gap-1 p-2 ${isActive('/orders') ? 'text-primary-600' : 'text-gray-400'}`}>
            <Clock className="w-5 h-5" />
            <span className="text-xs">Orders</span>
          </Link>
          <Link to="/profile" className={`flex flex-col items-center gap-1 p-2 ${isActive('/profile') ? 'text-primary-600' : 'text-gray-400'}`}>
            <User className="w-5 h-5" />
            <span className="text-xs">Profile</span>
          </Link>
        </div>
      </nav>

      {/* Footer */}
      <footer className="hidden md:block bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <UtensilsCrossed className="w-5 h-5 text-primary-600" />
              <span className="font-semibold text-gray-900">FoodAxis</span>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <span className="flex items-center gap-1"><Phone className="w-4 h-4" /> Support</span>
              <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> Dhaka, Bangladesh</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}