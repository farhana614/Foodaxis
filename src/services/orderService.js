import api from './api'

export const orderService = {
  create: (data) => api.post('/orders', data),
  getAll: (params) => api.get('/orders', { params }),
  getById: (id) => api.get(`/orders/${id}`),
  updateStatus: (id, status) => api.patch(`/orders/${id}/status`, { status }),
  getCustomerOrders: () => api.get('/orders/my-orders'),
  cancel: (id) => api.patch(`/orders/${id}/cancel`),
}