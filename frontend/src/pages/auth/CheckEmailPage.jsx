import { useState } from 'react';
import { Mail, RefreshCw, ArrowLeft } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';
import { authApi } from '../../api/authApi';

// Route: /check-email
// Reached only right after a successful Register call. The user has
// NO session at this point (Register doesn't issue tokens), so this
// page must read the email from navigation state — never from
// useAuthStore, which is intentionally untouched until real Login.
export default function CheckEmailPage() {
  const location = useLocation();
  const email = location.state?.email || '';

  const [status, setStatus] = useState('idle'); // "idle" | "sending" | "sent" | "error"

  const handleResend = async () => {
    if (!email) return; // no email to resend to (e.g. page opened directly/refreshed)
    setStatus('sending');
    try {
      await authApi.resendVerification(email);
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-lg rounded-3xl border border-border bg-card p-8 shadow-sm">
        {/* Icon */}
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
          <Mail className="text-primary" size={40} />
        </div>

        {/* Content */}
        <div className="mt-6 text-center">
          <h1 className="text-3xl font-bold text-foreground">
            Check Your Email
          </h1>
          <p className="mt-4 text-sm leading-6 text-muted-foreground">
            We've sent a verification link to your email address. Please check
            your inbox and click the link to activate your account.
          </p>
        </div>

        {/* Email Box */}
        <div className="mt-8 rounded-2xl border border-border bg-background p-4 text-center">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">
            Verification Email Sent To
          </p>
          <p className="mt-2 font-medium text-foreground">
            {email || 'your email address'}
          </p>
        </div>

        {/* Note */}
        <div className="mt-6 rounded-2xl bg-muted p-4">
          <p className="text-sm text-muted-foreground">
            If you don't see the email, check your spam or junk folder. The
            verification link may take a few minutes to arrive.
          </p>
        </div>

        {/* Resend */}
        {email && (
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={handleResend}
              disabled={status === 'sending'}
              className="inline-flex items-center gap-2 text-sm font-medium text-primary disabled:opacity-50"
            >
              <RefreshCw
                size={16}
                className={status === 'sending' ? 'animate-spin' : ''}
              />
              {status === 'sending'
                ? 'Resending...'
                : 'Resend verification email'}
            </button>

            {status === 'sent' && (
              <p className="mt-2 text-xs text-muted-foreground">
                Verification email resent — check your inbox.
              </p>
            )}
            {status === 'error' && (
              <p className="mt-2 text-xs text-destructive">
                Couldn't resend right now. Please try again.
              </p>
            )}
          </div>
        )}

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-muted-foreground">
          Once you've verified your email, you can return and sign in to your
          account.
        </p>

        <Link
          to="/login"
          className="mt-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft size={14} />
          Back to login
        </Link>
      </div>
    </div>
  );
}
