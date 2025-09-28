/*
  # User Profiles and Authentication Setup

  1. New Tables
    - `user_profiles` - Extended user information with enterprise features
    - Update existing tables for proper RLS

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
    - Enterprise-level security policies

  3. Authentication
    - Email and phone verification support
    - Enterprise account types
    - Profile management
*/

-- Enable RLS on existing tables if not already enabled
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE meetings ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_postings ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Create users table if it doesn't exist (for auth.users reference)
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT auth.uid(),
  email text UNIQUE,
  phone text UNIQUE,
  email_verified boolean DEFAULT false,
  phone_verified boolean DEFAULT false,
  account_type text DEFAULT 'individual' CHECK (account_type IN ('individual', 'enterprise')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Update user_profiles table structure
DO $$
BEGIN
  -- Add missing columns if they don't exist
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'user_profiles' AND column_name = 'phone') THEN
    ALTER TABLE user_profiles ADD COLUMN phone text;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'user_profiles' AND column_name = 'email_verified') THEN
    ALTER TABLE user_profiles ADD COLUMN email_verified boolean DEFAULT false;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'user_profiles' AND column_name = 'phone_verified') THEN
    ALTER TABLE user_profiles ADD COLUMN phone_verified boolean DEFAULT false;
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'user_profiles' AND column_name = 'account_type') THEN
    ALTER TABLE user_profiles ADD COLUMN account_type text DEFAULT 'individual' CHECK (account_type IN ('individual', 'enterprise'));
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'user_profiles' AND column_name = 'enterprise_id') THEN
    ALTER TABLE user_profiles ADD COLUMN enterprise_id uuid REFERENCES organizations(id);
  END IF;
  
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'user_profiles' AND column_name = 'role') THEN
    ALTER TABLE user_profiles ADD COLUMN role text DEFAULT 'user' CHECK (role IN ('user', 'admin', 'enterprise_admin', 'super_admin'));
  END IF;
END $$;

-- RLS Policies for users table
DROP POLICY IF EXISTS "Users can view own data" ON users;
CREATE POLICY "Users can view own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own data" ON users;
CREATE POLICY "Users can update own data"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Enhanced RLS Policies for user_profiles
DROP POLICY IF EXISTS "Users can view their own profile" ON user_profiles;
CREATE POLICY "Users can view their own profile"
  ON user_profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert their own profile" ON user_profiles;
CREATE POLICY "Users can insert their own profile"
  ON user_profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own profile" ON user_profiles;
CREATE POLICY "Users can update their own profile"
  ON user_profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Enterprise admin can view profiles in their organization
DROP POLICY IF EXISTS "Enterprise admins can view org profiles" ON user_profiles;
CREATE POLICY "Enterprise admins can view org profiles"
  ON user_profiles
  FOR SELECT
  TO authenticated
  USING (
    enterprise_id IN (
      SELECT enterprise_id 
      FROM user_profiles 
      WHERE user_id = auth.uid() 
      AND role IN ('enterprise_admin', 'super_admin')
    )
  );

-- RLS Policies for organizations
DROP POLICY IF EXISTS "Users can view their organization" ON organizations;
CREATE POLICY "Users can view their organization"
  ON organizations
  FOR SELECT
  TO authenticated
  USING (
    id IN (
      SELECT enterprise_id 
      FROM user_profiles 
      WHERE user_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Enterprise admins can manage organizations" ON organizations;
CREATE POLICY "Enterprise admins can manage organizations"
  ON organizations
  FOR ALL
  TO authenticated
  USING (
    created_by = auth.uid() OR
    id IN (
      SELECT enterprise_id 
      FROM user_profiles 
      WHERE user_id = auth.uid() 
      AND role IN ('enterprise_admin', 'super_admin')
    )
  );

-- RLS Policies for employees
DROP POLICY IF EXISTS "Users can view their own employee record" ON employees;
CREATE POLICY "Users can view their own employee record"
  ON employees
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Enterprise admins can manage employees" ON employees;
CREATE POLICY "Enterprise admins can manage employees"
  ON employees
  FOR ALL
  TO authenticated
  USING (
    organization_id IN (
      SELECT enterprise_id 
      FROM user_profiles 
      WHERE user_id = auth.uid() 
      AND role IN ('enterprise_admin', 'super_admin')
    )
  );

-- RLS Policies for meetings
DROP POLICY IF EXISTS "Users can view meetings they participate in" ON meetings;
CREATE POLICY "Users can view meetings they participate in"
  ON meetings
  FOR SELECT
  TO authenticated
  USING (
    host_id = auth.uid() OR
    id IN (
      SELECT meeting_id 
      FROM meeting_participants 
      WHERE user_id = auth.uid()
    )
  );

DROP POLICY IF EXISTS "Users can create meetings" ON meetings;
CREATE POLICY "Users can create meetings"
  ON meetings
  FOR INSERT
  TO authenticated
  WITH CHECK (host_id = auth.uid());

DROP POLICY IF EXISTS "Hosts can update their meetings" ON meetings;
CREATE POLICY "Hosts can update their meetings"
  ON meetings
  FOR UPDATE
  TO authenticated
  USING (host_id = auth.uid());

DROP POLICY IF EXISTS "Hosts can delete their meetings" ON meetings;
CREATE POLICY "Hosts can delete their meetings"
  ON meetings
  FOR DELETE
  TO authenticated
  USING (host_id = auth.uid());

-- Function to handle user profile creation
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO user_profiles (
    user_id,
    username,
    display_name,
    account_type,
    email_verified,
    phone_verified
  )
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'display_name', 'User'),
    COALESCE(NEW.raw_user_meta_data->>'account_type', 'individual'),
    NEW.email_confirmed_at IS NOT NULL,
    NEW.phone_confirmed_at IS NOT NULL
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for automatic profile creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();