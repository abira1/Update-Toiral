// Authentication service for Firebase Auth with Google login and admin role management
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { ref, get, set, onValue, off } from 'firebase/database';
import { auth, database, googleProvider } from '../lib/firebase';

// Admin email addresses
const ADMIN_EMAILS = [
  'socraticsoul01@gmail.com',
  'abirsabirhossain@gmail.com'
];

/**
 * Initialize admin users in the database
 * This should be called once to set up the admin accounts
 */
export const initializeAdminUsers = async () => {
  try {
    const adminUsersRef = ref(database, 'admin/users');
    const snapshot = await get(adminUsersRef);
    
    if (!snapshot.exists()) {
      // Initialize admin users structure
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
      
      await set(adminUsersRef, adminUsers);
      console.log('Admin users initialized successfully');
      return { success: true, message: 'Admin users initialized' };
    } else {
      console.log('Admin users already exist');
      return { success: true, message: 'Admin users already exist' };
    }
  } catch (error) {
    console.error('Error initializing admin users:', error);
    throw new Error('Failed to initialize admin users');
  }
};

/**
 * Check if an email is an admin email
 * @param {string} email - Email to check
 * @returns {boolean} - True if email is admin
 */
export const isAdminEmail = (email) => {
  return ADMIN_EMAILS.includes(email?.toLowerCase());
};

/**
 * Sign in with Google and check admin privileges
 * @returns {Promise<Object>} - Sign in result
 */
export const signInWithGoogle = async () => {
  try {
    // Sign in with Google popup
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    // Check if the signed-in user is an authorized admin
    if (!isAdminEmail(user.email)) {
      // Sign out the user immediately if not authorized
      await signOut(auth);
      throw new Error('Access Denied: This Google account is not authorized for admin access');
    }

    // Update last login time in database
    await updateAdminLastLogin(user.uid, user.email);

    return {
      success: true,
      user: {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || user.email.split('@')[0],
        photoURL: user.photoURL,
        role: 'admin'
      },
      message: 'Admin signed in successfully with Google'
    };
  } catch (error) {
    console.error('Google sign in error:', error);

    // Handle specific Firebase Auth errors
    let errorMessage = 'Google sign in failed';
    switch (error.code) {
      case 'auth/popup-closed-by-user':
        errorMessage = 'Sign in was cancelled. Please try again.';
        break;
      case 'auth/popup-blocked':
        errorMessage = 'Popup was blocked by browser. Please allow popups and try again.';
        break;
      case 'auth/cancelled-popup-request':
        errorMessage = 'Sign in was cancelled. Please try again.';
        break;
      case 'auth/network-request-failed':
        errorMessage = 'Network error. Please check your connection and try again.';
        break;
      default:
        errorMessage = error.message;
    }

    throw new Error(errorMessage);
  }
};

// Note: Admin accounts are created automatically when authorized Google accounts sign in for the first time

/**
 * Sign out admin user
 * @returns {Promise<void>}
 */
export const signOutAdmin = async () => {
  try {
    await signOut(auth);
    console.log('Admin signed out successfully');
  } catch (error) {
    console.error('Sign out error:', error);
    throw new Error('Failed to sign out');
  }
};

// Note: Password reset not needed for Google authentication

/**
 * Get current admin user
 * @returns {Promise<Object|null>} - Current user or null
 */
export const getCurrentAdmin = () => {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      unsubscribe();

      if (user) {
        // Check if user is authorized admin
        if (isAdminEmail(user.email)) {
          // Get admin data from database (create if doesn't exist)
          const adminData = await getAdminUserData(user.uid, user.email);

          // Auto-create admin record if it doesn't exist
          if (!adminData.created) {
            await addAdminUserToDatabase(user.uid, user.email, user.displayName, user.photoURL);
          }

          resolve({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName || user.email.split('@')[0],
            photoURL: user.photoURL,
            role: 'admin',
            ...adminData
          });
        } else {
          // User is authenticated but not authorized - sign them out
          await signOut(auth);
          resolve(null);
        }
      } else {
        resolve(null);
      }
    });
  });
};

/**
 * Subscribe to auth state changes
 * @param {Function} callback - Callback function
 * @returns {Function} - Unsubscribe function
 */
export const subscribeToAuthState = (callback) => {
  return onAuthStateChanged(auth, async (user) => {
    if (user) {
      // Check if user is authorized admin
      if (isAdminEmail(user.email)) {
        const adminData = await getAdminUserData(user.uid, user.email);

        // Auto-create admin record if it doesn't exist
        if (!adminData.created) {
          await addAdminUserToDatabase(user.uid, user.email, user.displayName, user.photoURL);
        }

        callback({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || user.email.split('@')[0],
          photoURL: user.photoURL,
          role: 'admin',
          ...adminData
        });
      } else {
        // User is authenticated but not authorized - sign them out
        await signOut(auth);
        callback(null);
      }
    } else {
      callback(null);
    }
  });
};

/**
 * Update admin last login time
 * @param {string} uid - User ID
 * @param {string} email - User email
 */
const updateAdminLastLogin = async (uid, email) => {
  try {
    // Find admin user by email and update last login
    const adminUsersRef = ref(database, 'admin/users');
    const snapshot = await get(adminUsersRef);
    
    if (snapshot.exists()) {
      const users = snapshot.val();
      const userKey = Object.keys(users).find(key => users[key].email === email);
      
      if (userKey) {
        const userRef = ref(database, `admin/users/${userKey}/lastLogin`);
        await set(userRef, Date.now());
      }
    }
  } catch (error) {
    console.error('Error updating last login:', error);
  }
};

/**
 * Add admin user to database
 * @param {string} uid - User ID
 * @param {string} email - User email
 * @param {string} displayName - User display name
 * @param {string} photoURL - User photo URL
 */
const addAdminUserToDatabase = async (uid, email, displayName, photoURL) => {
  try {
    const userRef = ref(database, `admin/users/${uid}`);
    await set(userRef, {
      email: email,
      role: 'admin',
      displayName: displayName || email.split('@')[0],
      photoURL: photoURL || null,
      provider: 'google',
      created: Date.now(),
      lastLogin: Date.now(),
      permissions: ['read', 'write', 'delete', 'manage_users'],
      status: 'active'
    });
  } catch (error) {
    console.error('Error adding admin user to database:', error);
  }
};

/**
 * Get admin user data from database
 * @param {string} uid - User ID
 * @param {string} email - User email
 * @returns {Promise<Object>} - Admin user data
 */
const getAdminUserData = async (uid, email) => {
  try {
    const adminUsersRef = ref(database, 'admin/users');
    const snapshot = await get(adminUsersRef);
    
    if (snapshot.exists()) {
      const users = snapshot.val();
      const userKey = Object.keys(users).find(key => users[key].email === email);
      
      if (userKey) {
        return users[userKey];
      }
    }
    
    return {};
  } catch (error) {
    console.error('Error getting admin user data:', error);
    return {};
  }
};
