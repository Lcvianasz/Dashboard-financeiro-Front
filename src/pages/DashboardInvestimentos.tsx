import React, { useState } from 'react';
import { useCarteira } from '../hooks/useCarteira';
import { ModalCompraVenda } from '../components/ModalCompraVenda';
import { RentabilidadeChart } from '../components/RentabilidadeChart';
import { investimentosApi } from '../api/investimentosApi';
import { formatarMoeda, formatarPercentual } from '../utils/formatadores';
import { CompraVendaRequest } from '../types/investimentos';
import './DashboardInvestimentos.css';

export const DashboardInvestimentos: React.FC = () => {
  const { carteira, loading, error, recarregar } = useCarteira();
  const [modalTipo, setModalTipo] = useState<'COMPRA' | 'VENDA' | null>(null);

  const handleSubmit = async (data: CompraVendaRequest) => {
    if (modalTipo === 'COMPRA') {
      await investimentosApi.comprar(data);
    } else if (modalTipo === 'VENDA') {
      await investimentosApi.vender(data);
    }
    recarregar();
  };

  if (loading) return <div className="loading">Carregando carteira...</div>;
  if (error) return <div className="error">Erro: {error}</div>;
  if (!carteira) return <div className="error">Nenhum dado encontrado</div>;

  const valorTotalAtual = carteira.posicoes.reduce((acc, p) => acc + p.valorAtual, 0);
  const valorTotalInvestido = carteira.posicoes.reduce((acc, p) => acc + p.valorTotalInvestido, 0);
  const lucroTotal = valorTotalAtual - valorTotalInvestido;
  const rentabilidadeTotal = valorTotalInvestido !== 0 ? (lucroTotal / valorTotalInvestido) * 100 : 0;

  return (
    <div className="investimentos-container">
      <div className="investimentos-header">
        <h1>📈 {carteira.nome}</h1>
        <p>{carteira.descricao}</p>
        <div className="resumo-cards">
          <div className="resumo-card">
            <span>Valor total</span>
            <strong>{formatarMoeda(valorTotalAtual)}</strong>
          </div>
          <div className="resumo-card">
            <span>Investido</span>
            <strong>{formatarMoeda(valorTotalInvestido)}</strong>
          </div>
          <div className="resumo-card" style={{ color: lucroTotal >= 0 ? '#4ade80' : '#f87171' }}>
            <span>Lucro / Prejuízo</span>
            <strong>{formatarMoeda(lucroTotal)} ({formatarPercentual(rentabilidadeTotal)})</strong>
          </div>
        </div>
        <div className="botoes-acao">
          <button className="btn-comprar" onClick={() => setModalTipo('COMPRA')}>➕ Comprar</button>
          <button className="btn-vender" onClick={() => setModalTipo('VENDA')}>➖ Vender</button>
          <button className="btn-atualizar" onClick={recarregar}>🔄 Atualizar</button>
        </div>
      </div>

      {carteira.posicoes.length > 0 && (
        <div className="grafico-wrapper">
          <h2>Rentabilidade por Ativo</h2>
          <RentabilidadeChart posicoes={carteira.posicoes} />
        </div>
      )}

      <div className="posicoes-wrapper">
        <h2>📋 Posições</h2>
        <div className="cards-grid">
          {carteira.posicoes.map(pos => (
            <div key={pos.simbolo} className="card-ativo">
              <h3>{pos.simbolo}</h3>
              <p className="empresa">{pos.nomeEmpresa}</p>
              <div className="detalhes-grid">
                <span>Quantidade:</span><span>{pos.quantidade}</span>
                <span>Preço médio:</span><span>{formatarMoeda(pos.precoMedioCompra)}</span>
                <span>Preço atual:</span><span>{formatarMoeda(pos.precoAtual)}</span>
                <span>Valor investido:</span><span>{formatarMoeda(pos.valorTotalInvestido)}</span>
                <span>Valor atual:</span><span>{formatarMoeda(pos.valorAtual)}</span>
                <span>Lucro/Prejuízo:</span>
                <span style={{ color: pos.lucroPrejuizo >= 0 ? '#4ade80' : '#f87171' }}>
                  {formatarMoeda(pos.lucroPrejuizo)}
                </span>
                <span>Rentabilidade:</span>
                <span style={{ color: pos.rentabilidadePercentual >= 0 ? '#4ade80' : '#f87171' }}>
                  {formatarPercentual(pos.rentabilidadePercentual)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {modalTipo && (
        <ModalCompraVenda
          tipo={modalTipo}
          isOpen={true}
          onClose={() => setModalTipo(null)}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};