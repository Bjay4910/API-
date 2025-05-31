import React, { useState } from 'react';
import { Container, Typography, Box, Paper, Grid } from '@mui/material';
import DashboardLayout from './DashboardLayout';
import WeatherWidget from '../Widgets/WeatherWidget';
import NewsWidget from '../Widgets/NewsWidget';
import StockWidget from '../Widgets/StockWidget';
import CovidWidget from '../Widgets/CovidWidget';

const Dashboard = () => {
  // State for widget visibility - can be used for customization later
  const [widgets, setWidgets] = useState({
    weather: true,
    news: true,
    stocks: true,
    covid: true,
  });

  return (
    <Container maxWidth="xl">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          API Integration Dashboard
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          View real-time data from multiple sources
        </Typography>
        
        <DashboardLayout>
          {widgets.weather && (
            <WeatherWidget />
          )}
          {widgets.news && (
            <NewsWidget />
          )}
          {widgets.stocks && (
            <StockWidget />
          )}
          {widgets.covid && (
            <CovidWidget />
          )}
        </DashboardLayout>
      </Box>
    </Container>
  );
};

export default Dashboard;