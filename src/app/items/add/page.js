'use client';

import { useState, useCallback, useMemo } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Upload, Plus, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { validateVinylForm, formatVinylData } from '@/utils/validation';
import { itemsApi } from '@/utils/api';
import { GENRE_OPTIONS, CONDITION_OPTIONS } from '@/utils/constants';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import Button from '@/components/ui/Button';
import ScrollToTop from '@/components/ui/ScrollToTop';

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

  // Authentication check without console.log for production
  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-[#FFFBEB] pt-24 flex items-center justify-center">
        <LoadingSpinner size="lg" text="Checking authentication..." />
      </div>
    );
  }

  if (status === 'unauthenticated' || !session?.user?.email) {
    // Use window.location for hard redirect to ensure proper session handling
    if (typeof window !== 'undefined') {
      window.location.href = '/login?callbackUrl=/items/add';
    }

    return (
      <div className="min-h-screen bg-[#FFFBEB] pt-24 flex items-center justify-center">
        <LoadingSpinner size="lg" text="Redirecting to login..." />
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      // Validate form data
      const validation = validateVinylForm(formData);

      if (!validation.isValid) {
        setErrors(validation.errors);
        toast.error('Please fix the errors below');
        setIsSubmitting(false);
        return;
      }

      // Format data for API submission
      const itemData = formatVinylData(formData);

      // Direct API call with better error handling
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;

      if (!apiUrl) {
        throw new Error('API configuration missing');
      }

      console.log('Submitting item to:', `${apiUrl}/api/items`);
      console.log('Item data:', itemData);

      // Create timeout controller manually for better compatibility
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);

      const res = await fetch(`${apiUrl}/api/items`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(itemData),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      console.log('Response status:', res.status);

      if (!res.ok) {
        const errorData = await res
          .json()
          .catch(() => ({ message: 'Unknown error' }));
        console.error('API Error Response:', errorData);
        throw new Error(
          errorData.message || `HTTP ${res.status}: ${res.statusText}`,
        );
      }

      const result = await res.json();
      console.log('Item created successfully:', result);

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

      // Redirect to the items collection page to see the newly added item
      setTimeout(() => {
        router.push('/items');
      }, 1500);
    } catch (error) {
      console.error('Submit error:', error);
      toast.error(
        error.message || 'Failed to add vinyl record. Please try again.',
      );
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
                  min="0"
                  step="0.01"
                  placeholder="189.99"
                />

                <FormField
                  label="Original Price ($)"
                  name="originalPrice"
                  type="number"
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
