import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, MapPin, Mail, Phone } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    products: [
      { label: 'All Products', href: '/products' },
      { label: 'BoxPrint (3D)', href: '/boxprint' },
      { label: 'Coming Soon', href: '/products' },
    ],
    company: [
      { label: 'About Us', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Careers', href: '/contact' },
    ],
    support: [
      { label: 'FAQ', href: '/#faq' },
      { label: 'Shipping Policy', href: '/shipping' },
      { label: 'Refund Policy', href: '/refund' },
    ],
    legal: [
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Privacy Policy', href: '/privacy' },
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
          <div className="container py-10 md:py-14">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6">
              {/* Brand Column */}
              <div className="lg:col-span-3">
                <Link href="/" className="inline-block mb-4">
                  <Image 
                    src="/logo.png" 
                    alt="BoxPox Logo" 
                    width={120} 
                    height={120} 
                    className="h-12 w-auto"
                  />
                </Link>
                <p className="text-white/60 text-sm leading-relaxed">
                  Consumer-focused innovation for the humans of tomorrow.
                </p>
              </div>

              {/* Links Columns */}
              <div className="lg:col-span-9">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                  {/* Products */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Products</h4>
                    <ul className="space-y-2">
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
                    <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Company</h4>
                    <ul className="space-y-2">
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
                    <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Support</h4>
                    <ul className="space-y-2">
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

                  {/* Legal */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Legal</h4>
                    <ul className="space-y-2">
                      {footerLinks.legal.map((link) => (
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
                    <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">Contact</h4>
                    <ul className="space-y-3">
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
        <div className="container py-6 px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6">
            {/* Copyright */}
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-xs sm:text-sm text-white/40 text-center">
              <span>© {currentYear} BoxPox. All rights reserved.</span>
              <div className="flex items-center gap-3">
                <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
                <span>•</span>
                <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center justify-center flex-wrap gap-2">
              {socialLinks.map((social) => (
                <a 
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="px-3 py-1.5 text-xs sm:text-sm text-white/60 hover:text-neo-yellow border border-white/10 rounded-lg hover:border-neo-yellow/50 transition-all"
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