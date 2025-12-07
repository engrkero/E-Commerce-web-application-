import React, { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X, Instagram, Facebook, Twitter, Phone, MapPin, Heart, Eye, Package, SlidersHorizontal, ArrowRightLeft } from 'lucide-react';
import { PRODUCTS } from './constants';
import { Product, CartItem, Order } from './types';
import CartModal from './components/CartModal';
import CheckoutModal from './components/CheckoutModal';
import AIStylist from './components/AIStylist';
import QuickViewModal from './components/QuickViewModal';
import OrderTrackingModal from './components/OrderTrackingModal';
import WishlistModal from './components/WishlistModal';
import CompareModal from './components/CompareModal';

function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [compareList, setCompareList] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  
  // Modal states
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isOrderTrackingOpen, setIsOrderTrackingOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200000]);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');

  // Cart Logic
  const addToCart = (product: Product) => {
    setCart(prev => {
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
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(1, item.quantity + delta) };
      }
      return item;
    }));
  };

  const handleCheckoutSuccess = (order: Order) => {
    setOrders(prev => [...prev, order]);
    setCart([]);
    setIsCheckoutOpen(false);
    setIsOrderTrackingOpen(true); // Auto open tracking to show success
  };

  // Wishlist Logic
  const toggleWishlist = (product: Product) => {
    setWishlist(prev => {
      if (prev.find(item => item.id === product.id)) {
        return prev.filter(item => item.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const isWishlisted = (id: string) => wishlist.some(item => item.id === id);

  // Compare Logic
  const toggleCompare = (product: Product) => {
    if (compareList.find(p => p.id === product.id)) {
      setCompareList(prev => prev.filter(p => p.id !== product.id));
    } else {
      if (compareList.length >= 3) {
        alert("You can compare up to 3 products at a time.");
        return;
      }
      setCompareList(prev => [...prev, product]);
    }
  };

  const isCompared = (id: string) => compareList.some(item => item.id === id);

  // Filter Logic
  const categories = ['All', 'Men', 'Women', 'Unisex', 'Perfumes', 'Bales'];
  
  // Derive available sizes and colors from current filtered products (excluding dynamic filters)
  const categoryProducts = PRODUCTS.filter(p => selectedCategory === 'All' || p.category === selectedCategory);
  const availableSizes = Array.from(new Set(categoryProducts.flatMap(p => p.sizes))).sort();
  const availableColors = Array.from(new Set(categoryProducts.flatMap(p => p.colors))).sort();

  const filteredProducts = PRODUCTS.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesSize = selectedSize === '' || product.sizes.includes(selectedSize);
    const matchesColor = selectedColor === '' || product.colors.includes(selectedColor);

    return matchesCategory && matchesSearch && matchesPrice && matchesSize && matchesColor;
  });

  // Reset filters when category changes
  useEffect(() => {
    setPriceRange([0, 200000]);
    setSelectedSize('');
    setSelectedColor('');
  }, [selectedCategory]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => setSelectedCategory('All')}>
              <h1 className="text-2xl font-bold font-serif tracking-wider text-gray-900">
                KERO<span className="text-amber-600">LUXE</span>
              </h1>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex space-x-6 items-center">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-sm font-medium transition-colors duration-200 ${
                    selectedCategory === cat ? 'text-amber-600 border-b-2 border-amber-600' : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <div className="relative hidden md:block">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 w-40 transition-all focus:w-64"
                />
              </div>

              <button 
                onClick={() => setIsWishlistOpen(true)}
                className="relative p-2 text-gray-600 hover:text-red-500 transition-colors hidden sm:block"
                title="Wishlist"
              >
                <Heart size={24} fill={wishlist.length > 0 ? "currentColor" : "none"} className={wishlist.length > 0 ? "text-red-500" : ""} />
              </button>

              <button 
                onClick={() => setIsOrderTrackingOpen(true)}
                className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors hidden sm:block"
                title="Track Orders"
              >
                <Package size={24} />
              </button>

              <button 
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-gray-600 hover:text-amber-600 transition-colors"
              >
                <ShoppingCart size={24} />
                {cart.length > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-amber-600 rounded-full">
                    {cart.reduce((acc, item) => acc + item.quantity, 0)}
                  </span>
                )}
              </button>

              <button 
                className="lg:hidden p-2 text-gray-600"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setIsMobileMenuOpen(false);
                  }}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-amber-600 hover:bg-gray-50 w-full text-left"
                >
                  {cat}
                </button>
              ))}
              <div className="px-3 py-2 grid grid-cols-2 gap-2">
                <button onClick={() => { setIsWishlistOpen(true); setIsMobileMenuOpen(false); }} className="flex items-center gap-2 text-gray-700">
                  <Heart size={18} /> Wishlist
                </button>
                <button onClick={() => { setIsOrderTrackingOpen(true); setIsMobileMenuOpen(false); }} className="flex items-center gap-2 text-gray-700">
                  <Package size={18} /> Orders
                </button>
              </div>
              <div className="px-3 py-2">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-gray-100 rounded-md px-3 py-2 text-sm"
                />
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section (Only on 'All' and no search) */}
      {selectedCategory === 'All' && !searchTerm && (
        <div className="relative bg-gray-900 text-white">
          <div className="absolute inset-0 overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80" 
              alt="Fashion background" 
              className="w-full h-full object-cover opacity-40"
            />
          </div>
          <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl font-serif mb-6">
              Redefine Your Style
            </h1>
            <p className="mt-6 text-xl text-gray-300 max-w-3xl mx-auto">
              From vintage bales to luxury scents. Experience premium fashion at Keroluxe.
              Unisex wear, quality denim, and authentic fragrances.
            </p>
            <div className="mt-10">
              <button 
                onClick={() => setSelectedCategory('Unisex')}
                className="inline-block bg-amber-600 border border-transparent rounded-md py-3 px-8 font-medium hover:bg-amber-700 transition-colors"
              >
                Shop Collection
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full pb-32">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{selectedCategory} Collection</h2>
            <p className="text-gray-500 mt-1">{filteredProducts.length} items found</p>
          </div>
          
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 text-gray-600 hover:text-amber-600 font-medium"
          >
            <SlidersHorizontal size={20} />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-8 animate-fade-in-down">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Price Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Max Price: ₦{priceRange[1].toLocaleString()}</label>
                <input 
                  type="range" 
                  min="0" 
                  max="200000" 
                  step="1000"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-amber-600"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>₦0</span>
                  <span>₦200,000</span>
                </div>
              </div>

              {/* Size Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Size</label>
                <select 
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:border-amber-500 focus:ring-amber-500"
                >
                  <option value="">Any Size</option>
                  {availableSizes.map(size => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </select>
              </div>

              {/* Color Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
                <select 
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                  className="w-full border-gray-300 rounded-md shadow-sm focus:border-amber-500 focus:ring-amber-500"
                >
                  <option value="">Any Color</option>
                  {availableColors.map(color => (
                    <option key={color} value={color}>{color}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-lg border border-dashed border-gray-300">
            <p className="text-xl text-gray-500">No products found matching your criteria.</p>
            <button 
              onClick={() => {
                setSelectedCategory('All'); 
                setSearchTerm('');
                setPriceRange([0, 200000]);
                setSelectedSize('');
                setSelectedColor('');
              }}
              className="mt-4 text-amber-600 hover:underline font-medium"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-6 xl:gap-x-8">
            {filteredProducts.map((product) => (
              <div key={product.id} className="group relative bg-white rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col overflow-hidden">
                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-200 xl:aspect-w-7 xl:aspect-h-8 relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-64 w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  {product.category === 'Bales' && (
                    <span className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1 rounded font-bold tracking-wide z-10">
                      WHOLESALE
                    </span>
                  )}
                  
                  {/* Overlay Actions */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100 gap-2">
                    <button 
                      onClick={() => setQuickViewProduct(product)}
                      className="bg-white text-gray-900 p-3 rounded-full hover:bg-amber-600 hover:text-white transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300 shadow-md"
                      title="Quick View"
                    >
                      <Eye size={20} />
                    </button>
                    <button 
                      onClick={() => toggleWishlist(product)}
                      className={`bg-white p-3 rounded-full hover:bg-red-50 transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300 delay-75 shadow-md ${isWishlisted(product.id) ? 'text-red-500' : 'text-gray-900 hover:text-red-500'}`}
                      title="Add to Wishlist"
                    >
                      <Heart size={20} fill={isWishlisted(product.id) ? "currentColor" : "none"} />
                    </button>
                    <button 
                      onClick={() => toggleCompare(product)}
                      className={`bg-white p-3 rounded-full hover:bg-blue-50 transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300 delay-100 shadow-md ${isCompared(product.id) ? 'text-blue-500' : 'text-gray-900 hover:text-blue-500'}`}
                      title="Compare"
                    >
                      <ArrowRightLeft size={20} />
                    </button>
                  </div>
                </div>
                
                <div className="p-4 flex-1 flex flex-col">
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="text-lg font-medium text-gray-900 group-hover:text-amber-600 transition-colors">
                        {product.name}
                      </h3>
                    </div>
                    <p className="mt-1 text-sm text-gray-500 line-clamp-2">{product.description}</p>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <p className="text-lg font-bold text-gray-900">₦{product.price.toLocaleString()}</p>
                    <button
                      onClick={() => addToCart(product)}
                      className="bg-gray-900 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors transform active:scale-95"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Compare Floating Bar */}
      {compareList.length > 0 && !isCompareOpen && (
        <div className="fixed bottom-0 left-0 right-0 md:left-1/2 md:transform md:-translate-x-1/2 bg-white shadow-2xl border-t border-gray-200 z-40 px-6 py-4 rounded-t-xl flex items-center gap-6 animate-slide-up w-full md:max-w-2xl justify-between">
            <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                    {compareList.map(p => (
                        <img key={p.id} src={p.image} className="w-10 h-10 rounded-full border-2 border-white object-cover" />
                    ))}
                </div>
                <span className="text-sm font-medium text-gray-700 hidden sm:inline">{compareList.length} products selected</span>
            </div>
            <div className="flex gap-3">
                <button onClick={() => setCompareList([])} className="text-gray-500 hover:text-gray-700 text-sm font-medium">Clear</button>
                <button 
                    onClick={() => setIsCompareOpen(true)}
                    className="bg-gray-900 text-white px-6 py-2 rounded-full font-medium hover:bg-gray-800 transition-colors flex items-center gap-2"
                >
                    <ArrowRightLeft size={16} /> <span className="hidden sm:inline">Compare Now</span>
                </button>
            </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-serif font-bold mb-4">KEROLUXE</h3>
              <p className="text-gray-400 text-sm">
                Your number one stop for premium unisex fashion, vintage bales, and luxury scents.
                Quality guaranteed.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
              <div className="space-y-2 text-gray-400 text-sm">
                <p className="flex items-center gap-2"><MapPin size={16}/> Calabar, Cross River State</p>
                <p className="flex items-center gap-2"><Phone size={16}/> +234 800 123 4567</p>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white"><Instagram /></a>
                <a href="#" className="text-gray-400 hover:text-white"><Facebook /></a>
                <a href="#" className="text-gray-400 hover:text-white"><Twitter /></a>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            &copy; 2024 KEROLUXE ONLINE STORE. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Modals & Overlays */}
      <CartModal 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cart={cart}
        onRemove={removeFromCart}
        onUpdateQuantity={updateQuantity}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />
      
      <CheckoutModal 
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        onSuccess={handleCheckoutSuccess}
      />

      <QuickViewModal 
        isOpen={!!quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        product={quickViewProduct}
        onAddToCart={addToCart}
        onToggleWishlist={toggleWishlist}
        isWishlisted={quickViewProduct ? isWishlisted(quickViewProduct.id) : false}
      />

      <OrderTrackingModal 
        isOpen={isOrderTrackingOpen}
        onClose={() => setIsOrderTrackingOpen(false)}
        orders={orders}
      />

      <WishlistModal 
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        onRemove={(p) => toggleWishlist(p)}
        onAddToCart={addToCart}
      />

      <CompareModal 
        isOpen={isCompareOpen}
        onClose={() => setIsCompareOpen(false)}
        products={compareList}
        onRemove={(id) => setCompareList(prev => prev.filter(p => p.id !== id))}
        onAddToCart={addToCart}
      />

      {/* AI Assistant */}
      <AIStylist cart={cart} wishlist={wishlist} />
    </div>
  );
}

export default App;