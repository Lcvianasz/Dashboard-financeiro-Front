import React from 'react';
import { PosicaoResponse } from '../types/investimentos';
import { PosicaoCard } from './PosicaoCard';

interface Props {
  posicoes: PosicaoResponse[];
}

export const CarteiraLista: React.FC<Props> = ({ posicoes }) => {
  if (!posicoes || posicoes.length === 0) {
    return <p className="text-center p-4">Nenhum ativo na carteira.</p>;
  }

  return (
    <div className="cards-grid">
      {posicoes.map((pos) => (
        <PosicaoCard key={pos.simbolo} posicao={pos} />
      ))}
    </div>
  );
};