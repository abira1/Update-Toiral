import React, { useState, useEffect } from 'react';
import { ArrowLeft, Cookie, Settings, Eye, Shield, Database, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Cookies = () => {
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
                <Cookie className="w-8 h-8 text-white" />
              </div>
            </div>
            
            <h1 className="text-4xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent mb-4">
              Cookie Policy
            </h1>
            <p className="text-gray-600 text-lg">
              Learn about how we use cookies and similar technologies on our website.
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          {/* Content */}
          <div className="bg-white rounded-2xl shadow-xl p-8 space-y-8">
            
            {/* What Are Cookies */}
            <section>
              <div className="flex items-center mb-4">
                <Cookie className="w-6 h-6 text-teal-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">What Are Cookies?</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p>Cookies are small text files that are stored on your device when you visit our website. They help us provide you with a better browsing experience by:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Remembering your preferences and settings</li>
                  <li>Analyzing how you use our website</li>
                  <li>Providing personalized content and features</li>
                  <li>Enabling social media integration</li>
                  <li>Improving website performance and security</li>
                </ul>
                <p>Cookies cannot harm your device or files, and they don't contain personal information unless you specifically provide it.</p>
              </div>
            </section>

            {/* Types of Cookies */}
            <section>
              <div className="flex items-center mb-4">
                <Database className="w-6 h-6 text-teal-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Types of Cookies We Use</h2>
              </div>
              <div className="space-y-6 text-gray-700">
                
                <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-400">
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">Essential Cookies</h3>
                  <p className="text-blue-800">These cookies are necessary for the website to function properly. They enable basic features like page navigation and access to secure areas.</p>
                  <ul className="list-disc list-inside mt-2 text-blue-700">
                    <li>Session management</li>
                    <li>Security features</li>
                    <li>Load balancing</li>
                  </ul>
                  <p className="text-sm text-blue-600 mt-2"><strong>Duration:</strong> Session or up to 1 year</p>
                </div>

                <div className="bg-green-50 rounded-lg p-4 border-l-4 border-green-400">
                  <h3 className="text-lg font-semibold text-green-900 mb-2">Analytics Cookies</h3>
                  <p className="text-green-800">These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.</p>
                  <ul className="list-disc list-inside mt-2 text-green-700">
                    <li>Google Analytics</li>
                    <li>Page views and traffic sources</li>
                    <li>User behavior patterns</li>
                    <li>Performance metrics</li>
                  </ul>
                  <p className="text-sm text-green-600 mt-2"><strong>Duration:</strong> Up to 2 years</p>
                </div>

                <div className="bg-purple-50 rounded-lg p-4 border-l-4 border-purple-400">
                  <h3 className="text-lg font-semibold text-purple-900 mb-2">Functional Cookies</h3>
                  <p className="text-purple-800">These cookies enable enhanced functionality and personalization, such as remembering your preferences.</p>
                  <ul className="list-disc list-inside mt-2 text-purple-700">
                    <li>Language preferences</li>
                    <li>Theme settings</li>
                    <li>Form data retention</li>
                    <li>User interface customization</li>
                  </ul>
                  <p className="text-sm text-purple-600 mt-2"><strong>Duration:</strong> Up to 1 year</p>
                </div>

                <div className="bg-orange-50 rounded-lg p-4 border-l-4 border-orange-400">
                  <h3 className="text-lg font-semibold text-orange-900 mb-2">Marketing Cookies</h3>
                  <p className="text-orange-800">These cookies track your browsing habits to show you relevant advertisements and measure campaign effectiveness.</p>
                  <ul className="list-disc list-inside mt-2 text-orange-700">
                    <li>Social media integration</li>
                    <li>Advertising personalization</li>
                    <li>Campaign tracking</li>
                    <li>Retargeting</li>
                  </ul>
                  <p className="text-sm text-orange-600 mt-2"><strong>Duration:</strong> Up to 2 years</p>
                </div>
              </div>
            </section>

            {/* Third-Party Cookies */}
            <section>
              <div className="flex items-center mb-4">
                <Shield className="w-6 h-6 text-teal-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Third-Party Cookies</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p>Our website may also use third-party cookies from the following services:</p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Google Analytics</h4>
                    <p className="text-sm text-gray-700">Tracks website usage and performance</p>
                    <p className="text-xs text-gray-600 mt-1">Privacy Policy: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:underline">Google Privacy</a></p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Firebase</h4>
                    <p className="text-sm text-gray-700">Provides website functionality and data storage</p>
                    <p className="text-xs text-gray-600 mt-1">Privacy Policy: <a href="https://firebase.google.com/support/privacy" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:underline">Firebase Privacy</a></p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Social Media</h4>
                    <p className="text-sm text-gray-700">Facebook, Instagram, Twitter integration</p>
                    <p className="text-xs text-gray-600 mt-1">Various privacy policies apply</p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">YouTube</h4>
                    <p className="text-sm text-gray-700">Embedded videos and content</p>
                    <p className="text-xs text-gray-600 mt-1">Privacy Policy: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:underline">Google Privacy</a></p>
                  </div>
                </div>
              </div>
            </section>

            {/* Managing Cookies */}
            <section>
              <div className="flex items-center mb-4">
                <Settings className="w-6 h-6 text-teal-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Managing Your Cookie Preferences</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p>You have several options for managing cookies:</p>
                
                <h3 className="text-lg font-semibold text-gray-800">Browser Settings</h3>
                <p>Most browsers allow you to control cookies through their settings. You can:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Block all cookies</li>
                  <li>Block third-party cookies only</li>
                  <li>Delete existing cookies</li>
                  <li>Set cookies to expire when you close your browser</li>
                  <li>Receive notifications when cookies are set</li>
                </ul>
                
                <h3 className="text-lg font-semibold text-gray-800 mt-6">Browser-Specific Instructions</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Chrome</h4>
                    <p className="text-sm text-gray-700">Settings → Privacy and security → Cookies and other site data</p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Firefox</h4>
                    <p className="text-sm text-gray-700">Options → Privacy & Security → Cookies and Site Data</p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Safari</h4>
                    <p className="text-sm text-gray-700">Preferences → Privacy → Manage Website Data</p>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Edge</h4>
                    <p className="text-sm text-gray-700">Settings → Cookies and site permissions → Cookies and site data</p>
                  </div>
                </div>
                
                <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
                  <p className="text-yellow-800">
                    <strong>Note:</strong> Disabling cookies may affect the functionality of our website and your user experience.
                  </p>
                </div>
              </div>
            </section>

            {/* Opt-Out Options */}
            <section>
              <div className="flex items-center mb-4">
                <Eye className="w-6 h-6 text-teal-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Opt-Out Options</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p>You can opt out of specific tracking services:</p>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between bg-gray-50 rounded-lg p-4">
                    <div>
                      <h4 className="font-semibold text-gray-900">Google Analytics</h4>
                      <p className="text-sm text-gray-600">Opt out of Google Analytics tracking</p>
                    </div>
                    <a 
                      href="https://tools.google.com/dlpage/gaoptout" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors text-sm"
                    >
                      Opt Out
                    </a>
                  </div>
                  
                  <div className="flex items-center justify-between bg-gray-50 rounded-lg p-4">
                    <div>
                      <h4 className="font-semibold text-gray-900">Interest-Based Ads</h4>
                      <p className="text-sm text-gray-600">Opt out of personalized advertising</p>
                    </div>
                    <a 
                      href="https://www.aboutads.info/choices/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors text-sm"
                    >
                      Opt Out
                    </a>
                  </div>
                </div>
              </div>
            </section>

            {/* Mobile Devices */}
            <section>
              <div className="flex items-center mb-4">
                <Settings className="w-6 h-6 text-teal-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Mobile Devices</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p>On mobile devices, you can manage cookies and tracking through:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>iOS:</strong> Settings → Safari → Privacy & Security</li>
                  <li><strong>Android:</strong> Browser settings → Site settings → Cookies</li>
                  <li><strong>App Settings:</strong> Individual app privacy settings</li>
                </ul>
                
                <h3 className="text-lg font-semibold text-gray-800 mt-6">Advertising IDs</h3>
                <p>You can also limit ad tracking through your device settings:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li><strong>iOS:</strong> Settings → Privacy → Apple Advertising → Limit Ad Tracking</li>
                  <li><strong>Android:</strong> Settings → Google → Ads → Opt out of Ads Personalization</li>
                </ul>
              </div>
            </section>

            {/* Updates to Policy */}
            <section>
              <div className="flex items-center mb-4">
                <Database className="w-6 h-6 text-teal-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Updates to This Policy</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p>We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons.</p>
                <p>When we make changes, we will:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Update the "Last updated" date at the top of this policy</li>
                  <li>Notify you through our website or email for significant changes</li>
                  <li>Provide you with options to manage new cookie types</li>
                </ul>
                <p>We encourage you to review this policy periodically to stay informed about our use of cookies.</p>
              </div>
            </section>

            {/* Contact Information */}
            <section className="bg-teal-50 rounded-xl p-6">
              <div className="flex items-center mb-4">
                <Mail className="w-6 h-6 text-teal-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-900">Questions About Cookies?</h2>
              </div>
              <div className="space-y-4 text-gray-700">
                <p>If you have questions about our use of cookies or this Cookie Policy, please contact us:</p>
                <div className="space-y-2">
                  <p><strong>Email:</strong> <a href="mailto:privacy@toiral.com" className="text-teal-600 hover:underline">privacy@toiral.com</a></p>
                  <p><strong>Phone:</strong> <a href="tel:+8801804673095" className="text-teal-600 hover:underline">+880 1804 673095</a></p>
                  <p><strong>Address:</strong> Dhaka, Bangladesh</p>
                </div>
                <p className="text-sm text-gray-600">
                  We're here to help you understand and manage your cookie preferences.
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

export default Cookies;
