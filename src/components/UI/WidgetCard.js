import React from 'react';
import { 
  Card, 
  CardHeader, 
  CardContent, 
  IconButton, 
  Box, 
  Typography,
  Divider,
  CircularProgress
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ErrorMessage from './ErrorMessage';

const WidgetCard = ({ 
  title, 
  children, 
  isLoading = false, 
  error = null, 
  onRefresh,
  onSettings,
  iconColor = '#1976d2',
  headerAction = null,
  icon: Icon = null,
  height = 'auto',
  hideActions = false
}) => {
  return (
    <Card 
      sx={{ 
        height: height, 
        display: 'flex', 
        flexDirection: 'column',
        borderRadius: '10px',
        boxShadow: '0 4px 20px 0 rgba(0,0,0,0.05)',
        overflow: 'hidden',
        transition: 'transform 0.3s, box-shadow 0.3s',
        '&:hover': {
          boxShadow: '0 6px 25px 0 rgba(0,0,0,0.1)',
          transform: 'translateY(-5px)'
        }
      }}
    >
      <CardHeader 
        title={
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {Icon && (
              <Box 
                sx={{ 
                  mr: 1.5, 
                  display: 'flex', 
                  alignItems: 'center',
                  color: iconColor
                }}
              >
                <Icon fontSize="small" />
              </Box>
            )}
            <Typography variant="h6" sx={{ fontWeight: 500, fontSize: '1rem' }}>
              {title}
            </Typography>
          </Box>
        }
        action={
          !hideActions && (
            <Box sx={{ display: 'flex' }}>
              {headerAction}
              {onRefresh && (
                <IconButton 
                  onClick={onRefresh} 
                  aria-label="refresh"
                  size="small"
                  sx={{ color: 'text.secondary' }}
                >
                  <RefreshIcon fontSize="small" />
                </IconButton>
              )}
              {onSettings ? (
                <IconButton 
                  onClick={onSettings}
                  aria-label="settings"
                  size="small"
                  sx={{ color: 'text.secondary' }}
                >
                  <MoreVertIcon fontSize="small" />
                </IconButton>
              ) : (
                <IconButton 
                  aria-label="more options"
                  size="small"
                  sx={{ color: 'text.secondary' }}
                >
                  <MoreVertIcon fontSize="small" />
                </IconButton>
              )}
            </Box>
          )
        }
        sx={{ 
          padding: '16px 20px 0px 20px',
          '& .MuiCardHeader-action': { marginRight: 0 }
        }}
      />
      <Divider sx={{ mt: 1.5, opacity: 0.1 }} />
      <CardContent 
        sx={{ 
          flexGrow: 1, 
          padding: '20px',
          '&:last-child': { paddingBottom: '20px' }
        }}
      >
        {error ? (
          // If error is a React component, render it directly
          // Otherwise, use the ErrorMessage component with the error string
          React.isValidElement(error) ? error : <ErrorMessage message={error} />
        ) : (
          <Box sx={{ position: 'relative' }}>
            {isLoading && (
              <Box sx={{ 
                position: 'absolute', 
                top: 0, 
                left: 0, 
                right: 0, 
                bottom: 0, 
                backgroundColor: 'rgba(255, 255, 255, 0.7)', 
                zIndex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <CircularProgress size={24} />
              </Box>
            )}
            {children}
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default WidgetCard;