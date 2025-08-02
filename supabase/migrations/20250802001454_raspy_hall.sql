/*
  # Sample Data Migration

  This migration creates sample data for all tables in the tool exchange platform.

  ## Tables Populated
  1. Profiles (10 users with different roles)
  2. Tools (10 tools from various owners)
  3. Tool Images (10+ images for tools)
  4. Tool Availability (10 availability records)
  5. Operators (10 operator profiles)
  6. Operator Availability (10 operator availability records)
  7. Bookings (10 booking records)
  8. Bids (10 bid records)
  9. Reviews (10 review records)
  10. Chats (10 chat conversations)
  11. Messages (10+ messages in chats)
  12. Notifications (10 notification records)
  13. Insurance Claims (10 insurance claim records)

  ## Notes
  - All foreign key relationships are properly maintained
  - Sample data includes realistic values and scenarios
  - UUIDs are generated for all primary keys
  - Dates are set to realistic future/past values
*/

-- Insert sample profiles (users)
INSERT INTO profiles (id, email, name, phone, avatar_url, location, bio, role, email_verified, phone_verified, id_verified, rating, review_count, trust_score) VALUES
('550e8400-e29b-41d4-a716-446655440001', 'john.martinez@example.com', 'John Martinez', '(555) 123-4567', 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1', 'San Francisco, CA', 'Professional contractor with 15+ years experience.', 'owner', true, true, true, 4.8, 156, 95),
('550e8400-e29b-41d4-a716-446655440002', 'sarah.johnson@example.com', 'Sarah Johnson', '(555) 987-6543', 'https://images.pexels.com/photos/1438761/pexels-photo-1438761.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1', 'Oakland, CA', 'Weekend warrior who loves DIY projects.', 'renter', true, true, false, 4.9, 43, 87),
('550e8400-e29b-41d4-a716-446655440003', 'mike.wilson@example.com', 'Mike Wilson', '(555) 456-7890', 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1', 'San Jose, CA', 'Certified heavy equipment operator.', 'operator', true, true, true, 4.9, 78, 92),
('550e8400-e29b-41d4-a716-446655440004', 'lisa.chen@example.com', 'Lisa Chen', '(555) 234-5678', 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1', 'Berkeley, CA', 'Home renovation enthusiast and tool collector.', 'owner', true, false, true, 4.7, 89, 88),
('550e8400-e29b-41d4-a716-446655440005', 'david.brown@example.com', 'David Brown', '(555) 345-6789', 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1', 'Fremont, CA', 'Construction worker looking for quality tools.', 'renter', true, true, false, 4.6, 32, 75),
('550e8400-e29b-41d4-a716-446655440006', 'maria.garcia@example.com', 'Maria Garcia', '(555) 567-8901', 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1', 'Palo Alto, CA', 'Skilled operator specializing in landscaping equipment.', 'operator', true, true, true, 4.8, 67, 90),
('550e8400-e29b-41d4-a716-446655440007', 'robert.taylor@example.com', 'Robert Taylor', '(555) 678-9012', 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1', 'Mountain View, CA', 'Tool rental business owner with premium equipment.', 'owner', true, true, true, 4.9, 234, 98),
('550e8400-e29b-41d4-a716-446655440008', 'jennifer.white@example.com', 'Jennifer White', '(555) 789-0123', 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1', 'Sunnyvale, CA', 'DIY enthusiast and weekend project warrior.', 'renter', true, false, false, 4.5, 28, 72),
('550e8400-e29b-41d4-a716-446655440009', 'carlos.rodriguez@example.com', 'Carlos Rodriguez', '(555) 890-1234', 'https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1', 'Santa Clara, CA', 'Professional operator with heavy machinery expertise.', 'operator', true, true, true, 4.9, 145, 96),
('550e8400-e29b-41d4-a716-446655440010', 'amanda.davis@example.com', 'Amanda Davis', '(555) 901-2345', 'https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1', 'Cupertino, CA', 'Small business owner with quality power tools.', 'owner', true, true, false, 4.6, 76, 85);

-- Insert sample tools
INSERT INTO tools (id, owner_id, title, description, category, brand, model, location, condition, pricing_type, hourly_rate, daily_rate, weekly_rate, operator_available, operator_required, insurance_available, basic_coverage, premium_coverage, rating, review_count, features, rules, deposit) VALUES
('660e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 'DeWalt 20V Max Cordless Drill Set', 'Professional-grade cordless drill with 2 batteries, charger, and carrying case.', 'Power Tools', 'DeWalt', 'DCD771C2', 'San Francisco, CA', 'excellent', 'fixed', 15, 45, 280, false, false, true, 12, 24, 4.8, 34, ARRAY['2 Batteries', 'Fast Charger', 'LED Light', 'Belt Clip'], ARRAY['No wet conditions', 'Return clean', 'Report damage immediately'], 100),
('660e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440001', 'Compact Excavator - Bobcat E35', 'Perfect for small construction projects and landscaping work.', 'Heavy Equipment', 'Bobcat', 'E35', 'San Francisco, CA', 'good', 'fixed', null, 320, 1800, true, true, true, 150, 300, 4.9, 12, ARRAY['Hydraulic Thumbs', 'Rubber Tracks', 'Auxiliary Hydraulics'], ARRAY['Valid license required', 'Operator must be present'], 1500),
('660e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440004', 'Professional Tile Saw', 'High-precision tile saw for professional and DIY projects.', 'Construction Tools', 'MK Diamond', 'MK-370EXP', 'Berkeley, CA', 'excellent', 'bidding', null, 85, 500, true, false, true, 25, 50, 4.7, 23, ARRAY['Diamond Blade', 'Water Cooling', 'Portable Stand'], ARRAY['Provide extension cord', 'Clean after use'], 200),
('660e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440007', 'Milwaukee Circular Saw', 'Powerful circular saw perfect for framing and construction.', 'Power Tools', 'Milwaukee', 'M18 FUEL', 'Mountain View, CA', 'excellent', 'fixed', 12, 35, 210, false, false, true, 10, 20, 4.6, 45, ARRAY['Brushless Motor', 'LED Light', 'Magnesium Guard'], ARRAY['Use proper safety gear', 'No metal cutting'], 75),
('660e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440007', 'Skid Steer Loader', 'Versatile skid steer for construction and landscaping.', 'Heavy Equipment', 'Caterpillar', '226D', 'Mountain View, CA', 'good', 'fixed', null, 280, 1680, true, true, true, 120, 240, 4.8, 28, ARRAY['Quick Attach', 'Enclosed Cab', 'Auxiliary Hydraulics'], ARRAY['CDL required', 'Operator certification needed'], 2000),
('660e8400-e29b-41d4-a716-446655440006', '550e8400-e29b-41d4-a716-446655440010', 'Makita Impact Driver Set', 'High-torque impact driver with multiple bits and case.', 'Power Tools', 'Makita', 'XDT16Z', 'Cupertino, CA', 'excellent', 'fixed', 10, 30, 180, false, false, true, 8, 16, 4.7, 56, ARRAY['Variable Speed', 'LED Light', 'Belt Clip', 'Bit Set'], ARRAY['Return with all bits', 'Keep dry'], 60),
('660e8400-e29b-41d4-a716-446655440007', '550e8400-e29b-41d4-a716-446655440004', 'Concrete Mixer', 'Portable concrete mixer for small to medium projects.', 'Construction Equipment', 'Honda', 'EM5000SX', 'Berkeley, CA', 'good', 'bidding', null, 95, 570, false, false, true, 30, 60, 4.5, 19, ARRAY['Honda Engine', 'Poly Drum', 'Folding Handle'], ARRAY['Provide own fuel', 'Clean thoroughly'], 150),
('660e8400-e29b-41d4-a716-446655440008', '550e8400-e29b-41d4-a716-446655440001', 'Pressure Washer', 'High-pressure washer for cleaning and surface prep.', 'Cleaning Equipment', 'Ryobi', 'RY142300', 'San Francisco, CA', 'excellent', 'fixed', 8, 25, 150, false, false, true, 15, 30, 4.6, 67, ARRAY['2300 PSI', 'Electric Start', 'Multiple Nozzles'], ARRAY['Use proper detergent', 'No hot water'], 80),
('660e8400-e29b-41d4-a716-446655440009', '550e8400-e29b-41d4-a716-446655440007', 'Generator - 7500W', 'Portable generator for construction sites and events.', 'Power Equipment', 'Champion', '100165', 'Mountain View, CA', 'good', 'fixed', null, 65, 390, false, false, true, 20, 40, 4.7, 38, ARRAY['Electric Start', 'Dual Fuel', 'GFCI Outlets'], ARRAY['Provide fuel', 'Outdoor use only'], 200),
('660e8400-e29b-41d4-a716-446655440010', '550e8400-e29b-41d4-a716-446655440010', 'Angle Grinder Set', 'Professional angle grinder with multiple discs.', 'Power Tools', 'Bosch', 'GWS18V-45', 'Cupertino, CA', 'excellent', 'bidding', null, 40, 240, false, false, true, 12, 24, 4.8, 42, ARRAY['Variable Speed', 'Anti-Vibration', 'Multiple Discs'], ARRAY['Use safety equipment', 'No wet cutting'], 90);

-- Insert tool images
INSERT INTO tool_images (id, tool_id, image_url, is_primary) VALUES
('770e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440001', 'https://images.pexels.com/photos/209274/pexels-photo-209274.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1', true),
('770e8400-e29b-41d4-a716-446655440002', '660e8400-e29b-41d4-a716-446655440001', 'https://images.pexels.com/photos/1015568/pexels-photo-1015568.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1', false),
('770e8400-e29b-41d4-a716-446655440003', '660e8400-e29b-41d4-a716-446655440002', 'https://images.pexels.com/photos/1078884/pexels-photo-1078884.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1', true),
('770e8400-e29b-41d4-a716-446655440004', '660e8400-e29b-41d4-a716-446655440003', 'https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1', true),
('770e8400-e29b-41d4-a716-446655440005', '660e8400-e29b-41d4-a716-446655440004', 'https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1', true),
('770e8400-e29b-41d4-a716-446655440006', '660e8400-e29b-41d4-a716-446655440005', 'https://images.pexels.com/photos/1078884/pexels-photo-1078884.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1', true),
('770e8400-e29b-41d4-a716-446655440007', '660e8400-e29b-41d4-a716-446655440006', 'https://images.pexels.com/photos/209274/pexels-photo-209274.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1', true),
('770e8400-e29b-41d4-a716-446655440008', '660e8400-e29b-41d4-a716-446655440007', 'https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1', true),
('770e8400-e29b-41d4-a716-446655440009', '660e8400-e29b-41d4-a716-446655440008', 'https://images.pexels.com/photos/209274/pexels-photo-209274.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1', true),
('770e8400-e29b-41d4-a716-446655440010', '660e8400-e29b-41d4-a716-446655440009', 'https://images.pexels.com/photos/1078884/pexels-photo-1078884.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1', true),
('770e8400-e29b-41d4-a716-446655440011', '660e8400-e29b-41d4-a716-446655440010', 'https://images.pexels.com/photos/209274/pexels-photo-209274.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&dpr=1', true);

-- Insert tool availability
INSERT INTO tool_availability (id, tool_id, start_date, end_date, blocked_dates) VALUES
('880e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440001', '2024-01-20', '2024-12-31', ARRAY['2024-02-10', '2024-02-11']::date[]),
('880e8400-e29b-41d4-a716-446655440002', '660e8400-e29b-41d4-a716-446655440002', '2024-01-25', '2024-11-30', ARRAY['2024-03-15', '2024-03-16', '2024-03-17']::date[]),
('880e8400-e29b-41d4-a716-446655440003', '660e8400-e29b-41d4-a716-446655440003', '2024-01-22', '2024-10-31', ARRAY[]::date[]),
('880e8400-e29b-41d4-a716-446655440004', '660e8400-e29b-41d4-a716-446655440004', '2024-01-15', '2024-12-15', ARRAY['2024-04-01', '2024-04-02']::date[]),
('880e8400-e29b-41d4-a716-446655440005', '660e8400-e29b-41d4-a716-446655440005', '2024-02-01', '2024-11-30', ARRAY['2024-05-20', '2024-05-21']::date[]),
('880e8400-e29b-41d4-a716-446655440006', '660e8400-e29b-41d4-a716-446655440006', '2024-01-10', '2024-12-20', ARRAY[]::date[]),
('880e8400-e29b-41d4-a716-446655440007', '660e8400-e29b-41d4-a716-446655440007', '2024-01-18', '2024-10-15', ARRAY['2024-06-10']::date[]),
('880e8400-e29b-41d4-a716-446655440008', '660e8400-e29b-41d4-a716-446655440008', '2024-01-12', '2024-12-25', ARRAY[]::date[]),
('880e8400-e29b-41d4-a716-446655440009', '660e8400-e29b-41d4-a716-446655440009', '2024-01-30', '2024-11-15', ARRAY['2024-07-04', '2024-07-05']::date[]),
('880e8400-e29b-41d4-a716-446655440010', '660e8400-e29b-41d4-a716-446655440010', '2024-01-08', '2024-12-10', ARRAY[]::date[]);

-- Insert operators
INSERT INTO operators (id, profile_id, skills, certifications, license_url, experience, hourly_rate, rating, review_count, completed_jobs, verified) VALUES
('990e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440003', ARRAY['Heavy Equipment', 'Excavation', 'Concrete Work'], ARRAY['OSHA 30', 'Heavy Equipment License'], '/docs/license-mike.pdf', 12, 75, 4.9, 78, 124, true),
('990e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440006', ARRAY['Landscaping', 'Tree Removal', 'Grading'], ARRAY['Arborist Certification', 'OSHA 10'], '/docs/license-maria.pdf', 8, 65, 4.8, 67, 89, true),
('990e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440009', ARRAY['Heavy Machinery', 'Demolition', 'Site Prep'], ARRAY['CDL Class A', 'Demolition License'], '/docs/license-carlos.pdf', 15, 85, 4.9, 145, 198, true),
('990e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440001', ARRAY['Power Tools', 'Construction', 'Carpentry'], ARRAY['Carpentry License'], null, 10, 55, 4.7, 89, 156, false),
('990e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440004', ARRAY['Tile Work', 'Flooring', 'Precision Cutting'], ARRAY['Tile Installation Cert'], null, 6, 50, 4.6, 34, 67, false),
('990e8400-e29b-41d4-a716-446655440006', '550e8400-e29b-41d4-a716-446655440007', ARRAY['Equipment Operation', 'Safety Training'], ARRAY['OSHA 30', 'Forklift Certified'], '/docs/license-robert.pdf', 20, 90, 4.9, 234, 345, true),
('990e8400-e29b-41d4-a716-446655440007', '550e8400-e29b-41d4-a716-446655440010', ARRAY['Power Tools', 'Assembly', 'Maintenance'], ARRAY['Tool Maintenance Cert'], null, 5, 45, 4.5, 28, 45, false),
('990e8400-e29b-41d4-a716-446655440008', '550e8400-e29b-41d4-a716-446655440002', ARRAY['General Labor', 'Tool Operation'], ARRAY['OSHA 10'], null, 3, 40, 4.4, 15, 23, false),
('990e8400-e29b-41d4-a716-446655440009', '550e8400-e29b-41d4-a716-446655440005', ARRAY['Construction', 'Equipment Setup'], ARRAY['Construction Safety'], null, 7, 60, 4.6, 32, 78, false),
('990e8400-e29b-41d4-a716-446655440010', '550e8400-e29b-41d4-a716-446655440008', ARRAY['Light Equipment', 'Cleaning'], ARRAY[], null, 2, 35, 4.3, 12, 18, false);

-- Insert operator availability
INSERT INTO operator_availability (id, operator_id, start_date, end_date, blocked_dates) VALUES
('aa0e8400-e29b-41d4-a716-446655440001', '990e8400-e29b-41d4-a716-446655440001', '2024-01-15', '2024-12-31', ARRAY['2024-02-14', '2024-02-15']::date[]),
('aa0e8400-e29b-41d4-a716-446655440002', '990e8400-e29b-41d4-a716-446655440002', '2024-01-20', '2024-11-30', ARRAY['2024-03-10']::date[]),
('aa0e8400-e29b-41d4-a716-446655440003', '990e8400-e29b-41d4-a716-446655440003', '2024-01-10', '2024-12-20', ARRAY['2024-04-15', '2024-04-16']::date[]),
('aa0e8400-e29b-41d4-a716-446655440004', '990e8400-e29b-41d4-a716-446655440004', '2024-01-25', '2024-10-31', ARRAY[]::date[]),
('aa0e8400-e29b-41d4-a716-446655440005', '990e8400-e29b-41d4-a716-446655440005', '2024-02-01', '2024-11-15', ARRAY['2024-05-01']::date[]),
('aa0e8400-e29b-41d4-a716-446655440006', '990e8400-e29b-41d4-a716-446655440006', '2024-01-05', '2024-12-25', ARRAY['2024-06-20', '2024-06-21']::date[]),
('aa0e8400-e29b-41d4-a716-446655440007', '990e8400-e29b-41d4-a716-446655440007', '2024-01-30', '2024-10-30', ARRAY[]::date[]),
('aa0e8400-e29b-41d4-a716-446655440008', '990e8400-e29b-41d4-a716-446655440008', '2024-02-15', '2024-11-30', ARRAY['2024-07-04']::date[]),
('aa0e8400-e29b-41d4-a716-446655440009', '990e8400-e29b-41d4-a716-446655440009', '2024-01-12', '2024-12-15', ARRAY[]::date[]),
('aa0e8400-e29b-41d4-a716-446655440010', '990e8400-e29b-41d4-a716-446655440010', '2024-02-01', '2024-10-15', ARRAY['2024-08-15']::date[]);

-- Insert bookings
INSERT INTO bookings (id, renter_id, tool_id, operator_id, start_date, end_date, duration, status, tool_cost, operator_cost, insurance_cost, platform_fee, tax, total, insurance_selected, insurance_type, insurance_coverage, deposit, payment_status) VALUES
('bb0e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440002', '660e8400-e29b-41d4-a716-446655440001', null, '2024-01-25', '2024-01-27', 2, 'confirmed', 90, 0, 24, 11.40, 9.12, 134.52, true, 'basic', 500, 100, 'paid'),
('bb0e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440005', '660e8400-e29b-41d4-a716-446655440002', '990e8400-e29b-41d4-a716-446655440001', '2024-02-01', '2024-02-03', 2, 'pending', 640, 1200, 600, 244, 195.20, 2879.20, true, 'premium', 1000, 1500, 'pending'),
('bb0e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440008', '660e8400-e29b-41d4-a716-446655440004', null, '2024-02-05', '2024-02-06', 1, 'confirmed', 35, 0, 20, 5.50, 4.40, 64.90, true, 'premium', 300, 75, 'paid'),
('bb0e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440002', '660e8400-e29b-41d4-a716-446655440006', null, '2024-02-10', '2024-02-12', 2, 'active', 60, 0, 32, 9.20, 7.36, 108.56, true, 'premium', 400, 60, 'paid'),
('bb0e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440005', '660e8400-e29b-41d4-a716-446655440008', null, '2024-02-15', '2024-02-17', 2, 'completed', 50, 0, 60, 11, 8.80, 129.80, true, 'premium', 600, 80, 'paid'),
('bb0e8400-e29b-41d4-a716-446655440006', '550e8400-e29b-41d4-a716-446655440008', '660e8400-e29b-41d4-a716-446655440005', '990e8400-e29b-41d4-a716-446655440003', '2024-03-01', '2024-03-03', 2, 'pending', 560, 1360, 480, 240, 192, 2832, true, 'premium', 1200, 2000, 'pending'),
('bb0e8400-e29b-41d4-a716-446655440007', '550e8400-e29b-41d4-a716-446655440002', '660e8400-e29b-41d4-a716-446655440009', null, '2024-03-05', '2024-03-08', 3, 'confirmed', 195, 0, 120, 31.50, 25.20, 371.70, true, 'premium', 800, 200, 'paid'),
('bb0e8400-e29b-41d4-a716-446655440008', '550e8400-e29b-41d4-a716-446655440005', '660e8400-e29b-41d4-a716-446655440003', '990e8400-e29b-41d4-a716-446655440005', '2024-03-10', '2024-03-11', 1, 'active', 85, 400, 50, 53.50, 42.80, 631.30, true, 'premium', 500, 200, 'paid'),
('bb0e8400-e29b-41d4-a716-446655440009', '550e8400-e29b-41d4-a716-446655440008', '660e8400-e29b-41d4-a716-446655440007', null, '2024-03-15', '2024-03-16', 1, 'completed', 95, 0, 60, 15.50, 12.40, 182.90, true, 'premium', 600, 150, 'paid'),
('bb0e8400-e29b-41d4-a716-446655440010', '550e8400-e29b-41d4-a716-446655440002', '660e8400-e29b-41d4-a716-446655440010', null, '2024-03-20', '2024-03-22', 2, 'confirmed', 80, 0, 48, 12.80, 10.24, 151.04, true, 'premium', 600, 90, 'paid');

-- Insert bids
INSERT INTO bids (id, tool_id, bidder_id, amount, status, expires_at) VALUES
('cc0e8400-e29b-41d4-a716-446655440001', '660e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440002', 75, 'active', '2024-02-15 23:59:59'),
('cc0e8400-e29b-41d4-a716-446655440002', '660e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440005', 65, 'outbid', '2024-02-15 23:59:59'),
('cc0e8400-e29b-41d4-a716-446655440003', '660e8400-e29b-41d4-a716-446655440007', '550e8400-e29b-41d4-a716-446655440008', 85, 'active', '2024-02-20 23:59:59'),
('cc0e8400-e29b-41d4-a716-446655440004', '660e8400-e29b-41d4-a716-446655440007', '550e8400-e29b-41d4-a716-446655440002', 80, 'outbid', '2024-02-20 23:59:59'),
('cc0e8400-e29b-41d4-a716-446655440005', '660e8400-e29b-41d4-a716-446655440010', '550e8400-e29b-41d4-a716-446655440005', 35, 'active', '2024-02-25 23:59:59'),
('cc0e8400-e29b-41d4-a716-446655440006', '660e8400-e29b-41d4-a716-446655440010', '550e8400-e29b-41d4-a716-446655440008', 32, 'outbid', '2024-02-25 23:59:59'),
('cc0e8400-e29b-41d4-a716-446655440007', '660e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440008', 70, 'outbid', '2024-01-30 23:59:59'),
('cc0e8400-e29b-41d4-a716-446655440008', '660e8400-e29b-41d4-a716-446655440007', '550e8400-e29b-41d4-a716-446655440005', 90, 'won', '2024-01-25 23:59:59'),
('cc0e8400-e29b-41d4-a716-446655440009', '660e8400-e29b-41d4-a716-446655440010', '550e8400-e29b-41d4-a716-446655440002', 38, 'expired', '2024-01-20 23:59:59'),
('cc0e8400-e29b-41d4-a716-446655440010', '660e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440005', 78, 'expired', '2024-01-15 23:59:59');

-- Insert reviews
INSERT INTO reviews (id, type, target_id, reviewer_id, booking_id, rating, comment, communication_rating, accuracy_rating, condition_rating, value_rating, photos, helpful, reported) VALUES
('dd0e8400-e29b-41d4-a716-446655440001', 'tool', '660e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440002', 'bb0e8400-e29b-41d4-a716-446655440001', 5, 'Excellent drill! Very powerful and batteries lasted the entire project.', 5, 5, 5, 4, ARRAY[]::text[], 3, false),
('dd0e8400-e29b-41d4-a716-446655440002', 'owner', '550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440002', 'bb0e8400-e29b-41d4-a716-446655440001', 5, 'John was very responsive and helpful. Tool was exactly as described.', 5, 5, 5, 5, ARRAY[]::text[], 2, false),
('dd0e8400-e29b-41d4-a716-446655440003', 'tool', '660e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440008', 'bb0e8400-e29b-41d4-a716-446655440003', 4, 'Good circular saw, cuts clean and straight. Blade was sharp.', 4, 5, 4, 4, ARRAY[]::text[], 1, false),
('dd0e8400-e29b-41d4-a716-446655440004', 'renter', '550e8400-e29b-41d4-a716-446655440008', '550e8400-e29b-41d4-a716-446655440007', 'bb0e8400-e29b-41d4-a716-446655440003', 5, 'Jennifer was careful with the tool and returned it clean.', 5, 5, 5, 5, ARRAY[]::text[], 0, false),
('dd0e8400-e29b-41d4-a716-446655440005', 'tool', '660e8400-e29b-41d4-a716-446655440008', '550e8400-e29b-41d4-a716-446655440005', 'bb0e8400-e29b-41d4-a716-446655440005', 5, 'Pressure washer worked perfectly for cleaning my deck.', 5, 5, 5, 5, ARRAY[]::text[], 4, false),
('dd0e8400-e29b-41d4-a716-446655440006', 'operator', '990e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440005', 'bb0e8400-e29b-41d4-a716-446655440002', 5, 'Mike is an excellent operator. Very skilled and professional.', 5, 5, 5, 5, ARRAY[]::text[], 5, false),
('dd0e8400-e29b-41d4-a716-446655440007', 'tool', '660e8400-e29b-41d4-a716-446655440007', '550e8400-e29b-41d4-a716-446655440008', 'bb0e8400-e29b-41d4-a716-446655440009', 4, 'Concrete mixer worked well for my small patio project.', 4, 4, 4, 4, ARRAY[]::text[], 2, false),
('dd0e8400-e29b-41d4-a716-446655440008', 'tool', '660e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440005', 'bb0e8400-e29b-41d4-a716-446655440008', 5, 'Tile saw made perfect cuts. Very precise and easy to use.', 5, 5, 5, 4, ARRAY[]::text[], 3, false),
('dd0e8400-e29b-41d4-a716-446655440009', 'owner', '550e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440005', 'bb0e8400-e29b-41d4-a716-446655440008', 5, 'Lisa was great to work with. Clear communication throughout.', 5, 5, 5, 5, ARRAY[]::text[], 1, false),
('dd0e8400-e29b-41d4-a716-446655440010', 'tool', '660e8400-e29b-41d4-a716-446655440006', '550e8400-e29b-41d4-a716-446655440002', 'bb0e8400-e29b-41d4-a716-446655440004', 5, 'Impact driver set was perfect for my furniture assembly project.', 5, 5, 5, 5, ARRAY[]::text[], 2, false);

-- Insert chats
INSERT INTO chats (id, participants, booking_id) VALUES
('ee0e8400-e29b-41d4-a716-446655440001', ARRAY['550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440002']::uuid[], 'bb0e8400-e29b-41d4-a716-446655440001'),
('ee0e8400-e29b-41d4-a716-446655440002', ARRAY['550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440005']::uuid[], 'bb0e8400-e29b-41d4-a716-446655440002'),
('ee0e8400-e29b-41d4-a716-446655440003', ARRAY['550e8400-e29b-41d4-a716-446655440007', '550e8400-e29b-41d4-a716-446655440008']::uuid[], 'bb0e8400-e29b-41d4-a716-446655440003'),
('ee0e8400-e29b-41d4-a716-446655440004', ARRAY['550e8400-e29b-41d4-a716-446655440010', '550e8400-e29b-41d4-a716-446655440002']::uuid[], 'bb0e8400-e29b-41d4-a716-446655440004'),
('ee0e8400-e29b-41d4-a716-446655440005', ARRAY['550e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440005']::uuid[], 'bb0e8400-e29b-41d4-a716-446655440005'),
('ee0e8400-e29b-41d4-a716-446655440006', ARRAY['550e8400-e29b-41d4-a716-446655440007', '550e8400-e29b-41d4-a716-446655440008']::uuid[], 'bb0e8400-e29b-41d4-a716-446655440006'),
('ee0e8400-e29b-41d4-a716-446655440007', ARRAY['550e8400-e29b-41d4-a716-446655440007', '550e8400-e29b-41d4-a716-446655440002']::uuid[], 'bb0e8400-e29b-41d4-a716-446655440007'),
('ee0e8400-e29b-41d4-a716-446655440008', ARRAY['550e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440005']::uuid[], 'bb0e8400-e29b-41d4-a716-446655440008'),
('ee0e8400-e29b-41d4-a716-446655440009', ARRAY['550e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440008']::uuid[], 'bb0e8400-e29b-41d4-a716-446655440009'),
('ee0e8400-e29b-41d4-a716-446655440010', ARRAY['550e8400-e29b-41d4-a716-446655440010', '550e8400-e29b-41d4-a716-446655440002']::uuid[], 'bb0e8400-e29b-41d4-a716-446655440010');

-- Insert messages
INSERT INTO messages (id, chat_id, sender_id, content, attachments, type, read) VALUES
('ff0e8400-e29b-41d4-a716-446655440001', 'ee0e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440002', 'Hi John! I''m interested in renting your DeWalt drill for this weekend.', ARRAY[]::text[], 'text', true),
('ff0e8400-e29b-41d4-a716-446655440002', 'ee0e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 'Hello Sarah! Yes, it''s available. Would you like the extra battery pack?', ARRAY[]::text[], 'text', true),
('ff0e8400-e29b-41d4-a716-446655440003', 'ee0e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440005', 'Is the excavator available for next week?', ARRAY[]::text[], 'text', true),
('ff0e8400-e29b-41d4-a716-446655440004', 'ee0e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440001', 'Yes, but you''ll need an operator. I can arrange that.', ARRAY[]::text[], 'text', false),
('ff0e8400-e29b-41d4-a716-446655440005', 'ee0e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440008', 'What time can I pick up the circular saw?', ARRAY[]::text[], 'text', true),
('ff0e8400-e29b-41d4-a716-446655440006', 'ee0e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440007', 'Anytime after 9 AM works for me.', ARRAY[]::text[], 'text', true),
('ff0e8400-e29b-41d4-a716-446655440007', 'ee0e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440002', 'The impact driver looks perfect for my project!', ARRAY[]::text[], 'text', true),
('ff0e8400-e29b-41d4-a716-446655440008', 'ee0e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440010', 'Great! It comes with a full bit set too.', ARRAY[]::text[], 'text', false),
('ff0e8400-e29b-41d4-a716-446655440009', 'ee0e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440005', 'Thanks for the quick rental process!', ARRAY[]::text[], 'text', true),
('ff0e8400-e29b-41d4-a716-446655440010', 'ee0e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440001', 'You''re welcome! Hope the pressure washer works well.', ARRAY[]::text[], 'text', true),
('ff0e8400-e29b-41d4-a716-446655440011', 'ee0e8400-e29b-41d4-a716-446655440006', '550e8400-e29b-41d4-a716-446655440008', 'Do you have availability for the skid steer next month?', ARRAY[]::text[], 'text', false),
('ff0e8400-e29b-41d4-a716-446655440012', 'ee0e8400-e29b-41d4-a716-446655440007', '550e8400-e29b-41d4-a716-446655440002', 'The generator worked perfectly for our event!', ARRAY[]::text[], 'text', true);

-- Insert notifications
INSERT INTO notifications (id, user_id, type, title, message, read, action_url) VALUES
('110e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 'booking', 'New Booking Request', 'Sarah Johnson wants to rent your DeWalt drill for Jan 25-27', false, '/dashboard/bookings'),
('110e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440002', 'booking', 'Booking Confirmed', 'Your booking for DeWalt drill has been confirmed', true, '/dashboard/rentals'),
('110e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440001', 'review', 'New Review Received', 'Sarah Johnson left a 5-star review for your DeWalt drill', true, '/dashboard/reviews'),
('110e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440005', 'bid', 'Bid Outbid', 'Your bid on the tile saw has been outbid', false, '/dashboard/bids'),
('110e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440004', 'bid', 'New Bid Received', 'Someone placed a bid on your tile saw', false, '/dashboard/tools'),
('110e8400-e29b-41d4-a716-446655440006', '550e8400-e29b-41d4-a716-446655440008', 'message', 'New Message', 'Robert Taylor sent you a message', false, '/dashboard/messages'),
('110e8400-e29b-41d4-a716-446655440007', '550e8400-e29b-41d4-a716-446655440007', 'payment', 'Payment Received', 'Payment received for circular saw rental', true, '/dashboard/bookings'),
('110e8400-e29b-41d4-a716-446655440008', '550e8400-e29b-41d4-a716-446655440002', 'booking', 'Rental Reminder', 'Your DeWalt drill rental starts tomorrow', true, '/dashboard/rentals'),
('110e8400-e29b-41d4-a716-446655440009', '550e8400-e29b-41d4-a716-446655440010', 'review', 'Review Request', 'Please review your recent rental experience', false, '/dashboard/reviews'),
('110e8400-e29b-41d4-a716-446655440010', '550e8400-e29b-41d4-a716-446655440003', 'booking', 'Operator Assignment', 'You''ve been assigned to operate excavator for David Brown', false, '/dashboard/jobs');

-- Insert insurance claims
INSERT INTO insurance_claims (id, booking_id, claimant_id, type, description, photos, status, amount_claimed, amount_approved) VALUES
('120e8400-e29b-41d4-a716-446655440001', 'bb0e8400-e29b-41d4-a716-446655440005', '550e8400-e29b-41d4-a716-446655440005', 'damage', 'Minor scratch on pressure washer housing during transport', ARRAY['claim_photo_1.jpg']::text[], 'approved', 25.00, 20.00),
('120e8400-e29b-41d4-a716-446655440002', 'bb0e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440008', 'malfunction', 'Circular saw blade guard stuck during use', ARRAY[]::text[], 'resolved', 15.00, 15.00),
('120e8400-e29b-41d4-a716-446655440003', 'bb0e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440005', 'damage', 'Hydraulic leak in excavator during operation', ARRAY['claim_photo_2.jpg', 'claim_photo_3.jpg']::text[], 'pending', 450.00, null),
('120e8400-e29b-41d4-a716-446655440004', 'bb0e8400-e29b-41d4-a716-446655440009', '550e8400-e29b-41d4-a716-446655440008', 'theft', 'Concrete mixer accessories stolen from job site', ARRAY['police_report.pdf']::text[], 'approved', 85.00, 75.00),
('120e8400-e29b-41d4-a716-446655440005', 'bb0e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440002', 'damage', 'Impact driver case cracked during rental', ARRAY[]::text[], 'denied', 30.00, 0.00),
('120e8400-e29b-41d4-a716-446655440006', 'bb0e8400-e29b-41d4-a716-446655440007', '550e8400-e29b-41d4-a716-446655440002', 'malfunction', 'Generator failed to start on second day', ARRAY[]::text[], 'resolved', 65.00, 50.00),
('120e8400-e29b-41d4-a716-446655440007', 'bb0e8400-e29b-41d4-a716-446655440008', '550e8400-e29b-41d4-a716-446655440005', 'damage', 'Tile saw water pump damaged during use', ARRAY['damage_photo.jpg']::text[], 'approved', 120.00, 100.00),
('120e8400-e29b-41d4-a716-446655440008', 'bb0e8400-e29b-41d4-a716-446655440006', '550e8400-e29b-41d4-a716-446655440008', 'damage', 'Skid steer track damaged on rocky terrain', ARRAY['track_damage.jpg']::text[], 'pending', 800.00, null),
('120e8400-e29b-41d4-a716-446655440009', 'bb0e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440002', 'loss', 'Drill bit set lost during project', ARRAY[]::text[], 'approved', 40.00, 35.00),
('120e8400-e29b-41d4-a716-446655440010', 'bb0e8400-e29b-41d4-a716-446655440010', '550e8400-e29b-41d4-a716-446655440002', 'damage', 'Angle grinder disc guard bent during use', ARRAY[]::text[], 'resolved', 18.00, 15.00);