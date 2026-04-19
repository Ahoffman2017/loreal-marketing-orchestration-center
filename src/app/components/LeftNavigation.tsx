import { GitBranch, Target } from 'lucide-react';

type AppView = 'map' | 'workspace';

interface LeftNavigationProps {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
}

export function LeftNavigation({
  currentView,
  onNavigate,
}: LeftNavigationProps) {
  const menuItems = [
    {
      id: 'map' as AppView,
      label: 'Marketing Orchestration Map',
      icon: GitBranch,
    },
    {
      id: 'workspace' as AppView,
      label: 'Shared Decision Workspace',
      icon: Target,
    },
  ];

  return (
    <aside
      className="fixed left-0 top-16 bottom-0 z-30 overflow-y-auto border-r"
      style={{
        width: '16rem',
        background: '#FAF8F3',
        borderColor: '#E7E1D2',
      }}
    >
      <div className="p-4">
        <div
          className="mb-3 text-[11px] font-semibold uppercase tracking-[0.16em]"
          style={{ color: '#6B7280' }}
        >
          Navigation
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onNavigate(item.id)}
                className="w-full text-left transition-all duration-200 hover:-translate-y-[1px]"
                style={{
                  borderRadius: '6px',
                  background: isActive
                    ? 'rgba(201,162,39,0.10)'
                    : 'transparent',
                  color: isActive ? '#111111' : '#374151',
                  border: isActive
                    ? '1px solid rgba(201,162,39,0.22)'
                    : '1px solid transparent',
                  boxShadow: isActive ? '0 2px 8px rgba(17,17,17,0.04)' : 'none',
                }}
              >
                <div className="flex items-start gap-3 px-3 py-3">
                  <Icon
                    className="mt-0.5 h-4 w-4 shrink-0"
                    style={{
                      color: isActive ? '#C9A227' : '#6B7280',
                    }}
                  />

                  <span className="text-[14px] font-medium leading-[1.55]">
                    {item.label}
                  </span>
                </div>
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}