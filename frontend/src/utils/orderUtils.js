// Utility functions for automatic display order management

/**
 * Get the next available display order for a collection
 * @param {Array} items - Array of items with order property
 * @returns {number} - Next available order number
 */
export const getNextDisplayOrder = (items = []) => {
  if (!Array.isArray(items) || items.length === 0) {
    return 1;
  }
  
  // Find the maximum order value and add 1
  const maxOrder = Math.max(...items.map(item => item.order || 0));
  return maxOrder + 1;
};

/**
 * Get suggested display order based on existing items
 * @param {Array} items - Array of items with order property
 * @param {boolean} featured - Whether the item is featured (featured items get lower order)
 * @returns {number} - Suggested order number
 */
export const getSuggestedDisplayOrder = (items = [], featured = false) => {
  if (!Array.isArray(items) || items.length === 0) {
    return 1;
  }
  
  if (featured) {
    // For featured items, find the lowest order among featured items
    const featuredItems = items.filter(item => item.featured);
    if (featuredItems.length === 0) {
      return 1; // First featured item
    }
    const minFeaturedOrder = Math.min(...featuredItems.map(item => item.order || 0));
    return Math.max(1, minFeaturedOrder);
  } else {
    // For non-featured items, add to the end
    return getNextDisplayOrder(items);
  }
};

/**
 * Reorder items to ensure sequential ordering
 * @param {Array} items - Array of items to reorder
 * @returns {Array} - Reordered items with sequential order values
 */
export const reorderItems = (items = []) => {
  if (!Array.isArray(items)) return [];
  
  // Sort by current order, then by creation date
  const sortedItems = [...items].sort((a, b) => {
    const orderA = a.order || 0;
    const orderB = b.order || 0;
    
    if (orderA !== orderB) {
      return orderA - orderB;
    }
    
    // If orders are the same, sort by creation date
    const dateA = a.createdAt || 0;
    const dateB = b.createdAt || 0;
    return dateA - dateB;
  });
  
  // Assign sequential order values
  return sortedItems.map((item, index) => ({
    ...item,
    order: index + 1
  }));
};

/**
 * Insert item at specific position and reorder others
 * @param {Array} items - Existing items
 * @param {Object} newItem - New item to insert
 * @param {number} position - Position to insert at (1-based)
 * @returns {Array} - Updated items array with proper ordering
 */
export const insertAtPosition = (items = [], newItem, position) => {
  if (!Array.isArray(items)) return [newItem];
  
  const updatedItems = [...items];
  
  // Adjust orders of existing items
  updatedItems.forEach(item => {
    if (item.order >= position) {
      item.order += 1;
    }
  });
  
  // Add new item with specified position
  updatedItems.push({
    ...newItem,
    order: position
  });
  
  return reorderItems(updatedItems);
};

/**
 * Move item to new position
 * @param {Array} items - Array of items
 * @param {string} itemId - ID of item to move
 * @param {number} newPosition - New position (1-based)
 * @returns {Array} - Updated items array
 */
export const moveItemToPosition = (items = [], itemId, newPosition) => {
  if (!Array.isArray(items)) return [];
  
  const itemIndex = items.findIndex(item => item.id === itemId);
  if (itemIndex === -1) return items;
  
  const updatedItems = [...items];
  const [movedItem] = updatedItems.splice(itemIndex, 1);
  
  // Insert at new position
  updatedItems.splice(newPosition - 1, 0, movedItem);
  
  // Reorder all items
  return reorderItems(updatedItems);
};

/**
 * Get display order statistics
 * @param {Array} items - Array of items
 * @returns {Object} - Statistics about display orders
 */
export const getOrderStatistics = (items = []) => {
  if (!Array.isArray(items) || items.length === 0) {
    return {
      total: 0,
      minOrder: 0,
      maxOrder: 0,
      hasGaps: false,
      duplicates: []
    };
  }
  
  const orders = items.map(item => item.order || 0);
  const minOrder = Math.min(...orders);
  const maxOrder = Math.max(...orders);
  
  // Check for gaps in ordering
  const expectedOrders = Array.from({ length: maxOrder - minOrder + 1 }, (_, i) => minOrder + i);
  const hasGaps = !expectedOrders.every(order => orders.includes(order));
  
  // Check for duplicates
  const orderCounts = {};
  orders.forEach(order => {
    orderCounts[order] = (orderCounts[order] || 0) + 1;
  });
  const duplicates = Object.keys(orderCounts).filter(order => orderCounts[order] > 1);
  
  return {
    total: items.length,
    minOrder,
    maxOrder,
    hasGaps,
    duplicates: duplicates.map(Number)
  };
};
