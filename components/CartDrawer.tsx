import React from 'react';
import { X, Trash2, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onRemoveItem: (id: string) => void;
  onUpdateQuantity: (id: string, delta: number) => void;
  onCheckout: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ 
  isOpen, 
  onClose, 
  cartItems, 
  onRemoveItem, 
  onUpdateQuantity,
  onCheckout
}) => {
  const total = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity" onClick={onClose} />
      
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md transform transition-transform bg-white shadow-2xl flex flex-col h-full rounded-l-3xl overflow-hidden my-2 mr-2">
          
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-white">
            <h2 className="text-lg font-display font-bold text-slate-900 flex items-center gap-2">
              <ShoppingBag className="text-brand-red" size={20} />
              Your Cart ({cartItems.length})
            </h2>
            <button onClick={onClose} className="text-gray-400 hover:text-slate-900 transition-colors p-1">
              <X size={24} />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4">
                <ShoppingBag size={64} strokeWidth={1} className="text-brand-blue/20" />
                <p className="text-lg font-medium text-gray-500">Your cart is empty</p>
                <button onClick={onClose} className="text-brand-blue font-bold hover:underline">Start Shopping</button>
              </div>
            ) : (
              <ul className="space-y-4">
                {cartItems.map((item) => (
                  <li key={item.id} className="flex p-3 bg-white rounded-2xl shadow-sm border border-gray-100">
                    <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl border border-gray-100">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col justify-center">
                      <div className="flex justify-between text-base font-bold text-gray-900">
                        <h3 className="line-clamp-1 pr-4 text-sm">{item.name}</h3>
                        <p className="text-brand-blue">৳{item.price * item.quantity}</p>
                      </div>
                      <p className="mt-1 text-xs text-gray-500">{item.category}</p>
                      
                      <div className="flex flex-1 items-end justify-between text-sm mt-2">
                        <div className="flex items-center bg-gray-100 rounded-lg p-0.5">
                            <button 
                                onClick={() => onUpdateQuantity(item.id, -1)}
                                className="w-6 h-6 flex items-center justify-center hover:bg-white rounded-md text-gray-600 transition-all shadow-sm"
                                disabled={item.quantity <= 1}
                            >
                                -
                            </button>
                            <span className="w-8 text-center font-bold text-slate-900 text-xs">{item.quantity}</span>
                            <button 
                                onClick={() => onUpdateQuantity(item.id, 1)}
                                className="w-6 h-6 flex items-center justify-center hover:bg-white rounded-md text-gray-600 transition-all shadow-sm"
                            >
                                +
                            </button>
                        </div>

                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.id)}
                          className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Footer */}
          {cartItems.length > 0 && (
            <div className="border-t border-gray-100 px-6 py-6 bg-white">
              <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
                <p>Subtotal</p>
                <p className="text-xl font-bold text-brand-blue">৳{total}</p>
              </div>
              <p className="mt-0.5 text-xs text-gray-400 mb-6">Shipping calculated at checkout.</p>
              <div className="space-y-3">
                <button
                  onClick={onCheckout}
                  className="w-full flex items-center justify-center rounded-xl border border-transparent bg-brand-red px-6 py-4 text-base font-bold text-white shadow-lg hover:bg-red-700 hover:shadow-xl hover:-translate-y-0.5 transition-all"
                >
                  Checkout Now
                </button>
                <button
                    onClick={onClose}
                    className="w-full flex items-center justify-center rounded-xl border border-transparent text-gray-500 hover:text-gray-800 text-sm font-medium transition-colors"
                >
                    Continue Shopping
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
