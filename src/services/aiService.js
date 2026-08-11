import api from './api'

export const aiService = {
  getDemandForecast: (days = 7) => api.get(`/ai/forecast?days=${days}`),
  getPrepRecommendations: () => api.get('/ai/prep-recommendations'),
  getWastePredictions: () => api.get('/ai/waste-predictions'),
  getPersonalizedRecommendations: (customerId) => api.get(`/ai/recommendations/${customerId}`),
  getPricingOptimization: () => api.get('/ai/pricing-optimization'),
  getSeasonalTrends: () => api.get('/ai/seasonal-trends'),
  trainModel: (data) => api.post('/ai/train', data),
  getModelAccuracy: () => api.get('/ai/model-accuracy'),
}