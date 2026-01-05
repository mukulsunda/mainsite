-- ============================================
-- COMPLETE DATABASE RESET
-- ============================================
-- Run this in Supabase SQL Editor to start fresh

-- Step 1: Clear all data (respects dependencies)
DELETE FROM order_status_history;
DELETE FROM order_files;
DELETE FROM boxprint_orders;
DELETE FROM admin_users;

-- Step 2: Drop all triggers
DROP TRIGGER IF EXISTS log_status_change ON boxprint_orders;
DROP TRIGGER IF EXISTS update_boxprint_orders_updated_at ON boxprint_orders;
DROP TRIGGER IF EXISTS update_admin_users_updated_at ON admin_users;
DROP TRIGGER IF EXISTS set_order_number ON boxprint_orders;
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Step 3: Drop all functions
DROP FUNCTION IF EXISTS log_order_status_change();
DROP FUNCTION IF EXISTS update_updated_at();
DROP FUNCTION IF EXISTS generate_order_number();
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Step 4: Drop all tables
DROP TABLE IF EXISTS order_files CASCADE;
DROP TABLE IF EXISTS order_status_history CASCADE;
DROP TABLE IF EXISTS boxprint_orders CASCADE;
DROP TABLE IF EXISTS admin_users CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;

-- Step 5: Clear auth users
DELETE FROM auth.users;

-- ✅ DONE! Database is completely reset.
-- Next: Run supabase_admin_schema.sql to recreate everything
