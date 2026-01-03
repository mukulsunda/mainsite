import { createClient } from '@/utils/supabase/server';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Download, 
  User, 
  FileBox,
  CreditCard,
  Truck,
  MessageSquare,
  History,
  Printer,
  Scale,
  Box
} from 'lucide-react';
import OrderDetailClient from './OrderDetailClient';
import { ORDER_STATUS_CONFIG } from '../../types';

interface OrderDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function OrderDetailPage({ params }: OrderDetailPageProps) {
  const { id } = await params;
  const supabase = await createClient();
  
  // Fetch order
  const { data: order, error } = await supabase
    .from('boxprint_orders')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error || !order) {
    notFound();
  }
  
  // Fetch status history
  const { data: statusHistory } = await supabase
    .from('order_status_history')
    .select('*')
    .eq('order_id', id)
    .order('created_at', { ascending: false });
  
  // Fetch order files if needed in the future
  // const { data: orderFiles } = await supabase
  //   .from('order_files')
  //   .select('*')
  //   .eq('order_id', id);
  
  const statusConfig = ORDER_STATUS_CONFIG[order.status as keyof typeof ORDER_STATUS_CONFIG];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center gap-4">
        <Link 
          href="/admin/orders" 
          className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
        >
          <ArrowLeft size={20} />
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-neutral-900">
              {order.order_number}
            </h1>
            <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full capitalize ${statusConfig?.bgColor} ${statusConfig?.color}`}>
              {statusConfig?.icon} {order.status.replace('_', ' ')}
            </span>
          </div>
          <p className="text-neutral-500 text-sm mt-1">
            Created {new Date(order.created_at).toLocaleString('en-IN')}
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors">
          <Download size={16} />
          Download Model
        </button>
      </div>
      
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Main Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Configuration */}
          <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
            <div className="px-5 py-4 border-b border-neutral-200 flex items-center gap-2">
              <Printer size={18} className="text-purple-500" />
              <h2 className="font-bold text-neutral-900">Print Configuration</h2>
            </div>
            <div className="p-5">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <p className="text-xs text-neutral-500 uppercase tracking-wider mb-1">Material</p>
                  <p className="font-bold text-neutral-900">{order.material}</p>
                </div>
                <div>
                  <p className="text-xs text-neutral-500 uppercase tracking-wider mb-1">Color</p>
                  <div className="flex items-center gap-2">
                    {order.color_hex && (
                      <div 
                        className="w-5 h-5 rounded border border-neutral-300"
                        style={{ backgroundColor: order.color_hex }}
                      />
                    )}
                    <span className="font-bold text-neutral-900">{order.color}</span>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-neutral-500 uppercase tracking-wider mb-1">Quality</p>
                  <p className="font-bold text-neutral-900 capitalize">{order.quality}</p>
                </div>
                <div>
                  <p className="text-xs text-neutral-500 uppercase tracking-wider mb-1">Infill</p>
                  <p className="font-bold text-neutral-900">{order.infill}%</p>
                </div>
                <div>
                  <p className="text-xs text-neutral-500 uppercase tracking-wider mb-1">Scale</p>
                  <p className="font-bold text-neutral-900">{order.scale}x</p>
                </div>
                <div>
                  <p className="text-xs text-neutral-500 uppercase tracking-wider mb-1">Quantity</p>
                  <p className="font-bold text-neutral-900">{order.quantity} units</p>
                </div>
                <div>
                  <p className="text-xs text-neutral-500 uppercase tracking-wider mb-1">Est. Weight</p>
                  <p className="font-bold text-neutral-900">{order.estimated_weight?.toFixed(1)}g</p>
                </div>
                <div>
                  <p className="text-xs text-neutral-500 uppercase tracking-wider mb-1">Est. Print Time</p>
                  <p className="font-bold text-neutral-900">{order.estimated_print_time || 'N/A'}</p>
                </div>
              </div>
              
              {/* Model Dimensions */}
              {order.model_dimensions && (
                <div className="mt-6 pt-6 border-t border-neutral-100">
                  <p className="text-xs text-neutral-500 uppercase tracking-wider mb-3">Model Dimensions</p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 px-3 py-2 bg-neutral-50 rounded-lg">
                      <Box size={14} className="text-neutral-400" />
                      <span className="text-sm font-mono">
                        {order.model_dimensions.x?.toFixed(1)} × {order.model_dimensions.y?.toFixed(1)} × {order.model_dimensions.z?.toFixed(1)} mm
                      </span>
                    </div>
                    {order.model_volume && (
                      <div className="flex items-center gap-2 px-3 py-2 bg-neutral-50 rounded-lg">
                        <Scale size={14} className="text-neutral-400" />
                        <span className="text-sm font-mono">{order.model_volume?.toFixed(2)} cm³</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* File Information */}
          <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
            <div className="px-5 py-4 border-b border-neutral-200 flex items-center gap-2">
              <FileBox size={18} className="text-blue-500" />
              <h2 className="font-bold text-neutral-900">Model File</h2>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-4 p-4 bg-neutral-50 rounded-lg">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FileBox size={24} className="text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-neutral-900">{order.file_name}</p>
                  <p className="text-sm text-neutral-500">
                    {order.file_type.toUpperCase()} • {(order.file_size / 1024 / 1024).toFixed(2)} MB
                    {order.file_checksum && <span> • SHA256: {order.file_checksum.slice(0, 16)}...</span>}
                  </p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-colors">
                  <Download size={16} />
                  Download
                </button>
              </div>
            </div>
          </div>
          
          {/* Customer Instructions */}
          {order.customer_instructions && (
            <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
              <div className="px-5 py-4 border-b border-neutral-200 flex items-center gap-2">
                <MessageSquare size={18} className="text-amber-500" />
                <h2 className="font-bold text-neutral-900">Customer Instructions</h2>
              </div>
              <div className="p-5">
                <p className="text-neutral-700 whitespace-pre-wrap">{order.customer_instructions}</p>
              </div>
            </div>
          )}
          
          {/* Status History */}
          <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
            <div className="px-5 py-4 border-b border-neutral-200 flex items-center gap-2">
              <History size={18} className="text-green-500" />
              <h2 className="font-bold text-neutral-900">Status History</h2>
            </div>
            <div className="p-5">
              {statusHistory && statusHistory.length > 0 ? (
                <div className="space-y-4">
                  {statusHistory.map((history, i) => (
                    <div key={history.id} className="flex gap-4">
                      <div className="relative">
                        <div className="w-3 h-3 bg-neutral-300 rounded-full mt-1.5" />
                        {i < statusHistory.length - 1 && (
                          <div className="absolute top-4 left-1.5 bottom-0 w-px bg-neutral-200 -translate-x-1/2" style={{ height: 'calc(100% + 16px)' }} />
                        )}
                      </div>
                      <div className="flex-1 pb-4">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-neutral-900 capitalize">
                            {history.new_status.replace('_', ' ')}
                          </span>
                          {history.previous_status && (
                            <span className="text-xs text-neutral-400">
                              from {history.previous_status.replace('_', ' ')}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-neutral-500">
                          {new Date(history.created_at).toLocaleString('en-IN')}
                        </p>
                        {history.notes && (
                          <p className="text-sm text-neutral-600 mt-1">{history.notes}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-neutral-500 text-sm">No status changes recorded yet.</p>
              )}
            </div>
          </div>
        </div>
        
        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          {/* Status & Actions */}
          <OrderDetailClient order={order} />
          
          {/* Customer Info */}
          <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
            <div className="px-5 py-4 border-b border-neutral-200 flex items-center gap-2">
              <User size={18} className="text-indigo-500" />
              <h2 className="font-bold text-neutral-900">Customer</h2>
            </div>
            <div className="p-5 space-y-3">
              <div>
                <p className="text-xs text-neutral-500 mb-1">Name</p>
                <p className="font-medium">{order.customer_name || 'Not provided'}</p>
              </div>
              <div>
                <p className="text-xs text-neutral-500 mb-1">Email</p>
                <p className="font-medium">{order.customer_email}</p>
              </div>
              {order.customer_phone && (
                <div>
                  <p className="text-xs text-neutral-500 mb-1">Phone</p>
                  <p className="font-medium">{order.customer_phone}</p>
                </div>
              )}
            </div>
          </div>
          
          {/* Pricing */}
          <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
            <div className="px-5 py-4 border-b border-neutral-200 flex items-center gap-2">
              <CreditCard size={18} className="text-green-500" />
              <h2 className="font-bold text-neutral-900">Pricing</h2>
            </div>
            <div className="p-5 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-neutral-500">Material Cost</span>
                <span>₹{order.material_cost?.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-neutral-500">Labor Cost</span>
                <span>₹{order.labor_cost?.toLocaleString('en-IN')}</span>
              </div>
              {order.setup_fee > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-500">Setup Fee</span>
                  <span>₹{order.setup_fee?.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-neutral-500">Unit Price</span>
                <span>₹{order.unit_price?.toLocaleString('en-IN')}</span>
              </div>
              {order.quantity > 1 && (
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-500">× {order.quantity} units</span>
                  <span></span>
                </div>
              )}
              <div className="border-t border-neutral-100 pt-3 mt-3">
                <div className="flex justify-between">
                  <span className="font-bold">Total</span>
                  <span className="font-bold text-lg">₹{order.total_price?.toLocaleString('en-IN')}</span>
                </div>
              </div>
              
              <div className={`mt-3 px-3 py-2 rounded-lg text-sm ${
                order.payment_status === 'paid' 
                  ? 'bg-green-100 text-green-700' 
                  : order.payment_status === 'failed'
                  ? 'bg-red-100 text-red-700'
                  : 'bg-amber-100 text-amber-700'
              }`}>
                Payment: {order.payment_status?.toUpperCase()}
              </div>
            </div>
          </div>
          
          {/* Shipping */}
          <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
            <div className="px-5 py-4 border-b border-neutral-200 flex items-center gap-2">
              <Truck size={18} className="text-cyan-500" />
              <h2 className="font-bold text-neutral-900">Shipping</h2>
            </div>
            <div className="p-5">
              {order.shipping_address ? (
                <div className="space-y-2 text-sm">
                  <p className="font-medium">{order.shipping_address.name}</p>
                  <p className="text-neutral-600">{order.shipping_address.address}</p>
                  <p className="text-neutral-600">
                    {order.shipping_address.city}, {order.shipping_address.state} {order.shipping_address.zip_code}
                  </p>
                  {order.shipping_address.phone && (
                    <p className="text-neutral-600">{order.shipping_address.phone}</p>
                  )}
                  {order.tracking_number && (
                    <div className="mt-4 pt-4 border-t border-neutral-100">
                      <p className="text-xs text-neutral-500 mb-1">Tracking Number</p>
                      <p className="font-mono font-medium">{order.tracking_number}</p>
                    </div>
                  )}
                </div>
              ) : (
                <p className="text-neutral-500 text-sm">No shipping address provided</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
