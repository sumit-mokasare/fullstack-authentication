import React from 'react';
import { Loader2 } from 'lucide-react';

// Base classes applied to every button variant
const BASE =
  'inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-150 focus:outline-none  disabled:opacity-50 disabled:cursor-not-allowed';

// Variant-specific classes
const VARIANTS = {
  primary: ` bg-primary text-white hover:bg-primary-hover focus:ring-2 focus:ring-primary`,
  secondary: ` bg-card text-text border border-border hover:border-primary hover:bg-surface`,
  danger: `bg-red-600 text-white hover:bg-red-700 focus:ring-2 focus:ring-red-500`,
  ghost: ` text-muted hover:bg-card hover:text-text`,
  outline: `border border-primary text-primary hover:bg-primary/10`,
};

// Size-specific classes
const SIZES = {
  sm: 'text-xs px-3 py-1.5',
  md: 'text-sm px-4 py-2',
  lg: 'text-base px-6 py-3',
  xl: 'text-lg px-8 py-4',
};

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  className = '',
  ...props
}) => {
  return (
    <button
      className={`${BASE} ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading && <Loader2 size={16} className="animate-spin" />}
      {children}
    </button>
  );
};
