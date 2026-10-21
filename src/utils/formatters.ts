export const formatNumber = (n: number): string => new Intl.NumberFormat('en-US').format(n);
export const formatDate = (iso: string): string =>
  new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
