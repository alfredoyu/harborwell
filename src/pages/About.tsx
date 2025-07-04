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
      <section className="bg-gradient-to-br from-blue-50 to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">About HarborWell</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Pioneering the future of health through science-backed nutrition and innovative supplement technology.
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
              <div className="space-y-6 text-lg text-gray-700">
                <p>
                  Founded in 2020, HarborWell emerged from a simple yet powerful vision: to bridge the gap 
                  between cutting-edge nutritional science and accessible health solutions. Our journey began 
                  when our founding team of biochemists and nutrition experts recognized the need for 
                  supplements that truly deliver on their promises.
                </p>
                <p>
                  Through strategic partnerships with leading research institutions and our commitment to 
                  rigorous scientific validation, we've developed a portfolio of products that represent 
                  the pinnacle of nutritional innovation. Every formula is backed by clinical research 
                  and manufactured to the highest quality standards.
                </p>
                <p>
                  Today, HarborWell stands as a trusted name in the health and wellness industry, serving 
                  over 50,000 customers worldwide with products that make a real difference in their lives.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-8 rounded-xl text-white text-center">
                <Globe className="h-12 w-12 mx-auto mb-4" />
                <h3 className="text-3xl font-bold mb-2">50K+</h3>
                <p>Global Customers</p>
              </div>
              <div className="bg-gradient-to-br from-green-500 to-teal-600 p-8 rounded-xl text-white text-center">
                <Award className="h-12 w-12 mx-auto mb-4" />
                <h3 className="text-3xl font-bold mb-2">15+</h3>
                <p>Industry Awards</p>
              </div>
              <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-8 rounded-xl text-white text-center">
                <Microscope className="h-12 w-12 mx-auto mb-4" />
                <h3 className="text-3xl font-bold mb-2">25+</h3>
                <p>Clinical Studies</p>
              </div>
              <div className="bg-gradient-to-br from-orange-500 to-red-600 p-8 rounded-xl text-white text-center">
                <Shield className="h-12 w-12 mx-auto mb-4" />
                <h3 className="text-3xl font-bold mb-2">100%</h3>
                <p>Quality Tested</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Research Team */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Research Team</h2>
            <p className="text-xl text-gray-600">
              World-class scientists dedicated to advancing nutritional health
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg text-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-6 object-cover"
                />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-2">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.credentials}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Laboratory */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <img
                src="https://images.pexels.com/photos/3735747/pexels-photo-3735747.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="HarborWell Laboratory"
                className="rounded-xl shadow-lg"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">State-of-the-Art Laboratory</h2>
              <div className="space-y-6 text-lg text-gray-700">
                <p>
                  Our 50,000 square foot research and manufacturing facility represents the pinnacle 
                  of supplement production technology. Located in San Francisco, our FDA-registered 
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
                  <CheckCircle className="h-6 w-6 text-green-600" />
                  <span className="text-gray-700">HPLC Analysis</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                  <span className="text-gray-700">Microbial Testing</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                  <span className="text-gray-700">Heavy Metal Screening</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                  <span className="text-gray-700">Potency Verification</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Certifications & Standards</h2>
            <p className="text-xl text-gray-600">
              Our commitment to quality is validated by industry-leading certifications
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certifications.map((cert, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{cert.name}</h3>
                <p className="text-gray-600 text-sm">{cert.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Patents */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Patents & Innovation</h2>
            <p className="text-xl text-gray-600">
              Proprietary technologies that set our products apart
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {patents.map((patent, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <Award className="h-6 w-6 text-blue-600 flex-shrink-0" />
                  <span className="text-gray-700">{patent}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Partnership */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">Research Partnerships</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            We collaborate with leading academic institutions and research organizations to advance 
            the science of nutrition and develop breakthrough health solutions.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white bg-opacity-10 p-6 rounded-xl">
              <h3 className="text-lg font-semibold mb-2">Stanford University</h3>
              <p className="text-blue-100">Microbiome Research Initiative</p>
            </div>
            <div className="bg-white bg-opacity-10 p-6 rounded-xl">
              <h3 className="text-lg font-semibold mb-2">Harvard Medical School</h3>
              <p className="text-blue-100">Longevity Studies Program</p>
            </div>
            <div className="bg-white bg-opacity-10 p-6 rounded-xl">
              <h3 className="text-lg font-semibold mb-2">Mayo Clinic</h3>
              <p className="text-blue-100">Clinical Validation Studies</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;