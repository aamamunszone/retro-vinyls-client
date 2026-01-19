'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Upload, Plus } from 'lucide-react';
import Link from 'next/link';
import toast from 'react-hot-toast';

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

  // Redirect if not authenticated (backup to middleware)
  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-[#FFFBEB] pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-[#B08968] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#6B5B5B]">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    router.push('/login');
    return null;
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate required fields
      const requiredFields = [
        'name',
        'artist',
        'description',
        'price',
        'image',
        'genre',
        'year',
      ];
      const missingFields = requiredFields.filter(
        (field) => !formData[field].trim(),
      );

      if (missingFields.length > 0) {
        toast.error(
          `Please fill in all required fields: ${missingFields.join(', ')}`,
        );
        setIsSubmitting(false);
        return;
      }

      // Prepare data for API
      const itemData = {
        ...formData,
        price: parseFloat(formData.price),
        originalPrice: formData.originalPrice
          ? parseFloat(formData.originalPrice)
          : null,
        year: parseInt(formData.year),
        rating: parseFloat(formData.rating),
      };

      const apiUrl = process.env.NEXT_PUBLIC_API_URL;

      if (!apiUrl) {
        toast.error('API configuration error');
        return;
      }

      const response = await fetch(`${apiUrl}/api/items`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(itemData),
        cache: 'no-store',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add item');
      }

      const result = await response.json();

      toast.success('Vinyl record added successfully!');

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

      // Redirect to the new item or items list
      setTimeout(() => {
        router.push('/items');
      }, 1500);
    } catch (error) {
      console.error('Error adding item:', error);
      toast.error(
        error.message || 'Failed to add vinyl record. Please try again.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const conditionOptions = [
    'Mint',
    'Near Mint',
    'Very Good+',
    'Very Good',
    'Good+',
    'Good',
    'Fair',
  ];

  const genreOptions = [
    'Rock',
    'Jazz',
    'Blues',
    'Soul',
    'Funk',
    'Pop',
    'Classical',
    'Folk',
    'Country',
    'Electronic',
    'Hip Hop',
    'Reggae',
    'Progressive Rock',
    'Punk',
    'Metal',
    'Other',
  ];

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
                <div>
                  <label
                    htmlFor="name"
                    className="block text-small font-medium text-[#3C2F2F] mb-2"
                  >
                    Album Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-[#E8E2DD] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B08968] focus:border-transparent transition-smooth"
                    placeholder="e.g., Abbey Road"
                  />
                </div>

                <div>
                  <label
                    htmlFor="artist"
                    className="block text-small font-medium text-[#3C2F2F] mb-2"
                  >
                    Artist *
                  </label>
                  <input
                    type="text"
                    id="artist"
                    name="artist"
                    value={formData.artist}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-[#E8E2DD] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B08968] focus:border-transparent transition-smooth"
                    placeholder="e.g., The Beatles"
                  />
                </div>

                <div>
                  <label
                    htmlFor="genre"
                    className="block text-small font-medium text-[#3C2F2F] mb-2"
                  >
                    Genre *
                  </label>
                  <select
                    id="genre"
                    name="genre"
                    value={formData.genre}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-[#E8E2DD] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B08968] focus:border-transparent transition-smooth"
                  >
                    <option value="">Select Genre</option>
                    {genreOptions.map((genre) => (
                      <option key={genre} value={genre}>
                        {genre}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="year"
                    className="block text-small font-medium text-[#3C2F2F] mb-2"
                  >
                    Release Year *
                  </label>
                  <input
                    type="number"
                    id="year"
                    name="year"
                    value={formData.year}
                    onChange={handleInputChange}
                    required
                    min="1900"
                    max={new Date().getFullYear()}
                    className="w-full px-4 py-3 border border-[#E8E2DD] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B08968] focus:border-transparent transition-smooth"
                    placeholder="e.g., 1969"
                  />
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="description"
                className="block text-small font-medium text-[#3C2F2F] mb-2"
              >
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows={4}
                className="w-full px-4 py-3 border border-[#E8E2DD] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B08968] focus:border-transparent transition-smooth resize-none"
                placeholder="Describe the vinyl record, its condition, historical significance, and any special features..."
              />
            </div>

            {/* Pricing & Condition */}
            <div>
              <h2 className="heading-tertiary text-[#3C2F2F] mb-6">
                Pricing & Condition
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label
                    htmlFor="price"
                    className="block text-small font-medium text-[#3C2F2F] mb-2"
                  >
                    Current Price ($) *
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    required
                    min="0"
                    step="0.01"
                    className="w-full px-4 py-3 border border-[#E8E2DD] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B08968] focus:border-transparent transition-smooth"
                    placeholder="189.99"
                  />
                </div>

                <div>
                  <label
                    htmlFor="originalPrice"
                    className="block text-small font-medium text-[#3C2F2F] mb-2"
                  >
                    Original Price ($)
                  </label>
                  <input
                    type="number"
                    id="originalPrice"
                    name="originalPrice"
                    value={formData.originalPrice}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                    className="w-full px-4 py-3 border border-[#E8E2DD] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B08968] focus:border-transparent transition-smooth"
                    placeholder="240.00"
                  />
                </div>

                <div>
                  <label
                    htmlFor="condition"
                    className="block text-small font-medium text-[#3C2F2F] mb-2"
                  >
                    Condition *
                  </label>
                  <select
                    id="condition"
                    name="condition"
                    value={formData.condition}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-[#E8E2DD] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B08968] focus:border-transparent transition-smooth"
                  >
                    {conditionOptions.map((condition) => (
                      <option key={condition} value={condition}>
                        {condition}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Image & Rating */}
            <div>
              <h2 className="heading-tertiary text-[#3C2F2F] mb-6">
                Media & Rating
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="image"
                    className="block text-small font-medium text-[#3C2F2F] mb-2"
                  >
                    Image URL *
                  </label>
                  <input
                    type="url"
                    id="image"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-[#E8E2DD] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B08968] focus:border-transparent transition-smooth"
                    placeholder="https://images.unsplash.com/..."
                  />
                  <p className="text-xs text-[#6B5B5B] mt-1">
                    Use a high-quality image URL (preferably from Unsplash)
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="rating"
                    className="block text-small font-medium text-[#3C2F2F] mb-2"
                  >
                    Rating (1-5)
                  </label>
                  <input
                    type="number"
                    id="rating"
                    name="rating"
                    value={formData.rating}
                    onChange={handleInputChange}
                    min="1"
                    max="5"
                    step="0.1"
                    className="w-full px-4 py-3 border border-[#E8E2DD] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B08968] focus:border-transparent transition-smooth"
                    placeholder="4.5"
                  />
                </div>
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

            {/* Submit Button */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-[#E8E2DD]">
              <Link
                href="/items"
                className="px-6 py-3 border border-[#E8E2DD] text-[#6B5B5B] rounded-lg font-medium hover:bg-[#F7F3F0] transition-smooth"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-8 py-3 rounded-lg font-medium transition-smooth ${
                  isSubmitting
                    ? 'bg-[#E8E2DD] text-[#6B5B5B] cursor-not-allowed'
                    : 'btn-primary'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin inline mr-2"></div>
                    Adding...
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4 inline mr-2" />
                    Add Vinyl Record
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
