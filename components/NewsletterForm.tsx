"use client";
import { ArrowRight } from 'lucide-react';
import { useState } from 'react';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email) {
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input 
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/40 focus:outline-none focus:border-neo-yellow transition-colors text-sm md:text-base"
        required
      />
      
      <button 
        type="submit"
        className="w-full px-5 py-3 bg-neo-yellow text-neo-black font-bold rounded-lg hover:bg-white transition-colors flex items-center justify-center gap-2 text-sm md:text-base"
      >
        {status === 'success' ? (
          'Welcome! ✓'
        ) : (
          <>
            Subscribe
            <ArrowRight size={16} />
          </>
        )}
      </button>

      <p className="text-white/40 text-xs text-center">
        Join 10,000+ innovators. Unsubscribe anytime.
      </p>
    </form>
  );
}
