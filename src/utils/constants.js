/**
 * Application constants and configuration
 * Centralized location for all app-wide constants
 */

// API Configuration
export const API_CONFIG = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000',
  ENDPOINTS: {
    ITEMS: '/api/items',
    HEALTH: '/api/health',
  },
  TIMEOUT: 10000, // 10 seconds
  RETRY_ATTEMPTS: 3,
};

// Form Configuration
export const FORM_CONFIG = {
  VINYL: {
    MIN_YEAR: 1900,
    MAX_YEAR: new Date().getFullYear(),
    MIN_PRICE: 0,
    MAX_PRICE: 10000,
    MIN_RATING: 1,
    MAX_RATING: 5,
    RATING_STEP: 0.1,
  },
};

// UI Configuration
export const UI_CONFIG = {
  SCROLL_TO_TOP_THRESHOLD: 300,
  TOAST_DURATION: 3000,
  LOADING_DELAY: 200,
  ANIMATION_DURATION: 300,
};

// Validation Messages
export const VALIDATION_MESSAGES = {
  REQUIRED: 'This field is required',
  INVALID_EMAIL: 'Please enter a valid email address',
  INVALID_URL: 'Please enter a valid URL',
  INVALID_NUMBER: 'Please enter a valid number',
  MIN_LENGTH: (min) => `Must be at least ${min} characters`,
  MAX_LENGTH: (max) => `Must be no more than ${max} characters`,
  MIN_VALUE: (min) => `Must be at least ${min}`,
  MAX_VALUE: (max) => `Must be no more than ${max}`,
};

// Genre Options
export const GENRE_OPTIONS = [
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

// Condition Options
export const CONDITION_OPTIONS = [
  'Mint',
  'Near Mint',
  'Very Good+',
  'Very Good',
  'Good+',
  'Good',
  'Fair',
];

// Demo Credentials
export const DEMO_CREDENTIALS = {
  EMAIL: 'admin@retro.com',
  PASSWORD: 'admin123',
};

// Navigation Links
export const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'Collection', href: '/items' },
  { name: 'About', href: '#about' },
  { name: 'Contact', href: '#contact' },
];

// Social Links (for future use)
export const SOCIAL_LINKS = {
  TWITTER: 'https://twitter.com/retrovinyls',
  INSTAGRAM: 'https://instagram.com/retrovinyls',
  FACEBOOK: 'https://facebook.com/retrovinyls',
};

// SEO Configuration
export const SEO_CONFIG = {
  SITE_NAME: 'RetroVinyls',
  SITE_DESCRIPTION:
    'Discover and collect vintage vinyl records from our carefully curated collection',
  SITE_URL: 'https://retro-vinyls.vercel.app',
  DEFAULT_IMAGE: '/og-image.jpg',
};
