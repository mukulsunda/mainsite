import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const supabase = await createClient();
    const body = await request.json();
    
    const {
      // Customer Info
      customer_name,
      customer_email,
      customer_phone,
      
      // File Info
      file_name,
      file_type,
      file_size,
      file_path,
      
      // Print Configuration
      material,
      color,
      quality,
      infill,
      scale,
      
      // Model Dimensions
      dimensions_x,
      dimensions_y,
      dimensions_z,
      volume,
      
      // Pricing (Calculated on client, verified on server)
      estimated_weight,
      estimated_print_time,
      material_cost,
      printing_cost,
      finishing_cost,
      total_price,
      
      // Shipping
      shipping_address,
      shipping_city,
      shipping_state,
      shipping_pincode,
      
      // Additional
      notes,
      priority
    } = body;
    
    // Validate required fields
    if (!customer_email || !file_name || !material || !total_price) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Insert order into database
    const { data: order, error } = await supabase
      .from('boxprint_orders')
      .insert({
        customer_name,
        customer_email,
        customer_phone,
        file_name,
        file_type: file_type || file_name.split('.').pop() || 'stl',
        file_size: file_size || 0,
        file_path,
        material,
        color,
        quality: quality || 'standard',
        infill: infill || 20,
        scale: scale || 100,
        dimensions_x,
        dimensions_y,
        dimensions_z,
        volume,
        estimated_weight,
        estimated_print_time,
        material_cost,
        printing_cost,
        finishing_cost,
        total_price,
        shipping_address,
        shipping_city,
        shipping_state,
        shipping_pincode,
        notes,
        priority: priority || 'normal',
        status: 'pending',
        payment_status: 'pending'
      })
      .select('id, order_number')
      .single();
    
    if (error) {
      console.error('Error creating order:', error);
      return NextResponse.json(
        { error: 'Failed to create order' },
        { status: 500 }
      );
    }
    
    return NextResponse.json({
      success: true,
      order_id: order.id,
      order_number: order.order_number,
      message: 'Order created successfully'
    });
    
  } catch (error) {
    console.error('Order creation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
