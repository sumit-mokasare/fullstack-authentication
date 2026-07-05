import { Box, Mail, Lock, Eye } from 'lucide-react';
import { Input } from '../../components/ui/Input';
import { ShowPassword } from '../../utils';
import { useState } from 'react';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="mt-6 space-y-4">
      <form noValidate>
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

        <button className="h-10 w-full mt-2 rounded-xl bg-primary text-sm font-medium text-primary-foreground">
          Sign In
        </button>
      </form>
    </div>
  );
}
