import { useState, useRef, useEffect } from 'react';
import { ChevronDown, X } from 'lucide-react';

export default function FilterDropdown({ 
  title,
  options,
  selected = [],
  onSelect,
  multiSelect = true,
  placeholder = "Select options...",
  showCount = true
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleOptionClick = (optionId) => {
    if (multiSelect) {
      if (selected.includes(optionId)) {
        onSelect(selected.filter(id => id !== optionId));
      } else {
        onSelect([...selected, optionId]);
      }
    } else {
      onSelect([optionId]);
      setIsOpen(false);
    }
  };

  const clearSelection = () => {
    onSelect([]);
  };

  const getSelectedLabels = () => {
    if (selected.length === 0) return placeholder;
    if (selected.length === 1) {
      const option = options.find(opt => opt.id === selected[0]);
      return option ? option.name : placeholder;
    }
    return `${selected.length} types selected`;
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-4 py-2.5 border rounded-lg bg-white hover:bg-gray-50 transition-colors"
        style={{ 
          borderColor: '#e5e7eb',
          minWidth: '200px'
        }}
      >
        <div className="flex flex-col items-start">
          <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: '#6b7280' }}>
            {title}
          </span>
          <span className="text-[12px] font-medium truncate max-w-[180px]" style={{ color: '#374151' }}>
            {getSelectedLabels()}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {selected.length > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                clearSelection();
              }}
              className="text-[#6b7280] hover:text-[#ef4444] transition-colors"
            >
              <X size={14} />
            </button>
          )}
          <ChevronDown 
            size={16} 
            className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            style={{ color: '#6b7280' }}
          />
        </div>
      </button>

      {isOpen && (
        <div 
          className="absolute top-full left-0 mt-1 w-full max-w-xs bg-white border rounded-lg shadow-xl z-50 max-h-80 overflow-y-auto"
          style={{ 
            borderColor: '#e5e7eb',
            boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
          }}
        >
          {/* Header */}
          <div className="px-4 py-3 border-b" style={{ borderColor: '#f3f4f6' }}>
            <div className="flex items-center justify-between">
              <span className="text-[12px] font-bold" style={{ color: '#374151' }}>{title}</span>
              {selected.length > 0 && (
                <button
                  onClick={clearSelection}
                  className="text-[10px] font-semibold hover:text-[#ef4444] transition-colors"
                  style={{ color: '#6b7280' }}
                >
                  Clear all
                </button>
              )}
            </div>

          </div>

          {/* Options */}
          <div className="p-2">
            {options.map((option) => {
              const isSelected = selected.includes(option.id);
              return (
                <button
                  key={option.id}
                  onClick={() => handleOptionClick(option.id)}
                  className="flex items-center justify-between w-full px-3 py-2.5 rounded-lg hover:bg-gray-50 transition-colors text-left"
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className={`w-4 h-4 rounded border flex items-center justify-center ${isSelected ? 'bg-blue-600 border-blue-600' : 'border-gray-300'}`}
                    >
                      {isSelected && (
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <path d="M8.33333 2.5L3.75 7.08333L1.66667 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[13px] font-medium" style={{ color: '#374151' }}>
                        {option.name}
                      </span>
                      {option.desc && (
                        <span className="text-[11px] mt-0.5" style={{ color: '#6b7280' }}>
                          {option.desc}
                        </span>
                      )}
                    </div>
                  </div>
                  {option.count !== undefined && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ 
                      background: '#f3f4f6',
                      color: '#6b7280'
                    }}>
                      {option.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>


        </div>
      )}
    </div>
  );
}