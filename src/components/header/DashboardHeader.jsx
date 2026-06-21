import { useState } from 'react';
import { FiBell, FiSettings } from 'react-icons/fi';
import SearchInput from './SearchInput';
import IconButton from './IconButton';
import UserProfile from './UserProfile';
import './Header.css';

/**
 * DashboardHeader component
 * Orchestrates search input on the left and actions + user profile on the right.
 * Supports sticky header configuration.
 */
const DashboardHeader = ({
  sticky = true,
  onSearch,
  onNotificationClick = () => console.log('Notification clicked'),
  onSettingsClick = () => console.log('Settings clicked'),
  notificationCount = 3,
  userInitials = "AT",
  userName = "Dr. Aris Thorne",
  userRole = "Senior Researcher",
  searchPlaceholder = "Search research, journals, or authors..."
}) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  return (
    <header className={`dashboard-header ${sticky ? 'sticky' : ''}`}>
      <div className="header-left">
        <SearchInput 
          value={searchValue} 
          onChange={handleSearchChange} 
          placeholder={searchPlaceholder}
        />
      </div>
      <div className="header-right">
        <div className="header-actions">
          <IconButton 
            icon={FiBell} 
            onClick={onNotificationClick} 
            ariaLabel="Notifications" 
            badge={notificationCount}
          />
          <IconButton 
            icon={FiSettings} 
            onClick={onSettingsClick} 
            ariaLabel="Settings" 
          />
        </div>
        <div className="header-divider" aria-hidden="true"></div>
        <UserProfile 
          initials={userInitials} 
          name={userName} 
          role={userRole} 
        />
      </div>
    </header>
  );
};

export default DashboardHeader;
