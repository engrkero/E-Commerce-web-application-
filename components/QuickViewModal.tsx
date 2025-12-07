import React, { useState, useEffect } from 'react';
import { X, ShoppingCart, Heart, ChevronLeft, ChevronRight, Share2, Star, Send, Ruler } from 'lucide-react';
import { Product, Review } from '../types';
import SizeChartModal from './SizeChartModal';

interface QuickViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
  onAddToCart: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
}

const QuickViewModal: React.FC<QuickViewModalProps> = ({ 
  isOpen, onClose, product, onAddToCart, onToggleWishlist, isWishlisted 
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '', name: '' });
  const [activeTab, setActiveTab] = useState<'details' | 'reviews'>('details');
  const [isSizeChartOpen, setIsSizeChartOpen] = useState(false);

  useEffect(() => {
    if (product && isOpen) {
      setCurrentImageIndex(0);
      setActiveTab('details');
      // Load reviews from local storage
      const storedReviews = JSON.parse(localStorage.getItem('keroluxe_reviews') || '{}');
      setReviews(storedReviews[product.id] || []);
    }
  }, [product, isOpen]);

  if (!isOpen || !product) return null;

  const images = product.images && product.images.length > 0 ? product.images : [product.image];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleShare = (platform: 'facebook' | 'twitter' | 'whatsapp') => {
    const url = encodeURIComponent(window.location.href); // In production this would be product URL
    const text = encodeURIComponent(`Check out ${product.name} on KEROLUXE!`);
    
    let shareUrl = '';
    if (platform === 'facebook') shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    if (platform === 'twitter') shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
    if (platform === 'whatsapp') shareUrl = `https://wa.me/?text=${text} ${url}`;
    
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  const submitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.comment.trim() || !newReview.name.trim()) return;

    const review: Review = {
      id: Date.now().toString(),
      productId: product.id,
      userName: newReview.name,
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toLocaleDateString()
    };

    const updatedReviews = [review, ...reviews];
    setReviews(updatedReviews);
    
    const allReviews = JSON.parse(localStorage.getItem('keroluxe_reviews') || '{}');
    allReviews[product.id] = updatedReviews;
    localStorage.setItem('keroluxe_reviews', JSON.stringify(allReviews));

    setNewReview({ rating: 5, comment: '', name: '' });
  };

  const hasSizes = product.sizes && product.sizes.length > 0;
  const isClothing = ['Men', 'Women', 'Unisex', 'Bales'].includes(product.category);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
        <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity" onClick={onClose} />

        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-4xl h-[90vh] sm:h-auto flex flex-col sm:block">
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-500 z-10 bg-white rounded-full p-1"
          >
            <X size={24} />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 h-full">
            {/* Left: Image Carousel */}
            <div className="h-64 md:h-[600px] bg-gray-100 relative group">
              <img
                src={images[currentImageIndex]}
                alt={`${product.name} view ${currentImageIndex + 1}`}
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
              />
              
              {images.length > 1 && (
                <>
                  <button 
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button 
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                  >
                    <ChevronRight size={24} />
                  </button>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                    {images.map((_, idx) => (
                      <div 
                        key={idx}
                        className={`w-2 h-2 rounded-full ${idx === currentImageIndex ? 'bg-amber-600' : 'bg-white/60'}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Right: Info & Reviews */}
            <div className="flex flex-col h-full max-h-[calc(90vh-16rem)] md:max-h-[600px]">
              {/* Tabs */}
              <div className="flex border-b">
                <button
                  onClick={() => setActiveTab('details')}
                  className={`flex-1 py-4 text-sm font-medium text-center ${activeTab === 'details' ? 'border-b-2 border-amber-600 text-amber-600' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  Details
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`flex-1 py-4 text-sm font-medium text-center ${activeTab === 'reviews' ? 'border-b-2 border-amber-600 text-amber-600' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  Reviews ({reviews.length})
                </button>
              </div>

              <div className="p-6 md:p-8 overflow-y-auto flex-1">
                {activeTab === 'details' ? (
                  <div className="flex flex-col h-full">
                    <div>
                      <span className="text-amber-600 font-semibold tracking-wider text-xs uppercase">
                        {product.category}
                      </span>
                      <h2 className="mt-1 text-2xl font-bold text-gray-900">{product.name}</h2>
                      <p className="mt-4 text-gray-500 leading-relaxed">{product.description}</p>
                      
                      <div className="mt-6 space-y-4">
                        {hasSizes && (
                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <h4 className="text-sm font-medium text-gray-900">Available Sizes</h4>
                              {isClothing && (
                                <button 
                                  onClick={() => setIsSizeChartOpen(true)}
                                  className="text-xs text-amber-600 hover:text-amber-700 underline flex items-center gap-1"
                                >
                                  <Ruler size={14} /> Size Chart
                                </button>
                              )}
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {product.sizes.map(size => (
                                <span key={size} className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-600 hover:border-amber-500 cursor-default">
                                  {size}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {product.colors && product.colors.length > 0 && (
                          <div>
                            <h4 className="text-sm font-medium text-gray-900">Available Colors</h4>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {product.colors.map(color => (
                                <span key={color} className="px-3 py-1 border border-gray-300 rounded text-sm text-gray-600 hover:border-amber-500 cursor-default">
                                  {color}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mt-auto pt-8">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-3xl font-bold text-gray-900">
                          ₦{product.price.toLocaleString()}
                        </span>
                        
                        {/* Social Share */}
                        <div className="flex gap-2">
                          <button onClick={() => handleShare('facebook')} className="p-2 text-blue-600 hover:bg-blue-50 rounded-full" title="Share on Facebook">
                            <Share2 size={20} />
                          </button>
                          <button onClick={() => handleShare('twitter')} className="p-2 text-sky-500 hover:bg-sky-50 rounded-full" title="Share on Twitter">
                            <Share2 size={20} />
                          </button>
                          <button onClick={() => handleShare('whatsapp')} className="p-2 text-green-500 hover:bg-green-50 rounded-full" title="Share on WhatsApp">
                            <Share2 size={20} />
                          </button>
                        </div>
                      </div>
                      
                      <div className="flex gap-3">
                        <button
                          onClick={() => {
                            onAddToCart(product);
                            onClose();
                          }}
                          className="flex-1 flex items-center justify-center bg-gray-900 text-white px-6 py-3 rounded-md font-medium hover:bg-gray-800 transition-colors shadow-lg hover:shadow-xl transform active:scale-95"
                        >
                          <ShoppingCart size={20} className="mr-2" />
                          Add to Cart
                        </button>
                        <button
                          onClick={() => onToggleWishlist(product)}
                          className={`p-3 rounded-md border transition-colors ${
                            isWishlisted 
                              ? 'border-red-500 text-red-500 bg-red-50' 
                              : 'border-gray-300 text-gray-400 hover:text-red-500 hover:border-red-500'
                          }`}
                        >
                          <Heart size={20} fill={isWishlisted ? "currentColor" : "none"} />
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Add Review Form */}
                    <form onSubmit={submitReview} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <h4 className="font-semibold mb-3">Write a Review</h4>
                      <div className="mb-3">
                        <input
                          type="text"
                          placeholder="Your Name"
                          required
                          value={newReview.name}
                          onChange={(e) => setNewReview({...newReview, name: e.target.value})}
                          className="w-full border-gray-300 rounded-md shadow-sm text-sm p-2"
                        />
                      </div>
                      <div className="mb-3 flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setNewReview({...newReview, rating: star})}
                            className={`${star <= newReview.rating ? 'text-amber-500' : 'text-gray-300'}`}
                          >
                            <Star size={20} fill="currentColor" />
                          </button>
                        ))}
                      </div>
                      <textarea
                        placeholder="Share your thoughts..."
                        required
                        value={newReview.comment}
                        onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                        className="w-full border-gray-300 rounded-md shadow-sm text-sm p-2 mb-3"
                        rows={3}
                      />
                      <button type="submit" className="bg-amber-600 text-white text-sm px-4 py-2 rounded-md hover:bg-amber-700 flex items-center gap-1">
                        <Send size={14} /> Post Review
                      </button>
                    </form>

                    {/* Reviews List */}
                    <div className="space-y-4">
                      {reviews.length === 0 ? (
                        <p className="text-gray-500 text-center py-4">No reviews yet. Be the first!</p>
                      ) : (
                        reviews.map((review) => (
                          <div key={review.id} className="border-b pb-4 last:border-0">
                            <div className="flex justify-between items-start mb-1">
                              <div className="font-semibold text-gray-900">{review.userName}</div>
                              <div className="text-xs text-gray-500">{review.date}</div>
                            </div>
                            <div className="flex text-amber-500 mb-2">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} size={14} fill={i < review.rating ? "currentColor" : "none"} className={i >= review.rating ? "text-gray-300" : ""} />
                              ))}
                            </div>
                            <p className="text-gray-600 text-sm">{review.comment}</p>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Nested Size Chart Modal */}
      <SizeChartModal 
        isOpen={isSizeChartOpen}
        onClose={() => setIsSizeChartOpen(false)}
        category={product.category}
      />
    </div>
  );
};

export default QuickViewModal;