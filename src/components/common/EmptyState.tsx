import type { ReactNode } from 'react';
import { Aperture } from 'lucide-react';

interface Props { title: string; text: string; action?: ReactNode; icon?: ReactNode }

export default function EmptyState({ title, text, action, icon }: Props) {
  return (
    <div className="empty-state">
      <div className="empty-icon" aria-hidden="true">{icon ?? <Aperture size={34} strokeWidth={1.2} />}</div>
      <h2>{title}</h2>
      <p>{text}</p>
      {action}
    </div>
  );
}
