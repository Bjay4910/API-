// API configuration file
// Store your API configurations and base URLs here

// We're using environment variables for API keys
// Create a .env file in the root of your project with these variables:
// REACT_APP_OPENWEATHER_API_KEY=your_key_here
// REACT_APP_NEWS_API_KEY=your_key_here
// REACT_APP_FINNHUB_API_KEY=your_key_here

export const API_CONFIG = {
    weather: {
      baseURL: 'https://api.openweathermap.org/data/2.5',
      apiKey: process.env.REACT_APP_API_KEY, // From .env file
    },
    news: {
      baseURL: 'https://newsapi.org/v2',
      apiKey: process.env.REACT_APP_NEWS_API_KEY, // From .env file (not set up yet)
    },
    stocks: {
      baseURL: 'https://finnhub.io/api/v1',
      apiKey: process.env.REACT_APP_FINNHUB_API_KEY, // From .env file (not set up yet)
    },
    covid: {
      baseURL: 'https://disease.sh/v3/covid-19',
      apiKey: null, // No API key required
    }
  };