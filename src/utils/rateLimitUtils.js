// Track API requests to manage rate limiting
const apiRequests = {};

/**
 * Reset counters for a specific API
 * @param {string} apiName - The name of the API
 */
const resetCounters = (apiName) => {
  apiRequests[apiName] = {
    count: 0,
    timestamp: Date.now(),
  };
};

/**
 * Check if an API request would exceed the rate limit
 * @param {string} apiName - The name of the API
 * @param {object} limits - Rate limits configuration
 * @returns {object} - Rate limit status
 */
export const checkRateLimit = (apiName, limits) => {
  const now = Date.now();
  
  // Initialize counter if it doesn't exist
  if (!apiRequests[apiName]) {
    resetCounters(apiName);
    return { 
      canProceed: true,
      remainingRequests: limits.maxRequests - 1,
      resetTime: null
    };
  }
  
  // Calculate time since last window reset
  const timeSinceReset = now - apiRequests[apiName].timestamp;
  
  // Reset counter if the time window has passed
  if (timeSinceReset > limits.timeWindow) {
    resetCounters(apiName);
    return { 
      canProceed: true,
      remainingRequests: limits.maxRequests - 1,
      resetTime: null
    };
  }
  
  // Check if we've exceeded the rate limit
  if (apiRequests[apiName].count >= limits.maxRequests) {
    // Calculate time until reset
    const resetTime = new Date(apiRequests[apiName].timestamp + limits.timeWindow);
    return {
      canProceed: false,
      remainingRequests: 0,
      resetTime 
    };
  }
  
  // Increment the counter
  apiRequests[apiName].count += 1;
  
  return {
    canProceed: true,
    remainingRequests: limits.maxRequests - apiRequests[apiName].count,
    resetTime: new Date(apiRequests[apiName].timestamp + limits.timeWindow)
  };
};

/**
 * Rate limit configuration for different APIs
 */
export const RATE_LIMITS = {
  weather: {
    maxRequests: 50, // Reduced from 60 to give some safety margin
    timeWindow: 60 * 1000, // 1 minute in milliseconds
  },
  news: {
    maxRequests: 90, // Reduced from 100 to give some safety margin
    timeWindow: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
  },
};