import React, { useState, useEffect, useRef } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, MessageCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { useToast } from '../hooks/use-toast';
import { submitContactForm } from '../services/contactService';
import { trackContactSubmission } from '../services/analyticsService';
import { openWhatsAppWithContact, trackWhatsAppInteraction } from '../services/whatsappService';

const Contact = ({ data, mousePosition }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const sectionRef = useRef(null);
  const { toast } = useToast();

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

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Submit to Firebase first
      const result = await submitContactForm(formData);

      // Track the submission
      trackContactSubmission('form');

      // Show success message
      toast({
        title: "Message Sent Successfully!",
        description: "Redirecting to WhatsApp for instant communication...",
      });

      // Wait a moment for the toast to show, then redirect to WhatsApp
      setTimeout(() => {
        // Open WhatsApp with the form data
        openWhatsAppWithContact(formData);

        // Track WhatsApp interaction
        trackWhatsAppInteraction('contact', {
          subject: formData.subject,
          hasEmail: !!formData.email,
          source: 'form_submission'
        });

        // Clear form after WhatsApp opens
        setFormData({ name: '', email: '', subject: '', message: '' });
      }, 1500);

      console.log('Contact form submitted:', result);
    } catch (error) {
      console.error('Error submitting contact form:', error);

      // Show error message
      toast({
        title: "Submission Failed",
        description: error.message || "Please try again later.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };



  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: data?.email || 'toiral.dev@gmail.com',
      href: `mailto:${data?.email || 'toiral.dev@gmail.com'}`
    },
    {
      icon: Phone,
      label: 'WhatsApp',
      value: data?.phone || '+8801804673095',
      href: `https://wa.me/${data?.phone?.replace(/[^0-9]/g, '') || '8801804673095'}`
    },
    {
      icon: MapPin,
      label: 'Location',
      value: data?.address || 'GM Bari-Satarkul Road, Uttar Badda, Dhaka, Bangladesh',
      href: 'https://maps.google.com/?q=GM+Bari-Satarkul+Road,+Uttar+Badda,+Dhaka,+Bangladesh'
    }
  ];

  return (
    <section id="contact" ref={sectionRef} className="py-24 relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0">
        <div 
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-teal-200/20 to-cyan-200/20 rounded-full blur-3xl"
          style={{
            transform: `perspective(1000px) rotateX(${mousePosition.y * 0.03}deg) rotateY(${mousePosition.x * 0.03}deg) translate(${mousePosition.x * 0.05}px, ${mousePosition.y * 0.05}px)`
          }}
        ></div>
        <div 
          className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-br from-cyan-200/20 to-teal-200/20 rounded-full blur-3xl"
          style={{
            transform: `perspective(1000px) rotateX(${mousePosition.y * -0.03}deg) rotateY(${mousePosition.x * -0.03}deg) translate(${mousePosition.x * -0.05}px, ${mousePosition.y * -0.05}px)`
          }}
        ></div>
      </div>

      {/* 3D Interactive Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-gradient-to-br from-teal-400/8 to-cyan-500/8 rounded-2xl backdrop-blur-sm border border-teal-200/20"
            style={{
              width: `${25 + i * 5}px`,
              height: `${25 + i * 5}px`,
              left: `${15 + i * 12}%`,
              top: `${10 + i * 12}%`,
              transform: `perspective(1000px) rotateX(${mousePosition.y * (0.02 + i * 0.005)}deg) rotateY(${mousePosition.x * (0.02 + i * 0.005)}deg) translate(${mousePosition.x * (0.01 + i * 0.003)}px, ${mousePosition.y * (0.01 + i * 0.003)}px)`,
              transition: 'transform 0.5s ease-out',
              animation: `float ${5 + i * 0.3}s ease-in-out infinite`
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-5xl md:text-6xl font-bold text-teal-900 mb-6">
            {data?.title || "Let's Create Something Amazing"}
          </h2>
          <p className="text-xl text-teal-700 max-w-3xl mx-auto leading-relaxed">
            {data?.description || "Ready to transform your vision into a digital reality? We're here to help you tell your story."}
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full mx-auto mt-6"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Enhanced Contact Form */}
          <Card 
            className={`bg-white/80 backdrop-blur-sm border-teal-200/50 shadow-xl transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}
            style={{
              transform: `perspective(1000px) rotateX(${mousePosition.y * 0.02}deg) rotateY(${mousePosition.x * 0.02}deg)`
            }}
          >
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-teal-900 text-center">
                Send us a Message
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Input
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="bg-white/90 border-teal-200 focus:border-teal-500 focus:ring-teal-500 rounded-xl transition-all duration-300 hover:bg-white"
                    />
                  </div>
                  <div>
                    <Input
                      name="email"
                      type="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="bg-white/90 border-teal-200 focus:border-teal-500 focus:ring-teal-500 rounded-xl transition-all duration-300 hover:bg-white"
                    />
                  </div>
                </div>
                
                <Input
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="bg-white/90 border-teal-200 focus:border-teal-500 focus:ring-teal-500 rounded-xl transition-all duration-300 hover:bg-white"
                />
                
                <Textarea
                  name="message"
                  placeholder="Tell us about your project..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="bg-white/90 border-teal-200 focus:border-teal-500 focus:ring-teal-500 rounded-xl resize-none transition-all duration-300 hover:bg-white"
                />
                
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white py-3 rounded-xl font-medium transform hover:scale-105 transition-all duration-300 shadow-lg shadow-teal-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Sending...
                    </div>
                  ) : (
                    <>
                      Send Message
                      <Send className="ml-2 w-5 h-5" />
                    </>
                  )}
                </Button>

                {/* Info Text */}
                <div className="text-center text-sm text-gray-600 bg-teal-50 rounded-lg p-3">
                  <p className="flex items-center justify-center gap-2">
                    <MessageCircle className="w-4 h-4 text-teal-600" />
                    <span>Your message will be saved and you'll be redirected to WhatsApp for instant communication</span>
                  </p>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Enhanced Contact Information */}
          <div className={`space-y-8 transition-all duration-1000 delay-500 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          }`}>
            {contactInfo.map((info, index) => {
              const IconComponent = info.icon;
              return (
                <Card
                  key={index}
                  className="bg-white/80 backdrop-blur-sm border-teal-200/50 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group"
                  style={{
                    transform: `perspective(1000px) rotateX(${mousePosition.y * 0.02}deg) rotateY(${mousePosition.x * 0.02}deg) translateY(-8px)`,
                    transitionDelay: `${index * 100}ms`
                  }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <div 
                        className="w-14 h-14 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300"
                        style={{
                          transform: `perspective(1000px) rotateX(${mousePosition.y * 0.1}deg) rotateY(${mousePosition.x * 0.1}deg) scale(1.1)`
                        }}
                      >
                        <IconComponent className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-teal-900 mb-1">
                          {info.label}
                        </h3>
                        <p className="text-teal-700">
                          {info.value}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}

            {/* Enhanced Additional Info Card */}
            <Card 
              className="bg-gradient-to-br from-teal-400/20 to-cyan-500/20 backdrop-blur-sm border-teal-200/50 shadow-lg transform hover:scale-105 transition-all duration-300"
              style={{
                transform: `perspective(1000px) rotateX(${mousePosition.y * 0.02}deg) rotateY(${mousePosition.x * 0.02}deg) scale(1.05)`
              }}
            >
              <CardContent className="p-6">
                <div className="text-center">
                  <CheckCircle 
                    className="w-12 h-12 text-teal-600 mx-auto mb-4 transform hover:rotate-12 transition-transform duration-300"
                    style={{
                      transform: `perspective(1000px) rotateX(${mousePosition.y * 0.1}deg) rotateY(${mousePosition.x * 0.1}deg)`
                    }}
                  />
                  <h3 className="text-xl font-bold text-teal-900 mb-2">
                    Quick Response
                  </h3>
                  <p className="text-teal-700">
                    We typically respond to all inquiries within 24 hours. Let's start building something amazing together!
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(180deg); }
        }
      `}</style>
    </section>
  );
};

export default Contact;