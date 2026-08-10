export const ROUTES = {
  LOGIN: '/login',
  REGISTER: '/register',
  
  CUSTOMER: {
    HOME: '/',
    MENU: '/menu',
    CART: '/cart',
    CHECKOUT: '/checkout',
    ORDERS: '/orders',
    TRACK: (id) => `/track/${id}`,
    PROFILE: '/profile',
    REWARDS: '/rewards',
  },
  
  ADMIN: {
    DASHBOARD: '/admin',
    MENU: '/admin/menu',
    INVENTORY: '/admin/inventory',
    ORDERS: '/admin/orders',
    DELIVERY: '/admin/delivery',
    STAFF: '/admin/staff',
    ANALYTICS: '/admin/analytics',
    FEEDBACK: '/admin/feedback',
    AI: '/admin/ai-recommendations',
  },
  
  KITCHEN: {
    DISPLAY: '/kitchen',
    PREP: '/kitchen/prep-guide',
  },
  
  RIDER: {
    DASHBOARD: '/rider',
    ORDERS: '/rider/orders',
    TRACKING: '/rider/tracking',
  },
  
  SUPERADMIN: {
    DASHBOARD: '/superadmin',
    RESTAURANTS: '/superadmin/restaurants',
    USERS: '/superadmin/users',
  },
}