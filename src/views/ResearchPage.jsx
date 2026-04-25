import { useState } from 'react';

import { researchReports, researchCategories, researchTypes } from '../data/researchData';
import { FileText, Clock, Lock, ArrowLeft, ChevronRight, Star, Filter, Users, BookOpen, ArrowRight } from 'lucide-react';
import PageSearch from '../components/PageSearch';

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
          {block.author && <cite className="text-[12px] not-italic font-bold" style={{ color: 'var(--brand-orange)' }}>— {block.author}</cite>}
        </blockquote>
      );
    default: return null;
  }
}

/* ── Paywall gate ── */
function ResearchPaywall({ report, onSignIn }) {
  return (
    <div className="mt-8">
      {/* Faded teaser */}
      <div className="pointer-events-none select-none" style={{ maxHeight: '100px', overflow: 'hidden', maskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)' }}>
        <p className="text-[15px] leading-[1.85]" style={{ color: '#374151' }}>
          The full report examines these findings across all surveyed industries and geographies, with detailed breakdowns by organization size, sector, and digital maturity level. The data reveals significant variation in outcomes that points to a clear set of differentiating practices...
        </p>
      </div>

      {/* Gate */}
      <div className="mt-6 rounded-sm border-2 overflow-hidden" style={{ borderColor: 'var(--brand-orange)' }}>
        <div className="px-6 py-4" style={{ background: 'var(--brand-navy)' }}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-sm flex items-center justify-center shrink-0" style={{ background: 'var(--brand-orange)' }}>
              <Lock size={16} className="text-white" />
            </div>
            <div>
              <p className="text-white font-black text-[14px] leading-none">Continue Reading — Subscribe to Unlock</p>
              <p className="text-[12px] mt-0.5" style={{ color: '#94a3b8' }}>
                {report.pages} pages · {report.readTime} read · Sign in or subscribe to unlock
              </p>
            </div>
          </div>
        </div>

        <div className="px-6 py-5 bg-white">
          <p className="text-[14px] leading-relaxed mb-4" style={{ color: 'var(--brand-muted)' }}>
            You've read the free preview of <strong style={{ color: 'var(--brand-navy)' }}>{report.title}</strong>. Subscribe to DTMI Intelligence to access the full report, including all key findings, data tables, and strategic recommendations.
          </p>

          {/* Key findings teaser */}
          <div className="rounded-sm border p-4 mb-5" style={{ background: 'var(--brand-light)', borderColor: 'var(--brand-border)' }}>
            <p className="text-[10px] font-black uppercase tracking-widest mb-3" style={{ color: 'var(--brand-muted)' }}>Key Findings (Subscribers Only)</p>
            <div className="space-y-2">
              {report.keyFindings.map((f, i) => (
                <div key={i} className="flex items-start gap-2.5 text-[12px]" style={{ color: i < 2 ? 'var(--brand-dark)' : '#c0c8d8' }}>
                  <span className="w-4 h-4 rounded-sm flex items-center justify-center shrink-0 text-[9px] font-black text-white mt-0.5" style={{ background: i < 2 ? 'var(--brand-orange)' : '#d1d5db' }}>
                    {i + 1}
                  </span>
                  {i < 2 ? f : '••••••••••••••••••••••••••••••••'}
                </div>
              ))}
            </div>
          </div>

          {/* Plans */}
          <div className="rounded-sm border p-4 mb-5" style={{ background: 'var(--brand-light)', borderColor: 'var(--brand-border)' }}>
            <p className="text-[10px] font-black uppercase tracking-widest mb-3" style={{ color: 'var(--brand-muted)' }}>What you get with a subscription</p>
            {['Full access to this report', 'All 50+ research reports & whitepapers', 'All 4 DTMB volumes', 'Real-time Intelligence Feed', 'AI Insight Engine'].map((f, i) => (
              <div key={i} className="flex items-center gap-2 py-1.5 text-[12px]" style={{ color: 'var(--brand-dark)' }}>
                <span className="w-3.5 h-3.5 rounded-full flex items-center justify-center shrink-0 text-[8px] font-black text-white" style={{ background: 'var(--brand-orange)' }}>✓</span>
                {f}
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button className="flex-1 py-3 rounded-sm text-white font-black text-[13px] uppercase tracking-wide hover:opacity-90 transition-opacity" style={{ background: 'var(--brand-orange)' }}>
              Subscribe to Unlock
            </button>
            <button onClick={onSignIn} className="flex-1 py-3 rounded-sm font-black text-[13px] uppercase tracking-wide border-2 hover:bg-gray-50 transition-colors" style={{ borderColor: 'var(--brand-navy)', color: 'var(--brand-navy)' }}>
              Sign In
            </button>
          </div>
          <p className="text-center text-[11px] mt-3" style={{ color: 'var(--brand-muted)' }}>
            Already a subscriber? Sign in to continue reading.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── Type badge colours ── */
const typeMeta = {
  'Whitepaper':        { bg: '#f5f3ff', color: '#7c3aed' },
  'Research Report':   { bg: '#f0f9ff', color: '#0369a1' },
  'Policy Brief':      { bg: '#fef9c3', color: '#a16207' },
  'Industry Analysis': { bg: '#f0fdf4', color: '#15803d' },
  'Market Intelligence':{ bg: '#fff7ed', color: '#c2410c' },
  'Thought Leadership':{ bg: '#fdf2f8', color: '#9d174d' },
};

/* ── Full report reader — renders as normal page content (TopBar/Footer from App) ── */
function ReportReader({ report, onClose, onSignIn }) {
  return (
    <div style={{ background: 'var(--brand-light)', minHeight: '100vh' }}>
      {/* Slim breadcrumb bar */}
      <div className="bg-white border-b" style={{ borderColor: 'var(--brand-border)' }}>
        <div className="max-w-[960px] mx-auto px-4 h-11 flex items-center justify-between">
          <button onClick={onClose} className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-wide hover:opacity-70 transition-opacity" style={{ color: 'var(--brand-navy)' }}>
            <ArrowLeft size={14} /> Back to Research
          </button>
          <div className="flex items-center gap-2">
            {(() => { const m = typeMeta[report.type] || { bg: '#f1f5f9', color: '#475569' }; return (
              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-sm" style={{ background: m.bg, color: m.color }}>{report.type}</span>
            ); })()}
            {report.premium && (
              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-sm text-white" style={{ background: 'var(--brand-orange)' }}>Premium</span>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-[960px] mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* ── Article body ── */}
          <article className="lg:col-span-2">
            {/* Header */}
            <div className="mb-7 pb-6 border-b" style={{ borderColor: 'var(--brand-border)' }}>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                {(() => { const m = typeMeta[report.type] || { bg: '#f1f5f9', color: '#475569' }; return (
                  <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-sm" style={{ background: m.bg, color: m.color }}>{report.type}</span>
                ); })()}
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-sm text-white" style={{ background: 'var(--brand-orange)' }}>{report.category}</span>
              </div>
              <h1 className="text-[26px] sm:text-[32px] font-black leading-tight mb-2" style={{ color: 'var(--brand-navy)' }}>{report.title}</h1>
              <p className="text-[15px] mb-4" style={{ color: 'var(--brand-muted)' }}>{report.subtitle}</p>
              <div className="flex flex-wrap items-center gap-4 text-[12px]" style={{ color: 'var(--brand-muted)' }}>
                <span className="flex items-center gap-1.5"><Users size={12} /> {report.author} · {report.authorRole}</span>
                <span className="flex items-center gap-1.5"><Clock size={12} /> {report.readTime}</span>
                <span className="flex items-center gap-1.5"><FileText size={12} /> {report.pages} pages</span>
                <span>{report.publishDate}</span>
              </div>
            </div>

            {/* Hook callout */}
            <div className="rounded-sm border-l-4 px-5 py-4 mb-7" style={{ borderColor: 'var(--brand-orange)', background: '#fff7ed' }}>
              <p className="text-[14px] font-semibold leading-relaxed" style={{ color: 'var(--brand-navy)' }}>{report.hook}</p>
            </div>

            {/* Preview label */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 h-px" style={{ background: 'var(--brand-border)' }} />
              <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full" style={{ background: '#dcfce7', color: '#16a34a' }}>Free Preview</span>
              <div className="flex-1 h-px" style={{ background: 'var(--brand-border)' }} />
            </div>

            {/* Preview content */}
            <div className="max-w-[660px]">
              {report.previewContent.map((block, i) => <Block key={i} block={block} />)}
            </div>

            {/* Paywall or free full content */}
            {report.premium
              ? <ResearchPaywall report={report} onSignIn={onSignIn} />
              : (
                <div className="mt-8 p-5 rounded-sm border" style={{ background: '#f0fdf4', borderColor: '#bbf7d0' }}>
                  <p className="text-[13px] font-bold" style={{ color: '#15803d' }}>This report is free to read in full. <button onClick={onSignIn} className="underline">Sign in</button> to save it to your library.</p>
                </div>
              )
            }
          </article>

          {/* ── Sidebar ── */}
          <aside className="space-y-5">
            {/* Report meta */}
            <div className="rounded-sm border bg-white p-4" style={{ borderColor: 'var(--brand-border)' }}>
              <p className="text-[11px] font-black uppercase tracking-widest mb-3" style={{ color: 'var(--brand-muted)' }}>Report Details</p>
              <div className="space-y-2.5 text-[12px]" style={{ color: 'var(--brand-dark)' }}>
                <div className="flex justify-between"><span style={{ color: 'var(--brand-muted)' }}>Type</span><span className="font-semibold">{report.type}</span></div>
                <div className="flex justify-between"><span style={{ color: 'var(--brand-muted)' }}>Published</span><span className="font-semibold">{report.publishDate}</span></div>
                <div className="flex justify-between"><span style={{ color: 'var(--brand-muted)' }}>Pages</span><span className="font-semibold">{report.pages}</span></div>
                <div className="flex justify-between"><span style={{ color: 'var(--brand-muted)' }}>Read time</span><span className="font-semibold">{report.readTime}</span></div>
                <div className="flex justify-between"><span style={{ color: 'var(--brand-muted)' }}>Access</span>
                  <span className="font-semibold" style={{ color: report.premium ? 'var(--brand-orange)' : '#16a34a' }}>
                    {report.premium ? 'Premium' : 'Free'}
                  </span>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="rounded-sm border bg-white p-4" style={{ borderColor: 'var(--brand-border)' }}>
              <p className="text-[11px] font-black uppercase tracking-widest mb-3" style={{ color: 'var(--brand-muted)' }}>Topics</p>
              <div className="flex flex-wrap gap-1.5">
                {report.tags.map(tag => (
                  <span key={tag} className="text-[11px] px-2 py-0.5 rounded-sm border" style={{ borderColor: 'var(--brand-border)', color: 'var(--brand-muted)' }}>{tag}</span>
                ))}
              </div>
            </div>

            {/* Subscribe CTA */}
            {report.premium && (
              <div className="rounded-sm p-4" style={{ background: 'var(--brand-navy)' }}>
                <p className="text-[10px] font-black uppercase tracking-widest mb-1" style={{ color: 'var(--brand-orange)' }}>DTMI Intelligence</p>
                <p className="text-white font-black text-[13px] mb-2">Unlock 50+ research reports</p>
                <p className="text-[12px] mb-3" style={{ color: '#94a3b8' }}>Full access to every report, whitepaper, and DTMB book.</p>
                <button className="w-full py-2.5 rounded-sm text-white font-black text-[12px] uppercase tracking-wide hover:opacity-90 transition-opacity" style={{ background: 'var(--brand-orange)' }}>
                  Subscribe to Unlock
                </button>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}

/* ── Research card on listing page ── */
function ResearchCard({ report, onOpen }) {
  const m = typeMeta[report.type] || { bg: '#f1f5f9', color: '#475569' };
  return (
    <div onClick={() => onOpen(report)} className="group cursor-pointer bg-white border rounded-sm overflow-hidden card-hover flex flex-col" style={{ borderColor: 'var(--brand-border)' }}>
      <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
        <img src={report.image} alt={report.title} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500" loading="lazy" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(13,27,62,0.85) 0%, rgba(13,27,62,0.2) 60%, transparent 100%)' }} />
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-sm" style={{ background: m.bg, color: m.color }}>{report.type}</span>
          {report.premium && <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-sm text-white" style={{ background: 'var(--brand-orange)' }}>Premium</span>}
        </div>
        {report.featured && (
          <div className="absolute top-3 right-3">
            <span className="flex items-center gap-1 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-sm text-white" style={{ background: 'rgba(0,0,0,0.6)' }}>
              <Star size={9} fill="white" /> Featured
            </span>
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: '#fdba74' }}>{report.category}</p>
        </div>
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-[14px] font-black leading-snug mb-2 group-hover:opacity-80 transition-opacity line-clamp-2" style={{ color: 'var(--brand-navy)' }}>{report.title}</h3>
        <p className="text-[12px] leading-relaxed mb-3 line-clamp-2 flex-1" style={{ color: 'var(--brand-muted)' }}>{report.hook}</p>
        <div className="flex flex-wrap items-center gap-3 mb-3 text-[11px]" style={{ color: 'var(--brand-muted)' }}>
          <span className="flex items-center gap-1"><Clock size={10} /> {report.readTime}</span>
          <span className="flex items-center gap-1"><FileText size={10} /> {report.pages}pp</span>
          <span>{report.publishDate}</span>
        </div>
        <div className="flex items-center justify-between pt-3 border-t" style={{ borderColor: 'var(--brand-border)' }}>
          <span className="text-[11px]" style={{ color: report.premium ? 'var(--brand-orange)' : '#16a34a' }}>
            {report.premium ? 'Subscribers only' : 'Free to read'}
          </span>
          <span className="text-[12px] font-black flex items-center gap-1 group-hover:gap-2 transition-all" style={{ color: 'var(--brand-orange)' }}>
            Read <ChevronRight size={13} />
          </span>
        </div>
      </div>
    </div>
  );
}

/* ── Featured report hero card ── */
function FeaturedCard({ report, onOpen }) {
  const m = typeMeta[report.type] || { bg: '#f1f5f9', color: '#475569' };
  return (
    <div onClick={() => onOpen(report)} className="group cursor-pointer rounded-sm overflow-hidden border card-hover" style={{ borderColor: 'var(--brand-border)' }}>
      <div className="grid grid-cols-1 md:grid-cols-2">
        <div className="relative overflow-hidden" style={{ minHeight: '260px' }}>
          <img src={report.image} alt={report.title} className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500 absolute inset-0" loading="lazy" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(13,27,62,0.7) 0%, transparent 100%)' }} />
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-sm" style={{ background: m.bg, color: m.color }}>{report.type}</span>
            {report.premium && <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-sm text-white" style={{ background: 'var(--brand-orange)' }}>Premium</span>}
          </div>
        </div>
        <div className="p-6 flex flex-col justify-center bg-white">
          <p className="text-[10px] font-black uppercase tracking-widest mb-2" style={{ color: 'var(--brand-orange)' }}>Featured Research · {report.category}</p>
          <h2 className="text-[20px] font-black leading-snug mb-3 group-hover:opacity-80 transition-opacity" style={{ color: 'var(--brand-navy)' }}>{report.title}</h2>
          <p className="text-[13px] leading-relaxed mb-4" style={{ color: 'var(--brand-muted)' }}>{report.hook}</p>
          <div className="flex flex-wrap items-center gap-3 mb-4 text-[12px]" style={{ color: 'var(--brand-muted)' }}>
            <span className="flex items-center gap-1"><Users size={11} /> {report.author}</span>
            <span className="flex items-center gap-1"><Clock size={11} /> {report.readTime}</span>
            <span>{report.publishDate}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[13px] font-black flex items-center gap-1.5" style={{ color: 'var(--brand-orange)' }}>
              Read Report <ArrowRight size={14} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Main ResearchPage ── */
export default function ResearchPage({ onSignIn }) {
  const [openReport, setOpenReport] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeType, setActiveType] = useState('All Types');
  const [searchQuery, setSearchQuery] = useState('');

  if (openReport) {
    return <ReportReader report={openReport} onClose={() => setOpenReport(null)} onSignIn={onSignIn} />;
  }

  const featured = researchReports.filter(r => r.featured);
  const filtered = researchReports.filter(r => {
    const catOk  = activeCategory === 'All' || r.category === activeCategory;
    const typeOk = activeType === 'All Types' || r.type === activeType;
    const q      = searchQuery.toLowerCase();
    const searchOk = !searchQuery || (
      r.title.toLowerCase().includes(q) ||
      r.subtitle?.toLowerCase().includes(q) ||
      r.author.toLowerCase().includes(q) ||
      r.hook?.toLowerCase().includes(q) ||
      r.category.toLowerCase().includes(q) ||
      r.type.toLowerCase().includes(q) ||
      r.tags?.some(t => t.toLowerCase().includes(q))
    );
    return catOk && typeOk && searchOk;
  });

  return (
    <div style={{ background: 'var(--brand-light)' }} className="min-h-screen">

      {/* ── Hero ── */}
      <div style={{ background: 'var(--brand-navy)' }} className="border-b border-white/5">
        <div className="max-w-[1280px] mx-auto px-4 py-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">

            {/* Left: text */}
            <div className="max-w-[560px]">
              <p className="text-[11px] font-black uppercase tracking-widest mb-2" style={{ color: 'var(--brand-orange)' }}>DTMI Research Library</p>
              <h1 className="text-[30px] sm:text-[38px] font-black leading-tight text-white mb-3">
                Intelligence that drives decisions
              </h1>
              <p className="text-[14px] leading-relaxed mb-6" style={{ color: '#94a3b8' }}>
                Whitepapers, research reports, policy briefs, and industry analyses from the DigitalQatalyst think-tank — the primary source of intelligence for digital transformation leaders worldwide.
              </p>
              <div className="flex flex-wrap gap-4 text-[13px]" style={{ color: '#64748b' }}>
                <span className="flex items-center gap-1.5"><FileText size={13} /> {researchReports.length} reports published</span>
                <span className="flex items-center gap-1.5"><BookOpen size={13} /> 6 research categories</span>
                <span className="flex items-center gap-1.5"><Users size={13} /> DTMI Research Desk</span>
              </div>
            </div>

            {/* Right: report image collage */}
            <div className="shrink-0 hidden sm:flex items-end gap-3">
              {researchReports.slice(0, 5).map((r, i) => {
                const rotations = [-4, 2, -2, 3, -1];
                const scales    = [1, 0.95, 1.02, 0.97, 1];
                const zIndexes  = [2, 4, 3, 5, 1];
                const typeMeta_ = {
                  'Whitepaper':         { bg: '#7c3aed' },
                  'Research Report':    { bg: '#0369a1' },
                  'Policy Brief':       { bg: '#a16207' },
                  'Industry Analysis':  { bg: '#15803d' },
                  'Market Intelligence':{ bg: '#c2410c' },
                  'Thought Leadership': { bg: '#9d174d' },
                };
                const accent = (typeMeta_[r.type] || { bg: 'var(--brand-orange)' }).bg;
                return (
                  <div
                    key={r.id}
                    onClick={() => setOpenReport(r)}
                    className="cursor-pointer hover:scale-105 transition-transform duration-200"
                    style={{
                      transform: `rotate(${rotations[i]}deg) scale(${scales[i]})`,
                      zIndex: zIndexes[i],
                      position: 'relative',
                    }}
                  >
                    {/* Report cover card */}
                    <div
                      className="rounded-sm overflow-hidden shadow-xl"
                      style={{ width: '110px', height: '148px', position: 'relative' }}
                    >
                      {/* Background image */}
                      <img
                        src={r.image}
                        alt={r.title}
                        className="w-full h-full object-cover"
                        style={{ filter: 'brightness(0.45)' }}
                      />
                      {/* Overlay content */}
                      <div className="absolute inset-0 flex flex-col justify-between p-2.5">
                        {/* Type badge */}
                        <span
                          className="text-[7px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-sm self-start"
                          style={{ background: accent, color: 'white' }}
                        >
                          {r.type.split(' ')[0]}
                        </span>
                        {/* Title */}
                        <div>
                          <p
                            className="text-white font-black leading-tight"
                            style={{ fontSize: '9px', lineHeight: 1.25 }}
                          >
                            {r.title.length > 45 ? r.title.slice(0, 45) + '…' : r.title}
                          </p>
                          <p className="mt-1" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '7px' }}>
                            {r.author}
                          </p>
                        </div>
                      </div>
                      {/* Left spine */}
                      <div className="absolute left-0 top-0 bottom-0 w-1" style={{ background: accent }} />
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 py-8">

        {/* ── Featured reports ── */}
        {featured.length > 0 && (
          <section className="mb-10">
            <div className="flex items-center gap-3 mb-5">
              <h2 className="text-[16px] font-black" style={{ color: 'var(--brand-navy)' }}>Featured Research</h2>
              <div className="flex-1 h-px" style={{ background: 'var(--brand-border)' }} />
            </div>
            <div className="space-y-5">
              {featured.map(r => <FeaturedCard key={r.id} report={r} onOpen={setOpenReport} />)}
            </div>
          </section>
        )}

        {/* ── Search bar ── */}
        <div className="w-full mb-6">
          <PageSearch
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search reports, authors, topics, tags..."
            resultCount={searchQuery ? filtered.length : undefined}
            totalCount={researchReports.length}
          />
        </div>

        {/* ── Filters ── */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[11px] font-black uppercase tracking-widest flex items-center gap-1.5" style={{ color: 'var(--brand-muted)' }}>
              <Filter size={11} /> Category
            </span>
            {researchCategories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="text-[11px] font-semibold px-3 py-1.5 rounded-sm border transition-colors"
                style={{
                  background: activeCategory === cat ? 'var(--brand-navy)' : 'white',
                  color: activeCategory === cat ? 'white' : 'var(--brand-muted)',
                  borderColor: activeCategory === cat ? 'var(--brand-navy)' : 'var(--brand-border)',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* ── All reports grid ── */}
        <div className="flex items-center gap-3 mb-5">
          <h2 className="text-[16px] font-black" style={{ color: 'var(--brand-navy)' }}>
            All Research {activeCategory !== 'All' && <span style={{ color: 'var(--brand-orange)' }}>· {activeCategory}</span>}
          </h2>
          <div className="flex-1 h-px" style={{ background: 'var(--brand-border)' }} />
          <span className="text-[12px]" style={{ color: 'var(--brand-muted)' }}>{filtered.length} reports</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(r => <ResearchCard key={r.id} report={r} onOpen={setOpenReport} />)}
        </div>

        {/* ── Subscribe banner ── */}
        <div className="mt-12 rounded-sm overflow-hidden border" style={{ borderColor: 'var(--brand-border)' }}>
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="md:col-span-2 p-8" style={{ background: 'var(--brand-navy)' }}>
              <p className="text-[11px] font-black uppercase tracking-widest mb-2" style={{ color: 'var(--brand-orange)' }}>DTMI Intelligence Subscription</p>
              <h3 className="text-white text-[22px] font-black mb-2">Unlock every report. Every insight. Every book.</h3>
              <p className="text-[14px] leading-relaxed mb-5" style={{ color: '#94a3b8' }}>
                Subscribe to DTMI Intelligence and get full access to all research reports, whitepapers, DTMB books, the Intelligence Feed, and the AI Insight Engine.
              </p>
              <div className="flex flex-wrap gap-3">
                <button className="px-6 py-3 rounded-sm text-white font-black text-[13px] uppercase tracking-wide hover:opacity-90 transition-opacity" style={{ background: 'var(--brand-orange)' }}>
                  Subscribe Now
                </button>
                <button onClick={onSignIn} className="px-6 py-3 rounded-sm font-black text-[13px] uppercase tracking-wide border border-white/20 text-white hover:bg-white/5 transition-colors">
                  Sign In
                </button>
              </div>
            </div>
            <div className="p-8 flex flex-col justify-center gap-3" style={{ background: '#0a1628' }}>
              {['50+ research reports & whitepapers', 'All 4 DTMB volumes', 'Real-time Intelligence Feed', 'AI Insight Engine access', 'Weekly executive briefing'].map(f => (
                <div key={f} className="flex items-center gap-2.5 text-[13px]" style={{ color: '#e2e8f0' }}>
                  <span className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 text-[9px] font-black text-white" style={{ background: 'var(--brand-orange)' }}>✓</span>
                  {f}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
