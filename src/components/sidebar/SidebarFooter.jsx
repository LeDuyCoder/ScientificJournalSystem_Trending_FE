import { useNavigate } from 'react-router-dom';
import { sidebarConfig } from './sidebar.config';
import './Sidebar.css';

// Renders the footer actions of the sidebar like Support and Sign Out
const SidebarFooter = ({ collapsed }) => {
  const navigate = useNavigate();

  // Handle footer action clicks dynamically based on action type
  const handleAction = (action) => {
    if (action === 'logout') {
      // Mock logout behavior
      localStorage.clear();
      navigate('/login');
    } else if (action === 'support') {
      navigate('/support');
    }
  };

  return (
    <div className="sidebar-footer">
      {sidebarConfig.footerItems.map((item, index) => {
        const IconComponent = item.icon;
        return (
          <button 
            key={index} 
            className={`sidebar-footer-item ${collapsed ? 'collapsed' : ''}`}
            onClick={() => handleAction(item.action)}
            title={collapsed ? item.label : undefined}
            aria-label={item.label}
          >
            <div className="sidebar-item-icon">
              <IconComponent />
            </div>
            {!collapsed && <span className="sidebar-item-label">{item.label}</span>}
          </button>
        );
      })}
    </div>
  );
};

export default SidebarFooter;
