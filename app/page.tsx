import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ArrowUpRight, Printer, Upload, Clock, Sparkles, CheckCircle, Cpu, Box, Zap } from 'lucide-react';
import FAQ from '@/components/FAQ';
import Newsletter from '@/components/Newsletter';

export default function Home() {
  const stats = [
    { number: '10K+', label: 'Happy Customers' },
    { number: '50+', label: 'Countries Served' },
    { number: '99%', label: 'Satisfaction Rate' },
    { number: '48hr', label: 'Avg. Turnaround' },
  ];

  const trustedBy = ['TechCorp', 'InnovateLab', 'DesignStudio', 'BuildCo', 'PrintPro'];

  const services = [
    {
      icon: <Cpu size={28} />,
      title: "Precision Engineering",
      desc: "Micron-level accuracy on every print. Industrial-grade quality delivered to your doorstep.",
      number: "01"
    },
    {
      icon: <Box size={28} />,
      title: "Multi-Material Support",
      desc: "From PLA to carbon fiber composites. Choose the perfect material for your project.",
      number: "02"
    },
    {
      icon: <Zap size={28} />,
      title: "Rapid Prototyping",
      desc: "From concept to physical model in hours, not weeks. Accelerate your development cycle.",
      number: "03"
    }
  ];

  return (
    <main className="bg-neo-black">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center relative overflow-hidden pt-20">
        {/* Background Elements */}
        <div className="absolute inset-0 dot-pattern-animated opacity-20" />
        <div className="absolute top-1/4 -left-40 w-96 h-96 bg-neo-yellow/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-neo-yellow/5 rounded-full blur-[120px]" />
        
        <div className="container relative z-10 py-20">
          {/* Status Badge */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-white/5 border border-white/10 rounded-full">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
              </span>
              <span className="text-white/70 text-sm font-medium">Now Shipping Pan-India</span>
            </div>
          </div>

          {/* Main Headline */}
          <div className="text-center max-w-5xl mx-auto mb-12">
            <h1 className="text-5xl md:text-7xl lg:text-8xl xl:text-[120px] font-black leading-[0.9] tracking-tight mb-8">
              <span className="text-white block">Ideas into</span>
              <span className="text-neo-yellow block">Reality.</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/60 max-w-2xl mx-auto leading-relaxed">
              Professional 3D printing services that transform your designs into precision-crafted physical products.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
            <Link href="/boxprint" className="robot-btn text-lg px-10 py-5">
              Get Instant Quote
              <ArrowRight size={20} />
            </Link>
            <Link href="/products" className="robot-btn-outline text-lg px-10 py-5">
              Browse Products
            </Link>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-4xl mx-auto">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <span className="stat-number block">{stat.number}</span>
                <span className="stat-label block">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
          <span className="text-xs text-white/40 uppercase tracking-widest">Scroll</span>
          <div className="scroll-indicator">
            <div className="scroll-dot" />
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-16 border-y border-white/10">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
            <span className="text-white/40 text-sm uppercase tracking-wider">Trusted by</span>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
              {trustedBy.map((company, i) => (
                <span key={i} className="text-white/30 font-semibold text-lg hover:text-white/50 transition-colors">
                  {company}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BoxPrint CTA Section */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern" />
        
        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left - Content */}
            <div>
              <span className="section-label">
                <Sparkles size={14} />
                3D PRINTING SERVICE
              </span>
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-[0.95]">
                Bring your<br />
                <span className="text-neo-yellow">ideas</span> to life
              </h2>
              
              <p className="text-white/60 text-lg md:text-xl mb-10 leading-relaxed max-w-lg">
                Upload your 3D model, choose your material, and we&apos;ll deliver precision-crafted prints right to your doorstep.
              </p>

              {/* Features List */}
              <div className="space-y-4 mb-10">
                {[
                  { icon: Upload, text: 'Upload STL, OBJ, or GLTF files' },
                  { icon: Sparkles, text: 'Get instant pricing in seconds' },
                  { icon: Clock, text: '48-hour dispatch guarantee' },
                  { icon: CheckCircle, text: 'Quality guaranteed or money back' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-neo-yellow/10 flex items-center justify-center">
                      <item.icon size={18} className="text-neo-yellow" />
                    </div>
                    <span className="text-white/70">{item.text}</span>
                  </div>
                ))}
              </div>

              <Link href="/boxprint" className="robot-btn">
                <Printer size={20} />
                Start Your Project
                <ArrowRight size={18} />
              </Link>
            </div>

            {/* Right - Visual */}
            <div className="relative">
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-neo-gray to-neo-black border border-white/10 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 dot-pattern-animated opacity-20" />
                <div className="relative z-10 text-center p-8">
                  <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-neo-yellow flex items-center justify-center animate-float">
                    <Printer size={56} className="text-neo-black" />
                  </div>
                  <p className="text-white font-bold text-2xl mb-2">Starting from</p>
                  <p className="text-neo-yellow font-black text-5xl mb-2">₹199</p>
                  <p className="text-white/50">Quality Guaranteed</p>
                </div>
              </div>
              
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -right-6 px-6 py-4 bg-neo-yellow rounded-2xl shadow-lg glow-yellow">
                <p className="text-neo-black font-bold text-lg">Free Shipping</p>
                <p className="text-neo-black/70 text-sm">On orders ₹500+</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding bg-neo-gray/50">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="section-label">
              <Cpu size={14} />
              HOW WE BUILD
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6">
              Engineered for<br />
              <span className="text-neo-yellow">excellence</span>
            </h2>
            <p className="text-white/60 text-lg">
              Every print is crafted with precision, passion, and the latest technology.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <div key={i} className="feature-card">
                <div className="absolute top-6 right-6 text-5xl font-black text-white/5">
                  {service.number}
                </div>
                <div className="w-14 h-14 rounded-2xl bg-neo-yellow flex items-center justify-center text-neo-black mb-6">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                <p className="text-white/60 leading-relaxed">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Product Section */}
      <section className="section-padding">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <span className="section-label">
                <Sparkles size={14} />
                FEATURED
              </span>
              <h2 className="text-4xl md:text-5xl font-black">
                Latest <span className="text-neo-yellow">Drop</span>
              </h2>
            </div>
            <Link href="/products" className="robot-btn-outline py-3 px-6">
              View All Products
              <ArrowUpRight size={18} />
            </Link>
          </div>

          {/* Product Card */}
          <div className="grid lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden bg-neo-gray border border-white/10">
            {/* Image */}
            <div className="relative aspect-[4/3] lg:aspect-auto bg-gradient-to-br from-neo-yellow via-yellow-400 to-neo-yellow">
              <Image 
                src="https://images.unsplash.com/photo-1580910051074-3eb6948d3ea4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="The Infinite Organizer" 
                fill
                className="object-cover mix-blend-multiply"
                priority
              />
              <div className="absolute top-6 left-6 robot-badge">New</div>
              <div className="absolute bottom-6 right-6 px-4 py-2 bg-neo-black/90 backdrop-blur-sm rounded-full text-white text-sm font-medium flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                In Stock
              </div>
            </div>
            
            {/* Content */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-4">
                <span className="robot-badge">New</span>
                <span className="robot-badge-outline">Limited Edition</span>
              </div>
              
              <h3 className="text-3xl md:text-4xl font-black mb-4">
                The Infinite<br />
                <span className="text-neo-yellow">Organizer</span>
              </h3>
              
              <p className="text-white/60 mb-8 leading-relaxed text-lg">
                A modular storage system that adapts to your life. Expand, contract, reconfigure. Built with precision-engineered components.
              </p>

              {/* Specs */}
              <div className="grid grid-cols-3 gap-4 mb-8 p-6 bg-white/5 rounded-2xl">
                <div className="text-center">
                  <span className="block text-3xl font-black text-white">12</span>
                  <span className="text-xs text-white/50 uppercase">Modules</span>
                </div>
                <div className="text-center border-x border-white/10">
                  <span className="block text-3xl font-black text-neo-yellow">∞</span>
                  <span className="text-xs text-white/50 uppercase">Configs</span>
                </div>
                <div className="text-center">
                  <span className="block text-3xl font-black text-green-400">100%</span>
                  <span className="text-xs text-white/50 uppercase">Recycled</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <Link href="/products" className="robot-btn">
                  Shop Now
                  <ArrowRight size={18} />
                </Link>
                <div>
                  <span className="text-3xl font-black text-white">$149</span>
                  <span className="text-lg text-white/40 line-through ml-2">$199</span>
                  <span className="text-green-400 text-sm font-bold ml-2">25% OFF</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why BoxPox Section */}
      <section className="section-padding bg-neo-gray/30 relative overflow-hidden">
        <div className="absolute inset-0 dot-pattern-animated opacity-10" />
        
        <div className="container relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <span className="section-label">
              <Sparkles size={14} />
              WHY BOXPOX
            </span>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black mb-8 leading-[0.95]">
              Built different.<br />
              <span className="text-neo-yellow">By design.</span>
            </h2>
            <p className="text-white/60 text-xl mb-16 max-w-2xl mx-auto">
              Every product we create solves a real problem with thoughtful engineering and timeless design.
            </p>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <Cpu size={32} />,
                title: "Precision Engineered",
                desc: "Micron-level accuracy for perfect fit and function every time."
              },
              {
                icon: <Box size={32} />,
                title: "Modular by Nature",
                desc: "Systems that grow with you. Upgrade and customize without waste."
              },
              {
                icon: <Zap size={32} />,
                title: "Future-Ready",
                desc: "Built with tomorrow in mind. Updates keep you ahead of the curve."
              }
            ].map((feature, i) => (
              <div 
                key={i} 
                className={`p-8 rounded-3xl transition-all ${
                  i === 1 
                    ? 'bg-neo-yellow text-neo-black' 
                    : 'bg-white/5 border border-white/10 hover:bg-white/10'
                }`}
              >
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${
                  i === 1 ? 'bg-neo-black text-neo-yellow' : 'bg-neo-yellow text-neo-black'
                }`}>
                  {feature.icon}
                </div>
                <h3 className={`text-xl font-bold mb-3 ${i === 1 ? 'text-neo-black' : 'text-white'}`}>
                  {feature.title}
                </h3>
                <p className={i === 1 ? 'text-neo-black/70' : 'text-white/60'}>
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