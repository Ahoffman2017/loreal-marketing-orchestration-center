import {
  TrendingUp,
  AlertTriangle,
  Zap,
  Target,
  Clock,
  type LucideIcon,
} from 'lucide-react';

type SummaryCardItem = {
  icon: LucideIcon;
  label: string;
  value: string;
  emphasis?: 'default' | 'strong';
};

export function ExecutiveSummary() {
  const cards: SummaryCardItem[] = [
    {
      icon: TrendingUp,
      label: 'Biggest Opportunity',
      value: 'Creator momentum is rising for Génifique',
      emphasis: 'strong',
    },
    {
      icon: AlertTriangle,
      label: 'Biggest Risk',
      value: 'Inventory confidence below safe threshold in FR and UK',
    },
    {
      icon: Zap,
      label: 'Recommended Next Action',
      value: 'Shift support to creator-led conversion clusters',
      emphasis: 'strong',
    },
    {
      icon: Target,
      label: 'Decision Confidence',
      value: '86%',
    },
    {
      icon: Clock,
      label: 'Response Window',
      value: 'Next 48 hours',
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
      {cards.map((card, idx) => (
        <SummaryCard key={idx} {...card} />
      ))}
    </div>
  );
}

function SummaryCard({
  icon: Icon,
  label,
  value,
  emphasis = 'default',
}: SummaryCardItem) {
  const isStrong = emphasis === 'strong';

  return (
    <div
      className="group relative overflow-hidden border bg-white/95 p-5 transition-all duration-300 hover:-translate-y-0.5"
      style={{
        borderRadius: '6px',
        borderColor: '#E7E1D2',
        boxShadow: '0 8px 24px rgba(17,17,17,0.05)',
      }}
    >
      <div
        className="absolute inset-x-0 top-0 h-[3px]"
        style={{
          background:
            'linear-gradient(90deg, rgba(201,162,39,0.20) 0%, #C9A227 50%, rgba(201,162,39,0.20) 100%)',
        }}
      />

      <div className="flex items-start justify-between gap-3">
        <div
          className="flex h-11 w-11 items-center justify-center border"
          style={{
            borderRadius: '6px',
            borderColor: 'rgba(201,162,39,0.30)',
            background: isStrong
              ? 'linear-gradient(180deg, rgba(201,162,39,0.14) 0%, rgba(201,162,39,0.05) 100%)'
              : 'linear-gradient(180deg, rgba(17,17,17,0.03) 0%, rgba(17,17,17,0.01) 100%)',
          }}
        >
          <Icon
            className="h-5 w-5"
            style={{ color: isStrong ? '#C9A227' : '#111111' }}
          />
        </div>

        <div
          className="px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.14em]"
          style={{
            borderRadius: '999px',
            background: 'rgba(201,162,39,0.10)',
            color: '#8F6A00',
          }}
        >
          Signal
        </div>
      </div>

      <div className="mt-5">
        <div
          className="text-[11px] font-semibold uppercase tracking-[0.16em]"
          style={{ color: '#6B7280' }}
        >
          {label}
        </div>

        <div
          className="mt-3 text-[15px] font-semibold leading-[1.35]"
          style={{
            color: '#111111',
            letterSpacing: '-0.015em',
          }}
        >
          {value}
        </div>
      </div>

      <div className="mt-5 flex items-center gap-2">
        <div
          className="h-1.5 rounded-full"
          style={{
            width: isStrong ? 56 : 36,
            background: '#C9A227',
          }}
        />
        <div
          className="h-px flex-1"
          style={{
            background:
              'linear-gradient(90deg, rgba(201,162,39,0.28) 0%, rgba(201,162,39,0.04) 100%)',
          }}
        />
      </div>
    </div>
  );
}