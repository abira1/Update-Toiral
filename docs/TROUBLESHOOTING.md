# Troubleshooting Guide

This guide helps resolve common issues with the Toiral website.

## Development Issues

### Build Errors

#### Error: "Module not found"
**Symptoms:** Build fails with module resolution errors
**Causes:** Missing dependencies, incorrect import paths
**Solutions:**
```bash
# 1. Install missing dependencies
npm install

# 2. Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# 3. Check import paths
# Ensure relative paths are correct
# Example: '../services/contactService' not '@/services/contactService'
```

#### Error: "React Scripts version mismatch"
**Symptoms:** Build fails with version conflicts
**Solutions:**
```bash
# Install correct React Scripts version
cd frontend
npm install react-scripts@5.0.1 --legacy-peer-deps
```

#### Error: "Firebase configuration missing"
**Symptoms:** Firebase initialization errors
**Solutions:**
1. Check `.env.local` file exists in frontend directory
2. Verify all required environment variables are set
3. Ensure variables start with `REACT_APP_`

### Runtime Errors

#### Error: "Firebase app not initialized"
**Symptoms:** Console errors about Firebase not being initialized
**Solutions:**
```javascript
// Check firebase.js configuration
// Ensure all config values are properly set
// Verify environment variables are loaded
```

#### Error: "Permission denied" on database operations
**Symptoms:** Contact form submissions fail, data not loading
**Solutions:**
1. Check Firebase security rules in `database.rules.json`
2. Verify rules are deployed: `firebase deploy --only database`
3. Test rules in Firebase Console Rules Simulator

## Deployment Issues

### Firebase CLI Issues

#### Error: "Not logged in"
**Solutions:**
```bash
# Login to Firebase
firebase login

# If login fails, try logout first
firebase logout
firebase login
```

#### Error: "Project not found"
**Solutions:**
```bash
# List available projects
firebase projects:list

# Set correct project
firebase use your-project-id

# Or add project
firebase use --add
```

### Build Deployment Issues

#### Error: "Build directory not found"
**Symptoms:** Deployment fails, no build directory
**Solutions:**
```bash
# Ensure build completes successfully
cd frontend
npm run build

# Check build directory exists
ls -la build/

# If build fails, check for errors and fix them first
```

#### Error: "Hosting deployment failed"
**Solutions:**
1. Check Firebase project permissions
2. Verify hosting is enabled in Firebase Console
3. Check firebase.json configuration
4. Ensure build directory path is correct

### Database Deployment Issues

#### Error: "Invalid security rules"
**Symptoms:** Database rules deployment fails
**Solutions:**
1. Validate JSON syntax in `database.rules.json`
2. Test rules in Firebase Console
3. Check for syntax errors in rule expressions

## Runtime Issues

### Contact Form Issues

#### Problem: Form submissions not working
**Debugging Steps:**
1. Open browser developer console
2. Check for JavaScript errors
3. Monitor Network tab for failed requests
4. Verify Firebase configuration

**Common Solutions:**
```javascript
// Check contactService.js for errors
// Verify Firebase rules allow writes to /contacts
// Test with simplified form data
```

#### Problem: Form submissions not appearing in database
**Debugging Steps:**
1. Check Firebase Console > Realtime Database
2. Look for data under `/contacts` path
3. Check security rules
4. Verify network requests complete successfully

### Data Loading Issues

#### Problem: Website content not loading
**Symptoms:** Empty sections, loading states persist
**Debugging Steps:**
1. Check browser console for errors
2. Verify Firebase configuration
3. Check database has data
4. Test database connection

**Solutions:**
```javascript
// Check dataService.js implementation
// Verify database structure matches expected format
// Test with Firebase emulators locally
```

#### Problem: Real-time updates not working
**Symptoms:** Data doesn't update automatically
**Solutions:**
1. Check Firebase listeners are properly set up
2. Verify component cleanup (unsubscribe functions)
3. Test with Firebase Console data changes

### Performance Issues

#### Problem: Slow page loading
**Debugging Steps:**
1. Use browser Performance tab
2. Check Network tab for slow requests
3. Analyze bundle size
4. Check image optimization

**Solutions:**
```bash
# Analyze bundle size
cd frontend
npm run build
npx webpack-bundle-analyzer build/static/js/*.js

# Optimize images
# Use WebP format when possible
# Implement lazy loading
```

#### Problem: High memory usage
**Symptoms:** Browser becomes slow, crashes
**Solutions:**
1. Check for memory leaks in React components
2. Ensure Firebase listeners are properly cleaned up
3. Optimize large data sets
4. Implement pagination for large lists

## Firebase Console Issues

### Database Issues

#### Problem: Can't access Realtime Database
**Solutions:**
1. Verify Realtime Database is enabled
2. Check Firebase project permissions
3. Ensure correct database URL in configuration
4. Check browser permissions and ad blockers

#### Problem: Security rules not applying
**Solutions:**
1. Deploy rules: `firebase deploy --only database`
2. Wait for rules to propagate (can take a few minutes)
3. Test rules in Firebase Console simulator
4. Clear browser cache

### Hosting Issues

#### Problem: Custom domain not working
**Solutions:**
1. Verify DNS records are correctly configured
2. Wait for DNS propagation (up to 48 hours)
3. Check SSL certificate status in Firebase Console
4. Test with different DNS servers

#### Problem: Old version still showing
**Solutions:**
1. Clear browser cache
2. Check deployment completed successfully
3. Verify correct build was deployed
4. Check CDN cache (may take time to update)

## Browser-Specific Issues

### Safari Issues

#### Problem: Firebase not working in Safari
**Solutions:**
1. Check Safari version compatibility
2. Disable Safari's "Prevent cross-site tracking"
3. Clear Safari cache and cookies
4. Test in Safari private browsing mode

### Mobile Browser Issues

#### Problem: Touch interactions not working
**Solutions:**
1. Check CSS touch-action properties
2. Test touch event handlers
3. Verify viewport meta tag
4. Test on actual devices, not just browser dev tools

## Network Issues

### Connectivity Problems

#### Problem: Firebase connection fails
**Symptoms:** Offline messages, connection timeouts
**Solutions:**
1. Check internet connectivity
2. Test Firebase status page
3. Check firewall/proxy settings
4. Try different network connection

#### Problem: Slow Firebase operations
**Solutions:**
1. Check Firebase region settings
2. Optimize database queries
3. Implement proper indexing
4. Use Firebase Performance Monitoring

## Debugging Tools

### Browser Developer Tools

#### Console Debugging
```javascript
// Enable Firebase debug logging
localStorage.setItem('debug', 'firebase*');

// Check Firebase connection status
firebase.database().ref('.info/connected').on('value', (snapshot) => {
  console.log('Connected:', snapshot.val());
});
```

#### Network Analysis
1. Open Network tab in developer tools
2. Filter by "firebase" or "googleapis"
3. Check request/response status
4. Monitor request timing

### Firebase Debugging

#### Emulator Suite
```bash
# Start Firebase emulators for local testing
firebase emulators:start

# Test with emulators
# Set environment to use emulator endpoints
```

#### Firebase Console Debugging
1. Use Rules Simulator to test security rules
2. Check Realtime Database logs
3. Monitor Performance tab
4. Review Analytics for user behavior

## Getting Help

### Documentation Resources
- [Firebase Documentation](https://firebase.google.com/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

### Community Support
- [Firebase Community](https://firebase.google.com/community)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/firebase)
- [React Community](https://react.dev/community)

### Professional Support
- Firebase Support (paid plans)
- Google Cloud Support
- Third-party consultants

## Emergency Contacts

### Critical Issues
1. Check Firebase Status Page
2. Contact Firebase Support (if on paid plan)
3. Implement fallback procedures
4. Document incident for post-mortem

### Escalation Procedures
1. **Level 1:** Developer troubleshooting (1-2 hours)
2. **Level 2:** Team lead involvement (2-4 hours)
3. **Level 3:** External support/consultant (4+ hours)
4. **Level 4:** Emergency rollback procedures

## Prevention Strategies

### Monitoring
- Set up Firebase alerts
- Implement error tracking
- Monitor performance metrics
- Regular health checks

### Testing
- Automated testing for critical paths
- Regular manual testing
- Performance testing
- Security testing

### Documentation
- Keep troubleshooting guide updated
- Document all incidents
- Maintain runbooks for common issues
- Regular team knowledge sharing
