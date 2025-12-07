import React from 'react';
import { X, Package, Clock, CheckCircle } from 'lucide-react';
import { Order } from '../types';

interface OrderTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
}

const OrderTrackingModal: React.FC<OrderTrackingModalProps> = ({ isOpen, onClose, orders }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="absolute inset-y-0 right-0 max-w-md w-full flex">
        <div className="h-full w-full bg-white shadow-xl flex flex-col animate-slide-in-right">
          <div className="flex items-center justify-between px-4 py-6 bg-gray-900 text-white">
            <h2 className="text-lg font-medium">My Orders</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-800 rounded-full">
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {orders.length === 0 ? (
              <div className="text-center py-10 text-gray-500">
                <Package size={48} className="mx-auto mb-4 opacity-50" />
                <p>No orders yet.</p>
              </div>
            ) : (
              orders.slice().reverse().map((order) => (
                <div key={order.id} className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                  <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex justify-between items-center">
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Order ID</p>
                      <p className="font-mono font-medium text-sm">#{order.id.slice(-6).toUpperCase()}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Date</p>
                      <p className="text-sm">{new Date(order.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  
                  <div className="px-4 py-3">
                    <div className="flex items-center mb-3">
                      {order.status === 'Processing' && <Clock size={16} className="text-amber-500 mr-2" />}
                      {order.status === 'Shipped' && <Package size={16} className="text-blue-500 mr-2" />}
                      {order.status === 'Delivered' && <CheckCircle size={16} className="text-green-500 mr-2" />}
                      <span className={`text-sm font-semibold ${
                        order.status === 'Processing' ? 'text-amber-600' : 
                        order.status === 'Shipped' ? 'text-blue-600' : 'text-green-600'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                    
                    <div className="space-y-2 mb-3">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between text-sm">
                          <span className="text-gray-600">{item.quantity}x {item.name}</span>
                          <span className="font-medium">₦{(item.price * item.quantity).toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                    
                    <div className="border-t border-gray-100 pt-3 flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-900">Total Paid</span>
                      <span className="text-lg font-bold text-gray-900">₦{order.total.toLocaleString()}</span>
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

export default OrderTrackingModal;