import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface Props {
  entradas: number;
  saidas: number;
}

const GraficoEntradaSaida = ({ entradas, saidas }: Props) => {
  const data = [
    { name: 'Entradas', valor: entradas },
    { name: 'Saídas', valor: saidas },
  ];

  const colors = ['#10b981', '#ef4444'];

  const formatYAxisTick = (value: number) => `R$ ${value}`;

  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
        <XAxis dataKey="name" stroke="#9ca3af" />
        <YAxis stroke="#9ca3af" tickFormatter={formatYAxisTick} />
        <Tooltip
          contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: 8 }}
          labelStyle={{ color: '#e2e8f0' }}
          itemStyle={{ color: '#fff' }}
        />
        <Bar dataKey="valor" radius={[8, 8, 0, 0]}>
          {data.map((_entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default GraficoEntradaSaida;