import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createClient();
    const { id } = await params;
    const body = await request.json();
    
    // Check if user is admin
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Check admin role
    const { data: adminUser } = await supabase
      .from('admin_users')
      .select('role')
      .eq('user_id', user.id)
      .eq('is_active', true)
      .single();
    
    if (!adminUser) {
      return NextResponse.json(
        { error: 'Admin access required' },
        { status: 403 }
      );
    }
    
    const {
      status,
      payment_status,
      tracking_number,
      shipping_carrier,
      admin_notes
    } = body;
    
    // Build update object with only provided fields
    const updateData: Record<string, unknown> = {};
    if (status !== undefined) updateData.status = status;
    if (payment_status !== undefined) updateData.payment_status = payment_status;
    if (tracking_number !== undefined) updateData.tracking_number = tracking_number;
    if (shipping_carrier !== undefined) updateData.shipping_carrier = shipping_carrier;
    if (admin_notes !== undefined) updateData.admin_notes = admin_notes;
    
    // Update order
    const { data: order, error } = await supabase
      .from('boxprint_orders')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();
    
    if (error) {
      console.error('Error updating order:', error);
      return NextResponse.json(
        { error: 'Failed to update order' },
        { status: 500 }
      );
    }
    
    // If status changed, log to history
    if (status) {
      await supabase.from('order_status_history').insert({
        order_id: id,
        status,
        changed_by: user.id,
        notes: body.status_note || null
      });
    }
    
    return NextResponse.json({
      success: true,
      order,
      message: 'Order updated successfully'
    });
    
  } catch (error) {
    console.error('Order update error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const supabase = await createClient();
    const { id } = await params;
    
    // Check if user is admin
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const { data: order, error } = await supabase
      .from('boxprint_orders')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error || !order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }
    
    // Get status history
    const { data: history } = await supabase
      .from('order_status_history')
      .select('*')
      .eq('order_id', id)
      .order('created_at', { ascending: false });
    
    return NextResponse.json({
      order,
      history: history || []
    });
    
  } catch (error) {
    console.error('Order fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
