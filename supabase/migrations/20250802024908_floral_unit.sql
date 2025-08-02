/*
  # Fix profiles table structure

  1. Updates
    - Ensure profiles table has correct structure
    - Add missing columns if needed
    - Update RLS policies

  2. Security
    - Enable RLS on profiles table
    - Add policies for public viewing and user management
*/

-- Ensure profiles table exists with correct structure
CREATE TABLE IF NOT EXISTS profiles (
  id uuid references auth.users not null primary key,
  email text not null,
  name text not null,
  phone text,
  avatar_url text,
  location text not null default '',
  bio text,
  role user_role not null default 'renter',
  email_verified boolean default false,
  phone_verified boolean default false,
  id_verified boolean default false,
  rating numeric(3,2) default 0,
  review_count integer default 0,
  trust_score integer default 0,
  member_since timestamp with time zone default now(),
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;

-- Create policies
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can insert their own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Create or replace trigger function for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for profiles updated_at
DROP TRIGGER IF EXISTS update_profiles_updated_at ON profiles;
CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON profiles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (
    id,
    email,
    name,
    phone,
    location,
    role,
    bio,
    member_since,
    updated_at
  )
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'name', 'User ' || substr(new.id::text, 1, 8)),
    new.raw_user_meta_data->>'phone',
    COALESCE(new.raw_user_meta_data->>'location', ''),
    COALESCE((new.raw_user_meta_data->>'role')::user_role, 'renter'),
    new.raw_user_meta_data->>'bio',
    now(),
    now()
  );
  RETURN new;
END;
$$ language plpgsql security definer;

-- Create trigger for automatic profile creation
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();