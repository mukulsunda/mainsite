"use client";

import { useState } from 'react';
import { Send } from 'lucide-react';

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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-xs font-bold text-neo-black mb-1.5">
            Full Name <span className="text-neo-yellow">*</span>
          </label>
          <input 
            type="text" 
            id="name" 
            className="w-full px-3 py-2.5 bg-neo-light-gray border border-neo-black/10 rounded-lg text-sm focus:outline-none focus:border-neo-black transition-colors" 
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
            className="w-full px-3 py-2.5 bg-neo-light-gray border border-neo-black/10 rounded-lg text-sm focus:outline-none focus:border-neo-black transition-colors" 
            placeholder="john@example.com" 
            required 
          />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="block text-xs font-bold text-neo-black mb-1.5">
          Subject <span className="text-neo-yellow">*</span>
        </label>
        <select id="subject" className="w-full px-3 py-2.5 bg-neo-light-gray border border-neo-black/10 rounded-lg text-sm focus:outline-none focus:border-neo-black transition-colors" required>
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
          rows={5} 
          className="w-full px-3 py-2.5 bg-neo-light-gray border border-neo-black/10 rounded-lg text-sm focus:outline-none focus:border-neo-black transition-colors resize-none" 
          placeholder="Tell us how we can help..."
          required
        />
      </div>

      <div className="flex items-start gap-2">
        <input 
          type="checkbox" 
          id="consent" 
          className="w-4 h-4 mt-0.5 accent-neo-yellow"
          required
        />
        <label htmlFor="consent" className="text-xs text-neo-black/70">
          I agree to the processing of my personal data in accordance with the Privacy Policy.
        </label>
      </div>

      <button 
        type="submit" 
        className="w-full bg-neo-black text-white py-2.5 px-4 rounded-lg font-bold text-sm flex items-center justify-center gap-2 hover:bg-neo-black/90 transition-colors disabled:opacity-50"
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
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          </>
        )}
        {formStatus === 'success' && (
          <>
            Message Sent ✓
          </>
        )}
      </button>

      {formStatus === 'success' && (
        <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-green-800 text-center text-sm">
          Thank you! We'll respond within 24 hours.
        </div>
      )}
    </form>
  );
}
