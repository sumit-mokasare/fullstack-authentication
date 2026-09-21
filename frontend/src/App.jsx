import React, { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthLayout } from './components/layout/AuthLayout';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import HomePage from './pages/dashboard/HomePage';
import CheckEmailPage from './pages/auth/CheckEmailPage';
import VerifyAccountPage from './pages/auth/VerifyAccountPage';
import ForgotPasswordPage from './pages/auth/ForgotPasswor';
import ResetPasswordPage from './pages/auth/ResetPassword';
import ProtectedRoute from '../src/routes/ProtectedRoute';
import { useAuthStore } from './stores/authStore';
import { authApi } from './api/authApi';

const router = createBrowserRouter([
  { path: '/', element: <HomePage /> },
  { path: '/check-email', element: <CheckEmailPage /> },
  { path: '/verify-user', element: <VerifyAccountPage /> },
  { path: '/reset-password/:token', element: <ResetPasswordPage /> },

  {
    element: <AuthLayout />,
    children: [
      { path: '/login', element: <LoginPage /> },
      { path: '/register', element: <RegisterPage /> },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [{ path: '/forgot-password', element: <ForgotPasswordPage /> }],
  },
]);

const App = () => {
  const isCheckingAuth = useAuthStore((state) => state.isCheckingAuth);

  useEffect(() => {
    const bootstrap = async () => {
      try {
        const res = await authApi.getUser();
        useAuthStore.getState().setAuth({ user: res.data, accessToken: null });
      } catch {
        useAuthStore.getState().clearAuth(); // wipes any stale cached user too
      } finally {
        useAuthStore.getState().setCheckingAuth(false);
      }
    };
    bootstrap();
  }, []);

  if (isCheckingAuth) {
    return <div>Loading...</div>;
  }

  return <RouterProvider router={router} />;
};
export default App;
