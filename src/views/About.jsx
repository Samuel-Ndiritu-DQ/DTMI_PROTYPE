import { Zap, BookOpen, Radio, BarChart2, Users, ArrowRight } from 'lucide-react';
import PageMeta from '../components/PageMeta';
import { pageMeta } from '../data/mockData';

const team = [
  { name: "Dr Stephane Niango",  role: "Research Director · 6xD | Economy 4.0 | DCO | DBP",   type: "Research Leadership" },
  { name: "Kaylynn Oceanne",     role: "Research Methods & Cognitive Analysis · Digital Worker", type: "Research Leadership" },
  { name: "Sharavi Ravi",        role: "DBP Platforms · AI Builders · AI DevOps",               type: "HI Analyst" },
  { name: "Bilal Waqar",         role: "DBP Platforms · DT2.0 · DTMP",                          type: "HI Analyst" },
  { name: "Mark Kerry",          role: "DBP Platforms · TMaaS",                                  type: "HI Analyst" },
  { name: "Carimi Medah",        role: "Editorial Writer (Lead)",                                type: "Editorial" },
  { name: "Hellen Mweu",         role: "Editorial Writer",                                       type: "Editorial" },
  { name: "Devin Rajapkse",      role: "Editorial Writer (AI Curator) · Research Curator Agent", type: "Editorial" },
];

const zones = [
  {
    label: "Zone A",
    name: "Broadcast Ecosystem",
    icon: Radio,
    color: "var(--brand-teal)",
    desc: "Generates attention and traffic through LinkedIn, X, Instagram, YouTube Shorts, Medium, and Substack. Insight snippets, quote cards, trend alerts, and narrative essays.",
  },
  {
    label: "Zone B",
    name: "Knowledge Hub (DTMI)",
    icon: BookOpen,
    color: "var(--brand-orange)",
    desc: "The intellectual center. Four progressive layers: Signal → Insight → Deep Analysis → DTMB Books. Organized by 6xD domains, Economy 4.0 sectors, and DBP technology taxonomy.",
  },
  {
    label: "Zone C",
    name: "Conversion Flow",
    icon: BarChart2,
    color: "#8b5cf6",
    desc: "Transforms readers into engaged members, clients, and partners through CRM-driven nurturing, advisory offerings, and business development pipelines.",
  },
];

const pillars = [
  { code: "D1", name: "Digital Economy",              color: "#8b5cf6", desc: "Economy 4.0 & platform models" },
  { code: "D2", name: "DCO",                          color: "#0a7ea4", desc: "Digital Cognitive Organizations" },
  { code: "D3", name: "Digital Business Platforms",   color: "#f59e0b", desc: "DBP architecture & ecosystems" },
  { code: "D4", name: "Digital Transformation 2.0",   color: "#10b981", desc: "DT2.0 strategy & execution" },
  { code: "D5", name: "Digital Worker & Workspace",   color: "#e8500a", desc: "Future of work & digital talent" },
  { code: "D6", name: "Digital Accelerators",         color: "#ec4899", desc: "AI, automation & emerging tech" },
];

export default function About() {
  return (
    <div style={{ background: 'var(--brand-light)' }} className="min-h-screen">
      <PageMeta meta={pageMeta.About} />

      {/* Hero */}
      <div style={{ background: 'var(--brand-navy)' }} className="py-16">
        <div className="max-w-[1280px] mx-auto px-4">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-sm flex items-center justify-center" style={{ background: 'var(--brand-orange)' }}>
                <Zap size={15} className="text-white" fill="white" />
              </div>
              <span className="text-[11px] font-black uppercase tracking-widest" style={{ color: 'var(--brand-teal)' }}>DigitalQatalyst Think-Tank</span>
            </div>
            <h1 className="text-white text-3xl lg:text-4xl font-black leading-tight mb-4">
              Where transformation leaders find{' '}
              <span style={{ color: 'var(--brand-orange)' }}>clarity, signal,</span>{' '}
              and strategy.
            </h1>
            <p className="text-[#94a3b8] text-[15px] leading-relaxed mb-6 max-w-2xl">
              DTMI is the primary knowledge platform of DigitalQatalyst — a global think-tank examining how organizations across sectors are adapting to the new dynamics of technology-driven economic transformation. We produce, distribute, and amplify research on Digital Cognitive Organizations and the wider Digital Economy.
            </p>
            <div className="flex gap-3">
              <button className="btn-orange px-5 py-2.5 rounded-sm text-[13px] font-black uppercase tracking-wide">
                Explore Intelligence
              </button>
              <button className="px-5 py-2.5 rounded-sm text-[13px] font-bold uppercase tracking-wide text-white border border-white/20 hover:bg-white/5 transition-colors">
                Subscribe Free
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 py-12 space-y-14">

        {/* TT.CS Pipeline */}
        <section>
          <p className="text-[11px] font-black uppercase tracking-widest mb-2" style={{ color: 'var(--brand-orange)' }}>Framework</p>
          <h2 className="text-2xl font-black mb-2" style={{ color: 'var(--brand-navy)' }}>The DQ DTMI Think-Tank Content Stack</h2>
          <p className="text-[14px] leading-relaxed mb-8 max-w-2xl" style={{ color: 'var(--brand-muted)' }}>
            The TT.CS provides the structural architecture through which DigitalQatalyst research moves from intellectual production to global influence — connecting the DTMI editorial engine with distribution channels and engagement systems.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {zones.map((zone) => {
              const Icon = zone.icon;
              return (
                <div key={zone.label} className="bg-white border rounded-sm p-5 card-hover" style={{ borderColor: 'var(--brand-border)' }}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-sm flex items-center justify-center" style={{ background: zone.color + '18', border: `1px solid ${zone.color}33` }}>
                      <Icon size={16} style={{ color: zone.color }} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-wider" style={{ color: zone.color }}>{zone.label}</p>
                      <p className="text-[13px] font-black" style={{ color: 'var(--brand-navy)' }}>{zone.name}</p>
                    </div>
                  </div>
                  <p className="text-[12px] leading-relaxed" style={{ color: 'var(--brand-muted)' }}>{zone.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* 6xD Domains */}
        <section>
          <p className="text-[11px] font-black uppercase tracking-widest mb-2" style={{ color: 'var(--brand-orange)' }}>Research Taxonomy</p>
          <h2 className="text-2xl font-black mb-2" style={{ color: 'var(--brand-navy)' }}>The DQ 6xD Framework</h2>
          <p className="text-[14px] leading-relaxed mb-8 max-w-2xl" style={{ color: 'var(--brand-muted)' }}>
            Originally conceptualised by Dr Stephane Niango, the 6xD framework defines the six strategic domains structuring all DigitalQatalyst research and insight publications.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {pillars.map((p) => (
              <div key={p.code} className="bg-white border rounded-sm p-4 text-center card-hover cursor-pointer" style={{ borderColor: 'var(--brand-border)' }}>
                <div className="w-10 h-10 rounded-sm flex items-center justify-center mx-auto mb-3" style={{ background: p.color + '18', border: `1px solid ${p.color}33` }}>
                  <span className="text-[11px] font-black" style={{ color: p.color }}>{p.code}</span>
                </div>
                <p className="text-[12px] font-black leading-tight mb-1" style={{ color: 'var(--brand-navy)' }}>{p.name}</p>
                <p className="text-[10px]" style={{ color: 'var(--brand-muted)' }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Content decomposition */}
        <section className="bg-white border rounded-sm p-6" style={{ borderColor: 'var(--brand-border)' }}>
          <p className="text-[11px] font-black uppercase tracking-widest mb-2" style={{ color: 'var(--brand-orange)' }}>Editorial Model</p>
          <h2 className="text-xl font-black mb-2" style={{ color: 'var(--brand-navy)' }}>1 Research Asset → 8–20 Editorial Artefacts</h2>
          <p className="text-[13px] leading-relaxed mb-6 max-w-2xl" style={{ color: 'var(--brand-muted)' }}>
            Every flagship research paper generates a portfolio of derivative editorial outputs distributed across multiple channels and formats — maximizing reach, lifespan, and strategic influence.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              "Executive Briefs", "Insight Articles", "Framework Explainers", "Narrative Essays",
              "Social Insight Posts", "Newsletter Briefings", "Visual Frameworks", "Short Video Explainers",
              "Quote Cards", "Research Highlights", "Podcast Topics", "Infographic Summaries",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2 text-[12px]" style={{ color: 'var(--brand-navy)' }}>
                <ArrowRight size={10} style={{ color: 'var(--brand-orange)' }} className="shrink-0" />
                {item}
              </div>
            ))}
          </div>
        </section>

        {/* Team */}
        <section>
          <p className="text-[11px] font-black uppercase tracking-widest mb-2" style={{ color: 'var(--brand-orange)' }}>Editorial Squads</p>
          <h2 className="text-2xl font-black mb-6" style={{ color: 'var(--brand-navy)' }}>The DTMI Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {team.map((member) => (
              <div key={member.name} className="bg-white border rounded-sm p-4 card-hover" style={{ borderColor: 'var(--brand-border)' }}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center mb-3 font-black text-white text-[14px]" style={{ background: 'var(--brand-navy)' }}>
                  {member.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                </div>
                <p className="text-[13px] font-bold mb-0.5" style={{ color: 'var(--brand-navy)' }}>{member.name}</p>
                <p className="text-[10px] leading-snug mb-2" style={{ color: 'var(--brand-muted)' }}>{member.role}</p>
                <span className="inline-block text-[9px] font-black px-2 py-0.5 rounded-sm uppercase tracking-wider" style={{ background: 'var(--brand-orange)', color: 'white' }}>
                  {member.type}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* KPI targets */}
        <section style={{ background: 'var(--brand-navy)' }} className="rounded-sm p-8">
          <p className="text-[11px] font-black uppercase tracking-widest mb-2" style={{ color: 'var(--brand-orange)' }}>KPI Targets</p>
          <h2 className="text-white text-2xl font-black mb-6">DTMI Growth Metrics</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { metric: "Monthly Readers",    target: "100K",  label: "Traffic" },
              { metric: "Annual Readers",     target: "1M",    label: "Traffic" },
              { metric: "Newsletter Open Rate",target: "40%",  label: "Engagement" },
              { metric: "Avg Read Time",      target: "4–6 min",label: "Engagement" },
            ].map((kpi) => (
              <div key={kpi.metric} className="text-center p-4 rounded-sm" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="text-2xl font-black mb-1" style={{ color: 'var(--brand-orange)' }}>{kpi.target}</div>
                <div className="text-white text-[12px] font-semibold">{kpi.metric}</div>
                <div className="text-[10px] mt-0.5" style={{ color: 'var(--brand-teal)' }}>{kpi.label}</div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
