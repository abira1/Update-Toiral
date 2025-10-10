#!/usr/bin/env node

/**
 * Initialize admin setup for Toiral website
 * This script sets up the admin users structure in Firebase
 */

const { initializeApp } = require('firebase/app');
const { getDatabase, ref, set, get } = require('firebase/database');

// Firebase configuration (using environment variables or defaults)
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY || "AIzaSyDZDlwmPMVR2n7LIj_9syKhKKCepIEWw_Q",
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN || "toiral-development.firebaseapp.com",
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL || "https://toiral-development-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID || "toiral-development",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET || "toiral-development.firebasestorage.app",
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID || "408992435427",
  appId: process.env.REACT_APP_FIREBASE_APP_ID || "1:408992435427:web:0e06bd843d788c80ca89d6",
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID || "G-YHZT50WVTQ"
};

// Admin email addresses
const ADMIN_EMAILS = [
  'socraticsoul01@gmail.com',
  'abirsabirhossain@gmail.com'
];

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

async function initializeAdminStructure() {
  try {
    log('🚀 Initializing Firebase Admin Structure...', 'cyan');
    
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const database = getDatabase(app);
    
    // Check if admin structure already exists
    const adminRef = ref(database, 'admin');
    const snapshot = await get(adminRef);
    
    if (snapshot.exists()) {
      log('ℹ️  Admin structure already exists in database', 'yellow');
      log('✅ Admin initialization complete', 'green');
      return;
    }
    
    // Create admin users structure
    const adminUsers = {};
    
    ADMIN_EMAILS.forEach((email, index) => {
      const userId = `admin_${index + 1}`;
      adminUsers[userId] = {
        email: email,
        role: 'admin',
        displayName: email.split('@')[0],
        created: Date.now(),
        lastLogin: null,
        permissions: ['read', 'write', 'delete', 'manage_users'],
        status: 'active'
      };
    });
    
    // Create admin settings
    const adminSettings = {
      maintenanceMode: false,
      contactNotifications: true,
      analyticsEnabled: true,
      lastUpdated: Date.now()
    };
    
    // Set admin structure in database
    const adminData = {
      users: adminUsers,
      settings: adminSettings
    };
    
    await set(adminRef, adminData);
    
    log('✅ Admin structure initialized successfully!', 'green');
    log('📧 Admin emails configured:', 'blue');
    ADMIN_EMAILS.forEach(email => {
      log(`   • ${email}`, 'blue');
    });
    
    log('\n🔐 Next steps:', 'yellow');
    log('1. Enable Google Authentication in Firebase Console', 'yellow');
    log('2. Go to /admin/login to sign in with Google', 'yellow');
    log('3. Use one of the configured admin Google accounts', 'yellow');
    log('4. Admin accounts will be created automatically on first sign-in', 'yellow');
    
  } catch (error) {
    log('❌ Error initializing admin structure:', 'red');
    log(error.message, 'red');
    process.exit(1);
  }
}

// Run the initialization
if (require.main === module) {
  initializeAdminStructure()
    .then(() => {
      log('\n🎉 Admin initialization completed successfully!', 'green');
      process.exit(0);
    })
    .catch((error) => {
      log('\n💥 Admin initialization failed:', 'red');
      log(error.message, 'red');
      process.exit(1);
    });
}

module.exports = { initializeAdminStructure };
