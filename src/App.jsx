import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './app/routes/AppRoutes.jsx';
import Sidebar from './components/sidebar/Sidebar.jsx';
import './App.css'; // Let's use inline styles or standard classes if App.css is already there

export default function App() {
  // Wrap the application in a flex container to render the Sidebar side-by-side with routes
  return (
    <BrowserRouter>
      <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f9fafb' }}>
        <Sidebar />
        <main style={{ flex: 1, overflow: 'auto', padding: '24px' }}>
          <AppRoutes/>
        </main>
      </div>
    </BrowserRouter>
  );
}

