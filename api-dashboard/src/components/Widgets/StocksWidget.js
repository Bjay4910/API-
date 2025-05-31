import React from 'react';
import { 
  Box, 
  Typography, 
  Divider, 
  CircularProgress, 
  Collapse, 
  Paper,
  List,
  ListItem,
  ListItemText,
  Chip
} from '@mui/material';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import { LineChart, Line, XAxis, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import WidgetHeader from '../Common/WidgetHeader';

const StocksWidget = ({
  data,
  loading,
  collapsed,
  refreshData,
  handleSettingsOpen,
  toggleCollapse,
  layoutLocked
}) => {
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
        title="Stocks" 
        icon={ShowChartIcon} 
        iconColor="#2e7d32" 
        widget="stocks"
        refreshData={refreshData}
        handleSettingsOpen={handleSettingsOpen}
        toggleCollapse={toggleCollapse}
        collapsed={collapsed}
        layoutLocked={layoutLocked}
      />
      <Divider sx={{ opacity: 0.1, mb: 2 }} />
      <Collapse in={!collapsed} timeout="auto" unmountOnExit sx={{ flexGrow: 1 }}>
        <Box sx={{ height: '100%', overflow: 'auto' }}>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', pt: 4 }}>
              <CircularProgress size={30} />
            </Box>
          ) : data && data.stocks ? (
            <>
              <List sx={{ p: 0 }}>
                {data.stocks.map((stock, index) => (
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
                    {index !== data.stocks.length - 1 && (
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
                      data={data.chartData}
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

export default StocksWidget;