// API configuration file
// Store your API keys and base URLs here

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
      apiKey: 'd0hsojpr01ql9qu6r9b0d0hsojpr01ql9qu6r9bg', // Register at finnhub.io
    },
    covid: {
      baseURL: 'https://disease.sh/v3/covid-19',
      // No API key required
    }
  };