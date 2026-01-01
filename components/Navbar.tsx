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

  return (
    <nav className={`fixed z-[1000] transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] flex justify-between items-center
      ${scrolled 
        ? 'top-5 left-1/2 -translate-x-1/2 w-[90%] max-w-[1200px] py-3 px-8 bg-white border-3 border-black rounded-[20px] shadow-neo' 
        : 'top-0 left-0 w-full py-5 px-10 bg-transparent'
      }`}>
      
      <Link href="/" className="logo">
        <Image 
          src="/logo.svg" 
          alt="BoxPox Logo" 
          width={200} 
          height={70} 
          className="h-[50px] w-auto md:h-[70px]"
        />
      </Link>

      {/* Desktop Menu */}
      <div className="hidden md:flex gap-10 items-center">
        <Link href="/" className="nav-link">Home</Link>
        <Link href="/products" className="nav-link">Products</Link>
        <Link href="/about" className="nav-link">About</Link>
        <Link href="/contact" className="nav-link">Contact</Link>
        <Link href="/cart" className="neo-btn !p-3 !rounded-full w-[50px] h-[50px] flex items-center justify-center">
          <ShoppingBag size={24} />
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button className="md:hidden bg-none border-none text-black cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-screen bg-neo-yellow flex flex-col justify-center items-center gap-8 z-[999] bg-[radial-gradient(#000000_1.5px,transparent_1.5px)] bg-[length:30px_30px]">
          <button onClick={() => setIsOpen(false)} className="absolute top-8 right-[5%] bg-white border-3 border-black rounded-full w-[50px] h-[50px] flex items-center justify-center shadow-[4px_4px_0px_black] cursor-pointer hover:scale-110 transition-transform">
            <X size={24} />
          </button>
          <Link href="/" onClick={() => setIsOpen(false)} className="text-5xl font-black uppercase hover:text-white transition-colors">Home</Link>
          <Link href="/products" onClick={() => setIsOpen(false)} className="text-5xl font-black uppercase hover:text-white transition-colors">Products</Link>
          <Link href="/about" onClick={() => setIsOpen(false)} className="text-5xl font-black uppercase hover:text-white transition-colors">About</Link>
          <Link href="/contact" onClick={() => setIsOpen(false)} className="text-5xl font-black uppercase hover:text-white transition-colors">Contact</Link>
          <Link href="/cart" onClick={() => setIsOpen(false)} className="neo-btn mt-4">
            Cart (0)
          </Link>
        </div>
      )}
    </nav>
  );
}