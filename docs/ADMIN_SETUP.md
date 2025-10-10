# Admin Panel Setup Guide

This guide will help you set up and access the admin panel for the Toiral website using Google authentication.

## 🔐 Admin Accounts

The following Google accounts are authorized for admin access:

- `socraticsoul01@gmail.com`
- `abirsabirhossain@gmail.com`

## 🚀 Initial Setup

### Step 1: Initialize Admin Structure

Run the admin initialization script to set up the database structure:

```bash
npm run init:admin
```

This will create the necessary admin user structure in Firebase Realtime Database.

### Step 2: Enable Google Authentication

In your Firebase Console:
1. Go to Authentication → Sign-in method
2. Enable "Google" provider
3. Add your domain to authorized domains if needed
4. Save the changes

### Step 3: Sign In with Google

1. Go to the admin login page: `http://localhost:3000/Mahia23/login`
2. Click "Continue with Google"
3. Sign in with one of the authorized Google accounts
4. Admin account will be created automatically on first sign-in

## 🎛️ Admin Panel Features

### Dashboard
- Overview of website statistics
- Quick actions for content management
- Recent activity tracking

### Content Management
- **Courses**: Manage course listings and content
- **Projects**: Manage portfolio projects
- **Team**: Manage team member profiles
- **Messages**: View and respond to contact form submissions

### Security Features
- Role-based access control
- Protected routes
- Secure Firebase authentication
- Database security rules

## 🔒 Security

### Database Rules
The Firebase database is secured with the following rules:

- **Website content**: Public read, admin-only write
- **Contact forms**: Public write (for submissions), admin-only read
- **Admin data**: Admin-only read/write
- **Analytics**: Admin-only read, public write (for tracking)

### Authentication
- Firebase Authentication with Google OAuth
- Only authorized Google accounts can access admin panel
- Automatic account creation on first sign-in
- Session management with persistent login

## 🛠️ Development

### Running in Development
```bash
npm run dev
```

The admin panel will be available at:
- Access: `http://localhost:3000/Mahia23`
- Login: `http://localhost:3000/Mahia23/login`
- Dashboard: `http://localhost:3000/Mahia23/dashboard`

### Building for Production
```bash
npm run build
```

### Deployment
```bash
npm run deploy
```

## 📱 Mobile Support

The admin panel is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones

## 🔧 Troubleshooting

### Cannot Access Admin Panel
- Ensure you're using an authorized Google account
- Check that Google authentication is enabled in Firebase Console
- Verify Firebase configuration is correct

### Google Sign-In Issues
- Check that popup blockers are disabled
- Ensure you're using one of the authorized Google accounts
- Try clearing browser cache and cookies

### Permission Denied
- Ensure you're signed in with an authorized admin account
- Check that Firebase database rules are properly deployed
- Verify your account has admin role in the database

### Database Connection Issues
- Check Firebase configuration in `.env.local`
- Ensure Firebase project is properly set up
- Verify database rules are deployed

## 📞 Support

If you encounter any issues:

1. Check the browser console for error messages
2. Verify all setup steps have been completed
3. Ensure Firebase project configuration is correct
4. Contact the development team for assistance

## 🔄 Updates

When updating the admin panel:

1. Pull the latest code changes
2. Run `npm install` to update dependencies
3. Run `npm run build` to build the updated version
4. Deploy using `npm run deploy`

## 📋 Admin Checklist

- [ ] Admin initialization script executed
- [ ] Google authentication enabled in Firebase Console
- [ ] Successful Google sign-in with authorized account
- [ ] Database rules deployed
- [ ] All admin features accessible
- [ ] Mobile responsiveness verified
