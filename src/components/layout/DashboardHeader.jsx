import React, { useState } from 'react';
import { FiSearch, FiBell, FiSettings } from 'react-icons/fi';
import './DashboardHeader.css';

/**
 * DashboardHeader implements the global control system.
 * Includes search input, notification actions, settings, and user profile.
 */
export default function DashboardHeader() {
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  return (
    <header className="dashboard-header">
      {/* LEFT SIDE: Search area */}
      <div className={`dashboard-search-container ${searchFocused ? 'focused' : ''}`}>
        <FiSearch className="dashboard-search-icon" aria-hidden="true" />
        <input
          type="text"
          className="dashboard-search-input"
          placeholder="Search..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
          aria-label="Search"
        />
      </div>

      {/* RIGHT SIDE: Global actions + Profile */}
      <div className="dashboard-header-right">
        <div className="dashboard-actions">
          <button className="dashboard-icon-button" aria-label="Notifications" onClick={() => {}}>
            <FiBell />
            <span className="dashboard-notification-badge" aria-hidden="true"></span>
          </button>
          <button className="dashboard-icon-button" aria-label="Settings" onClick={() => {}}>
            <FiSettings />
          </button>
        </div>

        <div className="dashboard-profile-divider" aria-hidden="true"></div>

        <button className="dashboard-profile" aria-label="User Profile" onClick={() => {}}>
          <img
            className="dashboard-profile-avatar"
            src="https://ui-avatars.com/api/?name=Dr.+Aris+Thorne&background=F3F4F6&color=111827"
            alt="Dr. Aris Thorne avatar"
          />
          <div className="dashboard-profile-info">
            <span className="dashboard-profile-name">Dr. Aris Thorne</span>
            <span className="dashboard-profile-role">Senior Research Analyst</span>
          </div>
        </button>
      </div>
    </header>
  );
}
