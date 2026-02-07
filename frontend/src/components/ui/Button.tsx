'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  className,
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-300 rounded-full hover:scale-[1.02] active:scale-[0.98]';
  
  const variants = {
    primary: 'bg-yellow-400 hover:bg-yellow-500 text-black font-semibold',
    secondary: 'bg-black hover:bg-gray-900 text-white',
    outline: 'bg-transparent text-black border-2 border-black hover:bg-black hover:text-white',
    ghost: 'bg-transparent text-black hover:bg-gray-100',
  };

  const sizes = {
    small: 'px-6 py-2 text-sm',
    medium: 'px-8 py-4 text-base',
    large: 'px-10 py-5 text-lg',
  };

  return (
    <button
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        fullWidth && 'w-full',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
