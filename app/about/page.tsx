import Image from 'next/image';
import Link from 'next/link';
import { Target, Lightbulb, Users } from 'lucide-react';

export default function About() {
  return (
    <main className="pt-[100px]">
      {/* Page Header */}
      <div className="py-20 px-[5%] pb-8 text-center relative bg-neo-yellow border-b-3 border-black">
        <div className="animate-fade-in-up">
          <h1 className="text-[clamp(3rem,6vw,5rem)] mb-4 uppercase text-black drop-shadow-[4px_4px_0px_white] [-webkit-text-stroke:2px_black]">
            Who We Are
          </h1>
          <p className="text-xl max-w-[600px] mx-auto font-bold bg-white inline-block py-1.5 px-4 border-2 border-black shadow-[4px_4px_0px_black] -rotate-1">
            Discover the story behind the Box of Possibility.
          </p>
        </div>
      </div>

      {/* About Section */}
      <section className="py-20 px-[5%]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="neo-card p-0 overflow-hidden h-[500px] relative">
            <Image 
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Our Team" 
              fill
              className="object-cover grayscale contrast-125"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-neo-yellow/20"></div>
          </div>
          
          <div className="animate-fade-in-up [animation-delay:0.2s]">
            <div className="neo-card bg-neo-yellow mb-8">
              <div className="flex items-center gap-4 mb-4">
                <Target size={32} className="text-black stroke-[2.5]" />
                <h3 className="text-3xl m-0">Our Mission</h3>
              </div>
              <p className="text-lg leading-relaxed font-medium">
                At BoxPox, we believe that the world is full of unsolved puzzles. Our mission is to find those missing pieces—the unusual, the overlooked, and the necessary—and turn them into consumer-friendly products that enhance daily life.
              </p>
            </div>
            
            <div className="neo-card bg-white">
              <div className="flex items-center gap-4 mb-4">
                <Lightbulb size={32} className="text-black stroke-[2.5]" />
                <h3 className="text-3xl m-0">Our Vision</h3>
              </div>
              <p className="text-lg leading-relaxed font-medium">
                We envision a world where "unusual" means "better." We strive to be the leading innovators in creating products that don't just fit into your life, but improve it in ways you never imagined.
              </p>
            </div>
            
            <div className="mt-12">
               <Link href="/contact" className="neo-btn">Join Our Journey</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-[5%] bg-white border-t-3 border-black">
        <div className="text-center mb-16">
          <h2 className="text-5xl uppercase mb-4">Meet The <span className="text-neo-yellow drop-shadow-[2px_2px_0px_black] [-webkit-text-stroke:1px_black]">Minds</span></h2>
          <p className="font-bold">The creative geniuses behind the box.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Team Member 1 */}
          <div className="neo-card p-0 overflow-hidden text-center group">
            <div className="relative h-[350px] w-full border-b-3 border-black">
              <Image 
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="CEO" 
                fill
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
              />
            </div>
            <div className="p-6 bg-white group-hover:bg-neo-yellow transition-colors duration-300">
              <h3 className="text-2xl mb-1">Alex Morgan</h3>
              <p className="font-bold text-sm uppercase tracking-wider">Chief Visionary Officer</p>
            </div>
          </div>

          {/* Team Member 2 */}
          <div className="neo-card p-0 overflow-hidden text-center group">
            <div className="relative h-[350px] w-full border-b-3 border-black">
              <Image 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Designer" 
                fill
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
              />
            </div>
            <div className="p-6 bg-white group-hover:bg-neo-yellow transition-colors duration-300">
              <h3 className="text-2xl mb-1">Sarah Jenkins</h3>
              <p className="font-bold text-sm uppercase tracking-wider">Head of Product</p>
            </div>
          </div>

          {/* Team Member 3 */}
          <div className="neo-card p-0 overflow-hidden text-center group">
            <div className="relative h-[350px] w-full border-b-3 border-black">
              <Image 
                src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Developer" 
                fill
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
              />
            </div>
            <div className="p-6 bg-white group-hover:bg-neo-yellow transition-colors duration-300">
              <h3 className="text-2xl mb-1">Michael Chen</h3>
              <p className="font-bold text-sm uppercase tracking-wider">Lead Engineer</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
