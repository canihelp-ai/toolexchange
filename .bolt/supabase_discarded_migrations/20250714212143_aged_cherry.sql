/*
  # Seed Sample Data for P2P Tool Rental Platform

  1. Sample Data
    - Sample profiles for different user roles
    - Sample tools with various categories and pricing
    - Sample operators with skills and certifications
    - Sample bookings and reviews
    - Sample availability data

  2. Test Users
    - Tool owners with multiple listings
    - Renters with booking history
    - Operators with skills and availability
*/

-- Insert sample profiles
INSERT INTO profiles (id, email, name, phone, avatar_url, location, bio, role, email_verified, phone_verified, id_verified, rating, review_count, trust_score) VALUES
  ('550e8400-e29b-41d4-a716-446655440001', 'john.martinez@example.com', 'John Martinez', '(555) 123-4567', 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1', 'San Francisco, CA', 'Professional contractor with 15+ years experience. I rent out high-quality tools and equipment.', 'owner', true, true, true, 4.8, 156, 95),
  ('550e8400-e29b-41d4-a716-446655440002', 'sarah.johnson@example.com', 'Sarah Johnson', '(555) 987-6543', 'https://images.pexels.com/photos/1438761/pexels-photo-1438761.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1', 'Oakland, CA', 'Weekend warrior who loves DIY projects. Always looking for the right tools for the job.', 'renter', true, true, false, 4.9, 43, 87),
  ('550e8400-e29b-41d4-a716-446655440003', 'mike.wilson@example.com', 'Mike Wilson', '(555) 456-7890', 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1', 'San Jose, CA', 'Certified heavy equipment operator with commercial licenses. Available for complex projects.', 'operator', true, true, true, 4.9, 78, 92),
  ('550e8400-e29b-41d4-a716-446655440004', 'lisa.chen@example.com', 'Lisa Chen', '(555) 234-5678', 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1', 'Berkeley, CA', 'Home renovation enthusiast and tool collector. Quality tools at fair prices.', 'owner', true, false, true, 4.7, 89, 88),
  ('550e8400-e29b-41d4-a716-446655440005', 'david.brown@example.com', 'David Brown', '(555) 345-6789', 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1', 'Palo Alto, CA', 'Professional landscaper and equipment operator. Specializing in outdoor power equipment.', 'operator', true, true, true, 4.8, 124, 91);

-- Insert sample operators
INSERT INTO operators (id, profile_id, skills, certifications, license_url, experience, hourly_rate, rating, review_count, completed_jobs, verified) VALUES
  ('660e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440003', ARRAY['Heavy Equipment', 'Excavation', 'Concrete Work', 'Landscaping'], ARRAY['OSHA 30', 'Heavy Equipment License', 'Forklift Certified'], '/docs/license-mike.pdf', 12, 75.00, 4.9, 78, 124, true),
  ('660e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440005', ARRAY['Landscaping', 'Tree Removal', 'Lawn Care', 'Irrigation'], ARRAY['Certified Arborist', 'Pesticide License', 'Irrigation Certified'], '/docs/license-david.pdf', 8, 65.00, 4.8, 124, 89, true);

-- Insert sample tools
INSERT INTO tools (id, owner_id, title, description, category, brand, model, location, condition, specifications, pricing_type, hourly_rate, daily_rate, weekly_rate, operator_available, operator_required, operator_id, operator_rate, insurance_available, basic_coverage, premium_coverage, rating, review_count, features, rules, deposit, status, views, favorites) VALUES
  ('770e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 'DeWalt 20V Max Cordless Drill Set', 'Professional-grade cordless drill with 2 batteries, charger, and carrying case. Perfect for construction and home projects.', 'Power Tools', 'DeWalt', 'DCD771C2', 'San Francisco, CA', 'excellent', '{"Max Torque": "300 UWO", "Chuck Size": "1/2 inch", "Battery": "20V MAX", "Weight": "3.6 lbs"}', 'fixed', 15.00, 45.00, 280.00, false, false, null, null, true, 12.00, 24.00, 4.8, 34, ARRAY['2 Batteries', 'Fast Charger', 'LED Light', 'Belt Clip'], ARRAY['No wet conditions', 'Return clean', 'Report any damage immediately'], 100.00, 'active', 245, 18),
  ('770e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440001', 'Compact Excavator - Bobcat E35', 'Perfect for small construction projects, landscaping, and utility work. Includes operator service available.', 'Heavy Equipment', 'Bobcat', 'E35', 'San Francisco, CA', 'good', '{"Operating Weight": "8,000 lbs", "Max Dig Depth": "11 ft 2 in", "Bucket Capacity": "0.28 yd³", "Engine Power": "24.8 HP"}', 'fixed', null, 320.00, 1800.00, true, true, '660e8400-e29b-41d4-a716-446655440001', 75.00, true, 150.00, 300.00, 4.9, 12, ARRAY['Hydraulic Thumbs', 'Rubber Tracks', 'Auxiliary Hydraulics', 'Enclosed Cab'], ARRAY['Valid license required', 'Operator must be present', 'No weekend returns'], 1500.00, 'active', 89, 7),
  ('770e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440001', 'Professional Tile Saw - MK Diamond', 'High-precision tile saw for professional and DIY projects. Includes diamond blade and water pump system.', 'Construction Tools', 'MK Diamond', 'MK-370EXP', 'San Francisco, CA', 'excellent', '{"Cutting Capacity": "12 inches", "Blade Size": "7 inches", "Motor": "1 HP", "Water System": "Integrated pump"}', 'bidding', null, 85.00, 500.00, true, false, null, 45.00, true, 25.00, 50.00, 4.7, 23, ARRAY['Diamond Blade', 'Water Cooling', 'Portable Stand', 'Dust Collection'], ARRAY['Provide own extension cord', 'Clean after use', 'No concrete cutting'], 200.00, 'active', 156, 12),
  ('770e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440004', 'Makita Circular Saw 7-1/4"', 'Powerful circular saw perfect for framing and general construction. Lightweight and easy to handle.', 'Power Tools', 'Makita', '5007MG', 'Berkeley, CA', 'good', '{"Blade Size": "7-1/4 inch", "Motor": "15 AMP", "Weight": "10.6 lbs", "Max Cutting Depth": "2-1/2 inch"}', 'fixed', 12.00, 35.00, 210.00, false, false, null, null, true, 10.00, 20.00, 4.6, 28, ARRAY['Magnesium Base', 'Electric Brake', 'Dust Port', 'Carbide Blade'], ARRAY['Wear safety glasses', 'No metal cutting', 'Return blade guard intact'], 75.00, 'active', 178, 15),
  ('770e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440004', 'Pressure Washer - Simpson 3200 PSI', 'Gas-powered pressure washer for heavy-duty cleaning. Perfect for driveways, decks, and siding.', 'Cleaning Equipment', 'Simpson', 'MS60763-S', 'Berkeley, CA', 'excellent', '{"Pressure": "3200 PSI", "Flow Rate": "2.5 GPM", "Engine": "Honda GCV160", "Hose Length": "25 ft"}', 'fixed', 18.00, 55.00, 330.00, false, false, null, null, true, 15.00, 30.00, 4.8, 41, ARRAY['Honda Engine', 'Quick Connect Nozzles', 'Detergent Tank', 'Pneumatic Tires'], ARRAY['Use proper detergent only', 'No hot water', 'Return with fuel'], 150.00, 'active', 203, 22);

-- Insert tool images
INSERT INTO tool_images (tool_id, image_url, is_primary) VALUES
  ('770e8400-e29b-41d4-a716-446655440001', 'https://images.pexels.com/photos/209274/pexels-photo-209274.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1', true),
  ('770e8400-e29b-41d4-a716-446655440001', 'https://images.pexels.com/photos/1015568/pexels-photo-1015568.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1', false),
  ('770e8400-e29b-41d4-a716-446655440002', 'https://images.pexels.com/photos/1078884/pexels-photo-1078884.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1', true),
  ('770e8400-e29b-41d4-a716-446655440002', 'https://images.pexels.com/photos/1078883/pexels-photo-1078883.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1', false),
  ('770e8400-e29b-41d4-a716-446655440003', 'https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1', true),
  ('770e8400-e29b-41d4-a716-446655440004', 'https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1', true),
  ('770e8400-e29b-41d4-a716-446655440005', 'https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1', true);

-- Insert tool availability
INSERT INTO tool_availability (tool_id, start_date, end_date, blocked_dates) VALUES
  ('770e8400-e29b-41d4-a716-446655440001', '2024-01-20', '2024-12-31', ARRAY['2024-02-10', '2024-02-11']::date[]),
  ('770e8400-e29b-41d4-a716-446655440002', '2024-01-25', '2024-11-30', ARRAY['2024-03-15', '2024-03-16', '2024-03-17']::date[]),
  ('770e8400-e29b-41d4-a716-446655440003', '2024-01-22', '2024-10-31', ARRAY[]::date[]),
  ('770e8400-e29b-41d4-a716-446655440004', '2024-01-15', '2024-12-31', ARRAY['2024-02-20']::date[]),
  ('770e8400-e29b-41d4-a716-446655440005', '2024-01-18', '2024-11-30', ARRAY[]::date[]);

-- Insert operator availability
INSERT INTO operator_availability (operator_id, start_date, end_date, blocked_dates) VALUES
  ('660e8400-e29b-41d4-a716-446655440001', '2024-01-15', '2024-12-31', ARRAY['2024-02-14', '2024-02-15']::date[]),
  ('660e8400-e29b-41d4-a716-446655440002', '2024-01-20', '2024-11-30', ARRAY['2024-03-10', '2024-03-11']::date[]);

-- Insert sample bookings
INSERT INTO bookings (id, renter_id, tool_id, operator_id, start_date, end_date, duration, status, tool_cost, operator_cost, insurance_cost, platform_fee, tax, total, insurance_selected, insurance_type, insurance_coverage, deposit, payment_status) VALUES
  ('880e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440002', '770e8400-e29b-41d4-a716-446655440001', null, '2024-01-25', '2024-01-27', 2, 'confirmed', 90.00, 0.00, 24.00, 11.40, 10.03, 135.43, true, 'basic', 500.00, 100.00, 'paid'),
  ('880e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440002', '770e8400-e29b-41d4-a716-446655440002', '660e8400-e29b-41d4-a716-446655440001', '2024-02-01', '2024-02-03', 2, 'pending', 640.00, 1200.00, 600.00, 244.00, 214.72, 2898.72, true, 'premium', 1000.00, 1500.00, 'pending');

-- Insert sample bids
INSERT INTO bids (tool_id, bidder_id, amount, status, expires_at) VALUES
  ('770e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440002', 75.00, 'active', '2024-02-15 23:59:59'),
  ('770e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440004', 65.00, 'outbid', '2024-02-15 23:59:59');

-- Update current bid on bidding tools
UPDATE tools SET current_bid = 75.00, suggested_bid = 80.00 WHERE id = '770e8400-e29b-41d4-a716-446655440003';

-- Insert sample reviews
INSERT INTO reviews (type, target_id, reviewer_id, booking_id, rating, comment, communication_rating, accuracy_rating, condition_rating, value_rating, photos, helpful) VALUES
  ('tool', '770e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440002', '880e8400-e29b-41d4-a716-446655440001', 5, 'Excellent drill! Very powerful and the batteries lasted the entire project. John was very responsive and helpful.', 5, 5, 5, 4, ARRAY[]::text[], 3),
  ('owner', '550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440002', '880e8400-e29b-41d4-a716-446655440001', 5, 'Great tool owner! Very professional and the tool was exactly as described.', 5, 5, 5, 5, ARRAY[]::text[], 2);

-- Insert sample chats
INSERT INTO chats (id, participants, booking_id) VALUES
  ('990e8400-e29b-41d4-a716-446655440001', ARRAY['550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440002'], '880e8400-e29b-41d4-a716-446655440001');

-- Insert sample messages
INSERT INTO messages (chat_id, sender_id, content, type, read) VALUES
  ('990e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440002', 'Hi John! I''m interested in renting your DeWalt drill for this weekend. Is it available?', 'text', true),
  ('990e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 'Hello Sarah! Yes, it''s available this weekend. Would you like me to include the extra battery pack?', 'text', true),
  ('990e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440002', 'That would be great! What time works best for pickup?', 'text', false);

-- Insert sample notifications
INSERT INTO notifications (user_id, type, title, message, read, action_url) VALUES
  ('550e8400-e29b-41d4-a716-446655440001', 'booking', 'New Booking Request', 'Sarah Johnson wants to rent your DeWalt drill for Jan 25-27', false, '/dashboard/bookings'),
  ('550e8400-e29b-41d4-a716-446655440001', 'review', 'New Review Received', 'Sarah Johnson left a 5-star review for your DeWalt drill', true, '/dashboard/reviews'),
  ('550e8400-e29b-41d4-a716-446655440002', 'bid', 'Bid Update', 'You are currently the highest bidder on MK Diamond Tile Saw', false, '/dashboard/bids');