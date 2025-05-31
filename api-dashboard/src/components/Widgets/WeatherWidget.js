import React from 'react';
import { 
  Box, 
  Typography, 
  Divider, 
  CircularProgress, 
  Collapse, 
  Paper 
} from '@mui/material';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import { LineChart, Line, XAxis, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import WidgetHeader from '../Common/WidgetHeader';

const WeatherWidget = ({ 
  data, 
  loading, 
  collapsed, 
  settings, 
  refreshData, 
  handleSettingsOpen, 
  toggleCollapse,
  layoutLocked
}) => {
  // Weather forecast data (mock)
  const forecastData = [
    { day: 'Mon', temp: 19 },
    { day: 'Tue', temp: 21 },
    { day: 'Wed', temp: 20 },
    { day: 'Thu', temp: 22 },
    { day: 'Fri', temp: 23 },
  ];

  return (
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
        refreshData={refreshData}
        handleSettingsOpen={handleSettingsOpen}
        toggleCollapse={toggleCollapse}
        collapsed={collapsed}
        layoutLocked={layoutLocked}
      />
      <Divider sx={{ opacity: 0.1, mb: 2 }} />
      <Collapse in={!collapsed} timeout="auto" unmountOnExit sx={{ flexGrow: 1 }}>
        <Box sx={{ 
          height: '100%',
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          flexDirection: 'column' 
        }}>
          {loading ? (
            <CircularProgress size={30} />
          ) : data ? (
            <>
              <Typography variant="h6" sx={{ fontWeight: 500, mb: 2 }}>
                {data.name}, {data.sys?.country}
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
                  {Math.round(data.main?.temp)}°{settings.units === 'metric' ? 'C' : 'F'}
                </Typography>
              </Box>
              
              <Typography variant="body1" sx={{ 
                textTransform: 'capitalize',
                fontWeight: 500,
                color: '#1976d2',
                mb: 2
              }}>
                {data.weather?.[0]?.description}
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
                      formatter={(value) => [`${value}°${settings.units === 'metric' ? 'C' : 'F'}`, 'Temperature']}
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
      {collapsed && (
        <Box sx={{ p: 2, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Widget collapsed. Click expand to view.
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

export default WeatherWidget;