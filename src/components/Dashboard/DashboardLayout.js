import React from 'react';
import { Grid, Box } from '@mui/material';

const DashboardLayout = ({ children }) => {
  return (
    <Box sx={{ flexGrow: 1, mt: 3 }}>
      <Grid container spacing={3}>
        {React.Children.map(children, (child, index) => (
          child && (
            <Grid item xs={12} sm={6} md={6} lg={6} xl={3} key={index}>
              {child}
            </Grid>
          )
        ))}
      </Grid>
    </Box>
  );
};

export default DashboardLayout;