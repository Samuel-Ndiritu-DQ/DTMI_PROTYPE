import { useState } from 'react';
import { insightCards, insightCategories } from '../data/mockData';
import { CONTENT_CATEGORIES, getContentType } from '../data/contentTypes';
import ContentFilterV2 from '../components/ContentFilterV2';
import { Clock, BookOpen, User, Tag, Filter, Lightbulb, Cpu, PenTool, MessageSquare } from 'lucide-react';
import { useNav } from '../context/NavContext';
import PageSearch from '../components/PageSearch';

const DOMAIN_COLORS = {
  AI:               '#8b5cf6',
  Cloud:            '#06b6d4',
  Cybersecurity:    '#ef4444',
  'Digital Economy':'#10b981',
  DCO:              '#0a7ea4',
  Governance:       '#f59e0b',
  'Emerging Tech':  '#ec4899',
};

function InsightCard({ card, featured }) {
  const { openArticle } = useNav();
  const color = DOMAIN_COLORS[card.category] || 'var(--brand-orange)';
  
  // Determine content type styling
  const contentType = card.type ? getContentType(card.type.toLowerCase().replace(/\s+/g, '-')) : null;
  const isForecast = contentType?.id === 'forecast-article';
  const isWhitepaper = contentType?.id === 'white-paper';
  const isResearch = contentType?.category === 'research';
  const isSignal = contentType?.category === 'signal';
  
  const cardColor = contentType?.cardColor || color;
  const cardStyle = contentType?.cardStyle || 'default';
  const icon = contentType?.icon || 'Lightbulb';
  
  // Get appropriate icon component
  const IconComponent = {
    'Zap': Lightbulb,
    'Eye': Lightbulb,
    'FileWarning': Lightbulb,
    'TrendingUp': Lightbulb,
    'MessageSquare': Lightbulb,
    'BookOpen': BookOpen,
    'User': User,
    'Cpu': Lightbulb,
    'FileText': BookOpen,
    'Building': Lightbulb,
    'PenTool': Lightbulb,
    'PieChart': Lightbulb,
    'BarChart': Lightbulb,
    'Briefcase': Lightbulb
  }[icon] || Lightbulb;

  if (featured) {
    return (
      <div onClick={() => openArticle({ ...card, headline: card.title })}
        className="group cursor-pointer bg-white border rounded-xl overflow-hidden card-hover transition-all duration-500 hover:shadow-2xl hover:-translate-y-0.5"
        style={{ 
          borderColor: isForecast ? 'rgba(245, 158, 11, 0.3)' : 
                     isWhitepaper ? 'rgba(120, 53, 15, 0.3)' :
                     isResearch ? 'rgba(10, 126, 164, 0.3)' :
                     isSignal ? 'rgba(239, 68, 68, 0.3)' :
                     'var(--brand-border)',
          boxShadow: isForecast ? '0 10px 40px rgba(245, 158, 11, 0.1)' :
                     isWhitepaper ? '0 10px 40px rgba(120, 53, 15, 0.1)' :
                     isResearch ? '0 10px 40px rgba(10, 126, 164, 0.1)' :
                     isSignal ? '0 10px 40px rgba(239, 68, 68, 0.1)' :
                     '0 10px 40px rgba(0,0,0,0.08)',
          background: isForecast ? 'linear-gradient(135deg, #fefce8 0%, #fef9c3 100%)' :
                     isWhitepaper ? 'linear-gradient(135deg, #fefce8 0%, #fef3c7 100%)' :
                     isResearch ? 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)' :
                     isSignal ? 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)' :
                     'linear-gradient(to bottom, #ffffff 0%, #faf5ff 100%)'
        }}>
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="relative overflow-hidden" style={{ minHeight: '260px' }}>
            <img src={card.image} alt={card.title} className="w-full h-full object-cover absolute inset-0 group-hover:scale-[1.05] transition-transform duration-700" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent" />
            <div className="absolute top-4 left-4">
              <span className="text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full text-white shadow-xl" style={{ 
                background: cardColor,
                fontFamily: isSignal ? "'SF Mono', 'Monaco', 'Inconsolata', monospace" : 'inherit'
              }}>
                {isForecast ? '🔮 FORECAST' : 
                 isWhitepaper ? '📄 WHITEPAPER' :
                 isResearch ? '📊 RESEARCH' :
                 isSignal ? '⚡ SIGNAL' : card.category}
              </span>
            </div>
            <div className="absolute bottom-4 left-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                  <IconComponent size={16} className="text-white" />
                </div>
                <div>
                  <p className="text-white text-[10px] font-black uppercase tracking-widest" style={{ 
                    fontFamily: isSignal ? "'SF Mono', 'Monaco', 'Inconsolata', monospace" : 'inherit'
                  }}>
                    {isForecast ? 'PREDICTION ANALYSIS' : 
                     isWhitepaper ? 'RESEARCH PAPER' :
                     isResearch ? 'PREMIUM REPORT' :
                     isSignal ? 'URGENT SIGNAL' : 'FEATURED INSIGHT'}
                  </p>
                  <p className="text-white/80 text-[9px]" style={{ 
                    fontFamily: isSignal ? "'SF Mono', 'Monaco', 'Inconsolata', monospace" : 'inherit'
                  }}>
                    {isForecast ? 'Future trend projections' : 
                     isWhitepaper ? 'Comprehensive research' :
                     isResearch ? 'Executive intelligence' :
                     isSignal ? 'Real-time awareness' : 'Marketplace Highlight'}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="p-8 flex flex-col justify-center" style={{ 
            background: isForecast ? 'linear-gradient(to bottom, #fefce8 0%, #fef9c3 100%)' :
                       isWhitepaper ? 'linear-gradient(to bottom, #fefce8 0%, #fef3c7 100%)' :
                       isResearch ? 'linear-gradient(to bottom, #f0f9ff 0%, #e0f2fe 100%)' :
                       isSignal ? 'linear-gradient(to bottom, #fef2f2 0%, #fee2e2 100%)' :
                       'linear-gradient(to bottom, #ffffff 0%, #faf5ff 100%)'
          }}>
            <div className="mb-4">
              <span className="text-[11px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full inline-block mb-3" style={{ 
                background: cardColor + '20',
                color: cardColor,
                fontFamily: isSignal ? "'SF Mono', 'Monaco', 'Inconsolata', monospace" : 'inherit'
              }}>
                {isForecast ? '🔮 FORECAST ANALYSIS' : 
                 isWhitepaper ? '📄 WHITEPAPER' :
                 isResearch ? '📊 PREMIUM RESEARCH' :
                 isSignal ? '⚡ URGENT SIGNAL' : '⭐ FEATURED INSIGHT'}
              </span>
              <h2 className="text-[22px] font-black leading-tight mb-3 group-hover:opacity-90 transition-opacity" style={{ 
                color: isSignal ? '#1e293b' : 'var(--brand-navy)',
                fontFamily: isForecast || isWhitepaper ? "'Playfair Display', 'Times New Roman', serif" : 'inherit'
              }}>
                {card.title}
              </h2>
              <p className="text-[15px] leading-relaxed mb-5 line-clamp-3" style={{ 
                color: isSignal ? '#4b5563' : 'var(--brand-muted)',
                fontFamily: isForecast || isWhitepaper ? "'Playfair Display', 'Times New Roman', serif" : 'inherit'
              }}>{card.summary}</p>
            </div>
            <div className="flex items-center gap-4 text-[12px] mb-5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: cardColor + '20' }}>
                  <User size={12} style={{ color: cardColor }} />
                </div>
                <div>
                  <p className="font-semibold" style={{ 
                    color: isSignal ? '#1e293b' : 'var(--brand-navy)',
                    fontFamily: isSignal ? "'SF Mono', 'Monaco', 'Inconsolata', monospace" : 'inherit'
                  }}>{card.author}</p>
                  <p className="text-[10px]" style={{ 
                    color: isSignal ? '#6b7280' : 'var(--brand-muted)',
                    fontFamily: isSignal ? "'SF Mono', 'Monaco', 'Inconsolata', monospace" : 'inherit'
                  }}>
                    {isForecast ? 'Forecast Analyst' : 
                     isWhitepaper ? 'Research Author' :
                     isResearch ? 'Intelligence Lead' :
                     isSignal ? 'Signal Reporter' : 'Insight Author'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: cardColor + '20' }}>
                  <Clock size={12} style={{ color: cardColor }} />
                </div>
                <div>
                  <p className="font-semibold" style={{ 
                    color: isSignal ? '#1e293b' : 'var(--brand-navy)',
                    fontFamily: isSignal ? "'SF Mono', 'Monaco', 'Inconsolata', monospace" : 'inherit'
                  }}>{card.readTime}</p>
                  <p className="text-[10px]" style={{ 
                    color: isSignal ? '#6b7280' : 'var(--brand-muted)',
                    fontFamily: isSignal ? "'SF Mono', 'Monaco', 'Inconsolata', monospace" : 'inherit'
                  }}>
                    {isForecast ? 'Analysis Time' : 
                     isWhitepaper ? 'Reading Time' :
                     isResearch ? 'Review Time' :
                     isSignal ? 'Alert Time' : 'Read Time'}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {card.tags?.slice(0, 4).map(tag => (
                <span key={tag} className="text-[10px] px-3 py-1.5 rounded-full border transition-all group-hover:scale-105" style={{ 
                  borderColor: cardColor + '40',
                  color: cardColor,
                  background: cardColor + '10',
                  fontFamily: isSignal ? "'SF Mono', 'Monaco', 'Inconsolata', monospace" : 'inherit'
                }}>
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-6 pt-5 border-t" style={{ 
              borderColor: isForecast ? 'rgba(245, 158, 11, 0.2)' :
                         isWhitepaper ? 'rgba(120, 53, 15, 0.2)' :
                         isResearch ? 'rgba(10, 126, 164, 0.2)' :
                         isSignal ? 'rgba(239, 68, 68, 0.2)' :
                         'var(--brand-border)'
            }}>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-black uppercase tracking-widest" style={{ 
                  color: cardColor,
                  fontFamily: isSignal ? "'SF Mono', 'Monaco', 'Inconsolata', monospace" : 'inherit'
                }}>
                  {isForecast ? 'Explore Forecast →' : 
                   isWhitepaper ? 'Read Paper →' :
                   isResearch ? 'Access Report →' :
                   isSignal ? 'View Signal →' : 'Explore This Insight →'}
                </span>
                <div className="w-10 h-10 rounded-full flex items-center justify-center group-hover:rotate-12 transition-transform" style={{ background: cardColor }}>
                  <IconComponent size={16} className="text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div onClick={() => openArticle({ ...card, headline: card.title })}
      className="group cursor-pointer bg-white border rounded-xl overflow-hidden card-hover flex flex-col transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
      style={{ 
        borderColor: isForecast ? 'rgba(245, 158, 11, 0.3)' : 
                     isWhitepaper ? 'rgba(120, 53, 15, 0.3)' :
                     isResearch ? 'rgba(10, 126, 164, 0.3)' :
                     isSignal ? 'rgba(239, 68, 68, 0.3)' :
                     'rgba(139, 92, 246, 0.2)',
        boxShadow: isForecast ? '0 8px 30px rgba(245, 158, 11, 0.1)' :
                     isWhitepaper ? '0 8px 30px rgba(120, 53, 15, 0.1)' :
                     isResearch ? '0 8px 30px rgba(10, 126, 164, 0.1)' :
                     isSignal ? '0 8px 30px rgba(239, 68, 68, 0.1)' :
                     '0 8px 30px rgba(139, 92, 246, 0.08)',
        background: isForecast ? 'linear-gradient(135deg, #fefce8 0%, #fef9c3 100%)' :
                     isWhitepaper ? 'linear-gradient(135deg, #fefce8 0%, #fef3c7 100%)' :
                     isResearch ? 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)' :
                     isSignal ? 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)' :
                     'linear-gradient(to bottom, #ffffff 0%, #faf5ff 100%)'
      }}>
      {card.image && (
        <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
          <img src={card.image} alt={card.title} className="w-full h-full object-cover group-hover:scale-[1.06] transition-transform duration-700" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
          <div className="absolute top-4 left-4">
            <span className="text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full text-white shadow-xl" style={{ 
              background: cardColor,
              fontFamily: isSignal ? "'SF Mono', 'Monaco', 'Inconsolata', monospace" : 'inherit'
            }}>
              {isForecast ? '🔮 FORECAST' : 
               isWhitepaper ? '📄 PAPER' :
               isResearch ? '📊 REPORT' :
               isSignal ? '⚡ SIGNAL' : card.category}
            </span>
          </div>
          <div className="absolute bottom-4 right-4">
            <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform border-2" style={{ 
              borderColor: cardColor,
              background: isForecast ? 'rgba(245, 158, 11, 0.1)' :
                         isWhitepaper ? 'rgba(120, 53, 15, 0.1)' :
                         isResearch ? 'rgba(10, 126, 164, 0.1)' :
                         isSignal ? 'rgba(239, 68, 68, 0.1)' : 'white'
            }}>
              <IconComponent size={16} style={{ color: cardColor }} />
            </div>
          </div>
        </div>
      )}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-[16px] font-black leading-snug group-hover:opacity-90 transition-opacity" style={{ 
            color: isSignal ? '#1e293b' : 'var(--brand-navy)',
            fontFamily: isForecast || isWhitepaper ? "'Playfair Display', 'Times New Roman', serif" : 'inherit'
          }}>
            {card.title}
          </h3>
          <span className="text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-full" style={{ 
            background: cardColor + '20',
            color: cardColor,
            border: '1px solid ' + cardColor + '40',
            fontFamily: isSignal ? "'SF Mono', 'Monaco', 'Inconsolata', monospace" : 'inherit'
          }}>
            {isForecast ? 'FORECAST' : 
             isWhitepaper ? 'WHITE PAPER' :
             isResearch ? 'RESEARCH' :
             isSignal ? 'SIGNAL' : 'INSIGHT'}
          </span>
        </div>
        <p className="text-[14px] leading-relaxed mb-5 line-clamp-3 flex-1" style={{ 
          color: isSignal ? '#4b5563' : '#4b5563',
          fontFamily: isForecast || isWhitepaper ? "'Playfair Display', 'Times New Roman', serif" : 'inherit'
        }}>{card.summary}</p>
        <div className="flex flex-wrap gap-2 mb-5">
          {card.tags?.slice(0, 4).map(tag => (
            <span key={tag} className="flex items-center gap-1 text-[10px] px-3 py-1.5 rounded-full border transition-all group-hover:scale-105" style={{ 
              borderColor: cardColor + '40',
              color: cardColor,
              background: cardColor + '10',
              fontFamily: isSignal ? "'SF Mono', 'Monaco', 'Inconsolata', monospace" : 'inherit'
            }}>
              <Tag size={9} /> {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between pt-5 border-t" style={{ 
          borderColor: cardColor + '20'
        }}>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: cardColor + '15' }}>
                <User size={12} style={{ color: cardColor }} />
              </div>
              <div>
                <p className="text-[12px] font-bold" style={{ 
                  color: isSignal ? '#1e293b' : 'var(--brand-navy)',
                  fontFamily: isSignal ? "'SF Mono', 'Monaco', 'Inconsolata', monospace" : 'inherit'
                }}>{card.author}</p>
                <p className="text-[10px]" style={{ 
                  color: isSignal ? '#6b7280' : '#6b7280',
                  fontFamily: isSignal ? "'SF Mono', 'Monaco', 'Inconsolata', monospace" : 'inherit'
                }}>
                  {isForecast ? 'Forecast Analyst' : 
                   isWhitepaper ? 'Research Author' :
                   isResearch ? 'Intelligence Lead' :
                   isSignal ? 'Signal Reporter' : 'Insight Author'}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2" style={{ color: cardColor }}>
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: cardColor + '15' }}>
              <Clock size={12} />
            </div>
            <div>
              <p className="text-[12px] font-bold">{card.readTime}</p>
              <p className="text-[10px]" style={{ 
                color: isSignal ? '#6b7280' : '#6b7280',
                fontFamily: isSignal ? "'SF Mono', 'Monaco', 'Inconsolata', monospace" : 'inherit'
              }}>
                {isForecast ? 'Analysis' : 
                 isWhitepaper ? 'Reading' :
                 isResearch ? 'Review' :
                 isSignal ? 'Alert' : 'Read Time'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function InsightPage() {
  const [searchQuery, setSearchQuery]       = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeTypes, setActiveTypes] = useState([]);

  const insights = insightCards.filter(c => c.severity === 'Medium' || c.severity === 'Low');

  const filtered = insights.filter(item => {
    const catOk = activeCategory === 'All' || item.category === activeCategory;
    const typeNormalized = item.type ? item.type.toLowerCase().replace(/\s+/g, '-') : '';
    const typeOk = activeTypes.length === 0 || activeTypes.includes(typeNormalized);
    const q     = searchQuery.toLowerCase();
    const searchOk = !searchQuery ||
      item.title.toLowerCase().includes(q) ||
      item.summary.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.tags?.some(t => t.toLowerCase().includes(q));
    return catOk && typeOk && searchOk;
  });

  const featured = filtered[0];
  const rest     = filtered.slice(1);

  return (
    <div style={{ background: 'var(--brand-light)' }} className="min-h-screen">

      {/* ── Hero ── */}
      <div style={{ background: 'var(--brand-navy)' }} className="border-b border-white/5">
        <div className="max-w-[1280px] mx-auto px-4 py-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-[580px]">
              <p className="text-[11px] font-black uppercase tracking-widest mb-2" style={{ color: 'var(--brand-orange)' }}>
                DTMI Insight Intelligence
              </p>
              <h1 className="text-[30px] sm:text-[38px] font-black leading-tight text-white mb-3">
                Structured editorial analysis for digital strategists
              </h1>
              <p className="text-[14px] leading-relaxed" style={{ color: '#94a3b8' }}>
                Explaining emerging concepts, frameworks, and transformation dynamics - curated for digital strategists and transformation leaders.
              </p>
            </div>
            {/* Insight stack preview */}
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
                    background: i % 2 === 0 ? 'linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)' : 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
                    borderColor: 'rgba(139, 92, 246, 0.3)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                  }}>
                    {/* Insight icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      {i % 2 === 0 ? (
                        <Lightbulb size={20} className="text-white/80" />
                      ) : (
                        <BookOpen size={20} className="text-white/80" />
                      )}
                    </div>
                    {/* Insight label */}
                    <div className="absolute bottom-2 left-0 right-0 text-center">
                      <span className="text-[8px] font-black uppercase tracking-widest text-white/90">
                        {i % 2 === 0 ? 'INSIGHT' : 'ANALYSIS'}
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
            placeholder="Search insights, frameworks, concepts..."
            resultCount={searchQuery ? filtered.length : undefined}
            totalCount={insights.length}
          />
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-[14px] font-serif" style={{ color: '#6b7280' }}>No insights match your filters</p>
            <button onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
              className="mt-3 text-[13px] font-bold hover:opacity-70 font-serif" style={{ color: '#8b5cf6' }}>
              Clear filters
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Featured insight */}
            {featured && <InsightCard card={featured} featured />}

            {/* Grid */}
            {rest.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {rest.map(card => <InsightCard key={card.id} card={card} />)}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
