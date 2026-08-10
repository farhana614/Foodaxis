import { Outlet, Link, useLocation } from 'react-router-dom'
import { 
  Bike, Package, MapPin, DollarSign, LogOut 
} from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'

const navItems = [
  { path: '/rider', label: 'Dashboard', icon: Bike },
  { path: '/rider/orders', label: 'My Orders', icon: Package },
  { path: '/rider/tracking', label: 'Live Map', icon: MapPin },
]

export default function RiderLayout() {
  const location = useLocation()
  const { user, logout } = useAuth()
  const isActive = (path) => location.pathname === path

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-primary-600 rounded-lg flex items-center justify-center">
              <Bike className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-gray-900">Rider Portal</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-lg text-sm font-medium">
              <DollarSign className="w-4 h-4" />
              <span>BDT 1,240 Today</span>
            </div>
            <span className="text-sm text-gray-600 hidden md:block">{user?.name}</span>
            <button onClick={logout} className="p-2 text-gray-500 hover:text-gray-700">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 pb-24 lg:pb-4">
        <Outlet />
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 lg:hidden z-50">
        <div className="flex items-center justify-around">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center gap-1 py-3 px-4 ${
                isActive(item.path) ? 'text-primary-600' : 'text-gray-400'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  )
}