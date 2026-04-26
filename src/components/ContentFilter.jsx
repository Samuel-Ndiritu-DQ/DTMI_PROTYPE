import { useState } from 'react';
import { Filter, X } from 'lucide-react';
import { ALL_CONTENT_TYPES, CONTENT_CATEGORIES } from '../data/contentTypes';

export default function ContentFilter({ 
  activeTypes = [],
  onTypeChange,
  activeCategory = 'All',
  onCategoryChange,
  categories = [],
  showContentTypeFilter = true,
  showCategoryFilter = true
}) {
  const [showAllTypes, setShowAllTypes] = useState(false);
  
  // Group content types by category
  const groupedTypes = ALL_CONTENT_TYPES.reduce((acc, type) => {
    if (!acc[type.category]) {
      acc[type.category] = [];
    }
    acc[type.category].push(type);
    return acc;
  }, {});
  
  // Get visible types (show all or limited)
  const visibleTypes = showAllTypes ? ALL_CONTENT_TYPES : ALL_CONTENT_TYPES.slice(0, 8);
  
  return (
    <div className="space-y-4">
      {/* Content Type Filter */}
      {showContentTypeFilter && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-black uppercase tracking-widest flex items-center gap-1.5" style={{ color: '#6b7280' }}>
              <Filter size={12} /> CONTENT TYPE FILTER
            </span>
            {ALL_CONTENT_TYPES.length > 8 && (
              <button 
                onClick={() => setShowAllTypes(!showAllTypes)}
                className="text-[10px] font-semibold px-3 py-1 rounded border transition-colors"
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  borderColor: 'rgba(255,255,255,0.2)',
                  color: '#94a3b8'
                }}
              >
                {showAllTypes ? 'Show Less' : `Show All (${ALL_CONTENT_TYPES.length})`}
              </button>
            )}
          </div>
          
          {/* Content type groups */}
          <div className="space-y-4">
            {Object.entries(groupedTypes).map(([categoryId, types]) => {
              const category = CONTENT_CATEGORIES[categoryId];
              if (!category) return null;
              
              const categoryTypes = showAllTypes ? types : types.slice(0, 3);
              
              return (
                <div key={categoryId} className="space-y-2">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-3 h-3 rounded-sm" style={{ background: category.color }} />
                    <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: category.color }}>
                      {category.name}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {categoryTypes.map(type => {
                      const isActive = activeTypes.includes(type.id);
                      return (
                        <button
                          key={type.id}
                          onClick={() => onTypeChange(type.id)}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border transition-all hover:scale-105"
                          style={{
                            background: isActive ? category.color : 'rgba(255,255,255,0.7)',
                            borderColor: isActive ? category.color : 'rgba(0,0,0,0.1)',
                            color: isActive ? 'white' : '#4b5563'
                          }}
                        >
                          <span className="text-[10px] font-semibold">{type.name}</span>
                          {isActive && <X size={10} />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      
      {/* Category Filter */}
      {showCategoryFilter && categories.length > 0 && (
        <div className="space-y-3">
          <span className="text-[11px] font-black uppercase tracking-widest flex items-center gap-1.5" style={{ color: '#6b7280' }}>
            <Filter size={12} /> DOMAIN FILTER
          </span>
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => onCategoryChange(cat)}
                className="text-[11px] font-semibold px-3 py-1.5 rounded-lg border transition-all hover:scale-105"
                style={{
                  background: activeCategory === cat ? 'var(--brand-orange)' : 'rgba(255,255,255,0.7)',
                  color: activeCategory === cat ? 'white' : '#6b7280',
                  borderColor: activeCategory === cat ? 'var(--brand-orange)' : 'rgba(0,0,0,0.1)',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}