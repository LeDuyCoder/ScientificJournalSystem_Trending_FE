import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './app/routes/AppRoutes.jsx';
import Sidebar from './components/sidebar/Sidebar.jsx';
import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <Sidebar />
        <main className="app-main-content">
          <AppRoutes/>
        </main>
      </div>
    </BrowserRouter>
  );
}
