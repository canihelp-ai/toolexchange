/*
  # Fix tools table RLS policies for public access

  1. Security Changes
    - Enable public read access to tools table
    - Allow authenticated users to manage their own tools
    - Ensure proper RLS policies for tool images and availability
*/

-- Enable RLS on tools table if not already enabled
ALTER TABLE tools ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Public can view active tools" ON tools;
DROP POLICY IF EXISTS "Owners can manage their tools" ON tools;
DROP POLICY IF EXISTS "Owners can insert tools" ON tools;

-- Create new policies for tools table
CREATE POLICY "Enable read access for all users"
  ON tools
  FOR SELECT
  USING (status = 'active');

CREATE POLICY "Enable insert for authenticated users"
  ON tools
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Enable update for tool owners"
  ON tools
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = owner_id)
  WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Enable delete for tool owners"
  ON tools
  FOR DELETE
  TO authenticated
  USING (auth.uid() = owner_id);

-- Ensure tool_images table has proper policies
ALTER TABLE tool_images ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can view tool images" ON tool_images;
DROP POLICY IF EXISTS "Tool owners can manage images" ON tool_images;

CREATE POLICY "Enable read access for all users"
  ON tool_images
  FOR SELECT
  USING (true);

CREATE POLICY "Tool owners can manage images"
  ON tool_images
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM tools
      WHERE tools.id = tool_images.tool_id
      AND tools.owner_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM tools
      WHERE tools.id = tool_images.tool_id
      AND tools.owner_id = auth.uid()
    )
  );

-- Ensure tool_availability table has proper policies
ALTER TABLE tool_availability ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can view tool availability" ON tool_availability;
DROP POLICY IF EXISTS "Tool owners can manage availability" ON tool_availability;

CREATE POLICY "Enable read access for all users"
  ON tool_availability
  FOR SELECT
  USING (true);

CREATE POLICY "Tool owners can manage availability"
  ON tool_availability
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM tools
      WHERE tools.id = tool_availability.tool_id
      AND tools.owner_id = auth.uid()
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM tools
      WHERE tools.id = tool_availability.tool_id
      AND tools.owner_id = auth.uid()
    )
  );