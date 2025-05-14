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
   - Open `src/config/api.config.js`
   - Replace placeholder API keys with your own from:
     - [OpenWeatherMap](https://openweathermap.org/api)
     - [NewsAPI](https://newsapi.org/)
     - [Finnhub](https://finnhub.io/)
     - No API key required for [Disease.sh](https://disease.sh/)

4. Start the development server:
   ```bash
   npm start
   ```

## Usage

After starting the development server, open [http://localhost:3000](http://localhost:3000) in your browser to view the dashboard.

Each widget displays data from its respective API and includes:
- A refresh button to fetch new data
- Visual representations of the data
- Interactive elements like charts and lists

## Project Structure

```
api-dashboard/
├── public/             # Static files
├── src/                # Source code
│   ├── components/     # React components
│   │   ├── Dashboard/  # Main dashboard component
│   │   ├── UI/         # Reusable UI components
│   │   └── Widgets/    # Individual widgets
│   ├── config/         # Configuration files
│   │   └── api.config.js # API keys and endpoints
│   ├── context/        # React context providers
│   ├── hooks/          # Custom React hooks
│   ├── services/       # API services
│   │   └── api/        # API integration code
│   ├── utils/          # Utility functions
│   │   └── apiUtils.js # API utilities
│   ├── App.js          # Main App component
│   └── index.js        # Entry point
└── package.json        # Dependencies and scripts
```

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

## Development

### Available Scripts

- `npm start`: Runs the app in development mode
- `npm build`: Builds the app for production
- `npm test`: Runs the test suite
- `npm eject`: Ejects from Create React App

## Security Notes

- **API Keys**: For production use, store API keys in environment variables
- **CORS**: Some APIs may require CORS handling or a proxy server
- **Rate Limiting**: Be aware of API rate limits for your keys

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` file for more information.

## Acknowledgments

- [Create React App](https://github.com/facebook/create-react-app)
- [Material UI](https://mui.com/)
- [Recharts](https://recharts.org/)
- API providers:
  - [OpenWeatherMap](https://openweathermap.org/)
  - [NewsAPI](https://newsapi.org/)
  - [Finnhub](https://finnhub.io/)
  - [Disease.sh](https://disease.sh/)