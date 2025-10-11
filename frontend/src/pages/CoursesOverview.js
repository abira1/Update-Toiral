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
      <Header mousePosition={mousePosition} />
      <main className="min-h-screen">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
          </div>
        ) : (
          <Courses data={courses} mousePosition={mousePosition} />
        )}
      </main>
      <Footer />
    </>
  );
};

export default CoursesOverview;