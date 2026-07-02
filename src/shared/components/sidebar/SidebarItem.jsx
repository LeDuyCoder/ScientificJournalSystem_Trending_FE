import { useLocation, useParams, Link } from 'react-router-dom';
import './Sidebar.css';

// Renders an individual navigation link in the sidebar menu
const SidebarItem = ({ item, collapsed }) => {
  const location = useLocation();
  const { id } = useParams();

  // Build full path based on current project id from URL params or global flag
  const basePath = item.isGlobal 
    ? `/${item.segment}` 
    : `/project/${id || 'default-id'}/${item.segment}`;

  // Determine whether current route matches menu item to apply active styling
  const isActive = location.pathname === basePath || location.pathname.startsWith(`${basePath}/`);

  const IconComponent = item.icon;

  return (
    <Link 
      to={basePath} 
      className={`sidebar-item ${isActive ? 'active' : ''} ${collapsed ? 'collapsed' : ''}`}
      title={collapsed ? item.label : undefined} // Tooltip natively provided by title attribute when collapsed
      aria-current={isActive ? 'page' : undefined}
    >
      <div className="sidebar-item-icon">
        <IconComponent />
      </div>
      {!collapsed && <span className="sidebar-item-label">{item.label}</span>}
    </Link>
  );
};

export default SidebarItem;
