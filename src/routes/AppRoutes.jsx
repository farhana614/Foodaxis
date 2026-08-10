import { Routes, Route, Navigate } from 'react-router-dom'
import RoleBasedRoute from './RoleBasedRoute'

// Layouts
import AuthLayout from '../components/layout/AuthLayout'
import CustomerLayout from '../components/layout/CustomerLayout'
import AdminLayout from '../components/layout/AdminLayout'
import KitchenLayout from '../components/layout/KitchenLayout'
import RiderLayout from '../components/layout/RiderLayout'
import SuperAdminLayout from '../components/layout/SuperAdminLayout'

// Auth Pages
import Login from '../pages/auth/Login'
import Register from '../pages/auth/Register'

// Customer Pages
import CustomerHome from '../pages/customer/Home'
import CustomerMenu from '../pages/customer/Menu'
import MenuItemDetail from '../pages/customer/MenuItemDetail'
import Cart from '../pages/customer/Cart'
import Checkout from '../pages/customer/Checkout'
import OrderConfirmation from '../pages/customer/OrderConfirmation'
import OrderTracking from '../pages/customer/OrderTracking'
import OrderHistory from '../pages/customer/OrderHistory'
import CustomerProfile from '../pages/customer/Profile'
import LoyaltyRewards from '../pages/customer/LoyaltyRewards'

// Admin Pages
import AdminDashboard from '../pages/admin/Dashboard'
import MenuManagement from '../pages/admin/MenuManagement'
import Inventory from '../pages/admin/Inventory'
import Orders from '../pages/admin/Orders'
import DeliveryManagement from '../pages/admin/DeliveryManagement'
import StaffManagement from '../pages/admin/StaffManagement'
import AdminAnalytics from '../pages/admin/Analytics'
import CustomerFeedback from '../pages/admin/CustomerFeedback'
import AIRecommendations from '../pages/admin/AIRecommendations'

// Kitchen Pages
import KitchenDisplay from '../pages/kitchen/KitchenDisplay'
import PrepGuide from '../pages/kitchen/PrepGuide'

// Rider Pages
import RiderDashboard from '../pages/rider/RiderDashboard'
import AssignedOrders from '../pages/rider/AssignedOrders'
import LiveTracking from '../pages/rider/LiveTracking'

// Super Admin Pages
import SuperDashboard from '../pages/superadmin/SuperDashboard'
import Restaurants from '../pages/superadmin/Restaurants'
import UserManagement from '../pages/superadmin/UserManagement'

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public Auth Routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Customer Routes */}
      <Route element={<RoleBasedRoute allowedRoles={['customer']} />}>
        <Route element={<CustomerLayout />}>
          <Route path="/" element={<CustomerHome />} />
          <Route path="/menu" element={<CustomerMenu />} />
          <Route path="/menu/:id" element={<MenuItemDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-confirmation/:id" element={<OrderConfirmation />} />
          <Route path="/track/:orderId" element={<OrderTracking />} />
          <Route path="/orders" element={<OrderHistory />} />
          <Route path="/profile" element={<CustomerProfile />} />
          <Route path="/rewards" element={<LoyaltyRewards />} />
        </Route>
      </Route>

      {/* Admin Routes */}
      <Route element={<RoleBasedRoute allowedRoles={['admin']} />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/menu" element={<MenuManagement />} />
          <Route path="/admin/inventory" element={<Inventory />} />
          <Route path="/admin/orders" element={<Orders />} />
          <Route path="/admin/delivery" element={<DeliveryManagement />} />
          <Route path="/admin/staff" element={<StaffManagement />} />
          <Route path="/admin/analytics" element={<AdminAnalytics />} />
          <Route path="/admin/feedback" element={<CustomerFeedback />} />
          <Route path="/admin/ai-recommendations" element={<AIRecommendations />} />
        </Route>
      </Route>

      {/* Kitchen Routes */}
      <Route element={<RoleBasedRoute allowedRoles={['kitchen']} />}>
        <Route element={<KitchenLayout />}>
          <Route path="/kitchen" element={<KitchenDisplay />} />
          <Route path="/kitchen/prep-guide" element={<PrepGuide />} />
        </Route>
      </Route>

      {/* Rider Routes */}
      <Route element={<RoleBasedRoute allowedRoles={['rider']} />}>
        <Route element={<RiderLayout />}>
          <Route path="/rider" element={<RiderDashboard />} />
          <Route path="/rider/orders" element={<AssignedOrders />} />
          <Route path="/rider/tracking" element={<LiveTracking />} />
        </Route>
      </Route>

      {/* Super Admin Routes */}
      <Route element={<RoleBasedRoute allowedRoles={['superadmin']} />}>
        <Route element={<SuperAdminLayout />}>
          <Route path="/superadmin" element={<SuperDashboard />} />
          <Route path="/superadmin/restaurants" element={<Restaurants />} />
          <Route path="/superadmin/users" element={<UserManagement />} />
        </Route>
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}