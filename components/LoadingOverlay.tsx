import React, { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingOverlayProps {
  message: string;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ message }) => {
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-earth-50/90 backdrop-blur-sm z-50 flex flex-col items-center justify-center p-4">
      <div className="relative">
        <div className="w-24 h-24 border-4 border-leaf-200 rounded-full animate-spin"></div>
        <div className="absolute top-0 left-0 w-24 h-24 border-4 border-leaf-600 rounded-full animate-spin border-t-transparent border-l-transparent"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-leaf-700 animate-spin" />
        </div>
      </div>
      <h3 className="mt-8 text-2xl font-serif font-bold text-earth-800 animate-pulse">
        {message}{dots}
      </h3>
      <p className="mt-2 text-earth-600 text-center max-w-md">
        Our AI landscape architects are sketching your layout and selecting the perfect plants.
      </p>
    </div>
  );
};

export default LoadingOverlay;