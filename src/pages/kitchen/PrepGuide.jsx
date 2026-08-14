import { ChefHat, Clock, AlertTriangle, CheckCircle } from 'lucide-react'
import { MOCK_AI_RECOMMENDATIONS } from '../../utils/mockData'

const prepItems = [
  { item: 'Classic Chicken Burger', recommended: 25, current: 20, unit: 'pcs', urgency: 'normal' },
  { item: 'Margherita Pizza', recommended: 15, current: 10, unit: 'pcs', urgency: 'high' },
  { item: 'Grilled Salmon', recommended: 8, current: 5, unit: 'plates', urgency: 'normal' },
  { item: 'Caesar Salad', recommended: 12, current: 15, unit: 'bowls', urgency: 'low' },
  { item: 'Chocolate Lava Cake', recommended: 18, current: 12, unit: 'pcs', urgency: 'high' },
]

export default function PrepGuide() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <ChefHat className="w-7 h-7 text-primary-400" />
        <h1 className="text-2xl font-bold text-white">Daily Prep Guide</h1>
      </div>

      <div className="bg-violet-900/30 border border-violet-500/30 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-2">
          <AlertTriangle className="w-5 h-5 text-violet-400" />
          <h3 className="font-semibold text-violet-200">AI Recommendation</h3>
        </div>
        <p className="text-violet-100 text-sm">{MOCK_AI_RECOMMENDATIONS[0].description}</p>
        <p className="text-violet-300 text-xs mt-1 font-medium">{MOCK_AI_RECOMMENDATIONS[0].impact}</p>
      </div>

      <div className="grid gap-3">
        {prepItems.map((item, idx) => (
          <div key={idx} className={`bg-gray-800 rounded-xl p-4 border-l-4 ${
            item.urgency === 'high' ? 'border-red-500' :
            item.urgency === 'normal' ? 'border-amber-500' :
            'border-emerald-500'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-white text-lg">{item.item}</h3>
                <p className="text-sm text-gray-400 flex items-center gap-2 mt-1">
                  <Clock className="w-4 h-4" /> Prep time varies
                </p>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-3">
                  <div className="text-center">
                    <p className="text-xs text-gray-500">Current</p>
                    <p className="text-xl font-bold text-gray-300">{item.current}</p>
                  </div>
                  <span className="text-gray-600">→</span>
                  <div className="text-center">
                    <p className="text-xs text-primary-400 font-medium">AI Target</p>
                    <p className="text-xl font-bold text-primary-400">{item.recommended}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-3">
              <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${
                    item.current >= item.recommended ? 'bg-emerald-500' :
                    item.current >= item.recommended * 0.7 ? 'bg-amber-500' :
                    'bg-red-500'
                  }`}
                  style={{ width: `${Math.min(100, (item.current / item.recommended) * 100)}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <button className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium flex items-center gap-2 transition-colors">
          <CheckCircle className="w-5 h-5" /> Confirm Prep Complete
        </button>
      </div>
    </div>
  )
}