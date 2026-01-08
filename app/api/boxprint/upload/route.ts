import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const orderNumber = formData.get('order_number') as string | null;
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Get file extension
    const ext = file.name.split('.').pop()?.toLowerCase() || 'stl';
    
    // Create unique file path
    const timestamp = Date.now();
    const randomStr = Math.random().toString(36).substring(7);
    const filePath = orderNumber 
      ? `orders/${orderNumber}/${timestamp}-${randomStr}.${ext}`
      : `uploads/${timestamp}-${randomStr}.${ext}`;
    
    // Convert File to ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    // Upload to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from('File storage')
      .upload(filePath, buffer, {
        contentType: file.type || 'application/octet-stream',
        cacheControl: '3600',
        upsert: false
      });
    
    if (uploadError) {
      console.error('Storage upload error:', uploadError);
      return NextResponse.json(
        { error: 'Failed to upload file', details: uploadError.message },
        { status: 500 }
      );
    }
    
    // Get public URL
    const { data: urlData } = supabase.storage
      .from('File storage')
      .getPublicUrl(filePath);
    
    return NextResponse.json({
      success: true,
      file_path: filePath,
      public_url: urlData.publicUrl,
      file_name: file.name,
      file_size: file.size,
    });
    
  } catch (error) {
    console.error('File upload error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
