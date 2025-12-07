import React, { useState } from 'react';
import { ShoppingBag, Search, Menu, MessageCircleHeart, X } from 'lucide-react';
import { CartItem } from '../types';

interface NavbarProps {
  cartItems: CartItem[];
  onOpenCart: () => void;
  onOpenAI: () => void;
  onLogoClick: () => void;
  onSearch: (query: string) => void;
  onNavigate: (view: 'shop' | 'new') => void;
}

const Navbar: React.FC<NavbarProps> = ({ cartItems, onOpenCart, onOpenAI, onLogoClick, onSearch, onNavigate }) => {
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  const toggleSearch = () => {
    if (isSearchOpen) {
      setSearchQuery('');
      onSearch('');
    }
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <div 
            onClick={onLogoClick}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 bg-brand-red rounded-lg flex items-center justify-center shadow-md group-hover:rotate-12 transition-transform">
              <div className="w-2.5 h-2.5 bg-brand-yellow rounded-full mx-0.5 border-2 border-brand-red"></div>
              <div className="w-2.5 h-2.5 bg-brand-yellow rounded-full mx-0.5 border-2 border-brand-red"></div>
            </div>
            <span className="font-display font-bold text-2xl tracking-tight text-slate-900 hidden sm:block">
              Bricks<span className="text-brand-red">Toy</span>
            </span>
          </div>

          {/* Search Bar (Overlay or Inline) */}
          {isSearchOpen ? (
            <div className="flex-1 max-w-xl mx-4 animate-in fade-in zoom-in duration-200">
               <div className="relative">
                 <input 
                    autoFocus
                    type="text" 
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Search for sets, themes..."
                    className="w-full pl-10 pr-4 py-2 rounded-full border border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none bg-gray-50"
                 />
                 <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                 <button onClick={toggleSearch} className="absolute right-3 top-2.5 text-gray-400 hover:text-red-500">
                    <X size={18} />
                 </button>
               </div>
            </div>
          ) : (
            /* Desktop Nav */
            <div className="hidden md:flex space-x-8">
              <button onClick={onLogoClick} className="font-medium text-gray-500 hover:text-brand-red transition-colors">Home</button>
              <button onClick={() => onNavigate('shop')} className="font-medium text-gray-500 hover:text-brand-red transition-colors">Shop</button>
              <button onClick={() => onNavigate('new')} className="font-medium text-gray-500 hover:text-brand-red transition-colors">New Arrivals</button>
            </div>
          )}

          {/* Icons */}
          <div className="flex items-center gap-3 md:gap-5">
            <button 
              onClick={onOpenAI}
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-full text-sm font-bold hover:shadow-lg hover:-translate-y-0.5 transition-all"
            >
              <MessageCircleHeart size={16} />
              <span>Gift AI</span>
            </button>

            {!isSearchOpen && (
              <button onClick={toggleSearch} className="p-2 text-gray-500 hover:text-slate-900 transition-colors">
                <Search size={24} strokeWidth={2} />
              </button>
            )}
            
            <button 
              onClick={onOpenCart}
              className="p-2 text-gray-500 hover:text-brand-blue transition-colors relative group"
            >
              <ShoppingBag size={24} strokeWidth={2} />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 bg-brand-red text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-sm group-hover:scale-110 transition-transform ring-2 ring-white">
                  {totalItems}
                </span>
              )}
            </button>
            
            <button className="md:hidden p-2 text-gray-500">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;