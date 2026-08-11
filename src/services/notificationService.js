import api from './api'

export const notificationService = {
  getAll: () => api.get('/notifications'),
  getUnread: () => api.get('/notifications/unread'),
  markAsRead: (id) => api.patch(`/notifications/${id}/read`),
  markAllAsRead: () => api.patch('/notifications/read-all'),
  deleteNotification: (id) => api.delete(`/notifications/${id}`),
  updatePreferences: (data) => api.patch('/notifications/preferences', data),
  getPreferences: () => api.get('/notifications/preferences'),
  sendPushToken: (token) => api.post('/notifications/push-token', { token }),
}