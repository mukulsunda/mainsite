"use client";
import { Bell } from 'lucide-react';
import NewsletterForm from './NewsletterForm';

export default function Newsletter() {
  return (
    <section className="py-12 md:py-20 bg-neo-black">
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 md:p-10 relative overflow-hidden">
            {/* Corner Accent */}
            <div className="absolute top-0 right-0 w-20 h-20 md:w-28 md:h-28 bg-neo-yellow rounded-bl-[80px]" />
            
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Content */}
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-neo-yellow/10 rounded-full mb-4">
                  <Bell size={14} className="text-neo-yellow" />
                  <span className="text-neo-yellow text-xs font-medium">Stay Updated</span>
                </div>
                
                <h2 className="text-2xl md:text-3xl font-black text-white mb-3 tracking-tight">
                  Join the<br />
                  <span className="text-neo-yellow">Inner Circle</span>
                </h2>
                
                <p className="text-white/60 text-sm leading-relaxed">
                  Get early access to new products, exclusive drops, and insider updates. No spam, just innovation.
                </p>
              </div>

              {/* Form */}
              <div>
                <NewsletterForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
