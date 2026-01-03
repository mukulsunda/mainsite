import { createClient } from '@/utils/supabase/server';
import { Download } from 'lucide-react';
import OrdersTableClient from './OrdersTableClient';

interface OrdersPageProps {
  searchParams: Promise<{ 
    status?: string;
    page?: string;
    search?: string;
    material?: string;
    date?: string;
  }>;
}

export default async function OrdersPage({ searchParams }: OrdersPageProps) {
  const params = await searchParams;
  const supabase = await createClient();
  
  const currentPage = parseInt(params.page || '1');
  const pageSize = 20;
  const offset = (currentPage - 1) * pageSize;
  
  // Build query
  let query = supabase
    .from('boxprint_orders')
    .select('*', { count: 'exact' });
  
  // Apply filters
  if (params.status && params.status !== 'all') {
    query = query.eq('status', params.status);
  }
  
  if (params.material && params.material !== 'all') {
    query = query.eq('material', params.material);
  }
  
  if (params.search) {
    query = query.or(`order_number.ilike.%${params.search}%,customer_email.ilike.%${params.search}%,customer_name.ilike.%${params.search}%`);
  }
  
  // Pagination and ordering
  query = query
    .order('created_at', { ascending: false })
    .range(offset, offset + pageSize - 1);
  
  const { data: orders, count } = await query;
  
  const totalPages = Math.ceil((count || 0) / pageSize);
  
  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'pending', label: 'Pending' },
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'printing', label: 'Printing' },
    { value: 'quality_check', label: 'Quality Check' },
    { value: 'shipped', label: 'Shipped' },
    { value: 'delivered', label: 'Delivered' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' },
    { value: 'failed', label: 'Failed' },
  ];
  
  const materialOptions = [
    { value: 'all', label: 'All Materials' },
    { value: 'PLA', label: 'PLA' },
    { value: 'ABS', label: 'ABS' },
    { value: 'PETG', label: 'PETG' },
    { value: 'TPU', label: 'TPU' },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900">Orders</h1>
          <p className="text-neutral-500 text-sm mt-1">
            Manage and track all BoxPrint orders
            {count !== null && <span className="ml-2">({count} total)</span>}
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-colors">
          <Download size={16} />
          Export CSV
        </button>
      </div>
      
      {/* Filters */}
      <OrdersTableClient 
        orders={orders || []}
        totalPages={totalPages}
        currentPage={currentPage}
        statusOptions={statusOptions}
        materialOptions={materialOptions}
        currentStatus={params.status || 'all'}
        currentMaterial={params.material || 'all'}
        currentSearch={params.search || ''}
      />
    </div>
  );
}
