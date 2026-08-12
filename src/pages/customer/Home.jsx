import { Link } from 'react-router-dom'
import { 
  Search, Clock, Star, TrendingUp, Bike, UtensilsCrossed, 
  ArrowRight, MapPin 
} from 'lucide-react'
import { DEMO_MENU_ITEMS } from '../../utils/constants'
import MenuItemCard from '../../components/menu/MenuItemCard'
import { useCart } from '../../context/CartContext'

export default function CustomerHome() {
  const { addItem } = useCart()
  const popularItems = DEMO_MENU_ITEMS.slice(0, 4)

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-primary-600 rounded-2xl p-6 md:p-10 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/3" />
        
        <div className="relative z-10 max-w-lg">
          <h1 className="text-3xl md:text-4xl font-bold mb-3">
            Delicious food<br />delivered to you
          </h1>
          <p className="text-primary-100 mb-6 text-lg">
            Order from the best restaurants in Dhaka with AI-powered recommendations
          </p>
          <Link to="/menu" className="inline-flex items-center gap-2 bg-white text-primary-700 px-6 py-3 rounded-xl font-semibold hover:bg-primary-50 transition-colors">
            <Search className="w-5 h-5" /> Browse Menu
          </Link>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { icon: UtensilsCrossed, label: 'Dine-in', color: 'bg-orange-100 text-orange-600' },
          { icon: Bike, label: 'Delivery', color: 'bg-blue-100 text-blue-600' },
          { icon: Clock, label: 'Takeaway', color: 'bg-emerald-100 text-emerald-600' },
          { icon: Star, label: 'Rewards', color: 'bg-amber-100 text-amber-600', link: '/rewards' },
        ].map((action, idx) => (
          <Link 
            key={idx} 
            to={action.link || '/menu'}
            className="flex flex-col items-center gap-2 p-4 bg-white rounded-xl border border-gray-100 hover:shadow-card transition-all"
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${action.color}`}>
              <action.icon className="w-6 h-6" />
            </div>
            <span className="text-sm font-medium text-gray-700">{action.label}</span>
          </Link>
        ))}
      </div>

      {/* Popular Items */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Popular Now</h2>
          <Link to="/menu" className="text-sm text-primary-600 font-medium flex items-center gap-1 hover:text-primary-700">
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {popularItems.map((item) => (
            <MenuItemCard key={item.id} item={item} onAddToCart={addItem} />
          ))}
        </div>
      </div>

      {/* AI Feature Banner */}
      <div className="bg-gradient-to-r from-violet-600 to-purple-600 rounded-2xl p-6 md:p-8 text-white flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5" />
            <span className="text-sm font-medium text-violet-200">AI-Powered</span>
          </div>
          <h3 className="text-xl font-bold mb-1">Smart Recommendations</h3>
          <p className="text-violet-100 text-sm">Get personalized food suggestions based on your taste</p>
        </div>
        <div className="hidden md:block w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
          <Star className="w-8 h-8 text-white" />
        </div>
      </div>
    </div>
  )
}