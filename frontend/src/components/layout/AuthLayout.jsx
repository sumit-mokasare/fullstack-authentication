import React from 'react';
import LoginPage from '../../pages/auth/LoginPage';
import { Link, Outlet } from 'react-router-dom';
import { MoveLeft } from 'lucide-react';

export const AuthLayout = () => {
  return (
    <div className="h-screen flex justify-center items-center  bg-background p-4 text-foreground md:p-6">
      <Link to={'/'}>
        <button className="absolute left-1.5 top-1.5 rounded-xl m-2 border border-border bg-background px-5 py-2 text-sm font-medium transition hover:bg-muted">
          <MoveLeft size={16} />
        </button>
      </Link>
      <div className="mx-auto flex h-full w-full max-w-6xl overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        {/* left side */}
        <Outlet />
        {/* right side */}
        <div className=" h-full md:block md:w-1/2">
          <div className="h-full w-full bg-linear-to-br from-sky-200 via-blue-300 to-pink-200 dark:from-slate-800 dark:via-blue-900 dark:to-purple-900" />
        </div>
      </div>
    </div>
  );
};
