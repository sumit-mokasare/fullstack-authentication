import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authApi } from '../../api/authApi';
import { useAuthStore } from '../../stores/authStore';

// Route: /oauth-success
//
// Google login is NOT an axios call — it's a full browser redirect
// chain: this app -> backend's /google -> Google's consent screen ->
// backend's /google/callback (which sets the httpOnly cookies) ->
// back to the frontend, landing here.
//
// Requires ONE backend change in googleCallback:
//   .redirect(`${process.env.FRONTEND_URL}/oauth-success`);
// (it currently hardcodes "http://127.0.0.1:3000/api/v1/users/profile ",
// a backend-style path with a trailing-space bug — no frontend route
// can be reached by that literal redirect unless your dev server
// happens to run on port 3000).
//
// By the time this page loads, the cookies are already set — this
// page's only job is to call /profile once to hydrate the store,
// since the redirect itself carries no user data, only the cookies.
export default function OAuthSuccessPage() {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  useEffect(() => {
    const hydrate = async () => {
      try {
        const res = await authApi.getUser();
        useAuthStore.getState().setAuth({ user: res.data, accessToken: null });
        navigate('/');
      } catch {
        setError('Google sign-in did not complete. Please try again.');
      }
    };
    hydrate();
  }, [navigate]);

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-4">
        <div className="text-center">
          <p className="text-sm text-destructive">{error}</p>
          <Link to="/login" className="mt-4 inline-block text-sm text-primary">
            Back to login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <p className="text-sm text-muted-foreground">Finishing sign in...</p>
    </div>
  );
}
