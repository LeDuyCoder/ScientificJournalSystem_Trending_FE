import React from 'react';
import { useNavigate } from 'react-router-dom';
import { sidebarConfig } from './sidebar.config';
import './Sidebar.css';
import logoFull from '../../assets/icons/researchpulse_logo_full.svg';
import logoIcon from '../../assets/icons/researchpulse_logo_icon.svg';

// Renders the top header of the Sidebar, displaying the appropriate logo.
const SidebarHeader = ({ collapsed }) => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/dashboard');
  };

  return (
    <div className={`sidebar-header ${collapsed ? 'collapsed' : ''}`} onClick={handleLogoClick}>
      {collapsed ? (
        <img src={logoIcon} alt={sidebarConfig.logo?.title ?? 'Logo'} className="sidebar-logo-icon" />
      ) : (
        <img src={logoFull} alt={sidebarConfig.logo?.title ?? 'Logo'} className="sidebar-logo-full" />
      )}
    </div>
  );
};

export default SidebarHeader;

