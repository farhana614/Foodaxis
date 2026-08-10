export const config = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  APP_NAME: import.meta.env.VITE_APP_NAME || 'FoodAxis',
  ROLES: {
    CUSTOMER: 'customer',
    ADMIN: 'admin',
    KITCHEN: 'kitchen',
    RIDER: 'rider',
    SUPERADMIN: 'superadmin',
  },
  ORDER_STATUS: {
    RECEIVED: 'received',
    PREPARING: 'preparing',
    READY: 'ready',
    OUT_FOR_DELIVERY: 'out_for_delivery',
    DELIVERED: 'delivered',
    CANCELLED: 'cancelled',
  },
}