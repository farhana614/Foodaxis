import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'
import { AlertTriangle, Leaf } from 'lucide-react'

const data = [
  { name: 'Over-prepared', value: 35, color: '#f97316' },
  { name: 'Expired', value: 25, color: '#ef4444' },
  { name: 'Spoilage', value: 20, color: '#f59e0b' },
  { name: 'Customer Returns', value: 15, color: '#8b5cf6' },
  { name: 'Other', value: 5, color: '#9ca3af' },
]

const aiRecommendations = [
  'Reduce chicken burger prep by 15% on weekdays',
  'Order lettuce every 2 days instead of 3',
  'Promote mango smoothie during 2-4 PM',
]

export default function WasteReport() {
  return (
    <div className="card">
      <div className="flex items-center gap-2 mb-6">
        <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
          <Leaf className="w-4 h-4 text-emerald-600" />
        </div>
        <div>
          <h3 className="section-title">Food Waste Analysis</h3>
          <p className="text-xs text-gray-500">AI-powered insights to reduce waste</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={4}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  borderRadius: '12px', 
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.1)'
                }}
              />
              <Legend 
                verticalAlign="bottom" 
                height={36}
                iconType="circle"
                formatter={(value) => <span className="text-xs text-gray-600">{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* AI Recommendations */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            <h4 className="text-sm font-semibold text-gray-800">AI Recommendations</h4>
          </div>
          
          <div className="space-y-3">
            {aiRecommendations.map((rec, idx) => (
              <div 
                key={idx} 
                className="flex items-start gap-3 p-3 bg-amber-50 border border-amber-100 rounded-xl"
              >
                <div className="w-6 h-6 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-amber-700">{idx + 1}</span>
                </div>
                <p className="text-sm text-amber-800">{rec}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 p-4 bg-emerald-50 rounded-xl border border-emerald-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-emerald-600 font-medium">Potential Savings</p>
                <p className="text-xl font-bold text-emerald-700">৳12,450/month</p>
              </div>
              <Leaf className="w-8 h-8 text-emerald-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}