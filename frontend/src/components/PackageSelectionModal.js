import React, { useState, useEffect } from 'react';
import { X, Package, DollarSign, CheckCircle, MessageCircle, User, Building, Phone, Mail } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { useToast } from '../hooks/use-toast';
import { submitPackageInquiry } from '../services/contactService';
import { openWhatsAppWithPackage, trackWhatsAppInteraction } from '../services/whatsappService';

const PackageSelectionModal = ({ isOpen, onClose, packageData }) => {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    mobile: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const { toast } = useToast();

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setFormData({ name: '', company: '', mobile: '', email: '' });
      setErrors({});
    }
  }, [isOpen]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    // Mobile validation
    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!/^[\+]?[1-9][\d]{0,15}$/.test(formData.mobile.replace(/[\s\-\(\)]/g, ''))) {
      newErrors.mobile = 'Please enter a valid mobile number';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Please fix the errors",
        description: "Complete all required fields with valid information.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare user info for submission
      const userInfo = {
        name: formData.name.trim(),
        company: formData.company.trim() || null,
        mobile: formData.mobile.trim(),
        email: formData.email.trim().toLowerCase()
      };

      // Submit package inquiry to Firebase
      const result = await submitPackageInquiry(packageData, userInfo);

      // Track WhatsApp interaction
      trackWhatsAppInteraction('package', {
        packageName: packageData.name,
        packagePrice: packageData.price,
        packageFeatured: packageData.featured,
        source: 'package_modal',
        hasUserInfo: true
      });

      // Show success message
      toast({
        title: "Inquiry Submitted Successfully!",
        description: "Redirecting to WhatsApp for instant communication...",
      });

      // Wait a moment for the toast to show, then redirect to WhatsApp
      setTimeout(() => {
        // Open WhatsApp with package details and user info
        openWhatsAppWithPackage(packageData, userInfo);
        
        // Close modal
        onClose();
      }, 1500);

      console.log('Package inquiry submitted with user info:', result);
    } catch (error) {
      console.error('Error submitting package inquiry:', error);

      // Even if Firebase fails, still try to open WhatsApp
      try {
        const userInfo = {
          name: formData.name.trim(),
          company: formData.company.trim() || null,
          mobile: formData.mobile.trim(),
          email: formData.email.trim().toLowerCase()
        };
        
        openWhatsAppWithPackage(packageData, userInfo);
        
        toast({
          title: "Opening WhatsApp...",
          description: "Your inquiry has been prepared. Complete sending in WhatsApp.",
        });
        
        onClose();
      } catch (whatsappError) {
        toast({
          title: "Submission Failed",
          description: error.message || "Please try again later.",
          variant: "destructive"
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle backdrop click to close modal
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Don't render if not open or no package data
  if (!isOpen || !packageData) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center">
              <Package className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Package Inquiry</h2>
              <p className="text-gray-600">Get started with your selected package</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Selected Package Info */}
          <Card className="mb-6 bg-gradient-to-r from-teal-50 to-cyan-50 border-teal-200">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center justify-between text-teal-900">
                <span className="flex items-center space-x-2">
                  <DollarSign className="w-5 h-5" />
                  <span>Selected Package</span>
                </span>
                {packageData.featured && (
                  <Badge className="bg-teal-600 text-white">Featured</Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-teal-900">{packageData.name}</h3>
                  <span className="text-2xl font-bold text-teal-700">{packageData.price}</span>
                </div>
                <p className="text-teal-700">{packageData.description}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4">
                  {packageData.features.slice(0, 4).map((feature, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-teal-500 flex-shrink-0" />
                      <span className="text-sm text-teal-700">{feature}</span>
                    </div>
                  ))}
                  {packageData.features.length > 4 && (
                    <div className="text-sm text-teal-600 font-medium">
                      +{packageData.features.length - 4} more features
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="w-4 h-4 inline mr-1" />
                  Full Name *
                </label>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className={`${errors.name ? 'border-red-500' : 'border-gray-300'} focus:border-teal-500 focus:ring-teal-500`}
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
              </div>

              {/* Company Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Building className="w-4 h-4 inline mr-1" />
                  Company Name
                </label>
                <Input
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Enter company name (optional)"
                  className="border-gray-300 focus:border-teal-500 focus:ring-teal-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Mobile Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Phone className="w-4 h-4 inline mr-1" />
                  Mobile Number *
                </label>
                <Input
                  name="mobile"
                  type="tel"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="+1234567890"
                  className={`${errors.mobile ? 'border-red-500' : 'border-gray-300'} focus:border-teal-500 focus:ring-teal-500`}
                />
                {errors.mobile && <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>}
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail className="w-4 h-4 inline mr-1" />
                  Email Address *
                </label>
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  className={`${errors.email ? 'border-red-500' : 'border-gray-300'} focus:border-teal-500 focus:ring-teal-500`}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex flex-col space-y-3 pt-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 text-white py-3 rounded-xl font-medium transform hover:scale-105 transition-all duration-300 shadow-lg shadow-teal-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Submitting...
                  </div>
                ) : (
                  <>
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Submit & Continue to WhatsApp
                  </>
                )}
              </Button>
              
              {/* Info Text */}
              <div className="text-center text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
                <p className="flex items-center justify-center gap-2">
                  <MessageCircle className="w-4 h-4 text-teal-600" />
                  <span>Your inquiry will be saved and you'll be redirected to WhatsApp for instant communication</span>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PackageSelectionModal;
