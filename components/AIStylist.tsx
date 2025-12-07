import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Sparkles, Loader2 } from 'lucide-react';
import { sendMessageToGemini } from '../services/geminiService';
import { CartItem, Product } from '../types';

interface AIStylistProps {
  cart: CartItem[];
  wishlist: Product[];
}

const AIStylist: React.FC<AIStylistProps> = ({ cart, wishlist }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'model', text: string}[]>([
    { role: 'model', text: "Hello! I'm Kero, your personal stylist. Looking for a specific outfit or need a gift idea? Ask me!" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setLoading(true);

    // Construct context string
    const cartNames = cart.map(item => `${item.name} (${item.category})`).join(', ');
    const wishlistNames = wishlist.map(item => `${item.name} (${item.category})`).join(', ');
    
    let context = '';
    if (cartNames) context += `User has these items in cart: ${cartNames}. `;
    if (wishlistNames) context += `User has these items in wishlist: ${wishlistNames}. `;

    const reply = await sendMessageToGemini(userMessage, context);
    
    setMessages(prev => [...prev, { role: 'model', text: reply }]);
    setLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 bg-gray-900 text-white p-4 rounded-full shadow-lg hover:bg-gray-800 transition-all duration-300 flex items-center gap-2"
        >
          <Sparkles size={20} className="text-amber-400" />
          <span className="font-medium hidden sm:inline">Ask Stylist</span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-0 right-0 z-50 w-full sm:w-96 sm:bottom-6 sm:right-6 bg-white shadow-2xl rounded-t-xl sm:rounded-xl border border-gray-200 flex flex-col h-[500px] max-h-[80vh]">
          
          {/* Header */}
          <div className="bg-gray-900 text-white p-4 rounded-t-xl flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="bg-amber-500 p-1 rounded-full">
                <Sparkles size={16} className="text-white" />
              </div>
              <div>
                <h3 className="font-semibold">Kero AI Stylist</h3>
                <p className="text-xs text-gray-300">Powered by Gemini</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:text-amber-400">
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${
                    msg.role === 'user'
                      ? 'bg-amber-600 text-white rounded-br-none'
                      : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none shadow-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-none px-4 py-2 shadow-sm">
                  <Loader2 size={16} className="animate-spin text-amber-600" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t bg-white">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Suggest a perfume for a date..."
                className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-amber-500"
              />
              <button
                onClick={handleSend}
                disabled={loading || !input.trim()}
                className="p-2 bg-amber-600 text-white rounded-full hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIStylist;