'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { 
  Settings,
  Save,
  Loader2,
  ChevronDown
} from 'lucide-react';
import { BoxPrintOrder, ORDER_STATUS_CONFIG, VALID_STATUS_TRANSITIONS, OrderStatus } from '../../types';

interface OrderDetailClientProps {
  order: BoxPrintOrder;
}

export default function OrderDetailClient({ order }: OrderDetailClientProps) {
  const router = useRouter();
  const supabase = createClient();
  
  const [status, setStatus] = useState(order.status);
  const [adminNotes, setAdminNotes] = useState(order.admin_notes || '');
  const [trackingNumber, setTrackingNumber] = useState(order.tracking_number || '');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  
  const validTransitions = VALID_STATUS_TRANSITIONS[order.status as OrderStatus] || [];
  
  const handleSave = async () => {
    setSaving(true);
    setMessage(null);
    
    try {
      const updates: Record<string, unknown> = {
        admin_notes: adminNotes,
        tracking_number: trackingNumber || null,
      };
      
      // Only update status if it changed
      if (status !== order.status) {
        updates.status = status;
        
        // Set timestamps based on status
        if (status === 'shipped') {
          updates.shipped_at = new Date().toISOString();
        } else if (status === 'delivered') {
          updates.delivered_at = new Date().toISOString();
        } else if (status === 'completed') {
          updates.completed_at = new Date().toISOString();
        }
      }
      
      const { error } = await supabase
        .from('boxprint_orders')
        .update(updates)
        .eq('id', order.id);
      
      if (error) throw error;
      
      setMessage({ type: 'success', text: 'Order updated successfully' });
      router.refresh();
      
    } catch (error) {
      console.error('Update error:', error);
      setMessage({ type: 'error', text: 'Failed to update order' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-neutral-200 overflow-hidden">
      <div className="px-5 py-4 border-b border-neutral-200 flex items-center gap-2">
        <Settings size={18} className="text-neutral-500" />
        <h2 className="font-bold text-neutral-900">Manage Order</h2>
      </div>
      <div className="p-5 space-y-4">
        {/* Status Update */}
        <div>
          <label className="block text-xs text-neutral-500 uppercase tracking-wider mb-2">
            Update Status
          </label>
          <div className="relative">
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as OrderStatus)}
              className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 appearance-none bg-white pr-10"
            >
              <option value={order.status}>
                {ORDER_STATUS_CONFIG[order.status as OrderStatus]?.label || order.status} (current)
              </option>
              {validTransitions.map((s) => (
                <option key={s} value={s}>
                  {ORDER_STATUS_CONFIG[s]?.icon} {ORDER_STATUS_CONFIG[s]?.label}
                </option>
              ))}
            </select>
            <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 pointer-events-none" />
          </div>
          {validTransitions.length === 0 && (
            <p className="text-xs text-neutral-400 mt-1">No status transitions available</p>
          )}
        </div>
        
        {/* Tracking Number (visible for shipping-related statuses) */}
        {['confirmed', 'printing', 'quality_check', 'shipped', 'delivered'].includes(order.status) && (
          <div>
            <label className="block text-xs text-neutral-500 uppercase tracking-wider mb-2">
              Tracking Number
            </label>
            <input
              type="text"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              placeholder="Enter tracking number"
              className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
            />
          </div>
        )}
        
        {/* Admin Notes */}
        <div>
          <label className="block text-xs text-neutral-500 uppercase tracking-wider mb-2">
            Internal Notes
          </label>
          <textarea
            value={adminNotes}
            onChange={(e) => setAdminNotes(e.target.value)}
            placeholder="Add private notes (not visible to customer)"
            rows={4}
            className="w-full px-4 py-2 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900 resize-none"
          />
        </div>
        
        {/* Message */}
        {message && (
          <div className={`px-4 py-2 rounded-lg text-sm ${
            message.type === 'success' 
              ? 'bg-green-100 text-green-700' 
              : 'bg-red-100 text-red-700'
          }`}>
            {message.text}
          </div>
        )}
        
        {/* Save Button */}
        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-colors disabled:opacity-50"
        >
          {saving ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <Save size={18} />
          )}
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
}
