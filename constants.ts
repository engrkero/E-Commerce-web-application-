import { Product } from './types';

export const PRODUCTS: Product[] = [
  // Unisex / Shirts
  {
    id: '1',
    name: 'Classic Luxury Polo',
    price: 12000,
    category: 'Unisex',
    description: 'High-quality cotton polo shirt available in various colors.',
    image: 'https://picsum.photos/seed/polo1/400/400',
    images: [
      'https://picsum.photos/seed/polo1/400/400',
      'https://picsum.photos/seed/polo1side/400/400',
      'https://picsum.photos/seed/polo1back/400/400'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: ['Black', 'White', 'Navy', 'Red']
  },
  {
    id: '2',
    name: 'Vintage Check Shirt',
    price: 9500,
    category: 'Unisex',
    description: 'Comfortable flannel shirt suitable for casual outings.',
    image: 'https://picsum.photos/seed/shirt1/400/400',
    images: [
      'https://picsum.photos/seed/shirt1/400/400',
      'https://picsum.photos/seed/shirt1detail/400/400'
    ],
    sizes: ['M', 'L', 'XL'],
    colors: ['Red/Black', 'Blue/White']
  },
  {
    id: '3',
    name: 'Armless Summer Shirt',
    price: 6000,
    category: 'Men',
    description: 'Breathable armless shirt perfect for hot weather.',
    image: 'https://picsum.photos/seed/armless/400/400',
    images: [
      'https://picsum.photos/seed/armless/400/400',
      'https://picsum.photos/seed/armless2/400/400'
    ],
    sizes: ['S', 'M', 'L'],
    colors: ['White', 'Grey', 'Black']
  },
  // Bottoms
  {
    id: '4',
    name: 'Premium Denim Jeans',
    price: 15000,
    category: 'Unisex',
    description: 'Rugged and stylish denim jeans.',
    image: 'https://picsum.photos/seed/jeans1/400/400',
    images: [
      'https://picsum.photos/seed/jeans1/400/400',
      'https://picsum.photos/seed/jeans1back/400/400'
    ],
    sizes: ['30', '32', '34', '36', '38'],
    colors: ['Blue', 'Black', 'Grey']
  },
  // Female
  {
    id: '5',
    name: 'Chic Crop Top',
    price: 5500,
    category: 'Women',
    description: 'Trendy crop top for a stylish look.',
    image: 'https://picsum.photos/seed/croptop/400/400',
    images: [
      'https://picsum.photos/seed/croptop/400/400',
      'https://picsum.photos/seed/croptop2/400/400',
      'https://picsum.photos/seed/croptop3/400/400'
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: ['Pink', 'White', 'Black']
  },
  // Underwear
  {
    id: '6',
    name: 'Male Condom Boxers (Pack of 3)',
    price: 7000,
    category: 'Men',
    description: 'Seamless fit, ultra-comfortable material.',
    image: 'https://picsum.photos/seed/boxer1/400/400',
    images: [
      'https://picsum.photos/seed/boxer1/400/400',
      'https://picsum.photos/seed/boxer1pkg/400/400'
    ],
    sizes: ['M', 'L', 'XL', 'XXL'],
    colors: ['Multicolor']
  },
  {
    id: '7',
    name: 'Premium Cotton Boxers',
    price: 4000,
    category: 'Men',
    description: '100% pure cotton boxers.',
    image: 'https://picsum.photos/seed/boxer2/400/400',
    images: [
      'https://picsum.photos/seed/boxer2/400/400',
      'https://picsum.photos/seed/boxer2blue/400/400'
    ],
    sizes: ['M', 'L', 'XL'],
    colors: ['Blue', 'Grey', 'Black']
  },
  {
    id: '8',
    name: 'Banana Boxers',
    price: 4500,
    category: 'Men',
    description: 'Stretchable and durable banana style boxers.',
    image: 'https://picsum.photos/seed/boxer3/400/400',
    images: [
      'https://picsum.photos/seed/boxer3/400/400',
      'https://picsum.photos/seed/boxer3side/400/400'
    ],
    sizes: ['L', 'XL'],
    colors: ['Yellow', 'Black']
  },
  // Bales (Wholesale)
  {
    id: '9',
    name: 'Bale: Ladies Tops (Mixed)',
    price: 150000,
    category: 'Bales',
    description: 'A full sack of foreign used ladies tops. Grade A.',
    image: 'https://picsum.photos/seed/bale1/400/400',
    images: [
      'https://picsum.photos/seed/bale1/400/400',
      'https://picsum.photos/seed/bale1open/400/400'
    ],
    sizes: ['Standard Bale'],
    colors: ['Mixed']
  },
  {
    id: '10',
    name: 'Bale: Mixed Jeans',
    price: 180000,
    category: 'Bales',
    description: 'Heavy bale of mixed denim jeans.',
    image: 'https://picsum.photos/seed/bale2/400/400',
    images: [
      'https://picsum.photos/seed/bale2/400/400',
      'https://picsum.photos/seed/bale2stack/400/400'
    ],
    sizes: ['Standard Bale'],
    colors: ['Mixed']
  },
  {
    id: '11',
    name: 'Bale: Sports Jersey',
    price: 160000,
    category: 'Bales',
    description: 'Assorted sports jerseys from top clubs.',
    image: 'https://picsum.photos/seed/bale3/400/400',
    images: [
      'https://picsum.photos/seed/bale3/400/400',
      'https://picsum.photos/seed/bale3close/400/400'
    ],
    sizes: ['Standard Bale'],
    colors: ['Mixed']
  },
  // Perfumes
  {
    id: '12',
    name: 'Lattafa Asad',
    price: 25000,
    category: 'Perfumes',
    description: 'Long-lasting Arabian fragrance with spicy notes.',
    image: 'https://picsum.photos/seed/lattafa/400/400',
    images: [
      'https://picsum.photos/seed/lattafa/400/400',
      'https://picsum.photos/seed/lattafabox/400/400'
    ],
    sizes: ['100ml'],
    colors: ['Black/Gold']
  },
  {
    id: '13',
    name: 'Zara Gold',
    price: 18000,
    category: 'Perfumes',
    description: 'Elegant and sophisticated scent for daily wear.',
    image: 'https://picsum.photos/seed/zara/400/400',
    images: [
      'https://picsum.photos/seed/zara/400/400',
      'https://picsum.photos/seed/zarabottle/400/400'
    ],
    sizes: ['80ml'],
    colors: ['Gold']
  },
  {
    id: '14',
    name: 'Nivea Roll-on (Pack of 2)',
    price: 4000,
    category: 'Perfumes',
    description: '48h protection, fresh scent.',
    image: 'https://picsum.photos/seed/nivea/400/400',
    images: [
      'https://picsum.photos/seed/nivea/400/400',
      'https://picsum.photos/seed/niveaback/400/400'
    ],
    sizes: ['50ml'],
    colors: ['White', 'Blue']
  },
  {
    id: '15',
    name: 'Rexona MotionSense',
    price: 3500,
    category: 'Perfumes',
    description: 'Anti-perspirant deodorant.',
    image: 'https://picsum.photos/seed/rexona/400/400',
    images: [
      'https://picsum.photos/seed/rexona/400/400'
    ],
    sizes: ['200ml'],
    colors: ['Black', 'Pink']
  }
];

export const SHIPPING_RATES = {
  calabar: 3000,
  outside_min: 5000,
  outside_max: 10000,
  international: 45000
};

export const COUPONS: Record<string, number> = {
  'WELCOME10': 0.1,
  'KERO5': 0.05,
  'SALE20': 0.2
};