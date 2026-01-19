import {
  Star,
  Heart,
  ShoppingCart,
  ArrowLeft,
  Clock,
  Award,
  Shield,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// Server Component - fetch single item data
async function getItem(id) {
  try {
    const res = await fetch(`http://localhost:5000/api/items/${id}`, {
      cache: 'no-store', // Always fetch fresh data
    });

    if (!res.ok) {
      if (res.status === 404) {
        return null; // Item not found
      }
      throw new Error('Failed to fetch item');
    }

    const result = await res.json();
    return result.data;
  } catch (error) {
    console.error('Error fetching item:', error);
    throw error;
  }
}

export default async function ItemDetailsPage({ params }) {
  const { id } = params;

  let item;
  try {
    item = await getItem(id);
  } catch (error) {
    return (
      <div className="min-h-screen bg-[#FFFBEB] pt-24">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="text-center py-20">
            <h1 className="heading-secondary text-[#3C2F2F] mb-4">
              Unable to Load Item
            </h1>
            <p className="text-body text-[#6B5B5B] mb-8">
              Something went wrong while fetching this vinyl record.
            </p>
            <Link href="/items" className="btn-primary">
              Back to Collection
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // If item not found, trigger Next.js 404
  if (!item) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#FFFBEB]">
      {/* Back Navigation */}
      <div className="pt-24 pb-8">
        <div className="max-w-7xl mx-auto container-padding">
          <Link
            href="/items"
            className="inline-flex items-center space-x-2 text-[#6B5B5B] hover:text-[#B08968] transition-smooth"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-small font-medium">Back to Collection</span>
          </Link>
        </div>
      </div>

      {/* Item Details */}
      <div className="section-padding">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Image Section */}
            <div className="space-y-6">
              <div className="relative aspect-square overflow-hidden rounded-lg shadow-elegant">
                <Image
                  src={item.image}
                  alt={`${item.name} by ${item.artist}`}
                  fill
                  className="object-cover"
                  priority
                />

                {/* Badges */}
                <div className="absolute top-4 left-4">
                  <span className="bg-[#B08968] text-white px-3 py-1 rounded-full text-sm font-medium">
                    {item.condition}
                  </span>
                </div>

                <div className="absolute top-4 right-4">
                  <span className="bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                    {item.year}
                  </span>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex space-x-4">
                <button className="flex-1 btn-primary">
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </button>
                <button className="w-12 h-12 border border-[#E8E2DD] rounded-lg flex items-center justify-center hover:bg-[#F7F3F0] transition-smooth">
                  <Heart className="w-5 h-5 text-[#6B5B5B]" />
                </button>
              </div>
            </div>

            {/* Details Section */}
            <div className="space-y-8">
              {/* Header */}
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="flex items-center space-x-1">
                    <Star className="w-5 h-5 text-[#D4A574] fill-current" />
                    <span className="text-body font-medium text-[#3C2F2F]">
                      {item.rating}
                    </span>
                  </div>
                  <span className="text-small text-[#6B5B5B]">•</span>
                  <span className="bg-[#F7F3F0] px-3 py-1 rounded-full text-small text-[#6B5B5B] font-medium">
                    {item.genre}
                  </span>
                </div>

                <h1 className="heading-primary text-[#3C2F2F] mb-2">
                  {item.name}
                </h1>

                <p className="text-lg text-[#6B5B5B] mb-6">
                  by{' '}
                  <span className="font-medium text-[#3C2F2F]">
                    {item.artist}
                  </span>
                </p>

                {/* Price */}
                <div className="flex items-baseline space-x-4 mb-6">
                  <div className="font-serif text-3xl font-semibold text-[#B08968]">
                    ${item.price}
                  </div>
                  {item.originalPrice && (
                    <div className="text-lg text-[#6B5B5B] line-through">
                      ${item.originalPrice}
                    </div>
                  )}
                </div>

                {/* Stock Status */}
                <div className="flex items-center space-x-2 mb-8">
                  <div
                    className={`w-3 h-3 rounded-full ${item.inStock ? 'bg-green-500' : 'bg-red-500'}`}
                  ></div>
                  <span
                    className={`text-small font-medium ${item.inStock ? 'text-green-700' : 'text-red-700'}`}
                  >
                    {item.inStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>
              </div>

              {/* Description */}
              <div>
                <h2 className="heading-tertiary text-[#3C2F2F] mb-4">
                  About This Record
                </h2>
                <p className="text-body text-[#6B5B5B] leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Specifications */}
              <div>
                <h2 className="heading-tertiary text-[#3C2F2F] mb-4">
                  Specifications
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#F7F3F0] p-4 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Clock className="w-4 h-4 text-[#B08968]" />
                      <span className="text-small font-medium text-[#3C2F2F]">
                        Year
                      </span>
                    </div>
                    <span className="text-body text-[#6B5B5B]">
                      {item.year}
                    </span>
                  </div>

                  <div className="bg-[#F7F3F0] p-4 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Award className="w-4 h-4 text-[#B08968]" />
                      <span className="text-small font-medium text-[#3C2F2F]">
                        Condition
                      </span>
                    </div>
                    <span className="text-body text-[#6B5B5B]">
                      {item.condition}
                    </span>
                  </div>

                  <div className="bg-[#F7F3F0] p-4 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Shield className="w-4 h-4 text-[#B08968]" />
                      <span className="text-small font-medium text-[#3C2F2F]">
                        Genre
                      </span>
                    </div>
                    <span className="text-body text-[#6B5B5B]">
                      {item.genre}
                    </span>
                  </div>

                  <div className="bg-[#F7F3F0] p-4 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Star className="w-4 h-4 text-[#B08968]" />
                      <span className="text-small font-medium text-[#3C2F2F]">
                        Rating
                      </span>
                    </div>
                    <span className="text-body text-[#6B5B5B]">
                      {item.rating}/5.0
                    </span>
                  </div>
                </div>
              </div>

              {/* Purchase Section */}
              <div className="bg-[#F7F3F0] p-6 rounded-lg">
                <h3 className="font-serif text-lg font-semibold text-[#3C2F2F] mb-4">
                  Ready to Own This Piece of History?
                </h3>
                <p className="text-small text-[#6B5B5B] mb-6">
                  This authentic vinyl record comes with our guarantee of
                  quality and authenticity. Each record is carefully inspected
                  and graded by our experts.
                </p>
                <div className="flex space-x-4">
                  <button
                    className={`flex-1 ${item.inStock ? 'btn-primary' : 'btn-disabled'}`}
                    disabled={!item.inStock}
                  >
                    <ShoppingCart className="w-5 h-5" />
                    {item.inStock ? 'Add to Cart' : 'Out of Stock'}
                  </button>
                  <button className="px-6 py-3 border border-[#B08968] text-[#B08968] rounded-lg font-medium hover:bg-[#B08968] hover:text-white transition-smooth">
                    Contact Us
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const { id } = params;

  try {
    const item = await getItem(id);

    if (!item) {
      return {
        title: 'Item Not Found | RetroVinyls',
        description: 'The requested vinyl record could not be found.',
      };
    }

    return {
      title: `${item.name} by ${item.artist} | RetroVinyls`,
      description: item.description.substring(0, 160) + '...',
      openGraph: {
        title: `${item.name} by ${item.artist}`,
        description: item.description.substring(0, 160) + '...',
        images: [item.image],
      },
    };
  } catch (error) {
    return {
      title: 'Error Loading Item | RetroVinyls',
      description: 'An error occurred while loading this vinyl record.',
    };
  }
}
