import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, MapPin, Mail, Phone } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    products: [
      { label: 'All Products', href: '/products' },
      { label: 'New Arrivals', href: '/products' },
      { label: 'Best Sellers', href: '/products' },
      { label: 'Coming Soon', href: '/products' },
    ],
    company: [
      { label: 'About Us', href: '/about' },
      { label: 'Our Story', href: '/about' },
      { label: 'Careers', href: '/contact' },
      { label: 'Press Kit', href: '/contact' },
    ],
    support: [
      { label: 'Contact', href: '/contact' },
      { label: 'FAQ', href: '/#faq' },
      { label: 'Shipping', href: '/contact' },
      { label: 'Returns', href: '/contact' },
    ],
  };

  const socialLinks = [
    { label: 'Twitter', href: '#' },
    { label: 'Instagram', href: '#' },
    { label: 'LinkedIn', href: '#' },
    { label: 'YouTube', href: '#' },
  ];

  return (
    <footer className="bg-neo-black text-white relative overflow-hidden">
      {/* Grid Pattern */}
      <div className="absolute inset-0 grid-bg-dark opacity-30" />

      {/* Main Footer Content */}
      <div className="relative z-10">
        {/* Top Section */}
        <div className="border-b border-white/10">
          <div className="container py-16 md:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
              {/* Brand Column */}
              <div className="lg:col-span-4">
                <Link href="/" className="inline-block mb-6">
                  <Image 
                    src="/logo.svg" 
                    alt="BoxPox Logo" 
                    width={160} 
                    height={50} 
                    className="h-12 w-auto brightness-0 invert"
                  />
                </Link>
                <p className="text-white/60 leading-relaxed mb-8 max-w-sm">
                  Consumer-focused innovation. Hardware and software products engineered for the humans of tomorrow.
                </p>
                
                {/* Newsletter Mini */}
                <div className="p-5 bg-white/5 rounded-xl border border-white/10">
                  <p className="text-sm font-semibold mb-4 text-white">Subscribe to updates</p>
                  <div className="flex gap-3">
                    <input 
                      type="email" 
                      placeholder="your@email.com"
                      className="flex-1 min-w-0 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-neo-yellow transition-colors"
                    />
                    <button 
                      type="button"
                      className="px-5 py-3 bg-neo-yellow text-neo-black font-bold text-sm rounded-lg hover:bg-white transition-colors whitespace-nowrap"
                    >
                      Join
                    </button>
                  </div>
                </div>
              </div>

              {/* Links Columns */}
              <div className="lg:col-span-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  {/* Products */}
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-6">Products</h4>
                    <ul className="space-y-3">
                      {footerLinks.products.map((link) => (
                        <li key={link.label}>
                          <Link 
                            href={link.href} 
                            className="text-white/60 hover:text-neo-yellow transition-colors text-sm inline-flex items-center gap-1 group"
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
                    <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-6">Company</h4>
                    <ul className="space-y-3">
                      {footerLinks.company.map((link) => (
                        <li key={link.label}>
                          <Link 
                            href={link.href} 
                            className="text-white/60 hover:text-neo-yellow transition-colors text-sm inline-flex items-center gap-1 group"
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
                    <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-6">Support</h4>
                    <ul className="space-y-3">
                      {footerLinks.support.map((link) => (
                        <li key={link.label}>
                          <Link 
                            href={link.href} 
                            className="text-white/60 hover:text-neo-yellow transition-colors text-sm inline-flex items-center gap-1 group"
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
                    <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-6">Contact</h4>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-3 text-white/60 text-sm">
                        <MapPin size={16} className="text-neo-yellow mt-0.5 flex-shrink-0" />
                        <span>1617 Sector 70<br />Mohali, 160071</span>
                      </li>
                      <li className="flex items-center gap-3 text-white/60 text-sm">
                        <Phone size={16} className="text-neo-yellow flex-shrink-0" />
                        <span>+91 788 860 1710</span>
                      </li>
                      <li className="flex items-center gap-3 text-white/60 text-sm">
                        <Mail size={16} className="text-neo-yellow flex-shrink-0" />
                        <span>info@boxpox.in</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="container py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <div className="flex items-center gap-6 text-sm text-white/40">
              <span>© {currentYear} BoxPox. All rights reserved.</span>
              <span className="hidden md:inline">•</span>
              <Link href="#" className="hover:text-white transition-colors hidden md:inline">Privacy Policy</Link>
              <Link href="#" className="hover:text-white transition-colors hidden md:inline">Terms of Service</Link>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a 
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="px-4 py-2 text-sm text-white/60 hover:text-neo-yellow border border-white/10 rounded-lg hover:border-neo-yellow/50 transition-all"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Decorative Element */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-neo-yellow via-neo-accent to-neo-yellow" />
      </div>
    </footer>
  );
}