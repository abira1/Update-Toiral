import React, { useState, useRef, useEffect } from 'react';
import { cn } from "../../lib/utils";

// Modern shimmer placeholder SVG
const SHIMMER_PLACEHOLDER = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Cdefs%3E%3ClinearGradient id='shimmer' x1='0' y1='0' x2='1' y2='0'%3E%3Cstop offset='0%25' stop-color='%23f0f9ff'/%3E%3Cstop offset='50%25' stop-color='%23e0f2fe'/%3E%3Cstop offset='100%25' stop-color='%23f0f9ff'/%3E%3C/linearGradient%3E%3ClinearGradient id='overlay' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0%25' stop-color='%2314b8a6' stop-opacity='0.1'/%3E%3Cstop offset='100%25' stop-color='%2306b6d4' stop-opacity='0.1'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23shimmer)'/%3E%3Crect width='100%25' height='100%25' fill='url(%23overlay)'/%3E%3C/svg%3E";

// Generate a tiny blurred placeholder from image URL
const generateBlurPlaceholder = (src) => {
  if (!src) return SHIMMER_PLACEHOLDER;
  
  // For Unsplash images, use their blur parameter for ultra-fast load
  if (src.includes('unsplash.com')) {
    return `${src}${src.includes('?') ? '&' : '?'}blur=100&w=40&q=1&fm=jpg`;
  }
  
  // For i.postimg.cc or other external images, use shimmer
  if (src.includes('postimg.cc') || src.startsWith('http')) {
    return SHIMMER_PLACEHOLDER;
  }
  
  // For local images, use gradient placeholder
  return SHIMMER_PLACEHOLDER;
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

// Modern logo loader with instant appearance
export const LogoImage = ({
  src,
  alt,
  className = "",
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  useEffect(() => {
    if (src) {
      // Preload the logo image
      const img = new Image();
      img.src = src;
      
      // Simulate smooth progress for better UX
      const progressInterval = setInterval(() => {
        setLoadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + 10;
        });
      }, 50);
      
      img.onload = () => {
        clearInterval(progressInterval);
        setLoadProgress(100);
        setTimeout(() => setIsLoaded(true), 100);
      };
      
      img.onerror = () => {
        clearInterval(progressInterval);
        setIsLoaded(true);
      };
      
      return () => clearInterval(progressInterval);
    }
  }, [src]);

  return (
    <div className={cn("relative inline-block", className)}>
      {/* Skeleton loader for logo */}
      {!isLoaded && (
        <div className="absolute inset-0 rounded-lg overflow-hidden bg-gradient-to-r from-teal-100 via-cyan-100 to-teal-100 animate-pulse">
          <div 
            className="h-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-all duration-300"
            style={{
              width: `${loadProgress}%`,
              transform: 'translateX(-100%)',
              animation: 'shimmer-slide 1.5s infinite'
            }}
          />
        </div>
      )}
      
      {/* Actual Logo */}
      <img
        src={src}
        alt={alt}
        className={cn(
          "transition-all duration-500 ease-out",
          isLoaded 
            ? "opacity-100 scale-100 blur-0" 
            : "opacity-0 scale-95 blur-sm"
        )}
        loading="eager"
        decoding="async"
        fetchpriority="high"
        {...props}
      />
      
      <style jsx>{`
        @keyframes shimmer-slide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(400%); }
        }
      `}</style>
    </div>
  );
};

// Hero image component with preloading for critical images
export const HeroImage = ({
  src,
  alt,
  className = "",
  priority = true,
  showProgress = false,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    // Early visibility check for hero images
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0,
        rootMargin: "200px"
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (priority && src && isInView) {
      // Create preload link for instant loading
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      link.fetchpriority = 'high';
      document.head.appendChild(link);
      
      // Progressive loading simulation for better UX
      const img = new Image();
      img.src = src;
      
      const progressInterval = setInterval(() => {
        setLoadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return prev;
          }
          return prev + 15;
        });
      }, 100);
      
      img.onload = () => {
        clearInterval(progressInterval);
        setLoadProgress(100);
        setTimeout(() => setIsLoaded(true), 150);
      };
      
      img.onerror = () => {
        clearInterval(progressInterval);
        setIsLoaded(true);
      };
      
      return () => {
        clearInterval(progressInterval);
        if (document.head.contains(link)) {
          document.head.removeChild(link);
        }
      };
    }
  }, [src, priority, isInView]);

  if (priority) {
    const blurPlaceholder = generateBlurPlaceholder(src);
    
    return (
      <div ref={imgRef} className={cn("relative overflow-hidden", className)}>
        {/* Modern gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-teal-50 via-cyan-50 to-teal-50" />
        
        {/* Blur Placeholder with smooth transition */}
        {blurPlaceholder && !isLoaded && (
          <img
            src={blurPlaceholder}
            alt=""
            className={cn(
              "absolute inset-0 w-full h-full object-contain transition-all duration-1000 ease-out",
              isLoaded 
                ? "opacity-0 scale-110 blur-2xl" 
                : "opacity-60 scale-100 blur-md"
            )}
            aria-hidden="true"
            loading="eager"
          />
        )}
        
        {/* Progressive loading bar (optional) */}
        {showProgress && !isLoaded && loadProgress > 0 && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-teal-100/50 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-teal-500 to-cyan-500 transition-all duration-300 ease-out"
              style={{ width: `${loadProgress}%` }}
            />
          </div>
        )}
        
        {/* Main Image with smooth reveal */}
        {isInView && (
          <img
            src={src}
            alt={alt}
            className={cn(
              "relative w-full h-full object-contain transition-all duration-1000 ease-out",
              isLoaded 
                ? "opacity-100 scale-100 blur-0" 
                : "opacity-0 scale-95 blur-sm"
            )}
            loading="eager"
            decoding="async"
            fetchpriority="high"
            onLoad={() => {
              setLoadProgress(100);
              setIsLoaded(true);
            }}
            {...props}
          />
        )}
        
        {/* Shimmer effect during load */}
        {!isLoaded && isInView && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              style={{
                animation: 'shimmer-sweep 2s infinite',
                transform: 'translateX(-100%)'
              }}
            />
          </div>
        )}
        
        <style jsx>{`
          @keyframes shimmer-sweep {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(200%); }
          }
        `}</style>
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
