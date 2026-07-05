import { Box, Mail, Lock, User, Image, Eye } from 'lucide-react';
import { Input } from '../../components/ui/Input';
import { ShowPassword } from '../../utils';
import { useState } from 'react';
import { Button } from '../../components/ui/Button';

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="mt-5 space-y-3">
      <form noValidate>
        <div className="space-y-2">
          <Input
            label="Username"
            type="text"
            placeholder="username"
            leftIcon={User}
            required
          />
        </div>
        <div className="space-y-2">
          <Input
            label="Email"
            type="email"
            placeholder="your@example.com"
            leftIcon={Mail}
            required
          />
        </div>

        <div className="space-y-2">
          <Input
            label="Password"
            type={showPassword ? 'password' : 'text'}
            placeholder="****"
            leftIcon={Lock}
            rightIcon={() => (
              <ShowPassword
                currentStatus={showPassword}
                setStatus={setShowPassword}
              />
            )}
            required
          />
        </div>

        <div className="space-y-2">
          <Input
            className=" w-full rounded-xl border border-dashed border-border bg-surface p-4 file:mr-4 file:rounded-lg file:border-0 file:bg-primary file:px-4 file:py-2 file:text-white hover:file:bg-primary-hover"
            label="Avatar"
            type="file"
            accept="image/*"
          />
        </div>

        <button className="h-10 w-full mt-2 rounded-xl bg-primary text-sm font-medium text-primary-foreground">
          Sign Up
        </button>
      </form>
    </div>
  );
}
