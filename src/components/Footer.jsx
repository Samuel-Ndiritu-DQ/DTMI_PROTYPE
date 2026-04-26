import { Zap } from 'lucide-react';
import { useNav } from '../context/NavContext';

// Map display label -> route key used in SECTION_ROUTES / setActiveSection
const footerLinks = {
  'Intelligence': [
    { label: 'Signal',        key: 'Signal' },
    { label: 'Insight',       key: 'Insight' },
    { label: 'Deep Analysis', key: 'Deep Analysis' },
    { label: 'DTMB Books',    key: 'Books' },
    { label: 'Research',      key: 'Research' },
    { label: 'Trend Radar',   key: 'Trend Radar' },
    { label: 'Glossary',      key: 'Glossary' },
  ],
  '6xD Domains': [
    { label: 'D1 - Digital Economy',           key: 'D1' },
    { label: 'D2 - DCO',                       key: 'D2' },
    { label: 'D3 - Digital Business Platforms',key: 'D3' },
    { label: 'D4 - Digital Transformation 2.0',key: 'D4' },
    { label: 'D5 - Digital Worker',            key: 'D5' },
    { label: 'D6 - Digital Accelerators',      key: 'D6' },
  ],
  'Technology': [
    { label: 'Digital Channels',        key: 'DXP-Channels' },
    { label: 'Digital Experience',      key: 'DXP-Experience' },
    { label: 'Digital Workspace',       key: 'DWS-Workspace' },
    { label: 'Digital Analytics',       key: 'DIA-Analytics' },
    { label: 'Digital Intelligence (AI)',key: 'DIA-AI' },
    { label: 'Digital Security',        key: 'SDO-Security' },
  ],
  'Company': [
    { label: 'About DTMI',      key: 'About' },
    { label: 'Multimedia',      key: 'Multimedia' },
    { label: 'AI Engine',       key: 'AI Engine' },
    { label: 'Insight Cards',   key: 'Insight Cards' },
    { label: '6xD Framework',   key: '6xD Framework' },
  ],
};

// Footer needs to trigger section navigation — we use a custom event
// so Footer doesn't need to receive setActiveSection as a prop
function useFooterNav() {
  const navigate = (key) => {
    window.dispatchEvent(new CustomEvent('dtmi:navigate', { detail: { key } }));
    window.scrollTo(0, 0);
  };
  return navigate;
}

export default function Footer() {
  const navigate = useFooterNav();

  return (
    <footer className="border-t" style={{ background: 'var(--brand-navy)', borderColor: 'rgba(255,255,255,0.06)' }}>
      <div className="max-w-[1280px] mx-auto px-4 py-10">
        {/* Logo row */}
        <div className="flex items-center gap-3 mb-8 pb-6 border-b border-white/8">
          <button onClick={() => navigate('Latest')} className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 rounded-sm flex items-center justify-center" style={{ background: 'var(--brand-orange)' }}>
              <Zap size={15} className="text-white" fill="white" />
            </div>
            <div className="text-left">
              <p className="text-white font-black text-[15px] tracking-tight">DTMI</p>
              <p className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: 'var(--brand-teal)' }}>
                DigitalQatalyst Think-Tank · Digital Transformation Management Intelligence
              </p>
            </div>
          </button>
        </div>

        {/* Links grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="text-white text-[11px] font-black uppercase tracking-wider mb-3">{section}</h4>
              <ul className="space-y-2">
                {links.map(({ label, key }) => (
                  <li key={key}>
                    <button
                      onClick={() => navigate(key)}
                      className="text-[#64748b] text-[12px] hover:text-white transition-colors text-left"
                    >
                      {label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/8 pt-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex flex-wrap gap-3 text-[11px] text-[#64748b]">
            {['Terms of Use', 'Privacy Policy', 'Cookie Settings', 'Accessibility'].map(item => (
              <button key={item} className="hover:text-white transition-colors">{item}</button>
            ))}
          </div>
          <p className="text-[#374151] text-[11px]">© {new Date().getFullYear()} DigitalQatalyst · DTMI Prototype · Mock Data Mode</p>
        </div>
      </div>
    </footer>
  );
}
