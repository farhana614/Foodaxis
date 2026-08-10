import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function RoleBasedRoute({ allowedRoles }) {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (!allowedRoles.includes(user.role)) {
    // Redirect to role-appropriate dashboard
    const roleRoutes = {
      customer: '/',
      admin: '/admin',
      kitchen: '/kitchen',
      rider: '/rider',
      superadmin: '/superadmin',
    }
    return <Navigate to={roleRoutes[user.role] || '/'} replace />
  }

  return <Outlet />
}