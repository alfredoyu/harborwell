import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Lock, Truck, ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useOrder } from '../context/OrderContext';
import { useApp } from '../context/AppContext';
import { convertPrice, formatPrice } from '../utils/currency';
import { createPaymentIntent, confirmPayment } from '../services/stripe';
import { ShippingAddress, Order } from '../types';

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const { state: cartState, dispatch: cartDispatch } = useCart();
  const { dispatch: orderDispatch } = useOrder();
  const { state: appState } = useApp();
  
  const [step, setStep] = useState<'shipping' | 'payment' | 'processing' | 'success'>('shipping');
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US'
  });
  
  const [paymentMethod, setPaymentMethod] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  // Calculate totals
  const subtotal = cartState.items.reduce((sum, item) => {
    const convertedPrice = convertPrice(item.product.price, 'USD', appState.currency);
    return sum + (convertedPrice * item.quantity);
  }, 0);
  
  const shipping = subtotal > 50 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  // Redirect if cart is empty
  useEffect(() => {
    if (cartState.items.length === 0) {
      navigate('/cart');
    }
  }, [cartState.items, navigate]);

  const validateShipping = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!shippingAddress.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!shippingAddress.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!shippingAddress.email.trim()) newErrors.email = 'Email is required';
    if (!shippingAddress.phone.trim()) newErrors.phone = 'Phone is required';
    if (!shippingAddress.address.trim()) newErrors.address = 'Address is required';
    if (!shippingAddress.city.trim()) newErrors.city = 'City is required';
    if (!shippingAddress.state.trim()) newErrors.state = 'State is required';
    if (!shippingAddress.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (shippingAddress.email && !emailRegex.test(shippingAddress.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validatePayment = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!paymentMethod.cardNumber.trim()) newErrors.cardNumber = 'Card number is required';
    if (!paymentMethod.expiryDate.trim()) newErrors.expiryDate = 'Expiry date is required';
    if (!paymentMethod.cvv.trim()) newErrors.cvv = 'CVV is required';
    if (!paymentMethod.nameOnCard.trim()) newErrors.nameOnCard = 'Name on card is required';
    
    // Basic card number validation (simplified)
    const cardNumber = paymentMethod.cardNumber.replace(/\s/g, '');
    if (cardNumber && (cardNumber.length < 13 || cardNumber.length > 19)) {
      newErrors.cardNumber = 'Please enter a valid card number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateShipping()) {
      orderDispatch({ type: 'SET_SHIPPING_ADDRESS', payload: shippingAddress });
      setStep('payment');
    }
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePayment()) return;
    
    setIsProcessing(true);
    setPaymentError(null);
    setStep('processing');
    
    try {
      // Create payment intent
      const paymentIntent = await createPaymentIntent(total, appState.currency.toLowerCase());
      
      // Confirm payment
      const result = await confirmPayment(paymentIntent.clientSecret, paymentMethod);
      
      if (result.error) {
        setPaymentError(result.error.message || 'Payment failed');
        setStep('payment');
      } else {
        // Create order
        const order: Order = {
          id: `order_${Date.now()}`,
          items: cartState.items,
          shippingAddress,
          subtotal,
          tax,
          shipping,
          total,
          status: 'processing',
          paymentStatus: 'paid',
          createdAt: new Date().toISOString()
        };
        
        orderDispatch({ type: 'CREATE_ORDER', payload: order });
        cartDispatch({ type: 'CLEAR_CART' });
        setStep('success');
      }
    } catch (error) {
      setPaymentError('An unexpected error occurred. Please try again.');
      setStep('payment');
    } finally {
      setIsProcessing(false);
    }
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  if (step === 'success') {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 rounded-xl shadow-lg text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Order Confirmed!</h1>
            <p className="text-xl text-gray-600 mb-8">
              Thank you for your purchase. Your order has been successfully placed and you'll receive a confirmation email shortly.
            </p>
            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <h3 className="font-semibold text-gray-900 mb-2">Order Total</h3>
              <p className="text-2xl font-bold text-green-600">{formatPrice(total, appState.currency)}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/orders')}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                View Order Status
              </button>
              <button
                onClick={() => navigate('/products')}
                className="bg-gray-200 text-gray-800 px-8 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'processing') {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 rounded-xl shadow-lg text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-6"></div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Processing Your Payment</h1>
            <p className="text-gray-600">Please wait while we process your payment. Do not refresh this page.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/cart')}
            className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors mb-4"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Cart</span>
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-8">
            <div className={`flex items-center space-x-2 ${step === 'shipping' ? 'text-blue-600' : step === 'payment' || step === 'processing' || step === 'success' ? 'text-green-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'shipping' ? 'bg-blue-600 text-white' : step === 'payment' || step === 'processing' || step === 'success' ? 'bg-green-600 text-white' : 'bg-gray-300'}`}>
                1
              </div>
              <span className="font-medium">Shipping</span>
            </div>
            <div className={`w-16 h-1 ${step === 'payment' || step === 'processing' || step === 'success' ? 'bg-green-600' : 'bg-gray-300'}`}></div>
            <div className={`flex items-center space-x-2 ${step === 'payment' ? 'text-blue-600' : step === 'processing' || step === 'success' ? 'text-green-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'payment' ? 'bg-blue-600 text-white' : step === 'processing' || step === 'success' ? 'bg-green-600 text-white' : 'bg-gray-300'}`}>
                2
              </div>
              <span className="font-medium">Payment</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {step === 'shipping' && (
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <div className="flex items-center space-x-2 mb-6">
                  <Truck className="h-6 w-6 text-blue-600" />
                  <h2 className="text-2xl font-bold text-gray-900">Shipping Information</h2>
                </div>
                
                <form onSubmit={handleShippingSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        value={shippingAddress.firstName}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, firstName: e.target.value })}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="John"
                      />
                      {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        value={shippingAddress.lastName}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, lastName: e.target.value })}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="Doe"
                      />
                      {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={shippingAddress.email}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, email: e.target.value })}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="john@example.com"
                      />
                      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        value={shippingAddress.phone}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="(555) 123-4567"
                      />
                      {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address *
                    </label>
                    <input
                      type="text"
                      value={shippingAddress.address}
                      onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="123 Main Street"
                    />
                    {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        value={shippingAddress.city}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.city ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="San Francisco"
                      />
                      {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        State *
                      </label>
                      <select
                        value={shippingAddress.state}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, state: e.target.value })}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.state ? 'border-red-500' : 'border-gray-300'}`}
                      >
                        <option value="">Select State</option>
                        <option value="CA">California</option>
                        <option value="NY">New York</option>
                        <option value="TX">Texas</option>
                        <option value="FL">Florida</option>
                        {/* Add more states as needed */}
                      </select>
                      {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        ZIP Code *
                      </label>
                      <input
                        type="text"
                        value={shippingAddress.zipCode}
                        onChange={(e) => setShippingAddress({ ...shippingAddress, zipCode: e.target.value })}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.zipCode ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="94105"
                      />
                      {errors.zipCode && <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Continue to Payment
                  </button>
                </form>
              </div>
            )}

            {step === 'payment' && (
              <div className="bg-white p-8 rounded-xl shadow-lg">
                <div className="flex items-center space-x-2 mb-6">
                  <CreditCard className="h-6 w-6 text-blue-600" />
                  <h2 className="text-2xl font-bold text-gray-900">Payment Information</h2>
                </div>

                {paymentError && (
                  <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2">
                    <AlertCircle className="h-5 w-5 text-red-500" />
                    <span className="text-red-700">{paymentError}</span>
                  </div>
                )}
                
                <form onSubmit={handlePaymentSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Card Number *
                    </label>
                    <input
                      type="text"
                      value={paymentMethod.cardNumber}
                      onChange={(e) => setPaymentMethod({ ...paymentMethod, cardNumber: formatCardNumber(e.target.value) })}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.cardNumber ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                    />
                    {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Expiry Date *
                      </label>
                      <input
                        type="text"
                        value={paymentMethod.expiryDate}
                        onChange={(e) => setPaymentMethod({ ...paymentMethod, expiryDate: formatExpiryDate(e.target.value) })}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.expiryDate ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="MM/YY"
                        maxLength={5}
                      />
                      {errors.expiryDate && <p className="text-red-500 text-sm mt-1">{errors.expiryDate}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CVV *
                      </label>
                      <input
                        type="text"
                        value={paymentMethod.cvv}
                        onChange={(e) => setPaymentMethod({ ...paymentMethod, cvv: e.target.value.replace(/\D/g, '') })}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.cvv ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="123"
                        maxLength={4}
                      />
                      {errors.cvv && <p className="text-red-500 text-sm mt-1">{errors.cvv}</p>}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Name on Card *
                      </label>
                      <input
                        type="text"
                        value={paymentMethod.nameOnCard}
                        onChange={(e) => setPaymentMethod({ ...paymentMethod, nameOnCard: e.target.value })}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${errors.nameOnCard ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder="John Doe"
                      />
                      {errors.nameOnCard && <p className="text-red-500 text-sm mt-1">{errors.nameOnCard}</p>}
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg flex items-center space-x-2">
                    <Lock className="h-5 w-5 text-blue-600" />
                    <span className="text-blue-800 text-sm">
                      Your payment information is encrypted and secure
                    </span>
                  </div>

                  <div className="flex space-x-4">
                    <button
                      type="button"
                      onClick={() => setStep('shipping')}
                      className="flex-1 bg-gray-200 text-gray-800 py-4 px-6 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                    >
                      Back to Shipping
                    </button>
                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="flex-1 bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isProcessing ? 'Processing...' : `Pay ${formatPrice(total, appState.currency)}`}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-lg sticky top-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h3>
              
              <div className="space-y-4 mb-6">
                {cartState.items.map((item) => {
                  const convertedPrice = convertPrice(item.product.price, 'USD', appState.currency);
                  return (
                    <div key={item.product.id} className="flex items-center space-x-3">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 text-sm">{item.product.name}</h4>
                        <p className="text-gray-600 text-sm">Qty: {item.quantity}</p>
                      </div>
                      <span className="font-semibold text-gray-900">
                        {formatPrice(convertedPrice * item.quantity, appState.currency)}
                      </span>
                    </div>
                  );
                })}
              </div>
              
              <div className="space-y-3 border-t pt-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">{formatPrice(subtotal, appState.currency)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-semibold">
                    {shipping === 0 ? 'Free' : formatPrice(shipping, appState.currency)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-semibold">{formatPrice(tax, appState.currency)}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>{formatPrice(total, appState.currency)}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 text-center text-sm text-gray-600">
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

export default Checkout;