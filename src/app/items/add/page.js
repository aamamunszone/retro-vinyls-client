'use client';

import { useState, useCallback, useMemo } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Upload, Plus, AlertCircle, User } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { validateVinylForm, formatVinylData } from '@/utils/validation';
import { GENRE_OPTIONS, CONDITION_OPTIONS } from '@/utils/constants';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import Button from '@/components/ui/Button';
import ScrollToTop from '@/components/ui/ScrollToTop';
import { SkeletonForm } from '@/components/ui/SkeletonLoader';

// Stable FormField component outside of main component to prevent re-creation
const FormField = ({
  label,
  name,
  type = 'text',
  required = false,
  value,
  onChange,
  error,
  children,
  ...props
}) => (
  <div>
    <label
      htmlFor={name}
      className="block text-sm font-semibold text-[#3C2F2F] mb-3 tracking-wide"
    >
      {label} {required && <span className="text-red-500 ml-1">*</span>}
    </label>
    {children || (
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className={`w-full px-4 py-2.5 border-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-[#B08968]/20 focus:border-[#B08968] transition-all duration-200 ${
          error
            ? 'border-red-300 bg-red-50/50 focus:border-red-400 focus:ring-red-100'
            : 'border-stone-200 bg-white hover:border-stone-300 focus:bg-white'
        }`}
        {...props}
      />
    )}
    {error && (
      <div className="flex items-center space-x-2 mt-2">
        <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
        <span className="text-sm text-red-600 font-medium">{error}</span>
      </div>
    )}
  </div>
);

export default function AddItemPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    artist: '',
    description: '',
    price: '',
    originalPrice: '',
    image: '',
    genre: '',
    year: '',
    condition: 'Near Mint',
    rating: '4.5',
    inStock: true,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  // Stable handleInputChange using useCallback to prevent re-creation
  const handleInputChange = useCallback(
    (e) => {
      const { name, value, type, checked } = e.target;
      const newValue = type === 'checkbox' ? checked : value;

      setFormData((prev) => ({
        ...prev,
        [name]: newValue,
      }));

      // Clear error for this field when user starts typing
      if (errors[name]) {
        setErrors((prev) => ({
          ...prev,
          [name]: '',
        }));
      }
    },
    [errors],
  );

  // Memoized options to prevent re-creation
  const conditionOptions = useMemo(() => CONDITION_OPTIONS, []);
  const genreOptions = useMemo(() => GENRE_OPTIONS, []);

  // Enhanced Authentication Check with Better UX
  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-[#FFFBEB]">
        {/* Header Section Skeleton */}
        <div className="pt-24 pb-8">
          <div className="max-w-4xl mx-auto container-padding">
            {/* Back Button Skeleton */}
            <div className="mb-8">
              <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg border border-stone-300">
                <div className="w-4 h-4 bg-stone-200 rounded animate-shimmer"></div>
                <div className="w-28 h-4 bg-stone-200 rounded animate-shimmer"></div>
              </div>
            </div>

            {/* Title Section Skeleton */}
            <div className="text-center mb-8">
              <div className="w-48 h-8 bg-stone-200 rounded mx-auto mb-4 animate-shimmer"></div>
              <div className="w-96 h-4 bg-stone-200 rounded mx-auto animate-shimmer"></div>
            </div>
          </div>
        </div>

        {/* Premium Form Skeleton */}
        <div className="max-w-4xl mx-auto container-padding">
          <SkeletonForm />

          {/* Loading Indicator */}
          <div className="flex items-center justify-center mt-8">
            <LoadingSpinner size="lg" />
            <span className="ml-4 text-lg text-[#6B5B5B]">Loading form...</span>
          </div>
        </div>
      </div>
    );
  }

  if (status === 'unauthenticated' || !session?.user?.email) {
    return (
      <div className="min-h-screen bg-[#FFFBEB] pt-24 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center p-8 bg-white rounded-lg shadow-elegant border border-[#E8E2DD]">
          <div className="w-16 h-16 bg-[#B08968] rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-white" />
          </div>
          <h2 className="heading-tertiary text-[#3C2F2F] mb-4">
            Authentication Required
          </h2>
          <p className="text-body text-[#6B5B5B] mb-6">
            You need to be logged in to add vinyl records to the collection.
          </p>
          <Link href="/login?callbackUrl=/items/add">
            <Button variant="primary" size="md" fullWidth>
              Sign In to Continue
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      console.log('🚀 Starting form submission...');

      // Client-side validation
      const validation = validateVinylForm(formData);

      if (!validation.isValid) {
        setErrors(validation.errors);

        // Create a more specific error message
        const errorFields = Object.keys(validation.errors);
        const errorMessage = `Please fix the following fields: ${errorFields.join(', ')}`;

        toast.error(errorMessage);
        setIsSubmitting(false);
        return;
      }

      // Format data for API
      const itemData = formatVinylData(formData);
      console.log('📝 Formatted item data:', itemData);

      // API Configuration
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      if (!apiUrl) {
        throw new Error(
          'API configuration is missing. Please check environment variables.',
        );
      }

      const endpoint = `${apiUrl}/api/items`;
      console.log('🌐 Submitting to:', endpoint);

      // Create request with timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => {
        controller.abort();
        console.error('❌ Request timeout after 20 seconds');
      }, 20000);

      // API Request
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(itemData),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      console.log('📡 Response status:', response.status);
      console.log(
        '📡 Response headers:',
        Object.fromEntries(response.headers.entries()),
      );

      // Handle response
      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch (parseError) {
          errorData = {
            message: `HTTP ${response.status}: ${response.statusText}`,
            details: 'Unable to parse error response',
          };
        }

        console.error('❌ API Error Response:', errorData);
        throw new Error(
          errorData.message || `Server error: ${response.status}`,
        );
      }

      const result = await response.json();
      console.log('✅ Success response:', result);

      if (!result.success) {
        throw new Error(
          result.message || 'Server returned unsuccessful response',
        );
      }

      // Success handling
      toast.success(
        '🎵 Vinyl record added successfully! Redirecting to collection...',
      );

      // Reset form
      setFormData({
        name: '',
        artist: '',
        description: '',
        price: '',
        originalPrice: '',
        image: '',
        genre: '',
        year: '',
        condition: 'Near Mint',
        rating: '4.5',
        inStock: true,
      });

      // Redirect to collection
      setTimeout(() => {
        router.push('/items');
      }, 2000);
    } catch (error) {
      console.error('❌ Form submission error:', error);

      let errorMessage = 'Failed to add vinyl record. Please try again.';

      if (error.name === 'AbortError') {
        errorMessage =
          'Request timed out. Please check your connection and try again.';
      } else if (error.message) {
        errorMessage = error.message;
      }

      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFBEB] pt-24">
      <div className="max-w-4xl mx-auto container-padding">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/items"
            className="inline-flex items-center space-x-2 text-[#6B5B5B] hover:text-[#B08968] transition-smooth mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-small font-medium">Back to Collection</span>
          </Link>

          <div className="text-center">
            <h1 className="heading-secondary text-[#3C2F2F] mb-4">
              Add New Vinyl Record
            </h1>
            <p className="text-body text-[#6B5B5B] max-w-2xl mx-auto">
              Share a piece of musical history with our community. Fill in the
              details below to add a new vinyl record to our collection.
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow-elegant border border-[#E8E2DD] p-8">
          {/* Show validation errors summary if any */}
          {Object.keys(errors).length > 0 && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <AlertCircle className="w-5 h-5 text-red-500" />
                <h3 className="text-sm font-semibold text-red-800">
                  Please fix the following errors:
                </h3>
              </div>
              <ul className="text-sm text-red-700 space-y-1">
                {Object.entries(errors).map(([field, message]) => (
                  <li key={field} className="flex items-center space-x-2">
                    <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                    <span className="capitalize">{field}:</span>
                    <span>{message}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <div>
              <h2 className="heading-tertiary text-[#3C2F2F] mb-6">
                Basic Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  label="Album Name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  error={errors.name}
                  placeholder="e.g., Abbey Road"
                />

                <FormField
                  label="Artist"
                  name="artist"
                  required
                  value={formData.artist}
                  onChange={handleInputChange}
                  error={errors.artist}
                  placeholder="e.g., The Beatles"
                />

                <FormField
                  label="Genre"
                  name="genre"
                  required
                  value={formData.genre}
                  onChange={handleInputChange}
                  error={errors.genre}
                >
                  <select
                    id="genre"
                    name="genre"
                    value={formData.genre}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-2.5 border-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-[#B08968]/20 focus:border-[#B08968] transition-all duration-200 ${
                      errors.genre
                        ? 'border-red-300 bg-red-50/50 focus:border-red-400 focus:ring-red-100'
                        : 'border-stone-200 bg-white hover:border-stone-300 focus:bg-white'
                    }`}
                  >
                    <option value="">Select Genre</option>
                    {genreOptions.map((genre) => (
                      <option key={genre} value={genre}>
                        {genre}
                      </option>
                    ))}
                  </select>
                </FormField>

                <FormField
                  label="Release Year"
                  name="year"
                  type="number"
                  required
                  value={formData.year}
                  onChange={handleInputChange}
                  error={errors.year}
                  min="1900"
                  max={new Date().getFullYear()}
                  placeholder="e.g., 1969"
                />
              </div>
            </div>

            {/* Description */}
            <FormField
              label="Description"
              name="description"
              required
              value={formData.description}
              onChange={handleInputChange}
              error={errors.description}
            >
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows={4}
                className={`w-full px-4 py-2.5 border-2 rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-[#B08968]/20 focus:border-[#B08968] transition-all duration-200 resize-none ${
                  errors.description
                    ? 'border-red-300 bg-red-50/50 focus:border-red-400 focus:ring-red-100'
                    : 'border-stone-200 bg-white hover:border-stone-300 focus:bg-white'
                }`}
                placeholder="Describe the vinyl record, its condition, historical significance, and any special features..."
              />
            </FormField>

            {/* Pricing & Condition */}
            <div>
              <h2 className="heading-tertiary text-[#3C2F2F] mb-6">
                Pricing & Condition
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <FormField
                  label="Current Price ($)"
                  name="price"
                  type="number"
                  required
                  value={formData.price}
                  onChange={handleInputChange}
                  error={errors.price}
                  min="0"
                  step="0.01"
                  placeholder="189.99"
                />

                <FormField
                  label="Original Price ($)"
                  name="originalPrice"
                  type="number"
                  value={formData.originalPrice}
                  onChange={handleInputChange}
                  error={errors.originalPrice}
                  min="0"
                  step="0.01"
                  placeholder="240.00"
                />

                <FormField label="Condition" name="condition" required>
                  <select
                    id="condition"
                    name="condition"
                    value={formData.condition}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B08968] focus:border-transparent transition-smooth ${
                      errors.condition
                        ? 'border-red-300 bg-red-50'
                        : 'border-[#E8E2DD]'
                    }`}
                  >
                    {conditionOptions.map((condition) => (
                      <option key={condition} value={condition}>
                        {condition}
                      </option>
                    ))}
                  </select>
                </FormField>
              </div>
            </div>

            {/* Image & Rating */}
            <div>
              <h2 className="heading-tertiary text-[#3C2F2F] mb-6">
                Media & Rating
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  label="Image URL"
                  name="image"
                  type="url"
                  required
                  placeholder="https://images.unsplash.com/..."
                >
                  <input
                    type="url"
                    id="image"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    required
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B08968] focus:border-transparent transition-smooth ${
                      errors.image
                        ? 'border-red-300 bg-red-50'
                        : 'border-[#E8E2DD]'
                    }`}
                    placeholder="https://images.unsplash.com/..."
                  />
                  <p className="text-xs text-[#6B5B5B] mt-1">
                    Use a high-quality image URL (preferably from Unsplash)
                  </p>
                </FormField>

                <FormField
                  label="Rating (1-5)"
                  name="rating"
                  type="number"
                  value={formData.rating}
                  onChange={handleInputChange}
                  error={errors.rating}
                  min="1"
                  max="5"
                  step="0.1"
                  placeholder="4.5"
                />
              </div>
            </div>

            {/* Stock Status */}
            <div>
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="inStock"
                  name="inStock"
                  checked={formData.inStock}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-[#B08968] border-[#E8E2DD] rounded focus:ring-[#B08968] focus:ring-2"
                />
                <label
                  htmlFor="inStock"
                  className="text-small font-medium text-[#3C2F2F]"
                >
                  Item is currently in stock
                </label>
              </div>
            </div>

            {/* Submit Buttons with refined proportions */}
            <div className="flex justify-end space-x-4 pt-8 border-t border-stone-200">
              <Link href="/items">
                <Button variant="ghost" size="md">
                  Cancel
                </Button>
              </Link>

              <Button
                type="submit"
                variant="primary"
                size="md"
                isLoading={isSubmitting}
                disabled={isSubmitting}
                icon={Plus}
                iconPosition="left"
              >
                {isSubmitting ? 'Adding Record...' : 'Add Vinyl Record'}
              </Button>
            </div>
          </form>
        </div>
      </div>
      <ScrollToTop />
    </div>
  );
}
