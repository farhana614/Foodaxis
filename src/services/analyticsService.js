import api from './api'

export const analyticsService = {
  getDashboard: (period = 'today') => api.get(`/analytics/dashboard?period=${period}`),
  getSalesReport: (startDate, endDate) => api.get('/analytics/sales', { params: { startDate, endDate } }),
  getTopItems: (limit = 10) => api.get(`/analytics/top-items?limit=${limit}`),
  getPeakHours: () => api.get('/analytics/peak-hours'),
  getCustomerInsights: () => api.get('/analytics/customers'),
  getDeliveryPerformance: () => api.get('/analytics/delivery'),
  getInventoryTurnover: () => api.get('/analytics/inventory-turnover'),
  getWasteReport: (period) => api.get('/analytics/waste', { params: { period } }),
  exportReport: (type, format) => api.get(`/analytics/export/${type}`, { 
    params: { format },
    responseType: 'blob' 
  }),
}