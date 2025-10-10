import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { Card, CardContent } from './ui/card';

// Default process data as fallback
const defaultProcess = [
  { 
    step: 1, 
    title: 'Discovery', 
    description: 'Understanding your brand, goals, and target audience through comprehensive research and analysis.' 
  },
  { 
    step: 2, 
    title: 'Strategy', 
    description: 'Developing a tailored strategy and roadmap that aligns with your business objectives.' 
  },
  { 
    step: 3, 
    title: 'Design', 
    description: 'Creating wireframes, mockups, and interactive prototypes that bring your vision to life.' 
  },
  { 
    step: 4, 
    title: 'Development', 
    description: 'Building your solution with clean, scalable code and modern technologies.' 
  },
  { 
    step: 5, 
    title: 'Testing', 
    description: 'Rigorous testing across devices, browsers, and scenarios to ensure quality.' 
  },
  { 
    step: 6, 
    title: 'Launch', 
    description: 'Deploying your project and providing ongoing support and maintenance.' 
  }
];

const OurProcess = ({ data, mousePosition }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredStep, setHoveredStep] = useState(null);
  const sectionRef = useRef(null);

  // Use provided data or fallback to default process
  const processData = data && data.length > 0 ? data : defaultProcess;

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
    <section id="process" ref={sectionRef} className="py-24 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute w-32 h-32 bg-gradient-to-br from-teal-200/10 to-cyan-200/10 rounded-full blur-2xl"
            style={{
              left: `${20 + (i * 30)}%`,
              top: `${10 + (i * 20)}%`,
              animation: `float ${4 + i * 0.5}s ease-in-out infinite`
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-4xl md:text-5xl font-bold text-teal-900 mb-6">
            Our Process
          </h2>
          <p className="text-xl text-teal-700 max-w-3xl mx-auto leading-relaxed">
            We follow a proven methodology to ensure your project's success from concept to completion.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full mx-auto mt-6"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {processData.map((process, index) => (
            <div
              key={process.step}
              className={`group relative transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ 
                transitionDelay: `${index * 150}ms`
              }}
              onMouseEnter={() => setHoveredStep(process.step)}
              onMouseLeave={() => setHoveredStep(null)}
            >
              <Card 
                className="h-full relative overflow-hidden cursor-pointer"
                style={{
                  background: 'linear-gradient(145deg, #f8f9fa, #e9ecef)',
                  boxShadow: hoveredStep === process.step 
                    ? '12px 12px 24px #d1d5db, -12px -12px 24px #ffffff' 
                    : '8px 8px 16px #d1d5db, -8px -8px 16px #ffffff',
                  borderRadius: '16px'
                }}
              >
                {/* Step Number */}
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center shadow-lg z-10">
                  <span className="text-white font-bold text-lg">{process.step}</span>
                </div>

                {/* Subtle background decoration */}
                <div className={`absolute top-4 right-4 w-16 h-16 bg-teal-100/30 rounded-full transition-opacity duration-300 ${
                  hoveredStep === process.step ? 'opacity-100' : 'opacity-50'
                }`}></div>

                <CardContent className="p-8 pt-12">
                  <div className="flex items-center mb-4">
                    <CheckCircle className="w-6 h-6 text-teal-500 mr-3" />
                    <h3 className="text-xl font-bold text-teal-900">{process.title}</h3>
                  </div>
                  
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {process.description}
                  </p>

                  {/* Arrow indicator for next step */}
                  {index < processData.length - 1 && (
                    <div className={`flex justify-center transition-opacity duration-300 ${
                      hoveredStep === process.step ? 'opacity-100' : 'opacity-50'
                    }`}>
                      <ArrowRight className="w-5 h-5 text-teal-500" />
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Process Flow Visualization */}
        <div className={`mt-16 transition-all duration-1000 delay-800 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-teal-900 mb-6 text-center">
              From Idea to Reality
            </h3>
            <div className="flex items-center justify-between">
              {processData.slice(0, 6).map((process, index) => (
                <div key={process.step} className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {process.step}
                  </div>
                  {index < Math.min(processData.length - 1, 5) && (
                    <div className="w-8 h-0.5 bg-gradient-to-r from-teal-500 to-cyan-500 mx-2"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurProcess;
