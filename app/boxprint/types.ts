// BoxPrint Types and Constants

export type MaterialType = 'PLA' | 'ABS' | 'PETG' | 'TPU';

export type PrintQuality = 'draft' | 'standard' | 'high';

export interface MaterialColor {
  name: string;
  hex: string;
  available: boolean;
}

export interface Material {
  id: MaterialType;
  name: string;
  description: string;
  pricePerGram: number; // in INR
  colors: MaterialColor[];
  properties: {
    strength: number; // 1-5
    flexibility: number; // 1-5
    heatResistance: number; // 1-5
    printability: number; // 1-5
  };
  bestFor: string[];
  pros: string[];
  cons: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  printTemp: string;
  bedTemp: string;
}

export interface ModelFile {
  file: File;
  name: string;
  size: number; // in bytes
  format: string;
  dimensions?: {
    x: number;
    y: number;
    z: number;
  };
  volume?: number; // in cm³
  estimatedWeight?: number; // in grams based on material
}

export interface PrintConfig {
  material: MaterialType;
  color: string;
  quantity: number;
  quality: PrintQuality;
  infill: number; // percentage
  scale: number; // multiplier
  instructions: string;
}

export interface PriceBreakdown {
  materialCost: number;
  laborCost: number;
  setupFee: number;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  estimatedWeight: number;
  estimatedTime: string;
}

// Material Data
export const MATERIALS: Record<MaterialType, Material> = {
  PLA: {
    id: 'PLA',
    name: 'PLA (Polylactic Acid)',
    description: 'The most popular 3D printing material. Perfect for prototypes, decorative items, and concept models.',
    pricePerGram: 3.5,
    colors: [
      { name: 'White', hex: '#FFFFFF', available: true },
      { name: 'Black', hex: '#1A1A1A', available: true },
      { name: 'Red', hex: '#E53935', available: true },
      { name: 'Blue', hex: '#1E88E5', available: true },
      { name: 'Green', hex: '#43A047', available: true },
      { name: 'Yellow', hex: '#FDD835', available: true },
      { name: 'Orange', hex: '#FB8C00', available: true },
      { name: 'Gray', hex: '#757575', available: true },
    ],
    properties: {
      strength: 3,
      flexibility: 2,
      heatResistance: 2,
      printability: 5,
    },
    bestFor: ['Prototypes', 'Decorative items', 'Concept models', 'Educational projects'],
    pros: ['Easy to print', 'Low cost', 'Biodegradable', 'No heated bed required', 'Minimal warping'],
    cons: ['Low heat resistance (~60°C)', 'Brittle under stress', 'Not UV stable'],
    difficulty: 'beginner',
    printTemp: '190-220°C',
    bedTemp: '20-60°C',
  },
  ABS: {
    id: 'ABS',
    name: 'ABS (Acrylonitrile Butadiene Styrene)',
    description: 'Industrial-grade thermoplastic known for durability and heat resistance. Ideal for functional parts.',
    pricePerGram: 4.0,
    colors: [
      { name: 'White', hex: '#F5F5F5', available: true },
      { name: 'Black', hex: '#212121', available: true },
      { name: 'Red', hex: '#C62828', available: true },
      { name: 'Blue', hex: '#1565C0', available: true },
      { name: 'Gray', hex: '#616161', available: true },
      { name: 'Natural', hex: '#E8E0D5', available: true },
    ],
    properties: {
      strength: 4,
      flexibility: 3,
      heatResistance: 4,
      printability: 3,
    },
    bestFor: ['Functional parts', 'Enclosures', 'Automotive parts', 'Electronic housings'],
    pros: ['High impact resistance', 'Heat resistant (~100°C)', 'Can be post-processed', 'Durable'],
    cons: ['Warping issues', 'Requires enclosure', 'Fumes during printing', 'Bed adhesion challenges'],
    difficulty: 'intermediate',
    printTemp: '220-250°C',
    bedTemp: '95-110°C',
  },
  PETG: {
    id: 'PETG',
    name: 'PETG (Polyethylene Terephthalate Glycol)',
    description: 'The best of both worlds - combines ease of PLA with strength of ABS. Great for mechanical parts.',
    pricePerGram: 4.5,
    colors: [
      { name: 'Clear', hex: '#E3F2FD', available: true },
      { name: 'White', hex: '#FAFAFA', available: true },
      { name: 'Black', hex: '#263238', available: true },
      { name: 'Blue', hex: '#0D47A1', available: true },
      { name: 'Green', hex: '#2E7D32', available: true },
      { name: 'Orange', hex: '#E65100', available: true },
    ],
    properties: {
      strength: 4,
      flexibility: 4,
      heatResistance: 3,
      printability: 4,
    },
    bestFor: ['Mechanical parts', 'Outdoor applications', 'Food-safe containers', 'Transparent prints'],
    pros: ['Strong and durable', 'Chemical resistant', 'Low warping', 'Food safe options'],
    cons: ['Stringing issues', 'Hygroscopic', 'Scratches easily', 'Requires tuning'],
    difficulty: 'intermediate',
    printTemp: '220-250°C',
    bedTemp: '70-80°C',
  },
  TPU: {
    id: 'TPU',
    name: 'TPU (Thermoplastic Polyurethane)',
    description: 'Flexible, rubber-like material perfect for parts requiring elasticity and impact absorption.',
    pricePerGram: 6.0,
    colors: [
      { name: 'Black', hex: '#1B1B1B', available: true },
      { name: 'White', hex: '#F0F0F0', available: true },
      { name: 'Red', hex: '#B71C1C', available: true },
      { name: 'Blue', hex: '#0D47A1', available: true },
      { name: 'Clear', hex: '#ECEFF1', available: true },
    ],
    properties: {
      strength: 3,
      flexibility: 5,
      heatResistance: 3,
      printability: 2,
    },
    bestFor: ['Phone cases', 'Gaskets & seals', 'Wearables', 'Shock absorbers', 'Flexible hinges'],
    pros: ['Highly flexible', 'Impact resistant', 'Abrasion resistant', 'Chemical resistant'],
    cons: ['Slow print speed', 'Stringing', 'Difficult retraction', 'Requires direct drive'],
    difficulty: 'advanced',
    printTemp: '220-250°C',
    bedTemp: '50-60°C',
  },
};

export const QUALITY_SETTINGS: Record<PrintQuality, { layerHeight: number; name: string; timeMultiplier: number }> = {
  draft: { layerHeight: 0.3, name: 'Draft (0.3mm)', timeMultiplier: 0.6 },
  standard: { layerHeight: 0.2, name: 'Standard (0.2mm)', timeMultiplier: 1.0 },
  high: { layerHeight: 0.1, name: 'High Detail (0.1mm)', timeMultiplier: 1.8 },
};

export const INFILL_OPTIONS = [
  { value: 10, label: '10% - Decorative', description: 'For display models only' },
  { value: 20, label: '20% - Standard', description: 'Good balance of strength and material' },
  { value: 40, label: '40% - Strong', description: 'For functional parts' },
  { value: 60, label: '60% - Very Strong', description: 'Heavy duty applications' },
  { value: 100, label: '100% - Solid', description: 'Maximum strength' },
];

export const SUPPORTED_FORMATS = ['.stl', '.obj', '.step', '.stp', '.3mf'];

export const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB

// Pricing constants
export const LABOR_RATE_PER_HOUR = 150; // INR per hour
export const SETUP_FEE = 50; // Base setup fee in INR
export const MIN_ORDER_VALUE = 199; // Minimum order value in INR
