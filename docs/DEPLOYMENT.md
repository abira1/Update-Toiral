# Deployment Guide

This guide covers the complete deployment process for the Toiral website to Firebase Hosting.

## Prerequisites

### Required Software
- Node.js 16+ and npm 8+
- Firebase CLI (`npm install -g firebase-tools`)
- Git (for version control)

### Firebase Project Setup
1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com)
2. Enable Realtime Database
3. Enable Firebase Hosting
4. Enable Firebase Analytics (optional)

## Initial Setup

### 1. Firebase CLI Authentication
```bash
# Login to Firebase
firebase login

# Verify login
firebase projects:list
```

### 2. Project Configuration
```bash
# Clone the repository
git clone <repository-url>
cd toiral-website

# Install dependencies
npm run install:all

# Configure Firebase project
firebase use <your-project-id>
```

### 3. Environment Configuration
```bash
# Copy environment template
cp frontend/.env.example frontend/.env.local

# Edit with your Firebase configuration
# Get these values from Firebase Console > Project Settings
```

Required environment variables:
```env
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_DATABASE_URL=https://your_project-default-rtdb.region.firebasedatabase.app
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
REACT_APP_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

## Database Setup

### Initialize Database with Sample Data
```bash
# Initialize database with website content
npm run init:database
```

This will populate your Firebase Realtime Database with:
- Hero section content
- About section information
- Services data
- Portfolio projects
- Team member information
- Contact information

### Deploy Database Security Rules
```bash
# Deploy security rules
npm run deploy:database
```

## Build and Deployment

### Automated Deployment (Recommended)
```bash
# Full deployment (build + hosting + database rules)
npm run deploy

# Deploy only hosting (after making frontend changes)
npm run deploy:hosting

# Deploy only database rules (after updating rules)
npm run deploy:database
```

### Manual Deployment
```bash
# 1. Build the application
npm run build

# 2. Deploy to Firebase
firebase deploy

# Or deploy specific services
firebase deploy --only hosting
firebase deploy --only database
```

## Deployment Verification

### 1. Check Build Output
After building, verify the `frontend/build` directory contains:
- `index.html`
- `static/` folder with CSS, JS, and media files
- Proper asset optimization

### 2. Test Locally Before Deployment
```bash
# Serve locally with Firebase
npm run firebase:serve

# Or use Firebase emulators
npm run firebase:emulators
```

### 3. Post-Deployment Checks
- [ ] Website loads at your Firebase Hosting URL
- [ ] All pages navigate correctly
- [ ] Contact form submissions work
- [ ] Images and assets load properly
- [ ] Mobile responsiveness works
- [ ] Analytics tracking is active (if enabled)

## Continuous Deployment

### GitHub Actions (Optional)
Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Firebase Hosting

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm run install:all
      
      - name: Build
        run: npm run build
        env:
          REACT_APP_FIREBASE_API_KEY: ${{ secrets.FIREBASE_API_KEY }}
          REACT_APP_FIREBASE_AUTH_DOMAIN: ${{ secrets.FIREBASE_AUTH_DOMAIN }}
          REACT_APP_FIREBASE_DATABASE_URL: ${{ secrets.FIREBASE_DATABASE_URL }}
          REACT_APP_FIREBASE_PROJECT_ID: ${{ secrets.FIREBASE_PROJECT_ID }}
          REACT_APP_FIREBASE_STORAGE_BUCKET: ${{ secrets.FIREBASE_STORAGE_BUCKET }}
          REACT_APP_FIREBASE_MESSAGING_SENDER_ID: ${{ secrets.FIREBASE_MESSAGING_SENDER_ID }}
          REACT_APP_FIREBASE_APP_ID: ${{ secrets.FIREBASE_APP_ID }}
          REACT_APP_FIREBASE_MEASUREMENT_ID: ${{ secrets.FIREBASE_MEASUREMENT_ID }}
      
      - name: Deploy to Firebase
        uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: ${{ secrets.GITHUB_TOKEN }}
          firebaseServiceAccount: ${{ secrets.FIREBASE_SERVICE_ACCOUNT }}
          projectId: your-project-id
```

## Custom Domain Setup

### 1. Add Custom Domain in Firebase Console
1. Go to Firebase Console > Hosting
2. Click "Add custom domain"
3. Enter your domain name
4. Follow DNS configuration instructions

### 2. DNS Configuration
Add these DNS records to your domain provider:

```
Type: A
Name: @
Value: 151.101.1.195
Value: 151.101.65.195

Type: CNAME
Name: www
Value: your-project-id.web.app
```

### 3. SSL Certificate
Firebase automatically provisions SSL certificates for custom domains.

## Troubleshooting

### Common Issues

**Build Fails**
- Check Node.js version (16+ required)
- Clear npm cache: `npm cache clean --force`
- Delete node_modules and reinstall: `rm -rf node_modules && npm install`

**Deployment Fails**
- Verify Firebase CLI is logged in: `firebase login`
- Check project selection: `firebase use --add`
- Ensure build directory exists: `ls frontend/build`

**Database Rules Deployment Fails**
- Validate JSON syntax in `database.rules.json`
- Check Firebase project permissions
- Verify Realtime Database is enabled

**Environment Variables Not Working**
- Ensure variables start with `REACT_APP_`
- Check `.env.local` file location (in frontend directory)
- Restart development server after changes

### Getting Help

1. Check Firebase Console for error logs
2. Review browser developer console for client-side errors
3. Check Firebase CLI logs: `firebase debug`
4. Consult Firebase documentation: https://firebase.google.com/docs

## Performance Optimization

### Build Optimization
- Assets are automatically optimized during build
- Code splitting is enabled by default
- Images should be optimized before adding to project

### Caching Strategy
Firebase Hosting automatically applies caching headers:
- Static assets: 1 year cache
- HTML files: No cache (for updates)
- Service worker: Automatic updates

### Monitoring
- Use Firebase Performance Monitoring
- Enable Firebase Analytics for user insights
- Monitor Core Web Vitals in Firebase Console
