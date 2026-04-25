import { useState, useEffect, useRef, useCallback } from 'react';
import { Search, Menu, X, Bell, ChevronDown, Zap } from 'lucide-react';
import { navItems } from '../data/mockData';

/* ─────────────────────────────────────────────────────────────
   MegaMenu panel — positioned relative to the full header width.
   `offsetLeft` is the left edge of the trigger button (px from
   the header's left padding edge). We try to align the panel's
   left edge there, then clamp so it never overflows the viewport.
───────────────────────────────────────────────────────────── */
function MegaMenu({ item, offsetLeft, headerWidth, onNavigate }) {
  const panelRef  = useRef(null);
  const PANEL_PAD = 16; // min gap from viewport edge

  // Column count based on number of groups
  const cols =
    item.children.length === 1 ? 'grid-cols-1' :
    item.children.length === 2 ? 'grid-cols-2' :
    item.children.length === 3 ? 'grid-cols-3' :
    'grid-cols-4';

  // Compute left position: start at trigger, clamp so panel stays inside header
  const getLeft = () => {
    const el = panelRef.current;
    if (!el) return offsetLeft;
    const panelW = el.offsetWidth;
    const maxLeft = headerWidth - panelW - PANEL_PAD;
    return Math.max(PANEL_PAD, Math.min(offsetLeft, maxLeft));
  };

  // Re-position after first paint so we have real dimensions
  const [left, setLeft] = useState(offsetLeft);
  useEffect(() => {
    setLeft(getLeft());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offsetLeft, headerWidth]);

  return (
    <div
      ref={panelRef}
      className="mega-menu-panel"
      style={{ left }}
    >
      <div className="px-6 py-6">
        <div className={`grid gap-6 ${cols}`}>
          {item.children.map((group) => (
            <div key={group.heading} style={{ minWidth: '160px' }}>
              <p
                className="text-[10px] font-black uppercase tracking-widest mb-3 pb-2 border-b border-white/10"
                style={{ color: 'var(--brand-orange)' }}
              >
                {group.heading}
              </p>
              <div className="space-y-0.5">
                {group.links.map((link) => (
                  <button
                    key={link.key}
                    onClick={() => onNavigate(link.key)}
                    className="w-full text-left group px-2 py-2 rounded-sm hover:bg-white/5 transition-colors"
                  >
                    <p className="text-[#e2e8f0] text-[12px] font-semibold group-hover:text-white transition-colors leading-snug">
                      {link.label}
                    </p>
                    {link.desc && (
                      <p className="text-[#64748b] text-[10px] mt-0.5 leading-snug">{link.desc}</p>
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

/* ─────────────────────────────────────────────────────────────
   TopBar
───────────────────────────────────────────── */
export default function TopBar({ activeSection, setActiveSection, onAdmin, onSignIn }) {
  const [menuOpen,    setMenuOpen]    = useState(false);
  const [openMega,    setOpenMega]    = useState(null);
  const [megaOffset,  setMegaOffset]  = useState(0);
  const [headerWidth, setHeaderWidth] = useState(1280);
  const [scrolled,    setScrolled]    = useState(false);
  const [searchOpen,  setSearchOpen]  = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(null);

  const headerRef  = useRef(null);
  const navRef     = useRef(null);
  const triggerRefs = useRef({});  // key → button DOM node

  /* ── scroll shadow ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── track header width for clamping ── */
  useEffect(() => {
    const update = () => {
      if (headerRef.current) setHeaderWidth(headerRef.current.offsetWidth);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  /* ── close mega on outside click ── */
  useEffect(() => {
    const handler = (e) => {
      if (headerRef.current && !headerRef.current.contains(e.target)) {
        setOpenMega(null);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  /* ── lock body scroll when mobile drawer is open ── */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const openMegaMenu = useCallback((key) => {
    const btn = triggerRefs.current[key];
    if (btn && headerRef.current) {
      const headerRect = headerRef.current.getBoundingClientRect();
      const btnRect    = btn.getBoundingClientRect();
      setMegaOffset(btnRect.left - headerRect.left);
    }
    setOpenMega(key);
  }, []);

  const handleNavigate = (key) => {
    setActiveSection(key);
    setOpenMega(null);
    setMenuOpen(false);
    setMobileOpen(null);
  };

  const isActive = (item) => {
    if (item.key === activeSection) return true;
    if (item.children) {
      return item.children.some(g => g.links.some(l => l.key === activeSection));
    }
    return false;
  };

  const activeItem = navItems.find(i => i.key === openMega);

  return (
    <>
      {/* ── Top utility bar (hidden on mobile) ── */}
      <div style={{ background: 'var(--brand-navy)' }} className="border-b border-white/5 hidden sm:block">
        <div className="max-w-[1280px] mx-auto px-4 flex items-center justify-between h-9">
          <div className="flex items-center gap-3">
            <span className="text-[#94a3b8] text-[11px] uppercase tracking-wider whitespace-nowrap">
              {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
            <span className="text-white/20 text-xs">|</span>
            <span
              className="text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 whitespace-nowrap"
              style={{ color: 'var(--brand-orange)' }}
            >
              <span className="live-blink inline-block w-1.5 h-1.5 rounded-full" style={{ background: 'var(--brand-orange)' }} />
              Live Intelligence
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={onAdmin} className="text-[#94a3b8] text-[11px] hover:text-white transition-colors font-semibold whitespace-nowrap">
              Admin
            </button>
            <button onClick={onSignIn} className="text-[#94a3b8] text-[11px] hover:text-white transition-colors whitespace-nowrap">
              Sign In
            </button>
            <button className="btn-orange text-[11px] px-3 py-1 rounded-sm uppercase tracking-wide whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* ── Main header ── */}
      {/*
        position:relative here is the containing block for the mega-menu panel.
        The panel is absolute inside this element, so it can span the full header
        width and we can clamp its left position precisely.
      */}
      <header
        ref={headerRef}
        style={{ background: 'var(--brand-navy)', position: 'relative' }}
        className={`sticky top-0 z-50 border-b border-white/10 transition-shadow duration-200 ${
          scrolled ? 'shadow-xl shadow-black/40' : ''
        }`}
      >
        <div className="max-w-[1280px] mx-auto px-4">
          <div className="flex items-center justify-between h-14">

            {/* ── Logo ── */}
            <button
              onClick={() => handleNavigate('Latest')}
              className="flex items-center gap-2.5 shrink-0"
              aria-label="DTMI Home"
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-sm shrink-0" style={{ background: 'var(--brand-orange)' }}>
                <Zap size={16} className="text-white" fill="white" />
              </div>
              <div className="leading-none">
                <p className="text-white font-black text-[15px] tracking-tight leading-none">DTMI</p>
                <p className="text-[10px] font-semibold uppercase tracking-widest leading-none mt-0.5" style={{ color: 'var(--brand-teal)' }}>
                  DigitalQatalyst
                </p>
              </div>
            </button>

            {/* ── Desktop nav ── */}
            <nav ref={navRef} className="hidden lg:flex items-center h-14">
              {navItems.map((item) => (
                <div
                  key={item.key}
                  className="relative h-full flex items-center"
                  onMouseEnter={() => item.children && openMegaMenu(item.key)}
                  onMouseLeave={() => setOpenMega(null)}
                >
                  <button
                    ref={el => { triggerRefs.current[item.key] = el; }}
                    onClick={() =>
                      !item.children
                        ? handleNavigate(item.key)
                        : (openMega === item.key ? setOpenMega(null) : openMegaMenu(item.key))
                    }
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
                </div>
              ))}
            </nav>

            {/* ── Right controls ── */}
            <div className="flex items-center gap-2 shrink-0">

              {/* Search — expands inline on click */}
              {searchOpen ? (
                <div className="flex items-center gap-2">
                  <div
                    className="flex items-center gap-2 rounded-sm border px-3 py-1.5"
                    style={{
                      background: 'rgba(255,255,255,0.07)',
                      border: '1px solid var(--brand-orange)',
                      width: 'clamp(180px, 28vw, 320px)',
                    }}
                  >
                    <Search size={14} style={{ color: 'var(--brand-orange)' }} className="shrink-0" />
                    <input
                      autoFocus
                      type="text"
                      placeholder="Search DTMI..."
                      className="flex-1 bg-transparent text-white text-[13px] focus:outline-none placeholder-[#475569]"
                      onKeyDown={e => e.key === 'Escape' && setSearchOpen(false)}
                    />
                    <button
                      onClick={() => setSearchOpen(false)}
                      className="shrink-0 text-[#64748b] hover:text-white transition-colors"
                      aria-label="Close search"
                    >
                      <X size={14} />
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="text-[#94a3b8] hover:text-white p-2 transition-colors"
                  aria-label="Search"
                >
                  <Search size={17} />
                </button>
              )}

              <button className="relative text-[#94a3b8] hover:text-white p-2 transition-colors" aria-label="Notifications">
                <Bell size={17} />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full" style={{ background: 'var(--brand-orange)' }} />
              </button>

              {/* Mobile-only Sign In */}
              <button className="sm:hidden text-[#94a3b8] text-[11px] hover:text-white transition-colors px-1" onClick={onSignIn}>
                Sign In
              </button>

              {/* Hamburger */}
              <button
                className="lg:hidden text-[#94a3b8] hover:text-white p-2 transition-colors"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              >
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* ── Mega-menu panel — lives INSIDE header so position:absolute is relative to it ── */}
        {activeItem && openMega && (
          <div
            /* Invisible hover bridge so mouse can travel from trigger to panel */
            onMouseEnter={() => setOpenMega(openMega)}
            onMouseLeave={() => setOpenMega(null)}
          >
            <MegaMenu
              item={activeItem}
              offsetLeft={megaOffset}
              headerWidth={headerWidth}
              onNavigate={handleNavigate}
            />
          </div>
        )}
      </header>

      {/* ── Mobile drawer ── */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-[60] lg:hidden"
          style={{ background: 'rgba(0,0,0,0.6)' }}
          onClick={() => setMenuOpen(false)}
        >
          <div
            className="absolute top-0 left-0 h-full flex flex-col overflow-hidden"
            style={{
              background: 'var(--brand-navy)',
              width: 'min(320px, 88vw)',
              boxShadow: '4px 0 32px rgba(0,0,0,0.5)',
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* Drawer header */}
            <div className="flex items-center justify-between px-4 py-3 border-b shrink-0" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-sm flex items-center justify-center shrink-0" style={{ background: 'var(--brand-orange)' }}>
                  <Zap size={13} className="text-white" fill="white" />
                </div>
                <div className="leading-none">
                  <p className="text-white font-black text-[14px] leading-none">DTMI</p>
                  <p className="text-[9px] font-semibold uppercase tracking-widest leading-none mt-0.5" style={{ color: 'var(--brand-teal)' }}>
                    DigitalQatalyst
                  </p>
                </div>
              </div>
              <button onClick={() => setMenuOpen(false)} className="text-[#94a3b8] hover:text-white p-1 transition-colors" aria-label="Close menu">
                <X size={18} />
              </button>
            </div>

            {/* Mobile utility actions (Admin / Sign In / Subscribe) */}
            <div className="flex items-center gap-3 px-4 py-3 border-b sm:hidden shrink-0" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
              <button onClick={() => { onAdmin(); setMenuOpen(false); }} className="text-[#94a3b8] text-[12px] hover:text-white transition-colors font-semibold">
                Admin
              </button>
              <span className="text-white/20 text-xs">|</span>
              <button onClick={() => { onSignIn(); setMenuOpen(false); }} className="text-[#94a3b8] text-[12px] hover:text-white transition-colors">
                Sign In
              </button>
              <button className="btn-orange text-[11px] px-3 py-1 rounded-sm uppercase tracking-wide ml-auto">
                Subscribe
              </button>
            </div>

            {/* Nav items — scrollable */}
            <nav className="flex-1 overflow-y-auto py-1">
              {navItems.map((item) => (
                <div key={item.key}>
                  {!item.children ? (
                    <button
                      onClick={() => handleNavigate(item.key)}
                      className="w-full text-left px-4 py-3.5 text-[13px] font-semibold border-b flex items-center gap-3 transition-colors"
                      style={{
                        borderColor: 'rgba(255,255,255,0.05)',
                        color: activeSection === item.key ? 'var(--brand-orange)' : '#94a3b8',
                      }}
                    >
                      {activeSection === item.key && (
                        <span className="w-1 h-4 rounded-full shrink-0" style={{ background: 'var(--brand-orange)' }} />
                      )}
                      {item.label}
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => setMobileOpen(mobileOpen === item.key ? null : item.key)}
                        className="w-full text-left px-4 py-3.5 text-[13px] font-semibold text-[#94a3b8] hover:text-white border-b flex items-center justify-between transition-colors"
                        style={{ borderColor: 'rgba(255,255,255,0.05)' }}
                      >
                        <span>{item.label}</span>
                        <ChevronDown
                          size={14}
                          className={`transition-transform duration-200 shrink-0 ${mobileOpen === item.key ? 'rotate-180' : ''}`}
                        />
                      </button>

                      {mobileOpen === item.key && (
                        <div style={{ background: 'rgba(0,0,0,0.25)' }}>
                          {item.children.map((group) => (
                            <div key={group.heading} className="px-4 pt-3 pb-2">
                              <p className="text-[10px] font-black uppercase tracking-widest mb-2" style={{ color: 'var(--brand-orange)' }}>
                                {group.heading}
                              </p>
                              {group.links.map((link) => (
                                <button
                                  key={link.key}
                                  onClick={() => handleNavigate(link.key)}
                                  className="w-full text-left py-2 px-2 text-[12px] rounded-sm hover:bg-white/5 transition-colors flex items-center gap-2"
                                  style={{ color: activeSection === link.key ? 'var(--brand-orange)' : '#94a3b8' }}
                                >
                                  {activeSection === link.key && (
                                    <span className="w-1 h-3 rounded-full shrink-0" style={{ background: 'var(--brand-orange)' }} />
                                  )}
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
            </nav>

            {/* Drawer footer */}
            <div className="px-4 py-4 border-t shrink-0" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
              <p className="text-[10px] uppercase tracking-widest" style={{ color: 'var(--brand-muted)' }}>
                © 2026 DigitalQatalyst · DTMI
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
