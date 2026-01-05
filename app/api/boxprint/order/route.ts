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
      color_hex,
      quality,
      infill,
      scale,
      quantity,
      
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
      labor_cost,
      setup_fee,
      unit_price,
      total_price,
      
      // Shipping
      shipping_address,
      shipping_city,
      shipping_state,
      shipping_pincode,
      
      // Additional
      notes,
      customer_instructions
    } = body;
    
    // Validate required fields
    if (!customer_email || !file_name || !material || !total_price) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Build shipping address object
    const shippingAddressObj = shipping_address ? {
      name: customer_name || '',
      address: shipping_address,
      city: shipping_city || '',
      state: shipping_state || '',
      zip_code: shipping_pincode || '',
      phone: customer_phone || ''
    } : null;

    // Build model dimensions object
    const modelDimensions = (dimensions_x || dimensions_y || dimensions_z) ? {
      x: dimensions_x || 0,
      y: dimensions_y || 0,
      z: dimensions_z || 0
    } : null;
    
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
        file_path: file_path || '',
        material,
        color: color || 'Default',
        color_hex: color_hex || null,
        quality: quality || 'standard',
        infill: infill || 20,
        scale: scale || 1,
        quantity: quantity || 1,
        model_dimensions: modelDimensions,
        model_volume: volume || null,
        estimated_weight: estimated_weight || 0,
        estimated_print_time: estimated_print_time || null,
        material_cost: material_cost || 0,
        labor_cost: labor_cost || printing_cost || 0,
        setup_fee: setup_fee || 0,
        unit_price: unit_price || total_price,
        total_price,
        shipping_address: shippingAddressObj,
        customer_instructions: customer_instructions || notes || null,
        status: 'pending',
        payment_status: 'pending'
      })
      .select('id, order_number')
      .single();
    
    if (error) {
      console.error('Error creating order:', error);
      return NextResponse.json(
        { error: 'Failed to create order', details: error.message },
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
