import { Box, Mail, Lock, Eye } from 'lucide-react';
import { Input } from '../../components/ui/Input';
import { ShowPassword } from '../../utils';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { loginSchema } from '../../schemas/authSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useApi } from '../../hooks/useApi';
import { authApi } from '../../api/authApi';
import { Button } from '../../components/ui/Button';
import { useAuthStore } from '../../stores/authStore';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const setAuth = useAuthStore((state) => state.setAuth);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    criteriaMode: 'firstError',
    mode: 'onChange',
  });

  const { execute, error, isLoading } = useApi(authApi.login, {
    onSuccess: (response) => {
      console.log('login response', response);
      setAuth({
        user: response?.data?.user,
        accessToken: response?.data?.accessToken,
      });
      navigate('/');
    },
    showSuccessToast: true,
    successMessage: 'Login successfully',
  });

  const onSubmitLogin = async (data) => {
    const formData = new FormData();
    formData.append('email', data.email);
    formData.append('password', data.password);
    const result = await execute(formData);

    if (!result.success) {
      result?.error?.errors?.forEach((err) => {
        const field = Object.keys(err)[0];
        const message = Object.values(err)[0];
        setError(field, { type: 'server', message: message });
      });
      return;
    }
  };

  return (
    <div className="mt-6 space-y-4">
      {error && <p className="text-red-500">{error.message}</p>}
      <form noValidate onSubmit={handleSubmit(onSubmitLogin)}>
        <div className="space-y-2">
          <Input
            label="Email"
            type="email"
            placeholder="your@example.com"
            leftIcon={Mail}
            required
            error={errors?.email?.message}
            {...register('email')}
          />
        </div>

        <div className="space-y-2">
          <Input
            label="Password"
            type={showPassword ? 'text' : 'password'}
            placeholder="****"
            leftIcon={Lock}
            rightIcon={() => (
              <ShowPassword
                currentStatus={showPassword}
                setStatus={setShowPassword}
              />
            )}
            required
            error={errors?.password?.message}
            {...register('password')}
          />
        </div>

        <Button
          type="submit"
          variant="primary"
          className="w-full mt-4"
          isLoading={isLoading}
        >
          Sign In
        </Button>
      </form>
    </div>
  );
}
