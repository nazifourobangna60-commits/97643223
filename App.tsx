import React, { useState } from 'react';
import Header from './components/Header';
import InputForm from './components/InputForm';
import DesignResult from './components/DesignResult';
import LoadingOverlay from './components/LoadingOverlay';
import { GardenPreferences, GenerationResult, LoadingState } from './types';
import { generateGarden } from './services/geminiService';

const App: React.FC = () => {
  const [result, setResult] = useState<GenerationResult | null>(null);
  const [loadingState, setLoadingState] = useState<LoadingState>({ status: 'idle' });

  const handleDesignSubmit = async (prefs: GardenPreferences) => {
    setLoadingState({ status: 'generating_plan', message: 'Analyzing soil and sunlight' });
    
    try {
      // Simulate progress steps visually for better UX before the real async call takes over
      setTimeout(() => setLoadingState({ status: 'generating_plan', message: 'Sketching layout' }), 1500);
      setTimeout(() => setLoadingState({ status: 'generating_plan', message: 'Selecting plants' }), 3000);
      setTimeout(() => setLoadingState({ status: 'rendering_image', message: 'Rendering visualization' }), 4500);

      const data = await generateGarden(prefs);
      
      setResult(data);
      setLoadingState({ status: 'complete' });
    } catch (error) {
      console.error(error);
      setLoadingState({ status: 'error', message: 'Something went wrong. Please try again.' });
      setTimeout(() => setLoadingState({ status: 'idle' }), 3000);
    }
  };

  const handleReset = () => {
    setResult(null);
    setLoadingState({ status: 'idle' });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow p-4 md:p-8">
        {loadingState.status === 'generating_plan' || loadingState.status === 'rendering_image' ? (
          <LoadingOverlay message={loadingState.message || 'Processing'} />
        ) : null}

        {loadingState.status === 'error' && (
          <div className="fixed top-24 right-4 bg-red-100 border border-red-200 text-red-800 px-6 py-4 rounded-xl shadow-lg z-50 animate-bounce">
            Failed to generate garden. Please check your API key or try again.
          </div>
        )}

        {!result ? (
          <div className="flex flex-col items-center justify-center min-h-[80vh] animate-in fade-in duration-500">
             <div className="text-center mb-12 max-w-2xl">
               <h2 className="text-4xl md:text-5xl font-serif font-bold text-earth-800 mb-6">
                 Cultivate Your Vision
               </h2>
               <p className="text-xl text-earth-600 leading-relaxed">
                 Visualize your perfect outdoor sanctuary in seconds. From cozy balconies to sprawling estates, turn your dreams into a visual plan.
               </p>
             </div>
             <InputForm onSubmit={handleDesignSubmit} isLoading={loadingState.status !== 'idle'} />
          </div>
        ) : (
          <DesignResult result={result} onReset={handleReset} />
        )}
      </main>

      <footer className="bg-earth-100 py-8 border-t border-earth-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center text-earth-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Dream Garden Designer. Powered by Google Gemini.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;