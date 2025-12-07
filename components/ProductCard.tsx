import React from 'react';
import { Plus, Star, ShoppingCart } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="group relative bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-2xl hover:border-brand-blue/20 transition-all duration-300 transform hover:-translate-y-1">
      {/* Image Container */}
      <div className="aspect-square overflow-hidden bg-gray-50 relative p-6">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4 flex flex-col gap-2">
            {product.age && (
                <span className="bg-white/90 backdrop-blur-sm text-xs font-bold px-3 py-1.5 rounded-full shadow-sm border border-gray-100 text-brand-blue">
                    {product.age}
                </span>
            )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <p className="text-[10px] font-bold text-brand-red uppercase tracking-widest bg-brand-red/5 px-2 py-0.5 rounded-full">{product.category}</p>
          <div className="flex items-center gap-1 bg-yellow-50 px-2 py-0.5 rounded-full">
            <Star size={10} className="text-yellow-500 fill-yellow-500" />
            <span className="text-xs font-bold text-yellow-700">{product.rating}</span>
          </div>
        </div>
        
        <h3 className="text-lg font-display font-bold text-slate-900 leading-tight mb-2 truncate group-hover:text-brand-blue transition-colors">
          {product.name}
        </h3>
        
        <div className="flex items-center justify-between mt-4">
            <div className="flex flex-col">
                 <span className="text-xs text-gray-400 font-medium">{product.pieces ? `${product.pieces} pcs` : 'Item'}</span>
                 <span className="text-xl font-bold text-slate-900">৳{product.price}</span>
            </div>
            <button 
                onClick={() => onAddToCart(product)}
                className="bg-brand-blue text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 hover:scale-110 active:scale-95 transition-all"
                aria-label="Add to cart"
            >
                <Plus size={20} strokeWidth={3} />
            </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
