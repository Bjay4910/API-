import axios from 'axios';
import { getCachedResponse, setCachedResponse, generateCacheKey } from './cacheUtils';
import { checkRateLimit, RATE_LIMITS } from './rateLimitUtils';

/**
 * Create a configured axios instance for a specific API
 * @param {string} baseURL - Base URL for the API
 * @param {string} apiKey - API key
 * @param {string} apiName - Name of the API for caching and rate limiting
 * @returns {object} - Configured axios instance
 */
export const createApiInstance = (baseURL, apiKey = null, apiName = null) => {
  const instance = axios.create({
    baseURL,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Add request interceptor for API key if provided
  if (apiKey) {
    instance.interceptors.request.use((config) => {
      // Different APIs may expect the key in different formats
      if (config.url.includes('openweathermap')) {
        // OpenWeather expects 'appid' as a query param
        config.params = {
          ...config.params,
          appid: apiKey,
        };
      } else if (config.url.includes('newsapi')) {
        // NewsAPI expects 'X-Api-Key' in headers
        config.headers['X-Api-Key'] = apiKey;
      } else if (config.url.includes('finnhub')) {
        // Finnhub expects 'X-Finnhub-Token' in headers
        config.headers['X-Finnhub-Token'] = apiKey;
      } else {
        // Default: Add as query parameter 'apiKey'
        config.params = {
          ...config.params,
          apiKey,
        };
      }
      return config;
    });
  }

  // Wrap the instance's get method to add caching and rate limiting
  const originalGet = instance.get;
  instance.get = async function(url, config = {}) {
    // Generate a cache key from the URL and parameters
    const cacheKey = generateCacheKey(
      apiName || url,
      { url, params: config.params || {} }
    );
    
    // Check for a cached response (default 5 minute TTL)
    const cachedResponse = getCachedResponse(cacheKey);
    if (cachedResponse) {
      return { data: cachedResponse, __fromCache: true };
    }
    
    // Check rate limits if the API name is provided and has defined limits
    if (apiName && RATE_LIMITS[apiName]) {
      const limitStatus = checkRateLimit(apiName, RATE_LIMITS[apiName]);
      
      // If we can't proceed due to rate limits, throw a custom error
      if (!limitStatus.canProceed) {
        const error = new Error(`Rate limit exceeded for ${apiName} API`);
        error.response = {
          status: 429,
          data: {
            message: `Too many requests. Please try again after ${limitStatus.resetTime.toLocaleTimeString()}`,
            resetTime: limitStatus.resetTime
          }
        };
        throw error;
      }
    }
    
    // Make the actual API call
    try {
      const response = await originalGet.call(this, url, config);
      
      // Cache the successful response
      setCachedResponse(cacheKey, response.data);
      
      return response;
    } catch (error) {
      // Don't cache errors
      throw error;
    }
  };

  return instance;
};