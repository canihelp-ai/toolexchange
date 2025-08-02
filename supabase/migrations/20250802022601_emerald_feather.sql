/*
  # Create automatic profile creation trigger

  1. Function to handle new user creation
    - Automatically creates a profile when a new user signs up
    - Uses user metadata from auth to populate profile fields
    
  2. Trigger
    - Fires after insert on auth.users
    - Calls the handle_new_user function
*/

-- Create function to handle new user creation
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
    email_verified,
    phone_verified,
    id_verified,
    rating,
    review_count,
    trust_score
  )
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'name', 'User ' || substr(md5(random()::text), 0, 10)),
    new.raw_user_meta_data->>'phone',
    COALESCE(new.raw_user_meta_data->>'location', ''),
    COALESCE(new.raw_user_meta_data->>'role', 'renter'),
    new.raw_user_meta_data->>'bio',
    CASE WHEN new.email_confirmed_at IS NOT NULL THEN true ELSE false END,
    false,
    false,
    0,
    0,
    0
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();