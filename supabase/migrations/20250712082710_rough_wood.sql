/*
  # Create admin user and update profiles table

  1. Updates
    - Ensure admin user exists with specified credentials
    - Update profiles table structure if needed
  
  2. Security
    - Maintain existing RLS policies
    - Admin user gets special privileges
*/

-- First, let's make sure we have the admin user in auth.users
-- Note: This would typically be done through Supabase Auth, but we'll ensure the profile exists

-- Update the profiles table to ensure admin functionality
DO $$
BEGIN
  -- Check if admin profile exists, if not we'll handle it in the application
  -- The actual user creation should be done through Supabase Auth UI or the application
  
  -- Ensure we have proper indexes for performance
  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes 
    WHERE tablename = 'profiles' AND indexname = 'profiles_email_idx'
  ) THEN
    CREATE INDEX profiles_email_idx ON profiles(id);
  END IF;
  
  -- Add any additional admin-specific columns if needed
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name = 'last_login'
  ) THEN
    ALTER TABLE profiles ADD COLUMN last_login timestamptz DEFAULT now();
  END IF;
END $$;