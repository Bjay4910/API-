import React, { createContext, useState, useContext, useCallback } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { fetchWidgetData, mockNews, mockStocks } from '../services/api/apiService';

// Create the dashboard context
const DashboardContext = createContext();

// Custom hook to use the dashboard context
export const useDashboard = () => useContext(DashboardContext);

// Dashboard provider component
export const DashboardProvider = ({ children }) => {
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
  const [collapsed, setCollapsed] = useLocalStorage('dashboardCollapsed', {
    weather: false,
    news: false,
    stocks: false,
    covid: false,
  });

  // State for layout lock
  const [layoutLocked, setLayoutLocked] = useLocalStorage('layoutLocked', true);

  // State for widget settings
  const [settings, setSettings] = useLocalStorage('dashboardSettings', {
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
  const [layouts, setLayouts] = useLocalStorage('dashboardLayouts', {
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

  // Fetch data for a specific widget
  const fetchData = useCallback(async (apiType) => {
    setLoading(prev => ({ ...prev, [apiType]: true }));
    try {
      const responseData = await fetchWidgetData(apiType, settings);
      setData(prevData => ({
        ...prevData,
        [apiType]: responseData
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
  }, [settings]);

  // Handle settings dialog open/close
  const handleSettingsOpen = useCallback((widget) => {
    setSettingsOpen(prev => ({ ...prev, [widget]: true }));
  }, []);

  const handleSettingsClose = useCallback((widget) => {
    setSettingsOpen(prev => ({ ...prev, [widget]: false }));
  }, []);

  // Handle settings changes
  const handleSettingsChange = useCallback((widget, field, value) => {
    setSettings(prev => ({
      ...prev,
      [widget]: {
        ...prev[widget],
        [field]: value
      }
    }));
  }, [setSettings]);

  // Handle settings save
  const handleSettingsSave = useCallback((widget) => {
    handleSettingsClose(widget);
    fetchData(widget);
  }, [fetchData, handleSettingsClose]);

  // Handle widget collapse toggle
  const toggleCollapse = useCallback((widget) => {
    setCollapsed(prev => ({
      ...prev,
      [widget]: !prev[widget]
    }));
  }, [setCollapsed]);

  // Handle notification close
  const handleNotificationClose = useCallback(() => {
    setNotification(prev => ({
      ...prev,
      open: false
    }));
  }, []);

  // Handle layout change
  const handleLayoutChange = useCallback((currentLayout, allLayouts) => {
    if (!layoutLocked) {
      setLayouts(allLayouts);
    }
  }, [layoutLocked, setLayouts]);

  // Handle layout lock toggle
  const toggleLayoutLock = useCallback(() => {
    setLayoutLocked(!layoutLocked);
    setNotification({
      open: true,
      message: layoutLocked ? 'Dashboard unlocked. You can drag widgets to rearrange.' : 'Dashboard locked.',
      severity: 'info'
    });
  }, [layoutLocked, setLayoutLocked]);

  // Open dashboard settings dialog
  const handleDashboardSettingsOpen = useCallback(() => {
    setDashboardSettingsOpen(true);
  }, []);

  // Close dashboard settings dialog
  const handleDashboardSettingsClose = useCallback(() => {
    setDashboardSettingsOpen(false);
  }, []);

  // Initialize dashboard with mock data
  const initializeDashboard = useCallback(() => {
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
  }, [fetchData]);

  // Context value
  const value = {
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
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
};

export default DashboardContext;