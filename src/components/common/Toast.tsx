import { useEffect } from 'react';
import { CheckCircle2, Info, TriangleAlert } from 'lucide-react';
import { usePhotoStore } from '../../store/usePhotoStore';

function ToastItem({ id, message, tone }: { id: number; message: string; tone: 'success' | 'info' | 'warning' }) {
  const dismiss = usePhotoStore((s) => s.dismissToast);
  useEffect(() => {
    const t = window.setTimeout(() => dismiss(id), 2600);
    return () => window.clearTimeout(t);
  }, [id, dismiss]);
  const Icon = tone === 'success' ? CheckCircle2 : tone === 'warning' ? TriangleAlert : Info;
  return (
    <div className="toast-item" role="status">
      <Icon size={16} aria-hidden="true" /> <span>{message}</span>
    </div>
  );
}

export default function ToastHost() {
  const toasts = usePhotoStore((s) => s.toasts);
  return (
    <div className="toast-host" aria-live="polite">
      {toasts.map((t) => <ToastItem key={t.id} {...t} />)}
    </div>
  );
}
