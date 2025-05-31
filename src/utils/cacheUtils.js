// Simple in-memory cache for API responses
const cache = new Map();

/**
 * Get a cached response
 * @param {string} key - The cache key
 * @param {number} maxAge - Maximum age in milliseconds
 * @returns {object|null} - The cached value or null if not found/expired
 */
export const getCachedResponse = (key, maxAge = 5 * 60 * 1000) => {
  if (!cache.has(key)) return null;
  
  const { timestamp, data } = cache.get(key);
  const now = Date.now();
  
  // Check if the cache entry has expired
  if (now - timestamp > maxAge) {
    cache.delete(key);
    return null;
  }
  
  return data;
};

/**
 * Set a response in the cache
 * @param {string} key - The cache key
 * @param {any} data - The data to cache
 */
export const setCachedResponse = (key, data) => {
  cache.set(key, {
    timestamp: Date.now(),
    data,
  });
};

/**
 * Clear the entire cache or entries with a specific prefix
 * @param {string} prefix - Optional prefix to clear only matching entries
 */
export const clearCache = (prefix = null) => {
  if (prefix) {
    // Delete only entries that start with the prefix
    for (const key of cache.keys()) {
      if (key.startsWith(prefix)) {
        cache.delete(key);
      }
    }
  } else {
    cache.clear();
  }
};

/**
 * Generate a cache key from a service name and parameters
 * @param {string} service - The service name
 * @param {object} params - The parameters
 * @returns {string} - The cache key
 */
export const generateCacheKey = (service, params) => {
  return `${service}:${JSON.stringify(params)}`;
};