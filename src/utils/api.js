/**
 * Centralized API configuration and utilities
 * Handles environment-based API URL management and common fetch patterns
 */

import { API_CONFIG } from './constants';

// Get API base URL with fallback
export const getApiUrl = () => {
  const apiUrl = API_CONFIG.BASE_URL;

  if (!apiUrl || apiUrl.includes('localhost')) {
    if (
      typeof window !== 'undefined' &&
      process.env.NODE_ENV === 'development'
    ) {
      console.warn('Using localhost API URL in development');
    }
  }

  return apiUrl;
};

// Common fetch wrapper with error handling and retry logic
export const apiRequest = async (endpoint, options = {}) => {
  const baseUrl = getApiUrl();

  if (!baseUrl) {
    throw new Error('API URL not configured');
  }

  const url = `${baseUrl}${endpoint}`;

  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    cache: 'no-store',
    ...options,
  };

  // Only log in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`API Request: ${options.method || 'GET'} ${url}`);
  }

  let lastError;

  // Retry logic
  for (let attempt = 1; attempt <= API_CONFIG.RETRY_ATTEMPTS; attempt++) {
    try {
      const response = await fetch(url, defaultOptions);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `HTTP ${response.status}: ${response.statusText} - ${errorText}`,
        );
      }

      return response.json();
    } catch (error) {
      lastError = error;

      // Don't retry on client errors (4xx)
      if (error.message.includes('HTTP 4')) {
        throw error;
      }

      // Wait before retrying (exponential backoff)
      if (attempt < API_CONFIG.RETRY_ATTEMPTS) {
        await new Promise((resolve) =>
          setTimeout(resolve, Math.pow(2, attempt) * 1000),
        );
      }
    }
  }

  throw lastError;
};

// Specific API methods
export const itemsApi = {
  // Get all items with revalidation
  getAll: () =>
    apiRequest(API_CONFIG.ENDPOINTS.ITEMS, {
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    }),

  // Get single item
  getById: (id) =>
    apiRequest(`${API_CONFIG.ENDPOINTS.ITEMS}/${id}`, {
      next: { revalidate: 60 },
    }),

  // Create new item
  create: (itemData) =>
    apiRequest(API_CONFIG.ENDPOINTS.ITEMS, {
      method: 'POST',
      body: JSON.stringify(itemData),
    }),

  // Update item
  update: (id, itemData) =>
    apiRequest(`${API_CONFIG.ENDPOINTS.ITEMS}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(itemData),
    }),

  // Delete item
  delete: (id) =>
    apiRequest(`${API_CONFIG.ENDPOINTS.ITEMS}/${id}`, {
      method: 'DELETE',
    }),
};

// Health check API
export const healthApi = {
  check: () => apiRequest(API_CONFIG.ENDPOINTS.HEALTH),
};
