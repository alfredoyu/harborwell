import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Award, Users, Microscope, CheckCircle, Star } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import { useApp } from '../context/AppContext';
import { getTranslation } from '../utils/translations';

const Home: React.FC = () => {
  const { state: appState } = useApp();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      // 模拟订阅成功
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const testimonials = [
    {
      name: "Sarah Johnson",
      rating: 5,
      comment: appState.language === 'EN' 
        ? "The AKK Probiotic has been a game-changer for my weight management journey. I've seen real results in just 6 weeks!"
        : "AKK益生菌对我的体重管理之旅来说是一个改变游戏规则的产品。我在短短6周内就看到了真正的效果！",
      verified: true
    },
    {
      name: "Michael Chen",
      rating: 5,
      comment: appState.language === 'EN'
        ? "HarborWell's Liver Detox formula helped me feel more energized and my skin looks amazing. Highly recommend!"
        : "HarborWell的肝脏排毒配方让我感觉更有活力，我的皮肤看起来很棒。强烈推荐！",
      verified: true
    },
    {
      name: "Emily Rodriguez",
      rating: 4,
      comment: appState.language === 'EN'
        ? "Great quality supplements with noticeable results. The customer service is also excellent."
        : "高质量的补充剂，效果显著。客户服务也很出色。",
      verified: true
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-cover bg-center bg-no-repeat" style={{
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url("https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1920")'
      }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              {getTranslation('heroTitle', appState.language)}
              <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent block">
                {getTranslation('heroSubtitle', appState.language)}
              </span>
            </h1>
            <p className="text-xl text-gray-100 mb-8 max-w-3xl mx-auto">
              {getTranslation('heroDescription', appState.language)}
            </p>
            
            {/* Newsletter Signup */}
            <div className="max-w-md mx-auto mb-12">
              <form onSubmit={handleSubscribe} className="flex rounded-lg shadow-lg">
                <input
                  type="email"
                  placeholder={getTranslation('emailPlaceholder', appState.language)}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 px-6 py-4 rounded-l-lg border-0 focus:ring-2 focus:ring-green-500 focus:outline-none bg-white/90 backdrop-blur-sm"
                />
                <button 
                  type="submit"
                  className="bg-green-600 text-white px-8 py-4 rounded-r-lg hover:bg-green-700 transition-colors font-semibold"
                >
                  {getTranslation('subscribe', appState.language)}
                </button>
              </form>
              {subscribed && (
                <p className="mt-2 text-green-600 text-sm">
                  {appState.language === 'EN' ? 'Successfully subscribed!' : '订阅成功！'}
                </p>
              )}
            </div>

            <Link
              to="/products"
              className="inline-flex items-center space-x-2 bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors shadow-lg"
            >
              <span>{getTranslation('shopNow', appState.language)}</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {getTranslation('featuredProducts', appState.language)}
            </h2>
            <p className="text-xl text-gray-600">
              {getTranslation('featuredProductsDesc', appState.language)}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {getTranslation('customerReviews', appState.language)}
            </h2>
            <p className="text-xl text-gray-600">
              {getTranslation('customerReviewsDesc', appState.language)}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="flex space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  {testimonial.verified && (
                    <div className="ml-2 flex items-center space-x-1">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm text-green-600">
                        {getTranslation('verified', appState.language)}
                      </span>
                    </div>
                  )}
                </div>
                <p className="text-gray-700 mb-4">"{testimonial.comment}"</p>
                <p className="font-semibold text-gray-900">{testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                {getTranslation('companyTitle', appState.language)}
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                {getTranslation('companyDesc', appState.language)}
              </p>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="text-center">
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Microscope className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {appState.language === 'EN' ? 'Research Team' : '研究团队'}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {appState.language === 'EN' ? 'PhD scientists and nutritionists' : '博士科学家和营养师'}
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {appState.language === 'EN' ? 'FDA Registered' : 'FDA注册'}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {appState.language === 'EN' ? 'GMP certified facility' : 'GMP认证设施'}
                  </p>
                </div>
              </div>
              
              <Link
                to="/about"
                className="inline-flex items-center space-x-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors"
              >
                <span>{getTranslation('learnMore', appState.language)}</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-8 rounded-xl text-white">
                  <Award className="h-12 w-12 mb-4" />
                  <h3 className="text-2xl font-bold mb-2">15+</h3>
                  <p>{appState.language === 'EN' ? 'Patents & Certifications' : '专利和认证'}</p>
                </div>
                <div className="bg-gradient-to-br from-green-500 to-teal-600 p-8 rounded-xl text-white">
                  <Users className="h-12 w-12 mb-4" />
                  <h3 className="text-2xl font-bold mb-2">50K+</h3>
                  <p>{appState.language === 'EN' ? 'Happy Customers' : '满意客户'}</p>
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-8 rounded-xl text-white">
                  <Microscope className="h-12 w-12 mb-4" />
                  <h3 className="text-2xl font-bold mb-2">25+</h3>
                  <p>{appState.language === 'EN' ? 'Clinical Studies' : '临床研究'}</p>
                </div>
                <div className="bg-gradient-to-br from-orange-500 to-red-600 p-8 rounded-xl text-white">
                  <Shield className="h-12 w-12 mb-4" />
                  <h3 className="text-2xl font-bold mb-2">100%</h3>
                  <p>{appState.language === 'EN' ? 'Third-Party Tested' : '第三方检测'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;