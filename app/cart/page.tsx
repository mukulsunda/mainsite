"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Minus, Plus, X, ShoppingBag, ArrowRight, Truck, Shield, RotateCcw, Box, Printer, Loader2 } from 'lucide-react';
import { useCart, PrintCartItem, ProductCartItem } from '@/context/CartContext';

export default function Cart() {
  const router = useRouter();
  const { state, removeItem, updateQuantity, getCartTotal, getCartCount, getPrintItems, getProductItems } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const printItems = getPrintItems();
  const productItems = getProductItems();
  const subtotal = getCartTotal();
  const shipping = subtotal > 500 ? 0 : 99;
  const total = subtotal + shipping;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  if (!mounted || state.isLoading) {
    return (
      <main className="pt-[72px] md:pt-[80px] min-h-screen bg-white">
        <div className="container py-12 flex items-center justify-center">
          <Loader2 size={32} className="animate-spin text-neo-black/40" />
        </div>
      </main>
    );
  }

  const allItems = [...printItems, ...productItems];

  return (
    <main className="pt-[72px] md:pt-[80px] min-h-screen bg-white">
      <div className="container py-6 md:py-12">
        {/* Page Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-4xl font-black tracking-tight mb-2">Shopping Cart</h1>
          <p className="text-neo-black/60 text-sm md:text-base">
            {getCartCount()} {getCartCount() === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        {allItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {/* Print Items */}
              {printItems.length > 0 && (
                <div className="space-y-3">
                  <h2 className="text-sm font-bold text-neo-black/60 uppercase tracking-wider flex items-center gap-2">
                    <Printer size={16} />
                    3D Print Orders ({printItems.length})
                  </h2>
                  {printItems.map((item) => (
                    <PrintCartItemCard
                      key={item.id}
                      item={item}
                      onRemove={() => removeItem(item.id)}
                      onUpdateQuantity={(qty) => updateQuantity(item.id, qty)}
                      formatPrice={formatPrice}
                    />
                  ))}
                </div>
              )}

              {/* Product Items */}
              {productItems.length > 0 && (
                <div className="space-y-3">
                  <h2 className="text-sm font-bold text-neo-black/60 uppercase tracking-wider flex items-center gap-2">
                    <Box size={16} />
                    Products ({productItems.length})
                  </h2>
                  {productItems.map((item) => (
                    <ProductCartItemCard
                      key={item.id}
                      item={item}
                      onRemove={() => removeItem(item.id)}
                      onUpdateQuantity={(qty) => updateQuantity(item.id, qty)}
                      formatPrice={formatPrice}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-neo-light-gray rounded-xl p-5 md:p-6 sticky top-[100px]">
                <h2 className="text-lg md:text-xl font-bold mb-5 md:mb-6">Order Summary</h2>

                <div className="space-y-3 mb-5 md:mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-neo-black/60">Subtotal</span>
                    <span className="font-semibold">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-neo-black/60">Shipping</span>
                    <span className="font-semibold">
                      {shipping === 0 ? 'FREE' : formatPrice(shipping)}
                    </span>
                  </div>
                  {shipping > 0 && subtotal > 0 && (
                    <p className="text-xs text-neo-black/50">
                      Add {formatPrice(500 - subtotal)} more for free shipping
                    </p>
                  )}
                  <div className="h-px bg-neo-black/10 my-4"></div>
                  <div className="flex justify-between">
                    <span className="font-bold">Total</span>
                    <span className="text-xl md:text-2xl font-black">{formatPrice(total)}</span>
                  </div>
                </div>

                <button 
                  onClick={() => router.push('/checkout')}
                  className="w-full neo-btn justify-center mb-4"
                >
                  Proceed to Checkout
                  <ArrowRight size={18} />
                </button>

                <Link 
                  href="/boxprint" 
                  className="block text-center text-sm font-semibold text-neo-black/60 hover:text-neo-black transition-colors"
                >
                  Add more prints
                </Link>

                {/* Trust Badges */}
                <div className="mt-5 md:mt-6 pt-5 md:pt-6 border-t border-neo-black/10 grid grid-cols-3 gap-2">
                  <div className="text-center">
                    <Truck size={18} className="mx-auto mb-1 text-neo-black/60" />
                    <span className="text-[9px] md:text-[10px] text-neo-black/50 block leading-tight">Free Ship ₹500+</span>
                  </div>
                  <div className="text-center">
                    <Shield size={18} className="mx-auto mb-1 text-neo-black/60" />
                    <span className="text-[9px] md:text-[10px] text-neo-black/50 block leading-tight">Secure Pay</span>
                  </div>
                  <div className="text-center">
                    <RotateCcw size={18} className="mx-auto mb-1 text-neo-black/60" />
                    <span className="text-[9px] md:text-[10px] text-neo-black/50 block leading-tight">Quality Guarantee</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Empty Cart State */
          <div className="text-center py-12 md:py-24">
            <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-6 bg-neo-light-gray rounded-full flex items-center justify-center">
              <ShoppingBag size={36} className="text-neo-black/30" />
            </div>
            <h2 className="text-xl md:text-2xl font-bold mb-3">Your cart is empty</h2>
            <p className="text-neo-black/60 mb-8 max-w-sm mx-auto text-sm md:text-base">
              Looks like you haven&apos;t added anything yet. Start by getting a 3D print quote!
            </p>
            <Link href="/boxprint" className="neo-btn inline-flex">
              Get a Quote
              <ArrowRight size={18} />
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}

// Print Item Card Component
function PrintCartItemCard({
  item,
  onRemove,
  onUpdateQuantity,
  formatPrice,
}: {
  item: PrintCartItem;
  onRemove: () => void;
  onUpdateQuantity: (qty: number) => void;
  formatPrice: (price: number) => string;
}) {
  return (
    <div className="flex flex-col md:flex-row gap-4 p-4 bg-white border border-neo-black/10 rounded-xl">
      {/* 3D Preview Placeholder */}
      <div className="relative w-full md:w-28 h-28 bg-neo-light-gray rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center">
        <div 
          className="w-16 h-16 rounded-lg border-2 border-dashed border-neo-black/20 flex items-center justify-center"
          style={{ backgroundColor: item.colorHex + '40' }}
        >
          <Box size={24} style={{ color: item.colorHex }} />
        </div>
        <span className="absolute bottom-2 right-2 text-[10px] bg-neo-black text-white px-2 py-0.5 rounded font-mono">
          {item.fileType.toUpperCase()}
        </span>
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <span className="text-[10px] font-mono text-neo-yellow bg-neo-black px-2 py-0.5 rounded uppercase">
              3D Print
            </span>
            <h3 className="font-bold text-neo-black mt-1 truncate text-sm md:text-base">{item.fileName}</h3>
            <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1 text-xs text-neo-black/60">
              <span>{item.material}</span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full border" style={{ backgroundColor: item.colorHex }} />
                {item.color}
              </span>
              <span>{item.quality}</span>
              <span>{item.infill}% infill</span>
            </div>
            <p className="text-xs text-neo-black/40 mt-1">
              {item.dimensions.x.toFixed(1)} × {item.dimensions.y.toFixed(1)} × {item.dimensions.z.toFixed(1)} mm
              • {item.estimatedWeight.toFixed(1)}g • ~{item.estimatedTime}
            </p>
          </div>
          <button 
            onClick={onRemove}
            className="text-neo-black/40 hover:text-red-500 transition-colors p-1"
            aria-label="Remove item"
          >
            <X size={18} />
          </button>
        </div>

        {/* Price & Quantity */}
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center border border-neo-black/20 rounded-lg">
            <button 
              onClick={() => onUpdateQuantity(item.quantity - 1)}
              className="p-1.5 md:p-2 hover:bg-neo-black/5 transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus size={14} />
            </button>
            <span className="px-3 font-semibold text-sm">{item.quantity}</span>
            <button 
              onClick={() => onUpdateQuantity(item.quantity + 1)}
              className="p-1.5 md:p-2 hover:bg-neo-black/5 transition-colors"
              aria-label="Increase quantity"
            >
              <Plus size={14} />
            </button>
          </div>
          <p className="text-base md:text-lg font-black text-neo-black">
            {formatPrice(item.totalPrice * item.quantity)}
          </p>
        </div>
      </div>
    </div>
  );
}

// Product Item Card Component
function ProductCartItemCard({
  item,
  onRemove,
  onUpdateQuantity,
  formatPrice,
}: {
  item: ProductCartItem;
  onRemove: () => void;
  onUpdateQuantity: (qty: number) => void;
  formatPrice: (price: number) => string;
}) {
  return (
    <div className="flex gap-4 p-4 bg-white border border-neo-black/10 rounded-xl">
      {/* Product Image */}
      <div className="relative w-20 h-20 md:w-28 md:h-28 bg-neo-light-gray rounded-lg overflow-hidden flex-shrink-0">
        <Image 
          src={item.image} 
          alt={item.title}
          fill
          className="object-cover"
        />
      </div>

      {/* Product Details */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <span className="text-[10px] font-mono text-neo-black/40 uppercase tracking-wider">
              {item.category}
            </span>
            <h3 className="font-bold text-neo-black truncate text-sm md:text-base">{item.title}</h3>
            <p className="text-base md:text-lg font-black text-neo-black mt-1">{formatPrice(item.price)}</p>
          </div>
          <button 
            onClick={onRemove}
            className="text-neo-black/40 hover:text-red-500 transition-colors p-1"
            aria-label="Remove item"
          >
            <X size={18} />
          </button>
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center border border-neo-black/20 rounded-lg">
            <button 
              onClick={() => onUpdateQuantity(item.quantity - 1)}
              className="p-1.5 md:p-2 hover:bg-neo-black/5 transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus size={14} />
            </button>
            <span className="px-3 font-semibold text-sm">{item.quantity}</span>
            <button 
              onClick={() => onUpdateQuantity(item.quantity + 1)}
              className="p-1.5 md:p-2 hover:bg-neo-black/5 transition-colors"
              aria-label="Increase quantity"
            >
              <Plus size={14} />
            </button>
          </div>
          <p className="text-base md:text-lg font-black text-neo-black">
            {formatPrice(item.price * item.quantity)}
          </p>
        </div>
      </div>
    </div>
  );
}
