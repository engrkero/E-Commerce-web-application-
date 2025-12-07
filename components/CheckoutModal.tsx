import React, { useState } from 'react';
import { X, CheckCircle, Truck, AlertCircle, Tag, Calculator } from 'lucide-react';
import { CartItem, UserDetails, Order, ShippingLocation } from '../types';
import { SHIPPING_RATES, COUPONS } from '../constants';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onSuccess: (order: Order) => void;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, cart, onSuccess }) => {
  const [step, setStep] = useState<'details' | 'payment' | 'success'>('details');
  const [details, setDetails] = useState<UserDetails>({
    name: '',
    email: '',
    phone: '',
    address: '',
    location: 'calabar'
  });
  const [loading, setLoading] = useState(false);
  const [createdOrder, setCreatedOrder] = useState<Order | null>(null);
  
  // Coupon State
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponMessage, setCouponMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);

  if (!isOpen) return null;

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const discountAmount = subtotal * discountPercent;
  const finalTotal = subtotal - discountAmount;
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) return;
    
    const code = couponCode.trim().toUpperCase();
    if (COUPONS[code]) {
      setDiscountPercent(COUPONS[code]);
      setCouponMessage({ type: 'success', text: `Coupon applied! You save ${(COUPONS[code] * 100)}%` });
    } else {
      setDiscountPercent(0);
      setCouponMessage({ type: 'error', text: 'Invalid coupon code.' });
    }
  };

  const simulatePaystackPayment = () => {
    setLoading(true);
    // Simulate API delay
    setTimeout(() => {
      const newOrder: Order = {
        id: Math.random().toString(36).substr(2, 9),
        date: new Date().toISOString(),
        items: [...cart],
        total: finalTotal,
        status: 'Processing',
        shippingDetails: details
      };
      setCreatedOrder(newOrder);
      setLoading(false);
      setStep('success');
    }, 2000);
  };

  const getShippingEstimate = (location: ShippingLocation) => {
    switch (location) {
      case 'calabar':
        return `₦${SHIPPING_RATES.calabar.toLocaleString()}`;
      case 'outside':
        return `₦${SHIPPING_RATES.outside_min.toLocaleString()} - ₦${SHIPPING_RATES.outside_max.toLocaleString()}`;
      case 'international':
        return `Starting from ₦${SHIPPING_RATES.international.toLocaleString()}`;
      default:
        return 'Select location';
    }
  };

  const getShippingText = () => {
    const estimate = getShippingEstimate(details.location);
    return `${estimate} (Paid on Delivery)`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
        <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity" onClick={onClose} />

        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
          
          {/* Header */}
          <div className="bg-gray-50 px-4 py-3 sm:px-6 flex justify-between items-center border-b">
            <h3 className="text-lg font-semibold leading-6 text-gray-900">
              {step === 'details' && 'Shipping Details'}
              {step === 'payment' && 'Payment'}
              {step === 'success' && 'Order Confirmed!'}
            </h3>
            {step !== 'success' && (
              <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
                <X size={24} />
              </button>
            )}
          </div>

          {/* Body */}
          <div className="px-4 py-5 sm:p-6">
            
            {step === 'details' && (
              <form onSubmit={handleDetailsSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Full Name</label>
                  <input
                    required
                    type="text"
                    name="name"
                    value={details.name}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-amber-500 focus:outline-none focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    required
                    type="email"
                    name="email"
                    value={details.email}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-amber-500 focus:outline-none focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                  <input
                    required
                    type="tel"
                    name="phone"
                    value={details.phone}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-amber-500 focus:outline-none focus:ring-amber-500"
                  />
                </div>
                
                {/* Location Selection & Calculator */}
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                  <label className="block text-sm font-medium text-gray-900 mb-2 flex items-center gap-2">
                     <Calculator size={16} className="text-blue-600"/> Shipping Calculator
                  </label>
                  <select
                    name="location"
                    value={details.location}
                    onChange={handleInputChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 px-3 py-2 bg-white"
                  >
                    <option value="calabar">Within Calabar</option>
                    <option value="outside">Outside Calabar / Cross River</option>
                    <option value="international">International</option>
                  </select>
                  
                  <div className="mt-3 flex justify-between items-center text-sm border-t border-blue-200 pt-2">
                    <span className="text-gray-600">Estimated Delivery Fee:</span>
                    <span className="font-bold text-blue-700 text-lg">
                      {getShippingEstimate(details.location)}
                    </span>
                  </div>
                  <p className="text-xs text-blue-600 mt-1">
                    Fee is paid directly to the courier upon delivery.
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Delivery Address</label>
                  <textarea
                    required
                    name="address"
                    value={details.address}
                    onChange={handleInputChange}
                    rows={3}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-amber-500 focus:outline-none focus:ring-amber-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-md bg-amber-600 px-3 py-3 text-white font-semibold shadow-sm hover:bg-amber-700 focus:outline-none"
                >
                  Continue to Payment
                </button>
              </form>
            )}

            {step === 'payment' && (
              <div className="space-y-6">
                
                {/* Coupon Section */}
                <div className="flex space-x-2">
                  <div className="relative flex-grow">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Tag size={16} className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Coupon Code (e.g., WELCOME10)"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 sm:text-sm"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleApplyCoupon}
                    className="bg-gray-800 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-700"
                  >
                    Apply
                  </button>
                </div>
                {couponMessage && (
                  <p className={`text-sm ${couponMessage.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                    {couponMessage.text}
                  </p>
                )}

                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-semibold">₦{subtotal.toLocaleString()}</span>
                  </div>
                  {discountPercent > 0 && (
                    <div className="flex justify-between mb-2 text-green-600">
                      <span>Discount ({(discountPercent * 100)}%):</span>
                      <span>-₦{discountAmount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="flex justify-between mb-2 items-center text-amber-700">
                    <span className="flex items-center gap-1"><Truck size={16}/> Shipping Fee:</span>
                    <span className="font-medium text-sm">{getShippingText()}</span>
                  </div>
                  <div className="border-t border-gray-200 mt-2 pt-2 flex justify-between">
                    <span className="font-bold text-lg">Pay Now:</span>
                    <span className="font-bold text-lg">₦{finalTotal.toLocaleString()}</span>
                  </div>
                </div>

                <div className="rounded-md bg-blue-50 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <AlertCircle className="h-5 w-5 text-blue-400" aria-hidden="true" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-blue-800">Important Note</h3>
                      <div className="mt-2 text-sm text-blue-700">
                        <p>You are only paying for the goods now. The shipping fee is paid directly to the dispatch rider upon delivery.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={simulatePaystackPayment}
                  disabled={loading}
                  className="w-full flex items-center justify-center rounded-md border border-transparent bg-green-600 px-6 py-4 text-base font-bold text-white shadow-sm hover:bg-green-700 focus:outline-none disabled:opacity-50"
                >
                  {loading ? 'Processing with Paystack...' : `Pay ₦${finalTotal.toLocaleString()}`}
                </button>
                <button
                   onClick={() => setStep('details')}
                   className="w-full text-center text-sm text-gray-500 underline"
                >
                  Back to Details
                </button>
              </div>
            )}

            {step === 'success' && (
              <div className="text-center py-6">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Successful!</h2>
                <p className="text-gray-600 mb-6">
                  Thank you, {details.name}. Your payment of ₦{finalTotal.toLocaleString()} has been received.
                  We will contact you at {details.phone} shortly to arrange delivery.
                </p>
                <div className="bg-amber-50 p-4 rounded-lg mb-6 text-left">
                  <p className="font-semibold text-amber-800 mb-1">Reminder:</p>
                  <p className="text-sm text-amber-700">
                    Please prepare the shipping fee ({getShippingText()}) for the dispatch rider.
                  </p>
                </div>
                <button
                  onClick={() => createdOrder && onSuccess(createdOrder)}
                  className="w-full rounded-md bg-gray-900 px-4 py-2 text-white font-medium hover:bg-gray-800"
                >
                  Continue Shopping
                </button>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;