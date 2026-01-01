"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const products = [
  {
    id: 1,
    category: 'Home Utility',
    title: 'The Infinite Organizer',
    desc: 'A modular storage system that expands and contracts based on your clutter.',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 2,
    category: 'Tech',
    title: 'Solar Pocket',
    desc: 'A wearable solar charger that blends seamlessly with your daily outfit.',
    img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 3,
    category: 'Lifestyle',
    title: 'Gravity Walkers',
    desc: 'Shoes designed to reduce impact by 40%, making walking feel like floating.',
    img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 4,
    category: 'Kitchen',
    title: 'Self-Stirring Pot',
    desc: 'Never burn your sauce again with this magnetic stirring technology.',
    img: 'https://images.unsplash.com/photo-1556910103-1c02745a30bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 5,
    category: 'Tech',
    title: 'Silent Disco Headset',
    desc: 'High-fidelity audio with noise cancellation for the ultimate private party.',
    img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 6,
    category: 'Home Utility',
    title: 'Levitating Plant Pot',
    desc: 'Add a touch of magic to your home with this magnetic floating planter.',
    img: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  }
];

const categories = ['All', 'Home Utility', 'Tech', 'Lifestyle', 'Kitchen'];

export default function Products() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredProducts = activeFilter === 'All' 
    ? products 
    : products.filter(p => p.category === activeFilter);

  return (
    <main className="pt-[100px]">
      {/* Page Header */}
      <div className="py-20 px-[5%] pb-8 text-center relative bg-neo-yellow border-b-3 border-black">
        <div className="animate-fade-in-up">
          <h1 className="text-[clamp(3rem,6vw,5rem)] mb-4 uppercase text-black drop-shadow-[4px_4px_0px_white] [-webkit-text-stroke:2px_black]">
            Our Innovations
          </h1>
          <p className="text-xl max-w-[600px] mx-auto font-bold bg-white inline-block py-1.5 px-4 border-2 border-black shadow-[4px_4px_0px_black]">
            Explore our range of unusual and consumer-friendly products.
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="py-8 px-[5%] border-b-3 border-black bg-white sticky top-[80px] z-40 overflow-x-auto">
        <div className="flex gap-4 justify-center min-w-max">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-6 py-2 font-bold border-2 border-black transition-all duration-200 ${
                activeFilter === cat 
                  ? 'bg-black text-white shadow-[4px_4px_0px_#FFD058] -translate-y-1' 
                  : 'bg-white text-black hover:bg-[#FFD058] shadow-[4px_4px_0px_black] hover:-translate-y-1'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <section className="py-20 px-[5%] bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {filteredProducts.map((product) => (
            <div key={product.id} className="neo-card p-0 overflow-hidden flex flex-col group">
              <div className="relative h-[300px] w-full border-b-3 border-black overflow-hidden">
                <Image 
                  src={product.img} 
                  alt={product.title} 
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 right-4 bg-neo-yellow px-3 py-1 font-bold border-2 border-black shadow-[2px_2px_0px_black] text-sm">
                  {product.category}
                </div>
              </div>
              
              <div className="p-8 flex-1 flex flex-col">
                <h3 className="text-2xl mb-3 group-hover:text-neo-yellow transition-colors duration-200 bg-black text-white inline-block px-2 py-1 w-fit transform -skew-x-6">{product.title}</h3>
                <p className="text-gray-700 mb-6 flex-1">{product.desc}</p>
                
                <Link href="#" className="neo-btn w-full text-center flex items-center justify-center gap-2 group-hover:bg-neo-yellow group-hover:text-black">
                  View Details <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <h3 className="text-2xl font-bold mb-4">No products found in this category.</h3>
            <button 
              onClick={() => setActiveFilter('All')}
              className="neo-btn"
            >
              View All Products
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
