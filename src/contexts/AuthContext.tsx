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
  error: string | null;
  clearError: () => void;
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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Test connection first
    testConnection();
    
    // Get initial session
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        console.error('Session error:', error);
        setError('Failed to get session');
      }
      
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
      console.log('Testing Supabase connection...');
      const { data, error } = await supabase.from('user_profiles').select('count').limit(1);
      
      if (error) {
        console.error('Supabase connection error:', error);
        setError(`Database connection failed: ${error.message}`);
      } else {
        console.log('Supabase connection successful');
        setError(null);
      }
    } catch (error: any) {
      console.error('Connection test failed:', error);
      setError(`Failed to connect to database: ${error.message}`);
    }
  };

  const loadUserProfile = async (authUser: SupabaseUser) => {
    try {
      console.log('Loading profile for user:', authUser.id);
      
      // Check if this is a newly verified user with pending signup data
      const pendingData = localStorage.getItem('pendingSignupData');
      if (pendingData && authUser.email_confirmed_at) {
        const signupData = JSON.parse(pendingData);
        if (signupData.userId === authUser.id) {
          console.log('Creating profile for newly verified user...');
          
          // Create user profile
          const profileData = {
            user_id: authUser.id,
            username: signupData.username,
            display_name: signupData.displayName,
            account_type: signupData.accountType,
            job_title: signupData.jobTitle,
            company: signupData.companyName,
            industry: signupData.industry,
            role: signupData.accountType === 'enterprise' ? 'enterprise_admin' : 'user',
            timezone: 'UTC',
            language_preference: 'en',
            theme_preference: 'dark',
            security_level: signupData.accountType === 'enterprise' ? 'enterprise' : 'standard',
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
            is_premium: signupData.accountType === 'enterprise',
            email_verified: true,
            phone_verified: false
          };

          try {
            const profile = await api.createUserProfile(profileData);
            console.log('Profile created:', profile.id);
            
            // If enterprise account, create organization
            if (signupData.accountType === 'enterprise' && signupData.companyName) {
              console.log('Creating organization...');
              const orgData = {
                name: signupData.companyName,
                industry: signupData.industry,
                size_category: 'medium',
                is_verified: false,
                is_premium: true,
                quantum_security: true,
                created_by: authUser.id
              };

              const organization = await api.createOrganization(orgData);
              console.log('Organization created:', organization.id);

              // Update user profile with enterprise_id
              await api.updateUserProfile(authUser.id, {
                enterprise_id: organization.id
              });
            }
            
            // Clear pending data
            localStorage.removeItem('pendingSignupData');
          } catch (profileError: any) {
            console.error('Profile creation error:', profileError);
          }
        }
      }
      
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
        console.log('No profile found for user');
        setUser(null);
      }
    } catch (error: any) {
      console.error('Error loading user profile:', error);
      setError(`Failed to load user profile: ${error.message}`);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (data: SignUpData) => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('Starting signup process:', { 
        email: data.email, 
        phone: data.phone, 
        accountType: data.accountType 
      });

      // Validate required fields
      if (!data.displayName.trim()) {
        throw new Error('Display name is required');
      }
      if (!data.username.trim()) {
        throw new Error('Username is required');
      }
      if (data.password.length < 6) {
        throw new Error('Password must be at least 6 characters');
      }
      if (!data.email && !data.phone) {
        throw new Error('Email or phone number is required');
      }
      if (data.accountType === 'enterprise' && !data.companyName?.trim()) {
        throw new Error('Company name is required for enterprise accounts');
      }

      // Test connection before signup
      await testConnection();
      if (error) {
        throw new Error('Database connection failed. Please try again.');
      }

      // Prepare auth data
      const authData: any = {
        password: data.password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      };

      // Use email or phone for signup
      if (data.email) {
        authData.email = data.email;
      } else if (data.phone) {
        authData.phone = data.phone;
      }

      console.log('Calling Supabase signUp with data:', {
        email: data.email,
        phone: data.phone,
        hasPassword: !!data.password
      });

      // Extract options from authData
      const { options, ...credentials } = authData;
      
      // Call signUp with proper credentials and options
      const { data: authResult, error: signUpError } = await supabase.auth.signUp(
        credentials,
        options
      );

      if (signUpError) {
        console.error('Supabase signup error:', signUpError);
        throw new Error(signUpError.message);
      }

      if (!authResult.user) {
        throw new Error('Failed to create user account');
      }

      console.log('Signup successful:', authResult.user.id);

      // Store signup data for later profile creation after email verification
      localStorage.setItem('pendingSignupData', JSON.stringify({
        userId: authResult.user.id,
        username: data.username,
        displayName: data.displayName,
        accountType: data.accountType,
        jobTitle: data.jobTitle,
        companyName: data.companyName,
        industry: data.industry
      }));

      // Show success message
      setError(null);
      console.log('Account created successfully! Please check your email for verification.');
      
    } catch (error: any) {
      console.error('Signup error:', error);
      setError(error.message || 'Failed to create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('Signing in with email:', email);
      
      // Test connection before signin
      await testConnection();
      if (error) {
        throw new Error('Database connection failed. Please try again.');
      }
      
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (signInError) {
        console.error('Sign in error:', signInError);
        throw new Error(signInError.message);
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
      setError(error.message || 'Sign in failed');
    } finally {
      setLoading(false);
    }
  };

  const signInWithPhone = async (phone: string, password: string) => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('Signing in with phone:', phone);
      
      // Test connection before signin
      await testConnection();
      if (error) {
        throw new Error('Database connection failed. Please try again.');
      }
      
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        phone,
        password
      });

      if (signInError) {
        console.error('Phone sign in error:', signInError);
        throw new Error(signInError.message);
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
      setError(error.message || 'Phone sign in failed');
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const { error: signOutError } = await supabase.auth.signOut();
      if (signOutError) throw new Error(signOutError.message);
      setUser(null);
    } catch (error: any) {
      console.error('Sign out error:', error);
      setError(error.message || 'Sign out failed');
    } finally {
      setLoading(false);
    }
  };

  const resendVerification = async (type: 'email' | 'phone') => {
    setError(null);
    
    try {
      if (type === 'email' && user?.email) {
        const { error: resendError } = await supabase.auth.resend({
          type: 'signup',
          email: user.email,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`
          }
        });
        if (resendError) throw new Error(resendError.message);
        alert('Verification email sent! Please check your inbox.');
      } else {
        throw new Error('Phone verification resend not implemented yet');
      }
    } catch (error: any) {
      console.error('Resend verification error:', error);
      setError(error.message || 'Failed to resend verification');
    }
  };

  const resetPassword = async (email: string) => {
    setError(null);
    
    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`
      });
      if (resetError) throw new Error(resetError.message);
      alert('Password reset email sent! Please check your inbox.');
    } catch (error: any) {
      console.error('Reset password error:', error);
      setError(error.message || 'Failed to reset password');
    }
  };

  const updateProfile = async (updates: Partial<User>) => {
    if (!user) return;
    
    setError(null);
    
    try {
      await api.updateUserProfile(user.id, updates);
      setUser(prev => prev ? { ...prev, ...updates } : null);
    } catch (error: any) {
      console.error('Update profile error:', error);
      setError(error.message || 'Failed to update profile');
    }
  };

  const clearError = () => {
    setError(null);
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
      updateProfile,
      error,
      clearError
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