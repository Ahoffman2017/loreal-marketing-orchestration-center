import { WorkspaceHeader } from './WorkspaceHeader';
import { ExecutiveSummary } from './ExecutiveSummary';
import { DecisionCards } from './DecisionCards';
import { SignalAlignment } from './SignalAlignment';
import { RisksGuardrails } from './RisksGuardrails';

interface MainWorkspaceProps {
  aiConsoleOpen: boolean;
  selectedDecision: string | null;
  setSelectedDecision: (id: string | null) => void;
  decisionStates: Record<string, 'pending' | 'approved' | 'hold'>;
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
      className="min-h-[calc(100vh-64px)] transition-all duration-300"
      style={{
        background: '#F7F3EA',
        paddingTop: '24px',
        paddingLeft: 'calc(16rem + 24px)',
        paddingRight: aiConsoleOpen ? 'calc(16rem + 24px)' : '24px',
      }}
    >
      <div className="mx-auto w-full max-w-[1360px] pb-10">
        <WorkspaceHeader />

        <div className="mt-6">
          <ExecutiveSummary />
        </div>

        <div className="mt-6">
          <DecisionCards
            selectedDecision={selectedDecision}
            setSelectedDecision={setSelectedDecision}
            decisionStates={decisionStates}
            onApprove={onApprove}
            onHold={onHold}
          />
        </div>

        <div className="mt-6">
          <SignalAlignment />
        </div>

        <div className="mt-6">
          <RisksGuardrails />
        </div>
      </div>
    </main>
  );
}