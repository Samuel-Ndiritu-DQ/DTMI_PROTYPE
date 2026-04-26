import { useState } from 'react';
import { Lock, ArrowLeft, FileText, Clock, Users, BarChart2, ExternalLink, ChevronRight } from 'lucide-react';

/* ── Content block renderer ── */
function Block({ block }) {
  switch (block.type) {
    case 'lead':
      return <p className="text-[17px] leading-relaxed font-medium mb-5" style={{ color: '#1e293b' }}>{block.text}</p>;
    case 'h2':
      return <h2 className="text-[20px] font-black mt-8 mb-3" style={{ color: 'var(--brand-navy)' }}>{block.text}</h2>;
    case 'p':
      return <p className="text-[15px] leading-[1.85] mb-5" style={{ color: '#374151' }}>{block.text}</p>;
    case 'quote':
      return (
        <blockquote className="my-7 pl-5 border-l-4" style={{ borderColor: 'var(--brand-orange)' }}>
          <p className="text-[17px] font-semibold italic leading-relaxed mb-2" style={{ color: 'var(--brand-navy)' }}>"{block.text}"</p>
          {block.author && <cite className="text-[12px] not-italic font-bold" style={{ color: 'var(--brand-orange)' }}>- {block.author}</cite>}
        </blockquote>
      );
    case 'bullets':
      return (
        <ul className="my-7 space-y-2">
          {block.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-[15px] leading-relaxed" style={{ color: '#374151' }}>
              <span className="mt-2 w-2 h-2 rounded-full shrink-0" style={{ background: 'var(--brand-orange)' }} />
              {item}
            </li>
          ))}
        </ul>
      );
    default: return null;
  }
}

/* ── Paywall gate for research ── */
function ResearchPaywallGate({ report, onSignIn }) {
  const contentType = report.type ? report.type.toLowerCase().replace(/\s+/g, '-') : 'research-report';
  const isWhitepaper = contentType === 'white-paper';
  const isForecast = contentType === 'forecast-article';
  const isIndustryAnalysis = contentType === 'industry-briefs';
  
  const typeColor = isWhitepaper ? '#78350f' : 
                   isForecast ? '#f59e0b' : 
                   isIndustryAnalysis ? '#0a7ea4' : 
                   '#0a7ea4';
  
  return (
    <div className="relative mt-8">
      {/* Faded text teaser */}
      <div className="pointer-events-none select-none" style={{ 
        maxHeight: '110px', 
        overflow: 'hidden', 
        maskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)', 
        WebkitMaskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)' 
      }}>
        <p className="text-[15px] leading-[1.85]" style={{ color: '#374151' }}>
          This research report continues with in-depth analysis, methodology details, case studies, and strategic recommendations. The full report includes {report.pages} pages of comprehensive insights, data visualizations, and actionable frameworks for digital leaders.
        </p>
      </div>

      {/* Gate card */}
      <div className="mt-6 rounded-sm overflow-hidden border" style={{ borderColor: 'var(--brand-border)' }}>
        {/* Header stripe */}
        <div className="px-6 py-5 text-center" style={{ background: 'var(--brand-navy)' }}>
          <div className="w-10 h-10 rounded-sm flex items-center justify-center mx-auto mb-3" style={{ background: typeColor }}>
            <Lock size={18} className="text-white" />
          </div>
          <h3 className="text-white font-black text-[17px] mb-1">Continue reading this research report</h3>
          <p className="text-[13px]" style={{ color: '#94a3b8' }}>
            {report.pages - (report.previewContent?.length || 0)} pages remaining · Subscribe to read
          </p>
        </div>

        {/* Body */}
        <div className="px-6 py-6 bg-white text-center">
          <p className="text-[14px] leading-relaxed mb-2 max-w-[420px] mx-auto" style={{ color: 'var(--brand-muted)' }}>
            Subscribe to DTMI Intelligence to unlock the full research report, including all {report.pages} pages, methodology details, case studies, and strategic recommendations.
          </p>

          {/* Key findings preview */}
          {report.keyFindings && (
            <div className="text-left rounded-sm border p-4 mb-6 max-w-[420px] mx-auto" style={{ 
              background: 'var(--brand-light)', 
              borderColor: 'var(--brand-border)' 
            }}>
              <p className="text-[10px] font-black uppercase tracking-widest mb-2.5" style={{ color: 'var(--brand-muted)' }}>
                Key findings from this report
              </p>
              {report.keyFindings.slice(0, 3).map((finding, i) => (
                <div key={i} className="flex items-center gap-2 py-1.5 text-[12px]" style={{ color: '#94a3b8' }}>
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: typeColor }} />
                  {finding}
                </div>
              ))}
              {report.keyFindings.length > 3 && (
                <div className="text-[11px] mt-2" style={{ color: typeColor }}>
                  +{report.keyFindings.length - 3} more key findings
                </div>
              )}
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-[360px] mx-auto">
            <button className="flex-1 py-3 rounded-sm text-white font-black text-[13px] uppercase tracking-wide hover:opacity-90 transition-opacity" style={{ background: typeColor }}>
              Subscribe to Unlock
            </button>
            <button onClick={onSignIn} className="flex-1 py-3 rounded-sm font-black text-[13px] uppercase tracking-wide border-2 hover:bg-gray-50 transition-colors" style={{ 
              borderColor: 'var(--brand-navy)', 
              color: 'var(--brand-navy)' 
            }}>
              Sign In
            </button>
          </div>
          <p className="text-[11px] mt-4" style={{ color: '#c0c8d8' }}>
            Already a subscriber? Sign in above to continue reading.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── Research reader - renders as normal page content ── */
export default function ResearchReader({ report, onClose, onSignIn }) {
  const contentType = report.type ? report.type.toLowerCase().replace(/\s+/g, '-') : 'research-report';
  const isWhitepaper = contentType === 'white-paper';
  const isForecast = contentType === 'forecast-article';
  const isIndustryAnalysis = contentType === 'industry-briefs';
  
  const typeColor = isWhitepaper ? '#78350f' : 
                   isForecast ? '#f59e0b' : 
                   isIndustryAnalysis ? '#0a7ea4' : 
                   '#0a7ea4';
  
  const typeName = isWhitepaper ? 'WHITEPAPER' : 
                  isForecast ? 'FORECAST REPORT' : 
                  isIndustryAnalysis ? 'INDUSTRY ANALYSIS' : 
                  'RESEARCH REPORT';

  return (
    <div style={{ background: 'var(--brand-light)', minHeight: '100vh' }}>
      {/* Slim breadcrumb bar */}
      <div className="bg-white border-b" style={{ borderColor: 'var(--brand-border)' }}>
        <div className="max-w-[960px] mx-auto px-4 h-11 flex items-center justify-between">
          <button onClick={onClose} className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-wide hover:opacity-70 transition-opacity" style={{ color: 'var(--brand-navy)' }}>
            <ArrowLeft size={14} /> Back to Research
          </button>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-black uppercase tracking-widest px-2 py-0.5 rounded-sm" style={{ 
              background: typeColor, 
              color: 'white' 
            }}>
              {typeName}
            </span>
            <span className="text-[11px] hidden sm:block" style={{ color: 'var(--brand-muted)' }}>Free Preview</span>
          </div>
        </div>
      </div>

      <div className="max-w-[960px] mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* ── Main reading area ── */}
          <article className="lg:col-span-3">
            {/* Research header */}
            <div className="flex gap-6 mb-8 pb-6 border-b" style={{ borderColor: 'var(--brand-border)' }}>
              <div className="shrink-0">
                <div className="relative rounded-lg overflow-hidden border" style={{
                  width: '120px',
                  height: '160px',
                  background: 'linear-gradient(135deg, #0a7ea4 0%, #06b6d4 100%)',
                  borderColor: 'rgba(10, 126, 164, 0.3)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                }}>
                  {/* Research icon */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <FileText size={32} className="text-white/80" />
                  </div>
                  {/* Research label */}
                  <div className="absolute bottom-3 left-0 right-0 text-center">
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/90">
                      {typeName.split(' ')[0]}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-sm" style={{ 
                    background: '#f1f5f9', 
                    color: '#475569' 
                  }}>
                    {report.category}
                  </span>
                  {report.premium && (
                    <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-sm text-white" style={{ 
                      background: 'var(--brand-orange)' 
                    }}>
                      PREMIUM
                    </span>
                  )}
                </div>
                <h1 className="text-[22px] sm:text-[26px] font-black leading-tight mb-1" style={{ color: 'var(--brand-navy)' }}>
                  {report.title}
                </h1>
                {report.subtitle && (
                  <p className="text-[14px] mb-3" style={{ color: 'var(--brand-muted)' }}>
                    {report.subtitle}
                  </p>
                )}
                <p className="text-[13px] mb-2" style={{ color: '#475569' }}>
                  by <span className="font-semibold" style={{ color: 'var(--brand-navy)' }}>{report.author}</span>
                  {report.authorRole && <span style={{ color: '#94a3b8' }}> · {report.authorRole}</span>}
                </p>
                <div className="flex flex-wrap items-center gap-4 text-[12px] mb-3" style={{ color: 'var(--brand-muted)' }}>
                  <span className="flex items-center gap-1.5"><FileText size={12} /> {report.pages} pages</span>
                  <span className="flex items-center gap-1.5"><Clock size={12} /> {report.readTime}</span>
                  <span>{report.publishDate}</span>
                </div>
                
                {/* Hook/Summary */}
                {report.summary && (
                  <div className="rounded-sm border p-4 mb-4" style={{ 
                    background: 'white', 
                    borderColor: 'var(--brand-border)' 
                  }}>
                    <p className="text-[14px] leading-relaxed" style={{ color: '#374151' }}>
                      {report.summary}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Preview label */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 h-px" style={{ background: 'var(--brand-border)' }} />
              <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full" style={{ 
                background: '#dcfce7', 
                color: '#16a34a' 
              }}>
                Free Preview
              </span>
              <div className="flex-1 h-px" style={{ background: 'var(--brand-border)' }} />
            </div>

            {/* Preview content */}
            <div className="max-w-[660px]">
              {report.previewContent && report.previewContent.map((block, i) => (
                <Block key={i} block={block} />
              ))}
            </div>

            {/* Paywall for premium research */}
            {report.premium && (
              <ResearchPaywallGate report={report} onSignIn={onSignIn} />
            )}
          </article>

          {/* ── Sidebar ── */}
          <aside className="space-y-5">
            {/* Tags */}
            {report.tags && report.tags.length > 0 && (
              <div className="rounded-sm border bg-white p-4" style={{ borderColor: 'var(--brand-border)' }}>
                <p className="text-[11px] font-black uppercase tracking-widest mb-3" style={{ color: 'var(--brand-muted)' }}>
                  Topics
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {report.tags.map(tag => (
                    <span key={tag} className="text-[11px] px-2 py-0.5 rounded-sm border" style={{ 
                      borderColor: 'var(--brand-border)', 
                      color: 'var(--brand-muted)' 
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Subscribe CTA */}
            <div className="rounded-sm p-4" style={{ background: 'var(--brand-navy)' }}>
              <p className="text-[10px] font-black uppercase tracking-widest mb-1" style={{ color: 'var(--brand-orange)' }}>
                DTMI Intelligence
              </p>
              <p className="text-white font-black text-[13px] mb-2">Get full access</p>
              <p className="text-[12px] mb-3" style={{ color: '#94a3b8' }}>
                Subscribe to unlock every research report, whitepaper, and intelligence feed.
              </p>
              <button className="w-full py-2.5 rounded-sm text-white font-black text-[12px] uppercase tracking-wide hover:opacity-90 transition-opacity" style={{ 
                background: 'var(--brand-orange)' 
              }}>
                Subscribe Now
              </button>
            </div>

            {/* Related research suggestion */}
            <div className="rounded-sm border bg-white p-4" style={{ borderColor: 'var(--brand-border)' }}>
              <p className="text-[11px] font-black uppercase tracking-widest mb-3" style={{ color: 'var(--brand-muted)' }}>
                More Research
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[12px] p-2 rounded-sm hover:bg-gray-50 cursor-pointer transition-colors">
                  <ChevronRight size={12} style={{ color: '#0a7ea4' }} />
                  <span style={{ color: '#374151' }}>AI Governance Frameworks</span>
                </div>
                <div className="flex items-center gap-2 text-[12px] p-2 rounded-sm hover:bg-gray-50 cursor-pointer transition-colors">
                  <ChevronRight size={12} style={{ color: '#0a7ea4' }} />
                  <span style={{ color: '#374151' }}>Digital Talent Strategy</span>
                </div>
                <div className="flex items-center gap-2 text-[12px] p-2 rounded-sm hover:bg-gray-50 cursor-pointer transition-colors">
                  <ChevronRight size={12} style={{ color: '#0a7ea4' }} />
                  <span style={{ color: '#374151' }}>Cloud Transformation ROI</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}