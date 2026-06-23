import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar';
import '../../App.css';

/**
 * Main layout component that includes the sidebar.
 * It uses an Outlet to render nested routes.
 */
const MainLayout = () => {
  return (
    <div className="app-container">
      <Sidebar />
      <main className="app-main-content">
        <Outlet /> 
      </main>
    </div>
  );
};

export default MainLayout;
