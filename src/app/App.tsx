import { useState } from 'react';
import { TopNavigation } from './components/TopNavigation';
import { LeftNavigation } from './components/LeftNavigation';
import { MainWorkspace } from './components/MainWorkspace';
import { AIConsole } from './components/AIConsole';
import MarketingOrchestrationMap from './Pages/MarketingOrchestrationMap';

type AppView = 'map' | 'workspace';
type ThemeMode = 'light' | 'dark';
type DecisionState = 'pending' | 'approved' | 'hold';

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>('map');
  const [themeMode, setThemeMode] = useState<ThemeMode>('light');
  const [aiConsoleOpen, setAiConsoleOpen] = useState<boolean>(true);
  const [selectedDecision, setSelectedDecision] = useState<string | null>(null);

  const [decisionStates, setDecisionStates] = useState<
    Record<string, DecisionState>
  >({
    decision1: 'pending',
    decision2: 'pending',
    decision3: 'pending',
  });

  const handleApprove = (decisionId: string) => {
    setDecisionStates((prev) => ({
      ...prev,
      [decisionId]: 'approved',
    }));
  };

  const handleHold = (decisionId: string) => {
    setDecisionStates((prev) => ({
      ...prev,
      [decisionId]: 'hold',
    }));
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
            />
          </>
        )}
      </div>
    </div>
  );
}