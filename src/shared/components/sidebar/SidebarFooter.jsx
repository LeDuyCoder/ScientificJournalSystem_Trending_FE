import { useNavigate } from 'react-router-dom';
import { sidebarConfig } from './sidebar.config';
import { useUserProfileQuery } from '../../hooks/useUserProfile';
import './Sidebar.css';

// Renders the footer actions of the sidebar like Support and Sign Out
const SidebarFooter = ({ collapsed }) => {
  const navigate = useNavigate();
  const { data: userProfile } = useUserProfileQuery();
  const profile = {
    initials: userProfile?.initials || sidebarConfig.userProfile.initials,
    name: userProfile?.displayName || sidebarConfig.userProfile.name,
    role: userProfile?.displayRole || sidebarConfig.userProfile.role,
    avatar: userProfile?.avatar || null
  };

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
      <div 
        className={`sidebar-profile ${collapsed ? 'collapsed' : ''}`}
        title={`${profile.name} (${profile.role})`}
      >
        <div className="sidebar-profile-avatar">
          <span className="sidebar-profile-initials">{profile.initials}</span>
          {profile.avatar && (
            <img
              className="sidebar-profile-image"
              src={profile.avatar}
              alt={profile.name}
              onError={(event) => {
                event.currentTarget.style.display = 'none';
              }}
            />
          )}
        </div>
        {!collapsed && (
          <div className="sidebar-profile-info">
            <span className="sidebar-profile-name">{profile.name}</span>
            <span className="sidebar-profile-role">{profile.role}</span>
          </div>
        )}
      </div>
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
