import { Zap } from 'lucide-react';

const footerLinks = {
  'Intelligence': ['Signal', 'Insight', 'Deep Analysis', 'DTMB Books', 'Trend Radar'],
  '6xD Domains':  ['D1 - Digital Economy', 'D2 - DCO', 'D3 - DBP', 'D4 - DT2.0', 'D5 - Digital Worker', 'D6 - Accelerators'],
  'Technology':   ['DXP Platform', 'DWS Platform', 'DIA Platform', 'SDO Platform'],
  'Company':      ['About DTMI', 'Research Team', 'DigitalQatalyst', 'Careers', 'Contact'],
};

export default function Footer() {
  return (
    <footer className="border-t" style={{ background: 'var(--brand-navy)', borderColor: 'rgba(255,255,255,0.06)' }}>
      <div className="max-w-[1280px] mx-auto px-4 py-10">
        {/* Logo row */}
        <div className="flex items-center gap-3 mb-8 pb-6 border-b border-white/8">
          <div className="w-8 h-8 rounded-sm flex items-center justify-center" style={{ background: 'var(--brand-orange)' }}>
            <Zap size={15} className="text-white" fill="white" />
          </div>
          <div>
            <p className="text-white font-black text-[15px] tracking-tight">DTMI</p>
            <p className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: 'var(--brand-teal)' }}>
              DigitalQatalyst Think-Tank · Digital Transformation Management Intelligence
            </p>
          </div>
        </div>

        {/* Links grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="text-white text-[11px] font-black uppercase tracking-wider mb-3">{section}</h4>
              <ul className="space-y-2">
                {links.map(link => (
                  <li key={link}>
                    <button className="text-[#64748b] text-[12px] hover:text-white transition-colors text-left">
                      {link}
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
