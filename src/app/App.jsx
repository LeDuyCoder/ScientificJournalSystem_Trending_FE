import React from 'react';
import { useLocation } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes.jsx';
import AppProviders from './providers/AppProviders.jsx';
import ChatbotWidget from '../shared/components/chatbot/ChatbotWidget';

export default function App() {
  const location = useLocation();
  const isEmbedRoute = location.pathname.includes('/embed/');

  return (
    <AppProviders>
      <AppRoutes />
      {!isEmbedRoute && <ChatbotWidget />}
    </AppProviders>
  );
}
