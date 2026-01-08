# 🚀 Quick Setup Checklist - File Storage

Copy this checklist and follow it step by step to enable file uploads.

---

## ✅ Step 1: Supabase Dashboard (5 minutes)

### Create Storage Bucket
```
1. Open: https://app.supabase.com
2. Select project: boxpox-next (eyspyeslaugfpmwzsfhw)
3. Click: Storage (left sidebar)
4. Click: New bucket
5. Name: File storage (EXACT - case sensitive)
6. Check: Public bucket ✅
7. Click: Create bucket
```

**Verification**:
- [ ] Bucket "File storage" appears in Storage list
- [ ] Status shows "Public" ✅

---

## ✅ Step 2: Enable RLS (SQL Editor) (2 minutes)

### Open SQL Editor
```
1. Click: SQL Editor (left sidebar)
2. Click: New query
```

### Copy & Run This SQL
```sql
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;
```

**After running**:
- [ ] Query executed successfully (no errors)

---

## ✅ Step 3: Create RLS Policies (SQL Editor) (3 minutes)

### In Same SQL Editor, Create New Query

### Copy & Run All Policies
```sql
CREATE POLICY "Public read access for File storage"
ON storage.objects FOR SELECT
USING (bucket_id = 'File storage');

CREATE POLICY "Authenticated users can upload to File storage"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'File storage' AND auth.role() = 'authenticated');

CREATE POLICY "Service role can upload to File storage"
ON storage.objects FOR INSERT
TO service_role
WITH CHECK (bucket_id = 'File storage' AND auth.role() = 'service_role');

CREATE POLICY "Service role can read File storage"
ON storage.objects FOR SELECT
TO service_role
USING (bucket_id = 'File storage');

CREATE POLICY "Service role can manage File storage"
ON storage.objects FOR UPDATE
TO service_role
USING (bucket_id = 'File storage');

CREATE POLICY "Service role can delete from File storage"
ON storage.objects FOR DELETE
TO service_role
USING (bucket_id = 'File storage');
```

**After running**:
- [ ] All 6 policies created successfully
- [ ] No error messages

---

## ✅ Step 4: Verify Setup (1 minute)

### Verification Query 1: Bucket Exists
```sql
SELECT * FROM storage.buckets WHERE id = 'File storage';
```

**Expected result**:
```
id               | public | created_at
File storage     | true   | [today's date]
```
- [ ] One row returned with `public = true`

### Verification Query 2: Policies Exist
```sql
SELECT COUNT(*) as policy_count
FROM pg_policies 
WHERE tablename = 'objects' 
  AND schemaname = 'storage'
  AND policyname LIKE '%File storage%';
```

**Expected result**:
```
policy_count
6
```
- [ ] Result shows `6` policies

---

## ✅ Step 5: Test Upload (5 minutes)

### In Your Application

1. **Go to**: https://boxpox.in/boxprint
2. **Click**: "Upload your 3D model"
3. **Select** any `.stl`, `.obj`, or `.gltf` file
4. **Configure**: Choose material, quality, etc.
5. **Click**: "Add to cart" or "Buy now"
6. **Complete**: Fill shipping info and place order

### In Supabase Dashboard

1. **Go to**: Storage > File storage
2. **Look for**: `orders/` folder
3. **Inside**: Should see your order number folder
4. **Inside order folder**: Should see file (timestamp-random.stl)

**Verification**:
- [ ] File upload completed without error
- [ ] File visible in Storage bucket
- [ ] File name format: `[timestamp]-[random].[ext]`

---

## ⚠️ Troubleshooting

### ❌ "Permission denied" error on upload

**Check**:
- [ ] Bucket name is exactly `File storage` (not `3d-models`)
- [ ] Bucket is marked Public ✅
- [ ] RLS is enabled
- [ ] All 6 policies exist

**Fix**:
1. Delete and recreate bucket if name wrong
2. Re-run RLS enable statement
3. Re-run all 6 policy statements

### ❌ "Bucket not found" error

**Check**:
- [ ] Bucket exists in Storage tab
- [ ] Bucket name is `File storage`

**Fix**: 
1. Go to Storage tab
2. If not there, click "New bucket" and create it

### ❌ File upload succeeds but file doesn't appear

**Check**:
- [ ] You're in correct bucket: "File storage"
- [ ] Files are in: `orders/[order_number]/` folder

**Fix**:
1. Refresh Storage page
2. Check `orders/` folder exists
3. Check order number is correct

### ❌ "User doesn't have permission" when running SQL

**Solution**:
- You need Supabase admin access
- Contact Supabase support if needed
- SQL should run under your Supabase project admin account

---

## 📝 Quick Commands Summary

```bash
# Verify bucket exists
SELECT * FROM storage.buckets WHERE id = 'File storage';

# Count policies
SELECT COUNT(*) FROM pg_policies WHERE tablename = 'objects' AND policyname LIKE '%File storage%';

# List all policies for File storage
SELECT policyname, cmd, qual FROM pg_policies WHERE tablename = 'objects' AND policyname LIKE '%File storage%';

# Check files in bucket
SELECT name, size, created_at FROM storage.objects WHERE bucket_id = 'File storage';
```

---

## 🎉 Success Indicators

- ✅ Bucket "File storage" created and public
- ✅ RLS enabled on storage.objects
- ✅ 6 RLS policies created
- ✅ Files upload without errors
- ✅ Files visible in Storage > File storage bucket
- ✅ Files accessible via public URL

---

## 📞 Support

If still not working:
1. Check this checklist again
2. Verify bucket name is exactly `File storage`
3. Run verification queries
4. Check browser console for upload errors
5. Check Supabase project logs

---

**Estimated Time**: ~15 minutes  
**Difficulty**: Easy ✅  
**Last Updated**: January 8, 2025
