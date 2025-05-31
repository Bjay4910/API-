import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import Header from '../Layout/Header';
import DashboardLayout from '../Layout/DashboardLayout';
import WeatherWidget from '../Widgets/WeatherWidget';
import NewsWidget from '../Widgets/NewsWidget';
import StocksWidget from '../Widgets/StocksWidget';
import CovidWidget from '../Widgets/CovidWidget';
import Notification from './Notification';
import { 
  WeatherSettingsDialog, 
  NewsSettingsDialog, 
  StocksSettingsDialog, 
  CovidSettingsDialog, 
  DashboardSettingsDialog 
} from './SettingsDialogs';
import { useDashboard } from '../../context/DashboardContext';

const Dashboard = () => {
  const {
    data,
    loading,
    settings,
    collapsed,
    layoutLocked,
    layouts,
    settingsOpen,
    dashboardSettingsOpen,
    notification,
    fetchData,
    handleSettingsOpen,
    handleSettingsClose,
    handleSettingsChange,
    handleSettingsSave,
    toggleCollapse,
    handleNotificationClose,
    handleLayoutChange,
    toggleLayoutLock,
    handleDashboardSettingsOpen,
    handleDashboardSettingsClose,
    initializeDashboard
  } = useDashboard();

  // Use useEffect to fetch data when component mounts
  useEffect(() => {
    initializeDashboard();
  }, [initializeDashboard]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Header
        layoutLocked={layoutLocked}
        toggleLayoutLock={toggleLayoutLock}
        handleDashboardSettingsOpen={handleDashboardSettingsOpen}
      />
      
      <DashboardLayout
        layouts={layouts}
        handleLayoutChange={handleLayoutChange}
        layoutLocked={layoutLocked}
      >
        {/* Weather Widget */}
        <Box key="weather">
          <WeatherWidget
            data={data.weather}
            loading={loading.weather}
            collapsed={collapsed.weather}
            settings={settings.weather}
            refreshData={fetchData}
            handleSettingsOpen={handleSettingsOpen}
            toggleCollapse={toggleCollapse}
            layoutLocked={layoutLocked}
          />
        </Box>
        
        {/* News Widget */}
        <Box key="news">
          <NewsWidget
            data={data.news}
            loading={loading.news}
            collapsed={collapsed.news}
            settings={settings.news}
            refreshData={fetchData}
            handleSettingsOpen={handleSettingsOpen}
            toggleCollapse={toggleCollapse}
            layoutLocked={layoutLocked}
          />
        </Box>
        
        {/* Stocks Widget */}
        <Box key="stocks">
          <StocksWidget
            data={data.stocks}
            loading={loading.stocks}
            collapsed={collapsed.stocks}
            settings={settings.stocks}
            refreshData={fetchData}
            handleSettingsOpen={handleSettingsOpen}
            toggleCollapse={toggleCollapse}
            layoutLocked={layoutLocked}
          />
        </Box>
        
        {/* COVID Widget */}
        <Box key="covid">
          <CovidWidget
            data={data.covid}
            loading={loading.covid}
            collapsed={collapsed.covid}
            settings={settings.covid}
            refreshData={fetchData}
            handleSettingsOpen={handleSettingsOpen}
            toggleCollapse={toggleCollapse}
            layoutLocked={layoutLocked}
          />
        </Box>
      </DashboardLayout>

      {/* Weather Settings Dialog */}
      <WeatherSettingsDialog
        open={settingsOpen.weather}
        handleClose={() => handleSettingsClose('weather')}
        settings={settings.weather}
        handleSettingsChange={handleSettingsChange}
        handleSettingsSave={handleSettingsSave}
      />

      {/* News Settings Dialog */}
      <NewsSettingsDialog
        open={settingsOpen.news}
        handleClose={() => handleSettingsClose('news')}
        settings={settings.news}
        handleSettingsChange={handleSettingsChange}
        handleSettingsSave={handleSettingsSave}
      />

      {/* Stocks Settings Dialog */}
      <StocksSettingsDialog
        open={settingsOpen.stocks}
        handleClose={() => handleSettingsClose('stocks')}
        handleSettingsSave={handleSettingsSave}
      />

      {/* COVID Settings Dialog */}
      <CovidSettingsDialog
        open={settingsOpen.covid}
        handleClose={() => handleSettingsClose('covid')}
        settings={settings.covid}
        handleSettingsChange={handleSettingsChange}
        handleSettingsSave={handleSettingsSave}
      />

      {/* Dashboard Settings Dialog */}
      <DashboardSettingsDialog
        open={dashboardSettingsOpen}
        handleClose={handleDashboardSettingsClose}
        layoutLocked={layoutLocked}
        toggleLayoutLock={toggleLayoutLock}
        collapsed={collapsed}
        toggleCollapse={toggleCollapse}
      />

      {/* Notification Snackbar */}
      <Notification
        notification={notification}
        handleNotificationClose={handleNotificationClose}
      />
    </Box>
  );
};

export default Dashboard;