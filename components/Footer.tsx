'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, MapPin, Mail, Phone, ArrowRight } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    products: [
      { label: 'All Products', href: '/products' },
      { label: 'BoxPrint 3D', href: '/boxprint' },
      { label: 'Coming Soon', href: '/products' },
    ],
    company: [
      { label: 'About Us', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Careers', href: '/contact' },
    ],
    support: [
      { label: 'FAQ', href: '/#faq' },
      { label: 'Shipping', href: '/shipping' },
      { label: 'Refunds', href: '/refund' },
    ],
    legal: [
      { label: 'Terms', href: '/terms' },
      { label: 'Privacy', href: '/privacy' },
    ],
  };

  return (
    <footer className="bg-neo-black relative overflow-hidden">
      {/* Animated Dot Pattern Background */}
      <div className="absolute inset-0 dot-pattern-animated opacity-30" />

      {/* Main Footer Content */}
      <div className="relative z-10">
        {/* CTA Section */}
        <div className="border-b border-white/10">
          <div className="container py-20 md:py-28">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-[0.95]">
                Ready to build<br />
                <span className="text-neo-yellow">something amazing?</span>
              </h2>
              <p className="text-white/60 text-lg md:text-xl mb-10 max-w-xl mx-auto">
                Start your 3D printing journey today with BoxPox. Upload, customize, and receive.
              </p>
              <Link 
                href="/boxprint" 
                className="robot-btn text-lg px-10 py-5"
              >
                Get Started
                <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>

        {/* Links Section */}
        <div className="border-b border-white/10">
          <div className="container py-16 md:py-20">
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 lg:gap-12">
              {/* Brand Column */}
              <div className="col-span-2">
                <Link href="/" className="inline-flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-neo-yellow rounded-full flex items-center justify-center">
                    <Image 
                      src="/logo.png" 
                      alt="BoxPox" 
                      width={40} 
                      height={40} 
                      className="w-8 h-8 object-contain"
                    />
                  </div>
                  <span className="text-white font-bold text-2xl">BoxPox</span>
                </Link>
                <p className="text-white/50 text-sm leading-relaxed mb-6 max-w-xs">
                  Consumer-focused innovation for the humans of tomorrow. Building the future, one product at a time.
                </p>
                <div className="flex gap-3">
                  {['Twitter', 'Instagram', 'LinkedIn'].map((social) => (
                    <a 
                      key={social}
                      href="#"
                      className="px-4 py-2 rounded-full border border-white/10 text-white/60 text-sm hover:border-neo-yellow hover:text-neo-yellow transition-all"
                    >
                      {social}
                    </a>
                  ))}
                </div>
              </div>

              {/* Products */}
              <div>
                <h4 className="text-white font-semibold mb-6 text-sm uppercase tracking-wider">Products</h4>
                <ul className="space-y-4">
                  {footerLinks.products.map((link) => (
                    <li key={link.label}>
                      <Link 
                        href={link.href} 
                        className="text-white/50 hover:text-neo-yellow transition-colors text-sm inline-flex items-center gap-1 group"
                      >
                        {link.label}
                        <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Company */}
              <div>
                <h4 className="text-white font-semibold mb-6 text-sm uppercase tracking-wider">Company</h4>
                <ul className="space-y-4">
                  {footerLinks.company.map((link) => (
                    <li key={link.label}>
                      <Link 
                        href={link.href} 
                        className="text-white/50 hover:text-neo-yellow transition-colors text-sm inline-flex items-center gap-1 group"
                      >
                        {link.label}
                        <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Support */}
              <div>
                <h4 className="text-white font-semibold mb-6 text-sm uppercase tracking-wider">Support</h4>
                <ul className="space-y-4">
                  {footerLinks.support.map((link) => (
                    <li key={link.label}>
                      <Link 
                        href={link.href} 
                        className="text-white/50 hover:text-neo-yellow transition-colors text-sm inline-flex items-center gap-1 group"
                      >
                        {link.label}
                        <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact */}
              <div>
                <h4 className="text-white font-semibold mb-6 text-sm uppercase tracking-wider">Contact</h4>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3 text-white/50 text-sm">
                    <MapPin size={16} className="text-neo-yellow mt-0.5 flex-shrink-0" />
                    <span>1617 Sector 70<br />Mohali, 160071</span>
                  </li>
                  <li className="flex items-center gap-3 text-white/50 text-sm">
                    <Phone size={16} className="text-neo-yellow flex-shrink-0" />
                    <div className="flex flex-col">
                      <span>+91 7888601710</span>
                      <span className="text-white/30 text-xs">+91 9835502288</span>
                    </div>
                  </li>
                  <li className="flex items-center gap-3 text-white/50 text-sm">
                    <Mail size={16} className="text-neo-yellow flex-shrink-0" />
                    <span>info@boxpox.in</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="container py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-6 text-sm text-white/40">
              <span>© {currentYear} BoxPox. All rights reserved.</span>
            </div>
            <div className="flex items-center gap-6">
              {footerLinks.legal.map((link) => (
                <Link 
                  key={link.label}
                  href={link.href} 
                  className="text-sm text-white/40 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Gradient Line */}
        <div className="h-1 bg-gradient-to-r from-transparent via-neo-yellow to-transparent" />
      </div>
    </footer>
  );
}