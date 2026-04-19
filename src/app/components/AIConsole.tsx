import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  TrendingUp,
  AlertCircle,
  Users,
  MessageSquare,
  Send,
  CircleAlert,
  CheckCircle2,
} from 'lucide-react';
import { useMemo, useState, type ComponentType, type CSSProperties, type ReactNode } from 'react';

interface AIConsoleProps {
  isOpen: boolean;
  onToggle: () => void;
  selectedDecision: string | null;
}

type ConsoleContext = {
  title: string;
  recommendedNextAction: string;
  whyRecommended: string;
  whatChanged: string[];
  riskIfNoAction: string;
  stakeholders: {
    name: string;
    role: string;
  }[];
  confidence: number;
};

const workspaceContext: ConsoleContext = {
  title: 'Workspace Recommendation',
  recommendedNextAction: 'Prioritize the highest-value decision and validate signals before action.',
  whyRecommended:
    'The workspace is designed to bring market, creator, media, demand, and promotion signals together so teams can act with stronger alignment and confidence.',
  whatChanged: [
    'Creator-led momentum is showing strong cross-platform alignment',
    'Market visibility and audience signals are moving together',
    'Promotion and inventory guardrails remain important to review',
    'Media activation appears ready for coordinated follow-up',
  ],
  riskIfNoAction:
    'If the team does not act, the opportunity window may narrow, and stakeholders may lose time aligning across platforms.',
  stakeholders: [
    { name: 'Sophie Marchand', role: 'Brand Manager, Lancôme' },
    { name: 'Thomas Laurent', role: 'Media Lead, EMEA' },
    { name: 'Emma Chen', role: 'Creator Partnerships' },
    { name: 'Marc Dubois', role: 'Demand Planning' },
  ],
  confidence: 86,
};

const decisionContexts: Record<string, ConsoleContext> = {
  decision1: {
    title: 'Creator-Led Growth Decision',
    recommendedNextAction:
      'Increase support for creator-led conversion clusters while the momentum window is still active.',
    whyRecommended:
      'Creator-led momentum for Génifique shows strong alignment across media, creator performance, demand stability, and low promotion risk.',
    whatChanged: [
      'Share-of-voice increased across priority conversations',
      'Top creators exceeded performance benchmarks',
      'Paid amplification audiences are ready',
      'Inventory levels remain stable in key markets',
    ],
    riskIfNoAction:
      'The opportunity window may close within 48 hours, reducing potential revenue lift and allowing competitors to capture momentum.',
    stakeholders: [
      { name: 'Sophie Marchand', role: 'Brand Manager, Lancôme' },
      { name: 'Thomas Laurent', role: 'Media Lead, EMEA' },
      { name: 'Emma Chen', role: 'Creator Partnerships' },
      { name: 'Marc Dubois', role: 'Demand Planning' },
    ],
    confidence: 86,
  },
  decision2: {
    title: 'Margin Protection Decision',
    recommendedNextAction:
      'Hold discounting in DACH and shift toward creator-led education while margin and inventory signals are reviewed.',
    whyRecommended:
      'Competitive pressure is present, but margin and inventory guardrails suggest that promotional action should be delayed.',
    whatChanged: [
      'Competitor pressure increased in DACH',
      'Inventory confidence is below preferred threshold',
      'Margin exposure remains elevated',
      'Education-led support is the safer near-term path',
    ],
    riskIfNoAction:
      'A rushed promotion could create unnecessary margin pressure and weaken brand-safe execution.',
    stakeholders: [
      { name: 'Claire Bernard', role: 'Promotion Strategy' },
      { name: 'Jonas Weber', role: 'DACH Market Lead' },
      { name: 'Nina Rossi', role: 'Finance Partner' },
      { name: 'Marc Dubois', role: 'Demand Planning' },
    ],
    confidence: 78,
  },
  decision3: {
    title: 'Media Reallocation Decision',
    recommendedNextAction:
      'Shift budget from flattening paid media into creator-supported conversion paths.',
    whyRecommended:
      'Traditional paid performance is flattening while creator-assisted conversion signals are strengthening.',
    whatChanged: [
      'Paid performance is showing signs of efficiency decline',
      'Creator-assisted conversion is rising',
      'Media budget can be shifted without major activation risk',
      'Audience clusters are ready for targeted amplification',
    ],
    riskIfNoAction:
      'Continuing the current budget mix may reduce efficiency and slow conversion momentum.',
    stakeholders: [
      { name: 'Thomas Laurent', role: 'Media Lead, EMEA' },
      { name: 'Emma Chen', role: 'Creator Partnerships' },
      { name: 'Priya Shah', role: 'Performance Marketing' },
      { name: 'Sophie Marchand', role: 'Brand Manager, Lancôme' },
    ],
    confidence: 82,
  },
};

export function AIConsole({
  isOpen,
  onToggle,
  selectedDecision,
}: AIConsoleProps) {
  const [message, setMessage] = useState('');

  const context = useMemo(() => {
    if (!selectedDecision) return workspaceContext;
    return decisionContexts[selectedDecision] ?? workspaceContext;
  }, [selectedDecision]);

  const placeholder = useMemo(() => {
    if (selectedDecision) return 'Ask about this decision...';
    return 'Ask about this workspace...';
  }, [selectedDecision]);

  if (!isOpen) {
    return (
      <button
        type="button"
        onClick={onToggle}
        className="fixed right-0 top-16 z-40 flex h-10 items-center justify-center border-l border-t border-b transition-all duration-200 hover:-translate-x-[1px]"
        style={{
          width: '40px',
          borderRadius: '6px 0 0 6px',
          background: '#111111',
          borderColor: '#C9A227',
          color: '#FFFFFF',
          boxShadow: '0 10px 24px rgba(17,17,17,0.18)',
        }}
        aria-label="Open AI Recommendation Layer"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
    );
  }

  return (
    <aside
      className="fixed right-0 top-16 bottom-0 z-40 overflow-y-auto border-l"
      style={{
        width: '16rem',
        background: '#FFFFFF',
        borderColor: '#E7E1D2',
        boxShadow: '-10px 0 30px rgba(17,17,17,0.06)',
      }}
    >
      <div
        className="sticky top-0 z-10 border-b"
        style={{
          background: 'rgba(255,255,255,0.98)',
          backdropFilter: 'blur(10px)',
          borderColor: '#E7E1D2',
        }}
      >
        <div className="flex items-start justify-between gap-2 px-3 py-3">
          <div className="min-w-0 flex-1">
            <div className="flex items-start gap-2">
              <Sparkles
                className="mt-[2px] h-4 w-4 shrink-0"
                style={{ color: '#C9A227' }}
              />
              <div>
                <h3
                  className="text-[13px] font-semibold leading-[1.25]"
                  style={{ color: '#111111' }}
                >
                  AI Recommendation Layer
                </h3>
                <p
                  className="mt-1 text-[11px] leading-[1.35]"
                  style={{ color: '#6B7280' }}
                >
                  {context.title}
                </p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onToggle}
            className="flex h-8 w-8 shrink-0 items-center justify-center border transition-all duration-200 hover:bg-black/[0.03]"
            style={{
              borderRadius: '6px',
              borderColor: '#E7E1D2',
              color: '#6B7280',
            }}
            aria-label="Collapse AI Recommendation Layer"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="space-y-5 px-3 py-4">
        <Section
          icon={Sparkles}
          title="Recommended Next Action"
          content={context.recommendedNextAction}
          highlight
        />

        <Section
          icon={TrendingUp}
          title="Why this action is recommended"
          content={context.whyRecommended}
        />

        <Section
          icon={AlertCircle}
          title="What changed"
          content={
            <ul className="space-y-2">
              {context.whatChanged.map((item) => (
                <BulletItem key={item} text={item} />
              ))}
            </ul>
          }
        />

        <Section
          icon={CircleAlert}
          title="Risk if no action is taken"
          content={context.riskIfNoAction}
          warning
        />

        <Section
          icon={Users}
          title="Suggested stakeholders"
          content={
            <div className="space-y-2">
              {context.stakeholders.map((stakeholder) => (
                <Stakeholder
                  key={stakeholder.name}
                  name={stakeholder.name}
                  role={stakeholder.role}
                />
              ))}
            </div>
          }
        />

        <div
          className="border-t pt-4"
          style={{ borderColor: '#E7E1D2' }}
        >
          <div
            className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em]"
            style={{ color: '#6B7280' }}
          >
            <CheckCircle2 className="h-4 w-4" style={{ color: '#C9A227' }} />
            Confidence Score
          </div>

          <div className="flex items-center gap-3">
            <div
              className="h-2 flex-1 overflow-hidden"
              style={{
                borderRadius: '6px',
                background: 'rgba(17,17,17,0.08)',
              }}
            >
              <div
                className="h-full"
                style={{
                  width: `${context.confidence}%`,
                  borderRadius: '6px',
                  background:
                    'linear-gradient(90deg, rgba(201,162,39,0.85) 0%, #C9A227 100%)',
                }}
              />
            </div>

            <div
              className="text-[18px] font-semibold"
              style={{ color: '#B88A12' }}
            >
              {context.confidence}%
            </div>
          </div>
        </div>
      </div>

      <div
        className="sticky bottom-0 border-t px-3 py-3"
        style={{
          background: 'rgba(255,255,255,0.98)',
          backdropFilter: 'blur(10px)',
          borderColor: '#E7E1D2',
        }}
      >
        <div className="mb-2 flex items-center gap-2">
          <MessageSquare className="h-4 w-4" style={{ color: '#C9A227' }} />
          <div
            className="text-[11px] font-semibold uppercase tracking-[0.16em]"
            style={{ color: '#6B7280' }}
          >
            Ask AI Assistant
          </div>
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={placeholder}
            className="min-w-0 flex-1 border px-3 py-2 text-[13px] focus:outline-none"
            style={{
              borderRadius: '6px',
              borderColor: '#E7E1D2',
              background: '#FFFFFF',
              color: '#111111',
            }}
          />

          <button
            type="button"
            className="flex h-[38px] w-[38px] items-center justify-center transition-all duration-200 hover:opacity-90"
            style={{
              borderRadius: '6px',
              background: '#111111',
              color: '#FFFFFF',
            }}
            aria-label="Send message"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}

function Section({
  icon: Icon,
  title,
  content,
  warning = false,
  highlight = false,
}: {
  icon: ComponentType<{ className?: string; style?: CSSProperties }>;
  title: string;
  content: ReactNode;
  warning?: boolean;
  highlight?: boolean;
}) {
  return (
    <section>
      <div className="mb-3 flex items-center gap-2">
        <Icon
          className="h-4 w-4"
          style={{ color: warning ? '#111111' : '#C9A227' }}
        />
        <div
          className="text-[11px] font-semibold uppercase tracking-[0.16em] leading-[1.35]"
          style={{ color: '#6B7280' }}
        >
          {title}
        </div>
      </div>

      <div
        className={`${warning || highlight ? 'border px-3 py-3' : ''} text-[13px] leading-[1.7]`}
        style={
          warning
            ? {
                borderRadius: '6px',
                borderColor: '#D8CCB7',
                background: 'rgba(17,17,17,0.03)',
                color: '#2F3742',
              }
            : highlight
              ? {
                  borderRadius: '6px',
                  borderColor: 'rgba(201,162,39,0.28)',
                  background: 'rgba(201,162,39,0.08)',
                  color: '#2F3742',
                }
              : {
                  color: '#4B5563',
                }
        }
      >
        {content}
      </div>
    </section>
  );
}

function BulletItem({ text }: { text: string }) {
  return (
    <li
      className="flex items-start gap-2 text-[13px]"
      style={{ color: '#4B5563' }}
    >
      <div
        className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full"
        style={{ background: '#C9A227' }}
      />
      <span>{text}</span>
    </li>
  );
}

function Stakeholder({ name, role }: { name: string; role: string }) {
  return (
    <div
      className="flex items-center gap-3 border p-3 transition-all duration-200 hover:bg-black/[0.02]"
      style={{
        borderRadius: '6px',
        borderColor: '#E7E1D2',
        background: '#FAF8F3',
      }}
    >
      <div
        className="flex h-9 w-9 items-center justify-center rounded-full text-[12px] font-semibold"
        style={{
          background: 'linear-gradient(180deg, #D4AF37 0%, #B88A12 100%)',
          color: '#FFFFFF',
        }}
      >
        {name
          .split(' ')
          .map((n) => n[0])
          .join('')}
      </div>

      <div className="min-w-0">
        <div
          className="truncate text-[13px] font-semibold"
          style={{ color: '#111111' }}
        >
          {name}
        </div>
        <div
          className="truncate text-[11px]"
          style={{ color: '#6B7280' }}
        >
          {role}
        </div>
      </div>
    </div>
  );
}