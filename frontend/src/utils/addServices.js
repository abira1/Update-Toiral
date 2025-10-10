import { ref, set } from 'firebase/database';
import { database } from '../lib/firebase';

// Default services data
const defaultServices = [
  {
    id: 1,
    title: "Web Design & Development",
    description: "Custom websites that tell your brand's unique story with stunning visuals and seamless functionality.",
    icon: "Code",
    features: ["Responsive Design", "Custom Development", "Performance Optimization"]
  },
  {
    id: 2,
    title: "SEO Services",
    description: "Strategic optimization to help your brand reach and connect with your target audience.",
    icon: "Search",
    features: ["Keyword Research", "Technical SEO", "Content Strategy"]
  },
  {
    id: 3,
    title: "Admin Panels",
    description: "Intuitive management systems that put you in control of your digital presence.",
    icon: "Settings",
    features: ["User Management", "Content Management", "Analytics Dashboard"]
  },
  {
    id: 4,
    title: "Full-Stack Solutions",
    description: "Complete end-to-end development solutions for complex business requirements.",
    icon: "Layers",
    features: ["Frontend Development", "Backend APIs", "Database Design", "Cloud Deployment"]
  }
];

/**
 * Add default services to Firebase
 */
export const addDefaultServices = async () => {
  try {
    const servicesRef = ref(database, 'website/services');
    await set(servicesRef, defaultServices);
    console.log('✅ Default services added successfully');
    return { success: true, message: 'Services added successfully' };
  } catch (error) {
    console.error('❌ Error adding services:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Initialize services if they don't exist
 */
export const initializeServices = async () => {
  try {
    const servicesRef = ref(database, 'website/services');
    const { get } = await import('firebase/database');
    const snapshot = await get(servicesRef);
    
    if (!snapshot.exists() || !snapshot.val() || snapshot.val().length === 0) {
      await set(servicesRef, defaultServices);
      console.log('✅ Services initialized successfully');
      return { success: true, message: 'Services initialized' };
    } else {
      console.log('✅ Services already exist');
      return { success: true, message: 'Services already exist' };
    }
  } catch (error) {
    console.error('❌ Error initializing services:', error);
    return { success: false, error: error.message };
  }
};
