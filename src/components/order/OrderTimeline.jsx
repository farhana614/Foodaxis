import { 
  Package, ChefHat, CheckCircle, Truck, Home, Clock 
} from 'lucide-react'

const steps = [
  { status: 'received', label: 'Order Received', icon: Package },
  { status: 'preparing', label: 'Preparing', icon: ChefHat },
  { status: 'ready', label: 'Ready', icon: CheckCircle },
  { status: 'out_for_delivery', label: 'Out for Delivery', icon: Truck },
  { status: 'delivered', label: 'Delivered', icon: Home },
]

export default function OrderTimeline({ currentStatus, estimatedTime }) {
  const currentIndex = steps.findIndex(s => s.status === currentStatus)
  const isCompleted = (idx) => idx <= currentIndex
  const isCurrent = (idx) => idx === currentIndex

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        {steps.map((step, idx) => {
          const Icon = step.icon
          const completed = isCompleted(idx)
          const current = isCurrent(idx)

          return (
            <div key={step.status} className="flex flex-col items-center relative flex-1">
              {/* Connector line */}
              {idx < steps.length - 1 && (
                <div className={`absolute top-4 left-1/2 w-full h-0.5 ${
                  isCompleted(idx + 1) ? 'bg-primary-500' : 'bg-gray-200'
                }`} />
              )}
              
              {/* Icon */}
              <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${
                completed 
                  ? 'bg-primary-600 border-primary-600 text-white' 
                  : current 
                    ? 'bg-white border-primary-600 text-primary-600' 
                    : 'bg-white border-gray-200 text-gray-300'
              }`}>
                <Icon className="w-4 h-4" />
              </div>
              
              {/* Label */}
              <span className={`text-xs mt-2 font-medium text-center ${
                completed ? 'text-primary-700' : current ? 'text-primary-600' : 'text-gray-400'
              }`}>
                {step.label}
              </span>
            </div>
          )
        })}
      </div>

      {estimatedTime && (
        <div className="flex items-center justify-center gap-2 py-3 bg-primary-50 rounded-xl">
          <Clock className="w-4 h-4 text-primary-600" />
          <span className="text-sm font-medium text-primary-700">
            Estimated arrival: {estimatedTime}
          </span>
        </div>
      )}
    </div>
  )
}