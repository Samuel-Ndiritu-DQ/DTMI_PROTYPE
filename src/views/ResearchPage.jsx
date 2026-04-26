import { useState } from 'react';
import { researchReports, researchCategories } from '../data/researchData';
import { CONTENT_CATEGORIES, getContentType } from '../data/contentTypes';
import ContentFilterV2 from '../components/ContentFilterV2';
import { FileText, Clock, Users, ArrowRight, BarChart } from 'lucide-react';
import PageSearch from '../components/PageSearch';
import ResearchReader from './ResearchReader';
import PageMeta from '../components/PageMeta';
import { pageMeta } from '../data/mockData';

/* ── Research card ── */
function ResearchCard({ report, onOpen }) {
  const isPremium = report.premium;
  const contentType = report.type ? getContentType(report.type.toLowerCase().replace(/\s+/g, '-')) : null;
  const isWhitepaper = contentType?.id === 'white-paper';
  const isForecast = contentType?.id === 'forecast-article';
  const isIndustryAnalysis = contentType?.id === 'industry-briefs';
  const isPolicyBrief = contentType?.id === 'policy-brief';
  
  const typeColor = contentType?.color || (isPremium ? '#0a7ea4' : '#8b5cf6');
  const cardColor = contentType?.cardColor || typeColor;
  
  return (
    <div
      onClick={() => onOpen(report)}
      className="group cursor-pointer bg-white border rounded-xl overflow-hidden card-hover flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
      style={{ 
        borderColor: isWhitepaper ? 'rgba(120, 53, 15, 0.3)' :
                     isForecast ? 'rgba(245, 158, 11, 0.3)' :
                     isIndustryAnalysis ? 'rgba(10, 126, 164, 0.3)' :
                     isPolicyBrief ? 'rgba(14, 116, 144, 0.3)' :
                     '#e5e7eb',
        boxShadow: isWhitepaper ? '0 4px 20px rgba(120, 53, 15, 0.08)' :
                     isForecast ? '0 4px 20px rgba(245, 158, 11, 0.08)' :
                     isIndustryAnalysis ? '0 4px 20px rgba(10, 126, 164, 0.08)' :
                     isPolicyBrief ? '0 4px 20px rgba(14, 116, 144, 0.08)' :
                     '0 4px 20px rgba(0,0,0,0.08)',
        background: 'white'
      }}
    >
      {/* Premium indicator */}
      {isPremium && (
        <div className="relative h-2" style={{ 
          background: isWhitepaper ? 'linear-gradient(90deg, #78350f 0%, #92400e 100%)' :
                       isForecast ? 'linear-gradient(90deg, #f59e0b 0%, #d97706 100%)' :
                       isIndustryAnalysis ? 'linear-gradient(90deg, #0a7ea4 0%, #0891b2 100%)' :
                       isPolicyBrief ? 'linear-gradient(90deg, #0e7490 0%, #155e75 100%)' :
                       'linear-gradient(90deg, #0a7ea4 0%, #06b6d4 100%)'
        }}>
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <span className="text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-sm text-white">
              PREMIUM
            </span>
          </div>
        </div>
      )}
      
      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        {/* Header with type badge */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-[15px] font-bold leading-snug group-hover:opacity-90 transition-opacity" style={{ 
              color: '#1f2937',
              fontFamily: isWhitepaper || isForecast ? "'Playfair Display', 'Times New Roman', serif" : "'SF Mono', 'Monaco', 'Inconsolata', monospace"
            }}>
              {report.title}
            </h3>
            {report.subtitle && (
              <p className="text-[13px] mt-1.5 line-clamp-1" style={{ 
                color: '#6b7280',
                fontFamily: isWhitepaper || isForecast ? "'Playfair Display', 'Times New Roman', serif" : "'SF Mono', 'Monaco', 'Inconsolata', monospace"
              }}>
                {report.subtitle}
              </p>
            )}
          </div>
          <span className="text-[11px] font-black uppercase tracking-wider px-3 py-1.5 rounded-lg text-white ml-3" style={{ 
            background: cardColor,
            boxShadow: '0 2px 8px ' + cardColor + '40',
            fontFamily: "'SF Mono', 'Monaco', 'Inconsolata', monospace"
          }}>
            {isWhitepaper ? '📄 PAPER' : 
             isForecast ? '🔮 FORECAST' :
             isIndustryAnalysis ? '🏢 INDUSTRY' :
             isPolicyBrief ? '📋 POLICY' : report.type}
          </span>
        </div>
        
        {/* Hook */}
        <p className="text-[13px] leading-relaxed mb-4 line-clamp-2 flex-1" style={{ 
          color: '#6b7280',
          fontFamily: isWhitepaper || isForecast ? "'Playfair Display', 'Times New Roman', serif" : "'SF Mono', 'Monaco', 'Inconsolata', monospace"
        }}>
          {report.hook}
        </p>
        
        {/* Meta */}
        <div className="flex items-center gap-4 mb-4 text-[11px]" style={{ 
          color: '#9ca3af',
          fontFamily: "'SF Mono', 'Monaco', 'Inconsolata', monospace"
        }}>
          <span className="flex items-center gap-1.5">
            <Users size={11} /> {report.author}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock size={11} /> {report.readTime}
          </span>
          <span className="flex items-center gap-1.5">
            <FileText size={11} /> {report.pages}pp
          </span>
        </div>
        
        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t" style={{ 
          borderColor: cardColor + '20'
        }}>
          <span className="text-[12px] font-semibold" style={{ 
            color: cardColor,
            fontFamily: "'SF Mono', 'Monaco', 'Inconsolata', monospace"
          }}>
            {isPremium ? 'Subscribers Only' : 'Free Access'}
          </span>
          <span className="text-[12px] font-semibold flex items-center gap-1.5 group-hover:gap-2 transition-all" style={{ 
            color: cardColor,
            fontFamily: "'SF Mono', 'Monaco', 'Inconsolata', monospace"
          }}>
            {isPremium ? 'Unlock Report' : 'Read Now'}
            <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </span>
        </div>
      </div>
    </div>
  );
}

/* ── Main ResearchPage ── */
export default function ResearchPage({ onSignIn }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeTypes, setActiveTypes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [openResearch, setOpenResearch] = useState(null);

  const filtered = researchReports.filter(report => {
    const catOk = activeCategory === 'All' || report.category === activeCategory;
    const typeNormalized = report.type ? report.type.toLowerCase().replace(/\s+/g, '-') : '';
    const typeOk = activeTypes.length === 0 || activeTypes.includes(typeNormalized);
    const q = searchQuery.toLowerCase();
    const searchOk = !searchQuery || (
      report.title.toLowerCase().includes(q) ||
      (report.subtitle || '').toLowerCase().includes(q) ||
      report.author.toLowerCase().includes(q) ||
      (report.hook || '').toLowerCase().includes(q) ||
      report.category.toLowerCase().includes(q) ||
      (report.type || '').toLowerCase().includes(q) ||
      (report.tags || []).some(t => t.toLowerCase().includes(q))
    );
    return catOk && typeOk && searchOk;
  });

  const featured = researchReports.filter(r => r.featured);

  if (openResearch) {
    return <ResearchReader report={openResearch} onClose={() => setOpenResearch(null)} onSignIn={onSignIn} />;
  }

  return (
    <div className="min-h-screen bg-white">
      <PageMeta meta={pageMeta.Research} />

      {/* ── Hero ── */}
      <div style={{ background: 'var(--brand-navy)' }} className="border-b border-white/5">
        <div className="max-w-[1280px] mx-auto px-4 py-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-[580px]">
              <p className="text-[11px] font-black uppercase tracking-widest mb-2" style={{ color: '#0a7ea4' }}>
                DTMI Research Intelligence
              </p>
              <h1 className="text-[30px] sm:text-[38px] font-black leading-tight text-white mb-3">
                Premium research reports and executive intelligence
              </h1>
              <p className="text-[14px] leading-relaxed" style={{ color: '#94a3b8' }}>
                Exclusive whitepapers, confidential research reports, policy briefs, and industry analyses from the DigitalQatalyst think-tank - delivering actionable intelligence for digital transformation leaders worldwide.
              </p>
            </div>
            {/* Research stack preview */}
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
                    background: i % 2 === 0 ? 'linear-gradient(135deg, #0a7ea4 0%, #06b6d4 100%)' : 'linear-gradient(135deg, #0d1b3e 0%, #132044 100%)',
                    borderColor: 'rgba(10, 126, 164, 0.3)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                  }}>
                    {/* Research icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      {i % 2 === 0 ? (
                        <BarChart size={20} className="text-white/80" />
                      ) : (
                        <FileText size={20} className="text-white/80" />
                      )}
                    </div>
                    {/* Research label */}
                    <div className="absolute bottom-2 left-0 right-0 text-center">
                      <span className="text-[8px] font-black uppercase tracking-widest text-white/90">
                        {i % 2 === 0 ? 'REPORT' : 'RESEARCH'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 py-8">
        {/* Search + filters - Improved professional layout */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 mb-6">
            {/* Content Type Filter */}
            <div className="lg:w-72">
              <ContentFilterV2
                activeTypes={activeTypes}
                onTypeChange={(typeIds) => {
                  setActiveTypes(typeIds);
                }}
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
                categories={researchCategories}
                showContentTypeFilter={true}
                showCategoryFilter={false}
              />
            </div>
            
            {/* Search Bar */}
            <div className="flex-1">
              <PageSearch
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Search reports, authors, topics, tags..."
                resultCount={searchQuery ? filtered.length : undefined}
                totalCount={researchReports.length}
              />
            </div>
          </div>
          
          {/* Active filters indicator */}
          {activeTypes.length > 0 && (
            <div className="flex items-center gap-2 mb-4">
              <span className="text-[11px] font-semibold font-source-code" style={{ color: '#6b7280' }}>
                Active filters:
              </span>
              <div className="flex flex-wrap gap-2">
                {activeTypes.map(typeId => {
                  const type = CONTENT_CATEGORIES.RESEARCH.types.find(t => t.id === typeId);
                  if (!type) return null;
                  return (
                    <span key={typeId} className="text-[10px] font-semibold px-3 py-1.5 rounded-full font-source-code" style={{ 
                      background: 'rgba(10, 126, 164, 0.1)',
                      color: '#0a7ea4',
                      border: '1px solid rgba(10, 126, 164, 0.2)'
                    }}>
                      {type.name}
                    </span>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Featured research */}
        {featured.length > 0 && (
          <section className="mb-10">
            <div className="flex items-center gap-3 mb-6">
              <div>
                <h2 className="text-[16px] font-black font-source-code" style={{ color: '#1f2937' }}>Featured Research</h2>
                <p className="text-[12px] mt-1 font-source-serif" style={{ color: '#6b7280' }}>Highlighted reports from our research team</p>
              </div>
              <div className="flex-1 h-px" style={{ background: '#f3f4f6' }} />
              <span className="text-[11px] font-source-code" style={{ color: '#0a7ea4' }}>{featured.length} featured</span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {featured.map(report => (
                <ResearchCard key={report.id} report={report} onOpen={setOpenResearch} />
              ))}
            </div>
          </section>
        )}

        {/* All research */}
        <div className="flex items-center gap-3 mb-6">
          <div>
            <h2 className="text-[16px] font-black font-source-code" style={{ color: '#1f2937' }}>
              All Research {activeCategory !== 'All' && <span style={{ color: '#0a7ea4' }}>· {activeCategory}</span>}
            </h2>
            <p className="text-[12px] mt-1 font-source-serif" style={{ color: '#6b7280' }}>Browse our complete research library</p>
          </div>
          <div className="flex-1 h-px" style={{ background: '#f3f4f6' }} />
          <div className="text-right">
            <span className="text-[13px] font-black font-source-code" style={{ color: '#0a7ea4' }}>{filtered.length}</span>
            <span className="text-[11px] font-source-code ml-1" style={{ color: '#6b7280' }}>reports</span>
          </div>
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map(report => (
              <ResearchCard key={report.id} report={report} onOpen={setOpenResearch} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ 
              background: 'rgba(10, 126, 164, 0.1)',
              border: '1px solid rgba(10, 126, 164, 0.2)'
            }}>
              <FileText size={24} style={{ color: '#0a7ea4' }} />
            </div>
            <p className="text-[14px] font-source-code mb-2" style={{ color: '#1f2937' }}>
              No research matches your filters
            </p>
            <p className="text-[13px] font-source-serif mb-4" style={{ color: '#6b7280' }}>
              Try adjusting your search or filters
            </p>
            <button 
              onClick={() => { 
                setSearchQuery(''); 
                setActiveCategory('All'); 
                setActiveTypes([]); 
              }}
              className="px-5 py-2.5 rounded-lg font-semibold hover:opacity-80 transition-opacity font-source-code" 
              style={{ 
                background: '#0a7ea4',
                color: 'white'
              }}
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}