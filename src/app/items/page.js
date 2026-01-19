import { Star, Heart, ShoppingCart, Eye } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { itemsApi } from '@/utils/api';
import ErrorState from '@/components/ui/ErrorState';
import EmptyState from '@/components/ui/EmptyState';
import ScrollToTop from '@/components/ui/ScrollToTop';

// Server Component - fetch data using centralized API utilities
async function getItems() {
  try {
    const data = await itemsApi.getAll();
    return { success: true, ...data };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}

export default async function ItemsPage() {
  const result = await getItems();

  // Handle error state with professional error component
  if (!result.success) {
    return (
      <div className="min-h-screen bg-[#FFFBEB] pt-24">
        <div className="max-w-7xl mx-auto container-padding">
          <ErrorState
            title="Unable to Load Collection"
            message={
              result.error ||
              'We encountered an issue loading the vinyl records. Please try again later.'
            }
            showRetry={false}
            showHomeLink={true}
          />
        </div>
      </div>
    );
  }

  const { data: items, count } = result;

  return (
    <div className="min-h-screen bg-[#FFFBEB]">
      {/* Header Section */}
      <div className="pt-24 pb-12 bg-[#F7F3F0]">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="text-center">
            <span className="text-small text-[#B08968] font-medium tracking-wide uppercase mb-4 block">
              Our Collection
            </span>
            <h1 className="heading-primary text-[#3C2F2F] mb-6">
              Vinyl Records
            </h1>
            <p className="text-body max-w-2xl mx-auto mb-8">
              Discover our carefully curated collection of vintage vinyl
              records. Each piece tells a story and represents a moment in
              musical history.
            </p>
            <div className="text-small text-[#6B5B5B]">
              {count} {count === 1 ? 'record' : 'records'} available
            </div>
          </div>
        </div>
      </div>

      {/* Items Grid */}
      <div className="section-padding">
        <div className="max-w-7xl mx-auto container-padding">
          {items.length === 0 ? (
            <EmptyState
              title="No Vinyl Records Found"
              message="Our collection is currently empty, but every great collection starts with a single record. Be the first to add a piece of musical history to our community."
              actionText="Add First Record"
              actionHref="/items/add"
              showAction={true}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {items.map((item) => (
                <div
                  key={item._id}
                  className="card-uniform group flex flex-col"
                >
                  {/* Image Container */}
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={item.image}
                      alt={`${item.name} by ${item.artist}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-elegant"
                    />

                    {/* Overlay Actions */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-elegant flex items-center justify-center">
                      <div className="flex space-x-3">
                        <button className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-smooth">
                          <Heart className="w-4 h-4 text-white" />
                        </button>
                        <button className="w-10 h-10 bg-[#B08968] rounded-full flex items-center justify-center hover:bg-[#9A7B5F] transition-smooth">
                          <ShoppingCart className="w-4 h-4 text-white" />
                        </button>
                        <Link
                          href={`/items/${item._id}`}
                          className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-smooth"
                        >
                          <Eye className="w-4 h-4 text-white" />
                        </Link>
                      </div>
                    </div>

                    {/* Badges */}
                    <div className="absolute top-3 left-3">
                      <span className="bg-[#B08968] text-white px-2 py-1 rounded text-xs font-medium">
                        {item.condition}
                      </span>
                    </div>

                    <div className="absolute top-3 right-3">
                      <span className="bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded text-xs">
                        {item.year}
                      </span>
                    </div>
                  </div>

                  {/* Content - grow ensures consistent card heights */}
                  <div className="card-content grow flex flex-col">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-[#D4A574] fill-current" />
                        <span className="text-small text-[#6B5B5B] font-medium">
                          {item.rating}
                        </span>
                      </div>
                      <div className="text-right">
                        {item.originalPrice && (
                          <div className="text-xs text-[#6B5B5B] line-through">
                            ${item.originalPrice}
                          </div>
                        )}
                        <div className="font-serif text-lg font-semibold text-[#B08968]">
                          ${item.price}
                        </div>
                      </div>
                    </div>

                    <h3 className="font-serif text-lg font-semibold text-[#3C2F2F] mb-1 group-hover:text-[#B08968] transition-smooth">
                      {item.name}
                    </h3>

                    <p className="text-small text-[#6B5B5B] mb-3">
                      by {item.artist}
                    </p>

                    <p className="text-small text-[#6B5B5B] mb-4 text-ellipsis-2 leading-relaxed grow">
                      {item.description}
                    </p>

                    <div className="flex items-center justify-between text-xs text-[#6B5B5B] mb-4">
                      <span className="bg-[#F7F3F0] px-2 py-1 rounded">
                        {item.genre}
                      </span>
                      <span
                        className={`px-2 py-1 rounded ${item.inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
                      >
                        {item.inStock ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </div>

                    <Link href={`/items/${item._id}`} className="mt-auto">
                      <Button variant="primary" size="sm" fullWidth>
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <ScrollToTop />
    </div>
  );
}

// Metadata for SEO
export const metadata = {
  title: 'Vinyl Records Collection | RetroVinyls',
  description:
    'Browse our carefully curated collection of vintage vinyl records. From classic rock to jazz essentials, find your next musical treasure.',
};
