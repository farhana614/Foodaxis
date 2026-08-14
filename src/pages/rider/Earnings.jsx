import { DollarSign, TrendingUp, Calendar, Download } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import Button from '../../components/common/Button'

const weeklyData = [
  { day: 'Mon', earnings: 850 },
  { day: 'Tue', earnings: 1200 },
  { day: 'Wed', earnings: 980 },
  { day: 'Thu', earnings: 1450 },
  { day: 'Fri', earnings: 1800 },
  { day: 'Sat', earnings: 2100 },
  { day: 'Sun', earnings: 1240 },
]

export default function Earnings() {
  const totalWeek = weeklyData.reduce((sum, d) => sum + d.earnings, 0)

  return (
    <div className="space-y-6">
      <h1 className="page-title">Earnings</h1>

      <div className="grid grid-cols-2 gap-4">
        <div className="card bg-primary-600 text-white">
          <p className="text-sm text-primary-200">This Week</p>
          <p className="text-3xl font-bold mt-1">৳{totalWeek.toLocaleString()}</p>
        </div>
        <div className="card">
          <p className="text-sm text-gray-500">Today's Earnings</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">৳1,240</p>
        </div>
      </div>

      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h3 className="section-title">Weekly Overview</h3>
          <Button variant="secondary" size="sm">
            <Download className="w-4 h-4" /> Export
          </Button>
        </div>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={weeklyData}>
            <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9ca3af', fontSize: 12 }} tickFormatter={(v) => `৳${v}`} />
            <Tooltip 
              contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }}
              formatter={(value) => [`৳${value}`, 'Earnings']}
            />
            <Bar dataKey="earnings" fill="#f97316" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="card">
        <h3 className="section-title mb-4">Recent Transactions</h3>
        <div className="space-y-3">
          {[
            { id: 'DEL-001', amount: 180, type: 'delivery', time: 'Today, 2:30 PM' },
            { id: 'DEL-002', amount: 220, type: 'delivery', time: 'Today, 1:15 PM' },
            { id: 'DEL-003', amount: 150, type: 'delivery', time: 'Today, 11:45 AM' },
            { id: 'DEL-004', amount: 200, type: 'bonus', time: 'Yesterday' },
          ].map((tx, idx) => (
            <div key={idx} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                  tx.type === 'bonus' ? 'bg-amber-50 text-amber-600' : 'bg-emerald-50 text-emerald-600'
                }`}>
                  <DollarSign className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{tx.id}</p>
                  <p className="text-xs text-gray-500">{tx.time}</p>
                </div>
              </div>
              <span className="font-bold text-gray-900">+৳{tx.amount}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}