import React, { useState, useEffect, useRef } from 'react';
import { ExternalLink, FolderOpen, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import LazyImage from './ui/LazyImage';

const Projects = ({ data, mousePosition }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredProject, setHoveredProject] = useState(null);

  const sectionRef = useRef(null);
  const navigate = useNavigate();

  // Show only first 3 projects for featured section
  const featuredProjects = data ? data.slice(0, 3) : [];
  const hasMoreProjects = data && data.length > 3;


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



  return (
    <section id="projects" ref={sectionRef} className="py-24 relative overflow-hidden">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" 
             style={{
               backgroundImage: `radial-gradient(circle at 20% 80%, #0f766e 0px, transparent 50%), radial-gradient(circle at 80% 20%, #0891b2 0px, transparent 50%)`
             }} 
        />
      </div>

      {/* Enhanced 3D Interactive Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-gradient-to-br from-teal-400/8 to-cyan-500/8 backdrop-blur-sm border border-teal-200/20"
            style={{
              width: `${30 + i * 6}px`,
              height: `${30 + i * 6}px`,
              borderRadius: i % 3 === 0 ? '50%' : i % 3 === 1 ? '25%' : '15%',
              left: `${5 + (i * 8)}%`,
              top: `${10 + (i * 7)}%`,
              transform: `perspective(1000px) rotateX(${mousePosition.y * (0.03 + i * 0.01)}deg) rotateY(${mousePosition.x * (0.03 + i * 0.01)}deg) translate(${mousePosition.x * (0.015 + i * 0.003)}px, ${mousePosition.y * (0.015 + i * 0.003)}px)`,
              transition: 'transform 0.4s ease-out',
              animation: `float ${2.5 + i * 0.2}s ease-in-out infinite`
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-5xl md:text-6xl font-bold text-teal-900 mb-6">
            Featured Projects
          </h2>
          <p className="text-xl text-teal-700 max-w-3xl mx-auto leading-relaxed">
            Discover how we've transformed brands through innovative design and development, creating digital experiences that tell compelling stories.
            {hasMoreProjects && (
              <span className="block mt-2 text-lg text-teal-600 font-medium">
                Showing 3 of {data.length} amazing projects
              </span>
            )}
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full mx-auto mt-6"></div>
        </div>

        {featuredProjects && featuredProjects.length > 0 ? (
          <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
            {featuredProjects.map((project, index) => {
            
            return (
              <Card
                key={project.id}
                className={`group bg-white/90 backdrop-blur-sm border-teal-200/50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer overflow-hidden ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{
                  transitionDelay: `${index * 200}ms`
                }}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
                onClick={() => {
                  if (project.url && project.url !== '#') {
                    window.open(project.url, '_blank', 'noopener,noreferrer');
                  }
                }}
              >
                {/* Optimized Image Container with Lazy Loading */}
                <div className="relative overflow-hidden h-64 bg-gradient-to-br from-teal-100 to-cyan-100">
                  <LazyImage
                    src={project.image}
                    alt={project.title}
                    className={`w-full h-full object-cover transition-all duration-300 ${
                      hoveredProject === project.id ? 'scale-110' : 'scale-100'
                    }`}
                    threshold={0.1}
                    rootMargin="100px"
                  />

                  {/* Simple Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/50 to-transparent transition-opacity duration-300 ${
                    hoveredProject === project.id ? 'opacity-100' : 'opacity-0'
                  }`}>
                    {/* View Project Button */}
                    <div className="absolute bottom-4 right-4">
                      <div className="bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2 flex items-center space-x-2 shadow-lg">
                        <ExternalLink className="w-4 h-4 text-teal-600" />
                        <span className="text-teal-900 text-sm font-medium">View Project</span>
                      </div>
                    </div>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white border-none shadow-md">
                      {project.category || 'Web Development'}
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-6 relative">
                  {/* Enhanced Background Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br from-teal-50/50 to-cyan-50/50 transform transition-transform duration-500 ${
                    hoveredProject === project.id ? 'scale-105 rotate-1' : 'scale-100 rotate-0'
                  }`}></div>

                  <div className="relative z-10">
                    <div className="mb-3">
                      <h3 className="text-2xl font-bold text-teal-900 group-hover:text-teal-800 transition-colors">
                        {project.title}
                      </h3>
                    </div>
                    
                    <p className="text-teal-700 leading-relaxed mb-6">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {(project.technologies || ['React', 'JavaScript', 'CSS']).map((tech, techIndex) => (
                        <Badge
                          key={techIndex}
                          variant="outline"
                          className="border-teal-300 text-teal-700 hover:bg-teal-100 transition-colors"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>

                    <Button
                      className="w-full bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white rounded-xl transition-colors duration-300"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (project.url && project.url !== '#') {
                          window.open(project.url, '_blank', 'noopener,noreferrer');
                        }
                      }}
                    >
                      View Project
                      <ExternalLink className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
            })}
          </div>
        ) : (
          <div className={`text-center py-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-3xl p-12 border border-teal-200/50 shadow-xl max-w-2xl mx-auto">
              <FolderOpen className="w-16 h-16 text-teal-600 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-teal-900 mb-4">
                No Projects Available Yet
              </h3>
              <p className="text-teal-700 mb-6">
                We're working on showcasing our amazing projects. Check back soon or contact us to discuss your project!
              </p>
              <Button
                className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white px-6 py-3 rounded-xl"
                onClick={() => {
                  const element = document.querySelector('#contact');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Discuss Your Project
              </Button>
            </div>
          </div>
        )}

        {/* Enhanced View All Projects CTA */}
        <div className={`text-center mt-16 transition-all duration-1000 delay-600 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div 
            className="bg-white/70 backdrop-blur-sm rounded-3xl p-10 border border-teal-200/50 shadow-xl transform hover:scale-105 transition-all duration-300"
            style={{
              transform: `perspective(1000px) rotateX(${mousePosition.y * 0.02}deg) rotateY(${mousePosition.x * 0.02}deg) scale(1.05)`
            }}
          >
            <div className="flex items-center justify-center space-x-8 mb-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-teal-900">50+</div>
                <div className="text-teal-700">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-teal-900">98%</div>
                <div className="text-teal-700">Client Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-teal-900">5★</div>
                <div className="text-teal-700">Average Rating</div>
              </div>
            </div>
            
            <h3 className="text-2xl font-bold text-teal-900 mb-4">
              Want to See More Amazing Work?
            </h3>
            <p className="text-teal-700 mb-6 max-w-2xl mx-auto">
              Explore our complete portfolio and discover how we can bring your vision to life with cutting-edge design and development.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => navigate('/portfolio')}
                className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white px-8 py-3 rounded-2xl font-medium transform hover:scale-105 transition-all duration-300 shadow-lg shadow-teal-500/20"
              >
                View Full Portfolio
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                variant="outline"
                className="border-teal-300 text-teal-700 hover:bg-teal-100 px-8 py-3 rounded-2xl font-medium transform hover:scale-105 transition-all duration-300"
                onClick={() => {
                  const element = document.querySelector('#contact');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Start Your Project
              </Button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-12px) rotate(180deg); }
        }
      `}</style>
    </section>
  );
};

export default Projects;