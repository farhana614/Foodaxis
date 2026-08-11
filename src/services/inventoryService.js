import api from './api'

export const inventoryService = {
  getAll: () => api.get('/inventory'),
  getById: (id) => api.get(`/inventory/${id}`),
  updateStock: (id, data) => api.patch(`/inventory/${id}/stock`, data),
  adjustStock: (id, data) => api.post(`/inventory/${id}/adjust`, data),
  getAlerts: () => api.get('/inventory/alerts'),
  getTransactions: (id) => api.get(`/inventory/${id}/transactions`),
  addItem: (data) => api.post('/inventory', data),
  updateItem: (id, data) => api.put(`/inventory/${id}`, data),
  deleteItem: (id) => api.delete(`/inventory/${id}`),
  getCategories: () => api.get('/inventory/categories'),
}