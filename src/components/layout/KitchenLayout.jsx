import { Outlet, Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { 
  ChefHat, ClipboardList, AlertTriangle, LogOut, Menu, X 
} from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'

const navItems = [
  { path: '/kitchen', label: 'Order Display', icon: ClipboardList },
  { path: '/kitchen/prep-guide', label: 'Prep Guide', icon: ChefHat },
]

export default function KitchenLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()
  const { user, logout } = useAuth()

  const isActive = (path) => location.pathname === path

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700">
        <div className="flex items-center justify-between h-16 px-4 lg:px-8">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 text-gray-400 hover:text-white"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 bg-primary-600 rounded-lg flex items-center justify-center">
                <ChefHat className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg">Kitchen Display</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-amber-500/20 text-amber-400 rounded-lg">
              <AlertTriangle className="w-4 h-4" />
              <span className="text-sm font-medium">3 High Priority Orders</span>
            </div>
            <span className="text-sm text-gray-400">{user?.name || 'Chef'}</span>
            <button onClick={logout} className="p-2 text-gray-400 hover:text-white">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/70" onClick={() => setMobileMenuOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-64 bg-gray-800">
            <div className="h-16 flex items-center justify-between px-4 border-b border-gray-700">
              <span className="font-bold">Kitchen</span>
              <button onClick={() => setMobileMenuOpen(false)}>
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
            <nav className="p-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    isActive(item.path) ? 'bg-primary-600 text-white' : 'text-gray-400 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="text-sm">{item.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}

      {/* Desktop Nav */}
      <div className="hidden lg:flex bg-gray-800 border-b border-gray-700">
        <div className="flex px-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-2 px-6 py-3 border-b-2 text-sm font-medium transition-all ${
                isActive(item.path) 
                  ? 'border-primary-500 text-primary-400' 
                  : 'border-transparent text-gray-400 hover:text-gray-200'
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      <main className="p-4 lg:p-6">
        <Outlet />
      </main>
    </div>
  )
}