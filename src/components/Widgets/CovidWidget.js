import React, { useState, useEffect } from 'react';
import { Typography, Box, Grid, Card, CardContent, Divider, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import WidgetCard from '../UI/WidgetCard';

const CovidWidget = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [country, setCountry] = useState('USA');

  // Sample data for COVID-19 statistics
  const covidData = {
    global: {
      cases: 768543210,
      deaths: 6947409,
      recovered: 740132680,
      active: 21463121,
      updated: new Date().toISOString()
    },
    countries: {
      'USA': {
        country: 'United States',
        countryInfo: { flag: '🇺🇸' },
        cases: 103236484,
        deaths: 1127152,
        recovered: 100427091,
        active: 1682241,
        tests: 1219232992,
        population: 334805269
      },
      'India': {
        country: 'India',
        countryInfo: { flag: '🇮🇳' },
        cases: 44986461,
        deaths: 531832,
        recovered: 44446514,
        active: 8115,
        tests: 929460388,
        population: 1412301696
      },
      'Brazil': {
        country: 'Brazil',
        countryInfo: { flag: '🇧🇷' },
        cases: 37615455,
        deaths: 701494,
        recovered: 36402627,
        active: 511334,
        tests: 63776166,
        population: 215353593
      },
      'UK': {
        country: 'United Kingdom',
        countryInfo: { flag: '🇬🇧' },
        cases: 24567069,
        deaths: 227331,
        recovered: 24339738,
        active: 0,
        tests: 522526476,
        population: 67508936
      }
    }
  };

  const countries = Object.keys(covidData.countries);

  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      try {
        setLoading(true);
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setData({
          global: covidData.global,
          country: covidData.countries[country]
        });
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch COVID-19 data');
        setLoading(false);
      }
    };

    fetchData();
  }, [country]);

  const handleRefresh = () => {
    setLoading(true);
    // Simulate refreshing data
    setTimeout(() => {
      setData({
        global: covidData.global,
        country: covidData.countries[country]
      });
      setLoading(false);
    }, 1000);
  };

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat().format(num);
  };

  return (
    <WidgetCard 
      title="COVID-19 Data" 
      isLoading={loading} 
      error={error}
      onRefresh={handleRefresh}
      headerAction={
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <Select
            value={country}
            onChange={handleCountryChange}
            displayEmpty
            size="small"
          >
            {countries.map(c => (
              <MenuItem key={c} value={c}>
                {covidData.countries[c].countryInfo.flag} {covidData.countries[c].country}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      }
    >
      {data && (
        <Box sx={{ p: 1 }}>
          <Box sx={{ mb: 2 }}>
            <img 
              src="/images/widgets/covid-widget.jpg" 
              alt="COVID-19 data visualization" 
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
          
          <Typography variant="h6" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
            {data.country.countryInfo.flag} {data.country.country} Statistics
          </Typography>
          
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Card variant="outlined" sx={{ bgcolor: '#f5f5f5' }}>
                <CardContent sx={{ p: 1, '&:last-child': { pb: 1 } }}>
                  <Typography variant="caption" color="text.secondary">
                    Confirmed Cases
                  </Typography>
                  <Typography variant="h6" color="primary.main">
                    {formatNumber(data.country.cases)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card variant="outlined" sx={{ bgcolor: '#fdf8f6' }}>
                <CardContent sx={{ p: 1, '&:last-child': { pb: 1 } }}>
                  <Typography variant="caption" color="text.secondary">
                    Deaths
                  </Typography>
                  <Typography variant="h6" color="error.main">
                    {formatNumber(data.country.deaths)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card variant="outlined" sx={{ bgcolor: '#f6fbf6' }}>
                <CardContent sx={{ p: 1, '&:last-child': { pb: 1 } }}>
                  <Typography variant="caption" color="text.secondary">
                    Recovered
                  </Typography>
                  <Typography variant="h6" color="success.main">
                    {formatNumber(data.country.recovered)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card variant="outlined" sx={{ bgcolor: '#f8f8fb' }}>
                <CardContent sx={{ p: 1, '&:last-child': { pb: 1 } }}>
                  <Typography variant="caption" color="text.secondary">
                    Active Cases
                  </Typography>
                  <Typography variant="h6" color="warning.main">
                    {formatNumber(data.country.active)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          <Divider sx={{ my: 2 }} />
          
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Tests: {formatNumber(data.country.tests)} ({((data.country.tests / data.country.population) * 100).toFixed(2)}% of population)
          </Typography>

          <Typography variant="caption" color="text.secondary">
            Last updated: {new Date(data.global.updated).toLocaleString()}
          </Typography>
        </Box>
      )}
    </WidgetCard>
  );
};

export default CovidWidget;