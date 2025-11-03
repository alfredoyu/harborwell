import React from 'react';
import { Award, Users, Microscope, Shield, CheckCircle, Globe } from 'lucide-react';

const About: React.FC = () => {
  const teamMembers = [
    {
      name: "Dr. Sarah Chen",
      role: "Chief Scientific Officer",
      credentials: "PhD in Biochemistry, Harvard",
      image: "https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      name: "Dr. Michael Rodriguez",
      role: "Head of Research",
      credentials: "PhD in Nutrition Science, Stanford",
      image: "https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      name: "Dr. Emily Johnson",
      role: "Clinical Research Director",
      credentials: "MD, Johns Hopkins",
      image: "https://images.pexels.com/photos/5327921/pexels-photo-5327921.jpeg?auto=compress&cs=tinysrgb&w=400"
    }
  ];

  const certifications = [
    { name: "FDA Registered", description: "Facility #12345678" },
    { name: "GMP Certified", description: "Good Manufacturing Practices" },
    { name: "NSF International", description: "Third-party testing" },
    { name: "ISO 9001:2015", description: "Quality management systems" },
    { name: "HACCP Certified", description: "Food safety management" },
    { name: "Organic Certified", description: "USDA Organic standards" }
  ];

  const patents = [
    "US Patent #10,123,456 - Advanced Probiotic Delivery System",
    "US Patent #10,234,567 - Bioavailability Enhancement Technology",
    "US Patent #10,345,678 - Targeted Nutrient Release Mechanism",
    "US Patent #10,456,789 - Microencapsulation Process"
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-primary-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">About HARBORWELL</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-serif font-light">
              Designed for women, inspired by science — HARBORWELL empowers vitality and timeless beauty.
            </p>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-6 text-lg text-gray-700 font-serif font-light">
                <p>
                  Founded in 2024, HARBORWELL was born from a simple yet powerful vision — to empower women through the harmony of science and wellness. Our story began when a team of biochemists and nutrition experts set out to create supplements that truly support women's vitality, balance, and beauty from within.
                </p>
                <p>
                  Through close collaboration with leading research institutions and an unwavering commitment to scientific validation, we've developed formulas that combine innovation with care. Each product is crafted with clinically backed ingredients and manufactured to the highest quality standards.
                </p>
                <p>
                  Today, HARBORWELL stands as a trusted wellness brand for women worldwide — helping every woman feel energized, confident, and radiant in her own rhythm.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-primary-500 p-8 rounded-xl text-white text-center">
                <Globe className="h-12 w-12 mx-auto mb-4" />
                <h3 className="text-3xl font-bold mb-2">Growing</h3>
                <p className="font-serif font-light">Global Reach</p>
              </div>
              <div className="bg-secondary-500 p-8 rounded-xl text-white text-center">
                <Award className="h-12 w-12 mx-auto mb-4" />
                <h3 className="text-3xl font-bold mb-2">15+</h3>
                <p className="font-serif font-light">Industry Awards</p>
              </div>
              <div className="bg-primary-600 p-8 rounded-xl text-white text-center">
                <Microscope className="h-12 w-12 mx-auto mb-4" />
                <h3 className="text-3xl font-bold mb-2">25+</h3>
                <p className="font-serif font-light">Clinical Studies</p>
              </div>
              <div className="bg-secondary-600 p-8 rounded-xl text-white text-center">
                <Shield className="h-12 w-12 mx-auto mb-4" />
                <h3 className="text-3xl font-bold mb-2">100%</h3>
                <p className="font-serif font-light">Quality Tested</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Laboratory */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <img
                src="https://images.pexels.com/photos/3735747/pexels-photo-3735747.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="HARBORWELL Laboratory"
                className="rounded-xl shadow-lg"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">State-of-the-Art Laboratory</h2>
              <div className="space-y-6 text-lg text-gray-700 font-serif font-light">
                <p>
                  Our 50,000 square foot research and manufacturing facility represents the pinnacle 
                  of supplement production technology. Located in Casper, Wyoming, our FDA-registered 
                  facility operates under strict GMP guidelines to ensure every product meets our 
                  exacting standards.
                </p>
                <p>
                  Equipped with advanced analytical instruments and staffed by experienced scientists, 
                  our laboratory conducts comprehensive testing at every stage of production. From 
                  raw material verification to final product analysis, we maintain complete quality 
                  control throughout the manufacturing process.
                </p>
              </div>
              
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-primary-600" />
                  <span className="text-gray-700 font-serif font-light">HPLC Analysis</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-primary-600" />
                  <span className="text-gray-700 font-serif font-light">Microbial Testing</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-primary-600" />
                  <span className="text-gray-700 font-serif font-light">Heavy Metal Screening</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-primary-600" />
                  <span className="text-gray-700 font-serif font-light">Potency Verification</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;