import React, { useState, useEffect } from 'react';
import { Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip } from '@mui/material';
import { TrendingUp, TrendingDown } from '@mui/icons-material';
import WidgetCard from '../UI/WidgetCard';

const StockWidget = () => {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Sample data for stocks
  const sampleStocks = [
    { symbol: 'AAPL', name: 'Apple Inc.', price: 182.63, change: 1.25, changePercent: 0.69 },
    { symbol: 'MSFT', name: 'Microsoft Corp.', price: 420.21, change: -2.34, changePercent: -0.55 },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 172.83, change: 0.56, changePercent: 0.33 },
    { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 181.47, change: 3.12, changePercent: 1.75 },
    { symbol: 'TSLA', name: 'Tesla Inc.', price: 193.58, change: -4.27, changePercent: -2.16 }
  ];

  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      try {
        setLoading(true);
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setStocks(sampleStocks);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch stock data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleRefresh = () => {
    setLoading(true);
    // Simulate refreshing data with slight variations
    setTimeout(() => {
      const updatedStocks = sampleStocks.map(stock => ({
        ...stock,
        price: +(stock.price + (Math.random() * 2 - 1)).toFixed(2),
        change: +((Math.random() * 2 - 1) * 3).toFixed(2),
        changePercent: +((Math.random() * 2 - 1) * 1.5).toFixed(2)
      }));
      setStocks(updatedStocks);
      setLoading(false);
    }, 1000);
  };

  return (
    <WidgetCard 
      title="Stocks" 
      isLoading={loading} 
      error={error}
      onRefresh={handleRefresh}
    >
      <Box sx={{ mb: 2 }}>
        <img 
          src="/images/widgets/stocks-widget.jpg" 
          alt="Stock market visualization" 
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
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Symbol</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Change</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stocks.map((stock) => (
              <TableRow key={stock.symbol}>
                <TableCell>
                  <Box>
                    <Typography variant="body2" fontWeight="bold">{stock.symbol}</Typography>
                    <Typography variant="caption" color="text.secondary">{stock.name}</Typography>
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">${stock.price.toFixed(2)}</Typography>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {stock.change >= 0 ? (
                      <Chip 
                        icon={<TrendingUp fontSize="small" />} 
                        label={`+${stock.change.toFixed(2)} (${stock.changePercent.toFixed(2)}%)`} 
                        size="small" 
                        color="success"
                        sx={{ fontSize: '0.7rem' }}
                      />
                    ) : (
                      <Chip 
                        icon={<TrendingDown fontSize="small" />} 
                        label={`${stock.change.toFixed(2)} (${stock.changePercent.toFixed(2)}%)`} 
                        size="small" 
                        color="error"
                        sx={{ fontSize: '0.7rem' }}
                      />
                    )}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </WidgetCard>
  );
};

export default StockWidget;