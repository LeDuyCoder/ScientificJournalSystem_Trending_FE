import React from 'react';
import { Outlet, useParams, Navigate } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar';
import AppHeader from './AppHeader/AppHeader';
import { DashboardProvider } from '../../../features/dashboard/contexts/DashboardContext';

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
    <DashboardProvider projectId={id}>
      <div className="app-container">
        <Sidebar />
        <div className="app-main-content-wrapper">
          <AppHeader />
          <main className="app-main-content">
            <Outlet /> 
          </main>
        </div>
      </div>
    </DashboardProvider>
  );
};

export default DashboardLayout;
