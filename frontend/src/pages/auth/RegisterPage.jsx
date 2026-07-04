import { Box, Mail, Lock, User, Image, Eye } from 'lucide-react';

export default function RegisterPage() {
  return (
    <div className="flex w-full flex-col justify-between p-6 md:w-1/2 md:p-8 lg:p-10">
      <div>
        <div className="mb-8 flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Box size={20} />
          </div>
          <span className="text-lg font-semibold">Auth System</span>
        </div>

        <div className="mx-auto w-full max-w-md">
          <p className="mb-1 text-sm text-muted-foreground">
            Create your account
          </p>
          <h1 className="text-2xl font-bold">Sign up to Auth System</h1>

          <div className="mt-5 space-y-3">
            <div className="space-y-2">
              <label className="text-sm font-medium">Username</label>
              <div className="flex h-10 items-center rounded-xl border border-border bg-background px-4">
                <input
                  type="text"
                  placeholder="Enter your username"
                  className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                />
                <User size={18} className="text-muted-foreground" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <div className="flex h-10 items-center rounded-xl border border-border bg-background px-4">
                <input
                  type="email"
                  placeholder="example@email.com"
                  className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                />
                <Mail size={18} className="text-muted-foreground" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Password</label>
              <div className="flex h-10 items-center rounded-xl border border-border bg-background px-4">
                <input
                  type="password"
                  placeholder="Create a password"
                  className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                />
                <Eye size={18} className="text-muted-foreground" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Avatar</label>
              <div className="flex h-10 items-center rounded-xl border border-border bg-background px-4">
                <input
                  type="file"
                  className="w-full bg-transparent text-sm outline-none file:mr-3 file:rounded-md file:border-0 file:bg-primary file:px-3 file:py-1 file:text-sm file:text-primary-foreground"
                />
                <Image size={18} className="text-muted-foreground" />
              </div>
            </div>

            <button className="h-10 w-full rounded-xl bg-primary text-sm font-medium text-primary-foreground">
              Sign Up
            </button>
          </div>

          <div className="my-4 flex items-center gap-4">
            <div className="h-px flex-1 bg-border" />
            <span className="text-sm text-muted-foreground">
              or sign up with
            </span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <button className="flex h-10 items-center justify-center rounded-xl border border-border bg-background">
              {/* <Facebook size={18} /> */}
            </button>
            <button className="flex h-10 items-center justify-center rounded-xl border border-border bg-background">
              {/* <Chrome size={18} /> */}
            </button>
            <button className="flex h-10 items-center justify-center rounded-xl border border-border bg-background">
              {/* <Apple size={18} /> */}
            </button>
          </div>
        </div>
      </div>

      <p className="pt-4 text-sm text-muted-foreground">
        Already have an account?{' '}
        <span className="font-medium text-primary">Sign in</span>
      </p>
    </div>
  );
}
