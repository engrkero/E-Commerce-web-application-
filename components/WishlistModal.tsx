import React from 'react';
import { X, Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { Product } from '../types';

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: Product[];
  onRemove: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

const WishlistModal: React.FC<WishlistModalProps> = ({ 
  isOpen, onClose, wishlist, onRemove, onAddToCart 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="absolute inset-y-0 right-0 max-w-md w-full flex">
        <div className="h-full w-full bg-white shadow-xl flex flex-col animate-slide-in-right">
          <div className="flex items-center justify-between px-4 py-6 bg-gray-900 text-white">
            <h2 className="text-lg font-medium flex items-center gap-2">
              <Heart size={20} className="text-red-500 fill-current" /> 
              My Wishlist ({wishlist.length})
            </h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-800 rounded-full">
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {wishlist.length === 0 ? (
              <div className="text-center py-10 text-gray-500">
                <Heart size={48} className="mx-auto mb-4 opacity-50" />
                <p>Your wishlist is empty.</p>
                <button onClick={onClose} className="mt-4 text-amber-600 font-semibold hover:underline">
                  Find items to save
                </button>
              </div>
            ) : (
              wishlist.map((item) => (
                <div key={item.id} className="flex border-b pb-4">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col justify-between">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>{item.name}</h3>
                        <p>₦{item.price.toLocaleString()}</p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">{item.category}</p>
                    </div>
                    
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => onAddToCart(item)}
                        className="flex-1 flex items-center justify-center gap-1 bg-gray-900 text-white text-xs px-3 py-2 rounded hover:bg-gray-800"
                      >
                        <ShoppingCart size={14} /> Add to Cart
                      </button>
                      <button
                        onClick={() => onRemove(item)}
                        className="p-2 text-red-600 border border-red-200 rounded hover:bg-red-50"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishlistModal;