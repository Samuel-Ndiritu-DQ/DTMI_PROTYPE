import { useState } from 'react';
import AdminOverview      from './AdminOverview';
import AdminContent       from './AdminContent';
import AdminUsers         from './AdminUsers';
import AdminSubscriptions from './AdminSubscriptions';
import AdminSEO           from './AdminSEO';
import AdminAnalytics     from './AdminAnalytics';
import AdminMedia         from './AdminMedia';
import AdminSettings      from './AdminSettings';
import {
  LayoutDashboard, FileText, Users, CreditCard, Search,
  BarChart2, Image, Settings, LogOut, Bell, ChevronDown,
  Zap, Menu, X, Radio, Brain, Globe, Shield, Layers,
  TrendingUp, Building2, Cpu, BookOpen, Headphones, Video,
  Newspaper, Radar, Bot, BarChart, Wifi, Server, Lock,
  ShoppingBag, Hotel, Heart, Tractor, Factory, Truck,
  Building, Store, Landmark, Briefcase
} from 'lucide-react';

// ”€”€ Full nav tree matching the website's mega-menu ”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€
const NAV_TREE = [
  {
    key: 'overview',
    label: 'Overview',
    icon: LayoutDashboard,
    badge: null,
    children: [],
  },
  {
    key: 'content',
    label: 'Content',
    icon: FileText,
    badge: '12',
    children: [
      {
        heading: 'Intelligence',
        items: [
          { key: 'content:signal',        label: 'Signal',           icon: Radio },
          { key: 'content:insight',       label: 'Insight',          icon: Brain },
          { key: 'content:deep-analysis', label: 'Deep Analysis',    icon: BookOpen },
          { key: 'content:books',         label: 'DTMB Books',       icon: BookOpen },
          { key: 'content:feed',          label: 'Intelligence Feed',icon: Newspaper },
          { key: 'content:trend-radar',   label: 'Trend Radar',      icon: Radar },
          { key: 'content:ai-engine',     label: 'AI Engine',        icon: Bot },
        ],
      },
      {
        heading: '6xD Domains',
        items: [
          { key: 'content:d1', label: 'D1 €” Digital Economy',           icon: TrendingUp },
          { key: 'content:d2', label: 'D2 €” DCO',                       icon: Building2 },
          { key: 'content:d3', label: 'D3 €” Digital Business Platforms', icon: Layers },
          { key: 'content:d4', label: 'D4 €” Digital Transformation 2.0', icon: Cpu },
          { key: 'content:d5', label: 'D5 €” Digital Worker & Workspace', icon: Users },
          { key: 'content:d6', label: 'D6 €” Digital Accelerators',       icon: Zap },
        ],
      },
      {
        heading: 'Sectors',
        items: [
          { key: 'content:economy40',      label: 'Economy 4.0',       icon: Globe },
          { key: 'content:experience40',   label: 'Experience 4.0',    icon: Globe },
          { key: 'content:intelligence40', label: 'Intelligence 4.0',  icon: Brain },
          { key: 'content:workspace40',    label: 'Workspace 4.0',     icon: Briefcase },
          { key: 'content:mining40',       label: 'Mining 4.0',        icon: Tractor },
          { key: 'content:farming40',      label: 'Farming 4.0',       icon: Tractor },
          { key: 'content:plant40',        label: 'Plant 4.0',         icon: Factory },
          { key: 'content:logistics40',    label: 'Logistics 4.0',     icon: Truck },
          { key: 'content:infra40',        label: 'Infrastructure 4.0',icon: Building },
          { key: 'content:govt40',         label: 'Government 4.0',    icon: Landmark },
          { key: 'content:services40',     label: 'Services 4.0',      icon: Briefcase },
          { key: 'content:retail40',       label: 'Retail 4.0',        icon: Store },
          { key: 'content:hospitality40',  label: 'Hospitality 4.0',   icon: Hotel },
          { key: 'content:wellness40',     label: 'Wellness 4.0',      icon: Heart },
        ],
      },
      {
        heading: 'Technology (DBP)',
        items: [
          { key: 'content:dxp-channels',   label: 'DXP €” Digital Channels',    icon: Globe },
          { key: 'content:dxp-experience', label: 'DXP €” Digital Experience',  icon: Layers },
          { key: 'content:dxp-services',   label: 'DXP €” Digital Services',    icon: Server },
          { key: 'content:dxp-marcom',     label: 'DXP €” Digital MarCom',      icon: Newspaper },
          { key: 'content:dws-workspace',  label: 'DWS €” Digital Workspace',   icon: Briefcase },
          { key: 'content:dws-core',       label: 'DWS €” Digital Core (ERP)',  icon: Building2 },
          { key: 'content:dws-gprc',       label: 'DWS €” Digital GPRC',        icon: Shield },
          { key: 'content:dws-backoffice', label: 'DWS €” Back Office',         icon: Layers },
          { key: 'content:dia-analytics',  label: 'DIA €” Digital Analytics',   icon: BarChart },
          { key: 'content:dia-ai',         label: 'DIA €” Digital Intelligence',icon: Brain },
          { key: 'content:sdo-it',         label: 'SDO €” Digital IT (Cloud)',  icon: Server },
          { key: 'content:sdo-interop',    label: 'SDO €” Interoperability',    icon: Wifi },
          { key: 'content:sdo-security',   label: 'SDO €” Digital Security',    icon: Lock },
        ],
      },
      {
        heading: 'Multimedia',
        items: [
          { key: 'content:podcasts', label: 'Podcasts', icon: Headphones },
          { key: 'content:videos',   label: 'Videos',   icon: Video },
        ],
      },
    ],
  },
  {
    key: 'users',
    label: 'Users',
    icon: Users,
    badge: null,
    children: [
      {
        heading: 'Manage',
        items: [
          { key: 'users:all',        label: 'All Users',       icon: Users },
          { key: 'users:admins',     label: 'Admins',          icon: Shield },
          { key: 'users:enterprise', label: 'Enterprise',      icon: Building2 },
          { key: 'users:premium',    label: 'Premium',         icon: CreditCard },
          { key: 'users:free',       label: 'Free',            icon: Globe },
        ],
      },
    ],
  },
  {
    key: 'subscriptions',
    label: 'Subscriptions',
    icon: CreditCard,
    badge: null,
    children: [
      {
        heading: 'Plans',
        items: [
          { key: 'subs:overview',      label: 'Overview',        icon: BarChart2 },
          { key: 'subs:transactions',  label: 'Transactions',    icon: CreditCard },
          { key: 'subs:plans',         label: 'Plan Config',     icon: Settings },
        ],
      },
    ],
  },
  {
    key: 'analytics',
    label: 'Analytics',
    icon: BarChart2,
    badge: null,
    children: [
      {
        heading: 'Reports',
        items: [
          { key: 'analytics:traffic',  label: 'Traffic',         icon: Globe },
          { key: 'analytics:content',  label: 'Content Perf.',   icon: FileText },
          { key: 'analytics:audience', label: 'Audience',        icon: Users },
          { key: 'analytics:revenue',  label: 'Revenue',         icon: CreditCard },
        ],
      },
    ],
  },
  {
    key: 'seo',
    label: 'SEO',
    icon: Search,
    badge: '3',
    children: [
      {
        heading: 'SEO Tools',
        items: [
          { key: 'seo:pages',    label: 'Page Scores',   icon: FileText },
          { key: 'seo:keywords', label: 'Keywords',      icon: Search },
          { key: 'seo:settings', label: 'SEO Settings',  icon: Settings },
        ],
      },
    ],
  },
  {
    key: 'media',
    label: 'Media Library',
    icon: Image,
    badge: null,
    children: [
      {
        heading: 'Media Types',
        items: [
          { key: 'media:images',  label: 'Images',    icon: Image },
          { key: 'media:videos',  label: 'Videos',    icon: Video },
          { key: 'media:audio',   label: 'Audio',     icon: Headphones },
          { key: 'media:docs',    label: 'Documents', icon: FileText },
        ],
      },
    ],
  },
  {
    key: 'settings',
    label: 'Settings',
    icon: Settings,
    badge: null,
    children: [
      {
        heading: 'Configuration',
        items: [
          { key: 'settings:general',       label: 'General',       icon: Globe },
          { key: 'settings:email',         label: 'Email',         icon: Newspaper },
          { key: 'settings:security',      label: 'Security',      icon: Shield },
          { key: 'settings:notifications', label: 'Notifications', icon: Bell },
          { key: 'settings:appearance',    label: 'Appearance',    icon: Layers },
          { key: 'settings:integrations',  label: 'Integrations',  icon: Server },
        ],
      },
    ],
  },
];

// Map sub-keys back to their parent view
const KEY_TO_VIEW = {
  overview: 'overview',
};
NAV_TREE.forEach(item => {
  KEY_TO_VIEW[item.key] = item.key;
  item.children?.forEach(group => {
    group.items?.forEach(sub => {
      KEY_TO_VIEW[sub.key] = item.key;
    });
  });
});

const VIEWS = {
  overview:      AdminOverview,
  content:       AdminContent,
  users:         AdminUsers,
  subscriptions: AdminSubscriptions,
  analytics:     AdminAnalytics,
  seo:           AdminSEO,
  media:         AdminMedia,
  settings:      AdminSettings,
};

// ”€”€ Sidebar nav item with collapsible children ”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€
function NavItem({ item, active, setActive, sidebarOpen, openGroups, setOpenGroups }) {
  const Icon = item.icon;
  const isParentActive = active === item.key || KEY_TO_VIEW[active] === item.key;
  const isExpanded = openGroups.has(item.key);
  const hasChildren = item.children?.length > 0;

  const toggleGroup = () => {
    setOpenGroups(prev => {
      const next = new Set(prev);
      next.has(item.key) ? next.delete(item.key) : next.add(item.key);
      return next;
    });
  };

  const handleClick = () => {
    if (hasChildren) {
      toggleGroup();
      setActive(item.key);
    } else {
      setActive(item.key);
    }
  };

  return (
    <div>
      {/* Parent row */}
      <button
        onClick={handleClick}
        className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-md text-left transition-all duration-150 relative ${
          isParentActive ? 'text-white' : 'text-[#64748b] hover:text-[#94a3b8] hover:bg-white/5'
        }`}
        style={isParentActive ? { background: 'rgba(232,80,10,0.15)' } : {}}
      >
        {isParentActive && (
          <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-r-full" style={{ background: 'var(--brand-orange)' }} />
        )}
        <Icon size={15} className="shrink-0" style={isParentActive ? { color: 'var(--brand-orange)' } : {}} />
        {sidebarOpen && (
          <>
            <span className="text-[12px] font-semibold flex-1 text-left">{item.label}</span>
            {item.badge && (
              <span className="text-[9px] font-black px-1.5 py-0.5 rounded-full text-white mr-1" style={{ background: 'var(--brand-orange)' }}>
                {item.badge}
              </span>
            )}
            {hasChildren && (
              <ChevronDown
                size={12}
                className="shrink-0 transition-transform duration-200"
                style={{
                  color: isParentActive ? 'var(--brand-orange)' : '#64748b',
                  transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                }}
              />
            )}
          </>
        )}
      </button>

      {/* Children €” only when sidebar is open and group is expanded */}
      {sidebarOpen && hasChildren && isExpanded && (
        <div className="mt-0.5 mb-1">
          {item.children.map((group) => (
            <div key={group.heading} className="mb-2">
              {/* Group heading */}
              <p
                className="px-3 pt-2 pb-1 text-[9px] font-black uppercase tracking-widest"
                style={{ color: 'var(--brand-orange)' }}
              >
                {group.heading}
              </p>
              {/* Sub-items */}
              {group.items.map((sub) => {
                const SubIcon = sub.icon;
                const isSubActive = active === sub.key;
                return (
                  <button
                    key={sub.key}
                    onClick={() => setActive(sub.key)}
                    className={`w-full flex items-center gap-2 pl-6 pr-2.5 py-1.5 rounded-md text-left transition-all duration-100 ${
                      isSubActive
                        ? 'text-white'
                        : 'text-[#475569] hover:text-[#94a3b8] hover:bg-white/5'
                    }`}
                    style={isSubActive ? { background: 'rgba(232,80,10,0.1)' } : {}}
                  >
                    <SubIcon size={11} className="shrink-0" style={isSubActive ? { color: 'var(--brand-orange)' } : {}} />
                    <span className="text-[11px] font-medium truncate">{sub.label}</span>
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ”€”€ Main dashboard shell ”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€”€
export default function AdminDashboard({ onExit }) {
  const [active,      setActive]      = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [openGroups,  setOpenGroups]  = useState(new Set(['content'])); // content open by default
  const [notifications] = useState(5);

  // Resolve which view to render from the active key
  const viewKey   = KEY_TO_VIEW[active] || 'overview';
  const ActiveView = VIEWS[viewKey] || AdminOverview;

  // Breadcrumb label
  const parentItem = NAV_TREE.find(n => n.key === viewKey);
  const subItem    = NAV_TREE.flatMap(n => n.children || [])
    .flatMap(g => g.items || [])
    .find(s => s.key === active);
  const breadcrumb = subItem ? `${parentItem?.label} > ${subItem.label}` : parentItem?.label || 'Overview';

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: '#f1f5f9', fontFamily: 'Inter, sans-serif' }}>

      {/* ”€”€ SIDEBAR ”€”€ */}
      <aside
        className={`flex flex-col shrink-0 transition-all duration-300 border-r ${sidebarOpen ? 'w-60' : 'w-14'}`}
        style={{ background: 'var(--brand-navy)', borderColor: 'rgba(255,255,255,0.07)' }}
      >
        {/* Logo */}
        <div className="flex items-center gap-2.5 px-4 h-14 border-b shrink-0" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
          <div className="w-7 h-7 rounded-sm flex items-center justify-center shrink-0" style={{ background: 'var(--brand-orange)' }}>
            <Zap size={13} className="text-white" fill="white" />
          </div>
          {sidebarOpen && (
            <div className="min-w-0">
              <p className="text-white font-black text-[13px] leading-none">DTMI</p>
              <p className="text-[9px] font-semibold uppercase tracking-widest leading-none mt-0.5" style={{ color: 'var(--brand-teal)' }}>Admin</p>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-3 space-y-0.5 px-2">
          {NAV_TREE.map((item) => (
            <NavItem
              key={item.key}
              item={item}
              active={active}
              setActive={setActive}
              sidebarOpen={sidebarOpen}
              openGroups={openGroups}
              setOpenGroups={setOpenGroups}
            />
          ))}
        </nav>

        {/* Bottom */}
        <div className="px-2 pb-3 border-t pt-3" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
          <button
            onClick={onExit}
            className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-md text-[#64748b] hover:text-red-400 hover:bg-red-500/5 transition-colors"
          >
            <LogOut size={15} className="shrink-0" />
            {sidebarOpen && <span className="text-[12px] font-semibold">Exit Admin</span>}
          </button>
        </div>
      </aside>

      {/* ”€”€ MAIN ”€”€ */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Top bar */}
        <header className="flex items-center justify-between px-5 h-14 shrink-0 border-b" style={{ background: 'var(--brand-navy)', borderColor: 'rgba(255,255,255,0.08)' }}>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(s => !s)}
              className="text-[#94a3b8] hover:text-white transition-colors p-1.5 rounded-md hover:bg-white/10"
            >
              {sidebarOpen ? <X size={16} /> : <Menu size={16} />}
            </button>
            <div>
              <h1 className="text-white text-[14px] font-bold">{breadcrumb}</h1>
              <p className="text-[#64748b] text-[10px]">DTMI Admin Panel</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-md text-[#64748b] text-[12px]" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
              <Search size={12} />
              <span>Search admin...</span>
            </div>
            <button className="relative p-1.5 text-[#94a3b8] hover:text-white transition-colors">
              <Bell size={16} />
              {notifications > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full text-white text-[8px] font-black flex items-center justify-center" style={{ background: 'var(--brand-orange)' }}>
                  {notifications}
                </span>
              )}
            </button>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[11px] font-black" style={{ background: 'var(--brand-orange)' }}>
                SA
              </div>
              {sidebarOpen && <span className="text-white text-[12px] font-semibold hidden lg:block">Samuel A.</span>}
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-5" style={{ background: '#f1f5f9' }}>
          <ActiveView activeSubKey={active} />
        </main>
      </div>
    </div>
  );
}



