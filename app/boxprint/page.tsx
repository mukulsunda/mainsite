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
    <main className="pt-[72px] md:pt-[80px] bg-neo-black min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-neo-black text-white overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 dot-pattern-animated opacity-30" />
        
        {/* Floating elements */}
        <div className="absolute top-20 right-[10%] w-20 h-20 bg-neo-yellow/20 rounded-full blur-2xl" />
        <div className="absolute bottom-10 left-[5%] w-32 h-32 bg-neo-yellow/10 rounded-full blur-3xl" />
        
        <div className="container relative z-10 py-6 md:py-12 px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-6">
            <div>
              {/* Brand Badge */}
              <div className="flex items-center gap-2.5 md:gap-3 mb-2 md:mb-3">
                <div className="w-8 h-8 md:w-9 md:h-9 bg-neo-yellow rounded-lg flex items-center justify-center">
                  <Printer size={18} className="text-neo-black" />
                </div>
                <span className="font-black text-lg md:text-xl tracking-tight">
                  Box<span className="text-neo-yellow">Print</span>
                </span>
              </div>
              
              <h1 className="text-xl md:text-3xl lg:text-4xl font-black mb-2 md:mb-3 tracking-tight max-w-xl text-white">
                Professional 3D Printing, <span className="text-neo-yellow">Made Simple</span>
              </h1>
              <p className="text-white/60 text-xs md:text-sm max-w-lg">
                Upload your model, choose your material, and get an instant quote. 
                High-quality prints delivered to your door.
              </p>
            </div>
            
            {/* Stats - Horizontal scroll on mobile */}
            <div className="flex gap-3 md:gap-6 overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0 pb-2 md:pb-0 scrollbar-hide">
              {[
                { value: '0.1mm', label: 'Layer precision' },
                { value: '4+', label: 'Materials' },
                { value: '48hr', label: 'Turnaround' },
              ].map((stat, i) => (
                <div key={i} className="text-center flex-shrink-0 bg-white/5 rounded-lg px-3 py-2 md:p-0 md:bg-transparent">
                  <span className="block text-lg md:text-2xl font-black text-neo-yellow font-mono">
                    {stat.value}
                  </span>
                  <span className="text-[9px] md:text-[10px] text-white/40 uppercase tracking-wider whitespace-nowrap">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section id="upload-section" className="py-4 md:py-10">
        <div className="container px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            
            {/* Left Column - Model Viewer & Upload */}
            <div className="lg:col-span-2 space-y-4 md:space-y-6">
              {/* File Uploader */}
              {!modelFile && (
                <div className="robot-card p-4 md:p-6">
                  <h2 className="text-base md:text-lg font-bold text-white mb-3 md:mb-4 flex items-center gap-2">
                    <Upload size={18} className="text-neo-yellow" />
                    Upload Your Model
                  </h2>
                  <FileUploader onFileSelect={handleFileSelect} currentFile={modelFile} />
                </div>
              )}

              {/* Model Viewer */}
              {modelFile && (
                <div className="robot-card p-4 md:p-6 h-[400px] md:h-[600px] flex flex-col">
                  <div className="flex items-center justify-between mb-3 md:mb-4 shrink-0">
                    <h2 className="text-base md:text-lg font-bold text-white flex items-center gap-2">
                      <Box size={18} className="text-neo-yellow" />
                      Model Preview
                    </h2>
                    <button
                      onClick={() => setModelFile(null)}
                      className="text-sm text-white/60 hover:text-white active:opacity-70 transition-all px-2 py-1"
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
                <div className="robot-card p-4 md:p-6">
                  <h2 className="text-base md:text-lg font-bold text-white mb-4 md:mb-6 flex items-center gap-2">
                    <Layers size={18} className="text-neo-yellow" />
                    Configure Your Print
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
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
              <div className="sticky top-[100px] md:top-[140px]">
                <PricingCalculator
                  config={config}
                  estimatedWeight={estimatedWeight}
                  volume={volume}
                  modelFile={modelFile}
                  onAddToCart={handleAddToCart}
                  isModelLoaded={!!modelFile && !!modelFile.dimensions}
                />

                {/* Trust Badges */}
                <div className="mt-4 md:mt-6 grid grid-cols-3 gap-2 md:gap-3">
                  {[
                    { icon: Shield, label: 'Quality Guarantee' },
                    { icon: Truck, label: 'Free Shipping 500+' },
                    { icon: Clock, label: '48hr Turnaround' },
                  ].map((badge, i) => (
                    <div key={i} className="text-center p-2.5 md:p-3 bg-white/5 rounded-xl border border-white/10">
                      <badge.icon size={18} className="mx-auto text-white/60 mb-1" />
                      <span className="text-[9px] md:text-[10px] text-white/60 leading-tight block">{badge.label}</span>
                    </div>
                  ))}
                </div>

                {/* Help Card */}
                <div className="mt-4 md:mt-6 p-3.5 md:p-4 bg-neo-gray border border-white/10 rounded-xl text-white">
                  <h4 className="font-bold text-sm md:text-base mb-1.5 md:mb-2">Need help choosing?</h4>
                  <p className="text-xs md:text-sm text-white/60 mb-2.5 md:mb-3">
                    Our experts can help you select the right material and settings.
                  </p>
                  <Link 
                    href="/contact"
                    className="inline-flex items-center gap-2 text-neo-yellow text-sm font-bold hover:underline active:opacity-70 transition-opacity"
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
      <section className="py-12 md:py-24 bg-neo-gray border-t border-white/10">
        <div className="container px-4">
          <div className="text-center max-w-2xl mx-auto mb-8 md:mb-12">
            <span className="section-label mb-3 md:mb-4">
              Why BoxPrint
            </span>
            <h2 className="text-2xl md:text-4xl font-black text-white mb-3 md:mb-4 tracking-tight">
              Professional Quality, <span className="text-neo-yellow">Hassle-Free</span>
            </h2>
          </div>

          {/* Mobile: Horizontal scroll, Desktop: Grid */}
          <div className="md:hidden overflow-x-auto -mx-4 px-4 pb-4 scrollbar-hide">
            <div className="flex gap-3" style={{ width: 'max-content' }}>
              {[
                {
                  icon: <Printer size={22} />,
                  title: 'Industrial Printers',
                  desc: 'Professional-grade machines for consistent, high-quality results every time.'
                },
                {
                  icon: <Palette size={22} />,
                  title: 'Premium Materials',
                  desc: 'Carefully sourced filaments from trusted manufacturers for optimal performance.'
                },
                {
                  icon: <Star size={22} />,
                  title: 'Expert Review',
                  desc: 'Every file is checked by our team for printability and optimized settings.'
                },
                {
                  icon: <Truck size={22} />,
                  title: 'Fast Delivery',
                  desc: 'Most orders ship within 48 hours. Express options available.'
                }
              ].map((feature, i) => (
                <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-xl w-[220px] flex-shrink-0 active:scale-[0.98] transition-transform">
                  <div className="w-10 h-10 bg-neo-yellow rounded-lg flex items-center justify-center text-neo-black mb-3">
                    {feature.icon}
                  </div>
                  <h3 className="font-bold text-base text-white mb-1.5">{feature.title}</h3>
                  <p className="text-xs text-white/60">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
              <div key={i} className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                <div className="w-12 h-12 bg-neo-yellow rounded-lg flex items-center justify-center text-neo-black mb-4">
                  {feature.icon}
                </div>
                <h3 className="font-bold text-lg text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-white/60">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Toast */}
      {showSuccess && (
        <div className="fixed bottom-20 md:bottom-6 left-4 right-4 md:left-auto md:right-6 md:w-auto bg-neo-gray border border-white/10 text-white px-4 md:px-6 py-3 md:py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom-4 z-50">
          <CheckCircle size={22} className="text-green-400 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="font-bold text-sm md:text-base">Added to cart!</p>
            <p className="text-xs md:text-sm text-white/60 truncate">Your print order is ready for checkout.</p>
          </div>
          <Link href="/cart" className="ml-2 md:ml-4 px-3 md:px-4 py-2 bg-neo-yellow text-neo-black rounded-full font-bold text-sm whitespace-nowrap active:scale-95 transition-transform">
            View Cart
          </Link>
        </div>
      )}
    </main>
  );
}
