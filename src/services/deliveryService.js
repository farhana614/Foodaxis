import api from './api'

export const deliveryService = {
  getAllRiders: () => api.get('/delivery/riders'),
  getRiderById: (id) => api.get(`/delivery/riders/${id}`),
  assignRider: (orderId, riderId) => api.post('/delivery/assign', { orderId, riderId }),
  updateDeliveryStatus: (deliveryId, status) => api.patch(`/delivery/${deliveryId}/status`, { status }),
  getTracking: (orderId) => api.get(`/delivery/tracking/${orderId}`),
  getRiderDeliveries: (riderId) => api.get(`/delivery/riders/${riderId}/deliveries`),
  updateRiderLocation: (riderId, location) => api.patch(`/delivery/riders/${riderId}/location`, location),
  verifyRider: (riderId) => api.patch(`/delivery/riders/${riderId}/verify`),
  getDeliveryHistory: (params) => api.get('/delivery/history', { params }),
}