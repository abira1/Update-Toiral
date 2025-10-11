import React, { useState, useEffect, useRef } from 'react';
import { Code, Search, Settings, Layers, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LazyImage from './ui/LazyImage';

const iconMap = {
  Code,
  Search,
  Settings,
  Layers
};

// Generate URL-friendly slug from service title
const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

// Default services data as fallback
const defaultServices = [
  {
    id: 1,
    title: "Web Design & Development",
    description: "Custom websites that tell your brand's unique story with stunning visuals and seamless functionality.",
    icon: "Code",
    features: ["Responsive Design", "Custom Development", "Performance Optimization"]
  },
  {
    id: 2,
    title: "SEO Services",
    description: "Strategic optimization to help your brand reach and connect with your target audience.",
    icon: "Search",
    features: ["Keyword Research", "Technical SEO", "Content Strategy"]
  },
  {
    id: 3,
    title: "Admin Panels",
    description: "Intuitive management systems that put you in control of your digital presence.",
    icon: "Settings",
    features: ["User Management", "Content Management", "Analytics Dashboard"]
  },
  {
    id: 4,
    title: "Full-Stack Solutions",
    description: "End-to-end development from concept to deployment, tailored to your business needs.",
    icon: "Layers",
    features: ["Frontend Development", "Backend Architecture", "Database Design"]
  }
];

const Services = ({ data, mousePosition }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const sectionRef = useRef(null);
  const navigate = useNavigate();

  // Use provided data or fallback to default services
  const servicesData = data && data.length > 0 ? data : defaultServices;

  console.log('Services component - data:', data, 'servicesData:', servicesData);

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

  const handleLearnMore = (service) => {
    // Generate slug from service title or use service ID
    const slug = service.title ? generateSlug(service.title) : `service-${service.id}`;
    console.log('Navigating to service:', service);
    console.log('Generated slug:', slug);
    navigate(`/service/${slug}`, { state: { serviceData: service } });
  };

  return (
    <section id="services" ref={sectionRef} className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 relative overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute w-32 h-32 bg-gradient-to-br from-teal-200/10 to-cyan-200/10 rounded-full blur-2xl"
            style={{
              left: `${20 + (i * 30)}%`,
              top: `${10 + (i * 20)}%`,
              animation: `float ${4 + i * 0.5}s ease-in-out infinite`
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-12 lg:mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-teal-900 mb-4 lg:mb-6">
            Our Services
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-teal-700 max-w-3xl mx-auto leading-relaxed px-4">
            From concept to deployment, we provide comprehensive digital solutions tailored to your unique story.
          </p>
          <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full mx-auto mt-4 lg:mt-6"></div>
        </div>

        {/* Services Grid - Enhanced Responsive Design */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
          {servicesData.map((service, index) => {
            const IconComponent = iconMap[service.icon] || Code;
            console.log('Service:', service, 'Icon:', service.icon, 'IconComponent:', IconComponent);
            return (
              <div
                key={service.id}
                className={`group relative overflow-hidden cursor-pointer transition-all duration-300 transform hover:-translate-y-2 hover:scale-[1.02] ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                } w-full max-w-lg mx-auto lg:max-w-none`}
                style={{
                  transitionDelay: `${index * 200}ms`,
                }}
                onMouseEnter={() => setHoveredCard(service.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => handleLearnMore(service)}
              >
                {/* Enhanced Card Container */}
                <div 
                  className="relative h-full rounded-2xl overflow-hidden border border-gray-200/50"
                  style={{
                    background: 'linear-gradient(145deg, #ffffff, #f8fafc)',
                    boxShadow: hoveredCard === service.id
                      ? '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 10px 10px -5px rgb(0 0 0 / 0.04)'
                      : '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -2px rgb(0 0 0 / 0.05)',
                  }}
                >
                  {/* Service Image Section */}
                  {service.image && (
                    <div className="relative h-48 sm:h-56 overflow-hidden">
                      <img 
                        src={service.image} 
                        alt={service.title}
                        className={`w-full h-full object-cover transition-transform duration-500 ${
                          hoveredCard === service.id ? 'scale-110' : 'scale-100'
                        }`}
                      />
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-900/60"></div>
                      
                      {/* Icon Overlay on Image */}
                      <div
                        className={`absolute bottom-4 left-4 w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center rounded-xl shadow-lg transform transition-all duration-300 ${
                          hoveredCard === service.id ? 'scale-110 rotate-3' : 'scale-100'
                        }`}
                        style={{
                          background: 'linear-gradient(135deg, #14b8a6, #0891b2)',
                          boxShadow: hoveredCard === service.id
                            ? '0 10px 15px -3px rgba(20, 184, 166, 0.5)'
                            : '0 4px 6px -1px rgba(20, 184, 166, 0.3)',
                        }}
                      >
                        <IconComponent className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                      </div>

                      {/* Arrow Indicator on Image */}
                      <div className={`absolute top-4 right-4 transition-all duration-300 ${
                        hoveredCard === service.id ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
                      }`}>
                        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm">
                          <ArrowRight className="w-4 h-4 text-teal-600" />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Gradient Background Effect for cards without images */}
                  {!service.image && (
                    <div className={`absolute inset-0 bg-gradient-to-br from-teal-50/50 to-cyan-50/50 transition-opacity duration-300 rounded-2xl ${
                      hoveredCard === service.id ? 'opacity-100' : 'opacity-30'
                    }`}></div>
                  )}

                  {/* Content Container */}
                  <div className={`relative z-10 h-full flex flex-col ${service.image ? 'p-6 sm:p-8' : 'p-6 sm:p-8 lg:p-10'}`}>
                    {/* Header Section - Only show if no image */}
                    {!service.image && (
                      <div className="flex items-start justify-between mb-6">
                        {/* Icon Container */}
                        <div
                          className={`w-16 h-16 sm:w-18 sm:h-18 lg:w-20 lg:h-20 flex items-center justify-center rounded-xl sm:rounded-2xl shadow-lg transform transition-all duration-300 ${
                            hoveredCard === service.id ? 'scale-105 rotate-3' : 'scale-100'
                          }`}
                          style={{
                            background: 'linear-gradient(135deg, #14b8a6, #0891b2)',
                            boxShadow: hoveredCard === service.id
                              ? '0 10px 15px -3px rgba(20, 184, 166, 0.4)'
                              : '0 4px 6px -1px rgba(20, 184, 166, 0.2)',
                          }}
                        >
                          <IconComponent className="w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 text-white" />
                        </div>

                        {/* Arrow Indicator */}
                        <div className={`transition-all duration-300 ${
                          hoveredCard === service.id ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
                        }`}>
                          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-teal-100">
                            <ArrowRight className="w-4 h-4 text-teal-600" />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Title & Description */}
                    <div className="flex-grow mb-6">
                      <h3 className="text-xl sm:text-2xl lg:text-2xl font-bold text-gray-900 mb-3 lg:mb-4 leading-tight">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                        {service.description}
                      </p>
                    </div>

                    {/* Key Features */}
                    <div className="mb-6 lg:mb-8">
                      <h4 className="font-semibold text-gray-800 text-sm mb-3">Key Features:</h4>
                      <ul className="space-y-2">
                        {service.features.map((feature, featureIndex) => (
                          <li
                            key={featureIndex}
                            className="flex items-center space-x-3 transition-transform duration-200 hover:translate-x-1"
                          >
                            <div className="w-2 h-2 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full flex-shrink-0"></div>
                            <span className="text-gray-600 text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLearnMore(service);
                      }}
                      className={`w-full bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-xl py-3 sm:py-4 px-6 font-medium text-sm sm:text-base transition-all duration-200 flex items-center justify-center space-x-2 ${
                        hoveredCard === service.id 
                          ? 'shadow-lg scale-105 from-teal-700 to-cyan-700' 
                          : 'shadow-md hover:shadow-lg'
                      }`}
                    >
                      <span>Learn More</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Decorative Elements */}
                  {!service.image && (
                    <>
                      <div className={`absolute top-4 right-4 w-3 h-3 bg-gradient-to-br from-cyan-300/30 to-teal-300/30 rounded-full transition-opacity duration-300 ${
                        hoveredCard === service.id ? 'opacity-100' : 'opacity-50'
                      }`}></div>
                      <div className={`absolute bottom-4 left-4 w-2 h-2 bg-gradient-to-br from-teal-300/30 to-cyan-300/30 rounded-full transition-opacity duration-300 ${
                        hoveredCard === service.id ? 'opacity-100' : 'opacity-50'
                      }`}></div>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className={`text-center mt-16 lg:mt-20 transition-all duration-1000 delay-800 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="bg-white rounded-2xl sm:rounded-3xl p-8 sm:p-10 lg:p-12 shadow-xl border border-gray-100 max-w-3xl mx-auto">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Ready to Transform Your Vision?
            </h3>
            <p className="text-base sm:text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Let's collaborate to create a digital experience that truly reflects your brand's story and drives results.
            </p>
            <button
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-8 py-4 rounded-xl text-base sm:text-lg font-medium hover:shadow-lg hover:scale-105 transition-all duration-200"
              onClick={() => {
                // Check if we're on the home page
                if (window.location.pathname === '/') {
                  const element = document.querySelector('#contact');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                } else {
                  // Navigate to home page with contact hash
                  window.location.href = '/#contact';
                }
              }}
            >
              <span>Start Your Project</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;