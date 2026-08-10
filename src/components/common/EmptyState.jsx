import { PackageX, Search, ShoppingCart, Inbox } from 'lucide-react'

const icons = {
  default: Inbox,
  noData: PackageX,
  noResults: Search,
  emptyCart: ShoppingCart,
}

export default function EmptyState({ 
  icon = 'default', 
  title = 'Nothing here', 
  description = 'There are no items to display right now.',
  action = null 
}) {
  const Icon = icons[icon] || icons.default

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
        <Icon className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-1">{title}</h3>
      <p className="text-sm text-gray-500 max-w-sm mb-6">{description}</p>
      {action && (
        <button onClick={action.onClick} className="btn-primary text-sm">
          {action.label}
        </button>
      )}
    </div>
  )
}