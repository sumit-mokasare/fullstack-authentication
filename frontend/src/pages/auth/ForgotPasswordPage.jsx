import { useState } from 'react';
import { KeyRound, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { authApi } from '../../api/authApi';

export default function ForgotPasswordPage() {
  const [status, setStatus] = useState('idle'); // 'idle' | 'sending' | 'sent' | 'error'
  const [errorMessage, setErrorMessage] = useState('');

  const handleSendReset = async () => {
    setStatus('sending');
    setErrorMessage('');
    try {
      await authApi.forgotPassword();
      setStatus('sent');
    } catch (err) {
      setStatus('error');
      setErrorMessage(err?.response?.data?.message || 'Something went wrong.');
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md rounded-3xl border border-border bg-card p-8 shadow-sm">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
          <KeyRound className="text-primary" size={40} />
        </div>

        <h1 className="mt-6 text-center text-3xl font-bold text-foreground">
          Reset Your Password
        </h1>
        <p className="mt-4 text-center text-sm leading-6 text-muted-foreground">
          We'll send a password reset link to your account's email address.
        </p>

        {status !== 'sent' && (
          <button
            onClick={handleSendReset}
            disabled={status === 'sending'}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 font-medium text-primary-foreground transition hover:opacity-90 disabled:opacity-50"
          >
            {status === 'sending' ? 'Sending...' : 'Send reset link'}
          </button>
        )}

        {status === 'sent' && (
          <p className="mt-6 rounded-xl bg-muted p-4 text-center text-sm text-muted-foreground">
            Reset link sent — check your inbox (and spam folder).
          </p>
        )}

        {status === 'error' && (
          <p className="mt-3 text-center text-xs text-destructive">
            {errorMessage}
          </p>
        )}

        <Link
          to="/"
          className="mt-6 flex items-center justify-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft size={14} />
          Back to profile
        </Link>
      </div>
    </div>
  );
}
