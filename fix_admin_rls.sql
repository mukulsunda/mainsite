-- ===================================================
-- FIX: Infinite Recursion & Syntax Errors
-- ===================================================

-- 1. Create a secure function to check admin role (bypasses RLS)
CREATE OR REPLACE FUNCTION public.get_admin_role()
RETURNS TEXT AS $$
DECLARE
  user_role TEXT;
BEGIN
  -- This runs with security definer privileges, bypassing RLS
  SELECT role INTO user_role
  FROM public.admin_users
  WHERE user_id = auth.uid();
  
  RETURN user_role;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Drop potentially broken policies
DROP POLICY IF EXISTS "Admins can view admin_users" ON admin_users;
DROP POLICY IF EXISTS "Super admins can manage admin_users" ON admin_users;
DROP POLICY IF EXISTS "Users can view own admin status" ON admin_users;
DROP POLICY IF EXISTS "Super admins can view all admins" ON admin_users;
DROP POLICY IF EXISTS "Super admins can manage admins" ON admin_users;

-- 3. Create new safe policies for admin_users

-- Everyone can see their OWN admin status
CREATE POLICY "Users can view own admin status" ON admin_users
  FOR SELECT USING (
    auth.uid() = user_id
  );

-- Super admins can view ALL admin users
CREATE POLICY "Super admins can view all admins" ON admin_users
  FOR SELECT USING (
    get_admin_role() = 'super_admin'
  );

-- Super admins can INSERT (requires WITH CHECK)
CREATE POLICY "Super admins can insert admins" ON admin_users
  FOR INSERT WITH CHECK (
    get_admin_role() = 'super_admin'
  );

-- Super admins can UPDATE (requires USING and WITH CHECK)
CREATE POLICY "Super admins can update admins" ON admin_users
  FOR UPDATE USING (
    get_admin_role() = 'super_admin'
  ) WITH CHECK (
    get_admin_role() = 'super_admin'
  );

-- Super admins can DELETE (requires USING)
CREATE POLICY "Super admins can delete admins" ON admin_users
  FOR DELETE USING (
    get_admin_role() = 'super_admin'
  );

-- 4. Update other tables' policies

-- BoxPrint Orders
DROP POLICY IF EXISTS "Admins can view all orders" ON boxprint_orders;
CREATE POLICY "Admins can view all orders" ON boxprint_orders
  FOR SELECT USING ( get_admin_role() IS NOT NULL );

DROP POLICY IF EXISTS "Admins can insert orders" ON boxprint_orders;
CREATE POLICY "Admins can insert orders" ON boxprint_orders
  FOR INSERT WITH CHECK ( get_admin_role() IS NOT NULL );

DROP POLICY IF EXISTS "Admins can update orders" ON boxprint_orders;
CREATE POLICY "Admins can update orders" ON boxprint_orders
  FOR UPDATE USING ( get_admin_role() IS NOT NULL );

-- Order Files
DROP POLICY IF EXISTS "Admins can view all order files" ON order_files;
DROP POLICY IF EXISTS "Admins can manage order files" ON order_files;

-- Combined policy for ALL operations on files
CREATE POLICY "Admins can manage order files" ON order_files
  USING ( get_admin_role() IS NOT NULL )
  WITH CHECK ( get_admin_role() IS NOT NULL );

-- Order History
DROP POLICY IF EXISTS "Admins can view all order history" ON order_status_history;
CREATE POLICY "Admins can view all order history" ON order_status_history
  FOR SELECT USING ( get_admin_role() IS NOT NULL );

DROP POLICY IF EXISTS "Admins can insert order history" ON order_status_history;
CREATE POLICY "Admins can insert order history" ON order_status_history
  FOR INSERT WITH CHECK ( get_admin_role() IS NOT NULL );

-- 5. Ensure YOU are an admin
-- Using the ID you provided: f826d01b-0dd9-4585-b02d-12ed32c013f6
INSERT INTO admin_users (user_id, role)
VALUES ('f826d01b-0dd9-4585-b02d-12ed32c013f6', 'super_admin')
ON CONFLICT (user_id) DO UPDATE SET role = 'super_admin';
