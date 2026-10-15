import React from 'react';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  icon: Icon,
  iconPosition = 'left',
  ...props
}) {
  const baseStyles =
    'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none rounded-lg';

  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2.5 gap-2',
    lg: 'text-base px-6 py-3.5 gap-2.5',
  };

  const variantStyles = {
    primary:
      'bg-slate-900 hover:bg-slate-800 text-white shadow-sm focus:ring-slate-900 dark:bg-cyan-400 dark:hover:bg-cyan-300 dark:text-slate-950 font-semibold',
    secondary:
      'bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-200 shadow-sm focus:ring-slate-400 dark:bg-slate-800/90 dark:hover:bg-slate-750 dark:text-white dark:border-slate-700',
    outline:
      'border border-slate-300 hover:bg-slate-100 text-slate-800 focus:ring-slate-400 dark:border-slate-700 dark:hover:bg-slate-800/60 dark:text-slate-200 font-medium',
    ghost:
      'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-800/40',
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 shrink-0" />}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 shrink-0" />}
    </button>
  );
}
