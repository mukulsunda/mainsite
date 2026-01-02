import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { Package, Settings, LogOut } from 'lucide-react';

export default async function AccountPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/signin');
  }

  // Get user metadata
  const { first_name, last_name, email } = user.user_metadata || {};
  const displayName = first_name ? `${first_name} ${last_name}` : email;

  return (
    <main className="min-h-screen bg-neo-white pt-24 pb-12 px-4">
      <div className="container max-w-4xl mx-auto">
        <div className="bg-white border-2 border-neo-black rounded-xl p-8 shadow-neo mb-8">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-neo-yellow rounded-full flex items-center justify-center border-2 border-neo-black">
              <span className="text-3xl font-black text-neo-black">
                {first_name ? first_name[0] : email?.[0].toUpperCase()}
              </span>
            </div>
            <div>
              <h1 className="text-3xl font-black text-neo-black mb-1">
                Welcome, {displayName}
              </h1>
              <p className="text-neo-black/60">{user.email}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Orders */}
          <div className="bg-white border-2 border-neo-black rounded-xl p-6 shadow-neo hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all cursor-pointer">
            <Package className="w-8 h-8 text-neo-black mb-4" />
            <h3 className="text-xl font-bold text-neo-black mb-2">My Orders</h3>
            <p className="text-neo-black/60 text-sm">Track and manage your recent purchases</p>
          </div>

          {/* Settings */}
          <div className="bg-white border-2 border-neo-black rounded-xl p-6 shadow-neo hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all cursor-pointer">
            <Settings className="w-8 h-8 text-neo-black mb-4" />
            <h3 className="text-xl font-bold text-neo-black mb-2">Settings</h3>
            <p className="text-neo-black/60 text-sm">Update your profile and preferences</p>
          </div>

          {/* Sign Out */}
          <form action="/auth/signout" method="post">
            <button className="w-full h-full text-left bg-white border-2 border-neo-black rounded-xl p-6 shadow-neo hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all cursor-pointer group">
              <LogOut className="w-8 h-8 text-red-500 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-bold text-red-500 mb-2">Sign Out</h3>
              <p className="text-red-400 text-sm">Securely log out of your account</p>
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
