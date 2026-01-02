"use client";

import { useState } from 'react';
import { Check, Info, ChevronDown } from 'lucide-react';
import { MaterialType, MATERIALS } from '../types';

interface MaterialSelectorProps {
  selectedMaterial: MaterialType;
  selectedColor: string;
  onMaterialChange: (material: MaterialType) => void;
  onColorChange: (color: string) => void;
  estimatedWeight?: number;
}

export default function MaterialSelector({
  selectedMaterial,
  selectedColor,
  onMaterialChange,
  onColorChange,
  estimatedWeight
}: MaterialSelectorProps) {
  const [showDetails, setShowDetails] = useState(false);
  const material = MATERIALS[selectedMaterial];

  const PropertyBar = ({ value, max = 5, label }: { value: number; max?: number; label: string }) => (
    <div className="flex items-center gap-2">
      <span className="text-xs text-neo-black/60 w-20">{label}</span>
      <div className="flex-1 flex gap-0.5">
        {Array.from({ length: max }).map((_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full ${i < value ? 'bg-neo-yellow' : 'bg-neo-black/10'}`}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      {/* Material Selection */}
      <div>
        <label className="block text-sm font-bold text-neo-black mb-3">
          Material
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {(Object.keys(MATERIALS) as MaterialType[]).map((matId) => {
            const mat = MATERIALS[matId];
            const isSelected = selectedMaterial === matId;
            
            return (
              <button
                key={matId}
                onClick={() => {
                  onMaterialChange(matId);
                  // Reset to first available color
                  const firstColor = mat.colors.find(c => c.available);
                  if (firstColor) onColorChange(firstColor.hex);
                }}
                className={`
                  relative p-3 rounded-lg border-2 transition-all text-left
                  ${isSelected 
                    ? 'border-neo-black bg-neo-yellow/10' 
                    : 'border-neo-black/10 hover:border-neo-black/30'
                  }
                `}
              >
                {isSelected && (
                  <div className="absolute top-2 right-2 w-5 h-5 bg-neo-black rounded-full flex items-center justify-center">
                    <Check size={12} className="text-white" />
                  </div>
                )}
                <span className="font-bold text-sm text-neo-black block text-center">{matId}</span>
                <span className="block text-xs text-neo-black/60 mt-0.5 text-center">₹{mat.pricePerGram}/g</span>
                <div className="flex justify-center mt-2">
                  <span className={`
                    inline-block px-1.5 py-0.5 rounded text-[10px] font-medium uppercase
                    ${mat.difficulty === 'beginner' ? 'bg-green-100 text-green-700' : ''}
                    ${mat.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-700' : ''}
                    ${mat.difficulty === 'advanced' ? 'bg-red-100 text-red-700' : ''}
                  `}>
                    {mat.difficulty}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Material Details Toggle */}
      <button
        onClick={() => setShowDetails(!showDetails)}
        className="flex items-center gap-2 text-sm text-neo-black/60 hover:text-neo-black transition-colors"
      >
        <Info size={14} />
        <span>Material details</span>
        <ChevronDown size={14} className={`transition-transform ${showDetails ? 'rotate-180' : ''}`} />
      </button>

      {/* Material Details Panel */}
      {showDetails && (
        <div className="p-4 bg-neo-light-gray rounded-lg space-y-4">
          <div>
            <h4 className="font-bold text-sm text-neo-black mb-1">{material.name}</h4>
            <p className="text-xs text-neo-black/60">{material.description}</p>
          </div>
          
          <div className="space-y-2">
            <PropertyBar value={material.properties.strength} label="Strength" />
            <PropertyBar value={material.properties.flexibility} label="Flexibility" />
            <PropertyBar value={material.properties.heatResistance} label="Heat Res." />
            <PropertyBar value={material.properties.printability} label="Printability" />
          </div>

          <div className="flex gap-4 text-xs">
            <div>
              <span className="text-neo-black/40">Print Temp</span>
              <p className="font-mono text-neo-black">{material.printTemp}</p>
            </div>
            <div>
              <span className="text-neo-black/40">Bed Temp</span>
              <p className="font-mono text-neo-black">{material.bedTemp}</p>
            </div>
          </div>

          <div>
            <span className="text-xs text-neo-black/40">Best for:</span>
            <div className="flex flex-wrap gap-1 mt-1">
              {material.bestFor.slice(0, 3).map((use, i) => (
                <span key={i} className="px-2 py-0.5 bg-white rounded text-xs text-neo-black/70">
                  {use}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Color Selection */}
      <div>
        <label className="block text-sm font-bold text-neo-black mb-3">
          Color
        </label>
        <div className="flex flex-wrap gap-2">
          {material.colors.map((color) => {
            const isSelected = selectedColor === color.hex;
            return (
              <button
                key={color.hex}
                onClick={() => color.available && onColorChange(color.hex)}
                disabled={!color.available}
                className={`
                  relative w-10 h-10 rounded-lg border-2 transition-all
                  ${isSelected ? 'border-neo-black scale-110' : 'border-transparent'}
                  ${!color.available ? 'opacity-40 cursor-not-allowed' : 'hover:scale-105'}
                `}
                style={{ backgroundColor: color.hex }}
                title={color.name}
              >
                {isSelected && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Check size={16} className={color.hex === '#FFFFFF' || color.hex === '#F5F5F5' || color.hex === '#FAFAFA' || color.hex === '#F0F0F0' || color.hex === '#E3F2FD' || color.hex === '#ECEFF1' || color.hex === '#E8E0D5' ? 'text-neo-black' : 'text-white'} />
                  </div>
                )}
                {!color.available && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-0.5 bg-neo-black/40 rotate-45" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
        <p className="text-xs text-neo-black/40 mt-2">
          Selected: {material.colors.find(c => c.hex === selectedColor)?.name || 'None'}
        </p>
      </div>

      {/* Weight & Cost Preview */}
      {estimatedWeight && (
        <div className="p-3 bg-neo-black rounded-lg flex items-center justify-between">
          <div>
            <span className="text-xs text-white/60">Estimated material</span>
            <p className="font-bold text-white">{estimatedWeight.toFixed(1)}g</p>
          </div>
          <div className="text-right">
            <span className="text-xs text-white/60">Material cost</span>
            <p className="font-bold text-neo-yellow">₹{(estimatedWeight * material.pricePerGram).toFixed(2)}</p>
          </div>
        </div>
      )}
    </div>
  );
}
