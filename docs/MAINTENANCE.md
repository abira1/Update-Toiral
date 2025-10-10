# Maintenance Guide

This guide covers ongoing maintenance tasks for the Toiral website.

## Regular Maintenance Tasks

### Weekly Tasks

#### 1. Review Contact Form Submissions
```bash
# Access Firebase Console
# Navigate to Realtime Database > contacts
# Review new submissions and update status
```

**Contact Status Management:**
- `new`: Unread submissions
- `read`: Reviewed but not responded
- `replied`: Response sent to client
- `archived`: Completed or spam

#### 2. Monitor Analytics
- Check Firebase Analytics dashboard
- Review page views and user engagement
- Monitor contact form conversion rates
- Check for any error patterns

#### 3. Performance Monitoring
- Review Core Web Vitals in Firebase Console
- Check page load times
- Monitor mobile vs desktop performance
- Review any performance alerts

### Monthly Tasks

#### 1. Content Updates
```bash
# Update website content through Firebase Console
# Or programmatically through the admin interface
```

**Updatable Content:**
- Portfolio projects
- Service descriptions
- Team member information
- Company information

#### 2. Security Review
- Review Firebase security rules
- Check for any unauthorized access attempts
- Update dependencies if needed
- Review user permissions

#### 3. Backup and Recovery
```bash
# Export database backup
firebase database:get / --output backup-$(date +%Y%m%d).json

# Store backup securely
```

## Content Management

### Adding New Portfolio Projects

1. **Through Firebase Console:**
   - Navigate to Realtime Database
   - Go to `website/projects`
   - Add new project object with required fields

2. **Required Project Fields:**
```json
{
  "id": "unique_number",
  "title": "Project Title",
  "description": "Project description",
  "image": "https://image-url.com/image.jpg",
  "category": "Category Name",
  "technologies": ["Tech1", "Tech2"],
  "client": "Client Name",
  "year": "2024",
  "duration": "X months",
  "team": "X members",
  "stats": {
    "views": "X.XK",
    "likes": "XXX",
    "engagement": "XX%"
  },
  "awards": ["Award 1", "Award 2"],
  "liveUrl": "https://project-url.com",
  "githubUrl": "https://github.com/repo",
  "featured": true,
  "testimonial": {
    "text": "Client testimonial",
    "author": "Client Name",
    "role": "Client Role"
  }
}
```

### Updating Services

1. Navigate to `website/services` in Firebase Console
2. Update existing service or add new one
3. Required fields: `id`, `title`, `description`, `icon`, `features`

### Managing Team Members

1. Navigate to `website/team` in Firebase Console
2. Update member information or add new team members
3. Required fields: `id`, `name`, `role`, `description`, `avatar`

## Database Management

### Database Structure Maintenance

#### 1. Data Validation
```javascript
// Use the validation function from utils/initializeDatabase.js
const { validateDatabaseStructure } = require('./utils/initializeDatabase');

// Validate current data structure
const validation = validateDatabaseStructure(currentData);
if (!validation.valid) {
  console.log('Validation errors:', validation.errors);
}
```

#### 2. Data Cleanup
```bash
# Remove old analytics data (older than 6 months)
# This should be done programmatically or through Firebase Console
```

#### 3. Index Optimization
- Monitor query performance in Firebase Console
- Add indexes for frequently queried fields
- Remove unused indexes

### Security Rules Maintenance

#### 1. Regular Review
```json
// Review and update database.rules.json
// Test rules with Firebase Rules Simulator
```

#### 2. Access Monitoring
- Review Firebase Console for access patterns
- Monitor for any suspicious activity
- Update rules if needed

## Performance Optimization

### Frontend Optimization

#### 1. Bundle Analysis
```bash
cd frontend
npm run build
npx webpack-bundle-analyzer build/static/js/*.js
```

#### 2. Image Optimization
- Compress images before uploading
- Use appropriate formats (WebP when possible)
- Implement lazy loading for portfolio images

#### 3. Code Splitting
- Review and optimize React component lazy loading
- Split large components if needed
- Monitor bundle sizes

### Firebase Optimization

#### 1. Database Queries
- Optimize Firebase queries for better performance
- Use indexes for complex queries
- Limit data fetching to necessary fields

#### 2. Hosting Optimization
- Review caching headers in firebase.json
- Optimize static asset delivery
- Monitor CDN performance

## Monitoring and Alerts

### Setting Up Alerts

#### 1. Firebase Alerts
- Set up budget alerts for Firebase usage
- Configure performance alerts
- Enable crash reporting

#### 2. Uptime Monitoring
```bash
# Use external services like:
# - UptimeRobot
# - Pingdom
# - StatusCake
```

### Key Metrics to Monitor

#### 1. Performance Metrics
- Page load time
- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- Cumulative Layout Shift (CLS)

#### 2. User Engagement
- Page views
- Session duration
- Bounce rate
- Contact form submissions

#### 3. Technical Metrics
- Error rates
- API response times
- Database query performance
- Build success rates

## Troubleshooting Common Issues

### Contact Form Issues

**Problem:** Contact forms not submitting
**Solution:**
1. Check Firebase security rules
2. Verify network connectivity
3. Check browser console for errors
4. Test with Firebase emulators

**Problem:** Contact submissions not appearing
**Solution:**
1. Check Firebase Console for data
2. Verify database rules allow writes
3. Check for validation errors

### Performance Issues

**Problem:** Slow page loading
**Solution:**
1. Check image sizes and optimization
2. Review bundle size
3. Check Firebase hosting performance
4. Monitor network requests

**Problem:** High bounce rate
**Solution:**
1. Review page load times
2. Check mobile responsiveness
3. Analyze user flow in Analytics
4. Test user experience

### Deployment Issues

**Problem:** Build failures
**Solution:**
1. Check Node.js version compatibility
2. Clear npm cache and reinstall dependencies
3. Review error logs
4. Check environment variables

**Problem:** Deployment failures
**Solution:**
1. Verify Firebase CLI authentication
2. Check project permissions
3. Review Firebase quotas and limits
4. Check build output directory

## Emergency Procedures

### Site Down Emergency

1. **Immediate Response:**
   - Check Firebase Console for service status
   - Verify DNS settings
   - Check for any recent deployments

2. **Rollback Procedure:**
   ```bash
   # Rollback to previous deployment
   firebase hosting:clone source-site-id:channel-id target-site-id:live
   ```

3. **Communication:**
   - Update status page if available
   - Notify stakeholders
   - Document incident

### Data Loss Emergency

1. **Immediate Response:**
   - Stop all write operations
   - Assess extent of data loss
   - Check for recent backups

2. **Recovery Procedure:**
   ```bash
   # Restore from backup
   firebase database:set / backup-file.json
   ```

3. **Prevention:**
   - Implement regular automated backups
   - Test backup restoration procedures
   - Document recovery processes

## Maintenance Schedule

### Daily (Automated)
- [ ] Backup database
- [ ] Monitor error logs
- [ ] Check uptime status

### Weekly (Manual)
- [ ] Review contact submissions
- [ ] Check analytics dashboard
- [ ] Monitor performance metrics
- [ ] Review security logs

### Monthly (Manual)
- [ ] Update content as needed
- [ ] Review and update dependencies
- [ ] Analyze user feedback
- [ ] Performance optimization review
- [ ] Security audit

### Quarterly (Manual)
- [ ] Comprehensive security review
- [ ] Database cleanup and optimization
- [ ] Performance benchmarking
- [ ] Disaster recovery testing
- [ ] Documentation updates
