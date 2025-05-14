import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Grid, 
  Paper, 
  Typography, 
  AppBar, 
  Toolbar, 
  InputBase,
  IconButton, 
  Badge,
  Divider,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Chip,
  Link,
  Avatar,
  LinearProgress
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import RefreshIcon from '@mui/icons-material/Refresh';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import CoronavirusIcon from '@mui/icons-material/Coronavirus';
import PersonIcon from '@mui/icons-material/Person';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import { API_CONFIG } from '../../config/api.config';
import { createApiInstance } from '../../utils/apiUtils';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const [data, setData] = useState({
    weather: null,
    news: null,
    stocks: null,
    covid: null,
  });
  
  const [loading, setLoading] = useState({
    weather: true,
    news: true,
    stocks: true,
    covid: true,
  });

  // Mock data for the News widget
  const mockNews = {
    articles: [
      {
        title: "Tech Giants Announce New AI Collaboration",
        url: "#",
        source: { name: "Tech Today" },
        publishedAt: "2023-06-15T09:30:00Z",
      },
      {
        title: "Breakthrough in Quantum Computing Research",
        url: "#",
        source: { name: "Science Daily" },
        publishedAt: "2023-06-14T14:45:00Z",
      },
      {
        title: "New Mobile App Revolutionizes Healthcare Access",
        url: "#",
        source: { name: "Health Tech" },
        publishedAt: "2023-06-13T11:20:00Z",
      }
    ]
  };

  // Mock data for the Stocks widget
  const mockStocks = {
    stocks: [
      { symbol: 'AAPL', name: 'Apple Inc.', price: 172.39, change: 2.31, changePercent: 1.36 },
      { symbol: 'MSFT', name: 'Microsoft', price: 339.71, change: -2.14, changePercent: -0.63 },
      { symbol: 'GOOGL', name: 'Alphabet', price: 142.65, change: 1.04, changePercent: 0.73 },
    ],
    chartData: [
      { name: 'Jan', AAPL: 160, MSFT: 320 },
      { name: 'Feb', AAPL: 155, MSFT: 318 },
      { name: 'Mar', AAPL: 158, MSFT: 330 },
      { name: 'Apr', AAPL: 162, MSFT: 335 },
      { name: 'May', AAPL: 165, MSFT: 340 },
      { name: 'Jun', AAPL: 172, MSFT: 338 },
    ]
  };

  // Fetch data from an API
  const fetchData = async (apiType) => {
    setLoading(prev => ({ ...prev, [apiType]: true }));
    try {
      const { baseURL, apiKey } = API_CONFIG[apiType];
      const api = createApiInstance(baseURL, apiKey);
      
      // These endpoints would need to be customized for each API
      let endpoint = '';
      let params = {};
      
      switch(apiType) {
        case 'weather':
          endpoint = '/weather';
          params = { q: 'London', units: 'metric' };
          break;
        case 'news':
          endpoint = '/top-headlines';
          params = { country: 'us', category: 'technology', pageSize: 5 };
          break;
        case 'stocks':
          endpoint = '/quote';
          params = { symbol: 'AAPL' };
          break;
        case 'covid':
          endpoint = '/all';
          break;
        default:
          return;
      }
      
      const response = await api.get(endpoint, { params });
      setData(prevData => ({
        ...prevData,
        [apiType]: response.data
      }));
    } catch (error) {
      console.error(`Error fetching ${apiType} data:`, error);
      // Set mock data for demo purposes
      if (apiType === 'news') {
        setData(prevData => ({
          ...prevData,
          news: mockNews
        }));
      } else if (apiType === 'stocks') {
        setData(prevData => ({
          ...prevData,
          stocks: mockStocks
        }));
      }
    } finally {
      setLoading(prev => ({ ...prev, [apiType]: false }));
    }
  };

  const refreshData = (type) => {
    fetchData(type);
  };

  // Use useEffect to fetch data when component mounts
  useEffect(() => {
    fetchData('covid');
    fetchData('weather');
    fetchData('news');
    fetchData('stocks');

    // Set mock data for widgets that might not have API access
    setData(prev => ({
      ...prev,
      news: mockNews,
      stocks: mockStocks
    }));
    setLoading(prev => ({
      ...prev,
      news: false,
      stocks: false
    }));
  }, []);

  // Widget header component
  const WidgetHeader = ({ title, icon: Icon, iconColor, onRefresh }) => (
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'space-between',
      alignItems: 'center',
      mb: 1.5
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {Icon && <Icon sx={{ color: iconColor, mr: 1, fontSize: '1.1rem' }} />}
        <Typography variant="h6" component="h2" sx={{ 
          fontSize: '1rem',
          fontWeight: 500
        }}>
          {title}
        </Typography>
      </Box>
      <Box>
        {onRefresh && (
          <IconButton size="small" onClick={onRefresh} sx={{ color: 'text.secondary' }}>
            <RefreshIcon fontSize="small" />
          </IconButton>
        )}
        <IconButton size="small" sx={{ color: 'text.secondary' }}>
          <MoreVertIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );

  // Weather forecast data (mock)
  const forecastData = [
    { day: 'Mon', temp: 19 },
    { day: 'Tue', temp: 21 },
    { day: 'Wed', temp: 20 },
    { day: 'Thu', temp: 22 },
    { day: 'Fri', temp: 23 },
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar 
        position="static" 
        color="default" 
        elevation={0}
        sx={{ 
          backgroundColor: '#fff',
          borderBottom: '1px solid #eaeaea'
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' }, fontWeight: 'bold', color: '#1976d2' }}
          >
            API Dashboard
          </Typography>
          
          <Box sx={{ flexGrow: 1 }} />
          
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Paper
              component="form"
              sx={{ 
                p: '2px 4px', 
                display: 'flex', 
                alignItems: 'center', 
                width: 300,
                borderRadius: '20px',
                mr: 2,
                boxShadow: 'none',
                border: '1px solid #eaeaea',
                '&:hover': {
                  boxShadow: '0 0 10px rgba(0,0,0,0.05)'
                }
              }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search..."
                inputProps={{ 'aria-label': 'search' }}
              />
              <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                <SearchIcon />
              </IconButton>
            </Paper>
            
            <IconButton color="inherit" sx={{ mr: 1 }}>
              <Badge badgeContent={3} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            
            <IconButton 
              color="inherit"
              sx={{ 
                bgcolor: '#f5f5f5',
                '&:hover': {
                  bgcolor: '#e0e0e0'
                }
              }}
            >
              <PersonIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      
      <Box sx={{ 
        bgcolor: '#f8f9fa', 
        minHeight: 'calc(100vh - 64px)',
        pt: 2,
        pb: 4
      }}>
        <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 500, mb: 3 }}>
            API Integration Dashboard
          </Typography>
          
          <Grid container spacing={3}>
            {/* Weather Widget */}
            <Grid item xs={12} md={6} lg={3}>
              <Paper
                sx={{
                  p: 2.5,
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: '10px',
                  boxShadow: '0 4px 20px 0 rgba(0,0,0,0.05)',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  height: '100%',
                  '&:hover': {
                    boxShadow: '0 6px 25px 0 rgba(0,0,0,0.1)',
                    transform: 'translateY(-5px)'
                  }
                }}
              >
                <WidgetHeader 
                  title="Weather" 
                  icon={WbSunnyIcon} 
                  iconColor="#f9a825" 
                  onRefresh={() => refreshData('weather')}
                />
                <Divider sx={{ opacity: 0.1, mb: 2 }} />
                <Box sx={{ 
                  flexGrow: 1, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  flexDirection: 'column' 
                }}>
                  {loading.weather ? (
                    <CircularProgress size={30} />
                  ) : data.weather ? (
                    <>
                      <Typography variant="h6" sx={{ fontWeight: 500, mb: 2 }}>
                        {data.weather.name}, {data.weather.sys?.country}
                      </Typography>
                      
                      <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        mb: 2 
                      }}>
                        <Box sx={{ 
                          bgcolor: '#f5f9ff', 
                          p: 1.5, 
                          borderRadius: '50%',
                          color: '#1976d2',
                          display: 'flex',
                          mr: 2
                        }}>
                          <WbSunnyIcon sx={{ fontSize: 35, color: '#f9a825' }} />
                        </Box>
                        <Typography variant="h3" sx={{ fontWeight: 500 }}>
                          {Math.round(data.weather.main?.temp)}°C
                        </Typography>
                      </Box>
                      
                      <Typography variant="body1" sx={{ 
                        textTransform: 'capitalize',
                        fontWeight: 500,
                        color: '#1976d2',
                        mb: 2
                      }}>
                        {data.weather.weather?.[0]?.description}
                      </Typography>

                      <Divider sx={{ width: '100%', mb: 2 }} />
                      
                      <Typography variant="subtitle2" sx={{ mb: 1, color: 'text.secondary' }}>
                        5-Day Forecast
                      </Typography>
                      
                      <Box sx={{ width: '100%', height: 80 }}>
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart
                            data={forecastData}
                            margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
                          >
                            <XAxis dataKey="day" tick={{ fontSize: 12 }} />
                            <Tooltip 
                              formatter={(value) => [`${value}°C`, 'Temperature']}
                              labelFormatter={(label) => `${label}`}
                            />
                            <Line 
                              type="monotone" 
                              dataKey="temp" 
                              stroke="#1976d2" 
                              strokeWidth={2}
                              dot={{ stroke: '#1976d2', strokeWidth: 2, r: 3 }}
                              activeDot={{ r: 5 }}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </Box>
                    </>
                  ) : (
                    <Typography variant="body1">No data available</Typography>
                  )}
                </Box>
              </Paper>
            </Grid>
            
            {/* News Widget */}
            <Grid item xs={12} md={6} lg={3}>
              <Paper
                sx={{
                  p: 2.5,
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: '10px',
                  boxShadow: '0 4px 20px 0 rgba(0,0,0,0.05)',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  height: '100%',
                  '&:hover': {
                    boxShadow: '0 6px 25px 0 rgba(0,0,0,0.1)',
                    transform: 'translateY(-5px)'
                  }
                }}
              >
                <WidgetHeader 
                  title="Latest News" 
                  icon={NewspaperIcon} 
                  iconColor="#1565c0" 
                  onRefresh={() => refreshData('news')}
                />
                <Divider sx={{ opacity: 0.1, mb: 2 }} />
                <Box sx={{ flexGrow: 1 }}>
                  {loading.news ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', pt: 4 }}>
                      <CircularProgress size={30} />
                    </Box>
                  ) : data.news && data.news.articles ? (
                    <List sx={{ p: 0 }}>
                      {data.news.articles.slice(0, 3).map((article, index) => (
                        <React.Fragment key={index}>
                          <ListItem 
                            alignItems="flex-start" 
                            sx={{ px: 0 }}
                            disableGutters
                          >
                            <ListItemText
                              primary={
                                <Link 
                                  href={article.url} 
                                  target="_blank" 
                                  rel="noopener"
                                  underline="hover"
                                  color="inherit"
                                  sx={{ 
                                    fontWeight: 500,
                                    fontSize: '0.95rem',
                                    display: 'block',
                                    mb: 0.5,
                                    lineHeight: 1.3
                                  }}
                                >
                                  {article.title}
                                </Link>
                              }
                              secondary={
                                <Box>
                                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                                    <Avatar 
                                      sx={{ width: 20, height: 20, mr: 1, bgcolor: '#1565c0' }}
                                    >
                                      {article.source.name.charAt(0)}
                                    </Avatar>
                                    <Typography variant="caption" color="text.secondary">
                                      {article.source.name} • {new Date(article.publishedAt).toLocaleDateString()}
                                    </Typography>
                                  </Box>
                                  <Box sx={{ mt: 1 }}>
                                    <Chip 
                                      label="Technology" 
                                      size="small" 
                                      sx={{ 
                                        fontSize: '0.7rem',
                                        bgcolor: '#e3f2fd',
                                        color: '#1565c0',
                                        fontWeight: 500,
                                        height: 22
                                      }} 
                                    />
                                  </Box>
                                </Box>
                              }
                            />
                          </ListItem>
                          {index !== data.news.articles.slice(0, 3).length - 1 && (
                            <Divider component="li" sx={{ my: 1.5 }} />
                          )}
                        </React.Fragment>
                      ))}
                    </List>
                  ) : (
                    <Typography variant="body1" align="center">
                      No news data available
                    </Typography>
                  )}
                </Box>
              </Paper>
            </Grid>
            
            {/* Stocks Widget */}
            <Grid item xs={12} md={6} lg={3}>
              <Paper
                sx={{
                  p: 2.5,
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: '10px',
                  boxShadow: '0 4px 20px 0 rgba(0,0,0,0.05)',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  height: '100%',
                  '&:hover': {
                    boxShadow: '0 6px 25px 0 rgba(0,0,0,0.1)',
                    transform: 'translateY(-5px)'
                  }
                }}
              >
                <WidgetHeader 
                  title="Stocks" 
                  icon={ShowChartIcon} 
                  iconColor="#2e7d32" 
                  onRefresh={() => refreshData('stocks')}
                />
                <Divider sx={{ opacity: 0.1, mb: 2 }} />
                <Box sx={{ flexGrow: 1 }}>
                  {loading.stocks ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', pt: 4 }}>
                      <CircularProgress size={30} />
                    </Box>
                  ) : data.stocks && data.stocks.stocks ? (
                    <>
                      <List sx={{ p: 0 }}>
                        {data.stocks.stocks.map((stock, index) => (
                          <React.Fragment key={stock.symbol}>
                            <ListItem 
                              alignItems="center" 
                              disableGutters
                              sx={{ px: 0 }}
                            >
                              <ListItemText
                                primary={
                                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Box>
                                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                        {stock.symbol}
                                      </Typography>
                                      <Typography variant="caption" color="text.secondary">
                                        {stock.name}
                                      </Typography>
                                    </Box>
                                    <Box sx={{ textAlign: 'right' }}>
                                      <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>
                                        ${stock.price}
                                      </Typography>
                                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                                        {stock.change > 0 ? (
                                          <TrendingUpIcon 
                                            fontSize="small" 
                                            sx={{ color: 'success.main', fontSize: 14, mr: 0.5 }} 
                                          />
                                        ) : (
                                          <TrendingDownIcon 
                                            fontSize="small" 
                                            sx={{ color: 'error.main', fontSize: 14, mr: 0.5 }} 
                                          />
                                        )}
                                        <Chip
                                          label={`${stock.change > 0 ? '+' : ''}${stock.change} (${stock.changePercent}%)`}
                                          size="small"
                                          sx={{
                                            height: 20,
                                            fontSize: '0.7rem',
                                            fontWeight: 500,
                                            bgcolor: stock.change > 0 ? 'success.light' : 'error.light',
                                            color: stock.change > 0 ? 'success.dark' : 'error.dark',
                                          }}
                                        />
                                      </Box>
                                    </Box>
                                  </Box>
                                }
                              />
                            </ListItem>
                            {index !== data.stocks.stocks.length - 1 && (
                              <Divider component="li" sx={{ my: 1.5 }} />
                            )}
                          </React.Fragment>
                        ))}
                      </List>
                      
                      <Box sx={{ mt: 2, mb: 1 }}>
                        <Typography variant="subtitle2" sx={{ mb: 1, color: 'text.secondary' }}>
                          6-Month Performance
                        </Typography>
                        <Box sx={{ width: '100%', height: 80 }}>
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart
                              data={data.stocks.chartData}
                              margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
                            >
                              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                              <Tooltip 
                                formatter={(value) => [`$${value}`, 'Price']}
                              />
                              <Line 
                                type="monotone" 
                                dataKey="AAPL" 
                                stroke="#2e7d32" 
                                strokeWidth={2}
                                dot={{ stroke: '#2e7d32', strokeWidth: 2, r: 3 }}
                                activeDot={{ r: 5 }}
                              />
                            </LineChart>
                          </ResponsiveContainer>
                        </Box>
                      </Box>
                    </>
                  ) : (
                    <Typography variant="body1" align="center">
                      No stock data available
                    </Typography>
                  )}
                </Box>
              </Paper>
            </Grid>
            
            {/* COVID Widget */}
            <Grid item xs={12} md={6} lg={3}>
              <Paper
                sx={{
                  p: 2.5,
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: '10px',
                  boxShadow: '0 4px 20px 0 rgba(0,0,0,0.05)',
                  transition: 'transform 0.3s, box-shadow 0.3s',
                  height: '100%',
                  '&:hover': {
                    boxShadow: '0 6px 25px 0 rgba(0,0,0,0.1)',
                    transform: 'translateY(-5px)'
                  }
                }}
              >
                <WidgetHeader 
                  title="COVID-19" 
                  icon={CoronavirusIcon} 
                  iconColor="#d32f2f" 
                  onRefresh={() => refreshData('covid')}
                />
                <Divider sx={{ opacity: 0.1, mb: 2 }} />
                <Box sx={{ 
                  flexGrow: 1, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  flexDirection: 'column' 
                }}>
                  {loading.covid ? (
                    <CircularProgress size={30} />
                  ) : data.covid ? (
                    <>
                      <Paper elevation={0} sx={{ 
                        width: '100%', 
                        p: 1.5, 
                        mb: 2, 
                        borderRadius: '8px',
                        bgcolor: 'info.light',
                        color: 'info.dark'
                      }}>
                        <Typography variant="caption" sx={{ display: 'block', mb: 0.5 }}>
                          Global Cases
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 600 }}>
                          {data.covid.cases?.toLocaleString()}
                        </Typography>
                      </Paper>
                      
                      <Grid container spacing={2} sx={{ width: '100%', mb: 2 }}>
                        <Grid item xs={6}>
                          <Paper elevation={0} sx={{ 
                            p: 1.5, 
                            borderRadius: '8px',
                            bgcolor: 'error.light',
                            color: 'error.dark',
                            height: '100%'
                          }}>
                            <Typography variant="caption" sx={{ display: 'block', mb: 0.5 }}>
                              Deaths
                            </Typography>
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                              {data.covid.deaths?.toLocaleString()}
                            </Typography>
                          </Paper>
                        </Grid>
                        <Grid item xs={6}>
                          <Paper elevation={0} sx={{ 
                            p: 1.5, 
                            borderRadius: '8px',
                            bgcolor: 'success.light',
                            color: 'success.dark',
                            height: '100%'
                          }}>
                            <Typography variant="caption" sx={{ display: 'block', mb: 0.5 }}>
                              Recovered
                            </Typography>
                            <Typography variant="h6" sx={{ fontWeight: 600 }}>
                              {data.covid.recovered?.toLocaleString()}
                            </Typography>
                          </Paper>
                        </Grid>
                      </Grid>
                      
                      <Typography variant="caption" sx={{ alignSelf: 'flex-start', mb: 0.5, color: 'text.secondary' }}>
                        Active Cases ({Math.round((data.covid.active / data.covid.cases) * 100)}%)
                      </Typography>
                      <LinearProgress 
                        variant="determinate" 
                        value={Math.round((data.covid.active / data.covid.cases) * 100)} 
                        sx={{ 
                          width: '100%', 
                          height: 8, 
                          borderRadius: 5,
                          mb: 2,
                          bgcolor: '#e0e0e0'
                        }}
                      />
                      
                      <Box sx={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                        <Box>
                          <Typography variant="caption" color="text.secondary">
                            Tests
                          </Typography>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {data.covid.tests ? (data.covid.tests / 1000000).toFixed(1) + 'M' : 'N/A'}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography variant="caption" color="text.secondary">
                            Critical
                          </Typography>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {data.covid.critical?.toLocaleString() || 'N/A'}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography variant="caption" color="text.secondary">
                            Cases Today
                          </Typography>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {data.covid.todayCases?.toLocaleString() || 'N/A'}
                          </Typography>
                        </Box>
                      </Box>
                    </>
                  ) : (
                    <Typography variant="body1">No data available</Typography>
                  )}
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Dashboard;