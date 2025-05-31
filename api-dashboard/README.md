# API Dashboard

A modern React dashboard that integrates multiple APIs to display data in an elegant and interactive UI.

![API Dashboard](./public/logo192.png)

## Overview

This project is a customizable dashboard built with React and Material UI that showcases data from multiple external APIs in real-time. It provides a clean, responsive interface with widgets for different data sources.

## Features

- **Modern UI**: Built with Material UI for a clean, professional look
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Multiple Data Sources**: Integrates with various APIs
- **Interactive Widgets**: Real-time data visualization with charts and stats
- **Customizable Layout**: Flexible grid layout for organizing widgets

## Widgets

- **Weather**: Current conditions and forecast using OpenWeatherMap API
- **News**: Latest headlines from NewsAPI
- **Stocks**: Stock prices and trends from Finnhub API
- **COVID-19**: Global statistics from Disease.sh API

## Tech Stack

- **React**: Frontend library for building user interfaces
- **Material UI**: Component library for modern design
- **Axios**: HTTP client for API requests
- **Recharts**: Responsive charting library
- **React Grid Layout**: Draggable and resizable grid layout

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/api-dashboard.git
   cd api-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure API keys:
   - Create a `.env` file in the root directory with:
     ```
     REACT_APP_API_KEY=your_openweather_api_key
     REACT_APP_NEWS_API_KEY=your_newsapi_key
     REACT_APP_FINNHUB_API_KEY=your_finnhub_api_key
     ```

4. Start the development server:
   ```bash
   npm start
   ```

## Usage

After starting the development server, open [http://localhost:3000](http://localhost:3000) in your browser to view the dashboard.

Each widget displays data from its respective API and includes:
- A refresh button to fetch new data
- Settings dialog to customize widget behavior
- Visual representations of the data
- Interactive elements like charts and lists

## Project Structure

```
src/
  ├── components/         # UI components
  │   ├── Common/         # Reusable components 
  │   ├── Dashboard/      # Main dashboard components
  │   ├── Layout/         # Layout components
  │   └── Widgets/        # Individual widget components
  ├── config/             # Configuration files
  ├── context/            # React context providers
  ├── hooks/              # Custom React hooks
  ├── services/           # Service layer
  │   └── api/            # API service modules
  ├── styles/             # Global styles and theme
  └── utils/              # Utility functions
```

## Available Scripts

In the project directory, you can run:

### `npm start` or `npm run dev`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.

## Customization

### Adding New Widgets

1. Create a new component in the `src/components/Widgets` directory
2. Add your API configuration in `src/config/api.config.js`
3. Import and add the widget to the grid in `src/components/Dashboard/Dashboard.js`

### Modifying API Integrations

The project uses a centralized API utility in `src/utils/apiUtils.js` that handles:
- Creating pre-configured Axios instances
- Adding API keys to requests
- Error handling
- Response formatting

### Styling

The project uses Material UI's styling system with:
- Customizable themes
- CSS-in-JS via the `sx` prop
- Responsive design utilities

## Security Notes

- **API Keys**: For production use, store API keys in environment variables
- **CORS**: Some APIs may require CORS handling or a proxy server
- **Rate Limiting**: Be aware of API rate limits for your keys

## License

Distributed under the MIT License.

## Acknowledgments

- [Create React App](https://github.com/facebook/create-react-app)
- [Material UI](https://mui.com/)
- [Recharts](https://recharts.org/)
- API providers:
  - [OpenWeatherMap](https://openweathermap.org/)
  - [NewsAPI](https://newsapi.org/)
  - [Finnhub](https://finnhub.io/)
  - [Disease.sh](https://disease.sh/)