#!/usr/bin/env node

/**
 * Database initialization script for Toiral website
 * Populates Firebase Realtime Database with initial data
 */

const { initializeApp } = require('firebase/app');
const { getDatabase, ref, set, get } = require('firebase/database');
const fs = require('fs');
const path = require('path');

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZDlwmPMVR2n7LIj_9syKhKKCepIEWw_Q",
  authDomain: "toiral-development.firebaseapp.com",
  databaseURL: "https://toiral-development-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "toiral-development",
  storageBucket: "toiral-development.firebasestorage.app",
  messagingSenderId: "408992435427",
  appId: "1:408992435427:web:0e06bd843d788c80ca89d6",
  measurementId: "G-YHZT50WVTQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Mock data (same as frontend/src/data/mock.js)
const mockData = {
  hero: {
    title: "Toiral",
    subtitle: "Imagine•Develop•Deploy",
    description: "We don't just build websites — we craft digital experiences that truly reflect the soul of a brand.",
    cta: "Start Your Journey"
  },
  about: {
    title: "Storytelling Through Design",
    description: "At Toiral, we bring together creativity, technology, and strategy to design websites that are not only visually stunning but also highly functional and user-friendly.",
    mission: "We dive deep into the client's theme, art, and inspiration — then transform it into a website that feels authentic, immersive, and engaging.",
    vision: "To become world-renowned for our dedication, artistic approach, and loyalty."
  },
  services: [
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
      description: "End-to-end development from concept to deployment, scalable and future-ready.",
      icon: "Layers",
      features: ["Frontend Development", "Backend Architecture", "Database Design"]
    }
  ],
  projects: [
    {
      id: 1,
      title: "Artisan Café Experience",
      description: "A warm, inviting digital presence for a local coffee roastery, capturing the essence of handcrafted excellence.",
      image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=500&h=300&fit=crop",
      category: "Restaurant & Hospitality",
      technologies: ["React", "Node.js", "MongoDB"],
      client: "Artisan Coffee Co.",
      year: "2024",
      duration: "3 months",
      team: "4 members",
      stats: { views: "4.2K", likes: "324", engagement: "96%" },
      awards: ["Best Design Award 2024", "User Choice Award"],
      liveUrl: "https://artisan-cafe.demo",
      githubUrl: "https://github.com/toiral/artisan-cafe",
      featured: true,
      testimonial: {
        text: "Toiral transformed our vision into a stunning digital experience that increased our online orders by 150%.",
        author: "Sarah Mitchell",
        role: "Owner, Artisan Coffee Co."
      }
    },
    {
      id: 2,
      title: "Fashion Forward",
      description: "An elegant e-commerce platform that showcases haute couture with immersive storytelling.",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&h=300&fit=crop",
      category: "E-commerce",
      technologies: ["Next.js", "Stripe", "Sanity CMS"],
      client: "Fashion House Milano",
      year: "2024",
      duration: "5 months",
      team: "6 members",
      stats: { views: "6.8K", likes: "487", engagement: "98%" },
      awards: ["E-commerce Excellence Award", "Innovation Award"],
      liveUrl: "https://fashion-forward.demo",
      githubUrl: "https://github.com/toiral/fashion-forward",
      featured: true,
      testimonial: {
        text: "The platform exceeded our expectations. Sales increased by 200% in the first quarter.",
        author: "Marco Rossini",
        role: "Creative Director"
      }
    }
  ],
  courses: [
    {
      id: 1,
      title: "Complete Web Development Bootcamp",
      description: "Master modern web development with HTML, CSS, JavaScript, React, Node.js, and MongoDB. Build real-world projects and launch your career.",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&h=300&fit=crop",
      url: "https://www.udemy.com/course/the-complete-web-development-bootcamp/",
      category: "Web Development",
      provider: "Udemy",
      duration: "65 hours"
    },
    {
      id: 2,
      title: "React - The Complete Guide",
      description: "Dive deep into React.js and learn hooks, context, Redux, testing, and Next.js. Build amazing single-page applications.",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=500&h=300&fit=crop",
      url: "https://www.udemy.com/course/react-the-complete-guide-incl-redux/",
      category: "Frontend Development",
      provider: "Udemy",
      duration: "48 hours"
    },
    {
      id: 3,
      title: "Node.js Developer Course",
      description: "Learn server-side development with Node.js, Express, MongoDB, and build RESTful APIs and real-time web applications.",
      image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=500&h=300&fit=crop",
      url: "https://www.udemy.com/course/the-complete-nodejs-developer-course-2/",
      category: "Backend Development",
      provider: "Udemy",
      duration: "35 hours"
    },
    {
      id: 4,
      title: "UI/UX Design Specialization",
      description: "Master user interface and user experience design principles, prototyping, and design thinking methodologies.",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=300&fit=crop",
      url: "https://www.coursera.org/specializations/ui-ux-design",
      category: "Design",
      provider: "Coursera",
      duration: "6 months"
    },
    {
      id: 5,
      title: "Python for Data Science",
      description: "Learn Python programming for data analysis, visualization, and machine learning with pandas, matplotlib, and scikit-learn.",
      image: "https://images.unsplash.com/photo-1526379879527-8559ecfcaec0?w=500&h=300&fit=crop",
      url: "https://www.coursera.org/learn/python-data-analysis",
      category: "Data Science",
      provider: "Coursera",
      duration: "4 weeks"
    },
    {
      id: 6,
      title: "Digital Marketing Masterclass",
      description: "Comprehensive digital marketing course covering SEO, social media, email marketing, and Google Ads strategies.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&h=300&fit=crop",
      url: "https://www.udemy.com/course/learn-digital-marketing-course/",
      category: "Marketing",
      provider: "Udemy",
      duration: "23 hours"
    }
  ],
  team: [
    {
      id: 1,
      name: "Alex Rivera",
      role: "Creative Director",
      description: "Visionary designer with 8+ years crafting digital experiences that resonate with audiences.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "Maya Chen",
      role: "Lead Developer", 
      description: "Full-stack architect who transforms creative visions into robust, scalable solutions.",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Jordan Blake",
      role: "Strategy Consultant",
      description: "Digital strategist specializing in brand storytelling and user experience optimization.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face"
    }
  ],
  contact: {
    title: "Let's Create Something Amazing",
    description: "Ready to transform your vision into a digital reality? We're here to help you tell your story.",
    email: "toiral.dev@gmail.com",
    phone: "+8801804673095",
    address: "GM Bari-Satarkul Road, Uttar Badda, Dhaka, Bangladesh"
  }
};

async function initializeDatabase() {
  console.log('🔥 Initializing Firebase Realtime Database...');
  
  try {
    // Check if data already exists
    const websiteRef = ref(database, 'website');
    const snapshot = await get(websiteRef);
    
    if (snapshot.exists()) {
      console.log('⚠️  Database already contains data. Skipping initialization.');
      console.log('To force re-initialization, manually delete the data from Firebase Console.');
      return;
    }
    
    // Initialize with mock data
    const websiteData = {
      ...mockData,
      metadata: {
        lastUpdated: Date.now(),
        version: '1.0.0',
        initialized: true,
        initializedAt: new Date().toISOString()
      }
    };
    
    await set(websiteRef, websiteData);
    
    console.log('✅ Database initialized successfully!');
    console.log('📊 Data structure:');
    console.log(`   - Hero section: ${websiteData.hero.title}`);
    console.log(`   - Services: ${websiteData.services.length} items`);
    console.log(`   - Projects: ${websiteData.projects.length} items`);
    console.log(`   - Team members: ${websiteData.team.length} items`);
    console.log(`   - Contact info: ${websiteData.contact.email}`);
    
  } catch (error) {
    console.error('❌ Error initializing database:', error);
    process.exit(1);
  }
}

// Run the initialization
if (require.main === module) {
  initializeDatabase().then(() => {
    console.log('🎉 Database initialization completed!');
    process.exit(0);
  }).catch((error) => {
    console.error('💥 Database initialization failed:', error);
    process.exit(1);
  });
}

module.exports = { initializeDatabase, mockData };
