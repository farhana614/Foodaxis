import { Outlet } from 'react-router-dom'
import { UtensilsCrossed } from 'lucide-react'

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary-600 text-white flex-col justify-between p-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <UtensilsCrossed className="w-7 h-7" />
            </div>
            <span className="text-2xl font-bold">FoodAxis</span>
          </div>
          <h1 className="text-4xl font-bold leading-tight mb-4">
            Smart Restaurant<br />Operations Platform
          </h1>
          <p className="text-primary-100 text-lg max-w-md">
            Streamline your restaurant with AI-powered inventory, delivery tracking, and digital menus.
          </p>
        </div>

        <div className="relative z-10 text-sm text-primary-200">
          © 2026 FoodAxis. All rights reserved.
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center p-6 bg-gray-50">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center justify-center gap-2 mb-8">
            <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
              <UtensilsCrossed className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">FoodAxis</span>
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  )
}
