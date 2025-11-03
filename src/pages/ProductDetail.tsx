import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ShoppingCart, Heart, Share2, CheckCircle, AlertCircle, ArrowLeft, Users, Package, Clock } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { useApp } from '../context/AppContext';
import { convertPrice, formatPrice } from '../utils/currency';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = products.find(p => p.id === id);
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('description');
  const { dispatch } = useCart();
  const { state: appState } = useApp();

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
          <Link to="/products" className="text-blue-600 hover:text-blue-700">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    dispatch({
      type: 'ADD_ITEM',
      payload: { product, quantity }
    });
  };

  const convertedPrice = convertPrice(product.price, 'USD', appState.currency);
  const convertedOriginalPrice = product.originalPrice 
    ? convertPrice(product.originalPrice, 'USD', appState.currency)
    : null;

  const tabs = [
    { id: 'description', label: 'Description' },
    { id: 'ingredients', label: 'Ingredients' },
    { id: 'usage', label: 'Usage & Dosage' },
    { id: 'target', label: 'Target Audience' },
    { id: 'reviews', label: 'Reviews' }
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-8">
          <Link to="/" className="hover:text-blue-600">Home</Link>
          <span>/</span>
          <Link to="/products" className="hover:text-blue-600">Products</Link>
          <span>/</span>
          <span className="text-gray-900">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden">
              <img
                src={product.images[selectedImageIndex]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <div 
                  key={index} 
                  className={`aspect-square bg-gray-100 rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all ${
                    selectedImageIndex === index ? 'ring-2 ring-blue-500' : ''
                  }`}
                  onClick={() => setSelectedImageIndex(index)}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-blue-600 font-medium">{product.brand}</span>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                    <Heart className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-blue-500 transition-colors">
                    <Share2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
              
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="text-gray-600 ml-2">({product.reviews} reviews)</span>
                </div>
                <span className="text-gray-600">{product.sales} sold</span>
              </div>

              <div className="flex items-center space-x-4 mb-6">
                <span className="text-3xl font-bold text-gray-900">
                  {formatPrice(convertedPrice, appState.currency)}
                </span>
                {convertedOriginalPrice && (
                  <span className="text-xl text-gray-500 line-through">
                    {formatPrice(convertedOriginalPrice, appState.currency)}
                  </span>
                )}
                {convertedOriginalPrice && (
                  <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-sm font-medium">
                    Save {formatPrice(convertedOriginalPrice - convertedPrice, appState.currency)}
                  </span>
                )}
              </div>
            </div>

            {/* Product Specifications */}
            {product.specifications && (
              <div className="grid grid-cols-3 gap-4 mb-6">
                {product.specifications.capsules && (
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <Package className="h-6 w-6 text-blue-600 mx-auto mb-2" />
                    <div className="text-sm text-gray-600">Capsules</div>
                    <div className="font-semibold">{product.specifications.capsules}</div>
                  </div>
                )}
                {product.specifications.shelfLife && (
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <Clock className="h-6 w-6 text-green-600 mx-auto mb-2" />
                    <div className="text-sm text-gray-600">Shelf Life</div>
                    <div className="font-semibold">{product.specifications.shelfLife}</div>
                  </div>
                )}
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <Users className="h-6 w-6 text-purple-600 mx-auto mb-2" />
                  <div className="text-sm text-gray-600">Rating</div>
                  <div className="font-semibold">{product.rating}/5</div>
                </div>
              </div>
            )}

            {/* Stock Status */}
            <div className="flex items-center space-x-2">
              {product.inStock ? (
                <>
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="text-green-600 font-medium">In Stock</span>
                </>
              ) : (
                <>
                  <AlertCircle className="h-5 w-5 text-red-500" />
                  <span className="text-red-600 font-medium">Out of Stock</span>
                </>
              )}
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <label className="text-gray-700 font-medium">Quantity:</label>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-gray-600 hover:text-gray-800"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 border-x border-gray-300">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-gray-600 hover:text-gray-800"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className={`flex-1 flex items-center justify-center space-x-2 py-4 px-6 rounded-lg font-semibold transition-colors ${
                    product.inStock
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>Add to Cart</span>
                </button>
                <button
                  disabled={!product.inStock}
                  className={`px-8 py-4 rounded-lg font-semibold transition-colors ${
                    product.inStock
                      ? 'bg-gray-900 text-white hover:bg-gray-800'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Buy Now
                </button>
              </div>
            </div>

            {/* Key Benefits */}
            <div className="bg-blue-50 p-6 rounded-xl">
              <h3 className="font-semibold text-gray-900 mb-3">Key Benefits</h3>
              <ul className="space-y-2">
                {product.benefits.slice(0, 4).map((benefit, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <CheckCircle className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="py-8">
            {activeTab === 'description' && (
              <div className="prose max-w-none">
                <p className="text-gray-700 text-lg leading-relaxed mb-6">{product.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl">
                    <h4 className="font-semibold text-blue-900 mb-3">Core Benefits</h4>
                    <ul className="space-y-2">
                      {product.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <CheckCircle className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                          <span className="text-blue-800 text-sm">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {product.specifications && (
                    <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl">
                      <h4 className="font-semibold text-green-900 mb-3">Product Specifications</h4>
                      <div className="space-y-2">
                        {product.specifications.capsules && (
                          <div className="flex justify-between">
                            <span className="text-green-700">Capsules per bottle:</span>
                            <span className="font-medium text-green-900">{product.specifications.capsules}</span>
                          </div>
                        )}
                        {product.specifications.shelfLife && (
                          <div className="flex justify-between">
                            <span className="text-green-700">Shelf life:</span>
                            <span className="font-medium text-green-900">{product.specifications.shelfLife}</span>
                          </div>
                        )}
                        {product.specifications.storage && (
                          <div className="flex justify-between">
                            <span className="text-green-700">Storage:</span>
                            <span className="font-medium text-green-900">{product.specifications.storage}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'ingredients' && (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Active Ingredients</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {product.ingredients.map((ingredient, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{ingredient}</span>
                      </div>
                    </div>
                  ))}
                </div>
                
                {product.allergens.length > 0 && (
                  <div className="mt-8">
                    <h4 className="font-semibold text-gray-900 mb-2">Important Information</h4>
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      {product.allergens.map((allergen, index) => (
                        <p key={index} className="text-yellow-800">{allergen}</p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'usage' && (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Usage Instructions</h3>
                <div className="bg-blue-50 p-6 rounded-lg">
                  <p className="text-gray-700 text-lg">{product.usage}</p>
                </div>
                <div className="mt-6 bg-yellow-50 p-4 rounded-lg">
                  <p className="text-yellow-800 font-medium">
                    ⚠️ Consult your healthcare provider before starting any new supplement regimen.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'target' && product.targetAudience && (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Who Should Use This Product</h3>
                <div className="bg-purple-50 p-6 rounded-lg">
                  <p className="text-purple-900 font-medium mb-4">This product is suitable for individuals who:</p>
                  <ul className="space-y-3">
                    {product.targetAudience.map((audience, index) => (
                      <li key={index} className="flex items-start space-x-3">
                        <Users className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                        <span className="text-purple-800">{audience}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-900">Customer Reviews</h3>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.floor(product.rating)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-gray-600">{product.rating} out of 5</span>
                  </div>
                </div>
                <p className="text-gray-600">Reviews coming soon...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;