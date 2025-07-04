import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, Grid, List } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import { useApp } from '../context/AppContext';
import { getTranslation } from '../utils/translations';

const Products: React.FC = () => {
  const [searchParams] = useSearchParams();
  const { state: appState } = useApp();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filters, setFilters] = useState({
    inStock: false,
    priceRange: [0, 100],
    category: 'all'
  });

  const searchQuery = searchParams.get('search') || '';

  const categories = ['all', 'Weight Management', 'Beauty & Anti-Aging'];

  const filteredProducts = products.filter(product => {
    // Search filter
    if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !product.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !product.category.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Stock filter
    if (filters.inStock && !product.inStock) return false;
    
    // Price filter
    if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) return false;
    
    // Category filter
    if (filters.category !== 'all' && product.category !== filters.category) return false;
    
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {getTranslation('allProducts', appState.language)}
          </h1>
          <p className="text-xl text-gray-600">
            {appState.language === 'EN' 
              ? 'Discover our complete range of science-backed supplements'
              : '探索我们完整的科学验证补充剂系列'
            }
          </p>
          {searchQuery && (
            <p className="text-lg text-blue-600 mt-2">
              {appState.language === 'EN' 
                ? `Search results for: "${searchQuery}"`
                : `搜索结果："${searchQuery}"`
              }
            </p>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-64 space-y-6">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Filter className="h-5 w-5 mr-2" />
                {appState.language === 'EN' ? 'Filters' : '筛选'}
              </h3>

              {/* Stock Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">
                  {appState.language === 'EN' ? 'Availability' : '库存状态'}
                </h4>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.inStock}
                    onChange={(e) => setFilters({ ...filters, inStock: e.target.checked })}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="ml-2 text-gray-700">
                    {appState.language === 'EN' ? 'In Stock Only' : '仅显示有库存'}
                  </span>
                </label>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">
                  {appState.language === 'EN' ? 'Price Range' : '价格范围'}
                </h4>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={filters.priceRange[1]}
                    onChange={(e) => setFilters({ 
                      ...filters, 
                      priceRange: [filters.priceRange[0], parseInt(e.target.value)] 
                    })}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>${filters.priceRange[0]}</span>
                    <span>${filters.priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">
                  {appState.language === 'EN' ? 'Category' : '分类'}
                </h4>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label key={category} className="flex items-center">
                      <input
                        type="radio"
                        name="category"
                        value={category}
                        checked={filters.category === category}
                        onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                        className="border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-gray-700 capitalize">
                        {category === 'all' 
                          ? (appState.language === 'EN' ? 'All Categories' : '所有分类')
                          : (appState.language === 'EN' ? category : 
                             category === 'Weight Management' ? '体重管理' : '美容抗衰')
                        }
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* View Controls */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">
                {appState.language === 'EN' 
                  ? `Showing ${filteredProducts.length} of ${products.length} products`
                  : `显示 ${filteredProducts.length} / ${products.length} 个产品`
                }
              </p>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600'}`}
                >
                  <Grid className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600'}`}
                >
                  <List className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Products */}
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' 
                : 'grid-cols-1'
            }`}>
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  {appState.language === 'EN' 
                    ? 'No products match your current filters.'
                    : '没有产品符合当前筛选条件。'
                  }
                </p>
                <button
                  onClick={() => setFilters({ inStock: false, priceRange: [0, 100], category: 'all' })}
                  className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
                >
                  {appState.language === 'EN' ? 'Clear all filters' : '清除所有筛选'}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;