import { Star, Gift, TrendingUp, Clock } from 'lucide-react'
import { MOCK_LOYALTY } from '../../utils/mockData'
import Card from '../../components/common/Card'
import Button from '../../components/common/Button'

export default function LoyaltyRewards() {
  const { points, tier, nextTier, pointsToNext, history, rewards } = MOCK_LOYALTY

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="page-title">Loyalty Rewards</h1>

      {/* Points Card */}
      <div className="bg-primary-600 rounded-2xl p-6 md:p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -translate-y-1/3 translate-x-1/4" />
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-primary-200 text-sm font-medium">Current Balance</p>
              <h2 className="text-4xl font-bold">{points} pts</h2>
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl">
              <span className="text-lg font-bold">{tier}</span>
              <span className="text-primary-200 text-sm ml-1">Tier</span>
            </div>
          </div>
          <div className="bg-white/10 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-primary-200">{points} / {points + pointsToNext} pts</span>
              <span className="text-sm font-medium">{nextTier}</span>
            </div>
            <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-white rounded-full transition-all"
                style={{ width: `${(points / (points + pointsToNext)) * 100}%` }}
              />
            </div>
            <p className="text-xs text-primary-200 mt-2">{pointsToNext} more points to reach {nextTier}</p>
          </div>
        </div>
      </div>

      {/* Available Rewards */}
      <div>
        <h3 className="section-title mb-4">Redeem Rewards</h3>
        <div className="grid sm:grid-cols-3 gap-4">
          {rewards.map((reward) => (
            <Card key={reward.id} className="text-center">
              <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mx-auto mb-3">
                <Gift className="w-6 h-6 text-primary-600" />
              </div>
              <h4 className="font-semibold text-gray-900 text-sm mb-1">{reward.name}</h4>
              <p className="text-primary-600 font-bold text-lg mb-3">{reward.points} pts</p>
              <Button 
                variant={points >= reward.points ? 'primary' : 'secondary'} 
                size="sm" 
                className="w-full"
                disabled={points < reward.points}
              >
                {points >= reward.points ? 'Redeem' : 'Locked'}
              </Button>
            </Card>
          ))}
        </div>
      </div>

      {/* History */}
      <div>
        <h3 className="section-title mb-4">Points History</h3>
        <div className="space-y-3">
          {history.map((item) => (
            <div key={item.id} className="flex items-center justify-between bg-white rounded-xl border border-gray-100 p-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  item.type === 'earned' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                }`}>
                  {item.type === 'earned' ? <TrendingUp className="w-5 h-5" /> : <Star className="w-5 h-5" />}
                </div>
                <div>
                  <p className="font-medium text-gray-900 text-sm">{item.description}</p>
                  <p className="text-xs text-gray-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {item.date}
                  </p>
                </div>
              </div>
              <span className={`font-bold ${item.type === 'earned' ? 'text-emerald-600' : 'text-amber-600'}`}>
                {item.type === 'earned' ? '+' : ''}{item.points}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}