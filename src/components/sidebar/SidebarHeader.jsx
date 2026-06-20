import React from 'react';
import { useNavigate } from 'react-router-dom';
import { sidebarConfig } from './sidebar.config';
import './Sidebar.css';

// Renders the top header of the Sidebar, displaying the logo text depending on the collapsed state.
const SidebarHeader = ({ collapsed }) => {
  const navigate = useNavigate();

  // Navigate to dashboard on logo click
  const handleLogoClick = () => {
    navigate('/dashboard');
  };

  return (
    <div className={`sidebar-header ${collapsed ? 'collapsed' : ''}`} onClick={handleLogoClick}>
      {collapsed ? (
        <img src={sidebarConfig.logo.icon} alt={sidebarConfig.logo.title} className="sidebar-logo-icon" />
      ) : (
        <div className="sidebar-logo-text-container">
          <h1 className="sidebar-logo-title">{sidebarConfig.logo.title}</h1>
          <p className="sidebar-logo-subtitle">{sidebarConfig.logo.subtitle}</p>
        </div>
      )}
    </div>
  );
};

export default SidebarHeader;
