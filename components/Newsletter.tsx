"use client";
import { ArrowRight, Mail } from 'lucide-react';

export default function Newsletter() {
  return (
    <section className="py-20 px-[5%] bg-white">
      <div className="container">
        <div className="neo-card bg-black text-white py-16 px-8 text-center relative overflow-hidden">
          {/* Decorative Background Elements */}
          <div className="absolute -top-[50px] -left-[50px] w-[150px] h-[150px] border-2 border-[#333] rounded-full"></div>
          <div className="absolute -bottom-[50px] -right-[50px] w-[150px] h-[150px] bg-neo-yellow rounded-full opacity-20"></div>

          <div className="relative z-[2] max-w-[600px] mx-auto flex flex-col items-center">
            <Mail size={48} className="mb-6 text-neo-yellow" />
            <h2 className="text-5xl mb-4 text-white">Join the <span className="text-neo-yellow">Cult</span>ure</h2>
            <p className="mb-10 text-lg text-[#ccc]">
              Get the latest design trends, weird product drops, and exclusive offers delivered straight to your inbox. No spam, just jam.
            </p>

            <form className="flex gap-4 flex-wrap justify-center w-full" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="your@email.com" 
                className="neo-input flex-[1_1_300px] bg-white border-none text-black"
              />
              <button className="neo-btn bg-neo-yellow text-black border-none flex items-center gap-2.5 hover:bg-white hover:text-black transition-colors">
                Subscribe <ArrowRight size={18} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
