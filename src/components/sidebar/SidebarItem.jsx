import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import './Sidebar.css';

// Renders an individual navigation link in the sidebar menu
const SidebarItem = ({ item, collapsed }) => {
  const location = useLocation();

  // Determine whether current route matches menu item to apply active styling
  const isActive = location.pathname === item.path;

  const IconComponent = item.icon;

  return (
    <Link 
      to={item.path} 
      className={`sidebar-item ${isActive ? 'active' : ''} ${collapsed ? 'collapsed' : ''}`}
      title={collapsed ? item.label : undefined} // Tooltip natively provided by title attribute when collapsed
    >
      <div className="sidebar-item-icon">
        <IconComponent />
      </div>
      {!collapsed && <span className="sidebar-item-label">{item.label}</span>}
    </Link>
  );
};

export default SidebarItem;
