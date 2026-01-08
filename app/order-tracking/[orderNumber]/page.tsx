'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Package, Truck, CheckCircle, Clock, Printer, 
  ArrowLeft, MapPin, Calendar, FileBox, Loader2,
  AlertCircle, Box, Phone
} from 'lucide-react';
import { createClient } from '@/utils/supabase/client';

import { LucideIcon } from 'lucide-react';

interface Order {
  id: string;
  order_number: string;
  status: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  file_name: string;
  file_path: string;
  material: string;
  color: string;
  quality: string;
  infill: number;
  quantity: number;
  model_dimensions: { x: number; y: number; z: number } | null;
  total_price: number;
  unit_price: number;
  shipping_address: {
    name?: string;
    address?: string;
    city?: string;
    state?: string;
    zip_code?: string;
    phone?: string;
  } | null;
  created_at: string;
  updated_at: string;
  estimated_delivery: string | null;
  tracking_number: string | null;
  payment_status: string;
}

interface StatusStep {
  status: string;
  label: string;
  description: string;
  icon: LucideIcon;
  completed: boolean;
  current: boolean;
  date?: string;
}

export default function OrderTrackingPage() {
  const params = useParams();
  const router = useRouter();
  const supabase = createClient();
  const orderNumber = params.orderNumber as string;
  
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (orderNumber) {
      fetchOrder();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderNumber]);

  const fetchOrder = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('boxprint_orders')
        .select('*')
        .eq('order_number', orderNumber)
        .single();

      if (fetchError) {
        if (fetchError.code === 'PGRST116') {
          setError('Order not found. Please check your order number.');
        } else {
          setError('Failed to fetch order details. Please try again.');
        }
        return;
      }

      setOrder(data);
    } catch (err) {
      console.error('Error fetching order:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusSteps = (currentStatus: string): StatusStep[] => {
    const statusOrder = ['pending', 'confirmed', 'processing', 'printing', 'quality_check', 'shipped', 'delivered'];
    const currentIndex = statusOrder.indexOf(currentStatus);

    return [
      {
        status: 'pending',
        label: 'Order Placed',
        description: 'Your order has been received',
        icon: Package,
        completed: currentIndex >= 0,
        current: currentStatus === 'pending',
        date: order?.created_at,
      },
      {
        status: 'confirmed',
        label: 'Confirmed',
        description: 'Order confirmed and queued',
        icon: CheckCircle,
        completed: currentIndex >= 1,
        current: currentStatus === 'confirmed',
      },
      {
        status: 'processing',
        label: 'Processing',
        description: 'Preparing your print job',
        icon: Clock,
        completed: currentIndex >= 2,
        current: currentStatus === 'processing',
      },
      {
        status: 'printing',
        label: 'Printing',
        description: '3D printing in progress',
        icon: Printer,
        completed: currentIndex >= 3,
        current: currentStatus === 'printing',
      },
      {
        status: 'quality_check',
        label: 'Quality Check',
        description: 'Inspecting print quality',
        icon: Box,
        completed: currentIndex >= 4,
        current: currentStatus === 'quality_check',
      },
      {
        status: 'shipped',
        label: 'Shipped',
        description: 'On the way to you',
        icon: Truck,
        completed: currentIndex >= 5,
        current: currentStatus === 'shipped',
      },
      {
        status: 'delivered',
        label: 'Delivered',
        description: 'Order completed',
        icon: CheckCircle,
        completed: currentIndex >= 6,
        current: currentStatus === 'delivered',
      },
    ];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      confirmed: 'bg-blue-100 text-blue-800 border-blue-200',
      processing: 'bg-purple-100 text-purple-800 border-purple-200',
      printing: 'bg-indigo-100 text-indigo-800 border-indigo-200',
      quality_check: 'bg-cyan-100 text-cyan-800 border-cyan-200',
      shipped: 'bg-orange-100 text-orange-800 border-orange-200',
      delivered: 'bg-green-100 text-green-800 border-green-200',
      cancelled: 'bg-red-100 text-red-800 border-red-200',
    };
    return colors[status] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  if (!mounted) {
    return null;
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-neo-light-gray pt-24 pb-12 px-4 flex items-center justify-center">
        <div className="text-center">
          <Loader2 size={40} className="animate-spin text-neo-black mx-auto mb-4" />
          <p className="text-neo-black/60">Loading order details...</p>
        </div>
      </main>
    );
  }

  if (error || !order) {
    return (
      <main className="min-h-screen bg-neo-light-gray pt-24 pb-12 px-4">
        <div className="container max-w-2xl mx-auto">
          <div className="bg-white border-2 border-neo-black rounded-xl p-8 shadow-neo text-center">
            <AlertCircle size={48} className="mx-auto text-red-500 mb-4" />
            <h1 className="text-2xl font-black mb-2">Order Not Found</h1>
            <p className="text-neo-black/60 mb-6">{error || 'We couldn\'t find this order.'}</p>
            
            <div className="space-y-4">
              <Link href="/" className="neo-btn inline-flex">
                <ArrowLeft size={18} />
                Back to Home
              </Link>
              
              <p className="text-sm text-neo-black/50">
                Need help? Contact us at{' '}
                <a href="mailto:support@boxpox.in" className="text-neo-black font-bold hover:text-neo-yellow">
                  support@boxpox.in
                </a>
              </p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  const statusSteps = getStatusSteps(order.status);

  return (
    <main className="min-h-screen bg-neo-light-gray pt-24 pb-12 px-4">
      <div className="container max-w-4xl mx-auto">
        {/* Back Button */}
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-neo-black/60 hover:text-neo-black transition-colors mb-6"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        {/* Order Header */}
        <div className="bg-white border-2 border-neo-black rounded-xl p-6 shadow-neo mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <Package size={24} className="text-neo-yellow" />
                <h1 className="text-2xl font-black">Order {order.order_number}</h1>
              </div>
              <p className="text-sm text-neo-black/60">
                Placed on {formatDate(order.created_at)}
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <span className={`px-4 py-2 rounded-full text-sm font-bold border ${getStatusColor(order.status)}`}>
                {order.status.replace('_', ' ').toUpperCase()}
              </span>
              {order.payment_status === 'paid' && (
                <span className="px-4 py-2 rounded-full text-sm font-bold bg-green-100 text-green-800 border border-green-200">
                  PAID
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Progress Tracker */}
        <div className="bg-white border-2 border-neo-black rounded-xl p-6 shadow-neo mb-6">
          <h2 className="text-lg font-bold mb-6">Order Progress</h2>
          
          <div className="relative">
            {/* Progress Line */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-neo-black/10" />
            
            <div className="space-y-6">
              {statusSteps.map((step) => (
                <div key={step.status} className="relative flex items-start gap-4">
                  {/* Icon Circle */}
                  <div className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                    step.completed 
                      ? step.current 
                        ? 'bg-neo-yellow border-2 border-neo-black' 
                        : 'bg-green-500 border-2 border-green-600'
                      : 'bg-neo-light-gray border-2 border-neo-black/20'
                  }`}>
                    <step.icon 
                      size={20} 
                      className={step.completed ? (step.current ? 'text-neo-black' : 'text-white') : 'text-neo-black/30'} 
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 pt-2">
                    <div className="flex items-center gap-2">
                      <h3 className={`font-bold ${step.completed ? 'text-neo-black' : 'text-neo-black/40'}`}>
                        {step.label}
                      </h3>
                      {step.current && (
                        <span className="px-2 py-0.5 bg-neo-yellow text-xs font-bold rounded-full animate-pulse">
                          CURRENT
                        </span>
                      )}
                    </div>
                    <p className={`text-sm ${step.completed ? 'text-neo-black/60' : 'text-neo-black/30'}`}>
                      {step.description}
                    </p>
                    {step.date && step.completed && (
                      <p className="text-xs text-neo-black/40 mt-1">
                        {formatDate(step.date)}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Order Details */}
          <div className="bg-white border-2 border-neo-black rounded-xl p-6 shadow-neo">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <FileBox size={20} className="text-neo-yellow" />
              Print Details
            </h2>
            
            <div className="space-y-4">
              <div className="p-4 bg-neo-light-gray rounded-xl">
                <p className="text-sm font-bold truncate">{order.file_name}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="px-2 py-1 bg-white rounded text-xs font-medium">
                    {order.material}
                  </span>
                  <span className="px-2 py-1 bg-white rounded text-xs font-medium">
                    {order.quality} quality
                  </span>
                  <span className="px-2 py-1 bg-white rounded text-xs font-medium">
                    {order.infill}% infill
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-neo-black/50">Quantity</p>
                  <p className="font-bold">{order.quantity}</p>
                </div>
                <div>
                  <p className="text-neo-black/50">Color</p>
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-4 h-4 rounded-full border border-neo-black/20"
                      style={{ backgroundColor: order.color }}
                    />
                    <p className="font-bold">{order.color}</p>
                  </div>
                </div>
                {order.model_dimensions && (
                  <>
                    <div className="col-span-2">
                      <p className="text-neo-black/50">Dimensions</p>
                      <p className="font-bold font-mono">
                        {order.model_dimensions.x.toFixed(1)} × {order.model_dimensions.y.toFixed(1)} × {order.model_dimensions.z.toFixed(1)} mm
                      </p>
                    </div>
                  </>
                )}
              </div>
              
              <div className="pt-4 border-t border-neo-black/10">
                <div className="flex justify-between items-center">
                  <p className="text-neo-black/50">Unit Price</p>
                  <p className="font-bold">{formatPrice(order.unit_price)}</p>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <p className="font-bold">Total</p>
                  <p className="text-xl font-black text-neo-black">{formatPrice(order.total_price)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Shipping Details */}
          <div className="bg-white border-2 border-neo-black rounded-xl p-6 shadow-neo">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
              <MapPin size={20} className="text-neo-yellow" />
              Shipping Details
            </h2>
            
            {order.shipping_address ? (
              <div className="space-y-4">
                <div className="p-4 bg-neo-light-gray rounded-xl">
                  <p className="font-bold">{order.shipping_address.name || order.customer_name}</p>
                  <p className="text-sm text-neo-black/70 mt-1">{order.shipping_address.address}</p>
                  <p className="text-sm text-neo-black/70">
                    {order.shipping_address.city}, {order.shipping_address.state} - {order.shipping_address.zip_code}
                  </p>
                  {order.shipping_address.phone && (
                    <p className="text-sm text-neo-black/70 mt-2 flex items-center gap-1">
                      <Phone size={14} />
                      {order.shipping_address.phone}
                    </p>
                  )}
                </div>
                
                {order.tracking_number && (
                  <div className="p-4 bg-neo-yellow/10 rounded-xl border border-neo-yellow/30">
                    <p className="text-sm text-neo-black/60">Tracking Number</p>
                    <p className="font-mono font-bold text-lg">{order.tracking_number}</p>
                  </div>
                )}
                
                {order.estimated_delivery && (
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar size={16} className="text-neo-black/50" />
                    <span className="text-neo-black/50">Expected Delivery:</span>
                    <span className="font-bold">{formatDate(order.estimated_delivery)}</span>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8 text-neo-black/50">
                <Truck size={32} className="mx-auto mb-2 opacity-30" />
                <p>Shipping details will appear here</p>
              </div>
            )}
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-6 bg-white border-2 border-neo-black rounded-xl p-6 shadow-neo">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h3 className="font-bold mb-1">Need Help?</h3>
              <p className="text-sm text-neo-black/60">
                Questions about your order? We&apos;re here to help.
              </p>
            </div>
            <div className="flex gap-3">
              <a 
                href={`mailto:support@boxpox.in?subject=Order%20${order.order_number}%20Query`}
                className="neo-btn-secondary text-sm"
              >
                Email Support
              </a>
              <a 
                href="tel:+919999999999"
                className="neo-btn text-sm"
              >
                <Phone size={16} />
                Call Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
