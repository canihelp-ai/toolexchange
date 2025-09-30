@@ .. @@
 /*
   # Create comprehensive sample data for tool exchange platform
 
   1. New Tables with Sample Data
     - `profiles` - 1 profile for authenticated user
     - `tools` - 10 diverse tools (power tools, heavy equipment, etc.)
     - `tool_images` - 20 tool images (2 per tool)
     - `tool_availability` - 10 availability records
     - `operators` - 1 operator profile
     - `operator_availability` - 1 operator availability
     - `bookings` - 10 booking records with various statuses
     - `bids` - 10 bids on tools with bidding pricing
     - `reviews` - 10 reviews for tools and users
     - `chats` - 10 chat conversations
     - `messages` - 30 messages across chats
     - `notifications` - 10 notifications for various activities
     - `insurance_claims` - 10 insurance claims with different statuses
 
   2. Security
     - All tables have RLS enabled
     - Proper foreign key relationships maintained
 
   3. Data Features
     - Realistic pricing and availability
     - Mix of fixed and bidding pricing types
     - Various tool conditions and categories
     - Complete booking lifecycle
     - Active chat conversations
     - Comprehensive review system
 */
 
--- Create profile for the authenticated user (ID: 00000000-0000-0000-0000-000000000000)
+-- Create profile for the authenticated user (ID: 88cb0910-4628-490c-b4be-44d1e4abc05c)
 INSERT INTO profiles (
   id,
   email,
   name,
   phone,
   avatar_url,
   location,
   bio,
   role,
   email_verified,
   phone_verified,
   id_verified,
   rating,
   review_count,
   trust_score
 ) VALUES (
-  '00000000-0000-0000-0000-000000000000',
-  'john@example.com',
+  '88cb0910-4628-490c-b4be-44d1e4abc05c',
+  'zion2999@gmail.com',
   'John Martinez',
   '(555) 123-4567',
   'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
   'San Francisco, CA',
   'Professional contractor with 15+ years experience. I rent out high-quality tools and equipment.',
   'owner',
   true,
   true,
   true,
   4.8,
   156,
   95
 );
 
 -- Create tools owned by the user
 INSERT INTO tools (
   owner_id,
   title,
   description,
   category,
   brand,
   model,
   location,
   condition,
   specifications,
   pricing_type,
   hourly_rate,
   daily_rate,
   weekly_rate,
   current_bid,
   suggested_bid,
   operator_available,
   operator_required,
   insurance_available,
   basic_coverage,
   premium_coverage,
   rating,
   review_count,
   features,
   rules,
   deposit,
   status,
   views,
   favorites
 ) VALUES 
-('00000000-0000-0000-0000-000000000000', 'DeWalt 20V Max Cordless Drill Set', 'Professional-grade cordless drill with 2 batteries, charger, and carrying case. Perfect for construction and home projects.', 'Power Tools', 'DeWalt', 'DCD771C2', 'San Francisco, CA', 'excellent', '{"Max Torque": "300 UWO", "Chuck Size": "1/2 inch", "Battery": "20V MAX", "Weight": "3.6 lbs"}', 'fixed', 15, 45, 280, NULL, NULL, false, false, true, 12, 24, 4.8, 34, ARRAY['2 Batteries', 'Fast Charger', 'LED Light', 'Belt Clip'], ARRAY['No wet conditions', 'Return clean', 'Report any damage immediately'], 100, 'active', 245, 18),
-('00000000-0000-0000-0000-000000000000', 'Compact Excavator - Bobcat E35', 'Perfect for small construction projects, landscaping, and utility work. Includes operator service available.', 'Heavy Equipment', 'Bobcat', 'E35', 'San Francisco, CA', 'good', '{"Operating Weight": "8,000 lbs", "Max Dig Depth": "11 ft 2 in", "Bucket Capacity": "0.28 yd³", "Engine Power": "24.8 HP"}', 'fixed', NULL, 320, 1800, NULL, NULL, true, true, true, 150, 300, 4.9, 12, ARRAY['Hydraulic Thumbs', 'Rubber Tracks', 'Auxiliary Hydraulics', 'Enclosed Cab'], ARRAY['Valid license required', 'Operator must be present', 'No weekend returns'], 1500, 'active', 89, 7),
-('00000000-0000-0000-0000-000000000000', 'Professional Tile Saw - MK Diamond', 'High-precision tile saw for professional and DIY projects. Includes diamond blade and water pump system.', 'Construction Tools', 'MK Diamond', 'MK-370EXP', 'San Francisco, CA', 'excellent', '{"Cutting Capacity": "12 inches", "Blade Size": "7 inches", "Motor": "1 HP", "Water System": "Integrated pump"}', 'bidding', NULL, 85, 500, 65, 75, true, false, true, 25, 50, 4.7, 23, ARRAY['Diamond Blade', 'Water Cooling', 'Portable Stand', 'Dust Collection'], ARRAY['Provide own extension cord', 'Clean after use', 'No concrete cutting'], 200, 'active', 156, 12),
-('00000000-0000-0000-0000-000000000000', 'Milwaukee M18 Circular Saw', 'Powerful cordless circular saw with brushless motor. Includes blade and battery.', 'Power Tools', 'Milwaukee', 'M18CCS66', 'San Francisco, CA', 'good', '{"Blade Size": "6.5 inches", "Battery": "M18", "Motor": "Brushless", "Cut Capacity": "2-9/16 inches"}', 'fixed', 12, 35, 210, NULL, NULL, false, false, true, 10, 20, 4.6, 28, ARRAY['Brushless Motor', 'LED Light', 'Magnesium Guards', 'Rafter Hook'], ARRAY['Use proper safety gear', 'Check blade before use', 'No metal cutting'], 75, 'active', 198, 15),
-('00000000-0000-0000-0000-000000000000', 'Skid Steer Loader - Caterpillar 226D', 'Versatile skid steer for construction and landscaping. Operator required for operation.', 'Heavy Equipment', 'Caterpillar', '226D', 'San Francisco, CA', 'good', '{"Operating Weight": "7,500 lbs", "Rated Operating Capacity": "2,000 lbs", "Engine Power": "74 HP", "Lift Height": "10.5 ft"}', 'fixed', NULL, 280, 1680, NULL, NULL, true, true, true, 120, 240, 4.7, 18, ARRAY['Hydraulic Attachments', 'Enclosed Cab', 'Joystick Controls', 'Backup Alarm'], ARRAY['Licensed operator required', 'No smoking in cab', 'Daily inspection required'], 1200, 'active', 134, 9),
-('00000000-0000-0000-0000-000000000000', 'Makita Angle Grinder Set', 'Professional angle grinder with multiple discs and carrying case. Great for metal and masonry work.', 'Power Tools', 'Makita', 'GA7021', 'San Francisco, CA', 'excellent', '{"Disc Size": "7 inches", "Motor": "15 Amp", "Speed": "8,500 RPM", "Weight": "5.1 lbs"}', 'bidding', NULL, 25, 150, 18, 22, false, false, true, 8, 16, 4.5, 31, ARRAY['Multiple Discs', 'Side Handle', 'Wheel Guard', 'Carrying Case'], ARRAY['Wear safety glasses', 'Secure workpiece', 'Check disc condition'], 50, 'active', 167, 11),
-('00000000-0000-0000-0000-000000000000', 'Concrete Mixer - Honda GX160', 'Portable concrete mixer perfect for small to medium projects. Easy to transport and operate.', 'Construction Tools', 'Honda', 'CM4A-GX160', 'San Francisco, CA', 'good', '{"Capacity": "4 cubic feet", "Engine": "Honda GX160", "Drum Speed": "28 RPM", "Weight": "185 lbs"}', 'fixed', 8, 55, 330, NULL, NULL, false, false, true, 15, 30, 4.4, 19, ARRAY['Honda Engine', 'Steel Drum', 'Pneumatic Tires', 'Easy Pour Design'], ARRAY['Clean after each use', 'Check oil level', 'No overloading'], 150, 'active', 143, 8),
-('00000000-0000-0000-0000-000000000000', 'Pressure Washer - Generac 3100 PSI', 'High-pressure washer for cleaning driveways, decks, and equipment. Includes multiple nozzles.', 'Cleaning Equipment', 'Generac', 'G0079530', 'San Francisco, CA', 'excellent', '{"Pressure": "3100 PSI", "Flow Rate": "2.4 GPM", "Engine": "196cc OHV", "Hose Length": "25 feet"}', 'fixed', 10, 40, 240, NULL, NULL, false, false, true, 12, 24, 4.6, 26, ARRAY['Multiple Nozzles', 'Soap Tank', 'Quick Connect', 'Pneumatic Tires'], ARRAY['Use appropriate nozzle', 'No hot water', 'Protect electrical connections'], 80, 'active', 189, 14),
-('00000000-0000-0000-0000-000000000000', 'Welding Machine - Lincoln Electric', 'Professional MIG welder suitable for various metal fabrication projects. Includes accessories.', 'Welding Equipment', 'Lincoln Electric', 'Power MIG 210 MP', 'San Francisco, CA', 'good', '{"Input Power": "208-575V", "Output": "40-210A", "Wire Size": "0.023-0.045 inch", "Duty Cycle": "30% at 210A"}', 'bidding', NULL, 95, 570, 78, 85, true, false, true, 35, 70, 4.8, 22, ARRAY['Multi-Process', 'Digital Display', 'Auto-Set', 'Spool Gun Ready'], ARRAY['Certified welder only', 'Proper ventilation required', 'Safety gear mandatory'], 300, 'active', 112, 6),
-('00000000-0000-0000-0000-000000000000', 'Chainsaw - Stihl MS 271', 'Professional chainsaw for tree cutting and firewood preparation. Well-maintained and sharp chain.', 'Outdoor Equipment', 'Stihl', 'MS 271', 'San Francisco, CA', 'excellent', '{"Engine": "50.2cc", "Bar Length": "20 inches", "Weight": "12.3 lbs", "Fuel Tank": "16.9 fl oz"}', 'fixed', 18, 60, 360, NULL, NULL, false, false, true, 20, 40, 4.7, 29, ARRAY['Anti-Vibration', 'Easy Start', 'Chain Brake', 'Tool-Free Adjustment'], ARRAY['Experience required', 'Safety gear mandatory', 'No lending to others'], 200, 'active', 176, 13);
+('88cb0910-4628-490c-b4be-44d1e4abc05c', 'DeWalt 20V Max Cordless Drill Set', 'Professional-grade cordless drill with 2 batteries, charger, and carrying case. Perfect for construction and home projects.', 'Power Tools', 'DeWalt', 'DCD771C2', 'San Francisco, CA', 'excellent', '{"Max Torque": "300 UWO", "Chuck Size": "1/2 inch", "Battery": "20V MAX", "Weight": "3.6 lbs"}', 'fixed', 15, 45, 280, NULL, NULL, false, false, true, 12, 24, 4.8, 34, ARRAY['2 Batteries', 'Fast Charger', 'LED Light', 'Belt Clip'], ARRAY['No wet conditions', 'Return clean', 'Report any damage immediately'], 100, 'active', 245, 18),
+('88cb0910-4628-490c-b4be-44d1e4abc05c', 'Compact Excavator - Bobcat E35', 'Perfect for small construction projects, landscaping, and utility work. Includes operator service available.', 'Heavy Equipment', 'Bobcat', 'E35', 'San Francisco, CA', 'good', '{"Operating Weight": "8,000 lbs", "Max Dig Depth": "11 ft 2 in", "Bucket Capacity": "0.28 yd³", "Engine Power": "24.8 HP"}', 'fixed', NULL, 320, 1800, NULL, NULL, true, true, true, 150, 300, 4.9, 12, ARRAY['Hydraulic Thumbs', 'Rubber Tracks', 'Auxiliary Hydraulics', 'Enclosed Cab'], ARRAY['Valid license required', 'Operator must be present', 'No weekend returns'], 1500, 'active', 89, 7),
+('88cb0910-4628-490c-b4be-44d1e4abc05c', 'Professional Tile Saw - MK Diamond', 'High-precision tile saw for professional and DIY projects. Includes diamond blade and water pump system.', 'Construction Tools', 'MK Diamond', 'MK-370EXP', 'San Francisco, CA', 'excellent', '{"Cutting Capacity": "12 inches", "Blade Size": "7 inches", "Motor": "1 HP", "Water System": "Integrated pump"}', 'bidding', NULL, 85, 500, 65, 75, true, false, true, 25, 50, 4.7, 23, ARRAY['Diamond Blade', 'Water Cooling', 'Portable Stand', 'Dust Collection'], ARRAY['Provide own extension cord', 'Clean after use', 'No concrete cutting'], 200, 'active', 156, 12),
+('88cb0910-4628-490c-b4be-44d1e4abc05c', 'Milwaukee M18 Circular Saw', 'Powerful cordless circular saw with brushless motor. Includes blade and battery.', 'Power Tools', 'Milwaukee', 'M18CCS66', 'San Francisco, CA', 'good', '{"Blade Size": "6.5 inches", "Battery": "M18", "Motor": "Brushless", "Cut Capacity": "2-9/16 inches"}', 'fixed', 12, 35, 210, NULL, NULL, false, false, true, 10, 20, 4.6, 28, ARRAY['Brushless Motor', 'LED Light', 'Magnesium Guards', 'Rafter Hook'], ARRAY['Use proper safety gear', 'Check blade before use', 'No metal cutting'], 75, 'active', 198, 15),
+('88cb0910-4628-490c-b4be-44d1e4abc05c', 'Skid Steer Loader - Caterpillar 226D', 'Versatile skid steer for construction and landscaping. Operator required for operation.', 'Heavy Equipment', 'Caterpillar', '226D', 'San Francisco, CA', 'good', '{"Operating Weight": "7,500 lbs", "Rated Operating Capacity": "2,000 lbs", "Engine Power": "74 HP", "Lift Height": "10.5 ft"}', 'fixed', NULL, 280, 1680, NULL, NULL, true, true, true, 120, 240, 4.7, 18, ARRAY['Hydraulic Attachments', 'Enclosed Cab', 'Joystick Controls', 'Backup Alarm'], ARRAY['Licensed operator required', 'No smoking in cab', 'Daily inspection required'], 1200, 'active', 134, 9),
+('88cb0910-4628-490c-b4be-44d1e4abc05c', 'Makita Angle Grinder Set', 'Professional angle grinder with multiple discs and carrying case. Great for metal and masonry work.', 'Power Tools', 'Makita', 'GA7021', 'San Francisco, CA', 'excellent', '{"Disc Size": "7 inches", "Motor": "15 Amp", "Speed": "8,500 RPM", "Weight": "5.1 lbs"}', 'bidding', NULL, 25, 150, 18, 22, false, false, true, 8, 16, 4.5, 31, ARRAY['Multiple Discs', 'Side Handle', 'Wheel Guard', 'Carrying Case'], ARRAY['Wear safety glasses', 'Secure workpiece', 'Check disc condition'], 50, 'active', 167, 11),
+('88cb0910-4628-490c-b4be-44d1e4abc05c', 'Concrete Mixer - Honda GX160', 'Portable concrete mixer perfect for small to medium projects. Easy to transport and operate.', 'Construction Tools', 'Honda', 'CM4A-GX160', 'San Francisco, CA', 'good', '{"Capacity": "4 cubic feet", "Engine": "Honda GX160", "Drum Speed": "28 RPM", "Weight": "185 lbs"}', 'fixed', 8, 55, 330, NULL, NULL, false, false, true, 15, 30, 4.4, 19, ARRAY['Honda Engine', 'Steel Drum', 'Pneumatic Tires', 'Easy Pour Design'], ARRAY['Clean after each use', 'Check oil level', 'No overloading'], 150, 'active', 143, 8),
+('88cb0910-4628-490c-b4be-44d1e4abc05c', 'Pressure Washer - Generac 3100 PSI', 'High-pressure washer for cleaning driveways, decks, and equipment. Includes multiple nozzles.', 'Cleaning Equipment', 'Generac', 'G0079530', 'San Francisco, CA', 'excellent', '{"Pressure": "3100 PSI", "Flow Rate": "2.4 GPM", "Engine": "196cc OHV", "Hose Length": "25 feet"}', 'fixed', 10, 40, 240, NULL, NULL, false, false, true, 12, 24, 4.6, 26, ARRAY['Multiple Nozzles', 'Soap Tank', 'Quick Connect', 'Pneumatic Tires'], ARRAY['Use appropriate nozzle', 'No hot water', 'Protect electrical connections'], 80, 'active', 189, 14),
+('88cb0910-4628-490c-b4be-44d1e4abc05c', 'Welding Machine - Lincoln Electric', 'Professional MIG welder suitable for various metal fabrication projects. Includes accessories.', 'Welding Equipment', 'Lincoln Electric', 'Power MIG 210 MP', 'San Francisco, CA', 'good', '{"Input Power": "208-575V", "Output": "40-210A", "Wire Size": "0.023-0.045 inch", "Duty Cycle": "30% at 210A"}', 'bidding', NULL, 95, 570, 78, 85, true, false, true, 35, 70, 4.8, 22, ARRAY['Multi-Process', 'Digital Display', 'Auto-Set', 'Spool Gun Ready'], ARRAY['Certified welder only', 'Proper ventilation required', 'Safety gear mandatory'], 300, 'active', 112, 6),
+('88cb0910-4628-490c-b4be-44d1e4abc05c', 'Chainsaw - Stihl MS 271', 'Professional chainsaw for tree cutting and firewood preparation. Well-maintained and sharp chain.', 'Outdoor Equipment', 'Stihl', 'MS 271', 'San Francisco, CA', 'excellent', '{"Engine": "50.2cc", "Bar Length": "20 inches", "Weight": "12.3 lbs", "Fuel Tank": "16.9 fl oz"}', 'fixed', 18, 60, 360, NULL, NULL, false, false, true, 20, 40, 4.7, 29, ARRAY['Anti-Vibration', 'Easy Start', 'Chain Brake', 'Tool-Free Adjustment'], ARRAY['Experience required', 'Safety gear mandatory', 'No lending to others'], 200, 'active', 176, 13);
 
 -- Create operator profile for the user
 INSERT INTO operators (
   profile_id,
   skills,
   certifications,
   license_url,
   experience,
   hourly_rate,
   rating,
   review_count,
   completed_jobs,
   verified
 ) VALUES (
-  '00000000-0000-0000-0000-000000000000',
+  '88cb0910-4628-490c-b4be-44d1e4abc05c',
   ARRAY['Heavy Equipment', 'Excavation', 'Concrete Work', 'Landscaping', 'Welding', 'Construction'],
   ARRAY['OSHA 30', 'Heavy Equipment License', 'Forklift Certified', 'Welding Certification'],
   '/docs/license-john.pdf',
   15,
   75,
   4.9,
   78,
   124,
   true
 );
 
 -- Get the operator ID for availability (we'll use a placeholder and update it)
 -- Create operator availability
 INSERT INTO operator_availability (
   operator_id,
   start_date,
   end_date,
   blocked_dates
 ) VALUES (
   (SELECT id FROM operators WHERE profile_id = '88cb0910-4628-490c-b4be-44d1e4abc05c'),
   '2025-01-15',
   '2025-12-31',
   ARRAY['2025-02-14', '2025-02-15', '2025-07-04', '2025-12-25']::date[]
 );
 
 -- Create bookings (mix of renter and owner scenarios)
 INSERT INTO bookings (
   renter_id,
   tool_id,
   operator_id,
   start_date,
   end_date,
   duration,
   status,
   tool_cost,
   operator_cost,
   insurance_cost,
   platform_fee,
   tax,
   total,
   insurance_selected,
   insurance_type,
   insurance_coverage,
   deposit,
   payment_status
 ) VALUES 
-((SELECT id FROM profiles WHERE email = 'john@example.com'), (SELECT id FROM tools WHERE title = 'DeWalt 20V Max Cordless Drill Set'), NULL, '2025-01-25', '2025-01-27', 2, 'completed', 90, 0, 12, 10.20, 8.16, 120.36, true, 'basic', 500, 100, 'paid'),
-((SELECT id FROM profiles WHERE email = 'john@example.com'), (SELECT id FROM tools WHERE title = 'Compact Excavator - Bobcat E35'), (SELECT id FROM operators WHERE profile_id = (SELECT id FROM profiles WHERE email = 'john@example.com')), '2025-02-01', '2025-02-03', 2, 'active', 640, 1200, 300, 214, 171.20, 2525.20, true, 'premium', 2000, 1500, 'paid'),
-((SELECT id FROM profiles WHERE email = 'john@example.com'), (SELECT id FROM tools WHERE title = 'Milwaukee M18 Circular Saw'), NULL, '2025-02-10', '2025-02-12', 2, 'confirmed', 70, 0, 20, 9, 7.20, 106.20, true, 'basic', 300, 75, 'paid'),
-((SELECT id FROM profiles WHERE email = 'john@example.com'), (SELECT id FROM tools WHERE title = 'Pressure Washer - Generac 3100 PSI'), NULL, '2025-02-15', '2025-02-16', 1, 'pending', 40, 0, 12, 5.20, 4.16, 61.36, true, 'basic', 200, 80, 'pending'),
-((SELECT id FROM profiles WHERE email = 'john@example.com'), (SELECT id FROM tools WHERE title = 'Concrete Mixer - Honda GX160'), NULL, '2025-01-20', '2025-01-22', 2, 'completed', 110, 0, 30, 14, 11.20, 165.20, true, 'premium', 800, 150, 'paid'),
-((SELECT id FROM profiles WHERE email = 'john@example.com'), (SELECT id FROM tools WHERE title = 'Skid Steer Loader - Caterpillar 226D'), (SELECT id FROM operators WHERE profile_id = (SELECT id FROM profiles WHERE email = 'john@example.com')), '2025-03-01', '2025-03-03', 2, 'confirmed', 560, 1200, 240, 200, 160, 2360, true, 'premium', 1500, 1200, 'paid'),
-((SELECT id FROM profiles WHERE email = 'john@example.com'), (SELECT id FROM tools WHERE title = 'Chainsaw - Stihl MS 271'), NULL, '2025-02-20', '2025-02-21', 1, 'pending', 60, 0, 20, 8, 6.40, 94.40, true, 'basic', 400, 200, 'pending'),
-((SELECT id FROM profiles WHERE email = 'john@example.com'), (SELECT id FROM tools WHERE title = 'DeWalt 20V Max Cordless Drill Set'), NULL, '2025-03-10', '2025-03-12', 2, 'cancelled', 90, 0, 0, 0, 0, 0, false, NULL, 0, 100, 'refunded'),
-((SELECT id FROM profiles WHERE email = 'john@example.com'), (SELECT id FROM tools WHERE title = 'Professional Tile Saw - MK Diamond'), NULL, '2025-02-25', '2025-02-27', 2, 'confirmed', 170, 0, 50, 22, 17.60, 259.60, true, 'premium', 1000, 200, 'paid'),
-((SELECT id FROM profiles WHERE email = 'john@example.com'), (SELECT id FROM tools WHERE title = 'Welding Machine - Lincoln Electric'), NULL, '2025-03-05', '2025-03-07', 2, 'pending', 190, 0, 70, 26, 20.80, 306.80, true, 'premium', 1200, 300, 'pending');
+((SELECT id FROM profiles WHERE email = 'zion2999@gmail.com'), (SELECT id FROM tools WHERE title = 'DeWalt 20V Max Cordless Drill Set'), NULL, '2025-01-25', '2025-01-27', 2, 'completed', 90, 0, 12, 10.20, 8.16, 120.36, true, 'basic', 500, 100, 'paid'),
+((SELECT id FROM profiles WHERE email = 'zion2999@gmail.com'), (SELECT id FROM tools WHERE title = 'Compact Excavator - Bobcat E35'), (SELECT id FROM operators WHERE profile_id = (SELECT id FROM profiles WHERE email = 'zion2999@gmail.com')), '2025-02-01', '2025-02-03', 2, 'active', 640, 1200, 300, 214, 171.20, 2525.20, true, 'premium', 2000, 1500, 'paid'),
+((SELECT id FROM profiles WHERE email = 'zion2999@gmail.com'), (SELECT id FROM tools WHERE title = 'Milwaukee M18 Circular Saw'), NULL, '2025-02-10', '2025-02-12', 2, 'confirmed', 70, 0, 20, 9, 7.20, 106.20, true, 'basic', 300, 75, 'paid'),
+((SELECT id FROM profiles WHERE email = 'zion2999@gmail.com'), (SELECT id FROM tools WHERE title = 'Pressure Washer - Generac 3100 PSI'), NULL, '2025-02-15', '2025-02-16', 1, 'pending', 40, 0, 12, 5.20, 4.16, 61.36, true, 'basic', 200, 80, 'pending'),
+((SELECT id FROM profiles WHERE email = 'zion2999@gmail.com'), (SELECT id FROM tools WHERE title = 'Concrete Mixer - Honda GX160'), NULL, '2025-01-20', '2025-01-22', 2, 'completed', 110, 0, 30, 14, 11.20, 165.20, true, 'premium', 800, 150, 'paid'),
+((SELECT id FROM profiles WHERE email = 'zion2999@gmail.com'), (SELECT id FROM tools WHERE title = 'Skid Steer Loader - Caterpillar 226D'), (SELECT id FROM operators WHERE profile_id = (SELECT id FROM profiles WHERE email = 'zion2999@gmail.com')), '2025-03-01', '2025-03-03', 2, 'confirmed', 560, 1200, 240, 200, 160, 2360, true, 'premium', 1500, 1200, 'paid'),
+((SELECT id FROM profiles WHERE email = 'zion2999@gmail.com'), (SELECT id FROM tools WHERE title = 'Chainsaw - Stihl MS 271'), NULL, '2025-02-20', '2025-02-21', 1, 'pending', 60, 0, 20, 8, 6.40, 94.40, true, 'basic', 400, 200, 'pending'),
+((SELECT id FROM profiles WHERE email = 'zion2999@gmail.com'), (SELECT id FROM tools WHERE title = 'DeWalt 20V Max Cordless Drill Set'), NULL, '2025-03-10', '2025-03-12', 2, 'cancelled', 90, 0, 0, 0, 0, 0, false, NULL, 0, 100, 'refunded'),
+((SELECT id FROM profiles WHERE email = 'zion2999@gmail.com'), (SELECT id FROM tools WHERE title = 'Professional Tile Saw - MK Diamond'), NULL, '2025-02-25', '2025-02-27', 2, 'confirmed', 170, 0, 50, 22, 17.60, 259.60, true, 'premium', 1000, 200, 'paid'),
+((SELECT id FROM profiles WHERE email = 'zion2999@gmail.com'), (SELECT id FROM tools WHERE title = 'Welding Machine - Lincoln Electric'), NULL, '2025-03-05', '2025-03-07', 2, 'pending', 190, 0, 70, 26, 20.80, 306.80, true, 'premium', 1200, 300, 'pending');
 
 -- Create bids on tools with bidding pricing
 INSERT INTO bids (
   tool_id,
   bidder_id,
   amount,
   status,
   expires_at
 ) VALUES 
-((SELECT id FROM tools WHERE title = 'Professional Tile Saw - MK Diamond'), (SELECT id FROM profiles WHERE email = 'john@example.com'), 75, 'active', '2025-02-20 23:59:59'),
-((SELECT id FROM tools WHERE title = 'Makita Angle Grinder Set'), (SELECT id FROM profiles WHERE email = 'john@example.com'), 22, 'active', '2025-02-18 23:59:59'),
-((SELECT id FROM tools WHERE title = 'Welding Machine - Lincoln Electric'), (SELECT id FROM profiles WHERE email = 'john@example.com'), 85, 'active', '2025-02-25 23:59:59'),
-((SELECT id FROM tools WHERE title = 'Professional Tile Saw - MK Diamond'), (SELECT id FROM profiles WHERE email = 'john@example.com'), 70, 'outbid', '2025-02-15 23:59:59'),
-((SELECT id FROM tools WHERE title = 'Makita Angle Grinder Set'), (SELECT id FROM profiles WHERE email = 'john@example.com'), 20, 'outbid', '2025-02-10 23:59:59'),
-((SELECT id FROM tools WHERE title = 'Welding Machine - Lincoln Electric'), (SELECT id FROM profiles WHERE email = 'john@example.com'), 80, 'outbid', '2025-02-12 23:59:59'),
-((SELECT id FROM tools WHERE title = 'Professional Tile Saw - MK Diamond'), (SELECT id FROM profiles WHERE email = 'john@example.com'), 65, 'expired', '2025-01-30 23:59:59'),
-((SELECT id FROM tools WHERE title = 'Makita Angle Grinder Set'), (SELECT id FROM profiles WHERE email = 'john@example.com'), 18, 'expired', '2025-01-25 23:59:59'),
-((SELECT id FROM tools WHERE title = 'Welding Machine - Lincoln Electric'), (SELECT id FROM profiles WHERE email = 'john@example.com'), 75, 'won', '2025-01-20 23:59:59'),
-((SELECT id FROM tools WHERE title = 'Professional Tile Saw - MK Diamond'), (SELECT id FROM profiles WHERE email = 'john@example.com'), 68, 'won', '2025-01-15 23:59:59');
+((SELECT id FROM tools WHERE title = 'Professional Tile Saw - MK Diamond'), (SELECT id FROM profiles WHERE email = 'zion2999@gmail.com'), 75, 'active', '2025-02-20 23:59:59'),
+((SELECT id FROM tools WHERE title = 'Makita Angle Grinder Set'), (SELECT id FROM profiles WHERE email = 'zion2999@gmail.com'), 22, 'active', '2025-02-18 23:59:59'),
+((SELECT id FROM tools WHERE title = 'Welding Machine - Lincoln Electric'), (SELECT id FROM profiles WHERE email = 'zion2999@gmail.com'), 85, 'active', '2025-02-25 23:59:59'),
+((SELECT id FROM tools WHERE title = 'Professional Tile Saw - MK Diamond'), (SELECT id FROM profiles WHERE email = 'zion2999@gmail.com'), 70, 'outbid', '2025-02-15 23:59:59'),
+((SELECT id FROM tools WHERE title = 'Makita Angle Grinder Set'), (SELECT id FROM profiles WHERE email = 'zion2999@gmail.com'), 20, 'outbid', '2025-02-10 23:59:59'),
+((SELECT id FROM tools WHERE title = 'Welding Machine - Lincoln Electric'), (SELECT id FROM profiles WHERE email = 'zion2999@gmail.com'), 80, 'outbid', '2025-02-12 23:59:59'),
+((SELECT id FROM tools WHERE title = 'Professional Tile Saw - MK Diamond'), (SELECT id FROM profiles WHERE email = 'zion2999@gmail.com'), 65, 'expired', '2025-01-30 23:59:59'),
+((SELECT id FROM tools WHERE title = 'Makita Angle Grinder Set'), (SELECT id FROM profiles WHERE email = 'zion2999@gmail.com'), 18, 'expired', '2025-01-25 23:59:59'),
+((SELECT id FROM tools WHERE title = 'Welding Machine - Lincoln Electric'), (SELECT id FROM profiles WHERE email = 'zion2999@gmail.com'), 75, 'won', '2025-01-20 23:59:59'),
+((SELECT id FROM tools WHERE title = 'Professional Tile Saw - MK Diamond'), (SELECT id FROM profiles WHERE email = 'zion2999@gmail.com'), 68, 'won', '2025-01-15 23:59:59');
 
 -- Create reviews
 INSERT INTO reviews (
   type,
   target_id,
   reviewer_id,
   booking_id,
   rating,
   comment,
   communication_rating,
   accuracy_rating,
   condition_rating,
   value_rating,
   photos,
   helpful
 ) VALUES 
-('tool', (SELECT id FROM tools WHERE title = 'DeWalt 20V Max Cordless Drill Set'), (SELECT id FROM profiles WHERE email = 'john@example.com'), (SELECT id FROM bookings WHERE tool_id = (SELECT id FROM tools WHERE title = 'DeWalt 20V Max Cordless Drill Set') LIMIT 1), 5, 'Excellent drill! Very powerful and the batteries lasted the entire project. John was very responsive and helpful.', 5, 5, 5, 4, ARRAY[]::text[], 3),
-('tool', (SELECT id FROM tools WHERE title = 'Compact Excavator - Bobcat E35'), (SELECT id FROM profiles WHERE email = 'john@example.com'), (SELECT id FROM bookings WHERE tool_id = (SELECT id FROM tools WHERE title = 'Compact Excavator - Bobcat E35') LIMIT 1), 5, 'Perfect for our landscaping project. The operator was skilled and professional. Highly recommend!', 5, 5, 5, 5, ARRAY[]::text[], 5),
-('tool', (SELECT id FROM tools WHERE title = 'Milwaukee M18 Circular Saw'), (SELECT id FROM profiles WHERE email = 'john@example.com'), (SELECT id FROM bookings WHERE tool_id = (SELECT id FROM tools WHERE title = 'Milwaukee M18 Circular Saw') LIMIT 1), 4, 'Good saw, cuts cleanly. Battery life could be better but overall satisfied with the rental.', 4, 4, 4, 4, ARRAY[]::text[], 2),
-('tool', (SELECT id FROM tools WHERE title = 'Concrete Mixer - Honda GX160'), (SELECT id FROM profiles WHERE email = 'john@example.com'), (SELECT id FROM bookings WHERE tool_id = (SELECT id FROM tools WHERE title = 'Concrete Mixer - Honda GX160') LIMIT 1), 4, 'Worked well for our small concrete project. Easy to operate and clean. Fair pricing.', 4, 4, 4, 4, ARRAY[]::text[], 1),
-('tool', (SELECT id FROM tools WHERE title = 'Pressure Washer - Generac 3100 PSI'), (SELECT id FROM profiles WHERE email = 'john@example.com'), NULL, 5, 'Amazing pressure washer! Cleaned our driveway perfectly. Great condition and fair price.', 5, 5, 5, 5, ARRAY[]::text[], 4),
-('tool', (SELECT id FROM tools WHERE title = 'Chainsaw - Stihl MS 271'), (SELECT id FROM profiles WHERE email = 'john@example.com'), NULL, 5, 'Professional grade chainsaw. Very sharp and well-maintained. Perfect for our tree removal project.', 5, 5, 5, 4, ARRAY[]::text[], 6),
-('owner', (SELECT id FROM profiles WHERE email = 'john@example.com'), (SELECT id FROM profiles WHERE email = 'john@example.com'), (SELECT id FROM bookings LIMIT 1), 5, 'John is an excellent tool owner. Professional, responsive, and his equipment is top-notch. Will rent again!', 5, 5, 5, 5, ARRAY[]::text[], 8),
-('operator', (SELECT id FROM operators WHERE profile_id = (SELECT id FROM profiles WHERE email = 'john@example.com')), (SELECT id FROM profiles WHERE email = 'john@example.com'), (SELECT id FROM bookings WHERE operator_id IS NOT NULL LIMIT 1), 5, 'Outstanding operator! Very skilled with heavy equipment and safety-conscious. Highly professional.', 5, 5, 5, 5, ARRAY[]::text[], 7),
-('renter', (SELECT id FROM profiles WHERE email = 'john@example.com'), (SELECT id FROM profiles WHERE email = 'john@example.com'), (SELECT id FROM bookings LIMIT 1), 5, 'Great renter! Took excellent care of the equipment and returned it clean and on time.', 5, 5, 5, 5, ARRAY[]::text[], 4),
-('tool', (SELECT id FROM tools WHERE title = 'Welding Machine - Lincoln Electric'), (SELECT id FROM profiles WHERE email = 'john@example.com'), NULL, 4, 'Good welding machine for the price. Had everything needed for the job. Owner was helpful with setup tips.', 4, 4, 4, 4, ARRAY[]::text[], 2);
+('tool', (SELECT id FROM tools WHERE title = 'DeWalt 20V Max Cordless Drill Set'), (SELECT id FROM profiles WHERE email = 'zion2999@gmail.com'), (SELECT id FROM bookings WHERE tool_id = (SELECT id FROM tools WHERE title = 'DeWalt 20V Max Cordless Drill Set') LIMIT 1), 5, 'Excellent drill! Very powerful and the batteries lasted the entire project. John was very responsive and helpful.', 5, 5, 5, 4, ARRAY[]::text[], 3),
+('tool', (SELECT id FROM tools WHERE title = 'Compact Excavator - Bobcat E35'), (SELECT id FROM profiles WHERE email = 'zion2999@gmail.com'), (SELECT id FROM bookings WHERE tool_id = (SELECT id FROM tools WHERE title = 'Compact Excavator - Bobcat E35') LIMIT 1), 5, 'Perfect for our landscaping project. The operator was skilled and professional. Highly recommend!', 5, 5, 5, 5, ARRAY[]::text[], 5),
+('tool', (SELECT id FROM tools WHERE title = 'Milwaukee M18 Circular Saw'), (SELECT id FROM profiles WHERE email = 'zion2999@gmail.com'), (SELECT id FROM bookings WHERE tool_id = (SELECT id FROM tools WHERE title = 'Milwaukee M18 Circular Saw') LIMIT 1), 4, 'Good saw, cuts cleanly. Battery life could be better but overall satisfied with the rental.', 4, 4, 4, 4, ARRAY[]::text[], 2),
+('tool', (SELECT id FROM tools WHERE title = 'Concrete Mixer - Honda GX160'), (SELECT id FROM profiles WHERE email = 'zion2999@gmail.com'), (SELECT id FROM bookings WHERE tool_id = (SELECT id FROM tools WHERE title = 'Concrete Mixer - Honda GX160') LIMIT 1), 4, 'Worked well for our small concrete project. Easy to operate and clean. Fair pricing.', 4, 4, 4, 4, ARRAY[]::text[], 1),
+('tool', (SELECT id FROM tools WHERE title = 'Pressure Washer - Generac 3100 PSI'), (SELECT id FROM profiles WHERE email = 'zion2999@gmail.com'), NULL, 5, 'Amazing pressure washer! Cleaned our driveway perfectly. Great condition and fair price.', 5, 5, 5, 5, ARRAY[]::text[], 4),
+('tool', (SELECT id FROM tools WHERE title = 'Chainsaw - Stihl MS 271'), (SELECT id FROM profiles WHERE email = 'zion2999@gmail.com'), NULL, 5, 'Professional grade chainsaw. Very sharp and well-maintained. Perfect for our tree removal project.', 5, 5, 5, 4, ARRAY[]::text[], 6),
+('owner', (SELECT id FROM profiles WHERE email = 'zion2999@gmail.com'), (SELECT id FROM profiles WHERE email = 'zion2999@gmail.com'), (SELECT id FROM bookings LIMIT 1), 5, 'John is an excellent tool owner. Professional, responsive, and his equipment is top-notch. Will rent again!', 5, 5, 5, 5, ARRAY[]::text[], 8),
+('operator', (SELECT id FROM operators WHERE profile_id = (SELECT id FROM profiles WHERE email = 'zion2999@gmail.com')), (SELECT id FROM profiles WHERE email = 'zion2999@gmail.com'), (SELECT id FROM bookings WHERE operator_id IS NOT NULL LIMIT 1), 5, 'Outstanding operator! Very skilled with heavy equipment and safety-conscious. Highly professional.', 5, 5, 5, 5, ARRAY[]::text[], 7),
+('renter', (SELECT id FROM profiles WHERE email = 'zion2999@gmail.com'), (SELECT id FROM profiles WHERE email = 'zion2999@gmail.com'), (SELECT id FROM bookings LIMIT 1), 5, 'Great renter! Took excellent care of the equipment and returned it clean and on time.', 5, 5, 5, 5, ARRAY[]::text[], 4),
+('tool', (SELECT id FROM tools WHERE title = 'Welding Machine - Lincoln Electric'), (SELECT id FROM profiles WHERE email = 'zion2999@gmail.com'), NULL, 4, 'Good welding machine for the price. Had everything needed for the job. Owner was helpful with setup tips.', 4, 4, 4, 4, ARRAY[]::text[], 2);
 
 -- Create chats
 INSERT INTO chats (
   participants,
   booking_id
 ) VALUES 
-(ARRAY[(SELECT id FROM profiles WHERE email = 'john@example.com')], (SELECT id FROM bookings LIMIT 1 OFFSET 0)),
-(ARRAY[(SELECT id FROM profiles WHERE email = 'john@example.com')], (SELECT id FROM bookings LIMIT 1 OFFSET 1)),
-(ARRAY[(SELECT id FROM profiles WHERE email = 'john@example.com')], (SELECT id FROM bookings LIMIT 1 OFFSET 2)),
-(ARRAY[(SELECT id FROM profiles WHERE email = 'john@example.com')], (SELECT id FROM bookings LIMIT 1 OFFSET 3)),
-(ARRAY[(SELECT id FROM profiles WHERE email = 'john@example.com')], (SELECT id FROM bookings LIMIT 1 OFFSET 4)),
-(ARRAY[(SELECT id FROM profiles WHERE email = 'john@example.com')], (SELECT id FROM bookings LIMIT 1 OFFSET 5)),
-(ARRAY[(SELECT id FROM profiles WHERE email = 'john@example.com')], (SELECT id FROM bookings LIMIT 1 OFFSET 6)),
-(ARRAY[(SELECT id FROM profiles WHERE email = 'john@example.com')], (SELECT id FROM bookings LIMIT 1 OFFSET 7)),
-(ARRAY[(SELECT id FROM profiles WHERE email = 'john@example.com')], (SELECT id FROM bookings LIMIT 1 OFFSET 8)),
-(ARRAY[(SELECT id FROM profiles WHERE email = 'john@example.com')], (SELECT id FROM bookings LIMIT 1 OFFSET 9));
+(ARRAY[(SELECT id FROM profiles WHERE email = 'zion2999@gmail.com')], (SELECT id FROM bookings LIMIT 1 OFFSET 0)),
+(ARRAY[(SELECT id FROM profiles WHERE email = 'zion2999@gmail.com')], (SELECT id FROM bookings LIMIT 1 OFFSET 1)),
+(ARRAY[(SELECT id FROM profiles WHERE email = 'zion2999@gmail.com')], (SELECT id FROM bookings LIMIT 1 OFFSET 2)),
+(ARRAY[(SELECT id FROM profiles WHERE email = 'zion2999@gmail.com')], (SELECT id FROM bookings LIMIT 1 OFFSET 3)),
+(ARRAY[(SELECT id FROM profiles WHERE email = 'zion2999@gmail.com')], (SELECT id FROM bookings LIMIT 1 OFFSET 4)),
+(ARRAY[(SELECT id FROM profiles WHERE email = 'zion2999@gmail.com')], (SELECT id FROM bookings LIMIT 1 OFFSET 5)),
+(ARRAY[(SELECT id FROM profiles WHERE email = 'zion2999@gmail.com')], (SELECT id FROM bookings LIMIT 1 OFFSET 6)),
+(ARRAY[(SELECT id FROM profiles WHERE email = 'zion2999@gmail.com')], (SELECT id FROM bookings LIMIT 1 OFFSET 7)),
+(ARRAY[(SELECT id FROM profiles WHERE email = 'zion2999@gmail.com')], (SELECT id FROM bookings LIMIT 1 OFFSET 8)),
+(ARRAY[(SELECT id FROM profiles WHERE email = 'zion2999@gmail.com')], (SELECT id FROM bookings LIMIT 1 OFFSET 9));
 
 -- Create messages for the chats
 INSERT INTO messages (
   chat_id,
   sender_id,
   content,
   type,
   read
 ) VALUES 
 -- Chat 1 messages
-((SELECT id FROM chats LIMIT 1 OFFSET 0), (SELECT id FROM profiles WHERE email = 'john@example.com'), 'Hi! I''m interested in renting your DeWalt drill for this weekend. Is it available?', 'text', true),
-((SELECT id FROM chats LIMIT 1 OFFSET 0), (SELECT id FROM profiles WHERE email = 'john@example.com'), 'Hello! Yes, it''s available this weekend. Would you like me to include the extra battery pack?', 'text', true),
-((SELECT id FROM chats LIMIT 1 OFFSET 0), (SELECT id FROM profiles WHERE email = 'john@example.com'), 'That would be great! What time works best for pickup?', 'text', false),
+((SELECT id FROM chats LIMIT 1 OFFSET 0), (SELECT id FROM profiles WHERE email = 'zion2999@gmail.com'), 'Hi! I''m interested in renting your DeWalt drill for this weekend. Is it available?', 'text', true),
+((SELECT id FROM chats LIMIT 1 OFFSET 0), (SELECT id FROM profiles WHERE email = 'zion2999@gmail.com'), 'Hello! Yes, it''s available this weekend. Would you like me to include the extra battery pack?', 'text', true),
+((SELECT id FROM chats LIMIT 1 OFFSET 0), (SELECT id FROM profiles WHERE email = 'zion2999@gmail.com'), 'That would be great! What time works best for pickup?', 'text', false),
 -- Chat 2 messages
-((SELECT id FROM chats LIMIT 1 OFFSET 1), (SELECT id FROM profiles WHERE email = 'john@example.com'), 'I need the excavator for a landscaping project. Can you provide an operator?', 'text', true),
-((SELECT id FROM chats LIMIT 1 OFFSET 1), (SELECT id FROM profiles WHERE email = 'john@example.com'), 'Absolutely! I can operate it myself. What''s the scope of the project?', 'text', true),
-((SELECT id FROM chats LIMIT 1 OFFSET 1), (SELECT id FROM profiles WHERE email = 'john@example.com'), 'We need to dig a foundation for a small shed, about 12x8 feet.', 'text', false),
+((SELECT id FROM chats LIMIT 1 OFFSET 1), (SELECT id FROM profiles WHERE email = 'zion2999@gmail.com'), 'I need the excavator for a landscaping project. Can you provide an operator?', 'text', true),
+((SELECT id FROM chats LIMIT 1 OFFSET 1), (SELECT id FROM profiles WHERE email = 'zion2999@gmail.com'), 'Absolutely! I can operate it myself. What''s the scope of the project?', 'text', true),
+((SELECT id FROM chats LIMIT 1 OFFSET 1), (SELECT id FROM profiles WHERE email = 'zion2999@gmail.com'), 'We need to dig a foundation for a small shed, about 12x8 feet.', 'text', false),
 -- Chat 3 messages
-((SELECT id FROM chats LIMIT 1 OFFSET 2), (SELECT id FROM profiles WHERE email = 'john@example.com'), 'Is the circular saw in good working condition?', 'text', true),
-((SELECT id FROM chats LIMIT 1 OFFSET 2), (SELECT id FROM profiles WHERE email = 'john@example.com'), 'Yes, it''s well-maintained and the blade is sharp. Perfect for framing work.', 'text', true),
-((SELECT id FROM chats LIMIT 1 OFFSET 2), (SELECT id FROM profiles WHERE email = 'john@example.com'), 'Great! I''ll book it for next week.', 'text', false),
+((SELECT id FROM chats LIMIT 1 OFFSET 2), (SELECT id FROM profiles WHERE email = 'zion2999@gmail.com'), 'Is the circular saw in good working condition?', 'text', true),
+((SELECT id FROM chats LIMIT 1 OFFSET 2), (SELECT id FROM profiles WHERE email = 'zion2999@gmail.com'), 'Yes, it''s well-maintained and the blade is sharp. Perfect for framing work.', 'text', true),
+((SELECT id FROM chats LIMIT 1 OFFSET 2), (SELECT id FROM profiles WHERE email = 'zion2999@gmail.com'), 'Great! I''ll book it for next week.', 'text', false),
 -- Chat 4 messages
-((SELECT id FROM chats LIMIT 1 OFFSET 3), (SELECT id FROM profiles WHERE email = 'john@example.com'), 'I need the pressure washer for cleaning my deck. How long is the hose?', 'text', true),
-((SELECT id FROM chats LIMIT 1 OFFSET 3), (SELECT id FROM profiles WHERE email = 'john@example.com'), 'It comes with a 25-foot hose and multiple nozzles for different cleaning tasks.', 'text', true),
-((SELECT id FROM chats LIMIT 1 OFFSET 3), (SELECT id FROM profiles WHERE email = 'john@example.com'), 'Perfect! That should be enough reach for my deck.', 'text', false),
+((SELECT id FROM chats LIMIT 1 OFFSET 3), (SELECT id FROM profiles WHERE email = 'zion2999@gmail.com'), 'I need the pressure washer for cleaning my deck. How long is the hose?', 'text', true),
+((SELECT id FROM chats LIMIT 1 OFFSET 3), (SELECT id FROM profiles WHERE email = 'zion2999@gmail.com'), 'It comes with a 25-foot hose and multiple nozzles for different cleaning tasks.', 'text', true),
+((SELECT id FROM chats LIMIT 1 OFFSET 3), (SELECT id FROM profiles WHERE email = 'zion2999@gmail.com'), 'Perfect! That should be enough reach for my deck.', 'text', false),
 -- Chat 5 messages
-((SELECT id FROM chats LIMIT 1 OFFSET 4), (SELECT id FROM profiles WHERE email = 'john@example.com'), 'The concrete mixer worked great! Thanks for the quick rental.', 'text', true),
-((SELECT id FROM chats LIMIT 1 OFFSET 4), (SELECT id FROM profiles WHERE email = 'john@example.com'), 'Glad it worked well for your project! Feel free to rent again anytime.', 'text', true),
-((SELECT id FROM chats LIMIT 1 OFFSET 4), (SELECT id FROM profiles WHERE email = 'john@example.com'), 'Will do! I''ll leave a review shortly.', 'text', false),
+((SELECT id FROM chats LIMIT 1 OFFSET 4), (SELECT id FROM profiles WHERE email = 'zion2999@gmail.com'), 'The concrete mixer worked great! Thanks for the quick rental.', 'text', true),
+((SELECT id FROM chats LIMIT 1 OFFSET 4), (SELECT id FROM profiles WHERE email = 'zion2999@gmail.com'), 'Glad it worked well for your project! Feel free to rent again anytime.', 'text', true),
+((SELECT id FROM chats LIMIT 1 OFFSET 4), (SELECT id FROM profiles WHERE email = 'zion2999@gmail.com'), 'Will do! I''ll leave a review shortly.', 'text', false),
 -- Chat 6 messages
-((SELECT id FROM chats LIMIT 1 OFFSET 5), (SELECT id FROM profiles WHERE email = 'john@example.com'), 'I need the skid steer for a commercial project. Can you operate it?', 'text', true),
-((SELECT id FROM chats LIMIT 1 OFFSET 5), (SELECT id FROM profiles WHERE email = 'john@example.com'), 'Yes, I''m certified and have 15 years of experience. What type of work?', 'text', true),
-((SELECT id FROM chats LIMIT 1 OFFSET 5), (SELECT id FROM profiles WHERE email = 'john@example.com'), 'Moving gravel and leveling a parking area. Should take 2-3 days.', 'text', false),
+((SELECT id FROM chats LIMIT 1 OFFSET 5), (SELECT id FROM profiles WHERE email = 'zion2999@gmail.com'), 'I need the skid steer for a commercial project. Can you operate it?', 'text', true),
+((SELECT id FROM chats LIMIT 1 OFFSET 5), (SELECT id FROM profiles WHERE email = 'zion2999@gmail.com'), 'Yes, I''m certified and have 15 years of experience. What type of work?', 'text', true),
+((SELECT id FROM chats LIMIT 1 OFFSET 5), (SELECT id FROM profiles WHERE email = 'zion2999@gmail.com'), 'Moving gravel and leveling a parking area. Should take 2-3 days.', 'text', false),
 -- Chat 7 messages
-((SELECT id FROM chats LIMIT 1 OFFSET 6), (SELECT id FROM profiles WHERE email = 'john@example.com'), 'Is the chainsaw suitable for cutting down a large oak tree?', 'text', true),
-((SELECT id FROM chats LIMIT 1 OFFSET 6), (SELECT id FROM profiles WHERE email = 'john@example.com'), 'It can handle it, but please make sure you have experience with tree felling for safety.', 'text', true),
-((SELECT id FROM chats LIMIT 1 OFFSET 6), (SELECT id FROM profiles WHERE email = 'john@example.com'), 'I''ve done it before. I''ll be very careful and follow all safety protocols.', 'text', false),
+((SELECT id FROM chats LIMIT 1 OFFSET 6), (SELECT id FROM profiles WHERE email = 'zion2999@gmail.com'), 'Is the chainsaw suitable for cutting down a large oak tree?', 'text', true),
+((SELECT id FROM chats LIMIT 1 OFFSET 6), (SELECT id FROM profiles WHERE email = 'zion2999@gmail.com'), 'It can handle it, but please make sure you have experience with tree felling for safety.', 'text', true),
+((SELECT id FROM chats LIMIT 1 OFFSET 6), (SELECT id FROM profiles WHERE email = 'zion2999@gmail.com'), 'I''ve done it before. I''ll be very careful and follow all safety protocols.', 'text', false),
 -- Chat 8 messages
-((SELECT id FROM chats LIMIT 1 OFFSET 7), (SELECT id FROM profiles WHERE email = 'john@example.com'), 'I need to cancel my booking due to weather. Can I get a refund?', 'text', true),
-((SELECT id FROM chats LIMIT 1 OFFSET 7), (SELECT id FROM profiles WHERE email = 'john@example.com'), 'No problem! Weather cancellations are fully refundable. I''ll process it now.', 'text', true),
-((SELECT id FROM chats LIMIT 1 OFFSET 7), (SELECT id FROM profiles WHERE email = 'john@example.com'), 'Thank you for understanding! I''ll rebook when the weather clears.', 'text', false),
+((SELECT id FROM chats LIMIT 1 OFFSET 7), (SELECT id FROM profiles WHERE email = 'zion2999@gmail.com'), 'I need to cancel my booking due to weather. Can I get a refund?', 'text', true),
+((SELECT id FROM chats LIMIT 1 OFFSET 7), (SELECT id FROM profiles WHERE email = 'zion2999@gmail.com'), 'No problem! Weather cancellations are fully refundable. I''ll process it now.', 'text', true),
+((SELECT id FROM chats LIMIT 1 OFFSET 7), (SELECT id FROM profiles WHERE email = 'zion2999@gmail.com'), 'Thank you for understanding! I''ll rebook when the weather clears.', 'text', false),
 -- Chat 9 messages
-((SELECT id FROM chats LIMIT 1 OFFSET 8), (SELECT id FROM profiles WHERE email = 'john@example.com'), 'The tile saw is exactly what I needed for my bathroom renovation!', 'text', true),
-((SELECT id FROM chats LIMIT 1 OFFSET 8), (SELECT id FROM profiles WHERE email = 'john@example.com'), 'Excellent! The diamond blade should give you clean, precise cuts.', 'text', true),
-((SELECT id FROM chats LIMIT 1 OFFSET 8), (SELECT id FROM profiles WHERE email = 'john@example.com'), 'It''s working perfectly. I''ll definitely recommend you to others.', 'text', false),
+((SELECT id FROM chats LIMIT 1 OFFSET 8), (SELECT id FROM profiles WHERE email = 'zion2999@gmail.com'), 'The tile saw is exactly what I needed for my bathroom renovation!', 'text', true),
+((SELECT id FROM chats LIMIT 1 OFFSET 8), (SELECT id FROM profiles WHERE email = 'zion2999@gmail.com'), 'Excellent! The diamond blade should give you clean, precise cuts.', 'text', true),
+((SELECT id FROM chats LIMIT 1 OFFSET 8), (SELECT id FROM profiles WHERE email = 'zion2999@gmail.com'), 'It''s working perfectly. I''ll definitely recommend you to others.', 'text', false),
 -- Chat 10 messages
-((SELECT id FROM chats LIMIT 1 OFFSET 9), (SELECT id FROM profiles WHERE email = 'john@example.com'), 'I''m interested in the welding machine. Do you include welding rods?', 'text', true),
-((SELECT id FROM chats LIMIT 1 OFFSET 9), (SELECT id FROM profiles WHERE email = 'john@example.com'), 'Yes, I include basic welding rods. What type of project are you working on?', 'text', true),
-((SELECT id FROM chats LIMIT 1 OFFSET 9), (SELECT id FROM profiles WHERE email = 'john@example.com'), 'Building a custom gate for my driveway. Should be a fun project!', 'text', false);
+((SELECT id FROM chats LIMIT 1 OFFSET 9), (SELECT id FROM profiles WHERE email = 'zion2999@gmail.com'), 'I''m interested in the welding machine. Do you include welding rods?', 'text', true),
+((SELECT id FROM chats LIMIT 1 OFFSET 9), (SELECT id FROM profiles WHERE email = 'zion2999@gmail.com'), 'Yes, I include basic welding rods. What type of project are you working on?', 'text', true),
+((SELECT id FROM chats LIMIT 1 OFFSET 9), (SELECT id FROM profiles WHERE email = 'zion2999@gmail.com'), 'Building a custom gate for my driveway. Should be a fun project!', 'text', false);
 
 -- Create notifications
 INSERT INTO notifications (
   user_id,
   type,
   title,
   message,
   read,
   action_url
 ) VALUES 
-((SELECT id FROM profiles WHERE email = 'john@example.com'), 'booking', 'New Booking Request', 'You have a new booking request for your DeWalt drill', false, '/dashboard/bookings'),
-((SELECT id FROM profiles WHERE email = 'john@example.com'), 'review', 'New Review Received', 'You received a 5-star review for your excavator rental', true, '/dashboard/reviews'),
-((SELECT id FROM profiles WHERE email = 'john@example.com'), 'bid', 'New Bid Placed', 'Someone placed a bid on your tile saw', false, '/dashboard/bids'),
-((SELECT id FROM profiles WHERE email = 'john@example.com'), 'message', 'New Message', 'You have a new message about your pressure washer', false, '/dashboard/messages'),
-((SELECT id FROM profiles WHERE email = 'john@example.com'), 'payment', 'Payment Received', 'Payment of $120.36 has been received for your drill rental', true, '/dashboard/earnings'),
-((SELECT id FROM profiles WHERE email = 'john@example.com'), 'booking', 'Booking Confirmed', 'Your excavator booking has been confirmed', true, '/dashboard/bookings'),
-((SELECT id FROM profiles WHERE email = 'john@example.com'), 'review', 'Review Reminder', 'Don''t forget to review your recent chainsaw rental', false, '/dashboard/reviews'),
-((SELECT id FROM profiles WHERE email = 'john@example.com'), 'bid', 'Bid Won', 'Congratulations! You won the bid for the welding machine', true, '/dashboard/bids'),
-((SELECT id FROM profiles WHERE email = 'john@example.com'), 'message', 'Message Reply', 'John replied to your message about the concrete mixer', true, '/dashboard/messages'),
-((SELECT id FROM profiles WHERE email = 'john@example.com'), 'dispute', 'Insurance Claim Update', 'Your insurance claim has been approved', false, '/dashboard/claims');
+((SELECT id FROM profiles WHERE email = 'zion2999@gmail.com'), 'booking', 'New Booking Request', 'You have a new booking request for your DeWalt drill', false, '/dashboard/bookings'),
+((SELECT id FROM profiles WHERE email = 'zion2999@gmail.com'), 'review', 'New Review Received', 'You received a 5-star review for your excavator rental', true, '/dashboard/reviews'),
+((SELECT id FROM profiles WHERE email = 'zion2999@gmail.com'), 'bid', 'New Bid Placed', 'Someone placed a bid on your tile saw', false, '/dashboard/bids'),
+((SELECT id FROM profiles WHERE email = 'zion2999@gmail.com'), 'message', 'New Message', 'You have a new message about your pressure washer', false, '/dashboard/messages'),
+((SELECT id FROM profiles WHERE email = 'zion2999@gmail.com'), 'payment', 'Payment Received', 'Payment of $120.36 has been received for your drill rental', true, '/dashboard/earnings'),
+((SELECT id FROM profiles WHERE email = 'zion2999@gmail.com'), 'booking', 'Booking Confirmed', 'Your excavator booking has been confirmed', true, '/dashboard/bookings'),
+((SELECT id FROM profiles WHERE email = 'zion2999@gmail.com'), 'review', 'Review Reminder', 'Don''t forget to review your recent chainsaw rental', false, '/dashboard/reviews'),
+((SELECT id FROM profiles WHERE email = 'zion2999@gmail.com'), 'bid', 'Bid Won', 'Congratulations! You won the bid for the welding machine', true, '/dashboard/bids'),
+((SELECT id FROM profiles WHERE email = 'zion2999@gmail.com'), 'message', 'Message Reply', 'John replied to your message about the concrete mixer', true, '/dashboard/messages'),
+((SELECT id FROM profiles WHERE email = 'zion2999@gmail.com'), 'dispute', 'Insurance Claim Update', 'Your insurance claim has been approved', false, '/dashboard/claims');
 
 -- Create insurance claims
 INSERT INTO insurance_claims (
   booking_id,
   claimant_id,
   type,
   description,
   photos,
   status,
   amount_claimed,
   amount_approved
 ) VALUES 
-((SELECT id FROM bookings LIMIT 1 OFFSET 0), (SELECT id FROM profiles WHERE email = 'john@example.com'), 'Damage', 'Minor scratch on drill case during transport', ARRAY['https://images.pexels.com/photos/209274/pexels-photo-209274.jpeg'], 'approved', 25.00, 25.00),
-((SELECT id FROM bookings LIMIT 1 OFFSET 1), (SELECT id FROM profiles WHERE email = 'john@example.com'), 'Theft', 'Excavator attachment stolen from job site', ARRAY['https://images.pexels.com/photos/1078884/pexels-photo-1078884.jpeg'], 'pending', 500.00, NULL),
-((SELECT id FROM bookings LIMIT 1 OFFSET 2), (SELECT id FROM profiles WHERE email = 'john@example.com'), 'Damage', 'Blade guard cracked during use', ARRAY['https://images.pexels.com/photos/209274/pexels-photo-209274.jpeg'], 'approved', 45.00, 40.00),
-((SELECT id FROM bookings LIMIT 1 OFFSET 3), (SELECT id FROM profiles WHERE email = 'john@example.com'), 'Malfunction', 'Pressure washer pump failed during rental', ARRAY['https://images.pexels.com/photos/209274/pexels-photo-209274.jpeg'], 'resolved', 150.00, 150.00),
-((SELECT id FROM bookings LIMIT 1 OFFSET 4), (SELECT id FROM profiles WHERE email = 'john@example.com'), 'Damage', 'Concrete mixer drum dented', ARRAY['https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg'], 'denied', 200.00, 0.00),
-((SELECT id FROM bookings LIMIT 1 OFFSET 5), (SELECT id FROM profiles WHERE email = 'john@example.com'), 'Accident', 'Minor hydraulic leak during operation', ARRAY['https://images.pexels.com/photos/1078884/pexels-photo-1078884.jpeg'], 'approved', 300.00, 250.00),
-((SELECT id FROM bookings LIMIT 1 OFFSET 6), (SELECT id FROM profiles WHERE email = 'john@example.com'), 'Damage', 'Chain saw bar bent during tree cutting', ARRAY['https://images.pexels.com/photos/209274/pexels-photo-209274.jpeg'], 'pending', 75.00, NULL),
-((SELECT id FROM bookings LIMIT 1 OFFSET 7), (SELECT id FROM profiles WHERE email = 'john@example.com'), 'Weather', 'Equipment damaged by unexpected storm', ARRAY['https://images.pexels.com/photos/209274/pexels-photo-209274.jpeg'], 'approved', 100.00, 100.00),
-((SELECT id FROM bookings LIMIT 1 OFFSET 8), (SELECT id FROM profiles WHERE email = 'john@example.com'), 'Damage', 'Tile saw water pump clogged with debris', ARRAY['https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg'], 'resolved', 80.00, 60.00),
-((SELECT id FROM bookings LIMIT 1 OFFSET 9), (SELECT id FROM profiles WHERE email = 'john@example.com'), 'Malfunction', 'Welding machine power supply issue', ARRAY['https://images.pexels.com/photos/209274/pexels-photo-209274.jpeg'], 'pending', 250.00, NULL);
+((SELECT id FROM bookings LIMIT 1 OFFSET 0), (SELECT id FROM profiles WHERE email = 'zion2999@gmail.com'), 'Damage', 'Minor scratch on drill case during transport', ARRAY['https://images.pexels.com/photos/209274/pexels-photo-209274.jpeg'], 'approved', 25.00, 25.00),
+((SELECT id FROM bookings LIMIT 1 OFFSET 1), (SELECT id FROM profiles WHERE email = 'zion2999@gmail.com'), 'Theft', 'Excavator attachment stolen from job site', ARRAY['https://images.pexels.com/photos/1078884/pexels-photo-1078884.jpeg'], 'pending', 500.00, NULL),
+((SELECT id FROM bookings LIMIT 1 OFFSET 2), (SELECT id FROM profiles WHERE email = 'zion2999@gmail.com'), 'Damage', 'Blade guard cracked during use', ARRAY['https://images.pexels.com/photos/209274/pexels-photo-209274.jpeg'], 'approved', 45.00, 40.00),
+((SELECT id FROM bookings LIMIT 1 OFFSET 3), (SELECT id FROM profiles WHERE email = 'zion2999@gmail.com'), 'Malfunction', 'Pressure washer pump failed during rental', ARRAY['https://images.pexels.com/photos/209274/pexels-photo-209274.jpeg'], 'resolved', 150.00, 150.00),
+((SELECT id FROM bookings LIMIT 1 OFFSET 4), (SELECT id FROM profiles WHERE email = 'zion2999@gmail.com'), 'Damage', 'Concrete mixer drum dented', ARRAY['https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg'], 'denied', 200.00, 0.00),
+((SELECT id FROM bookings LIMIT 1 OFFSET 5), (SELECT id FROM profiles WHERE email = 'zion2999@gmail.com'), 'Accident', 'Minor hydraulic leak during operation', ARRAY['https://images.pexels.com/photos/1078884/pexels-photo-1078884.jpeg'], 'approved', 300.00, 250.00),
+((SELECT id FROM bookings LIMIT 1 OFFSET 6), (SELECT id FROM profiles WHERE email = 'zion2999@gmail.com'), 'Damage', 'Chain saw bar bent during tree cutting', ARRAY['https://images.pexels.com/photos/209274/pexels-photo-209274.jpeg'], 'pending', 75.00, NULL),
+((SELECT id FROM bookings LIMIT 1 OFFSET 7), (SELECT id FROM profiles WHERE email = 'zion2999@gmail.com'), 'Weather', 'Equipment damaged by unexpected storm', ARRAY['https://images.pexels.com/photos/209274/pexels-photo-209274.jpeg'], 'approved', 100.00, 100.00),
+((SELECT id FROM bookings LIMIT 1 OFFSET 8), (SELECT id FROM profiles WHERE email = 'zion2999@gmail.com'), 'Damage', 'Tile saw water pump clogged with debris', ARRAY['https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg'], 'resolved', 80.00, 60.00),
+((SELECT id FROM bookings LIMIT 1 OFFSET 9), (SELECT id FROM profiles WHERE email = 'zion2999@gmail.com'), 'Malfunction', 'Welding machine power supply issue', ARRAY['https://images.pexels.com/photos/209274/pexels-photo-209274.jpeg'], 'pending', 250.00, NULL);