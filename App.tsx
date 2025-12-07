import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import CartDrawer from './components/CartDrawer';
import Checkout from './components/Checkout';
import AIChatBot from './components/AIChatBot';
import Footer from './components/Footer';
import { PRODUCTS, CATEGORIES } from './constants';
import { CartItem, Product, OrderDetails } from './types';
import { Filter, MessageCircleHeart, CheckCircle, Download, Printer } from 'lucide-react';

type ViewState = 'shop' | 'checkout' | 'success';

const App: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [view, setView] = useState<ViewState>('shop');
  const [searchQuery, setSearchQuery] = useState('');
  const [lastOrder, setLastOrder] = useState<OrderDetails | null>(null);

  // Cart Logic
  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(1, item.quantity + delta) };
      }
      return item;
    }));
  };

  const handleCheckoutStart = () => {
    setIsCartOpen(false);
    setView('checkout');
    window.scrollTo(0,0);
  };

  const handlePlaceOrder = (details: OrderDetails) => {
    setCartItems([]);
    setLastOrder(details);
    setView('success');
    window.scrollTo(0,0);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query.toLowerCase());
    if (view !== 'shop') setView('shop');
  };

  const handleNavigation = (target: 'shop' | 'new') => {
    if (target === 'shop') {
      setActiveCategory('All');
      setSearchQuery('');
    } else if (target === 'new') {
      // For now, treat New Arrivals as "All" or a specific filter if metadata existed
      setActiveCategory('All'); 
    }
    setView('shop');
    window.scrollTo(0,0);
  };

  // Filter Logic
  const filteredProducts = PRODUCTS.filter(p => {
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery) || 
                          p.category.toLowerCase().includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Navbar 
        cartItems={cartItems} 
        onOpenCart={() => setIsCartOpen(true)} 
        onOpenAI={() => setIsAIOpen(true)}
        onLogoClick={() => handleNavigation('shop')}
        onSearch={handleSearch}
        onNavigate={handleNavigation}
      />
      
      {/* View Router */}
      {view === 'shop' && (
        <>
          <Hero 
            onShopNow={() => {
              setActiveCategory('All');
              const el = document.getElementById('shop');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            onViewCollections={() => {
              setActiveCategory('All');
              const el = document.getElementById('shop');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
          />
          <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full" id="shop">
            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
              <div>
                <h2 className="text-3xl font-display font-bold text-slate-900">
                  {searchQuery ? `Search Results for "${searchQuery}"` : 'Featured Sets'}
                </h2>
                <p className="text-gray-500 mt-1">Explore our most popular building kits for kids.</p>
              </div>
              
              {/* Categories */}
              {!searchQuery && (
                <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
                  <Filter size={18} className="text-gray-400 mr-2 shrink-0" />
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                        activeCategory === cat 
                          ? 'bg-brand-dark text-white shadow-md' 
                          : 'bg-white text-gray-600 border border-gray-200 hover:border-brand-blue hover:text-brand-blue'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
              {filteredProducts.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onAddToCart={addToCart} 
                />
              ))}
            </div>
            
            {filteredProducts.length === 0 && (
              <div className="text-center py-20">
                <p className="text-xl text-gray-400">No products found matching your criteria.</p>
                <button 
                    onClick={() => {
                      setActiveCategory('All');
                      setSearchQuery('');
                    }} 
                    className="mt-4 text-brand-blue font-bold hover:underline"
                >
                    Clear Filters
                </button>
              </div>
            )}
          </main>
        </>
      )}

      {view === 'checkout' && (
        <Checkout 
          cartItems={cartItems}
          onBack={() => setView('shop')}
          onPlaceOrder={handlePlaceOrder}
        />
      )}

      {view === 'success' && lastOrder && (
        <div className="flex-grow flex flex-col items-center justify-center p-4 sm:p-8 animate-in zoom-in duration-500">
          
          <div className="max-w-3xl w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-200">
            {/* Invoice Header */}
            <div className="bg-slate-900 text-white p-8 flex justify-between items-start">
               <div>
                  <h1 className="text-2xl font-display font-bold">INVOICE</h1>
                  <p className="text-gray-400 text-sm mt-1">Order # {lastOrder.orderId}</p>
                  <p className="text-gray-400 text-sm">Date: {lastOrder.date}</p>
               </div>
               <div className="text-right">
                  <span className="font-display font-bold text-2xl tracking-tight">
                    Bricks<span className="text-brand-red">Toy</span>
                  </span>
                  <p className="text-xs text-gray-400 mt-1">123 Lego Street, Dhaka, Bangladesh</p>
                  <p className="text-xs text-gray-400">support@brickstoy.com</p>
               </div>
            </div>

            {/* Bill To */}
            <div className="p-8 border-b border-gray-100">
              <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-2">Bill To</h3>
              <p className="font-bold text-slate-900">{lastOrder.name}</p>
              <p className="text-gray-600 text-sm">{lastOrder.address}, {lastOrder.city}</p>
              <p className="text-gray-600 text-sm">{lastOrder.phone}</p>
            </div>

            {/* Table */}
            <div className="p-8">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="pb-3 text-xs font-bold text-gray-500 uppercase">Item</th>
                    <th className="pb-3 text-xs font-bold text-gray-500 uppercase text-center">Qty</th>
                    <th className="pb-3 text-xs font-bold text-gray-500 uppercase text-right">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {lastOrder.items.map((item, idx) => (
                    <tr key={idx}>
                      <td className="py-4">
                        <p className="font-medium text-slate-900">{item.name}</p>
                        <p className="text-xs text-gray-400">{item.category}</p>
                      </td>
                      <td className="py-4 text-center text-gray-600">{item.quantity}</td>
                      <td className="py-4 text-right font-medium text-slate-900">৳{item.price * item.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Totals */}
            <div className="bg-gray-50 p-8">
              <div className="flex justify-end">
                <div className="w-full sm:w-1/2 space-y-3">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Subtotal</span>
                    <span>৳{lastOrder.subtotal}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Shipping</span>
                    <span>৳{lastOrder.shipping}</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold text-slate-900 pt-3 border-t border-gray-200">
                    <span>Total</span>
                    <span>৳{lastOrder.total}</span>
                  </div>
                  <div className="mt-4 inline-block px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold border border-green-200">
                    Payment Method: {lastOrder.paymentMethod.toUpperCase()}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4 mt-8">
             <button 
                onClick={() => window.print()}
                className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
             >
                <Printer size={18} /> Print Invoice
             </button>
             <button 
                onClick={() => handleNavigation('shop')}
                className="px-6 py-3 bg-brand-blue text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg"
             >
                Continue Shopping
             </button>
          </div>
        </div>
      )}

      {/* Floating Action Button for AI (Mobile) */}
      <button
        onClick={() => setIsAIOpen(true)}
        className="fixed bottom-6 right-6 md:hidden z-30 bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-4 rounded-full shadow-xl hover:scale-105 active:scale-95 transition-all"
        aria-label="Open AI Assistant"
      >
        <MessageCircleHeart size={24} />
      </button>

      <Footer />

      {/* Overlays */}
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cartItems={cartItems}
        onRemoveItem={removeFromCart}
        onUpdateQuantity={updateQuantity}
        onCheckout={handleCheckoutStart}
      />

      <AIChatBot 
        isOpen={isAIOpen} 
        onClose={() => setIsAIOpen(false)} 
      />
    </div>
  );
};

export default App;