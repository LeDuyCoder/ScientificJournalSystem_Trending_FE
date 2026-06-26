import React from 'react';
import DashboardHeader from '../components/header/DashboardHeader';
import DashboardContainer from '../components/layout/DashboardContainer';

export default function Journals() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
      <DashboardHeader />
      <DashboardContainer>
        <h1>Journals</h1>
        <p>Journals dashboard will be implemented here.</p>
      </DashboardContainer>
    </div>
  );
}
