import {
  Star,
  Heart,
  ShoppingCart,
  ArrowLeft,
  Clock,
  Award,
  Shield,
  Music,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Button from '@/components/ui/Button';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

// Server Component - fetch single item data
async function getItem(id) {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    // Handle missing environment variable during build
    if (!apiUrl) {
      console.error('NEXT_PUBLIC_API_URL is not defined');
      return null;
    }

    console.log('Fetching item from:', `${apiUrl}/api/items/${id}`);

    // Create timeout controller manually for better compatibility
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    const res = await fetch(`${apiUrl}/api/items/${id}`, {
      cache: 'no-store', // Always fetch fresh data
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      if (res.status === 404) {
        console.log('Item not found:', id);
        return null; // Item not found
      }
      const errorText = await res.text();
      console.error('API Error:', res.status, res.statusText, errorText);
      throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    }

    const result = await res.json();
    console.log('Item fetched successfully:', result.data?.name);
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
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
            <h1 className="heading-secondary text-[#3C2F2F] mb-4">
              Unable to Load Item
            </h1>
            <p className="text-body text-[#6B5B5B] mb-8 max-w-md mx-auto">
              Something went wrong while fetching this vinyl record. Please try
              again later.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/items">
                <Button variant="primary" size="md">
                  Back to Collection
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="md"
                onClick={() => window.location.reload()}
              >
                Try Again
              </Button>
            </div>
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
      {/* Professional Back Navigation */}
      <div className="pt-24 pb-8 bg-[#F7F3F0]">
        <div className="max-w-7xl mx-auto container-padding">
          <Link
            href="/items"
            className="inline-flex items-center space-x-2 text-[#6B5B5B] hover:text-[#B08968] hover:bg-stone-100 px-4 py-2 rounded-lg border border-stone-300 transition-all duration-200 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-200" />
            <span className="text-sm font-medium">Back to Collection</span>
          </Link>
        </div>
      </div>

      {/* Item Details - Professional 2-Column Layout */}
      <div className="section-padding">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left Column - High-Resolution Image */}
            <div className="space-y-6">
              <div className="relative aspect-square overflow-hidden rounded-2xl shadow-2xl border border-[#E8E2DD]">
                <Image
                  src={item.image}
                  alt={`${item.name} by ${item.artist}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  priority
                />

                {/* Premium Badges */}
                <div className="absolute top-6 left-6">
                  <div className="flex items-center space-x-1 bg-[#B08968] text-white px-3 py-2 rounded-full text-sm font-medium shadow-lg backdrop-blur-sm">
                    <Award className="w-4 h-4" />
                    <span>{item.condition}</span>
                  </div>
                </div>

                <div className="absolute top-6 right-6">
                  <span className="bg-black/60 backdrop-blur-md text-white px-3 py-2 rounded-full text-sm font-medium shadow-lg">
                    {item.year}
                  </span>
                </div>

                {/* Stock Status Badge */}
                <div className="absolute bottom-6 left-6">
                  <div
                    className={`flex items-center space-x-2 px-3 py-2 rounded-full text-sm font-medium shadow-lg backdrop-blur-md ${
                      item.inStock
                        ? 'bg-green-500/90 text-white'
                        : 'bg-red-500/90 text-white'
                    }`}
                  >
                    {item.inStock ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <AlertCircle className="w-4 h-4" />
                    )}
                    <span>{item.inStock ? 'In Stock' : 'Out of Stock'}</span>
                  </div>
                </div>
              </div>

              {/* Quick Actions - Mobile Optimized */}
              <div className="flex space-x-4">
                <Button
                  variant={item.inStock ? 'primary' : 'ghost'}
                  size="lg"
                  fullWidth
                  disabled={!item.inStock}
                  icon={ShoppingCart}
                  iconPosition="left"
                  className="btn-premium"
                >
                  {item.inStock ? 'Add to Cart' : 'Out of Stock'}
                </Button>
                <button className="w-14 h-14 border-2 border-[#E8E2DD] rounded-xl flex items-center justify-center hover:bg-[#F7F3F0] hover:border-[#B08968] transition-all duration-200 group">
                  <Heart className="w-6 h-6 text-[#6B5B5B] group-hover:text-[#B08968] transition-colors" />
                </button>
              </div>
            </div>

            {/* Right Column - Product Information */}
            <div className="space-y-8">
              {/* Header Section */}
              <div>
                {/* Rating & Genre */}
                <div className="flex items-center space-x-4 mb-6">
                  <div className="flex items-center space-x-1 bg-[#F7F3F0] px-3 py-1.5 rounded-full">
                    <Star className="w-4 h-4 text-[#D4A574] fill-current" />
                    <span className="text-sm font-semibold text-[#3C2F2F]">
                      {item.rating}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1 bg-[#B08968] text-white px-3 py-1.5 rounded-full">
                    <Music className="w-4 h-4" />
                    <span className="text-sm font-medium">{item.genre}</span>
                  </div>
                </div>

                {/* Title - Large Elegant Serif Typography */}
                <h1 className="font-serif text-4xl lg:text-5xl font-bold text-[#3C2F2F] mb-4 leading-tight">
                  {item.name}
                </h1>

                {/* Artist - Subtle Badge Style */}
                <div className="mb-8">
                  <span className="text-lg text-[#6B5B5B]">by </span>
                  <span className="text-xl font-semibold text-[#3C2F2F] bg-[#F7F3F0] px-3 py-1 rounded-lg">
                    {item.artist}
                  </span>
                </div>

                {/* Price - Prominent and Clear */}
                <div className="flex items-baseline space-x-4 mb-8">
                  <div className="font-serif text-4xl font-bold text-[#B08968]">
                    ${item.price}
                  </div>
                  {item.originalPrice && (
                    <div className="flex flex-col">
                      <div className="text-lg text-[#6B5B5B] line-through">
                        ${item.originalPrice}
                      </div>
                      <div className="text-sm text-green-600 font-medium">
                        Save ${(item.originalPrice - item.price).toFixed(2)}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Description - Clean, Readable Paragraph */}
              <div className="bg-[#F7F3F0] p-6 rounded-xl">
                <h2 className="font-serif text-xl font-semibold text-[#3C2F2F] mb-4">
                  About This Record
                </h2>
                <p className="text-[#6B5B5B] leading-relaxed text-base">
                  {item.description}
                </p>
              </div>

              {/* Specifications - Small Grid Layout */}
              <div>
                <h2 className="font-serif text-xl font-semibold text-[#3C2F2F] mb-6">
                  Specifications
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white border border-[#E8E2DD] p-4 rounded-xl hover:shadow-md transition-shadow">
                    <div className="flex items-center space-x-2 mb-2">
                      <Clock className="w-5 h-5 text-[#B08968]" />
                      <span className="text-sm font-semibold text-[#3C2F2F]">
                        Release Year
                      </span>
                    </div>
                    <span className="text-lg font-medium text-[#6B5B5B]">
                      {item.year}
                    </span>
                  </div>

                  <div className="bg-white border border-[#E8E2DD] p-4 rounded-xl hover:shadow-md transition-shadow">
                    <div className="flex items-center space-x-2 mb-2">
                      <Award className="w-5 h-5 text-[#B08968]" />
                      <span className="text-sm font-semibold text-[#3C2F2F]">
                        Condition
                      </span>
                    </div>
                    <span className="text-lg font-medium text-[#6B5B5B]">
                      {item.condition}
                    </span>
                  </div>

                  <div className="bg-white border border-[#E8E2DD] p-4 rounded-xl hover:shadow-md transition-shadow">
                    <div className="flex items-center space-x-2 mb-2">
                      <Shield className="w-5 h-5 text-[#B08968]" />
                      <span className="text-sm font-semibold text-[#3C2F2F]">
                        Genre
                      </span>
                    </div>
                    <span className="text-lg font-medium text-[#6B5B5B]">
                      {item.genre}
                    </span>
                  </div>

                  <div className="bg-white border border-[#E8E2DD] p-4 rounded-xl hover:shadow-md transition-shadow">
                    <div className="flex items-center space-x-2 mb-2">
                      <Star className="w-5 h-5 text-[#B08968]" />
                      <span className="text-sm font-semibold text-[#3C2F2F]">
                        Rating
                      </span>
                    </div>
                    <span className="text-lg font-medium text-[#6B5B5B]">
                      {item.rating}/5.0
                    </span>
                  </div>
                </div>
              </div>

              {/* CTA Section - Marketplace Feel */}
              <div className="bg-gradient-to-br from-[#B08968] to-[#9A7B5F] p-8 rounded-2xl text-white shadow-xl">
                <h3 className="font-serif text-2xl font-bold mb-4">
                  Ready to Own This Piece of History?
                </h3>
                <p className="text-white/90 mb-6 leading-relaxed">
                  This authentic vinyl record comes with our guarantee of
                  quality and authenticity. Each record is carefully inspected
                  and graded by our experts.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    variant="secondary"
                    size="lg"
                    fullWidth
                    className="bg-white text-[#B08968] hover:bg-[#F7F3F0] border-0 font-semibold"
                  >
                    Contact to Purchase
                  </Button>
                  <Button
                    variant="ghost"
                    size="lg"
                    className="text-white border-white/30 hover:bg-white/10"
                  >
                    Add to Favorites
                  </Button>
                </div>
              </div>

              {/* Additional Info */}
              <div className="bg-[#F7F3F0] p-6 rounded-xl">
                <div className="flex items-start space-x-3">
                  <Shield className="w-6 h-6 text-[#B08968] mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-[#3C2F2F] mb-2">
                      Authenticity Guarantee
                    </h4>
                    <p className="text-sm text-[#6B5B5B] leading-relaxed">
                      All our vinyl records are authenticated and graded by
                      music industry experts. We stand behind the quality and
                      condition of every item in our collection.
                    </p>
                  </div>
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
      keywords: `${item.name}, ${item.artist}, ${item.genre}, vinyl record, ${item.year}`,
      openGraph: {
        title: `${item.name} by ${item.artist}`,
        description: item.description.substring(0, 160) + '...',
        images: [
          {
            url: item.image,
            width: 800,
            height: 800,
            alt: `${item.name} by ${item.artist}`,
          },
        ],
        type: 'product',
      },
      twitter: {
        card: 'summary_large_image',
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
