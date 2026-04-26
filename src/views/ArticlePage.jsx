import { useNav } from '../context/NavContext';
import { getArticleBody } from '../data/articleContent';
import { topStories, emergingTech, insightCards, getContentMeta } from '../data/mockData';
import { CONTENT_CATEGORIES, getContentType } from '../data/contentTypes';
import { ArrowLeft, Clock, BookOpen, Share2, Bookmark, Link } from 'lucide-react';
import { useState } from 'react';
import PageMeta from '../components/PageMeta';

// Render a single body block with content-type styling
function Block({ block, contentStyle, category, contentType }) {
  const signalStyle = contentStyle === 'signal';
  const researchStyle = contentStyle === 'research';
  
  // Content type specific styling
  const isExecutiveBrief = contentType?.id === 'executive-brief';
  const isFrontierWatch = contentType?.id === 'frontier-watch';
  const isFrontierBrief = contentType?.id === 'frontier-brief';
  const isRapidInsight = contentType?.id === 'rapid-insight';
  const isTrendAlert = contentType?.id === 'trend-alert';
  const isViewpointBlog = contentType?.id === 'viewpoint-blog';
  const isConceptIntro = contentType?.id === 'concept-introduction';
  const isExpertPerspective = contentType?.id === 'expert-perspective';
  const isFrameworkExplainer = contentType?.id === 'framework-explainer';
  const isInsightArticle = contentType?.id === 'insight-article';
  const isMicroblog = contentType?.id === 'microblogs';
  const isForecast = contentType?.id === 'forecast-article';
  const isIndustryBrief = contentType?.id === 'industry-briefs';
  const isResearchNote = contentType?.id === 'research-notes';
  const isStrategicEssay = contentType?.id === 'strategic-essay';
  const isWhitepaper = contentType?.id === 'white-paper';
  const isBookReview = contentType?.id === 'book-review';
  const isInfographic = contentType?.id === 'infographics';
  
  // Text color - white for signal, dark for others (maintain white background)
  const textColor = signalStyle ? '#e2e8f0' : '#374151';
  
  const accentColor = contentType?.color || (signalStyle ? '#ef4444' :
                     researchStyle ? CONTENT_CATEGORIES.RESEARCH.color : 'var(--brand-orange)');
  
  // Font family based on content type
  const fontFamily = contentType?.typography === 'mono' ? "'SF Mono', 'Monaco', 'Inconsolata', monospace" :
                     contentType?.typography === 'serif' ? "'Playfair Display', 'Times New Roman', serif" :
                     contentType?.typography === 'sans' ? "'Inter', -apple-system, BlinkMacSystemFont, sans-serif" :
                     signalStyle ? "'SF Mono', 'Monaco', 'Inconsolata', monospace" :
                     researchStyle ? "'SF Mono', 'Monaco', 'Inconsolata', monospace" : 'inherit';
  
  const headingFontFamily = isForecast || isWhitepaper || isStrategicEssay || isBookReview ? 
                           "'Playfair Display', 'Times New Roman', serif" : fontFamily;

  // Special styling for forecast articles
  if (isForecast && block.type === 'h2') {
    return (
      <div className="mt-12 mb-6 relative">
        <div className="absolute -left-4 top-0 bottom-0 w-1 rounded-full" style={{ background: accentColor }} />
        <h2 className="text-[24px] font-black pl-6" style={{ 
          color: accentColor,
          fontFamily: headingFontFamily
        }}>
          {block.text}
        </h2>
        {block.subtitle && (
          <p className="text-[14px] mt-2 pl-6 font-medium" style={{ 
            color: textColor,
            fontFamily: fontFamily
          }}>
            {block.subtitle}
          </p>
        )}
      </div>
    );
  }

  // Special styling for whitepaper sections
  if (isWhitepaper && block.type === 'h2') {
    return (
      <div className="mt-10 mb-6 pb-4 border-b" style={{ borderColor: 'rgba(245, 158, 11, 0.2)' }}>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-3 h-3 rounded-full" style={{ background: accentColor }} />
          <h2 className="text-[22px] font-black" style={{ 
            color: accentColor,
            fontFamily: headingFontFamily
          }}>
            {block.text}
          </h2>
        </div>
        {block.subtitle && (
          <p className="text-[15px] pl-6" style={{ 
            color: textColor,
            fontFamily: fontFamily
          }}>
            {block.subtitle}
          </p>
        )}
      </div>
    );
  }

  switch (block.type) {
    case 'lead':
      return (
        <div className="mb-10">
          {/* Content type indicator for all types */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ 
              background: `${accentColor}15`,
              border: `2px solid ${accentColor}30`
            }}>
              <span className="text-[12px] font-black" style={{ color: accentColor }}>
                {isExecutiveBrief ? '⚡' : 
                 isFrontierWatch || isFrontierBrief ? '👁️' :
                 isRapidInsight ? '🚀' :
                 isTrendAlert ? '📈' :
                 isViewpointBlog ? '💬' :
                 isConceptIntro ? '📘' :
                 isExpertPerspective ? '👤' :
                 isFrameworkExplainer ? '🔧' :
                 isInsightArticle ? '💡' :
                 isMicroblog ? '🐦' :
                 isForecast ? '🔮' :
                 isIndustryBrief ? '🏢' :
                 isResearchNote ? '📝' :
                 isStrategicEssay ? '✍️' :
                 isWhitepaper ? '📄' :
                 isBookReview ? '📚' :
                 isInfographic ? '📊' : '📄'}
              </span>
            </div>
            <span className="text-[12px] font-black uppercase tracking-widest" style={{ color: accentColor }}>
              {isExecutiveBrief ? 'EXECUTIVE BRIEF' : 
               isFrontierWatch ? 'FRONTIER WATCH' :
               isFrontierBrief ? 'FRONTIER BRIEF' :
               isRapidInsight ? 'RAPID INSIGHT' :
               isTrendAlert ? 'TREND ALERT' :
               isViewpointBlog ? 'VIEWPOINT' :
               isConceptIntro ? 'CONCEPT INTRODUCTION' :
               isExpertPerspective ? 'EXPERT PERSPECTIVE' :
               isFrameworkExplainer ? 'FRAMEWORK EXPLAINER' :
               isInsightArticle ? 'INSIGHT ARTICLE' :
               isMicroblog ? 'microblogs' :
               isForecast ? 'FORECAST ANALYSIS' :
               isIndustryBrief ? 'INDUSTRY BRIEF' :
               isResearchNote ? 'RESEARCH NOTE' :
               isStrategicEssay ? 'STRATEGIC ESSAY' :
               isWhitepaper ? 'white-paper' :
               isBookReview ? 'BOOK REVIEW' :
               isInfographic ? 'infographics' : contentType?.name?.toUpperCase()}
            </span>
          </div>
          <p className="text-[18px] leading-relaxed font-medium" style={{ 
            color: textColor,
            fontFamily: fontFamily,
            fontStyle: isStrategicEssay ? 'italic' : 'normal',
            fontWeight: isExecutiveBrief || isTrendAlert ? 'bold' : 'medium'
          }}>
            {block.text}
          </p>
        </div>
      );
    case 'h2':
      return (
        <h2 className="text-[22px] font-black mt-10 mb-4" style={{ 
          color: signalStyle ? '#ffffff' : accentColor,
          fontFamily: headingFontFamily,
          borderBottom: isWhitepaper ? '2px solid rgba(120, 53, 15, 0.3)' : 
                       isForecast ? '2px solid rgba(245, 158, 11, 0.3)' :
                       isExecutiveBrief ? '2px solid rgba(239, 68, 68, 0.3)' :
                       isFrontierWatch || isFrontierBrief ? '2px solid rgba(220, 38, 38, 0.3)' :
                       isRapidInsight ? '2px solid rgba(239, 68, 68, 0.3)' :
                       isTrendAlert ? '2px solid rgba(234, 88, 12, 0.3)' :
                       isViewpointBlog ? '2px solid rgba(217, 119, 6, 0.3)' :
                       isConceptIntro ? '2px solid rgba(139, 92, 246, 0.3)' :
                       isExpertPerspective ? '2px solid rgba(124, 58, 237, 0.3)' :
                       isFrameworkExplainer ? '2px solid rgba(109, 40, 217, 0.3)' :
                       isInsightArticle ? '2px solid rgba(91, 33, 182, 0.3)' :
                       isMicroblog ? '2px solid rgba(76, 29, 149, 0.3)' :
                       isIndustryBrief ? '2px solid rgba(214, 119, 6, 0.3)' :
                       isResearchNote ? '2px solid rgba(180, 83, 9, 0.3)' :
                       isStrategicEssay ? '2px solid rgba(146, 64, 14, 0.3)' :
                       isBookReview ? '2px solid rgba(101, 163, 13, 0.3)' :
                       isInfographic ? '2px solid rgba(5, 150, 105, 0.3)' : 'none',
          paddingBottom: (isWhitepaper || isForecast || isExecutiveBrief || isStrategicEssay) ? '8px' : '0',
          borderLeft: isFrameworkExplainer ? `4px solid ${accentColor}` : 'none',
          paddingLeft: isFrameworkExplainer ? '12px' : '0',
          background: isFrameworkExplainer ? `${accentColor}08` : 'transparent',
          borderRadius: isFrameworkExplainer ? '0 8px 8px 0' : '0'
        }}>
          {block.text}
        </h2>
      );
    case 'p':
      return (
        <p className="text-[16px] mb-6" style={{ 
          color: textColor,
          fontFamily: fontFamily,
          lineHeight: isWhitepaper || isStrategicEssay ? '1.8' : 
                     isExecutiveBrief || isRapidInsight || isTrendAlert ? '1.7' :
                     isMicroblog ? '1.6' : '1.9',
          fontWeight: isExecutiveBrief || isTrendAlert ? '500' : 'normal',
          fontStyle: isStrategicEssay ? 'italic' : 'normal',
          borderLeft: isExpertPerspective ? `3px solid ${accentColor}` : 'none',
          paddingLeft: isExpertPerspective ? '16px' : '0',
          background: isExpertPerspective ? `${accentColor}05` : 'transparent',
          padding: isExpertPerspective ? '12px 16px' : '0',
          borderRadius: isExpertPerspective ? '0 8px 8px 0' : '0'
        }}>
          {block.text}
        </p>
      );
    case 'quote':
      return (
        <blockquote className="my-10 pl-6 border-l-4 rounded-r-lg py-4" style={{ 
          borderColor: accentColor,
          background: signalStyle ? 'rgba(239, 68, 68, 0.05)' :
                     researchStyle ? 'rgba(10, 126, 164, 0.05)' :
                     `${accentColor}08`,
          borderLeftWidth: '6px',
          fontStyle: isViewpointBlog || isExpertPerspective ? 'italic' : 'normal',
          borderLeftStyle: isViewpointBlog ? 'dashed' : 'solid'
        }}>
          <p className="text-[18px] font-semibold leading-relaxed mb-3" style={{ 
            color: signalStyle ? '#ffffff' : accentColor,
            fontFamily: fontFamily,
            fontStyle: isViewpointBlog || isExpertPerspective ? 'italic' : 'normal'
          }}>
            "{block.text}"
          </p>
          {block.author && (
            <cite className="text-[14px] not-italic font-bold" style={{ color: accentColor }}>
              — {block.author}
            </cite>
          )}
        </blockquote>
      );
    case 'bullets':
      return (
        <ul className="my-8 space-y-3">
          {block.items.map((item, i) => (
            <li key={i} className="flex items-start gap-4 text-[15px] leading-relaxed" style={{ 
              color: textColor,
              fontFamily: fontFamily
            }}>
              <span className="mt-2 w-3 h-3 rounded-full shrink-0 flex items-center justify-center" style={{ 
                background: accentColor,
                color: 'white',
                fontSize: '8px',
                fontWeight: 'bold'
              }}>
                {i + 1}
              </span>
              {item}
            </li>
          ))}
        </ul>
      );
    case 'forecast-metric':
      return (
        <div className="my-8 p-6 border rounded-xl" style={{ 
          borderColor: 'rgba(245, 158, 11, 0.3)',
          background: 'rgba(245, 158, 11, 0.05)'
        }}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-[16px] font-bold mb-1" style={{ color: accentColor }}>
                {block.metric}
              </h4>
              <p className="text-[14px]" style={{ color: textColor }}>
                {block.description}
              </p>
            </div>
            <div className="text-right">
              <div className="text-[24px] font-black" style={{ color: accentColor }}>
                {block.value}
              </div>
              <div className="text-[12px] font-bold" style={{ color: accentColor }}>
                {block.confidence} confidence
              </div>
            </div>
          </div>
          {block.timeline && (
            <div className="mt-4 pt-4 border-t" style={{ borderColor: 'rgba(245, 158, 11, 0.2)' }}>
              <div className="text-[12px] font-bold mb-2" style={{ color: accentColor }}>Timeline</div>
              <div className="text-[14px]" style={{ color: textColor }}>{block.timeline}</div>
            </div>
          )}
        </div>
      );
    case 'methodology':
      return (
        <div className="my-10 p-6 border rounded-xl" style={{ 
          borderColor: 'rgba(120, 53, 15, 0.3)',
          background: 'rgba(120, 53, 15, 0.05)'
        }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ 
              background: 'rgba(120, 53, 15, 0.1)',
              border: '1px solid rgba(120, 53, 15, 0.3)'
            }}>
              <span className="text-[12px] font-black" style={{ color: accentColor }}>📊</span>
            </div>
            <h4 className="text-[16px] font-bold" style={{ color: accentColor }}>
              Methodology
            </h4>
          </div>
          <p className="text-[15px] leading-relaxed" style={{ color: textColor }}>
            {block.text}
          </p>
          {block.details && (
            <div className="mt-4 pt-4 border-t" style={{ borderColor: 'rgba(120, 53, 15, 0.2)' }}>
              <div className="text-[13px] font-bold mb-2" style={{ color: accentColor }}>Key Details</div>
              <ul className="space-y-2">
                {block.details.map((detail, i) => (
                  <li key={i} className="text-[14px] flex items-start gap-2" style={{ color: textColor }}>
                    <span style={{ color: accentColor }}>•</span>
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      );
    default:
      return null;
  }
}

// Related story mini card with content-type styling
function RelatedCard({ story, onOpen, contentStyle }) {
  const typeId = story.type ? story.type.toLowerCase().replace(/\s+/g, '-') : 'default';
  const contentType = getContentType(typeId);
  const accentColor = contentType.color;
  
  return (
    <button
      onClick={() => onOpen(story)}
      className="w-full text-left group flex gap-3 py-4 border-b last:border-0 transition-all hover:bg-opacity-10"
      style={{ 
        borderColor: contentStyle === 'signal' ? 'rgba(255,255,255,0.1)' : 'var(--brand-border)',
        background: contentStyle === 'signal' ? 'transparent' : 'transparent'
      }}
    >
      {story.image && (
        <div className="relative shrink-0 w-24 h-16 overflow-hidden rounded-lg">
          <img src={story.image} alt={story.headline || story.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent rounded-lg" />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-black uppercase tracking-wider mb-1.5" style={{ 
          color: accentColor,
          fontFamily: contentStyle === 'signal' ? "'SF Mono', 'Monaco', 'Inconsolata', monospace" : 'inherit'
        }}>
          {story.category || 'DTMI'}
        </p>
        <p className="text-[13px] font-bold leading-snug group-hover:opacity-80 transition-opacity line-clamp-2" style={{ 
          color: contentStyle === 'signal' ? '#ffffff' : 'var(--brand-navy)',
          fontFamily: contentStyle === 'signal' ? "'SF Mono', 'Monaco', 'Inconsolata', monospace" : 'inherit'
        }}>
          {story.headline || story.title}
        </p>
        {story.summary && (
          <p className="text-[11px] mt-1 line-clamp-1" style={{ 
            color: contentStyle === 'signal' ? '#94a3b8' : 'var(--brand-muted)',
            fontFamily: contentStyle === 'signal' ? "'SF Mono', 'Monaco', 'Inconsolata', monospace" : 'inherit'
          }}>
            {story.summary}
          </p>
        )}
      </div>
    </button>
  );
}

export default function ArticlePage() {
  const { page, goBack, openArticle } = useNav();
  const [copied, setCopied] = useState(false);
  const item = page?.item;
  if (!item) return null;

  const headline = item.headline || item.title || '';
  const summary  = item.summary || '';
  const itemCategory = item.category || '';
  const image    = item.image || '';
  const author   = item.author || 'DTMI Research Desk';
  const timestamp = item.timestamp || item.date || 'Apr 23, 2026';
  const readTime  = item.readTime || '6 min';
  const tags      = item.tags || [];
  
  // Determine content type for styling using content type system
  const typeId = item.type ? item.type.toLowerCase().replace(/\s+/g, '-') : 'executive-briefs';
  const contentType = getContentType(typeId);
  const contentCategory = CONTENT_CATEGORIES[contentType.category] || CONTENT_CATEGORIES.EXECUTIVE;
  
  // Set styling based on content type
  const contentStyle = contentType.category === 'signal' ? 'signal' : 
                       contentType.category === 'insight' ? 'insight' : 
                       contentType.category === 'deep-analysis' ? 'deep-analysis' : 
                       contentType.category === 'research' ? 'research' : 'default';

  const isExecutiveBrief = contentType?.id === 'executive-brief';
  const isFrontierWatch = contentType?.id === 'frontier-watch';
  const isFrontierBrief = contentType?.id === 'frontier-brief';
  const isRapidInsight = contentType?.id === 'rapid-insight';
  const isTrendAlert = contentType?.id === 'trend-alert';
  const isViewpointBlog = contentType?.id === 'viewpoint-blog';
  const isConceptIntro = contentType?.id === 'concept-introduction';
  const isExpertPerspective = contentType?.id === 'expert-perspective';
  const isFrameworkExplainer = contentType?.id === 'framework-explainer';
  const isInsightArticle = contentType?.id === 'insight-article';
  const isMicroblog = contentType?.id === 'microblogs';
  const isForecast = contentType?.id === 'forecast-article';
  const isIndustryBrief = contentType?.id === 'industry-briefs';
  const isResearchNote = contentType?.id === 'research-notes';
  const isStrategicEssay = contentType?.id === 'strategic-essay';
  const isWhitepaper = contentType?.id === 'white-paper';
  const isBookReview = contentType?.id === 'book-review';
  const isInfographic = contentType?.id === 'infographics';
  const isResearch = contentType?.category === 'research';
  const isSignal = contentType?.category === 'signal';
  const isInsight = contentType?.category === 'insight';

  const body = getArticleBody(item.id, headline, summary, itemCategory);

  // Related stories — pick 4 from pool excluding current
  const pool = [...topStories, ...emergingTech, ...insightCards].filter(s => s.id !== item.id);
  const related = pool.slice(0, 4);

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ 
      background: 'white'
    }} className="min-h-screen">
      <PageMeta title={headline} description={summary} />

      {/* ── BACK BAR ── */}
      <div className="border-b sticky top-14 z-40" style={{ 
        borderColor: 'var(--brand-border)',
        background: 'white'
      }}>
        <div className="max-w-[1280px] mx-auto px-4 h-14 flex items-center justify-between">
          <button
            onClick={goBack}
            className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-wide transition-colors hover:opacity-70"
            style={{ 
              color: 'var(--brand-navy)',
              fontFamily: 'inherit'
            }}
          >
            <ArrowLeft size={15} /> Back
          </button>
          <div className="flex items-center gap-2">
            {/* Content type badge */}
            <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full" style={{
              background: contentType.color || 'var(--brand-orange)',
              color: 'white'
            }}>
              {contentType.name?.toUpperCase() || 'ARTICLE'}
            </span>
            <button onClick={handleCopy} className="flex items-center gap-1.5 text-[11px] font-semibold px-3 py-1.5 border rounded-sm transition-colors hover:opacity-80" style={{ 
              borderColor: 'var(--brand-border)', 
              color: 'var(--brand-muted)',
              background: 'transparent'
            }}>
              <Link size={12} /> {copied ? 'Copied!' : 'Copy link'}
            </button>
            <button className="p-1.5 border rounded-sm hover:opacity-80 transition-opacity" style={{ 
              borderColor: 'var(--brand-border)', 
              color: 'var(--brand-muted)',
              background: 'transparent'
            }}>
              <Bookmark size={14} />
            </button>
          </div>
        </div>
      </div>



      {/* ── HERO IMAGE ── */}
      {image && (
        <div className="w-full" style={{ maxHeight: '520px', overflow: 'hidden', display: 'block', lineHeight: 0 }}>
          <img
            src={image.replace('w=600', 'w=1400').replace('w=400', 'w=1400')}
            alt={headline}
            className="w-full object-cover block"
            style={{ 
              maxHeight: '520px',
              filter: 'none',
              boxShadow: 'none',
              display: 'block'
            }}
            loading="eager"
          />
        </div>
      )}

      {/* ── CONTENT ── */}
      <div className="max-w-[1280px] mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* ── ARTICLE BODY (2/3) ── */}
          <article className="lg:col-span-2">

            {/* Category + tags with style variations */}
            <div className="flex items-center gap-2 flex-wrap mb-6">
              <span className="text-[11px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full text-white" style={{ 
                background: contentStyle === 'signal' ? '#ef4444' :
                           contentStyle === 'insight' ? '#8b5cf6' :
                           contentStyle === 'deep-analysis' ? '#f59e0b' :
                           'var(--brand-orange)',
                fontFamily: contentStyle === 'signal' ? "'SF Mono', 'Monaco', 'Inconsolata', monospace" : 'inherit'
              }}>
                {itemCategory}
              </span>
              {tags.map(tag => (
                <span key={tag} className="text-[10px] font-semibold uppercase tracking-wide px-3 py-1.5 rounded-full border transition-all hover:scale-105" style={{ 
                  borderColor: contentStyle === 'signal' ? 'rgba(255,255,255,0.2)' : `${contentType.color}30`,
                  color: contentStyle === 'signal' ? '#94a3b8' : contentType.color,
                  background: contentStyle === 'signal' ? 'rgba(255,255,255,0.05)' : 'transparent',
                  fontFamily: contentStyle === 'signal' ? "'SF Mono', 'Monaco', 'Inconsolata', monospace" : 'inherit'
                }}>
                  {tag}
                </span>
              ))}
            </div>

            {/* Content type indicator */}
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-2 px-4 py-2 rounded-full" style={{ 
                background: `${contentType.color}15`,
                border: `1px solid ${contentType.color}30`
              }}>
                <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ 
                  background: `${contentType.color}20`
                }}>
                  <span className="text-[12px]" style={{ color: contentType.color }}>
                    {isExecutiveBrief ? '⚡' : 
                     isFrontierWatch || isFrontierBrief ? '👁️' :
                     isRapidInsight ? '🚀' :
                     isTrendAlert ? '📈' :
                     isViewpointBlog ? '💬' :
                     isConceptIntro ? '📘' :
                     isExpertPerspective ? '👤' :
                     isFrameworkExplainer ? '🔧' :
                     isInsightArticle ? '💡' :
                     isMicroblog ? '🐦' :
                     isForecast ? '🔮' :
                     isIndustryBrief ? '🏢' :
                     isResearchNote ? '📝' :
                     isStrategicEssay ? '✍️' :
                     isWhitepaper ? '📄' :
                     isBookReview ? '📚' :
                     isInfographic ? '📊' : '📄'}
                  </span>
                </div>
                <span className="text-[12px] font-black uppercase tracking-widest" style={{ color: contentType.color }}>
                  {isExecutiveBrief ? 'EXECUTIVE BRIEF' : 
                   isFrontierWatch ? 'FRONTIER WATCH' :
                   isFrontierBrief ? 'FRONTIER BRIEF' :
                   isRapidInsight ? 'RAPID INSIGHT' :
                   isTrendAlert ? 'TREND ALERT' :
                   isViewpointBlog ? 'VIEWPOINT' :
                   isConceptIntro ? 'CONCEPT INTRODUCTION' :
                   isExpertPerspective ? 'EXPERT PERSPECTIVE' :
                   isFrameworkExplainer ? 'FRAMEWORK EXPLAINER' :
                   isInsightArticle ? 'INSIGHT ARTICLE' :
                   isMicroblog ? 'microblogs' :
                   isForecast ? 'FORECAST ANALYSIS' :
                   isIndustryBrief ? 'INDUSTRY BRIEF' :
                   isResearchNote ? 'RESEARCH NOTE' :
                   isStrategicEssay ? 'STRATEGIC ESSAY' :
                   isWhitepaper ? 'white-paper' :
                   isBookReview ? 'BOOK REVIEW' :
                   isInfographic ? 'infographics' : contentType?.name?.toUpperCase()}
                </span>
              </div>
            </div>

            {/* Headline with style variations */}
            <h1 className="text-[28px] lg:text-[36px] font-black leading-tight mb-6" style={{ 
              color: contentStyle === 'signal' ? '#ffffff' : 'var(--brand-navy)',
              fontFamily: isForecast || isWhitepaper || isStrategicEssay || isBookReview ? 
                         "'Playfair Display', 'Times New Roman', serif" :
                         contentStyle === 'signal' ? "'SF Mono', 'Monaco', 'Inconsolata', monospace" :
                         isExecutiveBrief || isFrontierWatch || isFrontierBrief || isRapidInsight || isTrendAlert ? 
                         "'SF Mono', 'Monaco', 'Inconsolata', monospace" :
                         isConceptIntro || isExpertPerspective || isFrameworkExplainer || isInsightArticle ?
                         "'Playfair Display', 'Times New Roman', serif" :
                         'inherit',
              borderBottom: isWhitepaper ? '2px solid rgba(120, 53, 15, 0.3)' : 
                           isForecast ? '2px solid rgba(245, 158, 11, 0.3)' :
                           isExecutiveBrief ? '2px solid rgba(239, 68, 68, 0.3)' :
                           isStrategicEssay ? '2px solid rgba(146, 64, 14, 0.3)' : 'none',
              paddingBottom: (isWhitepaper || isForecast || isExecutiveBrief || isStrategicEssay) ? '12px' : '0'
            }}>
              {headline}
            </h1>

            {/* Byline with style variations */}
            <div className="flex items-center gap-4 pb-6 mb-8 border-b" style={{ 
              borderColor: contentStyle === 'signal' ? 'rgba(255,255,255,0.1)' : 'var(--brand-border)'
            }}>
              <div className="w-12 h-12 rounded-full flex items-center justify-center text-white text-[15px] font-black shrink-0" style={{ 
                background: contentStyle === 'signal' ? '#ef4444' : contentType.color,
                boxShadow: contentStyle === 'signal' ? '0 4px 20px rgba(239, 68, 68, 0.3)' : 'none'
              }}>
                {author.split(' ').map(n => n[0]).slice(0, 2).join('')}
              </div>
              <div>
                <p className="text-[14px] font-bold" style={{ 
                  color: contentStyle === 'signal' ? '#ffffff' : 'var(--brand-navy)',
                  fontFamily: contentStyle === 'signal' ? "'SF Mono', 'Monaco', 'Inconsolata', monospace" : 'inherit'
                }}>{author}</p>
                <div className="flex items-center gap-3 text-[12px]" style={{ 
                  color: contentStyle === 'signal' ? '#94a3b8' : 'var(--brand-muted)',
                  fontFamily: contentStyle === 'signal' ? "'SF Mono', 'Monaco', 'Inconsolata', monospace" : 'inherit'
                }}>
                  <span className="flex items-center gap-1">
                    <Clock size={12} style={{ 
                      color: contentStyle === 'signal' ? '#ef4444' :
                            contentStyle === 'insight' ? '#8b5cf6' :
                            contentStyle === 'deep-analysis' ? '#f59e0b' :
                            'var(--brand-orange)'
                    }} /> 
                    {timestamp}
                  </span>
                  <span style={{ color: contentStyle === 'signal' ? 'rgba(255,255,255,0.3)' : 'inherit' }}>·</span>
                  <span className="flex items-center gap-1">
                    <BookOpen size={12} style={{ 
                      color: contentStyle === 'signal' ? '#ef4444' :
                            contentStyle === 'insight' ? '#8b5cf6' :
                            contentStyle === 'deep-analysis' ? '#f59e0b' :
                            'var(--brand-orange)'
                    }} /> 
                    {readTime} read
                  </span>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="max-w-[680px]">
              {body.map((block, i) => (
                <Block 
                  key={i} 
                  block={block} 
                  contentStyle={contentStyle} 
                  category={contentCategory} 
                  contentType={contentType}
                />
              ))}
            </div>

            {/* Special content type sections */}
            {isForecast && (
              <div className="mt-12 p-6 border rounded-xl" style={{ 
                borderColor: 'rgba(245, 158, 11, 0.3)',
                background: 'rgba(245, 158, 11, 0.05)'
              }}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ 
                    background: 'rgba(245, 158, 11, 0.1)',
                    border: '2px solid rgba(245, 158, 11, 0.3)'
                  }}>
                    <span className="text-[16px]">🔮</span>
                  </div>
                  <div>
                    <h3 className="text-[18px] font-black" style={{ color: contentType.color }}>
                      Forecast Analysis Summary
                    </h3>
                    <p className="text-[14px]" style={{ color: '#6b7280' }}>
                      Key predictions and confidence levels
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg" style={{ 
                    borderColor: 'rgba(245, 158, 11, 0.2)',
                    background: 'rgba(245, 158, 11, 0.03)'
                  }}>
                    <div className="text-[12px] font-bold uppercase tracking-widest mb-2" style={{ color: contentType.color }}>
                      Time Horizon
                    </div>
                    <div className="text-[16px] font-bold">2026-2028</div>
                    <div className="text-[14px] mt-1" style={{ color: '#6b7280' }}>
                      Primary forecast period
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg" style={{ 
                    borderColor: 'rgba(245, 158, 11, 0.2)',
                    background: 'rgba(245, 158, 11, 0.03)'
                  }}>
                    <div className="text-[12px] font-bold uppercase tracking-widest mb-2" style={{ color: contentType.color }}>
                      Confidence Level
                    </div>
                    <div className="text-[16px] font-bold">High</div>
                    <div className="text-[14px] mt-1" style={{ color: '#6b7280' }}>
                      Based on current trend data
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg" style={{ 
                    borderColor: 'rgba(245, 158, 11, 0.2)',
                    background: 'rgba(245, 158, 11, 0.03)'
                  }}>
                    <div className="text-[12px] font-bold uppercase tracking-widest mb-2" style={{ color: contentType.color }}>
                      Probability
                    </div>
                    <div className="text-[16px] font-bold">85%</div>
                    <div className="text-[14px] mt-1" style={{ color: '#6b7280' }}>
                      Likelihood of primary scenario
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg" style={{ 
                    borderColor: 'rgba(245, 158, 11, 0.2)',
                    background: 'rgba(245, 158, 11, 0.03)'
                  }}>
                    <div className="text-[12px] font-bold uppercase tracking-widest mb-2" style={{ color: contentType.color }}>
                      Key Variables
                    </div>
                    <div className="text-[14px]" style={{ color: '#6b7280' }}>
                      Regulatory changes, tech adoption rates, economic conditions
                    </div>
                  </div>
                </div>
              </div>
            )}

            {isWhitepaper && (
              <div className="mt-12 p-6 border rounded-xl" style={{ 
                borderColor: 'rgba(120, 53, 15, 0.3)',
                background: 'rgba(120, 53, 15, 0.05)'
              }}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ 
                    background: 'rgba(120, 53, 15, 0.1)',
                    border: '2px solid rgba(120, 53, 15, 0.3)'
                  }}>
                    <span className="text-[16px]">📄</span>
                  </div>
                  <div>
                    <h3 className="text-[18px] font-black" style={{ color: contentType.color }}>
                      Research Methodology
                    </h3>
                    <p className="text-[14px]" style={{ color: '#6b7280' }}>
                      Academic standards and analysis framework
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg" style={{ 
                    borderColor: 'rgba(120, 53, 15, 0.2)',
                    background: 'rgba(120, 53, 15, 0.03)'
                  }}>
                    <div className="text-[12px] font-bold uppercase tracking-widest mb-2" style={{ color: contentType.color }}>
                      Research Design
                    </div>
                    <div className="text-[14px]" style={{ color: '#6b7280' }}>
                      Mixed-methods approach combining quantitative survey data (n=1,200) with qualitative executive interviews (n=47)
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg" style={{ 
                    borderColor: 'rgba(120, 53, 15, 0.2)',
                    background: 'rgba(120, 53, 15, 0.03)'
                  }}>
                    <div className="text-[12px] font-bold uppercase tracking-widest mb-2" style={{ color: contentType.color }}>
                      Data Collection Period
                    </div>
                    <div className="text-[14px]" style={{ color: '#6b7280' }}>
                      Q4 2025 - Q1 2026
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg" style={{ 
                    borderColor: 'rgba(120, 53, 15, 0.2)',
                    background: 'rgba(120, 53, 15, 0.03)'
                  }}>
                    <div className="text-[12px] font-bold uppercase tracking-widest mb-2" style={{ color: contentType.color }}>
                      Peer Review
                    </div>
                    <div className="text-[14px]" style={{ color: '#6b7280' }}>
                      This whitepaper has undergone internal peer review by the DTMI Research Committee
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg" style={{ 
                    borderColor: 'rgba(120, 53, 15, 0.2)',
                    background: 'rgba(120, 53, 15, 0.03)'
                  }}>
                    <div className="text-[12px] font-bold uppercase tracking-widest mb-2" style={{ color: contentType.color }}>
                      Citation Format
                    </div>
                    <div className="text-[14px]" style={{ color: '#6b7280' }}>
                      DTMI Research Desk. (2026). "{headline}". Digital Transformation Monitor Intelligence.
                    </div>
                  </div>
                </div>
              </div>
            )}

            {isResearch && (
              <div className="mt-12 p-6 border rounded-xl" style={{ 
                borderColor: 'rgba(10, 126, 164, 0.3)',
                background: 'rgba(10, 126, 164, 0.05)'
              }}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ 
                    background: 'rgba(10, 126, 164, 0.1)',
                    border: '2px solid rgba(10, 126, 164, 0.3)'
                  }}>
                    <span className="text-[16px]">📊</span>
                  </div>
                  <div>
                    <h3 className="text-[18px] font-black" style={{ color: contentType.color }}>
                      Executive Summary
                    </h3>
                    <p className="text-[14px]" style={{ color: '#6b7280' }}>
                      Key findings and recommendations
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg" style={{ 
                    borderColor: 'rgba(10, 126, 164, 0.2)',
                    background: 'rgba(10, 126, 164, 0.03)'
                  }}>
                    <div className="text-[12px] font-bold uppercase tracking-widest mb-2" style={{ color: contentType.color }}>
                      Primary Finding
                    </div>
                    <div className="text-[14px]" style={{ color: '#6b7280' }}>
                      {summary}
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg" style={{ 
                    borderColor: 'rgba(10, 126, 164, 0.2)',
                    background: 'rgba(10, 126, 164, 0.03)'
                  }}>
                    <div className="text-[12px] font-bold uppercase tracking-widest mb-2" style={{ color: contentType.color }}>
                      Strategic Implications
                    </div>
                    <div className="text-[14px]" style={{ color: '#6b7280' }}>
                      This research has significant implications for digital strategy, organizational design, and competitive positioning in the Economy 4.0 landscape.
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg" style={{ 
                    borderColor: 'rgba(10, 126, 164, 0.2)',
                    background: 'rgba(10, 126, 164, 0.03)'
                  }}>
                    <div className="text-[12px] font-bold uppercase tracking-widest mb-2" style={{ color: contentType.color }}>
                      Recommended Actions
                    </div>
                    <div className="text-[14px]" style={{ color: '#6b7280' }}>
                      • Conduct a digital maturity assessment<br/>
                      • Build a transformation roadmap<br/>
                      • Establish digital governance<br/>
                      • Invest in digital talent development
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Bottom share */}
            <div className="mt-12 pt-8 border-t flex items-center justify-between flex-wrap gap-4" style={{ 
              borderColor: contentStyle === 'signal' ? 'rgba(255,255,255,0.1)' : 'var(--brand-border)'
            }}>
              <div>
                <p className="text-[12px] font-bold mb-2" style={{ 
                  color: contentStyle === 'signal' ? '#94a3b8' : 'var(--brand-navy)',
                  fontFamily: contentStyle === 'signal' ? "'SF Mono', 'Monaco', 'Inconsolata', monospace" : 'inherit'
                }}>Share this {isForecast ? 'forecast' : 
                             isWhitepaper ? 'white-paper' : 
                             isResearch ? 'research report' : 
                             isSignal ? 'signal' : 
                             isInsight ? 'insight' : 'article'}</p>
                <div className="flex gap-3">
                  <button className="flex items-center gap-1.5 text-[11px] font-semibold px-4 py-2 border rounded-lg hover:opacity-80 transition-opacity" style={{ 
                    borderColor: contentStyle === 'signal' ? 'rgba(255,255,255,0.2)' : 'var(--brand-border)', 
                    color: contentStyle === 'signal' ? '#94a3b8' : '#0077b5',
                    background: contentStyle === 'signal' ? 'rgba(255,255,255,0.05)' : 'transparent'
                  }}>
                    <Share2 size={12} /> Share
                  </button>
                  <button onClick={handleCopy} className="flex items-center gap-1.5 text-[11px] font-semibold px-4 py-2 border rounded-lg hover:opacity-80 transition-opacity" style={{ 
                    borderColor: contentStyle === 'signal' ? 'rgba(255,255,255,0.2)' : 'var(--brand-border)', 
                    color: contentStyle === 'signal' ? '#94a3b8' : 'var(--brand-muted)',
                    background: contentStyle === 'signal' ? 'rgba(255,255,255,0.05)' : 'transparent'
                  }}>
                    <Link size={12} /> {copied ? 'Copied!' : 'Copy link'}
                  </button>
                </div>
              </div>
              <button
                onClick={goBack}
                className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-wide transition-colors hover:opacity-70"
                style={{ 
                  color: contentType.color,
                  fontFamily: contentStyle === 'signal' ? "'SF Mono', 'Monaco', 'Inconsolata', monospace" : 'inherit'
                }}
              >
                <ArrowLeft size={13} /> 
                {isForecast ? 'BACK TO FORECAST LIBRARY' : 
                 isWhitepaper ? 'BACK TO RESEARCH PAPERS' :
                 isResearch ? 'BACK TO RESEARCH REPORTS' :
                 isSignal ? 'RETURN TO SIGNAL CENTER' :
                 isInsight ? 'BACK TO INSIGHTS' :
                 'Back to DTMI'}
              </button>
            </div>
          </article>

          {/* ── SIDEBAR (1/3) ── */}
          <aside className="space-y-6">

            {/* Related stories */}
            <div className="border rounded-xl p-5" style={{ 
              borderColor: contentStyle === 'signal' ? 'rgba(255,255,255,0.1)' : 'var(--brand-border)',
              background: contentStyle === 'signal' ? 'rgba(255,255,255,0.03)' : 'white',
              backdropFilter: contentStyle === 'signal' ? 'blur(10px)' : 'none'
            }}>
              <h3 className="text-[12px] font-black uppercase tracking-wider mb-4 pb-3 border-b" style={{ 
                color: contentStyle === 'signal' ? '#94a3b8' : 'var(--brand-navy)',
                borderColor: contentStyle === 'signal' ? 'rgba(255,255,255,0.1)' : 'var(--brand-border)',
                fontFamily: contentStyle === 'signal' ? "'SF Mono', 'Monaco', 'Inconsolata', monospace" : 'inherit'
              }}>
                RELATED {contentStyle === 'signal' ? 'SIGNALS' : 
                        contentStyle === 'insight' ? 'INSIGHTS' : 
                        contentStyle === 'deep-analysis' ? 'ANALYSES' : 'STORIES'}
              </h3>
              {related.map(story => (
                <RelatedCard
                  key={story.id}
                  story={story}
                  onOpen={(s) => openArticle({ ...s, headline: s.headline || s.title })}
                  contentStyle={contentStyle}
                />
              ))}
            </div>

            {/* Newsletter */}
            <div className="rounded-xl p-5" style={{ 
              background: contentStyle === 'signal' ? 'linear-gradient(135deg, rgba(239,68,68,0.1) 0%, rgba(10,22,40,0.9) 100%)' :
                         contentStyle === 'insight' ? 'linear-gradient(135deg, rgba(139,92,246,0.1) 0%, var(--brand-navy) 100%)' :
                         contentStyle === 'deep-analysis' ? 'linear-gradient(135deg, rgba(245,158,11,0.1) 0%, #1e293b 100%)' :
                         'var(--brand-navy)',
              border: contentStyle === 'signal' ? '1px solid rgba(239,68,68,0.2)' : 'none'
            }}>
              <p className="text-[10px] font-black uppercase tracking-widest mb-1" style={{ 
                color: contentType.color,
                fontFamily: contentStyle === 'signal' ? "'SF Mono', 'Monaco', 'Inconsolata', monospace" : 'inherit'
              }}>
                {isForecast ? 'DTMI FORECASTS' : 
                 isWhitepaper ? 'DTMI RESEARCH' :
                 isResearch ? 'DTMI INTELLIGENCE' :
                 isSignal ? 'DTMI SIGNALS' :
                 'DTMI INSIGHTS'}
              </p>
              <h3 className="text-white text-[14px] font-bold mb-2">
                {isForecast ? 'Get future trend alerts' : 
                 isWhitepaper ? 'Get research updates' :
                 isResearch ? 'Get executive briefings' :
                 isSignal ? 'Get urgent signals' :
                 'Get daily insights'}
              </h3>
              <p className="text-[#94a3b8] text-[11px] mb-3">
                {isForecast ? 'Future trend projections and analysis' : 
                 isWhitepaper ? 'Latest research papers and findings' :
                 isResearch ? 'Premium intelligence for executives' :
                 isSignal ? 'Real-time alerts and briefings' :
                 'Top transformation insights every morning.'}
              </p>
              <input
                type="email"
                placeholder="Your email address"
                className="w-full text-white text-[12px] px-4 py-2.5 mb-3 focus:outline-none transition-colors placeholder-[#94a3b8] rounded-lg"
                style={{ 
                  background: 'rgba(255,255,255,0.08)', 
                  border: '1px solid rgba(255,255,255,0.15)'
                }}
              />
              <button className="w-full text-[12px] font-black py-3 uppercase tracking-wider rounded-lg hover:opacity-90 transition-opacity" style={{ 
                background: contentStyle === 'signal' ? '#ef4444' :
                           contentStyle === 'insight' ? '#8b5cf6' :
                           contentStyle === 'deep-analysis' ? '#f59e0b' :
                           'var(--brand-orange)',
                color: 'white'
              }}>
                Subscribe Free
              </button>
            </div>

            {/* About DTMI */}
            <div className="border rounded-xl p-5" style={{ 
              borderColor: contentStyle === 'signal' ? 'rgba(255,255,255,0.1)' : 'var(--brand-border)',
              background: contentStyle === 'signal' ? 'rgba(255,255,255,0.03)' : 'white',
              backdropFilter: contentStyle === 'signal' ? 'blur(10px)' : 'none'
            }}>
              <p className="text-[10px] font-black uppercase tracking-widest mb-2" style={{ 
                color: contentStyle === 'signal' ? '#ef4444' :
                       contentStyle === 'insight' ? '#8b5cf6' :
                       contentStyle === 'deep-analysis' ? '#f59e0b' :
                       'var(--brand-orange)',
                fontFamily: contentStyle === 'signal' ? "'SF Mono', 'Monaco', 'Inconsolata', monospace" : 'inherit'
              }}>ABOUT DTMI</p>
              <p className="text-[12px] leading-relaxed" style={{ 
                color: contentStyle === 'signal' ? '#94a3b8' : 'var(--brand-muted)',
                fontFamily: contentStyle === 'signal' ? "'SF Mono', 'Monaco', 'Inconsolata', monospace" : 'inherit'
              }}>
                DTMI is the primary knowledge platform of DigitalQatalyst — a global think-tank examining how organizations are adapting to the Digital Economy.
              </p>
            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}
