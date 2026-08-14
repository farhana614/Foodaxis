import { Link } from 'react-router-dom'
import { 
  TrendingUp, TrendingDown, ShoppingBag, Users, DollarSign, 
  Package, Clock, Star, ArrowRight, AlertTriangle 
} from 'lucide-react'
import StatCard from '../../components/analytics/StatCard'
import OrderCard from '../../components/order/OrderCard'
import { MOCK_ORDERS, MOCK_ANALYTICS } from '../../utils/mockData'

export default function AdminDashboard() {
  const recentOrders = MOCK_ORDERS.slice(0, 3)
  const stats = MOCK_ANALYTICS.today

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="page-title">Dashboard</h1>
        <span className="text-sm text-gray-500">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Today's Sales" 
          value={`৳${stats.sales.toLocaleString()}`} 
          icon={DollarSign} 
          trend={stats.salesChange} 
          color="primary" 
        />
        <StatCard 
          title="Orders" 
          value={stats.orders} 
          icon={ShoppingBag} 
          trend={stats.ordersChange} 
          color="blue" 
        />
        <StatCard 
          title="Avg Order Value" 
          value={`৳${stats.avgOrderValue}`} 
          icon={TrendingUp} 
          trend={stats.aovChange} 
          color="emerald" 
        />
        <StatCard 
          title="Active Customers" 
          value={stats.activeCustomers} 
          icon={Users} 
          trend={stats.customerChange} 
          color="violet" 
        />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="section-title">Recent Orders</h2>
            <Link to="/admin/orders" className="text-sm text-primary-600 font-medium flex items-center gap-1 hover:text-primary-700">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="space-y-3">
            {recentOrders.map(order => (
              <OrderCard key={order.id} order={order} onClick={() => {}} />
            ))}
          </div>
        </div>

        {/* Quick Actions & Alerts */}
        <div className="space-y-6">
          {/* Low Stock Alert */}
          <div className="card bg-amber-50 border-amber-100">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              <h3 className="font-semibold text-amber-900">Low Stock Alerts</h3>
            </div>
            <div className="space-y-2">
              {['Lettuce (3kg left)', 'Salmon Fillet (2kg left)'].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-sm">
                  <span className="text-amber-800">{item}</span>
                  <Link to="/admin/inventory" className="text-amber-600 font-medium text-xs">Restock</Link>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card">
            <h3 className="section-title mb-4">Quick Actions</h3>
            <div className="space-y-2">
              {[
                { label: 'Add Menu Item', path: '/admin/menu', icon: Package },
                { label: 'Manage Orders', path: '/admin/orders', icon: ShoppingBag },
                { label: 'View Analytics', path: '/admin/analytics', icon: TrendingUp },
                { label: 'AI Insights', path: '/admin/ai-recommendations', icon: Star },
              ].map((action, idx) => (
                <Link 
                  key={idx} 
                  to={action.path}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="w-9 h-9 bg-primary-50 rounded-lg flex items-center justify-center">
                    <action.icon className="w-4 h-4 text-primary-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-700 flex-1">{action.label}</span>
                  <ArrowRight className="w-4 h-4 text-gray-400" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}