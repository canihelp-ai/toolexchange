@@ .. @@
 /*
   # Sample Data for Tool Exchange Platform
 
   This migration creates sample data for all tables except profiles (handled by Supabase Auth).
-  Uses the actual user ID: 00000000-0000-0000-0000-000000000000
+  Uses the actual user ID: 88cb0910-4628-490c-b4be-44d1e4abc05c
 
   1. Creates 1 profile for the existing auth user
   2. Creates 1 operator profile for the same user
@@ .. @@
 
 -- Create profile for the existing auth user
 INSERT INTO profiles (
-  id, email, name, phone, avatar_url, location, bio, role, 
+  id, email, name, phone, avatar_url, location, bio, role,
   email_verified, phone_verified, id_verified, rating, review_count, trust_score
 ) VALUES (
-  '00000000-0000-0000-0000-000000000000',
+  '88cb0910-4628-490c-b4be-44d1e4abc05c',
   'john@example.com',
   'John Martinez',
   '(555) 123-4567',
@@ .. @@
 
 -- Create operator profile for the same user
 INSERT INTO operators (
   profile_id, skills, certifications, license_url, experience, hourly_rate,
   rating, review_count, completed_jobs, verified
 ) VALUES (
-  '00000000-0000-0000-0000-000000000000',
+  '88cb0910-4628-490c-b4be-44d1e4abc05c',
   ARRAY['Heavy Equipment', 'Excavation', 'Concrete Work', 'Landscaping'],
   ARRAY['OSHA 30', 'Heavy Equipment License', 'Forklift Certified'],
   '/docs/license-john.pdf',
@@ .. @@
 
 -- Create 10 tools (all owned by our user)
 INSERT INTO tools (
   owner_id, title, description, category, brand, model, location, condition,
   specifications, pricing_type, hourly_rate, daily_rate, weekly_rate,
   current_bid, suggested_bid, operator_available, operator_required, operator_id, operator_rate,
   insurance_available, basic_coverage, premium_coverage, rating, review_count,
   features, rules, deposit, status, views, favorites
 ) VALUES
 (
-  '00000000-0000-0000-0000-000000000000',
+  '88cb0910-4628-490c-b4be-44d1e4abc05c',
   'DeWalt 20V Max Cordless Drill Set',
   'Professional-grade cordless drill with 2 batteries, charger, and carrying case. Perfect for construction and home projects.',
   'Power Tools', 'DeWalt', 'DCD771C2', 'San Francisco, CA', 'excellent',
@@ .. @@
   ARRAY['No wet conditions', 'Return clean', 'Report any damage immediately'], 100, 'active', 245, 18
 ),
 (
-  '00000000-0000-0000-0000-000000000000',
+  '88cb0910-4628-490c-b4be-44d1e4abc05c',
   'Compact Excavator - Bobcat E35',
   'Perfect for small construction projects, landscaping, and utility work. Includes operator service available.',
   'Heavy Equipment', 'Bobcat', 'E35', 'San Francisco, CA', 'good',
@@ .. @@
   '{"Operating Weight": "8,000 lbs", "Max Dig Depth": "11 ft 2 in", "Bucket Capacity": "0.28 yd³", "Engine Power": "24.8 HP"}',
-  'fixed', NULL, 320, 1800, NULL, NULL, true, true, '00000000-0000-0000-0000-000000000000', 75,
+  'fixed', NULL, 320, 1800, NULL, NULL, true, true, '88cb0910-4628-490c-b4be-44d1e4abc05c', 75,
   true, 150, 300, 4.9, 12,
   ARRAY['Hydraulic Thumbs', 'Rubber Tracks', 'Auxiliary Hydraulics', 'Enclosed Cab'],
   ARRAY['Valid license required', 'Operator must be present', 'No weekend returns'], 1500, 'active', 89, 7
 ),
 (
-  '00000000-0000-0000-0000-000000000000',
+  '88cb0910-4628-490c-b4be-44d1e4abc05c',
   'Professional Tile Saw - MK Diamond',
   'High-precision tile saw for professional and DIY projects. Includes diamond blade and water pump system.',
   'Construction Tools', 'MK Diamond', 'MK-370EXP', 'San Francisco, CA', 'excellent',
@@ .. @@
   ARRAY['Provide own extension cord', 'Clean after use', 'No concrete cutting'], 200, 'active', 156, 12
 ),
 (
-  '00000000-0000-0000-0000-000000000000',
+  '88cb0910-4628-490c-b4be-44d1e4abc05c',
   'Milwaukee M18 Circular Saw',
   'Powerful cordless circular saw with brushless motor. Includes battery and charger.',
   'Power Tools', 'Milwaukee', 'M18CCS66', 'San Francisco, CA', 'excellent',
@@ .. @@
   ARRAY['Keep blade sharp', 'No metal cutting', 'Return with battery charged'], 75, 'active', 134, 9
 ),
 (
-  '00000000-0000-0000-0000-000000000000',
+  '88cb0910-4628-490c-b4be-44d1e4abc05c',
   'Pressure Washer - Simpson 3200 PSI',
   'Gas-powered pressure washer perfect for cleaning driveways, decks, and siding.',
   'Cleaning Equipment', 'Simpson', 'MS60763-S', 'San Francisco, CA', 'good',
@@ .. @@
   ARRAY['Use proper detergent only', 'No hot water', 'Clean after use'], 150, 'active', 98, 6
 ),
 (
-  '00000000-0000-0000-0000-000000000000',
+  '88cb0910-4628-490c-b4be-44d1e4abc05c',
   'Table Saw - SawStop Professional',
   'Cabinet table saw with safety brake system. Perfect for precision woodworking.',
   'Woodworking Tools', 'SawStop', 'PCS175-TGP236', 'San Francisco, CA', 'excellent',
@@ .. @@
   ARRAY['Safety glasses required', 'No metal cutting', 'Keep workspace clean'], 300, 'active', 187, 15
 ),
 (
-  '00000000-0000-0000-0000-000000000000',
+  '88cb0910-4628-490c-b4be-44d1e4abc05c',
   'Generator - Honda EU3000iS',
   'Quiet inverter generator perfect for job sites and emergency backup power.',
   'Power Generation', 'Honda', 'EU3000iS', 'San Francisco, CA', 'excellent',
@@ .. @@
   ARRAY['Use fresh fuel only', 'No indoor use', 'Check oil level'], 200, 'active', 156, 11
 ),
 (
-  '00000000-0000-0000-0000-000000000000',
+  '88cb0910-4628-490c-b4be-44d1e4abc05c',
   'Welding Machine - Lincoln Electric',
   'MIG welder suitable for automotive and fabrication work. Includes helmet and gloves.',
   'Welding Equipment', 'Lincoln Electric', 'MP210', 'San Francisco, CA', 'good',
@@ .. @@
   ARRAY['Welding experience required', 'Provide own consumables', 'Ventilation required'], 250, 'active', 78, 4
 ),
 (
-  '00000000-0000-0000-0000-000000000000',
+  '88cb0910-4628-490c-b4be-44d1e4abc05c',
   'Scaffolding System - 6ft x 6ft',
   'Complete scaffolding system with platforms and safety rails. Perfect for painting and repairs.',
   'Safety Equipment', 'Werner', 'PS-48', 'San Francisco, CA', 'good',
@@ .. @@
   ARRAY['Assembly required', 'Safety training recommended', 'Level ground only'], 100, 'active', 67, 3
 ),
 (
-  '00000000-0000-0000-0000-000000000000',
+  '88cb0910-4628-490c-b4be-44d1e4abc05c',
   'Air Compressor - Ingersoll Rand',
   'Two-stage air compressor perfect for pneumatic tools and spray painting.',
   'Air Tools', 'Ingersoll Rand', 'SS3J5-GS', 'San Francisco, CA', 'excellent',
@@ .. @@
 
 -- Create 10 bookings (mix of different statuses and scenarios)
 INSERT INTO bookings (
   renter_id, tool_id, operator_id, start_date, end_date, duration,
   status, tool_cost, operator_cost, insurance_cost, platform_fee, tax, total,
   insurance_selected, insurance_type, insurance_coverage, deposit, payment_status
 ) VALUES
 (
-  '00000000-0000-0000-0000-000000000000',
+  '88cb0910-4628-490c-b4be-44d1e4abc05c',
   (SELECT id FROM tools WHERE title = 'DeWalt 20V Max Cordless Drill Set'),
   NULL, '2024-01-25', '2024-01-27', 2,
   'completed', 90, 0, 12, 10.20, 8.16, 120.36,
   true, 'basic', 500, 100, 'paid'
 ),
 (
-  '00000000-0000-0000-0000-000000000000',
+  '88cb0910-4628-490c-b4be-44d1e4abc05c',
   (SELECT id FROM tools WHERE title = 'Compact Excavator - Bobcat E35'),
-  (SELECT id FROM operators WHERE profile_id = '00000000-0000-0000-0000-000000000000'),
+  (SELECT id FROM operators WHERE profile_id = '88cb0910-4628-490c-b4be-44d1e4abc05c'),
   '2024-02-01', '2024-02-03', 2,
   'active', 640, 1200, 300, 214, 171.2, 2525.2,
   true, 'premium', 1000, 1500, 'paid'
 ),
 (
-  '00000000-0000-0000-0000-000000000000',
+  '88cb0910-4628-490c-b4be-44d1e4abc05c',
   (SELECT id FROM tools WHERE title = 'Professional Tile Saw - MK Diamond'),
   NULL, '2024-01-20', '2024-01-22', 2,
   'completed', 170, 0, 50, 22, 17.6, 259.6,
   true, 'basic', 500, 200, 'paid'
 ),
 (
-  '00000000-0000-0000-0000-000000000000',
+  '88cb0910-4628-490c-b4be-44d1e4abc05c',
   (SELECT id FROM tools WHERE title = 'Milwaukee M18 Circular Saw'),
   NULL, '2024-02-05', '2024-02-07', 2,
   'confirmed', 110, 0, 0, 11, 8.8, 129.8,
   false, NULL, 0, 75, 'paid'
 ),
 (
-  '00000000-0000-0000-0000-000000000000',
+  '88cb0910-4628-490c-b4be-44d1e4abc05c',
   (SELECT id FROM tools WHERE title = 'Pressure Washer - Simpson 3200 PSI'),
   NULL, '2024-02-10', '2024-02-12', 2,
   'pending', 160, 0, 24, 18.4, 14.72, 217.12,
   true, 'basic', 500, 150, 'pending'
 ),
 (
-  '00000000-0000-0000-0000-000000000000',
+  '88cb0910-4628-490c-b4be-44d1e4abc05c',
   (SELECT id FROM tools WHERE title = 'Table Saw - SawStop Professional'),
   NULL, '2024-01-15', '2024-01-18', 3,
   'completed', 270, 0, 36, 30.6, 24.48, 361.08,
   true, 'basic', 750, 300, 'paid'
 ),
 (
-  '00000000-0000-0000-0000-000000000000',
+  '88cb0910-4628-490c-b4be-44d1e4abc05c',
   (SELECT id FROM tools WHERE title = 'Generator - Honda EU3000iS'),
   NULL, '2024-02-15', '2024-02-17', 2,
   'confirmed', 140, 0, 0, 14, 11.2, 165.2,
   false, NULL, 0, 200, 'paid'
 ),
 (
-  '00000000-0000-0000-0000-000000000000',
+  '88cb0910-4628-490c-b4be-44d1e4abc05c',
   (SELECT id FROM tools WHERE title = 'Welding Machine - Lincoln Electric'),
   NULL, '2024-01-28', '2024-01-30', 2,
   'completed', 200, 0, 48, 24.8, 19.84, 292.64,
   true, 'premium', 1000, 250, 'paid'
 ),
 (
-  '00000000-0000-0000-0000-000000000000',
+  '88cb0910-4628-490c-b4be-44d1e4abc05c',
   (SELECT id FROM tools WHERE title = 'Scaffolding System - 6ft x 6ft'),
   NULL, '2024-02-20', '2024-02-25', 5,
   'pending', 300, 0, 60, 36, 28.8, 424.8,
   true, 'basic', 1250, 100, 'pending'
 ),
 (
-  '00000000-0000-0000-0000-000000000000',
+  '88cb0910-4628-490c-b4be-44d1e4abc05c',
   (SELECT id FROM tools WHERE title = 'Air Compressor - Ingersoll Rand'),
   NULL, '2024-02-08', '2024-02-10', 2,
   'active', 180, 0, 0, 18, 14.4, 212.4,
   false, NULL, 0, 180, 'paid'
@@ .. @@
 
 -- Create 10 bids (for tools with bidding pricing)
 INSERT INTO bids (
   tool_id, bidder_id, amount, status, expires_at
 ) VALUES
 (
   (SELECT id FROM tools WHERE title = 'Professional Tile Saw - MK Diamond'),
-  '00000000-0000-0000-0000-000000000000', 75, 'active', '2024-02-28 23:59:59'
+  '88cb0910-4628-490c-b4be-44d1e4abc05c', 75, 'active', '2024-02-28 23:59:59'
 ),
 (
   (SELECT id FROM tools WHERE title = 'Professional Tile Saw - MK Diamond'),
-  '00000000-0000-0000-0000-000000000000', 70, 'outbid', '2024-02-27 23:59:59'
+  '88cb0910-4628-490c-b4be-44d1e4abc05c', 70, 'outbid', '2024-02-27 23:59:59'
 ),
 (
   (SELECT id FROM tools WHERE title = 'Professional Tile Saw - MK Diamond'),
-  '00000000-0000-0000-0000-000000000000', 65, 'outbid', '2024-02-26 23:59:59'
+  '88cb0910-4628-490c-b4be-44d1e4abc05c', 65, 'outbid', '2024-02-26 23:59:59'
 ),
 (
   (SELECT id FROM tools WHERE title = 'Welding Machine - Lincoln Electric'),
-  '00000000-0000-0000-0000-000000000000', 95, 'active', '2024-03-01 23:59:59'
+  '88cb0910-4628-490c-b4be-44d1e4abc05c', 95, 'active', '2024-03-01 23:59:59'
 ),
 (
   (SELECT id FROM tools WHERE title = 'Welding Machine - Lincoln Electric'),
-  '00000000-0000-0000-0000-000000000000', 90, 'outbid', '2024-02-29 23:59:59'
+  '88cb0910-4628-490c-b4be-44d1e4abc05c', 90, 'outbid', '2024-02-29 23:59:59'
 ),
 (
   (SELECT id FROM tools WHERE title = 'Generator - Honda EU3000iS'),
-  '00000000-0000-0000-0000-000000000000', 65, 'won', '2024-02-15 23:59:59'
+  '88cb0910-4628-490c-b4be-44d1e4abc05c', 65, 'won', '2024-02-15 23:59:59'
 ),
 (
   (SELECT id FROM tools WHERE title = 'Generator - Honda EU3000iS'),
-  '00000000-0000-0000-0000-000000000000', 60, 'outbid', '2024-02-14 23:59:59'
+  '88cb0910-4628-490c-b4be-44d1e4abc05c', 60, 'outbid', '2024-02-14 23:59:59'
 ),
 (
   (SELECT id FROM tools WHERE title = 'Air Compressor - Ingersoll Rand'),
-  '00000000-0000-0000-0000-000000000000', 85, 'active', '2024-03-05 23:59:59'
+  '88cb0910-4628-490c-b4be-44d1e4abc05c', 85, 'active', '2024-03-05 23:59:59'
 ),
 (
   (SELECT id FROM tools WHERE title = 'Air Compressor - Ingersoll Rand'),
-  '00000000-0000-0000-0000-000000000000', 80, 'outbid', '2024-03-04 23:59:59'
+  '88cb0910-4628-490c-b4be-44d1e4abc05c', 80, 'outbid', '2024-03-04 23:59:59'
 ),
 (
   (SELECT id FROM tools WHERE title = 'Scaffolding System - 6ft x 6ft'),
-  '00000000-0000-0000-0000-000000000000', 55, 'expired', '2024-02-01 23:59:59'
+  '88cb0910-4628-490c-b4be-44d1e4abc05c', 55, 'expired', '2024-02-01 23:59:59'
 );
 
 -- Create 10 reviews (mix of tool, owner, renter, operator reviews)
 INSERT INTO reviews (
   type, target_id, reviewer_id, booking_id, rating, comment,
   communication_rating, accuracy_rating, condition_rating, value_rating, photos, helpful
 ) VALUES
 (
   'tool', (SELECT id FROM tools WHERE title = 'DeWalt 20V Max Cordless Drill Set'),
-  '00000000-0000-0000-0000-000000000000',
+  '88cb0910-4628-490c-b4be-44d1e4abc05c',
   (SELECT id FROM bookings WHERE tool_id = (SELECT id FROM tools WHERE title = 'DeWalt 20V Max Cordless Drill Set') LIMIT 1),
   5, 'Excellent drill! Very powerful and the batteries lasted the entire project. John was very responsive and helpful.',
   5, 5, 5, 4, ARRAY[]::text[], 3
 ),
 (
   'tool', (SELECT id FROM tools WHERE title = 'Compact Excavator - Bobcat E35'),
-  '00000000-0000-0000-0000-000000000000',
+  '88cb0910-4628-490c-b4be-44d1e4abc05c',
   (SELECT id FROM bookings WHERE tool_id = (SELECT id FROM tools WHERE title = 'Compact Excavator - Bobcat E35') LIMIT 1),
   5, 'Perfect for our landscaping project. The operator was skilled and professional.',
   5, 5, 5, 5, ARRAY[]::text[], 5
 ),
 (
   'tool', (SELECT id FROM tools WHERE title = 'Professional Tile Saw - MK Diamond'),
-  '00000000-0000-0000-0000-000000000000',
+  '88cb0910-4628-490c-b4be-44d1e4abc05c',
   (SELECT id FROM bookings WHERE tool_id = (SELECT id FROM tools WHERE title = 'Professional Tile Saw - MK Diamond') LIMIT 1),
   4, 'Great saw for precision cuts. A bit heavy but works perfectly.',
   4, 5, 4, 4, ARRAY[]::text[], 2
 ),
 (
-  'owner', '00000000-0000-0000-0000-000000000000',
-  '00000000-0000-0000-0000-000000000000',
+  'owner', '88cb0910-4628-490c-b4be-44d1e4abc05c',
+  '88cb0910-4628-490c-b4be-44d1e4abc05c',
   (SELECT id FROM bookings LIMIT 1),
   5, 'John is an excellent tool owner. Tools are well-maintained and he provides great service.',
   5, 5, 5, 5, ARRAY[]::text[], 8
 ),
 (
-  'renter', '00000000-0000-0000-0000-000000000000',
-  '00000000-0000-0000-0000-000000000000',
+  'renter', '88cb0910-4628-490c-b4be-44d1e4abc05c',
+  '88cb0910-4628-490c-b4be-44d1e4abc05c',
   (SELECT id FROM bookings LIMIT 1),
   5, 'Responsible renter who took great care of the equipment.',
   5, 5, 5, 5, ARRAY[]::text[], 4
 ),
 (
-  'operator', (SELECT id FROM operators WHERE profile_id = '00000000-0000-0000-0000-000000000000'),
-  '00000000-0000-0000-0000-000000000000',
+  'operator', (SELECT id FROM operators WHERE profile_id = '88cb0910-4628-490c-b4be-44d1e4abc05c'),
+  '88cb0910-4628-490c-b4be-44d1e4abc05c',
   (SELECT id FROM bookings WHERE operator_id IS NOT NULL LIMIT 1),
   5, 'Highly skilled operator with great attention to safety and quality.',
   5, 5, 5, 5, ARRAY[]::text[], 6
 ),
 (
   'tool', (SELECT id FROM tools WHERE title = 'Milwaukee M18 Circular Saw'),
-  '00000000-0000-0000-0000-000000000000', NULL,
+  '88cb0910-4628-490c-b4be-44d1e4abc05c', NULL,
   4, 'Solid circular saw with good battery life. Cut through everything I needed.',
   4, 4, 4, 4, ARRAY[]::text[], 1
 ),
 (
   'tool', (SELECT id FROM tools WHERE title = 'Table Saw - SawStop Professional'),
-  '00000000-0000-0000-0000-000000000000',
+  '88cb0910-4628-490c-b4be-44d1e4abc05c',
   (SELECT id FROM bookings WHERE tool_id = (SELECT id FROM tools WHERE title = 'Table Saw - SawStop Professional') LIMIT 1),
   5, 'Amazing safety features and precision cuts. Worth every penny.',
   5, 5, 5, 5, ARRAY[]::text[], 7
 ),
 (
   'tool', (SELECT id FROM tools WHERE title = 'Welding Machine - Lincoln Electric'),
-  '00000000-0000-0000-0000-000000000000',
+  '88cb0910-4628-490c-b4be-44d1e4abc05c',
   (SELECT id FROM bookings WHERE tool_id = (SELECT id FROM tools WHERE title = 'Welding Machine - Lincoln Electric') LIMIT 1),
   4, 'Good welder for automotive work. Needed some adjustment but worked well.',
   4, 4, 3, 4, ARRAY[]::text[], 2
 ),
 (
   'tool', (SELECT id FROM tools WHERE title = 'Pressure Washer - Simpson 3200 PSI'),
-  '00000000-0000-0000-0000-000000000000', NULL,
+  '88cb0910-4628-490c-b4be-44d1e4abc05c', NULL,
   5, 'Powerful pressure washer that made quick work of cleaning my driveway.',
   5, 5, 5, 5, ARRAY[]::text[], 4
 );
 
 -- Create 10 chats
 INSERT INTO chats (
   participants, booking_id
 ) VALUES
 (
-  ARRAY['00000000-0000-0000-0000-000000000000'],
+  ARRAY['88cb0910-4628-490c-b4be-44d1e4abc05c'],
   (SELECT id FROM bookings LIMIT 1 OFFSET 0)
 ),
 (
-  ARRAY['00000000-0000-0000-0000-000000000000'],
+  ARRAY['88cb0910-4628-490c-b4be-44d1e4abc05c'],
   (SELECT id FROM bookings LIMIT 1 OFFSET 1)
 ),
 (
-  ARRAY['00000000-0000-0000-0000-000000000000'],
+  ARRAY['88cb0910-4628-490c-b4be-44d1e4abc05c'],
   (SELECT id FROM bookings LIMIT 1 OFFSET 2)
 ),
 (
-  ARRAY['00000000-0000-0000-0000-000000000000'],
+  ARRAY['88cb0910-4628-490c-b4be-44d1e4abc05c'],
   (SELECT id FROM bookings LIMIT 1 OFFSET 3)
 ),
 (
-  ARRAY['00000000-0000-0000-0000-000000000000'],
+  ARRAY['88cb0910-4628-490c-b4be-44d1e4abc05c'],
   (SELECT id FROM bookings LIMIT 1 OFFSET 4)
 ),
 (
-  ARRAY['00000000-0000-0000-0000-000000000000'],
+  ARRAY['88cb0910-4628-490c-b4be-44d1e4abc05c'],
   (SELECT id FROM bookings LIMIT 1 OFFSET 5)
 ),
 (
-  ARRAY['00000000-0000-0000-0000-000000000000'],
+  ARRAY['88cb0910-4628-490c-b4be-44d1e4abc05c'],
   (SELECT id FROM bookings LIMIT 1 OFFSET 6)
 ),
 (
-  ARRAY['00000000-0000-0000-0000-000000000000'],
+  ARRAY['88cb0910-4628-490c-b4be-44d1e4abc05c'],
   (SELECT id FROM bookings LIMIT 1 OFFSET 7)
 ),
 (
-  ARRAY['00000000-0000-0000-0000-000000000000'],
+  ARRAY['88cb0910-4628-490c-b4be-44d1e4abc05c'],
   (SELECT id FROM bookings LIMIT 1 OFFSET 8)
 ),
 (
-  ARRAY['00000000-0000-0000-0000-000000000000'],
+  ARRAY['88cb0910-4628-490c-b4be-44d1e4abc05c'],
   NULL
 );
 
 -- Create 10 messages
 INSERT INTO messages (
   chat_id, sender_id, content, attachments, type, read
 ) VALUES
 (
   (SELECT id FROM chats LIMIT 1 OFFSET 0),
-  '00000000-0000-0000-0000-000000000000',
+  '88cb0910-4628-490c-b4be-44d1e4abc05c',
   'Hi! I''m interested in renting your DeWalt drill for this weekend. Is it available?',
   ARRAY[]::text[], 'text', true
 ),
 (
   (SELECT id FROM chats LIMIT 1 OFFSET 0),
-  '00000000-0000-0000-0000-000000000000',
+  '88cb0910-4628-490c-b4be-44d1e4abc05c',
   'Hello! Yes, it''s available this weekend. Would you like me to include the extra battery pack?',
   ARRAY[]::text[], 'text', true
 ),
 (
   (SELECT id FROM chats LIMIT 1 OFFSET 1),
-  '00000000-0000-0000-0000-000000000000',
+  '88cb0910-4628-490c-b4be-44d1e4abc05c',
   'That would be great! What time works best for pickup?',
   ARRAY[]::text[], 'text', false
 ),
 (
   (SELECT id FROM chats LIMIT 1 OFFSET 2),
-  '00000000-0000-0000-0000-000000000000',
+  '88cb0910-4628-490c-b4be-44d1e4abc05c',
   'The excavator is ready for your project. I''ll have Mike operate it for you.',
   ARRAY[]::text[], 'text', true
 ),
 (
   (SELECT id FROM chats LIMIT 1 OFFSET 3),
-  '00000000-0000-0000-0000-000000000000',
+  '88cb0910-4628-490c-b4be-44d1e4abc05c',
   'Perfect! Mike did an excellent job. The project is complete.',
   ARRAY[]::text[], 'text', true
 ),
 (
   (SELECT id FROM chats LIMIT 1 OFFSET 4),
-  '00000000-0000-0000-0000-000000000000',
+  '88cb0910-4628-490c-b4be-44d1e4abc05c',
   'The tile saw worked perfectly for my bathroom renovation. Thank you!',
   ARRAY[]::text[], 'text', true
 ),
 (
   (SELECT id FROM chats LIMIT 1 OFFSET 5),
-  '00000000-0000-0000-0000-000000000000',
+  '88cb0910-4628-490c-b4be-44d1e4abc05c',
   'Can I extend the rental for one more day? I have a bit more work to finish.',
   ARRAY[]::text[], 'text', false
 ),
 (
   (SELECT id FROM chats LIMIT 1 OFFSET 6),
-  '00000000-0000-0000-0000-000000000000',
+  '88cb0910-4628-490c-b4be-44d1e4abc05c',
   'Sure, no problem! I''ll update the booking for you.',
   ARRAY[]::text[], 'text', true
 ),
 (
   (SELECT id FROM chats LIMIT 1 OFFSET 7),
-  '00000000-0000-0000-0000-000000000000',
+  '88cb0910-4628-490c-b4be-44d1e4abc05c',
   'The pressure washer cleaned my deck beautifully. Highly recommend!',
   ARRAY[]::text[], 'text', true
 ),
 (
   (SELECT id FROM chats LIMIT 1 OFFSET 8),
-  '00000000-0000-0000-0000-000000000000',
+  '88cb0910-4628-490c-b4be-44d1e4abc05c',
   'Thanks for the great review! Always happy to help with your projects.',
   ARRAY[]::text[], 'text', true
 );
 
 -- Create 10 notifications
 INSERT INTO notifications (
   user_id, type, title, message, read, action_url
 ) VALUES
 (
-  '00000000-0000-0000-0000-000000000000', 'booking',
+  '88cb0910-4628-490c-b4be-44d1e4abc05c', 'booking',
   'New Booking Request',
   'Someone wants to rent your DeWalt drill for Jan 25-27',
   false, '/dashboard/bookings'
 ),
 (
-  '00000000-0000-0000-0000-000000000000', 'review',
+  '88cb0910-4628-490c-b4be-44d1e4abc05c', 'review',
   'New Review Received',
   'You received a 5-star review for your DeWalt drill',
   true, '/dashboard/reviews'
 ),
 (
-  '00000000-0000-0000-0000-000000000000', 'bid',
+  '88cb0910-4628-490c-b4be-44d1e4abc05c', 'bid',
   'New Bid Placed',
   'Someone placed a bid of $75 on your tile saw',
   false, '/dashboard/tools'
 ),
 (
-  '00000000-0000-0000-0000-000000000000', 'message',
+  '88cb0910-4628-490c-b4be-44d1e4abc05c', 'message',
   'New Message',
   'You have a new message about your excavator rental',
   false, '/dashboard/messages'
 ),
 (
-  '00000000-0000-0000-0000-000000000000', 'payment',
+  '88cb0910-4628-490c-b4be-44d1e4abc05c', 'payment',
   'Payment Received',
   'Payment of $259.60 received for tile saw rental',
   true, '/dashboard/wallet'
 ),
 (
-  '00000000-0000-0000-0000-000000000000', 'booking',
+  '88cb0910-4628-490c-b4be-44d1e4abc05c', 'booking',
   'Booking Confirmed',
   'Your excavator booking has been confirmed',
   true, '/dashboard/bookings'
 ),
 (
-  '00000000-0000-0000-0000-000000000000', 'bid',
+  '88cb0910-4628-490c-b4be-44d1e4abc05c', 'bid',
   'Bid Won!',
   'Congratulations! You won the bid for the generator',
   false, '/dashboard/bids'
 ),
 (
-  '00000000-0000-0000-0000-000000000000', 'review',
+  '88cb0910-4628-490c-b4be-44d1e4abc05c', 'review',
   'Review Reminder',
   'Please review your recent table saw rental',
   false, '/dashboard/reviews'
 ),
 (
-  '00000000-0000-0000-0000-000000000000', 'dispute',
+  '88cb0910-4628-490c-b4be-44d1e4abc05c', 'dispute',
   'Insurance Claim Update',
   'Your insurance claim has been approved',
   true, '/dashboard/claims'
 ),
 (
-  '00000000-0000-0000-0000-000000000000', 'booking',
+  '88cb0910-4628-490c-b4be-44d1e4abc05c', 'booking',
   'Rental Reminder',
   'Your scaffolding rental starts tomorrow',
   false, '/dashboard/bookings'
@@ .. @@
 
 -- Create 10 insurance claims
 INSERT INTO insurance_claims (
   booking_id, claimant_id, type, description, photos, status, amount_claimed, amount_approved
 ) VALUES
 (
   (SELECT id FROM bookings WHERE insurance_selected = true LIMIT 1 OFFSET 0),
-  '00000000-0000-0000-0000-000000000000',
+  '88cb0910-4628-490c-b4be-44d1e4abc05c',
   'damage',
   'Minor scratch on drill case during transport',
   ARRAY['claim1_photo1.jpg', 'claim1_photo2.jpg'], 'approved', 25.00, 25.00
 ),
 (
   (SELECT id FROM bookings WHERE insurance_selected = true LIMIT 1 OFFSET 1),
-  '00000000-0000-0000-0000-000000000000',
+  '88cb0910-4628-490c-b4be-44d1e4abc05c',
   'theft',
   'Battery pack was stolen from job site',
   ARRAY['claim2_photo1.jpg'], 'approved', 150.00, 120.00
 ),
 (
   (SELECT id FROM bookings WHERE insurance_selected = true LIMIT 1 OFFSET 2),
-  '00000000-0000-0000-0000-000000000000',
+  '88cb0910-4628-490c-b4be-44d1e4abc05c',
   'damage',
   'Blade guard damaged during use',
   ARRAY['claim3_photo1.jpg', 'claim3_photo2.jpg'], 'pending', 75.00, NULL
 ),
 (
   (SELECT id FROM bookings WHERE insurance_selected = true LIMIT 1 OFFSET 3),
-  '00000000-0000-0000-0000-000000000000',
+  '88cb0910-4628-490c-b4be-44d1e4abc05c',
   'malfunction',
   'Hydraulic system failure during operation',
   ARRAY['claim4_photo1.jpg'], 'approved', 500.00, 450.00
 ),
 (
   (SELECT id FROM bookings WHERE insurance_selected = true LIMIT 1 OFFSET 4),
-  '00000000-0000-0000-0000-000000000000',
+  '88cb0910-4628-490c-b4be-44d1e4abc05c',
   'damage',
   'Water pump housing cracked',
   ARRAY['claim5_photo1.jpg'], 'denied', 200.00, 0.00
 ),
 (
   (SELECT id FROM bookings WHERE insurance_selected = true LIMIT 1 OFFSET 0),
-  '00000000-0000-0000-0000-000000000000',
+  '88cb0910-4628-490c-b4be-44d1e4abc05c',
   'damage',
   'Fence damaged during cutting operation',
   ARRAY['claim6_photo1.jpg', 'claim6_photo2.jpg'], 'resolved', 300.00, 275.00
 ),
 (
   (SELECT id FROM bookings WHERE insurance_selected = true LIMIT 1 OFFSET 1),
-  '00000000-0000-0000-0000-000000000000',
+  '88cb0910-4628-490c-b4be-44d1e4abc05c',
   'loss',
   'Generator fuel cap lost during transport',
   ARRAY[]::text[], 'approved', 15.00, 15.00
 ),
 (
   (SELECT id FROM bookings WHERE insurance_selected = true LIMIT 1 OFFSET 2),
-  '00000000-0000-0000-0000-000000000000',
+  '88cb0910-4628-490c-b4be-44d1e4abc05c',
   'damage',
   'Welding helmet visor cracked',
   ARRAY['claim8_photo1.jpg'], 'pending', 45.00, NULL
 ),
 (
   (SELECT id FROM bookings WHERE insurance_selected = true LIMIT 1 OFFSET 3),
-  '00000000-0000-0000-0000-000000000000',
+  '88cb0910-4628-490c-b4be-44d1e4abc05c',
   'damage',
   'Scaffolding platform board split',
   ARRAY['claim9_photo1.jpg', 'claim9_photo2.jpg'], 'approved', 80.00, 70.00
 ),
 (
   (SELECT id FROM bookings WHERE insurance_selected = true LIMIT 1 OFFSET 4),
-  '00000000-0000-0000-0000-000000000000',
+  '88cb0910-4628-490c-b4be-44d1e4abc05c',
   'malfunction',
   'Air compressor pressure switch failed',
   ARRAY['claim10_photo1.jpg'], 'resolved', 125.00, 100.00
@@ .. @@
 
 -- Create 10 operator availability records
 INSERT INTO operator_availability (
   operator_id, start_date, end_date, blocked_dates
 ) VALUES
 (
-  (SELECT id FROM operators WHERE profile_id = '00000000-0000-0000-0000-000000000000'),
+  (SELECT id FROM operators WHERE profile_id = '88cb0910-4628-490c-b4be-44d1e4abc05c'),
   '2024-02-01', '2024-02-29', ARRAY['2024-02-14', '2024-02-15']::date[]
 ),
 (
-  (SELECT id FROM operators WHERE profile_id = '00000000-0000-0000-0000-000000000000'),
+  (SELECT id FROM operators WHERE profile_id = '88cb0910-4628-490c-b4be-44d1e4abc05c'),
   '2024-03-01', '2024-03-31', ARRAY['2024-03-10', '2024-03-11']::date[]
 ),
 (
-  (SELECT id FROM operators WHERE profile_id = '00000000-0000-0000-0000-000000000000'),
+  (SELECT id FROM operators WHERE profile_id = '88cb0910-4628-490c-b4be-44d1e4abc05c'),
   '2024-04-01', '2024-04-30', ARRAY[]::date[]
 ),
 (
-  (SELECT id FROM operators WHERE profile_id = '00000000-0000-0000-0000-000000000000'),
+  (SELECT id FROM operators WHERE profile_id = '88cb0910-4628-490c-b4be-44d1e4abc05c'),
   '2024-05-01', '2024-05-31', ARRAY['2024-05-20', '2024-05-21', '2024-05-22']::date[]
 ),
 (
-  (SELECT id FROM operators WHERE profile_id = '00000000-0000-0000-0000-000000000000'),
+  (SELECT id FROM operators WHERE profile_id = '88cb0910-4628-490c-b4be-44d1e4abc05c'),
   '2024-06-01', '2024-06-30', ARRAY['2024-06-15']::date[]
 ),
 (
-  (SELECT id FROM operators WHERE profile_id = '00000000-0000-0000-0000-000000000000'),
+  (SELECT id FROM operators WHERE profile_id = '88cb0910-4628-490c-b4be-44d1e4abc05c'),
   '2024-07-01', '2024-07-31', ARRAY[]::date[]
 ),
 (
-  (SELECT id FROM operators WHERE profile_id = '00000000-0000-0000-0000-000000000000'),
+  (SELECT id FROM operators WHERE profile_id = '88cb0910-4628-490c-b4be-44d1e4abc05c'),
   '2024-08-01', '2024-08-31', ARRAY['2024-08-10', '2024-08-11']::date[]
 ),
 (
-  (SELECT id FROM operators WHERE profile_id = '00000000-0000-0000-0000-000000000000'),
+  (SELECT id FROM operators WHERE profile_id = '88cb0910-4628-490c-b4be-44d1e4abc05c'),
   '2024-09-01', '2024-09-30', ARRAY['2024-09-25', '2024-09-26', '2024-09-27']::date[]
 ),
 (
-  (SELECT id FROM operators WHERE profile_id = '00000000-0000-0000-0000-000000000000'),
+  (SELECT id FROM operators WHERE profile_id = '88cb0910-4628-490c-b4be-44d1e4abc05c'),
   '2024-10-01', '2024-10-31', ARRAY[]::date[]
 ),
 (
-  (SELECT id FROM operators WHERE profile_id = '00000000-0000-0000-0000-000000000000'),
+  (SELECT id FROM operators WHERE profile_id = '88cb0910-4628-490c-b4be-44d1e4abc05c'),
   '2024-11-01', '2024-11-30', ARRAY['2024-11-28', '2024-11-29']::date[]
 );