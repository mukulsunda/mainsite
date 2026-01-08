"use client";

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { 
  Printer, Upload, Palette, 
  Shield, Truck, Clock, Star, ArrowRight,
  CheckCircle, Box, Layers
} from 'lucide-react';

import FileUploader from './components/FileUploader';
import ModelViewer from './components/ModelViewer';
import MaterialSelector from './components/MaterialSelector';
import PrintOptions from './components/PrintOptions';
import PricingCalculator from './components/PricingCalculator';
import MaterialGuide from './components/MaterialGuide';

import { ModelFile, PrintConfig, MaterialType, MATERIALS } from './types';

export default function BoxPrintPage() {
  // State
  const [modelFile, setModelFile] = useState<ModelFile | null>(null);
  const [config, setConfig] = useState<PrintConfig>({
    material: 'PLA',
    color: MATERIALS.PLA.colors[0].hex,
    quantity: 1,
    quality: 'standard',
    infill: 20,
    scale: 1,
    instructions: ''
  });
  const [estimatedWeight, setEstimatedWeight] = useState(0);
  const [volume, setVolume] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  // Handlers
  const handleFileSelect = useCallback((file: ModelFile | null) => {
    setModelFile(file);
  }, []);

  const handleDimensionsCalculated = useCallback((
    dimensions: { x: number; y: number; z: number }, 
    calculatedVolume: number
  ) => {
    setModelFile(prev => prev ? { ...prev, dimensions, volume: calculatedVolume } : null);
    setVolume(calculatedVolume);
    // Estimate weight based on volume and material density (simplified)
    const density = 1.24; // g/cm³ for PLA-like materials
    setEstimatedWeight(calculatedVolume * density);
  }, []);

  const handleConfigChange = useCallback((updates: Partial<PrintConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }));
  }, []);

  const handleMaterialChange = useCallback((material: MaterialType) => {
    setConfig(prev => ({
      ...prev,
      material,
      color: MATERIALS[material].colors[0].hex
    }));
  }, []);

  const handleAddToCart = useCallback(() => {
    // Show success message
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
    // In production, this would add to actual cart state/API
  }, []);

  // Steps removed as per user request

  return (
    <main className="pt-[72px] md:pt-[80px] bg-white min-h-screen">
      {/* Hero Section - Enhanced */}
      <section className="relative bg-gradient-to-br from-neo-black via-gray-900 to-neo-black text-white overflow-hidden">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(rgba(255,214,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,214,0,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }} />
        </div>
        
        {/* Glowing orbs */}
        <div className="absolute top-10 right-[15%] w-40 h-40 bg-neo-yellow/30 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-0 left-[10%] w-60 h-60 bg-neo-yellow/20 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 right-[5%] w-24 h-24 bg-blue-500/20 rounded-full blur-[60px]" />
        
        {/* 3D geometric shapes */}
        <div className="absolute top-16 right-[20%] w-16 h-16 border-2 border-neo-yellow/30 rotate-45 animate-spin" style={{ animationDuration: '20s' }} />
        <div className="absolute bottom-20 right-[30%] w-8 h-8 bg-neo-yellow/20 rotate-12" />
        <div className="absolute top-1/3 left-[8%] w-6 h-6 border border-white/20 rounded-full" />
        
        <div className="container relative z-10 py-16 md:py-20 lg:py-24">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">
            <div className="max-w-2xl">
              {/* Brand Badge with glow */}
              <div className="inline-flex items-center gap-3 mb-6 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
                <div className="w-10 h-10 bg-gradient-to-br from-neo-yellow to-yellow-500 rounded-lg flex items-center justify-center shadow-lg shadow-neo-yellow/30">
                  <Printer size={22} className="text-neo-black" />
                </div>
                <span className="font-black text-2xl tracking-tight">
                  Box<span className="text-neo-yellow">Print</span>
                </span>
                <span className="ml-2 px-2 py-0.5 bg-neo-yellow/20 text-neo-yellow text-xs font-bold rounded-full">
                  3D PRINTING
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight leading-[1.1]">
                Transform Your Ideas Into
                <span className="block mt-2 bg-gradient-to-r from-neo-yellow via-yellow-400 to-neo-yellow bg-clip-text text-transparent">
                  Reality
                </span>
              </h1>
              
              <p className="text-white/70 text-base md:text-lg max-w-lg mb-8 leading-relaxed">
                Professional-grade 3D printing made accessible. Upload your model, 
                customize materials & finishes, and receive high-quality prints at your doorstep.
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <a 
                  href="#upload-section"
                  className="inline-flex items-center gap-2 bg-neo-yellow text-neo-black px-6 py-3 rounded-xl font-bold hover:bg-yellow-400 transition-all hover:scale-105 hover:shadow-lg hover:shadow-neo-yellow/30"
                >
                  <Upload size={20} />
                  Upload Model
                </a>
                <Link 
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-bold border border-white/20 hover:bg-white/20 transition-all"
                >
                  Get a Quote
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-4 lg:gap-6">
              {[
                { value: '0.1mm', label: 'Layer Precision', icon: Layers },
                { value: '4+', label: 'Premium Materials', icon: Palette },
                { value: '48hr', label: 'Fast Turnaround', icon: Clock },
              ].map((stat, i) => (
                <div 
                  key={i} 
                  className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 md:p-6 text-center hover:bg-white/10 hover:border-neo-yellow/30 transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-neo-yellow/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                  <stat.icon size={24} className="mx-auto mb-2 text-neo-yellow/70 group-hover:text-neo-yellow transition-colors" />
                  <span className="block text-2xl md:text-3xl font-black text-neo-yellow font-mono">
                    {stat.value}
                  </span>
                  <span className="text-[10px] md:text-xs text-white/50 uppercase tracking-wider mt-1 block">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Trust indicators */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 text-white/40 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle size={16} className="text-green-400" />
                <span>Quality Guaranteed</span>
              </div>
              <div className="flex items-center gap-2">
                <Star size={16} className="text-neo-yellow" />
                <span>Expert Support</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield size={16} className="text-blue-400" />
                <span>Secure Uploads</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck size={16} className="text-purple-400" />
                <span>Pan-India Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section id="upload-section" className="py-8 md:py-12">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            
            {/* Left Column - Model Viewer & Upload */}
            <div className="lg:col-span-2 space-y-6">
              {/* File Uploader */}
              {!modelFile && (
                <div className="bg-white rounded-xl border border-neo-black/10 p-6">
                  <h2 className="text-lg font-bold text-neo-black mb-4 flex items-center gap-2">
                    <Upload size={20} className="text-neo-yellow" />
                    Upload Your Model
                  </h2>
                  <FileUploader onFileSelect={handleFileSelect} currentFile={modelFile} />
                </div>
              )}

              {/* Model Viewer */}
              {modelFile && (
                <div className="bg-white rounded-xl border border-neo-black/10 p-6 h-[600px] flex flex-col">
                  <div className="flex items-center justify-between mb-4 shrink-0">
                    <h2 className="text-lg font-bold text-neo-black flex items-center gap-2">
                      <Box size={20} className="text-neo-yellow" />
                      Model Preview
                    </h2>
                    <button
                      onClick={() => setModelFile(null)}
                      className="text-sm text-neo-black/60 hover:text-neo-black transition-colors"
                    >
                      Change file
                    </button>
                  </div>
                  <div className="flex-1 min-h-0">
                    <ModelViewer 
                      modelFile={modelFile}
                      materialColor={config.color}
                      onDimensionsCalculated={handleDimensionsCalculated}
                    />
                  </div>
                </div>
              )}

              {/* Configuration Panel */}
              {modelFile && (
                <div className="bg-white rounded-xl border border-neo-black/10 p-6">
                  <h2 className="text-lg font-bold text-neo-black mb-6 flex items-center gap-2">
                    <Layers size={20} className="text-neo-yellow" />
                    Configure Your Print
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Material Selection */}
                    <div>
                      <MaterialSelector
                        selectedMaterial={config.material}
                        selectedColor={config.color}
                        onMaterialChange={handleMaterialChange}
                        onColorChange={(color) => handleConfigChange({ color })}
                        estimatedWeight={estimatedWeight * (config.infill / 100 * 0.7 + 0.3)}
                      />
                    </div>
                    
                    {/* Print Options */}
                    <div>
                      <PrintOptions
                        config={config}
                        onConfigChange={handleConfigChange}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Pricing */}
            <div className="lg:col-span-1">
              <div className="sticky top-[140px]">
                <PricingCalculator
                  config={config}
                  estimatedWeight={estimatedWeight}
                  volume={volume}
                  modelFile={modelFile}
                  onAddToCart={handleAddToCart}
                  isModelLoaded={!!modelFile && !!modelFile.dimensions}
                />

                {/* Trust Badges */}
                <div className="mt-6 grid grid-cols-3 gap-3">
                  {[
                    { icon: Shield, label: 'Quality Guarantee' },
                    { icon: Truck, label: 'Free Shipping 500+' },
                    { icon: Clock, label: '48hr Turnaround' },
                  ].map((badge, i) => (
                    <div key={i} className="text-center p-3 bg-neo-light-gray rounded-lg">
                      <badge.icon size={20} className="mx-auto text-neo-black/60 mb-1" />
                      <span className="text-[10px] text-neo-black/60 leading-tight block">{badge.label}</span>
                    </div>
                  ))}
                </div>

                {/* Help Card */}
                <div className="mt-6 p-4 bg-neo-black rounded-xl text-white">
                  <h4 className="font-bold mb-2">Need help choosing?</h4>
                  <p className="text-sm text-white/60 mb-3">
                    Our experts can help you select the right material and settings.
                  </p>
                  <Link 
                    href="/contact"
                    className="inline-flex items-center gap-2 text-neo-yellow text-sm font-bold hover:underline"
                  >
                    Contact us <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Material Guide Section */}
      <MaterialGuide />

      {/* Features Section */}
      <section className="py-16 md:py-24 bg-white border-t border-neo-black/10">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-block px-3 py-1 bg-neo-yellow text-neo-black text-xs font-bold uppercase tracking-wider rounded mb-4">
              Why BoxPrint
            </span>
            <h2 className="text-3xl md:text-4xl font-black mb-4 tracking-tight">
              Professional Quality, <span className="text-neo-yellow">Hassle-Free</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Printer size={24} />,
                title: 'Industrial Printers',
                desc: 'Professional-grade machines for consistent, high-quality results every time.'
              },
              {
                icon: <Palette size={24} />,
                title: 'Premium Materials',
                desc: 'Carefully sourced filaments from trusted manufacturers for optimal performance.'
              },
              {
                icon: <Star size={24} />,
                title: 'Expert Review',
                desc: 'Every file is checked by our team for printability and optimized settings.'
              },
              {
                icon: <Truck size={24} />,
                title: 'Fast Delivery',
                desc: 'Most orders ship within 48 hours. Express options available.'
              }
            ].map((feature, i) => (
              <div key={i} className="p-6 bg-neo-light-gray rounded-xl">
                <div className="w-12 h-12 bg-neo-yellow rounded-lg flex items-center justify-center text-neo-black mb-4">
                  {feature.icon}
                </div>
                <h3 className="font-bold text-lg text-neo-black mb-2">{feature.title}</h3>
                <p className="text-sm text-neo-black/60">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Toast */}
      {showSuccess && (
        <div className="fixed bottom-6 right-6 bg-neo-black text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom-4 z-50">
          <CheckCircle size={24} className="text-green-400" />
          <div>
            <p className="font-bold">Added to cart!</p>
            <p className="text-sm text-white/60">Your print order is ready for checkout.</p>
          </div>
          <Link href="/cart" className="ml-4 px-4 py-2 bg-neo-yellow text-neo-black rounded-lg font-bold text-sm">
            View Cart
          </Link>
        </div>
      )}
    </main>
  );
}
