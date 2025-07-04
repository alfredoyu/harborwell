import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, Globe, DollarSign, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useApp } from '../context/AppContext';
import { getTranslation } from '../utils/translations';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { state: cartState } = useCart();
  const { state: appState, dispatch } = useApp();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (appState.searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(appState.searchQuery)}`);
    }
  };

  const handleLanguageChange = (language: 'EN' | 'ZH') => {
    dispatch({ type: 'SET_LANGUAGE', payload: language });
  };

  const handleCurrencyChange = (currency: 'USD' | 'EUR' | 'GBP' | 'CNY') => {
    dispatch({ type: 'SET_CURRENCY', payload: currency });
  };

  const navigation = [
    { name: getTranslation('home', appState.language), href: '/' },
    { name: getTranslation('allProducts', appState.language), href: '/products' },
    { name: getTranslation('aboutUs', appState.language), href: '/about' },
    { name: getTranslation('contactUs', appState.language), href: '/contact' }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">H</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              HarborWell
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                  isActive(item.href)
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Search and Actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <form onSubmit={handleSearch} className="hidden lg:flex relative">
              <input
                type="text"
                placeholder={getTranslation('searchPlaceholder', appState.language)}
                value={appState.searchQuery}
                onChange={(e) => dispatch({ type: 'SET_SEARCH_QUERY', payload: e.target.value })}
                className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button type="submit" className="absolute left-3 top-2.5">
                <Search className="h-5 w-5 text-gray-400 hover:text-blue-600 transition-colors" />
              </button>
            </form>

            {/* Language Selector */}
            <div className="relative">
              <select
                value={appState.language}
                onChange={(e) => handleLanguageChange(e.target.value as 'EN' | 'ZH')}
                className="appearance-none bg-transparent border border-gray-300 rounded px-3 py-1 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="EN">EN</option>
                <option value="ZH">中文</option>
              </select>
              <Globe className="absolute right-2 top-1.5 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>

            {/* Currency Selector */}
            <div className="relative">
              <select
                value={appState.currency}
                onChange={(e) => handleCurrencyChange(e.target.value as 'USD' | 'EUR' | 'GBP' | 'CNY')}
                className="appearance-none bg-transparent border border-gray-300 rounded px-3 py-1 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option value="CNY">CNY</option>
              </select>
              <DollarSign className="absolute right-2 top-1.5 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>

            {/* Cart */}
            <Link to="/cart" className="relative p-2 text-gray-700 hover:text-blue-600 transition-colors">
              <ShoppingCart className="h-6 w-6" />
              {cartState.items.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartState.items.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-blue-600"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                    isActive(item.href)
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              {/* Mobile Search */}
              <div className="px-3 py-2">
                <form onSubmit={handleSearch} className="relative">
                  <input
                    type="text"
                    placeholder={getTranslation('searchPlaceholder', appState.language)}
                    value={appState.searchQuery}
                    onChange={(e) => dispatch({ type: 'SET_SEARCH_QUERY', payload: e.target.value })}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button type="submit" className="absolute left-3 top-2.5">
                    <Search className="h-5 w-5 text-gray-400" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;