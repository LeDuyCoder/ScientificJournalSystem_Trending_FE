import React from 'react';
import { useTranslation } from 'react-i18next';
import './CollaborationAnalytics.css';

const CollaborationAnalyticsSkeleton = () => {
  const { t } = useTranslation();
  return (
    <div className="ca-page">
      <div className="kn-loading" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '400px', gap: '16px' }}>
        <div className="update-icon spin" style={{ width: '24px', height: '24px', border: '3px solid var(--color-primary-orange)', borderTopColor: 'transparent', borderRadius: '50%' }}></div>
        <div>{t('common.loading', 'Loading...')}</div>
      </div>
    </div>
  );
};

export default CollaborationAnalyticsSkeleton;
