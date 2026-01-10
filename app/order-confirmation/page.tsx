'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, XCircle, Loader2, ArrowRight, Home, Package } from 'lucide-react';

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
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
    <div className="min-h-screen bg-neo-black text-white flex flex-col items-center justify-center p-4 safe-area-inset">
      <div className="max-w-md w-full bg-white/5 backdrop-blur-sm p-6 md:p-8 rounded-2xl border border-white/10 text-center">
        {status === 'loading' && (
          <div className="flex flex-col items-center gap-4 py-4">
            <div className="w-14 h-14 md:w-16 md:h-16 bg-neo-yellow/20 rounded-full flex items-center justify-center">
              <Loader2 className="w-7 h-7 md:w-8 md:h-8 text-neo-yellow animate-spin" />
            </div>
            <h2 className="text-lg md:text-xl font-bold">Verifying Payment</h2>
            <p className="text-white/60 text-sm md:text-base">{message}</p>
          </div>
        )}

        {status === 'success' && (
          <div className="flex flex-col items-center gap-4 py-4">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-green-500/20 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 md:w-10 md:h-10 text-green-400" />
            </div>
            <h2 className="text-xl md:text-2xl font-black text-green-400">Order Confirmed!</h2>
            <p className="text-white/70 text-sm md:text-base">{message}</p>
            <p className="text-white/50 text-xs md:text-sm mt-1">
              You&apos;ll receive an email confirmation shortly.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-4 w-full">
              <Link 
                href="/account"
                className="flex-1 flex items-center justify-center gap-2 px-5 py-3.5 bg-neo-yellow text-neo-black font-bold rounded-xl hover:bg-neo-yellow/90 active:scale-[0.98] transition-all shadow-lg"
              >
                <Package size={18} />
                Track Order
              </Link>
              <Link 
                href="/"
                className="flex-1 flex items-center justify-center gap-2 px-5 py-3.5 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 active:scale-[0.98] transition-all"
              >
                <Home size={18} />
                Home
              </Link>
            </div>
          </div>
        )}

        {status === 'failure' && (
          <div className="flex flex-col items-center gap-4 py-4">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-red-500/20 rounded-full flex items-center justify-center">
              <XCircle className="w-8 h-8 md:w-10 md:h-10 text-red-400" />
            </div>
            <h2 className="text-xl md:text-2xl font-black text-red-400">Payment Failed</h2>
            <p className="text-white/70 text-sm md:text-base">{message}</p>
            <p className="text-white/50 text-xs md:text-sm mt-1">
              Don&apos;t worry, no amount has been deducted.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-4 w-full">
              <Link 
                href="/checkout"
                className="flex-1 flex items-center justify-center gap-2 px-5 py-3.5 bg-neo-yellow text-neo-black font-bold rounded-xl hover:bg-neo-yellow/90 active:scale-[0.98] transition-all shadow-lg"
              >
                Try Again
                <ArrowRight size={18} />
              </Link>
              <Link 
                href="/"
                className="flex-1 flex items-center justify-center gap-2 px-5 py-3.5 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 active:scale-[0.98] transition-all"
              >
                <Home size={18} />
                Home
              </Link>
            </div>
          </div>
        )}
      </div>
      
      {/* Support link */}
      <p className="mt-6 text-white/40 text-xs md:text-sm text-center">
        Having issues?{' '}
        <Link href="/contact" className="text-neo-yellow hover:underline">
          Contact Support
        </Link>
      </p>
    </div>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-neo-black text-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 text-neo-yellow animate-spin" />
          <p className="text-white/60 text-sm">Loading...</p>
        </div>
      </div>
    }>
      <OrderConfirmationContent />
    </Suspense>
  );
}
