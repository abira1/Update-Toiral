import React, { useEffect, useState } from 'react';
import { ArrowRight, Sparkles, Code, Palette, Rocket } from 'lucide-react';
import { Button } from './ui/button';
import { HeroImage } from './ui/LazyImage';

const Hero = ({ data, mousePosition }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Enhanced Animated Background Elements */}
      <div className="absolute inset-0">
        <div 
          className="absolute w-96 h-96 bg-gradient-to-br from-teal-200/30 to-cyan-200/30 rounded-full blur-3xl transition-transform duration-1000"
          style={{
            transform: `translate(${mousePosition.x * 0.15}px, ${mousePosition.y * 0.15}px) rotate(${mousePosition.x * 0.1}deg)`,
            left: '10%',
            top: '20%'
          }}
        />
        <div 
          className="absolute w-80 h-80 bg-gradient-to-br from-cyan-200/20 to-teal-200/20 rounded-full blur-3xl transition-transform duration-1000"
          style={{
            transform: `translate(${mousePosition.x * -0.1}px, ${mousePosition.y * -0.1}px) rotate(${-mousePosition.x * 0.1}deg)`,
            right: '10%',
            bottom: '20%'
          }}
        />
      </div>

      {/* Enhanced 3D Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className={`absolute bg-gradient-to-br from-teal-400/30 to-cyan-500/30 rounded-full backdrop-blur-sm border border-teal-300/20 shadow-lg`}
            style={{
              width: `${12 + Math.random() * 8}px`,
              height: `${12 + Math.random() * 8}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              transform: `perspective(1000px) rotateX(${mousePosition.y * (0.1 + i * 0.02)}deg) rotateY(${mousePosition.x * (0.1 + i * 0.02)}deg) translate(${mousePosition.x * (0.02 + i * 0.01)}px, ${mousePosition.y * (0.02 + i * 0.01)}px)`,
              transition: 'transform 0.6s ease-out',
              animationDelay: `${i * 0.3}s`,
              animation: `float ${3 + Math.random() * 2}s ease-in-out infinite`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        {/* Main Content */}
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-3 mb-8 border border-teal-200/50 shadow-lg">
            <Sparkles className="w-5 h-5 text-teal-600" />
            <span className="text-teal-800 font-medium">Crafting Digital Experiences</span>
          </div>

          {/* Enhanced Logo Display - Super Responsive */}
          <div
            className="mb-6 sm:mb-8 transform transition-transform duration-500 px-4"
            style={{
              transform: `perspective(1000px) rotateX(${mousePosition.y * 0.05}deg) rotateY(${mousePosition.x * 0.05}deg) scale(${1 + mousePosition.x * 0.0005})`
            }}
          >
            <img
              src="https://i.postimg.cc/G2yPfwK1/toiral__2_.png"
              alt="Toiral - Professional Web Development & Design Agency - Imagine, Develop, Deploy"
              className="mx-auto w-auto max-w-[280px] sm:max-w-[320px] md:max-w-[360px] lg:max-w-[400px] h-auto max-h-[80px] sm:max-h-[100px] md:max-h-[120px] lg:max-h-[140px] filter drop-shadow-2xl hover:scale-105 transition-transform duration-300"
              loading="eager"
            />
          </div>

          {/* Subtitle - Imagine•Develop•Deploy */}
          <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-teal-700 mb-6 sm:mb-8 font-light tracking-wide px-4">
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4">
              <span
                className="inline-block hover:text-teal-900 transition-all duration-300 transform hover:scale-105"
                style={{
                  animationDelay: '0s',
                  transform: `perspective(1000px) rotateX(${mousePosition.y * 0.02}deg) translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`
                }}
              >
                Imagine
              </span>
              <span className="text-teal-500 text-sm sm:text-base md:text-lg">•</span>
              <span
                className="inline-block hover:text-teal-900 transition-all duration-300 transform hover:scale-105"
                style={{
                  animationDelay: '0.2s',
                  transform: `perspective(1000px) rotateX(${mousePosition.y * 0.02}deg) translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`
                }}
              >
                Develop
              </span>
              <span className="text-teal-500 text-sm sm:text-base md:text-lg">•</span>
              <span
                className="inline-block hover:text-teal-900 transition-all duration-300 transform hover:scale-105"
                style={{
                  animationDelay: '0.4s',
                  transform: `perspective(1000px) rotateX(${mousePosition.y * 0.02}deg) translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`
                }}
              >
                Deploy
              </span>
            </div>
          </div>

          <p className="text-xl text-teal-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            {data?.description || "We don't just build websites — we craft digital experiences that truly reflect the soul of a brand."}
          </p>

          <div className="space-y-6">
            <Button
              onClick={scrollToContact}
              className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white px-8 py-4 rounded-2xl text-lg font-medium transform transition-all duration-300 shadow-xl shadow-teal-500/20 hover:shadow-2xl hover:shadow-teal-500/30 hover:scale-105 group"
              style={{
                transform: `perspective(1000px) rotateX(${mousePosition.y * 0.02}deg) rotateY(${mousePosition.x * 0.02}deg) scale(1.05)`
              }}
            >
              {data?.cta || "Start Your Journey"}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>

        {/* Enhanced 3D Cards Floating Around */}
        <div className="absolute inset-0 pointer-events-none">
          <div 
            className="absolute top-1/4 left-8 w-40 h-32 bg-white/15 backdrop-blur-sm rounded-2xl border border-teal-200/30 shadow-xl overflow-hidden"
            style={{
              transform: `perspective(1000px) rotateX(${12 + mousePosition.y * 0.1}deg) rotateY(${12 + mousePosition.x * 0.1}deg) translate(${mousePosition.x * 0.08}px, ${mousePosition.y * 0.08}px)`,
              transition: 'transform 0.4s ease-out'
            }}
          >
            <div className="p-4 h-full flex flex-col items-center justify-center">
              <Palette className="w-8 h-8 text-teal-600 mb-2" />
              <span className="text-teal-700 font-medium text-sm">Design</span>
            </div>
          </div>
          
          <div 
            className="absolute top-1/3 right-8 w-40 h-32 bg-white/15 backdrop-blur-sm rounded-2xl border border-cyan-200/30 shadow-xl overflow-hidden"
            style={{
              transform: `perspective(1000px) rotateX(${-12 + mousePosition.y * 0.1}deg) rotateY(${-12 + mousePosition.x * 0.1}deg) translate(${mousePosition.x * -0.08}px, ${mousePosition.y * -0.08}px)`,
              transition: 'transform 0.4s ease-out'
            }}
          >
            <div className="p-4 h-full flex flex-col items-center justify-center">
              <Code className="w-8 h-8 text-cyan-600 mb-2" />
              <span className="text-cyan-700 font-medium text-sm">Develop</span>
            </div>
          </div>

          <div 
            className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 w-40 h-32 bg-white/15 backdrop-blur-sm rounded-2xl border border-teal-200/30 shadow-xl overflow-hidden"
            style={{
              transform: `translate(-50%, 0) perspective(1000px) rotateX(${6 + mousePosition.y * 0.1}deg) rotateY(${6 + mousePosition.x * 0.1}deg) translate(${mousePosition.x * 0.06}px, ${mousePosition.y * 0.06}px)`,
              transition: 'transform 0.4s ease-out'
            }}
          >
            <div className="p-4 h-full flex flex-col items-center justify-center">
              <Rocket className="w-8 h-8 text-teal-600 mb-2" />
              <span className="text-teal-700 font-medium text-sm">Deploy</span>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div 
          className="w-6 h-10 border-2 border-teal-400 rounded-full flex justify-center shadow-lg"
          style={{
            transform: `perspective(1000px) rotateX(${mousePosition.y * 0.05}deg)`
          }}
        >
          <div className="w-1 h-3 bg-gradient-to-b from-teal-400 to-cyan-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
      `}</style>
    </section>
  );
};

export default Hero;