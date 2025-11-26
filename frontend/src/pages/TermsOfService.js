import React, { useState, useEffect } from 'react';
import { ArrowLeft, FileText, Shield, AlertTriangle, Mail, Lock, Scale, DollarSign, Package, Users, Gavel } from 'lucide-react';
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

  // Security functions for signature protection
  const handleContextMenu = (e) => {
    e.preventDefault();
    return false;
  };

  const handleDragStart = (e) => {
    e.preventDefault();
    return false;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-cyan-50">
      {/* Additional CSS for signature protection */}
      <style>{`
        /* Prevent screenshot keyboard shortcuts */
        @media print {
          .signature-protected {
            display: none !important;
          }
        }
        
        /* Disable selection and copying */
        .signature-protected,
        .signature-protected * {
          -webkit-user-select: none !important;
          -moz-user-select: none !important;
          -ms-user-select: none !important;
          user-select: none !important;
          -webkit-touch-callout: none !important;
        }
        
        /* Prevent drag operations */
        .signature-protected img {
          -webkit-user-drag: none !important;
          -khtml-user-drag: none !important;
          -moz-user-drag: none !important;
          -o-user-drag: none !important;
          user-drag: none !important;
          pointer-events: none !important;
        }
        
        /* Prevent context menu */
        .signature-protected {
          -webkit-user-select: none;
          -webkit-touch-callout: none;
        }
      `}</style>
      
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
              Privacy Policy & Terms and Conditions
            </h1>
            <p className="text-gray-600 text-lg">
              Toiral Web Development Company
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          {/* Content */}
          <div className="bg-white rounded-2xl shadow-xl p-8 space-y-8">
            
            {/* 1. Privacy Policy */}
            <section>
              <div className="flex items-center mb-4">
                <Lock className="w-6 h-6 text-teal-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">1. Privacy Policy</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p>At Toiral Web Development Company, the privacy and confidentiality of our clients are of utmost importance.</p>
                
                <div className="space-y-3">
                  <p><strong className="text-gray-900">Client Information:</strong> We do not share or make public any project details, personal information, or related content of our clients under any circumstances.</p>
                  
                  <p><strong className="text-gray-900">Data Security:</strong> All project files, credentials, and communications are stored securely. Access is restricted to authorized personnel only.</p>
                  
                  <p><strong className="text-gray-900">Digital Compliance:</strong> We follow industry-standard security practices for data protection, encryption, and backup.</p>
                </div>
              </div>
            </section>

            {/* 2. Payment Policy */}
            <section>
              <div className="flex items-center mb-4">
                <DollarSign className="w-6 h-6 text-teal-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">2. Payment Policy</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p><strong className="text-gray-900">No Payment Without Agreement:</strong> Payments are accepted only after a signed agreement is in place.</p>
                
                <p><strong className="text-gray-900">Payment Confirmation:</strong> Once payment is received, a payment confirmation PDF is issued, watermarked with the Toiral official logo and signed by the founder.</p>
                
                <p><strong className="text-gray-900">Transparent Pricing:</strong> No hidden fees are applied. All payment breakdowns and deliverables are included in the final project summary.</p>
                
                <p><strong className="text-gray-900">Project Start & Changes:</strong> After the project begins, clients can request feature changes. These changes will be included in the next phase of the project as agreed.</p>
              </div>
            </section>

            {/* 3. Work Handover & Hosting */}
            <section>
              <div className="flex items-center mb-4">
                <Package className="w-6 h-6 text-teal-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">3. Work Handover & Hosting</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p><strong className="text-gray-900">Deliverables:</strong> All project files, source codes, credentials, and documentation are handed over after final payment confirmation.</p>
                
                <p><strong className="text-gray-900">Hosting & Domain:</strong> Clients may provide their own hosting and domain. If required, Toiral can manage hosting setup and deployment.</p>
                
                <p><strong className="text-gray-900">Late Delivery Penalty:</strong> In case of project delay caused by Toiral without valid reasons, we will compensate the client as per the contract terms.</p>
              </div>
            </section>

            {/* 4. Client Responsibilities */}
            <section>
              <div className="flex items-center mb-4">
                <Users className="w-6 h-6 text-teal-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">4. Client Responsibilities</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p><strong className="text-gray-900">Timely Payment:</strong> Clients must make payments as agreed. Delayed payments without valid reasons may result in legal action under Bangladesh law.</p>
                
                <p><strong className="text-gray-900">Accurate Requirements:</strong> Clients must provide clear and accurate project requirements. Mid-project changes may impact delivery timelines.</p>
              </div>
            </section>

            {/* 5. Legal Compliance */}
            <section>
              <div className="flex items-center mb-4">
                <Scale className="w-6 h-6 text-teal-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">5. Legal Compliance</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p>Both parties agree to comply with the laws of Bangladesh. Key applicable laws include:</p>
                
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>Penal Code, 1860:</strong> Cheating, fraud, dishonest inducement. Sections 415, 417, 418, 419, 420, 421–424 apply.</li>
                  <li><strong>Contract Act, 1872:</strong> Governs offer, acceptance, performance, and breach of contract.</li>
                  <li><strong>ICT Act, 2006:</strong> Covers digital offences including hacking, tampering, or unauthorized access.</li>
                  <li><strong>Digital Security Act, 2018:</strong> Online offences including digital impersonation, fake content, or cyber fraud.</li>
                  <li><strong>Cyber Security Act, 2023 & Cyber Security Ordinance, 2025:</strong> Enhanced regulations for online fraud, digital identity misuse, and AI-related offences.</li>
                </ul>
              </div>
            </section>

            {/* 6. Consequences of Breach */}
            <section>
              <div className="flex items-center mb-4">
                <AlertTriangle className="w-6 h-6 text-teal-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">6. Consequences of Breach</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p><strong className="text-gray-900">Toiral Breach:</strong> If Toiral violates any commitments (payment transparency, security, delivery), legal action can be taken under Bangladesh law.</p>
                
                <p><strong className="text-gray-900">Client Breach:</strong> Clients who delay payments without valid reasons after project delivery may also be held liable under the Penal Code, 1860 for cheating, with potential imprisonment or fines.</p>
              </div>
            </section>

            {/* 7. Intellectual Property */}
            <section>
              <div className="flex items-center mb-4">
                <Shield className="w-6 h-6 text-teal-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">7. Intellectual Property</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p><strong className="text-gray-900">Ownership:</strong> Ownership of delivered work transfers to the client after full payment.</p>
                
                <p><strong className="text-gray-900">Portfolio Rights:</strong> Toiral reserves the right to showcase the project in its portfolio unless explicitly requested otherwise in writing.</p>
              </div>
            </section>

            {/* 8. Dispute Resolution */}
            <section>
              <div className="flex items-center mb-4">
                <Gavel className="w-6 h-6 text-teal-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">8. Dispute Resolution</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p><strong className="text-gray-900">Discussion First:</strong> Disputes arising from this agreement will first be addressed through mutual discussion.</p>
                
                <p><strong className="text-gray-900">Legal Resolution:</strong> If unresolved, disputes will be settled in a Bangladesh court of competent jurisdiction under applicable laws.</p>
              </div>
            </section>

            {/* 9. Agreement Acknowledgment */}
            <section>
              <div className="flex items-center mb-4">
                <FileText className="w-6 h-6 text-teal-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">9. Agreement Acknowledgment</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p>By engaging Toiral Web Development Company, clients acknowledge and accept all terms above. Both parties agree to maintain confidentiality, timely payments, and project commitments. No hidden fees are included.</p>
              </div>
            </section>

            {/* 10. Contact Information */}
            <section className="bg-teal-50 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <Mail className="w-6 h-6 text-teal-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">10. Contact Information</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <div className="space-y-2">
                  <p><strong>Email:</strong> <a href="mailto:toiral.dev@gmail.com" className="text-teal-600 hover:underline">toiral.dev@gmail.com</a></p>
                  <p><strong>WhatsApp:</strong> <a href="https://wa.me/8801804673095" className="text-teal-600 hover:underline" target="_blank" rel="noopener noreferrer">+8801804673095</a></p>
                  <p><strong>Phone:</strong> <a href="tel:+8801304082304" className="text-teal-600 hover:underline">+8801304082304</a></p>
                  <p><strong>Phone:</strong> <a href="tel:+8801533793071" className="text-teal-600 hover:underline">+8801533793071</a></p>
                  <p><strong>Location:</strong> GM Bari-Satarkul Road, Uttar Badda, Dhaka, Bangladesh</p>
                  <p><strong>Website:</strong> <a href="https://toiral-development.web.app" className="text-teal-600 hover:underline" target="_blank" rel="noopener noreferrer">https://toiral-development.web.app</a></p>
                </div>
              </div>
            </section>

            {/* Signature Section - Protected */}
            <section className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-8 border-2 border-teal-200">
              <div className="flex items-center justify-center mb-6">
                <Shield className="w-8 h-8 text-teal-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Official Signature</h2>
              </div>
              
              <div className="relative max-w-md mx-auto">
                {/* Security wrapper */}
                <div 
                  className="relative bg-white rounded-lg p-6 shadow-lg"
                  onContextMenu={handleContextMenu}
                  onDragStart={handleDragStart}
                  style={{
                    userSelect: 'none',
                    WebkitUserSelect: 'none',
                    MozUserSelect: 'none',
                    msUserSelect: 'none',
                    WebkitTouchCallout: 'none'
                  }}
                >
                  {/* Watermark overlay */}
                  <div 
                    className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center"
                    style={{
                      background: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(20, 184, 166, 0.03) 35px, rgba(20, 184, 166, 0.03) 70px)'
                    }}
                  >
                    <div className="text-teal-600 opacity-10 text-6xl font-bold transform rotate-45">
                      TOIRAL
                    </div>
                  </div>
                  
                  {/* Protected Image */}
                  <img 
                    src="https://customer-assets.emergentagent.com/job_b6111bbb-b4b7-46a3-9b0e-54e3959590c7/artifacts/v6i6m614_Signature%20%281%29.png"
                    alt="Official Signature"
                    className="w-full h-auto"
                    draggable="false"
                    onContextMenu={handleContextMenu}
                    onDragStart={handleDragStart}
                    style={{
                      pointerEvents: 'none',
                      userSelect: 'none',
                      WebkitUserSelect: 'none',
                      MozUserSelect: 'none',
                      msUserSelect: 'none',
                      WebkitTouchCallout: 'none'
                    }}
                  />
                  
                  {/* Protection notice */}
                  <div className="mt-4 text-center">
                    <div className="inline-flex items-center text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                      <Lock className="w-3 h-3 mr-1" />
                      Protected Document
                    </div>
                  </div>
                </div>
              </div>
              
              <p className="text-center text-sm text-gray-600 mt-6">
                This document ensures mutual trust, legal protection, and clarity for both Toiral Web Development Company and its clients.
              </p>
            </section>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default TermsOfService;
