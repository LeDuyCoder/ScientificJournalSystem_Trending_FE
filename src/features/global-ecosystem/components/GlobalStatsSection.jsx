import React from 'react';
import { useTranslation } from 'react-i18next';
import { FiUsers, FiHome, FiActivity, FiNavigation } from 'react-icons/fi';
import DashboardGrid from '../../../shared/components/layout/DashboardGrid';

const getIcon = (title) => {
  switch (title) {
    case 'TOP AUTHORS': return FiUsers;
    case 'INSTITUTIONS': return FiHome;
    case 'DENSITY INDEX': return FiActivity;
    case 'RELOCATED': return FiNavigation;
    default: return null;
  }
};

const KPIStatCard = ({ title, value, trend, trendValue, icon: Icon }) => {
  const isPositive = trend === 'up';
  const isNegative = trend === 'down';
  const isStable = trend === 'stable';

  return (
    <div className="kpi-stat-card">
      <div className="kpi-stat-header">
        <h3 className="kpi-stat-title">{title}</h3>
        {Icon && <Icon className="kpi-stat-icon" />}
      </div>
      <div className="kpi-stat-content">
        <div className="kpi-stat-details">
          <div className="kpi-stat-value">{value}</div>
          <div className={`kpi-stat-trend ${trend}`}>
            {isPositive && <span className="trend-arrow">↗</span>}
            {isNegative && <span className="trend-arrow">↘</span>}
            {isStable && <span className="trend-arrow">—</span>}
            <span className="trend-value">{trendValue}</span>
          </div>
        </div>
        <div className="kpi-stat-chart">
          <svg viewBox="0 0 100 30" className={`sparkline ${trend}`} preserveAspectRatio="none">
            {isPositive && <path d="M0,25 Q25,5 50,20 T100,5" fill="none" stroke="currentColor" strokeWidth="2" />}
            {isNegative && <path d="M0,5 Q25,25 50,10 T100,25" fill="none" stroke="currentColor" strokeWidth="2" />}
            {isStable && <path d="M0,15 L100,15" fill="none" stroke="currentColor" strokeWidth="2" />}
          </svg>
        </div>
      </div>
    </div>
  );
};

export default function GlobalStatsSection({ stats }) {
  const { t } = useTranslation();
  if (!stats) return null;

  const getLocalizedTitle = (title) => {
    switch (title) {
      case 'TOP AUTHORS': return t('dashboard.topAuthors', 'TOP AUTHORS');
      case 'INSTITUTIONS': return t('dashboard.institutions', 'INSTITUTIONS');
      case 'DENSITY INDEX': return t('dashboard.densityIndex', 'DENSITY INDEX');
      case 'RELOCATED': return t('dashboard.relocated', 'RELOCATED');
      default: return title;
    }
  };

  const getLocalizedTrendValue = (trend, val) => {
    if (trend === 'stable' && val === 'stable') return t('dashboard.stable', 'stable');
    return val;
  };

  return (
    <DashboardGrid columns={4} className="kpi-cards-grid">
      {stats.map(stat => (
        <KPIStatCard
          key={stat.title}
          title={getLocalizedTitle(stat.title)}
          value={stat.value}
          trend={stat.trend}
          trendValue={getLocalizedTrendValue(stat.trend, stat.trendValue)}
          icon={getIcon(stat.title)}
        />
      ))}
    </DashboardGrid>
  );
}
