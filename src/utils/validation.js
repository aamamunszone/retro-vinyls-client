/**
 * Form validation utilities
 * Centralized validation logic for consistent error handling
 */

import {
  FORM_CONFIG,
  VALIDATION_MESSAGES,
  GENRE_OPTIONS,
  CONDITION_OPTIONS,
} from './constants';

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
    if (
      !formData[field] ||
      (typeof formData[field] === 'string' && !formData[field].trim())
    ) {
      errors[field] = message;
    }
  });

  // Price validation
  if (formData.price) {
    const price = parseFloat(formData.price);
    if (isNaN(price) || price < FORM_CONFIG.VINYL.MIN_PRICE) {
      errors.price = `Price must be at least ${FORM_CONFIG.VINYL.MIN_PRICE}`;
    } else if (price > FORM_CONFIG.VINYL.MAX_PRICE) {
      errors.price = `Price cannot exceed ${FORM_CONFIG.VINYL.MAX_PRICE}`;
    }
  }

  // Original price validation (if provided)
  if (formData.originalPrice && formData.originalPrice.trim() !== '') {
    const originalPrice = parseFloat(formData.originalPrice);
    if (isNaN(originalPrice) || originalPrice < FORM_CONFIG.VINYL.MIN_PRICE) {
      errors.originalPrice = `Original price must be at least ${FORM_CONFIG.VINYL.MIN_PRICE}`;
    } else if (originalPrice > FORM_CONFIG.VINYL.MAX_PRICE) {
      errors.originalPrice = `Original price cannot exceed ${FORM_CONFIG.VINYL.MAX_PRICE}`;
    }
  }

  // Year validation
  if (formData.year) {
    const year = parseInt(formData.year);
    if (
      isNaN(year) ||
      year < FORM_CONFIG.VINYL.MIN_YEAR ||
      year > FORM_CONFIG.VINYL.MAX_YEAR
    ) {
      errors.year = `Year must be between ${FORM_CONFIG.VINYL.MIN_YEAR} and ${FORM_CONFIG.VINYL.MAX_YEAR}`;
    }
  }

  // Rating validation
  if (formData.rating) {
    const rating = parseFloat(formData.rating);
    if (
      isNaN(rating) ||
      rating < FORM_CONFIG.VINYL.MIN_RATING ||
      rating > FORM_CONFIG.VINYL.MAX_RATING
    ) {
      errors.rating = `Rating must be between ${FORM_CONFIG.VINYL.MIN_RATING} and ${FORM_CONFIG.VINYL.MAX_RATING}`;
    }
  }

  // Genre validation
  if (formData.genre && !GENRE_OPTIONS.includes(formData.genre)) {
    errors.genre = 'Please select a valid genre';
  }

  // Condition validation
  if (formData.condition && !CONDITION_OPTIONS.includes(formData.condition)) {
    errors.condition = 'Please select a valid condition';
  }

  // Image URL validation (basic)
  if (formData.image && !isValidUrl(formData.image)) {
    errors.image = 'Please enter a valid image URL';
  }

  // Description length validation
  if (formData.description && formData.description.length < 10) {
    errors.description = 'Description must be at least 10 characters long';
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

// Email validation
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Password validation
export const validatePassword = (password) => {
  const errors = [];

  if (password.length < 6) {
    errors.push('Password must be at least 6 characters long');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};
