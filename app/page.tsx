import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ChevronDown, Box, Cpu, Zap, ArrowUpRight, Printer, Upload, Clock, Sparkles } from 'lucide-react';
import ServicesSection from '@/components/ServicesSection';
import FAQ from '@/components/FAQ';
import Newsletter from '@/components/Newsletter';

export default function Home() {
  return (
    <main className="pt-[72px] md:pt-[80px]">
      {/* Hero Section */}
      <section className="min-h-[60vh] md:min-h-[calc(100vh-80px)] flex flex-col justify-center relative overflow-hidden bg-white px-4 md:px-8">
        {/* Background */}
        <div className="absolute inset-0 dot-pattern-light opacity-40" />
        
        <div className="container relative z-10 py-8 md:py-0">
          <div className="max-w-3xl">
            {/* Status Badge */}
            <div className="inline-flex items-center gap-1.5 mb-4 md:mb-6 px-2.5 py-1 bg-neo-black text-white rounded-full text-[10px] md:text-xs font-semibold">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
              NOW SHIPPING WORLDWIDE
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] mb-4 md:mb-6 tracking-tight">
              <span className="text-neo-black">Unlock</span>
              <br />
              <span className="text-neo-yellow">Possibility</span>
            </h1>

            {/* Subheadline */}
            <p className="text-sm sm:text-base md:text-lg text-neo-black/70 max-w-lg mb-6 md:mb-8 leading-relaxed">
              Consumer-focused innovation. Hardware and software products engineered for the humans of tomorrow.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-4 mb-8 md:mb-12">
              <Link href="/products" className="neo-btn justify-center sm:justify-start text-sm md:text-base py-2.5 md:py-3">
                Explore Products
                <ArrowRight size={16} />
              </Link>
              <Link href="/about" className="neo-btn-outline justify-center sm:justify-start text-sm md:text-base py-2.5 md:py-3">
                Our Story
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-4 sm:gap-8 pt-6 border-t border-neo-black/10">
              <div>
                <span className="block text-2xl sm:text-3xl font-black text-neo-black font-mono">24+</span>
                <span className="text-[10px] sm:text-xs text-neo-black/60 font-medium uppercase tracking-wider">Products</span>
              </div>
              <div>
                <span className="block text-2xl sm:text-3xl font-black text-neo-black font-mono">10K+</span>
                <span className="text-[10px] sm:text-xs text-neo-black/60 font-medium uppercase tracking-wider">Happy Users</span>
              </div>
              <div>
                <span className="block text-2xl sm:text-3xl font-black text-neo-black font-mono">99%</span>
                <span className="text-[10px] sm:text-xs text-neo-black/60 font-medium uppercase tracking-wider">Satisfaction</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-1">
          <span className="text-[10px] font-mono text-neo-black/40 uppercase tracking-widest">Scroll</span>
          <ChevronDown size={18} className="text-neo-black/40 animate-bounce" />
        </div>
      </section>

      {/* BoxPrint CTA Section - Compact & Mobile Optimized */}
      <section className="py-10 md:py-16 bg-neo-black relative overflow-hidden">
        {/* Subtle Background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-1/4 w-32 h-32 bg-neo-yellow rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-neo-yellow rounded-full blur-3xl" />
        </div>
        
        <div className="container relative z-10 px-5">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 bg-neo-yellow/10 border border-neo-yellow/20 text-neo-yellow rounded-full font-bold text-xs">
              <Sparkles size={14} />
              NEW SERVICE
            </div>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-3 tracking-tight">
              Need <span className="text-neo-yellow">3D Printing?</span>
            </h2>
            
            <p className="text-white/60 text-sm md:text-base mb-6 max-w-md mx-auto">
              Upload your model, get instant quotes, and receive professional-quality prints at your doorstep.
            </p>

            {/* Features - Horizontal on all screens */}
            <div className="flex justify-center gap-3 sm:gap-6 mb-6 flex-wrap">
              {[
                { icon: Upload, label: 'Upload STL/OBJ' },
                { icon: Printer, label: 'Instant Quote' },
                { icon: Clock, label: '48hr Dispatch' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-white/70">
                  <item.icon size={16} className="text-neo-yellow" />
                  <span className="text-xs sm:text-sm font-medium">{item.label}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <Link 
              href="/boxprint" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-neo-yellow text-neo-black font-bold text-sm md:text-base rounded-xl hover:bg-yellow-400 transition-all hover:scale-105"
            >
              <Printer size={18} />
              Get Your Quote
              <ArrowRight size={16} />
            </Link>
            
            {/* Price hint */}
            <p className="mt-4 text-xs text-white/40">Starting from ₹199 • Quality Guaranteed</p>
          </div>
        </div>
      </section>

      {/* Feature Ticker */}
      <div className="bg-neo-yellow py-3 overflow-hidden">
        <div className="animate-marquee flex gap-8">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-8 items-center whitespace-nowrap">
              {['INNOVATIVE DESIGN', 'PRECISION ENGINEERING', 'SUSTAINABLE MATERIALS', 'FUTURE-READY', 'HUMAN-CENTERED', 'MODULAR SYSTEMS'].map((text, index) => (
                <div key={index} className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-neo-black uppercase tracking-wide">
                    {text}
                  </span>
                  <Box size={14} className="text-neo-black" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Services Section */}
      <ServicesSection />

      {/* Featured Product Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <div>
              <span className="inline-block px-3 py-1 bg-neo-yellow text-neo-black text-xs font-bold uppercase tracking-wider rounded mb-3 border-2 border-neo-black">
                Featured
              </span>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight">
                Latest <span className="text-neo-yellow">Drop</span>
              </h2>
            </div>
            <Link href="/products" className="inline-flex items-center gap-2 text-neo-black font-semibold hover:text-neo-yellow transition-colors text-sm">
              View All Products
              <ArrowUpRight size={16} />
            </Link>
          </div>

          {/* Featured Product Card */}
          <div className="border-2 border-neo-black rounded-xl overflow-hidden grid grid-cols-1 lg:grid-cols-2">
            {/* Product Info */}
            <div className="p-6 md:p-10 flex flex-col justify-center order-2 lg:order-1">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="px-2.5 py-1 bg-neo-yellow text-neo-black text-xs font-bold uppercase rounded border border-neo-black">New</span>
                <span className="px-2.5 py-1 bg-neo-black text-white text-xs font-bold uppercase rounded">Limited</span>
              </div>
              
              <h3 className="text-2xl md:text-3xl font-black mb-4 tracking-tight">
                The Infinite<br />
                <span className="text-neo-yellow">Organizer</span>
              </h3>
              
              <p className="text-neo-black/70 mb-6 leading-relaxed text-sm md:text-base">
                A modular storage system that adapts to your life. Expand, contract, reconfigure. 
                Built with precision-engineered components for infinite possibilities.
              </p>

              {/* Product Specs */}
              <div className="grid grid-cols-3 gap-3 mb-8 p-4 bg-neo-light-gray rounded-lg">
                <div className="text-center">
                  <span className="block text-xl font-mono font-bold text-neo-black">12</span>
                  <span className="text-[10px] text-neo-black/60 uppercase tracking-wider">Modules</span>
                </div>
                <div className="text-center border-x border-neo-black/10">
                  <span className="block text-xl font-mono font-bold text-neo-black">∞</span>
                  <span className="text-[10px] text-neo-black/60 uppercase tracking-wider">Configs</span>
                </div>
                <div className="text-center">
                  <span className="block text-xl font-mono font-bold text-neo-black">100%</span>
                  <span className="text-[10px] text-neo-black/60 uppercase tracking-wider">Recycled</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <Link href="/products" className="neo-btn">
                  Shop Now
                  <ArrowRight size={18} />
                </Link>
                <div>
                  <span className="block text-2xl font-black text-neo-black">$149</span>
                  <span className="text-sm text-neo-black/50 line-through">$199</span>
                </div>
              </div>
            </div>

            {/* Product Image */}
            <div className="relative min-h-[280px] md:min-h-[400px] bg-neo-yellow order-1 lg:order-2 lg:border-l-2 border-b-2 lg:border-b-0 border-neo-black">
              <Image 
                src="https://images.unsplash.com/photo-1580910051074-3eb6948d3ea4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="The Infinite Organizer" 
                fill
                className="object-cover mix-blend-multiply"
                priority
              />
              
              {/* Floating Labels */}
              <div className="absolute top-4 left-4 px-3 py-1.5 bg-white border border-neo-black rounded-lg font-mono text-xs">
                SKU: INF-ORG-001
              </div>
              
              <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-neo-black text-white rounded-lg font-mono text-xs">
                <span className="text-green-400">●</span> In Stock
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why BoxPox Section */}
      <section className="py-16 md:py-24 bg-neo-black text-white">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center mb-12">
            <span className="inline-block px-3 py-1 bg-neo-yellow text-neo-black text-xs font-bold uppercase tracking-wider rounded mb-4">
              Why Us
            </span>
            <h2 className="text-3xl md:text-4xl font-black mb-4 tracking-tight">
              Built Different.<br />
              <span className="text-neo-yellow">By Design.</span>
            </h2>
            <p className="text-white/60 text-sm md:text-base">
              Every product we create solves a real problem with thoughtful engineering and timeless design.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {[
              {
                icon: <Cpu size={28} />,
                title: "Precision Engineered",
                desc: "Every component is designed to micron-level accuracy for perfect fit and function."
              },
              {
                icon: <Box size={28} />,
                title: "Modular by Nature",
                desc: "Systems that grow with you. Upgrade, expand, and customize without waste."
              },
              {
                icon: <Zap size={28} />,
                title: "Future-Ready",
                desc: "Built with tomorrow in mind. Firmware updates and new modules keep you ahead."
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="p-6 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors"
              >
                <div className="w-12 h-12 bg-neo-yellow rounded-lg flex items-center justify-center text-neo-black mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold mb-2 text-white">{feature.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ />

      {/* Newsletter Section */}
      <Newsletter />
    </main>
  );
}