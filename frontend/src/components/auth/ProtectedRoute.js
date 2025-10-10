// Protected route component for admin access
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Skeleton } from '../ui/skeleton';
import NotFound from '../../pages/NotFound';

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { user, loading, initialized, isAuthenticated, isAdmin } = useAuth();
  const location = useLocation();

  // Show loading skeleton while auth is initializing
  if (loading || !initialized) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-cyan-50 flex items-center justify-center">
        <div className="w-full max-w-md space-y-4 p-8">
          <div className="text-center space-y-4">
            <Skeleton className="h-8 w-48 mx-auto" />
            <Skeleton className="h-4 w-64 mx-auto" />
            <div className="space-y-2">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
            </div>
            <Skeleton className="h-10 w-32 mx-auto" />
          </div>
        </div>
      </div>
    );
  }

  // Redirect to admin access page if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/Mahia23" state={{ from: location }} replace />;
  }

  // Check admin requirement
  if (requireAdmin && !isAdmin) {
    return <NotFound isUnauthorized={true} />;
  }

  return children;
};

export default ProtectedRoute;
