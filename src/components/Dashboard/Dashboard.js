import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
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
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Collapse,
  Tooltip,
  Snackbar,
  Alert,
  Switch,
  FormControlLabel,
  Grid
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
import SettingsIcon from '@mui/icons-material/Settings';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import CloseIcon from '@mui/icons-material/Close';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import ViewComfyIcon from '@mui/icons-material/ViewComfy';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { API_CONFIG } from '../../config/api.config';
import { createApiInstance } from '../../utils/apiUtils';
import { LineChart, Line, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

// Enable responsive features for react-grid-layout
const ResponsiveGridLayout = WidthProvider(Responsive);

const Dashboard = () => {
  // State for widget data
  const [data, setData] = useState({
    weather: null,
    news: null,
    stocks: null,
    covid: null,
  });
  
  // State for loading indicators
  const [loading, setLoading] = useState({
    weather: true,
    news: true,
    stocks: true,
    covid: true,
  });

  // State for widget settings dialogs
  const [settingsOpen, setSettingsOpen] = useState({
    weather: false,
    news: false,
    stocks: false,
    covid: false,
  });

  // State for widget collapse
  const [collapsed, setCollapsed] = useState({
    weather: false,
    news: false,
    stocks: false,
    covid: false,
  });

  // State for layout lock
  const [layoutLocked, setLayoutLocked] = useState(true);

  // State for widget settings
  const [settings, setSettings] = useState({
    weather: {
      city: 'London',
      units: 'metric'
    },
    news: {
      category: 'technology',
      country: 'us',
      pageSize: 3
    },
    stocks: {
      symbols: ['AAPL', 'MSFT', 'GOOGL']
    },
    covid: {
      country: 'global'
    }
  });

  // State for grid layout
  const [layouts, setLayouts] = useState({
    lg: [
      { i: 'weather', x: 0, y: 0, w: 1, h: 2 },
      { i: 'news', x: 1, y: 0, w: 1, h: 2 },
      { i: 'stocks', x: 2, y: 0, w: 1, h: 2 },
      { i: 'covid', x: 3, y: 0, w: 1, h: 2 }
    ],
    md: [
      { i: 'weather', x: 0, y: 0, w: 1, h: 2 },
      { i: 'news', x: 1, y: 0, w: 1, h: 2 },
      { i: 'stocks', x: 0, y: 2, w: 1, h: 2 },
      { i: 'covid', x: 1, y: 2, w: 1, h: 2 }
    ],
    sm: [
      { i: 'weather', x: 0, y: 0, w: 1, h: 2 },
      { i: 'news', x: 0, y: 2, w: 1, h: 2 },
      { i: 'stocks', x: 0, y: 4, w: 1, h: 2 },
      { i: 'covid', x: 0, y: 6, w: 1, h: 2 }
    ],
    xs: [
      { i: 'weather', x: 0, y: 0, w: 1, h: 2 },
      { i: 'news', x: 0, y: 2, w: 1, h: 2 },
      { i: 'stocks', x: 0, y: 4, w: 1, h: 2 },
      { i: 'covid', x: 0, y: 6, w: 1, h: 2 }
    ]
  });
  
  // State for dashboard settings dialog
  const [dashboardSettingsOpen, setDashboardSettingsOpen] = useState(false);

  // State for notification
  const [notification, setNotification] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  // Load settings from localStorage on initial load
  useEffect(() => {
    const savedSettings = localStorage.getItem('dashboardSettings');
    const savedCollapsed = localStorage.getItem('dashboardCollapsed');
    const savedLayouts = localStorage.getItem('dashboardLayouts');
    const savedLayoutLocked = localStorage.getItem('layoutLocked');
    
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
    
    if (savedCollapsed) {
      setCollapsed(JSON.parse(savedCollapsed));
    }

    if (savedLayouts) {
      setLayouts(JSON.parse(savedLayouts));
    }

    if (savedLayoutLocked !== null) {
      setLayoutLocked(JSON.parse(savedLayoutLocked));
    }
  }, []);

  // Save settings to localStorage when they change
  useEffect(() => {
    localStorage.setItem('dashboardSettings', JSON.stringify(settings));
  }, [settings]);

  // Save collapsed state to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('dashboardCollapsed', JSON.stringify(collapsed));
  }, [collapsed]);

  // Save layouts to localStorage when they change
  useEffect(() => {
    localStorage.setItem('dashboardLayouts', JSON.stringify(layouts));
  }, [layouts]);

  // Save layout lock state to localStorage
  useEffect(() => {
    localStorage.setItem('layoutLocked', JSON.stringify(layoutLocked));
  }, [layoutLocked]);

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
          params = { 
            q: settings.weather.city, 
            units: settings.weather.units
          };
          break;
        case 'news':
          endpoint = '/top-headlines';
          params = { 
            country: settings.news.country, 
            category: settings.news.category, 
            pageSize: settings.news.pageSize 
          };
          break;
        case 'stocks':
          endpoint = '/quote';
          params = { symbol: settings.stocks.symbols[0] };
          break;
        case 'covid':
          endpoint = settings.covid.country === 'global' ? '/all' : `/countries/${settings.covid.country}`;
          break;
        default:
          return;
      }
      
      const response = await api.get(endpoint, { params });
      setData(prevData => ({
        ...prevData,
        [apiType]: response.data
      }));

      // Show success notification
      setNotification({
        open: true,
        message: `${apiType.charAt(0).toUpperCase() + apiType.slice(1)} data updated successfully`,
        severity: 'success'
      });
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

      // Show error notification
      setNotification({
        open: true,
        message: `Error updating ${apiType} data`,
        severity: 'error'
      });
    } finally {
      setLoading(prev => ({ ...prev, [apiType]: false }));
    }
  };

  const refreshData = (type) => {
    fetchData(type);
  };

  // Handle settings dialog open/close
  const handleSettingsOpen = (widget) => {
    setSettingsOpen(prev => ({ ...prev, [widget]: true }));
  };

  const handleSettingsClose = (widget) => {
    setSettingsOpen(prev => ({ ...prev, [widget]: false }));
  };

  // Handle settings changes
  const handleSettingsChange = (widget, field, value) => {
    setSettings(prev => ({
      ...prev,
      [widget]: {
        ...prev[widget],
        [field]: value
      }
    }));
  };

  // Handle settings save
  const handleSettingsSave = (widget) => {
    handleSettingsClose(widget);
    refreshData(widget);
  };

  // Handle widget collapse toggle
  const toggleCollapse = (widget) => {
    setCollapsed(prev => ({
      ...prev,
      [widget]: !prev[widget]
    }));
  };

  // Handle notification close
  const handleNotificationClose = () => {
    setNotification(prev => ({
      ...prev,
      open: false
    }));
  };

  // Handle layout change
  const handleLayoutChange = (currentLayout, allLayouts) => {
    if (!layoutLocked) {
      setLayouts(allLayouts);
    }
  };

  // Handle layout lock toggle
  const toggleLayoutLock = () => {
    setLayoutLocked(!layoutLocked);
    setNotification({
      open: true,
      message: layoutLocked ? 'Dashboard unlocked. You can drag widgets to rearrange.' : 'Dashboard locked.',
      severity: 'info'
    });
  };

  // Open dashboard settings dialog
  const handleDashboardSettingsOpen = () => {
    setDashboardSettingsOpen(true);
  };

  // Close dashboard settings dialog
  const handleDashboardSettingsClose = () => {
    setDashboardSettingsOpen(false);
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

  // Weather forecast data (mock)
  const forecastData = [
    { day: 'Mon', temp: 19 },
    { day: 'Tue', temp: 21 },
    { day: 'Wed', temp: 20 },
    { day: 'Thu', temp: 22 },
    { day: 'Fri', temp: 23 },
  ];

  // Widget header component
  const WidgetHeader = ({ title, icon: Icon, iconColor, widget }) => (
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'space-between',
      alignItems: 'center',
      mb: 1.5
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {!layoutLocked && (
          <Box 
            sx={{ 
              color: 'text.secondary', 
              cursor: 'move',
              mr: 1,
              display: 'flex',
              alignItems: 'center',
              '&:hover': { color: 'primary.main' }
            }}
            className="drag-handle"
          >
            <DragIndicatorIcon fontSize="small" />
          </Box>
        )}
        {Icon && <Icon sx={{ color: iconColor, mr: 1, fontSize: '1.1rem' }} />}
        <Typography variant="h6" component="h2" sx={{ 
          fontSize: '1rem',
          fontWeight: 500
        }}>
          {title}
        </Typography>
      </Box>
      <Box>
        <Tooltip title="Refresh">
          <IconButton 
            size="small" 
            onClick={() => refreshData(widget)} 
            sx={{ color: 'text.secondary' }}
          >
            <RefreshIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="Settings">
          <IconButton 
            size="small" 
            onClick={() => handleSettingsOpen(widget)} 
            sx={{ color: 'text.secondary' }}
          >
            <SettingsIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title={collapsed[widget] ? "Expand" : "Collapse"}>
          <IconButton 
            size="small" 
            onClick={() => toggleCollapse(widget)} 
            sx={{ color: 'text.secondary' }}
          >
            {collapsed[widget] ? 
              <ExpandMoreIcon fontSize="small" /> : 
              <ExpandLessIcon fontSize="small" />
            }
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );

  // CSS for react-grid-layout
  const gridStyles = {
    '.react-grid-item.react-grid-placeholder': {
      backgroundColor: 'rgba(25, 118, 210, 0.2)',
      borderRadius: '10px',
    }
  };

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
            <Tooltip title={layoutLocked ? "Unlock Layout" : "Lock Layout"}>
              <IconButton 
                color="inherit" 
                sx={{ mr: 1 }}
                onClick={toggleLayoutLock}
              >
                {layoutLocked ? <LockIcon /> : <LockOpenIcon color="primary" />}
              </IconButton>
            </Tooltip>
            
            <Tooltip title="Dashboard Settings">
              <IconButton 
                color="inherit" 
                sx={{ mr: 1 }}
                onClick={handleDashboardSettingsOpen}
              >
                <ViewComfyIcon />
              </IconButton>
            </Tooltip>
            
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
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 500 }}>
              API Integration Dashboard
            </Typography>
            <Box>
              {!layoutLocked && (
                <Chip 
                  color="primary" 
                  icon={<LockOpenIcon />} 
                  label="Drag widgets to rearrange" 
                  variant="outlined"
                  sx={{ mr: 1 }}
                />
              )}
            </Box>
          </Box>
          
          <ResponsiveGridLayout
            className="layout"
            layouts={layouts}
            breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480 }}
            cols={{ lg: 4, md: 2, sm: 1, xs: 1 }}
            rowHeight={200}
            onLayoutChange={handleLayoutChange}
            isDraggable={!layoutLocked}
            isResizable={false}
            draggableHandle=".drag-handle"
            containerPadding={[0, 0]}
            margin={[16, 16]}
            style={gridStyles}
          >
            {/* Weather Widget */}
            <Box key="weather">
              <Paper
                sx={{
                  height: '100%',
                  p: 2.5,
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: '10px',
                  boxShadow: '0 4px 20px 0 rgba(0,0,0,0.05)',
                  transition: 'box-shadow 0.3s',
                  '&:hover': {
                    boxShadow: '0 6px 25px 0 rgba(0,0,0,0.1)',
                  }
                }}
              >
                <WidgetHeader 
                  title="Weather" 
                  icon={WbSunnyIcon} 
                  iconColor="#f9a825" 
                  widget="weather"
                />
                <Divider sx={{ opacity: 0.1, mb: 2 }} />
                <Collapse in={!collapsed.weather} timeout="auto" unmountOnExit sx={{ flexGrow: 1 }}>
                  <Box sx={{ 
                    height: '100%',
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
                            {Math.round(data.weather.main?.temp)}°{settings.weather.units === 'metric' ? 'C' : 'F'}
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
                              <RechartsTooltip 
                                formatter={(value) => [`${value}°${settings.weather.units === 'metric' ? 'C' : 'F'}`, 'Temperature']}
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
                </Collapse>
                {collapsed.weather && (
                  <Box sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                      Widget collapsed. Click expand to view.
                    </Typography>
                  </Box>
                )}
              </Paper>
            </Box>
            
            {/* News Widget */}
            <Box key="news">
              <Paper
                sx={{
                  height: '100%',
                  p: 2.5,
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: '10px',
                  boxShadow: '0 4px 20px 0 rgba(0,0,0,0.05)',
                  transition: 'box-shadow 0.3s',
                  '&:hover': {
                    boxShadow: '0 6px 25px 0 rgba(0,0,0,0.1)',
                  }
                }}
              >
                <WidgetHeader 
                  title="Latest News" 
                  icon={NewspaperIcon} 
                  iconColor="#1565c0" 
                  widget="news"
                />
                <Divider sx={{ opacity: 0.1, mb: 2 }} />
                <Collapse in={!collapsed.news} timeout="auto" unmountOnExit sx={{ flexGrow: 1 }}>
                  <Box sx={{ height: '100%', overflow: 'auto' }}>
                    {loading.news ? (
                      <Box sx={{ display: 'flex', justifyContent: 'center', pt: 4 }}>
                        <CircularProgress size={30} />
                      </Box>
                    ) : data.news && data.news.articles ? (
                      <List sx={{ p: 0 }}>
                        {data.news.articles.slice(0, settings.news.pageSize).map((article, index) => (
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
                                        label={settings.news.category.charAt(0).toUpperCase() + settings.news.category.slice(1)} 
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
                            {index !== data.news.articles.slice(0, settings.news.pageSize).length - 1 && (
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
                </Collapse>
                {collapsed.news && (
                  <Box sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                      Widget collapsed. Click expand to view.
                    </Typography>
                  </Box>
                )}
              </Paper>
            </Box>
            
            {/* Stocks Widget */}
            <Box key="stocks">
              <Paper
                sx={{
                  height: '100%',
                  p: 2.5,
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: '10px',
                  boxShadow: '0 4px 20px 0 rgba(0,0,0,0.05)',
                  transition: 'box-shadow 0.3s',
                  '&:hover': {
                    boxShadow: '0 6px 25px 0 rgba(0,0,0,0.1)',
                  }
                }}
              >
                <WidgetHeader 
                  title="Stocks" 
                  icon={ShowChartIcon} 
                  iconColor="#2e7d32" 
                  widget="stocks"
                />
                <Divider sx={{ opacity: 0.1, mb: 2 }} />
                <Collapse in={!collapsed.stocks} timeout="auto" unmountOnExit sx={{ flexGrow: 1 }}>
                  <Box sx={{ height: '100%', overflow: 'auto' }}>
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
                                <RechartsTooltip 
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
                </Collapse>
                {collapsed.stocks && (
                  <Box sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                      Widget collapsed. Click expand to view.
                    </Typography>
                  </Box>
                )}
              </Paper>
            </Box>
            
            {/* COVID Widget */}
            <Box key="covid">
              <Paper
                sx={{
                  height: '100%',
                  p: 2.5,
                  display: 'flex',
                  flexDirection: 'column',
                  borderRadius: '10px',
                  boxShadow: '0 4px 20px 0 rgba(0,0,0,0.05)',
                  transition: 'box-shadow 0.3s',
                  '&:hover': {
                    boxShadow: '0 6px 25px 0 rgba(0,0,0,0.1)',
                  }
                }}
              >
                <WidgetHeader 
                  title="COVID-19" 
                  icon={CoronavirusIcon} 
                  iconColor="#d32f2f" 
                  widget="covid"
                />
                <Divider sx={{ opacity: 0.1, mb: 2 }} />
                <Collapse in={!collapsed.covid} timeout="auto" unmountOnExit sx={{ flexGrow: 1 }}>
                  <Box sx={{ 
                    height: '100%',
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
                            {settings.covid.country === 'global' ? 'Global' : settings.covid.country} Cases
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
                </Collapse>
                {collapsed.covid && (
                  <Box sx={{ p: 2, textAlign: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                      Widget collapsed. Click expand to view.
                    </Typography>
                  </Box>
                )}
              </Paper>
            </Box>
          </ResponsiveGridLayout>
        </Container>
      </Box>

      {/* Weather Settings Dialog */}
      <Dialog 
        open={settingsOpen.weather} 
        onClose={() => handleSettingsClose('weather')}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>
          Weather Widget Settings
          <IconButton
            aria-label="close"
            onClick={() => handleSettingsClose('weather')}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Box sx={{ mb: 2 }}>
            <TextField
              label="City"
              value={settings.weather.city}
              onChange={(e) => handleSettingsChange('weather', 'city', e.target.value)}
              fullWidth
              margin="normal"
              helperText="Enter city name (e.g., London, New York, Tokyo)"
            />
          </Box>
          <Box>
            <FormControl fullWidth margin="normal">
              <InputLabel id="weather-units-label">Temperature Units</InputLabel>
              <Select
                labelId="weather-units-label"
                value={settings.weather.units}
                label="Temperature Units"
                onChange={(e) => handleSettingsChange('weather', 'units', e.target.value)}
              >
                <MenuItem value="metric">Celsius (°C)</MenuItem>
                <MenuItem value="imperial">Fahrenheit (°F)</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleSettingsClose('weather')}>Cancel</Button>
          <Button 
            onClick={() => handleSettingsSave('weather')} 
            variant="contained"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* News Settings Dialog */}
      <Dialog 
        open={settingsOpen.news} 
        onClose={() => handleSettingsClose('news')}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>
          News Widget Settings
          <IconButton
            aria-label="close"
            onClick={() => handleSettingsClose('news')}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <FormControl fullWidth margin="normal">
            <InputLabel id="news-category-label">Category</InputLabel>
            <Select
              labelId="news-category-label"
              value={settings.news.category}
              label="Category"
              onChange={(e) => handleSettingsChange('news', 'category', e.target.value)}
            >
              <MenuItem value="technology">Technology</MenuItem>
              <MenuItem value="business">Business</MenuItem>
              <MenuItem value="entertainment">Entertainment</MenuItem>
              <MenuItem value="health">Health</MenuItem>
              <MenuItem value="science">Science</MenuItem>
              <MenuItem value="sports">Sports</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel id="news-country-label">Country</InputLabel>
            <Select
              labelId="news-country-label"
              value={settings.news.country}
              label="Country"
              onChange={(e) => handleSettingsChange('news', 'country', e.target.value)}
            >
              <MenuItem value="us">United States</MenuItem>
              <MenuItem value="gb">United Kingdom</MenuItem>
              <MenuItem value="ca">Canada</MenuItem>
              <MenuItem value="au">Australia</MenuItem>
              <MenuItem value="fr">France</MenuItem>
              <MenuItem value="de">Germany</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth margin="normal">
            <InputLabel id="news-count-label">Number of Articles</InputLabel>
            <Select
              labelId="news-count-label"
              value={settings.news.pageSize}
              label="Number of Articles"
              onChange={(e) => handleSettingsChange('news', 'pageSize', e.target.value)}
            >
              <MenuItem value={1}>1</MenuItem>
              <MenuItem value={2}>2</MenuItem>
              <MenuItem value={3}>3</MenuItem>
              <MenuItem value={5}>5</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleSettingsClose('news')}>Cancel</Button>
          <Button 
            onClick={() => handleSettingsSave('news')} 
            variant="contained"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Stocks Settings Dialog */}
      <Dialog 
        open={settingsOpen.stocks} 
        onClose={() => handleSettingsClose('stocks')}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>
          Stocks Widget Settings
          <IconButton
            aria-label="close"
            onClick={() => handleSettingsClose('stocks')}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Track your favorite stocks (using mock data for demo)
          </Typography>
          <Box sx={{ mt: 2 }}>
            {/* For demo purposes, we're not implementing full stock symbol selection */}
            <Typography variant="body1">
              Currently tracking: AAPL, MSFT, GOOGL
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleSettingsClose('stocks')}>Cancel</Button>
          <Button 
            onClick={() => handleSettingsSave('stocks')} 
            variant="contained"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* COVID Settings Dialog */}
      <Dialog 
        open={settingsOpen.covid} 
        onClose={() => handleSettingsClose('covid')}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>
          COVID-19 Widget Settings
          <IconButton
            aria-label="close"
            onClick={() => handleSettingsClose('covid')}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <FormControl fullWidth margin="normal">
            <InputLabel id="covid-country-label">Country</InputLabel>
            <Select
              labelId="covid-country-label"
              value={settings.covid.country}
              label="Country"
              onChange={(e) => handleSettingsChange('covid', 'country', e.target.value)}
            >
              <MenuItem value="global">Global</MenuItem>
              <MenuItem value="usa">USA</MenuItem>
              <MenuItem value="uk">UK</MenuItem>
              <MenuItem value="germany">Germany</MenuItem>
              <MenuItem value="france">France</MenuItem>
              <MenuItem value="india">India</MenuItem>
              <MenuItem value="china">China</MenuItem>
              <MenuItem value="brazil">Brazil</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleSettingsClose('covid')}>Cancel</Button>
          <Button 
            onClick={() => handleSettingsSave('covid')} 
            variant="contained"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dashboard Settings Dialog */}
      <Dialog
        open={dashboardSettingsOpen}
        onClose={handleDashboardSettingsClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          Dashboard Settings
          <IconButton
            aria-label="close"
            onClick={handleDashboardSettingsClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <FormControlLabel
            control={
              <Switch
                checked={!layoutLocked}
                onChange={toggleLayoutLock}
                color="primary"
              />
            }
            label="Enable widget drag-and-drop"
          />
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 3 }}>
            {layoutLocked 
              ? "Unlock to reposition widgets by dragging them around."
              : "Drag the handle on each widget to reposition it. Lock the layout when done."}
          </Typography>
          
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Widget Visibility
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Collapse or expand individual widgets
            </Typography>
            
            <List>
              {Object.keys(collapsed).map((widget) => (
                <ListItem key={widget}>
                  <ListItemText 
                    primary={widget.charAt(0).toUpperCase() + widget.slice(1)} 
                  />
                  <Button 
                    variant="outlined" 
                    size="small"
                    onClick={() => toggleCollapse(widget)}
                    startIcon={collapsed[widget] ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                  >
                    {collapsed[widget] ? 'Expand' : 'Collapse'}
                  </Button>
                </ListItem>
              ))}
            </List>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDashboardSettingsClose}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Notification Snackbar */}
      <Snackbar 
        open={notification.open} 
        autoHideDuration={3000} 
        onClose={handleNotificationClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleNotificationClose} 
          severity={notification.severity}
          variant="filled"
        >
          {notification.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Dashboard;