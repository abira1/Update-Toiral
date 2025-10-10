#!/usr/bin/env node

/**
 * Deployment script for Toiral website
 * Handles building and deploying to Firebase Hosting
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

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

function execCommand(command, description) {
  log(`\n${description}...`, 'cyan');
  try {
    execSync(command, { stdio: 'inherit' });
    log(`✅ ${description} completed successfully`, 'green');
  } catch (error) {
    log(`❌ ${description} failed`, 'red');
    process.exit(1);
  }
}

function checkPrerequisites() {
  log('🔍 Checking prerequisites...', 'yellow');
  
  // Check if Firebase CLI is installed
  try {
    execSync('firebase --version', { stdio: 'pipe' });
    log('✅ Firebase CLI is installed', 'green');
  } catch (error) {
    log('❌ Firebase CLI is not installed. Please install it with: npm install -g firebase-tools', 'red');
    process.exit(1);
  }
  
  // Check if user is logged in to Firebase
  try {
    execSync('firebase projects:list', { stdio: 'pipe' });
    log('✅ Firebase authentication verified', 'green');
  } catch (error) {
    log('❌ Not logged in to Firebase. Please run: firebase login', 'red');
    process.exit(1);
  }
  
  // Check if frontend directory exists
  if (!fs.existsSync(path.join(__dirname, '../frontend'))) {
    log('❌ Frontend directory not found', 'red');
    process.exit(1);
  }
  
  log('✅ All prerequisites met', 'green');
}

function buildProject() {
  log('\n🏗️  Building project...', 'yellow');
  
  // Install dependencies if node_modules doesn't exist
  if (!fs.existsSync(path.join(__dirname, '../frontend/node_modules'))) {
    execCommand('cd frontend && npm install', 'Installing frontend dependencies');
  }
  
  // Build the React app
  execCommand('cd frontend && npm run build', 'Building React application');
  
  // Verify build directory exists
  if (!fs.existsSync(path.join(__dirname, '../frontend/build'))) {
    log('❌ Build directory not found after build', 'red');
    process.exit(1);
  }
  
  log('✅ Project built successfully', 'green');
}

function deployToFirebase() {
  log('\n🚀 Deploying to Firebase...', 'yellow');
  
  const deployType = process.argv[2] || 'all';
  
  switch (deployType) {
    case 'hosting':
      execCommand('firebase deploy --only hosting', 'Deploying to Firebase Hosting');
      break;
    case 'database':
      execCommand('firebase deploy --only database', 'Deploying database rules');
      break;
    case 'all':
    default:
      execCommand('firebase deploy', 'Deploying to Firebase (hosting + database)');
      break;
  }
  
  log('✅ Deployment completed successfully', 'green');
}

function main() {
  log('🚀 Starting Toiral website deployment...', 'bright');
  
  try {
    checkPrerequisites();
    buildProject();
    deployToFirebase();
    
    log('\n🎉 Deployment completed successfully!', 'green');
    log('Your website is now live at: https://toiral-development.web.app', 'cyan');
    
  } catch (error) {
    log(`\n❌ Deployment failed: ${error.message}`, 'red');
    process.exit(1);
  }
}

// Run the deployment
if (require.main === module) {
  main();
}

module.exports = { main, checkPrerequisites, buildProject, deployToFirebase };
