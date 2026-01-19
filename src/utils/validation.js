/**
 * Form validation utilities
 * Centralized validation logic for consistent error handling
 */

export const validateVinylForm = (formData) => {
  const errors = {};

  // Required fields validation
  const requiredFields = {
    name: 'Album name is required',
    artist: 'Artist name is required',
    description: 'Description is required',
    price: 'Price is required',
    image: 'Image URL is required',
    genre: 'Genre is required',
    year: 'Year is required',
  };

  Object.entries(requiredFields).forEach(([field, message]) => {
    if (!formData[field] || formData[field].toString().trim() === '') {
      errors[field] = message;
    }
  });

  // Price validation
  if (formData.price) {
    const price = parseFloat(formData.price);
    if (isNaN(price) || price <= 0) {
      errors.price = 'Price must be a valid positive number';
    }
  }

  // Original price validation (if provided)
  if (formData.originalPrice && formData.originalPrice.trim() !== '') {
    const originalPrice = parseFloat(formData.originalPrice);
    if (isNaN(originalPrice) || originalPrice <= 0) {
      errors.originalPrice = 'Original price must be a valid positive number';
    }
  }

  // Year validation
  if (formData.year) {
    const year = parseInt(formData.year);
    const currentYear = new Date().getFullYear();
    if (isNaN(year) || year < 1900 || year > currentYear) {
      errors.year = `Year must be between 1900 and ${currentYear}`;
    }
  }

  // Rating validation
  if (formData.rating) {
    const rating = parseFloat(formData.rating);
    if (isNaN(rating) || rating < 1 || rating > 5) {
      errors.rating = 'Rating must be between 1 and 5';
    }
  }

  // Image URL validation (basic)
  if (formData.image && !isValidUrl(formData.image)) {
    errors.image = 'Please enter a valid image URL';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

// Helper function to validate URL
const isValidUrl = (string) => {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
};

// Format form data for API submission
export const formatVinylData = (formData) => {
  return {
    name: formData.name.trim(),
    artist: formData.artist.trim(),
    description: formData.description.trim(),
    price: parseFloat(formData.price),
    originalPrice: formData.originalPrice
      ? parseFloat(formData.originalPrice)
      : null,
    image: formData.image.trim(),
    genre: formData.genre.trim(),
    year: parseInt(formData.year),
    condition: formData.condition || 'Near Mint',
    rating: parseFloat(formData.rating),
    inStock: Boolean(formData.inStock),
  };
};
