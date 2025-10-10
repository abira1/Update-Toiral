// Website data service for Firebase Realtime Database
import { ref, get, set, onValue, off } from 'firebase/database';
import { database } from '../lib/firebase';
import { firebaseCache } from '../utils/cacheManager';

/**
 * Get website data with real-time updates
 * @param {Function} callback - Callback function to handle data updates
 * @returns {Function} - Unsubscribe function
 */
export const subscribeToWebsiteData = (callback) => {
  const dataRef = ref(database, 'website');
  
  const unsubscribe = onValue(dataRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      callback(data);
    } else {
      // If no data exists, return empty structure
      callback({
        hero: {},
        about: {},
        services: [],
        courses: [],
        projects: [],
        team: [],
        contact: {}
      });
    }
  }, (error) => {
    console.error('Error fetching website data:', error);
    callback(null);
  });

  return () => off(dataRef, 'value', unsubscribe);
};

/**
 * Get website data once (no real-time updates) with caching
 * @param {Object} options - Cache options
 * @returns {Promise<Object>} - Website data
 */
export const getWebsiteData = async (options = {}) => {
  const { forceRefresh = false, ttl = 5 * 60 * 1000 } = options;

  const fetchFn = async () => {
    try {
      const dataRef = ref(database, 'website');
      const snapshot = await get(dataRef);

      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        // Return empty structure if no data exists
        return {
          hero: {},
          about: {},
          services: [],
          courses: [],
          projects: [],
          team: [],
          contact: {}
        };
      }
    } catch (error) {
      console.error('Error fetching website data:', error);
      throw new Error('Failed to fetch website data');
    }
  };

  return firebaseCache.getCachedData('website', fetchFn, { ttl, forceRefresh });
};

/**
 * Update website data section
 * @param {string} section - Section name (hero, about, services, etc.)
 * @param {Object} data - Section data
 * @returns {Promise<void>}
 */
export const updateWebsiteSection = async (section, data) => {
  try {
    const sectionRef = ref(database, `website/${section}`);
    await set(sectionRef, data);
  } catch (error) {
    console.error(`Error updating ${section} section:`, error);
    throw new Error(`Failed to update ${section} section`);
  }
};

/**
 * Initialize website data with default values
 * @param {Object} initialData - Initial data structure
 * @returns {Promise<void>}
 */
export const initializeWebsiteData = async (initialData) => {
  try {
    const dataRef = ref(database, 'website');
    const snapshot = await get(dataRef);
    
    // Only initialize if no data exists
    if (!snapshot.exists()) {
      await set(dataRef, initialData);
      console.log('Website data initialized successfully');
    } else {
      console.log('Website data already exists, skipping initialization');
    }
  } catch (error) {
    console.error('Error initializing website data:', error);
    throw new Error('Failed to initialize website data');
  }
};

/**
 * Get specific service data
 * @param {string} serviceId - Service ID
 * @returns {Promise<Object|null>} - Service data or null if not found
 */
export const getServiceData = async (serviceId) => {
  try {
    const servicesRef = ref(database, 'website/services');
    const snapshot = await get(servicesRef);
    
    if (snapshot.exists()) {
      const services = snapshot.val();
      return services.find(service => service.id === parseInt(serviceId)) || null;
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching service data:', error);
    throw new Error('Failed to fetch service data');
  }
};

/**
 * Get portfolio/projects data with filtering
 * @param {Object} filters - Filter options
 * @param {string} filters.category - Filter by category
 * @param {boolean} filters.featured - Filter featured projects only
 * @returns {Promise<Array>} - Filtered projects array
 */
export const getProjectsData = async (filters = {}) => {
  try {
    const projectsRef = ref(database, 'website/projects');
    const snapshot = await get(projectsRef);
    
    if (snapshot.exists()) {
      let projects = snapshot.val();
      
      // Apply filters
      if (filters.category) {
        projects = projects.filter(project => 
          project.category.toLowerCase() === filters.category.toLowerCase()
        );
      }
      
      if (filters.featured) {
        projects = projects.filter(project => project.featured === true);
      }
      
      return projects;
    }
    
    return [];
  } catch (error) {
    console.error('Error fetching projects data:', error);
    throw new Error('Failed to fetch projects data');
  }
};

/**
 * Get courses data with filtering
 * @param {Object} filters - Filter options
 * @param {string} filters.category - Filter by category
 * @param {string} filters.provider - Filter by provider
 * @returns {Promise<Array>} - Filtered courses array
 */
export const getCoursesData = async (filters = {}) => {
  try {
    const coursesRef = ref(database, 'website/courses');
    const snapshot = await get(coursesRef);

    if (snapshot.exists()) {
      let courses = snapshot.val();

      // Apply filters
      if (filters.category) {
        courses = courses.filter(course =>
          course.category.toLowerCase() === filters.category.toLowerCase()
        );
      }

      if (filters.provider) {
        courses = courses.filter(course =>
          course.provider.toLowerCase() === filters.provider.toLowerCase()
        );
      }

      return courses;
    }

    return [];
  } catch (error) {
    console.error('Error fetching courses data:', error);
    throw new Error('Failed to fetch courses data');
  }
};

/**
 * Subscribe to specific data section with real-time updates
 * @param {string} section - Section name
 * @param {Function} callback - Callback function
 * @returns {Function} - Unsubscribe function
 */
export const subscribeToSection = (section, callback) => {
  const sectionRef = ref(database, `website/${section}`);

  const unsubscribe = onValue(sectionRef, (snapshot) => {
    const data = snapshot.val();
    callback(data || {});
  }, (error) => {
    console.error(`Error fetching ${section} data:`, error);
    callback({});
  });

  return () => off(sectionRef, 'value', unsubscribe);
};

// ===== CRUD Operations for Admin Dashboard =====

// CRUD Operations for Courses
export const createCourse = async (courseData) => {
  try {
    const coursesRef = ref(database, 'website/courses');
    const snapshot = await get(coursesRef);
    const courses = snapshot.exists() ? snapshot.val() : [];

    const newCourse = {
      id: Date.now().toString(),
      ...courseData,
      createdAt: Date.now(),
      updatedAt: Date.now()
    };

    const updatedCourses = [...courses, newCourse];
    await set(coursesRef, updatedCourses);

    return newCourse;
  } catch (error) {
    console.error('Error creating course:', error);
    throw new Error('Failed to create course');
  }
};

export const updateCourse = async (courseId, courseData) => {
  try {
    const coursesRef = ref(database, 'website/courses');
    const snapshot = await get(coursesRef);
    const courses = snapshot.exists() ? snapshot.val() : [];

    const updatedCourses = courses.map(course =>
      course.id === courseId
        ? { ...course, ...courseData, updatedAt: Date.now() }
        : course
    );

    await set(coursesRef, updatedCourses);
    return updatedCourses.find(course => course.id === courseId);
  } catch (error) {
    console.error('Error updating course:', error);
    throw new Error('Failed to update course');
  }
};

export const deleteCourse = async (courseId) => {
  try {
    const coursesRef = ref(database, 'website/courses');
    const snapshot = await get(coursesRef);
    const courses = snapshot.exists() ? snapshot.val() : [];

    const updatedCourses = courses.filter(course => course.id !== courseId);
    await set(coursesRef, updatedCourses);

    return true;
  } catch (error) {
    console.error('Error deleting course:', error);
    throw new Error('Failed to delete course');
  }
};

// CRUD Operations for Projects
export const createProject = async (projectData) => {
  try {
    const projectsRef = ref(database, 'website/projects');
    const snapshot = await get(projectsRef);
    const projects = snapshot.exists() ? snapshot.val() : [];

    const newProject = {
      id: Date.now().toString(),
      ...projectData,
      createdAt: Date.now(),
      updatedAt: Date.now()
    };

    const updatedProjects = [...projects, newProject];
    await set(projectsRef, updatedProjects);

    return newProject;
  } catch (error) {
    console.error('Error creating project:', error);
    throw new Error('Failed to create project');
  }
};

export const updateProject = async (projectId, projectData) => {
  try {
    const projectsRef = ref(database, 'website/projects');
    const snapshot = await get(projectsRef);
    const projects = snapshot.exists() ? snapshot.val() : [];

    const updatedProjects = projects.map(project =>
      project.id === projectId
        ? { ...project, ...projectData, updatedAt: Date.now() }
        : project
    );

    await set(projectsRef, updatedProjects);
    return updatedProjects.find(project => project.id === projectId);
  } catch (error) {
    console.error('Error updating project:', error);
    throw new Error('Failed to update project');
  }
};

export const deleteProject = async (projectId) => {
  try {
    const projectsRef = ref(database, 'website/projects');
    const snapshot = await get(projectsRef);
    const projects = snapshot.exists() ? snapshot.val() : [];

    const updatedProjects = projects.filter(project => project.id !== projectId);
    await set(projectsRef, updatedProjects);

    return true;
  } catch (error) {
    console.error('Error deleting project:', error);
    throw new Error('Failed to delete project');
  }
};

// CRUD Operations for Services
export const createService = async (serviceData) => {
  try {
    const servicesRef = ref(database, 'website/services');
    const snapshot = await get(servicesRef);
    const services = snapshot.exists() ? snapshot.val() : [];

    const newService = {
      id: Date.now().toString(),
      ...serviceData,
      createdAt: Date.now(),
      updatedAt: Date.now()
    };

    const updatedServices = [...services, newService];
    await set(servicesRef, updatedServices);

    return newService;
  } catch (error) {
    console.error('Error creating service:', error);
    throw new Error('Failed to create service');
  }
};

export const updateService = async (serviceId, serviceData) => {
  try {
    const servicesRef = ref(database, 'website/services');
    const snapshot = await get(servicesRef);
    const services = snapshot.exists() ? snapshot.val() : [];

    const updatedServices = services.map(service =>
      service.id === serviceId
        ? { ...service, ...serviceData, updatedAt: Date.now() }
        : service
    );

    await set(servicesRef, updatedServices);
    return updatedServices.find(service => service.id === serviceId);
  } catch (error) {
    console.error('Error updating service:', error);
    throw new Error('Failed to update service');
  }
};

export const deleteService = async (serviceId) => {
  try {
    const servicesRef = ref(database, 'website/services');
    const snapshot = await get(servicesRef);
    const services = snapshot.exists() ? snapshot.val() : [];

    const updatedServices = services.filter(service => service.id !== serviceId);
    await set(servicesRef, updatedServices);

    return true;
  } catch (error) {
    console.error('Error deleting service:', error);
    throw new Error('Failed to delete service');
  }
};

// CRUD Operations for Process Steps
export const createProcessStep = async (stepData) => {
  try {
    const processRef = ref(database, 'website/process');
    const snapshot = await get(processRef);
    const process = snapshot.exists() ? snapshot.val() : [];

    const newStep = {
      id: Date.now().toString(),
      ...stepData,
      createdAt: Date.now(),
      updatedAt: Date.now()
    };

    const updatedProcess = [...process, newStep];
    await set(processRef, updatedProcess);

    return newStep;
  } catch (error) {
    console.error('Error creating process step:', error);
    throw new Error('Failed to create process step');
  }
};

export const updateProcessStep = async (stepId, stepData) => {
  try {
    const processRef = ref(database, 'website/process');
    const snapshot = await get(processRef);
    const process = snapshot.exists() ? snapshot.val() : [];

    const updatedProcess = process.map(step =>
      step.id === stepId
        ? { ...step, ...stepData, updatedAt: Date.now() }
        : step
    );

    await set(processRef, updatedProcess);
    return updatedProcess.find(step => step.id === stepId);
  } catch (error) {
    console.error('Error updating process step:', error);
    throw new Error('Failed to update process step');
  }
};

export const deleteProcessStep = async (stepId) => {
  try {
    const processRef = ref(database, 'website/process');
    const snapshot = await get(processRef);
    const process = snapshot.exists() ? snapshot.val() : [];

    const updatedProcess = process.filter(step => step.id !== stepId);
    await set(processRef, updatedProcess);

    return true;
  } catch (error) {
    console.error('Error deleting process step:', error);
    throw new Error('Failed to delete process step');
  }
};

// CRUD Operations for Packages
export const createPackage = async (packageData) => {
  try {
    const packagesRef = ref(database, 'website/packages');
    const snapshot = await get(packagesRef);
    const packages = snapshot.exists() ? snapshot.val() : [];

    const newPackage = {
      id: Date.now().toString(),
      ...packageData,
      createdAt: Date.now(),
      updatedAt: Date.now()
    };

    const updatedPackages = [...packages, newPackage];
    await set(packagesRef, updatedPackages);

    return newPackage;
  } catch (error) {
    console.error('Error creating package:', error);
    throw new Error('Failed to create package');
  }
};

export const updatePackage = async (packageId, packageData) => {
  try {
    const packagesRef = ref(database, 'website/packages');
    const snapshot = await get(packagesRef);
    const packages = snapshot.exists() ? snapshot.val() : [];

    const updatedPackages = packages.map(pkg =>
      pkg.id === packageId
        ? { ...pkg, ...packageData, updatedAt: Date.now() }
        : pkg
    );

    await set(packagesRef, updatedPackages);
    return updatedPackages.find(pkg => pkg.id === packageId);
  } catch (error) {
    console.error('Error updating package:', error);
    throw new Error('Failed to update package');
  }
};

export const deletePackage = async (packageId) => {
  try {
    const packagesRef = ref(database, 'website/packages');
    const snapshot = await get(packagesRef);
    const packages = snapshot.exists() ? snapshot.val() : [];

    const updatedPackages = packages.filter(pkg => pkg.id !== packageId);
    await set(packagesRef, updatedPackages);

    return true;
  } catch (error) {
    console.error('Error deleting package:', error);
    throw new Error('Failed to delete package');
  }
};

// CRUD Operations for Team Members
export const createTeamMember = async (memberData) => {
  try {
    const teamRef = ref(database, 'website/team');
    const snapshot = await get(teamRef);
    const team = snapshot.exists() ? snapshot.val() : [];

    const newMember = {
      id: Date.now().toString(),
      ...memberData,
      createdAt: Date.now(),
      updatedAt: Date.now()
    };

    const updatedTeam = [...team, newMember];
    await set(teamRef, updatedTeam);

    return newMember;
  } catch (error) {
    console.error('Error creating team member:', error);
    throw new Error('Failed to create team member');
  }
};

export const updateTeamMember = async (memberId, memberData) => {
  try {
    const teamRef = ref(database, 'website/team');
    const snapshot = await get(teamRef);
    const team = snapshot.exists() ? snapshot.val() : [];

    const updatedTeam = team.map(member =>
      member.id === memberId
        ? { ...member, ...memberData, updatedAt: Date.now() }
        : member
    );

    await set(teamRef, updatedTeam);
    return updatedTeam.find(member => member.id === memberId);
  } catch (error) {
    console.error('Error updating team member:', error);
    throw new Error('Failed to update team member');
  }
};

export const deleteTeamMember = async (memberId) => {
  try {
    const teamRef = ref(database, 'website/team');
    const snapshot = await get(teamRef);
    const team = snapshot.exists() ? snapshot.val() : [];

    const updatedTeam = team.filter(member => member.id !== memberId);
    await set(teamRef, updatedTeam);

    return true;
  } catch (error) {
    console.error('Error deleting team member:', error);
    throw new Error('Failed to delete team member');
  }
};
