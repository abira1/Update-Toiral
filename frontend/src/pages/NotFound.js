// 404 Not Found page
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, ArrowLeft, Shield } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';

const NotFound = ({ isUnauthorized = false }) => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    window.history.length > 1 ? navigate(-1) : navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-cyan-50 flex items-center justify-center p-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-teal-400/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center space-y-4">
            <div className="mx-auto w-20 h-20 bg-gradient-to-br from-red-500 to-orange-600 rounded-2xl flex items-center justify-center mb-4">
              {isUnauthorized ? (
                <Shield className="w-10 h-10 text-white" />
              ) : (
                <span className="text-3xl font-bold text-white">404</span>
              )}
            </div>
            
            <CardTitle className="text-2xl font-bold text-gray-900">
              {isUnauthorized ? 'Access Denied' : 'Page Not Found'}
            </CardTitle>
            
            <CardDescription className="text-gray-600">
              {isUnauthorized ? (
                <>
                  You don't have permission to access this area. 
                  <br />
                  Only authorized admin accounts can access the admin panel.
                </>
              ) : (
                <>
                  The page you're looking for doesn't exist or has been moved.
                  <br />
                  Let's get you back on track.
                </>
              )}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex flex-col space-y-3">
              <Button
                onClick={handleGoBack}
                variant="outline"
                className="w-full"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Go Back
              </Button>
              
              <Link to="/" className="w-full">
                <Button className="w-full bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700">
                  <Home className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>

              {isUnauthorized && (
                <Link to="/admin/login" className="w-full">
                  <Button variant="secondary" className="w-full">
                    <Shield className="w-4 h-4 mr-2" />
                    Admin Login
                  </Button>
                </Link>
              )}
            </div>

            {isUnauthorized && (
              <div className="text-center text-xs text-gray-500 border-t pt-4">
                <p>If you believe you should have access,</p>
                <p className="mt-1">please contact the system administrator.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default NotFound;
