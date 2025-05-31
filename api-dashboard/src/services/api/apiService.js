import { createApiInstance } from '../../utils/apiUtils';
import { API_CONFIG } from '../../config/api.config';

// Mock data for the News widget
export const mockNews = {
  articles: [
    {
      title: "Tech Giants Announce New AI Collaboration",
      url: "#",
      source: { name: "Tech Today" },
      publishedAt: "2023-06-15T09:30:00Z",
    },
    {
      title: "Breakthrough in Quantum Computing Research",
      url: "#",
      source: { name: "Science Daily" },
      publishedAt: "2023-06-14T14:45:00Z",
    },
    {
      title: "New Mobile App Revolutionizes Healthcare Access",
      url: "#",
      source: { name: "Health Tech" },
      publishedAt: "2023-06-13T11:20:00Z",
    }
  ]
};

// Mock data for the Stocks widget
export const mockStocks = {
  stocks: [
    { symbol: 'AAPL', name: 'Apple Inc.', price: 172.39, change: 2.31, changePercent: 1.36 },
    { symbol: 'MSFT', name: 'Microsoft', price: 339.71, change: -2.14, changePercent: -0.63 },
    { symbol: 'GOOGL', name: 'Alphabet', price: 142.65, change: 1.04, changePercent: 0.73 },
  ],
  chartData: [
    { name: 'Jan', AAPL: 160, MSFT: 320 },
    { name: 'Feb', AAPL: 155, MSFT: 318 },
    { name: 'Mar', AAPL: 158, MSFT: 330 },
    { name: 'Apr', AAPL: 162, MSFT: 335 },
    { name: 'May', AAPL: 165, MSFT: 340 },
    { name: 'Jun', AAPL: 172, MSFT: 338 },
  ]
};

// Fetch data from an API
export const fetchWidgetData = async (apiType, settings) => {
  try {
    const { baseURL, apiKey } = API_CONFIG[apiType];
    const api = createApiInstance(baseURL, apiKey);
    
    // These endpoints would need to be customized for each API
    let endpoint = '';
    let params = {};
    
    switch(apiType) {
      case 'weather':
        endpoint = '/weather';
        params = { 
          q: settings.weather.city, 
          units: settings.weather.units
        };
        break;
      case 'news':
        endpoint = '/top-headlines';
        params = { 
          country: settings.news.country, 
          category: settings.news.category, 
          pageSize: settings.news.pageSize 
        };
        break;
      case 'stocks':
        endpoint = '/quote';
        params = { symbol: settings.stocks.symbols[0] };
        break;
      case 'covid':
        endpoint = settings.covid.country === 'global' ? '/all' : `/countries/${settings.covid.country}`;
        break;
      default:
        throw new Error(`Invalid API type: ${apiType}`);
    }
    
    const response = await api.get(endpoint, { params });
    return response.data;
  } catch (error) {
    console.error(`Error fetching ${apiType} data:`, error);
    
    // Return mock data for demo purposes if API call fails
    if (apiType === 'news') {
      return mockNews;
    } else if (apiType === 'stocks') {
      return mockStocks;
    }
    
    // Rethrow error for other API types
    throw error;
  }
};