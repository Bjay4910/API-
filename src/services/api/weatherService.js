import { createApiInstance } from '../../utils/apiUtils';
import { API_CONFIG } from '../../config/api.config';

const { baseURL, apiKey } = API_CONFIG.weather;
// Pass 'weather' as the API name for rate limiting and caching
const weatherApi = createApiInstance(baseURL, apiKey, 'weather');

export const getWeatherByCity = async (city) => {
  try {
    const response = await weatherApi.get('/weather', {
      params: {
        q: city,
        units: 'metric', // or 'imperial' for Fahrenheit
      },
    });
    
    // Check if response came from cache and just return the data
    if (response.__fromCache) {
      return response.data;
    }
    
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
};

export const getWeatherForecast = async (city) => {
  try {
    const response = await weatherApi.get('/forecast', {
      params: {
        q: city,
        units: 'metric',
        cnt: 5, // 5-day forecast
      },
    });
    
    // Check if response came from cache and just return the data
    if (response.__fromCache) {
      return response.data;
    }
    
    return response.data;
  } catch (error) {
    console.error('Error fetching weather forecast:', error);
    throw error;
  }
};