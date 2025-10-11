import { Suspense, lazy, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "./components/ui/toaster";
import { RouteLoadingSpinner } from "./components/ui/LoadingSpinner";
import ErrorBoundary from "./components/ErrorBoundary";
import performanceMonitor from "./utils/performanceMonitor";

// Import AuthProvider directly (needed for app initialization)
import { AuthProvider } from "./contexts/AuthContext";

// Lazy load page components for code splitting
const Home = lazy(() => import("./pages/Home"));
const ServiceDetail = lazy(() => import("./pages/ServiceDetail"));
const Portfolio = lazy(() => import("./pages/Portfolio"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ServicesOverview = lazy(() => import("./pages/ServicesOverview"));
const TeamPage = lazy(() => import("./pages/TeamPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const CoursesOverview = lazy(() => import("./pages/CoursesOverview"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/TermsOfService"));
const Cookies = lazy(() => import("./pages/Cookies"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Lazy load admin components (separate chunk)
const ProtectedRoute = lazy(() => import("./components/auth/ProtectedRoute"));
const AdminAccess = lazy(() => import("./pages/admin/AdminAccess"));
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"));
const ComprehensiveDashboard = lazy(() => import("./pages/admin/ComprehensiveDashboard"));

function App() {
  useEffect(() => {
    // Initialize performance monitoring
    if (process.env.NODE_ENV === 'production') {
      performanceMonitor.checkPerformanceBudgets();
    }
  }, []);

  return (
    <ErrorBoundary>
      <div className="App">
        <AuthProvider>
          <BrowserRouter>
            <Suspense fallback={<RouteLoadingSpinner />}>
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<Home />} />
                <Route path="/service/:serviceId" element={<ServiceDetail />} />
                <Route path="/portfolio" element={<Portfolio />} />

                {/* Legal pages */}
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-of-service" element={<TermsOfService />} />
                <Route path="/cookies" element={<Cookies />} />

                {/* Admin routes */}
                <Route path="/Mahia23" element={<AdminAccess />} />
                <Route path="/Mahia23/login" element={<AdminLogin />} />

                {/* Protected admin routes */}
                <Route path="/Mahia23/dashboard" element={
                  <Suspense fallback={<RouteLoadingSpinner />}>
                    <ProtectedRoute requireAdmin={true}>
                      <ComprehensiveDashboard />
                    </ProtectedRoute>
                  </Suspense>
                } />

                {/* 404 Not Found route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
          <Toaster />
        </AuthProvider>
      </div>
    </ErrorBoundary>
  );
}

export default App;