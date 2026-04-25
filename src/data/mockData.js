// --- BREAKING NEWS BANNER ----------------------------------------------------
export const breakingNews = [
  "BREAKING: Global AI Adoption Index surges to record 61% — fastest quarterly growth in history",
  "LIVE UPDATES: EU AI Act enforcement begins Q3 2026 — non-compliant firms face 6% revenue fines",
  "ALERT: Cybersecurity breach incidents rise 23% YoY as zero-trust adoption lags in enterprise",
  "DEVELOPING: Economy 4.0 projected to add $4.2 trillion to global GDP by 2028, IMF report says",
];

// --- TICKER ITEMS ------------------------------------------------------------
export const tickerItems = [
  { label: "DTI GLOBAL INDEX", value: "4,821", change: "+2.5%", up: true },
  { label: "AI ADOPTION", value: "61%", change: "+4.1%", up: true },
  { label: "CLOUD INDEX", value: "3,102", change: "+1.8%", up: true },
  { label: "CYBER RISK", value: "HIGH", change: "-1.2%", up: false },
  { label: "GOV READINESS", value: "55%", change: "+0.7%", up: true },
  { label: "DIGITAL MATURITY", value: "73/100", change: "+3.2 pts", up: true },
  { label: "TRANSFORMATION VELOCITY", value: "42%", change: "+12% QoQ", up: true },
  { label: "ECONOMY 4.0 GROWTH", value: "+5%", change: "YoY", up: true },
];

// --- NAV STRUCTURE (mega-menu) -----------------------------------------------
// Top-level items. items with `children` render a mega-menu dropdown.
export const navItems = [
  { label: "Home",       key: "Latest" },
  {
    label: "Intelligence",
    key: "intelligence",
    children: [
      {
        heading: "Knowledge Layers",
        links: [
          { label: "Signal",        key: "Signal",       desc: "Early signals & trend alerts" },
          { label: "Insight",       key: "Insight",      desc: "Analysis & framework explainers" },
          { label: "Deep Analysis", key: "Deep Analysis",desc: "Whitepapers, essays & research" },
          { label: "Research",      key: "Research",     desc: "Reports, whitepapers & policy briefs" },
          { label: "Books",         key: "Books",        desc: "DTMB flagship research volumes" },
        ],
      },
      {
        heading: "Live Tools",
        links: [
          { label: "Intelligence Feed", key: "Intelligence Feed", desc: "Real-time transformation signals" },
          { label: "Trend Radar",       key: "Trend Radar",       desc: "Tech adoption & disruption map" },
          { label: "AI Engine",         key: "AI Engine",         desc: "Query DTMI AI for insights" },
        ],
      },
    ],
  },
  {
    label: "6xD Domains",
    key: "6xd",
    children: [
      {
        heading: "Strategic Domains",
        links: [
          { label: "D1 — Digital Economy",        key: "D1", desc: "Economy 4.0 & platform models" },
          { label: "D2 — DCO",                    key: "D2", desc: "Digital Cognitive Organizations" },
          { label: "D3 — Digital Business Platforms", key: "D3", desc: "DBP architecture & ecosystems" },
          { label: "D4 — Digital Transformation 2.0", key: "D4", desc: "DT2.0 strategy & execution" },
          { label: "D5 — Digital Worker & Workspace", key: "D5", desc: "Future of work & digital talent" },
          { label: "D6 — Digital Accelerators",   key: "D6", desc: "AI, automation & emerging tech" },
        ],
      },
    ],
  },
  {
    label: "Sectors",
    key: "sectors",
    children: [
      {
        heading: "Cross-Sector",
        links: [
          { label: "Economy 4.0",    key: "Economy 4.0" },
          { label: "Experience 4.0", key: "Experience 4.0" },
          { label: "Intelligence 4.0",key: "Intelligence 4.0" },
          { label: "Workspace 4.0",  key: "Workspace 4.0" },
        ],
      },
      {
        heading: "Primary & Secondary",
        links: [
          { label: "Mining 4.0",      key: "Mining 4.0" },
          { label: "Farming 4.0",     key: "Farming 4.0" },
          { label: "Plant 4.0",       key: "Plant 4.0" },
          { label: "Logistics 4.0",   key: "Logistics 4.0" },
          { label: "Infrastructure 4.0", key: "Infrastructure 4.0" },
        ],
      },
      {
        heading: "Tertiary & Quaternary",
        links: [
          { label: "Government 4.0",  key: "Government 4.0" },
          { label: "Services 4.0",    key: "Services 4.0" },
          { label: "Retail 4.0",      key: "Retail 4.0" },
          { label: "Hospitality 4.0", key: "Hospitality 4.0" },
          { label: "Wellness 4.0",    key: "Wellness 4.0" },
        ],
      },
    ],
  },
  {
    label: "Technology",
    key: "technology",
    children: [
      {
        heading: "Platform 01 — DXP",
        links: [
          { label: "Digital Channels",   key: "DXP-Channels" },
          { label: "Digital Experience", key: "DXP-Experience" },
          { label: "Digital Services",   key: "DXP-Services" },
          { label: "Digital MarCom",     key: "DXP-MarCom" },
        ],
      },
      {
        heading: "Platform 02 — DWS",
        links: [
          { label: "Digital Workspace",  key: "DWS-Workspace" },
          { label: "Digital Core (ERP)", key: "DWS-Core" },
          { label: "Digital GPRC",       key: "DWS-GPRC" },
          { label: "Digital Back Office",key: "DWS-BackOffice" },
        ],
      },
      {
        heading: "Platform 03 — DIA",
        links: [
          { label: "Digital Analytics",     key: "DIA-Analytics" },
          { label: "Digital Intelligence (AI)", key: "DIA-AI" },
        ],
      },
      {
        heading: "Platform 04 — SDO",
        links: [
          { label: "Digital IT (Cloud)",       key: "SDO-IT" },
          { label: "Digital Interoperability", key: "SDO-Interop" },
          { label: "Digital Security",         key: "SDO-Security" },
        ],
      },
    ],
  },
  {
    label: "Multimedia",
    key: "Multimedia",
  },
  {
    label: "About",
    key: "About",
  },
];

// Flat list of all navigable keys (for routing)
export const navSections = navItems.flatMap(item =>
  item.children
    ? item.children.flatMap(g => g.links.map(l => l.key))
    : [item.key]
);

// --- HERO STORY --------------------------------------------------------------
export const heroStory = {
  id: "hero-1",
  category: "AI & AUTOMATION",
  headline: "AI adoption has accelerated by 15% in the past quarter — and it's reshaping every industry on the planet",
  summary: "From manufacturing floors to government ministries, generative AI is no longer a pilot program. It's the operating system of the modern enterprise. DTMI's latest intelligence report reveals the winners, the laggards, and what executives must do now.",
  label: "EXCLUSIVE ANALYSIS",
  timestamp: "Updated 4 minutes ago",
  readTime: "8 min read",
  author: "DTMI Research Desk",
  image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&q=80",
  tag: "MUST READ",
};

// --- HERO SIDEBAR STORIES ----------------------------------------------------
export const heroSideStories = [
  {
    id: "side-1",
    category: "CYBERSECURITY",
    headline: "Zero-trust is no longer optional — 74% of enterprises operating hybrid workforces now require it",
    timestamp: "12 minutes ago",
    severity: "Critical",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&q=80",
  },
  {
    id: "side-2",
    category: "CLOUD",
    headline: "Multi-cloud strategy cuts operational costs by 18% — but complexity is the hidden price",
    timestamp: "28 minutes ago",
    severity: "Medium",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&q=80",
  },
  {
    id: "side-3",
    category: "GOVERNANCE",
    headline: "EU AI Act compliance deadline looms: what every executive needs to know before Q3 2026",
    timestamp: "45 minutes ago",
    severity: "High",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&q=80",
  },
  {
    id: "side-4",
    category: "DIGITAL ECONOMY",
    headline: "Economy 4.0 is expected to grow by 5% next year — platform economies lead the charge",
    timestamp: "1 hour ago",
    severity: "Low",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&q=80",
  },
];

// --- LIVE UPDATES FEED -------------------------------------------------------
export const liveUpdates = [
  { id: 1, time: "Just now",  text: "AI Adoption Index hits new record: 61% global enterprise penetration", hot: true },
  { id: 2, time: "4 min ago", text: "DTMI Transformation Velocity score rises to 42% — highest since Q2 2024", hot: false },
  { id: 3, time: "9 min ago", text: "EU AI Act enforcement team confirms first compliance audits begin July 2026", hot: false },
  { id: 4, time: "14 min ago",text: "Cybersecurity threat surface expands 31% following rapid SaaS adoption wave", hot: false },
  { id: 5, time: "21 min ago",text: "Cloud migration reaches 67% completion across Fortune 500 — hybrid model dominates", hot: false },
  { id: 6, time: "33 min ago",text: "Quantum computing readiness: only 12% of enterprises have active strategies", hot: false },
  { id: 7, time: "41 min ago",text: "DCO framework adopted by 55% of G20 governments — new global benchmark set", hot: false },
  { id: 8, time: "58 min ago",text: "Digital Business Platforms market reaches $180B valuation milestone", hot: false },
];

// --- SECTION: TOP STORIES ----------------------------------------------------
export const topStories = [
  {
    id: "ts-1",
    category: "AI & AUTOMATION",
    headline: "AI Integration in the Digital Workplace: A Playbook for 2026",
    summary: "How leading firms are embedding AI into core workflows and measuring ROI — with 62% of knowledge workers now using AI tools daily.",
    timestamp: "Today, 09:14",
    readTime: "6 min",
    severity: "High",
    recommended: true,
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&q=80",
  },
  {
    id: "ts-2",
    category: "CYBERSECURITY",
    headline: "Ransomware targets OT/IT convergence points — critical infrastructure at risk",
    summary: "A new wave of ransomware attacks is exploiting the gap between operational and IT systems, with energy and manufacturing sectors most exposed.",
    timestamp: "Today, 08:30",
    readTime: "5 min",
    severity: "Critical",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&q=80",
  },
  {
    id: "ts-3",
    category: "CLOUD",
    headline: "FinOps is now a C-suite priority as cloud spend overruns hit 43% of enterprises",
    summary: "Cloud cost optimization has moved from IT to the boardroom. Here's how the most disciplined organizations are closing the gap.",
    timestamp: "Today, 07:45",
    readTime: "7 min",
    severity: "Medium",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80",
  },
  {
    id: "ts-4",
    category: "DCO",
    headline: "Digital-Centered Organizations outperform peers by 2.1x on digital revenue metrics",
    summary: "The DCO framework is no longer theoretical. Early adopters are posting measurable results — and the gap with laggards is widening fast.",
    timestamp: "Yesterday, 16:00",
    readTime: "8 min",
    severity: "Medium",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80",
  },
];

// --- SECTION: EXECUTIVE BRIEFINGS --------------------------------------------
export const executiveBriefings = [
  {
    id: "eb-1",
    category: "EXECUTIVE BRIEFING",
    headline: "Board-level AI governance: what directors need to know in 2026",
    timestamp: "Apr 23, 2026",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
    label: "VIDEO",
    duration: "18 min",
  },
  {
    id: "eb-2",
    category: "EXECUTIVE BRIEFING",
    headline: "The digital transformation talent gap is widening — and it's a CEO problem",
    timestamp: "Apr 22, 2026",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80",
    label: "ANALYSIS",
  },
  {
    id: "eb-3",
    category: "EXECUTIVE BRIEFING",
    headline: "Why 60% of digital transformation programs fail — and how to be in the 40%",
    timestamp: "Apr 21, 2026",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80",
    label: "PODCAST",
    duration: "42 min",
  },
];

// --- SECTION: EMERGING TECH --------------------------------------------------
export const emergingTech = [
  {
    id: "et-1",
    category: "EMERGING TECH",
    headline: "Quantum computing: only 12% of enterprises have a strategy — but the window is closing",
    timestamp: "Apr 23, 2026",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&q=80",
  },
  {
    id: "et-2",
    category: "EMERGING TECH",
    headline: "Digital twins are moving from factory floors to entire city infrastructures",
    timestamp: "Apr 22, 2026",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80",
  },
  {
    id: "et-3",
    category: "EMERGING TECH",
    headline: "Edge computing adoption reaches 38% — latency-sensitive industries lead adoption",
    timestamp: "Apr 21, 2026",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80",
  },
  {
    id: "et-4",
    category: "EMERGING TECH",
    headline: "5G enterprise deployments accelerate: 41% of large firms now have active 5G strategies",
    timestamp: "Apr 20, 2026",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=80",
  },
];

// --- SECTION: OPINION / ANALYSIS ---------------------------------------------
export const opinionPieces = [
  {
    id: "op-1",
    author: "Dr. Sarah Chen",
    role: "Chief Digital Officer, DTMI",
    headline: "The real reason digital transformation fails isn't technology — it's leadership",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    label: "OPINION",
  },
  {
    id: "op-2",
    author: "Marcus Webb",
    role: "AI Strategy Lead",
    headline: "Stop calling it 'AI adoption' — it's a fundamental rewiring of how organizations think",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
    label: "ANALYSIS",
  },
  {
    id: "op-3",
    author: "Priya Nair",
    role: "Cybersecurity Correspondent",
    headline: "We are building the most connected world in history — and securing it like it's 2015",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
    label: "OPINION",
  },
];

// --- SECTION: VIDEO ----------------------------------------------------------
export const videoContent = [
  {
    id: "v-1",
    headline: "Digital Transformation in Government – Trends and Insights",
    duration: "42:18",
    category: "DCO",
    image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=600&q=80",
    views: "12.4K",
  },
  {
    id: "v-2",
    headline: "Building AI-Native Organizations: A Playbook for Executives",
    duration: "18:05",
    category: "AI",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&q=80",
    views: "8.7K",
  },
  {
    id: "v-3",
    headline: "Cybersecurity in the Age of AI: Threats and Defenses",
    duration: "35:42",
    category: "CYBERSECURITY",
    image: "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?w=600&q=80",
    views: "6.2K",
  },
];

// --- SIDEBAR: MOST READ ------------------------------------------------------
export const mostRead = [
  { rank: 1, headline: "AI adoption accelerates by 15% — what it means for your workforce", category: "AI" },
  { rank: 2, headline: "EU AI Act: the compliance checklist every executive needs now", category: "GOVERNANCE" },
  { rank: 3, headline: "Zero-trust architecture: the definitive implementation guide for 2026", category: "CYBERSECURITY" },
  { rank: 4, headline: "Why 60% of digital transformation programs fail", category: "STRATEGY" },
  { rank: 5, headline: "Economy 4.0: the $4.2 trillion opportunity hiding in plain sight", category: "DIGITAL ECONOMY" },
];

// --- SEVERITY COLORS ---------------------------------------------------------
export const severityColors = {
  Low:      { bg: "bg-emerald-100", text: "text-emerald-700", dot: "bg-emerald-500" },
  Medium:   { bg: "bg-amber-100",   text: "text-amber-700",   dot: "bg-amber-500"   },
  High:     { bg: "bg-orange-100",  text: "text-orange-700",  dot: "bg-orange-500"  },
  Critical: { bg: "bg-red-100",     text: "text-red-700",     dot: "bg-red-600"     },
};

// --- INTELLIGENCE FEED TICKER (with severity) --------------------------------
export const intelligenceFeedItems = [
  { id: 1,  text: "AI-powered workforce tools adoption surges 10% globally in Q1 2026", severity: "High",     category: "AI" },
  { id: 2,  text: "Cloud migration accelerates: 67% of Fortune 500 complete hybrid transition", severity: "Medium",   category: "Cloud" },
  { id: 3,  text: "Cybersecurity breach incidents rise 23% — zero-trust frameworks now critical", severity: "Critical", category: "Cybersecurity" },
  { id: 4,  text: "Digital governance frameworks adopted by 42 new national governments", severity: "Medium",   category: "Governance" },
  { id: 5,  text: "Generative AI integration in enterprise workflows up 38% YoY", severity: "High",     category: "AI" },
  { id: 6,  text: "Economy 4.0 projected to add $4.2T to global GDP by 2028", severity: "Low",      category: "Digital Economy" },
  { id: 7,  text: "DCO adoption rate climbs to 55% among G20 nations — new benchmark set", severity: "Medium",   category: "DCO" },
  { id: 8,  text: "Quantum computing readiness: only 12% of enterprises have active strategies", severity: "High",     category: "Emerging Tech" },
  { id: 9,  text: "Digital Business Platforms market reaches $180B valuation milestone", severity: "Low",      category: "Digital Economy" },
  { id: 10, text: "AI regulation frameworks finalized in EU — compliance deadline Q3 2026", severity: "Critical", category: "Governance" },
  { id: 11, text: "Ransomware attacks on OT/IT convergence points up 41% — energy sector most exposed", severity: "Critical", category: "Cybersecurity" },
  { id: 12, text: "5G enterprise deployments accelerate: 41% of large firms now have active strategies", severity: "Medium",   category: "Emerging Tech" },
];

export const severityBadge = {
  Low:      { bg: "#064e3b", text: "#6ee7b7", border: "#065f46" },
  Medium:   { bg: "#78350f", text: "#fcd34d", border: "#92400e" },
  High:     { bg: "#7c2d12", text: "#fb923c", border: "#9a3412" },
  Critical: { bg: "#7f1d1d", text: "#f87171", border: "#991b1b" },
};

// --- INSIGHT CARDS -----------------------------------------------------------
export const insightCards = [
  {
    id: "ic-1", category: "AI",
    title: "AI's Role in Shaping the Future of Work",
    summary: "Generative AI is redefining job functions across industries. 62% of knowledge workers now use AI tools daily, up from 31% in 2024.",
    severity: "High", readTime: "5 min", timestamp: "Today, 09:14", author: "DTMI Research",
    tags: ["GenAI", "Workforce", "Productivity"], recommended: true,
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&q=80",
  },
  {
    id: "ic-2", category: "Cloud",
    title: "Multi-Cloud Strategy: Avoiding Vendor Lock-In",
    summary: "Enterprises adopting multi-cloud architectures report 18% lower operational costs and 40% better resilience scores.",
    severity: "Medium", readTime: "7 min", timestamp: "Today, 07:30", author: "Cloud Intelligence Unit",
    tags: ["Multi-Cloud", "Architecture", "Cost"], recommended: false,
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&q=80",
  },
  {
    id: "ic-3", category: "Cybersecurity",
    title: "Zero-Trust in the Age of Remote Work",
    summary: "With 74% of enterprises operating hybrid workforces, zero-trust frameworks have become the de facto security standard.",
    severity: "Critical", readTime: "6 min", timestamp: "Yesterday, 16:45", author: "Cyber Risk Desk",
    tags: ["Zero-Trust", "Remote Work", "Security"], recommended: true,
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&q=80",
  },
  {
    id: "ic-4", category: "Digital Economy",
    title: "Economy 4.0 Growth Projections for 2026",
    summary: "Economy 4.0 is expected to grow by 5% next year, driven by platform economies, digital labor markets, and AI-native businesses.",
    severity: "Low", readTime: "4 min", timestamp: "Yesterday, 11:20", author: "Economic Intelligence",
    tags: ["Economy 4.0", "Growth", "Forecast"], recommended: false,
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&q=80",
  },
  {
    id: "ic-5", category: "DCO",
    title: "Digital-Centered Organizations: The New Benchmark",
    summary: "DCO-aligned firms outperform peers by 2.1x on digital revenue metrics. The framework is now adopted by 55% of G20 governments.",
    severity: "Medium", readTime: "8 min", timestamp: "Apr 22, 14:00", author: "DCO Practice Lead",
    tags: ["DCO", "Governance", "Performance"], recommended: true,
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80",
  },
  {
    id: "ic-6", category: "Governance",
    title: "AI Regulation: What Executives Need to Know",
    summary: "The EU AI Act compliance deadline is Q3 2026. Non-compliant organizations face fines up to 6% of global annual revenue.",
    severity: "Critical", readTime: "9 min", timestamp: "Apr 22, 10:15", author: "Policy & Regulation Desk",
    tags: ["AI Act", "Compliance", "EU"], recommended: false,
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&q=80",
  },
  {
    id: "ic-7", category: "AI",
    title: "AI Integration in the Digital Workplace",
    summary: "Based on your recent interest in AI-driven transformations — how leading firms are embedding AI into core workflows and measuring ROI.",
    severity: "High", readTime: "6 min", timestamp: "Apr 21, 09:00", author: "DTMI Research",
    tags: ["AI", "Workplace", "ROI"], recommended: true,
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&q=80",
  },
  {
    id: "ic-8", category: "Emerging Tech",
    title: "Quantum Computing: Enterprise Readiness Assessment",
    summary: "Only 12% of enterprises have active quantum strategies. Early adopters in financial services report 10x speedups in optimization tasks.",
    severity: "Medium", readTime: "10 min", timestamp: "Apr 21, 08:00", author: "Emerging Tech Unit",
    tags: ["Quantum", "Enterprise", "Strategy"], recommended: false,
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&q=80",
  },
];

export const insightCategories = ["All", "AI", "Cloud", "Cybersecurity", "Digital Economy", "DCO", "Governance", "Emerging Tech"];

// --- TREND RADAR -------------------------------------------------------------
export const trendRadarItems = [
  { id: 1, name: "Generative AI",          adoption: 61, disruption: 45, readiness: 58, ring: "Adopt",  quadrant: "AI & Automation",  color: "#8b5cf6" },
  { id: 2, name: "Zero-Trust Security",    adoption: 54, disruption: 40, readiness: 62, ring: "Adopt",  quadrant: "Security",          color: "#ef4444" },
  { id: 3, name: "Edge Computing",         adoption: 38, disruption: 32, readiness: 44, ring: "Trial",  quadrant: "Infrastructure",    color: "#06b6d4" },
  { id: 4, name: "5G Enterprise",          adoption: 41, disruption: 38, readiness: 47, ring: "Trial",  quadrant: "Infrastructure",    color: "#0ea5e9" },
  { id: 5, name: "Digital Twins",          adoption: 29, disruption: 35, readiness: 33, ring: "Trial",  quadrant: "AI & Automation",   color: "#a78bfa" },
  { id: 6, name: "AI Governance Platforms",adoption: 33, disruption: 30, readiness: 40, ring: "Assess", quadrant: "Governance",        color: "#f59e0b" },
  { id: 7, name: "Quantum Computing",      adoption: 12, disruption: 68, readiness: 15, ring: "Assess", quadrant: "Emerging Tech",     color: "#ec4899" },
  { id: 8, name: "Blockchain (Enterprise)",adoption: 22, disruption: 28, readiness: 25, ring: "Hold",   quadrant: "Infrastructure",    color: "#6b7280" },
];

export const trendRadarRings = {
  Adopt:  { color: "#10b981", label: "Adopt",  desc: "Proven value — recommend broad adoption" },
  Trial:  { color: "#06b6d4", label: "Trial",  desc: "Worth pursuing with limited risk" },
  Assess: { color: "#f59e0b", label: "Assess", desc: "Explore with caution, monitor closely" },
  Hold:   { color: "#6b7280", label: "Hold",   desc: "Proceed with caution, reassess in 12–18 months" },
};

// --- AI ENGINE RESPONSES -----------------------------------------------------
export const aiResponses = {
  default: {
    title: "Emerging Risks in Digital Transformation",
    summary: "Digital transformation risk exposure has increased 20% in Q1 2026. The convergence of AI dependency and cybersecurity vulnerabilities represents the highest combined risk vector. Immediate executive attention is recommended for data governance and zero-trust implementation.",
    risks: [
      { label: "Increased dependency on AI systems",   level: "Medium"   },
      { label: "Data privacy and sovereignty concerns", level: "High"     },
      { label: "Cybersecurity threat expansion",        level: "Critical" },
      { label: "Talent and skills gap in digital roles",level: "Medium"   },
      { label: "Regulatory compliance lag",             level: "High"     },
    ],
    actions: [
      "Commission enterprise-wide AI risk assessment",
      "Accelerate zero-trust security rollout across all BUs",
      "Establish cross-functional digital risk committee",
      "Brief board on regulatory compliance timeline",
    ],
  },
  ai: {
    title: "AI Adoption Intelligence Report",
    summary: "AI adoption has accelerated by 15% in the past quarter. Organizations with structured AI governance frameworks report 3x better outcomes. The primary risk remains uncontrolled AI deployment without adequate oversight mechanisms.",
    risks: [
      { label: "Model hallucination in critical workflows", level: "High"   },
      { label: "AI bias in decision-making systems",        level: "High"   },
      { label: "Vendor concentration risk (top 3 providers)",level: "Medium" },
    ],
    actions: [
      "Implement AI model governance framework",
      "Establish AI ethics review board",
      "Diversify AI vendor portfolio",
      "Deploy AI monitoring and observability tools",
    ],
  },
  cloud: {
    title: "Cloud Transformation Status",
    summary: "Cloud migration is 67% complete across monitored enterprises. Cost optimization remains the top challenge, with 43% of organizations reporting cloud spend 20% over budget. Hybrid cloud architectures are emerging as the dominant model.",
    risks: [
      { label: "Multi-cloud complexity and cost overruns",  level: "Medium" },
      { label: "Data residency compliance gaps",            level: "High"   },
      { label: "Legacy system integration bottlenecks",     level: "Medium" },
    ],
    actions: [
      "Conduct cloud cost optimization audit",
      "Map data residency requirements by jurisdiction",
      "Accelerate legacy modernization roadmap",
      "Implement FinOps practices across engineering teams",
    ],
  },
  cyber: {
    title: "Cybersecurity Threat Intelligence",
    summary: "Cybersecurity incidents have increased 23% YoY. The attack surface has expanded significantly due to rapid SaaS adoption and remote work infrastructure. Zero-trust implementation is the single highest-ROI security investment available.",
    risks: [
      { label: "Ransomware targeting OT/IT convergence",   level: "Critical" },
      { label: "Supply chain software vulnerabilities",     level: "Critical" },
      { label: "Insider threat amplification via AI tools", level: "High"     },
    ],
    actions: [
      "Initiate zero-trust architecture assessment",
      "Conduct supply chain security audit",
      "Deploy AI-powered threat detection platform",
      "Run executive cyber crisis simulation exercise",
    ],
  },
  governance: {
    title: "Governance & Compliance Outlook",
    summary: "Regulatory compliance scores improved by 12% following DCO framework adoption. Early movers show 2.3x better audit outcomes. The EU AI Act is the single most impactful regulatory event of 2026.",
    risks: [
      { label: "EU AI Act non-compliance exposure",         level: "Critical" },
      { label: "Data sovereignty fragmentation",            level: "High"     },
      { label: "Board-level digital literacy gap",          level: "Medium"   },
    ],
    actions: [
      "Publish governance scorecard for board review",
      "Align internal policies with ISO 27001 updates",
      "Schedule board digital literacy briefing",
      "Appoint Chief AI Compliance Officer",
    ],
  },
};

export const aiSuggestedQueries = [
  "What risks are emerging in digital transformation?",
  "Analyze current AI adoption trends",
  "What is the cloud migration status?",
  "Assess the cybersecurity threat landscape",
  "What governance risks should executives prioritize?",
  "Generate an executive summary for the board",
];

// --- 6xD FRAMEWORK -----------------------------------------------------------
export const sixDFramework = {
  pillars: [
    {
      id: "economy40",
      code: "D1",
      name: "Economy 4.0",
      color: "#8b5cf6",
      icon: "TrendingUp",
      tagline: "The next economic paradigm",
      description: "Economy 4.0 integrates digital technologies, AI, and platform models to create new value chains and redefine competitive advantage across all sectors.",
      stat: "$4.2T",
      statLabel: "Projected GDP contribution by 2028",
      articles: [
        { title: "Economy 4.0 is expected to grow by 5% next year — platform economies lead", timestamp: "Today, 09:00", severity: "Low",    readTime: "4 min" },
        { title: "Digital labor markets reshape workforce economics in 47 countries",           timestamp: "Apr 22",       severity: "Medium", readTime: "6 min" },
        { title: "Platform business models now account for 22% of global market cap",          timestamp: "Apr 21",       severity: "Low",    readTime: "5 min" },
      ],
    },
    {
      id: "dco",
      code: "D2",
      name: "DCO",
      color: "#06b6d4",
      icon: "Building2",
      tagline: "Digital-Centered Organizations",
      description: "DCO is a framework for building organizations where digital capability is the core operating model — not a support function. Adopted by 55% of G20 governments.",
      stat: "2.1x",
      statLabel: "Revenue outperformance vs. non-DCO peers",
      articles: [
        { title: "DCO adoption rate climbs to 55% among G20 nations — new benchmark set",      timestamp: "Today, 08:30", severity: "Medium", readTime: "7 min" },
        { title: "How DCO-aligned firms are closing the digital talent gap faster",             timestamp: "Apr 22",       severity: "Medium", readTime: "5 min" },
        { title: "DCO maturity model v3.0 released — key changes for 2026",                    timestamp: "Apr 20",       severity: "Low",    readTime: "8 min" },
      ],
    },
    {
      id: "ai-orgs",
      code: "D3",
      name: "AI-Driven Organizations",
      color: "#10b981",
      icon: "Brain",
      tagline: "Intelligence as infrastructure",
      description: "AI-driven organizations embed machine intelligence into every decision layer — from operations to strategy. 38% of enterprises now classify AI as core infrastructure.",
      stat: "38%",
      statLabel: "Enterprises with AI as core infrastructure",
      articles: [
        { title: "AI adoption has accelerated by 15% — reshaping every industry on the planet", timestamp: "Today, 07:00", severity: "High",   readTime: "8 min" },
        { title: "Building AI-native organizations: the 5 non-negotiable capabilities",         timestamp: "Apr 22",       severity: "High",   readTime: "6 min" },
        { title: "AI governance frameworks: what separates leaders from laggards",              timestamp: "Apr 21",       severity: "Medium", readTime: "7 min" },
      ],
    },
    {
      id: "dbp",
      code: "D4",
      name: "Digital Business Platforms",
      color: "#f59e0b",
      icon: "Layers",
      tagline: "The architecture of digital scale",
      description: "Digital Business Platforms are the foundational technology stacks enabling organizations to scale digital products, ecosystems, and services at speed.",
      stat: "$180B",
      statLabel: "Global DBP market valuation in 2026",
      articles: [
        { title: "Digital Business Platforms market reaches $180B valuation milestone",         timestamp: "Today, 06:30", severity: "Low",    readTime: "5 min" },
        { title: "API-first architecture: why 71% of digital leaders are rebuilding their stack",timestamp: "Apr 22",       severity: "Medium", readTime: "9 min" },
        { title: "Platform ecosystems vs. monoliths: the definitive 2026 comparison",           timestamp: "Apr 20",       severity: "Low",    readTime: "6 min" },
      ],
    },
    {
      id: "cyber-resilience",
      code: "D5",
      name: "Cyber Resilience",
      color: "#ef4444",
      icon: "Shield",
      tagline: "Security as a transformation enabler",
      description: "Cyber resilience goes beyond protection — it's the ability to anticipate, withstand, recover from, and adapt to cyber threats while maintaining business continuity.",
      stat: "23%",
      statLabel: "YoY increase in breach incidents",
      articles: [
        { title: "Zero-trust is no longer optional — 74% of hybrid enterprises now require it", timestamp: "Today, 08:00", severity: "Critical","readTime": "6 min" },
        { title: "Ransomware targets OT/IT convergence — critical infrastructure at risk",       timestamp: "Apr 22",       severity: "Critical","readTime": "5 min" },
        { title: "Cyber resilience maturity: how to benchmark your organization in 2026",        timestamp: "Apr 21",       severity: "High",   readTime: "7 min" },
      ],
    },
    {
      id: "data-intelligence",
      code: "D6",
      name: "Data & Intelligence",
      color: "#ec4899",
      icon: "BarChart2",
      tagline: "From data lakes to decision engines",
      description: "Data & Intelligence covers the full spectrum from data architecture and governance to advanced analytics and real-time decision intelligence at enterprise scale.",
      stat: "72%",
      statLabel: "Enterprises prioritizing data as strategic asset",
      articles: [
        { title: "Data sovereignty: the new boardroom priority as regulations tighten globally", timestamp: "Today, 07:45", severity: "High",   readTime: "7 min" },
        { title: "Real-time analytics adoption reaches 72% — batch processing in decline",       timestamp: "Apr 22",       severity: "Medium", readTime: "5 min" },
        { title: "The data mesh vs. data fabric debate: which architecture wins in 2026?",       timestamp: "Apr 20",       severity: "Low",    readTime: "8 min" },
      ],
    },
  ],
};

// --- MULTIMEDIA --------------------------------------------------------------
export const podcastEpisodes = [
  {
    id: "pod-1",
    title: "Digital Transformation in Government – Trends and Insights",
    host: "Dr. Sarah Chen",
    guest: "Minister James Okafor, Digital Affairs",
    duration: "42:18",
    date: "Apr 23, 2026",
    category: "DCO",
    description: "Exploring how governments are leveraging DCO frameworks to modernize public services and improve citizen outcomes at scale.",
    episode: "EP 47",
    image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=600&q=80",
    plays: "12.4K",
  },
  {
    id: "pod-2",
    title: "Cybersecurity in the Age of AI: Threats and Defenses",
    host: "Priya Nair",
    guest: "CISO Panel: 3 Fortune 500 Leaders",
    duration: "35:42",
    date: "Apr 21, 2026",
    category: "Cybersecurity",
    description: "How AI is both amplifying cyber threats and enabling next-generation defense strategies — a frank conversation with three CISOs.",
    episode: "EP 46",
    image: "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?w=600&q=80",
    plays: "9.1K",
  },
  {
    id: "pod-3",
    title: "The Economy 4.0 Opportunity: Where to Invest Now",
    host: "Marcus Webb",
    guest: "Dr. Lena Hoffmann, WEF Digital Economy Lead",
    duration: "28:55",
    date: "Apr 19, 2026",
    category: "Digital Economy",
    description: "A deep dive into the $4.2 trillion Economy 4.0 opportunity — which sectors are moving fastest and where capital is flowing.",
    episode: "EP 45",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&q=80",
    plays: "7.3K",
  },
  {
    id: "pod-4",
    title: "AI Governance: Building the Guardrails Before the Crash",
    host: "Dr. Sarah Chen",
    guest: "Prof. Amara Diallo, AI Ethics Institute",
    duration: "51:04",
    date: "Apr 17, 2026",
    category: "Governance",
    description: "Why AI governance frameworks are lagging behind adoption — and what organizations must do before regulators force their hand.",
    episode: "EP 44",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
    plays: "6.8K",
  },
];

export const videoEpisodes = [
  {
    id: "vid-1",
    title: "Building AI-Native Organizations: A Playbook for Executives",
    host: "Marcus Webb",
    duration: "18:05",
    date: "Apr 22, 2026",
    category: "AI",
    description: "A step-by-step guide for executives on embedding AI into organizational DNA — from strategy to execution to measurement.",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&q=80",
    views: "8.7K",
    label: "MASTERCLASS",
  },
  {
    id: "vid-2",
    title: "DTMI Live: Q1 2026 Transformation Index Review",
    host: "DTMI Research Desk",
    duration: "24:30",
    date: "Apr 20, 2026",
    category: "Intelligence",
    description: "Our quarterly deep-dive into the DTMI Transformation Index — what moved, what stalled, and what it means for your strategy.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
    views: "15.2K",
    label: "LIVE REPLAY",
  },
  {
    id: "vid-3",
    title: "Zero-Trust Architecture: A Visual Explainer",
    host: "Priya Nair",
    duration: "12:18",
    date: "Apr 18, 2026",
    category: "Cybersecurity",
    description: "A clear, visual walkthrough of zero-trust architecture — what it is, how it works, and how to start your implementation.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&q=80",
    views: "11.4K",
    label: "EXPLAINER",
  },
  {
    id: "vid-4",
    title: "DCO in Practice: Case Studies from 3 Governments",
    host: "Dr. Sarah Chen",
    duration: "31:47",
    date: "Apr 16, 2026",
    category: "DCO",
    description: "Real-world DCO implementation stories from Singapore, Estonia, and UAE — what worked, what didn't, and lessons for all sectors.",
    image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=600&q=80",
    views: "5.9K",
    label: "CASE STUDY",
  },
];
