# Toiral - Web Development Agency Website

A modern, responsive website for Toiral web development agency, built with React and powered by Firebase. This project showcases the agency's portfolio, services, and provides interactive contact forms with real-time data management.

## 🚀 Features

- **Modern React Frontend**: Built with React 19 and modern hooks
- **Firebase Integration**: Real-time database, hosting, and analytics
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Interactive Portfolio**: Dynamic project showcase with filtering
- **Contact Management**: Real-time contact form submissions
- **Analytics Tracking**: Custom analytics with Firebase Analytics
- **Performance Optimized**: Optimized builds with caching strategies
- **SEO Friendly**: Proper meta tags and semantic HTML

## 🛠️ Tech Stack

### Frontend
- **React 19**: Modern React with hooks and concurrent features
- **React Router**: Client-side routing
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Beautiful icons
- **Radix UI**: Accessible UI components

### Backend & Services
- **Firebase Realtime Database**: Real-time data synchronization
- **Firebase Hosting**: Fast, secure web hosting
- **Firebase Analytics**: User behavior tracking
- **Firebase Security Rules**: Data access control

### Development Tools
- **Create React App**: Development environment
- **ESLint**: Code linting
- **PostCSS**: CSS processing
- **Firebase CLI**: Deployment and management

## 📁 Project Structure

```
toiral-website/
├── frontend/                 # React application
│   ├── public/               # Static assets
│   ├── src/
│   │   ├── components/       # React components
│   │   │   ├── ui/          # Reusable UI components
│   │   │   ├── Contact.js   # Contact form component
│   │   │   ├── Header.js    # Navigation header
│   │   │   ├── Hero.js      # Hero section
│   │   │   └── ...          # Other components
│   │   ├── pages/           # Page components
│   │   │   ├── Home.js      # Homepage
│   │   │   ├── Portfolio.js # Portfolio page
│   │   │   └── ServiceDetail.js # Service details
│   │   ├── services/        # Firebase services
│   │   │   ├── contactService.js    # Contact form handling
│   │   │   ├── dataService.js       # Website data management
│   │   │   └── analyticsService.js  # Analytics tracking
│   │   ├── lib/             # Utilities and configurations
│   │   │   └── firebase.js  # Firebase configuration
│   │   ├── data/            # Static data
│   │   │   └── mock.js      # Initial data structure
│   │   └── utils/           # Utility functions
│   │       └── initializeDatabase.js # Database initialization
│   ├── package.json         # Frontend dependencies
│   └── .env.local          # Environment variables
├── scripts/                 # Deployment and utility scripts
│   ├── deploy.js           # Deployment automation
│   └── init-database.js    # Database initialization
├── firebase.json           # Firebase configuration
├── database.rules.json     # Firebase security rules
├── .firebaserc            # Firebase project configuration
├── package.json           # Root package.json
└── README.md              # This file
```

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ and npm 8+
- Firebase CLI (`npm install -g firebase-tools`)
- Firebase project with Realtime Database enabled

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd toiral-website
   ```

2. **Install dependencies**
   ```bash
   npm run install:all
   ```

3. **Configure Firebase**
   ```bash
   # Login to Firebase
   firebase login

   # Set up environment variables
   cp frontend/.env.example frontend/.env.local
   # Edit .env.local with your Firebase configuration
   ```

4. **Initialize the database**
   ```bash
   npm run init:database
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:3000`.

## 🔧 Configuration

### Environment Variables

Create `frontend/.env.local` with your Firebase configuration:

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

### Firebase Security Rules

The project includes security rules in `database.rules.json`:

- **Website data**: Public read access, no write access
- **Contact submissions**: Public write access with validation
- **Analytics**: Write-only access for tracking
- **Admin data**: No public access

## 📦 Available Scripts

### Root Level Scripts

```bash
# Development
npm run dev                 # Start development server
npm run build              # Build for production
npm run setup              # Install dependencies and initialize database

# Deployment
npm run deploy             # Full deployment (build + deploy)
npm run deploy:hosting     # Deploy only hosting
npm run deploy:database    # Deploy only database rules

# Database
npm run init:database      # Initialize database with sample data

# Firebase
npm run firebase:serve     # Serve locally with Firebase
npm run firebase:emulators # Start Firebase emulators
```

### Frontend Scripts

```bash
cd frontend

npm start                  # Start development server
npm run build             # Build for production
npm test                  # Run tests
```

## 🚀 Deployment

### Automatic Deployment

Use the deployment script for automated deployment:

```bash
# Full deployment
npm run deploy

# Deploy only hosting
npm run deploy:hosting

# Deploy only database rules
npm run deploy:database
```

### Manual Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Deploy to Firebase**
   ```bash
   firebase deploy
   ```

### Deployment Checklist

- [ ] Environment variables configured
- [ ] Firebase project selected (`firebase use <project-id>`)
- [ ] Database rules updated
- [ ] Application built successfully
- [ ] All tests passing

## 🗄️ Database Structure

### Website Data (`/website`)

```json
{
  "hero": {
    "title": "string",
    "subtitle": "string",
    "description": "string",
    "cta": "string"
  },
  "about": {
    "title": "string",
    "description": "string",
    "mission": "string",
    "vision": "string"
  },
  "services": [
    {
      "id": "number",
      "title": "string",
      "description": "string",
      "icon": "string",
      "features": ["string"]
    }
  ],
  "projects": [
    {
      "id": "number",
      "title": "string",
      "description": "string",
      "image": "string",
      "category": "string",
      "technologies": ["string"],
      "featured": "boolean"
    }
  ]
}
```

### Contact Submissions (`/contacts`)

```json
{
  "contactId": {
    "name": "string",
    "email": "string",
    "subject": "string",
    "message": "string",
    "timestamp": "number",
    "status": "new|read|replied|archived"
  }
}
```

### Analytics Data (`/analytics`)

```json
{
  "events": {
    "eventId": {
      "type": "string",
      "data": "object",
      "timestamp": "number",
      "session_id": "string"
    }
  }
}
```

## 🔧 Development

### Local Development

1. **Start the development server**
   ```bash
   npm run dev
   ```

2. **Use Firebase emulators for local testing**
   ```bash
   npm run firebase:emulators
   ```

3. **Run tests**
   ```bash
   cd frontend && npm test
   ```

### Code Structure

#### Services Layer
- **contactService.js**: Handles contact form submissions and management
- **dataService.js**: Manages website content and real-time updates
- **analyticsService.js**: Tracks user interactions and page views

#### Components Architecture
- **UI Components**: Reusable components in `components/ui/`
- **Page Components**: Main page layouts in `pages/`
- **Feature Components**: Specific functionality components

#### State Management
- React hooks for local state
- Firebase real-time listeners for global state
- Context API for shared data (if needed)

## 🔒 Security

### Firebase Security Rules
- Public read access for website content
- Validated write access for contact forms
- No public access to admin data
- Input validation and sanitization

### Environment Variables
- All sensitive data in environment variables
- Separate configurations for development/production
- API keys properly scoped in Firebase Console

## 📊 Analytics

### Firebase Analytics
- Page view tracking
- User engagement metrics
- Contact form conversion tracking
- Custom event tracking

### Custom Analytics
- Real-time event storage in Firebase
- Session tracking
- User interaction analytics
- Performance monitoring

## 🚀 Performance

### Optimization Features
- Code splitting and lazy loading
- Image optimization and lazy loading
- Efficient Firebase queries
- Proper caching strategies
- Bundle size optimization

### Performance Monitoring
- Firebase Performance Monitoring
- Core Web Vitals tracking
- Real User Monitoring (RUM)
- Automated performance alerts

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

### Development Workflow
1. Fork the repository
2. Create a feature branch
3. Make changes and test locally
4. Submit a pull request
5. Code review and merge

### Code Standards
- ESLint configuration for code quality
- Prettier for code formatting
- Conventional commits for git messages
- Component and function documentation

## 📚 Documentation

- [Deployment Guide](docs/DEPLOYMENT.md) - Complete deployment instructions
- [Maintenance Guide](docs/MAINTENANCE.md) - Ongoing maintenance procedures
- [Troubleshooting Guide](docs/TROUBLESHOOTING.md) - Common issues and solutions

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Firebase team for excellent backend services
- React team for the amazing frontend framework
- Tailwind CSS for the utility-first CSS framework
- Lucide React for beautiful icons
- All contributors and supporters

## 📞 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the troubleshooting guide
- Review Firebase documentation

---

**Built with ❤️ by the Toiral Development Team**
```
