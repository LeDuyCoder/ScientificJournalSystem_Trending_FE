import React from 'react';
import AppRoutes from './routes/AppRoutes.jsx';
import AppProviders from './providers/AppProviders.jsx';
import ChatbotWidget from '../shared/components/chatbot/ChatbotWidget';

export default function App() {
  return (
    <AppProviders>
      <AppRoutes />
      <ChatbotWidget />
    </AppProviders>
  );
}
