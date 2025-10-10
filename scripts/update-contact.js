// Update contact information in Firebase
const { initializeApp } = require('firebase/app');
const { getDatabase, ref, set } = require('firebase/database');

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZDlwmPMVR2n7LIj_9syKhKKCepIEWw_Q",
  authDomain: "toiral-development.firebaseapp.com",
  databaseURL: "https://toiral-development-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "toiral-development",
  storageBucket: "toiral-development.firebasestorage.app",
  messagingSenderId: "408992435427",
  appId: "1:408992435427:web:0e06bd843d788c80ca89d6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Updated contact information
const contactData = {
  title: "Let's Create Something Amazing",
  description: "Ready to transform your vision into a digital reality? We're here to help you tell your story.",
  email: "toiral.dev@gmail.com",
  phone: "+8801804673095",
  address: "GM Bari-Satarkul Road, Uttar Badda, Dhaka, Bangladesh"
};

async function updateContactInfo() {
  try {
    console.log('🔄 Updating contact information in Firebase...');
    
    const contactRef = ref(database, 'website/contact');
    await set(contactRef, contactData);
    
    console.log('✅ Contact information updated successfully!');
    console.log('📧 Email:', contactData.email);
    console.log('📱 WhatsApp:', contactData.phone);
    console.log('📍 Location:', contactData.address);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error updating contact information:', error);
    process.exit(1);
  }
}

updateContactInfo();
