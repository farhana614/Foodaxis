import { MapPin, Navigation, Phone } from 'lucide-react'

export default function LiveMap({ rider, customer, orderStatus }) {
  // Simulated map view - replace with actual Google Maps integration
  return (
    <div className="relative w-full h-80 bg-gray-100 rounded-2xl overflow-hidden">
      {/* Map Background Pattern */}
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />
      
      {/* Route Line */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 320">
        <path 
          d="M 80 240 Q 150 180 200 200 T 320 80" 
          fill="none" 
          stroke="#f97316" 
          strokeWidth="3" 
          strokeDasharray="8 4"
          className="animate-pulse"
        />
      </svg>

      {/* Restaurant Marker */}
      <div className="absolute bottom-16 left-12">
        <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center shadow-lg border-4 border-white">
          <MapPin className="w-5 h-5 text-white" />
        </div>
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded-lg whitespace-nowrap">
          Restaurant
        </div>
      </div>

      {/* Rider Marker */}
      <div className="absolute top-20 right-20">
        <div className="w-10 h-10 bg-violet-600 rounded-full flex items-center justify-center shadow-lg border-4 border-white animate-bounce">
          <Navigation className="w-5 h-5 text-white" />
        </div>
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-violet-600 text-white text-xs px-2 py-1 rounded-lg whitespace-nowrap">
          {rider?.name || 'Rider'}
        </div>
      </div>

      {/* Customer Marker */}
      <div className="absolute top-8 right-8">
        <div className="w-10 h-10 bg-emerald-600 rounded-full flex items-center justify-center shadow-lg border-4 border-white">
          <MapPin className="w-5 h-5 text-white" />
        </div>
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded-lg whitespace-nowrap">
          You
        </div>
      </div>

      {/* Rider Info Card */}
      {rider && (
        <div className="absolute bottom-4 left-4 right-4 bg-white rounded-xl shadow-lg p-4 flex items-center gap-4">
          <div className="w-12 h-12 bg-violet-100 rounded-full flex items-center justify-center">
            <span className="text-lg font-bold text-violet-700">{rider.name?.[0]}</span>
          </div>
          <div className="flex-1">
            <p className="font-semibold text-gray-900">{rider.name}</p>
            <p className="text-sm text-gray-500">{rider.phone}</p>
          </div>
          <button className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center hover:bg-emerald-100 transition-colors">
            <Phone className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  )
}