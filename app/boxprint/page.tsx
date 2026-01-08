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
      {/* Hero Section */}
      <section className="relative bg-neo-black text-white overflow-hidden">
        <div className="absolute inset-0 grid-bg-dark opacity-30" />
        
        {/* Floating elements */}
        <div className="absolute top-20 right-[10%] w-20 h-20 bg-neo-yellow/20 rounded-full blur-2xl" />
        <div className="absolute bottom-10 left-[5%] w-32 h-32 bg-neo-yellow/10 rounded-full blur-3xl" />
        
        <div className="container relative z-10 py-8 md:py-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              {/* Brand Badge */}
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 bg-neo-yellow rounded-lg flex items-center justify-center">
                  <Printer size={20} className="text-neo-black" />
                </div>
                <span className="font-black text-xl tracking-tight">
                  Box<span className="text-neo-yellow">Print</span>
                </span>
              </div>
              
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-black mb-3 tracking-tight max-w-xl text-white">
                Professional 3D Printing, <span className="text-neo-yellow">Made Simple</span>
              </h1>
              <p className="text-white/60 text-sm max-w-lg">
                Upload your model, choose your material, and get an instant quote. 
                High-quality prints delivered to your door.
              </p>
            </div>
            
            {/* Stats */}
            <div className="flex gap-4 md:gap-6">
              {[
                { value: '0.1mm', label: 'Layer precision' },
                { value: '4+', label: 'Materials' },
                { value: '48hr', label: 'Turnaround' },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <span className="block text-xl md:text-2xl font-black text-neo-yellow font-mono">
                    {stat.value}
                  </span>
                  <span className="text-[10px] text-white/40 uppercase tracking-wider">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section id="upload-section" className="py-6 md:py-10">
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
