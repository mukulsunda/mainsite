"use client";

import { Minus, Plus, Settings, ChevronDown, Info, AlertTriangle } from 'lucide-react';
import { PrintConfig, PrintQuality, QUALITY_SETTINGS, INFILL_OPTIONS } from '../types';

interface PrintOptionsProps {
  config: PrintConfig;
  onConfigChange: (updates: Partial<PrintConfig>) => void;
}

export default function PrintOptions({ config, onConfigChange }: PrintOptionsProps) {
  const handleQuantityChange = (delta: number) => {
    const newQuantity = Math.max(1, Math.min(100, config.quantity + delta));
    onConfigChange({ quantity: newQuantity });
  };

  return (
    <div className="space-y-5">
      {/* Print Quality */}
      <div>
        <label className="block text-sm font-bold text-neo-black mb-3">
          Print Quality
        </label>
        <div className="grid grid-cols-3 gap-2">
          {(Object.keys(QUALITY_SETTINGS) as PrintQuality[]).map((quality) => {
            const setting = QUALITY_SETTINGS[quality];
            const isSelected = config.quality === quality;
            
            return (
              <button
                key={quality}
                onClick={() => onConfigChange({ quality })}
                className={`
                  p-3 rounded-lg border-2 transition-all text-center
                  ${isSelected 
                    ? 'border-neo-black bg-neo-yellow/10' 
                    : 'border-neo-black/10 hover:border-neo-black/30'
                  }
                `}
              >
                <span className={`block text-sm font-bold ${isSelected ? 'text-neo-black' : 'text-neo-black/70'}`}>
                  {quality.charAt(0).toUpperCase() + quality.slice(1)}
                </span>
                <span className="block text-xs text-neo-black/40 mt-0.5">
                  {setting.layerHeight}mm
                </span>
              </button>
            );
          })}
        </div>
        <p className="text-xs text-neo-black/40 mt-2 flex items-center gap-1">
          <Info size={12} />
          Higher quality = longer print time
        </p>
      </div>

      {/* Infill Percentage */}
      <div>
        <label className="block text-sm font-bold text-neo-black mb-3">
          Infill Density
        </label>
        <select
          value={config.infill}
          onChange={(e) => onConfigChange({ infill: parseInt(e.target.value) })}
          className="w-full p-3 bg-neo-light-gray border border-neo-black/10 rounded-lg text-sm font-medium appearance-none cursor-pointer focus:outline-none focus:border-neo-black"
        >
          {INFILL_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label} - {option.description}
            </option>
          ))}
        </select>
        
        {/* Infill Visual */}
        <div className="mt-3 p-3 bg-neo-light-gray rounded-lg">
          <div className="grid grid-cols-5 gap-1 h-8">
            {Array.from({ length: 10 }).map((_, i) => (
              <div 
                key={i}
                className={`rounded-sm ${i < config.infill / 10 ? 'bg-neo-yellow' : 'bg-neo-black/10'}`}
              />
            ))}
          </div>
          <p className="text-xs text-neo-black/40 mt-2 text-center">
            {config.infill}% filled interior
          </p>
        </div>
      </div>

      {/* Scale */}
      <div>
        <label className="block text-sm font-bold text-neo-black mb-3">
          Scale
        </label>
        <div className="flex items-center gap-3">
          <input
            type="range"
            min="0.5"
            max="3"
            step="0.1"
            value={config.scale}
            onChange={(e) => onConfigChange({ scale: parseFloat(e.target.value) })}
            className="flex-1 h-2 bg-neo-light-gray rounded-lg appearance-none cursor-pointer accent-neo-yellow"
          />
          <span className="w-16 text-center font-mono text-sm bg-neo-light-gray px-2 py-1 rounded">
            {(config.scale * 100).toFixed(0)}%
          </span>
        </div>
        {config.scale !== 1 && (
          <p className="text-xs text-neo-black/40 mt-2 flex items-center gap-1">
            <AlertTriangle size={12} />
            {config.scale < 1 ? 'Scaled down - check for thin walls' : 'Scaled up - may increase print time'}
          </p>
        )}
      </div>

      {/* Quantity */}
      <div>
        <label className="block text-sm font-bold text-neo-black mb-3">
          Quantity
        </label>
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleQuantityChange(-1)}
            disabled={config.quantity <= 1}
            className="w-10 h-10 rounded-lg border border-neo-black/10 flex items-center justify-center hover:bg-neo-light-gray disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <Minus size={18} />
          </button>
          <input
            type="number"
            min="1"
            max="100"
            value={config.quantity}
            onChange={(e) => onConfigChange({ quantity: Math.max(1, Math.min(100, parseInt(e.target.value) || 1)) })}
            className="flex-1 text-center font-bold text-lg bg-neo-light-gray rounded-lg py-2 focus:outline-none focus:ring-2 focus:ring-neo-yellow"
          />
          <button
            onClick={() => handleQuantityChange(1)}
            disabled={config.quantity >= 100}
            className="w-10 h-10 rounded-lg border border-neo-black/10 flex items-center justify-center hover:bg-neo-light-gray disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <Plus size={18} />
          </button>
        </div>
        {config.quantity >= 10 && (
          <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
            ✓ Bulk order discount may apply
          </p>
        )}
      </div>

      {/* Print Instructions */}
      <div>
        <label className="block text-sm font-bold text-neo-black mb-3">
          Special Instructions <span className="font-normal text-neo-black/40">(Optional)</span>
        </label>
        <textarea
          value={config.instructions}
          onChange={(e) => onConfigChange({ instructions: e.target.value })}
          placeholder="e.g., Orientation preference, surface finish requirements, strength priority areas..."
          rows={3}
          className="w-full p-3 bg-neo-light-gray border border-neo-black/10 rounded-lg text-sm resize-none focus:outline-none focus:border-neo-black placeholder:text-neo-black/30"
        />
        <div className="flex flex-wrap gap-2 mt-2">
          {['Maximize strength', 'Smooth surface', 'Fastest print', 'Support-free orientation'].map((preset) => (
            <button
              key={preset}
              onClick={() => onConfigChange({ instructions: config.instructions ? `${config.instructions}, ${preset}` : preset })}
              className="px-2 py-1 text-xs bg-white border border-neo-black/10 rounded hover:bg-neo-yellow/10 hover:border-neo-yellow transition-colors"
            >
              + {preset}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
