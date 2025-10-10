// Dashboard Forms for CRUD operations
import React, { useState, useEffect } from 'react';
import { X, Save, Upload, Plus, Trash2, Code, Search, Settings, Layers, Zap, Target, Star, Shield, Rocket, Users } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Switch } from '../ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import MultiSelect from '../ui/multi-select';
import { TECHNOLOGY_OPTIONS, CATEGORIZED_TECHNOLOGY_OPTIONS, POPULAR_TECH_STACKS } from '../../data/technologyOptions';
import { PROJECT_CATEGORIES, CATEGORIZED_PROJECT_TYPES, POPULAR_CATEGORIES } from '../../data/categoryOptions';
import { getNextDisplayOrder, getSuggestedDisplayOrder } from '../../utils/orderUtils';

// Available service icons
const SERVICE_ICONS = [
  { name: 'Code', component: Code, label: 'Web Development' },
  { name: 'Search', component: Search, label: 'SEO Services' },
  { name: 'Settings', component: Settings, label: 'Admin Panels' },
  { name: 'Layers', component: Layers, label: 'Full-Stack Solutions' },
  { name: 'Zap', component: Zap, label: 'Performance' },
  { name: 'Target', component: Target, label: 'Strategy' },
  { name: 'Star', component: Star, label: 'Premium' },
  { name: 'Shield', component: Shield, label: 'Security' },
  { name: 'Rocket', component: Rocket, label: 'Launch' },
  { name: 'Users', component: Users, label: 'Team' }
];

// Course Form Component
export const CourseForm = ({ course, onSave, onCancel, loading, existingCourses = [] }) => {
  const [formData, setFormData] = useState(() => {
    const baseData = {
      title: '',
      description: '',
      image: '',
      url: '',
      category: '',
      provider: '',
      duration: '',
      featured: false,
      status: 'published',
      order: 0,
      ...course
    };

    // Auto-generate order if not editing existing course
    if (!course?.id) {
      baseData.order = getNextDisplayOrder(existingCourses);
    }

    return baseData;
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.category.trim()) newErrors.category = 'Category is required';
    if (!formData.provider.trim()) newErrors.provider = 'Provider is required';
    if (!formData.duration.trim()) newErrors.duration = 'Duration is required';
    if (formData.url && !isValidUrl(formData.url)) newErrors.url = 'Invalid URL format';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => {
      const updated = { ...prev, [field]: value };

      // Auto-adjust order when featured status changes (only for new courses)
      if (field === 'featured' && !course?.id) {
        updated.order = getSuggestedDisplayOrder(existingCourses, value);
      }

      return updated;
    });

    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{course ? 'Edit Course' : 'Create New Course'}</CardTitle>
            <CardDescription>
              {course ? 'Update course information' : 'Add a new course to your catalog'}
            </CardDescription>
          </div>
          <Button variant="ghost" size="sm" onClick={onCancel}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                placeholder="Course title"
                className={errors.title ? 'border-red-500' : ''}
              />
              {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="provider">Provider *</Label>
              <Input
                id="provider"
                value={formData.provider}
                onChange={(e) => handleChange('provider', e.target.value)}
                placeholder="e.g., Udemy, Coursera"
                className={errors.provider ? 'border-red-500' : ''}
              />
              {errors.provider && <p className="text-sm text-red-500">{errors.provider}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Course description"
              rows={3}
              className={errors.description ? 'border-red-500' : ''}
            />
            {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Course Category *</Label>
              <Select value={formData.category} onValueChange={(value) => handleChange('category', value)}>
                <SelectTrigger className={`${errors.category ? 'border-red-500' : ''} h-11`}>
                  <SelectValue placeholder="Choose course category..." />
                </SelectTrigger>
                <SelectContent className="max-h-80">
                  {/* Popular Course Categories */}
                  <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide bg-muted/50">
                    Popular Categories
                  </div>
                  <SelectItem value="Web Development" className="font-medium">Web Development</SelectItem>
                  <SelectItem value="Frontend Development" className="font-medium">Frontend Development</SelectItem>
                  <SelectItem value="Backend Development" className="font-medium">Backend Development</SelectItem>
                  <SelectItem value="Mobile Development" className="font-medium">Mobile Development</SelectItem>
                  <SelectItem value="Data Science" className="font-medium">Data Science</SelectItem>

                  {/* All Course Categories */}
                  <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide bg-muted/50 mt-2">
                    All Categories
                  </div>
                  <SelectItem value="UI/UX Design">UI/UX Design</SelectItem>
                  <SelectItem value="Graphic Design">Graphic Design</SelectItem>
                  <SelectItem value="Digital Marketing">Digital Marketing</SelectItem>
                  <SelectItem value="SEO">SEO</SelectItem>
                  <SelectItem value="Business">Business</SelectItem>
                  <SelectItem value="DevOps">DevOps</SelectItem>
                  <SelectItem value="Cloud Computing">Cloud Computing</SelectItem>
                  <SelectItem value="Cybersecurity">Cybersecurity</SelectItem>
                  <SelectItem value="Artificial Intelligence">Artificial Intelligence</SelectItem>
                  <SelectItem value="Machine Learning">Machine Learning</SelectItem>
                  <SelectItem value="Blockchain">Blockchain</SelectItem>
                  <SelectItem value="Game Development">Game Development</SelectItem>
                  <SelectItem value="Photography">Photography</SelectItem>
                  <SelectItem value="Video Editing">Video Editing</SelectItem>
                  <SelectItem value="Personal Development">Personal Development</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
              {errors.category && <p className="text-sm text-red-500">{errors.category}</p>}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="duration">Duration *</Label>
              <Input
                id="duration"
                value={formData.duration}
                onChange={(e) => handleChange('duration', e.target.value)}
                placeholder="e.g., 10 hours, 6 weeks"
                className={errors.duration ? 'border-red-500' : ''}
              />
              {errors.duration && <p className="text-sm text-red-500">{errors.duration}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Image URL</Label>
            <Input
              id="image"
              value={formData.image}
              onChange={(e) => handleChange('image', e.target.value)}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="url">Course URL</Label>
            <Input
              id="url"
              value={formData.url}
              onChange={(e) => handleChange('url', e.target.value)}
              placeholder="https://example.com/course"
              className={errors.url ? 'border-red-500' : ''}
            />
            {errors.url && <p className="text-sm text-red-500">{errors.url}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="order" className="flex items-center gap-2">
              Display Order
              <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                Auto: {course?.id ? 'Current' : getNextDisplayOrder(existingCourses)}
              </span>
            </Label>
            <Input
              id="order"
              type="number"
              min="1"
              value={formData.order}
              onChange={(e) => handleChange('order', parseInt(e.target.value) || 1)}
              placeholder={getNextDisplayOrder(existingCourses).toString()}
              className="font-mono w-32"
            />
            <p className="text-xs text-muted-foreground">
              {course?.id
                ? 'Change order to reposition this course. Lower numbers appear first.'
                : `Auto-generated order: ${getNextDisplayOrder(existingCourses)}. You can change this if needed.`
              }
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="featured"
                checked={formData.featured}
                onCheckedChange={(checked) => handleChange('featured', checked)}
              />
              <Label htmlFor="featured">Featured Course</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Label htmlFor="status">Status:</Label>
              <Select value={formData.status} onValueChange={(value) => handleChange('status', value)}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              <Save className="w-4 h-4 mr-2" />
              {loading ? 'Saving...' : 'Save Course'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

// Service Form Component
export const ServiceForm = ({ service, onSave, onCancel, loading, existingServices = [] }) => {
  const [formData, setFormData] = useState(() => {
    const baseData = {
      title: '',
      description: '',
      icon: 'Code',
      image: '',
      features: [''],
      process: [
        { step: 1, title: 'Discovery', description: 'Understanding your brand, goals, and target audience' },
        { step: 2, title: 'Strategy', description: 'Developing a tailored strategy and roadmap' },
        { step: 3, title: 'Design', description: 'Creating wireframes, mockups, and interactive prototypes' },
        { step: 4, title: 'Development', description: 'Building your solution with clean, scalable code' },
        { step: 5, title: 'Testing', description: 'Rigorous testing across devices and browsers' },
        { step: 6, title: 'Launch', description: 'Deploying your project and providing ongoing support' }
      ],
      packages: [
        {
          name: 'Starter',
          price: '$2,999',
          description: 'Perfect for small businesses',
          features: ['Responsive Design', 'Basic SEO', 'Contact Form', '3 Months Support'],
          featured: false,
          popular: false
        },
        {
          name: 'Professional',
          price: '$5,999',
          description: 'Ideal for growing companies',
          features: ['Custom Design', 'Advanced SEO', 'CMS Integration', 'E-commerce Ready', '6 Months Support'],
          featured: true,
          popular: true
        },
        {
          name: 'Enterprise',
          price: '$12,999',
          description: 'For large organizations',
          features: ['Unlimited Pages', 'Complex Functionality', 'API Integrations', 'Priority Support', '12 Months Support'],
          featured: false,
          popular: false
        }
      ],
      status: 'published',
      featured: false,
      order: 0,
      ...service
    };

    // Auto-generate order if not editing existing service
    if (!service?.id) {
      baseData.order = getNextDisplayOrder(existingServices);
    }

    return baseData;
  });

  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(service?.image || '');
  const [imageFile, setImageFile] = useState(null);
  const [imageUploading, setImageUploading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.icon) newErrors.icon = 'Icon is required';

    // Validate features - at least one non-empty feature required
    const validFeatures = formData.features.filter(f => f.trim());
    if (validFeatures.length === 0) newErrors.features = 'At least one feature is required';

    // Validate process steps
    const validProcessSteps = formData.process.filter(p => p.title.trim() && p.description.trim());
    if (validProcessSteps.length === 0) newErrors.process = 'At least one process step is required';

    // Validate packages
    const validPackages = formData.packages.filter(p => p.name.trim() && p.price.trim() && p.description.trim());
    if (validPackages.length === 0) newErrors.packages = 'At least one package is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Clean up data - remove empty entries
      const cleanedData = {
        ...formData,
        features: formData.features.filter(f => f.trim()),
        process: formData.process.filter(p => p.title.trim() && p.description.trim()),
        packages: formData.packages.filter(p => p.name.trim() && p.price.trim() && p.description.trim())
      };
      onSave(cleanedData);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => {
      const updated = { ...prev, [field]: value };

      // Auto-adjust order when featured status changes (only for new services)
      if (field === 'featured' && !service?.id) {
        updated.order = getSuggestedDisplayOrder(existingServices, value);
      }

      return updated;
    });

    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    handleChange('features', newFeatures);
  };

  const addFeature = () => {
    handleChange('features', [...formData.features, '']);
  };

  const removeFeature = (index) => {
    if (formData.features.length > 1) {
      const newFeatures = formData.features.filter((_, i) => i !== index);
      handleChange('features', newFeatures);
    }
  };

  // Image upload handlers
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      setErrors(prev => ({ ...prev, image: 'Please select a valid image file (JPG, PNG, WebP, or GIF)' }));
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setErrors(prev => ({ ...prev, image: 'Image size must be less than 5MB' }));
      return;
    }

    setImageFile(file);
    setImageUploading(true);

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target.result);
      handleChange('image', e.target.result);
      setImageUploading(false);

      // Clear any previous errors
      if (errors.image) {
        setErrors(prev => ({ ...prev, image: '' }));
      }
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview('');
    handleChange('image', '');
    // Reset file input
    const fileInput = document.getElementById('service-image-upload');
    if (fileInput) fileInput.value = '';
  };

  // Process step handlers
  const handleProcessChange = (index, field, value) => {
    const newProcess = [...formData.process];
    newProcess[index] = { ...newProcess[index], [field]: value };
    handleChange('process', newProcess);
  };

  const addProcessStep = () => {
    const newStep = {
      step: formData.process.length + 1,
      title: '',
      description: ''
    };
    handleChange('process', [...formData.process, newStep]);
  };

  const removeProcessStep = (index) => {
    if (formData.process.length > 1) {
      const newProcess = formData.process.filter((_, i) => i !== index);
      // Renumber steps
      const renumberedProcess = newProcess.map((step, i) => ({ ...step, step: i + 1 }));
      handleChange('process', renumberedProcess);
    }
  };

  // Package handlers
  const handlePackageChange = (index, field, value) => {
    const newPackages = [...formData.packages];
    newPackages[index] = { ...newPackages[index], [field]: value };
    handleChange('packages', newPackages);
  };

  const handlePackageFeatureChange = (packageIndex, featureIndex, value) => {
    const newPackages = [...formData.packages];
    const newFeatures = [...newPackages[packageIndex].features];
    newFeatures[featureIndex] = value;
    newPackages[packageIndex] = { ...newPackages[packageIndex], features: newFeatures };
    handleChange('packages', newPackages);
  };

  const addPackageFeature = (packageIndex) => {
    const newPackages = [...formData.packages];
    newPackages[packageIndex] = {
      ...newPackages[packageIndex],
      features: [...newPackages[packageIndex].features, '']
    };
    handleChange('packages', newPackages);
  };

  const removePackageFeature = (packageIndex, featureIndex) => {
    const newPackages = [...formData.packages];
    if (newPackages[packageIndex].features.length > 1) {
      newPackages[packageIndex] = {
        ...newPackages[packageIndex],
        features: newPackages[packageIndex].features.filter((_, i) => i !== featureIndex)
      };
      handleChange('packages', newPackages);
    }
  };

  const addPackage = () => {
    const newPackage = {
      name: '',
      price: '',
      description: '',
      features: [''],
      featured: false,
      popular: false
    };
    handleChange('packages', [...formData.packages, newPackage]);
  };

  const removePackage = (index) => {
    if (formData.packages.length > 1) {
      const newPackages = formData.packages.filter((_, i) => i !== index);
      handleChange('packages', newPackages);
    }
  };

  const selectedIcon = SERVICE_ICONS.find(icon => icon.name === formData.icon);
  const IconComponent = selectedIcon?.component || Code;

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{service ? 'Edit Service' : 'Create New Service'}</CardTitle>
            <CardDescription>
              {service ? 'Update service information' : 'Add a new service to your offerings'}
            </CardDescription>
          </div>
          <Button variant="ghost" size="sm" onClick={onCancel}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Service Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="e.g., Web Design & Development"
              className={errors.title ? 'border-red-500' : ''}
            />
            {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Service Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Describe what this service offers to clients..."
              rows={3}
              className={errors.description ? 'border-red-500' : ''}
            />
            {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="icon">Service Icon *</Label>
            <Select value={formData.icon} onValueChange={(value) => handleChange('icon', value)}>
              <SelectTrigger className={`${errors.icon ? 'border-red-500' : ''} h-11`}>
                <SelectValue>
                  <div className="flex items-center space-x-2">
                    <IconComponent className="w-4 h-4" />
                    <span>{selectedIcon?.label || 'Select Icon'}</span>
                  </div>
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {SERVICE_ICONS.map((icon) => {
                  const Icon = icon.component;
                  return (
                    <SelectItem key={icon.name} value={icon.name}>
                      <div className="flex items-center space-x-2">
                        <Icon className="w-4 h-4" />
                        <span>{icon.label}</span>
                      </div>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
            {errors.icon && <p className="text-sm text-red-500">{errors.icon}</p>}
          </div>

          {/* Image Upload Field */}
          <div className="space-y-2">
            <Label htmlFor="service-image-upload">Service Image</Label>
            <div className="space-y-3">
              {imagePreview ? (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Service preview"
                    className="w-full h-48 object-cover rounded-lg border"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={removeImage}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 mb-2">Upload a service image</p>
                  <p className="text-xs text-gray-500">JPG, PNG, WebP or GIF (max 5MB)</p>
                </div>
              )}
              <div className="flex items-center space-x-2">
                <Input
                  id="service-image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById('service-image-upload').click()}
                  disabled={imageUploading}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  {imageUploading ? 'Uploading...' : imagePreview ? 'Change Image' : 'Upload Image'}
                </Button>
                {imagePreview && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={removeImage}
                  >
                    Remove
                  </Button>
                )}
              </div>
            </div>
            {errors.image && <p className="text-sm text-red-500">{errors.image}</p>}
          </div>

          <div className="space-y-2">
            <Label>Key Features *</Label>
            <div className="space-y-2">
              {formData.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Input
                    value={feature}
                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                    placeholder={`Feature ${index + 1}`}
                    className="flex-1"
                  />
                  {formData.features.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeFeature(index)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addFeature}
                className="w-full"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Feature
              </Button>
            </div>
            {errors.features && <p className="text-sm text-red-500">{errors.features}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="order" className="flex items-center gap-2">
              Display Order
              <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                Auto: {service?.id ? 'Current' : getNextDisplayOrder(existingServices)}
              </span>
            </Label>
            <Input
              id="order"
              type="number"
              min="1"
              value={formData.order}
              onChange={(e) => handleChange('order', parseInt(e.target.value) || 1)}
              placeholder={getNextDisplayOrder(existingServices).toString()}
              className="font-mono w-32"
            />
            <p className="text-xs text-muted-foreground">
              {service?.id
                ? 'Change order to reposition this service. Lower numbers appear first.'
                : `Auto-generated order: ${getNextDisplayOrder(existingServices)}. You can change this if needed.`
              }
            </p>
          </div>

          {/* Our Process Section */}
          <div className="space-y-4 border-t pt-6">
            <div className="flex items-center justify-between">
              <Label className="text-lg font-semibold">Our Process Steps</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addProcessStep}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Step
              </Button>
            </div>
            <div className="space-y-4 max-h-64 overflow-y-auto">
              {formData.process.map((step, index) => (
                <div key={index} className="border rounded-lg p-4 bg-gray-50">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-gray-700">Step {step.step}</span>
                    {formData.process.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeProcessStep(index)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <Input
                      value={step.title}
                      onChange={(e) => handleProcessChange(index, 'title', e.target.value)}
                      placeholder="Step title (e.g., Discovery)"
                    />
                    <Input
                      value={step.description}
                      onChange={(e) => handleProcessChange(index, 'description', e.target.value)}
                      placeholder="Step description"
                    />
                  </div>
                </div>
              ))}
            </div>
            {errors.process && <p className="text-sm text-red-500">{errors.process}</p>}
          </div>

          {/* Choose Your Package Section */}
          <div className="space-y-4 border-t pt-6">
            <div className="flex items-center justify-between">
              <Label className="text-lg font-semibold">Pricing Packages</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addPackage}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Package
              </Button>
            </div>
            <div className="space-y-6 max-h-96 overflow-y-auto">
              {formData.packages.map((pkg, packageIndex) => (
                <div key={packageIndex} className="border rounded-lg p-4 bg-gray-50">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm font-medium text-gray-700">Package {packageIndex + 1}</span>
                    {formData.packages.length > 1 && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removePackage(packageIndex)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                    <Input
                      value={pkg.name}
                      onChange={(e) => handlePackageChange(packageIndex, 'name', e.target.value)}
                      placeholder="Package name (e.g., Starter)"
                    />
                    <Input
                      value={pkg.price}
                      onChange={(e) => handlePackageChange(packageIndex, 'price', e.target.value)}
                      placeholder="Price (e.g., $2,999)"
                    />
                    <Input
                      value={pkg.description}
                      onChange={(e) => handlePackageChange(packageIndex, 'description', e.target.value)}
                      placeholder="Package description"
                    />
                  </div>

                  <div className="space-y-2 mb-4">
                    <Label className="text-sm font-medium">Package Features</Label>
                    {pkg.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-2">
                        <Input
                          value={feature}
                          onChange={(e) => handlePackageFeatureChange(packageIndex, featureIndex, e.target.value)}
                          placeholder={`Feature ${featureIndex + 1}`}
                          className="flex-1"
                        />
                        {pkg.features.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removePackageFeature(packageIndex, featureIndex)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => addPackageFeature(packageIndex)}
                      className="w-full"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Feature
                    </Button>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={pkg.featured}
                        onCheckedChange={(checked) => handlePackageChange(packageIndex, 'featured', checked)}
                      />
                      <Label className="text-sm">Featured</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={pkg.popular}
                        onCheckedChange={(checked) => handlePackageChange(packageIndex, 'popular', checked)}
                      />
                      <Label className="text-sm">Most Popular</Label>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {errors.packages && <p className="text-sm text-red-500">{errors.packages}</p>}
          </div>

          <div className="flex items-center space-x-4 border-t pt-6">
            <div className="flex items-center space-x-2">
              <Switch
                id="featured"
                checked={formData.featured}
                onCheckedChange={(checked) => handleChange('featured', checked)}
              />
              <Label htmlFor="featured">Featured Service</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Label htmlFor="status">Status:</Label>
              <Select value={formData.status} onValueChange={(value) => handleChange('status', value)}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              <Save className="w-4 h-4 mr-2" />
              {loading ? 'Saving...' : 'Save Service'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

// Project Form Component
export const ProjectForm = ({ project, onSave, onCancel, loading, existingProjects = [] }) => {
  const [formData, setFormData] = useState(() => {
    const baseData = {
      title: '',
      description: '',
      image: '',
      url: '',
      category: '',
      technologies: [],
      featured: false,
      status: 'published',
      order: 0,
      ...project
    };

    // Auto-generate order if not editing existing project
    if (!project?.id) {
      baseData.order = getNextDisplayOrder(existingProjects);
    }

    return baseData;
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.category.trim()) newErrors.category = 'Category is required';
    if (!formData.url.trim()) newErrors.url = 'Project URL is required';
    else if (!/^https?:\/\/.+/.test(formData.url)) newErrors.url = 'Please enter a valid URL';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => {
      const updated = { ...prev, [field]: value };

      // Auto-adjust order when featured status changes (only for new projects)
      if (field === 'featured' && !project?.id) {
        updated.order = getSuggestedDisplayOrder(existingProjects, value);
      }

      return updated;
    });

    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };



  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{project ? 'Edit Project' : 'Create New Project'}</CardTitle>
            <CardDescription>
              {project ? 'Update project information' : 'Add a new project to your portfolio'}
            </CardDescription>
          </div>
          <Button variant="ghost" size="sm" onClick={onCancel}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="Project title"
              className={errors.title ? 'border-red-500' : ''}
            />
            {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Project description"
              rows={3}
              className={errors.description ? 'border-red-500' : ''}
            />
            {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Project Category *</Label>
              <Select value={formData.category} onValueChange={(value) => handleChange('category', value)}>
                <SelectTrigger className={`${errors.category ? 'border-red-500' : ''} h-11`}>
                  <SelectValue placeholder="Choose project category..." />
                </SelectTrigger>
                <SelectContent className="max-h-80">
                  {/* Popular Categories */}
                  <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide bg-muted/50">
                    Popular Categories
                  </div>
                  {POPULAR_CATEGORIES.map((category) => (
                    <SelectItem key={category} value={category} className="font-medium">
                      {category}
                    </SelectItem>
                  ))}

                  {/* All Categories */}
                  <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide bg-muted/50 mt-2">
                    All Categories ({PROJECT_CATEGORIES.length})
                  </div>
                  {PROJECT_CATEGORIES.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.category && <p className="text-sm text-red-500">{errors.category}</p>}
              <p className="text-xs text-muted-foreground">
                Choose the category that best describes your project
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="order">Display Order</Label>
              <Input
                id="order"
                type="number"
                value={formData.order}
                onChange={(e) => handleChange('order', parseInt(e.target.value) || 0)}
                placeholder={getSuggestedDisplayOrder(existingProjects)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="image">Image URL</Label>
              <Input
                id="image"
                value={formData.image}
                onChange={(e) => handleChange('image', e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="url">Project URL *</Label>
              <Input
                id="url"
                value={formData.url}
                onChange={(e) => handleChange('url', e.target.value)}
                placeholder="https://example.com"
                className={errors.url ? 'border-red-500' : ''}
              />
              {errors.url && <p className="text-sm text-red-500">{errors.url}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-base font-medium">Technologies Used</Label>
            <MultiSelect
              options={TECHNOLOGY_OPTIONS}
              value={formData.technologies}
              onChange={(technologies) => handleChange('technologies', technologies)}
              placeholder="Choose technologies for this project..."
              searchPlaceholder="Search for technologies..."
              categorized={true}
              categories={CATEGORIZED_TECHNOLOGY_OPTIONS}
              popularStacks={POPULAR_TECH_STACKS}
              maxDisplayed={6}
            />
            <div className="flex items-start space-x-2 text-sm text-muted-foreground">
              <div className="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center mt-0.5">
                <span className="text-xs">💡</span>
              </div>
              <p>
                Start with <strong>Popular</strong> tab for common tech stacks, or browse <strong>All</strong> for specific technologies.
                You can select multiple technologies that were used in this project.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="featured"
                checked={formData.featured}
                onCheckedChange={(checked) => handleChange('featured', checked)}
              />
              <Label htmlFor="featured">Featured Project</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Label htmlFor="status">Status:</Label>
              <Select value={formData.status} onValueChange={(value) => handleChange('status', value)}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              <Save className="w-4 h-4 mr-2" />
              {loading ? 'Saving...' : 'Save Project'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

// Team Member Form Component
export const TeamMemberForm = ({ member, onSave, onCancel, loading, existingTeam = [] }) => {
  const [formData, setFormData] = useState(() => {
    const baseData = {
      name: '',
      role: '',
      description: '',
      avatar: '',
      status: 'active',
      order: 0,
      linkedin: '',
      twitter: '',
      email: '',
      github: '',
      instagram: '',
      facebook: '',
      youtube: '',
      tiktok: '',
      discord: '',
      behance: '',
      dribbble: '',
      medium: '',
      website: '',
      ...member
    };

    // Auto-generate order if not editing existing team member
    if (!member?.id) {
      baseData.order = getNextDisplayOrder(existingTeam);
    }

    return baseData;
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.role.trim()) newErrors.role = 'Role is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => {
      const updated = { ...prev, [field]: value };

      // Auto-adjust order when status changes (only for new team members)
      if (field === 'status' && !member?.id && value === 'active') {
        updated.order = getSuggestedDisplayOrder(existingTeam, true);
      }

      return updated;
    });

    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{member ? 'Edit Team Member' : 'Add New Team Member'}</CardTitle>
            <CardDescription>
              {member ? 'Update team member information' : 'Add a new member to your team'}
            </CardDescription>
          </div>
          <Button variant="ghost" size="sm" onClick={onCancel}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="Full name"
                className={errors.name ? 'border-red-500' : ''}
              />
              {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">Role *</Label>
              <Input
                id="role"
                value={formData.role}
                onChange={(e) => handleChange('role', e.target.value)}
                placeholder="e.g., Frontend Developer"
                className={errors.role ? 'border-red-500' : ''}
              />
              {errors.role && <p className="text-sm text-red-500">{errors.role}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Bio/Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Brief description about the team member"
              rows={3}
              className={errors.description ? 'border-red-500' : ''}
            />
            {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="avatar">Avatar URL</Label>
              <Input
                id="avatar"
                value={formData.avatar}
                onChange={(e) => handleChange('avatar', e.target.value)}
                placeholder="https://example.com/avatar.jpg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="order" className="flex items-center gap-2">
                Display Order
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                  Auto: {member?.id ? 'Current' : getNextDisplayOrder(existingTeam)}
                </span>
              </Label>
              <Input
                id="order"
                type="number"
                min="1"
                value={formData.order}
                onChange={(e) => handleChange('order', parseInt(e.target.value) || 1)}
                placeholder={getNextDisplayOrder(existingTeam).toString()}
                className="font-mono"
              />
              <p className="text-xs text-muted-foreground">
                {member?.id
                  ? 'Change order to reposition this team member. Lower numbers appear first.'
                  : `Auto-generated order: ${getNextDisplayOrder(existingTeam)}. You can change this if needed.`
                }
              </p>
            </div>
          </div>

          {/* Social Media Links Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Label className="text-base font-semibold">Social Media Links</Label>
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Optional</span>
            </div>

            {/* Professional Networks */}
            <div className="space-y-3">
              <Label className="text-sm font-medium text-gray-700">Professional Networks</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn Profile</Label>
                  <Input
                    id="linkedin"
                    value={formData.linkedin}
                    onChange={(e) => handleChange('linkedin', e.target.value)}
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="github">GitHub Profile</Label>
                  <Input
                    id="github"
                    value={formData.github}
                    onChange={(e) => handleChange('github', e.target.value)}
                    placeholder="https://github.com/username"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="behance">Behance Portfolio</Label>
                  <Input
                    id="behance"
                    value={formData.behance}
                    onChange={(e) => handleChange('behance', e.target.value)}
                    placeholder="https://behance.net/username"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dribbble">Dribbble Profile</Label>
                  <Input
                    id="dribbble"
                    value={formData.dribbble}
                    onChange={(e) => handleChange('dribbble', e.target.value)}
                    placeholder="https://dribbble.com/username"
                  />
                </div>
              </div>
            </div>

            {/* Social Platforms */}
            <div className="space-y-3">
              <Label className="text-sm font-medium text-gray-700">Social Platforms</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="twitter">Twitter Profile</Label>
                  <Input
                    id="twitter"
                    value={formData.twitter}
                    onChange={(e) => handleChange('twitter', e.target.value)}
                    placeholder="https://twitter.com/username"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="instagram">Instagram Profile</Label>
                  <Input
                    id="instagram"
                    value={formData.instagram}
                    onChange={(e) => handleChange('instagram', e.target.value)}
                    placeholder="https://instagram.com/username"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="facebook">Facebook Profile</Label>
                  <Input
                    id="facebook"
                    value={formData.facebook}
                    onChange={(e) => handleChange('facebook', e.target.value)}
                    placeholder="https://facebook.com/username"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tiktok">TikTok Profile</Label>
                  <Input
                    id="tiktok"
                    value={formData.tiktok}
                    onChange={(e) => handleChange('tiktok', e.target.value)}
                    placeholder="https://tiktok.com/@username"
                  />
                </div>
              </div>
            </div>

            {/* Content & Communication */}
            <div className="space-y-3">
              <Label className="text-sm font-medium text-gray-700">Content & Communication</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="youtube">YouTube Channel</Label>
                  <Input
                    id="youtube"
                    value={formData.youtube}
                    onChange={(e) => handleChange('youtube', e.target.value)}
                    placeholder="https://youtube.com/@username"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="medium">Medium Profile</Label>
                  <Input
                    id="medium"
                    value={formData.medium}
                    onChange={(e) => handleChange('medium', e.target.value)}
                    placeholder="https://medium.com/@username"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="discord">Discord Profile</Label>
                  <Input
                    id="discord"
                    value={formData.discord}
                    onChange={(e) => handleChange('discord', e.target.value)}
                    placeholder="username#1234 or Discord server invite"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    placeholder="email@example.com"
                  />
                </div>
              </div>
            </div>

            {/* Personal Website */}
            <div className="space-y-3">
              <Label className="text-sm font-medium text-gray-700">Personal Website</Label>
              <div className="space-y-2">
                <Label htmlFor="website">Website/Portfolio URL</Label>
                <Input
                  id="website"
                  value={formData.website}
                  onChange={(e) => handleChange('website', e.target.value)}
                  placeholder="https://yourwebsite.com"
                />
              </div>
            </div>

            <p className="text-xs text-muted-foreground bg-gray-50 p-3 rounded-lg">
              💡 <strong>Tip:</strong> Add social media links to display interactive icons on team member cards. Only filled links will show as clickable icons. Leave empty to hide specific social icons.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <Label htmlFor="status">Status:</Label>
            <Select value={formData.status} onValueChange={(value) => handleChange('status', value)}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              <Save className="w-4 h-4 mr-2" />
              {loading ? 'Saving...' : 'Save Member'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
