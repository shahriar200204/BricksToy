import React, { useState } from 'react';
import { Package, ShoppingCart, Trash2, Plus, X, Check, Search, LogOut, Tag, Folder } from 'lucide-react';
import { Product, OrderDetails, OrderStatus, Coupon } from '../types';

interface AdminPanelProps {
  products: Product[];
  orders: OrderDetails[];
  coupons: Coupon[];
  categories: string[];
  onAddProduct: (product: Product) => void;
  onDeleteProduct: (id: string) => void;
  onUpdateOrderStatus: (orderId: string, status: OrderStatus) => void;
  onAddCategory: (category: string) => void;
  onDeleteCategory: (category: string) => void;
  onAddCoupon: (coupon: Coupon) => void;
  onDeleteCoupon: (code: string) => void;
  onClose: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ 
  products, 
  orders, 
  coupons,
  categories,
  onAddProduct, 
  onDeleteProduct, 
  onUpdateOrderStatus,
  onAddCategory,
  onDeleteCategory,
  onAddCoupon,
  onDeleteCoupon,
  onClose 
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'products' | 'orders' | 'categories' | 'marketing'>('products');
  
  // New Product Form State
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    category: 'City',
    rating: 5.0,
    age: '6+'
  });

  // New Category State
  const [newCategoryName, setNewCategoryName] = useState('');

  // New Coupon State
  const [newCoupon, setNewCoupon] = useState<Partial<Coupon>>({
    discountType: 'fixed',
    isActive: true
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAuthenticated(true);
    } else {
      alert('Invalid Password');
    }
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newProduct.name && newProduct.price && newProduct.imageUrl) {
      const product: Product = {
        id: Math.random().toString(36).substr(2, 9),
        name: newProduct.name,
        description: newProduct.description || 'New exciting product',
        price: Number(newProduct.price),
        category: newProduct.category as any,
        imageUrl: newProduct.imageUrl,
        rating: Number(newProduct.rating) || 5,
        pieces: Number(newProduct.pieces) || 0,
        age: newProduct.age || '6+'
      };
      onAddProduct(product);
      setNewProduct({ category: categories[0] || 'City', rating: 5.0, age: '6+', name: '', price: 0, imageUrl: '', description: '', pieces: 0 });
      alert('Product Added Successfully!');
    }
  };

  const handleAddCategory = (e: React.FormEvent) => {
      e.preventDefault();
      if(newCategoryName.trim()) {
          onAddCategory(newCategoryName.trim());
          setNewCategoryName('');
      }
  };

  const handleAddCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if(newCoupon.code && newCoupon.value) {
        onAddCoupon({
            code: newCoupon.code,
            value: Number(newCoupon.value),
            discountType: newCoupon.discountType as 'fixed' | 'percent',
            isActive: true
        });
        setNewCoupon({ discountType: 'fixed', isActive: true, code: '', value: 0 });
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center text-slate-900">Admin Login</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-brand-blue outline-none"
                placeholder="Enter admin password"
              />
            </div>
            <button type="submit" className="w-full bg-brand-dark text-white py-3 rounded-lg font-bold hover:bg-black transition-colors">
              Access Panel
            </button>
            <button type="button" onClick={onClose} className="w-full text-gray-500 text-sm hover:underline">
              Return to Shop
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <div className="bg-brand-dark text-white px-6 py-4 flex justify-between items-center shadow-md">
        <div className="flex items-center gap-2">
           <span className="font-bold text-xl">BricksToy Admin</span>
           <span className="bg-brand-red text-xs px-2 py-0.5 rounded ml-2">INTERNAL USE</span>
        </div>
        <button onClick={onClose} className="flex items-center gap-2 text-gray-300 hover:text-white">
          <LogOut size={18} /> Exit
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
          <button 
            onClick={() => setActiveTab('products')}
            className={`p-4 flex items-center gap-3 font-medium transition-colors ${activeTab === 'products' ? 'bg-brand-blue/10 text-brand-blue border-r-4 border-brand-blue' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <Package size={20} /> Products
          </button>
          <button 
            onClick={() => setActiveTab('categories')}
            className={`p-4 flex items-center gap-3 font-medium transition-colors ${activeTab === 'categories' ? 'bg-brand-blue/10 text-brand-blue border-r-4 border-brand-blue' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <Folder size={20} /> Categories
          </button>
          <button 
            onClick={() => setActiveTab('marketing')}
            className={`p-4 flex items-center gap-3 font-medium transition-colors ${activeTab === 'marketing' ? 'bg-brand-blue/10 text-brand-blue border-r-4 border-brand-blue' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <Tag size={20} /> Marketing
          </button>
          <button 
            onClick={() => setActiveTab('orders')}
            className={`p-4 flex items-center gap-3 font-medium transition-colors ${activeTab === 'orders' ? 'bg-brand-blue/10 text-brand-blue border-r-4 border-brand-blue' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            <ShoppingCart size={20} /> Orders
            {orders.filter(o => o.status === 'Pending').length > 0 && (
              <span className="bg-brand-red text-white text-xs px-2 py-0.5 rounded-full ml-auto">
                {orders.filter(o => o.status === 'Pending').length}
              </span>
            )}
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8">
          
          {/* PRODUCTS TAB */}
          {activeTab === 'products' && (
            <div className="max-w-5xl mx-auto space-y-8">
              
              {/* Add Product Form */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Plus size={20} className="text-brand-green" /> Add New Product
                </h3>
                <form onSubmit={handleAddSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input required placeholder="Product Name" className="border p-2 rounded" value={newProduct.name || ''} onChange={e => setNewProduct({...newProduct, name: e.target.value})} />
                  <input required type="number" placeholder="Price (BDT)" className="border p-2 rounded" value={newProduct.price || ''} onChange={e => setNewProduct({...newProduct, price: Number(e.target.value)})} />
                  <select className="border p-2 rounded" value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value as any})}>
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <input required placeholder="Image URL (https://...)" className="border p-2 rounded" value={newProduct.imageUrl || ''} onChange={e => setNewProduct({...newProduct, imageUrl: e.target.value})} />
                  <input placeholder="Pieces (e.g. 500)" type="number" className="border p-2 rounded" value={newProduct.pieces || ''} onChange={e => setNewProduct({...newProduct, pieces: Number(e.target.value)})} />
                  <input placeholder="Age (e.g. 9+)" className="border p-2 rounded" value={newProduct.age || ''} onChange={e => setNewProduct({...newProduct, age: e.target.value})} />
                  <textarea placeholder="Description" className="border p-2 rounded md:col-span-2" rows={2} value={newProduct.description || ''} onChange={e => setNewProduct({...newProduct, description: e.target.value})} />
                  <div className="md:col-span-2">
                    <button type="submit" className="bg-brand-blue text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700 transition-colors">Save Product</button>
                  </div>
                </form>
              </div>

              {/* Product List */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="p-4 text-xs font-bold text-gray-500 uppercase">Image</th>
                      <th className="p-4 text-xs font-bold text-gray-500 uppercase">Name</th>
                      <th className="p-4 text-xs font-bold text-gray-500 uppercase">Category</th>
                      <th className="p-4 text-xs font-bold text-gray-500 uppercase">Price</th>
                      <th className="p-4 text-xs font-bold text-gray-500 uppercase text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {products.map(product => (
                      <tr key={product.id} className="hover:bg-gray-50">
                        <td className="p-4">
                          <img src={product.imageUrl} alt={product.name} className="w-10 h-10 rounded object-cover border" />
                        </td>
                        <td className="p-4 font-medium">{product.name}</td>
                        <td className="p-4 text-sm text-gray-500">{product.category}</td>
                        <td className="p-4 font-bold">৳{product.price}</td>
                        <td className="p-4 text-right">
                          <button onClick={() => onDeleteProduct(product.id)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors">
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* CATEGORIES TAB */}
          {activeTab === 'categories' && (
             <div className="max-w-3xl mx-auto space-y-8">
                 <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                        <Plus size={20} className="text-brand-green" /> Add New Category
                    </h3>
                    <form onSubmit={handleAddCategory} className="flex gap-4">
                        <input 
                            type="text" 
                            className="flex-1 border p-2 rounded" 
                            placeholder="e.g. Technic, Exclusive, Sales"
                            value={newCategoryName}
                            onChange={(e) => setNewCategoryName(e.target.value)}
                            required
                        />
                        <button type="submit" className="bg-brand-blue text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700">Add</button>
                    </form>
                 </div>

                 <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="p-4 text-xs font-bold text-gray-500 uppercase">Category Name</th>
                                <th className="p-4 text-xs font-bold text-gray-500 uppercase text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {categories.map((cat, idx) => (
                                <tr key={idx} className="hover:bg-gray-50">
                                    <td className="p-4 font-medium">{cat}</td>
                                    <td className="p-4 text-right">
                                        {cat !== 'All' && (
                                            <button onClick={() => onDeleteCategory(cat)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors">
                                                <Trash2 size={18} />
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                 </div>
             </div>
          )}

          {/* MARKETING TAB (COUPONS) */}
          {activeTab === 'marketing' && (
              <div className="max-w-4xl mx-auto space-y-8">
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
                    <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                        <Tag size={20} className="text-brand-red" /> Create Coupon / Offer
                    </h3>
                    <form onSubmit={handleAddCoupon} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <input 
                            type="text" 
                            className="border p-2 rounded uppercase" 
                            placeholder="Code (e.g. SAVE10)"
                            value={newCoupon.code || ''}
                            onChange={(e) => setNewCoupon({...newCoupon, code: e.target.value.toUpperCase()})}
                            required
                        />
                        <div className="flex gap-2">
                             <select 
                                className="border p-2 rounded bg-white"
                                value={newCoupon.discountType}
                                onChange={(e) => setNewCoupon({...newCoupon, discountType: e.target.value as any})}
                             >
                                 <option value="fixed">Fixed Amount (৳)</option>
                                 <option value="percent">Percentage (%)</option>
                             </select>
                             <input 
                                type="number" 
                                className="border p-2 rounded w-full" 
                                placeholder="Value"
                                value={newCoupon.value || ''}
                                onChange={(e) => setNewCoupon({...newCoupon, value: Number(e.target.value)})}
                                required
                            />
                        </div>
                        <button type="submit" className="bg-brand-red text-white px-6 py-2 rounded-lg font-bold hover:bg-red-700">Create Offer</button>
                    </form>
                  </div>

                  <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="p-4 text-xs font-bold text-gray-500 uppercase">Code</th>
                                <th className="p-4 text-xs font-bold text-gray-500 uppercase">Discount</th>
                                <th className="p-4 text-xs font-bold text-gray-500 uppercase">Status</th>
                                <th className="p-4 text-xs font-bold text-gray-500 uppercase text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {coupons.length === 0 && (
                                <tr><td colSpan={4} className="p-6 text-center text-gray-400">No active coupons. Create one above!</td></tr>
                            )}
                            {coupons.map((coupon) => (
                                <tr key={coupon.code} className="hover:bg-gray-50">
                                    <td className="p-4 font-bold font-mono text-brand-blue">{coupon.code}</td>
                                    <td className="p-4">
                                        {coupon.discountType === 'fixed' ? `৳${coupon.value} Off` : `${coupon.value}% Off`}
                                    </td>
                                    <td className="p-4">
                                        <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold">Active</span>
                                    </td>
                                    <td className="p-4 text-right">
                                        <button onClick={() => onDeleteCoupon(coupon.code)} className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors">
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                 </div>
              </div>
          )}

          {/* ORDERS TAB */}
          {activeTab === 'orders' && (
            <div className="max-w-6xl mx-auto">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-200 flex justify-between items-center">
                  <h3 className="text-lg font-bold">Customer Orders</h3>
                  <div className="flex gap-2">
                    <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded">Pending: {orders.filter(o => o.status === 'Pending').length}</span>
                    <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded">Paid: {orders.filter(o => o.status === 'Paid').length}</span>
                  </div>
                </div>
                
                {orders.length === 0 ? (
                  <div className="p-12 text-center text-gray-400">No orders received yet.</div>
                ) : (
                  <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="p-4 text-xs font-bold text-gray-500 uppercase">Order ID</th>
                        <th className="p-4 text-xs font-bold text-gray-500 uppercase">Customer</th>
                        <th className="p-4 text-xs font-bold text-gray-500 uppercase">Payment</th>
                        <th className="p-4 text-xs font-bold text-gray-500 uppercase">TrxID</th>
                        <th className="p-4 text-xs font-bold text-gray-500 uppercase">Total</th>
                        <th className="p-4 text-xs font-bold text-gray-500 uppercase">Status</th>
                        <th className="p-4 text-xs font-bold text-gray-500 uppercase text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {orders.map(order => (
                        <tr key={order.orderId} className="hover:bg-gray-50">
                          <td className="p-4 font-mono text-xs">{order.orderId}<br/><span className="text-gray-400">{order.date}</span></td>
                          <td className="p-4">
                            <div className="font-medium text-sm">{order.name}</div>
                            <div className="text-xs text-gray-500">{order.phone}</div>
                          </td>
                          <td className="p-4">
                            <span className="uppercase text-xs font-bold">{order.paymentMethod}</span>
                          </td>
                          <td className="p-4 font-mono text-sm text-brand-blue bg-blue-50/50 rounded">
                            {order.transactionId || '-'}
                          </td>
                          <td className="p-4 font-bold">
                              ৳{order.total}
                              {order.discount > 0 && <div className="text-xs text-green-600 font-normal">(-৳{Math.round(order.discount)})</div>}
                          </td>
                          <td className="p-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                              order.status === 'Paid' ? 'bg-green-100 text-green-700' : 
                              order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' :
                              order.status === 'Cancelled' ? 'bg-red-100 text-red-700' :
                              'bg-yellow-100 text-yellow-700'
                            }`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="p-4 text-right space-x-2">
                             {order.status === 'Pending' && (
                               <button 
                                 onClick={() => onUpdateOrderStatus(order.orderId, 'Paid')}
                                 className="text-xs bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                               >
                                 Approve
                               </button>
                             )}
                             {order.status === 'Paid' && (
                               <button 
                                 onClick={() => onUpdateOrderStatus(order.orderId, 'Shipped')}
                                 className="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                               >
                                 Ship
                               </button>
                             )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  </div>
                )}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default AdminPanel;