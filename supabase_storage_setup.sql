-- =====================================================
-- SUPABASE STORAGE BUCKET SETUP FOR 3D FILES
-- =====================================================
-- IMPORTANT: Follow these steps in order!
-- =====================================================

-- STEP 1: Enable RLS on storage.objects table (RUN THIS FIRST)
-- =====================================================
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

-- STEP 2: Create bucket via Supabase Dashboard (REQUIRED)
-- =====================================================
-- 1. Go to Supabase Dashboard > Storage
-- 2. Click "New bucket"
-- 3. Name: "File storage"
-- 4. Check "Public bucket" (allows public downloads)
-- 5. Click "Create bucket"
--
-- After creating the bucket, run STEP 3 SQL policies below.
-- =====================================================

-- STEP 3: Create storage policies for the File storage bucket
-- =====================================================
-- Run these SQL commands AFTER creating the bucket above

-- Allow anyone to view/download files (public access for public bucket)
CREATE POLICY "Public read access for File storage"
ON storage.objects FOR SELECT
USING (bucket_id = 'File storage');

-- Allow authenticated users to upload files
CREATE POLICY "Authenticated users can upload to File storage"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'File storage' AND auth.role() = 'authenticated');

-- Allow service role to upload files (for server-side uploads via API)
CREATE POLICY "Service role can upload to File storage"
ON storage.objects FOR INSERT
TO service_role
WITH CHECK (bucket_id = 'File storage' AND auth.role() = 'service_role');

-- Allow service role to read files (for verification/retrieval)
CREATE POLICY "Service role can read File storage"
ON storage.objects FOR SELECT
TO service_role
USING (bucket_id = 'File storage');

-- Allow service role to update and delete
CREATE POLICY "Service role can manage File storage"
ON storage.objects FOR UPDATE
TO service_role
USING (bucket_id = 'File storage');

CREATE POLICY "Service role can delete from File storage"
ON storage.objects FOR DELETE
TO service_role
USING (bucket_id = 'File storage');

-- =====================================================
-- VERIFICATION QUERIES (run after everything is set up)
-- =====================================================
-- Check if bucket exists:
-- SELECT * FROM storage.buckets WHERE id = 'File storage';

-- Check if policies are applied:
-- SELECT * FROM pg_policies WHERE tablename = 'objects' AND schemaname = 'storage';

-- Test a file exists (replace with actual file path):
-- SELECT * FROM storage.objects WHERE bucket_id = 'File storage' LIMIT 1;
