// Contact form service for Firebase Realtime Database
import { ref, push, set, onValue, off } from 'firebase/database';
import { database } from '../lib/firebase';

/**
 * Submit a contact form to Firebase
 * @param {Object} formData - Contact form data
 * @param {string} formData.name - Contact name
 * @param {string} formData.email - Contact email
 * @param {string} formData.subject - Message subject
 * @param {string} formData.message - Message content
 * @returns {Promise<Object>} - Submission result with ID and timestamp
 */
export const submitContactForm = async (formData) => {
  try {
    // Validate required fields
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      throw new Error('All fields are required');
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      throw new Error('Invalid email format');
    }

    // Create contact submission object
    const submission = {
      name: formData.name.trim(),
      email: formData.email.trim().toLowerCase(),
      subject: formData.subject.trim(),
      message: formData.message.trim(),
      timestamp: Date.now(),
      status: 'new',
      ip: null, // Could be populated by backend if needed
      userAgent: navigator.userAgent
    };

    // Push to Firebase
    const contactsRef = ref(database, 'contacts');
    const newContactRef = push(contactsRef);
    await set(newContactRef, submission);

    return {
      success: true,
      id: newContactRef.key,
      timestamp: submission.timestamp,
      message: 'Contact form submitted successfully'
    };
  } catch (error) {
    console.error('Error submitting contact form:', error);
    throw new Error(error.message || 'Failed to submit contact form');
  }
};

/**
 * Get all contact submissions (admin function)
 * @param {Function} callback - Callback function to handle data updates
 * @returns {Function} - Unsubscribe function
 */
export const subscribeToContacts = (callback) => {
  const contactsRef = ref(database, 'contacts');
  
  const unsubscribe = onValue(contactsRef, (snapshot) => {
    const data = snapshot.val();
    const contacts = data ? Object.keys(data).map(key => ({
      id: key,
      ...data[key]
    })) : [];
    
    // Sort by timestamp (newest first)
    contacts.sort((a, b) => b.timestamp - a.timestamp);
    
    callback(contacts);
  }, (error) => {
    console.error('Error fetching contacts:', error);
    callback([]);
  });

  return () => off(contactsRef, 'value', unsubscribe);
};

/**
 * Update contact status (admin function)
 * @param {string} contactId - Contact ID
 * @param {string} status - New status ('new', 'read', 'replied', 'archived')
 * @returns {Promise<void>}
 */
export const updateContactStatus = async (contactId, status) => {
  try {
    const contactRef = ref(database, `contacts/${contactId}/status`);
    await set(contactRef, status);
  } catch (error) {
    console.error('Error updating contact status:', error);
    throw new Error('Failed to update contact status');
  }
};

/**
 * Get contact statistics
 * @returns {Promise<Object>} - Contact statistics
 */
export const getContactStats = async () => {
  return new Promise((resolve, reject) => {
    const contactsRef = ref(database, 'contacts');
    
    onValue(contactsRef, (snapshot) => {
      const data = snapshot.val();
      const contacts = data ? Object.values(data) : [];
      
      const stats = {
        total: contacts.length,
        new: contacts.filter(c => c.status === 'new').length,
        read: contacts.filter(c => c.status === 'read').length,
        replied: contacts.filter(c => c.status === 'replied').length,
        archived: contacts.filter(c => c.status === 'archived').length,
        thisMonth: contacts.filter(c => {
          const contactDate = new Date(c.timestamp);
          const now = new Date();
          return contactDate.getMonth() === now.getMonth() && 
                 contactDate.getFullYear() === now.getFullYear();
        }).length
      };
      
      resolve(stats);
    }, reject, { onlyOnce: true });
  });
};

/**
 * Submit a package inquiry to Firebase
 * @param {Object} packageData - Selected package data
 * @param {string} packageData.name - Package name
 * @param {string} packageData.price - Package price
 * @param {string} packageData.description - Package description
 * @param {Array} packageData.features - Package features
 * @param {Object} userInfo - User information (required for modal submissions)
 * @param {string} userInfo.name - User's full name
 * @param {string} userInfo.email - User's email address
 * @param {string} userInfo.mobile - User's mobile number
 * @param {string} userInfo.company - User's company name (optional)
 * @returns {Promise<Object>} - Submission result with ID and timestamp
 */
export const submitPackageInquiry = async (packageData, userInfo = null) => {
  try {
    // Validate required fields for modal submissions
    if (userInfo && (!userInfo.name || !userInfo.email || !userInfo.mobile)) {
      throw new Error('Name, email, and mobile number are required');
    }

    // Validate email format if provided
    if (userInfo && userInfo.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(userInfo.email)) {
        throw new Error('Invalid email format');
      }
    }

    // Create package inquiry object
    const inquiry = {
      // Package information
      packageName: packageData.name,
      packagePrice: packageData.price,
      packageDescription: packageData.description,
      packageFeatures: packageData.features,
      packageFeatured: packageData.featured || false,

      // User information (enhanced for modal submissions)
      userInfo: userInfo ? {
        name: userInfo.name.trim(),
        email: userInfo.email.trim().toLowerCase(),
        mobile: userInfo.mobile.trim(),
        company: userInfo.company ? userInfo.company.trim() : null
      } : null,

      // Metadata
      timestamp: Date.now(),
      status: 'new',
      type: 'package_inquiry',
      source: userInfo ? 'modal_form' : 'direct_selection',
      userAgent: navigator.userAgent,

      // Additional tracking
      hasUserDetails: !!userInfo,
      submissionMethod: userInfo ? 'form_with_details' : 'quick_selection'
    };

    // Push to Firebase under package_inquiries
    const inquiriesRef = ref(database, 'package_inquiries');
    const newInquiryRef = push(inquiriesRef);
    await set(newInquiryRef, inquiry);

    return {
      success: true,
      id: newInquiryRef.key,
      timestamp: inquiry.timestamp,
      message: 'Package inquiry submitted successfully',
      hasUserDetails: !!userInfo
    };
  } catch (error) {
    console.error('Error submitting package inquiry:', error);
    throw new Error(error.message || 'Failed to submit package inquiry');
  }
};

/**
 * Get all package inquiries (admin function)
 * @param {Function} callback - Callback function to handle data updates
 * @returns {Function} - Unsubscribe function
 */
export const subscribeToPackageInquiries = (callback) => {
  const inquiriesRef = ref(database, 'package_inquiries');

  const unsubscribe = onValue(inquiriesRef, (snapshot) => {
    const data = snapshot.val();
    const inquiries = data ? Object.keys(data).map(key => ({
      id: key,
      ...data[key]
    })) : [];

    // Sort by timestamp (newest first)
    inquiries.sort((a, b) => b.timestamp - a.timestamp);

    callback(inquiries);
  }, (error) => {
    console.error('Error fetching package inquiries:', error);
    callback([]);
  });

  return () => off(inquiriesRef, 'value', unsubscribe);
};

/**
 * Get combined inquiries (contacts + package inquiries) for admin panel
 * @param {Function} callback - Callback function to handle data updates
 * @returns {Function} - Unsubscribe function
 */
export const subscribeToAllInquiries = (callback) => {
  let contacts = [];
  let packageInquiries = [];

  const updateCombinedData = () => {
    // Combine and format all inquiries
    const combined = [
      ...contacts.map(contact => ({
        ...contact,
        type: 'contact',
        displayType: 'Contact Form',
        title: contact.subject,
        subtitle: `${contact.name} • ${contact.email}`,
        priority: contact.status === 'new' ? 'high' : 'normal'
      })),
      ...packageInquiries.map(inquiry => ({
        ...inquiry,
        type: 'package_inquiry',
        displayType: 'Package Inquiry',
        title: `${inquiry.packageName} Package`,
        subtitle: inquiry.userInfo
          ? `${inquiry.userInfo.name} • ${inquiry.userInfo.email}`
          : 'Quick Selection',
        priority: inquiry.status === 'new' ? 'high' : 'normal'
      }))
    ];

    // Sort by timestamp (newest first)
    combined.sort((a, b) => b.timestamp - a.timestamp);

    callback(combined);
  };

  // Subscribe to contacts
  const unsubscribeContacts = subscribeToContacts((contactsData) => {
    contacts = contactsData;
    updateCombinedData();
  });

  // Subscribe to package inquiries
  const unsubscribePackageInquiries = subscribeToPackageInquiries((inquiriesData) => {
    packageInquiries = inquiriesData;
    updateCombinedData();
  });

  // Return combined unsubscribe function
  return () => {
    unsubscribeContacts();
    unsubscribePackageInquiries();
  };
};

/**
 * Update inquiry status (works for both contacts and package inquiries)
 * @param {string} inquiryId - Inquiry ID
 * @param {string} inquiryType - Type ('contact' or 'package_inquiry')
 * @param {string} status - New status ('new', 'read', 'replied', 'archived')
 * @returns {Promise<void>}
 */
export const updateInquiryStatus = async (inquiryId, inquiryType, status) => {
  try {
    const refPath = inquiryType === 'contact'
      ? `contacts/${inquiryId}/status`
      : `package_inquiries/${inquiryId}/status`;

    const inquiryRef = ref(database, refPath);
    await set(inquiryRef, status);
  } catch (error) {
    console.error('Error updating inquiry status:', error);
    throw new Error('Failed to update inquiry status');
  }
};
