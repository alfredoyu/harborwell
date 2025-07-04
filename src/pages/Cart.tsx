import React from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Cart: React.FC = () => {
  const { state, dispatch } = useCart();

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
            <p className="text-xl text-gray-600 mb-8">
              Discover our science-backed supplements to start your wellness journey.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center space-x-2 bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              <span>Shop Products</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            to="/products"
            className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Continue Shopping</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
              <button
                onClick={clearCart}
                className="text-red-600 hover:text-red-700 transition-colors"
              >
                Clear Cart
              </button>
            </div>

            <div className="space-y-4">
              {state.items.map((item) => (
                <div key={item.product.id} className="bg-white p-6 rounded-xl shadow-lg">
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">{item.product.name}</h3>
                      <p className="text-gray-600">{item.product.brand}</p>
                      <p className="text-xl font-bold text-gray-900">${item.product.price}</p>
                    </div>

                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="p-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="text-lg font-semibold w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="p-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="text-right">
                      <p className="text-xl font-bold text-gray-900">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </p>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="mt-2 text-red-600 hover:text-red-700 transition-colors"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-lg sticky top-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">${state.total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-semibold">${(state.total * 0.08).toFixed(2)}</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>${(state.total * 1.08).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors mb-4">
                Proceed to Checkout
              </button>

              <div className="text-center text-sm text-gray-600">
                <p>Free shipping on orders over $50</p>
                <p>30-day money-back guarantee</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;