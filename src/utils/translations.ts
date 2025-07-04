export const translations = {
  EN: {
    // Header
    home: 'Home',
    allProducts: 'All Products',
    aboutUs: 'About Us',
    contactUs: 'Contact Us',
    searchPlaceholder: 'Search products...',
    
    // Home page
    heroTitle: 'Science-Backed',
    heroSubtitle: 'Wellness Solutions',
    heroDescription: 'Discover the future of health with our clinically-proven supplements. Engineered for optimal bioavailability and maximum results.',
    emailPlaceholder: 'Enter your email for exclusive offers',
    subscribe: 'Subscribe',
    shopNow: 'Shop Now',
    
    // Products
    featuredProducts: 'Featured Products',
    featuredProductsDesc: 'Our most popular science-backed formulations',
    addToCart: 'Add to Cart',
    outOfStock: 'Out of Stock',
    inStock: 'In Stock',
    
    // Reviews
    customerReviews: 'What Our Customers Say',
    customerReviewsDesc: 'Real results from real people',
    verified: 'Verified',
    
    // Company
    companyTitle: 'Pioneering Health Innovation',
    companyDesc: 'HarborWell was founded on the principle that optimal health should be accessible to everyone. Our partnership with leading research institutions and commitment to scientific excellence drives us to create supplements that deliver real, measurable results.',
    learnMore: 'Learn More About Us',
    
    // News
    latestNews: 'Latest News',
    latestNewsDesc: 'Stay updated with our latest developments',
    readMore: 'Read More',
    
    // Footer
    brandDesc: 'Pioneering science-backed health supplements for optimal wellness and vitality. Your journey to better health starts here.',
    contactInfo: 'Contact Information',
    policies: 'Policies',
    company: 'Company',
    
    // Cart & Checkout
    cart: 'Cart',
    cartEmpty: 'Your cart is empty',
    cartEmptyDesc: 'Discover our science-backed supplements to start your wellness journey.',
    checkout: 'Checkout',
    proceedToCheckout: 'Proceed to Checkout',
    
    // Contact
    contactTitle: 'Contact Us',
    contactDesc: 'Have questions about our products or need support? We\'re here to help you on your wellness journey.',
    
    // About
    aboutTitle: 'About HarborWell',
    aboutDesc: 'Pioneering the future of health through science-backed nutrition and innovative supplement technology.',
    
    // Common
    price: 'Price',
    quantity: 'Quantity',
    total: 'Total',
    continue: 'Continue',
    back: 'Back',
    orders: 'Orders'
  },
  ZH: {
    // Header
    home: '首页',
    allProducts: '所有产品',
    aboutUs: '关于我们',
    contactUs: '联系我们',
    searchPlaceholder: '搜索产品...',
    
    // Home page
    heroTitle: '科学验证的',
    heroSubtitle: '健康解决方案',
    heroDescription: '探索经过临床验证的补充剂的健康未来。专为最佳生物利用度和最大效果而设计。',
    emailPlaceholder: '输入您的邮箱获取独家优惠',
    subscribe: '订阅',
    shopNow: '立即购买',
    
    // Products
    featuredProducts: '精选产品',
    featuredProductsDesc: '我们最受欢迎的科学验证配方',
    addToCart: '加入购物车',
    outOfStock: '缺货',
    inStock: '有库存',
    
    // Reviews
    customerReviews: '客户评价',
    customerReviewsDesc: '真实用户的真实效果',
    verified: '已验证',
    
    // Company
    companyTitle: '引领健康创新',
    companyDesc: 'HarborWell成立的原则是最佳健康应该人人可及。我们与领先研究机构的合作伙伴关系和对科学卓越的承诺推动我们创造出能够提供真实、可衡量结果的补充剂。',
    learnMore: '了解更多关于我们',
    
    // News
    latestNews: '最新资讯',
    latestNewsDesc: '了解我们的最新发展',
    readMore: '阅读更多',
    
    // Footer
    brandDesc: '开创性的科学验证健康补充剂，为最佳健康和活力而生。您的健康之旅从这里开始。',
    contactInfo: '联系信息',
    policies: '政策',
    company: '公司',
    
    // Cart & Checkout
    cart: '购物车',
    cartEmpty: '您的购物车是空的',
    cartEmptyDesc: '发现我们的科学验证补充剂，开始您的健康之旅。',
    checkout: '结账',
    proceedToCheckout: '前往结账',
    
    // Contact
    contactTitle: '联系我们',
    contactDesc: '对我们的产品有疑问或需要支持？我们在这里帮助您的健康之旅。',
    
    // About
    aboutTitle: '关于HarborWell',
    aboutDesc: '通过科学验证的营养和创新补充剂技术开创健康的未来。',
    
    // Common
    price: '价格',
    quantity: '数量',
    total: '总计',
    continue: '继续',
    back: '返回',
    orders: '订单'
  }
};

export const getTranslation = (key: string, language: 'EN' | 'ZH'): string => {
  const keys = key.split('.');
  let value: any = translations[language];
  
  for (const k of keys) {
    value = value?.[k];
  }
  
  return value || key;
};