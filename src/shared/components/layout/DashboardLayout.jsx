import React from 'react';
import { Outlet, useParams, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Sidebar from '../sidebar/Sidebar';
import AppHeader from './AppHeader/AppHeader';
import { DashboardProvider } from '../../../features/dashboard/contexts/DashboardContext';
import { useProjectPreload } from '../../../features/dashboard/hooks/useProjectPreload';


/**
 * DashboardLayoutInner - component to run hooks that need DashboardContext
 */
const DashboardLayoutInner = () => {
  const { isLoading, progress, completedQueries, totalQueries } = useProjectPreload();
  const { t } = useTranslation();

  return (
    <div className="app-container">
      <Sidebar />
      <div className="app-main-content-wrapper">
        <AppHeader />
        <main className="app-main-content" style={{ position: 'relative' }}>
          {isLoading && (
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--color-background)', zIndex: 10 }}>
               <div className="update-icon spin" style={{ width: '48px', height: '48px', border: '4px solid var(--color-primary-orange)', borderTopColor: 'transparent', borderRadius: '50%', marginBottom: '16px' }}></div>
               <div style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--color-neutral-800)', marginBottom: '8px' }}>
                 {t('common.loadingProject', 'Loading Project Data...')}
               </div>
               <div style={{ fontSize: '14px', color: 'var(--color-neutral-600)', marginBottom: '16px' }}>
                 Tải dữ liệu phân tích ({completedQueries}/{totalQueries})
               </div>
               <div style={{ width: '200px', height: '6px', backgroundColor: 'var(--color-neutral-200)', borderRadius: '3px', overflow: 'hidden' }}>
                 <div style={{ width: `${progress}%`, height: '100%', backgroundColor: 'var(--color-primary-orange)', transition: 'width 0.3s ease' }}></div>
               </div>
            </div>
          )}
          <div style={{ opacity: isLoading ? 0 : 1, transition: 'opacity 0.2s', height: '100%' }}>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

/**
 * DashboardLayout - Shared layout component.
 */
const DashboardLayout = () => {
  const { id } = useParams();

  if (id === 'default-id') {
    return <Navigate to="/projects" replace />;
  }

  return (
    <DashboardProvider projectId={id}>
      <DashboardLayoutInner />
    </DashboardProvider>
  );
};

export default DashboardLayout;
