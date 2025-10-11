// 404 Not Found page
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, Shield } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Glitchy404 } from '../components/ui/glitchy-404';

const NotFound = ({ isUnauthorized = false }) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    window.history.length > 1 ? navigate(-1) : navigate('/');
  };

  return (
    <div className="min-h-screen overflow-hidden flex flex-col items-center justify-center p-4 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Glowing orbs with custom color */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#0f7578]/20 rounded-full blur-3xl animate-pulse" 
          style={{ animation: 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#0f7578]/15 rounded-full blur-3xl animate-pulse" 
          style={{ animation: 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}></div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0" 
          style={{
            backgroundImage: `linear-gradient(#0f7578 1px, transparent 1px), linear-gradient(90deg, #0f7578 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
            opacity: 0.05
          }}
        ></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center space-y-8">
        {/* Glitchy 404 component */}
        <div className="mb-4">
          {isUnauthorized ? (
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 bg-gradient-to-br from-red-500/20 to-orange-600/20 rounded-3xl flex items-center justify-center mb-6 backdrop-blur-sm border border-red-500/30 shadow-2xl shadow-red-500/20">
                <Shield className="w-16 h-16 text-red-400" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Access Denied</h1>
            </div>
          ) : (
            <Glitchy404 
              width={window.innerWidth < 768 ? 320 : window.innerWidth < 1024 ? 600 : 800} 
              height={window.innerWidth < 768 ? 93 : window.innerWidth < 1024 ? 174 : 232} 
              color="#0f7578" 
            />
          )}
        </div>

        {/* Description text */}
        <div className="text-center space-y-2 px-4 max-w-md">
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
            {isUnauthorized ? (
              <>
                You don't have permission to access this area.
                <br />
                <span className="text-gray-400 text-base">Only authorized admin accounts can access the admin panel.</span>
              </>
            ) : (
              <>
                The page you're looking for doesn't exist or has been moved.
                <br />
                <span className="text-[#0f7578] font-medium">Let's get you back on track.</span>
              </>
            )}
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md px-4">
          <Button
            onClick={handleGoBack}
            variant="outline"
            className="w-full sm:w-auto border-[#0f7578] text-[#0f7578] hover:bg-[#0f7578] hover:text-white transition-all duration-300 shadow-lg shadow-[#0f7578]/20 hover:shadow-[#0f7578]/40"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
          
          <Link to="/" className="w-full sm:w-auto">
            <Button className="w-full bg-gradient-to-r from-[#0f7578] to-[#0d6366] hover:from-[#0d6366] hover:to-[#0f7578] text-white shadow-xl shadow-[#0f7578]/30 hover:shadow-[#0f7578]/50 transition-all duration-300 transform hover:scale-105">
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>

          {isUnauthorized && (
            <Link to="/admin/login" className="w-full sm:w-auto">
              <Button variant="outline" className="w-full border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white transition-all duration-300">
                <Shield className="w-4 h-4 mr-2" />
                Admin Login
              </Button>
            </Link>
          )}
        </div>

        {isUnauthorized && (
          <div className="text-center text-sm text-gray-500 border-t border-gray-700 pt-6 mt-6 max-w-md">
            <p>If you believe you should have access,</p>
            <p className="mt-1">please contact the system administrator.</p>
          </div>
        )}
      </div>

      {/* Scan line effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute w-full h-1 bg-gradient-to-r from-transparent via-[#0f7578]/30 to-transparent animate-scan"></div>
      </div>

      <style>{`
        @keyframes scan {
          0% {
            top: -10%;
          }
          100% {
            top: 110%;
          }
        }
        .animate-scan {
          animation: scan 8s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default NotFound;
