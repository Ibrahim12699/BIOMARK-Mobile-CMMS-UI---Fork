import React from 'react';
import { User } from 'lucide-react';
interface AvatarProps {
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}
export function Avatar({
  src,
  alt = 'User',
  size = 'md',
  className = ''
}: AvatarProps) {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-16 h-16'
  };
  if (src) {
    return <img src={src} alt={alt} className={`${sizes[size]} rounded-full object-cover ${className}`} />;
  }
  return <div className={`${sizes[size]} rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center ${className}`}>
      <User className="w-1/2 h-1/2 text-gray-500 dark:text-gray-400" />
    </div>;
}