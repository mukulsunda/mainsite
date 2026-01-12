"use client";
import { ArrowRight, Check } from 'lucide-react';
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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <input 
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="robot-input flex-1"
          required
        />
        
        <button 
          type="submit"
          className="robot-btn whitespace-nowrap"
        >
          {status === 'success' ? (
            <>
              <Check size={18} />
              Subscribed!
            </>
          ) : (
            <>
              Subscribe
              <ArrowRight size={18} />
            </>
          )}
        </button>
      </div>

      <p className="text-white/40 text-sm">
        Join 10,000+ innovators. Unsubscribe anytime.
      </p>
    </form>
  );
}
