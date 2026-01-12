'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Truck, 
  CreditCard, 
  Shield, 
  CheckCircle,
  Loader2,
  MapPin,
  Mail,
  Box,
  Plus,
  Home,
  Building
} from 'lucide-react';
import { useCart, PrintCartItem } from '@/context/CartContext';
import { createClient } from '@/utils/supabase/client';

interface AddressData {
  name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

interface SavedAddress extends AddressData {
  id: string;
  label: string;
  isDefault: boolean;
}

interface CheckoutForm {
  email: string;
  shipping: AddressData;
  billing: AddressData;
  sameAsShipping: boolean;
  notes: string;
  saveAddress: boolean;
  addressLabel: string;
}

const emptyAddress: AddressData = {
  name: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  pincode: '',
};

export default function CheckoutPage() {
  const router = useRouter();
  const supabase = createClient();
  const { state, getCartTotal, getPrintItems, clearCart } = useCart();
  
  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [savedAddresses, setSavedAddresses] = useState<SavedAddress[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);
  const [showNewAddress, setShowNewAddress] = useState(false);
  const [orderError, setOrderError] = useState<string | null>(null);
  
  const [form, setForm] = useState<CheckoutForm>({
    email: '',
    shipping: { ...emptyAddress },
    billing: { ...emptyAddress },
    sameAsShipping: true,
    notes: '',
    saveAddress: false,
    addressLabel: '',
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setMounted(true);
    
    const fetchUserData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
        setForm(prev => ({ ...prev, email: user.email || '' }));
        
        // Fetch profile
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        
        if (profile) {
          setForm(prev => ({
            ...prev,
            shipping: {
              ...prev.shipping,
              name: profile.full_name || profile.first_name || '',
              phone: profile.phone || '',
            },
          }));
        }
        
        // Fetch saved addresses
        const { data: addresses } = await supabase
          .from('user_addresses')
          .select('*')
          .eq('user_id', user.id)
          .order('is_default', { ascending: false });
        
        if (addresses && addresses.length > 0) {
          setSavedAddresses(addresses.map(addr => ({
            id: addr.id,
            label: addr.label || 'Address',
            name: addr.name,
            phone: addr.phone,
            address: addr.address_line,
            city: addr.city,
            state: addr.state,
            pincode: addr.pincode,
            isDefault: addr.is_default,
          })));
          
          // Auto-select default address
          const defaultAddr = addresses.find(a => a.is_default);
          if (defaultAddr) {
            setSelectedAddressId(defaultAddr.id);
            setForm(prev => ({
              ...prev,
              shipping: {
                name: defaultAddr.name,
                phone: defaultAddr.phone,
                address: defaultAddr.address_line,
                city: defaultAddr.city,
                state: defaultAddr.state,
                pincode: defaultAddr.pincode,
              },
            }));
          }
        } else {
          setShowNewAddress(true);
        }
      } else {
        setShowNewAddress(true);
      }
    };
    
    fetchUserData();
  }, [supabase]);

  const printItems = getPrintItems();
  const subtotal = getCartTotal();
  const shipping = subtotal > 500 ? 0 : 99;
  const total = subtotal + shipping;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!form.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Invalid email';
    
    // Shipping validation
    if (!form.shipping.name.trim()) newErrors['shipping.name'] = 'Name is required';
    if (!form.shipping.phone.trim()) newErrors['shipping.phone'] = 'Phone is required';
    else if (!/^[6-9]\d{9}$/.test(form.shipping.phone.replace(/\D/g, ''))) newErrors['shipping.phone'] = 'Invalid phone';
    if (!form.shipping.address.trim()) newErrors['shipping.address'] = 'Address is required';
    if (!form.shipping.city.trim()) newErrors['shipping.city'] = 'City is required';
    if (!form.shipping.state.trim()) newErrors['shipping.state'] = 'State is required';
    if (!form.shipping.pincode.trim()) newErrors['shipping.pincode'] = 'Pincode is required';
    else if (!/^\d{6}$/.test(form.shipping.pincode)) newErrors['shipping.pincode'] = 'Invalid pincode';
    
    // Billing validation (if different)
    if (!form.sameAsShipping) {
      if (!form.billing.name.trim()) newErrors['billing.name'] = 'Name is required';
      if (!form.billing.phone.trim()) newErrors['billing.phone'] = 'Phone is required';
      if (!form.billing.address.trim()) newErrors['billing.address'] = 'Address is required';
      if (!form.billing.city.trim()) newErrors['billing.city'] = 'City is required';
      if (!form.billing.state.trim()) newErrors['billing.state'] = 'State is required';
      if (!form.billing.pincode.trim()) newErrors['billing.pincode'] = 'Pincode is required';
      else if (!/^\d{6}$/.test(form.billing.pincode)) newErrors['billing.pincode'] = 'Invalid pincode';
    }

    // Address label validation (required when saving address)
    if (form.saveAddress && !form.addressLabel.trim()) {
      newErrors['addressLabel'] = 'Address label is required to save';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: string) => {
    const keys = field.split('.');
    if (keys.length === 2) {
      const [section, key] = keys;
      setForm(prev => ({
        ...prev,
        [section]: { ...(prev[section as keyof CheckoutForm] as AddressData), [key]: value }
      }));
    } else {
      setForm(prev => ({ ...prev, [field]: value }));
    }
    
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const selectSavedAddress = (addr: SavedAddress) => {
    setSelectedAddressId(addr.id);
    setShowNewAddress(false);
    setForm(prev => ({
      ...prev,
      shipping: {
        name: addr.name,
        phone: addr.phone,
        address: addr.address,
        city: addr.city,
        state: addr.state,
        pincode: addr.pincode,
      },
    }));
  };

  // Helper function to convert base64 to Blob
  const base64ToBlob = (base64: string, contentType: string = ''): Blob => {
    const byteCharacters = atob(base64.split(',')[1] || base64);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      byteArrays.push(new Uint8Array(byteNumbers));
    }
    return new Blob(byteArrays, { type: contentType });
  };

  // Upload file to Supabase Storage
  const uploadFile = async (item: PrintCartItem): Promise<string> => {
    if (!item.fileData) return '';
    
    try {
      const blob = base64ToBlob(item.fileData, 'application/octet-stream');
      const file = new File([blob], item.fileName, { type: 'application/octet-stream' });
      
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await fetch('/api/boxprint/upload', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        console.error('File upload failed');
        return '';
      }
      
      const result = await response.json();
      return result.file_path || '';
    } catch (error) {
      console.error('Error uploading file:', error);
      return '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setOrderError(null);
    
    if (!validateForm()) {
      setOrderError('Please fill in all required fields correctly.');
      return;
    }
    if (printItems.length === 0) {
      setOrderError('Your cart is empty');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Save address if requested
      if (form.saveAddress && userId && form.addressLabel.trim()) {
        await supabase.from('user_addresses').insert({
          user_id: userId,
          label: form.addressLabel,
          name: form.shipping.name,
          phone: form.shipping.phone,
          address_line: form.shipping.address,
          city: form.shipping.city,
          state: form.shipping.state,
          pincode: form.shipping.pincode,
          is_default: savedAddresses.length === 0,
        });
      }

      // Upload files and create orders for each print item
      const orderPromises = printItems.map(async (item: PrintCartItem) => {
        // Upload file first
        const filePath = await uploadFile(item);
        
        const billingAddr = form.sameAsShipping ? form.shipping : form.billing;
        
        const orderData = {
          customer_name: form.shipping.name,
          customer_email: form.email,
          customer_phone: form.shipping.phone,
          file_name: item.fileName,
          file_type: item.fileType,
          file_size: item.fileSize,
          file_path: filePath,
          material: item.material,
          color: item.color,
          color_hex: item.colorHex,
          quality: item.quality,
          infill: item.infill,
          scale: item.scale,
          quantity: item.quantity,
          dimensions_x: item.dimensions.x,
          dimensions_y: item.dimensions.y,
          dimensions_z: item.dimensions.z,
          volume: item.volume,
          estimated_weight: item.estimatedWeight,
          estimated_print_time: item.estimatedTime,
          material_cost: item.unitPrice * 0.4,
          labor_cost: item.unitPrice * 0.5,
          setup_fee: item.unitPrice * 0.1,
          unit_price: item.unitPrice,
          total_price: item.unitPrice * item.quantity,
          shipping_address: form.shipping.address,
          shipping_city: form.shipping.city,
          shipping_state: form.shipping.state,
          shipping_pincode: form.shipping.pincode,
          billing_address: billingAddr.address,
          billing_city: billingAddr.city,
          billing_state: billingAddr.state,
          billing_pincode: billingAddr.pincode,
          customer_instructions: form.notes || item.instructions,
        };

        const response = await fetch('/api/boxprint/order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(orderData),
        });

        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || data.details || 'Failed to create order');
        }

        return data;
      });

      const results = await Promise.all(orderPromises);
      const orderNumbers = results.map(r => r.order_number).filter(Boolean);
      
      if (orderNumbers.length === 0) {
        throw new Error('No orders were created');
      }
      
      // Clear cart after successful order
      clearCart();
      
      // Redirect to success page
      router.push(`/order-success?orders=${orderNumbers.join(',')}`);
      
    } catch (error) {
      console.error('Order submission error:', error);
      setOrderError(error instanceof Error ? error.message : 'Failed to place order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!mounted || state.isLoading) {
    return (
      <main className="pt-[72px] md:pt-[80px] min-h-screen bg-neo-black">
        <div className="container py-12 flex items-center justify-center">
          <Loader2 size={32} className="animate-spin text-neo-yellow" />
        </div>
      </main>
    );
  }

  if (printItems.length === 0) {
    return (
      <main className="pt-[72px] md:pt-[80px] min-h-screen bg-neo-black">
        <div className="container py-12 text-center">
          <Box size={48} className="mx-auto text-white/20 mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">Your cart is empty</h1>
          <p className="text-white/60 mb-6">Add some items to checkout</p>
          <Link href="/boxprint" className="robot-btn inline-flex">
            Get a Quote
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-[72px] md:pt-[80px] min-h-screen bg-neo-black">
      <div className="container py-6 md:py-10">
        {/* Back Link */}
        <Link 
          href="/cart" 
          className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft size={16} />
          Back to Cart
        </Link>

        {/* Error Banner */}
        {orderError && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">
            <strong>Error:</strong> {orderError}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Contact Information */}
              <div className="robot-card p-5 md:p-6">
                <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Mail size={20} className="text-neo-yellow" />
                  Contact Information
                </h2>
                <div>
                  <label className="form-label">Email *</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    placeholder="your@email.com"
                    className={`robot-input ${
                      errors.email ? 'border-red-500' : ''
                    }`}
                  />
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                </div>
              </div>

              {/* Saved Addresses */}
              {savedAddresses.length > 0 && (
                <div className="robot-card p-5 md:p-6">
                  <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <MapPin size={20} className="text-neo-yellow" />
                    Saved Addresses
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {savedAddresses.map((addr) => (
                      <button
                        key={addr.id}
                        type="button"
                        onClick={() => selectSavedAddress(addr)}
                        className={`p-4 rounded-xl border-2 text-left transition-all ${
                          selectedAddressId === addr.id
                            ? 'border-neo-yellow bg-neo-yellow/10'
                            : 'border-white/10 bg-white/5 hover:border-white/30'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-sm text-white flex items-center gap-2">
                            {addr.label.toLowerCase().includes('home') ? <Home size={14} /> : <Building size={14} />}
                            {addr.label}
                          </span>
                          {addr.isDefault && (
                            <span className="text-[10px] px-2 py-0.5 bg-neo-yellow text-neo-black rounded-full font-medium">Default</span>
                          )}
                        </div>
                        <p className="text-sm text-white/70">{addr.name}</p>
                        <p className="text-xs text-white/50 mt-1 line-clamp-2">{addr.address}</p>
                        <p className="text-xs text-white/50">{addr.city}, {addr.state} - {addr.pincode}</p>
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedAddressId(null);
                        setShowNewAddress(true);
                        setForm(prev => ({ ...prev, shipping: { ...emptyAddress } }));
                      }}
                      className={`p-4 rounded-xl border-2 border-dashed text-center transition-all ${
                        showNewAddress && !selectedAddressId
                          ? 'border-neo-yellow bg-neo-yellow/10'
                          : 'border-white/20 hover:border-white/40'
                      }`}
                    >
                      <Plus size={24} className="mx-auto mb-2 text-white/40" />
                      <span className="text-sm font-medium text-white/70">Add New Address</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Shipping Address Form */}
              {(showNewAddress || savedAddresses.length === 0) && (
                <div className="robot-card p-5 md:p-6">
                  <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <Truck size={20} className="text-neo-yellow" />
                    Shipping Address
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="form-label">Full Name *</label>
                      <input
                        type="text"
                        value={form.shipping.name}
                        onChange={(e) => handleInputChange('shipping.name', e.target.value)}
                        placeholder="Full name"
                        className={`robot-input ${
                          errors['shipping.name'] ? 'border-red-500' : ''
                        }`}
                      />
                      {errors['shipping.name'] && <p className="text-red-400 text-xs mt-1">{errors['shipping.name']}</p>}
                    </div>
                    <div>
                      <label className="form-label">Phone *</label>
                      <input
                        type="tel"
                        value={form.shipping.phone}
                        onChange={(e) => handleInputChange('shipping.phone', e.target.value)}
                        placeholder="10-digit number"
                        className={`robot-input ${
                          errors['shipping.phone'] ? 'border-red-500' : ''
                        }`}
                      />
                      {errors['shipping.phone'] && <p className="text-red-400 text-xs mt-1">{errors['shipping.phone']}</p>}
                    </div>
                    <div className="md:col-span-2">
                      <label className="form-label">Address *</label>
                      <input
                        type="text"
                        value={form.shipping.address}
                        onChange={(e) => handleInputChange('shipping.address', e.target.value)}
                        placeholder="House/Flat No., Building, Street"
                        className={`robot-input ${
                          errors['shipping.address'] ? 'border-red-500' : ''
                        }`}
                      />
                      {errors['shipping.address'] && <p className="text-red-400 text-xs mt-1">{errors['shipping.address']}</p>}
                    </div>
                    <div>
                      <label className="form-label">City *</label>
                      <input
                        type="text"
                        value={form.shipping.city}
                        onChange={(e) => handleInputChange('shipping.city', e.target.value)}
                        placeholder="City"
                        className={`robot-input ${
                          errors['shipping.city'] ? 'border-red-500' : ''
                        }`}
                      />
                      {errors['shipping.city'] && <p className="text-red-400 text-xs mt-1">{errors['shipping.city']}</p>}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="form-label">State *</label>
                        <select
                          value={form.shipping.state}
                          onChange={(e) => handleInputChange('shipping.state', e.target.value)}
                          className={`robot-input ${
                            errors['shipping.state'] ? 'border-red-500' : ''
                          }`}
                        >
                          <option value="">Select</option>
                          {indianStates.map(state => (
                            <option key={state} value={state}>{state}</option>
                          ))}
                        </select>
                        {errors['shipping.state'] && <p className="text-red-400 text-xs mt-1">{errors['shipping.state']}</p>}
                      </div>
                      <div>
                        <label className="form-label">Pincode *</label>
                        <input
                          type="text"
                          value={form.shipping.pincode}
                          onChange={(e) => handleInputChange('shipping.pincode', e.target.value)}
                          placeholder="6 digits"
                          maxLength={6}
                          className={`robot-input ${
                            errors['shipping.pincode'] ? 'border-red-500' : ''
                          }`}
                        />
                        {errors['shipping.pincode'] && <p className="text-red-400 text-xs mt-1">{errors['shipping.pincode']}</p>}
                      </div>
                    </div>
                  </div>
                  
                  {/* Save Address Option */}
                  {userId && (
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={form.saveAddress}
                          onChange={(e) => setForm(prev => ({ ...prev, saveAddress: e.target.checked, addressLabel: e.target.checked ? prev.addressLabel : '' }))}
                          className="w-4 h-4 rounded border-white/30 accent-neo-yellow"
                        />
                        <span className="text-sm font-medium text-white">Save this address for future orders</span>
                      </label>
                      {form.saveAddress && (
                        <div className="mt-3">
                          <label className="form-label">Address Label *</label>
                          <input
                            type="text"
                            value={form.addressLabel}
                            onChange={(e) => {
                              setForm(prev => ({ ...prev, addressLabel: e.target.value }));
                              if (errors['addressLabel']) setErrors(prev => ({ ...prev, addressLabel: '' }));
                            }}
                            placeholder="e.g., Home, Office, Parents' House"
                            className={`robot-input text-sm ${
                              errors['addressLabel'] ? 'border-red-500' : ''
                            }`}
                          />
                          {errors['addressLabel'] && <p className="text-red-400 text-xs mt-1">{errors['addressLabel']}</p>}
                          <p className="text-xs text-white/50 mt-1">This label helps you identify the address later</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Billing Address */}
              <div className="robot-card p-5 md:p-6">
                <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <CreditCard size={20} className="text-neo-yellow" />
                  Billing Address
                </h2>
                <label className="flex items-center gap-2 cursor-pointer mb-4">
                  <input
                    type="checkbox"
                    checked={form.sameAsShipping}
                    onChange={(e) => setForm(prev => ({ ...prev, sameAsShipping: e.target.checked }))}
                    className="w-4 h-4 rounded border-white/30 accent-neo-yellow"
                  />
                  <span className="text-sm font-medium text-white">Same as shipping address</span>
                </label>
                
                {!form.sameAsShipping && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="form-label">Full Name *</label>
                      <input
                        type="text"
                        value={form.billing.name}
                        onChange={(e) => handleInputChange('billing.name', e.target.value)}
                        className={`robot-input ${
                          errors['billing.name'] ? 'border-red-500' : ''
                        }`}
                      />
                    </div>
                    <div>
                      <label className="form-label">Phone *</label>
                      <input
                        type="tel"
                        value={form.billing.phone}
                        onChange={(e) => handleInputChange('billing.phone', e.target.value)}
                        className={`robot-input ${
                          errors['billing.phone'] ? 'border-red-500' : ''
                        }`}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="form-label">Address *</label>
                      <input
                        type="text"
                        value={form.billing.address}
                        onChange={(e) => handleInputChange('billing.address', e.target.value)}
                        className={`robot-input ${
                          errors['billing.address'] ? 'border-red-500' : ''
                        }`}
                      />
                    </div>
                    <div>
                      <label className="form-label">City *</label>
                      <input
                        type="text"
                        value={form.billing.city}
                        onChange={(e) => handleInputChange('billing.city', e.target.value)}
                        className={`robot-input ${
                          errors['billing.city'] ? 'border-red-500' : ''
                        }`}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="form-label">State *</label>
                        <select
                          value={form.billing.state}
                          onChange={(e) => handleInputChange('billing.state', e.target.value)}
                          className={`robot-input ${
                            errors['billing.state'] ? 'border-red-500' : ''
                          }`}
                        >
                          <option value="">Select</option>
                          {indianStates.map(state => (
                            <option key={state} value={state}>{state}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="form-label">Pincode *</label>
                        <input
                          type="text"
                          value={form.billing.pincode}
                          onChange={(e) => handleInputChange('billing.pincode', e.target.value)}
                          maxLength={6}
                          className={`robot-input ${
                            errors['billing.pincode'] ? 'border-red-500' : ''
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Order Notes */}
              <div className="robot-card p-5 md:p-6">
                <h2 className="text-lg font-bold text-white mb-4">Order Notes (Optional)</h2>
                <textarea
                  value={form.notes}
                  onChange={(e) => setForm(prev => ({ ...prev, notes: e.target.value }))}
                  placeholder="Any special instructions for your order..."
                  rows={3}
                  className="robot-input resize-none"
                />
              </div>

              {/* Submit Button (Mobile) */}
              <div className="lg:hidden">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full robot-btn justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <CheckCircle size={18} />
                      Place Order • {formatPrice(total)}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="robot-card p-5 md:p-6 sticky top-[100px]">
              <h2 className="text-lg font-bold text-white mb-4">Order Summary</h2>
              
              {/* Items */}
              <div className="space-y-3 mb-4 max-h-[250px] overflow-y-auto">
                {printItems.map((item) => (
                  <div key={item.id} className="flex gap-3 p-2 bg-white/5 rounded-lg">
                    <div 
                      className="w-12 h-12 rounded flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: item.colorHex + '30' }}
                    >
                      <Box size={20} style={{ color: item.colorHex }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">{item.fileName}</p>
                      <p className="text-xs text-white/50">
                        {item.material} • {item.quality} • ×{item.quantity}
                      </p>
                    </div>
                    <p className="text-sm font-bold text-neo-yellow whitespace-nowrap">{formatPrice(item.unitPrice * item.quantity)}</p>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2 pt-4 border-t border-white/10">
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Subtotal</span>
                  <span className="text-white">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Shipping</span>
                  <span className={shipping === 0 ? 'text-green-400 font-medium' : 'text-white'}>
                    {shipping === 0 ? 'FREE' : formatPrice(shipping)}
                  </span>
                </div>
                {shipping > 0 && subtotal < 500 && (
                  <p className="text-xs text-white/50 bg-white/5 p-2 rounded">
                    Add {formatPrice(500 - subtotal)} more for free shipping
                  </p>
                )}
                <div className="flex justify-between text-lg font-bold pt-2 border-t border-white/10">
                  <span className="text-white">Total</span>
                  <span className="text-neo-yellow">{formatPrice(total)}</span>
                </div>
              </div>

              {/* Submit Button (Desktop) */}
              <button
                type="submit"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="hidden lg:flex w-full robot-btn justify-center mt-6"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <CreditCard size={18} />
                    Place Order
                  </>
                )}
              </button>

              {/* Payment Notice */}
              <div className="mt-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                <p className="text-xs text-green-400 flex items-start gap-2">
                  <CheckCircle size={14} className="flex-shrink-0 mt-0.5" />
                  <span>Pay on delivery available. You&apos;ll receive order confirmation via email.</span>
                </p>
              </div>

              {/* Trust Badges */}
              <div className="mt-4 pt-4 border-t border-white/10 grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 text-xs text-white/50">
                  <Shield size={14} />
                  <span>Secure checkout</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-white/50">
                  <Truck size={14} />
                  <span>48hr dispatch</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

const indianStates = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana',
  'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Puducherry', 'Chandigarh'
];
