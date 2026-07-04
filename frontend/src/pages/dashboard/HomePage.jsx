import { Box, ArrowRight, Shield, Lock, Sparkles } from 'lucide-react';
import Navbar from '../../components/ui/Navbar';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* navbar  */}
      <Navbar />
      {/* Hero */}
      <main className="mx-auto flex min-h-[calc(100vh-64px)] max-w-7xl items-center px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid w-full items-center gap-10 lg:grid-cols-2">
          {/* Left Content */}
          <div className="max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm text-muted-foreground">
              <Sparkles size={16} className="text-primary" />
              Welcome to modern authentication
            </div>

            <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Secure access for your{' '}
              <span className="text-primary">next web application</span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
              Build a clean and secure auth experience with login, registration,
              user accounts, and protected access — all inside one modern
              system.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90">
                Get Started
                <ArrowRight size={18} />
              </button>

              <button className="rounded-xl border border-border bg-card px-6 py-3 text-sm font-medium transition hover:bg-muted">
                Explore Auth
              </button>
            </div>

            {/* Small feature cards */}
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Shield size={20} />
                </div>
                <h3 className="text-sm font-semibold">Secure by default</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Safe authentication flows for modern apps.
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Lock size={20} />
                </div>
                <h3 className="text-sm font-semibold">Protected access</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Manage sign in and user access with clarity.
                </p>
              </div>

              <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Sparkles size={20} />
                </div>
                <h3 className="text-sm font-semibold">Clean UI</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Beautiful auth pages with a modern experience.
                </p>
              </div>
            </div>
          </div>

          {/* Right visual section */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-4 shadow-xl">
              {/* Main visual box */}
              <div className="flex justify-around items-center flex-wrap gap-2 min-h-70 p-2 rounded-3xl bg-linear-to-br from-sky-200 via-blue-300 to-pink-200 dark:from-slate-800 dark:via-blue-900 dark:to-purple-900">
                {/* Floating card 1 */}
                <div className=" w-56 h-60 rounded-2xl border border-white/20 bg-card/80 p-4 shadow-lg backdrop-blur">
                  <div className="mb-3 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/20" />
                    <div>
                      <div className="h-3 w-24 rounded bg-muted" />
                      <div className="mt-2 h-2 w-16 rounded bg-muted" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-10 rounded-xl bg-background/80" />
                    <div className="h-10 rounded-xl bg-background/80" />
                    <div className="h-10 rounded-xl bg-primary/80" />
                  </div>
                </div>

                {/* Floating card 2 */}
                <div className="w-56 h-60  rounded-2xl border border-white/20 bg-card/80 p-5 shadow-lg backdrop-blur">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Shield size={20} />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold">
                        Trusted Authentication
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        Fast, simple and secure
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between rounded-xl bg-background/70 px-3 py-2">
                      <span className="text-sm">Login</span>
                      <span className="h-2 w-16 rounded-full bg-primary/60" />
                    </div>
                    <div className="flex items-center justify-between rounded-xl bg-background/70 px-3 py-2">
                      <span className="text-sm">Register</span>
                      <span className="h-2 w-12 rounded-full bg-primary/40" />
                    </div>
                    <div className="flex items-center justify-between rounded-xl bg-background/70 px-3 py-2">
                      <span className="text-sm">Account</span>
                      <span className="h-2 w-20 rounded-full bg-primary/50" />
                    </div>
                  </div>
                </div>

                {/* Decorative circles */}
                <div className="absolute -left-10 bottom-10 h-40 w-40 rounded-full bg-white/20 blur-2xl" />
                <div className="absolute right-10 top-10 h-32 w-32 rounded-full bg-primary/20 blur-2xl" />
                <div className="absolute bottom-20 left-1/2 h-24 w-24 rounded-full bg-pink-200/30 blur-2xl" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
