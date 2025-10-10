// Performance monitoring and Core Web Vitals tracking
class PerformanceMonitor {
  constructor() {
    this.metrics = new Map();
    this.observers = new Map();
    this.isSupported = this.checkSupport();
    this.init();
  }

  checkSupport() {
    return (
      typeof window !== 'undefined' &&
      'performance' in window &&
      'PerformanceObserver' in window
    );
  }

  init() {
    if (!this.isSupported) {
      console.warn('Performance monitoring not supported in this browser');
      return;
    }

    this.observeWebVitals();
    this.observeResourceTiming();
    this.observeNavigationTiming();
    this.trackCustomMetrics();
  }

  // Core Web Vitals monitoring
  observeWebVitals() {
    // Largest Contentful Paint (LCP)
    this.observeMetric('largest-contentful-paint', (entries) => {
      const lastEntry = entries[entries.length - 1];
      this.recordMetric('LCP', lastEntry.startTime, {
        element: lastEntry.element?.tagName,
        url: lastEntry.url
      });
    });

    // First Input Delay (FID)
    this.observeMetric('first-input', (entries) => {
      const firstEntry = entries[0];
      this.recordMetric('FID', firstEntry.processingStart - firstEntry.startTime, {
        eventType: firstEntry.name
      });
    });

    // Cumulative Layout Shift (CLS)
    let clsValue = 0;
    this.observeMetric('layout-shift', (entries) => {
      for (const entry of entries) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      }
      this.recordMetric('CLS', clsValue);
    });

    // First Contentful Paint (FCP)
    this.observeMetric('paint', (entries) => {
      for (const entry of entries) {
        if (entry.name === 'first-contentful-paint') {
          this.recordMetric('FCP', entry.startTime);
        }
      }
    });
  }

  // Resource timing monitoring
  observeResourceTiming() {
    this.observeMetric('resource', (entries) => {
      for (const entry of entries) {
        const resourceType = this.getResourceType(entry.name);
        const loadTime = entry.responseEnd - entry.startTime;
        
        this.recordMetric(`Resource_${resourceType}`, loadTime, {
          name: entry.name,
          size: entry.transferSize,
          cached: entry.transferSize === 0
        });
      }
    });
  }

  // Navigation timing
  observeNavigationTiming() {
    if (window.performance.navigation) {
      const navigation = window.performance.getEntriesByType('navigation')[0];
      if (navigation) {
        this.recordMetric('TTFB', navigation.responseStart - navigation.requestStart);
        this.recordMetric('DOMContentLoaded', navigation.domContentLoadedEventEnd - navigation.navigationStart);
        this.recordMetric('LoadComplete', navigation.loadEventEnd - navigation.navigationStart);
      }
    }
  }

  // Custom performance metrics
  trackCustomMetrics() {
    // Track React component render times
    this.trackComponentRenders();
    
    // Track bundle loading times
    this.trackBundleLoading();
    
    // Track user interactions
    this.trackUserInteractions();
  }

  trackComponentRenders() {
    // This would be integrated with React DevTools or custom hooks
    window.addEventListener('react-render-start', (event) => {
      performance.mark(`render-start-${event.detail.componentName}`);
    });

    window.addEventListener('react-render-end', (event) => {
      performance.mark(`render-end-${event.detail.componentName}`);
      performance.measure(
        `render-${event.detail.componentName}`,
        `render-start-${event.detail.componentName}`,
        `render-end-${event.detail.componentName}`
      );
    });
  }

  trackBundleLoading() {
    // Track dynamic import loading times
    const originalImport = window.__webpack_require__;
    if (originalImport) {
      window.__webpack_require__ = (...args) => {
        const start = performance.now();
        return originalImport(...args).then(result => {
          const end = performance.now();
          this.recordMetric('BundleLoad', end - start, { bundle: args[0] });
          return result;
        });
      };
    }
  }

  trackUserInteractions() {
    ['click', 'scroll', 'keydown'].forEach(eventType => {
      document.addEventListener(eventType, () => {
        this.recordMetric(`Interaction_${eventType}`, performance.now());
      }, { passive: true });
    });
  }

  // Helper methods
  observeMetric(type, callback) {
    try {
      const observer = new PerformanceObserver((list) => {
        callback(list.getEntries());
      });
      observer.observe({ type, buffered: true });
      this.observers.set(type, observer);
    } catch (error) {
      console.warn(`Failed to observe ${type}:`, error);
    }
  }

  recordMetric(name, value, metadata = {}) {
    const metric = {
      name,
      value,
      timestamp: Date.now(),
      url: window.location.href,
      userAgent: navigator.userAgent,
      ...metadata
    };

    this.metrics.set(`${name}_${Date.now()}`, metric);
    
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`Performance Metric - ${name}:`, value, metadata);
    }

    // Send to analytics service
    this.sendToAnalytics(metric);
  }

  getResourceType(url) {
    if (url.includes('.js')) return 'JavaScript';
    if (url.includes('.css')) return 'CSS';
    if (url.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i)) return 'Image';
    if (url.match(/\.(woff|woff2|ttf|eot)$/i)) return 'Font';
    return 'Other';
  }

  sendToAnalytics(metric) {
    // Send to your analytics service (Firebase, Google Analytics, etc.)
    if (window.gtag) {
      window.gtag('event', 'performance_metric', {
        metric_name: metric.name,
        metric_value: metric.value,
        custom_parameter: JSON.stringify(metric)
      });
    }

    // Send to Firebase Analytics if available
    if (window.firebase && window.firebase.analytics) {
      window.firebase.analytics().logEvent('performance_metric', {
        metric_name: metric.name,
        metric_value: metric.value
      });
    }
  }

  // Performance budget checking
  checkPerformanceBudgets() {
    const budgets = {
      LCP: 2500, // 2.5 seconds
      FID: 100,  // 100 milliseconds
      CLS: 0.1,  // 0.1
      FCP: 1800, // 1.8 seconds
      TTFB: 600  // 600 milliseconds
    };

    const violations = [];
    
    for (const [metricName, budget] of Object.entries(budgets)) {
      const latestMetric = this.getLatestMetric(metricName);
      if (latestMetric && latestMetric.value > budget) {
        violations.push({
          metric: metricName,
          value: latestMetric.value,
          budget,
          violation: latestMetric.value - budget
        });
      }
    }

    if (violations.length > 0) {
      console.warn('Performance budget violations:', violations);
      this.sendBudgetViolations(violations);
    }

    return violations;
  }

  getLatestMetric(name) {
    const entries = Array.from(this.metrics.entries())
      .filter(([key]) => key.startsWith(name))
      .map(([, value]) => value)
      .sort((a, b) => b.timestamp - a.timestamp);
    
    return entries[0] || null;
  }

  sendBudgetViolations(violations) {
    // Send budget violations to monitoring service
    if (window.gtag) {
      window.gtag('event', 'performance_budget_violation', {
        violations: JSON.stringify(violations)
      });
    }
  }

  // Get performance report
  getPerformanceReport() {
    const report = {
      timestamp: Date.now(),
      url: window.location.href,
      metrics: {},
      budgetViolations: this.checkPerformanceBudgets()
    };

    // Get latest values for each metric type
    ['LCP', 'FID', 'CLS', 'FCP', 'TTFB'].forEach(metricName => {
      const latest = this.getLatestMetric(metricName);
      if (latest) {
        report.metrics[metricName] = latest.value;
      }
    });

    return report;
  }

  // Cleanup
  disconnect() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers.clear();
    this.metrics.clear();
  }
}

// React hook for performance monitoring
export const usePerformanceMonitor = () => {
  const [performanceData, setPerformanceData] = React.useState(null);
  
  React.useEffect(() => {
    const monitor = new PerformanceMonitor();
    
    // Update performance data periodically
    const interval = setInterval(() => {
      setPerformanceData(monitor.getPerformanceReport());
    }, 5000);

    return () => {
      clearInterval(interval);
      monitor.disconnect();
    };
  }, []);

  return performanceData;
};

// Create singleton instance
const performanceMonitor = new PerformanceMonitor();

export default performanceMonitor;
