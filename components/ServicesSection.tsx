"use client";
import { Layers, Rocket, Sparkles } from 'lucide-react';

export default function ServicesSection() {
  const services = [
    {
      icon: <Layers size={24} strokeWidth={2} />,
      title: "Modular Design",
      desc: "Every product is built with modularity at its core. Upgrade, expand, and customize without replacing the entire system.",
      features: ["Interchangeable parts", "Future-proof", "Easy maintenance"],
      number: "01"
    },
    {
      icon: <Rocket size={24} strokeWidth={2} />,
      title: "Precision Engineering",
      desc: "Micron-level accuracy meets industrial craftsmanship. Each component performs flawlessly for years.",
      features: ["Premium materials", "Rigorous testing", "5-year warranty"],
      number: "02"
    },
    {
      icon: <Sparkles size={24} strokeWidth={2} />,
      title: "Smart Integration",
      desc: "Seamless connectivity between all BoxPox products. One ecosystem, infinite possibilities.",
      features: ["OTA updates", "Cross-device sync", "Open API"],
      number: "03"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <span className="inline-block px-3 py-1 bg-neo-black text-white text-xs font-bold uppercase tracking-wider rounded mb-4">
            How We Build
          </span>
          <h2 className="text-3xl md:text-4xl font-black mb-4 tracking-tight">
            Engineered for<br />
            <span className="text-neo-yellow">Tomorrow</span>
          </h2>
          <p className="text-neo-black/60 text-sm md:text-base leading-relaxed">
            Every BoxPox product follows the same philosophy: build it right, build it to last, build it to evolve.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {services.map((service, index) => (
            <div 
              key={index}
              className="relative p-6 bg-neo-light-gray border border-neo-black/10 rounded-xl hover:border-neo-black/30 transition-colors"
            >
              {/* Number Badge */}
              <div className="absolute top-4 right-4 font-mono text-3xl font-bold text-neo-black/10">
                {service.number}
              </div>

              {/* Icon Container */}
              <div className="w-12 h-12 rounded-lg bg-neo-yellow flex items-center justify-center text-neo-black mb-4">
                {service.icon}
              </div>
              
              {/* Content */}
              <h3 className="text-lg md:text-xl font-bold mb-2 text-neo-black">
                {service.title}
              </h3>
              
              <p className="text-neo-black/60 text-sm leading-relaxed mb-4">
                {service.desc}
              </p>

              {/* Features List */}
              <ul className="space-y-2">
                {service.features.map((feature, fIndex) => (
                  <li 
                    key={fIndex} 
                    className="flex items-center gap-2 text-xs text-neo-black/70"
                  >
                    <span className="w-1 h-1 bg-neo-yellow rounded-full" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
