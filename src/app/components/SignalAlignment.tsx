import {
  Activity,
  TrendingUp,
  ShoppingBag,
  Users,
  BarChart3,
  type LucideIcon,
} from 'lucide-react';

type Platform = {
  name: string;
  shortName: string;
  icon: LucideIcon;
  status: 'Strong' | 'Stable' | 'Caution' | 'Ready';
  signal: string;
  confidence: number;
};

export function SignalAlignment() {
  const platforms: Platform[] = [
    {
      name: 'Integrated Media Intelligence',
      shortName: 'Integrated Media Intelligence',
      icon: Activity,
      status: 'Strong',
      signal: 'Share-of-voice trending up',
      confidence: 89,
    },
    {
      name: 'Creator to Commerce ROI Engine',
      shortName: 'Creator ROI',
      icon: Users,
      status: 'Strong',
      signal: 'Top performers exceeding benchmarks',
      confidence: 91,
    },
    {
      name: 'Brand-Safe Promotions Lab',
      shortName: 'Promotions',
      icon: ShoppingBag,
      status: 'Stable',
      signal: 'Margin protection active',
      confidence: 85,
    },
    {
      name: 'Trend-to-Plan Demand Sensing',
      shortName: 'Demand',
      icon: TrendingUp,
      status: 'Caution',
      signal: 'Inventory levels monitored',
      confidence: 76,
    },
    {
      name: 'Media Influencer Platform',
      shortName: 'Media',
      icon: BarChart3,
      status: 'Ready',
      signal: 'Amplification ready',
      confidence: 87,
    },
  ];

  return (
    <section
      className="overflow-hidden border bg-white/96 p-6 shadow-[0_10px_28px_rgba(17,17,17,0.05)]"
      style={{
        borderRadius: '6px',
        borderColor: '#E7E1D2',
      }}
    >
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h2
            className="text-[24px] font-semibold leading-none"
            style={{ color: '#111111', letterSpacing: '-0.02em' }}
          >
            Signal Alignment
          </h2>
          <p className="mt-2 text-sm" style={{ color: '#6B7280' }}>
            Real-time platform contributions across the orchestration layer.
          </p>
        </div>

        <div
          className="rounded-full border px-3 py-1.5 text-xs font-medium"
          style={{
            borderColor: '#E7E1D2',
            background: 'rgba(255,255,255,0.9)',
            color: '#6B7280',
          }}
        >
          Real-time platform contributions
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
        {platforms.map((platform, idx) => (
          <PlatformCard key={idx} platform={platform} />
        ))}
      </div>
    </section>
  );
}

function PlatformCard({ platform }: { platform: Platform }) {
  const Icon = platform.icon;

  const statusStyles: Record<
    Platform['status'],
    { bg: string; border: string; text: string }
  > = {
    Strong: {
      bg: 'rgba(201,162,39,0.10)',
      border: 'rgba(201,162,39,0.26)',
      text: '#8F6A00',
    },
    Ready: {
      bg: 'rgba(201,162,39,0.10)',
      border: 'rgba(201,162,39,0.26)',
      text: '#8F6A00',
    },
    Stable: {
      bg: 'rgba(17,17,17,0.04)',
      border: '#E1D8C6',
      text: '#5F6672',
    },
    Caution: {
      bg: 'rgba(17,17,17,0.06)',
      border: '#D9CEBA',
      text: '#7A5B12',
    },
  };

  const status = statusStyles[platform.status];

  return (
    <div
      className="group relative overflow-hidden border p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_34px_rgba(17,17,17,0.08)]"
      style={{
        borderRadius: '6px',
        borderColor: '#E7E1D2',
        background:
          'linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(249,246,240,0.82) 100%)',
      }}
    >
      <div
        className="absolute inset-x-0 top-0 h-[3px]"
        style={{
          background:
            'linear-gradient(90deg, rgba(201,162,39,0.18) 0%, #C9A227 50%, rgba(201,162,39,0.18) 100%)',
        }}
      />

      <div className="flex items-start justify-between gap-3">
        <div
          className="flex h-10 w-10 items-center justify-center border"
          style={{
            borderRadius: '6px',
            borderColor: 'rgba(201,162,39,0.28)',
            background:
              'linear-gradient(180deg, rgba(201,162,39,0.10) 0%, rgba(201,162,39,0.04) 100%)',
          }}
        >
          <Icon className="h-4.5 w-4.5" style={{ color: '#C9A227' }} />
        </div>

        <div
          className="rounded-full border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em]"
          style={{
            background: status.bg,
            borderColor: status.border,
            color: status.text,
          }}
        >
          {platform.status}
        </div>
      </div>

      <div className="mt-5">
        <div
          className="text-[10px] font-semibold uppercase tracking-[0.16em]"
          style={{ color: '#6B7280' }}
        >
          {platform.shortName}
        </div>

        <div
          className="mt-3 min-h-[48px] text-[14px] font-semibold leading-[1.4]"
          style={{ color: '#111111' }}
        >
          {platform.signal}
        </div>
      </div>

      <div className="mt-6">
        <div className="mb-2 flex items-center justify-between">
          <div
            className="text-[10px] font-semibold uppercase tracking-[0.14em]"
            style={{ color: '#6B7280' }}
          >
            Confidence
          </div>
          <div
            className="text-[18px] font-semibold"
            style={{ color: '#B88A12', letterSpacing: '-0.02em' }}
          >
            {platform.confidence}%
          </div>
        </div>

        <div
          className="h-2 w-full overflow-hidden rounded-full"
          style={{ background: 'rgba(17,17,17,0.06)' }}
        >
          <div
            className="h-full rounded-full"
            style={{
              width: `${platform.confidence}%`,
              background:
                'linear-gradient(90deg, rgba(201,162,39,0.75) 0%, #C9A227 100%)',
            }}
          />
        </div>
      </div>
    </div>
  );
}