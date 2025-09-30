@@ .. @@
 /*
-  # Create sample data for all tables
+  # Create sample data for all tables (excluding profiles)
 
   1. Sample Data Overview
-    - Creates 10 sample records for each of the 13 tables
-    - Maintains proper foreign key relationships
-    - Includes realistic data for testing all platform features
+    - Creates 10 sample records for 12 tables (excluding profiles)
+    - Uses placeholder UUIDs for profile references that should be replaced with actual user IDs
+    - Maintains proper foreign key relationships where possible
 
   2. Tables Populated
-    - profiles (10 users with different roles)
     - tools (10 tools with varied categories and pricing)
     - tool_images (10+ images for tools)
     - tool_availability (10 availability records)
@@ .. @@
     - insurance_claims (10 insurance claims)
     - notifications (10 notifications)
 
-  3. Key Features
-    - Realistic user profiles with different roles and verification levels
+  3. Important Notes
+    - Profile UUIDs are placeholders - replace with actual user IDs from auth.users
     - Diverse tool categories and pricing models
     - Complete booking lifecycle scenarios
     - Active bidding and messaging scenarios
 */
 
--- Insert sample profiles (10 users with different roles)
-INSERT INTO profiles (id, email, name, phone, avatar_url, location, bio, role, email_verified, phone_verified, id_verified, rating, review_count, trust_score) VALUES
-('550e8400-e29b-41d4-a716-446655440001', 'john.martinez@example.com', 'John Martinez', '(555) 123-4567', 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1', 'San Francisco, CA', 'Professional contractor with 15+ years experience. I rent out high-quality tools and equipment.', 'owner', true, true, true, 4.8, 156, 95),
-('550e8400-e29b-41d4-a716-446655440002', 'sarah.johnson@example.com', 'Sarah Johnson', '(555) 987-6543', 'https://images.pexels.com/photos/1438761/pexels-photo-1438761.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1', 'Oakland, CA', 'Weekend warrior who loves DIY projects. Always looking for the right tools for the job.', 'renter', true, true, false, 4.9, 43, 87),
-('550e8400-e29b-41d4-a716-446655440003', 'mike.wilson@example.com', 'Mike Wilson', '(555) 456-7890', 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1', 'San Jose, CA', 'Certified heavy equipment operator with commercial licenses. Available for complex projects.', 'operator', true, true, true, 4.9, 78, 92),
-('550e8400-e29b-41d4-a716-446655440004', 'lisa.chen@example.com', 'Lisa Chen', '(555) 234-5678', 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1', 'Berkeley, CA', 'Home renovation enthusiast and part-time contractor.', 'owner', true, false, true, 4.7, 89, 88),
-('550e8400-e29b-41d4-a716-446655440005', 'david.brown@example.com', 'David Brown', '(555) 345-6789', 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1', 'Fremont, CA', 'Construction project manager looking for quality tools.', 'renter', true, true, false, 4.6, 67, 82),
-('550e8400-e29b-41d4-a716-446655440006', 'maria.garcia@example.com', 'Maria Garcia', '(555) 456-7891', 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1', 'Palo Alto, CA', 'Skilled operator specializing in landscaping equipment.', 'operator', true, true, true, 4.8, 124, 91),
-('550e8400-e29b-41d4-a716-446655440007', 'robert.taylor@example.com', 'Robert Taylor', '(555) 567-8901', 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1', 'Mountain View, CA', 'Tool collector and rental business owner.', 'owner', true, true, true, 4.9, 203, 96),
-('550e8400-e29b-41d4-a716-446655440008', 'jennifer.white@example.com', 'Jennifer White', '(555) 678-9012', 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1', 'Sunnyvale, CA', 'DIY enthusiast and occasional renter.', 'renter', false, false, false, 4.5, 23, 75),
-('550e8400-e29b-41d4-a716-446655440009', 'carlos.rodriguez@example.com', 'Carlos Rodriguez', '(555) 789-0123', 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1', 'Santa Clara, CA', 'Experienced operator with heavy machinery certifications.', 'operator', true, true, true, 4.7, 156, 89),
-('550e8400-e29b-41d4-a716-446655440010', 'admin@toolshare.com', 'Admin User', '(555) 000-0000', 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=1', 'San Francisco, CA', 'Platform administrator.', 'admin', true, true, true, 5.0, 1, 100);
+-- NOTE: Before running this migration, ensure you have actual user profiles created through Supabase Auth
+-- Replace the placeholder UUIDs below with actual user IDs from your auth.users table
+
+-- Placeholder profile IDs (replace these with actual user IDs)
+-- Owner profiles: 550e8400-e29b-41d4-a716-446655440001, 550e8400-e29b-41d4-a716-446655440004, 550e8400-e29b-41d4-a716-446655440007
+-- Renter profiles: 550e8400-e29b-41d4-a716-446655440002, 550e8400-e29b-41d4-a716-446655440005, 550e8400-e29b-41d4-a716-446655440008
+-- Operator profiles: 550e8400-e29b-41d4-a716-446655440003, 550e8400-e29b-41d4-a716-446655440006, 550e8400-e29b-41d4-a716-446655440009
+-- Admin profile: 550e8400-e29b-41d4-a716-446655440010
 
 -- Insert sample tools (10 tools with varied categories and pricing)