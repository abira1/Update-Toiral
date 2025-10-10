// Firebase Real-time Integration Test Panel
import React, { useState, useEffect } from 'react';
import { 
  Database, 
  Wifi, 
  WifiOff, 
  CheckCircle, 
  XCircle, 
  Clock,
  RefreshCw,
  AlertTriangle
} from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Alert, AlertDescription } from '../ui/alert';
import {
  subscribeToWebsiteData,
  createCourse,
  updateCourse,
  deleteCourse
} from '../../services/dataService';
import { addDefaultServices, initializeServices } from '../../utils/addServices';
import { subscribeToContacts, submitContactForm } from '../../services/contactService';
import { useToast } from '../../hooks/use-toast';
import {
  testFirebaseConnection,
  testCourseCreation,
  testContactSubmission,
  initializeDatabase
} from '../../utils/firebaseTest';
import { initializeSampleData } from '../../utils/initializeData';
import { importPortfolioData, getPortfolioStats } from '../../utils/importPortfolioData';

const FirebaseTestPanel = () => {
  const [connectionStatus, setConnectionStatus] = useState('connecting');
  const [testResults, setTestResults] = useState({});
  const [isRunningTests, setIsRunningTests] = useState(false);
  const [websiteData, setWebsiteData] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [lastUpdate, setLastUpdate] = useState(null);
  const { toast } = useToast();

  // Test connection and real-time listeners
  useEffect(() => {
    let unsubscribeWebsite = null;
    let unsubscribeContacts = null;

    const initializeListeners = () => {
      try {
        // Test website data subscription
        unsubscribeWebsite = subscribeToWebsiteData((data) => {
          setWebsiteData(data);
          setConnectionStatus('connected');
          setLastUpdate(new Date().toLocaleTimeString());
          
          setTestResults(prev => ({
            ...prev,
            websiteDataListener: {
              status: 'success',
              message: 'Website data listener active',
              timestamp: Date.now()
            }
          }));
        });

        // Test contacts subscription
        unsubscribeContacts = subscribeToContacts((contactsData) => {
          setContacts(contactsData);
          
          setTestResults(prev => ({
            ...prev,
            contactsListener: {
              status: 'success',
              message: 'Contacts listener active',
              timestamp: Date.now()
            }
          }));
        });

      } catch (error) {
        setConnectionStatus('error');
        setTestResults(prev => ({
          ...prev,
          connectionError: {
            status: 'error',
            message: error.message,
            timestamp: Date.now()
          }
        }));
      }
    };

    initializeListeners();

    return () => {
      if (unsubscribeWebsite) unsubscribeWebsite();
      if (unsubscribeContacts) unsubscribeContacts();
    };
  }, []);

  // Run comprehensive Firebase tests
  const runFirebaseTests = async () => {
    setIsRunningTests(true);
    const results = {};

    try {
      // Test 1: Basic Firebase Connection
      const connectionTest = await testFirebaseConnection();
      results.connectionTest = {
        status: connectionTest.connection ? 'success' : 'error',
        message: connectionTest.connection
          ? `Connection: ${connectionTest.connection}, Read: ${connectionTest.read}, Write: ${connectionTest.write}`
          : `Connection failed: ${connectionTest.error}`,
        timestamp: Date.now()
      };

      // Test 2: Database Initialization
      const initTest = await initializeDatabase();
      results.initializeDatabase = {
        status: initTest.success ? 'success' : 'error',
        message: initTest.success ? initTest.message : initTest.error,
        timestamp: Date.now()
      };

      // Test 3: Course Creation Test
      const courseTest = await testCourseCreation();
      results.courseCreation = {
        status: courseTest.success ? 'success' : 'error',
        message: courseTest.success
          ? `Course created: ${courseTest.course.title}`
          : `Course creation failed: ${courseTest.error}`,
        timestamp: Date.now()
      };

      // Test 4: Contact Form Test
      const contactTest = await testContactSubmission();
      results.contactSubmission = {
        status: contactTest.success ? 'success' : 'error',
        message: contactTest.success
          ? `Contact submitted with ID: ${contactTest.contactId}`
          : `Contact submission failed: ${contactTest.error}`,
        timestamp: Date.now()
      };

      // Test 5: Admin CRUD Operations
      try {
        const testCourse = {
          title: `Admin Test Course ${Date.now()}`,
          description: 'This is a test course for admin CRUD operations',
          category: 'Web Development',
          provider: 'Test Provider',
          duration: '1 hour',
          featured: false,
          status: 'published'
        };

        const createdCourse = await createCourse(testCourse);

        // Update the course
        const updatedCourse = await updateCourse(createdCourse.id, {
          ...testCourse,
          title: `Updated ${testCourse.title}`,
          featured: true
        });

        // Delete the course
        await deleteCourse(createdCourse.id);

        results.adminCRUD = {
          status: 'success',
          message: 'Admin CRUD operations completed successfully',
          timestamp: Date.now()
        };

      } catch (crudError) {
        results.adminCRUD = {
          status: 'error',
          message: `Admin CRUD failed: ${crudError.message}`,
          timestamp: Date.now()
        };
      }

      toast({
        title: "Firebase Tests Completed",
        description: "All Firebase integration tests have been executed!",
      });

    } catch (error) {
      results.generalError = {
        status: 'error',
        message: `General test error: ${error.message}`,
        timestamp: Date.now()
      };

      toast({
        title: "Test Failed",
        description: error.message,
        variant: "destructive"
      });
    }

    setTestResults(prev => ({ ...prev, ...results }));
    setIsRunningTests(false);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'error':
        return <XCircle className="w-4 h-4 text-red-600" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'connected':
        return <Badge variant="default" className="bg-green-600"><Wifi className="w-3 h-3 mr-1" />Connected</Badge>;
      case 'connecting':
        return <Badge variant="secondary"><RefreshCw className="w-3 h-3 mr-1 animate-spin" />Connecting</Badge>;
      case 'error':
        return <Badge variant="destructive"><WifiOff className="w-3 h-3 mr-1" />Error</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <Database className="w-5 h-5" />
                <span>Firebase Integration Status</span>
              </CardTitle>
              <CardDescription>
                Real-time database connection and synchronization status
              </CardDescription>
            </div>
            {getStatusBadge(connectionStatus)}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-teal-600">
                {websiteData?.courses?.length || 0}
              </div>
              <div className="text-sm text-gray-600">Courses</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">
                {websiteData?.projects?.length || 0}
              </div>
              <div className="text-sm text-gray-600">Projects</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {websiteData?.team?.length || 0}
              </div>
              <div className="text-sm text-gray-600">Team Members</div>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">
                {contacts.length}
              </div>
              <div className="text-sm text-gray-600">Messages</div>
            </div>
          </div>

          {/* Portfolio Import Info */}
          <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-blue-900">Portfolio Data Available</h4>
                <p className="text-sm text-blue-700">
                  {getPortfolioStats().totalProjects} projects ready to import from your Firebase export
                </p>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-blue-600">
                  {getPortfolioStats().totalProjects}
                </div>
                <div className="text-xs text-blue-600">Projects</div>
              </div>
            </div>
          </div>
          
          {lastUpdate && (
            <div className="mt-4 text-sm text-gray-500 text-center">
              Last updated: {lastUpdate}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>CRUD Operations Test</CardTitle>
              <CardDescription>
                Test create, read, update, delete operations with real-time sync
              </CardDescription>
            </div>
            <div className="flex space-x-3">
              <Button
                onClick={runFirebaseTests}
                disabled={isRunningTests}
              >
                {isRunningTests ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Running Tests...
                  </>
                ) : (
                  'Run Firebase Tests'
                )}
              </Button>

              <Button
                variant="outline"
                onClick={async () => {
                  setIsRunningTests(true);
                  try {
                    const result = await initializeSampleData();
                    setTestResults(prev => ({
                      ...prev,
                      sampleDataInit: {
                        status: result.success ? 'success' : 'error',
                        message: result.success ? result.message : result.error,
                        timestamp: Date.now()
                      }
                    }));

                    toast({
                      title: result.success ? "Sample Data Added" : "Failed to Add Sample Data",
                      description: result.success ? result.message : result.error,
                      variant: result.success ? "default" : "destructive"
                    });
                  } catch (error) {
                    toast({
                      title: "Error",
                      description: error.message,
                      variant: "destructive"
                    });
                  }
                  setIsRunningTests(false);
                }}
                disabled={isRunningTests}
              >
                Add Sample Data
              </Button>

              <Button
                variant="secondary"
                onClick={async () => {
                  setIsRunningTests(true);
                  try {
                    const result = await importPortfolioData();
                    setTestResults(prev => ({
                      ...prev,
                      portfolioImport: {
                        status: result.success ? 'success' : 'error',
                        message: result.success
                          ? `${result.message} (${result.imported}/${result.total} projects)`
                          : result.error,
                        timestamp: Date.now()
                      }
                    }));

                    toast({
                      title: result.success ? "Portfolio Data Imported" : "Failed to Import Portfolio",
                      description: result.success
                        ? `Successfully imported ${result.imported} new projects. Total: ${result.total}`
                        : result.error,
                      variant: result.success ? "default" : "destructive"
                    });
                  } catch (error) {
                    toast({
                      title: "Import Error",
                      description: error.message,
                      variant: "destructive"
                    });
                  }
                  setIsRunningTests(false);
                }}
                disabled={isRunningTests}
              >
                Import Portfolio Data
              </Button>

              <Button
                variant="outline"
                onClick={async () => {
                  setIsRunningTests(true);
                  try {
                    const result = await initializeServices();
                    setTestResults(prev => ({
                      ...prev,
                      servicesInit: {
                        status: result.success ? 'success' : 'error',
                        message: result.message,
                        timestamp: Date.now()
                      }
                    }));

                    toast({
                      title: result.success ? "Services Initialized" : "Failed to Initialize Services",
                      description: result.message,
                      variant: result.success ? "default" : "destructive"
                    });
                  } catch (error) {
                    toast({
                      title: "Services Error",
                      description: error.message,
                      variant: "destructive"
                    });
                  }
                  setIsRunningTests(false);
                }}
                disabled={isRunningTests}
              >
                Initialize Services
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Object.entries(testResults).map(([key, result]) => (
              <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(result.status)}
                  <div>
                    <div className="font-medium capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </div>
                    <div className="text-sm text-gray-600">{result.message}</div>
                  </div>
                </div>
                <div className="text-xs text-gray-500">
                  {new Date(result.timestamp).toLocaleTimeString()}
                </div>
              </div>
            ))}
            
            {Object.keys(testResults).length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No tests run yet. Click "Run Tests" to verify Firebase integration.
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {connectionStatus === 'error' && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Firebase connection error. Please check your configuration and network connection.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default FirebaseTestPanel;
