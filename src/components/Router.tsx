import React from 'react';
import { useState } from 'react';
import { LoginScreen } from './auth/LoginScreen';
import { MainDashboard } from './dashboard/MainDashboard';
import { useAuth } from '../contexts/AuthContext';

export const Router: React.FC = () => {
  const { user } = useAuth();
  const [currentView, setCurrentView] = useState<'login' | 'dashboard'>('login');

  if (!user && currentView === 'login') {
    return <LoginScreen onLogin={() => setCurrentView('dashboard')} />;
  }

  return <MainDashboard />;
};