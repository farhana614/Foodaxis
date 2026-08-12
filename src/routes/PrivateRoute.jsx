import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import Loader from '../components/common/Loader'

export default function PrivateRoute({ children }) {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return <Loader fullScreen text="Authenticating..." />
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return children || <Outlet />
}