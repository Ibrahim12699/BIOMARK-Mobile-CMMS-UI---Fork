import React from 'react';
interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'ghost' | 'solid';
}
export function IconButton({
  icon,
  size = 'md',
  variant = 'ghost',
  className = '',
  ...props
}: IconButtonProps) {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };
  const variants = {
    ghost: 'hover:bg-gray-100 dark:hover:bg-navy-light',
    solid: 'bg-primary text-white hover:bg-primary-dark'
  };
  return <button className={`inline-flex items-center justify-center rounded-xl transition-colors min-w-[44px] min-h-[44px] ${sizes[size]} ${variants[variant]} ${className}`} {...props}>
      {icon}
    </button>;
}