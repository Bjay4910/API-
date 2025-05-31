import React, { useState } from 'react';

const DocumentationPage = () => {
  const [activeTab, setActiveTab] = useState('getting-started');

  const tabs = [
    { id: 'getting-started', label: 'Getting Started' },
    { id: 'api-integration', label: 'API Integration' },
    { id: 'widgets', label: 'Widgets' },
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'faq', label: 'FAQ' }
  ];

  // Sample documentation content
  const documentation = {
    'getting-started': {
      title: 'Getting Started with API Dashboard',
      content: (
        <>
          <h2>Welcome to the API Dashboard</h2>
          <p>This dashboard provides a centralized interface for monitoring multiple API services. Follow these steps to get started:</p>
          
          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Create Your Account</h3>
                <p>Sign up for an account using your email address. Verify your email to activate your account.</p>
              </div>
            </div>
            
            <div className="step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Configure API Keys</h3>
                <p>Set up your API keys in the Profile section. You'll need to obtain API keys from the respective service providers.</p>
              </div>
            </div>
            
            <div className="step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Customize Your Dashboard</h3>
                <p>Add widgets to your dashboard by dragging them from the widget library. Arrange them in the layout that works best for you.</p>
              </div>
            </div>
            
            <div className="step">
              <div className="step-number">4</div>
              <div className="step-content">
                <h3>Set Up Alerts</h3>
                <p>Configure alerts to notify you when specific conditions are met, such as API errors or performance thresholds.</p>
              </div>
            </div>
          </div>
          
          <h3>System Requirements</h3>
          <ul>
            <li>Modern web browser (Chrome, Firefox, Safari, Edge)</li>
            <li>Internet connection</li>
            <li>Valid API keys for the services you want to monitor</li>
          </ul>
        </>
      )
    },
    'api-integration': {
      title: 'API Integration Guide',
      content: (
        <>
          <h2>API Integration</h2>
          <p>Learn how to integrate different API services with your dashboard.</p>
          
          <div className="api-section">
            <h3>Weather API</h3>
            <p>The Weather API allows you to get current weather conditions and forecasts for any location.</p>
            
            <div className="code-block">
              <pre>{`// Example of using the Weather API client
import { weatherService } from '../services/api';

// Get current weather for a location
const currentWeather = await weatherService.getCurrentWeather({
  location: 'New York,US',
  units: 'metric'
});

// Get 5-day forecast
const forecast = await weatherService.getForecast({
  location: 'New York,US',
  days: 5
});`}</pre>
            </div>
            
            <h4>Required Parameters</h4>
            <ul>
              <li><strong>location</strong>: City name and country code (e.g., 'London,UK')</li>
              <li><strong>units</strong>: 'metric' or 'imperial'</li>
            </ul>
          </div>
          
          <div className="api-section">
            <h3>Stock API</h3>
            <p>The Stock API provides real-time and historical stock market data.</p>
            
            <div className="code-block">
              <pre>{`// Example of using the Stock API client
import { stocksService } from '../services/api';

// Get current stock quote
const quote = await stocksService.getQuote({
  symbol: 'AAPL'
});

// Get historical data
const historicalData = await stocksService.getHistorical({
  symbol: 'AAPL',
  range: '1month'
});`}</pre>
            </div>
            
            <h4>Required Parameters</h4>
            <ul>
              <li><strong>symbol</strong>: Stock ticker symbol (e.g., 'AAPL', 'MSFT')</li>
              <li><strong>range</strong>: Time range for historical data ('1day', '1week', '1month', '3months', '1year')</li>
            </ul>
          </div>
          
          <div className="api-section">
            <h3>News API</h3>
            <p>The News API provides access to headlines and news articles from various sources.</p>
            
            <div className="code-block">
              <pre>{`// Example of using the News API client
import { newsService } from '../services/api';

// Get top headlines
const headlines = await newsService.getTopHeadlines({
  country: 'us',
  category: 'technology'
});

// Search for news
const searchResults = await newsService.searchNews({
  query: 'artificial intelligence',
  from: '2025-05-01',
  sortBy: 'relevancy'
});`}</pre>
            </div>
          </div>
          
          <div className="api-section">
            <h3>COVID-19 API</h3>
            <p>The COVID-19 API provides statistics and trends about the pandemic.</p>
            
            <div className="code-block">
              <pre>{`// Example of using the COVID API client
import { covidService } from '../services/api';

// Get global stats
const globalStats = await covidService.getGlobalStats();

// Get stats for a specific country
const countryStats = await covidService.getCountryStats({
  country: 'USA'
});

// Get historical data
const historicalData = await covidService.getHistoricalData({
  country: 'USA',
  days: 30
});`}</pre>
            </div>
          </div>
        </>
      )
    },
    'widgets': {
      title: 'Widget Documentation',
      content: (
        <>
          <h2>Available Widgets</h2>
          <p>The dashboard supports various widgets to visualize data from different API sources.</p>
          
          <div className="widget-card">
            <h3>Weather Widget</h3>
            <div className="widget-preview">
              {/* Widget preview image */}
              <div className="preview-placeholder">Weather Widget Preview</div>
            </div>
            <div className="widget-description">
              <p>Displays current weather conditions and forecast for a selected location.</p>
              <h4>Features:</h4>
              <ul>
                <li>Current temperature and conditions</li>
                <li>5-day forecast</li>
                <li>Humidity, wind speed, and pressure</li>
                <li>Sunrise and sunset times</li>
              </ul>
              <h4>Configuration Options:</h4>
              <ul>
                <li><strong>Location</strong>: City name or coordinates</li>
                <li><strong>Units</strong>: Celsius or Fahrenheit</li>
                <li><strong>Update Interval</strong>: How often the data refreshes</li>
              </ul>
            </div>
          </div>
          
          <div className="widget-card">
            <h3>Stock Widget</h3>
            <div className="widget-preview">
              {/* Widget preview image */}
              <div className="preview-placeholder">Stock Widget Preview</div>
            </div>
            <div className="widget-description">
              <p>Displays stock market data for selected symbols.</p>
              <h4>Features:</h4>
              <ul>
                <li>Real-time stock quotes</li>
                <li>Price charts (daily, weekly, monthly)</li>
                <li>Price change indicators</li>
                <li>Trading volume</li>
              </ul>
              <h4>Configuration Options:</h4>
              <ul>
                <li><strong>Symbols</strong>: Stock ticker symbols to track</li>
                <li><strong>Chart Type</strong>: Line, candlestick, or area</li>
                <li><strong>Time Range</strong>: Data time range to display</li>
              </ul>
            </div>
          </div>
          
          <div className="widget-card">
            <h3>News Widget</h3>
            <div className="widget-preview">
              {/* Widget preview image */}
              <div className="preview-placeholder">News Widget Preview</div>
            </div>
            <div className="widget-description">
              <p>Displays the latest news headlines from various sources.</p>
              <h4>Features:</h4>
              <ul>
                <li>Headlines with thumbnails</li>
                <li>Source and publication time</li>
                <li>Quick links to full articles</li>
                <li>Category filtering</li>
              </ul>
              <h4>Configuration Options:</h4>
              <ul>
                <li><strong>Categories</strong>: News categories to display</li>
                <li><strong>Sources</strong>: Specific news sources to include</li>
                <li><strong>Display Count</strong>: Number of headlines to show</li>
              </ul>
            </div>
          </div>
          
          <div className="widget-card">
            <h3>COVID-19 Widget</h3>
            <div className="widget-preview">
              {/* Widget preview image */}
              <div className="preview-placeholder">COVID Widget Preview</div>
            </div>
            <div className="widget-description">
              <p>Displays COVID-19 statistics and trends.</p>
              <h4>Features:</h4>
              <ul>
                <li>Global and country-specific statistics</li>
                <li>Cases, recoveries, and fatalities</li>
                <li>Trend charts over time</li>
                <li>Vaccination data</li>
              </ul>
              <h4>Configuration Options:</h4>
              <ul>
                <li><strong>Region</strong>: Global or specific countries</li>
                <li><strong>Metrics</strong>: Which statistics to display</li>
                <li><strong>Chart Type</strong>: How to visualize the data</li>
              </ul>
            </div>
          </div>
        </>
      )
    },
    'dashboard': {
      title: 'Dashboard Customization',
      content: (
        <>
          <h2>Dashboard Customization</h2>
          <p>Learn how to customize your dashboard with drag-and-drop widgets and layout options.</p>
          
          <div className="feature-section">
            <h3>Drag-and-Drop Interface</h3>
            <p>The dashboard uses a drag-and-drop interface to easily arrange and resize widgets:</p>
            <ul>
              <li><strong>Add Widgets</strong>: Drag widgets from the widget library to your dashboard</li>
              <li><strong>Arrange Widgets</strong>: Drag widgets to reposition them on the dashboard</li>
              <li><strong>Resize Widgets</strong>: Drag the widget corners to resize them</li>
              <li><strong>Remove Widgets</strong>: Click the X button on any widget to remove it</li>
            </ul>
            <div className="image-placeholder">
              <div className="preview-placeholder">Drag-and-Drop Demonstration</div>
            </div>
          </div>
          
          <div className="feature-section">
            <h3>Layouts and Grids</h3>
            <p>The dashboard grid system allows for flexible layout options:</p>
            <ul>
              <li><strong>Grid Size</strong>: You can adjust the grid size in the dashboard settings</li>
              <li><strong>Layout Presets</strong>: Choose from several predefined layouts</li>
              <li><strong>Responsive Design</strong>: Layouts automatically adjust to different screen sizes</li>
            </ul>
            <div className="code-block">
              <pre>{`// Example grid configuration
const gridConfig = {
  columns: 12,              // Number of columns
  rowHeight: 50,            // Height of each row in pixels
  margin: [10, 10],         // Margin between items [x, y]
  containerPadding: [10, 10], // Padding inside the container
  draggableHandle: '.widget-header', // Element to use as drag handle
  resizable: true,          // Allow widgets to be resized
  compactType: 'vertical'   // 'vertical', 'horizontal', or null
};`}</pre>
            </div>
          </div>
          
          <div className="feature-section">
            <h3>Widget Configuration</h3>
            <p>Each widget can be configured with its own settings:</p>
            <ol>
              <li>Click the settings icon on any widget</li>
              <li>Adjust the widget-specific settings in the configuration panel</li>
              <li>Save changes to update the widget</li>
            </ol>
            <p>Widget configurations are saved to your user profile and will persist between sessions.</p>
          </div>
          
          <div className="feature-section">
            <h3>Saving and Loading Layouts</h3>
            <p>You can save multiple dashboard configurations:</p>
            <ul>
              <li><strong>Save Layout</strong>: Click the "Save Layout" button and give it a name</li>
              <li><strong>Load Layout</strong>: Select a saved layout from the dropdown menu</li>
              <li><strong>Default Layout</strong>: Set a layout as the default when you log in</li>
              <li><strong>Export/Import</strong>: Export layouts to share with others, or import layouts from colleagues</li>
            </ul>
          </div>
        </>
      )
    },
    'faq': {
      title: 'Frequently Asked Questions',
      content: (
        <>
          <h2>Frequently Asked Questions</h2>
          
          <div className="faq-item">
            <h3>How do I obtain API keys for the services?</h3>
            <p>Each API service requires its own API key. Visit the official websites of each service provider to register for an API key:</p>
            <ul>
              <li>Weather API: <a href="#">weather-api-provider.com</a></li>
              <li>Stock API: <a href="#">stock-api-provider.com</a></li>
              <li>News API: <a href="#">news-api-provider.com</a></li>
              <li>COVID-19 API: <a href="#">covid-api-provider.com</a></li>
            </ul>
            <p>Once you have obtained your API keys, add them to your profile in the API Keys section.</p>
          </div>
          
          <div className="faq-item">
            <h3>How often is the data updated?</h3>
            <p>Data update frequency depends on both the API service and your settings:</p>
            <ul>
              <li>Weather data: Typically updated every 1-3 hours</li>
              <li>Stock data: Real-time or delayed by 15 minutes (depending on your subscription)</li>
              <li>News data: Updated as new articles are published</li>
              <li>COVID-19 data: Usually updated daily</li>
            </ul>
            <p>You can customize the refresh rate for each widget in its settings, or set a global refresh rate in your profile preferences.</p>
          </div>
          
          <div className="faq-item">
            <h3>Can I export data from the dashboard?</h3>
            <p>Yes, you can export data in several formats:</p>
            <ul>
              <li>CSV: For spreadsheet applications</li>
              <li>JSON: For programmatic use</li>
              <li>PDF: For reports and presentations</li>
            </ul>
            <p>Each widget has an export option in its menu. You can also export the entire dashboard as a report.</p>
          </div>
          
          <div className="faq-item">
            <h3>Is there a limit to how many widgets I can add?</h3>
            <p>There is no strict limit to the number of widgets you can add to your dashboard. However, for optimal performance, we recommend limiting your dashboard to 10-15 widgets. Adding too many widgets may cause performance issues, especially on lower-end devices.</p>
          </div>
          
          <div className="faq-item">
            <h3>What browsers are supported?</h3>
            <p>The API Dashboard supports all modern browsers, including:</p>
            <ul>
              <li>Google Chrome (version 90+)</li>
              <li>Mozilla Firefox (version 88+)</li>
              <li>Safari (version 14+)</li>
              <li>Microsoft Edge (version 90+)</li>
            </ul>
            <p>Internet Explorer is not supported.</p>
          </div>
          
          <div className="faq-item">
            <h3>Can I share my dashboard with others?</h3>
            <p>Yes, you can share your dashboard in several ways:</p>
            <ul>
              <li>Generate a shareable link (view-only)</li>
              <li>Invite users by email (view or edit permissions)</li>
              <li>Export the dashboard as a template for others to import</li>
              <li>Schedule automated reports to be sent by email</li>
            </ul>
            <p>Note that shared users will need their own API keys for the widgets to function properly.</p>
          </div>
          
          <div className="faq-item">
            <h3>How do I report issues or request features?</h3>
            <p>You can report issues or request features through the following channels:</p>
            <ul>
              <li>Support ticket: Click the "Help" button in the dashboard</li>
              <li>Email: support@api-dashboard.com</li>
              <li>GitHub: Submit an issue on our GitHub repository</li>
            </ul>
            <p>For bug reports, please include as much detail as possible, including steps to reproduce the issue and any error messages you received.</p>
          </div>
        </>
      )
    }
  };

  return (
    <div className="documentation-page">
      <div className="documentation-header">
        <h1>Documentation</h1>
        <p>Learn how to use the API Dashboard and integrate with various API services.</p>
      </div>
      
      <div className="documentation-container">
        <div className="documentation-tabs">
          {tabs.map(tab => (
            <button 
              key={tab.id}
              className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        
        <div className="documentation-content">
          {documentation[activeTab].content}
        </div>
        
        <div className="documentation-sidebar">
          <div className="search-box">
            <input type="text" placeholder="Search documentation..." />
            <button className="search-button">Search</button>
          </div>
          
          <div className="related-docs">
            <h3>Related Documents</h3>
            <ul>
              <li><a href="#">API Reference</a></li>
              <li><a href="#">Widget Development</a></li>
              <li><a href="#">Troubleshooting Guide</a></li>
              <li><a href="#">Release Notes</a></li>
            </ul>
          </div>
          
          <div className="doc-resources">
            <h3>Resources</h3>
            <ul>
              <li><a href="#">Download PDF Documentation</a></li>
              <li><a href="#">Video Tutorials</a></li>
              <li><a href="#">Community Forum</a></li>
              <li><a href="#">Contact Support</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentationPage;