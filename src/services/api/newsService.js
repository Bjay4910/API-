import { createApiInstance } from '../../utils/apiUtils';
import { API_CONFIG } from '../../config/api.config';

const { baseURL, apiKey } = API_CONFIG.news;
// Pass 'news' as the API name for rate limiting and caching
const newsApi = createApiInstance(baseURL, apiKey, 'news');

export const getTopHeadlines = async (category = 'general', country = 'us', pageSize = 5) => {
  try {
    const response = await newsApi.get('/top-headlines', {
      params: {
        category,
        country,
        pageSize,
      },
    });
    
    // Check if response came from cache and just return the data
    if (response.__fromCache) {
      return response.data;
    }
    
    return response.data;
  } catch (error) {
    console.error('Error fetching news headlines:', error);
    throw error;
  }
};

export const searchNews = async (query, from, to, pageSize = 10) => {
  try {
    const response = await newsApi.get('/everything', {
      params: {
        q: query,
        from,
        to,
        pageSize,
        sortBy: 'publishedAt',
      },
    });
    
    // Check if response came from cache and just return the data
    if (response.__fromCache) {
      return response.data;
    }
    
    return response.data;
  } catch (error) {
    console.error('Error searching news:', error);
    throw error;
  }
};