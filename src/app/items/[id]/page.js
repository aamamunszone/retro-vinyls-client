'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
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
import Button from '@/components/ui/Button';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { SkeletonDetailsPage } from '@/components/ui/SkeletonLoader';

// Metadata for SEO
export const metadata = {
  title: 'Vinyl Record Details | RetroVinyls',
  description:
    'View detailed information about this vintage vinyl record including condition, pricing, specifications, and authenticity details.',
  robots: {
    index: true,
    follow: true,
  },
};

export default function ItemDetailsPage() {
  const params = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const id = params?.id;

  useEffect(() => {
    if (!id) {
      setError('No item ID provided');
      setLoading(false);
      return;
    }

    const fetchItem = async () => {
      try {
        setLoading(true);
        setError(null);

        const apiUrl = process.env.NEXT_PUBLIC_API_URL;

        if (!apiUrl) {
          throw new Error('API configuration is missing');
        }

        const fetchUrl = `${apiUrl}/api/items/${id}`;

        const response = await fetch(fetchUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        });

        if (!response.ok) {
          if (response.status === 404) {
            setError('Product Not Found');
            return;
          }

          throw new Error(
            `Server error: ${response.status} ${response.statusText}`,
          );
        }

        const result = await response.json();

        if (!result.success) {
          throw new Error(result.message || 'Failed to fetch item');
        }

        if (!result.data) {
          throw new Error('No item data received');
        }

        setItem(result.data);
      } catch (err) {
        if (process.env.NODE_ENV === 'development') {
          console.error('💥 Fetch error:', err);
        }
        setError(err.message || 'Failed to load item');
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFFBEB]">
        {/* Back Navigation Skeleton */}
        <div className="pt-24 pb-8 bg-[#F7F3F0]">
          <div className="max-w-7xl mx-auto container-padding">
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg border border-stone-300">
              <div className="w-4 h-4 bg-stone-200 rounded animate-shimmer"></div>
              <div className="w-28 h-4 bg-stone-200 rounded animate-shimmer"></div>
            </div>
          </div>
        </div>

        {/* Premium Details Page Skeleton */}
        <div className="section-padding">
          <div className="max-w-7xl mx-auto container-padding">
            <SkeletonDetailsPage />

            {/* Loading Indicator */}
            <div className="flex items-center justify-center mt-8">
              <LoadingSpinner size="lg" />
              <span className="ml-4 text-lg text-[#6B5B5B]">
                Loading vinyl details...
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#FFFBEB] pt-24">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
            <h1 className="heading-secondary text-[#3C2F2F] mb-4">
              {error.includes('Not Found')
                ? 'Product Not Found'
                : 'Unable to Load Item'}
            </h1>
            <p className="text-body text-[#6B5B5B] mb-8 max-w-md mx-auto">
              {error}
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

  if (!item) {
    return (
      <div className="min-h-screen bg-[#FFFBEB] pt-24">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="text-center py-20">
            <h1 className="heading-secondary text-[#3C2F2F] mb-4">
              Product Not Found
            </h1>
            <p className="text-body text-[#6B5B5B] mb-8">
              The vinyl record you're looking for could not be found.
            </p>
            <Link href="/items">
              <Button variant="primary" size="md">
                Back to Collection
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFBEB]">
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

      <div className="section-padding">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            <div className="space-y-6">
              <div className="relative aspect-square overflow-hidden rounded-2xl shadow-2xl border border-[#E8E2DD]">
                <Image
                  src={item.image}
                  alt={`${item.name} by ${item.artist}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  priority
                />

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

              <div className="flex space-x-4">
                <Button
                  variant={item.inStock ? 'primary' : 'ghost'}
                  size="lg"
                  fullWidth
                  disabled={!item.inStock}
                  icon={ShoppingCart}
                  iconPosition="left"
                >
                  {item.inStock ? 'Add to Cart' : 'Out of Stock'}
                </Button>
                <button className="w-14 h-14 border-2 border-[#E8E2DD] rounded-xl flex items-center justify-center hover:bg-[#F7F3F0] hover:border-[#B08968] transition-all duration-200 group">
                  <Heart className="w-6 h-6 text-[#6B5B5B] group-hover:text-[#B08968] transition-colors" />
                </button>
              </div>
            </div>

            <div className="space-y-8">
              <div>
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

                <h1 className="font-serif text-4xl lg:text-5xl font-bold text-[#3C2F2F] mb-4 leading-tight">
                  {item.name}
                </h1>

                <div className="mb-8">
                  <span className="text-lg text-[#6B5B5B]">by </span>
                  <span className="text-xl font-semibold text-[#3C2F2F] bg-[#F7F3F0] px-3 py-1 rounded-lg">
                    {item.artist}
                  </span>
                </div>

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

              <div className="bg-[#F7F3F0] p-6 rounded-xl">
                <h2 className="font-serif text-xl font-semibold text-[#3C2F2F] mb-4">
                  About This Record
                </h2>
                <p className="text-[#6B5B5B] leading-relaxed text-base">
                  {item.description}
                </p>
              </div>

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

              <div className="bg-linear-to-br from-[#B08968] to-[#9A7B5F] p-8 rounded-2xl text-white shadow-xl">
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
