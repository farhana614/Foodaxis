import { useState } from 'react'
import { Star, MessageSquare, ThumbsUp, Filter } from 'lucide-react'
import { MOCK_FEEDBACK } from '../../utils/mockData'
import Table from '../../components/common/Table'

export default function CustomerFeedback() {
  const [filter, setFilter] = useState('all')
  const avgRating = (MOCK_FEEDBACK.reduce((sum, f) => sum + f.rating, 0) / MOCK_FEEDBACK.length).toFixed(1)

  const filtered = filter === 'all' ? MOCK_FEEDBACK : MOCK_FEEDBACK.filter(f => f.rating === Number(filter))

  const columns = [
    { header: 'Customer', accessor: 'customer' },
    { header: 'Order', accessor: 'orderId' },
    { header: 'Rating', render: (row) => (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className={`w-4 h-4 ${i < row.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-200'}`} />
        ))}
      </div>
    )},
    { header: 'Comment', accessor: 'comment', render: (row) => (
      <p className="text-sm text-gray-600 max-w-xs truncate">{row.comment}</p>
    )},
    { header: 'Date', accessor: 'date' },
    { header: 'Actions', render: () => (
      <button className="p-1.5 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg">
        <MessageSquare className="w-4 h-4" />
      </button>
    )},
  ]

  return (
    <div className="space-y-6">
      <h1 className="page-title">Customer Feedback</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Average Rating', value: avgRating, icon: Star, color: 'bg-amber-50 text-amber-600' },
          { label: 'Total Reviews', value: MOCK_FEEDBACK.length, icon: MessageSquare, color: 'bg-blue-50 text-blue-600' },
          { label: '5 Star', value: MOCK_FEEDBACK.filter(f => f.rating === 5).length, icon: ThumbsUp, color: 'bg-emerald-50 text-emerald-600' },
          { label: 'Response Rate', value: '92%', icon: Filter, color: 'bg-violet-50 text-violet-600' },
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

      <div className="card">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-sm font-medium text-gray-700">Filter by rating:</span>
          <div className="flex gap-2">
            {['all', '5', '4', '3', '2', '1'].map(r => (
              <button
                key={r}
                onClick={() => setFilter(r)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                  filter === r ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-600'
                }`}
              >
                {r === 'all' ? 'All' : `${r}★`}
              </button>
            ))}
          </div>
        </div>
        <Table columns={columns} data={filtered} keyExtractor={(row) => row.id} />
      </div>
    </div>
  )
}