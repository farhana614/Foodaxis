import { Shield, Store, Users, TrendingUp, AlertCircle } from 'lucide-react'
import { MOCK_RESTAURANTS } from '../../utils/mockData'
import StatCard from '../../components/analytics/StatCard'
import SalesChart from '../../components/analytics/SalesChart'

export default function SuperDashboard() {
  const totalRestaurants = MOCK_RESTAURANTS.length
  const activeRestaurants = MOCK_RESTAURANTS.filter(r => r.status === 'active').length
  const totalOrders = MOCK_RESTAURANTS.reduce((sum, r) => sum + r.ordersToday, 0)
  const totalRevenue = MOCK_RESTAURANTS.reduce((sum, r) => sum + r.revenueToday, 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="page-title flex items-center gap-2">
          <Shield className="w-7 h-7 text-slate-600" /> System Dashboard
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Restaurants" value={totalRestaurants} icon={Store} color="primary" />
        <StatCard title="Active Now" value={activeRestaurants} icon={AlertCircle} color="emerald" />
        <StatCard title="Orders Today" value={totalOrders} icon={TrendingUp} color="blue" />
        <StatCard title="Revenue Today" value={`৳${totalRevenue.toLocaleString()}`} icon={TrendingUp} color="violet" />
      </div>

      <SalesChart />

      <div className="card">
        <h3 className="section-title mb-4">Restaurant Performance</h3>
        <div className="space-y-3">
          {MOCK_RESTAURANTS.map(restaurant => (
            <div key={restaurant.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-gray-900">{restaurant.name}</h4>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    restaurant.status === 'active' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {restaurant.status}
                  </span>
                </div>
                <p className="text-sm text-gray-500">{restaurant.address}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-gray-900">{restaurant.ordersToday} orders</p>
                <p className="text-sm text-gray-500">৳{restaurant.revenueToday.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}