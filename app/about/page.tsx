import Image from 'next/image';
import Link from 'next/link';
import { Target, Lightbulb, Cpu, Globe, Award, ArrowRight, ArrowUpRight, Sparkles, Users } from 'lucide-react';

export default function About() {
  const values = [
    {
      icon: <Target size={28} />,
      title: "Purpose-Driven",
      desc: "Every product solves a real problem. No gimmicks, just thoughtful innovation."
    },
    {
      icon: <Cpu size={28} />,
      title: "Precision Built",
      desc: "Micron-level accuracy in every component. Built to last, designed to perform."
    },
    {
      icon: <Globe size={28} />,
      title: "Globally Minded",
      desc: "Products designed for humans everywhere. Inclusive, accessible, universal."
    },
    {
      icon: <Lightbulb size={28} />,
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
    <main className="bg-neo-black min-h-screen pt-20">
      {/* Hero Section */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 dot-pattern-animated opacity-20" />
        <div className="absolute top-1/4 -left-40 w-96 h-96 bg-neo-yellow/10 rounded-full blur-[120px]" />
        
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="section-label">
              <Sparkles size={14} />
              ABOUT US
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-[0.9]">
              The Box of<br />
              <span className="text-neo-yellow">Possibility</span>
            </h1>
            <p className="text-xl md:text-2xl text-white/60 max-w-2xl mx-auto leading-relaxed">
              We&apos;re a team of engineers, designers, and dreamers building the products we wish existed.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section-padding bg-neo-gray/50">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Image */}
            <div className="relative">
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden">
                <Image 
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt="Our Team" 
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neo-black/50 to-transparent" />
              </div>
              {/* Floating Card */}
              <div className="absolute -bottom-6 -right-6 bg-neo-yellow rounded-2xl p-5 max-w-[220px] glow-yellow">
                <div className="flex items-center gap-3 mb-2">
                  <Award size={20} className="text-neo-black" />
                  <span className="font-bold text-neo-black">Award Winning</span>
                </div>
                <p className="text-sm text-neo-black/70">Recognized for innovation in design and engineering.</p>
              </div>
            </div>
            
            {/* Content */}
            <div>
              <span className="section-label">
                <Target size={14} />
                OUR MISSION
              </span>
              <h2 className="text-4xl md:text-5xl font-black mb-6 leading-[0.95]">
                Building the<br />
                <span className="text-neo-yellow">Future, Today</span>
              </h2>
              <p className="text-lg text-white/60 leading-relaxed mb-6">
                At BoxPox, we believe that the best products don&apos;t just solve problems—they unlock new possibilities. We&apos;re not interested in incremental improvements. We&apos;re here to reimagine what consumer products can be.
              </p>
              <p className="text-lg text-white/60 leading-relaxed mb-10">
                Our approach combines precision engineering with human-centered design. Every product goes through hundreds of iterations before it reaches your hands.
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 p-8 bg-white/5 rounded-2xl border border-white/10">
                <div className="text-center">
                  <span className="stat-number text-4xl md:text-5xl">24+</span>
                  <span className="stat-label">Products</span>
                </div>
                <div className="text-center border-x border-white/10">
                  <span className="stat-number text-4xl md:text-5xl">50+</span>
                  <span className="stat-label">Countries</span>
                </div>
                <div className="text-center">
                  <span className="stat-number text-4xl md:text-5xl">10K+</span>
                  <span className="stat-label">Customers</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern" />
        
        <div className="container relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="section-label">
              <Lightbulb size={14} />
              OUR VALUES
            </span>
            <h2 className="text-4xl md:text-5xl font-black">
              What We <span className="text-neo-yellow">Stand For</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div 
                key={index}
                className="feature-card"
              >
                <div className="w-14 h-14 bg-neo-yellow rounded-2xl flex items-center justify-center text-neo-black mb-6">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">{value.title}</h3>
                <p className="text-white/60 leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="section-padding bg-neo-gray/30 relative overflow-hidden">
        <div className="absolute inset-0 dot-pattern-animated opacity-10" />
        
        <div className="container relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="section-label">
              <Sparkles size={14} />
              OUR JOURNEY
            </span>
            <h2 className="text-4xl md:text-5xl font-black">
              From Garage to <span className="text-neo-yellow">Global</span>
            </h2>
          </div>

          {/* Timeline Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {milestones.map((milestone, index) => (
              <div 
                key={index}
                className="relative p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-neo-yellow/30 transition-all"
              >
                <span className="robot-badge mb-4 font-mono">
                  {milestone.year}
                </span>
                <h3 className="text-2xl font-black mb-3 text-white">{milestone.title}</h3>
                <p className="text-white/60 leading-relaxed">{milestone.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern" />
        
        <div className="container relative z-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <span className="section-label">
                <Users size={14} />
                THE TEAM
              </span>
              <h2 className="text-4xl md:text-5xl font-black">
                Meet the <span className="text-neo-yellow">Minds</span>
              </h2>
            </div>
            <Link href="/contact" className="robot-btn-outline py-3 px-6">
              Join Our Team
              <ArrowUpRight size={18} />
            </Link>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member, index) => (
              <div 
                key={index}
                className="group rounded-3xl overflow-hidden bg-neo-gray"
              >
                <div className="relative h-72 overflow-hidden">
                  <Image 
                    src={member.img} 
                    alt={member.name} 
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 bg-neo-gray group-hover:bg-neo-yellow transition-colors duration-300">
                  <h3 className="text-lg font-bold text-white group-hover:text-neo-black transition-colors">{member.name}</h3>
                  <p className="text-sm text-white/60 group-hover:text-neo-black/70 font-medium uppercase tracking-wider transition-colors">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-neo-yellow">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
            <div>
              <h3 className="text-3xl md:text-4xl font-black text-neo-black mb-2">Ready to join the journey?</h3>
              <p className="text-neo-black/70 text-lg">Explore our products and become part of the BoxPox community.</p>
            </div>
            <Link href="/products" className="robot-btn-dark whitespace-nowrap">
              Explore Products
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
