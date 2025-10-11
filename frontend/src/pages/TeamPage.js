import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Team from '../components/Team';
import SEO from '../components/SEO';

const TeamPage = () => {
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
        title="Meet Our Team - Toiral Web Development Experts"
        description="Meet the talented professionals behind Toiral. Our experienced team of developers, designers, and digital strategists are ready to bring your vision to life."
        keywords="toiral team, web developers bangladesh, design team, development experts, professional web team"
        url="https://toiral.com/team"
      />
      <Header mousePosition={mousePosition} />
      <main className="min-h-screen pt-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-600 mb-6">
              Our Team
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Meet the passionate individuals who make the magic happen. 
              Our diverse team brings together creativity, technical expertise, and strategic thinking.
            </p>
          </div>
          <Team mousePosition={mousePosition} />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default TeamPage;