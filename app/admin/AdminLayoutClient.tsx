'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  Settings, 
  LogOut,
  ChevronRight,
  Printer,
  FileBox
} from 'lucide-react';
import { AdminUser } from './types';
import { User } from '@supabase/supabase-js';

interface AdminLayoutClientProps {
  children: React.ReactNode;
  user: User;
  adminUser: AdminUser;
}

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Orders', href: '/admin/orders', icon: Package },
  { name: 'Files', href: '/admin/files', icon: FileBox },
  { name: 'Users', href: '/admin/users', icon: Users },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
];

export default function AdminLayoutClient({ children, user, adminUser }: AdminLayoutClientProps) {
  const pathname = usePathname();
  
  return (
    <div className="min-h-screen bg-neutral-100">
      {/* Top Header */}
      <header className="bg-neutral-900 text-white h-16 fixed top-0 left-0 right-0 z-50">
        <div className="h-full px-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-400 rounded-lg flex items-center justify-center">
                <Printer size={22} className="text-neutral-900" />
              </div>
              <div>
                <span className="font-black text-lg tracking-tight">
                  Box<span className="text-yellow-400">Pox</span>
                </span>
                <span className="text-neutral-400 text-xs block -mt-1">Admin Panel</span>
              </div>
            </Link>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium">{user.email}</p>
              <p className="text-xs text-neutral-400 capitalize">{adminUser.role.replace('_', ' ')}</p>
            </div>
            <Link
              href="/auth/signout"
              className="p-2 hover:bg-neutral-800 rounded-lg transition-colors"
              title="Sign Out"
            >
              <LogOut size={20} />
            </Link>
          </div>
        </div>
      </header>
      
      {/* Sidebar */}
      <aside className="fixed left-0 top-16 bottom-0 w-64 bg-white border-r border-neutral-200 z-40">
        <nav className="p-4 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href || 
              (item.href !== '/admin' && pathname.startsWith(item.href));
            
            // Check permissions
            const hasPermission = 
              item.name === 'Dashboard' || 
              (item.name === 'Orders' && adminUser.permissions.orders) ||
              (item.name === 'Files' && adminUser.permissions.files) ||
              (item.name === 'Users' && adminUser.permissions.users) ||
              (item.name === 'Settings' && adminUser.permissions.settings);
            
            if (!hasPermission) return null;
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all
                  ${isActive 
                    ? 'bg-neutral-900 text-white' 
                    : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
                  }
                `}
              >
                <item.icon size={20} />
                {item.name}
                {isActive && <ChevronRight size={16} className="ml-auto" />}
              </Link>
            );
          })}
        </nav>
        
        {/* Back to Site */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-neutral-200">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-neutral-500 hover:bg-neutral-100 hover:text-neutral-700 transition-all"
          >
            <ChevronRight size={16} className="rotate-180" />
            Back to Website
          </Link>
        </div>
      </aside>
      
      {/* Main Content */}
      <main className="ml-64 pt-16 min-h-screen">
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
