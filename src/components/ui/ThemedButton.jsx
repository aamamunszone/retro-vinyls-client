/**
 * Professional themed button component with consistent states
 * Provides hover, active, disabled, and loading states
 */

import { forwardRef } from 'react';
import LoadingSpinner from './LoadingSpinner';

const ThemedButton = forwardRef(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      disabled = false,
      className = '',
      ...props
    },
    ref,
  ) => {
    const baseClasses =
      'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-3 focus:ring-offset-2 disabled:cursor-not-allowed';

    const variants = {
      primary: `
      bg-[#B08968] text-white border-2 border-[#B08968]
      hover:bg-[#9A7B5F] hover:border-[#9A7B5F] hover:shadow-lg hover:-translate-y-0.5
      active:translate-y-0 active:shadow-md
      focus:ring-[#B08968]/30
      disabled:bg-stone-300 disabled:border-stone-300 disabled:text-stone-500 disabled:hover:translate-y-0 disabled:hover:shadow-none
    `,
      secondary: `
      bg-white text-[#B08968] border-2 border-[#B08968]
      hover:bg-[#B08968] hover:text-white hover:shadow-lg hover:-translate-y-0.5
      active:translate-y-0 active:shadow-md
      focus:ring-[#B08968]/30
      disabled:bg-stone-100 disabled:border-stone-300 disabled:text-stone-400 disabled:hover:translate-y-0 disabled:hover:shadow-none disabled:hover:bg-stone-100 disabled:hover:text-stone-400
    `,
      danger: `
      bg-red-600 text-white border-2 border-red-600
      hover:bg-red-700 hover:border-red-700 hover:shadow-lg hover:-translate-y-0.5
      active:translate-y-0 active:shadow-md
      focus:ring-red-500/30
      disabled:bg-stone-300 disabled:border-stone-300 disabled:text-stone-500 disabled:hover:translate-y-0 disabled:hover:shadow-none
    `,
      ghost: `
      bg-transparent text-[#6B5B5B] border-2 border-stone-200
      hover:bg-stone-50 hover:border-stone-300 hover:text-[#3C2F2F]
      active:bg-stone-100
      focus:ring-stone-300/30
      disabled:text-stone-400 disabled:border-stone-200 disabled:hover:bg-transparent disabled:hover:text-stone-400
    `,
    };

    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
    };

    const isDisabled = disabled || isLoading;

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={`
        ${baseClasses}
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
        {...props}
      >
        {isLoading && (
          <LoadingSpinner size="sm" inline className="mr-2 border-current!" />
        )}
        {children}
      </button>
    );
  },
);

ThemedButton.displayName = 'ThemedButton';

export default ThemedButton;
