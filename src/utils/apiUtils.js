import axios from 'axios';

// Create a configured axios instance for a specific API
export const createApiInstance = (baseURL, apiKey = null) => {
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
    }, (error) => {
      return Promise.reject(error);
    });
  }

  // Add response interceptor for error handling
  instance.interceptors.response.use(
    (response) => response, 
    (error) => {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('API Error Response:', error.response.status, error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('API No Response:', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('API Request Error:', error.message);
      }
      return Promise.reject(error);
    }
  );

  return instance;
};