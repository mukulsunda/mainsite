import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Twitter, Instagram, Linkedin, MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-20 pb-8 px-[5%] border-t-[5px] border-black">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        {/* Brand Column */}
        <div>
          <div className="mb-6">
            <Link href="/">
              <Image 
                src="/logo.svg" 
                alt="BoxPox Logo" 
                width={180} 
                height={60} 
                className="h-[60px] w-auto"
              />
            </Link>
          </div>
          <p className="opacity-80 leading-relaxed text-lg">
            Unlocking possibilities through innovative and unusual consumer products. We think outside the box, so you don't have to.
          </p>
        </div>

        {/* Links Column */}
        <div>
          <h4 className="text-2xl mb-6 text-neo-yellow uppercase font-black">Quick Links</h4>
          <ul className="list-none p-0 flex flex-col gap-2.5">
            <li><Link href="/" className="text-white no-underline text-lg hover:text-neo-yellow transition-colors">Home</Link></li>
            <li><Link href="/about" className="text-white no-underline text-lg hover:text-neo-yellow transition-colors">About Us</Link></li>
            <li><Link href="/products" className="text-white no-underline text-lg hover:text-neo-yellow transition-colors">Products</Link></li>
            <li><Link href="/contact" className="text-white no-underline text-lg hover:text-neo-yellow transition-colors">Contact</Link></li>
          </ul>
        </div>

        {/* Contact Column */}
        <div>
          <h4 className="text-2xl mb-6 text-neo-yellow uppercase font-black">Contact Info</h4>
          <ul className="list-none p-0 flex flex-col gap-4">
            <li className="flex items-center gap-2.5 text-lg">
              <MapPin size={20} className="text-neo-yellow" /> 
              <span>1617 sector 70 mohali 160071</span>
            </li>
            <li className="flex items-center gap-2.5 text-lg">
              <Phone size={20} className="text-neo-yellow" /> 
              <span>7888601710</span>
            </li>
            <li className="flex items-center gap-2.5 text-lg">
              <Mail size={20} className="text-neo-yellow" /> 
              <span>hello@boxpox.com</span>
            </li>
          </ul>
        </div>

        {/* Social Column */}
        <div>
          <h4 className="text-2xl mb-6 text-white uppercase font-black">Follow Us</h4>
          <div className="flex gap-4">
            <a href="#" aria-label="Facebook" className="bg-white text-black p-2.5 rounded-full flex items-center justify-center border-2 border-white transition-transform hover:scale-110">
              <Facebook size={20} />
            </a>
            <a href="#" aria-label="Twitter" className="bg-white text-black p-2.5 rounded-full flex items-center justify-center border-2 border-white transition-transform hover:scale-110">
              <Twitter size={20} />
            </a>
            <a href="#" aria-label="Instagram" className="bg-white text-black p-2.5 rounded-full flex items-center justify-center border-2 border-white transition-transform hover:scale-110">
              <Instagram size={20} />
            </a>
            <a href="#" aria-label="LinkedIn" className="bg-white text-black p-2.5 rounded-full flex items-center justify-center border-2 border-white transition-transform hover:scale-110">
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 pt-8 text-center opacity-60 text-sm">
        <p>&copy; {new Date().getFullYear()} BoxPox. All rights reserved.</p>
      </div>
    </footer>
  );
}