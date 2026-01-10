"use client";

import { useState } from 'react';
import { Send, Loader2, CheckCircle } from 'lucide-react';

export default function ContactForm() {
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('sending');
    
    // Simulate form submission
    setTimeout(() => {
      setFormStatus('success');
      e.currentTarget.reset();
      setTimeout(() => setFormStatus('idle'), 4000);
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
        <div>
          <label htmlFor="name" className="block text-xs font-bold text-neo-black mb-1.5">
            Full Name <span className="text-neo-yellow">*</span>
          </label>
          <input 
            type="text" 
            id="name"
            autoComplete="name"
            className="w-full px-3 py-2.5 md:py-3 bg-neo-light-gray/70 border border-neo-black/10 rounded-xl text-sm focus:outline-none focus:border-neo-black focus:bg-white transition-all" 
            placeholder="John Doe" 
            required 
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-xs font-bold text-neo-black mb-1.5">
            Email Address <span className="text-neo-yellow">*</span>
          </label>
          <input 
            type="email" 
            id="email"
            autoComplete="email"
            className="w-full px-3 py-2.5 md:py-3 bg-neo-light-gray/70 border border-neo-black/10 rounded-xl text-sm focus:outline-none focus:border-neo-black focus:bg-white transition-all" 
            placeholder="john@example.com" 
            required 
          />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="block text-xs font-bold text-neo-black mb-1.5">
          Subject <span className="text-neo-yellow">*</span>
        </label>
        <select 
          id="subject" 
          className="w-full px-3 py-2.5 md:py-3 bg-neo-light-gray/70 border border-neo-black/10 rounded-xl text-sm focus:outline-none focus:border-neo-black focus:bg-white transition-all appearance-none cursor-pointer" 
          required
        >
          <option value="">Select a topic</option>
          <option value="general">General Inquiry</option>
          <option value="support">Product Support</option>
          <option value="order">Order Status</option>
          <option value="partnership">Partnership</option>
          <option value="press">Press & Media</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-xs font-bold text-neo-black mb-1.5">
          Message <span className="text-neo-yellow">*</span>
        </label>
        <textarea 
          id="message" 
          rows={4} 
          className="w-full px-3 py-2.5 md:py-3 bg-neo-light-gray/70 border border-neo-black/10 rounded-xl text-sm focus:outline-none focus:border-neo-black focus:bg-white transition-all resize-none" 
          placeholder="Tell us how we can help..."
          required
        />
      </div>

      <div className="flex items-start gap-2.5">
        <input 
          type="checkbox" 
          id="consent" 
          className="w-4 h-4 mt-0.5 accent-neo-yellow rounded"
          required
        />
        <label htmlFor="consent" className="text-xs text-neo-black/70 leading-relaxed">
          I agree to the processing of my personal data in accordance with the Privacy Policy.
        </label>
      </div>

      <button 
        type="submit" 
        className="w-full bg-neo-black text-white py-3 md:py-3.5 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-neo-black/90 active:scale-[0.98] transition-all disabled:opacity-50 shadow-lg shadow-neo-black/20"
        disabled={formStatus === 'sending'}
      >
        {formStatus === 'idle' && (
          <>
            Send Message
            <Send size={16} />
          </>
        )}
        {formStatus === 'sending' && (
          <>
            Sending...
            <Loader2 size={16} className="animate-spin" />
          </>
        )}
        {formStatus === 'success' && (
          <>
            <CheckCircle size={16} />
            Message Sent!
          </>
        )}
      </button>

      {formStatus === 'success' && (
        <div className="p-3 bg-green-50 border border-green-200 rounded-xl text-green-800 text-center text-sm flex items-center justify-center gap-2">
          <CheckCircle size={16} />
          Thank you! We&apos;ll respond within 24 hours.
        </div>
      )}
    </form>
  );
}
