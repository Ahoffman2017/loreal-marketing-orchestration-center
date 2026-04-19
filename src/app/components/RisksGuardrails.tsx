import {
  AlertTriangle,
  DollarSign,
  Package,
  Users,
  Shield,
  Radio,
  type LucideIcon,
} from 'lucide-react';

type RiskItem = {
  type: string;
  severity: 'High' | 'Medium' | 'Low' | 'Clear';
  icon: LucideIcon;
  description: string;
  action: string;
  markets: string[];
};

export function RisksGuardrails() {
  const risks: RiskItem[] = [
    {
      type: 'Inventory Constraint',
      severity: 'High',
      icon: Package,
      description: 'FR and UK inventory coverage below safe threshold',
      action: 'Monitor daily, hold promotion',
      markets: ['FR', 'UK'],
    },
    {
      type: 'Margin Risk',
      severity: 'Medium',
      icon: DollarSign,
      description: 'DACH region discount pressure affecting margin targets',
      action: 'Shift to education strategy',
      markets: ['DE', 'AT', 'CH'],
    },
    {
      type: 'Audience Overlap',
      severity: 'Low',
      icon: Users,
      description: 'Creator and paid audiences showing 18% overlap',
      action: 'Optimize targeting segmentation',
      markets: ['Global'],
    },
    {
      type: 'Channel Saturation',
      severity: 'Low',
      icon: Radio,
      description: 'Instagram frequency rising above recommended threshold',
      action: 'Diversify channel mix',
      markets: ['US', 'UK'],
    },
    {
      type: 'Promotion Timing Conflict',
      severity: 'Medium',
      icon: AlertTriangle,
      description: 'Two major brands launching discount campaigns same week',
      action: 'Stagger launch dates',
      markets: ['Global'],
    },
    {
      type: 'Compliance Check',
      severity: 'Clear',
      icon: Shield,
      description: 'All campaigns cleared for regulatory compliance',
      action: 'No action required',
      markets: ['Global'],
    },
  ];

  const activeRiskCount = risks.filter(
    (risk) => risk.severity === 'High' || risk.severity === 'Medium'
  ).length;

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
            Conflicts, Risks, and Guardrails
          </h2>
          <p className="mt-2 text-sm" style={{ color: '#6B7280' }}>
            Constraint signals that shape recommended actions and approvals.
          </p>
        </div>

        <div
          className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium"
          style={{
            borderColor: '#E7E1D2',
            background: 'rgba(255,255,255,0.92)',
            color: '#6B7280',
          }}
        >
          <span
            className="h-2 w-2 rounded-full"
            style={{ background: '#C9A227' }}
          />
          {activeRiskCount} active risks
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        {risks.map((risk, idx) => (
          <RiskCard key={idx} risk={risk} />
        ))}
      </div>
    </section>
  );
}

function RiskCard({ risk }: { risk: RiskItem }) {
  const Icon = risk.icon;

  const severityStyles: Record<
    RiskItem['severity'],
    { bg: string; border: string; text: string; iconBg: string }
  > = {
    High: {
      bg: 'rgba(17,17,17,0.06)',
      border: '#D4C7B0',
      text: '#6A4E0A',
      iconBg: 'rgba(201,162,39,0.14)',
    },
    Medium: {
      bg: 'rgba(201,162,39,0.12)',
      border: 'rgba(201,162,39,0.28)',
      text: '#8F6A00',
      iconBg: 'rgba(201,162,39,0.12)',
    },
    Low: {
      bg: 'rgba(17,17,17,0.04)',
      border: '#E1D8C6',
      text: '#5F6672',
      iconBg: 'rgba(17,17,17,0.03)',
    },
    Clear: {
      bg: 'rgba(201,162,39,0.08)',
      border: 'rgba(201,162,39,0.22)',
      text: '#7A610B',
      iconBg: 'rgba(201,162,39,0.10)',
    },
  };

  const severity = severityStyles[risk.severity];

  return (
    <div
      className="group relative overflow-hidden border p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_34px_rgba(17,17,17,0.08)]"
      style={{
        borderRadius: '6px',
        borderColor: '#E7E1D2',
        background:
          'linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(249,246,240,0.84) 100%)',
      }}
    >
      <div
        className="absolute inset-x-0 top-0 h-[3px]"
        style={{
          background:
            'linear-gradient(90deg, rgba(201,162,39,0.16) 0%, #C9A227 50%, rgba(201,162,39,0.16) 100%)',
        }}
      />

      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-start gap-3">
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center border"
            style={{
              borderRadius: '6px',
              borderColor: 'rgba(201,162,39,0.22)',
              background: severity.iconBg,
            }}
          >
            <Icon className="h-4.5 w-4.5" style={{ color: '#C9A227' }} />
          </div>

          <div className="min-w-0">
            <div
              className="text-[16px] font-semibold leading-[1.3]"
              style={{ color: '#111111' }}
            >
              {risk.type}
            </div>
            <div
              className="mt-2 text-[13px] leading-[1.65]"
              style={{ color: '#6B7280' }}
            >
              {risk.description}
            </div>
          </div>
        </div>

        <div
          className="shrink-0 rounded-full border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em]"
          style={{
            background: severity.bg,
            borderColor: severity.border,
            color: severity.text,
          }}
        >
          {risk.severity}
        </div>
      </div>

      <div
        className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t pt-4"
        style={{ borderColor: '#EEE8DB' }}
      >
        <div className="flex flex-wrap gap-2">
          {risk.markets.map((market) => (
            <span
              key={market}
              className="rounded-full border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em]"
              style={{
                borderColor: '#E7E1D2',
                background: 'rgba(17,17,17,0.02)',
                color: '#5F6672',
              }}
            >
              {market}
            </span>
          ))}
        </div>

        <div className="text-right">
          <div
            className="text-[10px] font-semibold uppercase tracking-[0.16em]"
            style={{ color: '#6B7280' }}
          >
            Recommended action
          </div>
          <div
            className="mt-1 text-[13px] font-semibold"
            style={{ color: '#8F6A00' }}
          >
            {risk.action}
          </div>
        </div>
      </div>
    </div>
  );
}