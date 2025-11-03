import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { useApp } from '../context/AppContext';
import { convertPrice, formatPrice } from '../utils/currency';
import { getTranslation } from '../utils/translations';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { dispatch } = useCart();
  const { state: appState } = useApp();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch({
      type: 'ADD_ITEM',
      payload: { product, quantity: 1 }
    });
  };

  const convertedPrice = convertPrice(product.price, 'USD', appState.currency);
  const convertedOriginalPrice = product.originalPrice 
    ? convertPrice(product.originalPrice, 'USD', appState.currency)
    : null;

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
      <Link to={`/product/${product.id}`}>
        <div className="relative overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {convertedOriginalPrice && (
            <div className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-semibold">
              Save {formatPrice(convertedOriginalPrice - convertedPrice, appState.currency)}
            </div>
          )}
          {!product.inStock && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="text-white font-semibold text-lg">
                {getTranslation('outOfStock', appState.language)}
              </span>
            </div>
          )}
        </div>
      </Link>

      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-primary-600 font-medium">{product.brand}</span>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm text-gray-600">{product.rating}</span>
          </div>
        </div>

        <Link to={`/product/${product.id}`}>
          <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-primary-600 transition-colors">
            {product.name}
          </h3>
        </Link>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2 font-serif font-light">
          {product.description}
        </p>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-gray-900">
              {formatPrice(convertedPrice, appState.currency)}
            </span>
            {convertedOriginalPrice && (
              <span className="text-lg text-gray-500 line-through">
                {formatPrice(convertedOriginalPrice, appState.currency)}
              </span>
            )}
          </div>
          <span className="text-sm text-gray-500">{product.sales} sold</span>
        </div>

        <button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className={`w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-semibold transition-colors ${
            product.inStock
              ? 'bg-primary-600 text-white hover:bg-primary-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          <ShoppingCart className="h-5 w-5" />
          <span>
            {product.inStock 
              ? getTranslation('addToCart', appState.language)
              : getTranslation('outOfStock', appState.language)
            }
          </span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;