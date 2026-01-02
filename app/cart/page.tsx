"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Minus, Plus, X, ShoppingBag, ArrowRight, Truck, Shield, RotateCcw } from 'lucide-react';

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
}

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      title: "The Infinite Organizer",
      price: 149,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop",
      category: "Home"
    },
    {
      id: 2,
      title: "Solar Pocket Charger",
      price: 89,
      quantity: 2,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop",
      category: "Tech"
    }
  ]);

  const updateQuantity = (id: number, change: number) => {
    setCartItems(items => 
      items.map(item => 
        item.id === id 
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 100 ? 0 : 15;
  const total = subtotal + shipping;

  return (
    <main className="pt-[72px] md:pt-[80px] min-h-screen bg-white">
      <div className="container py-8 md:py-12">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-2">Shopping Cart</h1>
          <p className="text-neo-black/60">
            {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div 
                  key={item.id} 
                  className="flex gap-4 p-4 bg-neo-light-gray rounded-xl"
                >
                  {/* Product Image */}
                  <div className="relative w-24 h-24 md:w-32 md:h-32 bg-white rounded-lg overflow-hidden flex-shrink-0">
                    <Image 
                      src={item.image} 
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <span className="text-xs font-mono text-neo-black/40 uppercase tracking-wider">
                      {item.category}
                    </span>
                    <h3 className="font-bold text-neo-black mb-1 truncate">{item.title}</h3>
                    <p className="text-lg font-black text-neo-black">${item.price}</p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-4 mt-3">
                      <div className="flex items-center border border-neo-black/20 rounded-lg">
                        <button 
                          onClick={() => updateQuantity(item.id, -1)}
                          className="p-2 hover:bg-neo-black/5 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="px-4 font-semibold text-sm">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, 1)}
                          className="p-2 hover:bg-neo-black/5 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="text-neo-black/40 hover:text-red-500 transition-colors"
                        aria-label="Remove item"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  </div>

                  {/* Line Total (Desktop) */}
                  <div className="hidden md:block text-right">
                    <p className="text-lg font-black text-neo-black">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-neo-light-gray rounded-xl p-6 sticky top-[100px]">
                <h2 className="text-xl font-bold mb-6">Order Summary</h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-neo-black/60">Subtotal</span>
                    <span className="font-semibold">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-neo-black/60">Shipping</span>
                    <span className="font-semibold">
                      {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  {shipping > 0 && (
                    <p className="text-xs text-neo-black/50">
                      Add ${(100 - subtotal).toFixed(2)} more for free shipping
                    </p>
                  )}
                  <div className="h-px bg-neo-black/10 my-4"></div>
                  <div className="flex justify-between">
                    <span className="font-bold">Total</span>
                    <span className="text-xl font-black">${total.toFixed(2)}</span>
                  </div>
                </div>

                <button className="w-full neo-btn justify-center mb-4">
                  Checkout
                  <ArrowRight size={18} />
                </button>

                <Link 
                  href="/products" 
                  className="block text-center text-sm font-semibold text-neo-black/60 hover:text-neo-black transition-colors"
                >
                  Continue Shopping
                </Link>

                {/* Trust Badges */}
                <div className="mt-6 pt-6 border-t border-neo-black/10 grid grid-cols-3 gap-2">
                  <div className="text-center">
                    <Truck size={20} className="mx-auto mb-1 text-neo-black/60" />
                    <span className="text-[10px] text-neo-black/50 block">Free Ship 100+</span>
                  </div>
                  <div className="text-center">
                    <Shield size={20} className="mx-auto mb-1 text-neo-black/60" />
                    <span className="text-[10px] text-neo-black/50 block">Secure Pay</span>
                  </div>
                  <div className="text-center">
                    <RotateCcw size={20} className="mx-auto mb-1 text-neo-black/60" />
                    <span className="text-[10px] text-neo-black/50 block">30 Day Return</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Empty Cart State */
          <div className="text-center py-16 md:py-24">
            <div className="w-24 h-24 mx-auto mb-6 bg-neo-light-gray rounded-full flex items-center justify-center">
              <ShoppingBag size={40} className="text-neo-black/30" />
            </div>
            <h2 className="text-2xl font-bold mb-3">Your cart is empty</h2>
            <p className="text-neo-black/60 mb-8 max-w-sm mx-auto">
              Looks like you haven&apos;t added anything to your cart yet. Start exploring our products!
            </p>
            <Link href="/products" className="neo-btn inline-flex">
              Browse Products
              <ArrowRight size={18} />
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
