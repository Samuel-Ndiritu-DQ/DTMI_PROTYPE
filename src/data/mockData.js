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
export const navItems = [
  { label: "Home",       key: "Latest" },
  {
    label: "Intelligence",
    key: "intelligence",
    children: [
      {
        heading: "Knowledge Layers",
        links: [
          { 
            label: "Signal",        
            key: "Signal",       
            desc: "Real-time executive awareness & urgent alerts",
            contentTypes: [
              { label: "Executive Briefs", key: "executive-brief", desc: "Urgent executive-level briefings" },
              { label: "Frontier Watch", key: "frontier-watch", desc: "Monitoring emerging tech frontiers" },
              { label: "Frontier Brief", key: "frontier-brief", desc: "Deep-dive frontier analysis" },
              { label: "Rapid Insights", key: "rapid-insight", desc: "Quick-turnaround market insights" },
              { label: "Trend Alerts", key: "trend-alert", desc: "Early trend identification & alerts" },
              { label: "Viewpoint Blogs", key: "viewpoint-blog", desc: "Expert opinion & commentary" }
            ]
          },
          { 
            label: "Insight",       
            key: "Insight",      
            desc: "Structured analysis & conceptual frameworks",
            contentTypes: [
              { label: "Concept Introduction", key: "concept-intro", desc: "Introducing new digital concepts" },
              { label: "Expert Perspective", key: "expert-perspective", desc: "Industry expert viewpoints" },
              { label: "Framework Explainer", key: "framework-explainer", desc: "Detailed framework breakdowns" },
              { label: "Insight Article", key: "insight-article", desc: "In-depth analytical articles" },
              { label: "Microblogs", key: "microblog", desc: "Quick insights & observations" }
            ]
          },
          { 
            label: "Deep Analysis", 
            key: "Deep Analysis",
            desc: "Comprehensive research & strategic depth",
            contentTypes: [
              { label: "Forecast Article", key: "forecast-article", desc: "Future trend projections" },
              { label: "Industry Briefs", key: "industry-brief", desc: "Sector-specific analysis" },
              { label: "Research Notes", key: "research-note", desc: "Preliminary research findings" },
              { label: "Strategic Essay", key: "strategic-essay", desc: "Long-form strategic thinking" },
              { label: "White Paper", key: "whitepaper", desc: "Comprehensive research papers" },
              { label: "Book Review", key: "book-review", desc: "Critical analysis of key books" },
              { label: "Infographics", key: "infographic", desc: "Visual data representation" }
            ]
          },
          { 
            label: "Research",      
            key: "Research",     
            desc: "Premium intelligence & executive reports",
            contentTypes: [
              { label: "Research Report", key: "research-report", desc: "Comprehensive research studies" },
              { label: "Market Intelligence", key: "market-intelligence", desc: "Market analysis & insights" },
              { label: "Policy Brief", key: "policy-brief", desc: "Policy analysis & recommendations" },
              { label: "Executive Analysis", key: "executive-analysis", desc: "C-suite level strategic analysis" }
            ]
          },
          { label: "Books",         key: "Books",        desc: "DTMB flagship research volumes" },
          { label: "Glossary",      key: "Glossary",     desc: "A–Z digital transformation terms" },
        ],
      },
      {
        heading: "Live Tools",
        links: [
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
    type: "Insight Article",
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
    type: "Trend Alert",
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
    type: "Insight Article",
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
    type: "Research Report",
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
    type: "Executive Briefs",
  },
  {
    id: "eb-2",
    category: "EXECUTIVE BRIEFING",
    headline: "The digital transformation talent gap is widening — and it's a CEO problem",
    timestamp: "Apr 22, 2026",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80",
    label: "ANALYSIS",
    type: "Executive Briefs",
  },
  {
    id: "eb-3",
    category: "EXECUTIVE BRIEFING",
    headline: "Why 60% of digital transformation programs fail — and how to be in the 40%",
    timestamp: "Apr 21, 2026",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80",
    label: "PODCAST",
    type: "Executive Briefs",
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
    type: "Frontier Watch",
  },
  {
    id: "et-2",
    category: "EMERGING TECH",
    headline: "Digital twins are moving from factory floors to entire city infrastructures",
    timestamp: "Apr 22, 2026",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80",
    type: "Frontier Watch",
  },
  {
    id: "et-3",
    category: "EMERGING TECH",
    headline: "Edge computing adoption reaches 38% — latency-sensitive industries lead adoption",
    timestamp: "Apr 21, 2026",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80",
    type: "Frontier Watch",
  },
  {
    id: "et-4",
    category: "EMERGING TECH",
    headline: "5G enterprise deployments accelerate: 41% of large firms now have active strategies",
    timestamp: "Apr 20, 2026",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=80",
    type: "Frontier Watch",
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
  // 1. EXECUTIVE BRIEFS (2 samples)
  {
    id: "eb-1",
    category: "AI",
    title: "Executive Brief: AI Governance Framework Implementation",
    summary: "Organizations with formal AI governance frameworks report 3.2x better outcomes from AI investments. This brief outlines the 5-step implementation roadmap.",
    severity: "High",
    readTime: "4 min",
    timestamp: "Today, 14:30",
    author: "Executive Intelligence Desk",
    tags: ["AI Governance", "Framework", "Implementation"],
    recommended: true,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
    type: "Executive Briefs"
  },
  {
    id: "eb-2",
    category: "Cybersecurity",
    title: "Executive Brief: Zero-Trust Implementation Timeline",
    summary: "74% of hybrid enterprises now require zero-trust. This brief provides a 12-month implementation timeline with quarterly milestones.",
    severity: "Critical",
    readTime: "3 min",
    timestamp: "Today, 11:15",
    author: "Cyber Executive Desk",
    tags: ["Zero-Trust", "Timeline", "Implementation"],
    recommended: true,
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&q=80",
    type: "Executive Briefs"
  },

  // 2. FRONTIER WATCH (2 samples)
  {
    id: "fw-1",
    category: "Emerging Tech",
    title: "Frontier Watch: Neuromorphic Computing Breakthroughs",
    summary: "Neuromorphic chips achieve 100x energy efficiency gains over traditional AI hardware. Early prototypes show promise for edge AI applications.",
    severity: "Medium",
    readTime: "6 min",
    timestamp: "Today, 15:20",
    author: "Frontier Monitoring Unit",
    tags: ["Neuromorphic", "AI Hardware", "Edge Computing"],
    recommended: true,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80",
    type: "Frontier Watch"
  },
  {
    id: "fw-2",
    category: "AI",
    title: "Frontier Watch: Multimodal AI Convergence Trends",
    summary: "Text, image, and audio models are converging into unified multimodal systems. Early applications show 40% accuracy improvements.",
    severity: "High",
    readTime: "7 min",
    timestamp: "Today, 10:45",
    author: "AI Frontier Desk",
    tags: ["Multimodal AI", "Convergence", "Trends"],
    recommended: true,
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&q=80",
    type: "Frontier Watch"
  },

  // 3. FRONTIER BRIEF (2 samples)
  {
    id: "fb-1",
    category: "Digital Economy",
    title: "Frontier Brief: Decentralized Autonomous Organizations",
    summary: "DAO adoption grows 300% YoY. New governance models enable distributed decision-making at enterprise scale with measurable efficiency gains.",
    severity: "Medium",
    readTime: "8 min",
    timestamp: "Yesterday, 14:30",
    author: "Digital Frontier Desk",
    tags: ["DAO", "Decentralized", "Governance"],
    recommended: false,
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&q=80",
    type: "Frontier Brief"
  },
  {
    id: "fb-2",
    category: "Cybersecurity",
    title: "Frontier Brief: Post-Quantum Cryptography Developments",
    summary: "NIST selects first post-quantum cryptographic algorithms. Migration timelines estimated at 3-5 years for critical infrastructure.",
    severity: "High",
    readTime: "9 min",
    timestamp: "Yesterday, 11:15",
    author: "Security Frontier Desk",
    tags: ["Post-Quantum", "Cryptography", "NIST"],
    recommended: true,
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&q=80",
    type: "Frontier Brief"
  },

  // 4. RAPID INSIGHTS (2 samples)
  {
    id: "ri-1",
    category: "AI",
    title: "Rapid Insight: GenAI Productivity Gains Analysis",
    summary: "Quick-turnaround analysis shows 40% productivity gains from GenAI tools in knowledge work. Data from Q1 2026.",
    severity: "High",
    readTime: "3 min",
    timestamp: "Today, 14:20",
    author: "Rapid Insights Desk",
    tags: ["GenAI", "Productivity", "Quick Analysis"],
    recommended: true,
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&q=80",
    type: "Rapid Insights"
  },
  {
    id: "ri-2",
    category: "Cloud",
    title: "Rapid Insight: Multi-Cloud Cost Analysis",
    summary: "Quick analysis reveals 18% cost savings from multi-cloud architectures but 22% complexity overhead.",
    severity: "Medium",
    readTime: "2 min",
    timestamp: "Today, 10:30",
    author: "Cloud Rapid Insights",
    tags: ["Multi-Cloud", "Cost", "Quick Analysis"],
    recommended: false,
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&q=80",
    type: "Rapid Insights"
  },

  // 5. TREND ALERTS (2 samples)
  {
    id: "ta-1",
    category: "AI",
    title: "Trend Alert: AI Model Consolidation Wave",
    summary: "Major AI vendors consolidating foundational models. Immediate implications for enterprise AI strategy and vendor selection.",
    severity: "High",
    readTime: "2 min",
    timestamp: "Just now",
    author: "Trend Alert Desk",
    tags: ["AI Models", "Consolidation", "Early Signal"],
    recommended: true,
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&q=80",
    type: "Trend Alerts"
  },
  {
    id: "ta-2",
    category: "Cloud",
    title: "Trend Alert: Sustainability Cloud Pricing Shift",
    summary: "Major cloud providers introducing sustainability-based pricing. Immediate review of cloud contracts recommended.",
    severity: "Medium",
    readTime: "1 min",
    timestamp: "5 min ago",
    author: "Cloud Trend Alert",
    tags: ["Sustainability", "Cloud Pricing", "Early Signal"],
    recommended: false,
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&q=80",
    type: "Trend Alerts"
  },

  // 6. VIEWPOINT BLOGS (2 samples)
  {
    id: "vb-1",
    category: "AI",
    title: "Viewpoint: AI Governance is Not Optional",
    summary: "Personal perspective on why AI governance frameworks are essential, not optional, for responsible AI adoption.",
    severity: "High",
    readTime: "5 min",
    timestamp: "Yesterday, 09:00",
    author: "Dr. Sarah Chen",
    tags: ["AI Governance", "Opinion", "Viewpoint"],
    recommended: true,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80",
    type: "Viewpoint Blogs"
  },
  {
    id: "vb-2",
    category: "Cloud",
    title: "Viewpoint: The Hidden Cost of Cloud Technical Debt",
    summary: "Personal experience with cloud technical debt accumulation and strategies for managing it effectively.",
    severity: "Medium",
    readTime: "4 min",
    timestamp: "Yesterday, 14:45",
    author: "Marcus Webb",
    tags: ["Cloud", "Technical Debt", "Viewpoint"],
    recommended: false,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&q=80",
    type: "Viewpoint Blogs"
  },

  // 7. STRATEGIC ESSAYS (2 samples)
  {
    id: "se-1",
    category: "Strategy",
    title: "Strategic Essay: The Philosophy of Digital Transformation",
    summary: "Deep philosophical exploration of what digital transformation truly means beyond technology implementation.",
    severity: "Medium",
    readTime: "12 min",
    timestamp: "Apr 22, 2026",
    author: "Dr. Sarah Chen",
    tags: ["Digital Transformation", "Philosophy", "Strategy"],
    recommended: true,
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&q=80",
    type: "Strategic Essay"
  },
  {
    id: "se-2",
    category: "AI",
    title: "Strategic Essay: AI as Organizational Consciousness",
    summary: "Philosophical exploration of AI as an extension of organizational consciousness and decision-making.",
    severity: "High",
    readTime: "15 min",
    timestamp: "Apr 21, 2026",
    author: "Marcus Webb",
    tags: ["AI", "Consciousness", "Philosophy"],
    recommended: true,
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&q=80",
    type: "Strategic Essay"
  },

  // 8. CONCEPT INTRODUCTION (2 samples)
  {
    id: "ci-1",
    category: "AI",
    title: "Concept Introduction: Federated Learning",
    summary: "Beginner-friendly introduction to federated learning - what it is, why it matters, and simple examples.",
    severity: "Medium",
    readTime: "5 min",
    timestamp: "Today, 13:00",
    author: "AI Education Desk",
    tags: ["Federated Learning", "AI", "Introduction"],
    recommended: true,
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&q=80",
    type: "Concept Introduction"
  },
  {
    id: "ci-2",
    category: "Cloud",
    title: "Concept Introduction: Serverless Architecture",
    summary: "Simple explanation of serverless architecture with clear examples and beginner-friendly diagrams.",
    severity: "Low",
    readTime: "6 min",
    timestamp: "Today, 10:00",
    author: "Cloud Education Desk",
    tags: ["Serverless", "Architecture", "Introduction"],
    recommended: false,
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&q=80",
    type: "Concept Introduction"
  },

  // 9. FRAMEWORK EXPLAINER (2 samples)
  {
    id: "fe-1",
    category: "Cybersecurity",
    title: "Framework Explainer: Zero-Trust Architecture Model",
    summary: "Detailed breakdown of the zero-trust architecture framework with component explanations and application guide.",
    severity: "Critical",
    readTime: "8 min",
    timestamp: "Yesterday, 16:00",
    author: "Security Framework Desk",
    tags: ["Zero-Trust", "Framework", "Architecture"],
    recommended: true,
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&q=80",
    type: "Framework Explainer"
  },
  {
    id: "fe-2",
    category: "DCO",
    title: "Framework Explainer: Digital-Centered Organizations Model",
    summary: "Structured explanation of the DCO framework with clear diagrams and step-by-step implementation guide.",
    severity: "Medium",
    readTime: "7 min",
    timestamp: "Yesterday, 14:00",
    author: "DCO Framework Desk",
    tags: ["DCO", "Framework", "Organization"],
    recommended: true,
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&q=80",
    type: "Framework Explainer"
  },

  // 10. EXPERT PERSPECTIVE (2 samples)
  {
    id: "ep-1",
    category: "AI",
    title: "Expert Perspective: AI Coding Best Practices",
    summary: "Industry expert insights on AI coding practices with recommendations based on 15 years of experience.",
    severity: "High",
    readTime: "6 min",
    timestamp: "Today, 11:00",
    author: "Dr. Sarah Chen",
    tags: ["AI Coding", "Software Development", "Expert View"],
    recommended: true,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80",
    type: "Expert Perspective"
  },
  {
    id: "ep-2",
    category: "Cloud",
    title: "Expert Perspective: Multi-Cloud Architecture Patterns",
    summary: "Expert viewpoint on multi-cloud architecture patterns based on implementation experience across 50+ enterprises.",
    severity: "Medium",
    readTime: "7 min",
    timestamp: "Today, 09:30",
    author: "Marcus Webb",
    tags: ["Multi-Cloud", "Architecture", "Expert View"],
    recommended: false,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&q=80",
    type: "Expert Perspective"
  },

  // 11. INSIGHT ARTICLE (RESEARCH) (2 samples)
  {
    id: "ia-1",
    category: "AI",
    title: "Insight Article: AI Adoption Impact on Workforce Productivity",
    summary: "Data-driven analysis of AI adoption impact across 1,200 organizations with methodology and key findings.",
    severity: "High",
    readTime: "8 min",
    timestamp: "Today, 09:14",
    author: "DTMI Research",
    tags: ["AI Adoption", "Productivity", "Research"],
    recommended: true,
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&q=80",
    type: "Insight Article"
  },
  {
    id: "ia-2",
    category: "Cloud",
    title: "Insight Article: Multi-Cloud Strategy Effectiveness",
    summary: "Evidence-based analysis of multi-cloud strategy outcomes with data from 340 enterprise deployments.",
    severity: "Medium",
    readTime: "7 min",
    timestamp: "Today, 07:30",
    author: "Cloud Intelligence Unit",
    tags: ["Multi-Cloud", "Strategy", "Research"],
    recommended: false,
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&q=80",
    type: "Insight Article"
  },

  // 12. FORECAST ARTICLE (2 samples)
  {
    id: "fa-1",
    category: "AI",
    title: "Forecast: AI Regulation Landscape 2026-2028",
    summary: "Future predictions on AI regulation with scenarios and supporting data analysis across G20 nations.",
    severity: "High",
    readTime: "8 min",
    timestamp: "Yesterday, 13:45",
    author: "Forecast Intelligence Unit",
    tags: ["AI Regulation", "Forecast", "Timeline"],
    recommended: true,
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=600&q=80",
    type: "Forecast Article"
  },
  {
    id: "fa-2",
    category: "Cloud",
    title: "Forecast: Edge Computing Adoption Curve 2026-2030",
    summary: "Future predictions on edge computing adoption with probability analysis and key variable identification.",
    severity: "Medium",
    readTime: "7 min",
    timestamp: "Yesterday, 10:30",
    author: "Cloud Forecast Desk",
    tags: ["Edge Computing", "Adoption", "Forecast"],
    recommended: false,
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&q=80",
    type: "Forecast Article"
  },

  // 13. INDUSTRY BRIEFS (2 samples)
  {
    id: "ib-1",
    category: "Finance",
    title: "Industry Brief: Digital Banking Transformation 2026",
    summary: "Comprehensive overview of digital banking sector with key players, trends, and risk analysis.",
    severity: "Medium",
    readTime: "6 min",
    timestamp: "Yesterday, 15:00",
    author: "Finance Intelligence Unit",
    tags: ["Digital Banking", "Finance", "Industry"],
    recommended: true,
    image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=600&q=80",
    type: "Industry Briefs"
  },
  {
    id: "ib-2",
    category: "Healthcare",
    title: "Industry Brief: Digital Health Adoption Trends",
    summary: "Sector-wide snapshot of digital health adoption with market analysis and key trend identification.",
    severity: "High",
    readTime: "7 min",
    timestamp: "Yesterday, 12:30",
    author: "Healthcare Intelligence Unit",
    tags: ["Digital Health", "Healthcare", "Industry"],
    recommended: true,
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&q=80",
    type: "Industry Briefs"
  },

  // 14. RESEARCH NOTES (2 samples)
  {
    id: "rn-1",
    category: "Emerging Tech",
    title: "Research Note: Quantum Computing Early Observations",
    summary: "Preliminary observations from quantum computing research with early findings and hypotheses.",
    severity: "Medium",
    readTime: "5 min",
    timestamp: "Yesterday, 08:00",
    author: "Emerging Tech Unit",
    tags: ["Quantum", "Enterprise", "Strategy"],
    recommended: false,
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&q=80",
    type: "Research Notes"
  },
  {
    id: "rn-2",
    category: "AI",
    title: "Research Note: AI Ethics Framework Development",
    summary: "Early findings from AI ethics framework research with hypotheses and preliminary conclusions.",
    severity: "High",
    readTime: "4 min",
    timestamp: "Yesterday, 11:00",
    author: "AI Ethics Research",
    tags: ["AI Ethics", "Framework", "Research"],
    recommended: true,
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&q=80",
    type: "Research Notes"
  },

  // 15. WHITE PAPER (2 samples)
  {
    id: "wp-1",
    category: "Research",
    title: "White Paper: Digital Transformation Maturity Framework",
    summary: "Comprehensive research on digital maturity assessment across 6 domains with mixed-methods study.",
    severity: "Medium",
    readTime: "22 min",
    timestamp: "Apr 14, 2026",
    author: "DTMI Research Desk",
    tags: ["Digital Transformation", "Maturity", "Framework"],
    recommended: true,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
    type: "White Paper"
  },
  {
    id: "wp-2",
    category: "AI",
    title: "White Paper: AI Ethics Governance Model",
    summary: "Academic research on AI ethics governance frameworks with peer-reviewed methodology.",
    severity: "High",
    readTime: "18 min",
    timestamp: "Apr 13, 2026",
    author: "AI Ethics Research Unit",
    tags: ["AI Ethics", "Governance", "Research"],
    recommended: true,
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&q=80",
    type: "White Paper"
  },

  // 16. BOOK REVIEW (2 samples)
  {
    id: "br-1",
    category: "Books",
    title: "Book Review: 'The Age of AI' by Henry Kissinger",
    summary: "Critical analysis and summary of key ideas from 'The Age of AI' with evaluation of arguments.",
    severity: "Medium",
    readTime: "6 min",
    timestamp: "Apr 12, 2026",
    author: "Book Review Desk",
    tags: ["AI", "Book Review", "Kissinger"],
    recommended: true,
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&q=80",
    type: "Book Review"
  },
  {
    id: "br-2",
    category: "Books",
    title: "Book Review: 'Digital Transformation 2.0'",
    summary: "Evaluation and summary of key concepts from 'Digital Transformation 2.0' with critical perspective.",
    severity: "High",
    readTime: "7 min",
    timestamp: "Apr 11, 2026",
    author: "DTMI Book Review",
    tags: ["Digital Transformation", "Book Review", "Strategy"],
    recommended: true,
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&q=80",
    type: "Book Review"
  },

  // 17. INFOGRAPHICS (2 samples)
  {
    id: "ig-1",
    category: "AI",
    title: "Infographic: AI Adoption Timeline 2020-2026",
    summary: "Visual timeline of AI adoption milestones from 2020 to 2026 with key statistics and trends.",
    severity: "Medium",
    readTime: "1 min",
    timestamp: "Today, 16:00",
    author: "Visual Intelligence Unit",
    tags: ["AI Adoption", "Timeline", "Visual"],
    recommended: true,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80",
    type: "Infographics"
  },
  {
    id: "ig-2",
    category: "Cloud",
    title: "Infographic: Cloud Migration Journey Map",
    summary: "Visual map of cloud migration journey with stages, timelines, and key decision points.",
    severity: "Low",
    readTime: "1 min",
    timestamp: "Today, 14:30",
    author: "Cloud Visual Desk",
    tags: ["Cloud Migration", "Journey Map", "Visual"],
    recommended: false,
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&q=80",
    type: "Infographics"
  },

  // 18. MICROBLOGS (2 samples)
  {
    id: "mb-1",
    category: "AI",
    title: "Microblog: AI Transparency Matters",
    summary: "One idea: AI transparency is not optional for trust. Quick takeaway for practitioners.",
    severity: "High",
    readTime: "1 min",
    timestamp: "Today, 10:55",
    author: "AI Microblog Desk",
    tags: ["AI Transparency", "Explainability", "Micro"],
    recommended: true,
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&q=80",
    type: "Microblogs"
  },
  {
    id: "mb-2",
    category: "Cloud",
    title: "Microblog: Cloud Cost Awareness",
    summary: "One hook: Cloud costs spiral without visibility. Quick takeaway for finance teams.",
    severity: "Medium",
    readTime: "1 min",
    timestamp: "Today, 09:30",
    author: "Cloud Microblog",
    tags: ["Cloud Cost", "Visibility", "Micro"],
    recommended: false,
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&q=80",
    type: "Microblogs"
  },
];

export const insightCategories = ["All", "AI", "Cloud", "Cybersecurity", "Digital Economy", "DCO", "Governance", "Emerging Tech", "Healthcare", "Finance", "Manufacturing", "Retail", "Strategy", "Books", "Visual", "Social", "Quantum", "Biotech", "Energy", "Technology", "Business", "Economy"];

// --- TREND RADAR -------------------------------------------------------------
export const trendRadarItems = [
  { id: 1, name: "Generative AI", adoption: 61, disruption: 85, readiness: 42, ring: "Adopt", quadrant: "AI & Automation", color: "#3b82f6" },
  { id: 2, name: "Zero-Trust Security", adoption: 74, disruption: 68, readiness: 55, ring: "Adopt", quadrant: "Cybersecurity", color: "#ef4444" },
  { id: 3, name: "Multi-Cloud", adoption: 67, disruption: 58, readiness: 48, ring: "Adopt", quadrant: "Cloud", color: "#0ea5e9" },
  { id: 4, name: "Digital Twins", adoption: 38, disruption: 72, readiness: 28, ring: "Trial", quadrant: "Emerging Tech", color: "#8b5cf6" },
  { id: 5, name: "Edge Computing", adoption: 38, disruption: 65, readiness: 32, ring: "Trial", quadrant: "Infrastructure", color: "#f59e0b" },
  { id: 6, name: "5G Enterprise", adoption: 41, disruption: 48, readiness: 35, ring: "Trial", quadrant: "Infrastructure", color: "#10b981" },
  { id: 7, name: "Quantum Computing", adoption: 12, disruption: 68, readiness: 15, ring: "Assess", quadrant: "Emerging Tech", color: "#ec4899" },
  { id: 8, name: "Blockchain (Enterprise)", adoption: 22, disruption: 28, readiness: 25, ring: "Hold", quadrant: "Infrastructure", color: "#6b7280" },
];

export const trendRadarRings = {
  Adopt: { label: "Adopt", color: "#10b981", description: "Ready for enterprise adoption" },
  Trial: { label: "Trial", color: "#f59e0b", description: "Evaluate for specific use cases" },
  Assess: { label: "Assess", color: "#8b5cf6", description: "Understand potential impact" },
  Hold: { label: "Hold", color: "#6b7280", description: "Monitor but don't invest yet" },
};

// --- AI ENGINE ---------------------------------------------------------------
export const aiResponses = [
  {
    id: 1,
    query: "What are the key trends in AI adoption for 2026?",
    response: "AI adoption reached 61% in Q1 2026 — the highest level ever recorded. Key trends include: 1) Generative AI integration in 78% of Fortune 500 workflows, 2) AI governance frameworks becoming a competitive differentiator (3.2x better outcomes), 3) Multimodal AI convergence accelerating, 4) Edge AI deployment growing 40% YoY.",
    timestamp: "Today, 14:30",
    confidence: 92,
    sources: ["DTMI AI Adoption Index Q1 2026", "Global Enterprise Survey 2026"],
  },
  {
    id: 2,
    query: "How should we approach zero-trust implementation?",
    response: "Zero-trust implementation requires a phased approach: 1) Complete identity infrastructure foundation (critical for 54% of successful implementations), 2) Segment implementation into manageable phases (18-36 month timeline), 3) Treat it as organizational transformation, not technology deployment, 4) Establish cross-functional governance beyond CISO office.",
    timestamp: "Today, 11:45",
    confidence: 88,
    sources: ["DTMI Zero-Trust Implementation Guide 2026", "340 Enterprise Case Studies"],
  },
];

export const aiSuggestedQueries = [
  "What are the compliance requirements for EU AI Act?",
  "How to measure ROI from digital transformation?",
  "What's the current state of quantum computing readiness?",
  "How to build an AI governance framework?",
  "What are the best practices for multi-cloud strategy?",
  "How to address the digital talent gap?",
  "What governance risks should executives prioritize?",
  "Generate an executive summary for the board",
];


// --- SIXD FRAMEWORK ----------------------------------------------------------
export const sixDFramework = {
  title: "6xD Framework",
  subtitle: "Six strategic domains for digital transformation",
  pillars: [
    {
      id: "D1",
      code: "D1",
      name: "Digital Economy",
      tagline: "Economy 4.0 & platform models",
      icon: "TrendingUp",
      description: "Platform economies, digital value chains, and the $4.2T GDP opportunity",
      color: "#3b82f6",
      stat: "42%",
      statLabel: "Platform Economy Growth",
      articles: [
        { title: "Platform Economics: The New Business Model", severity: "High", timestamp: "Today, 09:30", readTime: "6 min" },
        { title: "Digital Value Chains in Economy 4.0", severity: "Medium", timestamp: "Yesterday, 14:20", readTime: "5 min" },
        { title: "The $4.2T GDP Opportunity Explained", severity: "Critical", timestamp: "Apr 22, 2026", readTime: "8 min" }
      ]
    },
    {
      id: "D2",
      code: "D2",
      name: "DCO",
      tagline: "Digital Cognitive Organizations",
      icon: "Brain",
      description: "AI-native organizations, cognitive workflows, and decision intelligence",
      color: "#8b5cf6",
      stat: "3.2x",
      statLabel: "Performance Improvement",
      articles: [
        { title: "Building AI-Native Organizations", severity: "High", timestamp: "Today, 11:15", readTime: "7 min" },
        { title: "Cognitive Workflows: A Practical Guide", severity: "High", timestamp: "Yesterday, 16:45", readTime: "6 min" },
        { title: "Decision Intelligence Frameworks", severity: "Medium", timestamp: "Apr 21, 2026", readTime: "5 min" }
      ]
    },
    {
      id: "D3",
      code: "D3",
      name: "Digital Business Platforms",
      tagline: "DBP architecture & ecosystems",
      icon: "Layers",
      description: "Platform business models, API ecosystems, and digital marketplaces",
      color: "#0ea5e9",
      stat: "$180B",
      statLabel: "Market Valuation",
      articles: [
        { title: "API Ecosystem Design Patterns", severity: "Medium", timestamp: "Today, 10:00", readTime: "6 min" },
        { title: "Digital Marketplace Architecture", severity: "Medium", timestamp: "Yesterday, 13:30", readTime: "7 min" },
        { title: "Platform Business Model Canvas", severity: "Low", timestamp: "Apr 20, 2026", readTime: "5 min" }
      ]
    },
    {
      id: "D4",
      code: "D4",
      name: "Digital Transformation 2.0",
      tagline: "DT2.0 strategy & execution",
      icon: "Building2",
      description: "Next-generation transformation frameworks, change management, and ROI measurement",
      color: "#10b981",
      stat: "60%",
      statLabel: "Success Rate with DT2.0",
      articles: [
        { title: "Why 60% of DT Programs Fail", severity: "High", timestamp: "Today, 08:45", readTime: "8 min" },
        { title: "Change Management in DT2.0", severity: "Medium", timestamp: "Yesterday, 15:20", readTime: "6 min" },
        { title: "Measuring Transformation ROI", severity: "Medium", timestamp: "Apr 19, 2026", readTime: "7 min" }
      ]
    },
    {
      id: "D5",
      code: "D5",
      name: "Digital Worker & Workspace",
      tagline: "Future of work & digital talent",
      icon: "Shield",
      description: "Hybrid work models, digital skills, and workforce transformation",
      color: "#f59e0b",
      stat: "74%",
      statLabel: "Hybrid Work Adoption",
      articles: [
        { title: "The Digital Talent Gap Crisis", severity: "Critical", timestamp: "Today, 12:30", readTime: "6 min" },
        { title: "Hybrid Work Models That Work", severity: "High", timestamp: "Yesterday, 10:15", readTime: "5 min" },
        { title: "Digital Skills Framework 2026", severity: "Medium", timestamp: "Apr 18, 2026", readTime: "7 min" }
      ]
    },
    {
      id: "D6",
      code: "D6",
      name: "Digital Accelerators",
      tagline: "AI, automation & emerging tech",
      icon: "BarChart2",
      description: "Generative AI, automation, and technology adoption curves",
      color: "#ef4444",
      stat: "61%",
      statLabel: "AI Adoption Rate",
      articles: [
        { title: "GenAI Adoption Accelerates 15%", severity: "Critical", timestamp: "Today, 07:30", readTime: "8 min" },
        { title: "Automation ROI: The Real Numbers", severity: "High", timestamp: "Yesterday, 09:45", readTime: "6 min" },
        { title: "Emerging Tech Adoption Curves", severity: "Medium", timestamp: "Apr 17, 2026", readTime: "5 min" }
      ]
    }
  ]
};

// --- PODCAST EPISODES --------------------------------------------------------
export const podcastEpisodes = [
  {
    id: "pod-1",
    title: "The Future of AI Governance",
    host: "Dr. Sarah Chen",
    duration: "42:18",
    category: "AI",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80",
    description: "Deep dive into AI governance frameworks and implementation strategies",
    timestamp: "Apr 23, 2026",
    listens: "12.4K"
  },
  {
    id: "pod-2",
    title: "Zero-Trust Implementation Guide",
    host: "Marcus Webb",
    duration: "35:42",
    category: "Cybersecurity",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&q=80",
    description: "Practical guide to implementing zero-trust architecture in enterprise environments",
    timestamp: "Apr 22, 2026",
    listens: "8.7K"
  },
  {
    id: "pod-3",
    title: "Digital Transformation ROI",
    host: "Priya Nair",
    duration: "28:15",
    category: "Strategy",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&q=80",
    description: "Measuring and maximizing ROI from digital transformation initiatives",
    timestamp: "Apr 21, 2026",
    listens: "6.2K"
  },
  {
    id: "pod-4",
    title: "Cloud Cost Optimization",
    host: "Alex Rodriguez",
    duration: "31:45",
    category: "Cloud",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
    description: "Strategies for optimizing cloud spend and avoiding technical debt",
    timestamp: "Apr 20, 2026",
    listens: "5.8K"
  },
  {
    id: "pod-5",
    title: "AI Ethics in Practice",
    host: "Dr. Sarah Chen",
    duration: "39:22",
    category: "AI",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80",
    description: "Practical approaches to implementing AI ethics frameworks",
    timestamp: "Apr 19, 2026",
    listens: "7.3K"
  }
];

// --- VIDEO EPISODES ----------------------------------------------------------
export const videoEpisodes = [
  {
    id: "vid-1",
    title: "Digital Transformation in Government",
    duration: "42:18",
    category: "DCO",
    image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=600&q=80",
    description: "Trends and insights on digital transformation in public sector",
    timestamp: "Apr 23, 2026",
    views: "12.4K"
  },
  {
    id: "vid-2",
    title: "Building AI-Native Organizations",
    duration: "18:05",
    category: "AI",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&q=80",
    description: "Playbook for executives on creating AI-native organizational structures",
    timestamp: "Apr 22, 2026",
    views: "8.7K"
  },
  {
    id: "vid-3",
    title: "Cybersecurity in the Age of AI",
    duration: "35:42",
    category: "Cybersecurity",
    image: "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?w=600&q=80",
    description: "Threats and defenses in AI-powered cybersecurity landscape",
    timestamp: "Apr 21, 2026",
    views: "6.2K"
  },
  {
    id: "vid-4",
    title: "Multi-Cloud Strategy Deep Dive",
    duration: "29:15",
    category: "Cloud",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&q=80",
    description: "Comprehensive analysis of multi-cloud architecture patterns",
    timestamp: "Apr 20, 2026",
    views: "5.4K"
  },
  {
    id: "vid-5",
    title: "Future of Work 2026",
    duration: "33:28",
    category: "Workspace",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80",
    description: "Trends and predictions for the future of digital workspaces",
    timestamp: "Apr 19, 2026",
    views: "4.9K"
  }
];

// --- PAGE META DATA ----------------------------------------------------------
// Used by PageMeta component to set document.title + meta description per page.

export const pageMeta = {
  // ── Core pages ──
  Latest: {
    title: 'Home',
    description: 'DTMI by DigitalQatalyst — the leading intelligence platform for digital transformation leaders. Signal, Insight, Deep Analysis, and executive briefings.',
  },
  About: {
    title: 'About DTMI',
    description: 'Learn about DigitalQatalyst Think-Tank, the DTMI editorial team, the 6xD framework, and our mission to deliver world-class digital transformation intelligence.',
  },
  Multimedia: {
    title: 'Multimedia',
    description: 'Videos, podcasts, and visual intelligence from the DTMI research team — expert conversations on AI, cloud, cybersecurity, and digital transformation.',
  },
  Glossary: {
    title: 'Glossary of Digital Transformation Terms',
    description: 'The definitive A–Z reference for Economy 4.0, DCO, AI, cybersecurity, cloud, and digital platform terminology — curated by the DTMI Research Desk.',
  },
  Books: {
    title: 'DTMB Book Library',
    description: 'Curated books and exclusive DTMB research volumes for digital transformation leaders — from AI strategy to platform economics and organizational design.',
  },
  Research: {
    title: 'Research Intelligence',
    description: 'Premium whitepapers, research reports, policy briefs, and industry analyses from the DigitalQatalyst think-tank for digital transformation executives.',
  },

  // ── Intelligence layers ──
  Signal: {
    title: 'Signal Intelligence',
    description: 'Real-time executive awareness, urgent alerts, and frontier monitoring — early signals and trend alerts for digital transformation leaders.',
  },
  Insight: {
    title: 'Insight Intelligence',
    description: 'Structured analysis, conceptual frameworks, and expert perspectives on digital transformation, AI, cloud, and organizational strategy.',
  },
  'Deep Analysis': {
    title: 'Deep Analysis',
    description: 'Comprehensive whitepapers, strategic essays, and long-form research for complex decision-making in the digital age.',
  },
  'Trend Radar': {
    title: 'DTMI Trend Radar',
    description: 'Interactive technology adoption and disruption map — track where AI, cloud, cybersecurity, and emerging tech sit on the adoption curve.',
  },
  'AI Engine': {
    title: 'DTMI AI Insight Engine',
    description: 'Query the DTMI intelligence database using AI — get instant answers, executive summaries, and strategic insights from our research corpus.',
  },
  'Insight Cards': {
    title: 'Insight Cards',
    description: 'Bite-sized intelligence cards covering AI, cloud, cybersecurity, and digital transformation — curated for busy executives.',
  },

  // ── 6xD Domains ──
  D1: {
    title: 'D1 — Digital Economy',
    description: 'Economy 4.0, platform business models, digital value chains, and the $4.2 trillion GDP opportunity — DTMI intelligence on the digital economy.',
  },
  D2: {
    title: 'D2 — Digital Cognitive Organizations',
    description: 'DCO framework, AI-native organizations, cognitive workflows, and decision intelligence — DTMI research on the future of organizational design.',
  },
  D3: {
    title: 'D3 — Digital Business Platforms',
    description: 'DBP architecture, API ecosystems, platform business models, and digital marketplaces — DTMI intelligence on platform strategy.',
  },
  D4: {
    title: 'D4 — Digital Transformation 2.0',
    description: 'DT2.0 strategy, execution frameworks, change management, and ROI measurement — DTMI research on next-generation transformation.',
  },
  D5: {
    title: 'D5 — Digital Worker & Workspace',
    description: 'Future of work, digital talent, hybrid workspace models, and workforce transformation — DTMI intelligence on the digital worker.',
  },
  D6: {
    title: 'D6 — Digital Accelerators',
    description: 'AI, automation, and emerging technology accelerators — DTMI research on generative AI, edge computing, quantum, and digital acceleration.',
  },
  '6xD Framework': {
    title: '6xD Framework',
    description: 'The DigitalQatalyst 6xD Framework — six strategic domains structuring all DTMI research: Digital Economy, DCO, DBP, DT2.0, Digital Worker, and Accelerators.',
  },

  // ── Sectors ──
  'Economy 4.0':       { title: 'Economy 4.0',       description: 'Platform economies, digital value chains, and the $4.2T GDP opportunity — DTMI sector intelligence.' },
  'Experience 4.0':    { title: 'Experience 4.0',    description: 'Digital customer experience, CX transformation, and experience-led growth — DTMI sector intelligence.' },
  'Intelligence 4.0':  { title: 'Intelligence 4.0',  description: 'AI-driven intelligence, data strategy, and analytics transformation — DTMI sector intelligence.' },
  'Workspace 4.0':     { title: 'Workspace 4.0',     description: 'Digital workspace transformation, hybrid work, and the future of the office — DTMI sector intelligence.' },
  'Government 4.0':    { title: 'Government 4.0',    description: 'Digital government transformation, public sector AI, and e-governance — DTMI sector intelligence.' },
  'Services 4.0':      { title: 'Services 4.0',      description: 'Digital services transformation, platform-based service delivery, and service innovation — DTMI intelligence.' },
  'Retail 4.0':        { title: 'Retail 4.0',        description: 'Digital retail transformation, omnichannel strategy, and commerce innovation — DTMI sector intelligence.' },
  'Healthcare 4.0':    { title: 'Wellness 4.0',      description: 'Digital health transformation, AI in healthcare, and wellness technology — DTMI sector intelligence.' },
  'Mining 4.0':        { title: 'Mining 4.0',        description: 'Digital transformation in mining, Industry 4.0 adoption, and smart extraction — DTMI sector intelligence.' },
  'Farming 4.0':       { title: 'Farming 4.0',       description: 'AgriTech, precision farming, and digital agriculture transformation — DTMI sector intelligence.' },
  'Logistics 4.0':     { title: 'Logistics 4.0',     description: 'Supply chain digitization, smart logistics, and last-mile innovation — DTMI sector intelligence.' },

  // ── Technology platforms ──
  Technology: {
    title: 'Technology Platforms',
    description: 'DTMI intelligence on DXP, DWS, DIA, and SDO digital platforms — architecture, adoption, and strategic deployment for enterprise leaders.',
  },
};

// Helper: get meta for a content item (article, video, podcast, etc.)
// Falls back gracefully if no meta is defined on the item.
export function getContentMeta(item) {
  if (!item) return { title: '', description: '' };
  return {
    title:       item.headline || item.title || '',
    description: item.summary  || item.description || item.hook || '',
  };
}
