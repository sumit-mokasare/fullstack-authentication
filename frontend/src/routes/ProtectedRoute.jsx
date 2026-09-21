import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';

// Wrap routes that require a real session (backend's verifyJwt-gated
// endpoints) with this — e.g. /forgot-password, since POST
// /forgot-password reads req.user._id and 401s without a cookie.
// By the time this renders, App.jsx's bootstrap effect has already
// resolved (isCheckingAuth is false before RouterProvider even mounts),
// so isAuthenticated here reflects a confirmed /profile check, not a
// guess.
const ProtectedRoute = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <Outlet />;
};

export default ProtectedRoute;
