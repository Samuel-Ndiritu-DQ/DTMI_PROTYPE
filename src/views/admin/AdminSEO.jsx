import { useState } from 'react';
import { Search, AlertCircle, CheckCircle, XCircle, TrendingUp, ExternalLink, Edit2 } from 'lucide-react';

const SEO_PAGES = [
  { url: '/articles/ai-adoption-2026',        title: 'AI adoption accelerates by 15%',          score: 94, issues: 0,  status: 'Good',    metaDesc: true,  h1: true,  canonical: true,  speed: 92 },
  { url: '/articles/eu-ai-act-compliance',     title: 'EU AI Act: compliance checklist',          score: 88, issues: 1,  status: 'Good',    metaDesc: true,  h1: true,  canonical: true,  speed: 87 },
  { url: '/articles/zero-trust-remote-work',   title: 'Zero-Trust in the Age of Remote Work',     score: 76, issues: 2,  status: 'Warning', metaDesc: false, h1: true,  canonical: true,  speed: 78 },
  { url: '/articles/economy-4-growth-2026',    title: 'Economy 4.0 Growth Projections',           score: 82, issues: 1,  status: 'Good',    metaDesc: true,  h1: true,  canonical: false, speed: 85 },
  { url: '/articles/dco-new-benchmark',        title: 'Digital-Centered Organizations Benchmark', score: 61, issues: 3,  status: 'Warning', metaDesc: false, h1: false, canonical: true,  speed: 64 },
  { url: '/articles/ai-regulation-executives', title: 'AI Regulation: What Executives Need',      score: 45, issues: 5,  status: 'Error',   metaDesc: false, h1: false, canonical: false, speed: 48 },
  { url: '/multimedia/podcasts',               title: 'DTMI Podcasts',                            score: 71, issues: 2,  status: 'Warning', metaDesc: true,  h1: true,  canonical: true,  speed: 73 },
  { url: '/intelligence/signal',               title: 'Signal Intelligence Feed',                 score: 89, issues: 0,  status: 'Good',    metaDesc: true,  h1: true,  canonical: true,  speed: 91 },
];

const KEYWORDS = [
  { keyword: 'digital transformation 2026',    position: 3,  volume: '12,400', change: +2,  difficulty: 'Medium' },
  { keyword: 'DCO framework',                  position: 1,  volume: '3,200',  change: 0,   difficulty: 'Low'    },
  { keyword: 'AI adoption enterprise',         position: 7,  volume: '8,900',  change: -1,  difficulty: 'High'   },
  { keyword: 'EU AI Act compliance',           position: 4,  volume: '6,100',  change: +3,  difficulty: 'Medium' },
  { keyword: 'zero trust architecture 2026',   position: 5,  volume: '4,800',  change: +1,  difficulty: 'Medium' },
  { keyword: 'economy 4.0 definition',         position: 2,  volume: '2,900',  change: +1,  difficulty: 'Low'    },
  { keyword: 'digital cognitive organization', position: 1,  volume: '1,400',  change: 0,   difficulty: 'Low'    },
  { keyword: 'digital transformation podcast', position: 12, volume: '5,600',  change: -3,  difficulty: 'High'   },
];

const STATUS_STYLES = {
  Good:    { color: '#10b981', bg: 'rgba(16,185,129,0.15)',  icon: CheckCircle },
  Warning: { color: '#f59e0b', bg: 'rgba(245,158,11,0.15)',  icon: AlertCircle },
  Error:   { color: '#ef4444', bg: 'rgba(239,68,68,0.15)',   icon: XCircle },
};

function ScoreBar({ score }) {
  const color = score >= 80 ? '#10b981' : score >= 60 ? '#f59e0b' : '#ef4444';
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 rounded-full" style={{ background: '#f1f5f9' }}>
        <div className="h-full rounded-full" style={{ width: `${score}%`, background: color }} />
      </div>
      <span className="text-[11px] font-bold w-6 text-right" style={{ color }}>{score}</span>
    </div>
  );
}

export default function AdminSEO() {
  const [activeTab, setActiveTab] = useState('pages');
  const [editPage, setEditPage] = useState(null);

  const good    = SEO_PAGES.filter(p => p.status === 'Good').length;
  const warning = SEO_PAGES.filter(p => p.status === 'Warning').length;
  const error   = SEO_PAGES.filter(p => p.status === 'Error').length;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-[#0d1b3e] text-[16px] font-bold">SEO Management</h2>
          <p className="text-[#64748b] text-[11px]">Page scores, keywords, and optimization issues</p>
        </div>
        <div className="flex gap-1 rounded-lg p-1" style={{ background: 'white' }}>
          {['pages', 'keywords', 'settings'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`px-3 py-1.5 rounded-md text-[11px] font-semibold capitalize transition-colors ${activeTab === tab ? 'text-white' : 'text-[#64748b] hover:text-white'}`} style={activeTab === tab ? { background: 'var(--brand-orange)' } : {}}>
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Good',    count: good,    color: '#10b981', icon: CheckCircle },
          { label: 'Warning', count: warning, color: '#f59e0b', icon: AlertCircle },
          { label: 'Error',   count: error,   color: '#ef4444', icon: XCircle },
        ].map(s => (
          <div key={s.label} className="rounded-xl p-4 flex items-center gap-3" style={{ background: 'white', border: '1px solid #e2e8f0' }}>
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: s.color + '22' }}>
              <s.icon size={16} style={{ color: s.color }} />
            </div>
            <div>
              <p className="text-[#0d1b3e] text-xl font-black">{s.count}</p>
              <p className="text-[#64748b] text-[10px]">{s.label} pages</p>
            </div>
          </div>
        ))}
      </div>

      {activeTab === 'pages' && (
        <div className="rounded-xl overflow-hidden" style={{ background: 'white', border: '1px solid #e2e8f0' }}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                  {['Page', 'SEO Score', 'Status', 'Meta Desc', 'H1', 'Canonical', 'Speed', ''].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-[10px] font-black uppercase tracking-wider text-[#94a3b8] bg-[#f8fafc] bg-[#f8fafc]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SEO_PAGES.map((page, i) => {
                  const ss = STATUS_STYLES[page.status];
                  const StatusIcon = ss.icon;
                  return (
                    <tr key={page.url} className="hover:bg-slate-50 transition-colors" style={{ borderBottom: i < SEO_PAGES.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
                      <td className="px-4 py-3">
                        <p className="text-[#0d1b3e] text-[12px] font-semibold truncate max-w-[200px]">{page.title}</p>
                        <p className="text-[#475569] text-[10px] font-mono">{page.url}</p>
                      </td>
                      <td className="px-4 py-3 w-32"><ScoreBar score={page.score} /></td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          <StatusIcon size={12} style={{ color: ss.color }} />
                          <span className="text-[11px] font-semibold" style={{ color: ss.color }}>{page.status}</span>
                          {page.issues > 0 && <span className="text-[9px] font-black px-1.5 py-0.5 rounded-full text-white" style={{ background: ss.color }}>{page.issues}</span>}
                        </div>
                      </td>
                      {[page.metaDesc, page.h1, page.canonical].map((v, j) => (
                        <td key={j} className="px-4 py-3">
                          {v ? <CheckCircle size={13} className="text-emerald-400" /> : <XCircle size={13} className="text-red-400" />}
                        </td>
                      ))}
                      <td className="px-4 py-3"><ScoreBar score={page.speed} /></td>
                      <td className="px-4 py-3">
                        <button onClick={() => setEditPage(page)} className="p-1.5 rounded-md text-[#64748b] hover:text-white hover:bg-slate-100 transition-colors"><Edit2 size={13} /></button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'keywords' && (
        <div className="rounded-xl overflow-hidden" style={{ background: 'white', border: '1px solid #e2e8f0' }}>
          <table className="w-full">
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                {['Keyword', 'Position', 'Search Volume', 'Change', 'Difficulty'].map(h => (
                  <th key={h} className="text-left px-4 py-3 text-[10px] font-black uppercase tracking-wider text-[#94a3b8] bg-[#f8fafc] bg-[#f8fafc]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {KEYWORDS.map((kw, i) => (
                <tr key={kw.keyword} className="hover:bg-slate-50 transition-colors" style={{ borderBottom: i < KEYWORDS.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
                  <td className="px-4 py-3"><span className="text-[#1e293b] text-[12px] font-semibold">{kw.keyword}</span></td>
                  <td className="px-4 py-3">
                    <span className="text-[13px] font-black" style={{ color: kw.position <= 3 ? '#10b981' : kw.position <= 10 ? '#f59e0b' : '#ef4444' }}>
                      #{kw.position}
                    </span>
                  </td>
                  <td className="px-4 py-3"><span className="text-[#475569] text-[11px]">{kw.volume}/mo</span></td>
                  <td className="px-4 py-3">
                    <span className={`text-[11px] font-bold flex items-center gap-1 ${kw.change > 0 ? 'text-emerald-400' : kw.change < 0 ? 'text-red-400' : 'text-[#64748b]'}`}>
                      {kw.change > 0 ? '–²' : kw.change < 0 ? '–¼' : '€”'} {Math.abs(kw.change) || ''}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      kw.difficulty === 'Low' ? 'text-emerald-400 bg-emerald-400/15' :
                      kw.difficulty === 'Medium' ? 'text-amber-400 bg-amber-400/15' :
                      'text-red-400 bg-red-400/15'
                    }`}>{kw.difficulty}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'settings' && (
        <div className="space-y-4">
          {[
            { label: 'Site Title',       value: 'DTMI €” Digital Transformation Management Intelligence' },
            { label: 'Meta Description', value: 'Real-time digital transformation insights for executives, transformation leaders, and consultants.' },
            { label: 'Canonical Domain', value: 'https://dtmi.digitalqatalyst.com' },
            { label: 'Robots.txt',       value: 'Allow all crawlers' },
            { label: 'Sitemap URL',      value: 'https://dtmi.digitalqatalyst.com/sitemap.xml' },
          ].map(field => (
            <div key={field.label} className="rounded-xl p-4" style={{ background: 'white', border: '1px solid #e2e8f0' }}>
              <label className="text-[#64748b] text-[10px] font-semibold uppercase tracking-wider block mb-2">{field.label}</label>
              <input
                defaultValue={field.value}
                className="w-full rounded-md px-3 py-2 text-[#0d1b3e] text-[12px] focus:outline-none"
                style={{ background: '#f1f5f9', border: '1px solid #e2e8f0' }}
              />
            </div>
          ))}
          <button className="px-5 py-2.5 rounded-md text-[#0d1b3e] text-[12px] font-bold" style={{ background: 'var(--brand-orange)' }}>
            Save SEO Settings
          </button>
        </div>
      )}

      {/* Edit modal */}
      {editPage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70" onClick={() => setEditPage(null)}>
          <div className="rounded-xl p-6 w-full max-w-lg space-y-4" style={{ background: 'white', border: '1px solid #e2e8f0' }} onClick={e => e.stopPropagation()}>
            <h3 className="text-[#0d1b3e] text-[14px] font-bold">Edit SEO €” {editPage.title}</h3>
            {[
              { label: 'Page Title',       value: editPage.title },
              { label: 'Meta Description', value: 'Enter meta description...' },
              { label: 'Canonical URL',    value: `https://dtmi.digitalqatalyst.com${editPage.url}` },
              { label: 'Focus Keyword',    value: '' },
            ].map(f => (
              <div key={f.label}>
                <label className="text-[#64748b] text-[10px] font-semibold uppercase tracking-wider block mb-1">{f.label}</label>
                <input defaultValue={f.value} className="w-full rounded-md px-3 py-2 text-[#0d1b3e] text-[12px] focus:outline-none" style={{ background: '#f1f5f9', border: '1px solid #e2e8f0' }} />
              </div>
            ))}
            <div className="flex gap-2 pt-2">
              <button className="px-4 py-2 rounded-md text-[#0d1b3e] text-[12px] font-bold" style={{ background: 'var(--brand-orange)' }} onClick={() => setEditPage(null)}>Save Changes</button>
              <button className="px-4 py-2 rounded-md text-[#94a3b8] text-[12px] font-bold hover:text-white transition-colors" style={{ background: '#f1f5f9' }} onClick={() => setEditPage(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}







