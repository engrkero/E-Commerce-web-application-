import React, { useState } from 'react';
import { X, Ruler } from 'lucide-react';

interface SizeChartModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: string;
}

const SizeChartModal: React.FC<SizeChartModalProps> = ({ isOpen, onClose, category }) => {
  const [activeTab, setActiveTab] = useState<'tops' | 'bottoms' | 'women'>('tops');

  if (!isOpen) return null;

  // Determine initial tab based on category if needed, or just let user switch
  // Simple mapping logic could be added here if strictly required, 
  // but tabs allow flexibility for Unisex items.

  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4 text-center">
        <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity" onClick={onClose} />

        <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:w-full sm:max-w-2xl">
          <div className="bg-gray-900 px-4 py-4 flex justify-between items-center">
            <h3 className="text-lg font-medium text-white flex items-center gap-2">
              <Ruler size={20} className="text-amber-500" /> Size Guide
            </h3>
            <button onClick={onClose} className="text-gray-400 hover:text-white">
              <X size={24} />
            </button>
          </div>

          <div className="p-6">
            <div className="border-b border-gray-200 mb-6">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveTab('tops')}
                  className={`${
                    activeTab === 'tops'
                      ? 'border-amber-500 text-amber-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                >
                  Men's & Unisex Tops
                </button>
                <button
                  onClick={() => setActiveTab('women')}
                  className={`${
                    activeTab === 'women'
                      ? 'border-amber-500 text-amber-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                >
                  Women's Clothing
                </button>
                <button
                  onClick={() => setActiveTab('bottoms')}
                  className={`${
                    activeTab === 'bottoms'
                      ? 'border-amber-500 text-amber-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                >
                  Jeans & Bottoms
                </button>
              </nav>
            </div>

            {activeTab === 'tops' && (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Size</th>
                      <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Chest (inches)</th>
                      <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Length (inches)</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 font-medium text-gray-900">S</td>
                      <td className="px-6 py-4 text-gray-500">36 - 38</td>
                      <td className="px-6 py-4 text-gray-500">27</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-medium text-gray-900">M</td>
                      <td className="px-6 py-4 text-gray-500">38 - 40</td>
                      <td className="px-6 py-4 text-gray-500">28</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-medium text-gray-900">L</td>
                      <td className="px-6 py-4 text-gray-500">40 - 42</td>
                      <td className="px-6 py-4 text-gray-500">29</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-medium text-gray-900">XL</td>
                      <td className="px-6 py-4 text-gray-500">42 - 44</td>
                      <td className="px-6 py-4 text-gray-500">30</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-medium text-gray-900">XXL</td>
                      <td className="px-6 py-4 text-gray-500">44 - 46</td>
                      <td className="px-6 py-4 text-gray-500">31</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'women' && (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Size</th>
                      <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Bust (inches)</th>
                      <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Waist (inches)</th>
                      <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Hips (inches)</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 font-medium text-gray-900">XS</td>
                      <td className="px-6 py-4 text-gray-500">30 - 32</td>
                      <td className="px-6 py-4 text-gray-500">24 - 26</td>
                      <td className="px-6 py-4 text-gray-500">34 - 36</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-medium text-gray-900">S</td>
                      <td className="px-6 py-4 text-gray-500">32 - 34</td>
                      <td className="px-6 py-4 text-gray-500">26 - 28</td>
                      <td className="px-6 py-4 text-gray-500">36 - 38</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-medium text-gray-900">M</td>
                      <td className="px-6 py-4 text-gray-500">34 - 36</td>
                      <td className="px-6 py-4 text-gray-500">28 - 30</td>
                      <td className="px-6 py-4 text-gray-500">38 - 40</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-medium text-gray-900">L</td>
                      <td className="px-6 py-4 text-gray-500">36 - 38</td>
                      <td className="px-6 py-4 text-gray-500">30 - 32</td>
                      <td className="px-6 py-4 text-gray-500">40 - 42</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'bottoms' && (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Size (Waist)</th>
                      <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Waist (inches)</th>
                      <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Inseam (inches)</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 font-medium text-gray-900">30</td>
                      <td className="px-6 py-4 text-gray-500">30</td>
                      <td className="px-6 py-4 text-gray-500">30 - 32</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-medium text-gray-900">32</td>
                      <td className="px-6 py-4 text-gray-500">32</td>
                      <td className="px-6 py-4 text-gray-500">30 - 32</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-medium text-gray-900">34</td>
                      <td className="px-6 py-4 text-gray-500">34</td>
                      <td className="px-6 py-4 text-gray-500">32 - 34</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-medium text-gray-900">36</td>
                      <td className="px-6 py-4 text-gray-500">36</td>
                      <td className="px-6 py-4 text-gray-500">32 - 34</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 font-medium text-gray-900">38</td>
                      <td className="px-6 py-4 text-gray-500">38</td>
                      <td className="px-6 py-4 text-gray-500">32 - 34</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            <div className="mt-6 bg-gray-50 p-4 rounded-md">
              <p className="text-xs text-gray-500">
                <strong>Note:</strong> These measurements are general guidelines. Actual product measurements may vary slightly. 
                If you are between sizes, we recommend sizing up for a more comfortable fit.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SizeChartModal;