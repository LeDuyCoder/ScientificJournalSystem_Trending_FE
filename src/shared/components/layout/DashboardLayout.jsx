import React from 'react';
import { Outlet, useParams, Navigate } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar';
import AppHeader from './AppHeader/AppHeader';

/**
 * DashboardLayout - Shared layout component.
 * Includes the Sidebar, Header, and Main Content area.
 */
const DashboardLayout = () => {
  const { id } = useParams();

  if (id === 'default-id') {
    return <Navigate to="/projects" replace />;
  }

  return (
    <div className="app-container">
      <Sidebar />
      <div className="app-main-content-wrapper" style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 }}>
        <AppHeader />
        <main className="app-main-content">
          <Outlet /> 
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
