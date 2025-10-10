import React, { useState, useRef, useEffect } from 'react';
import { cn } from "../../lib/utils";

const LazyImage = ({
  src,
  alt,
  className = "",
  placeholder = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5YTNhZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkxvYWRpbmcuLi48L3RleHQ+PC9zdmc+",
  errorPlaceholder = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxMiIgZmlsbD0iIzk5YTNhZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkZhaWxlZCB0byBsb2FkPC90ZXh0Pjwvc3ZnPg==",
  threshold = 0.1,
  rootMargin = "50px",
  fadeInDuration = 300,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef(null);

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
    <div ref={imgRef} className={cn("relative overflow-hidden", className)}>
      {/* Placeholder/Loading state */}
      {!isLoaded && (
        <img
          src={placeholder}
          alt=""
          className={cn(
            "absolute inset-0 w-full h-full object-cover transition-opacity duration-300",
            isLoaded ? "opacity-0" : "opacity-100"
          )}
          aria-hidden="true"
        />
      )}
      
      {/* Actual image */}
      {isInView && (
        <img
          src={hasError ? errorPlaceholder : src}
          alt={alt}
          className={cn(
            "w-full h-full object-cover transition-opacity duration-300",
            isLoaded ? "opacity-100" : "opacity-0"
          )}
          onLoad={handleLoad}
          onError={handleError}
          loading="lazy"
          style={{
            transitionDuration: `${fadeInDuration}ms`
          }}
          {...props}
        />
      )}
      
      {/* Loading overlay */}
      {!isLoaded && isInView && (
        <div className="absolute inset-0 bg-gradient-to-br from-teal-100 to-cyan-100 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-teal-600 border-t-transparent rounded-full animate-spin" />
        </div>
      )}
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
  useEffect(() => {
    if (priority && src) {
      // Preload critical images
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
      
      return () => {
        document.head.removeChild(link);
      };
    }
  }, [src, priority]);

  if (priority) {
    // For critical images, load immediately without lazy loading
    return (
      <img
        src={src}
        alt={alt}
        className={cn("w-full h-full object-cover", className)}
        loading="eager"
        {...props}
      />
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
