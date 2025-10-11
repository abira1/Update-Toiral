import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Filter, Grid, List, ExternalLink, Github, Eye, Heart, Star, Calendar, User, Award, Zap, ArrowRight } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SEO from '../components/SEO';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { subscribeToWebsiteData } from '../services/dataService';
import { trackProjectInteraction, trackPageView } from '../services/analyticsService';
import { PortfolioPageSkeleton } from '../components/ui/SkeletonScreens';

const Portfolio = () => {
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTech, setSelectedTech] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [hoveredProject, setHoveredProject] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [visibleProjects, setVisibleProjects] = useState(9);
  const [portfolioData, setPortfolioData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsVisible(true);

    // Track page view
    trackPageView('Portfolio', 'Toiral - Portfolio');

    // Subscribe to real-time portfolio data from Firebase
    const unsubscribe = subscribeToWebsiteData((data) => {
      try {
        // Get projects from website data and sort by order
        const projects = data?.projects || [];
        const sortedProjects = Array.isArray(projects)
          ? [...projects].sort((a, b) => (a.order || 0) - (b.order || 0))
          : [];
        setPortfolioData(sortedProjects);
      } catch (error) {
        console.error('Error processing portfolio data:', error);
        setPortfolioData([]);
      } finally {
        setIsLoading(false);
      }
    });

    // Cleanup subscription on unmount
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []); // Empty dependency array to run only once

  useEffect(() => {
    // Global mouse tracking for 3D effects
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // portfolioData is now loaded from Firebase in useEffect







  const categories = [
    'all',
    'Restaurant & Hospitality',
    'E-commerce',
    'Corporate',
    'Healthcare',
    'Education',
    'FinTech',
    'Real Estate',
    'Travel & Tourism',
    'AI & Analytics'
  ];

  const technologies = [
    'all',
    'React',
    'Vue.js',
    'Angular',
    'Next.js',
    'Node.js',
    'Laravel',
    'Python',
    'MongoDB',
    'PostgreSQL'
  ];

  const filteredProjects = portfolioData.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (project.technologies || []).some(tech =>
                           tech.toLowerCase().includes(searchTerm.toLowerCase())
                         );
    const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
    const matchesTech = selectedTech === 'all' || (project.technologies || []).some(tech =>
      tech.toLowerCase().includes(selectedTech.toLowerCase())
    );

    return matchesSearch && matchesCategory && matchesTech;
  });

  const displayedProjects = filteredProjects.slice(0, visibleProjects);

  const loadMoreProjects = () => {
    setVisibleProjects(prev => Math.min(prev + 6, filteredProjects.length));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-cyan-50 relative overflow-hidden">
      {/* Global 3D Mouse Interactive Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-4 h-4 bg-gradient-to-br from-teal-400/15 to-cyan-500/15 rounded-full backdrop-blur-sm"
            style={{
              left: `${15 + (i * 7)}%`,
              top: `${8 + (i * 6)}%`,
              transform: `translate(${mousePosition.x * (0.015 + i * 0.003)}px, ${mousePosition.y * (0.015 + i * 0.003)}px) rotateX(${mousePosition.y * 0.08}deg) rotateY(${mousePosition.x * 0.08}deg)`,
              transition: 'transform 0.3s ease-out',
              animationDelay: `${i * 0.15}s`
            }}
          />
        ))}
      </div>

      <Header mousePosition={mousePosition} />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center mb-8">
            <Button
              onClick={() => navigate('/')}
              variant="outline"
              className="mr-4 border-teal-300 text-teal-700 hover:bg-teal-100"
            >
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back to Home
            </Button>
          </div>

          <div className={`text-center mb-12 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <h1 className="text-5xl md:text-6xl font-bold text-teal-900 mb-6">
              Our Complete Portfolio
            </h1>
            <p className="text-xl text-teal-700 max-w-3xl mx-auto leading-relaxed mb-8">
              Explore our comprehensive collection of digital experiences, each crafted with passion and precision to tell unique brand stories.
            </p>
            
            {/* Portfolio Stats */}
            <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
              {[
                { number: '50+', label: 'Projects Delivered', icon: Award },
                { number: '98%', label: 'Client Satisfaction', icon: Star },
                { number: '25+', label: 'Industries Served', icon: Zap },
                { number: '5★', label: 'Average Rating', icon: Heart }
              ].map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div 
                    key={index}
                    className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-teal-200/50 shadow-lg transform hover:scale-105 transition-all duration-300"
                    style={{
                      transform: `perspective(1000px) rotateX(${mousePosition.y * 0.02}deg) rotateY(${mousePosition.x * 0.02}deg) scale(1.05)`,
                      transitionDelay: `${index * 100}ms`
                    }}
                  >
                    <IconComponent className="w-8 h-8 text-teal-600 mx-auto mb-3" />
                    <div className="text-3xl font-bold text-teal-900 mb-1">{stat.number}</div>
                    <div className="text-teal-700 text-sm">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Enhanced Filters */}
          <div className={`mb-12 transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <Card className="bg-white/70 backdrop-blur-sm border-teal-200/50 shadow-lg">
              <CardContent className="p-6">
                <div className="grid md:grid-cols-4 gap-4 items-center">
                  {/* Search */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-teal-500" />
                    <Input
                      placeholder="Search projects..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-white/80 border-teal-200 focus:border-teal-500 rounded-xl"
                    />
                  </div>

                  {/* Category Filter */}
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="bg-white/80 border-teal-200 focus:border-teal-500 rounded-xl">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>
                          {category === 'all' ? 'All Categories' : category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {/* Technology Filter */}
                  <Select value={selectedTech} onValueChange={setSelectedTech}>
                    <SelectTrigger className="bg-white/80 border-teal-200 focus:border-teal-500 rounded-xl">
                      <SelectValue placeholder="Technology" />
                    </SelectTrigger>
                    <SelectContent>
                      {technologies.map(tech => (
                        <SelectItem key={tech} value={tech}>
                          {tech === 'all' ? 'All Technologies' : tech}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {/* View Toggle */}
                  <div className="flex space-x-2">
                    <Button
                      onClick={() => setViewMode('grid')}
                      variant={viewMode === 'grid' ? 'default' : 'outline'}
                      size="sm"
                      className={viewMode === 'grid' ? 'bg-teal-600 text-white' : 'border-teal-300 text-teal-700'}
                    >
                      <Grid className="w-4 h-4" />
                    </Button>
                    <Button
                      onClick={() => setViewMode('list')}
                      variant={viewMode === 'list' ? 'default' : 'outline'}
                      size="sm"
                      className={viewMode === 'list' ? 'bg-teal-600 text-white' : 'border-teal-300 text-teal-700'}
                    >
                      <List className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Results Count */}
                <div className="mt-4 text-teal-700">
                  Showing {displayedProjects.length} of {filteredProjects.length} projects
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Projects Grid/List */}
      <section className="pb-24">
        <div className="max-w-7xl mx-auto px-6">
          {isLoading ? (
            <PortfolioPageSkeleton />
          ) : portfolioData.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📁</div>
              <h3 className="text-2xl font-bold text-teal-900 mb-2">No projects available</h3>
              <p className="text-teal-700">Check back soon for new projects!</p>
            </div>
          ) : false ? (
            <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
              {[...Array(6)].map((_, index) => (
                <Card key={index} className="bg-white/85 backdrop-blur-sm border-teal-200/50 shadow-lg animate-pulse">
                  <div className="h-48 bg-teal-100 rounded-t-lg"></div>
                  <CardContent className="p-6">
                    <div className="h-4 bg-teal-100 rounded mb-2"></div>
                    <div className="h-3 bg-teal-100 rounded mb-4 w-3/4"></div>
                    <div className="flex gap-2 mb-4">
                      <div className="h-6 bg-teal-100 rounded w-16"></div>
                      <div className="h-6 bg-teal-100 rounded w-20"></div>
                    </div>
                    <div className="h-3 bg-teal-100 rounded mb-2"></div>
                    <div className="h-3 bg-teal-100 rounded w-2/3"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className={`${viewMode === 'grid' ? 'grid lg:grid-cols-3 md:grid-cols-2 gap-6' : 'space-y-6'}`}>
              {displayedProjects.map((project, index) => (
              <a
                key={project.id}
                href={project.url && project.url !== '#' ? project.url : undefined}
                target={project.url && project.url !== '#' ? '_blank' : undefined}
                rel={project.url && project.url !== '#' ? 'noopener noreferrer' : undefined}
                onClick={(e) => {
                  if (!project.url || project.url === '#') {
                    e.preventDefault();
                    setSelectedProject(selectedProject === project.id ? null : project.id);
                  } else {
                    trackProjectInteraction(project.id, project.title, 'click_live');
                  }
                }}
                className="block no-underline"
              >
                <Card
                  className={`group bg-white/85 backdrop-blur-sm border-teal-200/50 shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer overflow-hidden h-full flex flex-col ${
                    project.featured ? 'ring-2 ring-teal-400/50' : ''
                  } ${viewMode === 'list' ? 'md:flex-row' : ''}`}
                  style={{
                    minHeight: viewMode === 'grid' ? '450px' : 'auto',
                    transitionDelay: `${index * 80}ms`
                  }}
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  {/* Project Image */}
                  <div className={`relative overflow-hidden bg-gradient-to-br from-teal-100 to-cyan-100 flex-shrink-0 ${
                    viewMode === 'list' ? 'md:w-72 h-48 md:h-auto' : 'h-44'
                  }`}>
                    <img
                      src={project.image}
                      alt={project.title}
                      className={`w-full h-full object-cover transition-all duration-500 ${
                        hoveredProject === project.id ? 'scale-110 brightness-75' : 'scale-100 brightness-100'
                      }`}
                    />

                    {/* Mouse Glow Effect */}
                    <div 
                      className={`absolute inset-0 bg-gradient-to-br from-teal-400/30 via-cyan-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                    />

                    {/* Featured Badge */}
                    {project.featured && (
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-none shadow-md text-xs">
                          <Star className="w-3 h-3 mr-1" />
                          Featured
                        </Badge>
                      </div>
                    )}

                    {/* Category Badge */}
                    <div className={`absolute top-3 ${project.featured ? 'right-3' : 'left-3'}`}>
                      <Badge className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white border-none shadow-md text-xs">
                        {project.category}
                      </Badge>
                    </div>

                    {/* Hover Overlay */}
                    <div className={`absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/60 via-black/20 to-transparent transition-all duration-500 ${
                      hoveredProject === project.id ? 'opacity-100' : 'opacity-0'
                    }`}>
                      <div className="bg-white/95 backdrop-blur-sm rounded-full p-3 shadow-xl transform transition-all duration-300 group-hover:scale-110">
                        <ExternalLink className="w-5 h-5 text-teal-600" />
                      </div>
                    </div>
                  </div>

                  {/* Project Content */}
                  <CardContent className={`relative ${viewMode === 'list' ? 'flex-1' : ''} p-5 flex-grow flex flex-col`}>
                    {/* Interactive Background Effect */}
                    <div 
                      className={`absolute inset-0 bg-gradient-to-br from-teal-50/0 to-cyan-50/0 group-hover:from-teal-50/50 group-hover:to-cyan-50/50 transition-all duration-500 pointer-events-none`}
                    />

                    <div className="relative z-10 flex-grow flex flex-col">
                      <div className="flex items-start justify-between mb-2 flex-shrink-0">
                        <h3 className="text-lg font-bold text-teal-900 group-hover:text-teal-700 transition-colors line-clamp-2 pr-2">
                          {project.title}
                        </h3>
                        <div className="flex items-center space-x-0.5 flex-shrink-0">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center space-x-3 text-xs text-teal-600 mb-3 flex-shrink-0">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span>{new Date().getFullYear()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <User className="w-3 h-3" />
                          <span>{project.category || 'Web Development'}</span>
                        </div>
                      </div>

                      <p className="text-teal-700 leading-relaxed mb-3 text-sm line-clamp-3 flex-grow">
                        {project.description}
                      </p>

                      {/* Awards */}
                      {project.awards && project.awards.length > 0 && (
                        <div className="mb-3 flex-shrink-0">
                          <div className="flex flex-wrap gap-1">
                            {project.awards.slice(0, 2).map((award, awardIndex) => (
                              <Badge key={awardIndex} variant="outline" className="border-yellow-400 text-yellow-700 text-xs">
                                <Award className="w-3 h-3 mr-1" />
                                {award}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-1.5 mb-4 flex-shrink-0">
                        {(project.technologies || []).slice(0, 3).map((tech, techIndex) => (
                          <Badge
                            key={techIndex}
                            variant="outline"
                            className="border-teal-300 text-teal-700 hover:bg-teal-100 transition-colors text-xs px-2 py-0.5"
                          >
                            {tech}
                          </Badge>
                        ))}
                        {(project.technologies || []).length > 3 && (
                          <Badge variant="outline" className="border-teal-300 text-teal-700 text-xs px-2 py-0.5">
                            +{project.technologies.length - 3}
                          </Badge>
                        )}
                      </div>

                      {/* Expandable Details */}
                      {selectedProject === project.id && (
                        <div className="mt-3 p-3 bg-teal-50/50 rounded-xl border border-teal-200/30 mb-3 flex-shrink-0">
                          <div className="grid md:grid-cols-2 gap-3 mb-3">
                            <div>
                              <h4 className="font-semibold text-teal-800 mb-1 text-sm">Project Details:</h4>
                              <div className="text-teal-700 text-xs space-y-1">
                                <div>Category: {project.category || 'Web Development'}</div>
                                <div>Status: {project.status || 'Published'}</div>
                                <div>Featured: {project.featured ? 'Yes' : 'No'}</div>
                              </div>
                            </div>
                            <div>
                              <h4 className="font-semibold text-teal-800 mb-1 text-sm">All Technologies:</h4>
                              <div className="flex flex-wrap gap-1">
                                {(project.technologies || []).map((tech, techIndex) => (
                                  <Badge key={techIndex} variant="outline" className="border-teal-300 text-teal-700 text-xs">
                                    {tech}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                          
                          {project.testimonial && (
                            <div className="bg-white/50 rounded-lg p-3">
                              <h4 className="font-semibold text-teal-800 mb-1 text-sm">Client Testimonial:</h4>
                              <blockquote className="text-teal-700 italic text-xs mb-1">
                                "{project.testimonial.text}"
                              </blockquote>
                              <div className="text-teal-600 text-xs">
                                — {project.testimonial.author}, {project.testimonial.role}
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      <div className="mt-auto flex items-center justify-between text-teal-600 text-sm flex-shrink-0">
                        <span className="group-hover:text-teal-700 transition-colors font-medium">
                          {selectedProject === project.id ? 'View Live Project' : 'View Details'}
                        </span>
                        <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </a>
            ))}
            </div>
          )}

          {/* Load More Button */}
          {!isLoading && visibleProjects < filteredProjects.length && (
            <div className="text-center mt-12">
              <Button
                onClick={loadMoreProjects}
                className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white px-8 py-4 rounded-2xl text-lg font-medium transform hover:scale-105 transition-all duration-300 shadow-xl shadow-teal-500/20"
              >
                Load More Projects ({filteredProjects.length - visibleProjects} remaining)
              </Button>
            </div>
          )}

          {/* No Results */}
          {!isLoading && filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-teal-900 mb-2">No projects found</h3>
              <p className="text-teal-700 mb-6">Try adjusting your search filters</p>
              <Button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                  setSelectedTech('all');
                }}
                className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Portfolio;