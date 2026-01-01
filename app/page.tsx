import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ChevronDown } from 'lucide-react';
import ServicesSection from '@/components/ServicesSection';
import FAQ from '@/components/FAQ';
import Newsletter from '@/components/Newsletter';

export default function Home() {
  return (
    <main className="pt-[100px]">
      {/* Hero Section - Yellow Background */}
      <section className="bg-neo-yellow min-h-[80vh] flex flex-col justify-center items-center text-center px-[5%] relative border-b-3 border-black mb-0">
        {/* Decorative Shapes - Hidden on mobile for cleaner look */}
        <div className="hidden md:block absolute top-[10%] left-[5%] w-[50px] h-[50px] border-3 border-black rounded-full bg-white"></div>
        <div className="hidden md:block absolute bottom-[20%] right-[10%] w-0 h-0 border-l-[25px] border-l-transparent border-r-[25px] border-r-transparent border-b-[50px] border-b-black rotate-[15deg]"></div>
        <div className="hidden md:block absolute top-[20%] right-[15%] w-[40px] h-[40px] bg-black rotate-45"></div>
        <div className="hidden md:block absolute bottom-[10%] left-[15%] w-[60px] h-[60px] border-4 border-black rounded-full"></div>
        
        <div className="animate-fade-in-up max-w-[900px] z-[2]">
          <h1 className="text-[clamp(4rem,12vw,9rem)] lowercase leading-[0.9] mb-8 tracking-[-4px] text-white drop-shadow-[5px_5px_0px_rgba(0,0,0,1)] [text-shadow:5px_5px_0px_black] [-webkit-text-stroke:3px_black]">
            super <br />
            <span className="text-black [text-shadow:none] [-webkit-text-stroke:0px]">boxpox</span>
          </h1>
          <p className="text-2xl max-w-[600px] mx-auto mb-12 font-bold bg-black text-white inline-block px-5 py-2.5 border-3 border-black shadow-[5px_5px_0px_white] -rotate-2">
            A design agency... kinda.
          </p>
          <div className="flex gap-5 justify-center">
            <Link href="/products" className="neo-btn">
              See Plans
            </Link>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="animate-float absolute bottom-[30px] left-1/2 -translate-x-1/2 z-[2]">
          <ChevronDown size={40} color="black" strokeWidth={3} />
        </div>
      </section>

      {/* Wavy Divider */}
      <div className="h-[50px] bg-neo-yellow relative overflow-hidden">
         <svg viewBox="0 0 1440 320" className="absolute -bottom-[10px] w-full h-[100px]">
            <path fill="white" fillOpacity="1" d="M0,160L48,176C96,192,192,224,288,224C384,224,480,192,576,165.3C672,139,768,117,864,128C960,139,1056,181,1152,197.3C1248,213,1344,203,1392,197.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
      </div>

      {/* Services Section */}
      <ServicesSection />

      {/* Refined Marquee Section - Values Ticker */}
      <div className="bg-black border-y-3 border-black py-[30px] overflow-hidden -rotate-1 mb-20 w-[105%] -ml-[2.5%] relative z-10">
        <div className="animate-marquee flex gap-16">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-16 whitespace-nowrap">
               {['UNLIMITED REQUESTS', 'FAST TURNAROUND', 'FIXED MONTHLY RATE', 'TOP-TIER DESIGN', 'CANCEL ANYTIME'].map((text, index) => (
                 <div key={index} className={`flex items-center gap-4 bg-white px-5 py-2.5 border-3 border-neo-yellow shadow-[5px_5px_0px_#FFD058] ${index % 2 === 0 ? 'rotate-2' : '-rotate-2'}`}>
                   <span className="text-2xl font-black text-black uppercase">
                     {text}
                   </span>
                 </div>
               ))}
            </div>
          ))}
        </div>
      </div>

      {/* Featured Product Section */}
      <section className="container mb-32">
        <div className="neo-card grid grid-cols-1 md:grid-cols-2 overflow-hidden">
          <div className="p-8 md:p-16 flex flex-col justify-center bg-white">
            <div className="inline-block bg-black text-white px-4 py-1.5 border-2 border-black rounded-[20px] font-bold mb-4 self-start shadow-[4px_4px_0px_#FFD058]">
              FEATURED DROP
            </div>
            <h2 className="text-4xl md:text-6xl mb-6 leading-none">The Infinite <br /><span className="text-neo-yellow [text-shadow:2px_2px_0px_black] [-webkit-text-stroke:1px_black]">Organizer</span></h2>
            <p className="mb-8 text-lg">A modular storage system that expands and contracts based on your clutter. The last organizer you'll ever need.</p>
            <Link href="/products" className="neo-btn self-start flex items-center">
              View Product <ArrowRight size={20} className="ml-2" />
            </Link>
          </div>
          <div className="relative min-h-[300px] md:min-h-[500px] border-t-3 md:border-t-0 md:border-l-3 border-black bg-neo-yellow">
            <Image 
              src="https://images.unsplash.com/photo-1580910051074-3eb6948d3ea4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Featured" 
              fill
              className="object-cover mix-blend-multiply"
            />
            <div className="absolute bottom-5 right-5 bg-white px-5 py-2.5 border-3 border-black font-black text-2xl shadow-neo">
              $49.99
            </div>
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