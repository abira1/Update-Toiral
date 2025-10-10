/**
 * Test WhatsApp Integration
 * This file contains test functions to verify WhatsApp message formatting
 */

import { formatContactMessage, formatPackageMessage } from '../services/whatsappService';

// Test contact form data
const testContactData = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  subject: 'Website Development Inquiry',
  message: 'I need a professional website for my business. Can you help me with a custom solution that includes e-commerce functionality?'
};

// Test package data
const testPackageData = {
  name: 'Professional',
  price: '$5,999',
  description: 'Ideal for growing companies',
  features: [
    'Custom Website Design',
    'Up to 10 Pages',
    'Advanced SEO Package',
    'CMS Integration',
    'E-commerce Ready',
    'Analytics Setup',
    'Social Media Integration',
    '6 Months Support'
  ],
  featured: true
};

// Test user info for package selection
const testUserInfo = {
  name: 'Jane Smith',
  email: 'jane.smith@example.com',
  phone: '+1234567890'
};

/**
 * Test contact message formatting
 */
export const testContactMessageFormatting = () => {
  console.log('=== TESTING CONTACT MESSAGE FORMATTING ===');
  const message = formatContactMessage(testContactData);
  console.log('Formatted Contact Message:');
  console.log(message);
  console.log('\n');
  
  // Test URL encoding
  const encodedMessage = encodeURIComponent(message);
  const whatsappURL = `https://wa.me/8801804673095?text=${encodedMessage}`;
  console.log('WhatsApp URL:');
  console.log(whatsappURL);
  console.log('\n');
  
  return { message, whatsappURL };
};

/**
 * Test package message formatting
 */
export const testPackageMessageFormatting = () => {
  console.log('=== TESTING PACKAGE MESSAGE FORMATTING ===');

  // Test without user info
  console.log('--- Without User Info ---');
  const messageWithoutUser = formatPackageMessage(testPackageData);
  console.log(messageWithoutUser);
  console.log('\n');

  // Test with user info
  console.log('--- With User Info ---');
  const messageWithUser = formatPackageMessage(testPackageData, testUserInfo);
  console.log(messageWithUser);
  console.log('\n');

  // Test with modal form user info (enhanced)
  console.log('--- With Modal Form User Info ---');
  const modalUserInfo = {
    name: 'Sarah Johnson',
    email: 'sarah.johnson@company.com',
    mobile: '+1-555-123-4567',
    company: 'Tech Innovations Inc.'
  };
  const messageWithModalUser = formatPackageMessage(testPackageData, modalUserInfo);
  console.log(messageWithModalUser);
  console.log('\n');

  // Test URL encoding
  const encodedMessage = encodeURIComponent(messageWithModalUser);
  const whatsappURL = `https://wa.me/8801804673095?text=${encodedMessage}`;
  console.log('WhatsApp URL:');
  console.log(whatsappURL);
  console.log('\n');

  return { messageWithoutUser, messageWithUser, messageWithModalUser, whatsappURL };
};

/**
 * Test special characters handling
 */
export const testSpecialCharacters = () => {
  console.log('=== TESTING SPECIAL CHARACTERS ===');
  
  const specialContactData = {
    name: "O'Connor & Associates",
    email: 'test@example.com',
    subject: 'Special chars: @#$%^&*()_+-=[]{}|;:,.<>?',
    message: 'Testing special characters: "quotes", \'apostrophes\', (parentheses), and émojis 🚀'
  };
  
  const message = formatContactMessage(specialContactData);
  console.log('Message with special characters:');
  console.log(message);
  console.log('\n');
  
  const encodedMessage = encodeURIComponent(message);
  console.log('URL encoded message:');
  console.log(encodedMessage);
  console.log('\n');
  
  return { message, encodedMessage };
};

/**
 * Run all tests
 */
export const runAllWhatsAppTests = () => {
  console.log('🧪 RUNNING WHATSAPP INTEGRATION TESTS 🧪\n');
  
  const contactTest = testContactMessageFormatting();
  const packageTest = testPackageMessageFormatting();
  const specialCharsTest = testSpecialCharacters();
  
  console.log('✅ All tests completed!');
  console.log('Check the console output above to verify message formatting.');
  
  return {
    contactTest,
    packageTest,
    specialCharsTest
  };
};

// Auto-run tests in development
if (process.env.NODE_ENV === 'development') {
  // Uncomment the line below to run tests automatically
  // runAllWhatsAppTests();
}
