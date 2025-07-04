import { Product } from '../types';

export const products: Product[] = [
  {
    id: 'akk-probiotic',
    name: 'AKK Probiotic Weight Management',
    brand: 'HarborWell',
    price: 49.99,
    originalPrice: 69.99,
    image: '/src/assets/images/1.png',
    images: ['/src/assets/images/1.png'],
    category: 'Weight Management',
    description: 'Advanced probiotic formula featuring AKK bacteria (Akkermansia muciniphila) specifically designed to support healthy weight management and metabolic function.',
    benefits: [
      'Supports healthy weight management',
      'Promotes metabolic balance',
      'Enhances gut barrier function',
      'Supports digestive health',
      'Clinically studied AKK strain'
    ],
    ingredients: [
      'Akkermansia muciniphila (AKK) - 10 billion CFU',
      'Prebiotic fiber blend',
      'Vegetable capsule',
      'Rice flour (anti-caking agent)'
    ],
    usage: 'Take 2 capsules daily with meals, or as directed by your healthcare professional.',
    allergens: ['May contain traces of soy'],
    inStock: true,
    sales: 2847,
    rating: 4.8,
    reviews: 324
  },
  {
    id: 'liver-detox-beauty',
    name: 'Liver Detox & Beauty Complex',
    brand: 'HarborWell',
    price: 39.99,
    originalPrice: 54.99,
    image: '/src/assets/images/2.png',
    images: ['/src/assets/images/2.png'],
    category: 'Beauty & Anti-Aging',
    description: 'Comprehensive liver support and beauty formula combining milk thistle, detoxifying herbs, and anti-aging compounds for radiant skin and optimal liver function.',
    benefits: [
      'Supports liver detoxification',
      'Promotes radiant skin',
      'Anti-aging properties',
      'Enhances natural beauty',
      'Supports overall wellness'
    ],
    ingredients: [
      'Milk Thistle Extract (80% Silymarin) - 300mg',
      'Dandelion Root Extract - 200mg',
      'Turmeric Extract (95% Curcumin) - 150mg',
      'Artichoke Leaf Extract - 100mg',
      'Vitamin E - 15mg',
      'Selenium - 55mcg'
    ],
    usage: 'Take 2 tablets daily with water, preferably with meals.',
    allergens: ['Gluten-free', 'Non-GMO'],
    inStock: true,
    sales: 1923,
    rating: 4.7,
    reviews: 287
  }
];