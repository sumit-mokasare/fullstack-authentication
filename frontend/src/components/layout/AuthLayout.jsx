import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Box, MoveLeft, ShieldCheck, Zap, Lock } from 'lucide-react';

const features = [
  {
    icon: ShieldCheck,
    title: 'Secure by default',
    description:
      'httpOnly cookies and short-lived access tokens keep your session safe.',
  },
  {
    icon: Zap,
    title: 'One-click Google sign-in',
    description:
      'Skip the password entirely and get in with your Google account.',
  },
  {
    icon: Lock,
    title: 'Your data, protected',
    description:
      'Verified email, encrypted credentials, nothing shared without consent.',
  },
];

export const AuthLayout = () => {
  const { pathname } = useLocation();
  const isRegiterPage = pathname === '/register';

  return (
    <div className="min-h-screen  flex justify-center items-center   bg-background p-4 text-foreground md:p-6">
      <div className="mx-auto flex h-full w-full max-w-6xl overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        {/* left side */}
        <div className="flex w-full flex-col justify-center p-6 md:w-1/2 md:p-8 lg:p-10">
          <div>
            <div className="mb-8 flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Box size={20} />
              </div>
              <span className="text-lg font-semibold">Auth System</span>
            </div>

            <div className="mx-auto w-full max-w-md">
              <p className="mb-1 text-sm text-muted-foreground">
                {isRegiterPage ? 'Create your account' : 'Welcome back'}
              </p>
              <h1 className="text-2xl font-bold">
                {isRegiterPage
                  ? 'Sign up to Auth System'
                  : 'Sign in to Auth System'}
              </h1>

              {/* ----------- imported auth page Outlate ------------- */}
              <div>{<Outlet />}</div>

              <div className="my-4 flex items-center gap-4">
                <div className="h-px flex-1 bg-border" />
                <span className="text-sm text-muted-foreground">
                  {isRegiterPage ? 'or sign up with' : 'or sign in with'}
                </span>
                <div className="h-px flex-1 bg-border" />
              </div>

              <div>
                <a
                  href={`${import.meta.env.VITE_BACKEND_URL}users/google`}
                  className="inline-flex cursor-pointer w-full items-center justify-center gap-3 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-medium text-card-foreground transition-all duration-150 hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 48 48"
                    className="h-5 w-5"
                  >
                    <path
                      fill="#FFC107"
                      d="M43.611 20.083H42V20H24v8h11.303C33.654 32.657 29.21 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.27 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
                    />
                    <path
                      fill="#FF3D00"
                      d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.27 4 24 4c-7.682 0-14.347 4.337-17.694 10.691z"
                    />
                    <path
                      fill="#4CAF50"
                      d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.143 35.091 26.715 36 24 36c-5.19 0-9.625-3.327-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"
                    />
                    <path
                      fill="#1976D2"
                      d="M43.611 20.083H42V20H24v8h11.303c-.793 2.285-2.295 4.235-4.284 5.57l.003-.002 6.19 5.238C36.774 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
                    />
                  </svg>
                  <span>Continue with Google</span>
                </a>
              </div>
            </div>
          </div>

          <p className="pt-4 text-sm text-muted-foreground">
            {isRegiterPage
              ? 'Already have an account?'
              : "Don't have an account?"}
            <span className="font-medium text-primary">
              {isRegiterPage ? (
                <Link to={'/login'}>Sign in</Link>
              ) : (
                <Link to={'/register'}>Sign up</Link>
              )}
            </span>
          </p>
        </div>

        {/* right side */}
        <div className="hidden min-h-full md:block md:w-1/2">
          <div className="relative flex h-full w-full flex-col justify-center gap-8 overflow-hidden bg-linear-to-br from-sky-200 via-blue-300 to-pink-200 p-10 dark:from-slate-800 dark:via-blue-900 dark:to-purple-900">
            {/* decorative blurred orbs, purely visual */}
            <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/20 blur-3xl dark:bg-white/5" />
            <div className="pointer-events-none absolute -bottom-20 -left-10 h-72 w-72 rounded-full bg-white/10 blur-3xl dark:bg-black/10" />

            <div className="relative z-10">
              <h2 className="text-2xl font-bold text-white">
                Built for security, made simple.
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Everything you need to keep your account safe — without the
                friction.
              </p>
            </div>

            <div className="relative z-10 space-y-4">
              {features.map(({ icon: Icon, title, description }) => (
                <div
                  key={title}
                  className="flex items-start gap-4 rounded-2xl border border-border/60 bg-card/70 p-4 backdrop-blur-sm"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon size={20} />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{title}</p>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      {description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
