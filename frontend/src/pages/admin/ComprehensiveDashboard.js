// Comprehensive Single-Page Admin Dashboard
import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  BookOpen,
  FolderOpen,
  Users,
  Mail,
  Settings,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Save,
  X,
  Check,
  AlertCircle,
  TrendingUp,
  Clock,
  Star,
  LogOut,
  Briefcase
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { signOutAdmin } from '../../services/authService';
import {
  subscribeToWebsiteData,
  createCourse,
  updateCourse,
  deleteCourse,
  createProject,
  updateProject,
  deleteProject,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
  createService,
  updateService,
  deleteService,
  updateWebsiteSection
} from '../../services/dataService';
import { subscribeToContacts, updateContactStatus, subscribeToAllInquiries, updateInquiryStatus } from '../../services/contactService';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { Label } from '../../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Badge } from '../../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import LazyImage from '../../components/ui/LazyImage';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from '../../components/ui/dropdown-menu';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '../../components/ui/alert-dialog';
import { useToast } from '../../hooks/use-toast';
import { CourseForm, ProjectForm, TeamMemberForm, ServiceForm } from '../../components/admin/DashboardForms';
import { Dialog, DialogContent, DialogOverlay } from '../../components/ui/dialog';
import FirebaseTestPanel from '../../components/admin/FirebaseTestPanel';

const ComprehensiveDashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  // State management
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingItem, setEditingItem] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  
  // Data state
  const [websiteData, setWebsiteData] = useState({
    courses: [],
    projects: [],
    team: [],
    hero: {},
    about: {},
    services: [],
    contact: {}
  });
  const [contactFormData, setContactFormData] = useState({
    title: '',
    description: '',
    email: '',
    phone: '',
    address: ''
  });
  const [contacts, setContacts] = useState([]);
  const [stats, setStats] = useState({
    courses: { total: 0, published: 0 },
    projects: { total: 0, featured: 0 },
    services: { total: 0, published: 0, featured: 0 },
    team: { total: 0, active: 0 },
    contacts: { total: 0, new: 0, thisMonth: 0 }
  });

  // Initialize data subscriptions
  useEffect(() => {
    const unsubscribeWebsite = subscribeToWebsiteData((data) => {
      if (data) {
        setWebsiteData(data);
        // Update contact form data when website data changes
        if (data.contact) {
          setContactFormData({
            title: data.contact.title || '',
            description: data.contact.description || '',
            email: data.contact.email || '',
            phone: data.contact.phone || '',
            address: data.contact.address || ''
          });
        }
        updateStats(data, contacts);
      }
      setLoading(false);
    });

    const unsubscribeContacts = subscribeToAllInquiries((inquiriesData) => {
      setContacts(inquiriesData);
      updateStats(websiteData, inquiriesData);
    });

    return () => {
      unsubscribeWebsite();
      unsubscribeContacts();
    };
  }, []);

  // Update statistics
  const updateStats = (data, contactsData) => {
    setStats({
      courses: {
        total: data.courses?.length || 0,
        published: data.courses?.filter(c => c.status !== 'draft').length || data.courses?.length || 0
      },
      projects: {
        total: data.projects?.length || 0,
        featured: data.projects?.filter(p => p.featured).length || 0
      },
      services: {
        total: data.services?.length || 0,
        published: data.services?.filter(s => s.status !== 'draft').length || data.services?.length || 0,
        featured: data.services?.filter(s => s.featured).length || 0
      },
      team: {
        total: data.team?.length || 0,
        active: data.team?.filter(t => t.status !== 'inactive').length || data.team?.length || 0
      },
      contacts: {
        total: contactsData.length,
        new: contactsData.filter(c => c.status === 'new').length,
        thisMonth: contactsData.filter(c => {
          const contactDate = new Date(c.timestamp);
          const now = new Date();
          return contactDate.getMonth() === now.getMonth() && 
                 contactDate.getFullYear() === now.getFullYear();
        }).length
      }
    });
  };

  // Generic CRUD handlers
  const handleCreate = async (type, data) => {
    try {
      setLoading(true);
      let result;

      switch (type) {
        case 'course':
          result = await createCourse(data);
          break;
        case 'project':
          result = await createProject(data);
          break;
        case 'service':
          result = await createService(data);
          break;
        case 'team':
          result = await createTeamMember(data);
          break;
        default:
          throw new Error('Invalid type');
      }
      
      toast({
        title: "Created Successfully",
        description: `${type.charAt(0).toUpperCase() + type.slice(1)} has been created.`,
      });
      
      setShowCreateForm(false);
      return result;
    } catch (error) {
      toast({
        title: "Creation Failed",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (type, id, data) => {
    try {
      setLoading(true);
      let result;

      switch (type) {
        case 'course':
          result = await updateCourse(id, data);
          break;
        case 'project':
          result = await updateProject(id, data);
          break;
        case 'service':
          result = await updateService(id, data);
          break;
        case 'team':
          result = await updateTeamMember(id, data);
          break;
        default:
          throw new Error('Invalid type');
      }
      
      toast({
        title: "Updated Successfully",
        description: `${type.charAt(0).toUpperCase() + type.slice(1)} has been updated.`,
      });
      
      setEditingItem(null);
      return result;
    } catch (error) {
      toast({
        title: "Update Failed",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (type, id) => {
    try {
      setLoading(true);

      switch (type) {
        case 'course':
          await deleteCourse(id);
          break;
        case 'project':
          await deleteProject(id);
          break;
        case 'service':
          await deleteService(id);
          break;
        case 'team':
          await deleteTeamMember(id);
          break;
        default:
          throw new Error('Invalid type');
      }
      
      toast({
        title: "Deleted Successfully",
        description: `${type.charAt(0).toUpperCase() + type.slice(1)} has been deleted.`,
      });
    } catch (error) {
      toast({
        title: "Deletion Failed",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle contact information update
  const handleContactUpdate = async () => {
    setLoading(true);
    try {
      await updateWebsiteSection('contact', contactFormData);
      toast({
        title: "Success",
        description: "Contact information updated successfully",
      });
    } catch (error) {
      console.error('Error updating contact information:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to update contact information",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle admin logout
  const handleSignOut = async () => {
    try {
      await signOutAdmin();
      toast({
        title: "Signed Out",
        description: "You have been successfully signed out.",
      });
    } catch (error) {
      toast({
        title: "Sign Out Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  // Filter data based on search term
  const filterData = (data, searchTerm) => {
    if (!searchTerm) return data;
    return data.filter(item =>
      Object.values(item).some(value =>
        typeof value === 'string' &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  if (loading && !websiteData.courses) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">T</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                  Toiral Admin
                </h1>
                <p className="text-gray-600 text-sm">
                  Welcome back, {user?.displayName || 'Admin'}!
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search content..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => window.open('/', '_blank')}
            >
              <Eye className="w-4 h-4 mr-2" />
              View Website
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
                    {user?.photoURL && <AvatarImage src={user.photoURL} alt={user.displayName} />}
                    <AvatarFallback className="bg-teal-100 text-teal-700">
                      {user?.displayName?.charAt(0)?.toUpperCase() || 'A'}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user?.displayName || 'Admin User'}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => window.open('/', '_blank')}>
                  <Eye className="mr-2 h-4 w-4" />
                  <span>View Website</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          {/* Tab Navigation */}
          <TabsList className="grid w-full grid-cols-7 lg:w-auto lg:grid-cols-7">
            <TabsTrigger value="overview" className="flex items-center space-x-2">
              <LayoutDashboard className="w-4 h-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="courses" className="flex items-center space-x-2">
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Courses</span>
            </TabsTrigger>
            <TabsTrigger value="projects" className="flex items-center space-x-2">
              <FolderOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Projects</span>
            </TabsTrigger>
            <TabsTrigger value="services" className="flex items-center space-x-2">
              <Briefcase className="w-4 h-4" />
              <span className="hidden sm:inline">Services</span>
            </TabsTrigger>
            <TabsTrigger value="team" className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Team</span>
            </TabsTrigger>
            <TabsTrigger value="messages" className="flex items-center space-x-2">
              <Mail className="w-4 h-4" />
              <span className="hidden sm:inline">Messages</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center space-x-2">
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.courses.total}</div>
                  <p className="text-xs text-muted-foreground">
                    {stats.courses.published} published
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
                  <FolderOpen className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.projects.total}</div>
                  <p className="text-xs text-muted-foreground">
                    {stats.projects.featured} featured
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Services</CardTitle>
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.services.total}</div>
                  <p className="text-xs text-muted-foreground">
                    {stats.services.published} published, {stats.services.featured} featured
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Team Members</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.team.total}</div>
                  <p className="text-xs text-muted-foreground">
                    {stats.team.active} active
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Messages</CardTitle>
                  <Mail className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.contacts.total}</div>
                  <p className="text-xs text-muted-foreground">
                    {stats.contacts.new} new this month
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common tasks and shortcuts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Button
                    onClick={() => {
                      setActiveTab('courses');
                      setShowCreateForm(true);
                    }}
                    className="h-20 flex flex-col items-center justify-center space-y-2"
                  >
                    <Plus className="w-6 h-6" />
                    <span>Add Course</span>
                  </Button>
                  <Button
                    onClick={() => {
                      setActiveTab('projects');
                      setShowCreateForm(true);
                    }}
                    variant="outline"
                    className="h-20 flex flex-col items-center justify-center space-y-2"
                  >
                    <Plus className="w-6 h-6" />
                    <span>Add Project</span>
                  </Button>
                  <Button
                    onClick={() => {
                      setActiveTab('services');
                      setShowCreateForm(true);
                    }}
                    variant="outline"
                    className="h-20 flex flex-col items-center justify-center space-y-2"
                  >
                    <Plus className="w-6 h-6" />
                    <span>Add Service</span>
                  </Button>
                  <Button
                    onClick={() => {
                      setActiveTab('team');
                      setShowCreateForm(true);
                    }}
                    variant="outline"
                    className="h-20 flex flex-col items-center justify-center space-y-2"
                  >
                    <Plus className="w-6 h-6" />
                    <span>Add Team Member</span>
                  </Button>
                  <Button
                    onClick={() => setActiveTab('messages')}
                    variant="outline"
                    className="h-20 flex flex-col items-center justify-center space-y-2"
                  >
                    <Mail className="w-6 h-6" />
                    <span>View Messages</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="w-5 h-5" />
                  <span>Recent Activity</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {contacts.slice(0, 5).map((contact, index) => (
                    <div key={contact.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                      <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">New message from {contact.name}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(contact.timestamp).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge variant={contact.status === 'new' ? 'default' : 'secondary'}>
                        {contact.status}
                      </Badge>
                    </div>
                  ))}
                  {contacts.length === 0 && (
                    <p className="text-gray-500 text-center py-4">No recent activity</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Courses Management Tab */}
          <TabsContent value="courses" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Courses Management</h2>
                <p className="text-gray-600">Manage your course listings and content</p>
              </div>
              <Button onClick={() => setShowCreateForm(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Course
              </Button>
            </div>

            {/* Courses Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filterData(websiteData.courses || [], searchTerm).map((course) => (
                <Card key={course.id} className="group hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg line-clamp-2">{course.title}</CardTitle>
                        <CardDescription className="mt-1">
                          {course.provider} • {course.duration}
                        </CardDescription>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => setEditingItem({...course, type: 'course'})}>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => window.open(course.url, '_blank')}
                            disabled={!course.url}
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            View
                          </DropdownMenuItem>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Course</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete "{course.title}"? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete('course', course.id)}
                                  className="bg-red-600 hover:bg-red-700"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {course.image && (
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-32 object-cover rounded-lg mb-3"
                      />
                    )}
                    <p className="text-sm text-gray-600 line-clamp-3 mb-3">
                      {course.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary">{course.category}</Badge>
                      {course.featured && (
                        <Badge variant="default">
                          <Star className="w-3 h-3 mr-1" />
                          Featured
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Empty State */}
            {(!websiteData.courses || websiteData.courses.length === 0) && (
              <Card className="text-center py-12">
                <CardContent>
                  <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No courses yet</h3>
                  <p className="text-gray-600 mb-4">Get started by creating your first course.</p>
                  <Button onClick={() => setShowCreateForm(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Course
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Projects Management Tab */}
          <TabsContent value="projects" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Projects Management</h2>
                <p className="text-gray-600">Manage your portfolio projects</p>
              </div>
              <Button onClick={() => setShowCreateForm(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Project
              </Button>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filterData(websiteData.projects || [], searchTerm).map((project) => (
                <Card key={project.id} className="group hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg line-clamp-2">{project.title}</CardTitle>
                        <CardDescription className="mt-1">
                          {project.category}
                        </CardDescription>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => setEditingItem({...project, type: 'project'})}>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Project</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete "{project.title}"? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete('project', project.id)}
                                  className="bg-red-600 hover:bg-red-700"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {project.image && (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-32 object-cover rounded-lg mb-3"
                      />
                    )}
                    <p className="text-sm text-gray-600 line-clamp-3 mb-3">
                      {project.description}
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary">{project.category}</Badge>
                        <div className="flex items-center gap-2">
                          {project.featured && (
                            <Badge variant="default">
                              <Star className="w-3 h-3 mr-1" />
                              Featured
                            </Badge>
                          )}
                          <Badge variant="outline" className="text-xs">
                            Order: {project.order || 0}
                          </Badge>
                        </div>
                      </div>
                      {project.technologies && project.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {project.technologies.slice(0, 3).map((tech, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                          {project.technologies.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{project.technologies.length - 3}
                            </Badge>
                          )}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Empty State */}
            {(!websiteData.projects || websiteData.projects.length === 0) && (
              <Card className="text-center py-12">
                <CardContent>
                  <FolderOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No projects yet</h3>
                  <p className="text-gray-600 mb-4">Get started by adding your first project.</p>
                  <Button onClick={() => setShowCreateForm(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Project
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Services Management Tab */}
          <TabsContent value="services" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Services Management</h2>
                <p className="text-gray-600">Manage your service offerings and descriptions</p>
              </div>
              <Button onClick={() => setShowCreateForm(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Service
              </Button>
            </div>

            {/* Search and Filter */}
            <div className="flex items-center space-x-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search services..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filterData(websiteData.services || [], searchTerm).map((service) => (
                <Card key={service.id} className="group hover:shadow-lg transition-shadow overflow-hidden">
                  {/* Service Image */}
                  {service.image && (
                    <div className="relative h-40 overflow-hidden bg-gray-100">
                      <LazyImage 
                        src={service.image} 
                        alt={service.title}
                        className="w-full h-full group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20"></div>
                    </div>
                  )}
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg line-clamp-2">{service.title}</CardTitle>
                        <CardDescription className="mt-1">
                          {service.icon} • {service.features?.length || 0} features
                        </CardDescription>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => setEditingItem({...service, type: 'service'})}>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDelete('service', service.id)}
                            className="text-red-600"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {service.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {service.featured && (
                          <Badge variant="secondary" className="text-xs">
                            <Star className="w-3 h-3 mr-1" />
                            Featured
                          </Badge>
                        )}
                        <Badge variant={service.status === 'published' ? 'default' : 'secondary'} className="text-xs">
                          {service.status}
                        </Badge>
                      </div>
                      <span className="text-xs text-gray-500">
                        Order: {service.order}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Empty State */}
            {(!websiteData.services || websiteData.services.length === 0) && (
              <Card className="text-center py-12">
                <CardContent>
                  <Briefcase className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No services yet</h3>
                  <p className="text-gray-600 mb-4">Get started by creating your first service offering.</p>
                  <Button onClick={() => setShowCreateForm(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Your First Service
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Team Management Tab */}
          <TabsContent value="team" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Team Management</h2>
                <p className="text-gray-600">Manage your team member profiles</p>
              </div>
              <Button onClick={() => setShowCreateForm(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Team Member
              </Button>
            </div>

            {/* Team Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filterData(websiteData.team || [], searchTerm).map((member) => (
                <Card key={member.id} className="group hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3 flex-1">
                        <Avatar className="h-12 w-12">
                          {member.avatar && <AvatarImage src={member.avatar} alt={member.name} />}
                          <AvatarFallback className="bg-teal-100 text-teal-700">
                            {member.name?.charAt(0)?.toUpperCase() || 'T'}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <CardTitle className="text-lg line-clamp-1">{member.name}</CardTitle>
                          <CardDescription className="mt-1">
                            {member.role}
                          </CardDescription>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => setEditingItem({...member, type: 'team'})}>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Team Member</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete "{member.name}"? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete('team', member.id)}
                                  className="bg-red-600 hover:bg-red-700"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 line-clamp-3 mb-3">
                      {member.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <Badge variant={member.status === 'active' ? 'default' : 'secondary'}>
                        {member.status || 'active'}
                      </Badge>
                      <span className="text-xs text-gray-500">
                        Order: {member.order || 0}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Empty State */}
            {(!websiteData.team || websiteData.team.length === 0) && (
              <Card className="text-center py-12">
                <CardContent>
                  <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No team members yet</h3>
                  <p className="text-gray-600 mb-4">Get started by adding your first team member.</p>
                  <Button onClick={() => setShowCreateForm(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Team Member
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Messages/Contact Forms Tab */}
          <TabsContent value="messages" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Messages & Inquiries</h2>
                <p className="text-gray-600">View and manage contact form submissions and package inquiries</p>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="secondary">
                  {stats.contacts.total} Total
                </Badge>
                <Badge variant="default">
                  {stats.contacts.new} New
                </Badge>
              </div>
            </div>

            {/* Messages List */}
            <div className="space-y-4">
              {filterData(contacts, searchTerm).map((inquiry) => (
                <Card key={inquiry.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <CardTitle className="text-lg">{inquiry.title}</CardTitle>
                          <Badge variant={inquiry.status === 'new' ? 'default' : 'secondary'}>
                            {inquiry.status}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {inquiry.displayType}
                          </Badge>
                        </div>
                        <CardDescription className="mt-1">
                          {inquiry.subtitle} • {new Date(inquiry.timestamp).toLocaleDateString()}
                        </CardDescription>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => updateInquiryStatus(inquiry.id, inquiry.type, 'read')}
                            disabled={inquiry.status === 'read'}
                          >
                            <Check className="w-4 h-4 mr-2" />
                            Mark as Read
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => updateInquiryStatus(inquiry.id, inquiry.type, 'replied')}
                            disabled={inquiry.status === 'replied'}
                          >
                            <Mail className="w-4 h-4 mr-2" />
                            Mark as Replied
                          </DropdownMenuItem>
                          {inquiry.type === 'contact' && (
                            <DropdownMenuItem
                              onClick={() => window.open(`mailto:${inquiry.email}?subject=Re: ${inquiry.subject}`)}
                            >
                              <Mail className="w-4 h-4 mr-2" />
                              Reply via Email
                            </DropdownMenuItem>
                          )}
                          {inquiry.type === 'package_inquiry' && inquiry.userInfo && (
                            <DropdownMenuItem
                              onClick={() => window.open(`mailto:${inquiry.userInfo.email}?subject=Re: ${inquiry.packageName} Package Inquiry`)}
                            >
                              <Mail className="w-4 h-4 mr-2" />
                              Reply via Email
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {inquiry.type === 'contact' ? (
                        // Contact Form Display
                        <>
                          <div>
                            <h4 className="font-medium text-gray-900">Subject:</h4>
                            <p className="text-gray-700">{inquiry.subject}</p>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">Message:</h4>
                            <p className="text-gray-700 whitespace-pre-wrap">{inquiry.message}</p>
                          </div>
                        </>
                      ) : (
                        // Package Inquiry Display
                        <>
                          <div>
                            <h4 className="font-medium text-gray-900">Package Details:</h4>
                            <div className="bg-gray-50 p-3 rounded-lg">
                              <div className="flex justify-between items-center mb-2">
                                <span className="font-medium">{inquiry.packageName}</span>
                                <span className="text-lg font-bold text-teal-600">{inquiry.packagePrice}</span>
                              </div>
                              <p className="text-sm text-gray-600 mb-2">{inquiry.packageDescription}</p>
                              {inquiry.packageFeatures && inquiry.packageFeatures.length > 0 && (
                                <div>
                                  <p className="text-xs font-medium text-gray-700 mb-1">Key Features:</p>
                                  <ul className="text-xs text-gray-600 list-disc list-inside">
                                    {inquiry.packageFeatures.slice(0, 3).map((feature, idx) => (
                                      <li key={idx}>{feature}</li>
                                    ))}
                                    {inquiry.packageFeatures.length > 3 && (
                                      <li>+{inquiry.packageFeatures.length - 3} more features</li>
                                    )}
                                  </ul>
                                </div>
                              )}
                            </div>
                          </div>
                          {inquiry.userInfo && (
                            <div>
                              <h4 className="font-medium text-gray-900">Customer Information:</h4>
                              <div className="bg-blue-50 p-3 rounded-lg">
                                <p className="text-sm"><strong>Name:</strong> {inquiry.userInfo.name}</p>
                                <p className="text-sm"><strong>Email:</strong> {inquiry.userInfo.email}</p>
                                <p className="text-sm"><strong>Mobile:</strong> {inquiry.userInfo.mobile}</p>
                                {inquiry.userInfo.company && (
                                  <p className="text-sm"><strong>Company:</strong> {inquiry.userInfo.company}</p>
                                )}
                              </div>
                            </div>
                          )}
                        </>
                      )}
                      {inquiry.userAgent && (
                        <div className="text-xs text-gray-500 border-t pt-2">
                          <p>User Agent: {inquiry.userAgent}</p>
                          <p>Source: {inquiry.source || 'Unknown'}</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Empty State */}
            {contacts.length === 0 && (
              <Card className="text-center py-12">
                <CardContent>
                  <Mail className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No inquiries yet</h3>
                  <p className="text-gray-600">Contact form submissions and package inquiries will appear here.</p>
                </CardContent>
              </Card>
            )}

            {/* Filtered Empty State */}
            {contacts.length > 0 && filterData(contacts, searchTerm).length === 0 && (
              <Card className="text-center py-12">
                <CardContent>
                  <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No matching messages</h3>
                  <p className="text-gray-600">Try adjusting your search terms.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold">Settings</h2>
              <p className="text-gray-600">Admin configuration and system preferences</p>
            </div>

            {/* Firebase Integration Test Panel */}
            <FirebaseTestPanel />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Admin Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Admin Information</CardTitle>
                  <CardDescription>Your admin account details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-16 w-16">
                      {user?.photoURL && <AvatarImage src={user.photoURL} alt={user.displayName} />}
                      <AvatarFallback className="bg-teal-100 text-teal-700 text-xl">
                        {user?.displayName?.charAt(0)?.toUpperCase() || 'A'}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium text-lg">{user?.displayName}</h3>
                      <p className="text-gray-600">{user?.email}</p>
                      <Badge variant="default" className="mt-1">Admin</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* System Statistics */}
              <Card>
                <CardHeader>
                  <CardTitle>System Statistics</CardTitle>
                  <CardDescription>Overview of your content</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-teal-600">{stats.courses.total}</div>
                      <div className="text-sm text-gray-600">Courses</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{stats.projects.total}</div>
                      <div className="text-sm text-gray-600">Projects</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">{stats.team.total}</div>
                      <div className="text-sm text-gray-600">Team Members</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">{stats.contacts.total}</div>
                      <div className="text-sm text-gray-600">Messages</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Information Settings */}
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                  <CardDescription>Update website contact details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="contact-title">Title</Label>
                      <Input
                        id="contact-title"
                        value={contactFormData.title}
                        onChange={(e) => setContactFormData(prev => ({ ...prev, title: e.target.value }))}
                        placeholder="Let's Create Something Amazing"
                      />
                    </div>
                    <div>
                      <Label htmlFor="contact-description">Description</Label>
                      <Textarea
                        id="contact-description"
                        value={contactFormData.description}
                        onChange={(e) => setContactFormData(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Ready to transform your vision into a digital reality?"
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label htmlFor="contact-email">Email</Label>
                      <Input
                        id="contact-email"
                        type="email"
                        value={contactFormData.email}
                        onChange={(e) => setContactFormData(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="toiral.dev@gmail.com"
                      />
                    </div>
                    <div>
                      <Label htmlFor="contact-phone">WhatsApp</Label>
                      <Input
                        id="contact-phone"
                        value={contactFormData.phone}
                        onChange={(e) => setContactFormData(prev => ({ ...prev, phone: e.target.value }))}
                        placeholder="+8801804673095"
                      />
                    </div>
                    <div>
                      <Label htmlFor="contact-address">Address</Label>
                      <Textarea
                        id="contact-address"
                        value={contactFormData.address}
                        onChange={(e) => setContactFormData(prev => ({ ...prev, address: e.target.value }))}
                        placeholder="GM Bari-Satarkul Road, Uttar Badda, Dhaka, Bangladesh"
                        rows={2}
                      />
                    </div>
                    <Button
                      onClick={handleContactUpdate}
                      disabled={loading}
                      className="w-full"
                    >
                      {loading ? 'Updating...' : 'Update Contact Information'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Common administrative tasks</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => window.open('/', '_blank')}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    View Website
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => setActiveTab('messages')}
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Check Messages ({stats.contacts.new} new)
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => {
                      const data = {
                        courses: websiteData.courses,
                        projects: websiteData.projects,
                        team: websiteData.team,
                        contacts: contacts
                      };
                      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = `toiral-backup-${new Date().toISOString().split('T')[0]}.json`;
                      a.click();
                      URL.revokeObjectURL(url);
                    }}
                  >
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Export Data
                  </Button>
                </CardContent>
              </Card>

              {/* System Information */}
              <Card>
                <CardHeader>
                  <CardTitle>System Information</CardTitle>
                  <CardDescription>Technical details and status</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Database Status:</span>
                    <Badge variant="default">Connected</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Authentication:</span>
                    <Badge variant="default">Google OAuth</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Last Updated:</span>
                    <span className="text-sm text-gray-600">
                      {new Date().toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Version:</span>
                    <span className="text-sm text-gray-600">1.0.0</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Create Form Modal */}
      {showCreateForm && (
        <Dialog open={showCreateForm} onOpenChange={setShowCreateForm}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            {activeTab === 'courses' && (
              <CourseForm
                onSave={(data) => handleCreate('course', data)}
                onCancel={() => setShowCreateForm(false)}
                loading={loading}
                existingCourses={websiteData.courses || []}
              />
            )}
            {activeTab === 'projects' && (
              <ProjectForm
                onSave={(data) => handleCreate('project', data)}
                onCancel={() => setShowCreateForm(false)}
                loading={loading}
                existingProjects={websiteData.projects || []}
              />
            )}
            {activeTab === 'services' && (
              <ServiceForm
                onSave={(data) => handleCreate('service', data)}
                onCancel={() => setShowCreateForm(false)}
                loading={loading}
                existingServices={websiteData.services || []}
              />
            )}
            {activeTab === 'team' && (
              <TeamMemberForm
                onSave={(data) => handleCreate('team', data)}
                onCancel={() => setShowCreateForm(false)}
                loading={loading}
                existingTeam={websiteData.team || []}
              />
            )}
          </DialogContent>
        </Dialog>
      )}

      {/* Edit Form Modal */}
      {editingItem && (
        <Dialog open={!!editingItem} onOpenChange={() => setEditingItem(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            {editingItem.type === 'course' && (
              <CourseForm
                course={editingItem}
                onSave={(data) => handleUpdate('course', editingItem.id, data)}
                onCancel={() => setEditingItem(null)}
                loading={loading}
                existingCourses={websiteData.courses || []}
              />
            )}
            {editingItem.type === 'project' && (
              <ProjectForm
                project={editingItem}
                onSave={(data) => handleUpdate('project', editingItem.id, data)}
                onCancel={() => setEditingItem(null)}
                loading={loading}
                existingProjects={websiteData.projects || []}
              />
            )}
            {editingItem.type === 'service' && (
              <ServiceForm
                service={editingItem}
                onSave={(data) => handleUpdate('service', editingItem.id, data)}
                onCancel={() => setEditingItem(null)}
                loading={loading}
                existingServices={websiteData.services || []}
              />
            )}
            {editingItem.type === 'team' && (
              <TeamMemberForm
                member={editingItem}
                onSave={(data) => handleUpdate('team', editingItem.id, data)}
                onCancel={() => setEditingItem(null)}
                loading={loading}
                existingTeam={websiteData.team || []}
              />
            )}
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default ComprehensiveDashboard;
