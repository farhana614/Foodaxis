import { MapPin, Navigation, Phone, Bike } from 'lucide-react'
import LiveMap from '../../components/order/LiveMap'

export default function RiderLiveTracking() {
  const rider = { name: 'Alex Rider', phone: '01712345678' }

  return (
    <div className="space-y-4 h-[calc(100vh-120px)]">
      <h1 className="page-title">Live Map</h1>
      
      <div className="relative h-full rounded-2xl overflow-hidden bg-gray-100">
        <LiveMap rider={rider} />
        
        {/* Rider Status Overlay */}
        <div className="absolute top-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-violet-100 rounded-full flex items-center justify-center">
              <Bike className="w-5 h-5 text-violet-600" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-900 text-sm">{rider.name}</p>
              <p className="text-xs text-gray-500">Active • 3.2 km to destination</p>
            </div>
            <div className="flex items-center gap-1 px-2 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-medium">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              Online
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}