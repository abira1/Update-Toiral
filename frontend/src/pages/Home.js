import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import EnhancedServices from '../components/EnhancedServices';
import Courses from '../components/Courses';
import Projects from '../components/Projects';
import Team from '../components/Team';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import SEO from '../components/SEO';

import { subscribeToWebsiteData } from '../services/dataService';
import { initializeFirebaseDatabase } from '../utils/initializeDatabase';
import { initializeAnalytics, trackPageView } from '../services/analyticsService';
import { mockData } from '../data/mock';
import { HomePageSkeleton } from '../components/ui/SkeletonScreens';

const Home = () => {
  const location = useLocation();
  const [data, setData] = useState({
    hero: {},
    about: {},
    services: [],
    process: [],
    packages: [],
    courses: [],
    projects: [],
    team: [],
    contact: {}
  });
  const [isLoading, setIsLoading] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [firebaseInitialized, setFirebaseInitialized] = useState(false);

  useEffect(() => {
    let unsubscribe = null;

    const initializeApp = async () => {
      try {
        // Initialize analytics
        initializeAnalytics();
        trackPageView('Home', 'Toiral - Home');

        // Initialize Firebase database if needed
        if (!firebaseInitialized) {
          try {
            await initializeFirebaseDatabase();
            setFirebaseInitialized(true);
          } catch (error) {
            console.warn('Database initialization skipped (already exists):', error.message);
            setFirebaseInitialized(true);
          }
        }

        // Subscribe to real-time data updates
        unsubscribe = subscribeToWebsiteData((firebaseData) => {
          if (firebaseData) {
            // Use Firebase data with proper structure, fallback to mock data
            const newData = {
              hero: firebaseData.hero || mockData.hero,
              about: firebaseData.about || mockData.about,
              services: firebaseData.services || mockData.services,
              process: firebaseData.process || [],
              packages: firebaseData.packages || [],
              courses: firebaseData.courses || [],
              projects: firebaseData.projects || mockData.projects,
              team: firebaseData.team || mockData.team,
              contact: firebaseData.contact || mockData.contact
            };
            setData(newData);
          } else {
            // Use mock data if no Firebase data
            setData({
              hero: mockData.hero,
              about: mockData.about,
              services: mockData.services,
              process: [],
              packages: [],
              courses: [],
              projects: mockData.projects,
              team: mockData.team,
              contact: mockData.contact
            });
          }
          setIsLoading(false);
        });
      } catch (error) {
        console.error('Error initializing app:', error);
        // Use mock data on error
        setData({
          hero: mockData.hero,
          about: mockData.about,
          services: mockData.services,
          courses: [],
          projects: mockData.projects,
          team: mockData.team,
          contact: mockData.contact
        });
        setIsLoading(false);
      }
    };

    initializeApp();

    // Global mouse tracking for 3D effects
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [firebaseInitialized]);

  // Handle scrolling to section when navigating from other pages
  useEffect(() => {
    if (location.state?.scrollTo && !isLoading) {
      // Wait for components to render, then scroll
      setTimeout(() => {
        const element = document.querySelector(location.state.scrollTo);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 500);
    }
  }, [location.state, isLoading]);

  if (isLoading) {
    return <HomePageSkeleton />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-cyan-50 relative overflow-hidden">
      <SEO
        title="Toiral - Professional Web Development & Design Agency | Custom Websites & SEO"
        description="Toiral crafts digital experiences that truly reflect your brand's soul. Professional web development, custom design, and SEO services in Dhaka, Bangladesh. Imagine • Develop • Deploy."
        keywords="web development Bangladesh, web design Dhaka, SEO services, custom websites, responsive design, React development, digital agency Bangladesh, professional web development"
        url="https://toiral.com/"
      />
      {/* Global 3D Mouse Interactive Elements */}
      <div className="fixed inset-0 pointer-events-none z-10">
        {/* Floating 3D Orbs */}
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

        {/* Interactive 3D Shapes */}
        <div
          className="absolute top-1/4 right-1/4 w-32 h-32 bg-gradient-to-br from-teal-500/10 to-cyan-500/10 rounded-3xl backdrop-blur-sm border border-teal-200/30 shadow-xl"
          style={{
            transform: `perspective(1000px) rotateX(${mousePosition.y * 0.1}deg) rotateY(${mousePosition.x * 0.1}deg) translate(${mousePosition.x * 0.05}px, ${mousePosition.y * 0.05}px)`,
            transition: 'transform 0.4s ease-out'
          }}
        />

        <div
          className="absolute bottom-1/3 left-1/4 w-24 h-24 bg-gradient-to-br from-cyan-500/10 to-teal-500/10 rounded-2xl backdrop-blur-sm border border-cyan-200/30 shadow-lg"
          style={{
            transform: `perspective(1000px) rotateX(${-mousePosition.y * 0.15}deg) rotateY(${-mousePosition.x * 0.15}deg) translate(${-mousePosition.x * 0.03}px, ${-mousePosition.y * 0.03}px)`,
            transition: 'transform 0.5s ease-out'
          }}
        />
      </div>

      <Header mousePosition={mousePosition} />
      <Hero data={data.hero} mousePosition={mousePosition} />
      <About data={data.about} mousePosition={mousePosition} />
      <EnhancedServices data={data.services} mousePosition={mousePosition} />
      <Courses data={data.courses} mousePosition={mousePosition} />
      <Projects data={data.projects} mousePosition={mousePosition} />
      <Team data={data.team} mousePosition={mousePosition} />
      <Contact data={data.contact} mousePosition={mousePosition} />
      <Footer />
    </div>
  );
};

export default Home;