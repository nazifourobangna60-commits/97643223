export enum GardenStyle {
  JAPANESE_ZEN = 'Japanese Zen',
  ENGLISH_COTTAGE = 'English Cottage',
  MODERN_MINIMALIST = 'Modern Minimalist',
  MEDITERRANEAN = 'Mediterranean',
  TROPICAL_PARADISE = 'Tropical Paradise',
  WILDFLOWER_MEADOW = 'Wildflower Meadow',
  URBAN_ROOFTOP = 'Urban Rooftop'
}

export enum Sunlight {
  FULL_SUN = 'Full Sun',
  PARTIAL_SHADE = 'Partial Shade',
  FULL_SHADE = 'Full Shade'
}

export enum GardenSize {
  SMALL_BALCONY = 'Small Balcony (approx 50 sq ft)',
  SMALL_YARD = 'Small Yard (approx 500 sq ft)',
  MEDIUM_BACKYARD = 'Medium Backyard (approx 1500 sq ft)',
  LARGE_ESTATE = 'Large Estate (approx 5000+ sq ft)'
}

export interface GardenPreferences {
  style: GardenStyle;
  size: GardenSize;
  sunlight: Sunlight;
  climateZone: string;
  notes: string;
}

export interface PlantRecommendation {
  name: string;
  scientificName?: string;
  description: string;
  careLevel: 'Easy' | 'Moderate' | 'Difficult';
  sunNeeds: string;
  waterNeeds: string;
}

export interface GardenDesign {
  layoutTitle: string;
  layoutDescription: string;
  atmosphere: string;
  maintenanceTips: string[];
  colorPalette: string[];
  plants: PlantRecommendation[];
}

export interface GenerationResult {
  design: GardenDesign;
  imageUrl: string; // Base64
}

export interface LoadingState {
  status: 'idle' | 'generating_plan' | 'rendering_image' | 'complete' | 'error';
  message?: string;
}