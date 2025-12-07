import React from 'react';
import { Facebook, Twitter, Instagram, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-dark text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          <div className="col-span-1 md:col-span-1">
             <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-brand-red rounded flex items-center justify-center">
                  <div className="w-2 h-2 bg-brand-yellow rounded-full mx-0.5"></div>
                  <div className="w-2 h-2 bg-brand-yellow rounded-full mx-0.5"></div>
                </div>
                <span className="font-display font-bold text-2xl tracking-tight">
                  Bricks<span className="text-brand-red">Toy</span>
                </span>
              </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Bringing joy to builders of all ages. The best selection of bricks, sets, and collectibles delivered to your doorstep.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-brand-yellow">Shop</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">New Arrivals</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Best Sellers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Sale</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Gift Cards</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-brand-yellow">Support</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Shipping Info</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Returns</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-brand-yellow">Stay Connected</h4>
            <div className="flex space-x-4 mb-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Facebook size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Twitter size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Instagram size={20} /></a>
            </div>
            <div className="flex items-center bg-gray-800 rounded-lg p-1 border border-gray-700">
              <Mail className="text-gray-500 ml-2" size={16} />
              <input type="email" placeholder="Join newsletter" className="bg-transparent border-none text-sm text-white px-3 py-1 focus:ring-0 w-full outline-none" />
              <button className="bg-brand-red text-white text-xs font-bold px-3 py-1.5 rounded-md hover:bg-red-700 transition-colors">
                GO
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>&copy; 2024 Bricks Toy Inc. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;