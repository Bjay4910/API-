import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Switch,
  FormControlLabel
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

export const WeatherSettingsDialog = ({
  open,
  handleClose,
  settings,
  handleSettingsChange,
  handleSettingsSave
}) => (
  <Dialog 
    open={open} 
    onClose={handleClose}
    maxWidth="xs"
    fullWidth
  >
    <DialogTitle>
      Weather Widget Settings
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
    </DialogTitle>
    <DialogContent dividers>
      <Box sx={{ mb: 2 }}>
        <TextField
          label="City"
          value={settings.city}
          onChange={(e) => handleSettingsChange('weather', 'city', e.target.value)}
          fullWidth
          margin="normal"
          helperText="Enter city name (e.g., London, New York, Tokyo)"
        />
      </Box>
      <Box>
        <FormControl fullWidth margin="normal">
          <InputLabel id="weather-units-label">Temperature Units</InputLabel>
          <Select
            labelId="weather-units-label"
            value={settings.units}
            label="Temperature Units"
            onChange={(e) => handleSettingsChange('weather', 'units', e.target.value)}
          >
            <MenuItem value="metric">Celsius (°C)</MenuItem>
            <MenuItem value="imperial">Fahrenheit (°F)</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose}>Cancel</Button>
      <Button 
        onClick={() => handleSettingsSave('weather')} 
        variant="contained"
      >
        Save
      </Button>
    </DialogActions>
  </Dialog>
);

export const NewsSettingsDialog = ({
  open,
  handleClose,
  settings,
  handleSettingsChange,
  handleSettingsSave
}) => (
  <Dialog 
    open={open} 
    onClose={handleClose}
    maxWidth="xs"
    fullWidth
  >
    <DialogTitle>
      News Widget Settings
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
    </DialogTitle>
    <DialogContent dividers>
      <FormControl fullWidth margin="normal">
        <InputLabel id="news-category-label">Category</InputLabel>
        <Select
          labelId="news-category-label"
          value={settings.category}
          label="Category"
          onChange={(e) => handleSettingsChange('news', 'category', e.target.value)}
        >
          <MenuItem value="technology">Technology</MenuItem>
          <MenuItem value="business">Business</MenuItem>
          <MenuItem value="entertainment">Entertainment</MenuItem>
          <MenuItem value="health">Health</MenuItem>
          <MenuItem value="science">Science</MenuItem>
          <MenuItem value="sports">Sports</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth margin="normal">
        <InputLabel id="news-country-label">Country</InputLabel>
        <Select
          labelId="news-country-label"
          value={settings.country}
          label="Country"
          onChange={(e) => handleSettingsChange('news', 'country', e.target.value)}
        >
          <MenuItem value="us">United States</MenuItem>
          <MenuItem value="gb">United Kingdom</MenuItem>
          <MenuItem value="ca">Canada</MenuItem>
          <MenuItem value="au">Australia</MenuItem>
          <MenuItem value="fr">France</MenuItem>
          <MenuItem value="de">Germany</MenuItem>
        </Select>
      </FormControl>
      <FormControl fullWidth margin="normal">
        <InputLabel id="news-count-label">Number of Articles</InputLabel>
        <Select
          labelId="news-count-label"
          value={settings.pageSize}
          label="Number of Articles"
          onChange={(e) => handleSettingsChange('news', 'pageSize', e.target.value)}
        >
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={5}>5</MenuItem>
        </Select>
      </FormControl>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose}>Cancel</Button>
      <Button 
        onClick={() => handleSettingsSave('news')} 
        variant="contained"
      >
        Save
      </Button>
    </DialogActions>
  </Dialog>
);

export const StocksSettingsDialog = ({
  open,
  handleClose,
  handleSettingsSave
}) => (
  <Dialog 
    open={open} 
    onClose={handleClose}
    maxWidth="xs"
    fullWidth
  >
    <DialogTitle>
      Stocks Widget Settings
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
    </DialogTitle>
    <DialogContent dividers>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Track your favorite stocks (using mock data for demo)
      </Typography>
      <Box sx={{ mt: 2 }}>
        {/* For demo purposes, we're not implementing full stock symbol selection */}
        <Typography variant="body1">
          Currently tracking: AAPL, MSFT, GOOGL
        </Typography>
      </Box>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose}>Cancel</Button>
      <Button 
        onClick={() => handleSettingsSave('stocks')} 
        variant="contained"
      >
        Save
      </Button>
    </DialogActions>
  </Dialog>
);

export const CovidSettingsDialog = ({
  open,
  handleClose,
  settings,
  handleSettingsChange,
  handleSettingsSave
}) => (
  <Dialog 
    open={open} 
    onClose={handleClose}
    maxWidth="xs"
    fullWidth
  >
    <DialogTitle>
      COVID-19 Widget Settings
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
    </DialogTitle>
    <DialogContent dividers>
      <FormControl fullWidth margin="normal">
        <InputLabel id="covid-country-label">Country</InputLabel>
        <Select
          labelId="covid-country-label"
          value={settings.country}
          label="Country"
          onChange={(e) => handleSettingsChange('covid', 'country', e.target.value)}
        >
          <MenuItem value="global">Global</MenuItem>
          <MenuItem value="usa">USA</MenuItem>
          <MenuItem value="uk">UK</MenuItem>
          <MenuItem value="germany">Germany</MenuItem>
          <MenuItem value="france">France</MenuItem>
          <MenuItem value="india">India</MenuItem>
          <MenuItem value="china">China</MenuItem>
          <MenuItem value="brazil">Brazil</MenuItem>
        </Select>
      </FormControl>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose}>Cancel</Button>
      <Button 
        onClick={() => handleSettingsSave('covid')} 
        variant="contained"
      >
        Save
      </Button>
    </DialogActions>
  </Dialog>
);

export const DashboardSettingsDialog = ({
  open,
  handleClose,
  layoutLocked,
  toggleLayoutLock,
  collapsed,
  toggleCollapse
}) => (
  <Dialog
    open={open}
    onClose={handleClose}
    maxWidth="sm"
    fullWidth
  >
    <DialogTitle>
      Dashboard Settings
      <IconButton
        aria-label="close"
        onClick={handleClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
    </DialogTitle>
    <DialogContent dividers>
      <FormControlLabel
        control={
          <Switch
            checked={!layoutLocked}
            onChange={toggleLayoutLock}
            color="primary"
          />
        }
        label="Enable widget drag-and-drop"
      />
      <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 3 }}>
        {layoutLocked 
          ? "Unlock to reposition widgets by dragging them around."
          : "Drag the handle on each widget to reposition it. Lock the layout when done."}
      </Typography>
      
      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle1" gutterBottom>
          Widget Visibility
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Collapse or expand individual widgets
        </Typography>
        
        <List>
          {Object.keys(collapsed).map((widget) => (
            <ListItem key={widget}>
              <ListItemText 
                primary={widget.charAt(0).toUpperCase() + widget.slice(1)} 
              />
              <Button 
                variant="outlined" 
                size="small"
                onClick={() => toggleCollapse(widget)}
                startIcon={collapsed[widget] ? <ExpandMoreIcon /> : <ExpandLessIcon />}
              >
                {collapsed[widget] ? 'Expand' : 'Collapse'}
              </Button>
            </ListItem>
          ))}
        </List>
      </Box>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose}>Close</Button>
    </DialogActions>
  </Dialog>
);