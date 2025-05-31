import React from 'react';
import { Typography, List, ListItem, ListItemText, Link, Chip } from '@mui/material';
import WidgetCard from '../UI/WidgetCard';
import useApi from '../../hooks/useApi';
import { getTopHeadlines } from '../../services/api/newsService';
import ErrorMessage from '../UI/ErrorMessage';

const NewsWidget = () => {
  const { 
    data, 
    loading, 
    error, 
    refresh,
    isRateLimitError,
    rateLimitInfo
  } = useApi(
    () => getTopHeadlines('technology', 'us', 5), 
    null, 
    true
  );

  // Prepare error component with rate limit information if applicable
  const errorComponent = error ? (
    <ErrorMessage 
      message={error}
      onRetry={refresh}
      isRateLimit={isRateLimitError}
      resetTime={rateLimitInfo?.resetTime}
    />
  ) : null;

  return (
    <WidgetCard 
      title="Latest News" 
      isLoading={loading} 
      error={errorComponent} // Pass the custom error component instead of just the message
      onRefresh={refresh}
    >
      <Box sx={{ mb: 2 }}>
        <img 
          src="/images/widgets/news-widget.jpg" 
          alt="News feed visualization" 
          style={{ 
            maxWidth: '100%', 
            height: 'auto', 
            borderRadius: '6px',
            display: 'none' // Initially hidden until loaded
          }}
          onLoad={(e) => { e.target.style.display = 'block'; }}
          onError={(e) => { e.target.style.display = 'none'; }}
        />
      </Box>
      <List sx={{ p: 0 }}>
        {data && data.articles && data.articles.map((article, index) => (
          <ListItem 
            key={index} 
            alignItems="flex-start" 
            sx={{ px: 0, borderBottom: index !== data.articles.length - 1 ? '1px solid #eee' : 'none' }}
          >
            <ListItemText
              primary={
                <Link 
                  href={article.url} 
                  target="_blank" 
                  rel="noopener"
                  underline="hover"
                  color="inherit"
                >
                  {article.title}
                </Link>
              }
              secondary={
                <>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {article.source.name} • {new Date(article.publishedAt).toLocaleDateString()}
                  </Typography>
                  <Chip 
                    label="Technology" 
                    size="small" 
                    sx={{ fontSize: '0.7rem' }} 
                  />
                </>
              }
            />
          </ListItem>
        ))}
      </List>
    </WidgetCard>
  );
};

export default NewsWidget;