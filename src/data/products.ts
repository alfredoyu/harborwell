import { Product } from '../types';

export const products: Product[] = [
  {
    id: 'akk-metabolic-catalyst-plus',
    name: 'AKK Metabolic Catalyst PLUS',
    brand: 'HarborWell',
    price: 49.99,
    originalPrice: 69.99,
    image: '/src/assets/images/1.png',
    images: ['/src/assets/images/1.png'],
    category: 'Weight Management',
    description: 'AKK Metabolic Catalyst PLUS is a revolutionary dietary supplement designed to support weight loss and metabolic health. Formulated with a synergistic blend of natural ingredients that work together to manage the metabolism of sugar, fat, and cholesterol. Developed by a top U.S. research team with 15 years of experience and FDA certified.',
    benefits: [
      'Metabolic Management: Improves the body\'s overall metabolism',
      'Weight Control: Promotes an "easy-to-lose" body type for effective weight management',
      'Appetite Suppression: Helps inhibit appetite and increase feelings of fullness',
      'Fat Metabolism: Promotes fat breakdown and inhibits new fat cell formation',
      'Blood Sugar Control: Helps regulate glucose levels and improve insulin sensitivity',
      'Gut Health Support: Contains beneficial bacteria for digestive wellness'
    ],
    ingredients: [
      'PGC-1α & AMPK Activation Complex - Master metabolic switch for fat and sugar burning',
      'Plant-based GLP-1 - Mimics natural hormone effects for blood sugar and appetite regulation',
      'α-Lipoic Acid - Antioxidant for blood sugar control and protein glycation prevention',
      'D-Ribose - Activates AMPK to promote fatty acid oxidation and insulin sensitivity',
      'AKK Powder (Akkermansia muciniphila) - Gut-friendly bacteria for weight loss support',
      'Euglena Polyphenols - Microalgae rich in protein and fiber for satiety control',
      'Apple Polyphenols - Inhibits dietary fat absorption and promotes fat-burning enzymes',
      'EGCG (Epigallocatechin Gallate) - Powerful antioxidant that activates AMPK and increases metabolic rate',
      'Citrus Fiber - Promotes gut health, satiety, and blood sugar regulation',
      'Boletus Edulis Extract (Ergothioneine) - Antioxidant for sugar breakdown and fat balance',
      'Chromium Picolinate - Enhances insulin activity and glucose metabolism',
      'Potassium - Essential for sugar, protein, and energy metabolism',
      'Vitamin B12 - Critical for carbohydrate, fat, and protein metabolism'
    ],
    usage: 'For smaller body types: Take 1 capsule once daily with a meal. For larger body types: Take 2 capsules once daily with a meal. Store at room temperature.',
    allergens: ['Consult healthcare provider before use', 'Not suitable for pregnant or nursing women'],
    inStock: true,
    sales: 3247,
    rating: 4.9,
    reviews: 428,
    specifications: {
      capsules: 60,
      shelfLife: '3 years',
      storage: 'Room temperature'
    },
    targetAudience: [
      'Individuals with slow metabolism',
      'Those experiencing unexplained weight gain or difficulty losing weight',
      'People with sedentary lifestyle and high visceral fat',
      'Those with metabolic abnormalities due to irregular sleep patterns',
      'Anyone seeking comprehensive weight management support'
    ]
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