/**
 * Skeleton loading card for items grid
 * Provides visual feedback while content loads
 */

export default function SkeletonCard() {
  return (
    <div className="card-uniform animate-pulse">
      {/* Image skeleton */}
      <div className="relative aspect-square bg-[#E8E2DD] rounded-lg mb-4" />

      {/* Content skeleton */}
      <div className="card-content space-y-3">
        {/* Rating and price row */}
        <div className="flex items-center justify-between">
          <div className="h-4 bg-[#E8E2DD] rounded w-16" />
          <div className="h-6 bg-[#E8E2DD] rounded w-20" />
        </div>

        {/* Title */}
        <div className="h-6 bg-[#E8E2DD] rounded w-3/4" />

        {/* Artist */}
        <div className="h-4 bg-[#E8E2DD] rounded w-1/2" />

        {/* Description */}
        <div className="space-y-2">
          <div className="h-4 bg-[#E8E2DD] rounded w-full" />
          <div className="h-4 bg-[#E8E2DD] rounded w-2/3" />
        </div>

        {/* Tags */}
        <div className="flex items-center justify-between">
          <div className="h-6 bg-[#E8E2DD] rounded w-16" />
          <div className="h-6 bg-[#E8E2DD] rounded w-20" />
        </div>

        {/* Button */}
        <div className="h-10 bg-[#E8E2DD] rounded w-full mt-4" />
      </div>
    </div>
  );
}
