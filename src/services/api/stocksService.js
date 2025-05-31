import { createApiInstance } from '../../utils/apiUtils';
import { API_CONFIG } from '../../config/api.config';

const { baseURL, apiKey } = API_CONFIG.stocks;
const stocksApi = createApiInstance(baseURL, apiKey);

export const getStockQuote = async (symbol) => {
  try {
    const response = await stocksApi.get('/quote', {
      params: {
        symbol: symbol.toUpperCase(),
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching stock quote:', error);
    throw error;
  }
};

export const getStockCandles = async (symbol, resolution = 'D', from, to) => {
  try {
    const response = await stocksApi.get('/stock/candle', {
      params: {
        symbol: symbol.toUpperCase(),
        resolution,
        from, // Unix timestamp
        to,   // Unix timestamp
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching stock candles:', error);
    throw error;
  }
};