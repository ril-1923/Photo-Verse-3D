import { useEffect, useRef } from 'react';

interface Props {
  open: boolean;
  title: string;
  message: string;
  confirmLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDialog({ open, title, message, confirmLabel, onConfirm, onCancel }: Props) {
  const ref = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    ref.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onCancel(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onCancel]);
  if (!open) return null;
  return (
    <div className="overlay" onClick={onCancel}>
      <div className="confirm-dialog" role="alertdialog" aria-modal="true" aria-labelledby="cd-title" aria-describedby="cd-msg" onClick={(e) => e.stopPropagation()}>
        <h2 id="cd-title">{title}</h2>
        <p id="cd-msg">{message}</p>
        <div className="d-flex gap-2 justify-content-end">
          <button ref={ref} className="btn btn-ghost" onClick={onCancel}>Cancel</button>
          <button className="btn btn-danger-soft" onClick={onConfirm}>{confirmLabel}</button>
        </div>
      </div>
    </div>
  );
}
