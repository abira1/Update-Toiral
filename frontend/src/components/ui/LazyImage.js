import React, { useState, useRef, useEffect } from 'react';
import { cn } from "../../lib/utils";

// Generate a tiny blurred placeholder from image URL
const generateBlurPlaceholder = (src) => {
  // For Unsplash images, use their blur parameter
  if (src?.includes('unsplash.com')) {
    return `${src}&blur=50&w=50&q=10`;
  }
  // For other images, use a gradient placeholder
  return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0%25' stop-color='%2314b8a6'/%3E%3Cstop offset='100%25' stop-color='%2306b6d4'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23g)' opacity='0.1'/%3E%3C/svg%3E";
};

const LazyImage = ({
  src,
  alt,
  className = "",
  placeholder,
  errorPlaceholder = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect width='100%25' height='100%25' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial, sans-serif' font-size='14' fill='%2399a3af' text-anchor='middle' dy='.3em'%3EFailed to load%3C/text%3E%3C/svg%3E",
  threshold = 0.1,
  rootMargin = "100px",
  fadeInDuration = 600,
  useBlur = true,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef(null);
  
  // Generate blur placeholder if not provided
  const blurPlaceholder = placeholder || (useBlur ? generateBlurPlaceholder(src) : null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const handleLoad = () => {
    setIsLoaded(true);
    setHasError(false);
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(true);
  };

  return (
    <div ref={imgRef} className={cn("relative overflow-hidden bg-gradient-to-br from-teal-50 to-cyan-50", className)}>
      {/* Blur Placeholder - Always visible until main image loads */}
      {blurPlaceholder && !isLoaded && (
        <img
          src={blurPlaceholder}
          alt=""
          className={cn(
            "absolute inset-0 w-full h-full object-cover transition-all duration-700",
            isLoaded ? "opacity-0 scale-110 blur-xl" : "opacity-100 scale-100 blur-md"
          )}
          aria-hidden="true"
          loading="eager"
        />
      )}
      
      {/* Actual image with fade-in effect */}
      {isInView && (
        <img
          src={hasError ? errorPlaceholder : src}
          alt={alt}
          className={cn(
            "w-full h-full object-cover transition-all duration-700",
            isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
          )}
          onLoad={handleLoad}
          onError={handleError}
          loading="lazy"
          style={{
            transitionDuration: `${fadeInDuration}ms`,
            transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
          }}
          {...props}
        />
      )}
      
      {/* Loading shimmer effect */}
      {!isLoaded && isInView && (
        <div className="absolute inset-0 overflow-hidden">
          <div 
            className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent"
            style={{
              animation: 'shimmer 2s infinite'
            }}
          />
        </div>
      )}
      
      {/* CSS for shimmer animation */}
      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
};

// Responsive image component with multiple sources
export const ResponsiveImage = ({
  src,
  alt,
  className = "",
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
  ...props
}) => {
  // Generate WebP and fallback sources
  const getImageSources = (originalSrc) => {
    if (!originalSrc) return { webp: null, fallback: originalSrc };
    
    // If it's already a WebP, return as is
    if (originalSrc.includes('.webp')) {
      return { webp: originalSrc, fallback: originalSrc };
    }
    
    // For external URLs, we can't convert them, so return as is
    if (originalSrc.startsWith('http')) {
      return { webp: null, fallback: originalSrc };
    }
    
    // For local images, generate WebP version
    const webpSrc = originalSrc.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    return { webp: webpSrc, fallback: originalSrc };
  };

  const { webp, fallback } = getImageSources(src);

  return (
    <picture className={className}>
      {webp && (
        <source srcSet={webp} type="image/webp" sizes={sizes} />
      )}
      <LazyImage
        src={fallback}
        alt={alt}
        className="w-full h-full"
        {...props}
      />
    </picture>
  );
};

// Hero image component with preloading for critical images
export const HeroImage = ({
  src,
  alt,
  className = "",
  priority = true,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (priority && src) {
      // Preload critical images
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
      
      return () => {
        if (document.head.contains(link)) {
          document.head.removeChild(link);
        }
      };
    }
  }, [src, priority]);

  if (priority) {
    // For critical images, load immediately with blur effect
    const blurPlaceholder = generateBlurPlaceholder(src);
    
    return (
      <div className={cn("relative overflow-hidden bg-gradient-to-br from-teal-50 to-cyan-50", className)}>
        {/* Blur Placeholder */}
        {blurPlaceholder && !isLoaded && (
          <img
            src={blurPlaceholder}
            alt=""
            className={cn(
              "absolute inset-0 w-full h-full object-cover transition-all duration-700",
              isLoaded ? "opacity-0 scale-110 blur-xl" : "opacity-100 scale-100 blur-md"
            )}
            aria-hidden="true"
            loading="eager"
          />
        )}
        
        {/* Main Image */}
        <img
          src={src}
          alt={alt}
          className={cn(
            "w-full h-full object-cover transition-all duration-700",
            isLoaded ? "opacity-100 scale-100" : "opacity-0 scale-95"
          )}
          loading="eager"
          onLoad={() => setIsLoaded(true)}
          {...props}
        />
      </div>
    );
  }

  return (
    <LazyImage
      src={src}
      alt={alt}
      className={className}
      {...props}
    />
  );
};

export default LazyImage;
