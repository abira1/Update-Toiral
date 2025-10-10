// Database initialization utility
import { initializeWebsiteData } from '../services/dataService';
import { mockData } from '../data/mock';

/**
 * Initialize Firebase database with mock data
 * This should be run once to populate the database with initial content
 */
export const initializeFirebaseDatabase = async () => {
  try {
    console.log('Initializing Firebase database with website data...');
    
    // Transform mock data to match Firebase structure
    const firebaseData = {
      hero: mockData.hero,
      about: mockData.about,
      services: mockData.services,
      projects: mockData.projects,
      team: mockData.team,
      contact: mockData.contact,
      // Add metadata
      metadata: {
        lastUpdated: Date.now(),
        version: '1.0.0',
        initialized: true
      }
    };

    await initializeWebsiteData(firebaseData);
    console.log('Database initialized successfully!');
    
    return {
      success: true,
      message: 'Database initialized with website data'
    };
  } catch (error) {
    console.error('Error initializing database:', error);
    throw new Error('Failed to initialize database: ' + error.message);
  }
};

/**
 * Database schema documentation
 * This describes the structure of data in Firebase Realtime Database
 */
export const DATABASE_SCHEMA = {
  // Website content data
  website: {
    hero: {
      title: 'string',
      subtitle: 'string', 
      description: 'string',
      cta: 'string'
    },
    about: {
      title: 'string',
      description: 'string',
      mission: 'string',
      vision: 'string'
    },
    services: [
      {
        id: 'number',
        title: 'string',
        description: 'string',
        icon: 'string',
        features: ['string']
      }
    ],
    projects: [
      {
        id: 'number',
        title: 'string',
        description: 'string',
        image: 'string',
        category: 'string',
        technologies: ['string'],
        client: 'string',
        year: 'string',
        duration: 'string',
        team: 'string',
        stats: {
          views: 'string',
          likes: 'string',
          engagement: 'string'
        },
        awards: ['string'],
        liveUrl: 'string',
        githubUrl: 'string',
        featured: 'boolean',
        testimonial: {
          text: 'string',
          author: 'string',
          role: 'string'
        }
      }
    ],
    team: [
      {
        id: 'number',
        name: 'string',
        role: 'string',
        description: 'string',
        avatar: 'string'
      }
    ],
    contact: {
      title: 'string',
      description: 'string',
      email: 'string',
      phone: 'string',
      address: 'string'
    },
    metadata: {
      lastUpdated: 'timestamp',
      version: 'string',
      initialized: 'boolean'
    }
  },
  
  // Contact form submissions
  contacts: {
    '{contactId}': {
      name: 'string',
      email: 'string',
      subject: 'string',
      message: 'string',
      timestamp: 'timestamp',
      status: 'string', // 'new', 'read', 'replied', 'archived'
      ip: 'string',
      userAgent: 'string'
    }
  },
  
  // Analytics and tracking data
  analytics: {
    events: {
      '{eventId}': {
        type: 'string',
        data: 'object',
        session_id: 'string',
        timestamp: 'timestamp',
        date: 'string' // YYYY-MM-DD format
      }
    },
    sessions: {
      '{sessionId}': {
        start_time: 'timestamp',
        end_time: 'timestamp',
        page_views: 'number',
        events: 'number',
        user_agent: 'string',
        referrer: 'string'
      }
    }
  },
  
  // Admin settings and configuration
  admin: {
    settings: {
      maintenance_mode: 'boolean',
      contact_notifications: 'boolean',
      analytics_enabled: 'boolean'
    },
    users: {
      '{userId}': {
        email: 'string',
        role: 'string', // 'admin', 'editor', 'viewer'
        created: 'timestamp',
        last_login: 'timestamp'
      }
    }
  }
};

/**
 * Validate database structure
 * @param {Object} data - Data to validate
 * @returns {Object} - Validation result
 */
export const validateDatabaseStructure = (data) => {
  const errors = [];
  const warnings = [];
  
  // Check required sections
  const requiredSections = ['hero', 'about', 'services', 'projects', 'team', 'contact'];
  requiredSections.forEach(section => {
    if (!data[section]) {
      errors.push(`Missing required section: ${section}`);
    }
  });
  
  // Validate services structure
  if (data.services && Array.isArray(data.services)) {
    data.services.forEach((service, index) => {
      if (!service.id || !service.title || !service.description) {
        errors.push(`Service at index ${index} is missing required fields`);
      }
    });
  } else if (data.services) {
    errors.push('Services should be an array');
  }
  
  // Validate projects structure
  if (data.projects && Array.isArray(data.projects)) {
    data.projects.forEach((project, index) => {
      if (!project.id || !project.title || !project.description) {
        errors.push(`Project at index ${index} is missing required fields`);
      }
    });
  } else if (data.projects) {
    errors.push('Projects should be an array');
  }
  
  return {
    valid: errors.length === 0,
    errors,
    warnings
  };
};
