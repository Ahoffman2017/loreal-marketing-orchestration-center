import { Filter, Calendar, Clock } from 'lucide-react';

export function WorkspaceHeader() {
  return (
    <div>
      <div className="mb-5 flex items-start justify-between gap-6">
        <div>
          <h1
            className="text-[34px] font-semibold leading-[1.05]"
            style={{
              color: '#111111',
              letterSpacing: '-0.03em',
            }}
          >
            Shared Decision Workspace
          </h1>

          <p
            className="mt-2 text-[15px] leading-[1.6]"
            style={{ color: '#6B7280' }}
          >
            Where signals align into coordinated action
          </p>
        </div>

        <div className="flex items-center gap-2">
          <FilterButton icon={Calendar} label="Last 7 days" />
          <FilterButton icon={Filter} label="All Brands" />
          <FilterButton icon={Filter} label="Global" />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <StatusBadge label="3 priority decisions today" color="amber" />
        <StatusBadge label="2 conflicts detected" color="red" />
        <StatusBadge label="1 action ready for approval" color="green" />

        <div
          className="ml-auto flex items-center gap-2 text-[13px]"
          style={{ color: '#6B7280' }}
        >
          <Clock className="h-3.5 w-3.5" />
          Last updated: 4 min ago
        </div>
      </div>
    </div>
  );
}

function FilterButton({
  icon: Icon,
  label,
}: {
  icon: typeof Calendar;
  label: string;
}) {
  return (
    <button
      className="inline-flex items-center gap-2 border px-3.5 py-2.5 text-[13px] font-medium transition-all duration-200 hover:-translate-y-[1px]"
      style={{
        borderRadius: '6px',
        background: '#FFFFFF',
        borderColor: '#E7E1D2',
        color: '#374151',
        boxShadow: '0 1px 2px rgba(17,17,17,0.04)',
      }}
    >
      <Icon className="h-4 w-4" style={{ color: '#C9A227' }} />
      {label}
    </button>
  );
}

function StatusBadge({
  label,
  color,
}: {
  label: string;
  color: 'amber' | 'red' | 'green';
}) {
  const styles = {
    amber: {
      background: 'rgba(201,162,39,0.10)',
      borderColor: 'rgba(201,162,39,0.28)',
      color: '#8F6A00',
    },
    red: {
      background: 'rgba(17,17,17,0.05)',
      borderColor: '#D8CCB7',
      color: '#7A5B12',
    },
    green: {
      background: 'rgba(201,162,39,0.08)',
      borderColor: 'rgba(201,162,39,0.22)',
      color: '#7A610B',
    },
  };

  const style = styles[color];

  return (
    <div
      className="border px-3 py-1.5 text-[12px] font-semibold"
      style={{
        borderRadius: '6px',
        background: style.background,
        borderColor: style.borderColor,
        color: style.color,
      }}
    >
      {label}
    </div>
  );
}