import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const features = [
    {
      title: 'Real-time API Monitoring',
      description: 'Track your API calls in real-time with comprehensive analytics and logging. Get instant insights into performance metrics and response times.',
      icon: '📊'
    },
    {
      title: 'Customizable Dashboard',
      description: 'Create your personalized view with drag-and-drop widgets for different API services. Arrange and resize components to match your workflow.',
      icon: '⚙️'
    },
    {
      title: 'Multi-API Integration',
      description: 'Connect and monitor multiple APIs from a single dashboard including weather, stocks, news, and COVID data. Add new services with just a few clicks.',
      icon: '🔄'
    },
    {
      title: 'Smart Alerts',
      description: 'Get notified when API performance changes or when critical thresholds are reached. Set up custom alert rules for any metric.',
      icon: '🔔'
    },
    {
      title: 'Data Visualization',
      description: 'Transform complex API data into beautiful, interactive charts and graphs. Easily share insights with your team.',
      icon: '📈'
    },
    {
      title: 'Secure Access',
      description: 'Enterprise-grade security with role-based access control. Keep your API keys and data protected at all times.',
      icon: '🔒'
    }
  ];

  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to the API Dashboard</h1>
          <p>Your centralized hub for monitoring and managing multiple API services in real-time</p>
          <p>Track, analyze, and visualize data from various APIs all in one place with our powerful dashboard.</p>
          <div className="cta-buttons">
            <Link to="/dashboard" className="primary-button">Go to Dashboard</Link>
            <Link to="/documentation" className="secondary-button">Read Documentation</Link>
            <Link to="/profile" className="secondary-button">Setup Profile</Link>
          </div>
        </div>
        <div className="hero-image">
          <div className="dashboard-preview">
            {/* Dashboard preview image or illustration */}
            <img 
              src="/images/widgets/dashboard-preview.jpg" 
              alt="Dashboard Preview" 
              style={{ maxWidth: '100%', height: 'auto', borderRadius: '6px' }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.style.display = 'none';
                e.target.parentNode.innerHTML += '<div class="preview-placeholder">Interactive Dashboard Preview</div>';
              }}
            />
          </div>
        </div>
      </section>
      
      <section className="features">
        <h2>Key Features</h2>
        <div className="feature-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
      
      <section className="api-services">
        <h2>Available API Services</h2>
        <div className="service-grid">
          <div className="service-card">
            <h3>Weather API</h3>
            <p>Get real-time weather data from multiple sources</p>
          </div>
          <div className="service-card">
            <h3>Stock Market API</h3>
            <p>Track financial markets and stock performance</p>
          </div>
          <div className="service-card">
            <h3>News API</h3>
            <p>Access latest headlines and news stories</p>
          </div>
          <div className="service-card">
            <h3>COVID-19 API</h3>
            <p>Monitor pandemic statistics and trends</p>
          </div>
        </div>
      </section>
      
      <section className="get-started">
        <h2>Ready to Elevate Your API Experience?</h2>
        <p>Start monitoring your APIs in real-time with our powerful dashboard. Set up in minutes, not hours.</p>
        <p>Join thousands of developers and teams who trust our platform for their API monitoring needs.</p>
        <div className="cta-buttons">
          <Link to="/dashboard" className="primary-button">Launch Dashboard</Link>
          <Link to="/profile" className="secondary-button">Setup Your Profile</Link>
          <Link to="/documentation" className="secondary-button">Explore Documentation</Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;