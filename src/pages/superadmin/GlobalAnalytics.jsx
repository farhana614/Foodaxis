import { Globe, TrendingUp, Users, Store, DollarSign } from 'lucide-react'
import { MOCK_ANALYTICS } from '../../utils/mockData'
import SalesChart from '../../components/analytics/SalesChart'
import StatCard from '../../components/analytics/StatCard'

export default function GlobalAnalytics() {
  return (
    <div className="space-y-6">
      <h1 className="page-title flex items-center gap-2">
        <Globe className="w-7 h-7 text-slate-600" /> Global Analytics
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Revenue" value="৳1.2M" icon={DollarSign} trend={18.5} color="primary" />
        <StatCard title="Total Orders" value="4,230" icon={TrendingUp} trend={12.3} color="blue" />
        <StatCard title="Active Users" value="1,850" icon={Users} trend={25.1} color="emerald" />
        <StatCard title="Restaurants" value="12" icon={Store} trend={8.0} color="violet" />
      </div>

      <SalesChart />

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="section-title mb-4">Top Performing Restaurants</h3>
          <div className="space-y-3">
            {[
              { name: 'FoodAxis Main Branch', revenue: 28450, orders: 89 },
              { name: 'FoodAxis Dhanmondi', revenue: 18200, orders: 56 },
              { name: 'FoodAxis Uttara', revenue: 0, orders: 0 },
            ].map((r, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center text-sm font-bold text-primary-700">{idx + 1}</span>
                  <span className="font-medium text-gray-900">{r.name}</span>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">৳{r.revenue.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">{r.orders} orders</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h3 className="section-title mb-4">System Health</h3>
          <div className="space-y-4">
            {[
              { label: 'Server Uptime', value: '99.9%', color: 'bg-emerald-500' },
              { label: 'API Response Time', value: '120ms', color: 'bg-blue-500' },
              { label: 'Database Load', value: '45%', color: 'bg-amber-500' },
              { label: 'Storage Used', value: '68%', color: 'bg-violet-500' },
            ].map((metric, idx) => (
              <div key={idx}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-600">{metric.label}</span>
                  <span className="text-sm font-medium text-gray-900">{metric.value}</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full ${metric.color} rounded-full`} style={{ width: metric.value.replace('%', '') + '%' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}