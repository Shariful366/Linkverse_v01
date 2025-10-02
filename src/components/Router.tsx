import React from 'react';
import { LoginScreen } from './auth/LoginScreen';
import { MainDashboard } from './dashboard/MainDashboard';
import { LoadingScreen } from './LoadingScreen';
import { useAuth } from '../contexts/AuthContext';

export const Router: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  if (!user) {
    return <LoginScreen />;
  }

  return <MainDashboard />;
};