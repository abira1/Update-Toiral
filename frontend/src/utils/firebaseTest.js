// Firebase connectivity test utility
import { ref, get, set, push } from 'firebase/database';
import { database } from '../lib/firebase';

/**
 * Test Firebase connectivity and permissions
 */
export const testFirebaseConnection = async () => {
  const results = {
    connection: false,
    read: false,
    write: false,
    error: null
  };

  try {
    // Test 1: Basic connection
    const testRef = ref(database, '.info/connected');
    const snapshot = await get(testRef);
    results.connection = snapshot.exists();
    
    // Test 2: Read test
    try {
      const websiteRef = ref(database, 'website');
      const websiteSnapshot = await get(websiteRef);
      results.read = true;
      console.log('Read test successful:', websiteSnapshot.exists());
    } catch (readError) {
      console.error('Read test failed:', readError);
      results.error = readError.message;
    }

    // Test 3: Write test
    try {
      const testWriteRef = ref(database, 'test');
      await set(testWriteRef, {
        timestamp: Date.now(),
        message: 'Firebase write test'
      });
      results.write = true;
      console.log('Write test successful');
      
      // Clean up test data
      await set(testWriteRef, null);
    } catch (writeError) {
      console.error('Write test failed:', writeError);
      if (!results.error) {
        results.error = writeError.message;
      }
    }

  } catch (error) {
    console.error('Firebase connection test failed:', error);
    results.error = error.message;
  }

  return results;
};

/**
 * Test course creation specifically
 */
export const testCourseCreation = async () => {
  try {
    console.log('Testing course creation...');
    
    const coursesRef = ref(database, 'website/courses');
    console.log('Getting existing courses...');
    
    const snapshot = await get(coursesRef);
    const courses = snapshot.exists() ? snapshot.val() : [];
    console.log('Existing courses:', courses);

    const testCourse = {
      id: `test-${Date.now()}`,
      title: 'Test Course',
      description: 'This is a test course',
      category: 'Testing',
      provider: 'Test Provider',
      duration: '1 hour',
      featured: false,
      status: 'published',
      createdAt: Date.now(),
      updatedAt: Date.now()
    };

    console.log('Creating test course:', testCourse);
    
    const updatedCourses = Array.isArray(courses) ? [...courses, testCourse] : [testCourse];
    await set(coursesRef, updatedCourses);
    
    console.log('Course created successfully!');
    return { success: true, course: testCourse };
    
  } catch (error) {
    console.error('Course creation test failed:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Test contact form submission
 */
export const testContactSubmission = async () => {
  try {
    console.log('Testing contact form submission...');
    
    const contactsRef = ref(database, 'contacts');
    const newContactRef = push(contactsRef);
    
    const testContact = {
      name: 'Test User',
      email: 'test@example.com',
      subject: 'Firebase Test',
      message: 'This is a test message',
      timestamp: Date.now(),
      status: 'new'
    };

    await set(newContactRef, testContact);
    
    console.log('Contact submission successful!');
    return { success: true, contactId: newContactRef.key };
    
  } catch (error) {
    console.error('Contact submission test failed:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Initialize database with basic structure
 */
export const initializeDatabase = async () => {
  try {
    console.log('Initializing database structure...');
    
    const websiteRef = ref(database, 'website');
    const snapshot = await get(websiteRef);
    
    if (!snapshot.exists()) {
      const initialData = {
        hero: {
          title: 'Welcome to Toiral',
          subtitle: 'Your Digital Solutions Partner'
        },
        about: {
          title: 'About Us',
          description: 'We create amazing digital experiences'
        },
        services: [],
        courses: [],
        projects: [],
        team: [],
        contact: {
          email: 'info@toiral.com',
          phone: '+1234567890',
          address: 'Your Address Here'
        }
      };
      
      await set(websiteRef, initialData);
      console.log('Database initialized successfully!');
      return { success: true, message: 'Database initialized' };
    } else {
      console.log('Database already exists');
      return { success: true, message: 'Database already exists' };
    }
    
  } catch (error) {
    console.error('Database initialization failed:', error);
    return { success: false, error: error.message };
  }
};
