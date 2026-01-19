/**
 * Premium Retro-Modern Skeleton Loader System
 * Consistent, beautiful loading states that match our design palette
 */

import { cn } from '@/utils/cn';

// Base skeleton component with shimmer effect
const Skeleton = ({ className, ...props }) => {
  return (
    <div
      className={cn(
        'relative overflow-hidden bg-linear-to-r from-stone-200 via-stone-100 to-stone-200 bg-size-[200%_100%] animate-shimmer rounded-md',
        className,
      )}
      {...props}
    />
  );
};

// Text skeleton with proper typography proportions
const SkeletonText = ({
  lines = 1,
  className = '',
  widths = ['100%'],
  spacing = 'space-y-2',
}) => {
  const lineWidths = Array.isArray(widths) ? widths : [widths];

  return (
    <div className={cn(spacing, className)}>
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton
          key={index}
          className="h-4"
          style={{
            width: lineWidths[index % lineWidths.length] || lineWidths[0],
          }}
        />
      ))}
    </div>
  );
};

// Image skeleton with aspect ratio support
const SkeletonImage = ({
  aspectRatio = 'aspect-square',
  className = '',
  rounded = 'rounded-lg',
}) => {
  return <Skeleton className={cn('w-full', aspectRatio, rounded, className)} />;
};

// Button skeleton with proper proportions
const SkeletonButton = ({ size = 'md', fullWidth = false, className = '' }) => {
  const sizeClasses = {
    sm: 'h-9 w-24',
    md: 'h-11 w-32',
    lg: 'h-12 w-40',
  };

  return (
    <Skeleton
      className={cn(
        'rounded-full',
        fullWidth ? 'w-full h-11' : sizeClasses[size],
        className,
      )}
    />
  );
};

// Badge/chip skeleton
const SkeletonBadge = ({ className = '' }) => {
  return <Skeleton className={cn('h-6 w-16 rounded-full', className)} />;
};

// Avatar/circular image skeleton
const SkeletonAvatar = ({ size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20',
  };

  return (
    <Skeleton className={cn('rounded-full', sizeClasses[size], className)} />
  );
};

// Input field skeleton
const SkeletonInput = ({ className = '' }) => {
  return <Skeleton className={cn('h-11 w-full rounded-lg', className)} />;
};

// Card skeleton for vinyl records
const SkeletonCard = ({ className = '' }) => {
  return (
    <div className={cn('card-uniform flex flex-col', className)}>
      {/* Image Container */}
      <div className="relative mb-4">
        <SkeletonImage
          aspectRatio="aspect-square"
          rounded="rounded-lg"
          className="shadow-sm"
        />

        {/* Badges overlay */}
        <div className="absolute top-3 left-3">
          <SkeletonBadge className="bg-stone-300/60" />
        </div>
        <div className="absolute top-3 right-3">
          <SkeletonBadge className="bg-stone-300/60 w-12" />
        </div>
      </div>

      {/* Content */}
      <div className="card-content grow flex flex-col space-y-3">
        {/* Rating and Price Row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <Skeleton className="w-4 h-4 rounded-sm" />
            <Skeleton className="w-8 h-4" />
          </div>
          <div className="text-right space-y-1">
            <Skeleton className="w-12 h-3 ml-auto" />
            <Skeleton className="w-16 h-5 ml-auto" />
          </div>
        </div>

        {/* Title */}
        <SkeletonText lines={1} widths={['75%']} className="space-y-0" />

        {/* Artist */}
        <SkeletonText lines={1} widths={['50%']} className="space-y-0" />

        {/* Description */}
        <SkeletonText
          lines={2}
          widths={['100%', '80%']}
          spacing="space-y-1"
          className="grow"
        />

        {/* Tags Row */}
        <div className="flex items-center justify-between">
          <SkeletonBadge className="w-14" />
          <SkeletonBadge className="w-18" />
        </div>

        {/* Button */}
        <SkeletonButton fullWidth className="mt-auto" />
      </div>
    </div>
  );
};

// Control bar skeleton for filters and search
const SkeletonControlBar = ({ className = '' }) => {
  return (
    <div
      className={cn(
        'bg-white/70 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-elegant',
        className,
      )}
    >
      {/* Desktop Layout */}
      <div className="hidden lg:flex items-center justify-between space-x-6">
        {/* Search Bar */}
        <div className="flex-1 max-w-md">
          <SkeletonInput className="bg-white/50" />
        </div>

        {/* Filter Chips */}
        <div className="flex items-center space-x-2">
          <Skeleton className="w-4 h-4" />
          <div className="flex space-x-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonBadge key={i} className="w-12" />
            ))}
          </div>
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center space-x-2">
          <Skeleton className="w-4 h-4" />
          <Skeleton className="w-32 h-9 rounded-lg" />
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="lg:hidden space-y-4">
        <SkeletonInput />
        <div className="flex space-x-4">
          <Skeleton className="flex-1 h-9 rounded-lg" />
          <Skeleton className="flex-1 h-9 rounded-lg" />
        </div>
      </div>

      {/* Results Summary */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-stone-200/50">
        <div className="flex items-center space-x-2">
          <Skeleton className="w-4 h-4" />
          <Skeleton className="w-32 h-4" />
        </div>
      </div>
    </div>
  );
};

// Details page skeleton with 2-column layout
const SkeletonDetailsPage = ({ className = '' }) => {
  return (
    <div
      className={cn(
        'grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16',
        className,
      )}
    >
      {/* Left Column - Image */}
      <div className="space-y-6">
        <div className="relative">
          <SkeletonImage
            aspectRatio="aspect-square"
            rounded="rounded-2xl"
            className="shadow-2xl border border-stone-200"
          />

          {/* Badges */}
          <div className="absolute top-6 left-6">
            <SkeletonBadge className="w-20 bg-stone-300/60" />
          </div>
          <div className="absolute top-6 right-6">
            <SkeletonBadge className="w-12 bg-stone-300/60" />
          </div>
          <div className="absolute bottom-6 left-6">
            <SkeletonBadge className="w-16 bg-stone-300/60" />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4">
          <SkeletonButton size="lg" fullWidth />
          <Skeleton className="w-14 h-12 rounded-xl" />
        </div>
      </div>

      {/* Right Column - Details */}
      <div className="space-y-8">
        {/* Header */}
        <div className="space-y-6">
          {/* Badges Row */}
          <div className="flex items-center space-x-4">
            <SkeletonBadge className="w-12" />
            <SkeletonBadge className="w-16" />
          </div>

          {/* Title */}
          <div className="space-y-2">
            <Skeleton className="h-12 w-4/5" />
            <Skeleton className="h-12 w-3/5" />
          </div>

          {/* Artist */}
          <div className="flex items-center space-x-2">
            <Skeleton className="h-6 w-8" />
            <Skeleton className="h-8 w-32 rounded-lg" />
          </div>

          {/* Price */}
          <div className="flex items-baseline space-x-4">
            <Skeleton className="h-10 w-24" />
            <div className="space-y-1">
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-4 w-20" />
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-stone-100 p-6 rounded-xl space-y-4">
          <Skeleton className="h-6 w-40" />
          <SkeletonText
            lines={4}
            widths={['100%', '95%', '88%', '75%']}
            spacing="space-y-2"
          />
        </div>

        {/* Specifications */}
        <div className="space-y-6">
          <Skeleton className="h-6 w-32" />
          <div className="grid grid-cols-2 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="bg-white border border-stone-200 p-4 rounded-xl space-y-2"
              >
                <div className="flex items-center space-x-2">
                  <Skeleton className="w-5 h-5" />
                  <Skeleton className="h-4 w-20" />
                </div>
                <Skeleton className="h-5 w-16" />
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-linear-to-br from-stone-300 to-stone-400 p-8 rounded-2xl space-y-6">
          <Skeleton className="h-8 w-3/4 bg-white/30" />
          <SkeletonText
            lines={3}
            widths={['100%', '90%', '80%']}
            className="space-y-2"
          />
          <div className="flex flex-col sm:flex-row gap-4">
            <SkeletonButton size="lg" fullWidth className="bg-white/30" />
            <SkeletonButton size="lg" className="bg-white/20" />
          </div>
        </div>
      </div>
    </div>
  );
};

// Form skeleton for add item page
const SkeletonForm = ({ className = '' }) => {
  return (
    <div
      className={cn(
        'bg-white rounded-lg shadow-elegant border border-stone-200 p-8',
        className,
      )}
    >
      <div className="space-y-8">
        {/* Section 1 */}
        <div className="space-y-6">
          <Skeleton className="h-6 w-40" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="h-4 w-24" />
                <SkeletonInput />
              </div>
            ))}
          </div>
        </div>

        {/* Section 2 */}
        <div className="space-y-6">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-24 w-full rounded-lg" />
        </div>

        {/* Section 3 */}
        <div className="space-y-6">
          <Skeleton className="h-6 w-48" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="h-4 w-20" />
                <SkeletonInput />
              </div>
            ))}
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex justify-end space-x-4 pt-8 border-t border-stone-200">
          <SkeletonButton size="md" />
          <SkeletonButton size="md" />
        </div>
      </div>
    </div>
  );
};

export {
  Skeleton,
  SkeletonText,
  SkeletonImage,
  SkeletonButton,
  SkeletonBadge,
  SkeletonAvatar,
  SkeletonInput,
  SkeletonCard,
  SkeletonControlBar,
  SkeletonDetailsPage,
  SkeletonForm,
};

export default Skeleton;
