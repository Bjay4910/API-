import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Paper,
  InputBase,
  IconButton,
  Badge,
  Tooltip
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import ViewComfyIcon from '@mui/icons-material/ViewComfy';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';

const Header = ({ 
  layoutLocked, 
  toggleLayoutLock, 
  handleDashboardSettingsOpen 
}) => {
  return (
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
  );
};

export default Header;