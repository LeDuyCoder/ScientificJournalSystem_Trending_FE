import React from 'react';
import AppRoutes from './routes/AppRoutes.jsx';
import AppProviders from './providers/AppProviders.jsx';

export default function App() {
  return (
    <AppProviders>
      <AppRoutes />
    </AppProviders>
  );
}
