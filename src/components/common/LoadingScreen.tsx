export default function LoadingScreen({ label = 'Loading' }: { label?: string }) {
  return (
    <div className="loading-screen" role="status" aria-live="polite">
      <div className="aperture" aria-hidden="true"><span /><span /><span /><span /><span /><span /></div>
      <p>{label}…</p>
    </div>
  );
}
