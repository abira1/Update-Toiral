import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Contact from '../components/Contact';
import SEO from '../components/SEO';

const ContactPage = () => {
  return (
    <>
      <SEO 
        title="Contact Toiral - Get Your Web Development Quote"
        description="Ready to start your project? Contact Toiral for professional web development services. Get in touch for a free consultation and custom quote."
        keywords="contact toiral, web development quote, hire developers bangladesh, web design consultation"
        url="https://toiral.com/contact"
      />
      <Header />
      <main className="min-h-screen pt-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-600 mb-6">
              Let's Work Together
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ready to transform your vision into reality? We're here to help you create 
              something amazing. Get in touch for a free consultation.
            </p>
          </div>
          <Contact />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ContactPage;