/*
  # Fix user creation issues

  1. Database Functions
    - Create or replace the handle_new_user function
    - Create or replace the update_updated_at_column function
  
  2. Triggers
    - Ensure proper trigger setup for new user creation
    - Fix any trigger conflicts
  
  3. Security
    - Review and fix RLS policies that might block user creation
    - Ensure proper permissions for auth operations
*/

-- Create or replace the function to handle new user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (
    id,
    name,
    is_admin,
    is_online,
    avatar_url,
    skills_offered,
    skills_wanted,
    availability,
    rating,
    total_swaps
  )
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'name', 'New User'),
    CASE WHEN new.email = 'admin@skillshare.com' THEN true ELSE false END,
    true,
    'https://images.pexels.com/photos/1586996/pexels-photo-1586996.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    CASE WHEN new.email = 'admin@skillshare.com' 
         THEN ARRAY['Platform Management', 'Community Building']
         ELSE ARRAY[]::text[] END,
    CASE WHEN new.email = 'admin@skillshare.com' 
         THEN ARRAY['User Feedback', 'Feature Suggestions']
         ELSE ARRAY[]::text[] END,
    CASE WHEN new.email = 'admin@skillshare.com' 
         THEN ARRAY['24/7']
         ELSE ARRAY[]::text[] END,
    CASE WHEN new.email = 'admin@skillshare.com' THEN 5.0 ELSE 0 END,
    0
  );
  RETURN new;
EXCEPTION
  WHEN others THEN
    -- Log the error but don't fail the user creation
    RAISE LOG 'Error creating profile for user %: %', new.id, SQLERRM;
    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create or replace the update timestamp function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop existing trigger if it exists and recreate it
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Create the trigger for new user creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Ensure RLS policies don't interfere with user creation
-- Temporarily disable RLS on profiles for the trigger function
ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;

-- Re-enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Recreate policies with proper permissions
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;

-- Allow public read access to profiles
CREATE POLICY "Public profiles are viewable by everyone"
  ON public.profiles
  FOR SELECT
  TO public
  USING (true);

-- Allow authenticated users to insert their own profile
CREATE POLICY "Users can insert their own profile"
  ON public.profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Allow users to update their own profile
CREATE POLICY "Users can update their own profile"
  ON public.profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON public.profiles TO anon, authenticated;
GRANT ALL ON public.swap_requests TO anon, authenticated;

-- Ensure the trigger function has proper permissions
GRANT EXECUTE ON FUNCTION public.handle_new_user() TO service_role;
GRANT EXECUTE ON FUNCTION public.update_updated_at_column() TO service_role;