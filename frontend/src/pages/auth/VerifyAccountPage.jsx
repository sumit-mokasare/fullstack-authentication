import { useEffect, useRef, useState } from 'react';
import { MailCheck, ArrowLeft, RefreshCw } from 'lucide-react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useApi } from '../../hooks/useApi';
import { authApi } from '../../api/authApi';

// Route: /verify-user?token=xxx
// Path + query shape dictated by Register's controller (not being
// changed): `${FRONTEND_URL}/verify-user?token=${unHashedToken}`.
//
// That link carries NO email — so on failure, there is no source
// (store, URL, anywhere) to autofill a resend email from. This page
// asks for it inline instead of guessing. No useAuthStore read here:
// the user has no session at this point in the flow, it would always
// be null.
export default function VerifyAccountPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const hasVerified = useRef(false);

  const token = searchParams.get('token');
  const [resendEmail, setResendEmail] = useState('');

  const {
    execute: verifyUser,
    error,
    isLoading,
  } = useApi(authApi.verifyUser, {
    onSuccess: () => {
      navigate('/login');
    },
    showSuccessToast: true,
  });

  useEffect(() => {
    if (!token) return;
    if (hasVerified.current) return; // skip the second StrictMode call
    hasVerified.current = true;
    verifyUser(token); // hits GET /verify/:token under the hood
  }, [token]);

  const {
    execute: resendVerification,
    isLoading: isResending,
    error: resendError,
  } = useApi(authApi.resendVerification, {
    onSuccess: () => {
      navigate('/check-email', { state: { email: resendEmail } });
    },
    showSuccessToast: true,
  });

  const verificationFailed = !isLoading && !!error;
  const isValidEmail = /\S+@\S+\.\S+/.test(resendEmail);

  function handleResend(e) {
    e.preventDefault();
    if (!isValidEmail) return;
    resendVerification(resendEmail);
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md rounded-3xl border border-border bg-card p-8 shadow-sm">
        {/* Icon */}
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
          <MailCheck className="text-primary" size={40} />
        </div>

        {/* Heading */}
        <h1 className="mt-6 text-center text-3xl font-bold text-foreground">
          Verify Your Account
        </h1>

        <p className="mt-4 text-center text-sm leading-6 text-muted-foreground">
          {isLoading && 'Verifying your email address...'}
          {verificationFailed &&
            (error?.message ||
              'This verification link is invalid or has expired.')}
          {!isLoading &&
            !error &&
            'Click the link from your email to verify your account.'}
        </p>

        {/* Resend — only appears once verification has actually failed.
            No email available to prefill, so it's asked for here. */}
        {verificationFailed && (
          <form onSubmit={handleResend} className="mt-5 space-y-3">
            <input
              type="email"
              value={resendEmail}
              onChange={(e) => setResendEmail(e.target.value)}
              placeholder="Enter your email to resend the link"
              className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground"
            />

            <button
              type="submit"
              disabled={!isValidEmail || isResending}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 font-medium text-primary-foreground transition hover:opacity-90 disabled:opacity-50"
            >
              <RefreshCw
                size={18}
                className={isResending ? 'animate-spin' : ''}
              />
              {isResending ? 'Resending...' : 'Resend Verification Email'}
            </button>

            {resendError && (
              <p className="text-center text-xs text-destructive">
                {resendError?.message || "Couldn't resend right now."}
              </p>
            )}
          </form>
        )}

        {/* Back */}
        <Link to="/login">
          <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-card py-3 font-medium text-card-foreground transition hover:bg-muted">
            <ArrowLeft size={18} />
            Back to Login
          </button>
        </Link>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-muted-foreground">
          If you've already verified your account, you can safely return to the
          login page.
        </p>
      </div>
    </div>
  );
}
