import React, { useState, useEffect } from 'react';
import Manifest from '@mnfst/sdk';
import LandingPage from './screens/LandingPage';
import DashboardPage from './screens/DashboardPage';
import { testBackendConnection } from './services/apiService';
import config from './constants';
import './index.css';

const manifest = new Manifest({
  baseURL: config.BACKEND_URL,
  appId: config.APP_ID
});

function App() {
  const [user, setUser] = useState(null);
  const [currentScreen, setCurrentScreen] = useState('landing');
  const [backendConnected, setBackendConnected] = useState(false);

  useEffect(() => {
    const checkConnectionAndSession = async () => {
      console.log('🚀 [APP] Starting backend connection test...');
      const result = await testBackendConnection();
      setBackendConnected(result.success);

      if (result.success) {
        console.log('✅ [APP] Backend connection successful.');
        try {
          const currentUser = await manifest.from('User').me();
          setUser(currentUser);
          setCurrentScreen('dashboard');
        } catch (error) {
          setUser(null);
          setCurrentScreen('landing');
        }
      } else {
        console.error('❌ [APP] Backend connection failed:', result.error);
      }
    };

    checkConnectionAndSession();
  }, []);

  const handleLogin = async (email, password) => {
    try {
      await manifest.login(email, password);
      const currentUser = await manifest.from('User').me();
      setUser(currentUser);
      setCurrentScreen('dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please check your credentials.');
    }
  };

  const handleLogout = async () => {
    await manifest.logout();
    setUser(null);
    setCurrentScreen('landing');
  };

  return (
    <div className="font-sans">
      <div className="fixed top-4 right-4 z-50 flex items-center space-x-2">
        <div className={`w-3 h-3 rounded-full ${backendConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${backendConnected ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {backendConnected ? 'Backend Connected' : 'Backend Disconnected'}
        </span>
      </div>

      {user ? (
        <DashboardPage user={user} onLogout={handleLogout} manifest={manifest} />
      ) : (
        <LandingPage onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
