import React, { useState } from 'react';

const ProfilePage = () => {
  const [profileData, setProfileData] = useState({
    name: 'King James',
    email: 'john.doe@example.com',
    role: 'Administrator',
    preferences: {
      theme: 'light',
      notifications: true,
      dashboardRefresh: 0
    },
    apiKeys: [
      { name: 'Weather API', key: 'wth_*************78a', status: 'Active' },
      { name: 'Stock API', key: 'stk_*************3bc', status: 'Active' },
      { name: 'News API', key: 'nws_*************45d', status: 'Inactive' },
      { name: 'COVID-19 API', key: 'cvd_*************91e', status: 'Active' }
    ]
  });

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({...profileData});

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      const [parentKey, childKey] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parentKey]: {
          ...prev[parentKey],
          [childKey]: type === 'checkbox' ? checked : value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const toggleApiKeyStatus = (index) => {
    const updatedApiKeys = [...formData.apiKeys];
    updatedApiKeys[index] = {
      ...updatedApiKeys[index],
      status: updatedApiKeys[index].status === 'Active' ? 'Inactive' : 'Active'
    };
    
    setFormData(prev => ({
      ...prev,
      apiKeys: updatedApiKeys
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setProfileData({...formData});
    setEditMode(false);
  };

  return (
    <div className="profile-page">
      <div className="profile-header">
        <h1>User Profile</h1>
        <button 
          className={`edit-button ${editMode ? 'save' : ''}`}
          onClick={() => !editMode ? setEditMode(true) : null}
        >
          {editMode ? 'Editing...' : 'Edit Profile'}
        </button>
      </div>

      <div className="profile-content">
        <div className="profile-section user-info">
          <h2>Personal Information</h2>
          
          {editMode ? (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleInputChange} 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleInputChange} 
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="role">Role</label>
                <select 
                  id="role" 
                  name="role" 
                  value={formData.role} 
                  onChange={handleInputChange}
                >
                  <option value="Administrator">Administrator</option>
                  <option value="Developer">Developer</option>
                  <option value="Analyst">Analyst</option>
                  <option value="Viewer">Viewer</option>
                </select>
              </div>
              
              <h3>Preferences</h3>
              
              <div className="form-group">
                <label htmlFor="theme">Theme</label>
                <select 
                  id="theme" 
                  name="preferences.theme" 
                  value={formData.preferences.theme} 
                  onChange={handleInputChange}
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="system">System Default</option>
                </select>
              </div>
              
              <div className="form-group checkbox">
                <input 
                  type="checkbox" 
                  id="notifications" 
                  name="preferences.notifications" 
                  checked={formData.preferences.notifications} 
                  onChange={handleInputChange} 
                />
                <label htmlFor="notifications">Enable Notifications</label>
              </div>
              
              <div className="form-group">
                <label htmlFor="dashboardRefresh">Dashboard Refresh Rate (seconds)</label>
                <select 
                  id="dashboardRefresh" 
                  name="preferences.dashboardRefresh" 
                  value={formData.preferences.dashboardRefresh} 
                  onChange={handleInputChange}
                >
                  <option value={15}>15 seconds</option>
                  <option value={30}>30 seconds</option>
                  <option value={60}>1 minute</option>
                  <option value={300}>5 minutes</option>
                  <option value={0}>Manual refresh only</option>
                </select>
              </div>
              
              <div className="form-buttons">
                <button type="submit" className="save-button">Save Changes</button>
                <button 
                  type="button" 
                  className="cancel-button" 
                  onClick={() => {
                    setEditMode(false);
                    setFormData({...profileData});
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="profile-details">
              <div className="detail-group">
                <span className="label">Name:</span>
                <span className="value">{profileData.name}</span>
              </div>
              
              <div className="detail-group">
                <span className="label">Email:</span>
                <span className="value">{profileData.email}</span>
              </div>
              
              <div className="detail-group">
                <span className="label">Role:</span>
                <span className="value">{profileData.role}</span>
              </div>
              
              <h3>Preferences</h3>
              
              <div className="detail-group">
                <span className="label">Theme:</span>
                <span className="value">{profileData.preferences.theme}</span>
              </div>
              
              <div className="detail-group">
                <span className="label">Notifications:</span>
                <span className="value">{profileData.preferences.notifications ? 'Enabled' : 'Disabled'}</span>
              </div>
              
              <div className="detail-group">
                <span className="label">Dashboard Refresh Rate:</span>
                <span className="value">
                  {profileData.preferences.dashboardRefresh === 0 
                    ? 'Manual refresh only' 
                    : `${profileData.preferences.dashboardRefresh} seconds`}
                </span>
              </div>
            </div>
          )}
        </div>
        
        <div className="profile-section api-keys">
          <h2>API Keys</h2>
          
          {editMode ? (
            <div className="api-key-list editable">
              {formData.apiKeys.map((api, index) => (
                <div key={index} className="api-key-item">
                  <div className="key-details">
                    <div className="key-name">{api.name}</div>
                    <div className="key-value">{api.key}</div>
                  </div>
                  <div className="key-actions">
                    <span className={`key-status ${api.status.toLowerCase()}`}>
                      {api.status}
                    </span>
                    <button 
                      type="button" 
                      className="toggle-status" 
                      onClick={() => toggleApiKeyStatus(index)}
                    >
                      {api.status === 'Active' ? 'Deactivate' : 'Activate'}
                    </button>
                    <button type="button" className="regenerate-key">
                      Regenerate
                    </button>
                  </div>
                </div>
              ))}
              <button type="button" className="add-key-button">
                + Add New API Key
              </button>
            </div>
          ) : (
            <div className="api-key-list">
              {profileData.apiKeys.map((api, index) => (
                <div key={index} className="api-key-item">
                  <div className="key-details">
                    <div className="key-name">{api.name}</div>
                    <div className="key-value">{api.key}</div>
                  </div>
                  <span className={`key-status ${api.status.toLowerCase()}`}>
                    {api.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="profile-section session-info">
          <h2>Session Information</h2>
          <div className="session-details">
            <div className="detail-group">
              <span className="label">Last Login:</span>
              <span className="value">May 14, 2025 09:45 AM</span>
            </div>
            <div className="detail-group">
              <span className="label">IP Address:</span>
              <span className="value">192.168.1.45</span>
            </div>
            <div className="detail-group">
              <span className="label">Browser:</span>
              <span className="value">Chrome 125.0.0.0</span>
            </div>
            <button className="logout-button">Log Out</button>
            <button className="logout-all-button">Log Out of All Devices</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;