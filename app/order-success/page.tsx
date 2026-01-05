'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle, Package, Truck, Mail, Clock, Printer, Home } from 'lucide-react';
import Confetti from 'react-confetti';

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const [showConfetti, setShowConfetti] = useState(true);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  
  const orderNumbers = searchParams.get('orders')?.split(',') || [];

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    
    window.addEventListener('resize', handleResize);
    
    // Stop confetti after 5 seconds
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timer);
    };
  }, []);

  return (
    <main className="pt-[72px] md:pt-[80px] min-h-screen bg-white">
      {showConfetti && windowSize.width > 0 && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={200}
          gravity={0.3}
          colors={['#FFD058', '#0A0A0A', '#10B981', '#3B82F6']}
        />
      )}
      
      <div className="container py-10 md:py-16">
        <div className="max-w-2xl mx-auto text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center animate-bounce-once">
            <CheckCircle size={48} className="text-green-500" />
          </div>

          {/* Main Heading */}
          <h1 className="text-3xl md:text-4xl font-black mb-3 tracking-tight">
            Order Placed <span className="text-green-500">Successfully!</span>
          </h1>
          
          <p className="text-neo-black/60 mb-6 text-sm md:text-base">
            Thank you for your order. We&apos;ve received your 3D print request and will begin processing it shortly.
          </p>

          {/* Order Numbers */}
          {orderNumbers.length > 0 && (
            <div className="bg-neo-light-gray rounded-xl p-4 md:p-6 mb-8">
              <p className="text-sm text-neo-black/60 mb-2">Your Order {orderNumbers.length > 1 ? 'Numbers' : 'Number'}</p>
              <div className="flex flex-wrap justify-center gap-2">
                {orderNumbers.map((num, i) => (
                  <span key={i} className="inline-block px-4 py-2 bg-neo-black text-white font-mono text-sm md:text-lg rounded-lg">
                    {num}
                  </span>
                ))}
              </div>
              <p className="text-xs text-neo-black/40 mt-3">
                Save these for tracking your order status
              </p>
            </div>
          )}

          {/* What's Next Timeline */}
          <div className="bg-white border border-neo-black/10 rounded-xl p-5 md:p-6 mb-8 text-left">
            <h2 className="text-lg font-bold mb-4 text-center">What happens next?</h2>
            <div className="space-y-4">
              {[
                {
                  icon: Mail,
                  title: 'Confirmation Email',
                  desc: 'You\'ll receive an email with order details within a few minutes',
                  status: 'done',
                },
                {
                  icon: Printer,
                  title: 'Print Queue',
                  desc: 'Our team will review your file and start printing within 24 hours',
                  status: 'next',
                },
                {
                  icon: Package,
                  title: 'Quality Check',
                  desc: 'Every print is inspected for quality before packaging',
                  status: 'pending',
                },
                {
                  icon: Truck,
                  title: 'Shipped',
                  desc: 'Your order will be dispatched within 48-72 hours',
                  status: 'pending',
                },
              ].map((step, i) => (
                <div key={i} className="flex gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    step.status === 'done' ? 'bg-green-100 text-green-600' :
                    step.status === 'next' ? 'bg-neo-yellow text-neo-black' :
                    'bg-neo-light-gray text-neo-black/40'
                  }`}>
                    <step.icon size={20} />
                  </div>
                  <div className="flex-1 pb-4 border-b border-neo-black/5 last:border-0">
                    <p className="font-semibold text-sm">{step.title}</p>
                    <p className="text-xs text-neo-black/50">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Estimated Delivery */}
          <div className="flex items-center justify-center gap-3 mb-8 p-4 bg-blue-50 rounded-xl">
            <Clock size={20} className="text-blue-600" />
            <div className="text-left">
              <p className="text-sm font-semibold text-blue-900">Estimated Delivery</p>
              <p className="text-xs text-blue-600">
                {getEstimatedDeliveryDate()} (5-7 business days)
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/account" className="neo-btn justify-center">
              <Package size={18} />
              Track Orders
            </Link>
            <Link href="/" className="neo-btn-outline justify-center">
              <Home size={18} />
              Back to Home
            </Link>
          </div>

          {/* Need Help */}
          <div className="mt-10 pt-6 border-t border-neo-black/10">
            <p className="text-sm text-neo-black/60">
              Need help with your order?{' '}
              <Link href="/contact" className="text-neo-black font-semibold hover:underline">
                Contact us
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

function getEstimatedDeliveryDate(): string {
  const date = new Date();
  date.setDate(date.getDate() + 7); // Add 7 days
  return date.toLocaleDateString('en-IN', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={
      <main className="pt-[72px] md:pt-[80px] min-h-screen bg-white">
        <div className="container py-16 text-center">
          <div className="w-12 h-12 border-4 border-neo-black/10 border-t-neo-yellow rounded-full animate-spin mx-auto" />
        </div>
      </main>
    }>
      <OrderSuccessContent />
    </Suspense>
  );
}
