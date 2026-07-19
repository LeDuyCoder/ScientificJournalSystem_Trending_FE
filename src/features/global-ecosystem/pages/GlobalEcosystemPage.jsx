import React, { useState } from 'react';
import GlobalStatsSection from '../components/GlobalStatsSection';
import GlobalHeatMapSection from '../components/GlobalHeatMapSection';
import ResearchLandscapeCard from '../components/ResearchLandscapeCard';
import TopEntitiesCard from '../components/TopEntitiesCard';
import ImpactQuartilesCard from '../components/ImpactQuartilesCard';
import '../styles/GlobalEcosystemPage.css';

export default function GlobalEcosystemPage() {
  const [selectedGeoCountry, setSelectedGeoCountry] = useState('');

  return (
    <div className="global-ecosystem-dashboard">
      <GlobalStatsSection />

      <div className="ecosystem-main-layout">
        <div className="ecosystem-left-col">
          <GlobalHeatMapSection
            selectedCountryCode={selectedGeoCountry}
            onCountryChange={setSelectedGeoCountry}
          />
        </div>
        <div className="ecosystem-right-col">
          <ResearchLandscapeCard />
          <TopEntitiesCard />
          <ImpactQuartilesCard />
        </div>
      </div>
    </div>
  );
}
