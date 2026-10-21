import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Legend } from 'recharts';

export interface CatDatum { name: string; value: number }

const colors = ['#e8a948', '#d8c07a', '#d9825b', '#8fb996', '#79b4e0', '#b59ad8', '#e07a8f', '#7ad8c4', '#c4c4c4'];
const axis = { fill: 'var(--text-faint)', fontSize: 12 };
const tip = { background: 'var(--surface-2)', border: '1px solid var(--line)', borderRadius: 8, color: 'var(--text)' };

export function CategoryBar({ data, label }: { data: CatDatum[]; label: string }) {
  return (
    <div className="chart-box" role="img" aria-label={label}>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={data} margin={{ top: 8, right: 8, left: -18, bottom: 8 }}>
          <CartesianGrid stroke="var(--line)" vertical={false} />
          <XAxis dataKey="name" tick={axis} interval={0} angle={-30} textAnchor="end" height={60} />
          <YAxis allowDecimals={false} tick={axis} />
          <Tooltip contentStyle={tip} cursor={{ fill: 'rgba(128,128,128,.12)' }} />
          <Bar dataKey="value" fill="var(--accent)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function CategoryDonut({ data, label }: { data: CatDatum[]; label: string }) {
  return (
    <div className="chart-box" role="img" aria-label={label}>
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" innerRadius={55} outerRadius={90} paddingAngle={2} stroke="none">
            {data.map((d, i) => <Cell key={d.name} fill={colors[i % colors.length]} />)}
          </Pie>
          <Tooltip contentStyle={tip} />
          <Legend wrapperStyle={{ fontSize: 12 }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
