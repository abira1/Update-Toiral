import React, { useState, useEffect, useRef } from 'react';
import { ExternalLink, Clock, BookOpen, Star, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { trackCustomEvent } from '../services/analyticsService';

const Courses = ({ data, mousePosition }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCourse, setHoveredCourse] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleCourseClick = (url, courseTitle, courseProvider) => {
    // Track course click event
    trackCustomEvent('course_click', {
      course_title: courseTitle,
      course_provider: courseProvider,
      course_url: url
    });

    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Web Development': 'bg-teal-100 text-teal-800',
      'Frontend Development': 'bg-cyan-100 text-cyan-800',
      'Backend Development': 'bg-emerald-100 text-emerald-800',
      'Design': 'bg-purple-100 text-purple-800',
      'Data Science': 'bg-blue-100 text-blue-800',
      'Marketing': 'bg-orange-100 text-orange-800'
    };
    return colors[category] || 'bg-gray-100 text-gray-800';
  };

  if (!data || !Array.isArray(data)) {
    return null;
  }

  return (
    <section id="courses" ref={sectionRef} className="py-24 relative overflow-hidden">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" 
             style={{
               backgroundImage: `radial-gradient(circle at 20% 80%, #0f766e 0px, transparent 50%), radial-gradient(circle at 80% 20%, #0891b2 0px, transparent 50%)`
             }} 
        />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-teal-200/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-32 right-16 w-32 h-32 bg-cyan-200/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-teal-300/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header - Enhanced Responsive Design */}
        <div className={`text-center mb-8 sm:mb-12 md:mb-16 lg:mb-20 transition-all duration-1000 px-4 sm:px-6 md:px-8 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-teal-900 mb-4 sm:mb-5 md:mb-6 leading-tight">
            Featured Courses
          </h2>
          <div className="w-16 sm:w-20 md:w-24 h-0.5 sm:h-0.5 md:h-1 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full mx-auto mb-4 sm:mb-5 md:mb-6"></div>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-teal-700 max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-3xl mx-auto leading-relaxed">
            Expand your skills with carefully curated courses from top platforms.
            Learn from industry experts and advance your career.
          </p>
        </div>

        {/* Courses Grid - Enhanced Responsive Design */}
        {data && data.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 md:gap-8 px-4 sm:px-6 md:px-8 lg:px-0">
            {data.map((course, index) => (
            <Card
              key={course.id}
              className={`group bg-white/85 backdrop-blur-sm border-teal-200/50 shadow-lg hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-8 hover:rotate-1 cursor-pointer overflow-hidden ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ 
                transitionDelay: `${index * 200}ms`,
                transform: `perspective(1000px) rotateX(${mousePosition.y * 0.02}deg) rotateY(${mousePosition.x * 0.02}deg) translateY(-32px) rotate(1deg)`
              }}
              onMouseEnter={() => setHoveredCourse(course.id)}
              onMouseLeave={() => setHoveredCourse(null)}
              onClick={() => handleCourseClick(course.url, course.title, course.provider)}
            >
              {/* Course Image - Responsive Height */}
              <div className="relative h-40 sm:h-44 md:h-48 lg:h-52 overflow-hidden">
                <img 
                  src={course.image} 
                  alt={course.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className={`absolute inset-0 bg-gradient-to-t from-teal-900/60 to-transparent transition-opacity duration-300 ${
                  hoveredCourse === course.id ? 'opacity-100' : 'opacity-0'
                }`}></div>
                
                {/* External Link Icon */}
                <div className={`absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 transition-all duration-300 ${
                  hoveredCourse === course.id ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
                }`}>
                  <ExternalLink className="w-4 h-4 text-teal-600" />
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(course.category)}`}>
                    {course.category}
                  </span>
                </div>
              </div>

              <CardContent className="p-4 sm:p-5 md:p-6 relative">
                {/* Enhanced Background Effect */}
                <div className={`absolute inset-0 bg-gradient-to-br from-teal-50/50 to-cyan-50/50 transform transition-transform duration-500 ${
                  hoveredCourse === course.id ? 'scale-105 rotate-1' : 'scale-100 rotate-0'
                }`}></div>

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg sm:text-xl md:text-xl font-bold text-teal-900 group-hover:text-teal-800 transition-colors line-clamp-2 leading-tight">
                      {course.title}
                    </h3>
                  </div>
                  
                  <p className="text-sm sm:text-base text-teal-700 leading-relaxed mb-3 sm:mb-4 line-clamp-3">
                    {course.description}
                  </p>

                  {/* Course Meta Information */}
                  <div className="flex items-center justify-between mb-4 text-sm text-teal-600">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{course.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <BookOpen className="w-4 h-4" />
                      <span>{course.provider}</span>
                    </div>
                  </div>

                  {/* View Course Button - Responsive */}
                  <Button
                    className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white
                               rounded-lg sm:rounded-xl
                               py-2 sm:py-2.5 md:py-3
                               text-sm sm:text-base
                               font-medium transform transition-all duration-300
                               shadow-lg shadow-teal-500/20 hover:shadow-xl hover:shadow-teal-500/30
                               group-hover:scale-105 flex items-center justify-center gap-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCourseClick(course.url, course.title, course.provider);
                    }}
                  >
                    <span>View Course</span>
                    <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                  </Button>
                </div>
              </CardContent>
            </Card>
            ))}
          </div>
        ) : (
          <div className={`text-center py-8 sm:py-12 md:py-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 border border-teal-200/50 shadow-xl max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl mx-auto mx-4 sm:mx-6 md:mx-8 lg:mx-auto">
              <BookOpen className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-teal-600 mx-auto mb-4 sm:mb-5 md:mb-6" />
              <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-teal-900 mb-3 sm:mb-4 md:mb-5 leading-tight">
                No Courses Available Yet
              </h3>
              <p className="text-sm sm:text-base md:text-lg text-teal-700 mb-4 sm:mb-5 md:mb-6 leading-relaxed px-2 sm:px-4 md:px-0">
                We're working on adding amazing courses for you. Check back soon or contact us for updates!
              </p>
              <Button
                className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white
                           px-4 sm:px-5 md:px-6 lg:px-8
                           py-2.5 sm:py-3 md:py-3.5 lg:py-4
                           rounded-lg sm:rounded-xl md:rounded-2xl
                           text-sm sm:text-base md:text-lg
                           font-medium transform hover:scale-105 transition-all duration-300
                           w-full sm:w-auto max-w-xs sm:max-w-sm mx-auto
                           shadow-lg hover:shadow-xl"
                onClick={() => {
                  const element = document.querySelector('#contact');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Contact Us for Updates
              </Button>
            </div>
          </div>
        )}

        {/* Call to Action Section - Enhanced Responsive Design */}
        <div className={`mt-12 sm:mt-16 md:mt-20 text-center transition-all duration-1000 delay-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div
            className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 border border-teal-200/50 shadow-xl transform hover:scale-105 transition-all duration-300 mx-4 sm:mx-6 md:mx-8 lg:mx-auto max-w-4xl"
            style={{
              transform: `perspective(1000px) rotateX(${mousePosition.y * 0.01}deg) rotateY(${mousePosition.x * 0.01}deg) scale(1.05)`
            }}
          >
            {/* Responsive Title */}
            <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-teal-900 mb-3 sm:mb-4 md:mb-6 leading-tight">
              Ready to Start Learning?
            </h3>

            {/* Responsive Description */}
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-teal-700 mb-6 sm:mb-8 md:mb-10 max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl mx-auto leading-relaxed px-2 sm:px-4 md:px-0">
              Explore more courses and take your skills to the next level with our curated selection.
            </p>

            {/* Responsive Button */}
            <Button
              className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white
                         px-4 sm:px-6 md:px-8 lg:px-10
                         py-2.5 sm:py-3 md:py-4 lg:py-5
                         rounded-xl sm:rounded-2xl
                         text-sm sm:text-base md:text-lg lg:text-xl
                         font-medium transform hover:scale-105 transition-all duration-300
                         shadow-lg sm:shadow-xl shadow-teal-500/20 hover:shadow-2xl hover:shadow-teal-500/30
                         w-full sm:w-auto max-w-xs sm:max-w-sm md:max-w-md mx-auto
                         flex items-center justify-center gap-2"
              onClick={() => {
                const element = document.querySelector('#contact');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              <span className="truncate">Get Course Recommendations</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
            </Button>

            {/* Additional responsive spacing for mobile */}
            <div className="mt-4 sm:mt-6 md:mt-8 lg:mt-10">
              <p className="text-xs sm:text-sm text-teal-600/80 italic">
                Personalized recommendations based on your goals
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default Courses;
