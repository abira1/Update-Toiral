import React, { useEffect, useRef, useState, memo } from "react";
import { motion } from "framer-motion";
import { Code, Search, Settings, Layers, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Icon mapping for existing services
const iconMap = {
  Code,
  Search,
  Settings,
  Layers
};

// Generate URL-friendly slug from service title
const generateSlug = (title) => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

// Default services data as fallback
const defaultServices = [
  {
    id: 1,
    title: "Web Design & Development",
    description: "Custom websites that tell your brand's unique story with stunning visuals and seamless functionality.",
    icon: "Code",
    features: ["Responsive Design", "Custom Development", "Performance Optimization"]
  },
  {
    id: 2,
    title: "SEO Services",
    description: "Strategic optimization to help your brand reach and connect with your target audience.",
    icon: "Search",
    features: ["Keyword Research", "Technical SEO", "Content Strategy"]
  },
  {
    id: 3,
    title: "Admin Panels",
    description: "Intuitive management systems that put you in control of your digital presence.",
    icon: "Settings",
    features: ["User Management", "Content Management", "Analytics Dashboard"]
  },
  {
    id: 4,
    title: "Full-Stack Solutions",
    description: "End-to-end development from concept to deployment, tailored to your business needs.",
    icon: "Layers",
    features: ["Frontend Development", "Backend Architecture", "Database Design"]
  }
];

// Floating particle background component
const FloatingParticles = memo(() => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const particles = [];

    for (let i = 0; i < 30; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }

    let animationFrameId;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(6, 182, 212, ${particle.opacity})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.4 }}
    />
  );
});
FloatingParticles.displayName = "FloatingParticles";

// Geometric shapes background
const GeometricShapes = memo(() => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute w-32 h-32 border border-cyan-400/20 rounded-lg"
        style={{ top: "10%", left: "5%" }}
        animate={{
          rotate: [0, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <motion.div
        className="absolute w-24 h-24 border border-teal-400/20 rounded-full"
        style={{ top: "60%", right: "10%" }}
        animate={{
          y: [0, -20, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute w-20 h-20 bg-gradient-to-br from-cyan-500/10 to-teal-500/10 rounded-lg"
        style={{ bottom: "15%", left: "15%" }}
        animate={{
          rotate: [0, -360],
          x: [0, 10, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
});
GeometricShapes.displayName = "GeometricShapes";

const ServiceCard = memo(({ service, index, onLearnMore }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);
  const IconComponent = iconMap[service.icon] || Code;

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e) => {
      if (!isHovered) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty("--mouse-x", `${x}px`);
      card.style.setProperty("--mouse-y", `${y}px`);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isHovered]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group cursor-pointer"
      onClick={() => onLearnMore(service)}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 via-teal-500/20 to-blue-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <div className="relative bg-white/95 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden h-full">
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(6, 182, 212, 0.1), transparent 40%)`,
          }}
        />

        <motion.div
          className="relative z-10 h-full flex flex-col"
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-600 flex items-center justify-center text-white shadow-lg group-hover:shadow-cyan-500/50 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
              <IconComponent className="w-7 h-7" />
            </div>
            <div className={`transition-all duration-300 ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'}`}>
              <div className="w-8 h-8 flex items-center justify-center rounded-full bg-teal-100">
                <ArrowRight className="w-4 h-4 text-teal-600" />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-grow mb-6">
            <h3 className="text-xl sm:text-2xl font-bold text-teal-900 mb-4 leading-tight">
              {service.title}
            </h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              {service.description}
            </p>

            {/* Features */}
            <div className="space-y-3">
              <h4 className="font-semibold text-teal-800 text-sm">Key Features:</h4>
              <div className="space-y-2">
                {service.features.map((feature, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 + idx * 0.1 }}
                    className="flex items-start gap-3 group/feature hover:translate-x-1 transition-transform duration-200"
                  >
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-500 to-teal-500 mt-2 flex-shrink-0 shadow-lg shadow-cyan-500/50" />
                    <span className="text-gray-700 text-sm">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              onLearnMore(service);
            }}
            className="w-full py-3 px-6 bg-gradient-to-r from-cyan-500 to-teal-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl hover:shadow-cyan-500/50 transition-all duration-300 relative overflow-hidden group/button"
          >
            <span className="relative z-10 flex items-center justify-center space-x-2">
              <span>Learn More</span>
              <ArrowRight className="w-4 h-4" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-cyan-500 opacity-0 group-hover/button:opacity-100 transition-opacity duration-300" />
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
});
ServiceCard.displayName = "ServiceCard";

const EnhancedServices = ({ data, mousePosition }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const navigate = useNavigate();

  // Use provided data or fallback to default services
  const servicesData = data && data.length > 0 ? data : defaultServices;

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

  const handleLearnMore = (service) => {
    // Generate slug from service title or use service ID
    const slug = service.title ? generateSlug(service.title) : `service-${service.id}`;
    console.log('Navigating to service:', service);
    console.log('Generated slug:', slug);
    navigate(`/service/${slug}`, { state: { serviceData: service } });
  };

  return (
    <section 
      id="services" 
      ref={sectionRef} 
      className="min-h-screen bg-gradient-to-br from-white via-cyan-50/30 to-teal-50/40 relative overflow-hidden py-16 sm:py-20 lg:py-24 px-4"
    >
      <FloatingParticles />
      <GeometricShapes />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 lg:mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-teal-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent mb-4 lg:mb-6">
            Our Services
          </h2>
          <p className="text-gray-600 text-base sm:text-lg lg:text-xl max-w-3xl mx-auto leading-relaxed">
            From concept to deployment, we provide comprehensive digital solutions tailored to your unique story.
          </p>
          <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full mx-auto mt-4 lg:mt-6"></div>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 mb-16 lg:mb-20">
          {servicesData.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
              onLearnMore={handleLearnMore}
            />
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl p-8 sm:p-10 lg:p-12 shadow-xl border border-gray-100 max-w-3xl mx-auto relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-50/50 to-teal-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative z-10">
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Ready to Transform Your Vision?
              </h3>
              <p className="text-base sm:text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Let's collaborate to create a digital experience that truly reflects your brand's story and drives results.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center space-x-3 bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-8 py-4 rounded-full text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl hover:shadow-cyan-500/50 transition-all duration-300 relative overflow-hidden group/cta"
                onClick={() => {
                  // Check if we're on the home page
                  if (window.location.pathname === '/') {
                    const element = document.querySelector('#contact');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  } else {
                    // Navigate to home page with contact hash
                    window.location.href = '/#contact';
                  }
                }}
              >
                <span className="relative z-10">Start Your Project</span>
                <ArrowRight className="w-5 h-5 relative z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-teal-600 opacity-0 group-hover/cta:opacity-100 transition-opacity duration-300" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default EnhancedServices;