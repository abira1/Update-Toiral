import { ref, update } from 'firebase/database';
import { database } from '../lib/firebase';

export const updateServicesWithFullStructure = async () => {
  try {
    console.log('🔄 Updating services with full structure...');
    
    const servicesRef = ref(database, 'website/services');
    
    const updatedServices = [
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
    ];

    await update(servicesRef, updatedServices);
    console.log('✅ Services updated successfully with full structure');
    return { success: true, message: 'Services updated successfully' };
    
  } catch (error) {
    console.error('❌ Error updating services:', error);
    return { success: false, error: error.message };
  }
};
