/**
 * Centralized API configuration and utilities
 * Handles environment-based API URL management and common fetch patterns
 */

// Get API base URL with fallback
export const getApiUrl = () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (!apiUrl) {
    if (typeof window !== 'undefined') {
      console.warn('NEXT_PUBLIC_API_URL not configured');
    }
    return null;
  }

  return apiUrl;
};

// Common fetch wrapper with error handling
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

  const response = await fetch(url, defaultOptions);

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `HTTP ${response.status}: ${response.statusText} - ${errorText}`,
    );
  }

  return response.json();
};

// Specific API methods
export const itemsApi = {
  // Get all items with revalidation
  getAll: () =>
    apiRequest('/api/items', {
      next: { revalidate: 60 }, // Revalidate every 60 seconds
    }),

  // Get single item
  getById: (id) =>
    apiRequest(`/api/items/${id}`, {
      next: { revalidate: 60 },
    }),

  // Create new item
  create: (itemData) =>
    apiRequest('/api/items', {
      method: 'POST',
      body: JSON.stringify(itemData),
    }),
};
