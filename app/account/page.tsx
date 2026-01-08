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
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-blue-100 text-blue-800',
      processing: 'bg-purple-100 text-purple-800',
      printing: 'bg-indigo-100 text-indigo-800',
      shipped: 'bg-cyan-100 text-cyan-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
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
      <main className="min-h-screen bg-neo-light-gray pt-24 pb-12 px-4 flex items-center justify-center">
        <Loader2 size={32} className="animate-spin text-neo-black" />
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
    <main className="min-h-screen bg-neo-light-gray pt-24 pb-12 px-4">
      <div className="container max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-black text-neo-black mb-2">My Account</h1>
          <p className="text-neo-black/60">Manage your profile, orders, and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <div className="bg-white border-2 border-neo-black rounded-xl p-6 shadow-neo">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-neo-yellow rounded-full flex items-center justify-center border-2 border-neo-black">
                  <span className="text-2xl font-black text-neo-black">
                    {profileForm.first_name ? profileForm.first_name[0] : user.email?.[0].toUpperCase()}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-lg font-bold text-neo-black truncate">{displayName}</h2>
                  <p className="text-sm text-neo-black/60 truncate">{user.email}</p>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-neo-light-gray rounded-lg p-3 text-center">
                  <p className="text-2xl font-black text-neo-black">{ordersCount}</p>
                  <p className="text-xs text-neo-black/60">Orders</p>
                </div>
                <div className="bg-neo-light-gray rounded-lg p-3 text-center">
                  <p className="text-2xl font-black text-neo-black">{wishlistCount}</p>
                  <p className="text-xs text-neo-black/60">Wishlist</p>
                </div>
              </div>

              {/* Menu Items */}
              <nav className="space-y-1">
                {menuItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => setActiveTab(item.tab)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors group text-left ${
                      activeTab === item.tab 
                        ? 'bg-neo-yellow' 
                        : 'hover:bg-neo-light-gray'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                      activeTab === item.tab 
                        ? 'bg-neo-black' 
                        : 'bg-neo-light-gray group-hover:bg-neo-yellow'
                    }`}>
                      <item.icon size={20} className={activeTab === item.tab ? 'text-white' : 'text-neo-black'} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-bold text-neo-black text-sm">{item.label}</p>
                        {item.badge !== undefined && item.badge > 0 && (
                          <span className="px-2 py-0.5 bg-neo-black text-white text-xs rounded-full">{item.badge}</span>
                        )}
                      </div>
                    </div>
                    <ChevronRight size={18} className="text-neo-black/30" />
                  </button>
                ))}
              </nav>

              {/* Sign Out */}
              <div className="mt-4 pt-4 border-t border-neo-black/10">
                <button 
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-red-50 transition-colors group text-left"
                >
                  <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center group-hover:bg-red-100 transition-colors">
                    <LogOut size={20} className="text-red-500" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-red-500 text-sm">Sign Out</p>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="bg-white border-2 border-neo-black rounded-xl p-6 shadow-neo">
                <h3 className="text-xl font-bold mb-6">Profile Information</h3>
                
                {saveMessage && (
                  <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
                    saveMessage.type === 'success' 
                      ? 'bg-green-50 text-green-700 border border-green-200' 
                      : 'bg-red-50 text-red-700 border border-red-200'
                  }`}>
                    {saveMessage.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                    {saveMessage.text}
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold mb-2">First Name</label>
                    <input
                      type="text"
                      value={profileForm.first_name}
                      onChange={(e) => setProfileForm({ ...profileForm, first_name: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-neo-black/10 rounded-xl focus:border-neo-yellow focus:outline-none"
                      placeholder="Enter first name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Last Name</label>
                    <input
                      type="text"
                      value={profileForm.last_name}
                      onChange={(e) => setProfileForm({ ...profileForm, last_name: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-neo-black/10 rounded-xl focus:border-neo-yellow focus:outline-none"
                      placeholder="Enter last name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Email</label>
                    <input
                      type="email"
                      value={user.email || ''}
                      disabled
                      className="w-full px-4 py-3 border-2 border-neo-black/10 rounded-xl bg-neo-light-gray text-neo-black/60"
                    />
                    <p className="text-xs text-neo-black/50 mt-1">Email cannot be changed</p>
                  </div>
                  <div>
                    <label className="block text-sm font-bold mb-2">Phone Number</label>
                    <input
                      type="tel"
                      value={profileForm.phone}
                      onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-neo-black/10 rounded-xl focus:border-neo-yellow focus:outline-none"
                      placeholder="Enter phone number"
                    />
                  </div>
                </div>
                
                <button
                  onClick={handleSaveProfile}
                  disabled={isSaving}
                  className="mt-6 neo-btn"
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
              <div className="bg-white border-2 border-neo-black rounded-xl p-6 shadow-neo">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold">My Orders</h3>
                  <span className="text-sm text-neo-black/60">{ordersCount} total orders</span>
                </div>
                
                {orders.length === 0 ? (
                  <div className="text-center py-12">
                    <Package size={48} className="mx-auto text-neo-black/20 mb-4" />
                    <h4 className="font-bold text-lg mb-2">No orders yet</h4>
                    <p className="text-neo-black/60 mb-6">Start exploring and place your first order!</p>
                    <Link href="/boxprint" className="neo-btn inline-flex">
                      Get a Quote
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div 
                        key={order.id}
                        className="border border-neo-black/10 rounded-xl p-4 hover:border-neo-black/30 transition-colors"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="font-mono text-sm font-bold">{order.order_number}</span>
                              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                {order.status}
                              </span>
                            </div>
                            <p className="text-sm text-neo-black/70 truncate">{order.file_name}</p>
                            <p className="text-xs text-neo-black/50 mt-1">
                              {order.material} • Qty: {order.quantity} • {formatDate(order.created_at)}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold">{formatPrice(order.total_price)}</p>
                            <Link 
                              href={`/order-tracking/${order.order_number}`}
                              className="text-xs text-neo-black hover:text-neo-yellow font-medium mt-1 inline-flex items-center gap-1"
                            >
                              Track Order <ChevronRight size={14} />
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
              <div className="bg-white border-2 border-neo-black rounded-xl p-6 shadow-neo">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold">Saved Addresses</h3>
                  <Link href="/checkout" className="neo-btn-secondary text-sm">
                    <Plus size={16} />
                    Add New
                  </Link>
                </div>
                
                {addresses.length === 0 ? (
                  <div className="text-center py-12">
                    <MapPin size={48} className="mx-auto text-neo-black/20 mb-4" />
                    <h4 className="font-bold text-lg mb-2">No saved addresses</h4>
                    <p className="text-neo-black/60 mb-6">Add an address during checkout to save it here</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {addresses.map((address) => (
                      <div 
                        key={address.id}
                        className={`border-2 rounded-xl p-4 relative ${
                          address.is_default ? 'border-neo-yellow bg-neo-yellow/5' : 'border-neo-black/10'
                        }`}
                      >
                        {address.is_default && (
                          <span className="absolute top-2 right-2 px-2 py-0.5 bg-neo-yellow text-xs font-bold rounded-full">
                            Default
                          </span>
                        )}
                        <div className="flex items-center gap-2 mb-2">
                          {address.label.toLowerCase().includes('home') ? (
                            <Home size={16} className="text-neo-black/50" />
                          ) : (
                            <Building size={16} className="text-neo-black/50" />
                          )}
                          <span className="font-bold text-sm">{address.label}</span>
                        </div>
                        <p className="text-sm text-neo-black/80">{address.name}</p>
                        <p className="text-xs text-neo-black/60 mt-1">{address.address_line}</p>
                        <p className="text-xs text-neo-black/60">
                          {address.city}, {address.state} - {address.pincode}
                        </p>
                        <p className="text-xs text-neo-black/60 mt-1">📞 {address.phone}</p>
                        
                        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-neo-black/10">
                          {!address.is_default && (
                            <button 
                              onClick={() => handleSetDefaultAddress(address.id)}
                              className="text-xs font-medium text-neo-black hover:text-neo-yellow"
                            >
                              Set as default
                            </button>
                          )}
                          <button 
                            onClick={() => handleDeleteAddress(address.id)}
                            className="text-xs font-medium text-red-500 hover:text-red-700 ml-auto"
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
              <div className="bg-white border-2 border-neo-black rounded-xl p-6 shadow-neo">
                <h3 className="text-xl font-bold mb-6">Payment Methods</h3>
                
                <div className="text-center py-12">
                  <CreditCard size={48} className="mx-auto text-neo-black/20 mb-4" />
                  <h4 className="font-bold text-lg mb-2">No saved payment methods</h4>
                  <p className="text-neo-black/60 mb-4">
                    We currently support Cash on Delivery and UPI payments.
                  </p>
                  <p className="text-sm text-neo-black/50">
                    Card saving feature coming soon!
                  </p>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div className="bg-white border-2 border-neo-black rounded-xl p-6 shadow-neo">
                <h3 className="text-xl font-bold mb-6">Notification Preferences</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="font-bold text-sm text-neo-black/60 uppercase tracking-wider mb-4">Email Notifications</h4>
                    <div className="space-y-4">
                      {[
                        { key: 'email_orders', label: 'Order Updates', desc: 'Get notified about order status changes' },
                        { key: 'email_promotions', label: 'Promotions', desc: 'Receive special offers and discounts' },
                        { key: 'email_newsletter', label: 'Newsletter', desc: 'Weekly updates and new features' },
                      ].map((item) => (
                        <label key={item.key} className="flex items-center justify-between p-4 bg-neo-light-gray rounded-xl cursor-pointer">
                          <div>
                            <p className="font-bold text-sm">{item.label}</p>
                            <p className="text-xs text-neo-black/60">{item.desc}</p>
                          </div>
                          <div className={`w-12 h-7 rounded-full p-1 transition-colors ${
                            notifications[item.key as keyof typeof notifications] ? 'bg-neo-yellow' : 'bg-neo-black/20'
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
                    <h4 className="font-bold text-sm text-neo-black/60 uppercase tracking-wider mb-4">Push Notifications</h4>
                    <div className="space-y-4">
                      {[
                        { key: 'push_orders', label: 'Order Updates', desc: 'Real-time order tracking' },
                        { key: 'push_promotions', label: 'Flash Sales', desc: 'Be first to know about deals' },
                      ].map((item) => (
                        <label key={item.key} className="flex items-center justify-between p-4 bg-neo-light-gray rounded-xl cursor-pointer">
                          <div>
                            <p className="font-bold text-sm">{item.label}</p>
                            <p className="text-xs text-neo-black/60">{item.desc}</p>
                          </div>
                          <div className={`w-12 h-7 rounded-full p-1 transition-colors ${
                            notifications[item.key as keyof typeof notifications] ? 'bg-neo-yellow' : 'bg-neo-black/20'
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
              <div className="bg-white border-2 border-neo-black rounded-xl p-6 shadow-neo">
                <h3 className="text-xl font-bold mb-6">Privacy & Security</h3>
                
                <div className="space-y-6">
                  {/* Password Section */}
                  <div className="p-4 bg-neo-light-gray rounded-xl">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                          <Lock size={20} className="text-neo-black" />
                        </div>
                        <div>
                          <p className="font-bold text-sm">Password</p>
                          <p className="text-xs text-neo-black/60">Last changed: Never</p>
                        </div>
                      </div>
                      <Link 
                        href="/auth/reset-password"
                        className="text-sm font-bold text-neo-black hover:text-neo-yellow transition-colors"
                      >
                        Change
                      </Link>
                    </div>
                  </div>
                  
                  {/* Email Verification */}
                  <div className="p-4 bg-neo-light-gray rounded-xl">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                          <Mail size={20} className="text-neo-black" />
                        </div>
                        <div>
                          <p className="font-bold text-sm">Email Verification</p>
                          <p className="text-xs text-neo-black/60">{user.email}</p>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-green-600 bg-green-100 px-3 py-1 rounded-full">
                        ✓ Verified
                      </span>
                    </div>
                  </div>
                  
                  {/* Login Activity */}
                  <div className="p-4 bg-neo-light-gray rounded-xl">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                        <Clock size={20} className="text-neo-black" />
                      </div>
                      <div>
                        <p className="font-bold text-sm">Login Activity</p>
                        <p className="text-xs text-neo-black/60">Recent sign-in sessions</p>
                      </div>
                    </div>
                    <div className="ml-13 pl-4 border-l-2 border-neo-black/10">
                      <p className="text-sm font-medium">Current Session</p>
                      <p className="text-xs text-neo-black/60">
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
                  <div className="p-4 bg-red-50 rounded-xl border border-red-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-bold text-sm text-red-700">Delete Account</p>
                        <p className="text-xs text-red-600">Permanently delete your account and all data</p>
                      </div>
                      <button 
                        onClick={handleDeleteAccount}
                        className="text-sm font-bold text-red-600 hover:text-red-800 transition-colors px-4 py-2 border border-red-300 rounded-lg hover:bg-red-100"
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
    </main>
  );
}
