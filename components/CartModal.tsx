import React from 'react';
import { X, Trash2, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, delta: number) => void;
  onCheckout: () => void;
}

const CartModal: React.FC<CartModalProps> = ({ 
  isOpen, onClose, cart, onRemove, onUpdateQuantity, onCheckout 
}) => {
  if (!isOpen) return null;

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="absolute inset-y-0 right-0 max-w-md w-full flex">
        <div className="h-full w-full bg-white shadow-xl flex flex-col animate-slide-in-right">
          <div className="flex items-center justify-between px-4 py-6 bg-gray-900 text-white">
            <h2 className="text-lg font-medium">Shopping Cart ({cart.length})</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-800 rounded-full">
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-10 text-gray-500">
                <ShoppingBag size={48} className="mx-auto mb-4 opacity-50" />
                <p>Your cart is empty.</p>
                <button onClick={onClose} className="mt-4 text-amber-600 font-semibold hover:underline">
                  Start Shopping
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="flex border-b pb-4">
                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>{item.name}</h3>
                        <p className="ml-4">₦{(item.price * item.quantity).toLocaleString()}</p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">{item.category}</p>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <div className="flex items-center space-x-2 border rounded px-2">
                        <button 
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="px-2 py-1 hover:text-amber-600 disabled:opacity-30"
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span className="font-semibold">{item.quantity}</span>
                        <button 
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="px-2 py-1 hover:text-amber-600"
                        >
                          +
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => onRemove(item.id)}
                        className="font-medium text-red-600 hover:text-red-500 flex items-center gap-1"
                      >
                        <Trash2 size={16} /> Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
              <p>Subtotal</p>
              <p>₦{subtotal.toLocaleString()}</p>
            </div>
            <p className="mt-0.5 text-sm text-gray-500 mb-6">
              Shipping is calculated and paid on delivery.
            </p>
            <button
              onClick={onCheckout}
              disabled={cart.length === 0}
              className="flex w-full items-center justify-center rounded-md border border-transparent bg-amber-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-amber-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartModal;
