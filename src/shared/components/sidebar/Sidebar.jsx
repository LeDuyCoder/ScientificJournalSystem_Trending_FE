import { useState, useEffect } from 'react';
import SidebarHeader from './SidebarHeader';
import SidebarItem from './SidebarItem';
import SidebarFooter from './SidebarFooter';
import { sidebarConfig } from './sidebar.config';
import { FiMenu, FiX } from 'react-icons/fi';
import './Sidebar.css';

// Reusable left sidebar component orchestrating header, navigation, and footer
const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Handle responsive collapse behavior based on window width
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        // Mobile: sidebar is hidden by default, toggled by hamburger
        setCollapsed(false);
      } else if (width >= 768 && width < 1024) {
        // Tablet: auto collapse
        setCollapsed(true);
        setMobileOpen(false);
      } else {
        // Desktop: full sidebar
        setCollapsed(false);
        setMobileOpen(false);
      }
    };

    // Initial check
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Toggle mobile overlay menu
  const toggleMobileMenu = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      {/* Mobile hamburger button */}
      <button 
        className="sidebar-mobile-toggle" 
        onClick={toggleMobileMenu}
        aria-label="Toggle Navigation Menu"
        aria-expanded={mobileOpen}
      >
        <FiMenu />
      </button>

      {/* Backdrop for mobile menu */}
      {mobileOpen && (
        <div 
          className="sidebar-mobile-backdrop" 
          onClick={toggleMobileMenu}
          aria-hidden="true"
        ></div>
      )}

      <aside className={`sidebar ${collapsed ? 'collapsed' : ''} ${mobileOpen ? 'mobile-open' : ''}`}>
        {/* Mobile close button (only visible inside sidebar on mobile) */}
        {mobileOpen && (
          <button 
            className="sidebar-mobile-close" 
            onClick={toggleMobileMenu}
            aria-label="Close Navigation Menu"
          >
            <FiX />
          </button>
        )}

        <SidebarHeader collapsed={collapsed} />
        
        <nav className="sidebar-menu" aria-label="Main Navigation">
          {sidebarConfig.menuItems.map((item, index) => (
            <SidebarItem key={index} item={item} collapsed={collapsed} />
          ))}
        </nav>
        
        <SidebarFooter collapsed={collapsed} />
      </aside>
    </>
  );
};

export default Sidebar;
