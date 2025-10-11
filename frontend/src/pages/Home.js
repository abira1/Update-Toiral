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
      // Wait for components to render, then scroll with proper offset
      setTimeout(() => {
        const element = document.querySelector(location.state.scrollTo);
        if (element) {
          const headerOffset = 100; // Offset for fixed header
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
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
      {/* Global Smooth Background Animations */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {/* Smooth animated gradient orbs */}
        <div className="absolute top-10 left-10 w-40 h-40 bg-gradient-to-br from-teal-400/15 to-cyan-400/15 rounded-full blur-3xl animate-pulse" 
          style={{ animation: 'globalFloat1 18s ease-in-out infinite' }} />
        <div className="absolute top-1/4 right-20 w-48 h-48 bg-gradient-to-br from-cyan-300/10 to-teal-300/10 rounded-full blur-3xl animate-pulse" 
          style={{ animation: 'globalFloat2 22s ease-in-out infinite 3s' }} />
        <div className="absolute bottom-20 left-1/3 w-44 h-44 bg-gradient-to-br from-teal-500/12 to-cyan-500/12 rounded-full blur-3xl animate-pulse" 
          style={{ animation: 'globalFloat3 20s ease-in-out infinite 6s' }} />
        <div className="absolute top-1/2 right-1/3 w-36 h-36 bg-gradient-to-br from-cyan-400/10 to-teal-400/10 rounded-full blur-3xl animate-pulse" 
          style={{ animation: 'globalFloat1 25s ease-in-out infinite 9s' }} />

        {/* Smooth animated shapes */}
        <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-gradient-to-br from-teal-500/8 to-cyan-500/8 rounded-3xl backdrop-blur-sm border border-teal-200/20 shadow-xl"
          style={{ animation: 'shapeRotate 30s linear infinite' }} />
        <div className="absolute bottom-1/3 left-1/4 w-24 h-24 bg-gradient-to-br from-cyan-500/8 to-teal-500/8 rounded-2xl backdrop-blur-sm border border-cyan-200/20 shadow-lg"
          style={{ animation: 'shapeScale 24s ease-in-out infinite 5s' }} />
      </div>

      <style jsx>{`
        @keyframes globalFloat1 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.15; }
          25% { transform: translate(30px, -40px) scale(1.1); opacity: 0.25; }
          50% { transform: translate(-20px, -60px) scale(1.05); opacity: 0.2; }
          75% { transform: translate(35px, -35px) scale(1.15); opacity: 0.3; }
        }

        @keyframes globalFloat2 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.1; }
          33% { transform: translate(-25px, 45px) scale(1.2); opacity: 0.2; }
          66% { transform: translate(30px, 50px) scale(1.1); opacity: 0.15; }
        }

        @keyframes globalFloat3 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.12; }
          40% { transform: translate(40px, -30px) scale(1.15); opacity: 0.22; }
          80% { transform: translate(-35px, -25px) scale(1.08); opacity: 0.18; }
        }

        @keyframes shapeRotate {
          0% { transform: rotate(0deg) scale(1); opacity: 0.08; }
          50% { transform: rotate(180deg) scale(1.1); opacity: 0.15; }
          100% { transform: rotate(360deg) scale(1); opacity: 0.08; }
        }

        @keyframes shapeScale {
          0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.08; }
          50% { transform: scale(1.2) rotate(15deg); opacity: 0.15; }
        }
      `}</style>

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