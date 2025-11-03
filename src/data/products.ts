import { Product } from '../types';

export const products: Product[] = [
  {
    id: 'slimbody-metabo-probiotic',
    name: 'Slimbody Metabo Probiotic',
    brand: 'HarborWell',
    price: 49.99,
    originalPrice: 69.99,
    image: '/images/1.jpeg',
    images: [
      '/images/1.jpeg',
      '/images/2.jpeg',
      '/images/3.jpeg'
    ],
    category: 'Weight Management',
    description: 'Slimbody Metabo Probiotic is a revolutionary dietary supplement designed to support weight loss and metabolic health. Formulated with a synergistic blend of natural ingredients that work together to manage the metabolism of sugar, fat, and cholesterol. Developed by a top U.S. research team with 15 years of experience and FDA certified.',
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
    id: 'cellular-age-bright-complex',
    name: 'Cellular AGE- Bright Complex',
    brand: 'HarborWell',
    price: 89.99,
    originalPrice: 119.99,
    image: '/images/2.png',
    images: [
      '/images/2.png',
      '/images/1.png',
      '/images/2.jpg'
    ],
    category: 'Beauty & Anti-Aging',
    description: 'Introducing Cellular AGE- Bright Complex, a pinnacle of anti-aging science designed for those who seek to preserve their youthfulness from the inside out. This luxurious, high-potency compound formula provides internal conditioning and external nourishment through a multi-benefit, all-in-one solution. By activating cellular vitality and providing powerful antioxidant defense, Cellular AGE- Bright Complex helps you achieve profound anti-aging and youth-preserving results.',
    benefits: [
      'Cellular Activation: Works at the cellular level to rejuvenate and energize your body from its very foundation',
      'Internal Anti-Aging: Promotes the body\'s own endogenous anti-aging and conditioning processes for sustainable, long-term results',
      'Comprehensive Antioxidant Defense: Delivers a multi-effect shield against oxidative stress, a key factor in aging',
      'All-in-One Formula: A sophisticated, multi-benefit formula that combines internal regulation with external nourishment in a single daily capsule',
      'Mitochondrial Support: Enhances cellular energy production and protects cellular powerhouses',
      'DNA Repair Support: Promotes cellular longevity and healthy aging pathways'
    ],
    ingredients: [
      'NR (Nicotinamide Riboside) 300mg - Highly effective precursor to NAD+, essential for cellular energy production, DNA repair, and overall cellular longevity',
      'PQQ (Pyrroloquinoline Quinone) 10mg - Potent nutrient that supports mitochondrial health and promotes generation of new mitochondria',
      'Co-crystal Reduced Coenzyme Q10 50mg - Most bioavailable, active form of CoQ10 for cellular energy and oxidative damage protection',
      'Ergothioneine 10mg - Unique intelligent antioxidant that specifically targets and neutralizes harmful free radicals',
      'Spermidine 15mg - Key compound that induces autophagy, the body\'s natural cellular cleanup process for renewal',
      'Astaxanthin 6mg - One of nature\'s most powerful antioxidants for oxidative stress combat and skin elasticity support',
      'Pterostilbene 10mg - Powerful antioxidant that works synergistically to support healthy aging pathways and cellular protection'
    ],
    usage: 'Take one capsule, once daily. Store in a cool, dry place away from direct sunlight.',
    allergens: ['Consult healthcare provider before use', 'Not suitable for pregnant or nursing women'],
    inStock: true,
    sales: 1847,
    rating: 4.8,
    reviews: 234,
    specifications: {
      capsules: 60,
      shelfLife: '3 years',
      storage: 'Cool, dry place away from direct sunlight'
    },
    targetAudience: [
      'Individuals concerned with signs of aging who want to maintain a youthful appearance',
      'Those experiencing a decline in energy levels and cellular vitality',
      'People seeking to proactively support their long-term health and longevity at a cellular level',
      'Anyone desiring a high-end, comprehensive, all-in-one anti-aging supplement'
    ]
  }
];