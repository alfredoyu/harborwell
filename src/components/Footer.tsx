import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">H</span>
              </div>
              <span className="text-2xl font-bold">HarborWell</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Pioneering science-backed health supplements for optimal wellness and vitality. 
              Your journey to better health starts here.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Information</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-400" />
                <span className="text-gray-300">support@harborwell.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-400" />
                <span className="text-gray-300">1-800-HARBOR-1</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-blue-400" />
                <span className="text-gray-300">
                  302 S David St Ste 210<br />
                  Casper, WY 82601
                </span>
              </div>
            </div>
          </div>

          {/* Policies */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Policies</h3>
            <div className="space-y-2">
              <Link to="/refund-policy" className="block text-gray-300 hover:text-white transition-colors">
                Refund Policy
              </Link>
              <Link to="/shipping-policy" className="block text-gray-300 hover:text-white transition-colors">
                Shipping Policy
              </Link>
              <Link to="/privacy-policy" className="block text-gray-300 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms-of-service" className="block text-gray-300 hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>

          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Company</h3>
            <div className="space-y-2 text-sm text-gray-300">
              <p><strong>Brand Owner:</strong> HarborWell</p>
              <p><strong>Company:</strong> Foraise INC</p>
              <p><strong>Product Origin:</strong> USA</p>
              <p><strong>Website Operator:</strong> HarborWell Digital</p>
              <p><strong>Payment Processor:</strong> Stripe Inc.</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 HarborWell. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <span className="text-gray-400 text-sm">FDA Registered</span>
              <span className="text-gray-400 text-sm">•</span>
              <span className="text-gray-400 text-sm">GMP Certified</span>
              <span className="text-gray-400 text-sm">•</span>
              <span className="text-gray-400 text-sm">Third-Party Tested</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;