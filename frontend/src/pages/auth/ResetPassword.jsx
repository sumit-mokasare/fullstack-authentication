import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { z } from 'zod';
import { Lock, ArrowLeft } from 'lucide-react';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { authApi } from '../../api/authApi';
import { resetPasswordSchema } from '../../schemas/authSchema';

export default function ResetPasswordPage() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(resetPasswordSchema) });

  const onSubmit = async (data) => {
    setServerError('');
    if (!token) {
      setServerError('Invalid password reset link.');
      return;
    }

    try {
      await authApi.resetPassword(token, data.password);
      setIsSuccess(true);
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setServerError(
        err?.response?.data?.message ||
          'Reset failed — the link may be expired.',
      );
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md rounded-3xl border border-border bg-card p-8 shadow-sm">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
          <Lock className="text-primary" size={40} />
        </div>

        <h1 className="mt-6 text-center text-3xl font-bold text-foreground">
          Set a New Password
        </h1>

        {isSuccess ? (
          <p className="mt-6 rounded-xl bg-muted p-4 text-center text-sm text-muted-foreground">
            Password updated. Redirecting to login...
          </p>
        ) : (
          <form
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            className="mt-6 space-y-4"
          >
            <Input
              label="New password"
              type="password"
              leftIcon={Lock}
              error={errors?.password?.message}
              {...register('password')}
            />
            <Input
              label="Confirm password"
              type="password"
              leftIcon={Lock}
              error={errors?.confirmPassword?.message}
              {...register('confirmPassword')}
            />

            {serverError && (
              <p className="text-sm text-destructive">{serverError}</p>
            )}

            <Button
              type="submit"
              variant="primary"
              className="w-full"
              isLoading={isSubmitting}
            >
              Reset Password
            </Button>
          </form>
        )}

        <Link
          to="/login"
          className="mt-6 flex items-center justify-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft size={14} />
          Back to login
        </Link>
      </div>
    </div>
  );
}
