import React from 'react';
import { Snackbar, Alert } from '@mui/material';

const Notification = ({ 
  notification, 
  handleNotificationClose 
}) => {
  return (
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
  );
};

export default Notification;