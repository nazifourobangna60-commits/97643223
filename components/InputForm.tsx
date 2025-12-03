import React, { useState } from 'react';
import { GardenPreferences, GardenStyle, GardenSize, Sunlight } from '../types';
import { GARDEN_STYLES, SIZE_OPTIONS, SUNLIGHT_OPTIONS } from '../constants';
import { Sprout, Sun, Wind, PenTool, Layout } from 'lucide-react';

interface InputFormProps {
  onSubmit: (prefs: GardenPreferences) => void;
  isLoading: boolean;
}

const InputForm: React.FC<InputFormProps> = ({ onSubmit, isLoading }) => {
  const [prefs, setPrefs] = useState<GardenPreferences>({
    style: GardenStyle.ENGLISH_COTTAGE,
    size: GardenSize.SMALL_YARD,
    sunlight: Sunlight.PARTIAL_SHADE,
    climateZone: "Temperate (Zone 7)",
    notes: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(prefs);
  };

  const handleChange = <K extends keyof GardenPreferences>(key: K, value: GardenPreferences[K]) => {
    setPrefs(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-xl border border-earth-100 overflow-hidden">
      <div className="bg-earth-100 p-6 border-b border-earth-200">
        <h2 className="text-2xl font-serif text-earth-800 mb-2">Design Your Sanctuary</h2>
        <p className="text-earth-600">Tell us about your space and preferences, and our AI will cultivate a plan for you.</p>
      </div>
      
      <form onSubmit={handleSubmit} className="p-8 space-y-8">
        
        {/* Style Selection */}
        <div className="space-y-4">
          <label className="flex items-center gap-2 text-lg font-semibold text-earth-700">
            <Layout className="w-5 h-5 text-leaf-600" />
            Garden Style
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {GARDEN_STYLES.map((style) => (
              <button
                key={style}
                type="button"
                onClick={() => handleChange('style', style)}
                className={`p-3 rounded-lg border text-left transition-all duration-200 ${
                  prefs.style === style
                    ? 'border-leaf-500 bg-leaf-50 text-leaf-900 ring-1 ring-leaf-500'
                    : 'border-earth-200 hover:border-leaf-300 hover:bg-earth-50 text-earth-600'
                }`}
              >
                {style}
              </button>
            ))}
          </div>
        </div>

        {/* Technical Specs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-md font-medium text-earth-700">
              <Sprout className="w-4 h-4 text-leaf-600" />
              Size
            </label>
            <select
              value={prefs.size}
              onChange={(e) => handleChange('size', e.target.value as GardenSize)}
              className="w-full p-3 rounded-lg border border-earth-300 focus:ring-2 focus:ring-leaf-400 focus:border-leaf-400 outline-none bg-white text-earth-700"
            >
              {SIZE_OPTIONS.map(size => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </div>

          <div className="space-y-3">
            <label className="flex items-center gap-2 text-md font-medium text-earth-700">
              <Sun className="w-4 h-4 text-leaf-600" />
              Sunlight
            </label>
            <select
              value={prefs.sunlight}
              onChange={(e) => handleChange('sunlight', e.target.value as Sunlight)}
              className="w-full p-3 rounded-lg border border-earth-300 focus:ring-2 focus:ring-leaf-400 focus:border-leaf-400 outline-none bg-white text-earth-700"
            >
              {SUNLIGHT_OPTIONS.map(sun => (
                <option key={sun} value={sun}>{sun}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="space-y-3">
          <label className="flex items-center gap-2 text-md font-medium text-earth-700">
            <Wind className="w-4 h-4 text-leaf-600" />
            Location / Climate
          </label>
          <input
            type="text"
            value={prefs.climateZone}
            onChange={(e) => handleChange('climateZone', e.target.value)}
            placeholder="e.g. Pacific Northwest, Zone 8b, Rainy London..."
            className="w-full p-3 rounded-lg border border-earth-300 focus:ring-2 focus:ring-leaf-400 focus:border-leaf-400 outline-none bg-white text-earth-700 placeholder-earth-400"
          />
        </div>

        {/* Free Text */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-md font-medium text-earth-700">
            <PenTool className="w-4 h-4 text-leaf-600" />
            Specific Wishes
          </label>
          <textarea
            value={prefs.notes}
            onChange={(e) => handleChange('notes', e.target.value)}
            rows={4}
            placeholder="I'd love a small pond, some purple flowers, and a bench for reading. No roses please."
            className="w-full p-3 rounded-lg border border-earth-300 focus:ring-2 focus:ring-leaf-400 focus:border-leaf-400 outline-none bg-white text-earth-700 placeholder-earth-400 resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-4 px-6 rounded-xl text-white font-bold text-lg shadow-lg transition-all transform hover:-translate-y-1 ${
            isLoading 
              ? 'bg-earth-400 cursor-not-allowed opacity-70' 
              : 'bg-gradient-to-r from-leaf-600 to-leaf-500 hover:from-leaf-700 hover:to-leaf-600 shadow-leaf-200'
          }`}
        >
          {isLoading ? 'Cultivating Design...' : 'Generate My Dream Garden'}
        </button>
      </form>
    </div>
  );
};

export default InputForm;