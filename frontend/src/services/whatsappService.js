/**
 * WhatsApp Integration Service
 * Handles WhatsApp URL generation and message formatting for contact forms and package selections
 */

// Business WhatsApp number (without + sign, only digits)
const BUSINESS_WHATSAPP_NUMBER = '8801804673095';

/**
 * Encode text for WhatsApp URL
 * @param {string} text - Text to encode
 * @returns {string} - URL encoded text
 */
const encodeWhatsAppText = (text) => {
  return encodeURIComponent(text)
    .replace(/'/g, '%27')
    .replace(/"/g, '%22')
    .replace(/\(/g, '%28')
    .replace(/\)/g, '%29');
};

/**
 * Generate WhatsApp URL with pre-filled message
 * @param {string} message - Pre-filled message
 * @returns {string} - WhatsApp URL
 */
const generateWhatsAppURL = (message) => {
  const encodedMessage = encodeWhatsAppText(message);
  return `https://wa.me/${BUSINESS_WHATSAPP_NUMBER}?text=${encodedMessage}`;
};

/**
 * Format contact form data for WhatsApp message
 * @param {Object} formData - Contact form data
 * @param {string} formData.name - Contact name
 * @param {string} formData.email - Contact email
 * @param {string} formData.subject - Message subject
 * @param {string} formData.message - Message content
 * @returns {string} - Formatted WhatsApp message
 */
export const formatContactMessage = (formData) => {
  const message = `🌟 *New Contact Inquiry from Website*

👤 *Name:* ${formData.name}
📧 *Email:* ${formData.email}
📋 *Subject:* ${formData.subject}

💬 *Message:*
${formData.message}

---
📅 *Sent:* ${new Date().toLocaleString()}
🌐 *Source:* Toiral Website Contact Form`;

  return message;
};

/**
 * Format package selection data for WhatsApp message
 * @param {Object} packageData - Selected package data
 * @param {string} packageData.name - Package name
 * @param {string} packageData.price - Package price
 * @param {string} packageData.description - Package description
 * @param {Array} packageData.features - Package features
 * @param {Object} userInfo - Optional user information
 * @returns {string} - Formatted WhatsApp message
 */
export const formatPackageMessage = (packageData, userInfo = null) => {
  let message = `🎯 *Package Selection from Website*

📦 *Selected Package:* ${packageData.name}
💰 *Price:* ${packageData.price}
📝 *Description:* ${packageData.description}

✨ *Included Features:*`;

  // Add features list
  packageData.features.forEach((feature, index) => {
    message += `\n${index + 1}. ${feature}`;
  });

  // Add user information if provided
  if (userInfo && userInfo.name) {
    message += `\n\n👤 *Customer Information:*`;
    message += `\n• Name: ${userInfo.name}`;
    if (userInfo.email) message += `\n• Email: ${userInfo.email}`;
    if (userInfo.phone) message += `\n• Phone: ${userInfo.phone}`;
  }

  message += `\n\n---
📅 *Sent:* ${new Date().toLocaleString()}
🌐 *Source:* Toiral Website Package Selection

💡 *Next Steps:*
I'm interested in the ${packageData.name} package. Please provide more details about the timeline, customization options, and next steps to get started.`;

  return message;
};

/**
 * Open WhatsApp with contact form data
 * @param {Object} formData - Contact form data
 * @returns {string} - WhatsApp URL
 */
export const openWhatsAppWithContact = (formData) => {
  const message = formatContactMessage(formData);
  const whatsappURL = generateWhatsAppURL(message);
  
  // Open WhatsApp in new tab/window
  window.open(whatsappURL, '_blank');
  
  return whatsappURL;
};

/**
 * Open WhatsApp with package selection data
 * @param {Object} packageData - Selected package data
 * @param {Object} userInfo - Optional user information
 * @returns {string} - WhatsApp URL
 */
export const openWhatsAppWithPackage = (packageData, userInfo = null) => {
  const message = formatPackageMessage(packageData, userInfo);
  const whatsappURL = generateWhatsAppURL(message);
  
  // Open WhatsApp in new tab/window
  window.open(whatsappURL, '_blank');
  
  return whatsappURL;
};

/**
 * Check if WhatsApp is available on the device
 * @returns {boolean} - True if WhatsApp is likely available
 */
export const isWhatsAppAvailable = () => {
  // Check if it's a mobile device
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  // WhatsApp Web works on desktop, WhatsApp app on mobile
  return true; // Always return true as wa.me works on all platforms
};

/**
 * Get appropriate WhatsApp URL based on device
 * @param {string} message - Pre-filled message
 * @returns {string} - Device-appropriate WhatsApp URL
 */
export const getDeviceAppropriateWhatsAppURL = (message) => {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const encodedMessage = encodeWhatsAppText(message);
  
  if (isMobile) {
    // On mobile, try to open the WhatsApp app directly
    return `whatsapp://send?phone=${BUSINESS_WHATSAPP_NUMBER}&text=${encodedMessage}`;
  } else {
    // On desktop, use WhatsApp Web
    return `https://wa.me/${BUSINESS_WHATSAPP_NUMBER}?text=${encodedMessage}`;
  }
};

/**
 * Open WhatsApp with fallback handling
 * @param {string} message - Pre-filled message
 * @returns {void}
 */
export const openWhatsAppWithFallback = (message) => {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  if (isMobile) {
    // Try to open WhatsApp app first
    const appURL = getDeviceAppropriateWhatsAppURL(message);
    const webURL = generateWhatsAppURL(message);
    
    // Create a temporary link to test if WhatsApp app is available
    const link = document.createElement('a');
    link.href = appURL;
    
    // Try to open the app
    window.location.href = appURL;
    
    // Fallback to web version after a short delay if app doesn't open
    setTimeout(() => {
      window.open(webURL, '_blank');
    }, 1000);
  } else {
    // On desktop, directly open WhatsApp Web
    const webURL = generateWhatsAppURL(message);
    window.open(webURL, '_blank');
  }
};

/**
 * Track WhatsApp interaction for analytics
 * @param {string} type - Type of interaction ('contact' or 'package')
 * @param {Object} data - Additional data for tracking
 */
export const trackWhatsAppInteraction = (type, data = {}) => {
  try {
    // Track the WhatsApp interaction
    if (window.gtag) {
      window.gtag('event', 'whatsapp_interaction', {
        event_category: 'engagement',
        event_label: type,
        custom_parameter_1: data.packageName || data.subject || 'unknown'
      });
    }
    
    // Custom tracking can be added here
    console.log(`WhatsApp interaction tracked: ${type}`, data);
  } catch (error) {
    console.error('Error tracking WhatsApp interaction:', error);
  }
};
