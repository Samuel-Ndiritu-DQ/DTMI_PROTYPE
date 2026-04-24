import { useState, useEffect, useRef } from 'react';
import { Search, Menu, X, Bell, ChevronDown, Zap } from 'lucide-react';
import { navItems } from '../data/mockData';

function MegaMenu({ item, onNavigate }) {
  return (
    <div className="mega-menu w-screen max-w-4xl left-0">
      <div className="max-w-[1280px] mx-auto px-6 py-6">
        <div className={`grid gap-8 ${item.children.length === 1 ? 'grid-cols-1' : item.children.length === 2 ? 'grid-cols-2' : item.children.length === 3 ? 'grid-cols-3' : 'grid-cols-4'}`}>
          {item.children.map((group) => (
            <div key={group.heading}>
              <p className="text-[#e8500a] text-[10px] font-black uppercase tracking-widest mb-3 pb-2 border-b border-white/10">
                {group.heading}
              </p>
              <div className="space-y-1">
                {group.links.map((link) => (
                  <button
                    key={link.key}
                    onClick={() => onNavigate(link.key)}
                    className="w-full text-left group px-2 py-2 rounded-sm hover:bg-white/5 transition-colors"
                  >
                    <p className="text-[#e2e8f0] text-[12px] font-semibold group-hover:text-white transition-colors">
                      {link.label}
                    </p>
                    {link.desc && (
                      <p className="text-[#64748b] text-[10px] mt-0.5">{link.desc}</p>
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function TopBar({ activeSection, setActiveSection, onAdmin, onSignIn }) {
  const [menuOpen,    setMenuOpen]    = useState(false);
  const [openMega,    setOpenMega]    = useState(null);
  const [scrolled,    setScrolled]    = useState(false);
  const [searchOpen,  setSearchOpen]  = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(null); // which mobile group is open
  const headerRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mega on outside click
  useEffect(() => {
    const handler = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) {
        setOpenMega(null);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleNavigate = (key) => {
    setActiveSection(key);
    setOpenMega(null);
    setMenuOpen(false);
  };

  const isActive = (item) => {
    if (item.key === activeSection) return true;
    if (item.children) {
      return item.children.some(g => g.links.some(l => l.key === activeSection));
    }
    return false;
  };

  return (
    <>
      {/* ── Top utility bar ── */}
      <div style={{ background: 'var(--brand-navy)' }} className="border-b border-white/5">
        <div className="max-w-[1280px] mx-auto px-4 flex items-center justify-between h-9">
          <div className="flex items-center gap-4">
            <span className="text-[#94a3b8] text-[11px] uppercase tracking-wider">Thu, April 23, 2026</span>
            <span className="text-white/20 text-xs">|</span>
            <span className="text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5" style={{ color: 'var(--brand-orange)' }}>
              <span className="live-blink inline-block w-1.5 h-1.5 rounded-full" style={{ background: 'var(--brand-orange)' }} />
              Live Intelligence
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onAdmin}
              className="text-[#94a3b8] text-[11px] hover:text-white transition-colors font-semibold"
            >
              Admin
            </button>
            <button className="text-[#94a3b8] text-[11px] hover:text-white transition-colors" onClick={onSignIn}>Sign In</button>
            <button className="btn-orange text-[11px] px-3 py-1 rounded-sm uppercase tracking-wide">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* ── Main header ── */}
      <header
        ref={headerRef}
        style={{ background: 'var(--brand-navy)' }}
        className={`sticky top-0 z-50 border-b border-white/8 transition-shadow duration-200 ${scrolled ? 'shadow-xl shadow-black/40' : ''}`}
      >
        <div className="max-w-[1280px] mx-auto px-4">
          <div className="flex items-center justify-between h-14">

            {/* Logo */}
            <button onClick={() => handleNavigate('Latest')} className="flex items-center gap-2.5 shrink-0">
              <div className="flex items-center justify-center w-8 h-8 rounded-sm" style={{ background: 'var(--brand-orange)' }}>
                <Zap size={16} className="text-white" fill="white" />
              </div>
              <div>
                <p className="text-white font-black text-[15px] tracking-tight leading-none">DTMI</p>
                <p className="text-[10px] font-semibold uppercase tracking-widest leading-none" style={{ color: 'var(--brand-teal)' }}>
                  DigitalQatalyst
                </p>
              </div>
            </button>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center h-14 relative">
              {navItems.map((item) => (
                <div
                  key={item.key}
                  className="relative h-full flex items-center"
                  onMouseEnter={() => item.children && setOpenMega(item.key)}
                  onMouseLeave={() => setOpenMega(null)}
                >
                  <button
                    onClick={() => !item.children ? handleNavigate(item.key) : setOpenMega(openMega === item.key ? null : item.key)}
                    className={`nav-link flex items-center gap-1 px-3 h-full text-[12px] font-semibold uppercase tracking-wide transition-colors ${
                      isActive(item) ? 'text-white active' : 'text-[#94a3b8] hover:text-white'
                    }`}
                  >
                    {item.label}
                    {item.children && (
                      <ChevronDown
                        size={11}
                        className={`transition-transform duration-150 ${openMega === item.key ? 'rotate-180' : ''}`}
                      />
                    )}
                  </button>

                  {/* Mega menu */}
                  {item.children && openMega === item.key && (
                    <MegaMenu item={item} onNavigate={handleNavigate} />
                  )}
                </div>
              ))}
            </nav>

            {/* Right controls */}
            <div className="flex items-center gap-2">
              {searchOpen ? (
                <div className="flex items-center gap-2">
                  <input
                    autoFocus
                    type="text"
                    placeholder="Search DTMI..."
                    className="text-white text-sm px-3 py-1.5 w-48 focus:outline-none transition-colors placeholder-[#475569]"
                    style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }}
                    onFocus={e => e.target.style.borderColor = 'var(--brand-orange)'}
                    onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.15)'}
                  />
                  <button onClick={() => setSearchOpen(false)} className="text-[#94a3b8] hover:text-white">
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <>
                  <button onClick={() => setSearchOpen(true)} className="text-[#94a3b8] hover:text-white p-1.5 transition-colors">
                    <Search size={17} />
                  </button>
                  <button className="relative text-[#94a3b8] hover:text-white p-1.5 transition-colors">
                    <Bell size={17} />
                    <span className="absolute top-0.5 right-0.5 w-2 h-2 rounded-full" style={{ background: 'var(--brand-orange)' }} />
                  </button>
                </>
              )}
              {/* Mobile hamburger */}
              <button
                className="lg:hidden text-[#94a3b8] hover:text-white p-1.5 transition-colors"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── Mobile menu ── */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden" onClick={() => setMenuOpen(false)}>
          <div
            className="w-80 h-full overflow-y-auto"
            style={{ background: 'var(--brand-navy)' }}
            onClick={e => e.stopPropagation()}
          >
            {/* Mobile header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-sm flex items-center justify-center" style={{ background: 'var(--brand-orange)' }}>
                  <Zap size={13} className="text-white" />
                </div>
                <span className="text-white font-black text-[14px]">DTMI</span>
              </div>
              <button onClick={() => setMenuOpen(false)} className="text-[#94a3b8]"><X size={18} /></button>
            </div>

            {/* Mobile nav items */}
            <div className="py-2">
              {navItems.map(item => (
                <div key={item.key}>
                  {!item.children ? (
                    <button
                      onClick={() => handleNavigate(item.key)}
                      className={`w-full text-left px-4 py-3 text-[13px] font-semibold border-b border-white/5 transition-colors ${
                        activeSection === item.key ? 'text-white' : 'text-[#94a3b8] hover:text-white'
                      }`}
                      style={activeSection === item.key ? { color: 'var(--brand-orange)' } : {}}
                    >
                      {item.label}
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => setMobileOpen(mobileOpen === item.key ? null : item.key)}
                        className="w-full text-left px-4 py-3 text-[13px] font-semibold text-[#94a3b8] hover:text-white border-b border-white/5 flex items-center justify-between transition-colors"
                      >
                        {item.label}
                        <ChevronDown size={13} className={`transition-transform ${mobileOpen === item.key ? 'rotate-180' : ''}`} />
                      </button>
                      {mobileOpen === item.key && (
                        <div className="bg-black/20">
                          {item.children.map(group => (
                            <div key={group.heading} className="px-4 py-2">
                              <p className="text-[10px] font-black uppercase tracking-widest mb-1.5" style={{ color: 'var(--brand-orange)' }}>
                                {group.heading}
                              </p>
                              {group.links.map(link => (
                                <button
                                  key={link.key}
                                  onClick={() => handleNavigate(link.key)}
                                  className="w-full text-left py-1.5 text-[12px] text-[#94a3b8] hover:text-white transition-colors"
                                >
                                  {link.label}
                                </button>
                              ))}
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
