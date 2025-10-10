import React, { useState, useEffect, useRef } from 'react';
import { Check, Star, ArrowRight, MessageCircle } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import PackageSelectionModal from './PackageSelectionModal';

// Default packages data as fallback
const defaultPackages = [
  {
    id: 1,
    name: 'Starter',
    price: '$2,999',
    description: 'Perfect for small businesses and startups',
    features: [
      'Responsive Website Design',
      'Up to 5 Pages',
      'Basic SEO Optimization',
      'Contact Form Integration',
      'Mobile-First Approach',
      '3 Months Support'
    ],
    featured: false,
    popular: false
  },
  {
    id: 2,
    name: 'Professional',
    price: '$5,999',
    description: 'Ideal for growing companies',
    features: [
      'Custom Website Design',
      'Up to 10 Pages',
      'Advanced SEO Package',
      'CMS Integration',
      'E-commerce Ready',
      'Analytics Setup',
      'Social Media Integration',
      '6 Months Support'
    ],
    featured: true,
    popular: true
  },
  {
    id: 3,
    name: 'Enterprise',
    price: '$12,999',
    description: 'For large organizations with complex needs',
    features: [
      'Unlimited Pages',
      'Complex Functionality',
      'API Integrations',
      'Advanced Analytics',
      'Multi-language Support',
      'Performance Optimization',
      'Security Hardening',
      'Priority Support',
      '12 Months Support'
    ],
    featured: false,
    popular: false
  }
];

const ChoosePackage = ({ data, mousePosition }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredPackage, setHoveredPackage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const sectionRef = useRef(null);

  // Use provided data or fallback to default packages
  const packagesData = data && data.length > 0 ? data : defaultPackages;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleChoosePackage = (packageData) => {
    console.log('Package selected:', packageData);
    setSelectedPackage(packageData);
    setIsModalOpen(true);
  };

  // Handle modal close
  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedPackage(null);
  };



  return (
    <section id="packages" ref={sectionRef} className="py-24 bg-gradient-to-br from-teal-50/30 via-white to-cyan-50/30 relative overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="absolute w-40 h-40 bg-gradient-to-br from-teal-200/10 to-cyan-200/10 rounded-full blur-3xl"
            style={{
              left: `${15 + (i * 25)}%`,
              top: `${5 + (i * 20)}%`,
              animation: `float ${5 + i * 0.3}s ease-in-out infinite`
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-4xl md:text-5xl font-bold text-teal-900 mb-6">
            Choose Your Package
          </h2>
          <p className="text-xl text-teal-700 max-w-3xl mx-auto leading-relaxed">
            Select the perfect package that fits your needs and budget. All packages include our premium support.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full mx-auto mt-6"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {packagesData.map((pkg, index) => (
            <div
              key={pkg.id}
              className={`group relative transition-all duration-500 transform hover:-translate-y-4 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              } ${pkg.featured ? 'scale-105' : ''}`}
              style={{ 
                transitionDelay: `${index * 200}ms`
              }}
              onMouseEnter={() => setHoveredPackage(pkg.id)}
              onMouseLeave={() => setHoveredPackage(null)}
            >
              <Card 
                className={`h-full relative overflow-hidden cursor-pointer ${
                  pkg.featured ? 'ring-2 ring-teal-500' : ''
                }`}
                style={{
                  background: 'linear-gradient(145deg, #f8f9fa, #e9ecef)',
                  boxShadow: hoveredPackage === pkg.id 
                    ? '20px 20px 40px #d1d5db, -20px -20px 40px #ffffff' 
                    : pkg.featured 
                      ? '15px 15px 30px #d1d5db, -15px -15px 30px #ffffff'
                      : '10px 10px 20px #d1d5db, -10px -10px 20px #ffffff',
                  borderRadius: '20px'
                }}
              >
                {/* Popular Badge */}
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <Badge className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-4 py-1 shadow-lg">
                      <Star className="w-3 h-3 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}

                {/* Decorative Elements */}
                <div className={`absolute top-6 right-6 w-12 h-12 bg-teal-100/30 rounded-full transition-opacity duration-300 ${
                  hoveredPackage === pkg.id ? 'opacity-100' : 'opacity-50'
                }`}></div>

                <CardContent className="p-8 text-center h-full flex flex-col">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-teal-900 mb-2">{pkg.name}</h3>
                    <p className="text-teal-700 mb-4">{pkg.description}</p>
                    <div className="text-4xl font-bold text-teal-900 mb-2">{pkg.price}</div>
                    <p className="text-sm text-gray-600">One-time payment</p>
                  </div>
                  
                  <div className="flex-1 mb-8">
                    <ul className="space-y-3 text-left">
                      {pkg.features.map((feature, featureIndex) => (
                        <li 
                          key={featureIndex} 
                          className="flex items-start transition-transform duration-200 hover:translate-x-1"
                        >
                          <Check className="w-5 h-5 text-teal-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <Button
                    onClick={() => handleChoosePackage(pkg)}
                    className={`w-full py-3 rounded-xl font-medium transform hover:scale-105 transition-all duration-300 ${
                      pkg.featured
                        ? 'bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white shadow-lg'
                        : 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg shadow-green-500/20'
                    }`}
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Get {pkg.name}
                  </Button>

                  {/* Info Text */}
                  <div className="text-center text-xs text-gray-600 mt-3">
                    <p>Click to provide your details and continue to WhatsApp</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className={`text-center mt-16 transition-all duration-1000 delay-800 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-teal-900 mb-4">
              Need a Custom Solution?
            </h3>
            <p className="text-gray-600 mb-6">
              Every business is unique. Let's discuss your specific requirements and create a tailored package just for you.
            </p>
            <Button 
              onClick={() => handleChoosePackage('Custom')}
              className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300"
            >
              Get Custom Quote
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>

      {/* Package Selection Modal */}
      <PackageSelectionModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        packageData={selectedPackage}
      />
    </section>
  );
};

export default ChoosePackage;
