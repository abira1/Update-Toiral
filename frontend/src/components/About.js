import React, { useState, useEffect, useRef } from 'react';
import { Heart, Target, Eye, Layers } from 'lucide-react';

const About = ({ data, mousePosition }) => {
  const [isVisible, setIsVisible] = useState(false);
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
    <section id="about" ref={sectionRef} className="py-24 relative overflow-hidden">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" 
             style={{
               backgroundImage: `repeating-linear-gradient(45deg, #0f766e 0px, #0f766e 1px, transparent 1px, transparent 20px)`
             }} 
        />
      </div>

      {/* 3D Interactive Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-gradient-to-br from-teal-400/10 to-cyan-500/10 rounded-3xl backdrop-blur-sm border border-teal-200/20"
            style={{
              width: `${60 + i * 10}px`,
              height: `${60 + i * 10}px`,
              left: `${10 + i * 15}%`,
              top: `${20 + i * 10}%`,
              transform: `perspective(1000px) rotateX(${mousePosition.y * (0.05 + i * 0.01)}deg) rotateY(${mousePosition.x * (0.05 + i * 0.01)}deg) translate(${mousePosition.x * (0.02 + i * 0.01)}px, ${mousePosition.y * (0.02 + i * 0.01)}px)`,
              transition: 'transform 0.6s ease-out',
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
            {data?.title || "Storytelling Through Design"}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className={`space-y-8 transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
          }`}>
            <div className="prose prose-lg text-teal-700">
              <p className="text-xl leading-relaxed mb-6">
                {data?.description || "At Toiral, we bring together creativity, technology, and strategy to design websites that are not only visually stunning but also highly functional and user-friendly."}
              </p>
              <p className="text-lg leading-relaxed">
                {data?.mission || "We dive deep into the client's theme, art, and inspiration — then transform it into a website that feels authentic, immersive, and engaging."}
              </p>
            </div>

            {/* Enhanced Mission Cards */}
            <div className="space-y-6">
              <div 
                className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-teal-200/50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                style={{
                  transform: `perspective(1000px) rotateX(${mousePosition.y * 0.02}deg) rotateY(${mousePosition.x * 0.02}deg) translateY(-8px)`
                }}
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-md transform hover:rotate-12 transition-transform duration-300">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-teal-900 mb-2">Our Passion</h3>
                    <p className="text-teal-700">Storytelling through design, creating authentic digital experiences.</p>
                  </div>
                </div>
              </div>

              <div 
                className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-teal-200/50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                style={{
                  transform: `perspective(1000px) rotateX(${mousePosition.y * 0.02}deg) rotateY(${mousePosition.x * 0.02}deg) translateY(-8px)`
                }}
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-xl flex items-center justify-center shadow-md transform hover:rotate-12 transition-transform duration-300">
                    <Eye className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-teal-900 mb-2">Our Vision</h3>
                    <p className="text-teal-700">{data?.vision || "To become world-renowned for our dedication, artistic approach, and loyalty."}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Right Visual Elements */}
          <div className={`relative transition-all duration-1000 delay-500 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          }`}>
            <div className="relative">
              {/* Enhanced Main 3D Card */}
              <div 
                className="bg-gradient-to-br from-white/80 to-teal-50/80 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-teal-200/50 transition-all duration-500 overflow-hidden"
                style={{
                  transform: `perspective(1000px) rotateX(${3 + mousePosition.y * 0.08}deg) rotateY(${3 + mousePosition.x * 0.08}deg) translate(${mousePosition.x * 0.05}px, ${mousePosition.y * 0.05}px)`,
                }}
              >
                <div className="space-y-6">
                  <div className="text-center">
                    <div 
                      className="w-20 h-20 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg transform hover:rotate-12 transition-transform duration-300"
                      style={{
                        transform: `perspective(1000px) rotateX(${mousePosition.y * 0.1}deg) rotateY(${mousePosition.x * 0.1}deg)`
                      }}
                    >
                      <Target className="w-10 h-10 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-teal-900">Creative Process</h3>
                  </div>
                  
                  <div className="space-y-4">
                    {['Imagine', 'Develop', 'Deploy'].map((step, index) => (
                      <div 
                        key={step} 
                        className="flex items-center space-x-3 transform hover:translate-x-2 transition-transform duration-300"
                        style={{
                          transform: `perspective(1000px) rotateY(${mousePosition.x * 0.02}deg) translateX(${mousePosition.x * 0.01}px)`,
                          transitionDelay: `${index * 100}ms`
                        }}
                      >
                        <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-cyan-400 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md">
                          {index + 1}
                        </div>
                        <span className="text-teal-800 font-medium">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Enhanced Floating Elements */}
              <div 
                className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-cyan-200/60 to-teal-200/60 rounded-2xl backdrop-blur-sm border border-teal-200/50 shadow-lg transition-all duration-500"
                style={{
                  transform: `perspective(1000px) rotateX(${-12 + mousePosition.y * 0.1}deg) rotateY(${-12 + mousePosition.x * 0.1}deg) translate(${mousePosition.x * 0.08}px, ${mousePosition.y * 0.08}px)`
                }}
              >
                <div className="w-full h-full flex items-center justify-center">
                  <Layers className="w-8 h-8 text-teal-600" />
                </div>
              </div>
              
              <div 
                className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-teal-200/60 to-cyan-200/60 rounded-xl backdrop-blur-sm border border-cyan-200/50 shadow-lg transition-all duration-500"
                style={{
                  transform: `perspective(1000px) rotateX(${12 + mousePosition.y * 0.1}deg) rotateY(${12 + mousePosition.x * 0.1}deg) translate(${mousePosition.x * -0.08}px, ${mousePosition.y * -0.08}px)`
                }}
              ></div>
            </div>
          </div>
        </div>

        {/* Enhanced Stats Section */}
        <div className={`mt-24 grid md:grid-cols-3 gap-8 transition-all duration-1000 delay-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          {[
            { number: '50+', label: 'Projects Completed', icon: '🎨' },
            { number: '25+', label: 'Happy Clients', icon: '😊' },
            { number: '5+', label: 'Years Experience', icon: '⭐' }
          ].map((stat, index) => (
            <div 
              key={index} 
              className="text-center bg-white/50 backdrop-blur-sm rounded-2xl p-8 border border-teal-200/50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-4"
              style={{
                transform: `perspective(1000px) rotateX(${mousePosition.y * 0.02}deg) rotateY(${mousePosition.x * 0.02}deg) translateY(-16px)`,
                transitionDelay: `${index * 100}ms`
              }}
            >
              <div className="text-6xl mb-4">{stat.icon}</div>
              <div className="text-4xl font-bold text-teal-900 mb-2">{stat.number}</div>
              <div className="text-teal-700 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(180deg); }
        }
      `}</style>
    </section>
  );
};

export default About;