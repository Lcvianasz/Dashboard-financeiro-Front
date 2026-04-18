import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { CategoriaDTO } from '../../types';

interface Props {
  categorias: CategoriaDTO[];
}

const COLORS = ['#2dd4bf', '#f59e0b', '#8b5cf6', '#ec489a', '#14b8a6', '#f97316', '#6b7280'];

interface LabelProps {
  categoria?: string;
  porcentagem?: number;
  percent?: number;
  name?: string;
}

const renderLabel = (entry: LabelProps) => {
  const nome = entry.categoria || entry.name || '';
  const valorPercentual = entry.porcentagem ?? (entry.percent ? entry.percent * 100 : 0);
  return `${nome}: ${valorPercentual.toFixed(1)}%`;
};

const GraficoPorCategoria = ({ categorias }: Props) => {
  const data = categorias.filter(c => c.total > 0);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          dataKey="total"
          nameKey="categoria"
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          label={renderLabel}
        >
          {data.map((_entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{ backgroundColor: '#1f2937', border: 'none', borderRadius: 8 }}
          itemStyle={{ color: '#fff' }}
          labelStyle={{ color: '#e2e8f0' }}
        />
        <Legend wrapperStyle={{ color: '#e2e8f0' }} />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default GraficoPorCategoria;