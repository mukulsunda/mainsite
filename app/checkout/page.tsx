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
  User,
  Phone,
  Mail,
  Box
} from 'lucide-react';
import { useCart, PrintCartItem } from '@/context/CartContext';
import { createClient } from '@/utils/supabase/client';

interface ShippingForm {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  notes: string;
}

export default function CheckoutPage() {
  const router = useRouter();
  const supabase = createClient();
  const { state, getCartTotal, getPrintItems, clearCart } = useCart();
  
  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState<ShippingForm>({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    notes: '',
  });
  const [errors, setErrors] = useState<Partial<ShippingForm>>({});

  useEffect(() => {
    setMounted(true);
    
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setForm(prev => ({ ...prev, email: user.email || '' }));
        
        // Fetch profile for additional info
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        
        if (profile) {
          setForm(prev => ({
            ...prev,
            name: profile.full_name || profile.first_name || '',
            phone: profile.phone || '',
          }));
        }
      }
    };
    
    fetchUser();
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
    const newErrors: Partial<ShippingForm> = {};
    
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Invalid email';
    if (!form.phone.trim()) newErrors.phone = 'Phone is required';
    else if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\D/g, ''))) newErrors.phone = 'Invalid phone number';
    if (!form.address.trim()) newErrors.address = 'Address is required';
    if (!form.city.trim()) newErrors.city = 'City is required';
    if (!form.state.trim()) newErrors.state = 'State is required';
    if (!form.pincode.trim()) newErrors.pincode = 'Pincode is required';
    else if (!/^\d{6}$/.test(form.pincode)) newErrors.pincode = 'Invalid pincode';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof ShippingForm]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    if (printItems.length === 0) {
      alert('Your cart is empty');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Create orders for each print item
      const orderPromises = printItems.map(async (item: PrintCartItem) => {
        const orderData = {
          customer_name: form.name,
          customer_email: form.email,
          customer_phone: form.phone,
          file_name: item.fileName,
          file_type: item.fileType,
          file_size: item.fileSize,
          file_path: '', // Will be updated after upload
          material: item.material,
          color: item.colorHex,
          quality: item.quality,
          infill: item.infill,
          scale: item.scale * 100,
          quantity: item.quantity,
          dimensions_x: item.dimensions.x,
          dimensions_y: item.dimensions.y,
          dimensions_z: item.dimensions.z,
          volume: item.volume,
          estimated_weight: item.estimatedWeight,
          estimated_print_time: item.estimatedTime,
          material_cost: item.unitPrice * 0.4,
          printing_cost: item.unitPrice * 0.5,
          finishing_cost: item.unitPrice * 0.1,
          total_price: item.totalPrice * item.quantity,
          shipping_address: form.address,
          shipping_city: form.city,
          shipping_state: form.state,
          shipping_pincode: form.pincode,
          notes: form.notes || item.instructions,
          priority: 'normal',
        };

        const response = await fetch('/api/boxprint/order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(orderData),
        });

        if (!response.ok) {
          throw new Error('Failed to create order');
        }

        return response.json();
      });

      const results = await Promise.all(orderPromises);
      const orderNumbers = results.map(r => r.order_number).filter(Boolean);
      
      // Clear cart after successful order
      clearCart();
      
      // Redirect to success page
      router.push(`/order-success?orders=${orderNumbers.join(',')}`);
      
    } catch (error) {
      console.error('Order submission error:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!mounted || state.isLoading) {
    return (
      <main className="pt-[72px] md:pt-[80px] min-h-screen bg-white">
        <div className="container py-12 flex items-center justify-center">
          <Loader2 size={32} className="animate-spin text-neo-black/40" />
        </div>
      </main>
    );
  }

  if (printItems.length === 0) {
    return (
      <main className="pt-[72px] md:pt-[80px] min-h-screen bg-white">
        <div className="container py-12 text-center">
          <Box size={48} className="mx-auto text-neo-black/20 mb-4" />
          <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
          <p className="text-neo-black/60 mb-6">Add some items to checkout</p>
          <Link href="/boxprint" className="neo-btn inline-flex">
            Get a Quote
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-[72px] md:pt-[80px] min-h-screen bg-neo-light-gray">
      <div className="container py-6 md:py-10">
        {/* Back Link */}
        <Link 
          href="/cart" 
          className="inline-flex items-center gap-2 text-sm text-neo-black/60 hover:text-neo-black transition-colors mb-6"
        >
          <ArrowLeft size={16} />
          Back to Cart
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Contact Information */}
              <div className="bg-white rounded-xl p-5 md:p-6 border border-neo-black/10">
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <User size={20} className="text-neo-yellow" />
                  Contact Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neo-black/70 mb-1.5">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleInputChange}
                      placeholder="Your full name"
                      className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-neo-yellow transition-all ${
                        errors.name ? 'border-red-500' : 'border-neo-black/20'
                      }`}
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neo-black/70 mb-1.5">Email *</label>
                    <div className="relative">
                      <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neo-black/40" />
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleInputChange}
                        placeholder="your@email.com"
                        className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-neo-yellow transition-all ${
                          errors.email ? 'border-red-500' : 'border-neo-black/20'
                        }`}
                      />
                    </div>
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-neo-black/70 mb-1.5">Phone Number *</label>
                    <div className="relative">
                      <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neo-black/40" />
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleInputChange}
                        placeholder="10-digit mobile number"
                        className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-neo-yellow transition-all ${
                          errors.phone ? 'border-red-500' : 'border-neo-black/20'
                        }`}
                      />
                    </div>
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-white rounded-xl p-5 md:p-6 border border-neo-black/10">
                <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <MapPin size={20} className="text-neo-yellow" />
                  Shipping Address
                </h2>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neo-black/70 mb-1.5">Address *</label>
                    <input
                      type="text"
                      name="address"
                      value={form.address}
                      onChange={handleInputChange}
                      placeholder="House/Flat No., Building, Street"
                      className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-neo-yellow transition-all ${
                        errors.address ? 'border-red-500' : 'border-neo-black/20'
                      }`}
                    />
                    {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-neo-black/70 mb-1.5">City *</label>
                      <input
                        type="text"
                        name="city"
                        value={form.city}
                        onChange={handleInputChange}
                        placeholder="City"
                        className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-neo-yellow transition-all ${
                          errors.city ? 'border-red-500' : 'border-neo-black/20'
                        }`}
                      />
                      {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neo-black/70 mb-1.5">State *</label>
                      <select
                        name="state"
                        value={form.state}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-neo-yellow transition-all bg-white ${
                          errors.state ? 'border-red-500' : 'border-neo-black/20'
                        }`}
                      >
                        <option value="">Select</option>
                        {indianStates.map(state => (
                          <option key={state} value={state}>{state}</option>
                        ))}
                      </select>
                      {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
                    </div>
                    <div className="col-span-2 md:col-span-1">
                      <label className="block text-sm font-medium text-neo-black/70 mb-1.5">Pincode *</label>
                      <input
                        type="text"
                        name="pincode"
                        value={form.pincode}
                        onChange={handleInputChange}
                        placeholder="6-digit pincode"
                        maxLength={6}
                        className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-neo-yellow transition-all ${
                          errors.pincode ? 'border-red-500' : 'border-neo-black/20'
                        }`}
                      />
                      {errors.pincode && <p className="text-red-500 text-xs mt-1">{errors.pincode}</p>}
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Notes */}
              <div className="bg-white rounded-xl p-5 md:p-6 border border-neo-black/10">
                <h2 className="text-lg font-bold mb-4">Order Notes (Optional)</h2>
                <textarea
                  name="notes"
                  value={form.notes}
                  onChange={handleInputChange}
                  placeholder="Any special instructions for your order..."
                  rows={3}
                  className="w-full px-4 py-2.5 border border-neo-black/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-neo-yellow transition-all resize-none"
                />
              </div>

              {/* Submit Button (Mobile) */}
              <div className="lg:hidden">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full neo-btn justify-center"
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
            <div className="bg-white rounded-xl p-5 md:p-6 border border-neo-black/10 sticky top-[100px]">
              <h2 className="text-lg font-bold mb-4">Order Summary</h2>
              
              {/* Items */}
              <div className="space-y-3 mb-4 max-h-[200px] overflow-y-auto">
                {printItems.map((item) => (
                  <div key={item.id} className="flex gap-3 p-2 bg-neo-light-gray rounded-lg">
                    <div 
                      className="w-12 h-12 rounded flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: item.colorHex + '30' }}
                    >
                      <Box size={20} style={{ color: item.colorHex }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.fileName}</p>
                      <p className="text-xs text-neo-black/50">
                        {item.material} • {item.quality} • ×{item.quantity}
                      </p>
                    </div>
                    <p className="text-sm font-bold">{formatPrice(item.totalPrice * item.quantity)}</p>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2 pt-4 border-t border-neo-black/10">
                <div className="flex justify-between text-sm">
                  <span className="text-neo-black/60">Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neo-black/60">Shipping</span>
                  <span>{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold pt-2 border-t border-neo-black/10">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>

              {/* Submit Button (Desktop) */}
              <button
                type="submit"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="hidden lg:flex w-full neo-btn justify-center mt-6"
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
              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-xs text-green-700 flex items-start gap-2">
                  <CheckCircle size={14} className="flex-shrink-0 mt-0.5" />
                  <span>Pay on delivery available. You&apos;ll receive order confirmation via email.</span>
                </p>
              </div>

              {/* Trust Badges */}
              <div className="mt-4 pt-4 border-t border-neo-black/10 grid grid-cols-2 gap-3">
                <div className="flex items-center gap-2 text-xs text-neo-black/50">
                  <Shield size={14} />
                  <span>Secure checkout</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-neo-black/50">
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
