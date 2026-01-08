-- =====================================================
-- SUPABASE STORAGE BUCKET SETUP FOR 3D FILES
-- =====================================================
-- Run this in Supabase SQL Editor to set up storage
-- =====================================================

-- 1. Create the storage bucket for 3D models (if not exists)
-- Note: You may need to create the bucket via Supabase Dashboard
-- Go to: Storage > New bucket > Name: "3d-models" > Public: true

-- 2. Enable RLS on storage.objects
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- 3. Create storage policies for the 3d-models bucket

-- Allow anyone to view/download files (public access)
CREATE POLICY "Public read access for 3d-models"
ON storage.objects FOR SELECT
USING (bucket_id = '3d-models');

-- Allow authenticated users to upload files
CREATE POLICY "Authenticated users can upload 3d-models"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = '3d-models');

-- Allow service role to upload files (for server-side uploads)
CREATE POLICY "Service role can upload 3d-models"
ON storage.objects FOR INSERT
TO service_role
WITH CHECK (bucket_id = '3d-models');

-- Allow authenticated users to update their own files
CREATE POLICY "Users can update their own 3d-models"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = '3d-models' AND auth.uid()::text = (storage.foldername(name))[1])
WITH CHECK (bucket_id = '3d-models');

-- Allow authenticated users to delete their own files
CREATE POLICY "Users can delete their own 3d-models"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = '3d-models' AND auth.uid()::text = (storage.foldername(name))[1]);

-- =====================================================
-- MANUAL STEPS IN SUPABASE DASHBOARD:
-- =====================================================
-- 
-- 1. Go to Supabase Dashboard > Storage
-- 2. Click "New bucket"
-- 3. Name: "3d-models"
-- 4. Check "Public bucket" (allows public downloads)
-- 5. Click "Create bucket"
--
-- The SQL policies above will handle security after bucket creation.
-- =====================================================

-- Verify the bucket exists (run after creating via Dashboard)
-- SELECT * FROM storage.buckets WHERE id = '3d-models';
