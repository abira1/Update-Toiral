import React from 'react';
import { cn } from "../../lib/utils";

const LoadingSpinner = ({ 
  size = "default", 
  className = "",
  text = "Loading...",
  showText = true 
}) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    default: "w-8 h-8",
    lg: "w-12 h-12",
    xl: "w-16 h-16"
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] space-y-4">
      <div className={cn(
        "animate-spin rounded-full border-2 border-gray-300 border-t-teal-600",
        sizeClasses[size],
        className
      )} />
      {showText && (
        <p className="text-gray-600 text-sm font-medium">{text}</p>
      )}
    </div>
  );
};

// Page-level loading component
export const PageLoadingSpinner = () => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-cyan-50 flex items-center justify-center">
    <div className="text-center space-y-6">
      <div className="w-16 h-16 animate-spin rounded-full border-4 border-gray-300 border-t-teal-600 mx-auto" />
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-teal-900">Loading...</h3>
        <p className="text-teal-700">Please wait while we prepare your content</p>
      </div>
    </div>
  </div>
);

// Route-level loading component with skeleton
export const RouteLoadingSpinner = () => (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50 to-cyan-50">
    <div className="animate-pulse">
      {/* Header skeleton */}
      <div className="h-16 bg-white/50 border-b border-teal-200/50" />
      
      {/* Content skeleton */}
      <div className="max-w-6xl mx-auto px-6 py-12 space-y-8">
        <div className="h-8 bg-white/60 rounded-lg w-1/3" />
        <div className="space-y-4">
          <div className="h-4 bg-white/60 rounded w-full" />
          <div className="h-4 bg-white/60 rounded w-5/6" />
          <div className="h-4 bg-white/60 rounded w-4/6" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-64 bg-white/60 rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default LoadingSpinner;
