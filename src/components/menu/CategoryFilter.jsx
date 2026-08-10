import { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const categories = [
  { id: 'all', label: 'All Items', icon: '🍽️' },
  { id: 'starters', label: 'Starters', icon: '🥗' },
  { id: 'burgers', label: 'Burgers', icon: '🍔' },
  { id: 'pizza', label: 'Pizza', icon: '🍕' },
  { id: 'main-course', label: 'Main Course', icon: '🍛' },
  { id: 'desserts', label: 'Desserts', icon: '🍰' },
  { id: 'beverages', label: 'Beverages', icon: '🥤' },
  { id: 'specials', label: 'Specials', icon: '⭐' },
]

export default function CategoryFilter({ activeCategory, onCategoryChange }) {
  const scrollRef = useRef(null)

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: direction === 'left' ? -200 : 200, behavior: 'smooth' })
    }
  }

  return (
    <div className="relative">
      <button 
        onClick={() => scroll('left')}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white shadow-md rounded-full flex items-center justify-center text-gray-500 hover:text-gray-700 hidden md:flex"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
      
      <div 
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto scrollbar-hide py-2 px-1 md:mx-10"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onCategoryChange(cat.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
              activeCategory === cat.id
                ? 'bg-primary-600 text-white shadow-md'
                : 'bg-white text-gray-600 border border-gray-200 hover:border-primary-300 hover:text-primary-600'
            }`}
          >
            <span>{cat.icon}</span>
            {cat.label}
          </button>
        ))}
      </div>

      <button 
        onClick={() => scroll('right')}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 bg-white shadow-md rounded-full flex items-center justify-center text-gray-500 hover:text-gray-700 hidden md:flex"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  )
}