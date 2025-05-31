import React from 'react';
import { 
  Box, 
  Typography, 
  Divider, 
  CircularProgress, 
  Collapse, 
  Paper,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Chip,
  Link
} from '@mui/material';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import WidgetHeader from '../Common/WidgetHeader';

const NewsWidget = ({
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
        title="Latest News" 
        icon={NewspaperIcon} 
        iconColor="#1565c0" 
        widget="news"
        refreshData={refreshData}
        handleSettingsOpen={handleSettingsOpen}
        toggleCollapse={toggleCollapse}
        collapsed={collapsed}
        layoutLocked={layoutLocked}
      />
      <Divider sx={{ opacity: 0.1, mb: 2 }} />
      <Collapse in={!collapsed} timeout="auto" unmountOnExit sx={{ flexGrow: 1 }}>
        <Box sx={{ height: '100%', overflow: 'auto' }}>
          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', pt: 4 }}>
              <CircularProgress size={30} />
            </Box>
          ) : data && data.articles ? (
            <List sx={{ p: 0 }}>
              {data.articles.slice(0, settings.pageSize).map((article, index) => (
                <React.Fragment key={index}>
                  <ListItem 
                    alignItems="flex-start" 
                    sx={{ px: 0 }}
                    disableGutters
                  >
                    <ListItemText
                      primary={
                        <Link 
                          href={article.url} 
                          target="_blank" 
                          rel="noopener"
                          underline="hover"
                          color="inherit"
                          sx={{ 
                            fontWeight: 500,
                            fontSize: '0.95rem',
                            display: 'block',
                            mb: 0.5,
                            lineHeight: 1.3
                          }}
                        >
                          {article.title}
                        </Link>
                      }
                      secondary={
                        <Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                            <Avatar 
                              sx={{ width: 20, height: 20, mr: 1, bgcolor: '#1565c0' }}
                            >
                              {article.source.name.charAt(0)}
                            </Avatar>
                            <Typography variant="caption" color="text.secondary">
                              {article.source.name} • {new Date(article.publishedAt).toLocaleDateString()}
                            </Typography>
                          </Box>
                          <Box sx={{ mt: 1 }}>
                            <Chip 
                              label={settings.category.charAt(0).toUpperCase() + settings.category.slice(1)} 
                              size="small" 
                              sx={{ 
                                fontSize: '0.7rem',
                                bgcolor: '#e3f2fd',
                                color: '#1565c0',
                                fontWeight: 500,
                                height: 22
                              }} 
                            />
                          </Box>
                        </Box>
                      }
                    />
                  </ListItem>
                  {index !== data.articles.slice(0, settings.pageSize).length - 1 && (
                    <Divider component="li" sx={{ my: 1.5 }} />
                  )}
                </React.Fragment>
              ))}
            </List>
          ) : (
            <Typography variant="body1" align="center">
              No news data available
            </Typography>
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

export default NewsWidget;