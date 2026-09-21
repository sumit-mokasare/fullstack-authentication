import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';

// The mirror of ProtectedRoute: for pages that only make sense when
// NOT logged in (login, register). An already-authenticated user
// hitting these gets bounced to the dashboard instead of seeing a
// login form for a session they already have.
const GuestRoute = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (isAuthenticated) return <Navigate to="/" replace />;
  return <Outlet />;
};

export default GuestRoute;
