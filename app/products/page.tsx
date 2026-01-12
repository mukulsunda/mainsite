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
    <main className="bg-neo-black min-h-screen pt-16 lg:pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-12 lg:section-padding">
        <div className="dot-pattern-animated" />
        
        {/* Animated Background Elements */}
        <div className="absolute top-20 left-10 md:left-20 w-40 md:w-64 h-40 md:h-64 bg-neo-yellow/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 md:right-20 w-52 md:w-80 h-52 md:h-80 bg-neo-yellow/5 rounded-full blur-3xl animate-pulse delay-1000" />
        
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            {/* Badge */}
            <div className="section-label inline-flex items-center gap-2 mb-5 lg:mb-8">
              <Rocket size={14} className="lg:hidden" />
              <Rocket size={16} className="hidden lg:block" />
              Coming Soon
            </div>
            
            <h1 className="text-[32px] sm:text-4xl md:text-6xl lg:text-7xl font-black mb-4 lg:mb-6 tracking-tight leading-[0.95]">
              Something<br />
              <span className="text-neo-yellow">Amazing</span> is<br />
              Brewing
            </h1>
            
            <p className="text-sm sm:text-base md:text-xl text-white/60 max-w-xl mx-auto mb-8 lg:mb-12 px-2">
              We&apos;re working hard to bring you innovative products that will transform your everyday life. Be the first to know when we launch.
            </p>

            {/* Notify Me Form */}
            {!isSubscribed ? (
              <form onSubmit={handleSubscribe} className="max-w-md mx-auto">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
                    <input
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (error) setError('');
                      }}
                      placeholder="Enter your email"
                      className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-full text-white placeholder:text-white/40 focus:outline-none focus:border-neo-yellow transition-colors"
                      disabled={isLoading}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="robot-btn"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        <span className="hidden sm:inline">Subscribing...</span>
                      </>
                    ) : (
                      <>
                        <Bell size={18} />
                        Notify Me
                      </>
                    )}
                  </button>
                </div>
                {error && <p className="text-red-400 text-sm mt-3">{error}</p>}
              </form>
            ) : (
              <div className="max-w-md mx-auto bg-green-500/10 border border-green-500/30 rounded-2xl p-5 flex items-center gap-4">
                <CheckCircle size={28} className="text-green-400 flex-shrink-0" />
                <div className="text-left">
                  <p className="font-bold text-green-400">You&apos;re on the list!</p>
                  <p className="text-sm text-green-400/70">We&apos;ll notify you as soon as our products launch.</p>
                </div>
              </div>
            )}

            <p className="text-white/40 text-sm mt-6">
              Join <span className="text-neo-yellow font-bold">2,450+</span> others waiting for the launch
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-neo-gray">
        <div className="container">
          <div className="text-center mb-12">
            <span className="section-label mb-4">What to Expect</span>
            <h2 className="text-3xl md:text-5xl font-black">
              Built for <span className="text-neo-yellow">Tomorrow</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {features.map((feature, i) => (
              <div 
                key={i}
                className="feature-card p-6 md:p-8"
              >
                <div className="w-14 h-14 bg-neo-yellow rounded-2xl flex items-center justify-center mb-5 text-neo-black">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-white/60">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Preview Section */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center mb-12">
            <span className="section-label mb-4">
              <Sparkles size={14} className="inline mr-1.5" />
              Sneak Peek
            </span>
            <h2 className="text-3xl md:text-5xl font-black mb-4">
              Products in Development
            </h2>
            <p className="text-white/60 max-w-lg mx-auto">
              Here&apos;s a glimpse of what we&apos;re working on. Each product is being crafted with care and precision.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
            {comingSoonProducts.map((product, i) => (
              <div 
                key={i}
                className="group relative robot-card overflow-hidden"
              >
                {/* Placeholder Image */}
                <div className="aspect-square bg-gradient-to-br from-white/5 to-white/0 flex items-center justify-center relative overflow-hidden">
                  <Package size={48} className="text-white/10" />
                  <div className="absolute top-3 left-3 px-2.5 py-1 bg-neo-yellow text-neo-black text-xs font-bold rounded-full">
                    {product.category}
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-4">
                  <h3 className="font-bold mb-1 truncate">{product.name}</h3>
                  <p className="text-sm text-white/50 line-clamp-2">{product.desc}</p>
                </div>

                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-neo-yellow/95 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="text-center text-neo-black p-4">
                    <Sparkles size={32} className="mx-auto mb-3" />
                    <p className="font-bold mb-1">Coming Soon</p>
                    <p className="text-sm text-neo-black/60">Be the first to know</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-neo-gray relative overflow-hidden">
        <div className="grid-pattern" />
        <div className="container relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-black mb-4">
              Can&apos;t Wait?
            </h2>
            <p className="text-white/60 mb-8 text-lg">
              Explore our 3D printing services while we prepare our product lineup. Create something unique with BoxPrint.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/boxprint" className="robot-btn">
                Try BoxPrint
                <ArrowRight size={18} />
              </Link>
              <Link href="/contact" className="robot-btn-outline">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
