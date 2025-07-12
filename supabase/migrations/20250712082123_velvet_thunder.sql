/*
  # Create swap requests table

  1. New Tables
    - `swap_requests`
      - `id` (uuid, primary key)
      - `from_user_id` (uuid, references profiles)
      - `to_user_id` (uuid, references profiles)
      - `skill_offered` (text, required)
      - `skill_wanted` (text, required)
      - `message` (text, optional)
      - `status` (enum: pending, accepted, rejected, completed, cancelled)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `swap_requests` table
    - Add policies for users to view their own requests
    - Add policies for users to create requests
    - Add policies for users to update requests they're involved in
*/

-- Create enum for swap request status
DO $$ BEGIN
  CREATE TYPE swap_request_status AS ENUM ('pending', 'accepted', 'rejected', 'completed', 'cancelled');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Create swap_requests table
CREATE TABLE IF NOT EXISTS swap_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  from_user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  to_user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  skill_offered text NOT NULL,
  skill_wanted text NOT NULL,
  message text DEFAULT '',
  status swap_request_status DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  
  -- Ensure users can't request swaps with themselves
  CONSTRAINT different_users CHECK (from_user_id != to_user_id)
);

-- Enable RLS
ALTER TABLE swap_requests ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view swap requests they're involved in"
  ON swap_requests
  FOR SELECT
  TO authenticated
  USING (auth.uid() = from_user_id OR auth.uid() = to_user_id);

CREATE POLICY "Users can create swap requests"
  ON swap_requests
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = from_user_id);

CREATE POLICY "Users can update swap requests they're involved in"
  ON swap_requests
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = from_user_id OR auth.uid() = to_user_id);

CREATE POLICY "Users can delete their own swap requests"
  ON swap_requests
  FOR DELETE
  TO authenticated
  USING (auth.uid() = from_user_id);

-- Create trigger for updated_at
DROP TRIGGER IF EXISTS update_swap_requests_updated_at ON swap_requests;
CREATE TRIGGER update_swap_requests_updated_at
  BEFORE UPDATE ON swap_requests
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();