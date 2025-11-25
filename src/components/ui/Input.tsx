import React from 'react';
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  fullWidth?: boolean;
}
export function Input({
  label,
  error,
  icon,
  fullWidth = true,
  className = '',
  ...props
}: InputProps) {
  return <div className={`${fullWidth ? 'w-full' : ''}`}>
      {label && <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          {label}
        </label>}
      <div className="relative">
        {icon && <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </div>}
        <input className={`w-full px-4 py-3 ${icon ? 'pl-10' : ''} rounded-xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-navy-light text-gray-900 dark:text-white placeholder-gray-400 focus:border-primary focus:outline-none transition-colors min-h-[44px] ${error ? 'border-red-500' : ''} ${className}`} {...props} />
      </div>
      {error && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>}
    </div>;
}