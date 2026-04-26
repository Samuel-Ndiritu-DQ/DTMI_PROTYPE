import { useState } from 'react';
import { Filter, X, ChevronDown } from 'lucide-react';
import { CONTENT_CATEGORIES } from '../data/contentTypes';
import FilterDropdown from './FilterDropdown';

export default function ContentFilterV2({ 
  activeTypes = [],
  onTypeChange,
  activeCategory = 'All',
  onCategoryChange,
  categories = [],
  showContentTypeFilter = true,
  showCategoryFilter = true,
  filterCategory = null,
  typeMapping = null
}) {
  const [showAllTypes, setShowAllTypes] = useState(false);
  
  // Get content types based on filterCategory (e.g., 'research', 'executive', etc.)
  const categoryKey = filterCategory ? filterCategory.toUpperCase() : null;
  const contentTypeOptions = categoryKey && CONTENT_CATEGORIES[categoryKey]
    ? CONTENT_CATEGORIES[categoryKey].types.map(type => ({
        id: type.id,
        name: type.name,
        desc: type.description,
        color: type.cardColor
      }))
    : [];

  // Debug logging
  if (filterCategory) {
    console.log('filterCategory:', filterCategory, 'categoryKey:', categoryKey, 'found:', !!CONTENT_CATEGORIES[categoryKey], 'options:', contentTypeOptions.length);
  }

  // Prepare category options for dropdown
  const categoryOptions = categories.map(cat => ({
    id: cat,
    name: cat,
    desc: 'Domain category'
  }));

  // Get selected content type names for display
  const getSelectedTypeNames = () => {
    return activeTypes.map(typeId => {
      const type = contentTypeOptions.find(t => t.id === typeId);
      return type ? type.name : typeId;
    });
  };

  // Get selected category name
  const getSelectedCategoryName = () => {
    return activeCategory === 'All' ? 'All Domains' : activeCategory;
  };

  return (
    <div className="w-full">
      {/* Content Type Filter */}
      {showContentTypeFilter && (
        contentTypeOptions.length > 0 ? (
          <FilterDropdown
            title="CONTENT TYPE"
            options={contentTypeOptions}
            selected={activeTypes}
            onSelect={onTypeChange}
            multiSelect={true}
            placeholder="Select content types..."
            showCount={false}
          />
        ) : (
          <div style={{ padding: '8px', color: '#999', fontSize: '12px' }}>
            No content types available
          </div>
        )
      )}
    </div>
  );
}