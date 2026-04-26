import { useState } from 'react';
import { Filter, X, ChevronDown } from 'lucide-react';
import { ALL_CONTENT_TYPES, CONTENT_CATEGORIES } from '../data/contentTypes';
import FilterDropdown from './FilterDropdown';

export default function ContentFilterV2({ 
  activeTypes = [],
  onTypeChange,
  activeCategory = 'All',
  onCategoryChange,
  categories = [],
  showContentTypeFilter = true,
  showCategoryFilter = true
}) {
  const [showAllTypes, setShowAllTypes] = useState(false);
  
  // Group content types by category for the dropdown
  const groupedTypes = ALL_CONTENT_TYPES.reduce((acc, type) => {
    if (!acc[type.category]) {
      acc[type.category] = [];
    }
    acc[type.category].push({
      id: type.id,
      name: type.name,
      desc: type.categoryName,
      color: type.color
    });
    return acc;
  }, {});

  // Prepare content type options for dropdown
  const contentTypeOptions = ALL_CONTENT_TYPES.map(type => ({
    id: type.id,
    name: type.name,
    desc: type.categoryName,
    color: type.color
  }));

  // Prepare category options for dropdown
  const categoryOptions = categories.map(cat => ({
    id: cat,
    name: cat,
    desc: 'Domain category'
  }));

  // Get selected content type names for display
  const getSelectedTypeNames = () => {
    return activeTypes.map(typeId => {
      const type = ALL_CONTENT_TYPES.find(t => t.id === typeId);
      return type ? type.name : typeId;
    });
  };

  // Get selected category name
  const getSelectedCategoryName = () => {
    return activeCategory === 'All' ? 'All Domains' : activeCategory;
  };

  return (
    <div>
      {/* Content Type Filter Dropdown - Professional version */}
      {showContentTypeFilter && (
        <div className="flex items-center gap-3">
          <FilterDropdown
            title="CONTENT TYPE"
            options={contentTypeOptions}
            selected={activeTypes}
            onSelect={onTypeChange}
            multiSelect={true}
            placeholder="Select content types..."
            showCount={false}
          />
        </div>
      )}
    </div>
  );
}