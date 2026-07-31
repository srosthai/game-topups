import React from 'react';
import { cn } from '../../lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  ...props
}) => {
  const baseStyle = 'inline-flex items-center justify-center font-semibold transition-all duration-150 focus:outline-none cursor-pointer rounded-xl border-[#1D1D1D]';

  const variants = {
    primary: 'bg-[#A8C88A] text-[#1D1D1D] border-1.5 shadow-[2px_2px_0px_#1D1D1D] hover:shadow-[3px_3px_0px_#1D1D1D] hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#1D1D1D]',
    secondary: 'bg-[#E2EFE0] text-[#1D1D1D] border-1.5 shadow-[2px_2px_0px_#1D1D1D] hover:shadow-[3px_3px_0px_#1D1D1D] hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0px_#1D1D1D]',
    outline: 'bg-white text-[#1D1D1D] border-1.5 shadow-[2px_2px_0px_#1D1D1D] hover:bg-[#F8F7F3] hover:shadow-[3px_3px_0px_#1D1D1D] hover:-translate-y-0.5 active:translate-y-0.5',
    dark: 'bg-[#1D1D1D] text-white border-1.5 border-[#1D1D1D] shadow-[2px_2px_0px_#1D1D1D] hover:bg-[#333333] hover:-translate-y-0.5 active:translate-y-0.5',
    ghost: 'bg-transparent text-[#1D1D1D] hover:bg-[#E2EFE0]/60 hover:text-[#1D1D1D]',
  };

  const sizes = {
    sm: 'text-xs px-3 py-1.5',
    md: 'text-sm px-4 py-2',
    lg: 'text-base px-6 py-2.5',
  };

  return (
    <button
      className={cn(
        baseStyle,
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
};
