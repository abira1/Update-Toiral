// Initialize Firebase with sample data for testing
import { ref, set, get } from 'firebase/database';
import { database } from '../lib/firebase';

/**
 * Initialize Firebase database with basic structure
 */
export const initializeFirebaseData = async () => {
  try {
    console.log('🔥 Initializing Firebase database structure...');
    
    const websiteRef = ref(database, 'website');
    const snapshot = await get(websiteRef);
    
    if (!snapshot.exists()) {
      const initialData = {
        hero: {
          title: "Welcome to Toiral",
          subtitle: "Your Digital Solutions Partner",
          description: "We create innovative digital experiences that drive business growth and user engagement.",
          backgroundImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
        },
        about: {
          title: "About Toiral",
          description: "We are a team of passionate developers and designers committed to creating exceptional digital experiences. Our expertise spans web development, mobile applications, and digital strategy.",
          mission: "To empower businesses with cutting-edge digital solutions that drive growth and innovation.",
          vision: "To be the leading digital solutions provider, transforming ideas into reality through technology.",
          values: ["Innovation", "Quality", "Collaboration", "Excellence"]
        },
        services: [
          {
            id: 1,
            title: "Web Design & Development",
            description: "Custom websites that tell your brand's unique story with stunning visuals and seamless functionality.",
            icon: "Code",
            image: "",
            features: ["Responsive Design", "Custom Development", "Performance Optimization", "SEO Ready", "Mobile First"],
            process: [
              { step: 1, title: 'Discovery', description: 'Understanding your brand, goals, and target audience' },
              { step: 2, title: 'Strategy', description: 'Developing a tailored strategy and roadmap' },
              { step: 3, title: 'Design', description: 'Creating wireframes, mockups, and interactive prototypes' },
              { step: 4, title: 'Development', description: 'Building your solution with clean, scalable code' },
              { step: 5, title: 'Testing', description: 'Rigorous testing across devices and browsers' },
              { step: 6, title: 'Launch', description: 'Deploying your project and providing ongoing support' }
            ],
            packages: [
              {
                name: 'Starter',
                price: '$2,999',
                description: 'Perfect for small businesses',
                features: ['Responsive Design', 'Basic SEO', 'Contact Form', '3 Months Support'],
                featured: false,
                popular: false
              },
              {
                name: 'Professional',
                price: '$5,999',
                description: 'Ideal for growing companies',
                features: ['Custom Design', 'Advanced SEO', 'CMS Integration', 'E-commerce Ready', '6 Months Support'],
                featured: true,
                popular: true
              },
              {
                name: 'Enterprise',
                price: '$12,999',
                description: 'For large organizations',
                features: ['Unlimited Pages', 'Complex Functionality', 'API Integrations', 'Priority Support', '12 Months Support'],
                featured: false,
                popular: false
              }
            ],
            status: 'published',
            featured: true,
            order: 1
          },
          {
            id: 2,
            title: "SEO Services",
            description: "Strategic optimization to help your brand reach and connect with your target audience.",
            icon: "Search",
            image: "",
            features: ["Keyword Research", "Technical SEO", "Content Strategy", "Local SEO", "Analytics & Reporting"],
            process: [
              { step: 1, title: 'SEO Audit', description: 'Comprehensive analysis of your current SEO performance' },
              { step: 2, title: 'Keyword Research', description: 'Identifying high-value keywords for your business' },
              { step: 3, title: 'On-Page Optimization', description: 'Optimizing content, meta tags, and site structure' },
              { step: 4, title: 'Content Creation', description: 'Developing SEO-optimized content that engages users' },
              { step: 5, title: 'Link Building', description: 'Building high-quality backlinks to boost authority' },
              { step: 6, title: 'Monitoring', description: 'Ongoing tracking and optimization of SEO performance' }
            ],
            packages: [
              {
                name: 'Basic SEO',
                price: '$999/mo',
                description: 'Essential SEO for small businesses',
                features: ['Keyword Research', 'On-Page SEO', 'Monthly Reports', 'Basic Analytics'],
                featured: false,
                popular: false
              },
              {
                name: 'Advanced SEO',
                price: '$1,999/mo',
                description: 'Comprehensive SEO strategy',
                features: ['Advanced Keywords', 'Technical SEO', 'Content Strategy', 'Link Building', 'Weekly Reports'],
                featured: true,
                popular: true
              },
              {
                name: 'Enterprise SEO',
                price: '$3,999/mo',
                description: 'Full-scale SEO management',
                features: ['Complete SEO Suite', 'Dedicated Manager', 'Custom Strategy', 'Priority Support', 'Daily Monitoring'],
                featured: false,
                popular: false
              }
            ],
            status: 'published',
            featured: false,
            order: 2
          },
          {
            id: 3,
            title: "Admin Panels",
            description: "Intuitive management systems that put you in control of your digital presence.",
            icon: "Settings",
            image: "",
            features: ["User Management", "Content Management", "Analytics Dashboard", "Role-Based Access", "Real-time Updates"],
            process: [
              { step: 1, title: 'Requirements', description: 'Understanding your management and workflow needs' },
              { step: 2, title: 'Architecture', description: 'Designing the system architecture and user flows' },
              { step: 3, title: 'UI/UX Design', description: 'Creating intuitive interfaces for easy management' },
              { step: 4, title: 'Development', description: 'Building secure, scalable admin functionality' },
              { step: 5, title: 'Integration', description: 'Connecting with your existing systems and databases' },
              { step: 6, title: 'Training', description: 'Training your team and providing documentation' }
            ],
            packages: [
              {
                name: 'Basic Admin',
                price: '$3,999',
                description: 'Simple content management',
                features: ['User Management', 'Content CRUD', 'Basic Analytics', '3 Months Support'],
                featured: false,
                popular: false
              },
              {
                name: 'Advanced Admin',
                price: '$7,999',
                description: 'Full-featured admin panel',
                features: ['Role Management', 'Advanced Analytics', 'File Management', 'API Integration', '6 Months Support'],
                featured: true,
                popular: true
              },
              {
                name: 'Enterprise Admin',
                price: '$15,999',
                description: 'Enterprise-grade solution',
                features: ['Multi-tenant', 'Advanced Security', 'Custom Workflows', 'White-label', '12 Months Support'],
                featured: false,
                popular: false
              }
            ],
            status: 'published',
            featured: false,
            order: 3
          },
          {
            id: 4,
            title: "Full-Stack Solutions",
            description: "Complete end-to-end development solutions for complex business requirements.",
            icon: "Layers",
            image: "",
            features: ["Frontend Development", "Backend APIs", "Database Design", "Cloud Deployment", "DevOps Integration"],
            process: [
              { step: 1, title: 'Analysis', description: 'Deep dive into your business requirements and technical needs' },
              { step: 2, title: 'Architecture', description: 'Designing scalable system architecture and tech stack' },
              { step: 3, title: 'Frontend', description: 'Building responsive, interactive user interfaces' },
              { step: 4, title: 'Backend', description: 'Developing robust APIs and server-side logic' },
              { step: 5, title: 'Integration', description: 'Connecting all components and third-party services' },
              { step: 6, title: 'Deployment', description: 'Cloud deployment with monitoring and maintenance' }
            ],
            packages: [
              {
                name: 'MVP Solution',
                price: '$15,999',
                description: 'Minimum viable product',
                features: ['Basic Frontend', 'REST API', 'Database Setup', 'Basic Deployment', '3 Months Support'],
                featured: false,
                popular: false
              },
              {
                name: 'Professional',
                price: '$29,999',
                description: 'Production-ready solution',
                features: ['Advanced Frontend', 'Scalable APIs', 'Optimized Database', 'CI/CD Pipeline', '6 Months Support'],
                featured: true,
                popular: true
              },
              {
                name: 'Enterprise',
                price: '$59,999',
                description: 'Enterprise-grade platform',
                features: ['Multi-platform', 'Microservices', 'Advanced Security', 'Auto-scaling', '12 Months Support'],
                featured: false,
                popular: false
              }
            ],
            status: 'published',
            featured: false,
            order: 4
          }
        ],
        courses: [], // Empty - will be populated via admin panel
        projects: [], // Empty - will be populated via admin panel
        team: [], // Empty - will be populated via admin panel
        contact: {
          title: "Let's Create Something Amazing",
          description: "Ready to transform your vision into a digital reality? We're here to help you tell your story.",
          email: "toiral.dev@gmail.com",
          phone: "+8801804673095",
          address: "GM Bari-Satarkul Road, Uttar Badda, Dhaka, Bangladesh",
          social: {
            linkedin: "#",
            twitter: "#",
            github: "#",
            instagram: "#"
          }
        }
      };
      
      await set(websiteRef, initialData);
      console.log('✅ Firebase database initialized with basic structure');
      return { success: true, message: 'Database initialized successfully' };
    } else {
      console.log('✅ Firebase database already exists');
      return { success: true, message: 'Database already exists' };
    }
    
  } catch (error) {
    console.error('❌ Failed to initialize Firebase database:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Add sample course for testing
 */
export const addSampleCourse = async () => {
  try {
    const coursesRef = ref(database, 'website/courses');
    const snapshot = await get(coursesRef);
    const courses = snapshot.exists() ? snapshot.val() : [];
    
    const sampleCourse = {
      id: `course-${Date.now()}`,
      title: "React Development Masterclass",
      description: "Learn React from basics to advanced concepts with hands-on projects and real-world applications.",
      category: "Web Development",
      provider: "Toiral Academy",
      duration: "40 hours",
      level: "Intermediate",
      price: "$199",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      url: "#",
      featured: true,
      status: "published",
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
    
    const updatedCourses = Array.isArray(courses) ? [...courses, sampleCourse] : [sampleCourse];
    await set(coursesRef, updatedCourses);
    
    console.log('✅ Sample course added successfully');
    return { success: true, course: sampleCourse };
  } catch (error) {
    console.error('❌ Failed to add sample course:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Add sample project for testing
 */
export const addSampleProject = async () => {
  try {
    const projectsRef = ref(database, 'website/projects');
    const snapshot = await get(projectsRef);
    const projects = snapshot.exists() ? snapshot.val() : [];
    
    const sampleProject = {
      id: `project-${Date.now()}`,
      title: "E-Commerce Platform",
      description: "A modern e-commerce platform with advanced features including payment processing, inventory management, and analytics.",
      category: "Web Application",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      url: "#",
      github: "#",
      featured: true,
      status: "completed",
      order: 1,
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
    
    const updatedProjects = Array.isArray(projects) ? [...projects, sampleProject] : [sampleProject];
    await set(projectsRef, updatedProjects);
    
    console.log('✅ Sample project added successfully');
    return { success: true, project: sampleProject };
  } catch (error) {
    console.error('❌ Failed to add sample project:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Add sample team member for testing
 */
export const addSampleTeamMember = async () => {
  try {
    const teamRef = ref(database, 'website/team');
    const snapshot = await get(teamRef);
    const team = snapshot.exists() ? snapshot.val() : [];
    
    const sampleMember = {
      id: `member-${Date.now()}`,
      name: "Abu Bakr",
      role: "Full Stack Developer",
      bio: "Passionate full-stack developer with expertise in React, Node.js, and cloud technologies. Dedicated to creating exceptional user experiences.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
      email: "abu@toiral.com",
      linkedin: "#",
      github: "#",
      skills: ["React", "Node.js", "AWS", "MongoDB"],
      active: true,
      order: 1,
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
    
    const updatedTeam = Array.isArray(team) ? [...team, sampleMember] : [sampleMember];
    await set(teamRef, updatedTeam);
    
    console.log('✅ Sample team member added successfully');
    return { success: true, member: sampleMember };
  } catch (error) {
    console.error('❌ Failed to add sample team member:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Initialize complete sample data
 */
export const initializeSampleData = async () => {
  try {
    console.log('🚀 Initializing sample data...');
    
    // Initialize basic structure
    await initializeFirebaseData();
    
    // Add sample content
    await addSampleCourse();
    await addSampleProject();
    await addSampleTeamMember();
    
    console.log('🎉 Sample data initialization completed!');
    return { success: true, message: 'Sample data added successfully' };
  } catch (error) {
    console.error('❌ Sample data initialization failed:', error);
    return { success: false, error: error.message };
  }
};
