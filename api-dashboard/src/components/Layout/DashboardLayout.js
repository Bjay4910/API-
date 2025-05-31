import React from 'react';
import { Box, Container, Typography, Chip } from '@mui/material';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import LockOpenIcon from '@mui/icons-material/LockOpen';

// Enable responsive features for react-grid-layout
const ResponsiveGridLayout = WidthProvider(Responsive);

const DashboardLayout = ({ 
  children, 
  layouts, 
  handleLayoutChange, 
  layoutLocked
}) => {
  // CSS for react-grid-layout
  const gridStyles = {
    '.react-grid-item.react-grid-placeholder': {
      backgroundColor: 'rgba(25, 118, 210, 0.2)',
      borderRadius: '10px',
    }
  };

  return (
    <Box sx={{ 
      bgcolor: '#f8f9fa', 
      minHeight: 'calc(100vh - 64px)',
      pt: 2,
      pb: 4
    }}>
      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 500 }}>
            API Integration Dashboard
          </Typography>
          <Box>
            {!layoutLocked && (
              <Chip 
                color="primary" 
                icon={<LockOpenIcon />} 
                label="Drag widgets to rearrange" 
                variant="outlined"
                sx={{ mr: 1 }}
              />
            )}
          </Box>
        </Box>
        
        <ResponsiveGridLayout
          className="layout"
          layouts={layouts}
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480 }}
          cols={{ lg: 4, md: 2, sm: 1, xs: 1 }}
          rowHeight={200}
          onLayoutChange={handleLayoutChange}
          isDraggable={!layoutLocked}
          isResizable={false}
          draggableHandle=".drag-handle"
          containerPadding={[0, 0]}
          margin={[16, 16]}
          style={gridStyles}
        >
          {children}
        </ResponsiveGridLayout>
      </Container>
    </Box>
  );
};

export default DashboardLayout;