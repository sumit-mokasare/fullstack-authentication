import React, { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthLayout } from './components/layout/AuthLayout';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/ResetPasswordPage';
import HomePage from './pages/dashboard/HomePage';
import CheckEmailPage from './pages/auth/CheckEmailPage';
import VerifyAccountPage from './pages/auth/VerifyAccountPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage';
import ResetPasswordPage from './pages/auth/ResetPasswordPage';
import OAuthSuccessPage from './pages/auth/OAuthSuccessPage';
import ProtectedRoute from './routes/ProtectedRoute';
import GuestRoute from './routes/GuestRoute';
import { useAuthStore } from './stores/authStore';
import { authApi } from './api/authApi';

const router = createBrowserRouter([
  // --- requires a live session ---
  {
    element: <ProtectedRoute />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/forgot-password', element: <ForgotPasswordPage /> },
    ],
  },

  {
    element: <GuestRoute />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          { path: '/login', element: <LoginPage /> },
          { path: '/register', element: <RegisterPage /> },
        ],
      },
    ],
  },

  { path: '/check-email', element: <CheckEmailPage /> }, // post-register, no session yet
  { path: '/verify-user', element: <VerifyAccountPage /> }, // clicked from email, no session yet
  { path: '/reset-password/:token', element: <ResetPasswordPage /> }, // recovery path for someone who CAN'T log in
  { path: '/oauth-success', element: <OAuthSuccessPage /> }, // mid-flow: cookies just set, store not hydrated yet
]);

const App = () => {
  const isCheckingAuth = useAuthStore((state) => state.isCheckingAuth);

  useEffect(() => {
    const bootstrap = async () => {
      try {
        const res = await authApi.getUser();
        useAuthStore.getState().setAuth({ user: res.data, accessToken: null });
      } catch {
        useAuthStore.getState().clearAuth();
      } finally {
        useAuthStore.getState().setCheckingAuth(false);
      }
    };
    bootstrap();
  }, []);

  if (isCheckingAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-4">
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return <RouterProvider router={router} />;
};
export default App;
