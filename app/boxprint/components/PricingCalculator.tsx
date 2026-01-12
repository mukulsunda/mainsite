"use client";

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ShoppingCart, Clock, Package, Zap, CreditCard, Loader2, AlertCircle, CheckCircle } from 'lucide-react';
import { PrintConfig, PriceBreakdown, MATERIALS, QUALITY_SETTINGS, LABOR_RATE_PER_HOUR, SETUP_FEE, MIN_ORDER_VALUE, ModelFile } from '../types';
import { useCart } from '@/context/CartContext';

interface PricingCalculatorProps {
  config: PrintConfig;
  estimatedWeight: number;
  volume: number;
  modelFile: ModelFile | null;
  onAddToCart: () => void;
  isModelLoaded: boolean;
}

export default function PricingCalculator({
  config,
  estimatedWeight,
  modelFile,
  onAddToCart,
  isModelLoaded
}: PricingCalculatorProps) {
  const router = useRouter();
  const { addPrintItem, isItemInCart } = useCart();
  const [isProcessing, setIsProcessing] = useState(false);
  const [cartMessage, setCartMessage] = useState<{ type: 'success' | 'error' | 'warning'; text: string } | null>(null);
  
  // Check if item is already in cart
  const existingInCart = modelFile ? isItemInCart(
    modelFile.name,
    config.material,
    config.quality,
    config.infill
  ) : undefined;
  
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

  // Convert file to base64 for storage
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const handleAddToCart = async () => {
    if (!modelFile || !modelFile.file || !modelFile.dimensions) return;
    
    setIsProcessing(true);
    setCartMessage(null);
    
    try {
      const fileData = await fileToBase64(modelFile.file);
      const material = MATERIALS[config.material];
      const selectedColor = material.colors.find(c => c.hex === config.color);
      
      const result = addPrintItem({
        fileName: modelFile.name,
        fileSize: modelFile.size,
        fileType: modelFile.format,
        fileData,
        dimensions: modelFile.dimensions,
        volume: modelFile.volume || 0,
        material: config.material,
        color: selectedColor?.name || 'Default',
        colorHex: config.color,
        quality: config.quality,
        infill: config.infill,
        scale: config.scale,
        quantity: config.quantity,
        estimatedWeight: pricing.estimatedWeight,
        estimatedTime: pricing.estimatedTime,
        unitPrice: pricing.unitPrice,
        totalPrice: pricing.totalPrice,
        instructions: config.instructions,
      });
      
      if (result.success) {
        setCartMessage({ type: 'success', text: result.message });
        onAddToCart();
      } else {
        setCartMessage({ type: 'warning', text: result.message });
      }
      
      // Clear message after 4 seconds
      setTimeout(() => setCartMessage(null), 4000);
    } catch (error) {
      console.error('Error adding to cart:', error);
      setCartMessage({ type: 'error', text: 'Failed to add item to cart. Please try again.' });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleBuyNow = async () => {
    if (!modelFile || !modelFile.file || !modelFile.dimensions) return;
    
    // If already in cart, just go to checkout
    if (existingInCart) {
      router.push('/checkout');
      return;
    }
    
    setIsProcessing(true);
    try {
      const fileData = await fileToBase64(modelFile.file);
      const material = MATERIALS[config.material];
      const selectedColor = material.colors.find(c => c.hex === config.color);
      
      // Add to cart first
      addPrintItem({
        fileName: modelFile.name,
        fileSize: modelFile.size,
        fileType: modelFile.format,
        fileData,
        dimensions: modelFile.dimensions,
        volume: modelFile.volume || 0,
        material: config.material,
        color: selectedColor?.name || 'Default',
        colorHex: config.color,
        quality: config.quality,
        infill: config.infill,
        scale: config.scale,
        quantity: config.quantity,
        estimatedWeight: pricing.estimatedWeight,
        estimatedTime: pricing.estimatedTime,
        unitPrice: pricing.unitPrice,
        totalPrice: pricing.totalPrice,
        instructions: config.instructions,
      });
      
      // Navigate to checkout regardless
      router.push('/checkout');
    } catch (error) {
      console.error('Error processing order:', error);
      alert('Failed to process order. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 bg-neo-yellow">
        <h3 className="font-bold text-neo-black flex items-center gap-2">
          <Zap size={18} className="text-neo-black" />
          Instant Quote
        </h3>
      </div>

      {/* Pricing Breakdown */}
      <div className="p-4 space-y-3">
        {/* Cost Items */}
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-white/60">Material ({config.material})</span>
            <span className="font-mono text-white">{formatPrice(pricing.materialCost)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/60">Print labor</span>
            <span className="font-mono text-white">{formatPrice(pricing.laborCost)}</span>
          </div>
          {pricing.setupFee > 0 && (
            <div className="flex justify-between">
              <span className="text-white/60">Setup fee</span>
              <span className="font-mono text-white">{formatPrice(pricing.setupFee)}</span>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="border-t border-dashed border-white/10 pt-3">
          <div className="flex justify-between text-sm">
            <span className="text-white/60">Unit price</span>
            <span className="font-bold text-white">{formatPrice(pricing.unitPrice)}</span>
          </div>
          {config.quantity > 1 && (
            <div className="flex justify-between text-sm mt-1">
              <span className="text-white/60">× {config.quantity} units</span>
              <span className="text-white/40">{formatPrice(pricing.unitPrice * config.quantity)}</span>
            </div>
          )}
        </div>

        {/* Total */}
        <div className="bg-white/5 rounded-lg p-3">
          <div className="flex justify-between items-center">
            <span className="font-bold text-white">Total</span>
            <span className="text-2xl font-black text-neo-yellow">{formatPrice(pricing.totalPrice)}</span>
          </div>
          {pricing.totalPrice === MIN_ORDER_VALUE && (
            <p className="text-xs text-white/40 mt-1">
              Minimum order value applied
            </p>
          )}
        </div>

        {/* Estimates */}
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center gap-2 p-2 bg-white/5 rounded-lg">
            <Package size={16} className="text-white/40" />
            <div>
              <p className="text-xs text-white/40">Weight</p>
              <p className="text-sm font-bold text-white">{pricing.estimatedWeight.toFixed(1)}g</p>
            </div>
          </div>
          <div className="flex items-center gap-2 p-2 bg-white/5 rounded-lg">
            <Clock size={16} className="text-white/40" />
            <div>
              <p className="text-xs text-white/40">Print time</p>
              <p className="text-sm font-bold text-white">{pricing.estimatedTime}</p>
            </div>
          </div>
        </div>

        {/* Dimension Check Warning */}
        {modelFile?.dimensions && (
          (modelFile.dimensions.x > 256 || modelFile.dimensions.y > 256 || modelFile.dimensions.z > 256) && (
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-3 text-sm">
              <p className="font-semibold text-amber-400">⚠️ Model exceeds build plate</p>
              <p className="text-amber-400/70 text-xs mt-1">
                Max size: 256×256×256mm. Consider scaling down or contact us for large prints.
              </p>
            </div>
          )
        )}

        {/* Action Buttons */}
        <div className="space-y-2 pt-2">
          {/* Buy Now Button */}
          <button
            onClick={handleBuyNow}
            disabled={!isModelLoaded || isProcessing}
            className={`
              w-full py-3 px-4 rounded-lg font-bold flex items-center justify-center gap-2 transition-all
              ${isModelLoaded && !isProcessing
                ? 'bg-neo-yellow text-neo-black hover:bg-neo-yellow/90 hover:scale-[1.02]' 
                : 'bg-white/10 text-white/40 cursor-not-allowed'
              }
            `}
          >
            {isProcessing ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <CreditCard size={18} />
            )}
            {isProcessing ? 'Processing...' : existingInCart ? 'Go to Checkout' : 'Buy Now'}
          </button>

          {/* Add to Cart Button */}
          {existingInCart ? (
            <Link
              href="/cart"
              className="w-full py-3 px-4 rounded-lg font-bold flex items-center justify-center gap-2 transition-all border-2 border-green-500 text-green-400 bg-green-500/10 hover:bg-green-500/20"
            >
              <CheckCircle size={18} />
              Already in Cart - View Cart
            </Link>
          ) : (
            <button
              onClick={handleAddToCart}
              disabled={!isModelLoaded || isProcessing}
              className={`
                w-full py-3 px-4 rounded-lg font-bold flex items-center justify-center gap-2 transition-all border-2
                ${isModelLoaded && !isProcessing
                  ? 'border-white text-white hover:bg-neo-yellow hover:border-neo-yellow hover:text-neo-black' 
                  : 'border-white/10 text-white/40 cursor-not-allowed'
                }
              `}
            >
              <ShoppingCart size={18} />
              Add to Cart
            </button>
          )}
        </div>

        {/* Cart Message */}
        {cartMessage && (
          <div className={`p-3 rounded-lg text-sm flex items-center gap-2 ${
            cartMessage.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/30' :
            cartMessage.type === 'warning' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30' :
            'bg-red-500/10 text-red-400 border border-red-500/30'
          }`}>
            {cartMessage.type === 'success' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
            {cartMessage.text}
          </div>
        )}

        {/* Trust Badges */}
        <div className="flex items-center justify-center gap-4 pt-2 text-xs text-white/40">
          <span>✓ Quality Guaranteed</span>
          <span>✓ Fast Shipping</span>
        </div>
      </div>
    </div>
  );
}
