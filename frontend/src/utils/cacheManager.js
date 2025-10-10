// Cache Manager for optimizing network requests and data fetching
class CacheManager {
  constructor() {
    this.cache = new Map();
    this.pendingRequests = new Map();
    this.cacheExpiry = new Map();
    this.defaultTTL = 5 * 60 * 1000; // 5 minutes default TTL
  }

  // Generate cache key from parameters
  generateKey(prefix, params = {}) {
    const sortedParams = Object.keys(params)
      .sort()
      .map(key => `${key}:${params[key]}`)
      .join('|');
    return `${prefix}${sortedParams ? `_${sortedParams}` : ''}`;
  }

  // Check if cache entry is valid
  isValid(key) {
    const expiry = this.cacheExpiry.get(key);
    if (!expiry) return false;
    
    if (Date.now() > expiry) {
      this.cache.delete(key);
      this.cacheExpiry.delete(key);
      return false;
    }
    return true;
  }

  // Get cached data
  get(key) {
    if (this.isValid(key)) {
      return this.cache.get(key);
    }
    return null;
  }

  // Set cached data with TTL
  set(key, data, ttl = this.defaultTTL) {
    this.cache.set(key, data);
    this.cacheExpiry.set(key, Date.now() + ttl);
  }

  // Clear specific cache entry
  delete(key) {
    this.cache.delete(key);
    this.cacheExpiry.delete(key);
    this.pendingRequests.delete(key);
  }

  // Clear all cache
  clear() {
    this.cache.clear();
    this.cacheExpiry.clear();
    this.pendingRequests.clear();
  }

  // Request deduplication - prevent multiple identical requests
  async dedupedRequest(key, requestFn, ttl = this.defaultTTL) {
    // Check cache first
    const cached = this.get(key);
    if (cached) {
      return cached;
    }

    // Check if request is already pending
    if (this.pendingRequests.has(key)) {
      return this.pendingRequests.get(key);
    }

    // Make new request
    const promise = requestFn()
      .then(result => {
        this.set(key, result, ttl);
        this.pendingRequests.delete(key);
        return result;
      })
      .catch(error => {
        this.pendingRequests.delete(key);
        throw error;
      });

    this.pendingRequests.set(key, promise);
    return promise;
  }

  // Get cache statistics
  getStats() {
    return {
      cacheSize: this.cache.size,
      pendingRequests: this.pendingRequests.size,
      hitRate: this.hitCount / (this.hitCount + this.missCount) || 0
    };
  }
}

// Create singleton instance
const cacheManager = new CacheManager();

// Firebase data cache with optimized patterns
export class FirebaseCache {
  constructor() {
    this.cache = cacheManager;
    this.subscribers = new Map();
    this.lastFetchTime = new Map();
  }

  // Cached Firebase data fetching with deduplication
  async getCachedData(path, fetchFn, options = {}) {
    const { ttl = 5 * 60 * 1000, forceRefresh = false } = options;
    const key = `firebase_${path}`;

    if (forceRefresh) {
      this.cache.delete(key);
    }

    return this.cache.dedupedRequest(key, fetchFn, ttl);
  }

  // Optimized subscription management
  subscribe(path, callback, options = {}) {
    const { throttle = 1000 } = options;
    const key = `sub_${path}`;

    // Throttle rapid updates
    let lastUpdate = 0;
    const throttledCallback = (data) => {
      const now = Date.now();
      if (now - lastUpdate >= throttle) {
        lastUpdate = now;
        callback(data);
      }
    };

    this.subscribers.set(key, throttledCallback);
    return () => this.subscribers.delete(key);
  }

  // Batch multiple Firebase operations
  async batchOperations(operations) {
    const results = await Promise.allSettled(
      operations.map(op => op())
    );

    return results.map((result, index) => {
      if (result.status === 'fulfilled') {
        return result.value;
      } else {
        console.error(`Batch operation ${index} failed:`, result.reason);
        return null;
      }
    });
  }

  // Preload critical data
  async preloadCriticalData(paths) {
    const preloadPromises = paths.map(({ path, fetchFn, ttl }) =>
      this.getCachedData(path, fetchFn, { ttl })
    );

    try {
      await Promise.all(preloadPromises);
      console.log('Critical data preloaded successfully');
    } catch (error) {
      console.error('Error preloading critical data:', error);
    }
  }
}

// Image cache for optimizing image loading
export class ImageCache {
  constructor() {
    this.cache = new Map();
    this.loading = new Set();
  }

  // Preload images
  async preloadImage(src) {
    if (this.cache.has(src)) {
      return this.cache.get(src);
    }

    if (this.loading.has(src)) {
      return new Promise((resolve) => {
        const checkLoaded = () => {
          if (this.cache.has(src)) {
            resolve(this.cache.get(src));
          } else {
            setTimeout(checkLoaded, 50);
          }
        };
        checkLoaded();
      });
    }

    this.loading.add(src);

    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        this.cache.set(src, img);
        this.loading.delete(src);
        resolve(img);
      };
      img.onerror = () => {
        this.loading.delete(src);
        reject(new Error(`Failed to load image: ${src}`));
      };
      img.src = src;
    });
  }

  // Batch preload multiple images
  async preloadImages(sources) {
    const promises = sources.map(src => this.preloadImage(src));
    return Promise.allSettled(promises);
  }

  // Clear image cache
  clear() {
    this.cache.clear();
    this.loading.clear();
  }
}

// API request cache with retry logic
export class APICache {
  constructor() {
    this.cache = cacheManager;
    this.retryAttempts = 3;
    this.retryDelay = 1000;
  }

  // Cached API request with retry logic
  async request(url, options = {}, cacheOptions = {}) {
    const { method = 'GET', ...fetchOptions } = options;
    const { ttl = 5 * 60 * 1000, retries = this.retryAttempts } = cacheOptions;
    
    const key = `api_${method}_${url}_${JSON.stringify(fetchOptions)}`;

    const requestFn = async () => {
      let lastError;
      
      for (let attempt = 0; attempt <= retries; attempt++) {
        try {
          const response = await fetch(url, { method, ...fetchOptions });
          
          if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
          }
          
          return await response.json();
        } catch (error) {
          lastError = error;
          
          if (attempt < retries) {
            await new Promise(resolve => 
              setTimeout(resolve, this.retryDelay * Math.pow(2, attempt))
            );
          }
        }
      }
      
      throw lastError;
    };

    return this.cache.dedupedRequest(key, requestFn, ttl);
  }
}

// Export singleton instances
export const firebaseCache = new FirebaseCache();
export const imageCache = new ImageCache();
export const apiCache = new APICache();
export default cacheManager;
