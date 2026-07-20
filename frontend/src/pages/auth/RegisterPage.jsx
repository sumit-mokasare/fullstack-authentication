import { Box, Mail, Lock, User, Image, Eye } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Input } from '../../components/ui/Input';
import { ShowPassword } from '../../utils';
import { Button } from '../../components/ui/Button';
import { loginSchema, registerSchema } from '../../schemas/authSchema';
import { useApi } from '../../hooks/useApi';
import { authApi } from '../../api/authApi';
import { da } from 'zod/v4/locales';

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    criteriaMode: 'firstError',
    mode: 'onChange',
  });

  const {
    execute: registerUser,
    isLoading,
    error,
    data,
  } = useApi(authApi.register, {
    onSuccess: (data) => {
      console.log(data);
    },
  });

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('username', data.username);
    formData.append('email', data.email);
    formData.append('password', data.password);

    if (data.avatar?.[0]) {
      formData.append('avatar', data.avatar[0]);
    }
    const userResponse = await registerUser(formData);
    console.log(userResponse);
  };

  return (
    <div className="mt-5 space-y-3">
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-2">
          <Input
            label="Username"
            type="text"
            placeholder="username"
            leftIcon={User}
            required
            error={errors?.username?.message}
            {...register('username')}
          />
        </div>
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
            type={showPassword ? 'password' : 'text'}
            placeholder="******"
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

        <div className="space-y-2">
          <Input
            className=" w-full rounded-xl border border-dashed border-border bg-surface p-4 file:mr-4 file:rounded-lg file:border-0 file:bg-primary file:px-4 file:py-2 file:text-white hover:file:bg-primary-hover"
            label="Avatar"
            type="file"
            accept="image/*"
            {...register('avatar')}
          />
        </div>

        <Button variant="primary" className="w-full" isLoading={isLoading}>
          Sign Up
        </Button>
      </form>
    </div>
  );
}
