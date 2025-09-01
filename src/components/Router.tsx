import React from 'react';
import { LoginScreen } from './auth/LoginScreen';
import { MainDashboard } from './dashboard/MainDashboard';
import { useAuth } from '../contexts/AuthContext';

export const Router: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return <LoginScreen />;
  }

  return <MainDashboard />;
};