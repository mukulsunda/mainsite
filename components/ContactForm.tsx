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
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="form-label">
            Full Name <span className="text-neo-yellow">*</span>
          </label>
          <input 
            type="text" 
            id="name"
            autoComplete="name"
            className="robot-input" 
            placeholder="John Doe" 
            required 
          />
        </div>
        <div>
          <label htmlFor="email" className="form-label">
            Email Address <span className="text-neo-yellow">*</span>
          </label>
          <input 
            type="email" 
            id="email"
            autoComplete="email"
            className="robot-input" 
            placeholder="john@example.com" 
            required 
          />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="form-label">
          Subject <span className="text-neo-yellow">*</span>
        </label>
        <select 
          id="subject" 
          className="robot-input appearance-none cursor-pointer" 
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
        <label htmlFor="message" className="form-label">
          Message <span className="text-neo-yellow">*</span>
        </label>
        <textarea 
          id="message" 
          rows={5} 
          className="robot-input resize-none" 
          placeholder="Tell us how we can help..."
          required
        />
      </div>

      <div className="flex items-start gap-3">
        <input 
          type="checkbox" 
          id="consent" 
          className="w-5 h-5 mt-0.5 accent-neo-yellow rounded"
          required
        />
        <label htmlFor="consent" className="text-sm text-white/60 leading-relaxed">
          I agree to the processing of my personal data in accordance with the Privacy Policy.
        </label>
      </div>

      <button 
        type="submit" 
        className="robot-btn w-full justify-center"
        disabled={formStatus === 'sending'}
      >
        {formStatus === 'idle' && (
          <>
            Send Message
            <Send size={18} />
          </>
        )}
        {formStatus === 'sending' && (
          <>
            Sending...
            <Loader2 size={18} className="animate-spin" />
          </>
        )}
        {formStatus === 'success' && (
          <>
            <CheckCircle size={18} />
            Message Sent!
          </>
        )}
      </button>

      {formStatus === 'success' && (
        <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-2xl text-green-400 text-center text-sm flex items-center justify-center gap-2">
          <CheckCircle size={18} />
          Thank you! We&apos;ll respond within 24 hours.
        </div>
      )}
    </form>
  );
}
