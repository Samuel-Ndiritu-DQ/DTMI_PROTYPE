import { useState, useEffect } from 'react';
import {
  Plus, Search, Edit2, Trash2, Eye, FileText, Video,
  Headphones, BookOpen, X, ChevronDown, ChevronUp,
  Clock, User, Tag, Globe, AlertCircle, CheckCircle,
  Save, ArrowLeft, MoreVertical, Filter, Grid, List,
  TrendingUp, Calendar, Hash, Link, Image, Mic
} from 'lucide-react';

// ”€”€”€ MOCK DATA ”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€
const INITIAL_ITEMS = [
  {
    id: 1, type: 'Article', category: 'AI', status: 'Published',
    title: 'AI adoption accelerates by 15% in Q1 2026',
    excerpt: 'From manufacturing floors to government ministries, generative AI is no longer a pilot program.',
    author: 'Carimi Medah', views: '12.4K', date: 'Apr 23, 2026',
    readTime: '8 min', tags: ['GenAI', 'Workforce', 'Productivity'],
    metaTitle: 'AI Adoption Accelerates 15% in Q1 2026 | DTMI',
    metaDescription: 'DTMI research reveals AI adoption surged 15% in Q1 2026. Discover what this means for enterprise strategy and workforce transformation.',
    metaKeywords: 'AI adoption, generative AI, enterprise AI, digital transformation 2026',
    slug: 'ai-adoption-accelerates-q1-2026',
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&q=60',
    featured: true,
  },
  {
    id: 2, type: 'Article', category: 'Governance', status: 'Published',
    title: 'EU AI Act: compliance checklist for executives',
    excerpt: 'The EU AI Act compliance deadline is Q3 2026. Non-compliant organizations face fines up to 6% of global annual revenue.',
    author: 'Hellen Mweu', views: '9.8K', date: 'Apr 22, 2026',
    readTime: '9 min', tags: ['AI Act', 'Compliance', 'EU'],
    metaTitle: 'EU AI Act Compliance Checklist for Executives | DTMI',
    metaDescription: 'Complete executive guide to EU AI Act compliance before the Q3 2026 deadline. Avoid fines up to 6% of global revenue.',
    metaKeywords: 'EU AI Act, AI compliance, AI regulation, executive guide',
    slug: 'eu-ai-act-compliance-checklist',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&q=60',
    featured: false,
  },
  {
    id: 3, type: 'Video', category: 'AI', status: 'Published',
    title: 'Building AI-Native Organizations: A Playbook for Executives',
    excerpt: 'A step-by-step guide for executives on embedding AI into organizational DNA €” from strategy to execution.',
    author: 'Marcus Webb', views: '8.7K', date: 'Apr 22, 2026',
    readTime: '18 min', tags: ['AI', 'Workplace', 'ROI'],
    metaTitle: 'Building AI-Native Organizations: Executive Playbook | DTMI',
    metaDescription: 'Watch our executive masterclass on building AI-native organizations. Practical frameworks for embedding AI into your organizational DNA.',
    metaKeywords: 'AI-native organizations, AI strategy, executive playbook, AI transformation',
    slug: 'building-ai-native-organizations-playbook',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&q=60',
    featured: true,
    duration: '18:05',
  },
  {
    id: 4, type: 'Podcast', category: 'DCO', status: 'Published',
    title: 'Digital Transformation in Government €“ Trends and Insights',
    excerpt: 'Exploring how governments are leveraging DCO frameworks to modernize public services.',
    author: 'Dr. Sarah Chen', views: '12.4K', date: 'Apr 23, 2026',
    readTime: '42 min', tags: ['DCO', 'Government', 'Digital Services'],
    metaTitle: 'Digital Transformation in Government Podcast | DTMI',
    metaDescription: 'Expert discussion on how governments worldwide are adopting DCO frameworks to modernize public services and improve citizen outcomes.',
    metaKeywords: 'government digital transformation, DCO, public sector, digital services',
    slug: 'digital-transformation-government-trends',
    image: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=400&q=60',
    featured: false,
    episode: 'EP 47',
  },
  {
    id: 5, type: 'Article', category: 'Cybersecurity', status: 'Published',
    title: 'Zero-Trust in the Age of Remote Work',
    excerpt: 'With 74% of enterprises operating hybrid workforces, zero-trust frameworks have become the de facto security standard.',
    author: 'Priya Nair', views: '8.2K', date: 'Apr 21, 2026',
    readTime: '6 min', tags: ['Zero-Trust', 'Remote Work', 'Security'],
    metaTitle: 'Zero-Trust Security in the Age of Remote Work | DTMI',
    metaDescription: 'Why zero-trust is now non-negotiable for hybrid enterprises. Implementation guide and best practices for 2026.',
    metaKeywords: 'zero-trust, cybersecurity, remote work, hybrid workforce, network security',
    slug: 'zero-trust-remote-work-2026',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=400&q=60',
    featured: false,
  },
  {
    id: 6, type: 'Book', category: 'Digital Economy', status: 'Published',
    title: 'Economy 4.0: The New Economic Paradigm',
    excerpt: 'A comprehensive exploration of the Economy 4.0 paradigm €” how digital technologies are reshaping value creation.',
    author: 'Dr. S. Niango', views: '3.1K', date: 'Apr 20, 2026',
    readTime: '45 min', tags: ['Economy 4.0', 'Digital Economy', 'Platform'],
    metaTitle: 'Economy 4.0: The New Economic Paradigm | DTMB Books',
    metaDescription: 'DigitalQatalyst flagship research volume on Economy 4.0 €” the definitive guide to the new economic paradigm driven by digital technologies.',
    metaKeywords: 'Economy 4.0, digital economy, platform economics, digital transformation',
    slug: 'economy-4-new-economic-paradigm',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&q=60',
    featured: true,
    volume: 'Vol. 1',
  },
  {
    id: 7, type: 'Article', category: 'DCO', status: 'Draft',
    title: 'DCO Framework v3.0 €” Executive Guide',
    excerpt: 'The updated DCO maturity model introduces new benchmarks for 2026 and beyond.',
    author: 'Carimi Medah', views: '€”', date: 'Apr 24, 2026',
    readTime: '7 min', tags: ['DCO', 'Framework', 'Maturity'],
    metaTitle: 'DCO Framework v3.0 Executive Guide | DTMI',
    metaDescription: 'Complete guide to the updated DCO Framework v3.0 €” new maturity benchmarks, implementation roadmap, and case studies.',
    metaKeywords: 'DCO framework, digital cognitive organization, maturity model, digital transformation',
    slug: 'dco-framework-v3-executive-guide',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&q=60',
    featured: false,
  },
  {
    id: 8, type: 'Article', category: 'Emerging Tech', status: 'Draft',
    title: 'Quantum Computing: Enterprise Readiness Assessment',
    excerpt: 'Only 12% of enterprises have active quantum strategies. Early adopters report 10x speedups.',
    author: 'Devin Rajapkse', views: '€”', date: 'Apr 24, 2026',
    readTime: '10 min', tags: ['Quantum', 'Enterprise', 'Strategy'],
    metaTitle: 'Quantum Computing Enterprise Readiness Assessment 2026 | DTMI',
    metaDescription: 'Is your enterprise ready for quantum computing? DTMI assessment framework and strategic roadmap for quantum adoption.',
    metaKeywords: 'quantum computing, enterprise strategy, quantum readiness, emerging technology',
    slug: 'quantum-computing-enterprise-readiness',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&q=60',
    featured: false,
  },
  {
    id: 9, type: 'Podcast', category: 'Cybersecurity', status: 'Published',
    title: 'Cybersecurity in the Age of AI: Threats and Defenses',
    excerpt: 'How AI is both amplifying cyber threats and enabling next-generation defense strategies.',
    author: 'Priya Nair', views: '9.1K', date: 'Apr 21, 2026',
    readTime: '35 min', tags: ['Cybersecurity', 'AI', 'Zero-Trust'],
    metaTitle: 'Cybersecurity in the Age of AI Podcast | DTMI',
    metaDescription: 'Expert panel discussion on AI-powered cyber threats and next-generation defense strategies for enterprise security teams.',
    metaKeywords: 'cybersecurity AI, AI threats, cyber defense, enterprise security',
    slug: 'cybersecurity-age-of-ai-podcast',
    image: 'https://images.unsplash.com/photo-1510511459019-5dda7724fd87?w=400&q=60',
    featured: false,
    episode: 'EP 46',
  },
  {
    id: 10, type: 'Article', category: 'Cloud', status: 'Review',
    title: 'FinOps is now a C-suite priority as cloud spend overruns hit 43%',
    excerpt: 'Cloud cost optimization has moved from IT to the boardroom.',
    author: 'Hellen Mweu', views: '€”', date: 'Apr 23, 2026',
    readTime: '7 min', tags: ['FinOps', 'Cloud', 'Cost'],
    metaTitle: 'FinOps: C-Suite Priority as Cloud Spend Overruns Hit 43% | DTMI',
    metaDescription: 'Why FinOps has become a boardroom priority and how leading organizations are closing the cloud cost gap.',
    metaKeywords: 'FinOps, cloud cost optimization, cloud spend, C-suite, cloud management',
    slug: 'finops-csuite-priority-cloud-spend',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&q=60',
    featured: false,
  },
  {
    id: 11, type: 'Article', category: 'Cloud', status: 'Published',
    title: 'Multi-Cloud Strategy: Avoiding Vendor Lock-In',
    excerpt: 'Enterprises adopting multi-cloud architectures report 18% lower operational costs.',
    author: 'Carimi Medah', views: '5.2K', date: 'Apr 19, 2026',
    readTime: '7 min', tags: ['Multi-Cloud', 'Architecture', 'Cost'],
    metaTitle: 'Multi-Cloud Strategy: Avoiding Vendor Lock-In | DTMI',
    metaDescription: 'How to build a resilient multi-cloud strategy that avoids vendor lock-in and reduces operational costs by up to 18%.',
    metaKeywords: 'multi-cloud, vendor lock-in, cloud strategy, cloud architecture',
    slug: 'multi-cloud-strategy-vendor-lock-in',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&q=60',
    featured: false,
  },
  {
    id: 12, type: 'Video', category: 'Intelligence', status: 'Published',
    title: 'DTMI Live: Q1 2026 Transformation Index Review',
    excerpt: 'Our quarterly deep-dive into the DTMI Transformation Index €” what moved, what stalled.',
    author: 'DTMI Research', views: '15.2K', date: 'Apr 20, 2026',
    readTime: '24 min', tags: ['Intelligence', 'Index', 'Quarterly'],
    metaTitle: 'DTMI Live: Q1 2026 Transformation Index Review | DTMI',
    metaDescription: 'Watch the Q1 2026 DTMI Transformation Index quarterly review €” key movements, stalled sectors, and strategic implications.',
    metaKeywords: 'DTMI index, transformation index, Q1 2026, digital transformation review',
    slug: 'dtmi-live-q1-2026-transformation-index',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&q=60',
    featured: false,
    duration: '24:30',
  },
];

const TYPE_CONFIG = {
  Article: { icon: FileText,  color: '#e8500a', bg: 'rgba(232,80,10,0.12)',  border: 'rgba(232,80,10,0.25)'  },
  Video:   { icon: Video,     color: '#0a7ea4', bg: 'rgba(10,126,164,0.12)', border: 'rgba(10,126,164,0.25)' },
  Podcast: { icon: Headphones,color: '#8b5cf6', bg: 'rgba(139,92,246,0.12)',border: 'rgba(139,92,246,0.25)' },
  Book:    { icon: BookOpen,  color: '#f59e0b', bg: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.25)' },
};

const STATUS_CONFIG = {
  Published: { color: '#10b981', bg: 'rgba(16,185,129,0.12)',  border: 'rgba(16,185,129,0.3)',  dot: '#10b981' },
  Draft:     { color: '#94a3b8', bg: 'rgba(148,163,184,0.12)', border: 'rgba(148,163,184,0.3)', dot: '#64748b' },
  Review:    { color: '#f59e0b', bg: 'rgba(245,158,11,0.12)',  border: 'rgba(245,158,11,0.3)',  dot: '#f59e0b' },
  Archived:  { color: '#ef4444', bg: 'rgba(239,68,68,0.12)',   border: 'rgba(239,68,68,0.3)',   dot: '#ef4444' },
};

const CATEGORIES = ['AI', 'Cloud', 'Cybersecurity', 'Digital Economy', 'DCO', 'Governance', 'Emerging Tech', 'Intelligence'];
const TYPES      = ['Article', 'Video', 'Podcast', 'Book'];
const AUTHORS    = ['Carimi Medah', 'Hellen Mweu', 'Marcus Webb', 'Dr. Sarah Chen', 'Priya Nair', 'Dr. S. Niango', 'Devin Rajapkse', 'DTMI Research'];

const SUB_KEY_MAP = {
  'content:signal':        { type: 'All', category: 'All', section: 'Signal'            },
  'content:insight':       { type: 'All', category: 'All', section: 'Insight'           },
  'content:deep-analysis': { type: 'All', category: 'All', section: 'Deep Analysis'     },
  'content:books':         { type: 'Book',    category: 'All', section: 'DTMB Books'    },
  'content:feed':          { type: 'Article', category: 'Intelligence', section: 'Intelligence Feed' },
  'content:trend-radar':   { type: 'All', category: 'Emerging Tech', section: 'Trend Radar' },
  'content:ai-engine':     { type: 'All', category: 'AI', section: 'AI Engine'          },
  'content:d1':            { type: 'All', category: 'Digital Economy', section: 'D1'    },
  'content:d2':            { type: 'All', category: 'DCO',             section: 'D2'    },
  'content:d3':            { type: 'All', category: 'Cloud',           section: 'D3'    },
  'content:d4':            { type: 'All', category: 'AI',              section: 'D4'    },
  'content:d5':            { type: 'All', category: 'AI',              section: 'D5'    },
  'content:d6':            { type: 'All', category: 'Emerging Tech',   section: 'D6'    },
  'content:economy40':     { type: 'All', category: 'Digital Economy', section: 'Economy 4.0'      },
  'content:experience40':  { type: 'All', category: 'Digital Economy', section: 'Experience 4.0'   },
  'content:intelligence40':{ type: 'All', category: 'AI',              section: 'Intelligence 4.0' },
  'content:workspace40':   { type: 'All', category: 'AI',              section: 'Workspace 4.0'    },
  'content:mining40':      { type: 'All', category: 'Emerging Tech',   section: 'Mining 4.0'       },
  'content:farming40':     { type: 'All', category: 'Emerging Tech',   section: 'Farming 4.0'      },
  'content:plant40':       { type: 'All', category: 'Emerging Tech',   section: 'Plant 4.0'        },
  'content:logistics40':   { type: 'All', category: 'Cloud',           section: 'Logistics 4.0'    },
  'content:infra40':       { type: 'All', category: 'Cloud',           section: 'Infrastructure 4.0'},
  'content:govt40':        { type: 'All', category: 'DCO',             section: 'Government 4.0'   },
  'content:services40':    { type: 'All', category: 'DCO',             section: 'Services 4.0'     },
  'content:retail40':      { type: 'All', category: 'Digital Economy', section: 'Retail 4.0'       },
  'content:hospitality40': { type: 'All', category: 'Digital Economy', section: 'Hospitality 4.0'  },
  'content:wellness40':    { type: 'All', category: 'Digital Economy', section: 'Wellness 4.0'     },
  'content:dxp-channels':  { type: 'All', category: 'Cloud',           section: 'DXP-Channels'     },
  'content:dxp-experience':{ type: 'All', category: 'AI',              section: 'DXP-Experience'   },
  'content:dxp-services':  { type: 'All', category: 'Cloud',           section: 'DXP-Services'     },
  'content:dxp-marcom':    { type: 'All', category: 'Digital Economy', section: 'DXP-MarCom'       },
  'content:dws-workspace': { type: 'All', category: 'AI',              section: 'DWS-Workspace'    },
  'content:dws-core':      { type: 'All', category: 'Cloud',           section: 'DWS-Core'         },
  'content:dws-gprc':      { type: 'All', category: 'Governance',      section: 'DWS-GPRC'         },
  'content:dws-backoffice':{ type: 'All', category: 'Cloud',           section: 'DWS-BackOffice'   },
  'content:dia-analytics': { type: 'All', category: 'AI',              section: 'DIA-Analytics'    },
  'content:dia-ai':        { type: 'All', category: 'AI',              section: 'DIA-AI'           },
  'content:sdo-it':        { type: 'All', category: 'Cloud',           section: 'SDO-IT'           },
  'content:sdo-interop':   { type: 'All', category: 'Cloud',           section: 'SDO-Interop'      },
  'content:sdo-security':  { type: 'All', category: 'Cybersecurity',   section: 'SDO-Security'     },
  'content:podcasts':      { type: 'Podcast', category: 'All',         section: 'Podcasts'         },
  'content:videos':        { type: 'Video',   category: 'All',         section: 'Videos'           },
};

// ”€”€”€ SECTION TAXONOMY (all 5 groups + subcategories) ”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€
export const SECTION_GROUPS = [
  {
    group: 'Intelligence',
    color: '#0a7ea4',
    items: [
      { key: 'Signal',            label: 'Signal',                desc: 'Early signals & trend alerts' },
      { key: 'Insight',           label: 'Insight',               desc: 'Analysis & framework explainers' },
      { key: 'Deep Analysis',     label: 'Deep Analysis',         desc: 'Whitepapers, essays & research' },
      { key: 'DTMB Books',        label: 'DTMB Books',            desc: 'Flagship research volumes' },
      { key: 'Intelligence Feed', label: 'Intelligence Feed',     desc: 'Real-time transformation signals' },
      { key: 'Trend Radar',       label: 'Trend Radar',           desc: 'Tech adoption & disruption map' },
      { key: 'AI Engine',         label: 'AI Engine',             desc: 'Query DTMI AI for insights' },
    ],
  },
  {
    group: '6xD Domains',
    color: '#8b5cf6',
    items: [
      { key: 'D1',  label: 'D1 €” Digital Economy',               desc: 'Economy 4.0 & platform models' },
      { key: 'D2',  label: 'D2 €” DCO',                           desc: 'Digital Cognitive Organizations' },
      { key: 'D3',  label: 'D3 €” Digital Business Platforms',    desc: 'DBP architecture & ecosystems' },
      { key: 'D4',  label: 'D4 €” Digital Transformation 2.0',    desc: 'DT2.0 strategy & execution' },
      { key: 'D5',  label: 'D5 €” Digital Worker & Workspace',    desc: 'Future of work & digital talent' },
      { key: 'D6',  label: 'D6 €” Digital Accelerators',          desc: 'AI, automation & emerging tech' },
    ],
  },
  {
    group: 'Sectors',
    color: '#10b981',
    items: [
      { key: 'Economy 4.0',       label: 'Economy 4.0',          desc: 'Cross-sector digital economy' },
      { key: 'Experience 4.0',    label: 'Experience 4.0',       desc: 'Customer & citizen experience' },
      { key: 'Intelligence 4.0',  label: 'Intelligence 4.0',     desc: 'Data & AI-driven intelligence' },
      { key: 'Workspace 4.0',     label: 'Workspace 4.0',        desc: 'Digital workplace & collaboration' },
      { key: 'Mining 4.0',        label: 'Mining 4.0',           desc: 'Primary sector €” mining' },
      { key: 'Farming 4.0',       label: 'Farming 4.0',          desc: 'Primary sector €” agriculture' },
      { key: 'Plant 4.0',         label: 'Plant 4.0',            desc: 'Secondary sector €” manufacturing' },
      { key: 'Logistics 4.0',     label: 'Logistics 4.0',        desc: 'Secondary sector €” supply chain' },
      { key: 'Infrastructure 4.0',label: 'Infrastructure 4.0',   desc: 'Secondary sector €” infrastructure' },
      { key: 'Government 4.0',    label: 'Government 4.0',       desc: 'Tertiary sector €” public services' },
      { key: 'Services 4.0',      label: 'Services 4.0',         desc: 'Tertiary sector €” professional services' },
      { key: 'Retail 4.0',        label: 'Retail 4.0',           desc: 'Tertiary sector €” retail & commerce' },
      { key: 'Hospitality 4.0',   label: 'Hospitality 4.0',      desc: 'Quaternary sector €” hospitality' },
      { key: 'Wellness 4.0',      label: 'Wellness 4.0',         desc: 'Quaternary sector €” health & wellness' },
    ],
  },
  {
    group: 'Technology (DBP)',
    color: '#f59e0b',
    items: [
      { key: 'DXP-Channels',   label: 'DXP €” Digital Channels',       desc: 'Web, mobile, portals, storefronts' },
      { key: 'DXP-Experience', label: 'DXP €” Digital Experience',      desc: 'UX, journey orchestration, personalization' },
      { key: 'DXP-Services',   label: 'DXP €” Digital Services',        desc: 'Customer service & digital delivery' },
      { key: 'DXP-MarCom',     label: 'DXP €” Digital MarCom',          desc: 'Marketing automation & campaigns' },
      { key: 'DWS-Workspace',  label: 'DWS €” Digital Workspace',       desc: 'Collaboration & productivity tools' },
      { key: 'DWS-Core',       label: 'DWS €” Digital Core (ERP)',       desc: 'ERP & operational systems' },
      { key: 'DWS-GPRC',       label: 'DWS €” Digital GPRC',            desc: 'Governance, performance, risk & compliance' },
      { key: 'DWS-BackOffice', label: 'DWS €” Digital Back Office',      desc: 'Finance, HR, procurement & admin' },
      { key: 'DIA-Analytics',  label: 'DIA €” Digital Analytics',        desc: 'Data platforms & BI systems' },
      { key: 'DIA-AI',         label: 'DIA €” Digital Intelligence (AI)', desc: 'ML, AI copilots & predictive systems' },
      { key: 'SDO-IT',         label: 'SDO €” Digital IT (Cloud)',        desc: 'Cloud infrastructure & DevOps' },
      { key: 'SDO-Interop',    label: 'SDO €” Digital Interoperability',  desc: 'Integration platforms & APIs' },
      { key: 'SDO-Security',   label: 'SDO €” Digital Security',          desc: 'Cybersecurity & identity management' },
    ],
  },
  {
    group: 'Multimedia',
    color: '#ec4899',
    items: [
      { key: 'Podcasts', label: 'Podcasts', desc: 'Audio episodes & interviews' },
      { key: 'Videos',   label: 'Videos',   desc: 'Video briefings & explainers' },
    ],
  },
];

// Flat lookup: key †’ group color
export const SECTION_COLOR_MAP = {};
SECTION_GROUPS.forEach(g => g.items.forEach(i => { SECTION_COLOR_MAP[i.key] = g.color; }));

const EMPTY_FORM = {
  title: '', type: 'Article', category: 'AI', status: 'Draft',
  section: '',   // † new: which subcategory this belongs to
  author: '', excerpt: '', readTime: '', tags: '',
  metaTitle: '', metaDescription: '', metaKeywords: '', slug: '',
  image: '', featured: false,
  duration: '', episode: '', volume: '',
};

// ”€”€”€ CONTENT EDITOR PAGE ”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€
function ContentEditor({ item, onSave, onClose }) {
  const isEdit = !!item?.id;
  const [form, setForm] = useState(item ? { ...item, tags: Array.isArray(item.tags) ? item.tags.join(', ') : item.tags } : { ...EMPTY_FORM });
  const [activeTab, setActiveTab] = useState('content');
  const [errors, setErrors] = useState({});

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const autoSlug = (title) => title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim();

  const validate = () => {
    const e = {};
    if (!form.title.trim())          e.title = 'Title is required';
    if (!form.author.trim())         e.author = 'Author is required';
    if (!form.metaTitle.trim())      e.metaTitle = 'Meta title is required';
    if (!form.metaDescription.trim())e.metaDescription = 'Meta description is required';
    if (form.metaTitle.length > 60)  e.metaTitle = 'Meta title should be under 60 characters';
    if (form.metaDescription.length > 160) e.metaDescription = 'Meta description should be under 160 characters';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    onSave({
      ...form,
      tags: form.tags ? form.tags.split(',').map(t => t.trim()).filter(Boolean) : [],
      id: item?.id || Date.now(),
    });
  };

  const inp = "w-full rounded-lg px-3 py-2.5 text-[#0d1b3e] text-[12px] focus:outline-none transition-colors";
  const inpStyle = { background: '#f1f5f9', border: '1px solid #e2e8f0' };
  const inpFocus = { border: '1px solid var(--brand-orange)' };
  const label = "block text-[10px] font-bold uppercase tracking-wider mb-1.5 text-[#64748b]";
  const errMsg = (key) => errors[key] ? <p className="text-red-400 text-[10px] mt-1">{errors[key]}</p> : null;

  const tabs = [
    { key: 'content', label: 'Content' },
    { key: 'section', label: 'Section' },
    { key: 'seo',     label: 'SEO & Meta' },
    { key: 'settings',label: 'Settings' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto" style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)' }}>
      <div className="w-full max-w-3xl my-6 mx-4 rounded-xl overflow-hidden shadow-2xl" style={{ background: 'white', border: '1px solid #e2e8f0' }}>

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: '#e2e8f0', background: '#f8fafc' }}>
          <div className="flex items-center gap-3">
            {(() => { const tc = TYPE_CONFIG[form.type]; const Icon = tc?.icon || FileText; return <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: tc?.bg, border: `1px solid ${tc?.border}` }}><Icon size={15} style={{ color: tc?.color }} /></div>; })()}
            <div>
              <h2 className="text-[#0d1b3e] text-[14px] font-bold">{isEdit ? 'Edit Content' : 'New Content'}</h2>
              <p className="text-[#64748b] text-[10px]">{form.type} · {form.category}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-[#64748b] hover:text-white transition-colors p-1.5 rounded-lg hover:bg-slate-100">
            <X size={18} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b px-6" style={{ borderColor: '#e2e8f0' }}>
          {tabs.map(t => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className={`px-4 py-3 text-[12px] font-semibold border-b-2 transition-colors ${activeTab === t.key ? 'text-white' : 'text-[#64748b] hover:text-white border-transparent'}`}
              style={activeTab === t.key ? { borderColor: 'var(--brand-orange)', color: 'white' } : { borderColor: 'transparent' }}
            >
              {t.label}
              {t.key === 'section' && !form.section && (
                <span className="ml-1.5 w-1.5 h-1.5 rounded-full bg-amber-400 inline-block" />
              )}
              {t.key === 'seo' && (!form.metaTitle || !form.metaDescription) && (
                <span className="ml-1.5 w-1.5 h-1.5 rounded-full bg-amber-400 inline-block" />
              )}
            </button>
          ))}
        </div>

        {/* Body */}
        <div className="p-6 space-y-5 max-h-[65vh] overflow-y-auto">

          {/* ”€”€ CONTENT TAB ”€”€ */}
          {activeTab === 'content' && (
            <>
              {/* Type + Category row */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={label}>Content Type *</label>
                  <div className="grid grid-cols-2 gap-2">
                    {TYPES.map(t => {
                      const tc = TYPE_CONFIG[t];
                      const Icon = tc.icon;
                      return (
                        <button
                          key={t}
                          onClick={() => set('type', t)}
                          className="flex items-center gap-2 px-3 py-2 rounded-lg text-[11px] font-semibold transition-all"
                          style={{
                            background: form.type === t ? tc.bg : 'rgba(255,255,255,0.03)',
                            border: `1px solid ${form.type === t ? tc.border : 'rgba(255,255,255,0.08)'}`,
                            color: form.type === t ? tc.color : '#64748b',
                          }}
                        >
                          <Icon size={12} /> {t}
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <label className={label}>Category *</label>
                  <select className={inp} style={inpStyle} value={form.category} onChange={e => set('category', e.target.value)}>
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              {/* Title */}
              <div>
                <label className={label}>Title *</label>
                <input
                  className={inp} style={{ ...inpStyle, ...(errors.title ? { border: '1px solid #ef4444' } : {}) }}
                  placeholder="Enter content title..."
                  value={form.title}
                  onChange={e => {
                    set('title', e.target.value);
                    if (!form.slug || form.slug === autoSlug(form.title)) set('slug', autoSlug(e.target.value));
                    if (!form.metaTitle) set('metaTitle', e.target.value.slice(0, 60));
                  }}
                />
                {errMsg('title')}
              </div>

              {/* Excerpt */}
              <div>
                <label className={label}>Excerpt / Summary</label>
                <textarea
                  className={inp} style={inpStyle} rows={3}
                  placeholder="Brief description of the content..."
                  value={form.excerpt}
                  onChange={e => {
                    set('excerpt', e.target.value);
                    if (!form.metaDescription) set('metaDescription', e.target.value.slice(0, 160));
                  }}
                />
              </div>

              {/* Author + Read Time */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={label}>Author *</label>
                  <select className={inp} style={{ ...inpStyle, ...(errors.author ? { border: '1px solid #ef4444' } : {}) }} value={form.author} onChange={e => set('author', e.target.value)}>
                    <option value="">Select author...</option>
                    {AUTHORS.map(a => <option key={a} value={a}>{a}</option>)}
                  </select>
                  {errMsg('author')}
                </div>
                <div>
                  <label className={label}>Read / Watch Time</label>
                  <input className={inp} style={inpStyle} placeholder="e.g. 8 min" value={form.readTime} onChange={e => set('readTime', e.target.value)} />
                </div>
              </div>

              {/* Type-specific fields */}
              {form.type === 'Video' && (
                <div>
                  <label className={label}>Video Duration</label>
                  <input className={inp} style={inpStyle} placeholder="e.g. 18:05" value={form.duration || ''} onChange={e => set('duration', e.target.value)} />
                </div>
              )}
              {form.type === 'Podcast' && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className={label}>Episode Number</label>
                    <input className={inp} style={inpStyle} placeholder="e.g. EP 47" value={form.episode || ''} onChange={e => set('episode', e.target.value)} />
                  </div>
                  <div>
                    <label className={label}>Duration</label>
                    <input className={inp} style={inpStyle} placeholder="e.g. 42:18" value={form.duration || ''} onChange={e => set('duration', e.target.value)} />
                  </div>
                </div>
              )}
              {form.type === 'Book' && (
                <div>
                  <label className={label}>Volume</label>
                  <input className={inp} style={inpStyle} placeholder="e.g. Vol. 1" value={form.volume || ''} onChange={e => set('volume', e.target.value)} />
                </div>
              )}

              {/* Tags */}
              <div>
                <label className={label}>Tags (comma-separated)</label>
                <input className={inp} style={inpStyle} placeholder="e.g. AI, Workforce, Productivity" value={form.tags} onChange={e => set('tags', e.target.value)} />
              </div>

              {/* Cover image */}
              <div>
                <label className={label}>Cover Image URL</label>
                <div className="flex gap-2">
                  <input className={`${inp} flex-1`} style={inpStyle} placeholder="https://..." value={form.image} onChange={e => set('image', e.target.value)} />
                  {form.image && <img src={form.image} alt="" className="w-12 h-12 rounded-lg object-cover shrink-0" />}
                </div>
              </div>
            </>
          )}

          {/* ”€”€ SECTION TAB ”€”€ */}
          {activeTab === 'section' && (
            <div className="space-y-5">
              <div className="rounded-lg p-3 flex items-start gap-2" style={{ background: 'rgba(10,126,164,0.08)', border: '1px solid rgba(10,126,164,0.2)' }}>
                <Globe size={13} className="text-[#0a7ea4] shrink-0 mt-0.5" />
                <p className="text-[#475569] text-[11px] leading-relaxed">
                  Assign this content to a specific section of the DTMI platform. This controls where it appears in the navigation and content feeds.
                  {form.section && <span className="ml-1 font-bold text-white">Currently: <span style={{ color: SECTION_COLOR_MAP[form.section] || 'var(--brand-orange)' }}>{form.section}</span></span>}
                </p>
              </div>

              {SECTION_GROUPS.map(group => (
                <div key={group.group}>
                  {/* Group heading */}
                  <div className="flex items-center gap-2 mb-2.5">
                    <span className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ background: group.color }} />
                    <p className="text-[11px] font-black uppercase tracking-widest" style={{ color: group.color }}>{group.group}</p>
                    <div className="flex-1 h-px" style={{ background: `${group.color}22` }} />
                  </div>

                  {/* Sub-items grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 mb-1">
                    {group.items.map(item => {
                      const isSelected = form.section === item.key;
                      return (
                        <button
                          key={item.key}
                          onClick={() => set('section', isSelected ? '' : item.key)}
                          className="flex items-start gap-2.5 px-3 py-2.5 rounded-lg text-left transition-all duration-150"
                          style={{
                            background: isSelected ? `${group.color}18` : 'rgba(255,255,255,0.03)',
                            border: `1px solid ${isSelected ? `${group.color}50` : 'rgba(255,255,255,0.06)'}`,
                          }}
                        >
                          <div className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ background: isSelected ? group.color : '#2d3748' }} />
                          <div className="min-w-0">
                            <p className="text-[12px] font-semibold leading-none mb-0.5" style={{ color: isSelected ? group.color : '#94a3b8' }}>
                              {item.label}
                            </p>
                            <p className="text-[10px] leading-snug" style={{ color: '#475569' }}>{item.desc}</p>
                          </div>
                          {isSelected && (
                            <CheckCircle size={13} className="shrink-0 ml-auto mt-0.5" style={{ color: group.color }} />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* ”€”€ SEO TAB ”€”€ */}
          {activeTab === 'seo' && (
            <>
              <div className="rounded-lg p-3 flex items-start gap-2" style={{ background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)' }}>
                <AlertCircle size={13} className="text-amber-400 shrink-0 mt-0.5" />
                <p className="text-amber-300 text-[11px] leading-relaxed">
                  Good SEO requires a meta title under 60 chars, meta description under 160 chars, and 3€“8 focus keywords. Fields marked * are required.
                </p>
              </div>

              {/* Meta Title */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className={label} style={{ margin: 0 }}>Meta Title *</label>
                  <span className={`text-[10px] font-bold ${form.metaTitle.length > 60 ? 'text-red-400' : form.metaTitle.length > 50 ? 'text-amber-400' : 'text-[#64748b]'}`}>
                    {form.metaTitle.length}/60
                  </span>
                </div>
                <input
                  className={inp}
                  style={{ ...inpStyle, ...(errors.metaTitle ? { border: '1px solid #ef4444' } : {}) }}
                  placeholder="Page title for search engines..."
                  value={form.metaTitle}
                  onChange={e => set('metaTitle', e.target.value)}
                />
                {errMsg('metaTitle')}
                {/* SERP preview */}
                {form.metaTitle && (
                  <div className="mt-2 p-3 rounded-lg" style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                    <p className="text-[10px] text-[#64748b] mb-1 uppercase tracking-wider">SERP Preview</p>
                    <p className="text-blue-400 text-[13px] font-medium">{form.metaTitle || 'Page Title'}</p>
                    <p className="text-green-600 text-[10px]">dtmi.digitalqatalyst.com {'>'} {form.slug || 'page-url'}</p>
                    <p className="text-[#475569] text-[11px] mt-0.5 line-clamp-2">{form.metaDescription || 'Meta description will appear here...'}</p>
                  </div>
                )}
              </div>

              {/* Meta Description */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className={label} style={{ margin: 0 }}>Meta Description *</label>
                  <span className={`text-[10px] font-bold ${form.metaDescription.length > 160 ? 'text-red-400' : form.metaDescription.length > 140 ? 'text-amber-400' : 'text-[#64748b]'}`}>
                    {form.metaDescription.length}/160
                  </span>
                </div>
                <textarea
                  className={inp}
                  style={{ ...inpStyle, ...(errors.metaDescription ? { border: '1px solid #ef4444' } : {}) }}
                  rows={3}
                  placeholder="Compelling description for search results (under 160 characters)..."
                  value={form.metaDescription}
                  onChange={e => set('metaDescription', e.target.value)}
                />
                {errMsg('metaDescription')}
              </div>

              {/* Meta Keywords */}
              <div>
                <label className={label}>Focus Keywords *</label>
                <input
                  className={inp} style={inpStyle}
                  placeholder="e.g. AI adoption, enterprise AI, digital transformation 2026"
                  value={form.metaKeywords}
                  onChange={e => set('metaKeywords', e.target.value)}
                />
                <p className="text-[#475569] text-[10px] mt-1">Separate keywords with commas. Use 3€“8 focus keywords.</p>
                {/* Keyword pills */}
                {form.metaKeywords && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {form.metaKeywords.split(',').filter(k => k.trim()).map((kw, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 rounded-full font-medium" style={{ background: 'rgba(232,80,10,0.12)', color: 'var(--brand-orange)', border: '1px solid rgba(232,80,10,0.25)' }}>
                        {kw.trim()}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* URL Slug */}
              <div>
                <label className={label}>URL Slug</label>
                <div className="flex items-center gap-0 rounded-lg overflow-hidden" style={{ border: '1px solid #e2e8f0' }}>
                  <span className="px-3 py-2.5 text-[11px] text-[#475569] shrink-0" style={{ background: '#f8fafc', borderRight: '1px solid rgba(255,255,255,0.08)' }}>
                    /articles/
                  </span>
                  <input
                    className="flex-1 px-3 py-2.5 text-[#0d1b3e] text-[12px] focus:outline-none bg-transparent"
                    placeholder="url-slug-here"
                    value={form.slug}
                    onChange={e => set('slug', e.target.value)}
                  />
                </div>
              </div>

              {/* SEO Score indicator */}
              <div className="rounded-lg p-4" style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                <p className="text-[11px] font-bold text-white mb-3">SEO Checklist</p>
                {[
                  { label: 'Meta title present',              ok: !!form.metaTitle },
                  { label: 'Meta title under 60 chars',       ok: form.metaTitle.length > 0 && form.metaTitle.length <= 60 },
                  { label: 'Meta description present',        ok: !!form.metaDescription },
                  { label: 'Meta description under 160 chars',ok: form.metaDescription.length > 0 && form.metaDescription.length <= 160 },
                  { label: 'Focus keywords defined',          ok: !!form.metaKeywords },
                  { label: 'URL slug defined',                ok: !!form.slug },
                  { label: 'Cover image set',                 ok: !!form.image },
                  { label: 'Section assigned',                ok: !!form.section },
                ].map((check, i) => (
                  <div key={i} className="flex items-center gap-2 py-1">
                    {check.ok
                      ? <CheckCircle size={12} className="text-emerald-400 shrink-0" />
                      : <AlertCircle size={12} className="text-[#475569] shrink-0" />
                    }
                    <span className={`text-[11px] ${check.ok ? 'text-[#94a3b8]' : 'text-[#475569]'}`}>{check.label}</span>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* ”€”€ SETTINGS TAB ”€”€ */}
          {activeTab === 'settings' && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={label}>Status</label>
                  <div className="space-y-2">
                    {['Draft', 'Review', 'Published', 'Archived'].map(s => {
                      const sc = STATUS_CONFIG[s];
                      return (
                        <button
                          key={s}
                          onClick={() => set('status', s)}
                          className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-left transition-all"
                          style={{
                            background: form.status === s ? sc.bg : 'rgba(255,255,255,0.03)',
                            border: `1px solid ${form.status === s ? sc.border : 'rgba(255,255,255,0.06)'}`,
                          }}
                        >
                          <span className="w-2 h-2 rounded-full shrink-0" style={{ background: sc.dot }} />
                          <span className="text-[12px] font-semibold" style={{ color: form.status === s ? sc.color : '#64748b' }}>{s}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div className="space-y-4">
                  {/* Featured toggle */}
                  <div>
                    <label className={label}>Featured Content</label>
                    <button
                      onClick={() => set('featured', !form.featured)}
                      className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-all"
                      style={{
                        background: form.featured ? 'rgba(232,80,10,0.12)' : 'rgba(255,255,255,0.03)',
                        border: `1px solid ${form.featured ? 'rgba(232,80,10,0.3)' : 'rgba(255,255,255,0.08)'}`,
                      }}
                    >
                      <span className="text-[12px] font-semibold" style={{ color: form.featured ? 'var(--brand-orange)' : '#64748b' }}>
                        {form.featured ? 'Featured ˜…' : 'Not Featured'}
                      </span>
                      <div className="relative w-9 h-5 rounded-full transition-colors" style={{ background: form.featured ? 'var(--brand-orange)' : 'rgba(255,255,255,0.1)' }}>
                        <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${form.featured ? 'left-4' : 'left-0.5'}`} />
                      </div>
                    </button>
                  </div>

                  {/* Publish date */}
                  <div>
                    <label className={label}>Publish Date</label>
                    <input type="date" className={inp} style={inpStyle} defaultValue="2026-04-24" />
                  </div>

                  {/* Reading time override */}
                  <div>
                    <label className={label}>Read / Watch Time</label>
                    <input className={inp} style={inpStyle} placeholder="e.g. 8 min" value={form.readTime} onChange={e => set('readTime', e.target.value)} />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t" style={{ borderColor: '#e2e8f0', background: '#f8fafc' }}>
          <button onClick={onClose} className="flex items-center gap-2 px-4 py-2 rounded-lg text-[#64748b] text-[12px] font-semibold hover:text-white hover:bg-slate-100 transition-colors">
            <ArrowLeft size={13} /> Cancel
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={() => { set('status', 'Draft'); handleSave(); }}
              className="px-4 py-2 rounded-lg text-[12px] font-semibold transition-colors text-[#94a3b8] hover:text-white"
              style={{ background: '#f1f5f9', border: '1px solid #e2e8f0' }}
            >
              Save as Draft
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-5 py-2 rounded-lg text-[#0d1b3e] text-[12px] font-bold transition-colors"
              style={{ background: 'var(--brand-orange)' }}
            >
              <Save size={13} /> {isEdit ? 'Update' : 'Publish'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ”€”€”€ DELETE CONFIRM MODAL ”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€
function DeleteModal({ item, onConfirm, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.75)' }}>
      <div className="w-full max-w-sm mx-4 rounded-xl p-6" style={{ background: 'white', border: '1px solid rgba(239,68,68,0.3)' }}>
        <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(239,68,68,0.12)' }}>
          <Trash2 size={20} className="text-red-400" />
        </div>
        <h3 className="text-[#0d1b3e] text-[15px] font-bold text-center mb-2">Delete Content</h3>
        <p className="text-[#64748b] text-[12px] text-center mb-1">Are you sure you want to delete:</p>
        <p className="text-[#0d1b3e] text-[12px] font-semibold text-center mb-5 px-2 line-clamp-2">"{item.title}"</p>
        <p className="text-red-400 text-[11px] text-center mb-5">This action cannot be undone.</p>
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-lg text-[12px] font-semibold text-[#94a3b8] hover:text-white transition-colors" style={{ background: '#f1f5f9', border: '1px solid #e2e8f0' }}>
            Cancel
          </button>
          <button onClick={onConfirm} className="flex-1 py-2.5 rounded-lg text-[12px] font-bold text-white transition-colors" style={{ background: '#ef4444' }}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

// ”€”€”€ CONTENT CARD ”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€
function ContentCard({ item, onEdit, onDelete, onView }) {
  const tc = TYPE_CONFIG[item.type] || TYPE_CONFIG.Article;
  const sc = STATUS_CONFIG[item.status] || STATUS_CONFIG.Draft;
  const TypeIcon = tc.icon;
  const tags = Array.isArray(item.tags) ? item.tags : [];

  return (
    <div
      className="rounded-xl overflow-hidden transition-all duration-200 group"
      style={{ background: 'white', border: '1px solid #e2e8f0' }}
      onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(232,80,10,0.3)'}
      onMouseLeave={e => e.currentTarget.style.borderColor = '#e2e8f0'}
    >
      {/* Image strip */}
      <div className="relative h-36 overflow-hidden" style={{ background: '#f1f5f9' }}>
        {item.image ? (
          <img src={item.image} alt={item.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-400" loading="lazy" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <TypeIcon size={32} style={{ color: tc.color, opacity: 0.3 }} />
          </div>
        )}
        {/* Gradient overlay */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(22,27,39,0.95) 0%, rgba(22,27,39,0.3) 60%, transparent 100%)' }} />

        {/* Top badges */}
        <div className="absolute top-2.5 left-2.5 flex gap-1.5">
          <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md" style={{ background: tc.bg, color: tc.color, border: `1px solid ${tc.border}` }}>
            <TypeIcon size={9} /> {item.type}
          </span>
          {item.featured && (
            <span className="text-[9px] font-black px-1.5 py-0.5 rounded-md text-white" style={{ background: 'var(--brand-orange)' }}>˜… Featured</span>
          )}
        </div>

        {/* Status badge */}
        <div className="absolute top-2.5 right-2.5">
          <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-md" style={{ background: sc.bg, color: sc.color, border: `1px solid ${sc.border}` }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: sc.dot }} />
            {item.status}
          </span>
        </div>

        {/* Bottom meta */}
        <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: 'var(--brand-orange)' }}>{item.category}</span>
          {item.views !== '€”' && (
            <span className="text-[10px] text-white font-bold flex items-center gap-1">
              <Eye size={9} /> {item.views}
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="text-[#0d1b3e] text-[13px] font-bold leading-snug mb-1.5 line-clamp-2 group-hover:text-[#e2e8f0] transition-colors">
          {item.title}
        </h3>
        {item.excerpt && (
          <p className="text-[#475569] text-[11px] leading-relaxed line-clamp-2 mb-3">{item.excerpt}</p>
        )}

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {tags.slice(0, 3).map(tag => (
              <span key={tag} className="text-[9px] px-1.5 py-0.5 rounded-md font-medium" style={{ background: '#f1f5f9', color: '#64748b', border: '1px solid #e2e8f0' }}>
                #{tag}
              </span>
            ))}
            {tags.length > 3 && <span className="text-[9px] text-[#64748b]">+{tags.length - 3}</span>}
          </div>
        )}

        {/* Section badge */}
        {item.section && (
          <div className="mb-2">
            <span
              className="inline-flex items-center gap-1 text-[9px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider"
              style={{
                background: `${SECTION_COLOR_MAP[item.section] || '#64748b'}18`,
                color: SECTION_COLOR_MAP[item.section] || '#64748b',
                border: `1px solid ${SECTION_COLOR_MAP[item.section] || '#64748b'}33`,
              }}
            >
              <Hash size={8} /> {item.section}
            </span>
          </div>
        )}

        {/* SEO indicator */}
        <div className="flex items-center gap-1.5 mb-3 py-2 px-2.5 rounded-lg" style={{ background: '#f8fafc', border: '1px solid #e2e8f0' }}>
          <Globe size={10} className="text-[#475569] shrink-0" />
          <span className="text-[10px] text-[#475569] flex-1 truncate">
            {item.metaTitle ? (
              <span className="text-[#64748b]">{item.metaTitle.slice(0, 35)}{item.metaTitle.length > 35 ? '...' : ''}</span>
            ) : (
              <span className="text-red-400/70">No meta title set</span>
            )}
          </span>
          {item.metaTitle && item.metaDescription && item.metaKeywords
            ? <CheckCircle size={10} className="text-emerald-400 shrink-0" />
            : <AlertCircle size={10} className="text-amber-400 shrink-0" />
          }
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2.5 border-t" style={{ borderColor: '#f1f5f9' }}>
          <div className="flex items-center gap-1.5 text-[#475569] text-[10px]">
            <User size={9} />
            <span className="truncate max-w-[80px]">{item.author}</span>
            <span className="text-[#94a3b8]">·</span>
            <Calendar size={9} />
            <span>{item.date}</span>
          </div>
          <div className="flex items-center gap-0.5">
            <button onClick={() => onView(item)} className="p-1.5 rounded-md text-[#475569] hover:text-white hover:bg-slate-100 transition-colors" title="Preview">
              <Eye size={13} />
            </button>
            <button onClick={() => onEdit(item)} className="p-1.5 rounded-md text-[#475569] hover:text-white hover:bg-slate-100 transition-colors" title="Edit">
              <Edit2 size={13} />
            </button>
            <button onClick={() => onDelete(item)} className="p-1.5 rounded-md text-[#475569] hover:text-red-400 hover:bg-red-500/5 transition-colors" title="Delete">
              <Trash2 size={13} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ”€”€”€ TABLE ROW ”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€
function TableRow({ item, onEdit, onDelete, onView, isLast }) {
  const tc = TYPE_CONFIG[item.type] || TYPE_CONFIG.Article;
  const sc = STATUS_CONFIG[item.status] || STATUS_CONFIG.Draft;
  const TypeIcon = tc.icon;
  const tags = Array.isArray(item.tags) ? item.tags : [];
  const seoOk = item.metaTitle && item.metaDescription && item.metaKeywords;

  return (
    <tr
      className="group transition-colors"
      style={{ borderBottom: isLast ? 'none' : '1px solid rgba(255,255,255,0.04)' }}
      onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'}
      onMouseLeave={e => e.currentTarget.style.background = 'white'}
    >
      {/* Title + excerpt */}
      <td className="px-4 py-3">
        <div className="flex items-start gap-3">
          {item.image && (
            <img src={item.image} alt="" className="w-10 h-10 rounded-lg object-cover shrink-0" loading="lazy" />
          )}
          <div className="min-w-0">
            <p className="text-[#0d1b3e] text-[12px] font-semibold leading-snug truncate max-w-[260px]">{item.title}</p>
            <p className="text-[#475569] text-[10px] mt-0.5 truncate max-w-[260px]">{item.excerpt}</p>
            <div className="flex items-center gap-1.5 mt-1">
              {tags.slice(0, 2).map(t => (
                <span key={t} className="text-[9px] px-1.5 py-0.5 rounded" style={{ background: '#f1f5f9', color: '#64748b' }}>#{t}</span>
              ))}
            </div>
          </div>
        </div>
      </td>
      {/* Type */}
      <td className="px-4 py-3">
        <span className="flex items-center gap-1.5 text-[11px] font-semibold w-fit" style={{ color: tc.color }}>
          <TypeIcon size={11} /> {item.type}
        </span>
      </td>
      {/* Category */}
      <td className="px-4 py-3">
        <div>
          <span className="text-[#475569] text-[11px]">{item.category}</span>
          {item.section && (
            <div className="mt-0.5">
              <span
                className="text-[9px] font-bold px-1.5 py-0.5 rounded"
                style={{
                  background: `${SECTION_COLOR_MAP[item.section] || '#64748b'}18`,
                  color: SECTION_COLOR_MAP[item.section] || '#64748b',
                }}
              >
                {item.section}
              </span>
            </div>
          )}
        </div>
      </td>
      {/* Status */}
      <td className="px-4 py-3">
        <span className="flex items-center gap-1.5 text-[10px] font-bold px-2 py-1 rounded-full w-fit" style={{ background: sc.bg, color: sc.color, border: `1px solid ${sc.border}` }}>
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: sc.dot }} />
          {item.status}
        </span>
      </td>
      {/* SEO */}
      <td className="px-4 py-3">
        <div className="flex items-center gap-1" title={seoOk ? 'SEO complete' : 'SEO incomplete'}>
          {seoOk
            ? <CheckCircle size={13} className="text-emerald-400" />
            : <AlertCircle size={13} className="text-amber-400" />
          }
          <span className={`text-[10px] font-semibold ${seoOk ? 'text-emerald-400' : 'text-amber-400'}`}>
            {seoOk ? 'Good' : 'Fix'}
          </span>
        </div>
      </td>
      {/* Author */}
      <td className="px-4 py-3"><span className="text-[#64748b] text-[11px]">{item.author}</span></td>
      {/* Views */}
      <td className="px-4 py-3">
        <span className="text-[11px] font-bold" style={{ color: item.views !== '€”' ? 'var(--brand-orange)' : '#2d3748' }}>{item.views}</span>
      </td>
      {/* Date */}
      <td className="px-4 py-3"><span className="text-[#475569] text-[11px]">{item.date}</span></td>
      {/* Actions */}
      <td className="px-4 py-3">
        <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
          <button onClick={() => onView(item)} className="p-1.5 rounded-md text-[#475569] hover:text-white hover:bg-slate-100 transition-colors"><Eye size={13} /></button>
          <button onClick={() => onEdit(item)} className="p-1.5 rounded-md text-[#475569] hover:text-white hover:bg-slate-100 transition-colors"><Edit2 size={13} /></button>
          <button onClick={() => onDelete(item)} className="p-1.5 rounded-md text-[#475569] hover:text-red-400 hover:bg-red-500/5 transition-colors"><Trash2 size={13} /></button>
        </div>
      </td>
    </tr>
  );
}

// ”€”€”€ MAIN COMPONENT ”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€
export default function AdminContent({ activeSubKey }) {
  const preset = SUB_KEY_MAP[activeSubKey] || {};

  const [items,        setItems]        = useState(INITIAL_ITEMS);
  const [search,       setSearch]       = useState('');
  const [catFilter,    setCatFilter]    = useState('All');
  const [typeFilter,   setTypeFilter]   = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sectionFilter,setSectionFilter]= useState('');
  const [viewMode,     setViewMode]     = useState('grid');
  const [editorItem,   setEditorItem]   = useState(null);
  const [deleteItem,   setDeleteItem]   = useState(null);
  const [sortBy,       setSortBy]       = useState('date');

  // Sync filters when sub-key changes
  useEffect(() => {
    const p = SUB_KEY_MAP[activeSubKey] || {};
    setCatFilter(p.category || 'All');
    setTypeFilter(p.type    || 'All');
    setSectionFilter(p.section || '');
    setSearch('');
    setStatusFilter('All');
  }, [activeSubKey]);

  // When opening "New Content" from a sub-key, pre-fill section
  const handleNewContent = () => {
    const p = SUB_KEY_MAP[activeSubKey] || {};
    setEditorItem(p.section ? { ...EMPTY_FORM, section: p.section, category: p.category !== 'All' ? p.category : 'AI', type: p.type !== 'All' ? p.type : 'Article' } : {});
  };

  const filtered = items
    .filter(item => {
      const matchSearch  = !search || item.title.toLowerCase().includes(search.toLowerCase()) || item.author.toLowerCase().includes(search.toLowerCase());
      const matchCat     = catFilter     === 'All' || item.category === catFilter;
      const matchType    = typeFilter    === 'All' || item.type     === typeFilter;
      const matchStatus  = statusFilter  === 'All' || item.status   === statusFilter;
      const matchSection = !sectionFilter || item.section === sectionFilter;
      return matchSearch && matchCat && matchType && matchStatus && matchSection;
    })
    .sort((a, b) => {
      if (sortBy === 'views') return (parseInt(b.views) || 0) - (parseInt(a.views) || 0);
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      return 0;
    });

  const handleSave = (saved) => {
    setItems(prev => {
      const exists = prev.find(i => i.id === saved.id);
      return exists ? prev.map(i => i.id === saved.id ? saved : i) : [saved, ...prev];
    });
    setEditorItem(null);
  };

  const handleDelete = () => {
    setItems(prev => prev.filter(i => i.id !== deleteItem.id));
    setDeleteItem(null);
  };

  // Stats
  const stats = {
    total:     items.length,
    published: items.filter(i => i.status === 'Published').length,
    draft:     items.filter(i => i.status === 'Draft').length,
    review:    items.filter(i => i.status === 'Review').length,
    seoIssues: items.filter(i => !i.metaTitle || !i.metaDescription || !i.metaKeywords).length,
  };

  const activeLabel = activeSubKey && SUB_KEY_MAP[activeSubKey]
    ? activeSubKey.replace('content:', '').replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
    : null;

  const inp = "rounded-lg px-3 py-2 text-[#475569] text-[12px] focus:outline-none transition-colors";
  const inpStyle = { background: '#f8fafc', border: '1px solid #e2e8f0' };

  return (
    <div className="space-y-5">

      {/* ”€”€ HEADER ”€”€ */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-[#0d1b3e] text-[17px] font-bold">Content Management</h2>
            {activeLabel && (
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full" style={{ background: 'rgba(232,80,10,0.15)', color: 'var(--brand-orange)', border: '1px solid rgba(232,80,10,0.25)' }}>
                {activeLabel}
              </span>
            )}
          </div>
          <p className="text-[#64748b] text-[11px]">
            {stats.total} items · {stats.published} published · {stats.draft} drafts · {stats.review} in review
          </p>
        </div>
        <button
          onClick={handleNewContent}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-[#0d1b3e] text-[12px] font-bold shrink-0 transition-colors hover:opacity-90"
          style={{ background: 'var(--brand-orange)' }}
        >
          <Plus size={14} /> New Content
        </button>
      </div>

      {/* ”€”€ STATS ROW ”€”€ */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        {[
          { label: 'Total',     value: stats.total,     color: '#94a3b8' },
          { label: 'Published', value: stats.published, color: '#10b981' },
          { label: 'Draft',     value: stats.draft,     color: '#64748b' },
          { label: 'In Review', value: stats.review,    color: '#f59e0b' },
          { label: 'SEO Issues',value: stats.seoIssues, color: stats.seoIssues > 0 ? '#f59e0b' : '#10b981' },
        ].map(s => (
          <div key={s.label} className="rounded-xl px-4 py-3 flex items-center justify-between" style={{ background: 'white', border: '1px solid #e2e8f0' }}>
            <span className="text-[#64748b] text-[11px]">{s.label}</span>
            <span className="text-[16px] font-black" style={{ color: s.color }}>{s.value}</span>
          </div>
        ))}
      </div>

      {/* ”€”€ FILTERS + VIEW TOGGLE ”€”€ */}
      <div className="flex flex-wrap gap-2 items-center">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px]">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748b]" />
          <input
            className="w-full rounded-lg pl-9 pr-3 py-2 text-[#0d1b3e] text-[12px] focus:outline-none"
            style={inpStyle}
            placeholder="Search by title or author..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        {/* Dropdowns */}
        {[
          { value: typeFilter,   set: setTypeFilter,   opts: ['All', ...TYPES],                                  prefix: 'Type' },
          { value: catFilter,    set: setCatFilter,    opts: ['All', ...CATEGORIES],                             prefix: 'Category' },
          { value: statusFilter, set: setStatusFilter, opts: ['All', 'Published', 'Draft', 'Review', 'Archived'],prefix: 'Status' },
          { value: sortBy,       set: setSortBy,       opts: ['date', 'views', 'title'],                         prefix: 'Sort' },
        ].map(f => (
          <select
            key={f.prefix}
            value={f.value}
            onChange={e => f.set(e.target.value)}
            className={inp}
            style={inpStyle}
          >
            {f.opts.map(o => <option key={o} value={o}>{f.prefix}: {o.charAt(0).toUpperCase() + o.slice(1)}</option>)}
          </select>
        ))}

        {/* View toggle */}
        <div className="flex rounded-lg overflow-hidden" style={{ border: '1px solid #e2e8f0' }}>
          <button
            onClick={() => setViewMode('grid')}
            className="p-2 transition-colors"
            style={{ background: viewMode === 'grid' ? 'rgba(232,80,10,0.2)' : '#1e2535', color: viewMode === 'grid' ? 'var(--brand-orange)' : '#64748b' }}
          >
            <Grid size={14} />
          </button>
          <button
            onClick={() => setViewMode('table')}
            className="p-2 transition-colors"
            style={{ background: viewMode === 'table' ? 'rgba(232,80,10,0.2)' : '#1e2535', color: viewMode === 'table' ? 'var(--brand-orange)' : '#64748b', borderLeft: '1px solid rgba(255,255,255,0.08)' }}
          >
            <List size={14} />
          </button>
        </div>
      </div>

      {/* ”€”€ ACTIVE SECTION FILTER CHIP ”€”€ */}
      {sectionFilter && (
        <div className="flex items-center gap-2">
          <span className="text-[#64748b] text-[11px]">Filtered by section:</span>
          <span
            className="flex items-center gap-1.5 text-[11px] font-bold px-3 py-1 rounded-full"
            style={{
              background: `${SECTION_COLOR_MAP[sectionFilter] || '#64748b'}18`,
              color: SECTION_COLOR_MAP[sectionFilter] || '#64748b',
              border: `1px solid ${SECTION_COLOR_MAP[sectionFilter] || '#64748b'}33`,
            }}
          >
            <Hash size={10} /> {sectionFilter}
            <button onClick={() => setSectionFilter('')} className="ml-1 hover:opacity-70 transition-opacity">
              <X size={10} />
            </button>
          </span>
        </div>
      )}

      {/* ”€”€ RESULTS COUNT ”€”€ */}
      <div className="flex items-center justify-between">
        <p className="text-[#475569] text-[11px]">{filtered.length} of {items.length} items</p>
        {(search || catFilter !== 'All' || typeFilter !== 'All' || statusFilter !== 'All' || sectionFilter) && (
          <button
            onClick={() => { setSearch(''); setCatFilter('All'); setTypeFilter('All'); setStatusFilter('All'); setSectionFilter(''); }}
            className="text-[11px] font-semibold transition-colors hover:opacity-70"
            style={{ color: 'var(--brand-orange)' }}
          >
            Clear filters Ã—
          </button>
        )}
      </div>

      {/* ”€”€ GRID VIEW ”€”€ */}
      {viewMode === 'grid' && (
        filtered.length === 0 ? (
          <div className="text-center py-16 rounded-xl" style={{ background: 'white', border: '1px solid #e2e8f0' }}>
            <FileText size={36} className="mx-auto mb-3 text-[#2d3748]" />
            <p className="text-[#475569] text-[13px] font-semibold">No content found</p>
            <p className="text-[#2d3748] text-[11px] mt-1">Try adjusting your filters or add new content</p>
            <button onClick={handleNewContent} className="mt-4 px-4 py-2 rounded-lg text-[#0d1b3e] text-[12px] font-bold" style={{ background: 'var(--brand-orange)' }}>
              <Plus size={13} className="inline mr-1" /> Add Content
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map(item => (
              <ContentCard
                key={item.id}
                item={item}
                onEdit={setEditorItem}
                onDelete={setDeleteItem}
                onView={() => {}}
              />
            ))}
          </div>
        )
      )}

      {/* ”€”€ TABLE VIEW ”€”€ */}
      {viewMode === 'table' && (
        <div className="rounded-xl overflow-hidden" style={{ background: 'white', border: '1px solid #e2e8f0' }}>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.07)', background: '#f8fafc' }}>
                  {['Title', 'Type', 'Category', 'Status', 'SEO', 'Author', 'Views', 'Date', ''].map(h => (
                    <th key={h} className="text-left px-4 py-3 text-[10px] font-black uppercase tracking-wider text-[#94a3b8] bg-[#f8fafc]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr><td colSpan={9} className="px-4 py-12 text-center text-[#475569] text-[12px]">No content found for these filters.</td></tr>
                ) : filtered.map((item, i) => (
                  <TableRow
                    key={item.id}
                    item={item}
                    onEdit={setEditorItem}
                    onDelete={setDeleteItem}
                    onView={() => {}}
                    isLast={i === filtered.length - 1}
                  />
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-3 border-t flex items-center justify-between" style={{ borderColor: '#e2e8f0' }}>
            <p className="text-[#475569] text-[11px]">Showing {filtered.length} of {items.length} items</p>
            <div className="flex gap-1">
              {['†', '1', '2', '†’'].map(p => (
                <button key={p} className="w-7 h-7 rounded-md text-[11px] font-semibold text-[#475569] hover:text-white hover:bg-slate-100 transition-colors">{p}</button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ”€”€ EDITOR MODAL ”€”€ */}
      {editorItem !== null && (
        <ContentEditor
          item={Object.keys(editorItem).length > 0 ? editorItem : null}
          onSave={handleSave}
          onClose={() => setEditorItem(null)}
        />
      )}

      {/* ”€”€ DELETE MODAL ”€”€ */}
      {deleteItem && (
        <DeleteModal
          item={deleteItem}
          onConfirm={handleDelete}
          onClose={() => setDeleteItem(null)}
        />
      )}
    </div>
  );
}








