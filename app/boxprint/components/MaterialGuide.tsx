"use client";

import { useState } from 'react';
import { ChevronDown, Zap, Flame, Droplets, Wind, Check, X } from 'lucide-react';
import { MaterialType, MATERIALS } from '../types';

export default function MaterialGuide() {
  const [expandedMaterial, setExpandedMaterial] = useState<MaterialType | null>(null);

  const materialIcons: Record<MaterialType, React.ReactNode> = {
    PLA: <Droplets size={20} />,
    ABS: <Flame size={20} />,
    PETG: <Zap size={20} />,
    TPU: <Wind size={20} />,
  };

  const PropertyBar = ({ value, max = 5 }: { value: number; max?: number }) => (
    <div className="flex gap-0.5">
      {Array.from({ length: max }).map((_, i) => (
        <div
          key={i}
          className={`h-2 w-4 rounded-sm ${i < value ? 'bg-neo-yellow' : 'bg-white/10'}`}
        />
      ))}
    </div>
  );

  return (
    <section className="py-16 md:py-24 bg-neo-gray">
      <div className="container">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-block px-3 py-1 bg-neo-yellow text-neo-black text-xs font-bold uppercase tracking-wider rounded mb-4">
            Material Guide
          </span>
          <h2 className="text-3xl md:text-4xl font-black mb-4 tracking-tight text-white">
            Choose the Right <span className="text-neo-yellow">Material</span>
          </h2>
          <p className="text-white/60">
            Each material has unique properties. Use this guide to select the best option for your project.
          </p>
        </div>

        {/* Material Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(Object.keys(MATERIALS) as MaterialType[]).map((matId) => {
            const material = MATERIALS[matId];
            const isExpanded = expandedMaterial === matId;
            
            return (
              <div
                key={matId}
                className={`
                  bg-white/5 rounded-xl border-2 transition-all overflow-hidden
                  ${isExpanded ? 'border-neo-yellow' : 'border-transparent hover:border-white/20'}
                `}
              >
                {/* Card Header */}
                <button
                  onClick={() => setExpandedMaterial(isExpanded ? null : matId)}
                  className="w-full p-5 flex items-start gap-4 text-left"
                >
                  {/* Icon */}
                  <div className={`
                    w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0
                    ${isExpanded ? 'bg-neo-yellow text-neo-black' : 'bg-white/5 text-white/60'}
                  `}>
                    {materialIcons[matId]}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-lg text-white">{matId}</h3>
                      <span className={`
                        px-2 py-0.5 rounded text-[10px] font-bold uppercase
                        ${material.difficulty === 'beginner' ? 'bg-green-500/20 text-green-400' : ''}
                        ${material.difficulty === 'intermediate' ? 'bg-yellow-500/20 text-yellow-400' : ''}
                        ${material.difficulty === 'advanced' ? 'bg-red-500/20 text-red-400' : ''}
                      `}>
                        {material.difficulty}
                      </span>
                    </div>
                    <p className="text-sm text-white/60 line-clamp-2">{material.description}</p>
                    
                    {/* Quick Stats */}
                    <div className="flex gap-4 mt-3">
                      <div>
                        <span className="text-[10px] text-white/40 uppercase">Strength</span>
                        <PropertyBar value={material.properties.strength} />
                      </div>
                      <div>
                        <span className="text-[10px] text-white/40 uppercase">Flex</span>
                        <PropertyBar value={material.properties.flexibility} />
                      </div>
                    </div>
                  </div>
                  
                  {/* Expand Icon */}
                  <ChevronDown 
                    size={20} 
                    className={`text-white/40 transition-transform flex-shrink-0 ${isExpanded ? 'rotate-180' : ''}`}
                  />
                </button>

                {/* Expanded Content */}
                {isExpanded && (
                  <div className="px-5 pb-5 space-y-5 border-t border-white/10 pt-5">
                    {/* All Properties */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-xs text-white/40 uppercase block mb-1">Strength</span>
                        <PropertyBar value={material.properties.strength} />
                      </div>
                      <div>
                        <span className="text-xs text-white/40 uppercase block mb-1">Flexibility</span>
                        <PropertyBar value={material.properties.flexibility} />
                      </div>
                      <div>
                        <span className="text-xs text-white/40 uppercase block mb-1">Heat Resistance</span>
                        <PropertyBar value={material.properties.heatResistance} />
                      </div>
                      <div>
                        <span className="text-xs text-white/40 uppercase block mb-1">Printability</span>
                        <PropertyBar value={material.properties.printability} />
                      </div>
                    </div>

                    {/* Best For */}
                    <div>
                      <span className="text-xs text-white/40 uppercase block mb-2">Best For</span>
                      <div className="flex flex-wrap gap-2">
                        {material.bestFor.map((use, i) => (
                          <span key={i} className="px-2 py-1 bg-white/5 rounded text-xs text-white">
                            {use}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Pros & Cons */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-xs text-white/40 uppercase block mb-2">Pros</span>
                        <ul className="space-y-1">
                          {material.pros.slice(0, 4).map((pro, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs text-white">
                              <Check size={12} className="text-green-400 mt-0.5 flex-shrink-0" />
                              {pro}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <span className="text-xs text-white/40 uppercase block mb-2">Cons</span>
                        <ul className="space-y-1">
                          {material.cons.slice(0, 4).map((con, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs text-white">
                              <X size={12} className="text-red-400 mt-0.5 flex-shrink-0" />
                              {con}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Technical Specs */}
                    <div className="flex gap-6 p-3 bg-white/5 rounded-lg">
                      <div>
                        <span className="text-[10px] text-white/40 uppercase">Print Temp</span>
                        <p className="font-mono text-sm font-bold text-white">{material.printTemp}</p>
                      </div>
                      <div>
                        <span className="text-[10px] text-white/40 uppercase">Bed Temp</span>
                        <p className="font-mono text-sm font-bold text-white">{material.bedTemp}</p>
                      </div>
                      <div>
                        <span className="text-[10px] text-white/40 uppercase">Price</span>
                        <p className="font-mono text-sm font-bold text-white">₹{material.pricePerGram}/g</p>
                      </div>
                    </div>

                    {/* Available Colors */}
                    <div>
                      <span className="text-xs text-white/40 uppercase block mb-2">Available Colors</span>
                      <div className="flex flex-wrap gap-1">
                        {material.colors.filter(c => c.available).map((color) => (
                          <div
                            key={color.hex}
                            className="w-6 h-6 rounded-md border border-white/10"
                            style={{ backgroundColor: color.hex }}
                            title={color.name}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Comparison Table */}
        <div className="mt-12 bg-white/5 rounded-xl border border-white/10 overflow-hidden overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-neo-yellow text-neo-black">
                <th className="text-left p-4 font-bold">Property</th>
                {(Object.keys(MATERIALS) as MaterialType[]).map((mat) => (
                  <th key={mat} className="text-center p-4 font-bold">{mat}</th>
                ))}
              </tr>
            </thead>
            <tbody className="text-white">
              <tr className="border-b border-white/10">
                <td className="p-4 font-medium text-white/60">Price/gram</td>
                {(Object.keys(MATERIALS) as MaterialType[]).map((mat) => (
                  <td key={mat} className="p-4 text-center font-mono">₹{MATERIALS[mat].pricePerGram}</td>
                ))}
              </tr>
              <tr className="border-b border-white/10 bg-white/5">
                <td className="p-4 font-medium text-white/60">Strength</td>
                {(Object.keys(MATERIALS) as MaterialType[]).map((mat) => (
                  <td key={mat} className="p-4">
                    <div className="flex justify-center">
                      <PropertyBar value={MATERIALS[mat].properties.strength} />
                    </div>
                  </td>
                ))}
              </tr>
              <tr className="border-b border-white/10">
                <td className="p-4 font-medium text-white/60">Flexibility</td>
                {(Object.keys(MATERIALS) as MaterialType[]).map((mat) => (
                  <td key={mat} className="p-4">
                    <div className="flex justify-center">
                      <PropertyBar value={MATERIALS[mat].properties.flexibility} />
                    </div>
                  </td>
                ))}
              </tr>
              <tr className="border-b border-white/10 bg-white/5">
                <td className="p-4 font-medium text-white/60">Heat Resistance</td>
                {(Object.keys(MATERIALS) as MaterialType[]).map((mat) => (
                  <td key={mat} className="p-4">
                    <div className="flex justify-center">
                      <PropertyBar value={MATERIALS[mat].properties.heatResistance} />
                    </div>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="p-4 font-medium text-white/60">Difficulty</td>
                {(Object.keys(MATERIALS) as MaterialType[]).map((mat) => (
                  <td key={mat} className="p-4 text-center">
                    <span className={`
                      px-2 py-0.5 rounded text-[10px] font-bold uppercase
                      ${MATERIALS[mat].difficulty === 'beginner' ? 'bg-green-500/20 text-green-400' : ''}
                      ${MATERIALS[mat].difficulty === 'intermediate' ? 'bg-yellow-500/20 text-yellow-400' : ''}
                      ${MATERIALS[mat].difficulty === 'advanced' ? 'bg-red-500/20 text-red-400' : ''}
                    `}>
                      {MATERIALS[mat].difficulty}
                    </span>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Recommendation CTA */}
        <div className="mt-8 text-center">
          <p className="text-white/60 mb-4">
            Not sure which material to choose?
          </p>
          <button className="robot-btn">
            Get a Recommendation
            <Zap size={16} className="text-neo-black" />
          </button>
        </div>
      </div>
    </section>
  );
}
