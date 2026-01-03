-- ===========================================
-- BoxPox Admin Dashboard - Database Schema
-- ===========================================

-- 1. Admin Users Table (Role-based access)
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
  role TEXT NOT NULL DEFAULT 'admin', -- 'super_admin', 'admin', 'viewer'
  permissions JSONB DEFAULT '{"orders": true, "files": true, "users": false, "settings": false}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. BoxPrint Orders Table (Main order records)
CREATE TABLE IF NOT EXISTS boxprint_orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_number TEXT UNIQUE NOT NULL, -- Human-readable: BP-2026-00001
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  
  -- User Details (stored for record keeping even if user deleted)
  customer_name TEXT,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  
  -- File Information
  file_name TEXT NOT NULL,
  file_type TEXT NOT NULL, -- STL, OBJ, 3MF, etc.
  file_size BIGINT NOT NULL, -- in bytes
  file_path TEXT NOT NULL, -- Storage path/key
  file_url TEXT, -- Signed URL (temporary)
  file_checksum TEXT, -- SHA256 for integrity
  
  -- Model Specifications
  model_dimensions JSONB, -- {x, y, z} in mm
  model_volume DECIMAL(12, 4), -- in cm³
  
  -- Print Configuration
  material TEXT NOT NULL, -- PLA, ABS, PETG, TPU
  color TEXT NOT NULL,
  color_hex TEXT,
  quality TEXT NOT NULL, -- draft, standard, high
  infill INTEGER NOT NULL, -- percentage
  scale DECIMAL(4, 2) DEFAULT 1.00,
  quantity INTEGER NOT NULL DEFAULT 1,
  
  -- Weight & Time Estimates
  estimated_weight DECIMAL(10, 2) NOT NULL, -- in grams
  estimated_print_time TEXT, -- "2h 30m"
  estimated_print_minutes INTEGER, -- total minutes for calculations
  
  -- Pricing
  material_cost DECIMAL(10, 2) NOT NULL,
  labor_cost DECIMAL(10, 2) NOT NULL,
  setup_fee DECIMAL(10, 2) DEFAULT 0,
  unit_price DECIMAL(10, 2) NOT NULL,
  total_price DECIMAL(10, 2) NOT NULL,
  
  -- Special Instructions
  customer_instructions TEXT,
  
  -- Order Status
  status TEXT NOT NULL DEFAULT 'pending', 
  -- pending, confirmed, printing, quality_check, shipped, delivered, completed, cancelled, failed
  
  -- Admin Notes (Internal only)
  admin_notes TEXT,
  
  -- Payment
  payment_status TEXT DEFAULT 'pending', -- pending, paid, refunded, failed
  payment_method TEXT,
  transaction_id TEXT,
  
  -- Shipping
  shipping_address JSONB,
  tracking_number TEXT,
  shipped_at TIMESTAMP WITH TIME ZONE,
  delivered_at TIMESTAMP WITH TIME ZONE,
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  completed_at TIMESTAMP WITH TIME ZONE
);

-- 3. Order Status History (Audit trail)
CREATE TABLE IF NOT EXISTS order_status_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES boxprint_orders(id) ON DELETE CASCADE NOT NULL,
  previous_status TEXT,
  new_status TEXT NOT NULL,
  changed_by UUID REFERENCES auth.users(id),
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Order Files (Supporting files like images, receipts)
CREATE TABLE IF NOT EXISTS order_files (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES boxprint_orders(id) ON DELETE CASCADE NOT NULL,
  file_type TEXT NOT NULL, -- 'model', 'receipt', 'print_photo', 'label'
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_size BIGINT,
  uploaded_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ===========================================
-- Enable Row Level Security
-- ===========================================

ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE boxprint_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_status_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_files ENABLE ROW LEVEL SECURITY;

-- ===========================================
-- RLS Policies
-- ===========================================

-- Admin Users Policies
CREATE POLICY "Admins can view admin_users" ON admin_users
  FOR SELECT USING (
    auth.uid() IN (SELECT user_id FROM admin_users)
  );

CREATE POLICY "Super admins can manage admin_users" ON admin_users
  FOR ALL USING (
    auth.uid() IN (SELECT user_id FROM admin_users WHERE role = 'super_admin')
  );

-- BoxPrint Orders Policies
-- Users can view their own orders
CREATE POLICY "Users can view own orders" ON boxprint_orders
  FOR SELECT USING (auth.uid() = user_id);

-- Admins can view all orders
CREATE POLICY "Admins can view all orders" ON boxprint_orders
  FOR SELECT USING (
    auth.uid() IN (SELECT user_id FROM admin_users)
  );

-- Admins can insert orders (for manual creation)
CREATE POLICY "Admins can insert orders" ON boxprint_orders
  FOR INSERT WITH CHECK (
    auth.uid() IN (SELECT user_id FROM admin_users)
  );

-- Users can create their own orders
CREATE POLICY "Users can create orders" ON boxprint_orders
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Admins can update all orders
CREATE POLICY "Admins can update orders" ON boxprint_orders
  FOR UPDATE USING (
    auth.uid() IN (SELECT user_id FROM admin_users)
  );

-- Order Status History Policies
CREATE POLICY "Users can view own order history" ON order_status_history
  FOR SELECT USING (
    order_id IN (SELECT id FROM boxprint_orders WHERE user_id = auth.uid())
  );

CREATE POLICY "Admins can view all order history" ON order_status_history
  FOR SELECT USING (
    auth.uid() IN (SELECT user_id FROM admin_users)
  );

CREATE POLICY "Admins can insert order history" ON order_status_history
  FOR INSERT WITH CHECK (
    auth.uid() IN (SELECT user_id FROM admin_users)
  );

-- Order Files Policies
CREATE POLICY "Users can view own order files" ON order_files
  FOR SELECT USING (
    order_id IN (SELECT id FROM boxprint_orders WHERE user_id = auth.uid())
  );

CREATE POLICY "Admins can view all order files" ON order_files
  FOR SELECT USING (
    auth.uid() IN (SELECT user_id FROM admin_users)
  );

CREATE POLICY "Admins can manage order files" ON order_files
  FOR ALL USING (
    auth.uid() IN (SELECT user_id FROM admin_users)
  );

-- ===========================================
-- Functions & Triggers
-- ===========================================

-- Function to generate order number
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS TRIGGER AS $$
DECLARE
  year_part TEXT;
  seq_num INTEGER;
  new_order_number TEXT;
BEGIN
  year_part := to_char(NOW(), 'YYYY');
  
  SELECT COALESCE(MAX(
    CAST(SUBSTRING(order_number FROM 'BP-' || year_part || '-(\d+)') AS INTEGER)
  ), 0) + 1
  INTO seq_num
  FROM boxprint_orders
  WHERE order_number LIKE 'BP-' || year_part || '-%';
  
  new_order_number := 'BP-' || year_part || '-' || LPAD(seq_num::TEXT, 5, '0');
  NEW.order_number := new_order_number;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for auto-generating order number
DROP TRIGGER IF EXISTS set_order_number ON boxprint_orders;
CREATE TRIGGER set_order_number
  BEFORE INSERT ON boxprint_orders
  FOR EACH ROW
  WHEN (NEW.order_number IS NULL)
  EXECUTE FUNCTION generate_order_number();

-- Function to update timestamps
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = timezone('utc'::text, now());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updating timestamps
CREATE TRIGGER update_boxprint_orders_updated_at
  BEFORE UPDATE ON boxprint_orders
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_admin_users_updated_at
  BEFORE UPDATE ON admin_users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Function to log status changes
CREATE OR REPLACE FUNCTION log_order_status_change()
RETURNS TRIGGER AS $$
BEGIN
  IF OLD.status IS DISTINCT FROM NEW.status THEN
    INSERT INTO order_status_history (order_id, previous_status, new_status, changed_by)
    VALUES (NEW.id, OLD.status, NEW.status, auth.uid());
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER log_status_change
  AFTER UPDATE ON boxprint_orders
  FOR EACH ROW
  EXECUTE FUNCTION log_order_status_change();

-- ===========================================
-- Indexes for Performance
-- ===========================================

CREATE INDEX IF NOT EXISTS idx_boxprint_orders_user_id ON boxprint_orders(user_id);
CREATE INDEX IF NOT EXISTS idx_boxprint_orders_status ON boxprint_orders(status);
CREATE INDEX IF NOT EXISTS idx_boxprint_orders_created_at ON boxprint_orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_boxprint_orders_order_number ON boxprint_orders(order_number);
CREATE INDEX IF NOT EXISTS idx_order_status_history_order_id ON order_status_history(order_id);
CREATE INDEX IF NOT EXISTS idx_order_files_order_id ON order_files(order_id);

-- ===========================================
-- Initial Setup: Add first admin
-- ===========================================
-- Run this manually after creating your admin user account:
-- INSERT INTO admin_users (user_id, role) VALUES ('your-user-uuid-here', 'super_admin');
