import { useNavigate } from 'react-router-dom';
import { sidebarConfig } from './sidebar.config';
import './Sidebar.css';
import logoIcon from '../../assets/icons/researchpulse_logo_icon.svg';

// Renders the top header of the Sidebar, displaying the appropriate logo.
const SidebarHeader = ({ collapsed }) => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate('/dashboard');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleLogoClick();
    }
  };

  return (
    <div 
      className={`sidebar-header ${collapsed ? 'collapsed' : ''}`} 
      onClick={handleLogoClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label="Go to Dashboard"
    >
      {collapsed ? (
        <img src={logoIcon} alt={sidebarConfig.logo?.title ?? 'Logo'} className="sidebar-logo-icon" />
      ) : (
        <div className="sidebar-logo-text-container">
          <h1 className="sidebar-logo-title">{sidebarConfig.logo?.title}</h1>
          <span className="sidebar-logo-subtitle">{sidebarConfig.logo?.subtitle}</span>
        </div>
      )}
    </div>
  );
};

export default SidebarHeader;
