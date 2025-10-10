import React, { useState, useEffect } from 'react';
import { ArrowLeft, FileText, Users, CreditCard, Shield, AlertTriangle, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const TermsOfService = () => {
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
                <FileText className="w-8 h-8 text-white" />
              </div>
            </div>
            
            <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent mb-4">
              Terms of Service
            </h1>
            <p className="text-gray-600 text-lg">
              Please read these terms carefully before using our services.
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          {/* Content */}
          <div className="bg-white rounded-2xl shadow-xl p-8 space-y-8">
            
            {/* Acceptance of Terms */}
            <section>
              <div className="flex items-center mb-4">
                <FileText className="w-6 h-6 text-teal-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Acceptance of Terms</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p>By accessing and using Toiral's website and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.</p>
                <p>These Terms of Service ("Terms") govern your use of our website located at toiral-development.web.app (the "Service") operated by Toiral ("us", "we", or "our").</p>
              </div>
            </section>

            {/* Services Description */}
            <section>
              <div className="flex items-center mb-4">
                <Users className="w-6 h-6 text-teal-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Our Services</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p>Toiral provides web development and digital services including:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Custom website design and development</li>
                  <li>Web application development</li>
                  <li>E-commerce solutions</li>
                  <li>SEO and digital marketing services</li>
                  <li>Website maintenance and support</li>
                  <li>Consulting and technical advisory services</li>
                </ul>
                <p>All services are provided subject to these Terms and any additional agreements we may enter into with you.</p>
              </div>
            </section>

            {/* User Responsibilities */}
            <section>
              <div className="flex items-center mb-4">
                <Shield className="w-6 h-6 text-teal-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">User Responsibilities</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p>When using our services, you agree to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Provide accurate and complete information</li>
                  <li>Maintain the confidentiality of your account credentials</li>
                  <li>Use our services only for lawful purposes</li>
                  <li>Respect intellectual property rights</li>
                  <li>Not interfere with or disrupt our services</li>
                  <li>Comply with all applicable laws and regulations</li>
                </ul>
                
                <h3 className="text-lg font-semibold text-gray-800 mt-6">Prohibited Uses</h3>
                <p>You may not use our services to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Violate any laws or regulations</li>
                  <li>Infringe on intellectual property rights</li>
                  <li>Transmit harmful or malicious content</li>
                  <li>Engage in fraudulent or deceptive practices</li>
                  <li>Spam or send unsolicited communications</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                </ul>
              </div>
            </section>

            {/* Payment Terms */}
            <section>
              <div className="flex items-center mb-4">
                <CreditCard className="w-6 h-6 text-teal-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Payment Terms</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <h3 className="text-lg font-semibold text-gray-800">Pricing and Payments</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>All prices are quoted in USD unless otherwise specified</li>
                  <li>Payment terms will be specified in individual project agreements</li>
                  <li>We typically require a deposit before starting work</li>
                  <li>Final payment is due upon project completion</li>
                  <li>Late payments may incur additional fees</li>
                </ul>
                
                <h3 className="text-lg font-semibold text-gray-800 mt-6">Refunds</h3>
                <p>Refund policies vary by service type and will be specified in your project agreement. Generally:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Deposits are non-refundable once work has commenced</li>
                  <li>Refunds for completed work are not typically provided</li>
                  <li>Disputes will be handled on a case-by-case basis</li>
                </ul>
              </div>
            </section>

            {/* Intellectual Property */}
            <section>
              <div className="flex items-center mb-4">
                <Shield className="w-6 h-6 text-teal-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Intellectual Property</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <h3 className="text-lg font-semibold text-gray-800">Our Rights</h3>
                <p>Toiral retains ownership of:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Our proprietary tools, frameworks, and methodologies</li>
                  <li>Pre-existing intellectual property</li>
                  <li>General knowledge and experience gained</li>
                </ul>
                
                <h3 className="text-lg font-semibold text-gray-800 mt-6">Your Rights</h3>
                <p>Upon full payment, you will own:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Custom code developed specifically for your project</li>
                  <li>Design assets created for your brand</li>
                  <li>Content you provide or we create on your behalf</li>
                </ul>
                
                <p className="text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
                  <strong>Note:</strong> Third-party components, libraries, and tools remain subject to their respective licenses.
                </p>
              </div>
            </section>

            {/* Project Delivery */}
            <section>
              <div className="flex items-center mb-4">
                <FileText className="w-6 h-6 text-teal-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Project Delivery and Timelines</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p>Project timelines and deliverables will be specified in individual project agreements. Please note:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Timelines are estimates and may be subject to change</li>
                  <li>Delays caused by client feedback or changes may extend timelines</li>
                  <li>We will communicate any potential delays promptly</li>
                  <li>Final delivery is contingent upon full payment</li>
                </ul>
                
                <h3 className="text-lg font-semibold text-gray-800 mt-6">Revisions and Changes</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Minor revisions are typically included in project scope</li>
                  <li>Major changes may require additional time and cost</li>
                  <li>Change requests should be submitted in writing</li>
                  <li>We will provide estimates for additional work</li>
                </ul>
              </div>
            </section>

            {/* Warranties and Disclaimers */}
            <section>
              <div className="flex items-center mb-4">
                <AlertTriangle className="w-6 h-6 text-teal-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Warranties and Disclaimers</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <h3 className="text-lg font-semibold text-gray-800">Our Warranties</h3>
                <p>We warrant that our services will be performed with professional skill and care. We will:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Deliver services that meet agreed specifications</li>
                  <li>Use industry-standard practices and technologies</li>
                  <li>Provide reasonable support during development</li>
                </ul>
                
                <h3 className="text-lg font-semibold text-gray-800 mt-6">Disclaimers</h3>
                <p>Except as expressly stated, our services are provided "as is" without warranties of any kind. We disclaim:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Warranties of merchantability or fitness for a particular purpose</li>
                  <li>Guarantees of specific business results or outcomes</li>
                  <li>Responsibility for third-party services or components</li>
                  <li>Liability for data loss or security breaches beyond our control</li>
                </ul>
              </div>
            </section>

            {/* Limitation of Liability */}
            <section>
              <div className="flex items-center mb-4">
                <Shield className="w-6 h-6 text-teal-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Limitation of Liability</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p>To the maximum extent permitted by law, Toiral's liability is limited as follows:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Our total liability shall not exceed the amount paid for the specific service</li>
                  <li>We are not liable for indirect, incidental, or consequential damages</li>
                  <li>We are not responsible for loss of profits, data, or business opportunities</li>
                  <li>Claims must be brought within one year of the incident</li>
                </ul>
                <p className="text-sm text-gray-600 bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
                  <strong>Important:</strong> Some jurisdictions do not allow limitation of liability, so these limitations may not apply to you.
                </p>
              </div>
            </section>

            {/* Termination */}
            <section>
              <div className="flex items-center mb-4">
                <AlertTriangle className="w-6 h-6 text-teal-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Termination</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p>Either party may terminate services under the following conditions:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>With written notice as specified in project agreements</li>
                  <li>Immediately for material breach of these Terms</li>
                  <li>For non-payment of fees when due</li>
                </ul>
                
                <h3 className="text-lg font-semibold text-gray-800 mt-6">Effect of Termination</h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>You remain liable for all fees incurred before termination</li>
                  <li>We will deliver completed work upon payment</li>
                  <li>Confidentiality obligations survive termination</li>
                  <li>We may retain copies of work for our records</li>
                </ul>
              </div>
            </section>

            {/* Governing Law */}
            <section>
              <div className="flex items-center mb-4">
                <FileText className="w-6 h-6 text-teal-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Governing Law</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p>These Terms are governed by the laws of Bangladesh. Any disputes will be resolved through:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Good faith negotiation between the parties</li>
                  <li>Mediation if negotiation fails</li>
                  <li>Arbitration or court proceedings in Dhaka, Bangladesh</li>
                </ul>
              </div>
            </section>

            {/* Changes to Terms */}
            <section>
              <div className="flex items-center mb-4">
                <FileText className="w-6 h-6 text-teal-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Changes to Terms</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p>We reserve the right to modify these Terms at any time. We will notify you of changes by:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Posting updated Terms on our website</li>
                  <li>Updating the "Last updated" date</li>
                  <li>Sending email notifications for material changes</li>
                </ul>
                <p>Your continued use of our services after changes become effective constitutes acceptance of the updated Terms.</p>
              </div>
            </section>

            {/* Contact Information */}
            <section className="bg-teal-50 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <Mail className="w-6 h-6 text-teal-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Contact Us</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p>If you have questions about these Terms of Service, please contact us:</p>
                <div className="space-y-2">
                  <p><strong>Email:</strong> <a href="mailto:legal@toiral.com" className="text-teal-600 hover:underline">legal@toiral.com</a></p>
                  <p><strong>Phone:</strong> <a href="tel:+8801804673095" className="text-teal-600 hover:underline">+880 1804 673095</a></p>
                  <p><strong>Address:</strong> Dhaka, Bangladesh</p>
                </div>
                <p className="text-sm text-gray-600">
                  We will respond to your inquiry within 5 business days.
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

export default TermsOfService;
