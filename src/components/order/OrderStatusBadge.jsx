import { 
  Package, ChefHat, CheckCircle, Truck, Home, XCircle 
} from 'lucide-react'

const config = {
  received: { 
    label: 'Received', 
    className: 'bg-blue-50 text-blue-700 border-blue-200',
    icon: Package 
  },
  preparing: { 
    label: 'Preparing', 
    className: 'bg-amber-50 text-amber-700 border-amber-200',
    icon: ChefHat 
  },
  ready: { 
    label: 'Ready', 
    className: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    icon: CheckCircle 
  },
  out_for_delivery: { 
    label: 'On the Way', 
    className: 'bg-violet-50 text-violet-700 border-violet-200',
    icon: Truck 
  },
  delivered: { 
    label: 'Delivered', 
    className: 'bg-gray-50 text-gray-700 border-gray-200',
    icon: Home 
  },
  cancelled: { 
    label: 'Cancelled', 
    className: 'bg-red-50 text-red-700 border-red-200',
    icon: XCircle 
  },
}

export default function OrderStatusBadge({ status, size = 'md' }) {
  const cfg = config[status] || config.received
  const Icon = cfg.icon

  const sizes = {
    sm: 'px-2 py-0.5 text-xs gap-1',
    md: 'px-2.5 py-1 text-xs gap-1.5',
    lg: 'px-3 py-1.5 text-sm gap-2',
  }

  return (
    <span className={`inline-flex items-center rounded-full font-medium border ${cfg.className} ${sizes[size]}`}>
      <Icon className={`${size === 'lg' ? 'w-4 h-4' : 'w-3.5 h-3.5'}`} />
      {cfg.label}
    </span>
  )
}