"use client";

import { useMemo } from 'react';
import { ShoppingCart, Clock, Package, Zap } from 'lucide-react';
import { PrintConfig, PriceBreakdown, MATERIALS, QUALITY_SETTINGS, LABOR_RATE_PER_HOUR, SETUP_FEE, MIN_ORDER_VALUE } from '../types';

interface PricingCalculatorProps {
  config: PrintConfig;
  estimatedWeight: number;
  volume: number;
  onAddToCart: () => void;
  isModelLoaded: boolean;
}

export default function PricingCalculator({
  config,
  estimatedWeight,
  onAddToCart,
  isModelLoaded
}: PricingCalculatorProps) {
  
  const pricing = useMemo((): PriceBreakdown => {
    const material = MATERIALS[config.material];
    const quality = QUALITY_SETTINGS[config.quality];
    
    // Base weight calculation adjusted for infill
    const infillMultiplier = 0.3 + (config.infill / 100) * 0.7; // 30% base + infill contribution
    const scaledWeight = estimatedWeight * Math.pow(config.scale, 3) * infillMultiplier;
    
    // Material cost
    const materialCost = scaledWeight * material.pricePerGram;
    
    // Time estimation (simplified: 1 hour per 20g at standard quality)
    const baseTime = scaledWeight / 20; // hours
    const adjustedTime = baseTime * quality.timeMultiplier;
    
    // Labor cost
    const laborCost = adjustedTime * LABOR_RATE_PER_HOUR;
    
    // Setup fee (waived for orders over ₹500)
    const setupFee = materialCost + laborCost > 500 ? 0 : SETUP_FEE;
    
    // Calculate totals
    const unitPrice = materialCost + laborCost + setupFee;
    const totalPrice = Math.max(unitPrice * config.quantity, MIN_ORDER_VALUE);
    
    // Format time
    const hours = Math.floor(adjustedTime);
    const minutes = Math.round((adjustedTime - hours) * 60);
    const estimatedTime = hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
    
    return {
      materialCost,
      laborCost,
      setupFee,
      quantity: config.quantity,
      unitPrice,
      totalPrice,
      estimatedWeight: scaledWeight,
      estimatedTime
    };
  }, [config, estimatedWeight]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="bg-white border border-neo-black/10 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 bg-neo-black">
        <h3 className="font-bold text-white flex items-center gap-2">
          <Zap size={18} className="text-neo-yellow" />
          Instant Quote
        </h3>
      </div>

      {/* Pricing Breakdown */}
      <div className="p-4 space-y-3">
        {/* Cost Items */}
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-neo-black/60">Material ({config.material})</span>
            <span className="font-mono text-neo-black">{formatPrice(pricing.materialCost)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-neo-black/60">Print labor</span>
            <span className="font-mono text-neo-black">{formatPrice(pricing.laborCost)}</span>
          </div>
          {pricing.setupFee > 0 && (
            <div className="flex justify-between">
              <span className="text-neo-black/60">Setup fee</span>
              <span className="font-mono text-neo-black">{formatPrice(pricing.setupFee)}</span>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="border-t border-dashed border-neo-black/10 pt-3">
          <div className="flex justify-between text-sm">
            <span className="text-neo-black/60">Unit price</span>
            <span className="font-bold text-neo-black">{formatPrice(pricing.unitPrice)}</span>
          </div>
          {config.quantity > 1 && (
            <div className="flex justify-between text-sm mt-1">
              <span className="text-neo-black/60">× {config.quantity} units</span>
              <span className="text-neo-black/40">{formatPrice(pricing.unitPrice * config.quantity)}</span>
            </div>
          )}
        </div>

        {/* Total */}
        <div className="bg-neo-light-gray rounded-lg p-3">
          <div className="flex justify-between items-center">
            <span className="font-bold text-neo-black">Total</span>
            <span className="text-2xl font-black text-neo-black">{formatPrice(pricing.totalPrice)}</span>
          </div>
          {pricing.totalPrice === MIN_ORDER_VALUE && (
            <p className="text-xs text-neo-black/40 mt-1">
              Minimum order value applied
            </p>
          )}
        </div>

        {/* Estimates */}
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center gap-2 p-2 bg-neo-light-gray rounded-lg">
            <Package size={16} className="text-neo-black/40" />
            <div>
              <p className="text-xs text-neo-black/40">Weight</p>
              <p className="text-sm font-bold text-neo-black">{pricing.estimatedWeight.toFixed(1)}g</p>
            </div>
          </div>
          <div className="flex items-center gap-2 p-2 bg-neo-light-gray rounded-lg">
            <Clock size={16} className="text-neo-black/40" />
            <div>
              <p className="text-xs text-neo-black/40">Print time</p>
              <p className="text-sm font-bold text-neo-black">{pricing.estimatedTime}</p>
            </div>
          </div>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={onAddToCart}
          disabled={!isModelLoaded}
          className={`
            w-full py-3 px-4 rounded-lg font-bold flex items-center justify-center gap-2 transition-all
            ${isModelLoaded 
              ? 'bg-neo-yellow text-neo-black hover:bg-neo-yellow/90 hover:scale-[1.02]' 
              : 'bg-neo-black/10 text-neo-black/40 cursor-not-allowed'
            }
          `}
        >
          <ShoppingCart size={18} />
          Add to Cart
        </button>

        {/* Trust Badges */}
        <div className="flex items-center justify-center gap-4 pt-2 text-xs text-neo-black/40">
          <span>✓ Quality Guaranteed</span>
          <span>✓ Fast Shipping</span>
        </div>
      </div>
    </div>
  );
}
