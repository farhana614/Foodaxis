import { Outlet, Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { 
  Shield, LayoutDashboard, Store, Users, Settings, 
  Menu, X, LogOut, Bell 
} from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'

const navItems = [
  { path: '/superadmin', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/superadmin/restaurants', label: 'Restaurants', icon: Store },
  { path: '/superadmin/users', label: 'Users', icon: Users },
]

export default function SuperAdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()
  const { user, logout } = useAuth()

  const isActive = (path) => location.pathname === path

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Desktop Sidebar */}
      <aside className={`hidden lg:flex flex-col bg-slate-900 text-white transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-20'}`}>
        <div className="h-16 flex items-center px-4 border-b border-slate-800">
          <div className={`flex items-center gap-2 ${!sidebarOpen && 'justify-center w-full'}`}>
            <div className="w-9 h-9 bg-primary-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <Shield className="w-5 h-5 text-white" />
            </div>
            {sidebarOpen && <span className="font-bold">Super Admin</span>}
          </div>
        </div>

        <nav className="flex-1 py-4 px-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive(item.path) ? 'bg-primary-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              } ${!sidebarOpen && 'justify-center'}`}
              title={!sidebarOpen ? item.label : ''}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {sidebarOpen && <span className="text-sm">{item.label}</span>}
            </Link>
          ))}
        </nav>

        <div className="p-3 border-t border-slate-800">
          <button 
            onClick={logout}
            className={`flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-slate-800 rounded-lg w-full transition-all ${!sidebarOpen && 'justify-center'}`}
          >
            <LogOut className="w-5 h-5" />
            {sidebarOpen && <span className="text-sm">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileMenuOpen(false)} />
          <div className="absolute left-0 top-0 bottom-0 w-64 bg-slate-900 text-white">
            <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800">
              <span className="font-bold">Super Admin</span>
              <button onClick={() => setMobileMenuOpen(false)}>
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>
            <nav className="p-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    isActive(item.path) ? 'bg-primary-600 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
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

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-8">
          <div className="flex items-center gap-4">
            <button onClick={() => setMobileMenuOpen(true)} className="lg:hidden p-2 text-gray-500">
              <Menu className="w-5 h-5" />
            </button>
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="hidden lg:block p-2 text-gray-500 hover:text-gray-700">
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-lg font-semibold text-gray-900">System Administration</h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-gray-500 hover:text-gray-700">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="w-9 h-9 bg-slate-100 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-slate-700">{user?.name?.charAt(0) || 'S'}</span>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}