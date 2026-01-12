"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag, User, ArrowRight } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';
import { useCart } from '@/context/CartContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<{ email?: string; user_metadata?: { first_name?: string } } | null>(null);
  const [mounted, setMounted] = useState(false);
  const supabase = createClient();
  const { getCartCount, state } = useCart();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
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

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const cartCount = mounted && !state.isLoading ? getCartCount() : 0;

  const navLinks = [
    { href: '/products', label: 'Products' },
    { href: '/boxprint', label: 'BoxPrint' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 ${
        scrolled 
          ? 'bg-neo-black/95 backdrop-blur-xl border-b border-white/10' 
          : 'bg-transparent'
      }`}>
        <div className="container">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link href="/" className="relative z-10 flex items-center gap-2 lg:gap-3">
              <div className="w-9 h-9 lg:w-10 lg:h-10 bg-neo-yellow rounded-full flex items-center justify-center">
                <Image 
                  src="/logo.png" 
                  alt="BoxPox" 
                  width={32} 
                  height={32} 
                  className="w-5 h-5 lg:w-6 lg:h-6 object-contain"
                  priority
                />
              </div>
              <span className="text-white font-bold text-lg lg:text-xl tracking-tight">BoxPox</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link 
                  key={link.href} 
                  href={link.href} 
                  className="nav-link"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-4">
              {user ? (
                <Link 
                  href="/account"
                  className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
                >
                  <div className="w-9 h-9 rounded-full bg-neo-yellow flex items-center justify-center">
                    <User size={18} className="text-neo-black" />
                  </div>
                </Link>
              ) : (
                <Link 
                  href="/signin"
                  className="text-white/70 hover:text-white transition-colors font-medium text-sm"
                >
                  Sign In
                </Link>
              )}
              
              <Link 
                href="/cart" 
                className="relative w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <ShoppingBag size={18} className="text-white" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-neo-yellow text-neo-black rounded-full text-[10px] font-bold flex items-center justify-center">
                    {cartCount > 9 ? '9+' : cartCount}
                  </span>
                )}
              </Link>

              <Link 
                href="/boxprint" 
                className="robot-btn py-3 px-6 text-sm"
              >
                Get Quote
                <ArrowRight size={16} />
              </Link>
            </div>

            {/* Mobile Actions */}
            <div className="flex lg:hidden items-center gap-2">
              <Link 
                href="/cart" 
                className="relative w-10 h-10 rounded-full bg-white/10 flex items-center justify-center active:scale-95 transition-transform"
              >
                <ShoppingBag size={18} className="text-white" />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-neo-yellow text-neo-black rounded-full text-[10px] font-bold flex items-center justify-center">
                    {cartCount > 9 ? '9+' : cartCount}
                  </span>
                )}
              </Link>
              
              <button 
                className="relative z-10 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white active:scale-95 transition-transform" 
                onClick={() => setIsOpen(!isOpen)}
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
              >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-[999] lg:hidden transition-all duration-300 ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-neo-black/98 backdrop-blur-xl"
          onClick={() => setIsOpen(false)}
        />
        
        {/* Menu Content */}
        <div className={`relative h-full flex flex-col pt-20 px-5 transition-all duration-300 ${
          isOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
        }`}>
          {/* User Profile Section */}
          <div className="mb-6 pb-6 border-b border-white/10">
            {user ? (
              <Link 
                href="/account" 
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-4"
              >
                <div className="w-14 h-14 rounded-full bg-neo-yellow flex items-center justify-center">
                  <User size={24} className="text-neo-black" />
                </div>
                <div>
                  <p className="text-white font-bold text-lg">
                    {user.user_metadata?.first_name || 'Welcome back'}
                  </p>
                  <p className="text-white/50 text-sm">{user.email}</p>
                </div>
              </Link>
            ) : (
              <div className="flex gap-3">
                <Link 
                  href="/signin" 
                  onClick={() => setIsOpen(false)}
                  className="flex-1 py-4 rounded-2xl bg-neo-yellow text-neo-black font-bold text-center active:scale-[0.98] transition-transform"
                >
                  Sign In
                </Link>
                <Link 
                  href="/signup" 
                  onClick={() => setIsOpen(false)}
                  className="flex-1 py-4 rounded-2xl bg-white/10 text-white font-bold text-center active:scale-[0.98] transition-transform"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 space-y-1">
            {navLinks.map((link, i) => (
              <Link 
                key={link.href}
                href={link.href} 
                onClick={() => setIsOpen(false)} 
                className={`flex items-center justify-between p-4 rounded-2xl text-lg font-semibold transition-all active:scale-[0.98] ${
                  isOpen ? 'animate-fade-in-up' : ''
                } hover:bg-white/5`}
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <span className="text-white">{link.label}</span>
                <ArrowRight size={18} className="text-white/30" />
              </Link>
            ))}
          </nav>

          {/* Quick Actions */}
          <div className="py-6 space-y-3 border-t border-white/10">
            <Link 
              href="/boxprint" 
              onClick={() => setIsOpen(false)} 
              className="robot-btn w-full justify-center py-5 text-base"
            >
              Get 3D Print Quote
              <ArrowRight size={20} />
            </Link>
          </div>

          {/* Bottom Info */}
          <div className="pb-6 flex items-center justify-center gap-4 text-sm text-white/30">
            <a href="tel:+917888601710" className="hover:text-white/50">+91 7888601710</a>
            <span>•</span>
            <a href="mailto:info@boxpox.in" className="hover:text-white/50">info@boxpox.in</a>
          </div>
        </div>
      </div>
    </>
  );
}