import { Bell, ChevronDown, Menu, Moon, Search, Sun } from 'lucide-react';

type AppView = 'map' | 'workspace';
type ThemeMode = 'light' | 'dark';

interface TopNavigationProps {
  currentView: AppView;
  themeMode: ThemeMode;
  onToggleTheme: () => void;
}

export function TopNavigation({
  currentView,
  themeMode,
  onToggleTheme,
}: TopNavigationProps) {
  const isDark = themeMode === 'dark';
  const pageLabel =
    currentView === 'map'
      ? 'Marketing Orchestration Map'
      : 'Shared Decision Workspace';

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 h-16 border-b transition-colors duration-300"
      style={{
        background: 'var(--loreal-topnav-bg, #FAF8F3)',
        borderColor: 'var(--loreal-border, #E7E1D2)',
        color: 'var(--loreal-text, #111111)',
      }}
    >
      <div className="flex h-full items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="p-2 transition-colors"
            style={{ borderRadius: 6 }}
            aria-label="Open navigation"
          >
            <Menu
              className="h-5 w-5"
              style={{ color: 'var(--loreal-icon, #4B5563)' }}
            />
          </button>

          <div className="flex items-center gap-3">
            <div
              className="text-[18px] font-semibold tracking-tight"
              style={{ color: 'var(--loreal-brand, #111111)' }}
            >
              L&apos;Oréal
            </div>

            <div
              className="h-6 w-px"
              style={{ background: 'var(--loreal-divider, #D6D3CB)' }}
            />

            <div
              className="text-sm font-medium"
              style={{ color: 'var(--loreal-muted-strong, #4B5563)' }}
            >
              {pageLabel}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleTheme}
            className="p-2 transition-colors"
            style={{ borderRadius: 6 }}
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
          >
            {isDark ? (
              <Sun
                className="h-5 w-5"
                style={{ color: 'var(--loreal-gold, #C9A227)' }}
              />
            ) : (
              <Moon
                className="h-5 w-5"
                style={{ color: 'var(--loreal-icon, #4B5563)' }}
              />
            )}
          </button>

          <button
            type="button"
            className="p-2 transition-colors"
            style={{ borderRadius: 6 }}
            aria-label="Search"
          >
            <Search
              className="h-5 w-5"
              style={{ color: 'var(--loreal-icon, #4B5563)' }}
            />
          </button>

          <button
            type="button"
            className="relative p-2 transition-colors"
            style={{ borderRadius: 6 }}
            aria-label="Notifications"
          >
            <Bell
              className="h-5 w-5"
              style={{ color: 'var(--loreal-icon, #4B5563)' }}
            />
            <span
              className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full"
              style={{ background: 'var(--loreal-gold, #C9A227)' }}
            />
          </button>

          <button
            type="button"
            className="flex items-center gap-2 px-3 py-2 transition-colors"
            style={{ borderRadius: 6 }}
            aria-label="Profile menu"
          >
            <div
              className="flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold"
              style={{
                background: 'var(--loreal-gold, #C9A227)',
                color: isDark ? '#111111' : '#FFFFFF',
              }}
            >
              SM
            </div>

            <ChevronDown
              className="h-4 w-4"
              style={{ color: 'var(--loreal-icon, #4B5563)' }}
            />
          </button>
        </div>
      </div>
    </nav>
  );
}