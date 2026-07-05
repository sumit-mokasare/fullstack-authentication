import React, { forwardRef } from 'react';

export const Input = forwardRef(function Input(
  {
    label,
    error,
    hint,
    leftIcon: LeftIcon,
    rightIcon: RightIcon,
    className = '',
    ...props
  },
  ref,
) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-foreground">
          {label}
          {props.required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}

      <div className="relative">
        {LeftIcon && (
          <div className="absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground">
            <LeftIcon size={16} />
          </div>
        )}
        <input
          ref={ref}
          className={`
        w-full rounded-xl border bg-input text-foreground
        text-sm placeholder:text-muted-foreground
        px-3 py-2.5 transition-colors duration-150
        focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent
        disabled:opacity-50 disabled:cursor-not-allowed
        ${LeftIcon ? 'pl-9' : ''}
        ${RightIcon ? 'pr-9' : ''}
        ${error ? 'border-red-400 focus:ring-red-400' : 'border-border'}
        ${className}
      `}
          {...props}
        />
        {RightIcon && (
          <div className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground">
            <RightIcon size={16} />
          </div>
        )}
      </div>

      {error && (
        <p className="flex items-center gap-1 text-xs text-red-500">
          <span>⚠</span> {error}
        </p>
      )}

      {hint && !error && (
        <p className="text-xs text-muted-foreground">{hint}</p>
      )}
    </div>
  );
});
