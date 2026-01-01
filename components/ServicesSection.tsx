"use client";
import { useState } from 'react';
import { Zap, Send, Smile } from 'lucide-react';

export default function ServicesSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const services = [
    {
      icon: <Zap size={80} strokeWidth={1.5} />,
      title: "Subscribe",
      desc: "Kickstart your design adventure by hopping on our monthly subscription. For just $2k, you get unlimited dibs on top-notch design work.",
      step: "01"
    },
    {
      icon: <Send size={80} strokeWidth={1.5} />,
      title: "Request",
      desc: "Alright, you're in! Now, it's time to toss your design tasks our way. Need a branding concept? A sleek landing page design? Just keep those requests coming!",
      step: "02"
    },
    {
      icon: <Smile size={80} strokeWidth={1.5} />,
      title: "Review",
      desc: "Hold tight! In just 48 hours, you'll get your first peek at your completed design. And if it's not love at first sight, no worries! We can tweak and tune it until it's just right.",
      step: "03"
    }
  ];

  return (
    <section className="py-20 px-[5%] relative bg-white">
      <div className="container">
        <div className="flex flex-col items-center mb-20 text-center">
          <h2 className="text-5xl mb-4">The future of <br /> design services</h2>
          <p className="max-w-[600px] text-lg">Need stunning graphic design, intuitive UI/UX, or eye-catching web design? Welcome home.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {services.map((service, index) => (
            <div 
              key={index}
              className={`neo-card p-0 overflow-hidden flex flex-col cursor-pointer transition-all duration-300 ease-[cubic-bezier(0.25,0.8,0.25,1)] ${hoveredIndex === index ? '-translate-x-2 -translate-y-2 shadow-[12px_12px_0px_black]' : 'shadow-neo'}`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className={`h-[250px] flex items-center justify-center border-b-3 border-black transition-colors duration-300 relative ${hoveredIndex === index ? 'bg-black' : 'bg-neo-yellow'}`}>
                <div className="absolute top-5 left-5 bg-white border-3 border-black px-4 py-1 font-black text-xl rounded-full shadow-[4px_4px_0px_black] z-[2]">
                  {service.step}
                </div>
                <div className={`transition-all duration-400 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] ${hoveredIndex === index ? 'text-neo-yellow scale-125 -rotate-6' : 'text-black scale-100'}`}>
                  {service.icon}
                </div>
                
                {/* Decorative dots */}
                <div className="absolute bottom-5 right-5 flex gap-1.5">
                   {[...Array(3)].map((_, i) => (
                     <div key={i} className={`w-2.5 h-2.5 rounded-full border-2 border-black ${hoveredIndex === index ? 'bg-neo-yellow' : 'bg-white'}`}></div>
                   ))}
                </div>
              </div>
              
              <div className={`p-10 flex-1 transition-colors duration-300 flex flex-col ${hoveredIndex === index ? 'bg-neo-yellow' : 'bg-white'}`}>
                <h3 className="text-3xl mb-4">{service.title}</h3>
                <p className="text-base leading-relaxed">{service.desc}</p>
                
                <div className={`mt-8 h-[3px] bg-black transition-all duration-300 ${hoveredIndex === index ? 'w-full' : 'w-[50px]'}`} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
