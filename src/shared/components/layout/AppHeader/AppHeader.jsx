import { useState } from 'react';
import SearchInput from './SearchInput';
import IconButton from './IconButton';
import UserProfile from './UserProfile';
import { headerConfig } from './header.config';
import './Header.css';

/**
 * AppHeader component
 * Orchestrates search input on the left and actions + user profile on the right.
 * Supports sticky header configuration.
 */
const AppHeader = ({
  sticky = true,
  onSearch,
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
          placeholder={headerConfig.searchPlaceholder}
        />
      </div>
      <div className="header-right">
        <div className="header-actions">
          {headerConfig.icons.map((iconConfig) => (
            <IconButton 
              key={iconConfig.id}
              icon={iconConfig.icon} 
              onClick={() => console.log(`${iconConfig.id} clicked`)} 
              ariaLabel={iconConfig.ariaLabel} 
              badge={iconConfig.badge}
            />
          ))}
        </div>
        <div className="header-divider" aria-hidden="true"></div>
        <UserProfile 
          initials={headerConfig.userProfile.initials} 
          name={headerConfig.userProfile.name} 
          role={headerConfig.userProfile.role} 
        />
      </div>
    </header>
  );
};

export default AppHeader;
