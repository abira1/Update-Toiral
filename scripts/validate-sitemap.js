#!/usr/bin/env node

/**
 * Sitemap Validation Script for Toiral
 * 
 * This script validates the sitemap structure and checks for common issues
 * Run: node scripts/validate-sitemap.js
 */

const fs = require('fs');
const path = require('path');

// ANSI color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function success(message) {
  log(`✅ ${message}`, 'green');
}

function error(message) {
  log(`❌ ${message}`, 'red');
}

function warning(message) {
  log(`⚠️  ${message}`, 'yellow');
}

function info(message) {
  log(`ℹ️  ${message}`, 'blue');
}

function header(message) {
  log(`\n${message}`, 'bold');
  log('='.repeat(message.length), 'cyan');
}

// Sitemap files to validate
const SITEMAP_DIR = path.join(__dirname, '../frontend/public');
const SITEMAP_FILES = [
  'sitemap-index.xml',
  'sitemap.xml',
  'sitemap-services.xml',
  'sitemap-images.xml'
];

const ROBOTS_FILE = path.join(SITEMAP_DIR, 'robots.txt');
const BASE_URL = 'https://toiral-development.web.app';

// Expected routes from the application
const EXPECTED_ROUTES = [
  '/',
  '/about',
  '/services',
  '/team',
  '/contact',
  '/courses',
  '/portfolio',
  '/privacy-policy',
  '/terms-of-service',
  '/cookies'
];

const EXPECTED_SERVICE_ROUTES = [
  '/services/web-design-development',
  '/services/seo-services',
  '/services/admin-panels',
  '/services/full-stack-solutions',
  '/service/1',
  '/service/2',
  '/service/3',
  '/service/4'
];

// Validation state
let validationErrors = 0;
let validationWarnings = 0;

/**
 * Check if a file exists
 */
function fileExists(filePath) {
  try {
    return fs.existsSync(filePath);
  } catch (err) {
    return false;
  }
}

/**
 * Read file content
 */
function readFile(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf8');
  } catch (err) {
    error(`Failed to read file: ${filePath}`);
    return null;
  }
}

/**
 * Validate XML structure
 */
function validateXMLStructure(content, filename) {
  header(`Validating ${filename}`);
  
  // Check for XML declaration
  if (!content.startsWith('<?xml version="1.0" encoding="UTF-8"?>')) {
    error('Missing or incorrect XML declaration');
    validationErrors++;
    return false;
  }
  success('XML declaration is correct');
  
  // Check for proper namespace
  if (!content.includes('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"')) {
    error('Missing standard sitemap namespace');
    validationErrors++;
    return false;
  }
  success('Standard namespace declared');
  
  // Check for matching opening and closing tags
  const openingTags = content.match(/<(\w+)/g) || [];
  const closingTags = content.match(/<\/(\w+)>/g) || [];
  
  if (openingTags.length !== closingTags.length) {
    error(`Tag mismatch: ${openingTags.length} opening tags vs ${closingTags.length} closing tags`);
    validationErrors++;
    return false;
  }
  success('All tags properly closed');
  
  return true;
}

/**
 * Count URLs in sitemap
 */
function countURLs(content, filename) {
  const urlMatches = content.match(/<url>/g);
  const urlCount = urlMatches ? urlMatches.length : 0;
  
  if (urlCount === 0) {
    warning(`${filename} contains 0 URLs`);
    validationWarnings++;
  } else {
    info(`${filename} contains ${urlCount} URLs`);
  }
  
  return urlCount;
}

/**
 * Extract URLs from sitemap
 */
function extractURLs(content) {
  const urlRegex = /<loc>(.*?)<\/loc>/g;
  const urls = [];
  let match;
  
  while ((match = urlRegex.exec(content)) !== null) {
    urls.push(match[1]);
  }
  
  return urls;
}

/**
 * Validate URL format
 */
function validateURLs(content, filename) {
  const urls = extractURLs(content);
  
  if (urls.length === 0) {
    return;
  }
  
  let invalidURLs = 0;
  
  urls.forEach(url => {
    // Check if URL starts with base URL
    if (!url.startsWith(BASE_URL)) {
      error(`Invalid URL (doesn't match base URL): ${url}`);
      validationErrors++;
      invalidURLs++;
    }
    
    // Check for fragment identifiers (Google ignores these)
    if (url.includes('#')) {
      error(`URL contains fragment identifier (not indexed by Google): ${url}`);
      validationErrors++;
      invalidURLs++;
    }
    
    // Check for query parameters (should be minimal)
    if (url.includes('?')) {
      warning(`URL contains query parameters: ${url}`);
      validationWarnings++;
    }
  });
  
  if (invalidURLs === 0) {
    success(`All ${urls.length} URLs are properly formatted`);
  } else {
    error(`${invalidURLs} invalid URLs found`);
  }
}

/**
 * Validate lastmod dates
 */
function validateDates(content, filename) {
  const lastmodRegex = /<lastmod>(.*?)<\/lastmod>/g;
  const dates = [];
  let match;
  
  while ((match = lastmodRegex.exec(content)) !== null) {
    dates.push(match[1]);
  }
  
  if (dates.length === 0) {
    warning(`${filename} has no lastmod dates`);
    validationWarnings++;
    return;
  }
  
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  
  let outdatedDates = 0;
  
  dates.forEach(date => {
    const year = parseInt(date.split('-')[0]);
    const month = parseInt(date.split('-')[1]);
    
    // Check if date is from current year
    if (year < currentYear) {
      warning(`Outdated date found: ${date}`);
      outdatedDates++;
    } else if (year === currentYear && month < currentMonth - 1) {
      warning(`Date is more than 1 month old: ${date}`);
      outdatedDates++;
    }
  });
  
  if (outdatedDates === 0) {
    success(`All ${dates.length} dates are current`);
  } else {
    warning(`${outdatedDates} outdated dates found (consider updating)`);
    validationWarnings++;
  }
}

/**
 * Validate sitemap index
 */
function validateSitemapIndex(content) {
  header('Validating Sitemap Index Structure');
  
  const sitemapRefs = extractURLs(content);
  
  sitemapRefs.forEach(ref => {
    const filename = path.basename(ref);
    const filePath = path.join(SITEMAP_DIR, filename);
    
    if (fileExists(filePath)) {
      success(`Referenced sitemap exists: ${filename}`);
    } else {
      error(`Referenced sitemap NOT found: ${filename}`);
      validationErrors++;
    }
  });
}

/**
 * Validate robots.txt
 */
function validateRobotsTxt() {
  header('Validating robots.txt');
  
  if (!fileExists(ROBOTS_FILE)) {
    error('robots.txt not found!');
    validationErrors++;
    return;
  }
  success('robots.txt exists');
  
  const content = readFile(ROBOTS_FILE);
  if (!content) return;
  
  // Check if sitemap is referenced
  if (content.includes('Sitemap: https://toiral-development.web.app/sitemap-index.xml')) {
    success('Sitemap index referenced in robots.txt');
  } else {
    error('Sitemap index NOT referenced in robots.txt');
    validationErrors++;
  }
  
  // Check if sitemaps are allowed
  if (content.includes('Allow: /sitemap*.xml')) {
    success('Sitemaps explicitly allowed in robots.txt');
  } else {
    warning('Sitemaps not explicitly allowed - may cause issues');
    validationWarnings++;
  }
  
  // Check if XML files are blocked
  if (content.includes('Disallow: /*.xml$')) {
    error('CRITICAL: robots.txt blocks ALL XML files (including sitemaps!)');
    validationErrors++;
  } else {
    success('XML files not blocked');
  }
  
  // Check if admin routes are blocked
  if (content.includes('Disallow: /Mahia23/')) {
    success('Admin routes properly blocked');
  } else {
    warning('Admin routes may not be blocked');
    validationWarnings++;
  }
}

/**
 * Check for expected routes
 */
function checkExpectedRoutes(sitemapContent) {
  header('Checking Expected Routes');
  
  const urls = extractURLs(sitemapContent);
  const paths = urls.map(url => url.replace(BASE_URL, ''));
  
  const allExpectedRoutes = [...EXPECTED_ROUTES, ...EXPECTED_SERVICE_ROUTES];
  
  let missingRoutes = 0;
  
  allExpectedRoutes.forEach(route => {
    if (paths.includes(route)) {
      success(`Found: ${route}`);
    } else {
      warning(`Missing route: ${route}`);
      missingRoutes++;
      validationWarnings++;
    }
  });
  
  if (missingRoutes === 0) {
    success('All expected routes are in sitemap');
  } else {
    warning(`${missingRoutes} expected routes are missing`);
  }
}

/**
 * Main validation function
 */
function runValidation() {
  log('\n╔════════════════════════════════════════════════════╗', 'cyan');
  log('║     TOIRAL SITEMAP VALIDATION TOOL v2.0           ║', 'cyan');
  log('╚════════════════════════════════════════════════════╝\n', 'cyan');
  
  // Validate each sitemap file
  let totalURLs = 0;
  let allSitemapContent = '';
  
  SITEMAP_FILES.forEach(filename => {
    const filePath = path.join(SITEMAP_DIR, filename);
    
    if (!fileExists(filePath)) {
      error(`Sitemap file not found: ${filename}`);
      validationErrors++;
      return;
    }
    
    const content = readFile(filePath);
    if (!content) return;
    
    validateXMLStructure(content, filename);
    const urlCount = countURLs(content, filename);
    totalURLs += urlCount;
    
    validateURLs(content, filename);
    validateDates(content, filename);
    
    if (filename === 'sitemap-index.xml') {
      validateSitemapIndex(content);
    }
    
    // Collect all sitemap content for route checking
    if (filename !== 'sitemap-index.xml' && filename !== 'sitemap-images.xml') {
      allSitemapContent += content;
    }
  });
  
  // Validate robots.txt
  validateRobotsTxt();
  
  // Check expected routes
  checkExpectedRoutes(allSitemapContent);
  
  // Summary
  header('Validation Summary');
  info(`Total URLs across all sitemaps: ${totalURLs}`);
  
  if (validationErrors === 0 && validationWarnings === 0) {
    success('✨ Perfect! No errors or warnings found.');
    success('🚀 Your sitemap is ready for Google Search Console!');
  } else {
    if (validationErrors > 0) {
      error(`${validationErrors} error(s) found - MUST be fixed before submission`);
    }
    if (validationWarnings > 0) {
      warning(`${validationWarnings} warning(s) found - consider addressing these`);
    }
  }
  
  log('\n' + '='.repeat(60), 'cyan');
  
  return validationErrors === 0;
}

// Run the validation
const isValid = runValidation();
process.exit(isValid ? 0 : 1);
