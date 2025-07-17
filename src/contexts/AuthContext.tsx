import React, { createContext, useContext, useState, ReactNode } from 'react';
import { supabase } from '../lib/supabase';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  securityLevel: 'quantum' | 'enterprise' | 'standard';
  biometricEnabled: boolean;
  geoLockEnabled: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, method?: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  signUp: (email: string, password: string, userData?: any) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Check for existing session on mount
  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          name: session.user.user_metadata?.display_name || 'User',
          email: session.user.email || '',
          securityLevel: 'quantum',
          biometricEnabled: true,
          geoLockEnabled: true
        });
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          name: session.user.user_metadata?.display_name || 'User',
          email: session.user.email || '',
          securityLevel: 'quantum',
          biometricEnabled: true,
          geoLockEnabled: true
        });
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);
  const login = async (email: string, password: string, method = 'email') => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;

      if (data.user) {
        setUser({
          id: data.user.id,
          name: data.user.user_metadata?.display_name || 'User',
          email: data.user.email || '',
          securityLevel: 'quantum',
          biometricEnabled: true,
          geoLockEnabled: true
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
    setIsLoading(false);
  };

  const signUp = async (email: string, password: string, userData?: any) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData
        }
      });

      if (error) throw error;

      if (data.user) {
        // Create user profile
        await supabase
          .from('user_profiles')
          .insert({
            user_id: data.user.id,
            username: userData?.username || email.split('@')[0],
            display_name: userData?.display_name || 'User',
            email: email
          });
      }
    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    }
    setIsLoading(false);
  };
  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};