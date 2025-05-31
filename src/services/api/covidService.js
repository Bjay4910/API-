import { createApiInstance } from '../../utils/apiUtils';
import { API_CONFIG } from '../../config/api.config';

const { baseURL } = API_CONFIG.covid;
const covidApi = createApiInstance(baseURL);

export const getGlobalStats = async () => {
  try {
    const response = await covidApi.get('/all');
    return response.data;
  } catch (error) {
    console.error('Error fetching global COVID stats:', error);
    throw error;
  }
};

export const getCountryStats = async (country) => {
  try {
    const response = await covidApi.get(`/countries/${country}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching COVID stats for ${country}:`, error);
    throw error;
  }
};

export const getHistoricalData = async (country = 'all', lastDays = 30) => {
  try {
    const response = await covidApi.get(`/historical/${country}`, {
      params: {
        lastdays: lastDays,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching historical COVID data:', error);
    throw error;
  }
};