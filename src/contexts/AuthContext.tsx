import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../lib/supabase';
import { User as SupabaseUser } from '@supabase/supabase-js';

interface User {
  id: string;
  email: string;
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
      if (session?.user) {
        await loadUserProfile(session.user);
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const loadUserProfile = async (authUser: SupabaseUser) => {
    try {
      const { data: profile, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', authUser.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error loading profile:', error);
        setLoading(false);
        return;
      }

      if (profile) {
        setUser({
          id: authUser.id,
          email: authUser.email || '',
          phone: authUser.phone || profile.phone,
          displayName: profile.display_name || 'User',
          username: profile.username || 'user',
          accountType: profile.account_type || 'individual',
          emailVerified: authUser.email_confirmed_at !== null,
          phoneVerified: authUser.phone_confirmed_at !== null,
          role: profile.role || 'user',
          enterpriseId: profile.enterprise_id,
          profile
        });
      }
    } catch (error) {
      console.error('Error in loadUserProfile:', error);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (data: SignUpData) => {
    setLoading(true);
    try {
      const authData: any = {
        password: data.password,
        options: {
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

      const { data: authResult, error } = await supabase.auth.signUp(authData);

      if (error) throw error;

      if (authResult.user) {
        // If enterprise account, create organization
        if (data.accountType === 'enterprise' && data.companyName) {
          const { data: org, error: orgError } = await supabase
            .from('organizations')
            .insert({
              name: data.companyName,
              industry: data.industry,
              created_by: authResult.user.id
            })
            .select()
            .single();

          if (!orgError && org) {
            // Update user profile with enterprise_id
            await supabase
              .from('user_profiles')
              .update({
                enterprise_id: org.id,
                role: 'enterprise_admin'
              })
              .eq('user_id', authResult.user.id);
          }
        }
      }

      // Don't set user here - wait for email/phone verification
      alert('Please check your email/phone for verification link before signing in.');
    } catch (error: any) {
      console.error('Sign up error:', error);
      throw new Error(error.message || 'Sign up failed');
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;

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
      const { data, error } = await supabase.auth.signInWithPassword({
        phone,
        password
      });

      if (error) throw error;

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
      if (type === 'email') {
        const { error } = await supabase.auth.resend({
          type: 'signup',
          email: user?.email || ''
        });
        if (error) throw error;
      } else {
        // Phone verification resend would go here
        console.log('Phone verification resend not implemented yet');
      }
    } catch (error: any) {
      console.error('Resend verification error:', error);
      throw new Error(error.message || 'Failed to resend verification');
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) throw error;
    } catch (error: any) {
      console.error('Reset password error:', error);
      throw new Error(error.message || 'Failed to reset password');
    }
  };

  const updateProfile = async (updates: Partial<User>) => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('user_profiles')
        .update(updates)
        .eq('user_id', user.id);

      if (error) throw error;

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