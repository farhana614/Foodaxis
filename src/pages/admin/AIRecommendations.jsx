import { Brain, TrendingUp, Package, Tag, ChefHat, Sparkles } from 'lucide-react'
import { MOCK_AI_RECOMMENDATIONS } from '../../utils/mockData'
import Button from '../../components/common/Button'

export default function AIRecommendations() {
  const typeIcons = {
    prep: ChefHat,
    inventory: Package,
    promotion: Tag,
    pricing: TrendingUp,
  }

  const typeColors = {
    prep: 'bg-blue-50 text-blue-600 border-blue-100',
    inventory: 'bg-amber-50 text-amber-600 border-amber-100',
    promotion: 'bg-violet-50 text-violet-600 border-violet-100',
    pricing: 'bg-emerald-50 text-emerald-600 border-emerald-100',
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="page-title flex items-center gap-2">
            <Brain className="w-7 h-7 text-primary-600" /> AI Insights
          </h1>
          <p className="text-gray-500 text-sm mt-1">Smart recommendations powered by machine learning</p>
        </div>
        <Button variant="secondary">
          <Sparkles className="w-4 h-4" /> Refresh Analysis
        </Button>
      </div>

      {/* Model Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Model Accuracy', value: '92.4%', icon: Brain, color: 'bg-primary-50 text-primary-600' },
          { label: 'Data Points', value: '12.5K', icon: TrendingUp, color: 'bg-blue-50 text-blue-600' },
          { label: 'Predictions', value: '48', icon: Sparkles, color: 'bg-violet-50 text-violet-600' },
          { label: 'Waste Reduced', value: '15%', icon: Package, color: 'bg-emerald-50 text-emerald-600' },
        ].map((stat, idx) => (
          <div key={idx} className="card flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.color}`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-xs text-gray-500">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recommendations */}
      <div className="space-y-4">
        <h2 className="section-title">Today's Recommendations</h2>
        {MOCK_AI_RECOMMENDATIONS.map((rec) => {
          const Icon = typeIcons[rec.type]
          return (
            <div key={rec.id} className={`card border-l-4 ${typeColors[rec.type].split(' ')[2]}`}>
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${typeColors[rec.type].split(' ').slice(0, 2).join(' ')}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900">{rec.title}</h3>
                      <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                        {rec.confidence}% confidence
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{rec.description}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">
                        {rec.impact}
                      </span>
                    </div>
                  </div>
                </div>
                <Button size="sm">Apply</Button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Demand Forecast Preview */}
      <div className="card">
        <h3 className="section-title mb-4">Demand Forecast (Next 7 Days)</h3>
        <div className="grid grid-cols-7 gap-3">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, idx) => (
            <div key={day} className="text-center p-3 bg-gray-50 rounded-xl">
              <p className="text-xs text-gray-500 mb-1">{day}</p>
              <p className="text-lg font-bold text-gray-900">{85 + idx * 12}</p>
              <p className="text-xs text-gray-400">orders</p>
              <div className="mt-2 h-16 flex items-end justify-center gap-1">
                <div className="w-3 bg-primary-200 rounded-t" style={{ height: `${40 + idx * 8}%` }} />
                <div className="w-3 bg-primary-500 rounded-t" style={{ height: `${30 + idx * 6}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}