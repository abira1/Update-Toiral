export const createSlug = (title) => {
  if (!title) return '';
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

export const getServiceSlug = (service) => {
  // Predefined slugs for existing services to maintain consistency
  const slugMap = {
    1: 'web-design-development',
    2: 'seo-services', 
    3: 'admin-panels',
    4: 'full-stack-solutions'
  };
  
  // Use predefined slug or create from title
  return slugMap[service.id] || createSlug(service.title);
};

export const getCourseSlug = (course) => {
  return createSlug(course.title);
};