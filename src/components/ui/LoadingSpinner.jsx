/**
 * Professional loading spinner component
 * Used across the application for consistent loading states
 */

export default function LoadingSpinner({
  size = 'md',
  text = 'Loading...',
  inline = false,
  className = '',
}) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  const spinner = (
    <div
      className={`${sizeClasses[size]} border-2 border-[#B08968] border-t-transparent rounded-full animate-spin ${className}`}
    />
  );

  if (inline) {
    return spinner;
  }

  return (
    <div className="flex flex-col items-center justify-center p-8">
      {spinner}
      <p className="text-[#6B5B5B] text-sm font-medium mt-4">{text}</p>
    </div>
  );
}
