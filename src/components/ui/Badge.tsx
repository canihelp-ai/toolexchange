import React from 'react';
import { cn } from '../../utils/cn';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md';
}

const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  className,
  ...props
}) => {
  const variants = {
    default: 'bg-gray-100/80 backdrop-blur-sm text-gray-800 border border-gray-200/50',
    success: 'bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-lg',
    warning: 'bg-gradient-to-r from-orange-400 to-yellow-500 text-white shadow-lg',
    error: 'bg-gradient-to-r from-red-400 to-pink-500 text-white shadow-lg',
    info: 'bg-gradient-to-r from-blue-400 to-cyan-500 text-white shadow-lg',
  };

  const sizes = {
    sm: 'px-2 py-1 text-xs',
    md: 'px-3 py-1 text-sm',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center font-medium rounded-full',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;