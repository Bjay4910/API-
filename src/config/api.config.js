// API configuration file
// Store your API keys and base URLs here

// IMPORTANT: Replace the placeholder API keys below with your actual API keys
// For security, consider using environment variables instead of hardcoding keys
// Example: apiKey: process.env.REACT_APP_OPENWEATHER_API_KEY

export const API_CONFIG = {
    weather: {
      baseURL: 'https://api.openweathermap.org/data/2.5',
      apiKey: '89300d9944519a28a6b241ce68adbecd', // Register at openweathermap.org
    },
    news: {
      baseURL: 'https://newsapi.org/v2',
      apiKey: '849f5afc04cc4bf48033b3bb29d3e46f', // Register at newsapi.org
    },
    stocks: {
      baseURL: 'https://finnhub.io/api/v1',
      apiKey: '849f5afc04cc4bf48033b3bb29d3e46f', // Register at finnhub.io
    },
    covid: {
      baseURL: 'https://disease.sh/v3/covid-19',
      apiKey: null, // No API key required
    }
  };