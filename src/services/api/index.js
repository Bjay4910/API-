// Export all API services from a single file
export * from './weatherService';
export * from './newsService';
export * from './stocksService';
export * from './covidService';

// You can also export them as namespaces if preferred
import * as weatherService from './weatherService';
import * as newsService from './newsService';
import * as stocksService from './stocksService';
import * as covidService from './covidService';

export const services = {
  weather: weatherService,
  news: newsService,
  stocks: stocksService,
  covid: covidService,
};