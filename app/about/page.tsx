import Image from 'next/image';
import Link from 'next/link';
import { Target, Lightbulb, Cpu, Globe, Award, ArrowRight, ArrowUpRight } from 'lucide-react';

export default function About() {
  const values = [
    {
      icon: <Target size={24} />,
      title: "Purpose-Driven",
      desc: "Every product solves a real problem. No gimmicks, just thoughtful innovation."
    },
    {
      icon: <Cpu size={24} />,
      title: "Precision Built",
      desc: "Micron-level accuracy in every component. Built to last, designed to perform."
    },
    {
      icon: <Globe size={24} />,
      title: "Globally Minded",
      desc: "Products designed for humans everywhere. Inclusive, accessible, universal."
    },
    {
      icon: <Lightbulb size={24} />,
      title: "Future-Ready",
      desc: "Modular by design. Update, upgrade, evolve without waste."
    }
  ];

  const team = [
    {
      name: "Alex Morgan",
      role: "Chief Executive Officer",
      img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "Sarah Jenkins",
      role: "Head of Product",
      img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    {
      name: "Michael Chen",
      role: "Lead Engineer",
      img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    }
  ];

  const milestones = [
    { year: "2020", title: "Founded", desc: "BoxPox started in a small garage with a big vision." },
    { year: "2021", title: "First Product", desc: "The Infinite Organizer launched to critical acclaim." },
    { year: "2023", title: "Global Expansion", desc: "Now shipping to 50+ countries worldwide." },
    { year: "2025", title: "10K+ Customers", desc: "Building a community of innovators." },
  ];

  return (
    <main className="pt-[72px] md:pt-[80px] bg-white min-h-screen">
      {/* Page Header */}
      <section className="relative overflow-hidden bg-neo-black text-white">
        <div className="absolute inset-0 grid-bg-dark opacity-30" />
        
        <div className="container relative z-10 py-10 md:py-16 px-4">
          <div className="max-w-2xl">
            <span className="inline-block px-3 py-1 bg-neo-yellow text-neo-black text-xs font-bold uppercase tracking-wider rounded mb-3 md:mb-4">
              About Us
            </span>
            <h1 className="text-3xl md:text-5xl font-black mb-3 md:mb-4 tracking-tight">
              The Box of<br />
              <span className="text-neo-yellow">Possibility</span>
            </h1>
            <p className="text-sm md:text-lg text-white/60 max-w-lg leading-relaxed">
              We&apos;re a team of engineers, designers, and dreamers building the products we wish existed.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-10 md:py-24 bg-white">
        <div className="container px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Image */}
            <div className="relative">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-neo-black/20">
                <Image 
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Our Team" 
                  fill
                  className="object-cover"
                />
              </div>
              {/* Floating Card */}
              <div className="absolute -bottom-4 right-2 md:-bottom-6 md:-right-6 bg-neo-yellow rounded-xl p-3 md:p-4 max-w-[180px] md:max-w-[200px] shadow-lg">
                <div className="flex items-center gap-2 mb-1">
                  <Award size={16} className="text-neo-black" />
                  <span className="font-bold text-neo-black text-xs md:text-sm">Award Winning</span>
                </div>
                <p className="text-[10px] md:text-xs text-neo-black/70">Recognized for innovation in design.</p>
              </div>
            </div>
            
            {/* Content */}
            <div className="pt-4 md:pt-0">
              <span className="inline-block px-3 py-1 bg-neo-black text-white text-xs font-bold uppercase tracking-wider rounded mb-4 md:mb-6">
                Our Mission
              </span>
              <h2 className="text-2xl md:text-5xl font-black mb-4 md:mb-6 tracking-tight">
                Building the<br />
                <span className="text-neo-yellow">Future, Today</span>
              </h2>
              <p className="text-sm md:text-lg text-neo-black/70 leading-relaxed mb-4 md:mb-8">
                At BoxPox, we believe that the best products don&apos;t just solve problems—they unlock new possibilities. We&apos;re not interested in incremental improvements. We&apos;re here to reimagine what consumer products can be.
              </p>
              <p className="text-sm md:text-lg text-neo-black/70 leading-relaxed mb-6 md:mb-10">
                Our approach combines precision engineering with human-centered design. Every product goes through hundreds of iterations before it reaches your hands. Because we believe you deserve nothing less than exceptional.
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 md:gap-6 p-4 md:p-6 bg-neo-light-gray rounded-xl">
                <div className="text-center">
                  <span className="block text-xl md:text-3xl font-black text-neo-black font-mono">24+</span>
                  <span className="text-[10px] md:text-xs text-neo-black/60 uppercase tracking-wider">Products</span>
                </div>
                <div className="text-center border-x border-neo-black/10">
                  <span className="block text-xl md:text-3xl font-black text-neo-black font-mono">50+</span>
                  <span className="text-[10px] md:text-xs text-neo-black/60 uppercase tracking-wider">Countries</span>
                </div>
                <div className="text-center">
                  <span className="block text-xl md:text-3xl font-black text-neo-black font-mono">10K+</span>
                  <span className="text-[10px] md:text-xs text-neo-black/60 uppercase tracking-wider">Customers</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-10 md:py-16 bg-neo-light-gray relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-50" />
        
        <div className="container relative z-10 px-4">
          <div className="max-w-2xl mb-6 md:mb-12">
            <span className="inline-block px-3 py-1 bg-neo-black text-white text-xs font-bold uppercase tracking-wider rounded mb-3 md:mb-4">
              Our Values
            </span>
            <h2 className="text-2xl md:text-4xl font-black tracking-tight">
              What We <span className="text-neo-yellow">Stand For</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 md:gap-4">
            {values.map((value, index) => (
              <div 
                key={index}
                className="bg-white border border-neo-black/10 rounded-xl p-3 md:p-4 active:scale-[0.98] transition-transform"
              >
                <div className="w-9 h-9 md:w-10 md:h-10 bg-neo-yellow rounded-lg flex items-center justify-center text-neo-black mb-2 md:mb-3">
                  {value.icon}
                </div>
                <h3 className="text-sm md:text-base font-bold mb-1 md:mb-2 text-neo-black">{value.title}</h3>
                <p className="text-neo-black/60 text-[11px] md:text-xs leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-10 md:py-16 bg-neo-black text-white relative overflow-hidden">
        <div className="absolute inset-0 grid-bg-dark opacity-30" />
        
        <div className="container relative z-10 px-4">
          <div className="max-w-2xl mx-auto text-center mb-6 md:mb-12">
            <span className="inline-block px-3 py-1 bg-neo-yellow text-neo-black text-xs font-bold uppercase tracking-wider rounded mb-3 md:mb-4">
              Our Journey
            </span>
            <h2 className="text-2xl md:text-4xl font-black tracking-tight">
              From Garage to <span className="text-neo-yellow">Global</span>
            </h2>
          </div>

          {/* Mobile Timeline - Horizontal Scroll */}
          <div className="md:hidden overflow-x-auto -mx-4 px-4 pb-4 scrollbar-hide">
            <div className="flex gap-3" style={{ width: 'max-content' }}>
              {milestones.map((milestone, index) => (
                <div 
                  key={index}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-4 w-[200px] flex-shrink-0 border border-white/10"
                >
                  <span className="inline-block px-2.5 py-1 bg-neo-yellow text-neo-black text-xs font-bold rounded-lg mb-2 font-mono">
                    {milestone.year}
                  </span>
                  <h3 className="text-base font-black mb-1 text-white">{milestone.title}</h3>
                  <p className="text-white/70 text-xs leading-relaxed">{milestone.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop Timeline - Vertical */}
          <div className="hidden md:block relative max-w-4xl mx-auto">
            {/* Timeline Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-neo-yellow/40 transform -translate-x-px" />
            
            {milestones.map((milestone, index) => (
              <div 
                key={index}
                className={`relative flex items-center gap-8 mb-10 ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}
              >
                {/* Content */}
                <div className={`flex-1 ${index % 2 === 0 ? 'text-right pr-12' : 'text-left pl-12'}`}>
                  <span className="inline-block px-3 py-1 bg-neo-yellow text-neo-black text-xs font-bold rounded-lg mb-3 font-mono">
                    {milestone.year}
                  </span>
                  <h3 className="text-xl md:text-2xl font-black mb-2 text-white">{milestone.title}</h3>
                  <p className="text-white/80 text-sm md:text-base leading-relaxed">{milestone.desc}</p>
                </div>
                
                {/* Dot */}
                <div className="absolute left-1/2 w-4 h-4 bg-neo-yellow rounded-full transform -translate-x-1/2 border-3 border-white shadow-lg" />
                
                {/* Empty space for alternating layout */}
                <div className="flex-1" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-10 md:py-16 bg-white relative overflow-hidden">
        <div className="absolute inset-0 dot-pattern-light opacity-30" />
        
        <div className="container relative z-10 px-4">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 md:gap-4 mb-6 md:mb-12">
            <div>
              <span className="inline-block px-3 py-1 bg-neo-black text-white text-xs font-bold uppercase tracking-wider rounded mb-3 md:mb-4">
                The Team
              </span>
              <h2 className="text-2xl md:text-4xl font-black tracking-tight">
                Meet the <span className="text-neo-yellow">Minds</span>
              </h2>
            </div>
            <Link href="/contact" className="inline-flex items-center gap-2 text-neo-black font-bold text-sm hover:text-neo-yellow active:opacity-70 transition-all group">
              Join Our Team
              <ArrowUpRight size={16} />
            </Link>
          </div>
          
          {/* Mobile: Horizontal Scroll, Desktop: Grid */}
          <div className="md:hidden overflow-x-auto -mx-4 px-4 pb-4 scrollbar-hide">
            <div className="flex gap-3" style={{ width: 'max-content' }}>
              {team.map((member, index) => (
                <div 
                  key={index}
                  className="group bg-white border border-neo-black/10 rounded-xl overflow-hidden w-[180px] flex-shrink-0 shadow-sm active:scale-[0.98] transition-transform"
                >
                  <div className="relative h-44 overflow-hidden">
                    <Image 
                      src={member.img} 
                      alt={member.name} 
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-3 bg-white">
                    <h3 className="text-sm font-bold text-neo-black">{member.name}</h3>
                    <p className="text-[10px] text-neo-black/60 font-medium uppercase tracking-wider">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Desktop Grid */}
          <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {team.map((member, index) => (
              <div 
                key={index}
                className="group bg-white border border-neo-black/10 rounded-xl overflow-hidden"
              >
                <div className="relative h-56 md:h-64 overflow-hidden">
                  <Image 
                    src={member.img} 
                    alt={member.name} 
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <div className="p-4 bg-white group-hover:bg-neo-yellow transition-colors duration-300">
                  <h3 className="text-base font-bold text-neo-black">{member.name}</h3>
                  <p className="text-xs text-neo-black/60 font-medium uppercase tracking-wider">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-8 md:py-12 bg-neo-yellow border-t border-neo-black">
        <div className="container px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div>
              <h3 className="text-xl md:text-3xl font-black text-neo-black mb-1">Ready to join the journey?</h3>
              <p className="text-neo-black/70 text-sm">Explore our products and become part of the BoxPox community.</p>
            </div>
            <Link href="/products" className="neo-btn whitespace-nowrap text-sm py-3 px-5 active:scale-[0.98] transition-transform shadow-lg">
              Explore Products
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
