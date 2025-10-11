import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Courses from '../components/Courses';
import SEO from '../components/SEO';
import { subscribeToWebsiteData } from '../services/dataService';

const CoursesOverview = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const unsubscribe = subscribeToWebsiteData((data) => {
      if (data?.courses) {
        setCourses(data.courses);
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
        title="Web Development Courses - Learn Programming Online | Toiral"
        description="Master web development with our comprehensive online courses. Learn HTML, CSS, JavaScript, React, Node.js, and more from industry experts."
        keywords="web development courses, programming courses bangladesh, online coding bootcamp, react course, nodejs course, ui ux design course"
        url="https://toiral.com/courses"
      />
      <Header />
      <main className="min-h-screen pt-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-600 mb-6">
              Learn & Grow
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Master modern web development with our comprehensive courses. 
              From beginner to advanced, we'll help you build the skills that matter.
            </p>
          </div>
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
            </div>
          ) : (
            <Courses courses={courses} />
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default CoursesOverview;