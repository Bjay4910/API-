import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const MainLayout = ({ children }) => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const menuItems = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/profile', label: 'Profile', icon: '👤' },
    { path: '/documentation', label: 'Documentation', icon: '📚' },
  ];

  return (
    <div className="app-container">
      <div className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
        <div className="logo-container">
          <h2>{collapsed ? 'API' : 'API Dashboard'}</h2>
          <button className="toggle-button" onClick={toggleSidebar}>
            {collapsed ? '►' : '◄'}
          </button>
        </div>
        <nav className="menu">
          <ul>
            {menuItems.map((item) => (
              <li key={item.path} className={location.pathname === item.path ? 'active' : ''}>
                <Link to={item.path}>
                  <span className="icon">{item.icon}</span>
                  {!collapsed && <span className="label">{item.label}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="sidebar-footer">
          {!collapsed && <p>API Dashboard v1.0</p>}
        </div>
      </div>
      <div className="main-content">
        <header className="header">
          <div className="header-content">
            <h1>API Dashboard</h1>
            <div className="user-menu">
              <span className="user-name">King James</span>
              <div className="avatar">KJ</div>
            </div>
          </div>
        </header>
        <main className="content">
          {children}
        </main>
        <footer className="footer">
          <p>&copy; 2025 API Dashboard. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default MainLayout;