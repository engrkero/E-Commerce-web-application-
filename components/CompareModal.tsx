import React from 'react';
import { X, ShoppingCart, Trash2, ArrowRightLeft } from 'lucide-react';
import { Product } from '../types';

interface CompareModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onRemove: (id: string) => void;
  onAddToCart: (product: Product) => void;
}

const CompareModal: React.FC<CompareModalProps> = ({
  isOpen, onClose, products, onRemove, onAddToCart
}) => {
  if (!isOpen) return null;

  if (products.length === 0) {
    onClose();
    return null;
  }

  // Helper to check if values differ across products
  const hasDifferences = (key: keyof Product) => {
    if (products.length < 2) return false;
    const values = products.map(p => {
       if (key === 'colors' || key === 'sizes') return JSON.stringify(p[key].sort());
       return p[key];
    });
    return new Set(values).size > 1;
  };

  const attributes: { label: string; key: keyof Product; format?: (v: any) => React.ReactNode }[] = [
    { label: 'Price', key: 'price', format: (v: number) => `₦${v.toLocaleString()}` },
    { label: 'Category', key: 'category' },
    { label: 'Description', key: 'description' },
    { label: 'Colors', key: 'colors', format: (v: string[]) => v.join(', ') },
    { label: 'Sizes', key: 'sizes', format: (v: string[]) => v.join(', ') },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-2 text-center sm:p-0">
            <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity" onClick={onClose} />
            
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all w-full max-w-6xl my-8">
                <div className="bg-gray-50 px-4 py-4 flex justify-between items-center border-b">
                    <div className="flex items-center gap-2">
                        <ArrowRightLeft className="text-amber-600" />
                        <h3 className="text-lg font-bold text-gray-900">Compare Products ({products.length})</h3>
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
                        <X size={24} />
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr>
                                <th className="p-4 bg-gray-50 border-b min-w-[150px] text-sm font-semibold text-gray-500 uppercase tracking-wider">Features</th>
                                {products.map(product => (
                                    <th key={product.id} className="p-4 border-b min-w-[250px] relative group align-bottom">
                                         <button 
                                            onClick={() => onRemove(product.id)}
                                            className="absolute top-2 right-2 p-1 bg-white rounded-full shadow hover:bg-red-50 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                        <div className="h-48 w-full mb-4 overflow-hidden rounded-md border border-gray-200 bg-gray-100">
                                            <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                                        </div>
                                        <h4 className="font-bold text-lg leading-tight">{product.name}</h4>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {attributes.map(attr => {
                                const isDiff = hasDifferences(attr.key);
                                return (
                                    <tr key={attr.key} className={isDiff ? 'bg-amber-50/30' : ''}>
                                        <td className="p-4 font-semibold text-gray-700 bg-gray-50/50">
                                            <div className="flex items-center gap-2">
                                                {attr.label}
                                                {isDiff && <span className="w-2 h-2 rounded-full bg-amber-500" title="Different across products"></span>}
                                            </div>
                                        </td>
                                        {products.map(product => (
                                            <td key={product.id} className="p-4 text-gray-600 align-top">
                                                {/* @ts-ignore */}
                                                {attr.format ? attr.format(product[attr.key]) : product[attr.key]}
                                            </td>
                                        ))}
                                    </tr>
                                )
                            })}
                            <tr>
                                <td className="p-4 bg-gray-50/50"></td>
                                {products.map(product => (
                                    <td key={product.id} className="p-4">
                                        <button
                                            onClick={() => onAddToCart(product)}
                                            className="w-full flex items-center justify-center bg-gray-900 text-white px-4 py-2 rounded-md font-medium hover:bg-gray-800 transition-colors shadow-sm"
                                        >
                                            <ShoppingCart size={16} className="mr-2" />
                                            Add to Cart
                                        </button>
                                    </td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
  );
};

export default CompareModal;