import React from 'react';
import { Leaf } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-earth-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-leaf-600 p-2 rounded-lg">
            <Leaf className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-serif font-bold text-earth-800">Dream Garden</h1>
        </div>
        <nav className="hidden md:flex gap-6 text-earth-600 font-medium">
          <a href="#" className="hover:text-leaf-700 transition-colors">Planner</a>
          <a href="#" className="hover:text-leaf-700 transition-colors">Inspiration</a>
          <a href="#" className="hover:text-leaf-700 transition-colors">My Gardens</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;