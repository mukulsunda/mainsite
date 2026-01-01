"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
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

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Products' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <>
      <nav className={`fixed z-[1000] transition-all duration-300 flex justify-between items-center
        ${scrolled 
          ? 'top-0 left-0 w-full py-3 px-5 md:px-8 bg-white/95 backdrop-blur-md border-b border-neo-black/10' 
          : 'top-0 left-0 w-full py-4 px-5 md:px-8 bg-white'
        }`}>
        
        {/* Logo */}
        <Link href="/" className="relative z-10">
          <Image 
            src="/logo.svg" 
            alt="BoxPox Logo" 
            width={140} 
            height={40} 
            className="h-8 md:h-10 w-auto"
            priority
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex gap-6 items-center">
          {navLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href} 
              className="font-semibold text-sm text-neo-black hover:text-neo-yellow transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <Link 
            href="/signin"
            className="px-4 py-2 text-sm font-semibold text-neo-black hover:text-neo-yellow transition-colors"
          >
            Sign In
          </Link>
          <Link 
            href="/cart" 
            className="relative p-2 rounded-lg border border-neo-black/20 hover:border-neo-black transition-colors"
          >
            <ShoppingBag size={20} />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-neo-yellow border border-neo-black rounded-full text-[10px] font-bold flex items-center justify-center">
              0
            </span>
          </Link>
          <Link href="/products" className="px-4 py-2 bg-neo-black text-white text-sm font-semibold rounded-lg hover:bg-neo-yellow hover:text-neo-black transition-colors">
            Shop Now
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="lg:hidden relative z-10 p-2 rounded-lg border border-neo-black/20 hover:bg-neo-light-gray transition-colors" 
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-white z-[999] lg:hidden">
          {/* Menu Content */}
          <div className="h-full flex flex-col pt-20 px-6">
            <nav className="space-y-1 flex-1">
              {navLinks.map((link) => (
                <Link 
                  key={link.href}
                  href={link.href} 
                  onClick={() => setIsOpen(false)} 
                  className="block text-2xl font-bold text-neo-black hover:text-neo-yellow transition-colors py-3 border-b border-neo-black/10"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Mobile CTA */}
            <div className="py-6 space-y-3">
              <Link 
                href="/cart" 
                onClick={() => setIsOpen(false)} 
                className="flex items-center justify-center gap-2 w-full py-3 border border-neo-black rounded-lg font-semibold"
              >
                <ShoppingBag size={18} />
                Cart (0)
              </Link>
              <Link 
                href="/products" 
                onClick={() => setIsOpen(false)} 
                className="block w-full py-3 bg-neo-black text-white text-center font-semibold rounded-lg"
              >
                Shop Now
              </Link>
              <div className="flex gap-3">
                <Link 
                  href="/signin" 
                  onClick={() => setIsOpen(false)} 
                  className="flex-1 py-3 border border-neo-black/20 rounded-lg text-center font-semibold text-sm"
                >
                  Sign In
                </Link>
                <Link 
                  href="/signup" 
                  onClick={() => setIsOpen(false)} 
                  className="flex-1 py-3 bg-neo-yellow text-neo-black rounded-lg text-center font-semibold text-sm"
                >
                  Sign Up
                </Link>
              </div>
            </div>

            {/* Bottom Info */}
            <div className="py-4 text-center text-xs text-neo-black/50">
              <span>© 2026 BoxPox • info@boxpox.in</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}