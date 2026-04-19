import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  TrendingUp,
  AlertCircle,
  Users,
  MessageSquare,
  Send,
  Bot,
} from 'lucide-react';
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from 'react';
import type {
  DecisionContext,
  WorkspaceSnapshot,
} from '../App';

interface AIConsoleProps {
  isOpen: boolean;
  onToggle: () => void;
  selectedDecision: string | null;
  selectedDecisionData: DecisionContext | null;
  selectedDecisionState: 'pending' | 'approved' | 'hold' | null;
  workspaceSnapshot: WorkspaceSnapshot;
}

type ChatMessage = {
  id: string;
  role: 'assistant' | 'user';
  text: string;
};

export function AIConsole({
  isOpen,
  onToggle,
  selectedDecision,
  selectedDecisionData,
  selectedDecisionState,
  workspaceSnapshot,
}: AIConsoleProps) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      text: 'I’m ready. Ask me why a decision is recommended, what changed, what the key risks are, who to notify, or what to do next.',
    },
  ]);

  const chatRef = useRef<HTMLDivElement | null>(null);

  const placeholder = useMemo(() => {
    if (selectedDecision) return 'Ask about this decision...';
    return 'Ask about this workspace...';
  }, [selectedDecision]);

  useEffect(() => {
    if (!chatRef.current) return;
    chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages]);

  useEffect(() => {
    if (!selectedDecisionData) return;
    setMessages((prev) => {
      const contextNote = `Context updated: ${selectedDecisionData.title}`;
      const lastMessage = prev[prev.length - 1];
      if (lastMessage?.text === contextNote) return prev;
      return [
        ...prev,
        {
          id: `context-${selectedDecisionData.id}-${Date.now()}`,
          role: 'assistant',
          text: contextNote,
        },
      ];
    });
  }, [selectedDecisionData]);

  const quickPrompts = selectedDecisionData
    ? [
        'Why is this recommended?',
        'Which platform is driving this?',
        'Should I approve or hold this?',
      ]
    : [
        'What is the biggest risk here?',
        'What changed in the last 24 hours?',
        'What should I do next?',
      ];

  const staticWhyText = selectedDecisionData
    ? `This recommendation is being driven primarily by ${selectedDecisionData.primaryPlatform}. ${selectedDecisionData.summary}`
    : `${workspaceSnapshot.recommendedNextAction}. Biggest opportunity: ${workspaceSnapshot.biggestOpportunity}. Biggest risk: ${workspaceSnapshot.biggestRisk}.`;

  const staticChangeText = selectedDecisionData
    ? selectedDecisionData.signals
        .slice(0, 4)
        .map((signal) => signal.note)
    : workspaceSnapshot.recentChanges;

  const staticRiskText = selectedDecisionData
    ? buildRiskResponse(selectedDecisionData, selectedDecisionState)
    : `The biggest workspace-level risk is ${workspaceSnapshot.biggestRisk}. Response window: ${workspaceSnapshot.responseWindow}.`;

  const stakeholderList = selectedDecisionData
    ? buildStakeholdersForDecision(selectedDecisionData)
    : workspaceSnapshot.stakeholders;

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const trimmed = message.trim();
    if (!trimmed) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      text: trimmed,
    };

    const assistantMessage: ChatMessage = {
      id: `assistant-${Date.now() + 1}`,
      role: 'assistant',
      text: generateAgentResponse({
        prompt: trimmed,
        selectedDecisionData,
        selectedDecisionState,
        workspaceSnapshot,
      }),
    };

    setMessages((prev) => [...prev, userMessage, assistantMessage]);
    setMessage('');
  };

  const runQuickPrompt = (prompt: string) => {
    const assistantMessage: ChatMessage = {
      id: `assistant-${Date.now()}`,
      role: 'assistant',
      text: generateAgentResponse({
        prompt,
        selectedDecisionData,
        selectedDecisionState,
        workspaceSnapshot,
      }),
    };

    setMessages((prev) => [
      ...prev,
      { id: `user-${Date.now() - 1}`, role: 'user', text: prompt },
      assistantMessage,
    ]);
  };

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
              <h3
                className="text-[13px] font-semibold leading-[1.25]"
                style={{ color: '#111111' }}
              >
                AI Recommendation Layer
              </h3>
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
          icon={TrendingUp}
          title="Why this action is recommended"
          content={staticWhyText}
        />

        <Section
          icon={AlertCircle}
          title="What changed in the last 24 hours"
          content={
            <ul className="space-y-2">
              {staticChangeText.map((item) => (
                <BulletItem key={item} text={item} />
              ))}
            </ul>
          }
        />

        <Section
          icon={AlertCircle}
          title="What could happen if no action is taken"
          content={staticRiskText}
          warning
        />

        <Section
          icon={Users}
          title="Suggested stakeholders to notify"
          content={
            <div className="space-y-2">
              {stakeholderList.map((stakeholder) => {
                const [name, role] = stakeholder.split(' — ');
                return (
                  <Stakeholder
                    key={stakeholder}
                    name={name}
                    role={role ?? 'Relevant stakeholder'}
                  />
                );
              })}
            </div>
          }
        />

        <div
          className="border-t pt-4"
          style={{ borderColor: '#E7E1D2' }}
        >
          <div
            className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em]"
            style={{ color: '#6B7280' }}
          >
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
                  width: workspaceSnapshot.decisionConfidence,
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
              {workspaceSnapshot.decisionConfidence}
            </div>
          </div>
        </div>

        <div
          className="border-t pt-4"
          style={{ borderColor: '#E7E1D2' }}
        >
          <div
            className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em]"
            style={{ color: '#6B7280' }}
          >
            <Bot className="h-4 w-4" style={{ color: '#C9A227' }} />
            Live AI Response
          </div>

          <div
            ref={chatRef}
            className="max-h-[240px] space-y-2 overflow-y-auto pr-1"
          >
            {messages.map((item) => (
              <div
                key={item.id}
                className="border px-3 py-2 text-[12px] leading-[1.6]"
                style={{
                  borderRadius: '6px',
                  borderColor: item.role === 'assistant' ? '#E7E1D2' : 'rgba(201,162,39,0.22)',
                  background:
                    item.role === 'assistant'
                      ? '#FAF8F3'
                      : 'rgba(201,162,39,0.08)',
                  color: '#2F3742',
                }}
              >
                <div
                  className="mb-1 text-[10px] font-semibold uppercase tracking-[0.14em]"
                  style={{ color: '#6B7280' }}
                >
                  {item.role === 'assistant' ? 'AI Agent' : 'You'}
                </div>
                {item.text}
              </div>
            ))}
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {quickPrompts.map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => runQuickPrompt(prompt)}
                className="border px-2.5 py-1.5 text-[11px] font-medium transition-all duration-200 hover:bg-black/[0.02]"
                style={{
                  borderRadius: '6px',
                  borderColor: '#E7E1D2',
                  background: '#FFFFFF',
                  color: '#4B5563',
                }}
              >
                {prompt}
              </button>
            ))}
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

        <form onSubmit={handleSubmit} className="flex gap-2">
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
            type="submit"
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
        </form>
      </div>
    </aside>
  );
}

function generateAgentResponse({
  prompt,
  selectedDecisionData,
  selectedDecisionState,
  workspaceSnapshot,
}: {
  prompt: string;
  selectedDecisionData: DecisionContext | null;
  selectedDecisionState: 'pending' | 'approved' | 'hold' | null;
  workspaceSnapshot: WorkspaceSnapshot;
}) {
  const input = prompt.toLowerCase();

  if (
    input.includes('why') ||
    input.includes('recommend') ||
    input.includes('platform driving') ||
    input.includes('driving this')
  ) {
    if (selectedDecisionData) {
      const strongestSignals = selectedDecisionData.signals
        .slice(0, 2)
        .map((signal) => `${signal.label}: ${signal.note}`)
        .join(' ');
      return `Decision Explainer Agent: ${selectedDecisionData.title} is recommended because ${selectedDecisionData.primaryPlatform} is the primary driver and the supporting signals are aligned. ${strongestSignals} Recommendation: ${selectedDecisionData.recommendation}`;
    }

    return `Decision Explainer Agent: The current workspace recommendation is ${workspaceSnapshot.recommendedNextAction}. It is supported by the biggest opportunity, ${workspaceSnapshot.biggestOpportunity}, while still accounting for the biggest risk, ${workspaceSnapshot.biggestRisk}.`;
  }

  if (
    input.includes('changed') ||
    input.includes('24 hours') ||
    input.includes('recent')
  ) {
    const changes = selectedDecisionData
      ? selectedDecisionData.signals.map((signal) => signal.note).join(' ')
      : workspaceSnapshot.recentChanges.join(' ');
    return `Signal Analyst Agent: Here is the latest shift in context. ${changes}`;
  }

  if (
    input.includes('risk') ||
    input.includes('guardrail') ||
    input.includes('delay') ||
    input.includes('do nothing') ||
    input.includes('hold')
  ) {
    if (selectedDecisionData) {
      return buildRiskResponse(selectedDecisionData, selectedDecisionState);
    }

    return `Guardrail Agent: The biggest workspace-level risk is ${workspaceSnapshot.biggestRisk}. Response window is ${workspaceSnapshot.responseWindow}, so waiting too long could reduce decision confidence and delay the next action.`;
  }

  if (
    input.includes('notify') ||
    input.includes('stakeholder') ||
    input.includes('who should')
  ) {
    const stakeholders = selectedDecisionData
      ? buildStakeholdersForDecision(selectedDecisionData)
      : workspaceSnapshot.stakeholders;

    return `Stakeholder Agent: The best people to involve now are ${stakeholders.join(
      '; '
    )}.`;
  }

  if (
    input.includes('approve') ||
    input.includes('what next') ||
    input.includes('next step') ||
    input.includes('next action') ||
    input.includes('budget') ||
    input.includes('timing') ||
    input.includes('assign')
  ) {
    if (selectedDecisionData) {
      return buildActionResponse(
        selectedDecisionData,
        selectedDecisionState,
        workspaceSnapshot
      );
    }

    return `Action Planner Agent: The next best move is ${workspaceSnapshot.recommendedNextAction}. Keep focus on the ${workspaceSnapshot.responseWindow.toLowerCase()} window and align the key stakeholders before execution.`;
  }

  if (selectedDecisionData) {
    return `Agent Router: For ${selectedDecisionData.title}, I can explain why it is recommended, summarize the supporting signals, identify the key risk, recommend who to notify, or suggest the next action.`;
  }

  return `Agent Router: I can explain the current recommendation, summarize recent changes, identify the biggest risk, recommend stakeholders to notify, or suggest the next action for the workspace.`;
}

function buildRiskResponse(
  decision: DecisionContext,
  state: 'pending' | 'approved' | 'hold' | null
) {
  const riskSignals = decision.signals
    .filter((signal) =>
      ['Warning', 'Alert', 'Caution', 'Declining'].includes(signal.status)
    )
    .map((signal) => `${signal.label}: ${signal.note}`);

  const riskText =
    riskSignals.length > 0
      ? riskSignals.join(' ')
      : `Current risk level is ${decision.risk}.`;

  return `Guardrail Agent: ${decision.title} currently carries ${decision.risk.toLowerCase()} risk. ${riskText} Current state is ${
    state ?? 'pending'
  }. If no action is taken, the likely outcome is weaker execution confidence and a missed response window.`;
}

function buildActionResponse(
  decision: DecisionContext,
  state: 'pending' | 'approved' | 'hold' | null,
  workspaceSnapshot: WorkspaceSnapshot
) {
  if (state === 'approved') {
    return `Action Planner Agent: This decision is already approved. The next step is execution through ${decision.primaryPlatform} and stakeholder coordination inside the ${workspaceSnapshot.responseWindow.toLowerCase()} window.`;
  }

  if (state === 'hold') {
    return `Action Planner Agent: This decision is currently on hold. The best next step is to resolve the main risk signal first, then re-evaluate whether the recommendation should move back to approval.`;
  }

  if (decision.risk === 'Medium' || decision.risk === 'High') {
    return `Action Planner Agent: I recommend a controlled hold with stakeholder review before approval. Start with ${decision.primaryPlatform}, confirm the main risk signals, and only then move to execution.`;
  }

  return `Action Planner Agent: I recommend approval. The signals are aligned, the primary driver is ${decision.primaryPlatform}, and the recommended action is ${decision.recommendation}`;
}

function buildStakeholdersForDecision(decision: DecisionContext) {
  if (decision.id === 'decision1') {
    return [
      'Sophie Marchand — Brand Manager, Lancôme',
      'Emma Chen — Creator Partnerships',
      'Thomas Laurent — Media Lead, EMEA',
    ];
  }

  if (decision.id === 'decision2') {
    return [
      'Marc Dubois — Demand Planning',
      'Sophie Marchand — Brand Manager, Lancôme',
      'Thomas Laurent — Media Lead, EMEA',
    ];
  }

  return [
    'Thomas Laurent — Media Lead, EMEA',
    'Emma Chen — Creator Partnerships',
    'Sophie Marchand — Brand Manager, Lancôme',
  ];
}

function Section({
  icon: Icon,
  title,
  content,
  warning = false,
}: {
  icon: typeof TrendingUp;
  title: string;
  content: ReactNode;
  warning?: boolean;
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
        className={`${warning ? 'border px-3 py-3' : ''} text-[13px] leading-[1.7]`}
        style={
          warning
            ? {
                borderRadius: '6px',
                borderColor: '#D8CCB7',
                background: 'rgba(17,17,17,0.03)',
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