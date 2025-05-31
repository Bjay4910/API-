import React from 'react';
import { 
  Box, 
  Typography, 
  Divider, 
  CircularProgress, 
  Collapse, 
  Paper,
  Grid,
  LinearProgress
} from '@mui/material';
import CoronavirusIcon from '@mui/icons-material/Coronavirus';
import WidgetHeader from '../Common/WidgetHeader';

const CovidWidget = ({
  data,
  loading,
  collapsed,
  settings,
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
        title="COVID-19" 
        icon={CoronavirusIcon} 
        iconColor="#d32f2f" 
        widget="covid"
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
              <Paper elevation={0} sx={{ 
                width: '100%', 
                p: 1.5, 
                mb: 2, 
                borderRadius: '8px',
                bgcolor: 'info.light',
                color: 'info.dark'
              }}>
                <Typography variant="caption" sx={{ display: 'block', mb: 0.5 }}>
                  {settings.country === 'global' ? 'Global' : settings.country} Cases
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  {data.cases?.toLocaleString()}
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
                      {data.deaths?.toLocaleString()}
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
                      {data.recovered?.toLocaleString()}
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
              
              <Typography variant="caption" sx={{ alignSelf: 'flex-start', mb: 0.5, color: 'text.secondary' }}>
                Active Cases ({Math.round((data.active / data.cases) * 100)}%)
              </Typography>
              <LinearProgress 
                variant="determinate" 
                value={Math.round((data.active / data.cases) * 100)} 
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
                    {data.tests ? (data.tests / 1000000).toFixed(1) + 'M' : 'N/A'}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Critical
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {data.critical?.toLocaleString() || 'N/A'}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Cases Today
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {data.todayCases?.toLocaleString() || 'N/A'}
                  </Typography>
                </Box>
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

export default CovidWidget;