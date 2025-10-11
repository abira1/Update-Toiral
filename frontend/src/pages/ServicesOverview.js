import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import EnhancedServices from '../components/EnhancedServices';
import SEO from '../components/SEO';
import { subscribeToWebsiteData } from '../services/dataService';

const ServicesOverview = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const unsubscribe = subscribeToWebsiteData((data) => {
      if (data?.services) {
        setServices(data.services);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <SEO 
        title="Our Services - Web Development, SEO & Design Solutions"
        description="Explore Toiral's comprehensive web development services including custom websites, SEO optimization, admin panels, and full-stack solutions."
        keywords="web development services, custom websites, seo services, admin panels, full stack development, toiral services"
        url="https://toiral.com/services"
      />
      <Header mousePosition={mousePosition} />
      <main className="min-h-screen">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
          </div>
        ) : (
          <EnhancedServices data={services} mousePosition={mousePosition} />
        )}
      </main>
      <Footer />
    </>
  );
};

export default ServicesOverview;