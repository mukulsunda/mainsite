import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Box, Cpu, Zap, ArrowUpRight, Printer, Upload, Clock, Sparkles, Star, Shield, Truck, CheckCircle } from 'lucide-react';
import ServicesSection from '@/components/ServicesSection';
import FAQ from '@/components/FAQ';
import Newsletter from '@/components/Newsletter';

export default function Home() {
  return (
    <main className="pt-[72px] md:pt-[80px]">
      {/* Hero Section - Enhanced with gradient and animated elements */}
      <section className="min-h-[70vh] md:min-h-[calc(100vh-80px)] flex flex-col justify-center relative overflow-hidden bg-gradient-to-br from-white via-neo-light-gray/30 to-white px-4 md:px-8">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-neo-yellow/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-neo-yellow/10 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-neo-yellow/5 to-transparent rounded-full" />
        </div>
        <div className="absolute inset-0 dot-pattern-light opacity-30" />
        
        <div className="container relative z-10 py-8 md:py-0">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Text Content */}
            <div className="max-w-xl">
              {/* Status Badge */}
              <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-neo-black text-white rounded-full text-xs font-semibold shadow-lg">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                NOW SHIPPING WORLDWIDE
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] mb-6 tracking-tight">
                <span className="text-neo-black block">Unlock</span>
                <span className="text-neo-yellow relative inline-block">
                  Possibility
                  <svg className="absolute -bottom-2 left-0 w-full h-3 text-neo-yellow/30" viewBox="0 0 200 12" preserveAspectRatio="none">
                    <path d="M0,6 Q50,0 100,6 T200,6" fill="none" stroke="currentColor" strokeWidth="4"/>
                  </svg>
                </span>
              </h1>

              {/* Subheadline */}
              <p className="text-base sm:text-lg md:text-xl text-neo-black/70 mb-8 leading-relaxed">
                Consumer-focused innovation. Hardware and software products engineered for the <span className="font-semibold text-neo-black">humans of tomorrow</span>.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mb-10">
                <Link href="/products" className="group neo-btn justify-center sm:justify-start text-base py-3.5 px-6 shadow-xl hover:shadow-2xl transition-all">
                  Explore Products
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/about" className="neo-btn-outline justify-center sm:justify-start text-base py-3.5 px-6 hover:bg-neo-black hover:text-white transition-all">
                  Our Story
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-neo-black/10">
                <div className="flex items-center gap-2 text-sm text-neo-black/60">
                  <Shield size={16} className="text-green-600" />
                  <span>Secure Payments</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-neo-black/60">
                  <Truck size={16} className="text-neo-yellow" />
                  <span>Free Shipping 500+</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-neo-black/60">
                  <Star size={16} className="text-yellow-500 fill-yellow-500" />
                  <span>4.9/5 Rating</span>
                </div>
              </div>
            </div>

            {/* Stats Cards - Right Side */}
            <div className="hidden lg:grid grid-cols-2 gap-4">
              {[
                { value: '24+', label: 'Products', desc: 'Across categories' },
                { value: '10K+', label: 'Happy Users', desc: 'Worldwide' },
                { value: '99%', label: 'Satisfaction', desc: 'Customer rating' },
                { value: '48hr', label: 'Dispatch', desc: 'Fast shipping' },
              ].map((stat, i) => (
                <div key={i} className="p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-neo-black/5 shadow-lg hover:shadow-xl transition-shadow">
                  <span className="block text-3xl font-black text-neo-black font-mono mb-1">{stat.value}</span>
                  <span className="block text-sm font-bold text-neo-black mb-0.5">{stat.label}</span>
                  <span className="text-xs text-neo-black/50">{stat.desc}</span>
                </div>
              ))}
            </div>

            {/* Mobile Stats */}
            <div className="lg:hidden flex flex-wrap gap-6 pt-4">
              {[
                { value: '24+', label: 'Products' },
                { value: '10K+', label: 'Happy Users' },
                { value: '99%', label: 'Satisfaction' },
              ].map((stat, i) => (
                <div key={i}>
                  <span className="block text-2xl font-black text-neo-black font-mono">{stat.value}</span>
                  <span className="text-xs text-neo-black/60 font-medium uppercase tracking-wider">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2">
          <span className="text-xs font-medium text-neo-black/40 uppercase tracking-widest">Discover</span>
          <div className="w-6 h-10 rounded-full border-2 border-neo-black/20 flex justify-center pt-2">
            <div className="w-1.5 h-3 bg-neo-black/40 rounded-full animate-bounce" />
          </div>
        </div>
      </section>

      {/* BoxPrint CTA Section - Premium Design */}
      <section className="py-12 md:py-20 bg-neo-black relative overflow-hidden">
        {/* Enhanced Background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neo-yellow/10 via-transparent to-transparent" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-neo-yellow/5 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-0 w-64 h-64 bg-neo-accent/5 rounded-full blur-3xl" />
        </div>
        
        <div className="container relative z-10 px-5">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              {/* Left - Content */}
              <div className="text-center md:text-left">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 mb-5 px-4 py-2 bg-gradient-to-r from-neo-yellow/20 to-neo-yellow/10 border border-neo-yellow/30 text-neo-yellow rounded-full font-bold text-sm">
                  <Sparkles size={16} />
                  3D PRINTING SERVICE
                </div>
                
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 tracking-tight leading-tight">
                  Bring Your <span className="text-neo-yellow">Ideas</span> to Life
                </h2>
                
                <p className="text-white/60 text-base md:text-lg mb-8 leading-relaxed">
                  Professional-grade 3D printing at your fingertips. Upload, customize, and receive precision prints at your doorstep.
                </p>

                {/* CTA Button */}
                <Link 
                  href="/boxprint" 
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-neo-yellow text-neo-black font-bold text-base md:text-lg rounded-xl hover:bg-yellow-400 transition-all hover:scale-105 shadow-lg shadow-neo-yellow/20"
                >
                  <Printer size={22} />
                  Get Instant Quote
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                
                {/* Price hint */}
                <p className="mt-4 text-sm text-white/40 flex items-center justify-center md:justify-start gap-2">
                  <CheckCircle size={14} className="text-green-400" />
                  Starting from ₹199 • Quality Guaranteed
                </p>
              </div>

              {/* Right - Features */}
              <div className="space-y-4">
                {[
                  { icon: Upload, label: 'Upload Your Model', desc: 'STL, OBJ, GLTF supported' },
                  { icon: Sparkles, label: 'Instant Pricing', desc: 'Transparent quote in seconds' },
                  { icon: Clock, label: 'Fast Turnaround', desc: '48-hour dispatch guarantee' },
                  { icon: Truck, label: 'Pan-India Delivery', desc: 'Free shipping over ₹500' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                    <div className="w-12 h-12 bg-neo-yellow/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <item.icon size={22} className="text-neo-yellow" />
                    </div>
                    <div>
                      <span className="block text-white font-semibold text-sm md:text-base">{item.label}</span>
                      <span className="text-white/50 text-xs md:text-sm">{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Ticker - Enhanced */}
      <div className="bg-neo-yellow py-4 overflow-hidden">
        <div className="animate-marquee flex gap-12">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-12 items-center whitespace-nowrap">
              {['INNOVATIVE DESIGN', 'PRECISION ENGINEERING', 'SUSTAINABLE MATERIALS', 'FUTURE-READY', 'HUMAN-CENTERED', 'MODULAR SYSTEMS'].map((text, index) => (
                <div key={index} className="flex items-center gap-4">
                  <span className="text-sm md:text-base font-bold text-neo-black uppercase tracking-wide">
                    {text}
                  </span>
                  <div className="w-2 h-2 bg-neo-black rounded-full" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Services Section */}
      <ServicesSection />

      {/* Featured Product Section - Enhanced */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-neo-light-gray/50">
        <div className="container">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-neo-yellow text-neo-black text-xs font-bold uppercase tracking-wider rounded-full mb-4 border-2 border-neo-black shadow-md">
                <Star size={12} className="fill-neo-black" />
                Featured
              </span>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight">
                Latest <span className="text-neo-yellow">Drop</span>
              </h2>
            </div>
            <Link href="/products" className="group inline-flex items-center gap-2 text-neo-black font-semibold hover:text-neo-yellow transition-colors text-sm bg-neo-light-gray px-4 py-2 rounded-full">
              View All Products
              <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>

          {/* Featured Product Card - Enhanced */}
          <div className="border-2 border-neo-black rounded-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 shadow-2xl">
            {/* Product Info */}
            <div className="p-8 md:p-12 flex flex-col justify-center order-2 lg:order-1 bg-white">
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <span className="px-3 py-1.5 bg-neo-yellow text-neo-black text-xs font-bold uppercase rounded-full border border-neo-black">New</span>
                <span className="px-3 py-1.5 bg-neo-black text-white text-xs font-bold uppercase rounded-full">Limited Edition</span>
              </div>
              
              <h3 className="text-3xl md:text-4xl font-black mb-5 tracking-tight leading-tight">
                The Infinite<br />
                <span className="text-neo-yellow">Organizer</span>
              </h3>
              
              <p className="text-neo-black/70 mb-8 leading-relaxed text-base md:text-lg">
                A modular storage system that adapts to your life. Expand, contract, reconfigure. 
                Built with precision-engineered components for infinite possibilities.
              </p>

              {/* Product Specs - Enhanced */}
              <div className="grid grid-cols-3 gap-4 mb-8 p-5 bg-gradient-to-r from-neo-light-gray to-white rounded-xl border border-neo-black/5">
                <div className="text-center">
                  <span className="block text-2xl md:text-3xl font-mono font-black text-neo-black">12</span>
                  <span className="text-xs text-neo-black/60 uppercase tracking-wider font-medium">Modules</span>
                </div>
                <div className="text-center border-x border-neo-black/10">
                  <span className="block text-2xl md:text-3xl font-mono font-black text-neo-yellow">∞</span>
                  <span className="text-xs text-neo-black/60 uppercase tracking-wider font-medium">Configs</span>
                </div>
                <div className="text-center">
                  <span className="block text-2xl md:text-3xl font-mono font-black text-green-600">100%</span>
                  <span className="text-xs text-neo-black/60 uppercase tracking-wider font-medium">Recycled</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                <Link href="/products" className="group neo-btn shadow-lg hover:shadow-xl">
                  Shop Now
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <div>
                  <span className="block text-3xl font-black text-neo-black">$149</span>
                  <span className="text-sm text-neo-black/50 line-through">$199</span>
                  <span className="ml-2 text-xs text-green-600 font-bold">25% OFF</span>
                </div>
              </div>
            </div>

            {/* Product Image */}
            <div className="relative min-h-[320px] md:min-h-[450px] bg-gradient-to-br from-neo-yellow via-yellow-300 to-neo-yellow order-1 lg:order-2 lg:border-l-2 border-b-2 lg:border-b-0 border-neo-black">
              <Image 
                src="https://images.unsplash.com/photo-1580910051074-3eb6948d3ea4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="The Infinite Organizer" 
                fill
                className="object-cover mix-blend-multiply"
                priority
              />
              
              {/* Floating Labels - Enhanced */}
              <div className="absolute top-4 left-4 px-4 py-2 bg-white/95 backdrop-blur-sm border border-neo-black rounded-xl font-mono text-xs shadow-lg">
                SKU: INF-ORG-001
              </div>
              
              <div className="absolute bottom-4 right-4 px-4 py-2 bg-neo-black text-white rounded-xl font-mono text-sm flex items-center gap-2 shadow-lg">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                In Stock
              </div>

              {/* Decorative badge */}
              <div className="absolute top-4 right-4 w-16 h-16 bg-neo-black text-white rounded-full flex flex-col items-center justify-center shadow-lg">
                <span className="text-lg font-black">25%</span>
                <span className="text-[8px] uppercase tracking-wider">OFF</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why BoxPox Section - Enhanced */}
      <section className="py-16 md:py-24 bg-neo-black text-white relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-neo-yellow/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-neo-accent/5 rounded-full blur-3xl" />
        </div>

        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-neo-yellow text-neo-black text-xs font-bold uppercase tracking-wider rounded-full mb-6 shadow-lg">
              <Sparkles size={14} />
              Why Us
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight leading-tight">
              Built Different.<br />
              <span className="text-neo-yellow">By Design.</span>
            </h2>
            <p className="text-white/60 text-base md:text-lg max-w-xl mx-auto">
              Every product we create solves a real problem with thoughtful engineering and timeless design.
            </p>
          </div>

          {/* Features Grid - Enhanced */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <Cpu size={32} />,
                title: "Precision Engineered",
                desc: "Every component is designed to micron-level accuracy for perfect fit and function.",
                highlight: false
              },
              {
                icon: <Box size={32} />,
                title: "Modular by Nature",
                desc: "Systems that grow with you. Upgrade, expand, and customize without waste.",
                highlight: true
              },
              {
                icon: <Zap size={32} />,
                title: "Future-Ready",
                desc: "Built with tomorrow in mind. Firmware updates and new modules keep you ahead.",
                highlight: false
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className={`p-8 rounded-2xl border transition-all hover:scale-105 ${
                  feature.highlight 
                    ? 'bg-neo-yellow text-neo-black border-neo-yellow shadow-xl shadow-neo-yellow/20' 
                    : 'bg-white/5 border-white/10 hover:bg-white/10'
                }`}
              >
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${
                  feature.highlight ? 'bg-neo-black text-neo-yellow' : 'bg-neo-yellow text-neo-black'
                }`}>
                  {feature.icon}
                </div>
                <h3 className={`text-xl font-bold mb-3 ${feature.highlight ? 'text-neo-black' : 'text-white'}`}>
                  {feature.title}
                </h3>
                <p className={`leading-relaxed ${feature.highlight ? 'text-neo-black/70' : 'text-white/60'}`}>
                  {feature.desc}
                </p>
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