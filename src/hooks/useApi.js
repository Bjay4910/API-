import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for API calls with caching and rate limiting support
 * @param {Function} apiFunction - The API function to call
 * @param {any} params - Parameters to pass to the API function
 * @param {boolean} executeOnMount - Whether to execute the API call on mount
 * @returns {Object} - API state and control functions
 */
const useApi = (apiFunction, params = null, executeOnMount = true) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(executeOnMount);
  const [error, setError] = useState(null);
  const [rateLimitInfo, setRateLimitInfo] = useState(null);

  /**
   * Execute the API call with optional custom parameters
   */
  const execute = useCallback(async (customParams) => {
    setLoading(true);
    setError(null);
    setRateLimitInfo(null);
    
    try {
      const result = await apiFunction(customParams || params);
      setData(result);
      return result;
    } catch (err) {
      // Check if this is a rate limit error (status 429)
      const isRateLimit = err.response && err.response.status === 429;
      
      if (isRateLimit && err.response.data) {
        // Get rate limit info
        setRateLimitInfo({
          message: err.response.data.message || 'Rate limit exceeded',
          resetTime: err.response.data.resetTime || null
        });
        
        // Format a user-friendly error message
        setError(err.response.data.message || 'Rate limit exceeded');
      } else {
        // Handle regular error
        setError(err.message || 'An error occurred');
      }
      
      return null;
    } finally {
      setLoading(false);
    }
  }, [apiFunction, params]);

  useEffect(() => {
    if (executeOnMount) {
      execute();
    }
  }, [execute, executeOnMount]);

  const refresh = useCallback(() => {
    return execute();
  }, [execute]);

  /**
   * Check if the current error is a rate limit error
   */
  const isRateLimitError = Boolean(rateLimitInfo);

  return { 
    data, 
    loading, 
    error, 
    execute, 
    refresh,
    isRateLimitError,
    rateLimitInfo
  };
};

export default useApi;