import React from 'react';
import { Box, Typography, Button, Chip } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const ErrorMessage = ({ 
  message = 'Something went wrong', 
  onRetry,
  isRateLimit = false,
  resetTime = null 
}) => {
  // If this is a rate limit error and we have a reset time
  const showResetTime = isRateLimit && resetTime;
  
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center', 
        justifyContent: 'center',
        height: '100%',
        minHeight: '200px',
        p: 3
      }}
    >
      <ErrorOutlineIcon 
        color={isRateLimit ? "warning" : "error"} 
        sx={{ fontSize: 40, mb: 2 }} 
      />
      
      {isRateLimit && (
        <Chip 
          label="API Rate Limit Exceeded" 
          color="warning" 
          size="small" 
          sx={{ mb: 2 }} 
        />
      )}
      
      <Typography 
        variant="body1" 
        color={isRateLimit ? "text.secondary" : "error"} 
        gutterBottom 
        align="center"
      >
        {message}
      </Typography>
      
      {showResetTime && (
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          mt: 1, 
          mb: 2,
          color: 'text.secondary',
          fontSize: '0.875rem'
        }}>
          <AccessTimeIcon fontSize="small" sx={{ mr: 0.5 }} />
          <Typography variant="caption">
            Try again after: {new Date(resetTime).toLocaleTimeString()}
          </Typography>
        </Box>
      )}
      
      {onRetry && (
        <Button 
          variant="outlined" 
          color={isRateLimit ? "warning" : "primary"} 
          onClick={onRetry}
          sx={{ mt: 2 }}
          disabled={isRateLimit && resetTime && new Date() < new Date(resetTime)}
        >
          {isRateLimit ? "Try Again Later" : "Retry Now"}
        </Button>
      )}
      
      {isRateLimit && (
        <Typography variant="caption" color="text.secondary" sx={{ mt: 2, textAlign: 'center' }}>
          Free API tiers have request limits. Data is now being served from cache until new requests are allowed.
        </Typography>
      )}
    </Box>
  );
};

export default ErrorMessage;