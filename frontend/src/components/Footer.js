import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Phone, MapPin, Linkedin, Twitter, Instagram, Heart, Youtube, Facebook } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();

  const handleNavigation = (href, isRoute = false) => {
    if (isRoute) {
      // Handle route navigation
      navigate(href);
      return;
    }

    // Handle scroll to section (for hash-based navigation)
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const socialLinks = [
    { icon: Instagram, href: 'https://www.instagram.com/toiral.offical/', label: 'Instagram' },
    { icon: Twitter, href: 'https://x.com/ToiralOfficial', label: 'Twitter' },
    { icon: Facebook, href: 'https://web.facebook.com/toiral', label: 'Facebook' },
    { icon: Youtube, href: 'https://youtube.com/@toiral?si=eqi2upNagvQ6aZcx', label: 'YouTube' }
  ];

  const quickLinks = [
    { label: 'About', href: '/about', isRoute: true },
    { label: 'Services', href: '/services', isRoute: true },
    { label: 'Projects', href: '#projects' }, // Keep on home page for now
    { label: 'Team', href: '/team', isRoute: true },
    { label: 'Contact', href: '/contact', isRoute: true }
  ];

  return (
    <footer className="bg-gradient-to-br from-teal-900 via-cyan-900 to-teal-800 text-white relative overflow-hidden">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" 
             style={{
               backgroundImage: `repeating-linear-gradient(45deg, #ffffff 0px, #ffffff 1px, transparent 1px, transparent 30px)`
             }} 
        />
      </div>

      {/* Enhanced Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-br from-teal-400/20 to-cyan-400/20 rounded-full blur-2xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-gradient-to-br from-cyan-400/20 to-teal-400/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        
        {/* 3D Geometric Shapes */}
        <div className="absolute top-1/3 right-1/3 w-16 h-16 bg-gradient-to-br from-teal-500/10 to-cyan-500/10 rounded-2xl backdrop-blur-sm border border-teal-400/20 transform rotate-45 animate-bounce" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-1/3 left-1/3 w-12 h-12 bg-gradient-to-br from-cyan-500/10 to-teal-500/10 rounded-xl backdrop-blur-sm border border-cyan-400/20 transform -rotate-12 animate-bounce" style={{ animationDelay: '1.5s' }}></div>
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">
            {/* Enhanced Brand Section */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-4 mb-6">
                <div className="transform hover:scale-110 transition-transform duration-300">
                  <img
                    src="https://i.postimg.cc/G2yPfwK1/toiral__2_.png"
                    alt="Toiral - Professional Web Development & Design Agency Logo"
                    className="h-12 w-auto filter brightness-0 invert"
                  />
                </div>
              </div>
              
              <p className="text-teal-100 text-lg leading-relaxed mb-6 max-w-md">
                We don't just build websites — we craft digital experiences that truly reflect the soul of a brand through storytelling and innovation.
              </p>
              
              <div className="text-teal-200 mb-6">
                <div className="text-xl font-light tracking-wide">
                  <span className="hover:text-white transition-colors cursor-default transform hover:scale-105 inline-block">Imagine</span>
                  <span className="mx-3">•</span>
                  <span className="hover:text-white transition-colors cursor-default transform hover:scale-105 inline-block">Develop</span>
                  <span className="mx-3">•</span>
                  <span className="hover:text-white transition-colors cursor-default transform hover:scale-105 inline-block">Deploy</span>
                </div>
              </div>

              {/* Enhanced Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-white/20 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 group border border-teal-400/20"
                      aria-label={social.label}
                      style={{
                        transform: `perspective(1000px) rotateX(10deg) rotateY(5deg)`,
                        transitionDelay: `${index * 100}ms`
                      }}
                    >
                      <IconComponent className="w-6 h-6 text-teal-200 group-hover:text-white transition-colors" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Enhanced Quick Links */}
            <div>
              <h3 className="text-xl font-bold text-white mb-6">Quick Links</h3>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={() => handleNavigation(link.href, link.isRoute)}
                      className="text-teal-200 hover:text-white transition-all duration-300 flex items-center group transform hover:translate-x-2"
                      style={{ transitionDelay: `${index * 50}ms` }}
                    >
                      <span className="w-0 h-0.5 bg-teal-400 transition-all duration-300 group-hover:w-4 mr-0 group-hover:mr-2"></span>
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Enhanced Contact Info */}
            <div>
              <h3 className="text-xl font-bold text-white mb-6">Get in Touch</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3 group transform hover:translate-x-2 transition-transform duration-300">
                  <Mail className="w-5 h-5 text-teal-400 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <div>
                    <a href="mailto:contact@toiral.com" className="text-teal-200 group-hover:text-white transition-colors hover:underline">
                      contact@toiral.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3 group transform hover:translate-x-2 transition-transform duration-300">
                  <Phone className="w-5 h-5 text-teal-400 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <div>
                    <a href="tel:+8801804673095" className="text-teal-200 group-hover:text-white transition-colors hover:underline">
                      +880 1804 673095
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3 group transform hover:translate-x-2 transition-transform duration-300">
                  <MapPin className="w-5 h-5 text-teal-400 mt-1 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <div>
                    <p className="text-teal-200 group-hover:text-white transition-colors">
                      Dhaka, Bangladesh<br />
                      <span className="text-sm opacity-80">Serving clients worldwide</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Bottom Bar */}
        <div className="border-t border-teal-700/50 bg-gradient-to-r from-teal-800/50 to-cyan-800/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="text-teal-200 text-sm mb-4 md:mb-0">
                <p>
                  All rights reserved © {currentYear} Toiral Web Development Company.
                </p>
              </div>
              
              <div className="flex space-x-6 text-sm text-teal-200">
                <a href="/privacy-policy" className="hover:text-white transition-colors transform hover:scale-105">Privacy Policy</a>
                <a href="/terms-of-service" className="hover:text-white transition-colors transform hover:scale-105">Terms of Service</a>
                <a href="/cookies" className="hover:text-white transition-colors transform hover:scale-105">Cookies</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;