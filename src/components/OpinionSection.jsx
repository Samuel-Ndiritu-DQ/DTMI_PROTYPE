import { opinionPieces } from '../data/mockData';
import SectionLabel from './SectionLabel';

export default function OpinionSection() {
  return (
    <div>
      <SectionLabel title="Opinion & Analysis" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {opinionPieces.map((piece) => (
          <div key={piece.id} className="cursor-pointer card-hover group flex flex-col gap-3 bg-white border rounded-sm p-4" style={{ borderColor: 'var(--brand-border)' }}>
            <div className="flex items-center gap-3">
              <img
                src={piece.image}
                alt={piece.author}
                className="w-11 h-11 rounded-full object-cover border-2"
                style={{ borderColor: 'var(--brand-border)' }}
                loading="lazy"
              />
              <div>
                <p className="text-[12px] font-bold" style={{ color: 'var(--brand-navy)' }}>{piece.author}</p>
                <p className="text-[10px]" style={{ color: 'var(--brand-muted)' }}>{piece.role}</p>
              </div>
            </div>
            <div>
              <span className="inline-block text-[9px] font-black px-2 py-0.5 uppercase tracking-wider mb-2 rounded-sm" style={{ background: 'var(--brand-orange)', color: 'white' }}>
                {piece.label}
              </span>
              <h3 className="text-[13px] font-bold leading-snug group-hover:opacity-70 transition-opacity" style={{ color: 'var(--brand-navy)' }}>
                {piece.headline}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
