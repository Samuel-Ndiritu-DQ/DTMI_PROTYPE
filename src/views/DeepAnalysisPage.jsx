import { useState } from 'react';
import { insightCards } from '../data/mockData';
import { researchReports } from '../data/researchData';
import { CONTENT_CATEGORIES, getContentType, ALL_CONTENT_TYPES } from '../data/contentTypes';
import ContentFilterV2 from '../components/ContentFilterV2';
import { FileText, Clock, User, Download, BookOpen, ChevronRight, Filter, Lock, PenTool, TrendingUp, Building, Cpu, Eye, Zap, MessageSquare } from 'lucide-react';
import { useNav } from '../context/NavContext';
import PageSearch from '../components/PageSearch';

// Combine insightCards (all) + researchReports as deep analysis items
const deepItems = [
  ...researchReports.map(r => ({
    id: r.id, 
    type: r.type, 
    title: r.title, 
    subtitle: r.subtitle,
    author: r.author, 
    authorRole: r.authorRole, 
    publishDate: r.publishDate,
    readTime: r.readTime, 
    pages: r.pages, 
    category: r.category,
    tags: r.tags, 
    image: r.image, 
    premium: r.premium, 
    hook: r.hook,
    isResearch: true,
    contentType: getContentType(r.type.toLowerCase().replace(/\s+/g, '-'))
  })),
  ...insightCards.map(c => ({
    id: c.id, 
    type: 'Strategic Essay', 
    title: c.title, 
    subtitle: c.summary,
    author: c.author, 
    authorRole: 'DTMI Research', 
    publishDate: c.timestamp,
    readTime: c.readTime, 
    pages: null, 
    category: c.category,
    tags: c.tags, 
    image: c.image, 
    premium: false, 
    hook: c.summary,
    isResearch: false, 
    original: c,
    contentType: getContentType('strategic-essay')
  })),
];

const ALL_TYPES = ['All', ...new Set(deepItems.map(d => d.type))];
const ALL_CATS  = ['All', ...new Set(deepItems.map(d => d.category))];

function DeepCard({ item, onOpen, onSignIn }) {
  const contentType = item.contentType || getContentType(item.type?.toLowerCase().replace(/\s+/g, '-') || 'strategic-essay');
  const meta = {
    color: contentType.color,
    bgColor: contentType.bgColor,
    borderColor: contentType.borderColor,
    fontFamily: contentType.fontFamily,
    label: contentType.name
  };

  return (
    <div
      onClick={() => item.isResearch ? onOpen(item) : onOpen(item.original || item)}
      className="group cursor-pointer bg-white border rounded-xl overflow-hidden card-hover flex flex-col transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
      style={{ 
        borderColor: meta.borderColor,
        boxShadow: '0 8px 30px rgba(245, 158, 11, 0.08)',
        background: 'linear-gradient(to bottom, #ffffff 0%, #fefce8 100%)'
      }}
    >
      {/* Academic header with spine */}
      <div className="relative" style={{ height: '8px', background: meta.color }} />
      
      {/* Image with academic overlay */}
      {item.image && (
        <div className="relative overflow-hidden" style={{ aspectRatio: '16/8' }}>
          <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full text-white shadow-lg font-source-serif" style={{ background: meta.color }}>
              {meta.label}
            </span>
            {item.premium && (
              <span className="text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full text-white shadow-lg flex items-center gap-1 font-source-serif" style={{ background: '#f59e0b' }}>
                <Lock size={9} /> PREMIUM
              </span>
            )}
          </div>
          <div className="absolute bottom-4 left-4">
            <p className="text-[11px] font-black uppercase tracking-widest text-white bg-black/30 backdrop-blur-sm px-3 py-1.5 rounded-full font-source-serif">
              {item.category}
            </p>
          </div>
          {/* Academic corner badge */}
          <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
            <FileText size={16} className="text-white" />
          </div>
        </div>
      )}

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        {/* Title with academic styling */}
        <div className="mb-3">
          <h3 className="text-[16px] font-black leading-snug mb-2 group-hover:opacity-90 transition-opacity font-source-serif" style={{ 
            color: 'var(--brand-navy)'
          }}>
            {item.title}
          </h3>
          {item.subtitle && (
            <p className="text-[13px] italic mb-3 line-clamp-2 font-source-serif" style={{ 
              color: '#64748b'
            }}>{item.subtitle}</p>
          )}
        </div>

        {/* Abstract */}
        <div className="mb-4">
          <p className="text-[12px] leading-relaxed mb-3 line-clamp-3 flex-1 font-source-serif" style={{ 
            color: '#475569'
          }}>{item.hook}</p>
        </div>

        {/* Academic tags */}
        <div className="flex flex-wrap gap-2 mb-5">
          {item.tags?.slice(0, 3).map(tag => (
            <span key={tag} className="text-[10px] px-3 py-1.5 rounded-full border transition-all group-hover:border-opacity-50 font-source-code" style={{ 
              borderColor: meta.color + '40',
              color: meta.color,
              background: meta.color + '10'
            }}>
              {tag}
            </span>
          ))}
        </div>

        {/* Academic footer */}
        <div className="flex items-center justify-between pt-4 border-t" style={{ 
          borderColor: 'rgba(245, 158, 11, 0.1)'
        }}>
          <div className="flex items-center gap-4 text-[11px] font-source-code" style={{ 
            color: '#64748b'
          }}>
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: meta.color + '20' }}>
                <User size={10} style={{ color: meta.color }} />
              </div>
              <span style={{ color: 'var(--brand-navy)' }}>{item.author?.split(',')[0]}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: meta.color + '20' }}>
                <Clock size={10} style={{ color: meta.color }} />
              </div>
              <span>{item.readTime}</span>
            </div>
            {item.pages && (
              <div className="flex items-center gap-1.5">
                <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ background: meta.color + '20' }}>
                  <FileText size={10} style={{ color: meta.color }} />
                </div>
                <span>{item.pages}pp</span>
              </div>
            )}
          </div>
          <span className="text-[12px] font-bold flex items-center gap-2 group-hover:gap-3 transition-all font-source-serif" style={{ 
            color: item.premium ? '#f59e0b' : meta.color
          }}>
            {item.premium ? (
              <>
                <Lock size={12} /> ACCESS RESEARCH
              </>
            ) : (
              <>
                <BookOpen size={12} /> READ PAPER
              </>
            )}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function DeepAnalysisPage({ onSignIn }) {
  const [searchQuery, setSearchQuery]   = useState('');
  const [activeType, setActiveType]     = useState('All');
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeContentTypes, setActiveContentTypes] = useState([]);
  const { openArticle } = useNav();

  const filtered = deepItems.filter(item => {
    const typeOk = activeType === 'All' || item.type === activeType;
    const catOk  = activeCategory === 'All' || item.category === activeCategory;
    const typeNormalized = item.type ? item.type.toLowerCase().replace(/\s+/g, '-') : '';
    const contentTypeOk = activeContentTypes.length === 0 || 
      activeContentTypes.includes(typeNormalized);
    const q      = searchQuery.toLowerCase();
    const searchOk = !searchQuery ||
      item.title.toLowerCase().includes(q) ||
      item.hook?.toLowerCase().includes(q) ||
      item.author?.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.tags?.some(t => t.toLowerCase().includes(q));
    return typeOk && catOk && contentTypeOk && searchOk;
  });

  return (
    <div className="min-h-screen bg-white">

      {/* ── Hero ── */}
      <div style={{ background: 'var(--brand-navy)' }} className="border-b border-white/5">
        <div className="max-w-[1280px] mx-auto px-4 py-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-[580px]">
              <p className="text-[11px] font-black uppercase tracking-widest mb-2" style={{ color: '#f59e0b' }}>
                DTMI Deep Analysis
              </p>
              <h1 className="text-[30px] sm:text-[38px] font-black leading-tight text-white mb-3">
                Comprehensive strategic depth for senior executives
              </h1>
              <p className="text-[14px] leading-relaxed" style={{ color: '#94a3b8' }}>
                DigitalQatalyst's highest-value research layer - comprehensive whitepapers, strategic essays, industry briefs, and forecast reports for senior executives, policy leaders, and strategic advisors.
              </p>
            </div>
            {/* Deep analysis stack preview */}
            <div className="flex items-end gap-2 shrink-0">
              {[1, 2, 3, 4, 5].map((i) => (
                <div 
                  key={i}
                  className="cursor-pointer hover:scale-105 transition-transform" 
                  style={{ 
                    transform: `rotate(${(i - 2) * 3}deg)`, 
                    zIndex: i 
                  }}
                >
                  <div className="relative rounded-lg overflow-hidden border" style={{
                    width: '60px',
                    height: '80px',
                    background: i % 2 === 0 ? 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)' : 'linear-gradient(135deg, #fefce8 0%, #fef9c3 100%)',
                    borderColor: 'rgba(245, 158, 11, 0.3)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                  }}>
                    {/* Analysis icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      {i % 2 === 0 ? (
                        <FileText size={20} className="text-white/80" />
                      ) : (
                        <PenTool size={20} className="text-white/80" />
                      )}
                    </div>
                    {/* Analysis label */}
                    <div className="absolute bottom-2 left-0 right-0 text-center">
                      <span className="text-[8px] font-black uppercase tracking-widest text-white/90">
                        {i % 2 === 0 ? 'REPORT' : 'ANALYSIS'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 py-8 space-y-10">

        {/* ── Search bar ── */}
        <div className="w-full">
          <PageSearch
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search whitepapers, essays, industry briefs..."
            resultCount={searchQuery ? filtered.length : undefined}
            totalCount={deepItems.length}
          />
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(item => (
              <DeepCard key={item.id} item={item} onOpen={openArticle} onSignIn={onSignIn} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-[14px] font-source-code" style={{ color: '#94a3b8' }}>
              No publications match your filters
            </p>
            <button 
              onClick={() => { 
                setSearchQuery(''); 
                setActiveType('All'); 
                setActiveCategory('All'); 
                setActiveContentTypes([]);
              }}
              className="mt-3 text-[13px] font-bold hover:opacity-70 transition-opacity font-source-code" 
              style={{ color: '#f59e0b' }}
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}