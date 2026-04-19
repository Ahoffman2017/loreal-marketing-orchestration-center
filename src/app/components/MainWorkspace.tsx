import { WorkspaceHeader } from './WorkspaceHeader';
import { ExecutiveSummary } from './ExecutiveSummary';
import { DecisionCards } from './DecisionCards';
import { SignalAlignment } from './SignalAlignment';
import { RisksGuardrails } from './RisksGuardrails';

type DecisionState = 'pending' | 'approved' | 'hold';

interface MainWorkspaceProps {
  aiConsoleOpen: boolean;
  selectedDecision: string | null;
  setSelectedDecision: (id: string | null) => void;
  decisionStates: Record<string, DecisionState>;
  onApprove: (id: string) => void;
  onHold: (id: string) => void;
}

export function MainWorkspace({
  aiConsoleOpen,
  selectedDecision,
  setSelectedDecision,
  decisionStates,
  onApprove,
  onHold,
}: MainWorkspaceProps) {
  return (
    <main
      className="min-h-[calc(100vh-4rem)] flex-1 transition-all duration-300"
      style={{
        marginLeft: '16rem',
        marginRight: aiConsoleOpen ? '16rem' : '0rem',
        background:
          'linear-gradient(180deg, #FAF8F3 0%, #F4F1EA 48%, #FAF8F3 100%)',
      }}
    >
      <div className="mx-auto w-full max-w-[1180px] px-6 py-8">
        <WorkspaceHeader />

        <div className="mt-6">
          <ExecutiveSummary />
        </div>

        <div className="mt-8">
          <DecisionCards
            selectedDecision={selectedDecision}
            setSelectedDecision={setSelectedDecision}
            decisionStates={decisionStates}
            onApprove={onApprove}
            onHold={onHold}
          />
        </div>

        <div className="mt-8">
          <SignalAlignment />
        </div>

        <div className="mt-8">
          <RisksGuardrails />
        </div>
      </div>
    </main>
  );
}