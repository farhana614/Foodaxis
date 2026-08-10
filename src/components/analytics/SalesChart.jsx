import { useState } from 'react'
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar 
} from 'recharts'

const data = [
  { name: 'Mon', sales: 12400, orders: 45 },
  { name: 'Tue', sales: 15600, orders: 58 },
  { name: 'Wed', sales: 18900, orders: 72 },
  { name: 'Thu', sales: 14300, orders: 51 },
  { name: 'Fri', sales: 22100, orders: 89 },
  { name: 'Sat', sales: 28400, orders: 112 },
  { name: 'Sun', sales: 25600, orders: 98 },
]

export default function SalesChart({ type = 'area', height = 300 }) {
  const [chartType, setChartType] = useState(type)

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="section-title">Sales Overview</h3>
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button 
            onClick={() => setChartType('area')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
              chartType === 'area' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'
            }`}
          >
            Trend
          </button>
          <button 
            onClick={() => setChartType('bar')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
              chartType === 'bar' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'
            }`}
          >
            Daily
          </button>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={height}>
        {chartType === 'area' ? (
          <AreaChart data={data}>
            <defs>
              <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f97316" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#9ca3af', fontSize: 12 }} 
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#9ca3af', fontSize: 12 }}
              tickFormatter={(value) => `৳${value / 1000}k`}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#fff', 
                border: '1px solid #e5e7eb', 
                borderRadius: '12px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.1)'
              }}
              formatter={(value) => [`৳${value.toLocaleString()}`, 'Sales']}
            />
            <Area 
              type="monotone" 
              dataKey="sales" 
              stroke="#f97316" 
              strokeWidth={2.5}
              fill="url(#salesGradient)" 
            />
          </AreaChart>
        ) : (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#9ca3af', fontSize: 12 }} 
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#9ca3af', fontSize: 12 }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#fff', 
                border: '1px solid #e5e7eb', 
                borderRadius: '12px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.1)'
              }}
            />
            <Bar dataKey="orders" fill="#f97316" radius={[6, 6, 0, 0]} />
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  )
}