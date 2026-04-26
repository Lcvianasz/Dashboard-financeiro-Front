import React from 'react';
import { PosicaoResponse } from '../types/investimentos';
import { formatarMoeda, formatarPercentual } from '../utils/formatadores';

export const PosicaoCard: React.FC<{ posicao: PosicaoResponse }> = ({ posicao }) => {
  return (
    <div className="card-ativo">
      <h3>{posicao.simbolo}</h3>
      <p className="empresa">{posicao.nomeEmpresa}</p>
      <div className="detalhes-grid">
        <span>Quantidade:</span><span>{posicao.quantidade}</span>
        <span>Preço médio:</span><span>{formatarMoeda(posicao.precoMedioCompra)}</span>
        <span>Preço atual:</span><span>{formatarMoeda(posicao.precoAtual)}</span>
        <span>Valor investido:</span><span>{formatarMoeda(posicao.valorTotalInvestido)}</span>
        <span>Valor atual:</span><span>{formatarMoeda(posicao.valorAtual)}</span>
        <span>Lucro/Prejuízo:</span>
        <span style={{ color: posicao.lucroPrejuizo >= 0 ? '#4ade80' : '#f87171' }}>
          {formatarMoeda(posicao.lucroPrejuizo)}
        </span>
        <span>Rentabilidade:</span>
        <span style={{ color: posicao.rentabilidadePercentual >= 0 ? '#4ade80' : '#f87171' }}>
          {formatarPercentual(posicao.rentabilidadePercentual)}
        </span>
      </div>
    </div>
  );
};