// Analytics service for Firebase Analytics and custom tracking
import { logEvent } from 'firebase/analytics';
import { ref, push, set } from 'firebase/database';
import { analytics, database } from '../lib/firebase';

/**
 * Track page view
 * @param {string} pageName - Name of the page
 * @param {string} pageTitle - Title of the page
 */
export const trackPageView = (pageName, pageTitle) => {
  try {
    // Firebase Analytics
    if (analytics) {
      logEvent(analytics, 'page_view', {
        page_title: pageTitle,
        page_location: window.location.href,
        page_path: window.location.pathname
      });
    }

    // Custom tracking to database
    trackCustomEvent('page_view', {
      page_name: pageName,
      page_title: pageTitle,
      page_path: window.location.pathname,
      referrer: document.referrer,
      user_agent: navigator.userAgent,
      timestamp: Date.now()
    });
  } catch (error) {
    console.error('Error tracking page view:', error);
  }
};

/**
 * Track contact form submission
 * @param {string} method - Submission method (form, email, phone)
 */
export const trackContactSubmission = (method = 'form') => {
  try {
    // Firebase Analytics
    if (analytics) {
      logEvent(analytics, 'contact_form_submit', {
        method: method,
        timestamp: Date.now()
      });
    }

    // Custom tracking
    trackCustomEvent('contact_submission', {
      method: method,
      page_path: window.location.pathname,
      timestamp: Date.now()
    });
  } catch (error) {
    console.error('Error tracking contact submission:', error);
  }
};

/**
 * Track service page visits
 * @param {string} serviceId - Service ID
 * @param {string} serviceName - Service name
 */
export const trackServiceView = (serviceId, serviceName) => {
  try {
    // Firebase Analytics
    if (analytics) {
      logEvent(analytics, 'view_item', {
        item_id: serviceId,
        item_name: serviceName,
        item_category: 'service'
      });
    }

    // Custom tracking
    trackCustomEvent('service_view', {
      service_id: serviceId,
      service_name: serviceName,
      timestamp: Date.now()
    });
  } catch (error) {
    console.error('Error tracking service view:', error);
  }
};

/**
 * Track project/portfolio interactions
 * @param {string} projectId - Project ID
 * @param {string} projectName - Project name
 * @param {string} action - Action type (view, click_live, click_github)
 */
export const trackProjectInteraction = (projectId, projectName, action) => {
  try {
    // Firebase Analytics
    if (analytics) {
      logEvent(analytics, 'select_content', {
        content_type: 'project',
        content_id: projectId,
        item_name: projectName,
        action: action
      });
    }

    // Custom tracking
    trackCustomEvent('project_interaction', {
      project_id: projectId,
      project_name: projectName,
      action: action,
      timestamp: Date.now()
    });
  } catch (error) {
    console.error('Error tracking project interaction:', error);
  }
};

/**
 * Track custom events to Firebase Realtime Database
 * @param {string} eventType - Type of event
 * @param {Object} eventData - Event data
 */
export const trackCustomEvent = async (eventType, eventData) => {
  try {
    const eventsRef = ref(database, 'analytics/events');
    const newEventRef = push(eventsRef);
    
    const event = {
      type: eventType,
      data: eventData,
      session_id: getSessionId(),
      timestamp: Date.now(),
      date: new Date().toISOString().split('T')[0] // YYYY-MM-DD format
    };

    await set(newEventRef, event);
  } catch (error) {
    console.error('Error tracking custom event:', error);
  }
};

/**
 * Track user engagement metrics
 * @param {string} element - Element that was engaged with
 * @param {string} action - Action performed (click, hover, scroll)
 */
export const trackEngagement = (element, action) => {
  try {
    // Firebase Analytics
    if (analytics) {
      logEvent(analytics, 'engagement', {
        element: element,
        action: action
      });
    }

    // Custom tracking (throttled to avoid too many events)
    if (shouldTrackEngagement(element, action)) {
      trackCustomEvent('engagement', {
        element: element,
        action: action,
        page_path: window.location.pathname,
        timestamp: Date.now()
      });
    }
  } catch (error) {
    console.error('Error tracking engagement:', error);
  }
};

/**
 * Get or create session ID
 * @returns {string} - Session ID
 */
const getSessionId = () => {
  let sessionId = sessionStorage.getItem('toiral_session_id');
  if (!sessionId) {
    sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    sessionStorage.setItem('toiral_session_id', sessionId);
  }
  return sessionId;
};

/**
 * Throttle engagement tracking to avoid spam
 * @param {string} element - Element name
 * @param {string} action - Action name
 * @returns {boolean} - Whether to track this event
 */
const shouldTrackEngagement = (element, action) => {
  const key = `${element}_${action}`;
  const lastTracked = sessionStorage.getItem(`last_tracked_${key}`);
  const now = Date.now();
  
  // Only track if more than 5 seconds have passed since last tracking
  if (!lastTracked || (now - parseInt(lastTracked)) > 5000) {
    sessionStorage.setItem(`last_tracked_${key}`, now.toString());
    return true;
  }
  
  return false;
};

/**
 * Initialize analytics tracking
 */
export const initializeAnalytics = () => {
  try {
    // Track initial page load
    trackPageView(
      document.title,
      window.location.pathname
    );

    // Track session start
    trackCustomEvent('session_start', {
      page_path: window.location.pathname,
      referrer: document.referrer,
      user_agent: navigator.userAgent,
      screen_resolution: `${screen.width}x${screen.height}`,
      viewport_size: `${window.innerWidth}x${window.innerHeight}`,
      timestamp: Date.now()
    });
  } catch (error) {
    console.error('Error initializing analytics:', error);
  }
};
