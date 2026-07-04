import { Box } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header className="border-b border-border bg-card/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Box size={22} />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight">Auth System</h1>
            <p className="text-xs text-muted-foreground">
              Secure authentication platform
            </p>
          </div>
        </div>

        {/* Nav actions */}
        <div className="flex items-center gap-3">
          <Link to={'/login'}>
            <button className="rounded-xl border border-border bg-background px-5 py-2 text-sm font-medium transition hover:bg-muted">
              Login
            </button>
          </Link>
          <Link to={'/register'}>
            <button className="rounded-xl bg-primary px-5 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90">
              Register
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
