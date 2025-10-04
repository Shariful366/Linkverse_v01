import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://srucepdy vdxomjpbzzkky.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNydWNlcGR5dmR4b21qcGJ6emt5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE5ODcxODEsImV4cCI6MjA2NzU2MzE4MX0.Kc30qmxlK5kvqeRvfkcytxREqfjjXeN6nNWU1EapStA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false
  },
  global: {
    headers: {
      'X-Client-Info': 'linkverse-2050'
    }
  }
});

// Database Types
export interface UserProfile {
  id: string;
  user_id: string;
  username: string;
  display_name: string;
  avatar_url?: string;
  bio?: string;
  location?: string;
  timezone: string;
  language_preference: string;
  theme_preference: string;
  security_level: 'standard' | 'enterprise' | 'quantum';
  biometric_enabled: boolean;
  geo_lock_enabled: boolean;
  stealth_mode: boolean;
  quantum_encryption: boolean;
  ai_assistant_enabled: boolean;
  wellness_monitoring: boolean;
  mood_tracking: boolean;
  ai_safety_score: number;
  job_title?: string;
  company?: string;
  industry?: string;
  experience_years: number;
  salary_range_min?: number;
  salary_range_max?: number;
  open_to_work: boolean;
  created_at: string;
  updated_at: string;
  last_active: string;
  is_verified: boolean;
  is_premium: boolean;
  phone?: string;
  email_verified: boolean;
  phone_verified: boolean;
  account_type: 'individual' | 'enterprise';
  enterprise_id?: string;
  role: 'user' | 'admin' | 'enterprise_admin' | 'super_admin';
}

export interface Organization {
  id: string;
  name: string;
  description?: string;
  industry?: string;
  size_category?: string;
  website?: string;
  email?: string;
  phone?: string;
  address?: string;
  logo_url?: string;
  banner_url?: string;
  brand_colors?: any;
  is_verified: boolean;
  is_premium: boolean;
  quantum_security: boolean;
  created_by: string;
  created_at: string;
  updated_at: string;
}

// API Functions
export const api = {
  // User Profile Management
  async createUserProfile(userData: Partial<UserProfile>): Promise<UserProfile> {
    const { data, error } = await supabase
      .from('user_profiles')
      .insert(userData)
      .select()
      .single();
    
    if (error) {
      console.error('Error creating user profile:', error);
      throw error;
    }
    return data;
  },

  async getUserProfile(userId: string): Promise<UserProfile | null> {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('user_id', userId)
      .single();
    
    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching user profile:', error);
      throw error;
    }
    return data;
  },

  async updateUserProfile(userId: string, updates: Partial<UserProfile>): Promise<UserProfile> {
    const { data, error } = await supabase
      .from('user_profiles')
      .update(updates)
      .eq('user_id', userId)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
    return data;
  },

  // Organization Management
  async createOrganization(orgData: Partial<Organization>): Promise<Organization> {
    const { data, error } = await supabase
      .from('organizations')
      .insert(orgData)
      .select()
      .single();
    
    if (error) {
      console.error('Error creating organization:', error);
      throw error;
    }
    return data;
  },

  async getOrganization(orgId: string): Promise<Organization | null> {
    const { data, error } = await supabase
      .from('organizations')
      .select('*')
      .eq('id', orgId)
      .single();
    
    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching organization:', error);
      throw error;
    }
    return data;
  },

  // Test connection
  async testConnection(): Promise<boolean> {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('count')
        .limit(1);
      
      return !error;
    } catch (error) {
      console.error('Connection test failed:', error);
      return false;
    }
  }
};