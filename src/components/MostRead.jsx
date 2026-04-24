import { mostRead } from '../data/mockData';
import SectionLabel from './SectionLabel';

export default function MostRead() {
  return (
    <div className="bg-white border rounded-sm p-4" style={{ borderColor: 'var(--brand-border)' }}>
      <SectionLabel title="Most Read" link={null} />
      <ol className="space-y-0">
        {mostRead.map((item) => (
          <li key={item.rank} className="flex gap-3 py-3 border-b last:border-0 cursor-pointer group" style={{ borderColor: 'var(--brand-border)' }}>
            <span className="shrink-0 text-2xl font-black leading-none w-6 text-center" style={{ color: 'var(--brand-orange)' }}>
              {item.rank}
            </span>
            <div>
              <p className="text-[10px] font-black uppercase tracking-wider mb-0.5" style={{ color: 'var(--brand-teal)' }}>{item.category}</p>
              <p className="text-[12px] font-semibold leading-snug group-hover:opacity-70 transition-opacity" style={{ color: 'var(--brand-navy)' }}>
                {item.headline}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
