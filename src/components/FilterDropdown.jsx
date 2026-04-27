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
    if (selected.length === 0) return '';
    if (selected.length === 1) {
      const option = options.find(opt => opt.id === selected[0]);
      return option ? option.name : '';
    }
    return `${selected.length} types selected`;
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-4 py-2.5 border rounded-lg bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        style={{ 
          borderColor: '#cbd5e1',
          minWidth: '200px'
        }}
      >
        <div className="flex flex-col items-start">
          <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: '#0f766e' }}>
            {title}
          </span>
          <span className="text-[13px] font-medium truncate max-w-[180px]" style={{ color: '#0f766e' }}>
            {getSelectedLabels()}
          </span>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          {selected.length > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                clearSelection();
              }}
              className="text-slate-400 hover:text-red-500 transition-colors"
            >
              <X size={14} />
            </button>
          )}
          <ChevronDown 
            size={16} 
            className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            style={{ color: '#94a3b8' }}
          />
        </div>
      </button>

      {isOpen && (
        <div 
          className="absolute top-full left-0 mt-1 min-w-full w-max max-w-xs bg-white border rounded-lg shadow-xl z-50 max-h-80 overflow-y-auto"
          style={{ 
            borderColor: '#e5e7eb',
            boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
            willChange: 'transform'
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
                  className={`flex items-center justify-between w-full px-3 py-2.5 rounded-md hover:bg-slate-100 transition-colors text-left ${isSelected ? 'bg-blue-50 border-l-2 border-blue-600' : 'border-l-2 border-transparent'}`}
                >
                  <div className="flex items-center gap-3 flex-1">
                    {/* Always reserve space for the dot to prevent layout shift */}
                    <div className={`w-2 h-2 rounded-full flex-shrink-0 transition-colors ${isSelected ? 'bg-blue-600' : 'bg-transparent'}`} />
                    <div className="flex flex-col flex-1">
                      <span className="text-[13px] font-medium" style={{ color: '#1e293b' }}>
                        {option.name}
                      </span>
                      {option.desc && (
                        <span className="text-[11px] mt-0.5" style={{ color: '#64748b' }}>
                          {option.desc}
                        </span>
                      )}
                    </div>
                  </div>
                  {option.count !== undefined && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full flex-shrink-0" style={{ 
                      background: '#f1f5f9',
                      color: '#64748b'
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