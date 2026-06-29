import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar';
import AppHeader from './AppHeader/AppHeader';
import '../../App.css';

/**
 * DashboardLayout - Shared layout component.
 * Includes the Sidebar, Header, and Main Content area.
 */
const DashboardLayout = () => {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="app-main-content-wrapper" style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
        <AppHeader />
        <main className="app-main-content" style={{ display: 'flex', flexDirection: 'column' }}>
          <Outlet /> 
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
