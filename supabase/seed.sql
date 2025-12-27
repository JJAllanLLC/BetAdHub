-- Seed script for development/testing
-- Run this in Supabase SQL editor after setting up schema

-- Create a test admin user (you'll need to create the auth user first via signup)
-- Then update the role:
-- UPDATE users SET role = 'admin' WHERE email = 'admin@test.com';

-- Insert dummy subscriptions (requires existing user_id)
-- Replace 'USER_ID_HERE' with actual user ID from auth.users

-- Example subscription (uncomment and update user_id):
/*
INSERT INTO public.subscriptions (
  id,
  user_id,
  tier,
  stripe_subscription_id,
  status,
  current_period_start,
  current_period_end
) VALUES (
  gen_random_uuid(),
  'USER_ID_HERE',
  'banner',
  'sub_test_banner_001',
  'active',
  NOW(),
  NOW() + INTERVAL '1 month'
);
*/

-- Example ads (uncomment and update subscription_id):
/*
INSERT INTO public.ads (
  id,
  subscription_id,
  type,
  url,
  description,
  banner_image_url,
  review_brief,
  approved
) VALUES (
  gen_random_uuid(),
  'SUBSCRIPTION_ID_HERE',
  'banner',
  'https://example-sportsbook.com',
  'Example Sportsbook',
  'https://via.placeholder.com/728x90',
  NULL,
  true
);
*/

-- Note: For production, use actual Stripe subscriptions and real ad data

