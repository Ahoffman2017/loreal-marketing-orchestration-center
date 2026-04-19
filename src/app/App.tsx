import { useMemo, useState } from 'react';
import { TopNavigation } from './components/TopNavigation';
import { LeftNavigation } from './components/LeftNavigation';
import { MainWorkspace } from './components/MainWorkspace';
import { AIConsole } from './components/AIConsole';
import MarketingOrchestrationMap from './pages/MarketingOrchestrationMap';

type AppView = 'map' | 'workspace';
type ThemeMode = 'light' | 'dark';
type DecisionState = 'pending' | 'approved' | 'hold';

export type DecisionSignal = {
  platform: string;
  label: string;
  status: string;
  note: string;
};

export type DecisionContext = {
  id: string;
  title: string;
  summary: string;
  impact: string;
  impactValue: string;
  risk: 'Low' | 'Medium' | 'High';
  recommendation: string;
  primaryPlatform: string;
  primaryPlatformExplanation: string;
  signals: DecisionSignal[];
};

export type WorkspaceSnapshot = {
  biggestOpportunity: string;
  biggestRisk: string;
  recommendedNextAction: string;
  decisionConfidence: string;
  responseWindow: string;
  lastUpdated: string;
  recentChanges: string[];
  stakeholders: string[];
};

const decisionCatalog: Record<string, DecisionContext> = {
  decision1: {
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
    primaryPlatformExplanation:
      'This platform is the main source behind the recommendation.',
    signals: [
      {
        platform: 'Integrated Media Intelligence',
        label: 'Integrated Media Intelligence',
        status: 'Strong',
        note: 'Share-of-voice increasing 24% WoW',
      },
      {
        platform: 'Creator ROI',
        label: 'Creator to Commerce ROI Engine',
        status: 'Strong',
        note: 'Top 3 creators outperforming by 3.2x',
      },
      {
        platform: 'Media',
        label: 'Media Influencer Platform',
        status: 'Ready',
        note: 'Paid amplification ready',
      },
      {
        platform: 'Demand',
        label: 'Trend-to-Plan Demand Sensing',
        status: 'Stable',
        note: 'Inventory stable in key markets',
      },
      {
        platform: 'Promotions',
        label: 'Brand-Safe Promotions Lab',
        status: 'Clear',
        note: 'No promotion required',
      },
    ],
  },
  decision2: {
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
    primaryPlatformExplanation:
      'This platform defines the key business constraint driving this action.',
    signals: [
      {
        platform: 'Integrated Media Intelligence',
        label: 'Integrated Media Intelligence',
        status: 'Warning',
        note: 'Competitor pressure in DACH',
      },
      {
        platform: 'Promotions',
        label: 'Brand-Safe Promotions Lab',
        status: 'Alert',
        note: 'Margin risk at current discount',
      },
      {
        platform: 'Demand',
        label: 'Trend-to-Plan Demand Sensing',
        status: 'Caution',
        note: 'Inventory below threshold',
      },
      {
        platform: 'Media',
        label: 'Media Influencer Platform',
        status: 'Caution',
        note: 'Paid pressure could spike demand',
      },
    ],
  },
  decision3: {
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
    primaryPlatformExplanation:
      'This platform is the main execution layer for this recommendation.',
    signals: [
      {
        platform: 'Integrated Media Intelligence',
        label: 'Integrated Media Intelligence',
        status: 'Declining',
        note: 'Paid performance flattening',
      },
      {
        platform: 'Creator ROI',
        label: 'Creator to Commerce ROI Engine',
        status: 'Strong',
        note: 'Creator conversion rising 34%',
      },
      {
        platform: 'Media',
        label: 'Media Influencer Platform',
        status: 'Ready',
        note: 'Budget shift available',
      },
    ],
  },
};

const workspaceSnapshot: WorkspaceSnapshot = {
  biggestOpportunity: 'Creator momentum is rising for Génifique',
  biggestRisk: 'Inventory confidence below safe threshold in FR and UK',
  recommendedNextAction: 'Shift support to creator-led conversion clusters',
  decisionConfidence: '86%',
  responseWindow: 'Next 48 hours',
  lastUpdated: '4 min ago',
  recentChanges: [
    'Share-of-voice increased 24% week over week.',
    'Top 3 creators exceeded benchmark performance.',
    'Paid amplification audiences are ready for activation.',
    'Inventory remains under watch in selected markets.',
  ],
  stakeholders: [
    'Sophie Marchand — Brand Manager, Lancôme',
    'Thomas Laurent — Media Lead, EMEA',
    'Emma Chen — Creator Partnerships',
    'Marc Dubois — Demand Planning',
  ],
};

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>('map');
  const [themeMode, setThemeMode] = useState<ThemeMode>('light');
  const [aiConsoleOpen, setAiConsoleOpen] = useState(true);
  const [selectedDecision, setSelectedDecision] = useState<string | null>(null);
  const [decisionStates, setDecisionStates] = useState<
    Record<string, DecisionState>
  >({
    decision1: 'pending',
    decision2: 'pending',
    decision3: 'pending',
  });

  const handleApprove = (decisionId: string) => {
    setDecisionStates((prev) => ({ ...prev, [decisionId]: 'approved' }));
  };

  const handleHold = (decisionId: string) => {
    setDecisionStates((prev) => ({ ...prev, [decisionId]: 'hold' }));
  };

  const handleNavigate = (view: AppView) => {
    setCurrentView(view);

    if (view === 'map') {
      setSelectedDecision(null);
      setAiConsoleOpen(false);
    }

    if (view === 'workspace') {
      setAiConsoleOpen(true);
    }
  };

  const handleOpenWorkspaceFromMap = () => {
    setCurrentView('workspace');
    setAiConsoleOpen(true);
  };

  const toggleTheme = () => {
    setThemeMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const isDark = themeMode === 'dark';
  const showAIConsole = currentView === 'workspace' && aiConsoleOpen;

  const selectedDecisionData = useMemo(() => {
    if (!selectedDecision) return null;
    return decisionCatalog[selectedDecision] ?? null;
  }, [selectedDecision]);

  const selectedDecisionState = selectedDecision
    ? decisionStates[selectedDecision]
    : null;

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDark ? 'bg-[#0B0B0C] text-[#F5F3EE]' : 'bg-[#FAF8F3] text-[#111111]'
      }`}
      style={{ fontFamily: 'Roboto, sans-serif' }}
      data-theme={themeMode}
    >
      <TopNavigation
        currentView={currentView}
        themeMode={themeMode}
        onToggleTheme={toggleTheme}
      />

      <div className="flex min-h-[calc(100vh-4rem)] pt-16">
        <LeftNavigation currentView={currentView} onNavigate={handleNavigate} />

        {currentView === 'map' ? (
          <MarketingOrchestrationMap
            themeMode={themeMode}
            onOpenWorkspace={handleOpenWorkspaceFromMap}
          />
        ) : (
          <>
            <MainWorkspace
              aiConsoleOpen={showAIConsole}
              selectedDecision={selectedDecision}
              setSelectedDecision={setSelectedDecision}
              decisionStates={decisionStates}
              onApprove={handleApprove}
              onHold={handleHold}
            />

            <AIConsole
              isOpen={showAIConsole}
              onToggle={() => setAiConsoleOpen((prev) => !prev)}
              selectedDecision={selectedDecision}
              selectedDecisionData={selectedDecisionData}
              selectedDecisionState={selectedDecisionState}
              workspaceSnapshot={workspaceSnapshot}
            />
          </>
        )}
      </div>
    </div>
  );
}