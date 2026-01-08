# File Storage Setup Guide for BoxPox

This guide will help you set up the 3D file storage system for the BoxPox printing service.

## Overview

The BoxPox application uses Supabase Storage to store 3D model files (.stl, .obj, .gltf formats) that users upload. Files are:
- **Uploaded**: When users submit print orders
- **Stored**: In the `File storage` bucket in Supabase Storage
- **Retrieved**: By admin and customers for order verification and delivery

---

## Prerequisites

✅ Supabase project created: `eyspyeslaugfpmwzsfhw`  
✅ Database configured with `boxprint_orders` table  
✅ Environment variables set in `.env.local`:
```
NEXT_PUBLIC_SUPABASE_URL=https://eyspyeslaugfpmwzsfhw.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

---

## Step 1: Create Storage Bucket (Supabase Dashboard)

### 1.1 Navigate to Storage

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Select your project: **boxpox-next** (eyspyeslaugfpmwzsfhw)
3. Click **Storage** in the left sidebar
4. Click **Buckets** tab

### 1.2 Create New Bucket

1. Click **New bucket** button
2. Fill in the form:
   - **Bucket name**: `File storage` (MUST match exactly)
   - **Privacy**: Check **Public bucket** ✅
   - Click **Create bucket**

### 1.3 Verify Bucket Creation

```sql
-- Run this query in SQL Editor to verify:
SELECT * FROM storage.buckets WHERE id = 'File storage';
```

Expected output: One row with `id = 'File storage'` and `public = true`

---

## Step 2: Enable RLS and Create Policies (SQL Editor)

### 2.1 Open SQL Editor

1. In Supabase Dashboard, click **SQL Editor** in left sidebar
2. Click **New query**

### 2.2 Enable RLS on storage.objects

Copy and run this SQL:

```sql
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;
```

⚠️ **Important**: This enables Row Level Security on ALL storage operations.

### 2.3 Create Access Policies

Copy and run this complete SQL script:

```sql
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
```

### 2.4 Verify Policies Created

Run this query to list all created policies:

```sql
SELECT 
  policyname,
  cmd as operation,
  qual as condition
FROM pg_policies 
WHERE tablename = 'objects' 
  AND schemaname = 'storage'
  AND policyname LIKE '%File storage%'
ORDER BY policyname;
```

Expected: 6 policies listed

---

## Step 3: Verify Configuration

### 3.1 Test Bucket Access

Run this query to check bucket details:

```sql
SELECT 
  id as bucket_name,
  public as is_public,
  created_at,
  updated_at
FROM storage.buckets 
WHERE id = 'File storage';
```

Expected output:
```
bucket_name  | is_public | created_at | updated_at
File storage | true      | [date]     | [date]
```

### 3.2 Check Storage Policies

Run this to verify all policies are in place:

```sql
SELECT COUNT(*) as total_policies
FROM pg_policies 
WHERE tablename = 'objects' 
  AND schemaname = 'storage'
  AND policyname LIKE '%File storage%';
```

Expected: `6` policies

---

## Step 4: Test File Upload Flow

### 4.1 Frontend Test

1. Go to your application: `https://boxpox.in/boxprint`
2. Click **Upload Your Model**
3. Select a test 3D file (.stl, .obj, or .gltf)
4. Configure print options
5. Click **Add to Cart**
6. Go to **Checkout**
7. Complete the order

### 4.2 Verify File in Storage

After successful order:

1. In Supabase Dashboard > **Storage** > **File storage**
2. Look for folder: `orders/[ORDER_NUMBER]/`
3. You should see: `[timestamp]-[randomstr].stl` (or your file format)
4. Click the file to see details:
   - **Size**: File size in bytes
   - **URL**: Public download URL
   - **Metadata**: Upload time

---

## Step 5: Troubleshooting

### Issue: "Permission denied" when uploading

**Solution**: 
1. Verify bucket name is exactly `File storage` (case-sensitive)
2. Ensure RLS policies were created
3. Run verification queries above

### Issue: "Bucket not found"

**Solution**:
1. Check bucket exists in Storage tab
2. Verify bucket name is `File storage` (not `3d-models` or other names)
3. If missing, recreate following Step 1

### Issue: Files upload but can't download

**Solution**:
1. Verify "Public read access" policy exists
2. Check bucket is marked as "Public bucket" ✅
3. Run policy verification query in Step 3.2

### Issue: Authenticated users can't upload

**Solution**:
1. Verify user is logged in (check `/account` page)
2. Ensure "Authenticated users can upload" policy exists
3. Check user session is valid

---

## API Reference

### File Upload Endpoint

**Endpoint**: `POST /api/boxprint/upload`

**Request**:
```javascript
const formData = new FormData();
formData.append('file', fileObject);
formData.append('order_number', 'ORD-20250108-001');

const response = await fetch('/api/boxprint/upload', {
  method: 'POST',
  body: formData,
});
```

**Response Success** (200):
```json
{
  "success": true,
  "file_path": "orders/ORD-20250108-001/1704712345-abc123.stl",
  "public_url": "https://eyspyeslaugfpmwzsfhw.supabase.co/storage/v1/object/public/File%20storage/orders/...",
  "file_name": "model.stl",
  "file_size": 524288
}
```

**Response Error** (500):
```json
{
  "error": "Failed to upload file",
  "details": "Bucket not found"
}
```

### File Retrieval

**Direct URL** (after upload):
```
https://eyspyeslaugfpmwzsfhw.supabase.co/storage/v1/object/public/File%20storage/orders/[ORDER_NUMBER]/[FILE]
```

**Signed URL** (for private files, if needed later):
```typescript
const { data, error } = await supabase.storage
  .from('File storage')
  .createSignedUrl('orders/ORD-123/file.stl', 3600); // 1 hour expiry
```

---

## File Organization

Files are organized by order in Supabase Storage:

```
File storage/
├── orders/
│   ├── ORD-20250108-001/
│   │   ├── 1704712345-abc123.stl
│   │   └── 1704712367-def456.obj
│   ├── ORD-20250108-002/
│   │   └── 1704712400-ghi789.gltf
│   └── ...
└── uploads/
    ├── 1704712000-xyz789.stl
    └── ...
```

---

## Database Schema

### boxprint_orders Table

Relevant fields for file storage:

```sql
CREATE TABLE boxprint_orders (
  id UUID PRIMARY KEY,
  order_number TEXT UNIQUE,
  file_name TEXT,           -- Original filename
  file_type TEXT,           -- Extension: stl, obj, gltf
  file_size INTEGER,        -- Bytes
  file_path TEXT,           -- Path in storage bucket
  -- ... other fields
);
```

---

## Security Considerations

✅ **Public Bucket**: Customers can download their own files  
✅ **RLS Policies**: Only authorized users can upload  
✅ **Service Role**: Server-side operations use secure credentials  
✅ **File Validation**: API validates file type before upload  

---

## Monitoring & Maintenance

### Monitor Storage Usage

```sql
SELECT 
  SUM(metadata->>'size')::integer / 1024 / 1024 as total_mb,
  COUNT(*) as total_files,
  MIN(created_at) as oldest_file,
  MAX(created_at) as newest_file
FROM storage.objects
WHERE bucket_id = 'File storage';
```

### Clean Old Files (if needed)

```sql
-- Delete files older than 90 days
DELETE FROM storage.objects
WHERE bucket_id = 'File storage'
  AND created_at < NOW() - INTERVAL '90 days';
```

---

## Support

If you encounter issues:

1. **Check this guide** - Common solutions in Troubleshooting section
2. **Verify bucket name** - Must be exactly `File storage`
3. **Check RLS policies** - Run verification queries
4. **Check env variables** - Ensure `.env.local` has correct keys
5. **Review logs** - Check browser console and Supabase logs

---

**Last Updated**: January 8, 2025  
**Version**: 1.0  
**Status**: ✅ Complete
