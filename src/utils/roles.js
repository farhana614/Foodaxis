// Role constants
export const ROLES = {
  CUSTOMER: 'customer',
  ADMIN: 'admin',
  KITCHEN: 'kitchen',
  RIDER: 'rider',
  SUPERADMIN: 'superadmin',
}

// Role display names
export const ROLE_LABELS = {
  [ROLES.CUSTOMER]: 'Customer',
  [ROLES.ADMIN]: 'Restaurant Admin',
  [ROLES.KITCHEN]: 'Kitchen Staff',
  [ROLES.RIDER]: 'Delivery Rider',
  [ROLES.SUPERADMIN]: 'Super Admin',
}

// Default dashboard routes per role
export const ROLE_DASHBOARD = {
  [ROLES.CUSTOMER]: '/',
  [ROLES.ADMIN]: '/admin',
  [ROLES.KITCHEN]: '/kitchen',
  [ROLES.RIDER]: '/rider',
  [ROLES.SUPERADMIN]: '/superadmin',
}

// Sidebar/menu items visibility per role
export const ROLE_NAV_ITEMS = {
  [ROLES.CUSTOMER]: [
    { path: '/', label: 'Home', icon: 'Home' },
    { path: '/menu', label: 'Menu', icon: 'Search' },
    { path: '/orders', label: 'My Orders', icon: 'Clock' },
    { path: '/cart', label: 'Cart', icon: 'ShoppingCart' },
    { path: '/profile', label: 'Profile', icon: 'User' },
    { path: '/rewards', label: 'Rewards', icon: 'Star' },
  ],
  [ROLES.ADMIN]: [
    { path: '/admin', label: 'Dashboard', icon: 'LayoutDashboard' },
    { path: '/admin/menu', label: 'Menu Management', icon: 'UtensilsCrossed' },
    { path: '/admin/inventory', label: 'Inventory', icon: 'Package' },
    { path: '/admin/orders', label: 'Orders', icon: 'ShoppingBag' },
    { path: '/admin/delivery', label: 'Delivery', icon: 'Truck' },
    { path: '/admin/staff', label: 'Staff', icon: 'Users' },
    { path: '/admin/analytics', label: 'Analytics', icon: 'BarChart3' },
    { path: '/admin/feedback', label: 'Feedback', icon: 'MessageSquare' },
    { path: '/admin/ai-recommendations', label: 'AI Insights', icon: 'Brain' },
  ],
  [ROLES.KITCHEN]: [
    { path: '/kitchen', label: 'Order Display', icon: 'ClipboardList' },
    { path: '/kitchen/prep-guide', label: 'Prep Guide', icon: 'ChefHat' },
  ],
  [ROLES.RIDER]: [
    { path: '/rider', label: 'Dashboard', icon: 'Bike' },
    { path: '/rider/orders', label: 'My Orders', icon: 'Package' },
    { path: '/rider/tracking', label: 'Live Map', icon: 'MapPin' },
  ],
  [ROLES.SUPERADMIN]: [
    { path: '/superadmin', label: 'Dashboard', icon: 'LayoutDashboard' },
    { path: '/superadmin/restaurants', label: 'Restaurants', icon: 'Store' },
    { path: '/superadmin/users', label: 'Users', icon: 'Users' },
  ],
}

// Feature permissions per role
export const PERMISSIONS = {
  // Menu & Ordering
  VIEW_MENU: [ROLES.CUSTOMER, ROLES.ADMIN, ROLES.SUPERADMIN],
  PLACE_ORDER: [ROLES.CUSTOMER, ROLES.ADMIN],
  MANAGE_MENU: [ROLES.ADMIN],
  
  // Orders
  VIEW_ORDERS: [ROLES.ADMIN, ROLES.KITCHEN, ROLES.RIDER, ROLES.SUPERADMIN],
  UPDATE_ORDER_STATUS: [ROLES.ADMIN, ROLES.KITCHEN, ROLES.RIDER],
  CANCEL_ORDER: [ROLES.CUSTOMER, ROLES.ADMIN],
  
  // Inventory
  VIEW_INVENTORY: [ROLES.ADMIN],
  MANAGE_INVENTORY: [ROLES.ADMIN],
  VIEW_INVENTORY_ALERTS: [ROLES.ADMIN, ROLES.KITCHEN],
  
  // Delivery
  ASSIGN_RIDER: [ROLES.ADMIN],
  UPDATE_DELIVERY_STATUS: [ROLES.RIDER, ROLES.ADMIN],
  TRACK_DELIVERY: [ROLES.CUSTOMER, ROLES.ADMIN, ROLES.RIDER],
  
  // Analytics & AI
  VIEW_ANALYTICS: [ROLES.ADMIN, ROLES.SUPERADMIN],
  VIEW_AI_INSIGHTS: [ROLES.ADMIN],
  
  // Staff & Users
  MANAGE_STAFF: [ROLES.ADMIN],
  MANAGE_USERS: [ROLES.SUPERADMIN],
  MANAGE_RESTAURANTS: [ROLES.SUPERADMIN],
  
  // System
  SYSTEM_SETTINGS: [ROLES.SUPERADMIN],
  VIEW_ALL_BRANCHES: [ROLES.SUPERADMIN],
}

// Helper functions
export const hasRole = (user, roles) => {
  if (!user || !user.role) return false
  if (Array.isArray(roles)) {
    return roles.includes(user.role)
  }
  return user.role === roles
}

export const hasPermission = (user, permissionKey) => {
  if (!user || !user.role) return false
  const allowedRoles = PERMISSIONS[permissionKey] || []
  return allowedRoles.includes(user.role)
}

export const getDashboardPath = (role) => {
  return ROLE_DASHBOARD[role] || '/'
}

export const getNavItems = (role) => {
  return ROLE_NAV_ITEMS[role] || []
}

export const isAdmin = (user) => hasRole(user, [ROLES.ADMIN, ROLES.SUPERADMIN])
export const isStaff = (user) => hasRole(user, [ROLES.ADMIN, ROLES.KITCHEN, ROLES.RIDER])
export const isSuperAdmin = (user) => hasRole(user, ROLES.SUPERADMIN)
export const isCustomer = (user) => hasRole(user, ROLES.CUSTOMER)

// Role badge colors for UI
export const ROLE_COLORS = {
  [ROLES.CUSTOMER]: 'bg-blue-100 text-blue-700',
  [ROLES.ADMIN]: 'bg-primary-100 text-primary-700',
  [ROLES.KITCHEN]: 'bg-amber-100 text-amber-700',
  [ROLES.RIDER]: 'bg-violet-100 text-violet-700',
  [ROLES.SUPERADMIN]: 'bg-slate-100 text-slate-700',
}

// Role-based route access map (for route guards)
export const ROLE_ROUTES = {
  [ROLES.CUSTOMER]: ['/', '/menu', '/menu/:id', '/cart', '/checkout', '/order-confirmation/:id', '/track/:orderId', '/orders', '/profile', '/rewards', '/support'],
  [ROLES.ADMIN]: ['/admin', '/admin/menu', '/admin/inventory', '/admin/orders', '/admin/delivery', '/admin/staff', '/admin/analytics', '/admin/feedback', '/admin/ai-recommendations', '/admin/settings'],
  [ROLES.KITCHEN]: ['/kitchen', '/kitchen/prep-guide', '/kitchen/waste-log'],
  [ROLES.RIDER]: ['/rider', '/rider/orders', '/rider/tracking', '/rider/history', '/rider/earnings'],
  [ROLES.SUPERADMIN]: ['/superadmin', '/superadmin/restaurants', '/superadmin/users', '/superadmin/settings', '/superadmin/analytics'],
}

export const canAccessRoute = (role, path) => {
  if (!role || !ROLE_ROUTES[role]) return false
  
  const allowedRoutes = ROLE_ROUTES[role]
  
  // Exact match
  if (allowedRoutes.includes(path)) return true
  
  // Pattern match for dynamic routes (e.g., /menu/123 matches /menu/:id)
  return allowedRoutes.some(route => {
    if (!route.includes(':')) return route === path
    const pattern = route.replace(/:\w+/g, '[^/]+')
    const regex = new RegExp(`^${pattern}$`)
    return regex.test(path)
  })
}