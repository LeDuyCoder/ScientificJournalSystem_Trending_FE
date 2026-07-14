import { useLocation, useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Sidebar.css';

// Renders an individual navigation link in the sidebar menu
const SidebarItem = ({ item, collapsed }) => {
  const { t } = useTranslation();
  const location = useLocation();
  const { id, lang } = useParams();
  const currentLang = lang || 'en';

  // Build full path based on current project id from URL params or global flag
  const basePath = item.isGlobal 
    ? `/${currentLang}/${item.segment}` 
    : `/${currentLang}/project/${id || 'default-id'}/${item.segment}`;

  // Determine whether current route matches menu item to apply active styling
  const isActive = location.pathname === basePath || location.pathname.startsWith(`${basePath}/`);

  const IconComponent = item.icon;
  const translatedLabel = t(`sidebar.${item.label.toLowerCase()}`, item.label);

  return (
    <Link 
      to={basePath} 
      className={`sidebar-item ${isActive ? 'active' : ''} ${collapsed ? 'collapsed' : ''}`}
      title={collapsed ? translatedLabel : undefined} // Tooltip natively provided by title attribute when collapsed
      aria-current={isActive ? 'page' : undefined}
    >
      <div className="sidebar-item-icon">
        <IconComponent />
      </div>
      {!collapsed && <span className="sidebar-item-label">{translatedLabel}</span>}
    </Link>
  );
};

export default SidebarItem;
