import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Check, Star, Zap, Target, Shield, Rocket, Users, Code, Search, Settings, Layers, Briefcase } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { subscribeToWebsiteData } from '../services/dataService';
import { trackServiceView, trackPageView } from '../services/analyticsService';
import PackageSelectionModal from '../components/PackageSelectionModal';
import { getServiceSlug } from '../utils/slugify';

// Icon mapping for dynamic services
const iconMap = {
  Code, Search, Settings, Layers, Zap, Target, Star, Shield, Rocket, Users, Briefcase
};

const ServiceDetail = () => {
  const { serviceId, slug } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [serviceData, setServiceData] = useState(null);
  const [allServices, setAllServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);

  // Get the identifier (either serviceId or slug from URL)
  const identifier = slug || serviceId;

  useEffect(() => {
    setIsVisible(true);
    console.log('ServiceDetail useEffect - serviceId:', serviceId);
    console.log('ServiceDetail useEffect - location.state:', location.state);

    // Check if service data was passed via navigation state
    if (location.state?.serviceData) {
      console.log('Using service data from navigation state:', location.state.serviceData);
      setServiceData(location.state.serviceData);
      setLoading(false);

      // Track service view
      trackServiceView(location.state.serviceData.id, location.state.serviceData.title);
      trackPageView(`Service Detail - ${location.state.serviceData.title}`, `Toiral - ${location.state.serviceData.title} Service`);
    } else {
      console.log('Fetching service data from Firebase...');
      // Subscribe to services data to find the service by slug
      const unsubscribe = subscribeToWebsiteData((data) => {
        console.log('Firebase data received:', data);
        if (data?.services) {
          setAllServices(data.services);
          console.log('Available services:', data.services);
          console.log('Number of services:', data.services.length);

          // Find service by matching slug or ID
          const foundService = data.services.find(service => {
            if (!service.title) {
              console.log('Service missing title:', service);
              return false;
            }
            
            // Check by SEO-friendly slug first
            const serviceSlug = getServiceSlug(service);
            console.log(`Comparing slug "${serviceSlug}" with identifier "${identifier}"`);
            if (serviceSlug === identifier) {
              return true;
            }
            
            // Fallback to numeric ID for legacy support
            if (service.id.toString() === identifier) {
              console.log(`Found service by ID: ${service.id}`);
              return true;
            }
            
            return false;
          });

          console.log('Found service:', foundService);
          if (foundService) {
            setServiceData(foundService);
            trackServiceView(foundService.id, foundService.title);
            trackPageView(`Service Detail - ${foundService.title}`, `Toiral - ${foundService.title} Service`);
          } else {
            console.log('No service found with slug:', serviceId);
            console.log('Available service slugs:', data.services.map(s => s.title ? s.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : 'no-title'));
          }
        } else {
          console.log('No services data in Firebase response');
        }
        setLoading(false);
      });

      return () => unsubscribe();
    }

    // Global mouse tracking for 3D effects
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [serviceId, location.state]);

  // Handle package selection
  const handlePackageSelect = (packageData) => {
    console.log('Package selected:', packageData);
    setSelectedPackage(packageData);
    setIsModalOpen(true);
  };

  // Handle modal close
  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedPackage(null);
  };

  // Debug: Log current state
  console.log('ServiceDetail render - serviceData:', serviceData);
  console.log('ServiceDetail render - loading:', loading);

  // Debug: Log specific data structures
  if (serviceData) {
    console.log('ServiceDetail - Features:', serviceData.features);
    console.log('ServiceDetail - Process:', serviceData.process);
    console.log('ServiceDetail - Packages:', serviceData.packages);
  }

  // Remove hardcoded data - using dynamic data only
  // const servicesData = { // REMOVED - using dynamic data from Firebase
  /*
      title: 'Web Design & Development',
      subtitle: 'Crafting Digital Masterpieces',
      description: 'We create stunning, responsive websites that not only look incredible but perform flawlessly across all devices. Our design philosophy combines aesthetic beauty with functional excellence.',
      hero_image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=1200&h=600&fit=crop',
      features: [
        {
          title: 'Responsive Design',
          description: 'Your website will look perfect on desktop, tablet, and mobile devices.',
          icon: 'Target'
        },
        {
          title: 'Custom Development',
          description: 'Tailored solutions built specifically for your brand and requirements.',
          icon: 'Zap'
        },
        {
          title: 'Performance Optimization',
          description: 'Lightning-fast loading speeds and optimized user experience.',
          icon: 'Rocket'
        },
        {
          title: 'User Experience Focus',
          description: 'Intuitive navigation and engaging user interfaces.',
          icon: 'Users'
        }
      ],
      process: [
        { step: 1, title: 'Discovery', description: 'Understanding your brand, goals, and target audience' },
        { step: 2, title: 'Design', description: 'Creating wireframes, mockups, and interactive prototypes' },
        { step: 3, title: 'Development', description: 'Building your website with clean, scalable code' },
        { step: 4, title: 'Testing', description: 'Rigorous testing across devices and browsers' },
        { step: 5, title: 'Launch', description: 'Deploying your website and providing ongoing support' }
      ],
      pricing_packages: [
        {
          name: 'Starter',
          price: '$2,999',
          description: 'Perfect for small businesses',
          features: ['5 Pages', 'Responsive Design', 'Basic SEO', 'Contact Form', '3 Months Support']
        },
        {
          name: 'Professional',
          price: '$5,999',
          description: 'Ideal for growing companies',
          features: ['10 Pages', 'Custom Design', 'Advanced SEO', 'CMS Integration', 'E-commerce Ready', '6 Months Support'],
          featured: true
        },
        {
          name: 'Enterprise',
          price: '$12,999',
          description: 'For large organizations',
          features: ['Unlimited Pages', 'Complex Functionality', 'API Integrations', 'Advanced Analytics', 'Priority Support', '12 Months Support']
        }
      ]
    },
    'seo-services': {
      title: 'SEO Services',
      subtitle: 'Dominate Search Rankings',
      description: 'Our comprehensive SEO strategies help your business rank higher on search engines, drive organic traffic, and convert visitors into customers.',
      hero_image: 'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?w=1200&h=600&fit=crop',
      features: [
        {
          title: 'Keyword Research',
          description: 'In-depth analysis to find the most valuable keywords for your business.',
          icon: 'Target'
        },
        {
          title: 'Technical SEO',
          description: 'Optimizing your website\'s technical foundation for better search performance.',
          icon: 'Zap'
        },
        {
          title: 'Content Strategy',
          description: 'Creating valuable, search-optimized content that resonates with your audience.',
          icon: 'Star'
        },
        {
          title: 'Link Building',
          description: 'Building high-quality backlinks to boost your domain authority.',
          icon: 'Shield'
        }
      ],
      process: [
        { step: 1, title: 'SEO Audit', description: 'Comprehensive analysis of your current SEO performance' },
        { step: 2, title: 'Strategy Development', description: 'Creating a customized SEO roadmap for your business' },
        { step: 3, title: 'On-Page Optimization', description: 'Optimizing your website content and structure' },
        { step: 4, title: 'Content Creation', description: 'Developing SEO-optimized content that drives results' },
        { step: 5, title: 'Monitoring & Reporting', description: 'Tracking progress and providing detailed analytics' }
      ],
      pricing_packages: [
        {
          name: 'Local SEO',
          price: '$1,499/mo',
          description: 'Perfect for local businesses',
          features: ['Local Keyword Research', 'Google My Business', 'Local Citations', 'Monthly Reports', 'Phone Support']
        },
        {
          name: 'Growth SEO',
          price: '$2,999/mo',
          description: 'For expanding businesses',
          features: ['National Keywords', 'Content Creation', 'Link Building', 'Technical SEO', 'Bi-weekly Reports', 'Priority Support'],
          featured: true
        },
        {
          name: 'Enterprise SEO',
          price: '$5,999/mo',
          description: 'For large organizations',
          features: ['Unlimited Keywords', 'Advanced Analytics', 'Custom Strategies', 'Dedicated Manager', 'Weekly Reports', '24/7 Support']
        }
      ]
    },
    'admin-panels': {
      title: 'Admin Panels',
      subtitle: 'Powerful Management Systems',
      description: 'Custom-built admin panels that give you complete control over your digital presence. Intuitive interfaces designed for efficiency and ease of use.',
      hero_image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=600&fit=crop',
      features: [
        {
          title: 'User Management',
          description: 'Comprehensive user roles, permissions, and access control systems.',
          icon: 'Users'
        },
        {
          title: 'Content Management',
          description: 'Easy-to-use interfaces for managing all your website content.',
          icon: 'Star'
        },
        {
          title: 'Analytics Dashboard',
          description: 'Real-time insights and detailed analytics about your business.',
          icon: 'Target'
        },
        {
          title: 'Security Features',
          description: 'Advanced security measures to protect your data and systems.',
          icon: 'Shield'
        }
      ],
      process: [
        { step: 1, title: 'Requirements Analysis', description: 'Understanding your specific management needs' },
        { step: 2, title: 'UI/UX Design', description: 'Designing intuitive and efficient user interfaces' },
        { step: 3, title: 'Backend Development', description: 'Building robust and scalable backend systems' },
        { step: 4, title: 'Integration', description: 'Connecting with your existing systems and databases' },
        { step: 5, title: 'Training & Support', description: 'Comprehensive training and ongoing support' }
      ],
      pricing_packages: [
        {
          name: 'Basic Panel',
          price: '$3,999',
          description: 'Essential management features',
          features: ['User Management', 'Content Editor', 'Basic Analytics', '3 User Roles', '6 Months Support']
        },
        {
          name: 'Advanced Panel',
          price: '$7,999',
          description: 'Complete management solution',
          features: ['Advanced User System', 'Custom Workflows', 'Detailed Analytics', 'API Access', 'Mobile App', '12 Months Support'],
          featured: true
        },
        {
          name: 'Enterprise Panel',
          price: '$15,999',
          description: 'Full-scale enterprise solution',
          features: ['Unlimited Users', 'Custom Modules', 'Advanced Security', 'Multi-tenant', 'White Label', 'Lifetime Support']
        }
      ]
    },
    'full-stack': {
      title: 'Full-Stack Solutions',
      subtitle: 'Complete Digital Ecosystems',
      description: 'End-to-end development from concept to deployment. We build comprehensive digital solutions that scale with your business and deliver exceptional results.',
      hero_image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&h=600&fit=crop',
      features: [
        {
          title: 'Frontend Development',
          description: 'Modern, responsive user interfaces built with latest technologies.',
          icon: 'Star'
        },
        {
          title: 'Backend Architecture',
          description: 'Scalable server-side solutions with robust API development.',
          icon: 'Zap'
        },
        {
          title: 'Database Design',
          description: 'Optimized database structures for performance and scalability.',
          icon: 'Target'
        },
        {
          title: 'Cloud Deployment',
          description: 'Secure, scalable cloud infrastructure and deployment strategies.',
          icon: 'Rocket'
        }
      ],
      process: [
        { step: 1, title: 'System Architecture', description: 'Designing scalable and maintainable system architecture' },
        { step: 2, title: 'Technology Stack', description: 'Selecting the best technologies for your project' },
        { step: 3, title: 'Agile Development', description: 'Iterative development with regular feedback cycles' },
        { step: 4, title: 'Testing & QA', description: 'Comprehensive testing to ensure quality and reliability' },
        { step: 5, title: 'Deployment & Maintenance', description: 'Smooth deployment and ongoing maintenance support' }
      ],
      pricing_packages: [
        {
          name: 'MVP Solution',
          price: '$8,999',
          description: 'Perfect for startups',
          features: ['Basic Features', 'Mobile Responsive', 'User Authentication', 'Database Setup', '6 Months Support']
        },
        {
          name: 'Growth Solution',
          price: '$19,999',
          description: 'For expanding businesses',
          features: ['Advanced Features', 'API Integration', 'Payment Systems', 'Admin Panel', 'Mobile App', '12 Months Support'],
          featured: true
        },
        {
          name: 'Enterprise Solution',
          price: '$49,999',
          description: 'For large organizations',
          features: ['Custom Features', 'Multi-platform', 'Advanced Security', 'Third-party Integrations', 'Dedicated Team', 'Lifetime Support']
        }
      ]
    }
  };
  */ // END REMOVED hardcoded data

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-teal-700">Loading service details...</p>
        </div>
      </div>
    );
  }

  // Service not found
  if (!serviceData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-teal-900 mb-4">Service Not Found</h1>
          <p className="text-teal-700 mb-6">The service you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate('/')} className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white">
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  // Get the icon component
  const IconComponent = iconMap[serviceData.icon] || Code;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-cyan-50 relative overflow-hidden">
      {/* Global 3D Mouse Interactive Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-6 h-6 bg-gradient-to-br from-teal-400/20 to-cyan-500/20 rounded-full backdrop-blur-sm"
            style={{
              left: `${20 + (i * 10)}%`,
              top: `${10 + (i * 8)}%`,
              transform: `translate(${mousePosition.x * (0.02 + i * 0.005)}px, ${mousePosition.y * (0.02 + i * 0.005)}px) rotateX(${mousePosition.y * 0.1}deg) rotateY(${mousePosition.x * 0.1}deg)`,
              transition: 'transform 0.3s ease-out',
              animationDelay: `${i * 0.2}s`
            }}
          />
        ))}
      </div>

      <Header mousePosition={mousePosition} />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center mb-8">
            <Button
              onClick={() => navigate('/')}
              variant="outline"
              className="mr-4 border-teal-300 text-teal-700 hover:bg-teal-100"
            >
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back to Home
            </Button>
          </div>

          <div className={`grid lg:grid-cols-2 gap-12 items-center transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <div>
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold text-teal-900">
                    {serviceData.title}
                  </h1>
                  {serviceData.featured && (
                    <Badge className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white mt-2">
                      <Star className="w-3 h-3 mr-1" />
                      Featured Service
                    </Badge>
                  )}
                </div>
              </div>
              <p className="text-xl text-teal-600 leading-relaxed mb-8">
                {serviceData.description}
              </p>

              {/* Key Features */}
              {serviceData.features && serviceData.features.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-teal-900 mb-4">Key Features:</h3>
                  <ul className="space-y-3">
                    {serviceData.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <div className="flex-shrink-0 mt-0.5">
                          <Check className="w-5 h-5 text-teal-500" />
                        </div>
                        <span className="text-teal-700 ml-3 leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {serviceData.packages && serviceData.packages.length > 0 && (
                <Button
                  className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white px-8 py-4 rounded-2xl text-lg font-medium transform hover:scale-105 transition-all duration-300 shadow-xl shadow-teal-500/20"
                  onClick={() => {
                    const packagesElement = document.querySelector('#packages');
                    if (packagesElement) {
                      packagesElement.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  View Packages
                </Button>
              )}
            </div>

            <div
              className="relative"
              style={{
                transform: `perspective(1000px) rotateX(${mousePosition.y * 0.05}deg) rotateY(${mousePosition.x * 0.05}deg)`
              }}
            >
              {serviceData.image ? (
                <div className="w-full h-96 rounded-3xl shadow-2xl overflow-hidden">
                  <img
                    src={serviceData.image}
                    alt={serviceData.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="w-full h-96 bg-gradient-to-br from-teal-100 to-cyan-100 rounded-3xl shadow-2xl flex items-center justify-center">
                  <IconComponent className="w-32 h-32 text-teal-600" />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      {serviceData.process && serviceData.process.length > 0 && (
        <section className="py-24 bg-white/30 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-teal-900 mb-6">
                Our Process
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full mx-auto"></div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {serviceData.process.map((step, index) => (
                <Card
                  key={index}
                  className="bg-white/70 backdrop-blur-sm border-teal-200/50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                  style={{
                    transform: `perspective(1000px) rotateX(${mousePosition.y * 0.02}deg) rotateY(${mousePosition.x * 0.02}deg) translateY(-8px)`,
                    transitionDelay: `${index * 100}ms`
                  }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full flex items-center justify-center shadow-lg mr-4">
                        <span className="text-white font-bold text-lg">{step.step}</span>
                      </div>
                      <h3 className="text-xl font-bold text-teal-900">{step.title}</h3>
                    </div>
                    <p className="text-teal-700">{step.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Pricing Section */}
      {serviceData.packages && serviceData.packages.length > 0 && (
        <section id="packages" className="py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-teal-900 mb-6">
                Choose Your Package
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full mx-auto"></div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {serviceData.packages.map((pkg, index) => (
              <Card
                key={index}
                className={`relative bg-white/70 backdrop-blur-sm border-teal-200/50 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-4 ${
                  pkg.featured ? 'ring-2 ring-teal-500 scale-105' : ''
                }`}
                style={{
                  transform: `perspective(1000px) rotateX(${mousePosition.y * 0.02}deg) rotateY(${mousePosition.x * 0.02}deg) translateY(${pkg.featured ? '-16px' : '-8px'}) scale(${pkg.featured ? 1.05 : 1})`,
                  transitionDelay: `${index * 100}ms`
                }}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-4 py-1">
                      <Star className="w-3 h-3 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}
                
                <CardContent className="p-8 text-center">
                  <h3 className="text-2xl font-bold text-teal-900 mb-2">{pkg.name}</h3>
                  <p className="text-teal-700 mb-4">{pkg.description}</p>
                  <div className="text-4xl font-bold text-teal-900 mb-6">{pkg.price}</div>
                  
                  <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center justify-center">
                        <Check className="w-5 h-5 text-teal-500 mr-2" />
                        <span className="text-teal-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button
                    onClick={() => handlePackageSelect(pkg)}
                    className={`w-full py-3 rounded-xl font-medium transform hover:scale-105 transition-all duration-300 ${
                      pkg.featured
                        ? 'bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white shadow-lg shadow-teal-500/20'
                        : 'bg-white text-teal-600 border border-teal-300 hover:bg-teal-50'
                    }`}
                  >
                    Choose {pkg.name}
                  </Button>
                </CardContent>
              </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section id="contact" className="py-24 bg-gradient-to-r from-teal-600 to-cyan-600 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Let's discuss your project and create something amazing together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="bg-white text-teal-600 hover:bg-gray-100 px-8 py-4 rounded-2xl text-lg font-medium transform hover:scale-105 transition-all duration-300"
              onClick={() => navigate('/#contact')}
            >
              Contact Us
            </Button>
            <Button 
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-teal-600 px-8 py-4 rounded-2xl text-lg font-medium transform hover:scale-105 transition-all duration-300"
              onClick={() => navigate('/')}
            >
              View All Services
            </Button>
          </div>
        </div>
      </section>

      <Footer />

      {/* Package Selection Modal */}
      <PackageSelectionModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        packageData={selectedPackage}
      />
    </div>
  );
};

export default ServiceDetail;