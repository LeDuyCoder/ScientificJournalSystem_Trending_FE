import React from 'react';
import KPIStatCard from './visualizations/KPIStatCard';
import WorldHeatMap from './visualizations/WorldHeatMap';
import ResearchLandscape from './visualizations/ResearchLandscape';
import RankingList from './visualizations/RankingList';
import DonutChart from './visualizations/DonutChart';
import DashboardGrid from '../layout/DashboardGrid';
import { FiUsers, FiHome, FiActivity, FiNavigation } from 'react-icons/fi';
import './GlobalEcosystemDashboard.css';

export default function GlobalEcosystemDashboard() {
  const topEntitiesData = [
    { name: 'Stanford University', value: 94.2, displayValue: '94.2k' },
    { name: 'ETH Zürich', value: 81.5, displayValue: '81.5k' },
    { name: 'Tsinghua Univ.', value: 77.9, displayValue: '77.9k' },
    { name: 'Max Planck Inst.', value: 64.0, displayValue: '64.0k' },
  ];

  const heatMapData = [
    { country: 'US', intensity: 90 },
    { country: 'China', intensity: 85 },
    { country: 'Germany', intensity: 60 },
    { country: 'UK', intensity: 75 },
    { country: 'Japan', intensity: 70 },
    { country: 'France', intensity: 50 },
    { country: 'Canada', intensity: 55 },
    { country: 'Australia', intensity: 45 },
    { country: 'India', intensity: 65 }
  ];

  const landscapeData = [
    { name: 'Biotech', value: 42 },
    { name: 'AI', value: 28 },
    { name: 'Materials', value: 15 }
  ];

  return (
    <div className="global-ecosystem-dashboard">
      <DashboardGrid columns={4} className="kpi-cards-grid">
        <KPIStatCard
          title="TOP AUTHORS"
          value="12,842"
          trend="up"
          trendValue="14.2%"
          icon={FiUsers}
        />
        <KPIStatCard
          title="INSTITUTIONS"
          value="4,912"
          trend="up"
          trendValue="8.5%"
          icon={FiHome}
        />
        <KPIStatCard
          title="DENSITY INDEX"
          value="0.84"
          trend="stable"
          trendValue="stable"
          icon={FiActivity}
        />
        <KPIStatCard
          title="RELOCATED"
          value="921"
          trend="down"
          trendValue="2.1%"
          icon={FiNavigation}
        />
      </DashboardGrid>

      <div className="ecosystem-main-layout">
        <div className="ecosystem-left-col">
          <WorldHeatMap data={heatMapData} />
        </div>
        <div className="ecosystem-right-col">
          <ResearchLandscape data={landscapeData} />
          <RankingList title="Top Entities" items={topEntitiesData} />
          <DonutChart 
            title="Impact Quartiles" 
            description="Ratio of publications in top 25% of citation rankings"
            percentage={65}
            label="Q1"
          />
        </div>
      </div>
    </div>
  );
}
