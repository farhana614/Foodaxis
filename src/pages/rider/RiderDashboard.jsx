import { Link } from 'react-router-dom'
import { Bike, Package, MapPin, DollarSign, Star, Clock, TrendingUp } from 'lucide-react'
import { MOCK_RIDERS } from '../../utils/mockData'
import Card from '../../components/common/Card'

export default function RiderDashboard() {
  const rider = MOCK_RIDERS[0]

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-violet-100 rounded-full flex items-center justify-center">
            <span className="text-2xl font-bold text-violet-700">{rider.name[0]}</span>
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-gray-900">{rider.name}</h1>
            <div className="flex items-center gap-3 mt-1">
              <span className="flex items-center gap-1 text-sm text-amber-600">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" /> {rider.rating}
              </span>
              <span className="text-sm text-gray-500">{rider.vehicle} • {rider.vehicleNumber}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-1 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-lg">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium">Online</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="text-center">
          <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mx-auto mb-2">
            <DollarSign className="w-6 h-6 text-primary-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">৳1,240</p>
          <p className="text-xs text-gray-500">Today's Earnings</p>
        </Card>
        <Card className="text-center">
          <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-2">
            <Package className="w-6 h-6 text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">8</p>
          <p className="text-xs text-gray-500">Deliveries Today</p>
        </Card>
        <Card className="text-center">
          <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mx-auto mb-2">
            <Clock className="w-6 h-6 text-emerald-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">24m</p>
          <p className="text-xs text-gray-500">Avg Delivery Time</p>
        </Card>
        <Card className="text-center">
          <div className="w-12 h-12 bg-violet-50 rounded-xl flex items-center justify-center mx-auto mb-2">
            <TrendingUp className="w-6 h-6 text-violet-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{rider.totalDeliveries}</p>
          <p className="text-xs text-gray-500">Total Deliveries</p>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="space-y-3">
        <h2 className="section-title">Quick Actions</h2>
        <Link to="/rider/orders" className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100 hover:shadow-card transition-all">
          <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
            <Package className="w-6 h-6 text-blue-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">Assigned Orders</h3>
            <p className="text-sm text-gray-500">View your current deliveries</p>
          </div>
          <span className="bg-blue-100 text-blue-700 px-2.5 py-1 rounded-full text-xs font-medium">2 Active</span>
        </Link>
        <Link to="/rider/tracking" className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100 hover:shadow-card transition-all">
          <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center">
            <MapPin className="w-6 h-6 text-emerald-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900">Live Map</h3>
            <p className="text-sm text-gray-500">Track your location and route</p>
          </div>
        </Link>
      </div>
    </div>
  )
}