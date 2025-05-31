import React from 'react';
import { 
  Box, 
  Typography, 
  IconButton, 
  Tooltip 
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import SettingsIcon from '@mui/icons-material/Settings';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

const WidgetHeader = ({ 
  title, 
  icon: Icon, 
  iconColor, 
  widget, 
  refreshData,
  handleSettingsOpen,
  toggleCollapse,
  collapsed,
  layoutLocked
}) => {
  return (
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
        <Tooltip title={collapsed ? "Expand" : "Collapse"}>
          <IconButton 
            size="small" 
            onClick={() => toggleCollapse(widget)} 
            sx={{ color: 'text.secondary' }}
          >
            {collapsed ? 
              <ExpandMoreIcon fontSize="small" /> : 
              <ExpandLessIcon fontSize="small" />
            }
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default WidgetHeader;