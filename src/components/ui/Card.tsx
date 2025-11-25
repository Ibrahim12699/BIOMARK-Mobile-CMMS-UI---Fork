import React from 'react';
interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}
export function Card({
  children,
  className = '',
  onClick,
  padding = 'md'
}: CardProps) {
  const paddingStyles = {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6'
  };
  return <div className={`bg-white dark:bg-navy-light rounded-card shadow-card dark:shadow-card-dark ${paddingStyles[padding]} ${onClick ? 'cursor-pointer hover:shadow-lg transition-shadow' : ''} ${className}`} onClick={onClick}>
      {children}
    </div>;
}