import React, { useState, useEffect } from 'react';
import { ArrowLeft, Shield, Eye, Lock, Database, Users, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const PrivacyPolicy = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-cyan-50">
      <Header mousePosition={mousePosition} />
      
      <div className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          {/* Header Section */}
          <div className="text-center mb-12">
            <Link 
              to="/" 
              className="inline-flex items-center text-teal-600 hover:text-teal-700 transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
            
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl flex items-center justify-center">
                <Shield className="w-8 h-8 text-white" />
              </div>
            </div>
            
            <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent mb-4">
              Privacy Policy
            </h1>
            <p className="text-gray-600 text-lg">
              Your privacy is important to us. This policy explains how we collect, use, and protect your information.
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          {/* Content */}
          <div className="bg-white rounded-2xl shadow-xl p-8 space-y-8">
            
            {/* Information We Collect */}
            <section>
              <div className="flex items-center mb-4">
                <Database className="w-6 h-6 text-teal-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Information We Collect</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <h3 className="text-lg font-semibold text-gray-800">Personal Information</h3>
                <p>When you contact us or use our services, we may collect:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Name and contact information (email, phone number)</li>
                  <li>Company name and business information</li>
                  <li>Project requirements and preferences</li>
                  <li>Communication history and correspondence</li>
                </ul>
                
                <h3 className="text-lg font-semibold text-gray-800 mt-6">Technical Information</h3>
                <p>We automatically collect certain technical information:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>IP address and browser information</li>
                  <li>Device type and operating system</li>
                  <li>Website usage patterns and analytics</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>
              </div>
            </section>

            {/* How We Use Information */}
            <section>
              <div className="flex items-center mb-4">
                <Eye className="w-6 h-6 text-teal-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">How We Use Your Information</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p>We use the information we collect to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Provide and improve our web development services</li>
                  <li>Communicate with you about projects and inquiries</li>
                  <li>Send project updates and important notifications</li>
                  <li>Analyze website performance and user experience</li>
                  <li>Comply with legal obligations and protect our rights</li>
                  <li>Prevent fraud and ensure website security</li>
                </ul>
              </div>
            </section>

            {/* Information Sharing */}
            <section>
              <div className="flex items-center mb-4">
                <Users className="w-6 h-6 text-teal-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Information Sharing</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p>We do not sell, trade, or rent your personal information. We may share information only in these limited circumstances:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Service Providers:</strong> Trusted third-party services that help us operate our website and business</li>
                  <li><strong>Legal Requirements:</strong> When required by law or to protect our legal rights</li>
                  <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets</li>
                  <li><strong>Consent:</strong> When you explicitly consent to sharing your information</li>
                </ul>
              </div>
            </section>

            {/* Data Security */}
            <section>
              <div className="flex items-center mb-4">
                <Lock className="w-6 h-6 text-teal-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Data Security</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p>We implement appropriate security measures to protect your information:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>SSL encryption for data transmission</li>
                  <li>Secure cloud storage with access controls</li>
                  <li>Regular security audits and updates</li>
                  <li>Limited access to personal information</li>
                  <li>Employee training on data protection</li>
                </ul>
                <p className="text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
                  <strong>Note:</strong> While we strive to protect your information, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security.
                </p>
              </div>
            </section>

            {/* Your Rights */}
            <section>
              <div className="flex items-center mb-4">
                <Shield className="w-6 h-6 text-teal-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Your Rights</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p>You have the following rights regarding your personal information:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
                  <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
                  <li><strong>Deletion:</strong> Request deletion of your personal information</li>
                  <li><strong>Portability:</strong> Request transfer of your data to another service</li>
                  <li><strong>Objection:</strong> Object to certain uses of your information</li>
                  <li><strong>Withdrawal:</strong> Withdraw consent for data processing</li>
                </ul>
                <p>To exercise these rights, please contact us at <a href="mailto:privacy@toiral.com" className="text-teal-600 hover:underline">privacy@toiral.com</a></p>
              </div>
            </section>

            {/* Cookies */}
            <section>
              <div className="flex items-center mb-4">
                <Database className="w-6 h-6 text-teal-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Cookies and Tracking</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p>We use cookies and similar technologies to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Remember your preferences and settings</li>
                  <li>Analyze website traffic and performance</li>
                  <li>Provide personalized content and experiences</li>
                  <li>Enable social media features</li>
                </ul>
                <p>You can control cookies through your browser settings. For more information, see our <Link to="/cookies" className="text-teal-600 hover:underline">Cookie Policy</Link>.</p>
              </div>
            </section>

            {/* Third-Party Services */}
            <section>
              <div className="flex items-center mb-4">
                <Users className="w-6 h-6 text-teal-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Third-Party Services</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p>Our website may use third-party services including:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Google Analytics:</strong> For website analytics and performance monitoring</li>
                  <li><strong>Firebase:</strong> For data storage and website functionality</li>
                  <li><strong>Social Media Platforms:</strong> For social sharing and integration</li>
                  <li><strong>Email Services:</strong> For communication and newsletters</li>
                </ul>
                <p>These services have their own privacy policies and terms of use.</p>
              </div>
            </section>

            {/* International Transfers */}
            <section>
              <div className="flex items-center mb-4">
                <Database className="w-6 h-6 text-teal-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">International Data Transfers</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p>Your information may be transferred to and processed in countries other than Bangladesh. We ensure appropriate safeguards are in place to protect your data during international transfers.</p>
              </div>
            </section>

            {/* Data Retention */}
            <section>
              <div className="flex items-center mb-4">
                <Database className="w-6 h-6 text-teal-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Data Retention</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p>We retain your personal information only as long as necessary to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Provide our services and support</li>
                  <li>Comply with legal obligations</li>
                  <li>Resolve disputes and enforce agreements</li>
                  <li>Improve our services and user experience</li>
                </ul>
                <p>When information is no longer needed, we securely delete or anonymize it.</p>
              </div>
            </section>

            {/* Children's Privacy */}
            <section>
              <div className="flex items-center mb-4">
                <Shield className="w-6 h-6 text-teal-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Children's Privacy</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p>Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you believe we have collected information from a child under 13, please contact us immediately.</p>
              </div>
            </section>

            {/* Changes to Policy */}
            <section>
              <div className="flex items-center mb-4">
                <Eye className="w-6 h-6 text-teal-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Changes to This Policy</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p>We may update this Privacy Policy from time to time. We will notify you of any material changes by:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Posting the updated policy on our website</li>
                  <li>Updating the "Last updated" date</li>
                  <li>Sending email notifications for significant changes</li>
                </ul>
                <p>Your continued use of our services after changes become effective constitutes acceptance of the updated policy.</p>
              </div>
            </section>

            {/* Contact Information */}
            <section className="bg-teal-50 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <Mail className="w-6 h-6 text-teal-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Contact Us</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p>If you have questions about this Privacy Policy or our data practices, please contact us:</p>
                <div className="space-y-2">
                  <p><strong>Email:</strong> <a href="mailto:privacy@toiral.com" className="text-teal-600 hover:underline">privacy@toiral.com</a></p>
                  <p><strong>Phone:</strong> <a href="tel:+8801804673095" className="text-teal-600 hover:underline">+880 1804 673095</a></p>
                  <p><strong>Address:</strong> Dhaka, Bangladesh</p>
                </div>
                <p className="text-sm text-gray-600">
                  We will respond to your inquiry within 30 days.
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
