import { useState } from 'react'
import { TrendingUp, Users, ShoppingBag, DollarSign, Download } from 'lucide-react'
import SalesChart from '../../components/analytics/SalesChart'
import StatCard from '../../components/analytics/StatCard'
import WasteReport from '../../components/analytics/WasteReport'
import { MOCK_ANALYTICS } from '../../utils/mockData'
import Button from '../../components/common/Button'

export default function AdminAnalytics() {
  const [period, setPeriod] = useState('today')
  const data = MOCK_ANALYTICS

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="page-title">Analytics</h1>
        <div className="flex items-center gap-3">
          <div className="flex bg-gray-100 rounded-lg p-1">
            {['today', 'week', 'month'].map(p => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium capitalize transition-all ${
                  period === p ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
          <Button variant="secondary" size="sm">
            <Download className="w-4 h-4" /> Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Sales" value={`৳${data.today.sales.toLocaleString()}`} icon={DollarSign} trend={12.5} color="primary" />
        <StatCard title="Total Orders" value={data.today.orders} icon={ShoppingBag} trend={8.3} color="blue" />
        <StatCard title="Avg Order Value" value={`৳${data.today.avgOrderValue}`} icon={TrendingUp} trend={-2.1} color="emerald" />
        <StatCard title="Active Customers" value={data.today.activeCustomers} icon={Users} trend={15.2} color="violet" />
      </div>

      <SalesChart />

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="section-title mb-4">Top Selling Items</h3>
          <div className="space-y-3">
            {data.topItems.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 bg-gray-100 rounded-lg flex items-center justify-center text-xs font-bold text-gray-600">{idx + 1}</span>
                  <span className="text-sm font-medium text-gray-900">{item.name}</span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{item.orders} orders</p>
                  <p className="text-xs text-gray-500">৳{item.revenue.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h3 className="section-title mb-4">Peak Hours</h3>
          <div className="space-y-3">
            {data.hourlyData.map((hour, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <span className="text-sm text-gray-500 w-12">{hour.hour}</span>
                <div className="flex-1 h-6 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary-500 rounded-full"
                    style={{ width: `${(hour.sales / 28400) * 100}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-gray-700 w-16 text-right">৳{hour.sales.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <WasteReport />
    </div>
  )
}