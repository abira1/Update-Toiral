import React, { useState, useEffect, useRef } from 'react';
import { Code, Search, Settings, Layers, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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
    <section id="services" ref={sectionRef} className="py-24 bg-gradient-to-br from-gray-100 via-gray-50 to-gray-100 relative overflow-hidden">
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

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-5xl md:text-6xl font-bold text-teal-900 mb-6">
            Our Services
          </h2>
          <p className="text-xl text-teal-700 max-w-3xl mx-auto leading-relaxed">
            From concept to deployment, we provide comprehensive digital solutions tailored to your unique story.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full mx-auto mt-6"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
          {servicesData.map((service, index) => {
            const IconComponent = iconMap[service.icon] || Code;
            console.log('Service:', service, 'Icon:', service.icon, 'IconComponent:', IconComponent);
            return (
              <div
                key={service.id}
                className={`group relative overflow-hidden cursor-pointer transition-all duration-300 transform hover:-translate-y-2 hover:scale-102 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{
                  transitionDelay: `${index * 200}ms`,
                  background: 'linear-gradient(145deg, #f8f9fa, #e9ecef)',
                  boxShadow: hoveredCard === service.id
                    ? '12px 12px 24px #d1d5db, -12px -12px 24px #ffffff'
                    : '8px 8px 16px #d1d5db, -8px -8px 16px #ffffff',
                  borderRadius: '16px',
                  padding: '2.5rem',
                  maxWidth: '400px',
                  margin: '0 auto'
                }}
                onMouseEnter={() => setHoveredCard(service.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => handleLearnMore(service)}
              >
                {/* Subtle Background Effect */}
                <div className={`absolute inset-0 bg-gradient-to-br from-teal-400/5 to-cyan-500/5 transition-opacity duration-300 ${
                  hoveredCard === service.id ? 'opacity-100' : 'opacity-50'
                }`} style={{ borderRadius: '16px' }}></div>

                {/* Simple Icon */}
                <div className="flex items-start justify-between mb-6">
                  <div
                    className={`w-14 h-14 flex items-center justify-center shadow-md transform transition-all duration-300 ${
                      hoveredCard === service.id ? 'scale-105' : 'scale-100'
                    }`}
                    style={{
                      background: 'linear-gradient(145deg, #14b8a6, #0891b2)',
                      boxShadow: hoveredCard === service.id
                        ? '6px 6px 12px #0891b2, -6px -6px 12px #14b8a6'
                        : '4px 4px 8px #0891b2, -4px -4px 8px #14b8a6',
                      borderRadius: '12px'
                    }}
                  >
                    <IconComponent className="w-7 h-7 text-white" />
                  </div>
                  <div className={`transition-opacity duration-300 ${
                    hoveredCard === service.id ? 'opacity-100' : 'opacity-0'
                  }`}>
                    <ArrowRight className="w-5 h-5 text-teal-600" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-teal-900 mb-3 relative z-10">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-teal-700 text-base leading-relaxed mb-5 relative z-10">
                  {service.description}
                </p>

                {/* Key Features */}
                <div className="space-y-2 mb-6 relative z-10">
                  <h4 className="font-semibold text-teal-800 text-sm">Key Features:</h4>
                  <ul className="space-y-1.5">
                    {service.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center space-x-2.5 transition-transform duration-200 hover:translate-x-1"
                      >
                        <div className="w-1.5 h-1.5 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full flex-shrink-0"></div>
                        <span className="text-teal-700 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Simple Learn More Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLearnMore(service);
                  }}
                  className="w-full text-white rounded-lg transform hover:scale-102 transition-all duration-200 shadow-sm hover:shadow-md font-medium py-2.5 px-5 flex items-center justify-center space-x-2 relative z-10"
                  style={{
                    background: 'linear-gradient(145deg, #14b8a6, #0891b2)',
                    boxShadow: '4px 4px 8px #0891b2, -4px -4px 8px #14b8a6'
                  }}
                >
                  <span className="text-sm">Learn More</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* Subtle Decorative Elements */}
                <div className={`absolute top-3 right-3 w-4 h-4 bg-gradient-to-br from-cyan-300/20 to-teal-300/20 rounded-full transition-opacity duration-300 ${
                  hoveredCard === service.id ? 'opacity-100' : 'opacity-50'
                }`}></div>
                <div className={`absolute bottom-3 left-3 w-3 h-3 bg-gradient-to-br from-teal-300/20 to-cyan-300/20 rounded-full transition-opacity duration-300 ${
                  hoveredCard === service.id ? 'opacity-100' : 'opacity-50'
                }`}></div>
              </div>
            );
          })}
        </div>

        {/* Simple CTA Section */}
        <div className={`text-center mt-12 transition-all duration-1000 delay-800 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div
            className="rounded-2xl p-8 border border-teal-200/30 shadow-lg hover:shadow-xl transition-all duration-300 max-w-2xl mx-auto"
            style={{
              background: 'linear-gradient(145deg, #f8f9fa, #e9ecef)',
              boxShadow: '8px 8px 16px #d1d5db, -8px -8px 16px #ffffff'
            }}
          >
            <h3 className="text-2xl font-bold text-teal-900 mb-3">
              Ready to Transform Your Vision?
            </h3>
            <p className="text-base text-teal-700 mb-6">
              Let's collaborate to create a digital experience that truly reflects your brand's story.
            </p>
            <button
              className="text-white px-6 py-3 rounded-lg text-base font-medium hover:scale-102 transition-all duration-200 shadow-md"
              style={{
                background: 'linear-gradient(145deg, #14b8a6, #0891b2)',
                boxShadow: '4px 4px 8px #0891b2, -4px -4px 8px #14b8a6'
              }}
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
              Start Your Project
              <ArrowRight className="ml-2 w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;