'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';

export default function CheckoutPage() {
  const [loading, setLoading] = useState(false);
  const [mobileNumber, setMobileNumber] = useState('');
  const [initializing, setInitializing] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/signin');
        return;
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('phone')
        .eq('id', user.id)
        .single();

      if (profile?.phone) {
        setMobileNumber(profile.phone);
      }
      setInitializing(false);
    };

    fetchUser();
  }, [router, supabase]);

  const handlePayment = async () => {
    alert('Payments are currently disabled for maintenance. Please check back later.');
    return;
    /* 
    if (!mobileNumber || mobileNumber.length < 10) {
      alert('Please enter a valid mobile number');
      return;
    }

    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        alert('Please sign in to continue');
        router.push('/signin');
        return;
      }

      // Generate a unique order ID
      const orderId = `ORDER_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
      const amount = 100; // Example amount: 100 INR

      // 2. Initiate Payment
      const response = await fetch('/api/phonepe/pay', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: amount,
          orderId: orderId,
          customerId: user.id,
          mobileNumber: mobileNumber,
        }),
      });

      const data = await response.json();

      if (data.url) {
        // Redirect to PhonePe Payment Page
        window.location.href = data.url;
      } else {
        alert('Payment initiation failed: ' + (data.error || 'Unknown error'));
      }

    } catch (error) {
      console.error('Payment Error:', error);
      alert('Something went wrong');
    } finally {
      setLoading(false);
    }
    */
  };

  if (initializing) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-zinc-900 p-8 rounded-2xl border border-zinc-800">
        <h1 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
          Checkout
        </h1>
        
        <div className="space-y-4 mb-8">
          <div className="flex justify-between items-center p-4 bg-zinc-800/50 rounded-lg">
            <span className="text-zinc-400">Product</span>
            <span className="font-medium">BoxPox Premium</span>
          </div>
          <div className="flex justify-between items-center p-4 bg-zinc-800/50 rounded-lg">
            <span className="text-zinc-400">Total Amount</span>
            <span className="text-xl font-bold text-green-400">₹100.00</span>
          </div>

          <div className="space-y-2">
            <label className="text-sm text-zinc-400">Mobile Number</label>
            <input
              type="tel"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              placeholder="Enter your mobile number"
              className="w-full p-3 bg-zinc-800 border border-zinc-700 rounded-lg focus:outline-none focus:border-white transition-colors"
            />
          </div>
        </div>

        <button
          onClick={handlePayment}
          disabled={loading}
          className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-zinc-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
              Processing...
            </>
          ) : (
            'Pay with PhonePe'
          )}
        </button>
        
        <p className="mt-4 text-xs text-center text-zinc-500">
          Secure payment powered by PhonePe
        </p>
      </div>
    </div>
  );
}
