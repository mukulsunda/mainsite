'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  // const router = useRouter();
  const [status, setStatus] = useState<'loading' | 'success' | 'failure'>('loading');
  const [message, setMessage] = useState('Verifying payment...');

  useEffect(() => {
    const verifyPayment = async () => {
      const orderId = searchParams.get('orderId');
      
      if (!orderId) {
        setStatus('failure');
        setMessage('Invalid Order ID');
        return;
      }

      try {
        const response = await fetch('/api/phonepe/status', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ merchantTransactionId: orderId }),
        });

        const data = await response.json();

        if (data.status === 'SUCCESS') {
          setStatus('success');
          setMessage('Payment Successful! Thank you for your order.');
        } else {
          setStatus('failure');
          setMessage(data.message || 'Payment Failed. Please try again.');
        }
      } catch (error) {
        console.error('Verification Error:', error);
        setStatus('failure');
        setMessage('Failed to verify payment status.');
      }
    };

    verifyPayment();
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-zinc-900 p-8 rounded-2xl border border-zinc-800 text-center">
        {status === 'loading' && (
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin" />
            <h2 className="text-xl font-bold">Verifying Payment</h2>
            <p className="text-zinc-400">{message}</p>
          </div>
        )}

        {status === 'success' && (
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center text-3xl">
              ✓
            </div>
            <h2 className="text-2xl font-bold text-green-400">Order Confirmed!</h2>
            <p className="text-zinc-300">{message}</p>
            <Link 
              href="/account"
              className="mt-4 px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-zinc-200 transition-all"
            >
              Go to Dashboard
            </Link>
          </div>
        )}

        {status === 'failure' && (
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 bg-red-500/20 text-red-500 rounded-full flex items-center justify-center text-3xl">
              ✕
            </div>
            <h2 className="text-2xl font-bold text-red-400">Payment Failed</h2>
            <p className="text-zinc-300">{message}</p>
            <div className="flex gap-4 mt-4">
              <Link 
                href="/checkout"
                className="px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-zinc-200 transition-all"
              >
                Try Again
              </Link>
              <Link 
                href="/"
                className="px-6 py-3 bg-zinc-800 text-white font-bold rounded-xl hover:bg-zinc-700 transition-all"
              >
                Go Home
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black text-white flex items-center justify-center">Loading...</div>}>
      <OrderConfirmationContent />
    </Suspense>
  );
}
