"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Rocket, Bell, CheckCircle, Sparkles, Package, Zap, Shield, ArrowRight, Mail, Loader2 } from 'lucide-react';

export default function ComingSoonProducts() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    setError('');

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubscribed(true);
    setIsLoading(false);
  };

  const features = [
    {
      icon: <Package size={24} />,
      title: 'Premium Quality',
      desc: 'Every product engineered with aerospace-grade materials'
    },
    {
      icon: <Zap size={24} />,
      title: 'Innovation First',
      desc: 'Cutting-edge technology that pushes boundaries'
    },
    {
      icon: <Shield size={24} />,
      title: 'Built to Last',
      desc: 'Designed for durability and long-term reliability'
    },
  ];

  const comingSoonProducts = [
    {
      name: 'The Infinite Organizer',
      category: 'Home',
      desc: 'Modular storage that adapts to your needs',
    },
    {
      name: 'Solar Pocket',
      category: 'Tech',
      desc: 'Wearable solar charger for the modern explorer',
    },
    {
      name: 'Gravity Walkers',
      category: 'Lifestyle',
      desc: 'Aerospace-engineered footwear for everyday comfort',
    },
    {
      name: 'Self-Stirring Pot',
      category: 'Kitchen',
      desc: 'Magnetic precision meets culinary innovation',
    },
  ];

  return (
    <main className="pt-[72px] md:pt-[80px] bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-neo-black text-white">
        <div className="absolute inset-0 grid-bg-dark opacity-30" />
        
        {/* Animated Background Elements */}
        <div className="absolute top-20 left-20 w-64 h-64 bg-neo-yellow/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-neo-yellow/5 rounded-full blur-3xl animate-pulse delay-1000" />
        
        <div className="container relative z-10 py-20 md:py-32">
          <div className="max-w-3xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-neo-yellow text-neo-black text-sm font-bold uppercase tracking-wider rounded-full mb-8">
              <Rocket size={18} />
              Coming Soon
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tight">
              Something<br />
              <span className="text-neo-yellow">Amazing</span> is<br />
              Brewing
            </h1>
            
            <p className="text-lg md:text-xl text-white/60 max-w-xl mx-auto mb-12">
              We&apos;re working hard to bring you innovative products that will transform your everyday life. Be the first to know when we launch.
            </p>

            {/* Notify Me Form */}
            {!isSubscribed ? (
              <form onSubmit={handleSubscribe} className="max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Mail size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-neo-black/40" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (error) setError('');
                      }}
                      placeholder="Enter your email"
                      className="w-full pl-12 pr-4 py-4 bg-white text-neo-black rounded-xl border-2 border-transparent focus:border-neo-yellow focus:outline-none transition-colors"
                      disabled={isLoading}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-8 py-4 bg-neo-yellow text-neo-black font-bold rounded-xl hover:bg-neo-yellow/90 transition-all flex items-center justify-center gap-2 disabled:opacity-60"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 size={20} className="animate-spin" />
                        Subscribing...
                      </>
                    ) : (
                      <>
                        <Bell size={20} />
                        Notify Me
                      </>
                    )}
                  </button>
                </div>
                {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
              </form>
            ) : (
              <div className="max-w-md mx-auto bg-green-500/20 border-2 border-green-500/30 rounded-xl p-6 flex items-center gap-4">
                <CheckCircle size={32} className="text-green-400 flex-shrink-0" />
                <div className="text-left">
                  <p className="font-bold text-green-400">You&apos;re on the list!</p>
                  <p className="text-sm text-green-400/70">We&apos;ll notify you as soon as our products launch.</p>
                </div>
              </div>
            )}

            <p className="text-white/40 text-sm mt-4">
              Join <span className="text-neo-yellow font-bold">2,450+</span> others waiting for the launch
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-neo-light-gray">
        <div className="container">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 bg-neo-yellow text-neo-black text-xs font-bold uppercase tracking-wider rounded mb-4">
              What to Expect
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-neo-black">
              Built for <span className="text-neo-yellow">Tomorrow</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {features.map((feature, i) => (
              <div 
                key={i}
                className="bg-white p-6 rounded-xl border-2 border-neo-black shadow-neo hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all"
              >
                <div className="w-14 h-14 bg-neo-yellow rounded-xl flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-neo-black mb-2">{feature.title}</h3>
                <p className="text-neo-black/60">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Preview Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 bg-neo-black text-neo-yellow text-xs font-bold uppercase tracking-wider rounded mb-4">
              <Sparkles size={14} className="inline mr-1" />
              Sneak Peek
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-neo-black mb-4">
              Products in Development
            </h2>
            <p className="text-neo-black/60 max-w-lg mx-auto">
              Here&apos;s a glimpse of what we&apos;re working on. Each product is being crafted with care and precision.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {comingSoonProducts.map((product, i) => (
              <div 
                key={i}
                className="group relative bg-white rounded-xl border-2 border-neo-black overflow-hidden"
              >
                {/* Placeholder Image */}
                <div className="aspect-square bg-gradient-to-br from-neo-light-gray to-neo-black/5 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-neo-black/20 to-transparent" />
                  <Package size={48} className="text-neo-black/20" />
                  <div className="absolute top-3 left-3 px-2 py-1 bg-neo-yellow text-neo-black text-xs font-bold rounded">
                    {product.category}
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-4">
                  <h3 className="font-bold text-neo-black mb-1">{product.name}</h3>
                  <p className="text-sm text-neo-black/60">{product.desc}</p>
                </div>

                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-neo-black/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="text-center text-white p-4">
                    <Sparkles size={32} className="mx-auto mb-3 text-neo-yellow" />
                    <p className="font-bold mb-1">Coming Soon</p>
                    <p className="text-sm text-white/60">Be the first to know</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-neo-black">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center text-white">
            <h2 className="text-3xl md:text-4xl font-black mb-4">
              Can&apos;t Wait?
            </h2>
            <p className="text-white/60 mb-8">
              Explore our 3D printing services while we prepare our product lineup. Create something unique with BoxPrint.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/boxprint"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-neo-yellow text-neo-black font-bold rounded-xl hover:bg-neo-yellow/90 transition-colors"
              >
                Try BoxPrint
                <ArrowRight size={18} />
              </Link>
              <Link 
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white text-white font-bold rounded-xl hover:bg-white hover:text-neo-black transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
