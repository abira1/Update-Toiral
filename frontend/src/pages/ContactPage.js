import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Contact from '../components/Contact';
import SEO from '../components/SEO';

const ContactPage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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
        title="Contact Toiral - Get Your Web Development Quote"
        description="Ready to start your project? Contact Toiral for professional web development services. Get in touch for a free consultation and custom quote."
        keywords="contact toiral, web development quote, hire developers bangladesh, web design consultation"
        url="https://toiral.com/contact"
      />
      <Header mousePosition={mousePosition} />
      <main className="min-h-screen">
        <Contact mousePosition={mousePosition} />
      </main>
      <Footer />
    </>
  );
};

export default ContactPage;