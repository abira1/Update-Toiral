import React, { useState, useEffect, useRef } from 'react';
import {
  Linkedin,
  Twitter,
  Mail,
  Users,
  Github,
  Instagram,
  Facebook,
  Youtube,
  MessageCircle,
  Globe,
  Palette,
  Camera,
  Edit3
} from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import LazyImage from './ui/LazyImage';

const Team = ({ data, mousePosition }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredMember, setHoveredMember] = useState(null);
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

  return (
    <section id="team" ref={sectionRef} className="py-24 relative overflow-hidden">
      {/* Enhanced Background Decorations */}
      <div className="absolute inset-0">
        <div 
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-teal-200/20 to-cyan-200/20 rounded-full blur-3xl"
          style={{
            transform: `perspective(1000px) rotateX(${mousePosition.y * 0.03}deg) rotateY(${mousePosition.x * 0.03}deg) translate(${mousePosition.x * 0.05}px, ${mousePosition.y * 0.05}px)`
          }}
        ></div>
        <div 
          className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-to-br from-cyan-200/20 to-teal-200/20 rounded-full blur-3xl"
          style={{
            transform: `perspective(1000px) rotateX(${mousePosition.y * -0.03}deg) rotateY(${mousePosition.x * -0.03}deg) translate(${mousePosition.x * -0.05}px, ${mousePosition.y * -0.05}px)`
          }}
        ></div>
      </div>

      {/* 3D Interactive Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-gradient-to-br from-teal-400/8 to-cyan-500/8 rounded-2xl backdrop-blur-sm border border-teal-200/20"
            style={{
              width: `${30 + i * 6}px`,
              height: `${30 + i * 6}px`,
              left: `${20 + i * 15}%`,
              top: `${10 + i * 15}%`,
              transform: `perspective(1000px) rotateX(${mousePosition.y * (0.03 + i * 0.01)}deg) rotateY(${mousePosition.x * (0.03 + i * 0.01)}deg) translate(${mousePosition.x * (0.01 + i * 0.005)}px, ${mousePosition.y * (0.01 + i * 0.005)}px)`,
              transition: 'transform 0.4s ease-out',
              animation: `float ${4 + i * 0.5}s ease-in-out infinite`
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-5xl md:text-6xl font-bold text-teal-900 mb-6">
            Meet Our Team
          </h2>
          <p className="text-xl text-teal-700 max-w-3xl mx-auto leading-relaxed">
            The creative minds behind Toiral, dedicated to crafting exceptional digital experiences through collaboration and innovation.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full mx-auto mt-6"></div>
        </div>

        {data && data.length > 0 ? (
          <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-2 sm:gap-4 md:gap-6 lg:gap-8">
            {data.map((member, index) => (
            <Card
              key={member.id}
              className={`group bg-white/80 backdrop-blur-sm border-teal-200/50 shadow-lg hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-2 md:hover:-translate-y-8 cursor-pointer overflow-hidden ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ 
                transitionDelay: `${index * 200}ms`,
                transform: `perspective(1000px) rotateX(${mousePosition.y * 0.02}deg) rotateY(${mousePosition.x * 0.02}deg) translateY(-32px)`
              }}
              onMouseEnter={() => setHoveredMember(member.id)}
              onMouseLeave={() => setHoveredMember(null)}
            >
              <div className="relative">
                {/* Enhanced Avatar Container with 3D Effect */}
                <div className="relative h-32 sm:h-48 md:h-64 lg:h-80 bg-gradient-to-br from-teal-100 to-cyan-100 overflow-hidden">
                  <LazyImage
                    src={member.avatar}
                    alt={member.name}
                    className={`w-full h-full object-cover transition-all duration-700 ${
                      hoveredMember === member.id ? 'scale-110' : 'scale-100'
                    }`}
                    threshold={0.1}
                    rootMargin="50px"
                  />
                  
                  {/* Enhanced Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-teal-900/40 via-transparent to-transparent transition-opacity duration-300 ${
                    hoveredMember === member.id ? 'opacity-100' : 'opacity-0'
                  }`}></div>

                  {/* Enhanced Social Links Overlay */}
                  <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
                    hoveredMember === member.id ? 'opacity-100' : 'opacity-0'
                  }`}>
                    <div className="flex flex-wrap justify-center gap-1 sm:gap-2 max-w-[90%] sm:max-w-xs px-1 sm:px-0">
                      {/* LinkedIn */}
                      {member.linkedin && (
                        <div
                          className="w-7 h-7 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-all duration-300 cursor-pointer group"
                          style={{
                            transform: `perspective(1000px) rotateX(${mousePosition.y * 0.1}deg) rotateY(${mousePosition.x * 0.1}deg) scale(1.1)`
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(member.linkedin, '_blank', 'noopener,noreferrer');
                          }}
                          title="LinkedIn Profile"
                        >
                          <Linkedin className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-teal-600 group-hover:text-blue-600 transition-colors" />
                        </div>
                      )}

                      {/* Twitter */}
                      {member.twitter && (
                        <div
                          className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-all duration-300 cursor-pointer group"
                          style={{
                            transform: `perspective(1000px) rotateX(${mousePosition.y * 0.1}deg) rotateY(${mousePosition.x * 0.1}deg) scale(1.1)`
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(member.twitter, '_blank', 'noopener,noreferrer');
                          }}
                          title="Twitter Profile"
                        >
                          <Twitter className="w-5 h-5 text-teal-600 group-hover:text-blue-400 transition-colors" />
                        </div>
                      )}

                      {/* GitHub */}
                      {member.github && (
                        <div
                          className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-all duration-300 cursor-pointer group"
                          style={{
                            transform: `perspective(1000px) rotateX(${mousePosition.y * 0.1}deg) rotateY(${mousePosition.x * 0.1}deg) scale(1.1)`
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(member.github, '_blank', 'noopener,noreferrer');
                          }}
                          title="GitHub Profile"
                        >
                          <Github className="w-5 h-5 text-teal-600 group-hover:text-gray-800 transition-colors" />
                        </div>
                      )}

                      {/* Instagram */}
                      {member.instagram && (
                        <div
                          className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-all duration-300 cursor-pointer group"
                          style={{
                            transform: `perspective(1000px) rotateX(${mousePosition.y * 0.1}deg) rotateY(${mousePosition.x * 0.1}deg) scale(1.1)`
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(member.instagram, '_blank', 'noopener,noreferrer');
                          }}
                          title="Instagram Profile"
                        >
                          <Instagram className="w-5 h-5 text-teal-600 group-hover:text-pink-500 transition-colors" />
                        </div>
                      )}

                      {/* Facebook */}
                      {member.facebook && (
                        <div
                          className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-all duration-300 cursor-pointer group"
                          style={{
                            transform: `perspective(1000px) rotateX(${mousePosition.y * 0.1}deg) rotateY(${mousePosition.x * 0.1}deg) scale(1.1)`
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(member.facebook, '_blank', 'noopener,noreferrer');
                          }}
                          title="Facebook Profile"
                        >
                          <Facebook className="w-5 h-5 text-teal-600 group-hover:text-blue-700 transition-colors" />
                        </div>
                      )}

                      {/* YouTube */}
                      {member.youtube && (
                        <div
                          className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-all duration-300 cursor-pointer group"
                          style={{
                            transform: `perspective(1000px) rotateX(${mousePosition.y * 0.1}deg) rotateY(${mousePosition.x * 0.1}deg) scale(1.1)`
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(member.youtube, '_blank', 'noopener,noreferrer');
                          }}
                          title="YouTube Channel"
                        >
                          <Youtube className="w-5 h-5 text-teal-600 group-hover:text-red-600 transition-colors" />
                        </div>
                      )}

                      {/* TikTok */}
                      {member.tiktok && (
                        <div
                          className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-all duration-300 cursor-pointer group"
                          style={{
                            transform: `perspective(1000px) rotateX(${mousePosition.y * 0.1}deg) rotateY(${mousePosition.x * 0.1}deg) scale(1.1)`
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(member.tiktok, '_blank', 'noopener,noreferrer');
                          }}
                          title="TikTok Profile"
                        >
                          <Camera className="w-5 h-5 text-teal-600 group-hover:text-black transition-colors" />
                        </div>
                      )}

                      {/* Behance */}
                      {member.behance && (
                        <div
                          className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-all duration-300 cursor-pointer group"
                          style={{
                            transform: `perspective(1000px) rotateX(${mousePosition.y * 0.1}deg) rotateY(${mousePosition.x * 0.1}deg) scale(1.1)`
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(member.behance, '_blank', 'noopener,noreferrer');
                          }}
                          title="Behance Portfolio"
                        >
                          <Palette className="w-5 h-5 text-teal-600 group-hover:text-blue-500 transition-colors" />
                        </div>
                      )}

                      {/* Dribbble */}
                      {member.dribbble && (
                        <div
                          className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-all duration-300 cursor-pointer group"
                          style={{
                            transform: `perspective(1000px) rotateX(${mousePosition.y * 0.1}deg) rotateY(${mousePosition.x * 0.1}deg) scale(1.1)`
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(member.dribbble, '_blank', 'noopener,noreferrer');
                          }}
                          title="Dribbble Profile"
                        >
                          <div className="w-5 h-5 bg-teal-600 group-hover:bg-pink-500 rounded-full transition-colors"></div>
                        </div>
                      )}

                      {/* Medium */}
                      {member.medium && (
                        <div
                          className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-all duration-300 cursor-pointer group"
                          style={{
                            transform: `perspective(1000px) rotateX(${mousePosition.y * 0.1}deg) rotateY(${mousePosition.x * 0.1}deg) scale(1.1)`
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(member.medium, '_blank', 'noopener,noreferrer');
                          }}
                          title="Medium Profile"
                        >
                          <Edit3 className="w-5 h-5 text-teal-600 group-hover:text-green-600 transition-colors" />
                        </div>
                      )}

                      {/* Discord */}
                      {member.discord && (
                        <div
                          className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-all duration-300 cursor-pointer group"
                          style={{
                            transform: `perspective(1000px) rotateX(${mousePosition.y * 0.1}deg) rotateY(${mousePosition.x * 0.1}deg) scale(1.1)`
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            // Handle Discord differently - could be username or invite link
                            if (member.discord.startsWith('http')) {
                              window.open(member.discord, '_blank', 'noopener,noreferrer');
                            } else {
                              navigator.clipboard.writeText(member.discord);
                              // You could add a toast notification here
                            }
                          }}
                          title={member.discord.startsWith('http') ? "Join Discord Server" : `Discord: ${member.discord} (Click to copy)`}
                        >
                          <MessageCircle className="w-5 h-5 text-teal-600 group-hover:text-indigo-600 transition-colors" />
                        </div>
                      )}

                      {/* Website */}
                      {member.website && (
                        <div
                          className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-all duration-300 cursor-pointer group"
                          style={{
                            transform: `perspective(1000px) rotateX(${mousePosition.y * 0.1}deg) rotateY(${mousePosition.x * 0.1}deg) scale(1.1)`
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(member.website, '_blank', 'noopener,noreferrer');
                          }}
                          title="Personal Website"
                        >
                          <Globe className="w-5 h-5 text-teal-600 group-hover:text-purple-600 transition-colors" />
                        </div>
                      )}

                      {/* Email */}
                      {member.email && (
                        <div
                          className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-all duration-300 cursor-pointer group"
                          style={{
                            transform: `perspective(1000px) rotateX(${mousePosition.y * 0.1}deg) rotateY(${mousePosition.x * 0.1}deg) scale(1.1)`
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(`mailto:${member.email}`, '_self');
                          }}
                          title="Send Email"
                        >
                          <Mail className="w-5 h-5 text-teal-600 group-hover:text-red-500 transition-colors" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Enhanced 3D Floating Elements */}
                  <div className={`absolute top-4 right-4 w-6 h-6 bg-gradient-to-br from-cyan-300/60 to-teal-300/60 rounded-full transform transition-all duration-500 ${
                    hoveredMember === member.id ? 'scale-150 -translate-y-2 translate-x-2' : 'scale-100'
                  }`}></div>
                  <div className={`absolute bottom-4 left-4 w-4 h-4 bg-gradient-to-br from-teal-300/60 to-cyan-300/60 rounded-full transform transition-all duration-500 ${
                    hoveredMember === member.id ? 'scale-125 translate-y-2 -translate-x-2' : 'scale-100'
                  }`}></div>
                </div>

                <CardContent className="p-6 relative">
                  {/* Enhanced Background Effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br from-teal-50/50 to-cyan-50/50 transform transition-transform duration-500 ${
                    hoveredMember === member.id ? 'scale-105 rotate-1' : 'scale-100 rotate-0'
                  }`}></div>

                  <div className="relative z-10 text-center">
                    <h3 className="text-2xl font-bold text-teal-900 mb-2">
                      {member.name}
                    </h3>
                    
                    <div 
                      className="inline-block bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-4 py-1 rounded-full text-sm font-medium mb-4 transform hover:scale-105 transition-transform"
                      style={{
                        transform: `perspective(1000px) rotateY(${mousePosition.x * 0.05}deg) scale(1.05)`
                      }}
                    >
                      {member.role}
                    </div>
                    
                    <p className="text-teal-700 leading-relaxed">
                      {member.description}
                    </p>
                  </div>

                  {/* Enhanced Decorative Elements */}
                  <div className={`absolute top-2 right-2 w-3 h-3 bg-gradient-to-br from-cyan-300/50 to-teal-300/50 rounded-full transform transition-all duration-500 ${
                    hoveredMember === member.id ? 'scale-150 -translate-y-1 translate-x-1' : 'scale-100'
                  }`}></div>
                  <div className={`absolute bottom-2 left-2 w-2 h-2 bg-gradient-to-br from-teal-300/50 to-cyan-300/50 rounded-full transform transition-all duration-500 ${
                    hoveredMember === member.id ? 'scale-125 translate-y-1 -translate-x-1' : 'scale-100'
                  }`}></div>
                </CardContent>
              </div>
            </Card>
            ))}
          </div>
        ) : (
          <div className={`text-center py-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-3xl p-12 border border-teal-200/50 shadow-xl max-w-2xl mx-auto">
              <Users className="w-16 h-16 text-teal-600 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-teal-900 mb-4">
                Our Team is Growing
              </h3>
              <p className="text-teal-700 mb-6">
                We're building an amazing team of talented professionals. Stay tuned to meet our incredible team members!
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
                Join Our Team
              </Button>
            </div>
          </div>
        )}

        {/* Enhanced Team Quote */}
        <div className={`mt-16 text-center transition-all duration-1000 delay-600 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div 
            className="bg-gradient-to-r from-teal-400/20 to-cyan-500/20 backdrop-blur-sm rounded-3xl p-12 border border-teal-200/50 shadow-xl transform hover:scale-105 transition-all duration-300"
            style={{
              transform: `perspective(1000px) rotateX(${mousePosition.y * 0.02}deg) rotateY(${mousePosition.x * 0.02}deg) scale(1.05)`
            }}
          >
            <blockquote className="text-2xl md:text-3xl font-light text-teal-800 italic mb-6 leading-relaxed">
              "We're not just a team — we're creative partners dedicated to transforming your vision into digital reality."
            </blockquote>
            <div className="w-16 h-1 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full mx-auto"></div>
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

export default Team;