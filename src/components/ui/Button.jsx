/**
 * Professional Button Component - Retro-Modern Design System
 * Sophisticated, high-end aesthetic with consistent sizing
 */

import { forwardRef } from 'react';
import { cn } from '@/utils/cn';

const Button = forwardRef(
  (
    {
      children,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      disabled = false,
      className = '',
      icon: Icon,
      iconPosition = 'left',
      fullWidth = false,
      ...props
    },
    ref,
  ) => {
    // Base styles with professional proportions and retro-modern aesthetic
    const baseStyles = `
      inline-flex items-center justify-center
      font-medium tracking-wide
      rounded-full
      transition-all duration-300 ease-out
      focus:outline-none focus:ring-2 focus:ring-offset-2
      disabled:cursor-not-allowed disabled:opacity-60
      select-none
      border
    `;

    // Professional size variants - no oversized buttons
    const sizes = {
      sm: 'px-4 py-1.5 text-sm', // Navbar/Secondary
      md: 'px-6 py-2 text-base', // Cards/Normal
      lg: 'px-8 py-3 text-lg', // Hero/Main CTA
    };

    // Retro-modern color palette with sophisticated aesthetics
    const variants = {
      primary: `
        bg-[#3C2F2F] text-white border-[#3C2F2F]
        hover:bg-[#2A1F1F] hover:border-[#2A1F1F] hover:-translate-y-0.5 hover:shadow-lg
        focus:ring-[#3C2F2F]/20
        disabled:bg-stone-400 disabled:border-stone-400 disabled:hover:translate-y-0
      `,
      secondary: `
        bg-[#B08968] text-white border-[#B08968]
        hover:bg-[#9A7B5F] hover:border-[#9A7B5F] hover:-translate-y-0.5 hover:shadow-lg
        focus:ring-[#B08968]/20
        disabled:bg-stone-400 disabled:border-stone-400 disabled:hover:translate-y-0
      `,
      outline: `
        bg-transparent text-[#3C2F2F] border-[#3C2F2F]
        hover:bg-[#3C2F2F] hover:text-white hover:-translate-y-0.5 hover:shadow-md
        focus:ring-[#3C2F2F]/20
        disabled:text-stone-400 disabled:border-stone-300 disabled:hover:translate-y-0
      `,
      ghost: `
        bg-transparent text-[#6B5B5B] border-transparent
        hover:bg-[#F7F3F0] hover:text-[#3C2F2F] hover:border-[#E8E2DD]
        focus:ring-stone-200
        disabled:text-stone-400 disabled:hover:bg-transparent
      `,
      minimal: `
        bg-transparent text-[#3C2F2F] border-transparent
        hover:bg-[#F7F3F0] hover:-translate-y-0.5
        focus:ring-[#3C2F2F]/10
        disabled:text-stone-400 disabled:hover:translate-y-0
      `,
    };

    const isDisabled = disabled || isLoading;

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={cn(
          baseStyles,
          sizes[size],
          variants[variant],
          fullWidth && 'w-full',
          className,
        )}
        {...props}
      >
        {/* Loading spinner */}
        {isLoading && (
          <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        )}

        {/* Left icon */}
        {Icon && iconPosition === 'left' && !isLoading && (
          <Icon className="mr-2 h-4 w-4" />
        )}

        {children}

        {/* Right icon */}
        {Icon && iconPosition === 'right' && !isLoading && (
          <Icon className="ml-2 h-4 w-4" />
        )}
      </button>
    );
  },
);

Button.displayName = 'Button';

export default Button;
