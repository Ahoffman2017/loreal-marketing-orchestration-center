import { ChevronDown, ChevronUp, CheckCircle2, Clock, AlertCircle, Users, DollarSign, Star, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface DecisionCardsProps {
  selectedDecision: string | null;
  setSelectedDecision: (id: string | null) => void;
  decisionStates: Record<string, 'pending' | 'approved' | 'hold'>;
  onApprove: (id: string) => void;
  onHold: (id: string) => void;
}

type DecisionState = 'pending' | 'approved' | 'hold';

type Signal = {
  platform: string;
  label: string;
  status: string;
  note: string;
  color: 'red' | 'purple' | 'orange' | 'cyan' | 'blue';
};

type Decision = {
  id: string;
  title: string;
  summary: string;
  impact: string;
  impactValue: string;
  risk: 'Low' | 'Medium' | 'High';
  recommendation: string;
  primaryPlatform: string;
  primaryPlatformShort: string;
  primaryPlatformExplanation: string;
  signals: Signal[];
};

export function DecisionCards({
  selectedDecision,
  setSelectedDecision,
  decisionStates,
  onApprove,
  onHold,
}: DecisionCardsProps) {
  const decisions: Decision[] = [
    {
      id: 'decision1',
      title: 'Accelerate creator-led support for Génifique',
      summary:
        'Creator momentum is building with top performers exceeding benchmarks. Market signals align for immediate amplification.',
      impact: '+€2.3M revenue potential',
      impactValue: '+18%',
      risk: 'Low',
      recommendation:
        'Increase support on TikTok and Instagram in top-converting creator audience clusters',
      primaryPlatform: 'Creator to Commerce ROI Engine',
      primaryPlatformShort: 'Creator ROI',
      primaryPlatformExplanation:
        'This platform is the main source behind the recommendation.',
      signals: [
        {
          platform: 'Integrated Media Intelligence',
          label: 'Integrated Media Intelligence',
          status: 'Strong',
          note: 'Share-of-voice increasing 24% WoW',
          color: 'red',
        },
        {
          platform: 'Creator ROI',
          label: 'Creator to Commerce ROI Engine',
          status: 'Strong',
          note: 'Top 3 creators outperforming by 3.2x',
          color: 'purple',
        },
        {
          platform: 'Media',
          label: 'Media Influencer Platform',
          status: 'Ready',
          note: 'Paid amplification ready',
          color: 'blue',
        },
        {
          platform: 'Demand',
          label: 'Trend-to-Plan Demand Sensing',
          status: 'Stable',
          note: 'Inventory stable in key markets',
          color: 'cyan',
        },
        {
          platform: 'Promotions',
          label: 'Brand-Safe Promotions Lab',
          status: 'Clear',
          note: 'No promotion required',
          color: 'orange',
        },
      ],
    },
    {
      id: 'decision2',
      title: 'Delay promotion in DACH to protect margin',
      summary:
        'Competitor pressure detected but inventory constraints and margin risks suggest holding discounting strategy.',
      impact: 'Protect €890K margin',
      impactValue: '+12% margin',
      risk: 'Medium',
      recommendation:
        'Hold discounting, shift to creator-led education and organic engagement',
      primaryPlatform: 'Brand-Safe Promotions Lab',
      primaryPlatformShort: 'Promotions Lab',
      primaryPlatformExplanation:
        'This platform defines the key business constraint driving this action.',
      signals: [
        {
          platform: 'Integrated Media Intelligence',
          label: 'Integrated Media Intelligence',
          status: 'Warning',
          note: 'Competitor pressure in DACH',
          color: 'red',
        },
        {
          platform: 'Promotions',
          label: 'Brand-Safe Promotions Lab',
          status: 'Alert',
          note: 'Margin risk at current discount',
          color: 'orange',
        },
        {
          platform: 'Demand',
          label: 'Trend-to-Plan Demand Sensing',
          status: 'Caution',
          note: 'Inventory below threshold',
          color: 'cyan',
        },
        {
          platform: 'Media',
          label: 'Media Influencer Platform',
          status: 'Caution',
          note: 'Paid pressure could spike demand',
          color: 'blue',
        },
      ],
    },
    {
      id: 'decision3',
      title: 'Reallocate media budget to creator-supported conversion path',
      summary:
        'Traditional paid performance is flattening while creator-assisted conversions show strong momentum.',
      impact: '+€1.8M efficiency gain',
      impactValue: '+22% ROAS',
      risk: 'Low',
      recommendation:
        'Move 12% from generic paid to creator-amplified audiences',
      primaryPlatform: 'Media Influencer Platform',
      primaryPlatformShort: 'Media Platform',
      primaryPlatformExplanation:
        'This platform is the main execution layer for this recommendation.',
      signals: [
        {
          platform: 'Integrated Media Intelligence',
          label: 'Integrated Media Intelligence',
          status: 'Declining',
          note: 'Paid performance flattening',
          color: 'red',
        },
        {
          platform: 'Creator ROI',
          label: 'Creator to Commerce ROI Engine',
          status: 'Strong',
          note: 'Creator conversion rising 34%',
          color: 'purple',
        },
        {
          platform: 'Media',
          label: 'Media Influencer Platform',
          status: 'Ready',
          note: 'Budget shift available',
          color: 'blue',
        },
      ],
    },
  ];

  return (
    <div className="space-y-4">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <h2
            className="text-[24px] font-semibold leading-none"
            style={{ color: '#111111', letterSpacing: '-0.02em' }}
          >
            Priority Decision Cards
          </h2>
          <p className="mt-2 text-sm" style={{ color: '#6B7280' }}>
            High-priority coordinated actions across platforms.
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
          Click to expand details
        </div>
      </div>

      {decisions.map((decision) => (
        <DecisionCard
          key={decision.id}
          decision={decision}
          isExpanded={selectedDecision === decision.id}
          onClick={() =>
            setSelectedDecision(selectedDecision === decision.id ? null : decision.id)
          }
          state={decisionStates[decision.id]}
          onApprove={() => onApprove(decision.id)}
          onHold={() => onHold(decision.id)}
        />
      ))}
    </div>
  );
}

function DecisionCard({
  decision,
  isExpanded,
  onClick,
  state,
  onApprove,
  onHold,
}: {
  decision: Decision;
  isExpanded: boolean;
  onClick: () => void;
  state: DecisionState;
  onApprove: () => void;
  onHold: () => void;
}) {
  const statusConfig = {
    pending: {
      icon: Clock,
      label: 'Pending',
      chipBg: 'rgba(17,17,17,0.04)',
      chipBorder: '#D6D3CB',
      chipText: '#5F6672',
    },
    approved: {
      icon: CheckCircle2,
      label: 'Approved',
      chipBg: 'rgba(201,162,39,0.12)',
      chipBorder: 'rgba(201,162,39,0.28)',
      chipText: '#8F6A00',
    },
    hold: {
      icon: AlertCircle,
      label: 'Hold',
      chipBg: 'rgba(17,17,17,0.06)',
      chipBorder: '#CFC6B2',
      chipText: '#7A5B12',
    },
  } satisfies Record<
    DecisionState,
    {
      icon: typeof Clock;
      label: string;
      chipBg: string;
      chipBorder: string;
      chipText: string;
    }
  >;

  const status = statusConfig[state];
  const StatusIcon = status.icon;

  const riskConfig = {
    Low: {
      bg: 'rgba(201,162,39,0.10)',
      border: 'rgba(201,162,39,0.24)',
      text: '#7F6313',
    },
    Medium: {
      bg: 'rgba(201,162,39,0.14)',
      border: 'rgba(201,162,39,0.30)',
      text: '#8F6A00',
    },
    High: {
      bg: 'rgba(17,17,17,0.06)',
      border: '#CBC2AE',
      text: '#6A4E0A',
    },
  } as const;

  const risk = riskConfig[decision.risk];

  return (
    <motion.div
      layout
      onClick={onClick}
      className="group cursor-pointer overflow-hidden border bg-white/96"
      style={{
        borderRadius: '6px',
        borderColor: isExpanded ? 'rgba(201,162,39,0.45)' : '#E7E1D2',
        boxShadow: isExpanded
          ? '0 22px 50px rgba(17,17,17,0.09)'
          : '0 10px 28px rgba(17,17,17,0.05)',
      }}
      transition={{ duration: 0.22 }}
    >
      <div
        className="h-[3px] w-full"
        style={{
          background: isExpanded
            ? 'linear-gradient(90deg, rgba(201,162,39,0.18) 0%, #C9A227 50%, rgba(201,162,39,0.18) 100%)'
            : 'linear-gradient(90deg, rgba(201,162,39,0.10) 0%, rgba(201,162,39,0.28) 50%, rgba(201,162,39,0.10) 100%)',
        }}
      />

      <div className="p-6 sm:p-6">
        <div className="flex items-start justify-between gap-6">
          <div className="min-w-0 flex-1">
            <div className="mb-3 flex flex-wrap items-center gap-3">
              <h3
                className="text-[20px] font-semibold leading-[1.2]"
                style={{ color: '#111111', letterSpacing: '-0.02em' }}
              >
                {decision.title}
              </h3>

              <div
                className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em]"
                style={{
                  background: status.chipBg,
                  borderColor: status.chipBorder,
                  color: status.chipText,
                }}
              >
                <StatusIcon className="h-3.5 w-3.5" />
                {status.label}
              </div>
            </div>

            <p
              className="max-w-[880px] text-[14px] leading-[1.7]"
              style={{ color: '#4B5563' }}
            >
              {decision.summary}
            </p>

            <div className="mt-5 flex flex-wrap gap-2.5">
              {decision.signals.map((signal, idx) => (
                <PlatformChip key={idx} signal={signal} />
              ))}
            </div>
          </div>

          <div className="ml-2 flex min-w-[170px] flex-col items-end gap-3">
            <div className="text-right">
              <div
                className="text-[34px] font-semibold leading-none"
                style={{ color: '#B88A12', letterSpacing: '-0.03em' }}
              >
                {decision.impactValue}
              </div>
              <div className="mt-2 text-sm" style={{ color: '#6B7280' }}>
                {decision.impact}
              </div>
            </div>

            <div
              className="rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em]"
              style={{
                background: risk.bg,
                borderColor: risk.border,
                color: risk.text,
              }}
            >
              Risk: {decision.risk}
            </div>

            <div
              className="flex h-9 w-9 items-center justify-center rounded-full border transition-colors duration-200"
              style={{
                borderColor: isExpanded ? 'rgba(201,162,39,0.35)' : '#E7E1D2',
                background: isExpanded ? 'rgba(201,162,39,0.12)' : 'rgba(17,17,17,0.02)',
                color: isExpanded ? '#8F6A00' : '#6B7280',
              }}
            >
              {isExpanded ? (
                <ChevronUp className="h-4.5 w-4.5" />
              ) : (
                <ChevronDown className="h-4.5 w-4.5" />
              )}
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -4 }}
              animate={{ opacity: 1, height: 'auto', y: 0 }}
              exit={{ opacity: 0, height: 0, y: -4 }}
              transition={{ duration: 0.22 }}
              className="mt-7 overflow-hidden border-t pt-6"
              style={{ borderColor: '#EEE8DB' }}
            >
              <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
                <div className="space-y-6">
                  <section>
                    <div
                      className="mb-3 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em]"
                      style={{ color: '#8F6A00' }}
                    >
                      <Sparkles className="h-3.5 w-3.5" />
                      AI Recommendation
                    </div>

                    <div
                      className="border p-4 text-[14px] leading-[1.7]"
                      style={{
                        borderRadius: '6px',
                        background:
                          'linear-gradient(180deg, rgba(201,162,39,0.10) 0%, rgba(201,162,39,0.04) 100%)',
                        borderColor: 'rgba(201,162,39,0.28)',
                        color: '#2F3742',
                      }}
                    >
                      {decision.recommendation}
                    </div>
                  </section>

                  <section>
                    <div
                      className="mb-3 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em]"
                      style={{ color: '#6B7280' }}
                    >
                      <Star className="h-3.5 w-3.5" style={{ color: '#C9A227' }} />
                      Primary Platform
                    </div>

                    <div
                      className="border p-4"
                      style={{
                        borderRadius: '6px',
                        borderColor: '#E7E1D2',
                        background: 'rgba(255,255,255,0.9)',
                      }}
                    >
                      <div
                        className="text-[15px] font-semibold"
                        style={{ color: '#111111' }}
                      >
                        {decision.primaryPlatform}
                      </div>
                      <div
                        className="mt-2 text-[13px] leading-[1.65]"
                        style={{ color: '#6B7280' }}
                      >
                        {decision.primaryPlatformExplanation}
                      </div>
                    </div>
                  </section>
                </div>

                <section>
                  <div
                    className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em]"
                    style={{ color: '#6B7280' }}
                  >
                    Contributing Platform Signals
                  </div>

                  <div className="space-y-2.5">
                    {decision.signals.map((signal, idx) => (
                      <SignalDetail key={idx} signal={signal} />
                    ))}
                  </div>
                </section>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                {state === 'pending' && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onApprove();
                      }}
                      className="px-5 py-3 text-sm font-semibold transition-all duration-200"
                      style={{
                        borderRadius: '6px',
                        background: '#111111',
                        color: '#FFFFFF',
                      }}
                    >
                      Approve Decision
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onHold();
                      }}
                      className="border px-5 py-3 text-sm font-semibold transition-all duration-200"
                      style={{
                        borderRadius: '6px',
                        background: 'rgba(201,162,39,0.08)',
                        color: '#8F6A00',
                        borderColor: 'rgba(201,162,39,0.26)',
                      }}
                    >
                      Hold for Review
                    </button>
                  </>
                )}

                <ActionButton
                  icon={Clock}
                  label="Adjust Timing"
                  onClick={(e) => e.stopPropagation()}
                />
                <ActionButton
                  icon={DollarSign}
                  label="Shift Budget"
                  onClick={(e) => e.stopPropagation()}
                />
                <ActionButton
                  icon={Users}
                  label="Assign to Team"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function PlatformChip({ signal }: { signal: Signal }) {
  return (
    <div
      className="rounded-full border px-3 py-1.5 text-xs font-semibold transition-all duration-200"
      style={{
        borderColor: '#E7E1D2',
        background: 'rgba(17,17,17,0.02)',
        color: '#4B5563',
      }}
      title={signal.label}
    >
      {signal.platform}
    </div>
  );
}

function SignalDetail({ signal }: { signal: Signal }) {
  const statusStyles: Record<
    string,
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
    Clear: {
      bg: 'rgba(17,17,17,0.04)',
      border: '#E1D8C6',
      text: '#5F6672',
    },
    Warning: {
      bg: 'rgba(17,17,17,0.05)',
      border: '#D8CCB7',
      text: '#7A5B12',
    },
    Alert: {
      bg: 'rgba(17,17,17,0.06)',
      border: '#D0C3AA',
      text: '#6A4E0A',
    },
    Caution: {
      bg: 'rgba(17,17,17,0.05)',
      border: '#D8CCB7',
      text: '#7A5B12',
    },
    Declining: {
      bg: 'rgba(17,17,17,0.05)',
      border: '#D8CCB7',
      text: '#7A5B12',
    },
  };

  const status = statusStyles[signal.status] ?? {
    bg: 'rgba(17,17,17,0.04)',
    border: '#E1D8C6',
    text: '#5F6672',
  };

  return (
    <div
      className="border p-4 transition-all duration-200"
      style={{
        borderRadius: '6px',
        background: 'rgba(255,255,255,0.92)',
        borderColor: '#E7E1D2',
      }}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div
            className="text-[14px] font-semibold"
            style={{ color: '#111111' }}
          >
            {signal.label}
          </div>
          <div
            className="mt-1 text-[12px] leading-[1.6]"
            style={{ color: '#6B7280' }}
          >
            {signal.note}
          </div>
        </div>

        <div
          className="shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em]"
          style={{
            background: status.bg,
            borderColor: status.border,
            color: status.text,
          }}
        >
          {signal.status}
        </div>
      </div>
    </div>
  );
}

function ActionButton({
  icon: Icon,
  label,
  onClick,
}: {
  icon: typeof Clock;
  label: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-2 border px-5 py-3 text-sm font-semibold transition-all duration-200"
      style={{
        borderRadius: '6px',
        background: '#FFFFFF',
        borderColor: '#E7E1D2',
        color: '#4B5563',
      }}
    >
      <Icon className="h-4 w-4" style={{ color: '#C9A227' }} />
      {label}
    </button>
  );
}