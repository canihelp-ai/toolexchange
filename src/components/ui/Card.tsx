import React from 'react';
import { cn } from '../../utils/cn';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outlined';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  padding = 'md',
  className,
  ...props
}) => {
  const variants = {
    default: 'bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border border-white/30',
    elevated: 'bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/40',
    outlined: 'bg-white/80 backdrop-blur-sm rounded-2xl border-2 border-purple-200/50',
  };

  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <div
      className={cn(
        variants[variant],
        paddings[padding],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;