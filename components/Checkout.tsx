import React, { useState } from 'react';
import { ArrowLeft, CreditCard, Truck, AlertCircle } from 'lucide-react';
import { CartItem, PaymentMethod, OrderDetails } from '../types';

interface CheckoutProps {
  cartItems: CartItem[];
  onBack: () => void;
  onPlaceOrder: (details: OrderDetails) => void;
}

const Checkout: React.FC<CheckoutProps> = ({ cartItems, onBack, onPlaceOrder }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: 'Dhaka',
  });
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('bkash');
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const shipping = 120; // BDT
  const total = subtotal + shipping;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Generate Invoice Data
    const orderId = '#ORD-' + Math.floor(100000 + Math.random() * 900000);
    const date = new Date().toLocaleDateString('en-GB', {
      day: 'numeric', month: 'short', year: 'numeric'
    });

    const orderDetails: OrderDetails = {
      orderId,
      date,
      name: formData.name,
      phone: formData.phone,
      address: formData.address,
      city: formData.city,
      paymentMethod,
      items: cartItems,
      subtotal,
      shipping,
      total
    };
    
    // Simulate processing delay
    setTimeout(() => {
      onPlaceOrder(orderDetails);
      setIsProcessing(false);
    }, 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in slide-in-from-right duration-500">
      <button 
        onClick={onBack}
        className="flex items-center text-gray-500 hover:text-brand-red mb-6 transition-colors font-medium"
      >
        <ArrowLeft size={20} className="mr-2" /> Back to Shop
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Column: Form & Payment */}
        <div>
          <h2 className="text-2xl font-display font-bold text-slate-900 mb-6 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-brand-blue text-white flex items-center justify-center text-sm">1</span>
            Shipping & Payment
          </h2>

          <form id="checkout-form" onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-lg mb-4 text-gray-800">Delivery Details</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input 
                    required
                    type="text" 
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number (BD)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-3.5 text-gray-500 font-medium">+880</span>
                    <input 
                      required
                      type="tel" 
                      className="w-full pl-16 pr-4 py-3 rounded-xl border border-gray-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all"
                      placeholder="1712345678"
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <textarea 
                    required
                    rows={2}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all"
                    placeholder="House, Road, Area"
                    value={formData.address}
                    onChange={e => setFormData({...formData, address: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <select 
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all bg-white"
                    value={formData.city}
                    onChange={e => setFormData({...formData, city: e.target.value})}
                  >
                    <option value="Dhaka">Dhaka</option>
                    <option value="Chittagong">Chittagong</option>
                    <option value="Sylhet">Sylhet</option>
                    <option value="Khulna">Khulna</option>
                    <option value="Rajshahi">Rajshahi</option>
                    <option value="Barisal">Barisal</option>
                    <option value="Rangpur">Rangpur</option>
                    <option value="Mymensingh">Mymensingh</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-lg mb-4 text-gray-800">Select Payment Method</h3>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('bkash')}
                  className={`p-4 rounded-xl border-2 flex flex-col items-center justify-center gap-2 transition-all ${
                    paymentMethod === 'bkash' ? 'border-[#e2136e] bg-[#e2136e]/5' : 'border-gray-100 hover:border-gray-200'
                  }`}
                >
                  <div className="font-bold text-[#e2136e] text-lg">bKash</div>
                  <span className="text-xs text-gray-500">Mobile Money</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('nagad')}
                  className={`p-4 rounded-xl border-2 flex flex-col items-center justify-center gap-2 transition-all ${
                    paymentMethod === 'nagad' ? 'border-[#ec1d24] bg-[#ec1d24]/5' : 'border-gray-100 hover:border-gray-200'
                  }`}
                >
                  <div className="font-bold text-[#ec1d24] text-lg">Nagad</div>
                  <span className="text-xs text-gray-500">Mobile Money</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('rocket')}
                  className={`p-4 rounded-xl border-2 flex flex-col items-center justify-center gap-2 transition-all ${
                    paymentMethod === 'rocket' ? 'border-[#8c3494] bg-[#8c3494]/5' : 'border-gray-100 hover:border-gray-200'
                  }`}
                >
                  <div className="font-bold text-[#8c3494] text-lg">Rocket</div>
                  <span className="text-xs text-gray-500">Mobile Money</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-4 rounded-xl border-2 flex flex-col items-center justify-center gap-2 transition-all ${
                    paymentMethod === 'cod' ? 'border-brand-green bg-brand-green/5' : 'border-gray-100 hover:border-gray-200'
                  }`}
                >
                  <div className="font-bold text-brand-green text-lg">COD</div>
                  <span className="text-xs text-gray-500">Cash on Delivery</span>
                </button>
              </div>

              {/* Payment Instructions */}
              {paymentMethod !== 'cod' && (
                <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="text-gray-500 shrink-0 mt-0.5" size={18} />
                    <div className="text-sm text-gray-600">
                      <p className="font-bold text-gray-800 mb-1">How to pay with {paymentMethod}:</p>
                      <ol className="list-decimal ml-4 space-y-1">
                        <li>Go to your {paymentMethod} app</li>
                        <li>Select "Make Payment"</li>
                        <li>Enter Merchant Number: <strong>01700000000</strong></li>
                        <li>Enter Amount: <strong>৳{total}</strong></li>
                        <li>Enter Reference: <strong>BRICKS</strong></li>
                      </ol>
                    </div>
                  </div>
                  <div className="mt-4">
                     <label className="block text-sm font-medium text-gray-700 mb-1">Enter Transaction ID (TrxID)</label>
                     <input type="text" placeholder="e.g. 8N7S6D5F" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-brand-blue outline-none" required />
                  </div>
                </div>
              )}
               {paymentMethod === 'cod' && (
                <div className="mt-6 p-4 bg-green-50 rounded-xl border border-green-200">
                   <p className="text-sm text-green-800 flex items-center gap-2">
                     <Truck size={18} />
                     Pay cash when you receive your bricks!
                   </p>
                </div>
              )}
            </div>
          </form>
        </div>

        {/* Right Column: Summary */}
        <div>
          <h2 className="text-2xl font-display font-bold text-slate-900 mb-6 flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-brand-blue text-white flex items-center justify-center text-sm">2</span>
            Order Summary
          </h2>

          <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 sticky top-24">
            <ul className="divide-y divide-gray-100 mb-6">
              {cartItems.map((item) => (
                <li key={item.id} className="py-4 flex gap-4">
                   <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img src={item.imageUrl} alt={item.name} className="h-full w-full object-cover" />
                   </div>
                   <div className="flex-1">
                     <h3 className="font-medium text-sm text-slate-900 line-clamp-1">{item.name}</h3>
                     <p className="text-gray-500 text-xs mt-1">Qty: {item.quantity}</p>
                   </div>
                   <div className="font-bold text-sm">৳{item.price * item.quantity}</div>
                </li>
              ))}
            </ul>

            <div className="space-y-3 pt-4 border-t border-gray-100">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>৳{subtotal}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping (Inside Dhaka)</span>
                <span>৳{shipping}</span>
              </div>
              <div className="flex justify-between text-xl font-bold text-slate-900 pt-4 border-t border-gray-100">
                <span>Total</span>
                <span>৳{total}</span>
              </div>
            </div>

            <button
              form="checkout-form"
              disabled={isProcessing}
              className="w-full mt-8 bg-brand-red text-white py-4 rounded-xl font-bold text-lg hover:bg-red-700 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isProcessing ? 'Processing...' : `Place Order • ৳${total}`}
            </button>
            <p className="text-center text-xs text-gray-400 mt-4 flex items-center justify-center gap-1">
              <CreditCard size={12} /> Secure Checkout
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;