import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { getTranslation } from '../utils/translations';

const Contact: React.FC = () => {
  const { state: appState } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // 模拟表单提交
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    setIsSubmitting(false);
    setFormData({ name: '', email: '', subject: '', message: '' });
    
    // 3秒后重置提交状态
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 text-white">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/images/9a39688615c0f49d4d7c540e28982718.jpg)'
          }}
        />
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="relative z-10">
          <h1 className="text-5xl font-bold mb-6">
            {getTranslation('contactTitle', appState.language)}
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            {getTranslation('contactDesc', appState.language)}
          </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {appState.language === 'EN' ? 'Get in Touch' : '联系我们'}
              </h2>
              <p className="text-gray-600 mb-8">
                {appState.language === 'EN' 
                  ? 'Our customer support team is available to assist you with any questions or concerns.'
                  : '我们的客户支持团队随时为您解答任何问题或疑虑。'
                }
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Mail className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {appState.language === 'EN' ? 'Email' : '邮箱'}
                  </h3>
                  <p className="text-gray-600">support@harborwell.com</p>
                  <p className="text-gray-600">info@harborwell.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <MapPin className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {appState.language === 'EN' ? 'Address' : '地址'}
                  </h3>
                  <p className="text-gray-600">
                    Foraise INC<br />
                    302 S David St Ste 210<br />
                    Casper, WY 82601<br />
                    {appState.language === 'EN' ? 'United States' : '美国'}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-orange-100 p-3 rounded-lg">
                  <Clock className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {appState.language === 'EN' ? 'Business Hours' : '营业时间'}
                  </h3>
                  <p className="text-gray-600">
                    {appState.language === 'EN' 
                      ? 'Monday - Friday: 9:00 AM - 6:00 PM MST'
                      : '周一至周五：上午9:00 - 下午6:00 MST'
                    }<br />
                    {appState.language === 'EN' 
                      ? 'Saturday: 10:00 AM - 4:00 PM MST'
                      : '周六：上午10:00 - 下午4:00 MST'
                    }<br />
                    {appState.language === 'EN' ? 'Sunday: Closed' : '周日：休息'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {appState.language === 'EN' ? 'Send us a Message' : '发送消息'}
              </h2>
              
              {isSubmitted ? (
                <div className="text-center py-8">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {appState.language === 'EN' ? 'Message Sent!' : '消息已发送！'}
                  </h3>
                  <p className="text-gray-600">
                    {appState.language === 'EN' 
                      ? 'Thank you for your message! We\'ll get back to you soon.'
                      : '感谢您的消息！我们会尽快回复您。'
                    }
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                        {appState.language === 'EN' ? 'Full Name *' : '姓名 *'}
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder={appState.language === 'EN' ? 'Your full name' : '您的姓名'}
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                        {appState.language === 'EN' ? 'Email Address *' : '邮箱地址 *'}
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      {appState.language === 'EN' ? 'Subject *' : '主题 *'}
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">
                        {appState.language === 'EN' ? 'Select a subject' : '选择主题'}
                      </option>
                      <option value="product-inquiry">
                        {appState.language === 'EN' ? 'Product Inquiry' : '产品咨询'}
                      </option>
                      <option value="order-support">
                        {appState.language === 'EN' ? 'Order Support' : '订单支持'}
                      </option>
                      <option value="technical-support">
                        {appState.language === 'EN' ? 'Technical Support' : '技术支持'}
                      </option>
                      <option value="partnership">
                        {appState.language === 'EN' ? 'Partnership Opportunities' : '合作机会'}
                      </option>
                      <option value="media-inquiry">
                        {appState.language === 'EN' ? 'Media Inquiry' : '媒体咨询'}
                      </option>
                      <option value="other">
                        {appState.language === 'EN' ? 'Other' : '其他'}
                      </option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      {appState.language === 'EN' ? 'Message *' : '消息 *'}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder={appState.language === 'EN' 
                        ? 'Please provide details about your inquiry...'
                        : '请提供您咨询的详细信息...'
                      }
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="h-5 w-5" />
                    <span>
                      {isSubmitting 
                        ? (appState.language === 'EN' ? 'Sending...' : '发送中...')
                        : (appState.language === 'EN' ? 'Send Message' : '发送消息')
                      }
                    </span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {appState.language === 'EN' ? 'Frequently Asked Questions' : '常见问题'}
            </h2>
            <p className="text-xl text-gray-600">
              {appState.language === 'EN' ? 'Quick answers to common questions' : '常见问题的快速解答'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {appState.language === 'EN' ? 'How long does shipping take?' : '运输需要多长时间？'}
              </h3>
              <p className="text-gray-600">
                {appState.language === 'EN' 
                  ? 'Standard shipping typically takes 3-5 business days within the US. Express shipping options are available for faster delivery.'
                  : '美国境内标准运输通常需要3-5个工作日。我们提供快递选项以实现更快的配送。'
                }
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {appState.language === 'EN' ? 'What is your return policy?' : '您的退货政策是什么？'}
              </h3>
              <p className="text-gray-600">
                {appState.language === 'EN' 
                  ? 'We offer a 30-day money-back guarantee on all products. If you\'re not satisfied, contact us for a full refund.'
                  : '我们对所有产品提供30天退款保证。如果您不满意，请联系我们获得全额退款。'
                }
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {appState.language === 'EN' ? 'Are your products third-party tested?' : '您的产品是否经过第三方检测？'}
              </h3>
              <p className="text-gray-600">
                {appState.language === 'EN' 
                  ? 'Yes, all our products undergo rigorous third-party testing for purity, potency, and safety before reaching customers.'
                  : '是的，我们所有产品在到达客户手中之前都经过严格的第三方纯度、效力和安全性检测。'
                }
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {appState.language === 'EN' ? 'Do you offer international shipping?' : '您提供国际运输吗？'}
              </h3>
              <p className="text-gray-600">
                {appState.language === 'EN' 
                  ? 'Currently, we ship within the United States. International shipping options are coming soon.'
                  : '目前我们在美国境内发货。国际运输选项即将推出。'
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;