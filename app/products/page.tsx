"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUpRight, Grid3X3, LayoutList, SlidersHorizontal } from 'lucide-react';

const products = [
  {
    id: 1,
    category: 'Home',
    title: 'The Infinite Organizer',
    desc: 'A modular storage system that expands and contracts based on your needs. Precision-engineered for infinite configurations.',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    price: 149,
    originalPrice: 199,
    badge: 'Best Seller',
    inStock: true
  },
  {
    id: 2,
    category: 'Tech',
    title: 'Solar Pocket',
    desc: 'A wearable solar charger that integrates seamlessly with your daily routine. Never run out of power again.',
    img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    price: 89,
    badge: 'New',
    inStock: true
  },
  {
    id: 3,
    category: 'Lifestyle',
    title: 'Gravity Walkers',
    desc: 'Engineered footwear that reduces impact by 40%. Walking reimagined with aerospace-grade materials.',
    img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    price: 279,
    inStock: true
  },
  {
    id: 4,
    category: 'Kitchen',
    title: 'Self-Stirring Pot',
    desc: 'Magnetic stirring technology meets culinary precision. Never burn your sauce again.',
    img: 'https://images.unsplash.com/photo-1556910103-1c02745a30bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    price: 129,
    badge: 'Limited',
    inStock: false
  },
  {
    id: 5,
    category: 'Tech',
    title: 'Silent Disco Headset',
    desc: 'High-fidelity audio with active noise cancellation. Your personal sound sanctuary.',
    img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    price: 349,
    originalPrice: 399,
    inStock: true
  },
  {
    id: 6,
    category: 'Home',
    title: 'Levitating Plant Pot',
    desc: 'Magnetic levitation meets botanical design. A floating statement piece for modern spaces.',
    img: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    price: 199,
    inStock: true
  }
];

const categories = ['All', 'Home', 'Tech', 'Lifestyle', 'Kitchen'];

export default function Products() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredProducts = activeFilter === 'All' 
    ? products 
    : products.filter(p => p.category === activeFilter);

  return (
    <main className="pt-[72px] md:pt-[80px] bg-white min-h-screen">
      {/* Page Header */}
      <section className="relative overflow-hidden bg-neo-black text-white">
        <div className="absolute inset-0 grid-bg-dark opacity-30" />
        
        <div className="container relative z-10 py-12 md:py-16">
          <div className="max-w-2xl">
            <span className="inline-block px-3 py-1 bg-neo-yellow text-neo-black text-xs font-bold uppercase tracking-wider rounded mb-4">
              Products
            </span>
            <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
              Built for<br />
              <span className="text-neo-yellow">Tomorrow</span>
            </h1>
            <p className="text-base md:text-lg text-white/60 max-w-lg">
              Every product is engineered with precision, built with premium materials, and designed to evolve with you.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="sticky top-[72px] md:top-[80px] z-40 bg-white border-b border-neo-black/10">
        <div className="container py-3 md:py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Category Filters */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`px-5 py-2.5 font-semibold text-sm border-2 rounded-lg transition-all duration-200 whitespace-nowrap ${
                    activeFilter === cat 
                      ? 'bg-neo-black text-white border-neo-black' 
                      : 'bg-transparent text-neo-black border-neo-black/20 hover:border-neo-black/50'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* View Toggle & Sort */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-neo-black/50 hidden md:block">
                {filteredProducts.length} products
              </span>
              <div className="flex items-center border-2 border-neo-black/20 rounded-lg overflow-hidden">
                <button 
                  onClick={() => setViewMode('grid')}
                  className={`p-2.5 transition-colors ${viewMode === 'grid' ? 'bg-neo-black text-white' : 'text-neo-black hover:bg-neo-black/5'}`}
                  aria-label="Grid view"
                >
                  <Grid3X3 size={18} />
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  className={`p-2.5 transition-colors ${viewMode === 'list' ? 'bg-neo-black text-white' : 'text-neo-black hover:bg-neo-black/5'}`}
                  aria-label="List view"
                >
                  <LayoutList size={18} />
                </button>
              </div>
              <button className="p-2.5 border-2 border-neo-black/20 rounded-lg text-neo-black hover:bg-neo-black/5 transition-colors">
                <SlidersHorizontal size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1 max-w-4xl mx-auto'
          }`}>
            {filteredProducts.map((product) => (
              <div 
                key={product.id} 
                className={`group bg-white border-2 border-neo-black rounded-xl overflow-hidden transition-all duration-300 hover:shadow-neo ${
                  viewMode === 'list' ? 'flex flex-col md:flex-row' : ''
                }`}
              >
                {/* Product Image */}
                <div className={`relative overflow-hidden bg-neo-light-gray ${
                  viewMode === 'list' ? 'md:w-80 h-64 md:h-auto' : 'h-72'
                }`}>
                  <Image 
                    src={product.img} 
                    alt={product.title} 
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {product.badge && (
                      <span className="px-3 py-1 bg-neo-yellow text-neo-black text-xs font-bold uppercase rounded border-2 border-neo-black">
                        {product.badge}
                      </span>
                    )}
                    {!product.inStock && (
                      <span className="px-3 py-1 bg-neo-black text-white text-xs font-bold uppercase rounded">
                        Sold Out
                      </span>
                    )}
                  </div>

                  {/* Quick View */}
                  <div className="absolute inset-0 bg-neo-black/0 group-hover:bg-neo-black/20 transition-colors duration-300 flex items-center justify-center">
                    <button className="px-4 py-2 bg-white text-neo-black font-bold text-sm rounded-lg opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                      Quick View
                    </button>
                  </div>
                </div>
                
                {/* Product Info */}
                <div className={`p-6 flex flex-col ${viewMode === 'list' ? 'flex-1' : ''}`}>
                  {/* Category */}
                  <span className="text-xs font-mono text-neo-black/40 uppercase tracking-wider mb-2">
                    {product.category}
                  </span>
                  
                  {/* Title */}
                  <h3 className="text-xl font-bold text-neo-black mb-2 group-hover:text-neo-yellow transition-colors">
                    {product.title}
                  </h3>
                  
                  {/* Description */}
                  <p className={`text-neo-black/60 text-sm mb-4 ${viewMode === 'list' ? '' : 'line-clamp-2'}`}>
                    {product.desc}
                  </p>
                  
                  {/* Price & CTA */}
                  <div className="mt-auto flex items-center justify-between pt-4 border-t border-neo-black/10">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-black text-neo-black">${product.price}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-neo-black/40 line-through">${product.originalPrice}</span>
                      )}
                    </div>
                    
                    <Link 
                      href="#" 
                      className={`inline-flex items-center gap-1 font-bold text-sm transition-colors ${
                        product.inStock 
                          ? 'text-neo-black hover:text-neo-yellow' 
                          : 'text-neo-black/30 cursor-not-allowed'
                      }`}
                    >
                      {product.inStock ? 'Add to Cart' : 'Notify Me'}
                      <ArrowUpRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <div className="w-24 h-24 mx-auto mb-6 bg-neo-light-gray rounded-xl flex items-center justify-center">
                <Grid3X3 size={40} className="text-neo-black/20" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-neo-black">No products found</h3>
              <p className="text-neo-black/60 mb-8">Try adjusting your filters or browse all products.</p>
              <button 
                onClick={() => setActiveFilter('All')}
                className="neo-btn"
              >
                View All Products
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="section-padding-sm bg-neo-light-gray border-t-2 border-neo-black/10">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold text-neo-black mb-2">Can't find what you're looking for?</h3>
              <p className="text-neo-black/60">We're always working on new products. Let us know what you need.</p>
            </div>
            <Link href="/contact" className="neo-btn whitespace-nowrap">
              Contact Us
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
