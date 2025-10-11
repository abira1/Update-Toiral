import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { LogoImage } from './ui/LazyImage';

const Header = ({ mousePosition }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#about', label: 'About' },
    { href: '#services', label: 'Services' },
    { href: '#courses', label: 'Courses' },
    { href: '#projects', label: 'Projects' },
    { href: '/portfolio', label: 'Portfolio', isRoute: true },
    { href: '#team', label: 'Team' },
    { href: '#contact', label: 'Contact' }
  ];

  const handleNavigation = (href, isRoute = false) => {
    setIsMobileMenuOpen(false);

    if (isRoute) {
      // Handle route navigation (like /portfolio)
      navigate(href);
      return;
    }

    // Check if we're on the home page
    const isHomePage = location.pathname === '/';

    if (isHomePage) {
      // On home page: scroll to section
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // On other pages: navigate to home page with hash
      // Use state to pass the section to scroll to after navigation
      navigate('/', { state: { scrollTo: href } });
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-slate-50/90 backdrop-blur-md shadow-xl shadow-teal-500/10' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div
              className="relative transform transition-transform duration-300 hover:scale-110 cursor-pointer"
              style={{
                transform: `perspective(1000px) rotateX(${mousePosition.y * 0.02}deg) rotateY(${mousePosition.x * 0.02}deg)`
              }}
              onClick={() => navigate('/')}
            >
              <img
                src="/toiral-logo.png"
                alt="Toiral - Professional Web Development & Design Agency Logo"
                className="h-10 w-auto filter drop-shadow-lg"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <button
                key={link.href}
                onClick={() => handleNavigation(link.href, link.isRoute)}
                className="text-teal-700 hover:text-teal-900 font-medium transition-all duration-300 relative group transform hover:scale-105"
                style={{
                  transform: `perspective(1000px) rotateX(${mousePosition.y * 0.01}deg) translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`,
                  transitionDelay: `${index * 50}ms`
                }}
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-teal-500 to-cyan-500 transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button
              onClick={() => handleNavigation('#contact')}
              className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white px-6 py-3 rounded-2xl transform transition-all duration-300 shadow-lg shadow-teal-500/20 hover:shadow-xl hover:shadow-teal-500/30 hover:scale-105"
              style={{
                transform: `perspective(1000px) rotateX(${mousePosition.y * 0.02}deg) rotateY(${mousePosition.x * 0.02}deg) scale(1.05)`
              }}
            >
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-teal-700 p-2 rounded-xl hover:bg-teal-100/50 transition-all duration-300"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-slate-50/95 backdrop-blur-md shadow-xl shadow-teal-500/10 border-t border-teal-200/50 rounded-b-2xl">
            <nav className="flex flex-col py-6">
              {navLinks.map((link, index) => (
                <button
                  key={link.href}
                  onClick={() => handleNavigation(link.href, link.isRoute)}
                  className="text-teal-700 hover:text-teal-900 font-medium py-3 px-6 text-left hover:bg-teal-100/30 transition-all duration-300 transform hover:translate-x-2"
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  {link.label}
                </button>
              ))}
              <div className="px-6 pt-4">
                <Button
                  onClick={() => handleNavigation('#contact')}
                  className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white py-3 rounded-2xl shadow-lg shadow-teal-500/20"
                >
                  Get Started
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;