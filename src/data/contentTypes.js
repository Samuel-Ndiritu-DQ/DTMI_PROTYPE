// Complete Content Type System
// All 18 content types with McKinsey-inspired clean, professional business styling

export const CONTENT_CATEGORIES = {
  // HIGH-LEVEL EXECUTIVE & SHORT-FORM CONTENT
  EXECUTIVE: {
    id: 'executive',
    name: 'Executive & Short-Form',
    description: 'Decision-focused content for busy leaders and urgent insights',
    color: '#1a56db', // Professional blue
    bgColor: 'rgba(26, 86, 219, 0.05)',
    borderColor: 'rgba(26, 86, 219, 0.2)',
    icon: 'Briefcase',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    cardStyle: 'executive',
    readingStyle: 'decision',
    types: [
      { 
        id: 'executive-briefs', 
        name: 'Executive Briefs', 
        priority: 1,
        icon: 'Zap',
        cardColor: '#1a56db',
        readingColor: '#1a56db',
        typography: 'sans',
        layout: 'brief',
        length: '500-1,000 words',
        description: 'Key issue, strategic implications, 3-5 bullet recommendations'
      },
      { 
        id: 'frontier-watch', 
        name: 'Frontier Watch', 
        priority: 2,
        icon: 'Eye',
        cardColor: '#3b82f6',
        readingColor: '#3b82f6',
        typography: 'sans',
        layout: 'monitor',
        length: '800-1,200 words',
        description: 'Emerging signals, weak signals + early evidence, why it matters soon'
      },
      { 
        id: 'frontier-brief', 
        name: 'Frontier Brief', 
        priority: 3,
        icon: 'Compass',
        cardColor: '#0ea5e9',
        readingColor: '#0ea5e9',
        typography: 'sans',
        layout: 'deep-dive',
        length: '1,200-2,000 words',
        description: 'Deep dive into one emerging trend, use cases + early adopters, risks and upside'
      },
      { 
        id: 'rapid-insights', 
        name: 'Rapid Insights', 
        priority: 4,
        icon: 'Zap',
        cardColor: '#06b6d4',
        readingColor: '#06b6d4',
        typography: 'sans',
        layout: 'quick',
        length: '300-600 words',
        description: 'One key insight, supporting data, quick takeaway'
      },
      { 
        id: 'trend-alerts', 
        name: 'Trend Alerts', 
        priority: 5,
        icon: 'AlertTriangle',
        cardColor: '#ef4444',
        readingColor: '#ef4444',
        typography: 'sans',
        layout: 'alert',
        length: '200-500 words',
        description: 'Breaking trend or shift, immediate implications, "what to do now"'
      }
    ]
  },
  
  // THOUGHT LEADERSHIP & OPINION
  THOUGHT_LEADERSHIP: {
    id: 'thought-leadership',
    name: 'Thought Leadership',
    description: 'Opinion-driven content with personal or organizational perspective',
    color: '#7c3aed', // Professional purple
    bgColor: 'rgba(124, 58, 237, 0.05)',
    borderColor: 'rgba(124, 58, 237, 0.2)',
    icon: 'MessageSquare',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    cardStyle: 'opinion',
    readingStyle: 'perspective',
    types: [
      { 
        id: 'viewpoint-blogs', 
        name: 'Viewpoint Blogs', 
        priority: 1,
        icon: 'PenTool',
        cardColor: '#7c3aed',
        readingColor: '#7c3aed',
        typography: 'sans',
        layout: 'blog',
        length: '800-1,500 words',
        description: 'Opinion or argument, personal or organizational stance, examples or anecdotes'
      },
      { 
        id: 'strategic-essay', 
        name: 'Strategic Essay', 
        priority: 2,
        icon: 'FileText',
        cardColor: '#8b5cf6',
        readingColor: '#8b5cf6',
        typography: 'serif',
        layout: 'essay',
        length: '2,000-4,000 words',
        description: 'Big idea, deep reasoning, long-term implications'
      }
    ]
  },
  
  // EDUCATIONAL / EXPLANATORY CONTENT
  EDUCATIONAL: {
    id: 'educational',
    name: 'Educational Content',
    description: 'Explanatory content for learning and understanding',
    color: '#0e9f6e', // Professional green
    bgColor: 'rgba(14, 159, 110, 0.05)',
    borderColor: 'rgba(14, 159, 110, 0.2)',
    icon: 'BookOpen',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    cardStyle: 'educational',
    readingStyle: 'explanation',
    types: [
      { 
        id: 'concept-introduction', 
        name: 'Concept Introduction', 
        priority: 1,
        icon: 'Lightbulb',
        cardColor: '#0e9f6e',
        readingColor: '#0e9f6e',
        typography: 'sans',
        layout: 'introduction',
        length: '600-1,200 words',
        description: 'Definition, why it matters, simple examples'
      },
      { 
        id: 'framework-explainer', 
        name: 'Framework Explainer', 
        priority: 2,
        icon: 'Layers',
        cardColor: '#10b981',
        readingColor: '#10b981',
        typography: 'sans',
        layout: 'framework',
        length: '1,000-2,000 words',
        description: 'A model or framework, components explained, how to apply it'
      },
      { 
        id: 'expert-perspective', 
        name: 'Expert Perspective', 
        priority: 3,
        icon: 'User',
        cardColor: '#059669',
        readingColor: '#059669',
        typography: 'sans',
        layout: 'expert',
        length: '1,000-2,000 words',
        description: 'Insight from authority, interpretation of trends, recommendations'
      }
    ]
  },
  
  // RESEARCH & ANALYSIS
  RESEARCH: {
    id: 'research',
    name: 'Research & Analysis',
    description: 'Evidence-based research for deep understanding and analysis',
    color: '#dc2626', // Professional red
    bgColor: 'rgba(220, 38, 38, 0.05)',
    borderColor: 'rgba(220, 38, 38, 0.2)',
    icon: 'BarChart',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    cardStyle: 'research',
    readingStyle: 'evidence',
    types: [
      { 
        id: 'insight-article-(research)', 
        name: 'Insight Article (Research)', 
        priority: 1,
        icon: 'FileText',
        cardColor: '#dc2626',
        readingColor: '#dc2626',
        typography: 'sans',
        layout: 'analysis',
        length: '1,500-3,000 words',
        description: 'Data-driven findings, methodology (light), insights + implications'
      },
      { 
        id: 'forecast-article', 
        name: 'Forecast Article', 
        priority: 2,
        icon: 'TrendingUp',
        cardColor: '#f59e0b',
        readingColor: '#f59e0b',
        typography: 'sans',
        layout: 'forecast',
        length: '1,500-2,500 words',
        description: 'Future predictions, scenarios, supporting data'
      },
      { 
        id: 'industry-briefs', 
        name: 'Industry Briefs', 
        priority: 3,
        icon: 'Building',
        cardColor: '#d97706',
        readingColor: '#d97706',
        typography: 'sans',
        layout: 'brief',
        length: '1,000-2,000 words',
        description: 'Industry overview, key players, trends + risks'
      },
      { 
        id: 'research-notes', 
        name: 'Research Notes', 
        priority: 4,
        icon: 'Notebook',
        cardColor: '#b45309',
        readingColor: '#b45309',
        typography: 'sans',
        layout: 'note',
        length: '500-1,200 words',
        description: 'Raw observations, early findings, hypotheses'
      },
      { 
        id: 'white-paper', 
        name: 'White Paper', 
        priority: 5,
        icon: 'FileText',
        cardColor: '#92400e',
        readingColor: '#92400e',
        typography: 'serif',
        layout: 'paper',
        length: '3,000-6,000+ words',
        description: 'Problem → analysis → solution, deep research, strong argument'
      }
    ]
  },
  
  // SPECIALIZED CONTENT
  SPECIALIZED: {
    id: 'specialized',
    name: 'Specialized Content',
    description: 'Specialized content formats for specific purposes',
    color: '#6b7280', // Professional gray
    bgColor: 'rgba(107, 114, 128, 0.05)',
    borderColor: 'rgba(107, 114, 128, 0.2)',
    icon: 'Shapes',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    cardStyle: 'specialized',
    readingStyle: 'specialized',
    types: [
      { 
        id: 'book-review', 
        name: 'Book Review', 
        priority: 1,
        icon: 'Book',
        cardColor: '#6b7280',
        readingColor: '#6b7280',
        typography: 'sans',
        layout: 'review',
        length: '800-1,500 words',
        description: 'Summary, key ideas, critique'
      },
      { 
        id: 'infographics', 
        name: 'Infographics', 
        priority: 2,
        icon: 'Image',
        cardColor: '#4b5563',
        readingColor: '#4b5563',
        typography: 'sans',
        layout: 'visual',
        length: 'Visual-first (text <300 words)',
        description: 'Data or process visualization, minimal text'
      },
      { 
        id: 'microblogs', 
        name: 'Microblogs', 
        priority: 3,
        icon: 'MessageSquare',
        cardColor: '#374151',
        readingColor: '#374151',
        typography: 'sans',
        layout: 'micro',
        length: '50-300 words',
        description: 'One idea, hook + takeaway'
      }
    ]
  }
};

// Get content type by ID
export function getContentType(typeId) {
  // First try exact match
  for (const category of Object.values(CONTENT_CATEGORIES)) {
    const found = category.types.find(t => t.id === typeId);
    if (found) {
      return {
        ...found,
        category: category.id,
        categoryName: category.name,
        color: category.color,
        bgColor: category.bgColor,
        borderColor: category.borderColor,
        fontFamily: category.fontFamily,
        cardStyle: category.cardStyle,
        readingStyle: category.readingStyle,
        icon: category.icon
      };
    }
  }
  
  // If not found, try to find by name (case-insensitive)
  const normalizedTypeId = typeId.toLowerCase().replace(/\s+/g, '-');
  for (const category of Object.values(CONTENT_CATEGORIES)) {
    const found = category.types.find(t => 
      t.id === normalizedTypeId || 
      t.name.toLowerCase() === typeId.toLowerCase()
    );
    if (found) {
      return {
        ...found,
        category: category.id,
        categoryName: category.name,
        color: category.color,
        bgColor: category.bgColor,
        borderColor: category.borderColor,
        fontFamily: category.fontFamily,
        cardStyle: category.cardStyle,
        readingStyle: category.readingStyle,
        icon: category.icon
      };
    }
  }
  
  // Special handling for "Insight Article" which should map to "insight-article-(research)"
  if (typeId.toLowerCase().includes('insight article')) {
    const insightArticleType = CONTENT_CATEGORIES.RESEARCH.types.find(t => t.id === 'insight-article-(research)');
    if (insightArticleType) {
      return {
        ...insightArticleType,
        category: CONTENT_CATEGORIES.RESEARCH.id,
        categoryName: CONTENT_CATEGORIES.RESEARCH.name,
        color: CONTENT_CATEGORIES.RESEARCH.color,
        bgColor: CONTENT_CATEGORIES.RESEARCH.bgColor,
        borderColor: CONTENT_CATEGORIES.RESEARCH.borderColor,
        fontFamily: CONTENT_CATEGORIES.RESEARCH.fontFamily,
        cardStyle: CONTENT_CATEGORIES.RESEARCH.cardStyle,
        readingStyle: CONTENT_CATEGORIES.RESEARCH.readingStyle,
        icon: CONTENT_CATEGORIES.RESEARCH.icon
      };
    }
  }
  
  // If still not found, return a default content type with the original name
  return {
    id: normalizedTypeId,
    name: typeId.charAt(0).toUpperCase() + typeId.slice(1).replace(/-/g, ' '),
    category: 'executive',
    color: '#6b7280',
    bgColor: 'rgba(107, 114, 128, 0.05)',
    borderColor: 'rgba(107, 114, 128, 0.2)',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    cardStyle: 'default',
    readingStyle: 'default',
    icon: 'FileText'
  };
}

// Get all content types for filtering
export const ALL_CONTENT_TYPES = Object.values(CONTENT_CATEGORIES).flatMap(category => 
  category.types.map(type => ({
    ...type,
    category: category.id,
    categoryName: category.name,
    color: category.color
  }))
).sort((a, b) => a.priority - b.priority);

// Get content types by category
export function getContentTypesByCategory(categoryId) {
  return CONTENT_CATEGORIES[categoryId]?.types || [];
}

// Content type icons mapping (for backward compatibility)
export const CONTENT_TYPE_ICONS = {
  'executive-briefs': 'Zap',
  'frontier-watch': 'Eye',
  'frontier-brief': 'Compass',
  'rapid-insights': 'Zap',
  'trend-alerts': 'AlertTriangle',
  'viewpoint-blogs': 'PenTool',
  'strategic-essay': 'FileText',
  'concept-introduction': 'Lightbulb',
  'framework-explainer': 'Layers',
  'expert-perspective': 'User',
  'insight-article-(research)': 'FileText',
  'forecast-article': 'TrendingUp',
  'industry-briefs': 'Building',
  'research-notes': 'Notebook',
  'white-paper': 'FileText',
  'book-review': 'Book',
  'infographics': 'Image',
  'microblogs': 'MessageSquare'
};