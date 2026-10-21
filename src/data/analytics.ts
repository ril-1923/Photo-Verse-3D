/** SIMULATED demo analytics. Not real traffic. */
export type RangeKey = '3m' | '6m' | '12m';

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const visits = [820, 910, 1040, 1180, 1320, 1250, 1490, 1620, 1580, 1760, 1910, 2100];

export const rangeOptions: { key: RangeKey; label: string; n: number }[] = [
  { key: '3m', label: 'Last 3 months', n: 3 },
  { key: '6m', label: 'Last 6 months', n: 6 },
  { key: '12m', label: 'Last 12 months', n: 12 },
];

export function visitsForRange(range: RangeKey): { month: string; visits: number }[] {
  const n = rangeOptions.find((r) => r.key === range)?.n ?? 6;
  return months.slice(12 - n).map((m, i) => ({ month: m, visits: visits[12 - n + i] }));
}

/** Deterministic simulated baseline view counts per photograph index. */
export const baselineViews = (index: number): number => 120 + ((index * 53) % 310);
