// Admin Types and Constants

export type AdminRole = 'super_admin' | 'admin' | 'viewer';

export type OrderStatus = 
  | 'pending' 
  | 'confirmed' 
  | 'printing' 
  | 'quality_check' 
  | 'shipped' 
  | 'delivered' 
  | 'completed' 
  | 'cancelled' 
  | 'failed';

export type PaymentStatus = 'pending' | 'paid' | 'refunded' | 'failed';

export interface AdminUser {
  id: string;
  user_id: string;
  role: AdminRole;
  permissions: {
    orders: boolean;
    files: boolean;
    users: boolean;
    settings: boolean;
  };
  created_at: string;
  updated_at: string;
  email?: string;
}

export interface BoxPrintOrder {
  id: string;
  order_number: string;
  user_id: string | null;
  
  // Customer Details
  customer_name: string | null;
  customer_email: string;
  customer_phone: string | null;
  
  // File Information
  file_name: string;
  file_type: string;
  file_size: number;
  file_path: string;
  file_url?: string;
  file_checksum?: string;
  
  // Model Specs
  model_dimensions: { x: number; y: number; z: number } | null;
  model_volume: number | null;
  
  // Print Configuration
  material: string;
  color: string;
  color_hex: string | null;
  quality: string;
  infill: number;
  scale: number;
  quantity: number;
  
  // Weight & Time
  estimated_weight: number;
  estimated_print_time: string | null;
  estimated_print_minutes: number | null;
  
  // Pricing
  material_cost: number;
  labor_cost: number;
  setup_fee: number;
  unit_price: number;
  total_price: number;
  
  // Instructions
  customer_instructions: string | null;
  
  // Status
  status: OrderStatus;
  admin_notes: string | null;
  
  // Payment
  payment_status: PaymentStatus;
  payment_method: string | null;
  transaction_id: string | null;
  
  // Shipping
  shipping_address: {
    name: string;
    address: string;
    city: string;
    state: string;
    zip_code: string;
    phone: string;
  } | null;
  tracking_number: string | null;
  shipped_at: string | null;
  delivered_at: string | null;
  
  // Timestamps
  created_at: string;
  updated_at: string;
  completed_at: string | null;
}

export interface OrderStatusHistory {
  id: string;
  order_id: string;
  previous_status: OrderStatus | null;
  new_status: OrderStatus;
  changed_by: string | null;
  notes: string | null;
  created_at: string;
}

export interface OrderFile {
  id: string;
  order_id: string;
  file_type: 'model' | 'receipt' | 'print_photo' | 'label';
  file_name: string;
  file_path: string;
  file_size: number | null;
  uploaded_by: string | null;
  created_at: string;
}

// Status configuration
export const ORDER_STATUS_CONFIG: Record<OrderStatus, {
  label: string;
  color: string;
  bgColor: string;
  icon: string;
  description: string;
}> = {
  pending: {
    label: 'Pending',
    color: 'text-amber-600',
    bgColor: 'bg-amber-100',
    icon: '⏳',
    description: 'Order received, awaiting confirmation'
  },
  confirmed: {
    label: 'Confirmed',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
    icon: '✓',
    description: 'Order confirmed, preparing for print'
  },
  printing: {
    label: 'Printing',
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
    icon: '🖨️',
    description: 'Currently being printed'
  },
  quality_check: {
    label: 'Quality Check',
    color: 'text-cyan-600',
    bgColor: 'bg-cyan-100',
    icon: '🔍',
    description: 'Undergoing quality inspection'
  },
  shipped: {
    label: 'Shipped',
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-100',
    icon: '📦',
    description: 'Package shipped to customer'
  },
  delivered: {
    label: 'Delivered',
    color: 'text-teal-600',
    bgColor: 'bg-teal-100',
    icon: '🏠',
    description: 'Package delivered to customer'
  },
  completed: {
    label: 'Completed',
    color: 'text-green-600',
    bgColor: 'bg-green-100',
    icon: '✅',
    description: 'Order completed successfully'
  },
  cancelled: {
    label: 'Cancelled',
    color: 'text-gray-600',
    bgColor: 'bg-gray-100',
    icon: '❌',
    description: 'Order was cancelled'
  },
  failed: {
    label: 'Failed',
    color: 'text-red-600',
    bgColor: 'bg-red-100',
    icon: '⚠️',
    description: 'Order failed or rejected'
  }
};

export const PAYMENT_STATUS_CONFIG: Record<PaymentStatus, {
  label: string;
  color: string;
  bgColor: string;
}> = {
  pending: { label: 'Pending', color: 'text-amber-600', bgColor: 'bg-amber-100' },
  paid: { label: 'Paid', color: 'text-green-600', bgColor: 'bg-green-100' },
  refunded: { label: 'Refunded', color: 'text-blue-600', bgColor: 'bg-blue-100' },
  failed: { label: 'Failed', color: 'text-red-600', bgColor: 'bg-red-100' }
};

// Valid status transitions
export const VALID_STATUS_TRANSITIONS: Record<OrderStatus, OrderStatus[]> = {
  pending: ['confirmed', 'cancelled'],
  confirmed: ['printing', 'cancelled'],
  printing: ['quality_check', 'failed'],
  quality_check: ['shipped', 'failed'],
  shipped: ['delivered'],
  delivered: ['completed'],
  completed: [],
  cancelled: [],
  failed: ['confirmed'] // Allow retry
};
