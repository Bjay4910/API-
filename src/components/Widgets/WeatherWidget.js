import React, { useState } from 'react';
import { Typography, Box, TextField, Button } from '@mui/material';
import { WbSunny } from '@mui/icons-material';
import WidgetCard from '../UI/WidgetCard';
import useApi from '../../hooks/useApi';
import { getWeatherByCity } from '../../services/api/weatherService';
import ErrorMessage from '../UI/ErrorMessage';

const WeatherWidget = () => {
  const [city, setCity] = useState('London');
  const [searchCity, setSearchCity] = useState('');
  
  const { 
    data, 
    loading, 
    error, 
    execute,
    isRateLimitError, 
    rateLimitInfo
  } = useApi(
    () => getWeatherByCity(city), 
    null, 
    true
  );

  const handleSearch = () => {
    if (searchCity.trim()) {
      setCity(searchCity);
      execute();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Prepare error component with rate limit information if applicable
  const errorComponent = error ? (
    <ErrorMessage 
      message={error}
      onRetry={() => execute()}
      isRateLimit={isRateLimitError}
      resetTime={rateLimitInfo?.resetTime}
    />
  ) : null;

  return (
    <WidgetCard 
      title="Weather" 
      isLoading={loading} 
      error={errorComponent} // Pass the custom error component instead of just the message
      onRefresh={() => execute()}
      headerAction={
        <Box sx={{ display: 'flex', mr: 2 }}>
          <TextField
            size="small"
            placeholder="City name"
            value={searchCity}
            onChange={(e) => setSearchCity(e.target.value)}
            onKeyPress={handleKeyPress}
            sx={{ mr: 1 }}
          />
          <Button 
            variant="contained" 
            size="small" 
            onClick={handleSearch}
          >
            Search
          </Button>
        </Box>
      }
    >
      {data && (
        <Box sx={{ textAlign: 'center' }}>
          <Box sx={{ mb: 2 }}>
            <img 
              src="/images/widgets/weather-widget.jpg" 
              alt="Weather visualization" 
              style={{ 
                maxWidth: '100%', 
                height: 'auto', 
                borderRadius: '6px',
                display: 'none' // Initially hidden until loaded
              }}
              onLoad={(e) => { e.target.style.display = 'block'; }}
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          </Box>
          <Typography variant="h6">{data.name}, {data.sys.country}</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', my: 2 }}>
            <WbSunny sx={{ fontSize: 40, mr: 2, color: 'orange' }} />
            <Typography variant="h3">{Math.round(data.main.temp)}°C</Typography>
          </Box>
          <Typography variant="body1">{data.weather[0].description}</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 2 }}>
            <Box>
              <Typography variant="caption">Humidity</Typography>
              <Typography variant="body2">{data.main.humidity}%</Typography>
            </Box>
            <Box>
              <Typography variant="caption">Wind</Typography>
              <Typography variant="body2">{data.wind.speed} m/s</Typography>
            </Box>
            <Box>
              <Typography variant="caption">Pressure</Typography>
              <Typography variant="body2">{data.main.pressure} hPa</Typography>
            </Box>
          </Box>
        </Box>
      )}
    </WidgetCard>
  );
};

export default WeatherWidget;