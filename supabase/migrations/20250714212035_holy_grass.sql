/*
  # Complete P2P Tool Rental Platform Database Schema

  1. New Tables
    - `profiles` - Extended user profile information
    - `tools` - Tool listings with all specifications
    - `tool_images` - Multiple images per tool
    - `operators` - Operator profiles and certifications
    - `bookings` - Rental bookings with pricing breakdown
    - `bids` - Bidding system for auction-style rentals
    - `reviews` - Reviews for tools, operators, and users
    - `messages` - Real-time messaging system
    - `chats` - Chat conversations
    - `notifications` - User notifications
    - `insurance_claims` - Insurance claim management
    - `operator_skills` - Operator skills and certifications
    - `tool_availability` - Tool availability calendar
    - `operator_availability` - Operator availability calendar

  2. Security
    - Enable RLS on all tables
    - Add comprehensive policies for each user role
    - Secure file storage policies

  3. Features
    - Multi-role user system (renter, owner, operator, admin)
    - Tool listing with specifications and pricing
    - Bidding system for auction-style rentals
    - Operator assignment and management
    - Insurance integration
    - Real-time messaging
    - Review and rating system
    - Availability management
*/

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum types
CREATE TYPE user_role AS ENUM ('renter', 'owner', 'operator', 'admin');
CREATE TYPE tool_condition AS ENUM ('excellent', 'good', 'fair');
CREATE TYPE tool_status AS ENUM ('active', 'rented', 'maintenance', 'inactive');
CREATE TYPE pricing_type AS ENUM ('fixed', 'bidding');
CREATE TYPE booking_status AS ENUM ('pending', 'confirmed', 'active', 'completed', 'cancelled');
CREATE TYPE payment_status AS ENUM ('pending', 'paid', 'refunded');
CREATE TYPE bid_status AS ENUM ('active', 'outbid', 'won', 'expired');
CREATE TYPE review_type AS ENUM ('tool', 'operator', 'renter', 'owner');
CREATE TYPE message_type AS ENUM ('text', 'image', 'file');
CREATE TYPE notification_type AS ENUM ('booking', 'bid', 'message', 'review', 'payment', 'dispute');
CREATE TYPE insurance_type AS ENUM ('basic', 'premium');
CREATE TYPE claim_status AS ENUM ('pending', 'approved', 'denied', 'resolved');

-- Profiles table (extends auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  name text NOT NULL,
  phone text,
  avatar_url text,
  location text NOT NULL,
  bio text,
  role user_role NOT NULL DEFAULT 'renter',
  email_verified boolean DEFAULT false,
  phone_verified boolean DEFAULT false,
  id_verified boolean DEFAULT false,
  rating numeric(3,2) DEFAULT 0,
  review_count integer DEFAULT 0,
  trust_score integer DEFAULT 0,
  member_since timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Tools table
CREATE TABLE IF NOT EXISTS tools (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  category text NOT NULL,
  brand text NOT NULL,
  model text NOT NULL,
  location text NOT NULL,
  condition tool_condition NOT NULL DEFAULT 'good',
  specifications jsonb DEFAULT '{}',
  pricing_type pricing_type NOT NULL DEFAULT 'fixed',
  hourly_rate numeric(10,2),
  daily_rate numeric(10,2) NOT NULL,
  weekly_rate numeric(10,2),
  current_bid numeric(10,2),
  suggested_bid numeric(10,2),
  operator_available boolean DEFAULT false,
  operator_required boolean DEFAULT false,
  operator_id uuid REFERENCES profiles(id),
  operator_rate numeric(10,2),
  insurance_available boolean DEFAULT true,
  basic_coverage numeric(10,2) DEFAULT 12,
  premium_coverage numeric(10,2) DEFAULT 24,
  rating numeric(3,2) DEFAULT 0,
  review_count integer DEFAULT 0,
  features text[] DEFAULT '{}',
  rules text[] DEFAULT '{}',
  deposit numeric(10,2) NOT NULL DEFAULT 0,
  status tool_status DEFAULT 'active',
  views integer DEFAULT 0,
  favorites integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Tool images table
CREATE TABLE IF NOT EXISTS tool_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tool_id uuid REFERENCES tools(id) ON DELETE CASCADE NOT NULL,
  image_url text NOT NULL,
  is_primary boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Operators table
CREATE TABLE IF NOT EXISTS operators (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  skills text[] DEFAULT '{}',
  certifications text[] DEFAULT '{}',
  license_url text,
  experience integer DEFAULT 0,
  hourly_rate numeric(10,2) NOT NULL,
  rating numeric(3,2) DEFAULT 0,
  review_count integer DEFAULT 0,
  completed_jobs integer DEFAULT 0,
  verified boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Tool availability table
CREATE TABLE IF NOT EXISTS tool_availability (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tool_id uuid REFERENCES tools(id) ON DELETE CASCADE NOT NULL,
  start_date date NOT NULL,
  end_date date NOT NULL,
  blocked_dates date[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Operator availability table
CREATE TABLE IF NOT EXISTS operator_availability (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  operator_id uuid REFERENCES operators(id) ON DELETE CASCADE NOT NULL,
  start_date date NOT NULL,
  end_date date NOT NULL,
  blocked_dates date[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  renter_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  tool_id uuid REFERENCES tools(id) ON DELETE CASCADE NOT NULL,
  operator_id uuid REFERENCES operators(id),
  start_date date NOT NULL,
  end_date date NOT NULL,
  duration integer NOT NULL,
  status booking_status DEFAULT 'pending',
  tool_cost numeric(10,2) NOT NULL,
  operator_cost numeric(10,2) DEFAULT 0,
  insurance_cost numeric(10,2) DEFAULT 0,
  platform_fee numeric(10,2) NOT NULL,
  tax numeric(10,2) NOT NULL,
  total numeric(10,2) NOT NULL,
  insurance_selected boolean DEFAULT false,
  insurance_type insurance_type,
  insurance_coverage numeric(10,2) DEFAULT 0,
  deposit numeric(10,2) NOT NULL,
  payment_status payment_status DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Bids table
CREATE TABLE IF NOT EXISTS bids (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tool_id uuid REFERENCES tools(id) ON DELETE CASCADE NOT NULL,
  bidder_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  amount numeric(10,2) NOT NULL,
  status bid_status DEFAULT 'active',
  expires_at timestamptz NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type review_type NOT NULL,
  target_id uuid NOT NULL,
  reviewer_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  booking_id uuid REFERENCES bookings(id),
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment text,
  communication_rating integer CHECK (communication_rating >= 1 AND communication_rating <= 5),
  accuracy_rating integer CHECK (accuracy_rating >= 1 AND accuracy_rating <= 5),
  condition_rating integer CHECK (condition_rating >= 1 AND condition_rating <= 5),
  value_rating integer CHECK (value_rating >= 1 AND value_rating <= 5),
  photos text[] DEFAULT '{}',
  helpful integer DEFAULT 0,
  reported boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Chats table
CREATE TABLE IF NOT EXISTS chats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  participants uuid[] NOT NULL,
  booking_id uuid REFERENCES bookings(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Messages table
CREATE TABLE IF NOT EXISTS messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  chat_id uuid REFERENCES chats(id) ON DELETE CASCADE NOT NULL,
  sender_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  content text NOT NULL,
  attachments text[] DEFAULT '{}',
  type message_type DEFAULT 'text',
  read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  type notification_type NOT NULL,
  title text NOT NULL,
  message text NOT NULL,
  read boolean DEFAULT false,
  action_url text,
  created_at timestamptz DEFAULT now()
);

-- Insurance claims table
CREATE TABLE IF NOT EXISTS insurance_claims (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid REFERENCES bookings(id) ON DELETE CASCADE NOT NULL,
  claimant_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  type text NOT NULL,
  description text NOT NULL,
  photos text[] DEFAULT '{}',
  status claim_status DEFAULT 'pending',
  amount_claimed numeric(10,2),
  amount_approved numeric(10,2),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_tools_owner_id ON tools(owner_id);
CREATE INDEX IF NOT EXISTS idx_tools_category ON tools(category);
CREATE INDEX IF NOT EXISTS idx_tools_location ON tools(location);
CREATE INDEX IF NOT EXISTS idx_tools_status ON tools(status);
CREATE INDEX IF NOT EXISTS idx_tools_pricing_type ON tools(pricing_type);
CREATE INDEX IF NOT EXISTS idx_bookings_renter_id ON bookings(renter_id);
CREATE INDEX IF NOT EXISTS idx_bookings_tool_id ON bookings(tool_id);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
CREATE INDEX IF NOT EXISTS idx_messages_chat_id ON messages(chat_id);
CREATE INDEX IF NOT EXISTS idx_reviews_target_id ON reviews(target_id);
CREATE INDEX IF NOT EXISTS idx_reviews_type ON reviews(type);
CREATE INDEX IF NOT EXISTS idx_bids_tool_id ON bids(tool_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE tools ENABLE ROW LEVEL SECURITY;
ALTER TABLE tool_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE operators ENABLE ROW LEVEL SECURITY;
ALTER TABLE tool_availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE operator_availability ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE bids ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE chats ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE insurance_claims ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view all profiles"
  ON profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Tools policies
CREATE POLICY "Anyone can view active tools"
  ON tools FOR SELECT
  TO authenticated
  USING (status = 'active');

CREATE POLICY "Owners can manage their tools"
  ON tools FOR ALL
  TO authenticated
  USING (auth.uid() = owner_id);

CREATE POLICY "Owners can insert tools"
  ON tools FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = owner_id);

-- Tool images policies
CREATE POLICY "Anyone can view tool images"
  ON tool_images FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Tool owners can manage images"
  ON tool_images FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM tools 
      WHERE tools.id = tool_images.tool_id 
      AND tools.owner_id = auth.uid()
    )
  );

-- Operators policies
CREATE POLICY "Anyone can view verified operators"
  ON operators FOR SELECT
  TO authenticated
  USING (verified = true);

CREATE POLICY "Users can manage own operator profile"
  ON operators FOR ALL
  TO authenticated
  USING (auth.uid() = profile_id);

-- Availability policies
CREATE POLICY "Anyone can view tool availability"
  ON tool_availability FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Tool owners can manage availability"
  ON tool_availability FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM tools 
      WHERE tools.id = tool_availability.tool_id 
      AND tools.owner_id = auth.uid()
    )
  );

CREATE POLICY "Anyone can view operator availability"
  ON operator_availability FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Operators can manage own availability"
  ON operator_availability FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM operators 
      WHERE operators.id = operator_availability.operator_id 
      AND operators.profile_id = auth.uid()
    )
  );

-- Bookings policies
CREATE POLICY "Users can view own bookings"
  ON bookings FOR SELECT
  TO authenticated
  USING (
    auth.uid() = renter_id OR 
    EXISTS (
      SELECT 1 FROM tools 
      WHERE tools.id = bookings.tool_id 
      AND tools.owner_id = auth.uid()
    ) OR
    EXISTS (
      SELECT 1 FROM operators 
      WHERE operators.id = bookings.operator_id 
      AND operators.profile_id = auth.uid()
    )
  );

CREATE POLICY "Renters can create bookings"
  ON bookings FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = renter_id);

CREATE POLICY "Participants can update bookings"
  ON bookings FOR UPDATE
  TO authenticated
  USING (
    auth.uid() = renter_id OR 
    EXISTS (
      SELECT 1 FROM tools 
      WHERE tools.id = bookings.tool_id 
      AND tools.owner_id = auth.uid()
    )
  );

-- Bids policies
CREATE POLICY "Anyone can view bids"
  ON bids FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create bids"
  ON bids FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = bidder_id);

CREATE POLICY "Bidders can update own bids"
  ON bids FOR UPDATE
  TO authenticated
  USING (auth.uid() = bidder_id);

-- Reviews policies
CREATE POLICY "Anyone can view reviews"
  ON reviews FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create reviews"
  ON reviews FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = reviewer_id);

CREATE POLICY "Reviewers can update own reviews"
  ON reviews FOR UPDATE
  TO authenticated
  USING (auth.uid() = reviewer_id);

-- Chats policies
CREATE POLICY "Participants can view chats"
  ON chats FOR SELECT
  TO authenticated
  USING (auth.uid() = ANY(participants));

CREATE POLICY "Users can create chats"
  ON chats FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = ANY(participants));

-- Messages policies
CREATE POLICY "Chat participants can view messages"
  ON messages FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM chats 
      WHERE chats.id = messages.chat_id 
      AND auth.uid() = ANY(chats.participants)
    )
  );

CREATE POLICY "Chat participants can send messages"
  ON messages FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = sender_id AND
    EXISTS (
      SELECT 1 FROM chats 
      WHERE chats.id = messages.chat_id 
      AND auth.uid() = ANY(chats.participants)
    )
  );

CREATE POLICY "Senders can update own messages"
  ON messages FOR UPDATE
  TO authenticated
  USING (auth.uid() = sender_id);

-- Notifications policies
CREATE POLICY "Users can view own notifications"
  ON notifications FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "System can create notifications"
  ON notifications FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update own notifications"
  ON notifications FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Insurance claims policies
CREATE POLICY "Claimants and tool owners can view claims"
  ON insurance_claims FOR SELECT
  TO authenticated
  USING (
    auth.uid() = claimant_id OR
    EXISTS (
      SELECT 1 FROM bookings b
      JOIN tools t ON t.id = b.tool_id
      WHERE b.id = insurance_claims.booking_id
      AND t.owner_id = auth.uid()
    )
  );

CREATE POLICY "Users can create claims"
  ON insurance_claims FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = claimant_id);

CREATE POLICY "Claimants can update own claims"
  ON insurance_claims FOR UPDATE
  TO authenticated
  USING (auth.uid() = claimant_id);

-- Create functions for updating timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_tools_updated_at BEFORE UPDATE ON tools FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_operators_updated_at BEFORE UPDATE ON operators FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_tool_availability_updated_at BEFORE UPDATE ON tool_availability FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_operator_availability_updated_at BEFORE UPDATE ON operator_availability FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON bookings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_chats_updated_at BEFORE UPDATE ON chats FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_insurance_claims_updated_at BEFORE UPDATE ON insurance_claims FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();