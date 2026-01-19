import { Star, Heart, ShoppingCart, Eye } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

// Force dynamic rendering for this page
export const dynamic = 'force-dynamic';

// Server Component - fetch data on the server
async function getItems() {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    // Handle missing environment variable during build
    if (!apiUrl) {
      console.warn('NEXT_PUBLIC_API_URL is not defined');
      return { success: false, error: 'API URL not configured' };
    }

    const res = await fetch(`${apiUrl}/api/items`, {
      cache: 'no-store', // Always fetch fresh data
    });

    if (!res.ok) {
      throw new Error('Failed to fetch items');
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching items:', error);
    return { success: false, error: error.message };
  }
}

export default async function ItemsPage() {
  const result = await getItems();

  // Handle error state
  if (!result.success) {
    return (
      <div className="min-h-screen bg-[#FFFBEB] pt-24">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="text-center py-20">
            <h1 className="heading-secondary text-[#3C2F2F] mb-4">
              Unable to Load Items
            </h1>
            <p className="text-body text-[#6B5B5B] mb-8">
              {result.error ||
                'Something went wrong while fetching the vinyl records.'}
            </p>
            <Link href="/" className="btn-primary">
              Return Home
            </Link>
          </div>
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
            <div className="text-center py-20">
              <h2 className="heading-tertiary text-[#3C2F2F] mb-4">
                No Records Available
              </h2>
              <p className="text-body text-[#6B5B5B]">
                Check back soon for new additions to our collection.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {items.map((item) => (
                <div key={item._id} className="card-uniform group">
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

                  {/* Content */}
                  <div className="card-content">
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

                    <p className="text-small text-[#6B5B5B] mb-4 text-ellipsis-2 leading-relaxed">
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

                    <Link
                      href={`/items/${item._id}`}
                      className="btn-primary w-full mt-auto text-center"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Metadata for SEO
export const metadata = {
  title: 'Vinyl Records Collection | RetroVinyls',
  description:
    'Browse our carefully curated collection of vintage vinyl records. From classic rock to jazz essentials, find your next musical treasure.',
};
