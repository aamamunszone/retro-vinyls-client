'use client';

import { useState, useEffect, useMemo } from 'react';
import {
  Star,
  Heart,
  ShoppingCart,
  Eye,
  Search,
  Filter,
  SortAsc,
  X,
  Sparkles,
  Music,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import ErrorState from '@/components/ui/ErrorState';
import EmptyState from '@/components/ui/EmptyState';
import ScrollToTop from '@/components/ui/ScrollToTop';
import Button from '@/components/ui/Button';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import SkeletonCard from '@/components/ui/SkeletonCard';

// Genre options for filtering
const GENRE_FILTERS = [
  'All',
  'Rock',
  'Jazz',
  'Blues',
  'Soul',
  'Pop',
  'Classical',
  'Folk',
  'Electronic',
  'Hip Hop',
  'Progressive Rock',
  'Other',
];

// Sort options
const SORT_OPTIONS = [
  { value: 'newest', label: 'Newly Added (Latest)' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'name', label: 'Name: A to Z' },
  { value: 'year', label: 'Year: Newest First' },
];

export default function ItemsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const [totalCount, setTotalCount] = useState(0);

  // Fetch data on component mount
  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;

        if (!apiUrl) {
          throw new Error('API configuration missing');
        }

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000);

        const response = await fetch(`${apiUrl}/api/items`, {
          cache: 'no-store',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(
            `Server error: ${response.status} ${response.statusText}`,
          );
        }

        const result = await response.json();

        if (!result.success) {
          throw new Error(result.message || 'Failed to fetch items');
        }

        setItems(result.data || []);
        setTotalCount(result.count || 0);
        setError(null);
      } catch (err) {
        console.error('❌ Error fetching items:', err);
        setError(err.message);
        setItems([]);
        setTotalCount(0);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  // Filter and sort items based on current state
  const filteredAndSortedItems = useMemo(() => {
    let filtered = [...items];

    // Apply search filter
    if (searchTerm.trim()) {
      const search = searchTerm.toLowerCase().trim();
      filtered = filtered.filter(
        (item) =>
          item.name.toLowerCase().includes(search) ||
          item.artist.toLowerCase().includes(search) ||
          item.genre.toLowerCase().includes(search) ||
          item.description.toLowerCase().includes(search),
      );
    }

    // Apply genre filter
    if (selectedGenre !== 'All') {
      filtered = filtered.filter(
        (item) => item.genre.toLowerCase() === selectedGenre.toLowerCase(),
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'year':
          return b.year - a.year;
        case 'newest':
        default:
          return (
            new Date(b.createdAt || b.updatedAt || 0) -
            new Date(a.createdAt || a.updatedAt || 0)
          );
      }
    });

    return filtered;
  }, [items, searchTerm, selectedGenre, sortBy]);

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedGenre('All');
    setSortBy('newest');
  };

  // Handle loading state
  if (loading) {
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
                records.
              </p>
              <div className="flex items-center justify-center space-x-2">
                <LoadingSpinner size="sm" />
                <span className="text-small text-[#6B5B5B]">
                  Loading collection...
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Loading Skeleton */}
        <div className="section-padding">
          <div className="max-w-7xl mx-auto container-padding">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {Array.from({ length: 8 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="min-h-screen bg-[#FFFBEB] pt-24">
        <div className="max-w-7xl mx-auto container-padding">
          <ErrorState
            title="Unable to Load Collection"
            message={error}
            showRetry={false}
            showHomeLink={true}
          />
        </div>
      </div>
    );
  }

  const hasActiveFilters =
    searchTerm.trim() || selectedGenre !== 'All' || sortBy !== 'newest';
  const showingCount = filteredAndSortedItems.length;

  return (
    <div className="min-h-screen bg-[#FFFBEB]">
      {/* Header Section */}
      <div className="pt-24 pb-8 bg-[#F7F3F0]">
        <div className="max-w-7xl mx-auto container-padding">
          <div className="text-center mb-8">
            <span className="text-small text-[#B08968] font-medium tracking-wide uppercase mb-4 block">
              Our Collection
            </span>
            <h1 className="heading-primary text-[#3C2F2F] mb-6">
              Vinyl Records
            </h1>
            <p className="text-body max-w-2xl mx-auto">
              Discover our carefully curated collection of vintage vinyl
              records. Each piece tells a story and represents a moment in
              musical history.
            </p>
          </div>

          {/* Premium Control Bar */}
          <div className="bg-white/70 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-elegant">
            {/* Desktop Layout */}
            <div className="hidden lg:flex items-center justify-between space-x-6">
              {/* Search Bar */}
              <div className="flex-1 max-w-md relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-[#6B5B5B]" />
                </div>
                <input
                  type="text"
                  placeholder="Search by name, artist, or genre..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/50 backdrop-blur-sm border border-[#E8E2DD] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B08968]/20 focus:border-[#B08968] transition-all duration-200 placeholder-[#6B5B5B]/70"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-[#6B5B5B] hover:text-[#B08968] transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              {/* Genre Filter Chips */}
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-[#6B5B5B]" />
                <div className="flex flex-wrap gap-2">
                  {GENRE_FILTERS.slice(0, 6).map((genre) => (
                    <button
                      key={genre}
                      onClick={() => setSelectedGenre(genre)}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                        selectedGenre === genre
                          ? 'bg-[#B08968] text-white shadow-md'
                          : 'bg-white/60 text-[#6B5B5B] hover:bg-[#B08968]/10 hover:text-[#B08968]'
                      }`}
                    >
                      {genre}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort Dropdown */}
              <div className="flex items-center space-x-2">
                <SortAsc className="h-4 w-4 text-[#6B5B5B]" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white/60 border border-[#E8E2DD] rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#B08968]/20 focus:border-[#B08968] transition-all duration-200"
                >
                  {SORT_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Mobile Layout */}
            <div className="lg:hidden space-y-4">
              {/* Search Bar */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-[#6B5B5B]" />
                </div>
                <input
                  type="text"
                  placeholder="Search records..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/50 backdrop-blur-sm border border-[#E8E2DD] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#B08968]/20 focus:border-[#B08968] transition-all duration-200"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-[#6B5B5B]"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              {/* Filters Row */}
              <div className="flex items-center justify-between space-x-4">
                <select
                  value={selectedGenre}
                  onChange={(e) => setSelectedGenre(e.target.value)}
                  className="flex-1 bg-white/60 border border-[#E8E2DD] rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#B08968]/20"
                >
                  {GENRE_FILTERS.map((genre) => (
                    <option key={genre} value={genre}>
                      {genre === 'All' ? 'All Genres' : genre}
                    </option>
                  ))}
                </select>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="flex-1 bg-white/60 border border-[#E8E2DD] rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#B08968]/20"
                >
                  {SORT_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Results Summary & Clear Filters */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#E8E2DD]/50">
              <div className="flex items-center space-x-2 text-sm text-[#6B5B5B]">
                <Music className="h-4 w-4" />
                <span>
                  Showing {showingCount} of {totalCount} records
                  {hasActiveFilters && (
                    <span className="text-[#B08968] font-medium">
                      {' '}
                      (filtered)
                    </span>
                  )}
                </span>
              </div>

              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="flex items-center space-x-1 text-sm text-[#6B5B5B] hover:text-[#B08968] transition-colors"
                >
                  <X className="h-3 w-3" />
                  <span>Clear filters</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Items Grid */}
      <div className="section-padding">
        <div className="max-w-7xl mx-auto container-padding">
          {filteredAndSortedItems.length === 0 ? (
            searchTerm.trim() || selectedGenre !== 'All' ? (
              // No search results
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-[#F7F3F0] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-8 h-8 text-[#B08968]" />
                </div>
                <h3 className="heading-tertiary text-[#3C2F2F] mb-4">
                  No results found
                  {searchTerm.trim() && (
                    <span className="block text-[#6B5B5B] font-normal mt-2">
                      for "{searchTerm}"
                    </span>
                  )}
                </h3>
                <p className="text-body text-[#6B5B5B] mb-8 max-w-md mx-auto">
                  We couldn't find any vinyl records matching your search
                  criteria. Try adjusting your filters or search terms.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="ghost" size="md" onClick={clearFilters}>
                    Clear All Filters
                  </Button>
                  <Link href="/items/add">
                    <Button variant="primary" size="md">
                      Add New Record
                    </Button>
                  </Link>
                </div>
              </div>
            ) : (
              // Empty collection
              <EmptyState
                title="No Vinyl Records Found"
                message="Our collection is currently empty, but every great collection starts with a single record. Be the first to add a piece of musical history to our community."
                actionText="Add First Record"
                actionHref="/items/add"
                showAction={true}
              />
            )
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredAndSortedItems.map((item) => (
                <div
                  key={item._id}
                  className="card-uniform group flex flex-col transform hover:scale-[1.02] transition-all duration-300 hover:shadow-xl"
                >
                  {/* Image Container */}
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={item.image}
                      alt={`${item.name} by ${item.artist}`}
                      fill
                      className="object-cover group-hover:scale-110 transition-all duration-500"
                    />

                    {/* Overlay Actions */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center pb-4">
                      <div className="flex space-x-3">
                        <button className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 hover:scale-110 transition-all duration-200">
                          <Heart className="w-4 h-4 text-white" />
                        </button>
                        <button className="w-10 h-10 bg-[#B08968] rounded-full flex items-center justify-center hover:bg-[#9A7B5F] hover:scale-110 transition-all duration-200 shadow-lg">
                          <ShoppingCart className="w-4 h-4 text-white" />
                        </button>
                        <Link
                          href={`/items/${item._id}`}
                          className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 hover:scale-110 transition-all duration-200"
                        >
                          <Eye className="w-4 h-4 text-white" />
                        </Link>
                      </div>
                    </div>

                    {/* Premium Badges */}
                    <div className="absolute top-3 left-3">
                      <div className="flex items-center space-x-1 bg-[#B08968] text-white px-2 py-1 rounded-full text-xs font-medium shadow-md">
                        <Sparkles className="w-3 h-3" />
                        <span>{item.condition}</span>
                      </div>
                    </div>

                    <div className="absolute top-3 right-3">
                      <span className="bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium shadow-md">
                        {item.year}
                      </span>
                    </div>

                    {/* Genre Badge */}
                    <div className="absolute bottom-3 left-3">
                      <span className="bg-white/90 backdrop-blur-sm text-[#3C2F2F] px-2 py-1 rounded-full text-xs font-medium shadow-md">
                        {item.genre}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
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

                    <h3 className="font-serif text-lg font-semibold text-[#3C2F2F] mb-1 group-hover:text-[#B08968] transition-colors duration-200">
                      {item.name}
                    </h3>

                    <p className="text-small text-[#6B5B5B] mb-3 font-medium">
                      by {item.artist}
                    </p>

                    <p className="text-small text-[#6B5B5B] mb-4 text-ellipsis-2 leading-relaxed grow">
                      {item.description}
                    </p>

                    <div className="flex items-center justify-between text-xs text-[#6B5B5B] mb-4">
                      <span
                        className={`px-2 py-1 rounded-full font-medium ${item.inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
                      >
                        {item.inStock ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </div>

                    <Link href={`/items/${item._id}`} className="mt-auto">
                      <Button
                        variant="primary"
                        size="sm"
                        fullWidth
                        className="group-hover:shadow-lg transition-all duration-200"
                      >
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
