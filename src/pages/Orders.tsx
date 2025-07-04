import React from 'react';
import { Link } from 'react-router-dom';
import { Package, Truck, CheckCircle, Clock, ArrowLeft } from 'lucide-react';
import { useOrder } from '../context/OrderContext';
import { useApp } from '../context/AppContext';
import { formatPrice } from '../utils/currency';

const Orders: React.FC = () => {
  const { state: orderState } = useOrder();
  const { state: appState } = useApp();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'processing':
        return <Package className="h-5 w-5 text-blue-500" />;
      case 'shipped':
        return <Truck className="h-5 w-5 text-purple-500" />;
      case 'delivered':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'processing':
        return 'text-blue-600 bg-blue-100';
      case 'shipped':
        return 'text-purple-600 bg-purple-100';
      case 'delivered':
        return 'text-green-600 bg-green-100';
      case 'cancelled':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  if (orderState.orders.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Package className="h-24 w-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">No Orders Yet</h2>
            <p className="text-xl text-gray-600 mb-8">
              You haven't placed any orders yet. Start shopping to see your orders here.
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
            to="/"
            className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors mb-4"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Home</span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Your Orders</h1>
          <p className="text-gray-600 mt-2">Track and manage your orders</p>
        </div>

        <div className="space-y-6">
          {orderState.orders.map((order) => (
            <div key={order.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
              {/* Order Header */}
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex items-center space-x-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Order #{order.id}</h3>
                      <p className="text-sm text-gray-600">
                        Placed on {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0 flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(order.status)}
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900">
                        {formatPrice(order.total, appState.currency)}
                      </p>
                      <p className="text-sm text-gray-600">
                        {order.paymentStatus === 'paid' ? 'Paid' : 'Payment Pending'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="p-6">
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div key={item.product.id} className="flex items-center space-x-4">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{item.product.name}</h4>
                        <p className="text-gray-600">{item.product.brand}</p>
                        <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">
                          {formatPrice(item.product.price * item.quantity, appState.currency)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Shipping Address */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-3">Shipping Address</h4>
                  <div className="text-gray-600">
                    <p>{order.shippingAddress.firstName} {order.shippingAddress.lastName}</p>
                    <p>{order.shippingAddress.address}</p>
                    <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</p>
                    <p>{order.shippingAddress.country}</p>
                  </div>
                </div>

                {/* Order Summary */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Order Summary</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Subtotal</span>
                          <span>{formatPrice(order.subtotal, appState.currency)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Shipping</span>
                          <span>{order.shipping === 0 ? 'Free' : formatPrice(order.shipping, appState.currency)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Tax</span>
                          <span>{formatPrice(order.tax, appState.currency)}</span>
                        </div>
                        <div className="flex justify-between font-semibold">
                          <span>Total</span>
                          <span>{formatPrice(order.total, appState.currency)}</span>
                        </div>
                      </div>
                    </div>
                    
                    {order.trackingNumber && (
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">Tracking Information</h4>
                        <p className="text-sm text-gray-600 mb-2">Tracking Number:</p>
                        <p className="font-mono text-sm bg-gray-100 p-2 rounded">{order.trackingNumber}</p>
                        <button className="mt-2 text-blue-600 hover:text-blue-700 text-sm font-medium">
                          Track Package
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 pt-6 border-t border-gray-200 flex flex-col sm:flex-row gap-3">
                  <button className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                    Reorder Items
                  </button>
                  <button className="flex-1 bg-gray-200 text-gray-800 py-3 px-6 rounded-lg font-semibold hover:bg-gray-300 transition-colors">
                    Download Invoice
                  </button>
                  {order.status === 'delivered' && (
                    <button className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors">
                      Leave Review
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;