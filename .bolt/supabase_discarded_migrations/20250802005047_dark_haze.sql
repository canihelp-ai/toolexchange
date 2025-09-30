@@ .. @@
 /*
   # Create sample data for tool exchange platform
 
   1. Sample Data Overview
-    - Uses placeholder UUIDs that need to be replaced with actual profile IDs
-    - Creates 10 records for each table (except profiles)
+    - Uses actual user ID from auth.users: 00000000-0000-0000-0000-000000000000
+    - Creates 1 profile and 10 records for other tables
     - Maintains proper foreign key relationships
     - Includes realistic data for testing
 
   2. Tables Populated
-    - operators (10 records)
+    - profiles (1 record for the existing auth user)
+    - operators (1 record)
     - tools (10 records)
     - tool_images (20 records - 2 per tool)
-    - tool_availability (10 records)
-    - operator_availability (10 records)
+    - tool_availability (10 records) 
+    - operator_availability (1 record)
     - bookings (10 records)
     - bids (10 records)
     - reviews (10 records)
     - chats (10 records)
     - messages (30 records - 3 per chat)
     - notifications (10 records)
     - insurance_claims (10 records)
 
   3. Important Notes
-    - Replace placeholder UUIDs with actual profile IDs before running
-    - Ensure profiles exist before running this migration
+    - Uses the existing auth user ID: 00000000-0000-0000-0000-000000000000
+    - Creates one comprehensive profile that acts as owner, renter, and operator
     - All foreign key relationships are maintained
 */
 
--- Note: Replace these placeholder UUIDs with actual profile IDs from your database
--- Profile IDs (replace with actual UUIDs):
--- Owner/Renter/Operator: 00000000-0000-0000-0000-000000000000 (main user)
--- Additional users would need to be created through normal registration
+-- Create profile for the existing auth user
+INSERT INTO profiles (
+  id, email, name, phone, avatar_url, location, bio, role,
+  email_verified, phone_verified, id_verified, rating, review_count, trust_score
+) VALUES (
+  '00000000-0000-0000-0000-000000000000',
+  'user@example.com',
+  'John Martinez',
+  '(555) 123-4567',
+  'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1',
+  'San Francisco, CA',
+  'Professional contractor with 15+ years experience. I rent out high-quality tools and equipment.',
+  'owner',
+  true,
+  true,
+  true,
+  4.8,
+  156,
+  95
+);
 
--- Operators (10 records)
+-- Operators (1 record for the main user)
 INSERT INTO operators (
   profile_id, skills, certifications, license_url, experience, hourly_rate,
   rating, review_count, completed_jobs, verified
 ) VALUES
-  ('00000000-0000-0000-0000-000000000000', ARRAY['Heavy Equipment', 'Excavation', 'Concrete Work'], ARRAY['OSHA 30', 'Heavy Equipment License'], '/docs/license1.pdf', 12, 75.00, 4.9, 78, 124, true),
-  ('00000000-0000-0000-0000-000000000001', ARRAY['Power Tools', 'Carpentry', 'Electrical'], ARRAY['Electrical License', 'Safety Certified'], '/docs/license2.pdf', 8, 45.00, 4.7, 45, 89, true),
-  ('00000000-0000-0000-0000-000000000002', ARRAY['Plumbing', 'HVAC', 'General Maintenance'], ARRAY['Plumbing License', 'HVAC Certified'], '/docs/license3.pdf', 15, 65.00, 4.8, 92, 156, true),
-  ('00000000-0000-0000-0000-000000000003', ARRAY['Landscaping', 'Tree Service', 'Irrigation'], ARRAY['Arborist License', 'Pesticide License'], '/docs/license4.pdf', 10, 55.00, 4.6, 67, 98, false),
-  ('00000000-0000-0000-0000-000000000004', ARRAY['Welding', 'Metal Fabrication', 'Cutting'], ARRAY['Welding Certification', 'Safety Training'], '/docs/license5.pdf', 18, 85.00, 4.9, 134, 201, true),
-  ('00000000-0000-0000-0000-000000000005', ARRAY['Concrete', 'Masonry', 'Demolition'], ARRAY['Concrete Finisher License'], '/docs/license6.pdf', 14, 70.00, 4.5, 56, 87, true),
-  ('00000000-0000-0000-0000-000000000006', ARRAY['Roofing', 'Siding', 'Gutters'], ARRAY['Roofing License', 'Fall Protection'], '/docs/license7.pdf', 11, 60.00, 4.7, 78, 112, true),
-  ('00000000-0000-0000-0000-000000000007', ARRAY['Painting', 'Drywall', 'Flooring'], ARRAY['Lead Safe Certified'], '/docs/license8.pdf', 7, 40.00, 4.4, 34, 52, false),
-  ('00000000-0000-0000-0000-000000000008', ARRAY['Tile Work', 'Bathroom Remodel', 'Kitchen Remodel'], ARRAY['Tile Installation Certified'], '/docs/license9.pdf', 13, 75.00, 4.8, 89, 145, true),
-  ('00000000-0000-0000-0000-000000000009', ARRAY['General Construction', 'Project Management'], ARRAY['General Contractor License', 'PMP Certified'], '/docs/license10.pdf', 20, 95.00, 4.9, 167, 234, true);
+  ('00000000-0000-0000-0000-000000000000', ARRAY['Heavy Equipment', 'Excavation', 'Concrete Work', 'Power Tools'], ARRAY['OSHA 30', 'Heavy Equipment License', 'General Contractor'], '/docs/license1.pdf', 15, 75.00, 4.8, 156, 124, true);
 
 -- Tools (10 records)
@@ .. @@
   ('00000000-0000-0000-0000-000000000000', 'Professional Tile Saw - MK Diamond', 'High-precision tile saw for professional and DIY projects. Includes diamond blade and water pump system.', 'Construction Tools', 'MK Diamond', 'MK-370EXP', 'San Francisco, CA', 'excellent', '{"Cutting Capacity": "12 inches", "Blade Size": "7 inches", "Motor": "1 HP", "Water System": "Integrated pump"}', 'bidding', NULL, 85.00, 500.00, 65.00, 75.00, false, false, NULL, NULL, true, 25.00, 50.00, 4.7, 23, ARRAY['Diamond Blade', 'Water Cooling', 'Portable Stand', 'Dust Collection'], ARRAY['Provide own extension cord', 'Clean after use', 'No concrete cutting'], 200.00),
   ('00000000-0000-0000-0000-000000000000', 'Pressure Washer - Simpson', 'Gas-powered pressure washer perfect for cleaning driveways, decks, and siding. 3100 PSI with multiple nozzles.', 'Cleaning Equipment', 'Simpson', 'MS60763-S', 'San Francisco, CA', 'good', '{"Pressure": "3100 PSI", "Flow Rate": "2.4 GPM", "Engine": "Honda GCV160", "Hose Length": "25 ft"}', 'fixed', 25.00, 75.00, 450.00, NULL, NULL, false, false, NULL, NULL, true, 15.00, 30.00, 4.6, 18, ARRAY['Multiple Nozzles', 'Honda Engine', 'Easy Start', 'Detergent Tank'], ARRAY['Use only recommended detergents', 'No hot water', 'Return with empty tank'], 150.00),
   ('00000000-0000-0000-0000-000000000000', 'Scaffolding System - Werner', 'Complete scaffolding system for multi-story projects. Includes platforms, guardrails, and all hardware.', 'Safety Equipment', 'Werner', 'PS-48', 'San Francisco, CA', 'excellent', '{"Height": "12 ft", "Platform Size": "4x8 ft", "Weight Capacity": "750 lbs", "Material": "Aluminum"}', 'fixed', NULL, 120.00, 720.00, NULL, NULL, true, true, '00000000-0000-0000-0000-000000000000', 75.00, true, 50.00, 100.00, 4.9, 31, ARRAY['Complete System', 'Safety Rails', 'Non-Slip Platform', 'Easy Assembly'], ARRAY['Assembly required', 'Safety training recommended', 'Inspect before use'], 500.00);
 
--- Tool Images (20 records - 2 per tool)
+-- Tool Images (20 records - 2 per tool) 
 INSERT INTO tool_images (tool_id, image_url, is_primary) 
 SELECT 
   t.id,
@@ .. @@
 FROM tools t
 ORDER BY t.created_at;
 
--- Tool Availability (10 records)
+-- Tool Availability (10 records)
 INSERT INTO tool_availability (tool_id, start_date, end_date, blocked_dates)
 SELECT 
   id,
@@ .. @@
 FROM tools
 ORDER BY created_at;
 
--- Operator Availability (10 records)
+-- Operator Availability (1 record)
 INSERT INTO operator_availability (operator_id, start_date, end_date, blocked_dates)
-SELECT 
-  id,
-  CURRENT_DATE,
-  CURRENT_DATE + INTERVAL '365 days',
-  ARRAY[CURRENT_DATE + INTERVAL '30 days', CURRENT_DATE + INTERVAL '60 days']
-FROM operators
-ORDER BY created_at;
+VALUES (
+  (SELECT id FROM operators WHERE profile_id = '00000000-0000-0000-0000-000000000000'),
+  CURRENT_DATE,
+  CURRENT_DATE + INTERVAL '365 days',
+  ARRAY[CURRENT_DATE + INTERVAL '30 days', CURRENT_DATE + INTERVAL '60 days']
+);
 
 -- Bookings (10 records)
 INSERT INTO bookings (
@@ -135,20 +149,20 @@ INSERT INTO bookings (
   renter_id, tool_id, operator_id, start_date, end_date, duration, status,
   tool_cost, operator_cost, insurance_cost, platform_fee, tax, total,
   insurance_selected, insurance_type, insurance_coverage, deposit, payment_status
 ) VALUES
-  ('00000000-0000-0000-0000-000000000000', (SELECT id FROM tools ORDER BY created_at LIMIT 1 OFFSET 0), NULL, CURRENT_DATE + 5, CURRENT_DATE + 7, 2, 'confirmed', 90.00, 0.00, 12.00, 15.30, 9.18, 126.48, true, 'basic', 500.00, 100.00, 'paid'),
-  ('00000000-0000-0000-0000-000000000000', (SELECT id FROM tools ORDER BY created_at LIMIT 1 OFFSET 1), (SELECT id FROM operators ORDER BY created_at LIMIT 1 OFFSET 0), CURRENT_DATE + 10, CURRENT_DATE + 12, 2, 'active', 640.00, 1200.00, 300.00, 214.00, 128.40, 2482.40, true, 'premium', 2000.00, 1500.00, 'paid'),
-  ('00000000-0000-0000-0000-000000000000', (SELECT id FROM tools ORDER BY created_at LIMIT 1 OFFSET 2), NULL, CURRENT_DATE + 15, CURRENT_DATE + 16, 1, 'pending', 85.00, 0.00, 25.00, 11.00, 6.60, 127.60, true, 'basic', 1000.00, 200.00, 'pending'),
-  ('00000000-0000-0000-0000-000000000000', (SELECT id FROM tools ORDER BY created_at LIMIT 1 OFFSET 3), NULL, CURRENT_DATE + 20, CURRENT_DATE + 21, 1, 'completed', 75.00, 0.00, 15.00, 9.00, 5.40, 104.40, true, 'basic', 500.00, 150.00, 'paid'),
-  ('00000000-0000-0000-0000-000000000000', (SELECT id FROM tools ORDER BY created_at LIMIT 1 OFFSET 4), (SELECT id FROM operators ORDER BY created_at LIMIT 1 OFFSET 1), CURRENT_DATE + 25, CURRENT_DATE + 27, 2, 'confirmed', 240.00, 720.00, 100.00, 116.00, 69.60, 1245.60, true, 'premium', 1500.00, 500.00, 'paid'),
-  ('00000000-0000-0000-0000-000000000000', (SELECT id FROM tools ORDER BY created_at LIMIT 1 OFFSET 5), NULL, CURRENT_DATE - 10, CURRENT_DATE - 8, 2, 'completed', 150.00, 0.00, 30.00, 18.00, 10.80, 208.80, true, 'basic', 750.00, 200.00, 'paid'),
-  ('00000000-0000-0000-0000-000000000000', (SELECT id FROM tools ORDER BY created_at LIMIT 1 OFFSET 6), NULL, CURRENT_DATE - 5, CURRENT_DATE - 4, 1, 'completed', 95.00, 0.00, 20.00, 11.50, 6.90, 133.40, true, 'basic', 600.00, 175.00, 'paid'),
-  ('00000000-0000-0000-0000-000000000000', (SELECT id FROM tools ORDER BY created_at LIMIT 1 OFFSET 7), NULL, CURRENT_DATE + 30, CURRENT_DATE + 31, 1, 'pending', 110.00, 0.00, 25.00, 13.50, 8.10, 156.60, true, 'basic', 800.00, 225.00, 'pending'),
-  ('00000000-0000-0000-0000-000000000000', (SELECT id FROM tools ORDER BY created_at LIMIT 1 OFFSET 8), (SELECT id FROM operators ORDER BY created_at LIMIT 1 OFFSET 2), CURRENT_DATE + 35, CURRENT_DATE + 37, 2, 'confirmed', 150.00, 600.00, 60.00, 81.00, 48.60, 939.60, true, 'premium', 1200.00, 300.00, 'paid'),
-  ('00000000-0000-0000-0000-000000000000', (SELECT id FROM tools ORDER BY created_at LIMIT 1 OFFSET 9), NULL, CURRENT_DATE + 40, CURRENT_DATE + 42, 2, 'pending', 240.00, 0.00, 100.00, 34.00, 20.40, 394.40, true, 'premium', 1000.00, 500.00, 'pending');
+  ('00000000-0000-0000-0000-000000000000', (SELECT id FROM tools ORDER BY created_at LIMIT 1 OFFSET 0), NULL, CURRENT_DATE + 5, CURRENT_DATE + 7, 2, 'confirmed', 90.00, 0.00, 12.00, 15.30, 9.18, 126.48, true, 'basic', 500.00, 100.00, 'paid'),
+  ('00000000-0000-0000-0000-000000000000', (SELECT id FROM tools ORDER BY created_at LIMIT 1 OFFSET 1), (SELECT id FROM operators WHERE profile_id = '00000000-0000-0000-0000-000000000000'), CURRENT_DATE + 10, CURRENT_DATE + 12, 2, 'active', 640.00, 1200.00, 300.00, 214.00, 128.40, 2482.40, true, 'premium', 2000.00, 1500.00, 'paid'),
+  ('00000000-0000-0000-0000-000000000000', (SELECT id FROM tools ORDER BY created_at LIMIT 1 OFFSET 2), NULL, CURRENT_DATE + 15, CURRENT_DATE + 16, 1, 'pending', 85.00, 0.00, 25.00, 11.00, 6.60, 127.60, true, 'basic', 1000.00, 200.00, 'pending'),
+  ('00000000-0000-0000-0000-000000000000', (SELECT id FROM tools ORDER BY created_at LIMIT 1 OFFSET 3), NULL, CURRENT_DATE + 20, CURRENT_DATE + 21, 1, 'completed', 75.00, 0.00, 15.00, 9.00, 5.40, 104.40, true, 'basic', 500.00, 150.00, 'paid'),
+  ('00000000-0000-0000-0000-000000000000', (SELECT id FROM tools ORDER BY created_at LIMIT 1 OFFSET 4), (SELECT id FROM operators WHERE profile_id = '00000000-0000-0000-0000-000000000000'), CURRENT_DATE + 25, CURRENT_DATE + 27, 2, 'confirmed', 240.00, 720.00, 100.00, 116.00, 69.60, 1245.60, true, 'premium', 1500.00, 500.00, 'paid'),
+  ('00000000-0000-0000-0000-000000000000', (SELECT id FROM tools ORDER BY created_at LIMIT 1 OFFSET 5), NULL, CURRENT_DATE - 10, CURRENT_DATE - 8, 2, 'completed', 150.00, 0.00, 30.00, 18.00, 10.80, 208.80, true, 'basic', 750.00, 200.00, 'paid'),
+  ('00000000-0000-0000-0000-000000000000', (SELECT id FROM tools ORDER BY created_at LIMIT 1 OFFSET 6), NULL, CURRENT_DATE - 5, CURRENT_DATE - 4, 1, 'completed', 95.00, 0.00, 20.00, 11.50, 6.90, 133.40, true, 'basic', 600.00, 175.00, 'paid'),
+  ('00000000-0000-0000-0000-000000000000', (SELECT id FROM tools ORDER BY created_at LIMIT 1 OFFSET 7), NULL, CURRENT_DATE + 30, CURRENT_DATE + 31, 1, 'pending', 110.00, 0.00, 25.00, 13.50, 8.10, 156.60, true, 'basic', 800.00, 225.00, 'pending'),
+  ('00000000-0000-0000-0000-000000000000', (SELECT id FROM tools ORDER BY created_at LIMIT 1 OFFSET 8), (SELECT id FROM operators WHERE profile_id = '00000000-0000-0000-0000-000000000000'), CURRENT_DATE + 35, CURRENT_DATE + 37, 2, 'confirmed', 150.00, 600.00, 60.00, 81.00, 48.60, 939.60, true, 'premium', 1200.00, 300.00, 'paid'),
+  ('00000000-0000-0000-0000-000000000000', (SELECT id FROM tools ORDER BY created_at LIMIT 1 OFFSET 9), NULL, CURRENT_DATE + 40, CURRENT_DATE + 42, 2, 'pending', 240.00, 0.00, 100.00, 34.00, 20.40, 394.40, true, 'premium', 1000.00, 500.00, 'pending');
 
 -- Bids (10 records)
 INSERT INTO bids (tool_id, bidder_id, amount, status, expires_at) VALUES
@@ .. @@
 -- Reviews (10 records)
 INSERT INTO reviews (
   type, target_id, reviewer_id, booking_id, rating, comment,
   communication_rating, accuracy_rating, condition_rating, value_rating, photos, helpful
 ) VALUES
-  ('tool', (SELECT id FROM tools ORDER BY created_at LIMIT 1 OFFSET 0), '00000000-0000-0000-0000-000000000000', (SELECT id FROM bookings ORDER BY created_at LIMIT 1 OFFSET 0), 5, 'Excellent drill! Very powerful and the batteries lasted the entire project. Owner was very responsive and helpful.', 5, 5, 5, 4, ARRAY[]::text[], 3),
-  ('owner', '00000000-0000-0000-0000-000000000000', '00000000-0000-0000-0000-000000000000', (SELECT id FROM bookings ORDER BY created_at LIMIT 1 OFFSET 1), 5, 'John is a fantastic tool owner. Equipment was exactly as described and pickup was smooth.', 5, 5, 5, 5, ARRAY[]::text[], 5),
-  ('tool', (SELECT id FROM tools ORDER BY created_at LIMIT 1 OFFSET 2), '00000000-0000-0000-0000-000000000000', (SELECT id FROM bookings ORDER BY created_at LIMIT 1 OFFSET 2), 4, 'Great tile saw, cut through everything perfectly. A bit heavy but very effective.', 4, 5, 4, 4, ARRAY[]::text[], 2),
-  ('renter', '00000000-0000-0000-0000-000000000000', '00000000-0000-0000-0000-000000000000', (SELECT id FROM bookings ORDER BY created_at LIMIT 1 OFFSET 3), 5, 'Sarah was very careful with my equipment and returned it in perfect condition.', 5, 5, 5, 5, ARRAY[]::text[], 4),
-  ('tool', (SELECT id FROM tools ORDER BY created_at LIMIT 1 OFFSET 4), '00000000-0000-0000-0000-000000000000', (SELECT id FROM bookings ORDER BY created_at LIMIT 1 OFFSET 4), 4, 'Pressure washer worked great for cleaning my deck. Good pressure and easy to use.', 4, 4, 4, 4, ARRAY[]::text[], 1),
-  ('operator', (SELECT id FROM operators ORDER BY created_at LIMIT 1 OFFSET 0), '00000000-0000-0000-0000-000000000000', (SELECT id FROM bookings ORDER BY created_at LIMIT 1 OFFSET 1), 5, 'Mike is an excellent operator. Very skilled with the excavator and completed the job perfectly.', 5, 5, 5, 5, ARRAY[]::text[], 6),
-  ('tool', (SELECT id FROM tools ORDER BY created_at LIMIT 1 OFFSET 6), '00000000-0000-0000-0000-000000000000', (SELECT id FROM bookings ORDER BY created_at LIMIT 1 OFFSET 6), 5, 'Perfect scaffolding system. Very sturdy and safe. Assembly was straightforward.', 5, 5, 5, 4, ARRAY[]::text[], 3),
-  ('tool', (SELECT id FROM tools ORDER BY created_at LIMIT 1 OFFSET 7), '00000000-0000-0000-0000-000000000000', (SELECT id FROM bookings ORDER BY created_at LIMIT 1 OFFSET 7), 3, 'Saw worked okay but blade was a bit dull. Could use some maintenance.', 4, 4, 3, 3, ARRAY[]::text[], 0),
-  ('owner', '00000000-0000-0000-0000-000000000000', '00000000-0000-0000-0000-000000000000', (SELECT id FROM bookings ORDER BY created_at LIMIT 1 OFFSET 8), 4, 'Good communication and fair pricing. Tool was as described.', 4, 4, 4, 4, ARRAY[]::text[], 2),
-  ('tool', (SELECT id FROM tools ORDER BY created_at LIMIT 1 OFFSET 9), '00000000-0000-0000-0000-000000000000', (SELECT id FROM bookings ORDER BY created_at LIMIT 1 OFFSET 9), 5, 'Amazing generator! Quiet operation and plenty of power for our event.', 5, 5, 5, 5, ARRAY[]::text[], 7);
+  ('tool', (SELECT id FROM tools ORDER BY created_at LIMIT 1 OFFSET 0), '00000000-0000-0000-0000-000000000000', (SELECT id FROM bookings ORDER BY created_at LIMIT 1 OFFSET 0), 5, 'Excellent drill! Very powerful and the batteries lasted the entire project.', 5, 5, 5, 4, ARRAY[]::text[], 3),
+  ('tool', (SELECT id FROM tools ORDER BY created_at LIMIT 1 OFFSET 1), '00000000-0000-0000-0000-000000000000', (SELECT id FROM bookings ORDER BY created_at LIMIT 1 OFFSET 1), 5, 'Perfect excavator for the job. Operator service was excellent too.', 5, 5, 5, 5, ARRAY[]::text[], 5),
+  ('tool', (SELECT id FROM tools ORDER BY created_at LIMIT 1 OFFSET 2), '00000000-0000-0000-0000-000000000000', (SELECT id FROM bookings ORDER BY created_at LIMIT 1 OFFSET 2), 4, 'Great tile saw, cut through everything perfectly. A bit heavy but very effective.', 4, 5, 4, 4, ARRAY[]::text[], 2),
+  ('tool', (SELECT id FROM tools ORDER BY created_at LIMIT 1 OFFSET 3), '00000000-0000-0000-0000-000000000000', (SELECT id FROM bookings ORDER BY created_at LIMIT 1 OFFSET 3), 5, 'Pressure washer worked perfectly. Great for cleaning my driveway.', 5, 5, 5, 5, ARRAY[]::text[], 4),
+  ('tool', (SELECT id FROM tools ORDER BY created_at LIMIT 1 OFFSET 4), '00000000-0000-0000-0000-000000000000', (SELECT id FROM bookings ORDER BY created_at LIMIT 1 OFFSET 4), 4, 'Good scaffolding system. Very sturdy and safe for our project.', 4, 4, 4, 4, ARRAY[]::text[], 1),
+  ('tool', (SELECT id FROM tools ORDER BY created_at LIMIT 1 OFFSET 5), '00000000-0000-0000-0000-000000000000', (SELECT id FROM bookings ORDER BY created_at LIMIT 1 OFFSET 5), 5, 'Excellent circular saw. Clean cuts every time.', 5, 5, 5, 5, ARRAY[]::text[], 6),
+  ('tool', (SELECT id FROM tools ORDER BY created_at LIMIT 1 OFFSET 6), '00000000-0000-0000-0000-000000000000', (SELECT id FROM bookings ORDER BY created_at LIMIT 1 OFFSET 6), 5, 'Great angle grinder. Perfect for metal work.', 5, 5, 5, 4, ARRAY[]::text[], 3),
+  ('tool', (SELECT id FROM tools ORDER BY created_at LIMIT 1 OFFSET 7), '00000000-0000-0000-0000-000000000000', (SELECT id FROM bookings ORDER BY created_at LIMIT 1 OFFSET 7), 3, 'Saw worked okay but blade was a bit dull. Could use some maintenance.', 4, 4, 3, 3, ARRAY[]::text[], 0),
+  ('tool', (SELECT id FROM tools ORDER BY created_at LIMIT 1 OFFSET 8), '00000000-0000-0000-0000-000000000000', (SELECT id FROM bookings ORDER BY created_at LIMIT 1 OFFSET 8), 4, 'Good impact driver. Plenty of torque for the job.', 4, 4, 4, 4, ARRAY[]::text[], 2),
+  ('tool', (SELECT id FROM tools ORDER BY created_at LIMIT 1 OFFSET 9), '00000000-0000-0000-0000-000000000000', (SELECT id FROM bookings ORDER BY created_at LIMIT 1 OFFSET 9), 5, 'Amazing generator! Quiet operation and plenty of power.', 5, 5, 5, 5, ARRAY[]::text[], 7);
 
 -- Chats (10 records)
 INSERT INTO chats (participants, booking_id) VALUES
@@ .. @@
 -- Messages (30 records - 3 per chat)
 INSERT INTO messages (chat_id, sender_id, content, type, read) VALUES
   -- Chat 1 messages
-  ((SELECT id FROM chats ORDER BY created_at LIMIT 1 OFFSET 0), '00000000-0000-0000-0000-000000000000', 'Hi! I''m interested in renting your DeWalt drill for this weekend.', 'text', true),
-  ((SELECT id FROM chats ORDER BY created_at LIMIT 1 OFFSET 0), '00000000-0000-0000-0000-000000000000', 'Hello! Yes, it''s available. Would you like me to include the extra battery pack?', 'text', true),
-  ((SELECT id FROM chats ORDER BY created_at LIMIT 1 OFFSET 0), '00000000-0000-0000-0000-000000000000', 'That would be great! What time works best for pickup?', 'text', false),
+  ((SELECT id FROM chats ORDER BY created_at LIMIT 1 OFFSET 0), '00000000-0000-0000-0000-000000000000', 'Hi! I''m interested in renting the DeWalt drill for this weekend.', 'text', true),
+  ((SELECT id FROM chats ORDER BY created_at LIMIT 1 OFFSET 0), '00000000-0000-0000-0000-000000000000', 'Great choice! It''s available. Would you like the extra battery pack?', 'text', true),
+  ((SELECT id FROM chats ORDER BY created_at LIMIT 1 OFFSET 0), '00000000-0000-0000-0000-000000000000', 'Yes please! What time works for pickup?', 'text', false),
   
   -- Chat 2 messages
-  ((SELECT id FROM chats ORDER BY created_at LIMIT 1 OFFSET 1), '00000000-0000-0000-0000-000000000000', 'I need the excavator for a small foundation project. Do you provide operator service?', 'text', true),
-  ((SELECT id FROM chats ORDER BY created_at LIMIT 1 OFFSET 1), '00000000-0000-0000-0000-000000000000', 'Yes, I can provide an experienced operator. The rate is $75/hour. When do you need it?', 'text', true),
-  ((SELECT id FROM chats ORDER BY created_at LIMIT 1 OFFSET 1), '00000000-0000-0000-0000-000000000000', 'Perfect! I need it for 2 days starting next Monday. Can we book it?', 'text', false),
+  ((SELECT id FROM chats ORDER BY created_at LIMIT 1 OFFSET 1), '00000000-0000-0000-0000-000000000000', 'I need the excavator for a foundation project. Do you provide operator service?', 'text', true),
+  ((SELECT id FROM chats ORDER BY created_at LIMIT 1 OFFSET 1), '00000000-0000-0000-0000-000000000000', 'Yes, I can provide an experienced operator at $75/hour. When do you need it?', 'text', true),
+  ((SELECT id FROM chats ORDER BY created_at LIMIT 1 OFFSET 1), '00000000-0000-0000-0000-000000000000', 'Perfect! I need it for 2 days starting Monday. Let''s book it.', 'text', false),
   
   -- Chat 3 messages
-  ((SELECT id FROM chats ORDER BY created_at LIMIT 1 OFFSET 2), '00000000-0000-0000-0000-000000000000', 'Is the tile saw still available for bidding?', 'text', true),
-  ((SELECT id FROM chats ORDER BY created_at LIMIT 1 OFFSET 2), '00000000-0000-0000-0000-000000000000', 'Yes! Current bid is $65. The auction ends tomorrow at 6 PM.', 'text', true),
-  ((SELECT id FROM chats ORDER BY created_at LIMIT 1 OFFSET 2), '00000000-0000-0000-0000-000000000000', 'Thanks! I''ll place my bid shortly.', 'text', false),
+  ((SELECT id FROM chats ORDER BY created_at LIMIT 1 OFFSET 2), '00000000-0000-0000-0000-000000000000', 'Is the tile saw still available for bidding?', 'text', true),
+  ((SELECT id FROM chats ORDER BY created_at LIMIT 1 OFFSET 2), '00000000-0000-0000-0000-000000000000', 'Yes! Current bid is $65. Auction ends tomorrow at 6 PM.', 'text', true),
+  ((SELECT id FROM chats ORDER BY created_at LIMIT 1 OFFSET 2), '00000000-0000-0000-0000-000000000000', 'Thanks! I''ll place my bid shortly.', 'text', false),
   
   -- Chat 4 messages
-  ((SELECT id FROM chats ORDER BY created_at LIMIT 1 OFFSET 3), '00000000-0000-0000-0000-000000000000', 'The pressure washer worked perfectly! Thank you.', 'text', true),
-  ((SELECT id FROM chats ORDER BY created_at LIMIT 1 OFFSET 3), '00000000-0000-0000-0000-000000000000', 'Glad to hear it! Please leave a review when you have a chance.', 'text', true),
-  ((SELECT id FROM chats ORDER BY created_at LIMIT 1 OFFSET 3), '00000000-0000-0000-0000-000000000000', 'Will do! Already planning to rent again for my deck project.', 'text', false),
+  ((SELECT id FROM chats ORDER BY created_at LIMIT 1 OFFSET 3), '00000000-0000-0000-0000-000000000000', 'The pressure washer worked perfectly! Thank you.', 'text', true),
+  ((SELECT id FROM chats ORDER BY created_at LIMIT 1 OFFSET 3), '00000000-0000-0000-0000-000000000000', 'Glad to hear it! Please leave a review when you get a chance.', 'text', true),
+  ((SELECT id FROM chats ORDER BY created_at LIMIT 1 OFFSET 3), '00000000-0000-0000-0000-000000000000', 'Will do! Planning to rent again for my deck project.', 'text', false),
   
   -- Chat 5 messages
-  ((SELECT id FROM chats ORDER BY created_at LIMIT 1 OFFSET 4), '00000000-0000-0000-0000-000000000000', 'I need the scaffolding for a 2-story paint job. Is it suitable?', 'text', true),
-  ((SELECT id FROM chats ORDER BY created_at LIMIT 1 OFFSET 4), '00000000-0000-0000-0000-000000000000', 'Absolutely! It''s rated for 12 feet and includes all safety equipment. I can also provide setup assistance.', 'text', true),
-  ((SELECT id FROM chats ORDER BY created_at LIMIT 1 OFFSET 4), '00000000-0000-0000-0000-000000000000', 'That would be very helpful. Let''s schedule the rental and setup.', 'text', false),
+  ((SELECT id FROM chats ORDER BY created_at LIMIT 1 OFFSET 4), '00000000-0000-0000-0000-000000000000', 'I need scaffolding for a 2-story paint job. Is it suitable?', 'text', true),
+  ((SELECT id FROM chats ORDER BY created_at LIMIT 1 OFFSET 4), '00000000-0000-0000-0000-000000000000', 'Perfect! It''s rated for 12 feet with all safety equipment. I can help with setup.', 'text', true),
+  ((SELECT id FROM chats ORDER BY created_at LIMIT 1 OFFSET 4), '00000000-0000-0000-0000-000000000000', 'That would be great! Let''s schedule the rental and setup.', 'text', false),
   
   -- Chat 6 messages
-  ((SELECT id FROM chats ORDER BY created_at LIMIT 1 OFFSET 5), '00000000-0000-0000-0000-000000000000', 'Quick question about the circular saw - does it come with extra blades?', 'text', true),
-  ((SELECT id FROM chats ORDER BY created_at LIMIT 1 OFFSET 5), '00000000-0000-0000-0000-000000000000', 'Yes, it includes a general purpose blade and a fine-tooth blade for finish work.', 'text', true),
-  ((SELECT id FROM chats ORDER BY created_at LIMIT 1 OFFSET 5), '00000000-0000-0000-0000-000000000000', 'Perfect! That''s exactly what I need. Booking now.', 'text', false),
+  ((SELECT id FROM chats ORDER BY created_at LIMIT 1 OFFSET 5), '00000000-0000-0000-0000-000000000000', 'Does the circular saw come with extra blades?', 'text', true),
+  ((SELECT id FROM chats ORDER BY created_at LIMIT 1 OFFSET 5), '00000000-0000-0000-0000-000000000000', 'Yes, includes a general purpose blade and fine-tooth blade for finish work.', 'text', true),
+  ((SELECT id FROM chats ORDER BY created_at LIMIT 1 OFFSET 5), '00000000-0000-0000-0000-000000000000', 'Perfect! That''s exactly what I need. Booking now.', 'text', false),
   
   -- Chat 7 messages
-  ((SELECT id FROM chats ORDER BY created_at LIMIT 1 OFFSET 6), '00000000-0000-0000-0000-000000000000', 'The angle grinder is exactly what I needed for my metal project!', 'text', true),
-  ((SELECT id FROM chats ORDER BY created_at LIMIT 1 OFFSET 6), '00000000-0000-0000-0000-000000000000', 'Great to hear! It''s a powerful tool. Make sure to use proper safety gear.', 'text', true),
-  ((SELECT id FROM chats ORDER BY created_at LIMIT 1 OFFSET 6), '00000000-0000-0000-0000-000000000000', 'Always do! Thanks for the reminder and the great tool.', 'text', false),
+  ((SELECT id FROM chats ORDER BY created_at LIMIT 1 OFFSET 6), '00000000-0000-0000-0000-000000000000', 'The angle grinder is perfect for my metal project!', 'text', true),
+  ((SELECT id FROM chats ORDER BY created_at LIMIT 1 OFFSET 6), '00000000-0000-0000-0000-000000000000', 'Great! It''s a powerful tool. Make sure to use proper safety gear.', 'text', true),
+  ((SELECT id FROM chats ORDER BY created_at LIMIT 1 OFFSET 6), '00000000-0000-0000-0000-000000000000', 'Always do! Thanks for the reminder and great tool.', 'text', false),
   
   -- Chat 8 messages
-  ((SELECT id FROM chats ORDER BY created_at LIMIT 1 OFFSET 7), '00000000-0000-0000-0000-000000000000', 'I noticed the miter saw blade seems a bit dull. Should I replace it?', 'text', true),
-  ((SELECT id FROM chats ORDER BY created_at LIMIT 1 OFFSET 7), '00000000-0000-0000-0000-000000000000', 'Thanks for letting me know. I''ll replace it before your next use. No charge for you.', 'text', true),
-  ((SELECT id FROM chats ORDER BY created_at LIMIT 1 OFFSET 7), '00000000-0000-0000-0000-000000000000', 'That''s very fair of you. I appreciate the good service!', 'text', false),
+  ((SELECT id FROM chats ORDER BY created_at LIMIT 1 OFFSET 7), '00000000-0000-0000-0000-000000000000', 'The miter saw blade seems a bit dull. Should I replace it?', 'text', true),
+  ((SELECT id FROM chats ORDER BY created_at LIMIT 1 OFFSET 7), '00000000-0000-0000-0000-000000000000', 'Thanks for letting me know. I''ll replace it before next use. No charge.', 'text', true),
+  ((SELECT id FROM chats ORDER BY created_at LIMIT 1 OFFSET 7), '00000000-0000-0000-0000-000000000000', 'That''s very fair. I appreciate the good service!', 'text', false),
   
   -- Chat 9 messages
-  ((SELECT id FROM chats ORDER BY created_at LIMIT 1 OFFSET 8), '00000000-0000-0000-0000-000000000000', 'The impact driver has great torque! Perfect for deck screws.', 'text', true),
-  ((SELECT id FROM chats ORDER BY created_at LIMIT 1 OFFSET 8), '00000000-0000-0000-0000-000000000000', 'It''s a workhorse! I use it for all my construction projects. Glad it''s working well for you.', 'text', true),
-  ((SELECT id FROM chats ORDER BY created_at LIMIT 1 OFFSET 8), '00000000-0000-0000-0000-000000000000', 'Definitely will rent again. You have great tools!', 'text', false),
+  ((SELECT id FROM chats ORDER BY created_at LIMIT 1 OFFSET 8), '00000000-0000-0000-0000-000000000000', 'The impact driver has great torque! Perfect for deck screws.', 'text', true),
+  ((SELECT id FROM chats ORDER BY created_at LIMIT 1 OFFSET 8), '00000000-0000-0000-0000-000000000000', 'It''s a workhorse! I use it for all my projects. Glad it''s working well.', 'text', true),
+  ((SELECT id FROM chats ORDER BY created_at LIMIT 1 OFFSET 8), '00000000-0000-0000-0000-000000000000', 'Will definitely rent again. You have great tools!', 'text', false),
   
   -- Chat 10 messages
-  ((SELECT id FROM chats ORDER BY created_at LIMIT 1 OFFSET 9), '00000000-0000-0000-0000-000000000000', 'The generator saved our outdoor event! Super quiet and reliable.', 'text', true),
-  ((SELECT id FROM chats ORDER BY created_at LIMIT 1 OFFSET 9), '00000000-0000-0000-0000-000000000000', 'That''s exactly what it''s designed for! Glad your event went well.', 'text', true),
-  ((SELECT id FROM chats ORDER BY created_at LIMIT 1 OFFSET 9), '00000000-0000-0000-0000-000000000000', 'It was perfect. I''ll definitely recommend you to others!', 'text', false);
+  ((SELECT id FROM chats ORDER BY created_at LIMIT 1 OFFSET 9), '00000000-0000-0000-0000-000000000000', 'The generator saved our outdoor event! Super quiet and reliable.', 'text', true),
+  ((SELECT id FROM chats ORDER BY created_at LIMIT 1 OFFSET 9), '00000000-0000-0000-0000-000000000000', 'That''s what it''s designed for! Glad your event went well.', 'text', true),
+  ((SELECT id FROM chats ORDER BY created_at LIMIT 1 OFFSET 9), '00000000-0000-0000-0000-000000000000', 'Perfect! I''ll definitely recommend you to others.', 'text', false);
 
 -- Notifications (10 records)
 INSERT INTO notifications (user_id, type, title, message, action_url, read) VALUES
@@ .. @@
 -- Insurance Claims (10 records)
 INSERT INTO insurance_claims (
   booking_id, claimant_id, type, description, photos, status, amount_claimed, amount_approved
 ) VALUES
-  ((SELECT id FROM bookings ORDER BY created_at LIMIT 1 OFFSET 0), '00000000-0000-0000-0000-000000000000', 'damage', 'Minor scratch on drill case during transport', ARRAY['https://example.com/claim1_photo1.jpg'], 'approved', 25.00, 25.00),
-  ((SELECT id FROM bookings ORDER BY created_at LIMIT 1 OFFSET 1), '00000000-0000-0000-0000-000000000000', 'theft', 'Excavator attachment stolen from job site', ARRAY['https://example.com/claim2_photo1.jpg', 'https://example.com/claim2_photo2.jpg'], 'pending', 500.00, NULL),
-  ((SELECT id FROM bookings ORDER BY created_at LIMIT 1 OFFSET 2), '00000000-0000-0000-0000-000000000000', 'damage', 'Tile saw blade damaged during use', ARRAY['https://example.com/claim3_photo1.jpg'], 'approved', 45.00, 40.00),
-  ((SELECT id FROM bookings ORDER BY created_at LIMIT 1 OFFSET 3), '00000000-0000-0000-0000-000000000000', 'malfunction', 'Pressure washer pump failed during rental', ARRAY['https://example.com/claim4_photo1.jpg'], 'resolved', 150.00, 120.00),
-  ((SELECT id FROM bookings ORDER BY created_at LIMIT 1 OFFSET 4), '00000000-0000-0000-0000-000000000000', 'damage', 'Scaffolding platform cracked', ARRAY['https://example.com/claim5_photo1.jpg', 'https://example.com/claim5_photo2.jpg'], 'approved', 200.00, 180.00),
-  ((SELECT id FROM bookings ORDER BY created_at LIMIT 1 OFFSET 5), '00000000-0000-0000-0000-000000000000', 'damage', 'Circular saw guard bent', ARRAY['https://example.com/claim6_photo1.jpg'], 'denied', 75.00, 0.00),
-  ((SELECT id FROM bookings ORDER BY created_at LIMIT 1 OFFSET 6), '00000000-0000-0000-0000-000000000000', 'loss', 'Angle grinder disc lost', ARRAY[]::text[], 'approved', 15.00, 15.00),
-  ((SELECT id FROM bookings ORDER BY created_at LIMIT 1 OFFSET 7), '00000000-0000-0000-0000-000000000000', 'damage', 'Miter saw fence misaligned', ARRAY['https://example.com/claim8_photo1.jpg'], 'pending', 80.00, NULL),
-  ((SELECT id FROM bookings ORDER BY created_at LIMIT 1 OFFSET 8), '00000000-0000-0000-0000-000000000000', 'malfunction', 'Impact driver battery not charging', ARRAY['https://example.com/claim9_photo1.jpg'], 'approved', 60.00, 50.00),
-  ((SELECT id FROM bookings ORDER BY created_at LIMIT 1 OFFSET 9), '00000000-0000-0000-0000-000000000000', 'damage', 'Generator fuel tank dented', ARRAY['https://example.com/claim10_photo1.jpg', 'https://example.com/claim10_photo2.jpg'], 'resolved', 100.00, 85.00);
+  ((SELECT id FROM bookings ORDER BY created_at LIMIT 1 OFFSET 0), '00000000-0000-0000-0000-000000000000', 'damage', 'Minor scratch on drill case during transport', ARRAY['https://example.com/claim1_photo1.jpg'], 'approved', 25.00, 25.00),
+  ((SELECT id FROM bookings ORDER BY created_at LIMIT 1 OFFSET 1), '00000000-0000-0000-0000-000000000000', 'theft', 'Excavator attachment stolen from job site', ARRAY['https://example.com/claim2_photo1.jpg', 'https://example.com/claim2_photo2.jpg'], 'pending', 500.00, NULL),
+  ((SELECT id FROM bookings ORDER BY created_at LIMIT 1 OFFSET 2), '00000000-0000-0000-0000-000000000000', 'damage', 'Tile saw blade damaged during use', ARRAY['https://example.com/claim3_photo1.jpg'], 'approved', 45.00, 40.00),
+  ((SELECT id FROM bookings ORDER BY created_at LIMIT 1 OFFSET 3), '00000000-0000-0000-0000-000000000000', 'malfunction', 'Pressure washer pump failed during rental', ARRAY['https://example.com/claim4_photo1.jpg'], 'resolved', 150.00, 120.00),
+  ((SELECT id FROM bookings ORDER BY created_at LIMIT 1 OFFSET 4), '00000000-0000-0000-0000-000000000000', 'damage', 'Scaffolding platform cracked', ARRAY['https://example.com/claim5_photo1.jpg', 'https://example.com/claim5_photo2.jpg'], 'approved', 200.00, 180.00),
+  ((SELECT id FROM bookings ORDER BY created_at LIMIT 1 OFFSET 5), '00000000-0000-0000-0000-000000000000', 'damage', 'Circular saw guard bent', ARRAY['https://example.com/claim6_photo1.jpg'], 'denied', 75.00, 0.00),
+  ((SELECT id FROM bookings ORDER BY created_at LIMIT 1 OFFSET 6), '00000000-0000-0000-0000-000000000000', 'loss', 'Angle grinder disc lost', ARRAY[]::text[], 'approved', 15.00, 15.00),
+  ((SELECT id FROM bookings ORDER BY created_at LIMIT 1 OFFSET 7), '00000000-0000-0000-0000-000000000000', 'damage', 'Miter saw fence misaligned', ARRAY['https://example.com/claim8_photo1.jpg'], 'pending', 80.00, NULL),
+  ((SELECT id FROM bookings ORDER BY created_at LIMIT 1 OFFSET 8), '00000000-0000-0000-0000-000000000000', 'malfunction', 'Impact driver battery not charging', ARRAY['https://example.com/claim9_photo1.jpg'], 'approved', 60.00, 50.00),
+  ((SELECT id FROM bookings ORDER BY created_at LIMIT 1 OFFSET 9), '00000000-0000-0000-0000-000000000000', 'damage', 'Generator fuel tank dented', ARRAY['https://example.com/claim10_photo1.jpg', 'https://example.com/claim10_photo2.jpg'], 'resolved', 100.00, 85.00);