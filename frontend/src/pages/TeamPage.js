import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Team from '../components/Team';
import SEO from '../components/SEO';
import { subscribeToWebsiteData } from '../services/dataService';

const TeamPage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [teamData, setTeamData] = useState([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    const unsubscribe = subscribeToWebsiteData((data) => {
      if (data?.team) {
        setTeamData(data.team);
      }
      setLoading(false);
    });

    return () => unsubscribe();
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
      <main className="min-h-screen">
        <Team mousePosition={mousePosition} />
      </main>
      <Footer />
    </>
  );
};

export default TeamPage;