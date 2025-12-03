import React from 'react';
import { GenerationResult, PlantRecommendation } from '../types';
import { Droplets, Sun, Activity, Download, ArrowLeft } from 'lucide-react';

interface DesignResultProps {
  result: GenerationResult;
  onReset: () => void;
}

const PlantCard: React.FC<{ plant: PlantRecommendation }> = ({ plant }) => (
  <div className="bg-white p-5 rounded-xl shadow-sm border border-earth-100 hover:shadow-md transition-shadow">
    <div className="flex justify-between items-start mb-2">
      <h4 className="font-serif font-bold text-lg text-earth-800">{plant.name}</h4>
      <span className={`text-xs font-bold px-2 py-1 rounded-full uppercase tracking-wider ${
        plant.careLevel === 'Easy' ? 'bg-leaf-100 text-leaf-800' :
        plant.careLevel === 'Moderate' ? 'bg-yellow-100 text-yellow-800' :
        'bg-red-100 text-red-800'
      }`}>
        {plant.careLevel}
      </span>
    </div>
    {plant.scientificName && (
      <p className="text-xs italic text-earth-500 mb-3">{plant.scientificName}</p>
    )}
    <p className="text-sm text-earth-600 mb-4 leading-relaxed">{plant.description}</p>
    
    <div className="flex gap-4 text-xs text-earth-500 border-t border-earth-100 pt-3">
      <div className="flex items-center gap-1">
        <Sun className="w-3 h-3" />
        {plant.sunNeeds}
      </div>
      <div className="flex items-center gap-1">
        <Droplets className="w-3 h-3" />
        {plant.waterNeeds}
      </div>
    </div>
  </div>
);

const DesignResult: React.FC<DesignResultProps> = ({ result, onReset }) => {
  const { design, imageUrl } = result;

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
      
      {/* Navigation */}
      <button 
        onClick={onReset}
        className="flex items-center gap-2 text-earth-600 hover:text-leaf-600 font-medium transition-colors mb-4"
      >
        <ArrowLeft className="w-5 h-5" />
        Design Another Garden
      </button>

      {/* Main Visual Header */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        <div className="order-2 lg:order-1 space-y-6">
          <div>
            <span className="inline-block px-3 py-1 bg-leaf-100 text-leaf-800 rounded-full text-sm font-bold tracking-wide mb-3">
              {design.atmosphere}
            </span>
            <h2 className="text-4xl lg:text-5xl font-serif font-bold text-earth-900 leading-tight">
              {design.layoutTitle}
            </h2>
          </div>
          
          <div className="prose prose-earth text-lg text-earth-700 leading-relaxed">
            <p>{design.layoutDescription}</p>
          </div>

          <div className="bg-earth-50 rounded-xl p-6 border border-earth-100">
            <h3 className="font-serif font-bold text-xl text-earth-800 mb-4 flex items-center gap-2">
               <Activity className="w-5 h-5 text-leaf-600" /> Maintenance Tips
            </h3>
            <ul className="space-y-3">
              {design.maintenanceTips.map((tip, idx) => (
                <li key={idx} className="flex gap-3 text-earth-700">
                  <span className="text-leaf-500 font-bold">•</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
          
          {/* Color Palette */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-earth-500 mb-3">Color Palette</h3>
            <div className="flex gap-3">
              {design.colorPalette.map((color, idx) => (
                <div key={idx} className="flex flex-col items-center gap-2">
                   <div 
                    className="w-12 h-12 rounded-full shadow-md ring-2 ring-white"
                    style={{ backgroundColor: color.toLowerCase().includes('green') ? '#4ade80' : 'gray' }} // Fallback strictly because we can't infer hex from name easily without a library, but text descriptions are valuable.
                    title={color}
                   >
                     {/* Pseudo-visual placeholder since we don't have hex codes from AI text easily */}
                     <div className="w-full h-full rounded-full bg-gradient-to-br from-white/20 to-black/10"></div>
                   </div>
                   <span className="text-xs font-medium text-earth-600">{color}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="order-1 lg:order-2">
           <div className="relative group rounded-2xl overflow-hidden shadow-2xl bg-earth-200 aspect-[4/3] lg:aspect-auto lg:h-full">
            <img 
              src={imageUrl} 
              alt={design.layoutTitle} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
              <a 
                href={imageUrl} 
                download="dream-garden.png" 
                className="bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-white/30 transition-colors"
              >
                <Download className="w-4 h-4" /> Save Visualization
              </a>
            </div>
           </div>
        </div>
      </div>

      {/* Plants Grid */}
      <div className="pt-12 border-t border-earth-200">
        <h3 className="text-3xl font-serif font-bold text-earth-800 mb-8 text-center">Curated Flora Selection</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {design.plants.map((plant, idx) => (
            <PlantCard key={idx} plant={plant} />
          ))}
        </div>
      </div>

    </div>
  );
};

export default DesignResult;