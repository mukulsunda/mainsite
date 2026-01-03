import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { Package, LogOut, Shield, Bell, CreditCard, MapPin, ChevronRight, KeyRound } from 'lucide-react';
import Link from 'next/link';
import ProfileForm from './ProfileForm';

export default async function AccountPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/signin');
  }

  // Fetch profile data from the profiles table
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  // Get user metadata
  const { first_name, last_name } = user.user_metadata || {};
  const displayName = first_name ? `${first_name} ${last_name}` : user.email;

  const menuItems = [
    { icon: Package, label: 'My Orders', desc: 'Track your orders', href: '#orders', badge: '0' },
    { icon: MapPin, label: 'Saved Addresses', desc: 'Manage delivery addresses', href: '#addresses' },
    { icon: CreditCard, label: 'Payment Methods', desc: 'Saved cards and UPI', href: '#payments' },
    { icon: Bell, label: 'Notifications', desc: 'Email and push preferences', href: '#notifications' },
    { icon: Shield, label: 'Privacy & Security', desc: 'Password and security', href: '#security' },
  ];

  return (
    <main className="min-h-screen bg-neo-light-gray pt-24 pb-12 px-4">
      <div className="container max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-black text-neo-black mb-2">My Account</h1>
          <p className="text-neo-black/60">Manage your profile, orders, and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <div className="bg-white border-2 border-neo-black rounded-xl p-6 shadow-neo">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-neo-yellow rounded-full flex items-center justify-center border-2 border-neo-black">
                  <span className="text-2xl font-black text-neo-black">
                    {first_name ? first_name[0] : user.email?.[0].toUpperCase()}
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
                  <p className="text-2xl font-black text-neo-black">0</p>
                  <p className="text-xs text-neo-black/60">Orders</p>
                </div>
                <div className="bg-neo-light-gray rounded-lg p-3 text-center">
                  <p className="text-2xl font-black text-neo-black">0</p>
                  <p className="text-xs text-neo-black/60">Wishlist</p>
                </div>
              </div>

              {/* Menu Items */}
              <nav className="space-y-1">
                {menuItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-neo-light-gray transition-colors group"
                  >
                    <div className="w-10 h-10 bg-neo-light-gray rounded-lg flex items-center justify-center group-hover:bg-neo-yellow transition-colors">
                      <item.icon size={20} className="text-neo-black" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-bold text-neo-black text-sm">{item.label}</p>
                        {item.badge && (
                          <span className="px-2 py-0.5 bg-neo-black text-white text-xs rounded-full">{item.badge}</span>
                        )}
                      </div>
                      <p className="text-xs text-neo-black/50 truncate">{item.desc}</p>
                    </div>
                    <ChevronRight size={18} className="text-neo-black/30 group-hover:text-neo-black transition-colors" />
                  </Link>
                ))}
              </nav>

              {/* Sign Out */}
              <form action="/auth/signout" method="post" className="mt-4 pt-4 border-t border-neo-black/10">
                <button 
                  type="submit"
                  className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-red-50 transition-colors group text-left"
                >
                  <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center group-hover:bg-red-100 transition-colors">
                    <LogOut size={20} className="text-red-500" />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-red-500 text-sm">Sign Out</p>
                    <p className="text-xs text-red-400">Log out of your account</p>
                  </div>
                </button>
              </form>
            </div>

            {/* Security Card */}
            <div className="bg-white border-2 border-neo-black rounded-xl p-6 shadow-neo">
              <h3 className="font-bold text-neo-black mb-4 flex items-center gap-2">
                <KeyRound size={18} />
                Account Security
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-neo-light-gray rounded-lg">
                  <div>
                    <p className="text-sm font-bold text-neo-black">Password</p>
                    <p className="text-xs text-neo-black/50">Last changed: Never</p>
                  </div>
                  <Link 
                    href="/auth/reset-password"
                    className="text-sm font-bold text-neo-black hover:text-neo-yellow transition-colors"
                  >
                    Change
                  </Link>
                </div>
                <div className="flex items-center justify-between p-3 bg-neo-light-gray rounded-lg">
                  <div>
                    <p className="text-sm font-bold text-neo-black">Email Verified</p>
                    <p className="text-xs text-neo-black/50">{user.email}</p>
                  </div>
                  <span className="text-xs font-bold text-green-600 bg-green-100 px-2 py-1 rounded-full">
                    Verified
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <ProfileForm 
              user={{
                id: user.id,
                email: user.email || '',
                user_metadata: user.user_metadata,
              }}
              initialProfile={profile}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
