import { useState } from 'react'
import { Search, SlidersHorizontal } from 'lucide-react'
import { useMenu } from '../../hooks/useMenu'
import { useCart } from '../../context/CartContext'
import MenuItemCard from '../../components/menu/MenuItemCard'
import CategoryFilter from '../../components/menu/CategoryFilter'
import CartBadge from '../../components/menu/CartBadge'
import Loader from '../../components/common/Loader'
import EmptyState from '../../components/common/EmptyState'

export default function Menu() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState('all')
  const { items, isLoading, fetchMenu } = useMenu()
  const { addItem, totalItems, totalPrice } = useCart()

  const handleSearch = (e) => {
    setSearchQuery(e.target.value)
    fetchMenu({ search: e.target.value, category: activeCategory })
  }

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat)
    fetchMenu({ category: cat, search: searchQuery })
  }

  if (isLoading) return <Loader text="Loading menu..." />

  return (
    <div className="space-y-6">
      {/* Search Header */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search dishes, ingredients..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500"
          />
        </div>
        <button className="p-3 bg-white border border-gray-200 rounded-xl text-gray-500 hover:text-gray-700 hover:bg-gray-50">
          <SlidersHorizontal className="w-5 h-5" />
        </button>
      </div>

      {/* Categories */}
      <CategoryFilter activeCategory={activeCategory} onCategoryChange={handleCategoryChange} />

      {/* Menu Grid */}
      {items.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {items.map((item) => (
            <MenuItemCard key={item.id} item={item} onAddToCart={addItem} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon="noResults"
          title="No items found"
          description="Try adjusting your search or category filter"
          action={{ label: 'Clear Filters', onClick: () => { setSearchQuery(''); setActiveCategory('all'); fetchMenu(); } }}
        />
      )}

      {/* Floating Cart Badge */}
      {totalItems > 0 && <CartBadge count={totalItems} total={totalPrice} onClick={() => window.location.href = '/cart'} />}
    </div>
  )
}