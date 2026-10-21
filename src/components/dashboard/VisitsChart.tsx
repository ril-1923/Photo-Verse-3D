import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export default function VisitsChart({ data }: { data: { month: string; visits: number }[] }) {
  return (
    <div className="chart-box" role="img" aria-label="Line chart of simulated monthly gallery visits">
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={data} margin={{ top: 8, right: 12, left: -12, bottom: 0 }}>
          <CartesianGrid stroke="var(--line)" vertical={false} />
          <XAxis dataKey="month" tick={{ fill: 'var(--text-faint)', fontSize: 12 }} />
          <YAxis tick={{ fill: 'var(--text-faint)', fontSize: 12 }} />
          <Tooltip contentStyle={{ background: 'var(--surface-2)', border: '1px solid var(--line)', borderRadius: 8, color: 'var(--text)' }} />
          <Line type="monotone" dataKey="visits" stroke="var(--accent)" strokeWidth={2.5} dot={{ r: 3, fill: 'var(--accent)' }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
