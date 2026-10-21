import type { ReactNode } from 'react';

interface Props { label: string; value: string | number; note?: string; icon?: ReactNode }

export default function StatCard({ label, value, note, icon }: Props) {
  return (
    <div className="stat-card">
      <div className="d-flex justify-content-between align-items-start">
        <span className="stat-label">{label}</span>
        {icon && <span className="text-accent" aria-hidden="true">{icon}</span>}
      </div>
      <strong className="stat-value">{value}</strong>
      {note && <span className="stat-note">{note}</span>}
    </div>
  );
}
