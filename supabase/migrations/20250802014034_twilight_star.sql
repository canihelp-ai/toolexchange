/*
  # Fix RLS policies for public tool access

  1. Update RLS policies to allow public access to active tools
  2. Ensure profiles can be read for tool owners
  3. Fix any policy conflicts
*/

-- Drop existing restrictive policies and create public access ones
DROP POLICY IF EXISTS "Anyone can view active tools" ON tools;
DROP POLICY IF EXISTS "Users can view all profiles" ON profiles;

-- Allow anyone (including anonymous users) to view active tools
CREATE POLICY "Public can view active tools"
  ON tools
  FOR SELECT
  TO public
  USING (status = 'active');

-- Allow anyone to view profiles (needed for tool owners)
CREATE POLICY "Public can view profiles"
  ON profiles
  FOR SELECT
  TO public
  USING (true);

-- Allow anyone to view tool images
DROP POLICY IF EXISTS "Anyone can view tool images" ON tool_images;
CREATE POLICY "Public can view tool images"
  ON tool_images
  FOR SELECT
  TO public
  USING (true);

-- Allow anyone to view tool availability
DROP POLICY IF EXISTS "Anyone can view tool availability" ON tool_availability;
CREATE POLICY "Public can view tool availability"
  ON tool_availability
  FOR SELECT
  TO public
  USING (true);