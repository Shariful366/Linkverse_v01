import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase, api } from '../lib/supabase';
import { User as SupabaseUser } from '@supabase/supabase-js';

interface User {
  id: string;
  email?: string;
  phone?: string;
  displayName: string;
  username: string;
  accountType: 'individual' | 'enterprise';
  emailVerified: boolean;
  phoneVerified: boolean;
  role: 'user' | 'admin' | 'enterprise_admin' | 'super_admin';
  enterpriseId?: string;
  profile?: any;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signUp: (data: SignUpData) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithPhone: (phone: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  resendVerification: (type: 'email' | 'phone') => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: (updates: Partial<User>) => Promise<void>;
}

interface SignUpData {
  email?: string;
  phone?: string;
  password: string;
  displayName: string;
  username: string;
  accountType: 'individual' | 'enterprise';
  companyName?: string;
  jobTitle?: string;
  industry?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Test Supabase connection first
    testConnection();
    
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        loadUserProfile(session.user);
      } else {
        setLoading(false);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event, session?.user?.id);
      
      if (session?.user) {
        await loadUserProfile(session.user);
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const testConnection = async () => {
    try {
      const isConnected = await api.testConnection();
      console.log('Supabase connection test:', isConnected ? 'SUCCESS' : 'FAILED');
    } catch (error) {
      console.error('Supabase connection error:', error);
    }
  };

  const loadUserProfile = async (authUser: SupabaseUser) => {
    try {
      console.log('Loading profile for user:', authUser.id);
      
      const profile = await api.getUserProfile(authUser.id);
      
      if (profile) {
        setUser({
          id: authUser.id,
          email: authUser.email,
          phone: authUser.phone,
          displayName: profile.display_name,
          username: profile.username,
          accountType: profile.account_type,
          emailVerified: authUser.email_confirmed_at !== null,
          phoneVerified: authUser.phone_confirmed_at !== null,
          role: profile.role,
          enterpriseId: profile.enterprise_id,
          profile
        });
      } else {
        // Profile doesn't exist, user needs to complete registration
        console.log('No profile found for user, staying on auth screen');
        setUser(null);
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (data: SignUpData) => {
    setLoading(true);
    try {
      console.log('Starting signup process:', { 
        email: data.email, 
        phone: data.phone, 
        accountType: data.accountType 
      });

      // Prepare auth data
      const authData: any = {
        password: data.password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          data: {
            display_name: data.displayName,
            username: data.username,
            account_type: data.accountType,
            company_name: data.companyName,
            job_title: data.jobTitle,
            industry: data.industry
          }
        }
      };

      // Use email or phone for signup
      if (data.email) {
        authData.email = data.email;
      } else if (data.phone) {
        authData.phone = data.phone;
      } else {
        throw new Error('Email or phone number is required');
      }

      console.log('Calling Supabase signUp...');
      const { data: authResult, error } = await supabase.auth.signUp(authData);

      if (error) {
        console.error('Supabase signup error:', error);
        throw error;
      }

      console.log('Signup successful:', authResult.user?.id);

      if (authResult.user) {
        // Create user profile
        const profileData = {
          user_id: authResult.user.id,
          username: data.username,
          display_name: data.displayName,
          account_type: data.accountType,
          job_title: data.jobTitle,
          company: data.companyName,
          industry: data.industry,
          role: data.accountType === 'enterprise' ? 'enterprise_admin' : 'user',
          timezone: 'UTC',
          language_preference: 'en',
          theme_preference: 'dark',
          security_level: data.accountType === 'enterprise' ? 'enterprise' : 'standard',
          biometric_enabled: false,
          geo_lock_enabled: false,
          stealth_mode: false,
          quantum_encryption: true,
          ai_assistant_enabled: true,
          wellness_monitoring: true,
          mood_tracking: false,
          ai_safety_score: 100,
          experience_years: 0,
          open_to_work: false,
          is_verified: false,
          is_premium: data.accountType === 'enterprise',
          email_verified: false,
          phone_verified: false
        };

        console.log('Creating user profile...');
        const profile = await api.createUserProfile(profileData);
        console.log('Profile created:', profile.id);

        // If enterprise account, create organization
        if (data.accountType === 'enterprise' && data.companyName) {
          console.log('Creating organization...');
          const orgData = {
            name: data.companyName,
            industry: data.industry,
            size_category: 'medium',
            is_verified: false,
            is_premium: true,
            quantum_security: true,
            created_by: authResult.user.id
          };

          const organization = await api.createOrganization(orgData);
          console.log('Organization created:', organization.id);

          // Update user profile with enterprise_id
          await api.updateUserProfile(authResult.user.id, {
            enterprise_id: organization.id
          });
        }
      }

      // Show success message
      alert('Account created successfully! Please check your email/phone for verification link.');
      
    } catch (error: any) {
      console.error('Signup error:', error);
      throw new Error(error.message || 'Failed to create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      console.log('Signing in with email:', email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        console.error('Sign in error:', error);
        throw error;
      }

      console.log('Sign in successful:', data.user?.id);

      if (data.user) {
        // Check if email is verified
        if (!data.user.email_confirmed_at) {
          await supabase.auth.signOut();
          throw new Error('Please verify your email before signing in.');
        }
        
        await loadUserProfile(data.user);
      }
    } catch (error: any) {
      console.error('Sign in error:', error);
      throw new Error(error.message || 'Sign in failed');
    } finally {
      setLoading(false);
    }
  };

  const signInWithPhone = async (phone: string, password: string) => {
    setLoading(true);
    try {
      console.log('Signing in with phone:', phone);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        phone,
        password
      });

      if (error) {
        console.error('Phone sign in error:', error);
        throw error;
      }

      if (data.user) {
        // Check if phone is verified
        if (!data.user.phone_confirmed_at) {
          await supabase.auth.signOut();
          throw new Error('Please verify your phone number before signing in.');
        }
        
        await loadUserProfile(data.user);
      }
    } catch (error: any) {
      console.error('Phone sign in error:', error);
      throw new Error(error.message || 'Phone sign in failed');
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
    } catch (error: any) {
      console.error('Sign out error:', error);
      throw new Error(error.message || 'Sign out failed');
    } finally {
      setLoading(false);
    }
  };

  const resendVerification = async (type: 'email' | 'phone') => {
    try {
      if (type === 'email' && user?.email) {
        const { error } = await supabase.auth.resend({
          type: 'signup',
          email: user.email
        });
        if (error) throw error;
      } else {
        console.log('Phone verification resend not implemented yet');
      }
    } catch (error: any) {
      console.error('Resend verification error:', error);
      throw new Error(error.message || 'Failed to resend verification');
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`
      });
      if (error) throw error;
    } catch (error: any) {
      console.error('Reset password error:', error);
      throw new Error(error.message || 'Failed to reset password');
    }
  };

  const updateProfile = async (updates: Partial<User>) => {
    if (!user) return;
    
    try {
      await api.updateUserProfile(user.id, updates);
      setUser(prev => prev ? { ...prev, ...updates } : null);
    } catch (error: any) {
      console.error('Update profile error:', error);
      throw new Error(error.message || 'Failed to update profile');
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      signUp,
      signIn,
      signInWithPhone,
      signOut,
      resendVerification,
      resetPassword,
      updateProfile
    }}>
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