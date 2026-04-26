import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import { PosicaoResponse } from '../types/investimentos';
import { formatarPercentual } from '../utils/formatadores';

interface Props {
  posicoes: PosicaoResponse[];
}

export const RentabilidadeChart: React.FC<Props> = ({ posicoes }) => {
  const data = posicoes.map((p) => ({
    simbolo: p.simbolo,
    rentabilidade: p.rentabilidadePercentual,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="simbolo" />
        <YAxis tickFormatter={(value) => `${value}%`} />
        <Tooltip
          formatter={(value: unknown) => {
            // Converte o valor para número, independente de ser string ou number
            const num = typeof value === 'number' ? value : Number(value);
            return isNaN(num) ? '0%' : formatarPercentual(num);
          }}
        />
        <Bar dataKey="rentabilidade" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};