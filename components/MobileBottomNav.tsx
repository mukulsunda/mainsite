"use client";

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Home, Box, ShoppingBag, User, Printer } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';

export default function MobileBottomNav() {
  const pathname = usePathname();
  const { getCartCount, state } = useCart();
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<{ email?: string } | null>(null);
  const supabase = createClient();

  useEffect(() => {
    setMounted(true);
    
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    getUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  const cartCount = mounted && !state.isLoading ? getCartCount() : 0;

  // Hide on admin pages
  if (pathname.startsWith('/admin')) return null;

  const navItems = [
    { 
      href: '/', 
      icon: Home, 
      label: 'Home',
      isActive: pathname === '/'
    },
    { 
      href: '/products', 
      icon: Box, 
      label: 'Products',
      isActive: pathname === '/products'
    },
    { 
      href: '/boxprint', 
      icon: Printer, 
      label: 'Print',
      isActive: pathname === '/boxprint',
      isPrimary: true
    },
    { 
      href: '/cart', 
      icon: ShoppingBag, 
      label: 'Cart',
      isActive: pathname === '/cart',
      badge: cartCount > 0 ? cartCount : undefined
    },
    { 
      href: user ? '/account' : '/signin', 
      icon: User, 
      label: user ? 'Account' : 'Sign In',
      isActive: pathname === '/account' || pathname === '/signin'
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-[1000] lg:hidden">
      {/* Gradient fade effect */}
      <div className="absolute inset-x-0 -top-6 h-6 bg-gradient-to-t from-neo-black to-transparent pointer-events-none" />
      
      {/* Navigation bar */}
      <div className="bg-neo-black/95 backdrop-blur-xl border-t border-white/10 safe-bottom">
        <div className="flex items-center justify-around px-2 py-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            
            if (item.isPrimary) {
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative -mt-6"
                >
                  <div className="w-14 h-14 rounded-full bg-neo-yellow flex items-center justify-center shadow-lg shadow-neo-yellow/30 active:scale-95 transition-transform">
                    <Icon size={24} className="text-neo-black" strokeWidth={2.5} />
                  </div>
                  <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] font-medium text-neo-yellow whitespace-nowrap">
                    {item.label}
                  </span>
                </Link>
              );
            }
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl transition-all active:scale-95 ${
                  item.isActive 
                    ? 'text-neo-yellow' 
                    : 'text-white/50'
                }`}
              >
                <div className="relative">
                  <Icon size={22} strokeWidth={item.isActive ? 2.5 : 2} />
                  {item.badge !== undefined && (
                    <span className="absolute -top-1 -right-2 min-w-[18px] h-[18px] bg-neo-yellow text-neo-black rounded-full text-[10px] font-bold flex items-center justify-center px-1">
                      {item.badge > 9 ? '9+' : item.badge}
                    </span>
                  )}
                </div>
                <span className={`text-[10px] font-medium ${item.isActive ? 'text-neo-yellow' : 'text-white/40'}`}>
                  {item.label}
                </span>
                {item.isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-neo-yellow" />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
