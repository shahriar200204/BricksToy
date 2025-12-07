import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface HeroProps {
  onShopNow: () => void;
  onViewCollections: () => void;
}

const Hero: React.FC<HeroProps> = ({ onShopNow, onViewCollections }) => {
  return (
    <div className="relative overflow-hidden bg-brand-yellow/10">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-brand-yellow/0 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-brand-red/10 text-brand-red text-sm font-semibold mb-4 border border-brand-red/20">
                <Sparkles size={14} className="mr-2" /> New Summer Collection
              </div>
              <h1 className="text-4xl tracking-tight font-display font-bold text-slate-900 sm:text-5xl md:text-6xl">
                <span className="block xl:inline">Build your imagination</span>{' '}
                <span className="block text-brand-red xl:inline">brick by brick</span>
              </h1>
              <p className="mt-3 text-base text-gray-600 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Discover the latest exclusive sets from Space, Minecraft, Marvel, and Duplo. From toddlers to expert collectors, we have the perfect pieces for your next masterpiece.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start gap-4">
                <div className="rounded-md shadow">
                  <button
                    onClick={onShopNow}
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-brand-red hover:bg-red-700 md:py-4 md:text-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    Start Building
                  </button>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <button
                    onClick={onViewCollections}
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-xl text-brand-blue bg-brand-blue/10 hover:bg-brand-blue/20 md:py-4 md:text-lg transition-all"
                  >
                    View Collections <ArrowRight className="ml-2 w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      
      {/* Decorative Image/Pattern */}
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 flex items-center justify-center bg-brand-yellow/20">
        <div className="relative w-full h-64 sm:h-72 md:h-96 lg:h-full">
           <img
            className="w-full h-full object-cover lg:object-contain p-8"
            src="https://picsum.photos/1000/1000?random=10"
            alt="Lego set main"
          /> 
           <div className="absolute inset-0 bg-gradient-to-r from-brand-yellow/10 to-transparent lg:from-white lg:to-transparent"></div>
        </div>
      </div>
    </div>
  );
};

export default Hero;