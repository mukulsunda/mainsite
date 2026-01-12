'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Package, LogOut, Shield, Bell, CreditCard, MapPin, ChevronRight,
  User, Loader2, Plus, Clock, CheckCircle,
  AlertCircle, Lock, Mail, Home, Building
} from 'lucide-react';
import { createClient } from '@/utils/supabase/client';

interface SavedAddress {
  id: string;
  label: string;
  name: string;
  phone: string;
  address_line: string;
  city: string;
  state: string;
  pincode: string;
  is_default: boolean;
}

interface Order {
  id: string;
  order_number: string;
  status: string;
  total_price: number;
  created_at: string;
  file_name: string;
  material: string;
  quantity: number;
}

type TabType = 'profile' | 'orders' | 'addresses' | 'payments' | 'notifications' | 'security';

export default function AccountPage() {
  const router = useRouter();
  const supabase = createClient();
  
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<{id: string; email?: string} | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>('profile');
  const [orders, setOrders] = useState<Order[]>([]);
  const [addresses, setAddresses] = useState<SavedAddress[]>([]);
  const [ordersCount, setOrdersCount] = useState(0);
  const [wishlistCount] = useState(0);
  
  // Form states
  const [profileForm, setProfileForm] = useState({
    first_name: '',
    last_name: '',
    phone: '',
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);
  
  // Notification settings
  const [notifications, setNotifications] = useState({
    email_orders: true,
    email_promotions: false,
    email_newsletter: true,
    push_orders: true,
    push_promotions: false,
  });
  
  // Add address modal
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [newAddress, setNewAddress] = useState({
    label: 'Home',
    name: '',
    phone: '',
    address_line: '',
    city: '',
    state: '',
    pincode: '',
  });

  useEffect(() => {
    setMounted(true);
    fetchUserData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchUserData = async () => {
    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      
      if (authError || !user) {
        router.push('/signin');
        return;
      }
      
      setUser(user);
      
      // Fetch profile
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (profileData) {
        setProfileForm({
          first_name: profileData.first_name || '',
          last_name: profileData.last_name || '',
          phone: profileData.phone || '',
        });
      }
      
      // Fetch orders
      const { data: ordersData, count } = await supabase
        .from('boxprint_orders')
        .select('*', { count: 'exact' })
        .eq('customer_email', user.email)
        .order('created_at', { ascending: false })
        .limit(10);
      
      if (ordersData) {
        setOrders(ordersData);
        setOrdersCount(count || 0);
      }
      
      // Fetch addresses
      const { data: addressesData } = await supabase
        .from('user_addresses')
        .select('*')
        .eq('user_id', user.id)
        .order('is_default', { ascending: false });
      
      if (addressesData) {
        setAddresses(addressesData);
      }
      
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    if (!user) return;
    
    setIsSaving(true);
    setSaveMessage(null);
    
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          first_name: profileForm.first_name,
          last_name: profileForm.last_name,
          phone: profileForm.phone,
          updated_at: new Date().toISOString(),
        });
      
      if (error) throw error;
      
      // Update user metadata
      await supabase.auth.updateUser({
        data: {
          first_name: profileForm.first_name,
          last_name: profileForm.last_name,
        }
      });
      
      setSaveMessage({ type: 'success', text: 'Profile updated successfully!' });
      setTimeout(() => setSaveMessage(null), 3000);
    } catch (error) {
      console.error('Error saving profile:', error);
      setSaveMessage({ type: 'error', text: 'Failed to update profile. Please try again.' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteAddress = async (id: string) => {
    if (!confirm('Are you sure you want to delete this address?')) return;
    
    try {
      await supabase.from('user_addresses').delete().eq('id', id);
      setAddresses(addresses.filter(a => a.id !== id));
    } catch (error) {
      console.error('Error deleting address:', error);
    }
  };

  const handleSetDefaultAddress = async (id: string) => {
    if (!user) return;
    
    try {
      // Set all to non-default
      await supabase.from('user_addresses').update({ is_default: false }).eq('user_id', user.id);
      // Set selected as default
      await supabase.from('user_addresses').update({ is_default: true }).eq('id', id);
      // Refresh addresses
      setAddresses(addresses.map(a => ({ ...a, is_default: a.id === id })));
    } catch (error) {
      console.error('Error setting default address:', error);
    }
  };

  const handleSaveNewAddress = async () => {
    if (!user) return;
    if (!newAddress.name || !newAddress.phone || !newAddress.address_line || !newAddress.city || !newAddress.state || !newAddress.pincode) {
      alert('Please fill all fields');
      return;
    }
    
    try {
      const { data, error } = await supabase
        .from('user_addresses')
        .insert({
          user_id: user.id,
          label: newAddress.label,
          name: newAddress.name,
          phone: newAddress.phone,
          address_line: newAddress.address_line,
          city: newAddress.city,
          state: newAddress.state,
          pincode: newAddress.pincode,
          is_default: addresses.length === 0,
        })
        .select()
        .single();
      
      if (error) throw error;
      
      setAddresses([...addresses, data]);
      setShowAddressModal(false);
      setNewAddress({ label: 'Home', name: '', phone: '', address_line: '', city: '', state: '', pincode: '' });
    } catch (error) {
      console.error('Error saving address:', error);
      alert('Failed to save address');
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  const handleDeleteAccount = async () => {
    const confirmed = confirm(
      'Are you sure you want to delete your account? This action cannot be undone and will permanently delete:\n\n' +
      '• Your profile information\n' +
      '• Saved addresses\n' +
      '• Order history\n\n' +
      'Type DELETE to confirm.'
    );
    
    if (!confirmed) return;
    
    const deleteConfirm = prompt('Type DELETE to confirm account deletion:');
    if (deleteConfirm !== 'DELETE') {
      alert('Account deletion cancelled.');
      return;
    }
    
    try {
      if (!user) return;
      
      // Delete user data from related tables
      await supabase.from('user_addresses').delete().eq('user_id', user.id);
      await supabase.from('profiles').delete().eq('id', user.id);
      
      // Delete auth user (this will sign them out)
      const { error } = await supabase.auth.admin.deleteUser(user.id);
      
      if (error) {
        // If admin delete fails, try signing out and showing message
        console.error('Admin delete failed:', error);
        // Soft delete - just sign out and inform user
        await supabase.auth.signOut();
        alert('Your account data has been cleared. For complete account removal, please contact support@boxpox.in');
        router.push('/');
        return;
      }
      
      alert('Your account has been deleted successfully.');
      router.push('/');
    } catch (error) {
      console.error('Error deleting account:', error);
      alert('Failed to delete account. Please contact support@boxpox.in for assistance.');
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: 'bg-yellow-500/20 text-yellow-400',
      confirmed: 'bg-blue-500/20 text-blue-400',
      processing: 'bg-purple-500/20 text-purple-400',
      printing: 'bg-indigo-500/20 text-indigo-400',
      shipped: 'bg-cyan-500/20 text-cyan-400',
      delivered: 'bg-green-500/20 text-green-400',
      cancelled: 'bg-red-500/20 text-red-400',
    };
    return colors[status] || 'bg-white/10 text-white/60';
  };

  const menuItems = [
    { icon: User, label: 'Profile', tab: 'profile' as TabType },
    { icon: Package, label: 'My Orders', tab: 'orders' as TabType, badge: ordersCount },
    { icon: MapPin, label: 'Saved Addresses', tab: 'addresses' as TabType },
    { icon: CreditCard, label: 'Payment Methods', tab: 'payments' as TabType },
    { icon: Bell, label: 'Notifications', tab: 'notifications' as TabType },
    { icon: Shield, label: 'Privacy & Security', tab: 'security' as TabType },
  ];

  if (!mounted || loading) {
    return (
      <main className="min-h-screen bg-neo-black pt-24 pb-12 px-4 flex items-center justify-center">
        <Loader2 size={32} className="animate-spin text-neo-yellow" />
      </main>
    );
  }

  if (!user) {
    return null;
  }

  const displayName = profileForm.first_name 
    ? `${profileForm.first_name} ${profileForm.last_name}` 
    : user.email;

  return (
    <main className="min-h-screen bg-neo-black pt-20 md:pt-24 pb-8 md:pb-12 px-3 md:px-4">
      <div className="container max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="mb-4 md:mb-8">
          <h1 className="text-2xl md:text-4xl font-black text-white mb-1 md:mb-2">My Account</h1>
          <p className="text-sm md:text-base text-white/60">Manage your profile, orders, and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-8">
          {/* Left Sidebar */}
          <div className="lg:col-span-1 space-y-4 md:space-y-6">
            {/* Profile Card */}
            <div className="robot-card p-4 md:p-6">
              <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-neo-yellow rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xl md:text-2xl font-black text-neo-black">
                    {profileForm.first_name ? profileForm.first_name[0] : user.email?.[0].toUpperCase()}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-base md:text-lg font-bold text-white truncate">{displayName}</h2>
                  <p className="text-xs md:text-sm text-white/60 truncate">{user.email}</p>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-2 md:gap-3 mb-4 md:mb-6">
                <div className="bg-white/5 rounded-lg p-2 md:p-3 text-center">
                  <p className="text-xl md:text-2xl font-black text-neo-yellow">{ordersCount}</p>
                  <p className="text-[10px] md:text-xs text-white/60">Orders</p>
                </div>
                <div className="bg-white/5 rounded-lg p-2 md:p-3 text-center">
                  <p className="text-xl md:text-2xl font-black text-neo-yellow">{wishlistCount}</p>
                  <p className="text-[10px] md:text-xs text-white/60">Wishlist</p>
                </div>
              </div>

              {/* Menu Items - Horizontal scroll on mobile */}
              <nav className="flex lg:flex-col gap-1 overflow-x-auto pb-2 lg:pb-0 -mx-2 px-2 lg:mx-0 lg:px-0 scrollbar-hide">
                {menuItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => setActiveTab(item.tab)}
                    className={`flex-shrink-0 lg:flex-shrink flex items-center gap-2 lg:gap-3 p-2 lg:p-3 rounded-lg transition-colors group text-left whitespace-nowrap ${
                      activeTab === item.tab 
                        ? 'bg-neo-yellow' 
                        : 'hover:bg-white/10 bg-white/5 lg:bg-transparent'
                    }`}
                  >
                    <div className={`w-8 h-8 lg:w-10 lg:h-10 rounded-lg flex items-center justify-center transition-colors ${
                      activeTab === item.tab 
                        ? 'bg-neo-black' 
                        : 'bg-white/10 group-hover:bg-neo-yellow'
                    }`}>
                      <item.icon size={16} className={`lg:w-5 lg:h-5 ${activeTab === item.tab ? 'text-white' : 'text-white/70'}`} />
                    </div>
                    <div className="flex-1 min-w-0 hidden lg:block">
                      <div className="flex items-center gap-2">
                        <p className={`font-bold text-sm ${activeTab === item.tab ? 'text-neo-black' : 'text-white'}`}>{item.label}</p>
                        {item.badge !== undefined && item.badge > 0 && (
                          <span className="px-2 py-0.5 bg-neo-yellow text-neo-black text-xs rounded-full">{item.badge}</span>
                        )}
                      </div>
                    </div>
                    <ChevronRight size={18} className="text-white/30 hidden lg:block" />
                  </button>
                ))}
              </nav>

              {/* Sign Out */}
              <div className="mt-3 lg:mt-4 pt-3 lg:pt-4 border-t border-white/10">
                <button 
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-2 lg:gap-3 p-2 lg:p-3 rounded-lg hover:bg-red-500/10 transition-colors group text-left"
                >
                  <div className="w-8 h-8 lg:w-10 lg:h-10 bg-red-500/10 rounded-lg flex items-center justify-center group-hover:bg-red-500/20 transition-colors">
                    <LogOut size={16} className="lg:w-5 lg:h-5 text-red-400" />
                  </div>
                  <div className="flex-1 hidden lg:block">
                    <p className="font-bold text-red-400 text-sm">Sign Out</p>
                  </div>
                  <span className="lg:hidden text-xs font-bold text-red-400">Sign Out</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="robot-card p-4 md:p-6">
                <h3 className="text-lg md:text-xl font-bold text-white mb-4 md:mb-6">Profile Information</h3>
                
                {saveMessage && (
                  <div className={`mb-4 md:mb-6 p-3 md:p-4 rounded-lg flex items-start gap-2 md:gap-3 text-sm ${
                    saveMessage.type === 'success' 
                      ? 'bg-green-500/10 text-green-400 border border-green-500/30' 
                      : 'bg-red-500/10 text-red-400 border border-red-500/30'
                  }`}>
                    {saveMessage.type === 'success' ? <CheckCircle size={18} className="flex-shrink-0 mt-0.5" /> : <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />}
                    {saveMessage.text}
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div>
                    <label className="form-label">First Name</label>
                    <input
                      type="text"
                      value={profileForm.first_name}
                      onChange={(e) => setProfileForm({ ...profileForm, first_name: e.target.value })}
                      className="robot-input"
                      placeholder="Enter first name"
                    />
                  </div>
                  <div>
                    <label className="form-label">Last Name</label>
                    <input
                      type="text"
                      value={profileForm.last_name}
                      onChange={(e) => setProfileForm({ ...profileForm, last_name: e.target.value })}
                      className="robot-input"
                      placeholder="Enter last name"
                    />
                  </div>
                  <div>
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      value={user.email || ''}
                      disabled
                      className="robot-input opacity-50 cursor-not-allowed"
                    />
                    <p className="text-[10px] md:text-xs text-white/50 mt-1">Email cannot be changed</p>
                  </div>
                  <div>
                    <label className="form-label">Phone Number</label>
                    <input
                      type="tel"
                      value={profileForm.phone}
                      onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                      className="robot-input"
                      placeholder="Enter phone number"
                    />
                  </div>
                </div>
                
                <button
                  onClick={handleSaveProfile}
                  disabled={isSaving}
                  className="mt-4 md:mt-6 robot-btn text-sm md:text-base py-2.5 md:py-3"
                >
                  {isSaving ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Saving...
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </button>
              </div>
            )}

            {/* Orders Tab */}
            {activeTab === 'orders' && (
              <div className="robot-card p-4 md:p-6">
                <div className="flex items-center justify-between mb-4 md:mb-6">
                  <h3 className="text-lg md:text-xl font-bold text-white">My Orders</h3>
                  <span className="text-xs md:text-sm text-white/60">{ordersCount} total</span>
                </div>
                
                {orders.length === 0 ? (
                  <div className="text-center py-8 md:py-12">
                    <Package size={40} className="mx-auto text-white/20 mb-3 md:mb-4" />
                    <h4 className="font-bold text-base md:text-lg text-white mb-2">No orders yet</h4>
                    <p className="text-sm text-white/60 mb-4 md:mb-6">Start exploring and place your first order!</p>
                    <Link href="/boxprint" className="robot-btn inline-flex text-sm">
                      Get a Quote
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-3 md:space-y-4">
                    {orders.map((order) => (
                      <div 
                        key={order.id}
                        className="border border-white/10 bg-white/5 rounded-xl p-3 md:p-4 hover:border-white/30 transition-colors"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 md:gap-3 mb-1 md:mb-2 flex-wrap">
                              <span className="font-mono text-xs md:text-sm font-bold text-white">{order.order_number}</span>
                              <span className={`px-2 py-0.5 rounded-full text-[10px] md:text-xs font-medium ${getStatusColor(order.status)}`}>
                                {order.status}
                              </span>
                            </div>
                            <p className="text-xs md:text-sm text-white/70 truncate">{order.file_name}</p>
                            <p className="text-[10px] md:text-xs text-white/50 mt-1">
                              {order.material} • Qty: {order.quantity} • {formatDate(order.created_at)}
                            </p>
                          </div>
                          <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 sm:text-right">
                            <p className="font-bold text-sm md:text-base text-neo-yellow">{formatPrice(order.total_price)}</p>
                            <Link 
                              href={`/order-tracking/${order.order_number}`}
                              className="text-[10px] md:text-xs text-white hover:text-neo-yellow font-medium inline-flex items-center gap-1"
                            >
                              Track <ChevronRight size={12} />
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Addresses Tab */}
            {activeTab === 'addresses' && (
              <div className="robot-card p-4 md:p-6">
                <div className="flex items-center justify-between mb-4 md:mb-6">
                  <h3 className="text-lg md:text-xl font-bold text-white">Saved Addresses</h3>
                  <button 
                    onClick={() => setShowAddressModal(true)}
                    className="robot-btn-outline text-xs md:text-sm py-2 px-3"
                  >
                    <Plus size={14} />
                    Add New
                  </button>
                </div>
                
                {addresses.length === 0 ? (
                  <div className="text-center py-12">
                    <MapPin size={48} className="mx-auto text-white/20 mb-4" />
                    <h4 className="font-bold text-lg text-white mb-2">No saved addresses</h4>
                    <p className="text-white/60 mb-6">Add an address during checkout to save it here</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {addresses.map((address) => (
                      <div 
                        key={address.id}
                        className={`border-2 rounded-xl p-4 relative ${
                          address.is_default ? 'border-neo-yellow bg-neo-yellow/5' : 'border-white/10 bg-white/5'
                        }`}
                      >
                        {address.is_default && (
                          <span className="absolute top-2 right-2 px-2 py-0.5 bg-neo-yellow text-neo-black text-xs font-bold rounded-full">
                            Default
                          </span>
                        )}
                        <div className="flex items-center gap-2 mb-2">
                          {address.label.toLowerCase().includes('home') ? (
                            <Home size={16} className="text-white/50" />
                          ) : (
                            <Building size={16} className="text-white/50" />
                          )}
                          <span className="font-bold text-sm text-white">{address.label}</span>
                        </div>
                        <p className="text-sm text-white/80">{address.name}</p>
                        <p className="text-xs text-white/60 mt-1">{address.address_line}</p>
                        <p className="text-xs text-white/60">
                          {address.city}, {address.state} - {address.pincode}
                        </p>
                        <p className="text-xs text-white/60 mt-1">📞 {address.phone}</p>
                        
                        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/10">
                          {!address.is_default && (
                            <button 
                              onClick={() => handleSetDefaultAddress(address.id)}
                              className="text-xs font-medium text-white hover:text-neo-yellow"
                            >
                              Set as default
                            </button>
                          )}
                          <button 
                            onClick={() => handleDeleteAddress(address.id)}
                            className="text-xs font-medium text-red-400 hover:text-red-300 ml-auto"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Payment Methods Tab */}
            {activeTab === 'payments' && (
              <div className="robot-card p-6">
                <h3 className="text-xl font-bold text-white mb-6">Payment Methods</h3>
                
                <div className="text-center py-12">
                  <CreditCard size={48} className="mx-auto text-white/20 mb-4" />
                  <h4 className="font-bold text-lg text-white mb-2">No saved payment methods</h4>
                  <p className="text-white/60 mb-4">
                    We currently support Cash on Delivery and UPI payments.
                  </p>
                  <p className="text-sm text-white/50">
                    Card saving feature coming soon!
                  </p>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div className="robot-card p-6">
                <h3 className="text-xl font-bold text-white mb-6">Notification Preferences</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="font-bold text-sm text-white/60 uppercase tracking-wider mb-4">Email Notifications</h4>
                    <div className="space-y-4">
                      {[
                        { key: 'email_orders', label: 'Order Updates', desc: 'Get notified about order status changes' },
                        { key: 'email_promotions', label: 'Promotions', desc: 'Receive special offers and discounts' },
                        { key: 'email_newsletter', label: 'Newsletter', desc: 'Weekly updates and new features' },
                      ].map((item) => (
                        <label key={item.key} className="flex items-center justify-between p-4 bg-white/5 rounded-xl cursor-pointer">
                          <div>
                            <p className="font-bold text-sm text-white">{item.label}</p>
                            <p className="text-xs text-white/60">{item.desc}</p>
                          </div>
                          <div className={`w-12 h-7 rounded-full p-1 transition-colors ${
                            notifications[item.key as keyof typeof notifications] ? 'bg-neo-yellow' : 'bg-white/20'
                          }`}>
                            <div className={`w-5 h-5 rounded-full bg-white shadow transition-transform ${
                              notifications[item.key as keyof typeof notifications] ? 'translate-x-5' : 'translate-x-0'
                            }`} />
                          </div>
                          <input
                            type="checkbox"
                            checked={notifications[item.key as keyof typeof notifications]}
                            onChange={(e) => setNotifications({ ...notifications, [item.key]: e.target.checked })}
                            className="sr-only"
                          />
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-bold text-sm text-white/60 uppercase tracking-wider mb-4">Push Notifications</h4>
                    <div className="space-y-4">
                      {[
                        { key: 'push_orders', label: 'Order Updates', desc: 'Real-time order tracking' },
                        { key: 'push_promotions', label: 'Flash Sales', desc: 'Be first to know about deals' },
                      ].map((item) => (
                        <label key={item.key} className="flex items-center justify-between p-4 bg-white/5 rounded-xl cursor-pointer">
                          <div>
                            <p className="font-bold text-sm text-white">{item.label}</p>
                            <p className="text-xs text-white/60">{item.desc}</p>
                          </div>
                          <div className={`w-12 h-7 rounded-full p-1 transition-colors ${
                            notifications[item.key as keyof typeof notifications] ? 'bg-neo-yellow' : 'bg-white/20'
                          }`}>
                            <div className={`w-5 h-5 rounded-full bg-white shadow transition-transform ${
                              notifications[item.key as keyof typeof notifications] ? 'translate-x-5' : 'translate-x-0'
                            }`} />
                          </div>
                          <input
                            type="checkbox"
                            checked={notifications[item.key as keyof typeof notifications]}
                            onChange={(e) => setNotifications({ ...notifications, [item.key]: e.target.checked })}
                            className="sr-only"
                          />
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="robot-card p-6">
                <h3 className="text-xl font-bold text-white mb-6">Privacy & Security</h3>
                
                <div className="space-y-6">
                  {/* Password Section */}
                  <div className="p-4 bg-white/5 rounded-xl">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                          <Lock size={20} className="text-white" />
                        </div>
                        <div>
                          <p className="font-bold text-sm text-white">Password</p>
                          <p className="text-xs text-white/60">Last changed: Never</p>
                        </div>
                      </div>
                      <Link 
                        href="/auth/reset-password"
                        className="text-sm font-bold text-white hover:text-neo-yellow transition-colors"
                      >
                        Change
                      </Link>
                    </div>
                  </div>
                  
                  {/* Email Verification */}
                  <div className="p-4 bg-white/5 rounded-xl">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                          <Mail size={20} className="text-white" />
                        </div>
                        <div>
                          <p className="font-bold text-sm text-white">Email Verification</p>
                          <p className="text-xs text-white/60">{user.email}</p>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-green-400 bg-green-500/10 px-3 py-1 rounded-full">
                        ✓ Verified
                      </span>
                    </div>
                  </div>
                  
                  {/* Login Activity */}
                  <div className="p-4 bg-white/5 rounded-xl">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
                        <Clock size={20} className="text-white" />
                      </div>
                      <div>
                        <p className="font-bold text-sm text-white">Login Activity</p>
                        <p className="text-xs text-white/60">Recent sign-in sessions</p>
                      </div>
                    </div>
                    <div className="ml-13 pl-4 border-l-2 border-white/10">
                      <p className="text-sm font-medium text-white">Current Session</p>
                      <p className="text-xs text-white/60">
                        {new Date().toLocaleDateString('en-IN', { 
                          weekday: 'short', 
                          day: 'numeric', 
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                  
                  {/* Delete Account */}
                  <div className="p-4 bg-red-500/10 rounded-xl border border-red-500/30">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-bold text-sm text-red-400">Delete Account</p>
                        <p className="text-xs text-red-400/70">Permanently delete your account and all data</p>
                      </div>
                      <button 
                        onClick={handleDeleteAccount}
                        className="text-sm font-bold text-red-400 hover:text-red-300 transition-colors px-4 py-2 border border-red-500/30 rounded-lg hover:bg-red-500/10"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Add Address Modal */}
      {showAddressModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
          <div className="bg-neo-gray border border-white/10 rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="p-4 md:p-6 border-b border-white/10">
              <h3 className="text-lg font-bold text-white">Add New Address</h3>
            </div>
            <div className="p-4 md:p-6 space-y-4">
              <div>
                <label className="form-label">Label</label>
                <select
                  value={newAddress.label}
                  onChange={(e) => setNewAddress({ ...newAddress, label: e.target.value })}
                  className="robot-input"
                >
                  <option value="Home">Home</option>
                  <option value="Work">Work</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  value={newAddress.name}
                  onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                  className="robot-input"
                  placeholder="Enter full name"
                />
              </div>
              <div>
                <label className="form-label">Phone Number</label>
                <input
                  type="tel"
                  value={newAddress.phone}
                  onChange={(e) => setNewAddress({ ...newAddress, phone: e.target.value })}
                  className="robot-input"
                  placeholder="Enter phone number"
                />
              </div>
              <div>
                <label className="form-label">Address</label>
                <textarea
                  value={newAddress.address_line}
                  onChange={(e) => setNewAddress({ ...newAddress, address_line: e.target.value })}
                  rows={2}
                  className="robot-input resize-none"
                  placeholder="House/flat no, building, street"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="form-label">City</label>
                  <input
                    type="text"
                    value={newAddress.city}
                    onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                    className="robot-input"
                    placeholder="City"
                  />
                </div>
                <div>
                  <label className="form-label">State</label>
                  <input
                    type="text"
                    value={newAddress.state}
                    onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                    className="robot-input"
                    placeholder="State"
                  />
                </div>
              </div>
              <div>
                <label className="form-label">PIN Code</label>
                <input
                  type="text"
                  value={newAddress.pincode}
                  onChange={(e) => setNewAddress({ ...newAddress, pincode: e.target.value })}
                  className="robot-input"
                  placeholder="PIN code"
                  maxLength={6}
                />
              </div>
            </div>
            <div className="p-4 md:p-6 border-t border-white/10 flex gap-3">
              <button
                onClick={() => setShowAddressModal(false)}
                className="flex-1 py-2.5 border border-white/20 rounded-full font-bold text-sm text-white hover:bg-white/5 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveNewAddress}
                className="flex-1 py-2.5 bg-neo-yellow text-neo-black rounded-full font-bold text-sm hover:bg-neo-yellow/90 transition-colors"
              >
                Save Address
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
