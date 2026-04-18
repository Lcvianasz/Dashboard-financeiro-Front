import { useEffect, useState, useCallback } from 'react';
import api from '../../api/axiosConfig';
import CardResumo from '../../components/CardResumo/CardResumo';
import GraficoEntradaSaida from '../../components/GraficoEntradaSaida/GraficoEntradaSaida';
import GraficoPorCategoria from '../../components/GraficoPorCategoria/GraficoPorCategoria';
import TabelaTransacoes from '../../components/TabelaTransacoes/TabelaTransacoes';
import { DashboardDTO, CategoriaDTO, TransacaoResponse } from '../../types';
import styles from './Dashboard.module.css';

const Dashboard = () => {
  const [mes, setMes] = useState(new Date().getMonth() + 1);
  const [ano, setAno] = useState(new Date().getFullYear());
  const [dashboard, setDashboard] = useState<DashboardDTO | null>(null);
  const [categorias, setCategorias] = useState<CategoriaDTO[]>([]);
  const [transacoes, setTransacoes] = useState<TransacaoResponse[]>([]);

  const carregarDados = useCallback(async () => {
    try {
      const [dashRes, catRes, transRes] = await Promise.all([
        api.get<DashboardDTO>(`/dashboard?mes=${mes}&ano=${ano}`),
        api.get<CategoriaDTO[]>(`/dashboard/categorias?mes=${mes}&ano=${ano}`),
        api.get<TransacaoResponse[]>('/transacoes'),
      ]);
      setDashboard(dashRes.data);
      setCategorias(catRes.data);
      setTransacoes(transRes.data);
    } catch (error) {
      console.error('Erro ao carregar dashboard', error);
    }
  }, [mes, ano]);

  useEffect(() => {
  // eslint-disable-next-line react-hooks/set-state-in-effect
  carregarDados();
}, [carregarDados]);
  const handleDeleteTransacao = async (id: number) => {
    try {
      await api.delete(`/transacoes/${id}`);
      carregarDados();
    } catch (error) {
      console.error('Erro ao deletar', error);
    }
  };

  if (!dashboard) return <div className={styles.loading}>Carregando dados financeiros...</div>;

  return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <h1>Resumo Financeiro</h1>
        <div className={styles.filters}>
          <input
            type="number"
            value={mes}
            onChange={(e) => setMes(Number(e.target.value))}
            min={1}
            max={12}
          />
          <input
            type="number"
            value={ano}
            onChange={(e) => setAno(Number(e.target.value))}
            min={2020}
            max={2030}
          />
        </div>
      </div>

      <div className={styles.cards}>
        <CardResumo titulo="Entradas" valor={dashboard.totalEntradas} tipo="entrada" />
        <CardResumo titulo="Saídas" valor={dashboard.totalSaidas} tipo="saida" />
        <CardResumo titulo="Saldo" valor={dashboard.saldo} tipo="saldo" />
      </div>

      <div className={styles.charts}>
        <div className={styles.chartCard}>
          <h3>Entradas vs Saídas</h3>
          <GraficoEntradaSaida entradas={dashboard.totalEntradas} saidas={dashboard.totalSaidas} />
        </div>
        <div className={styles.chartCard}>
          <h3>Gastos por Categoria</h3>
          <GraficoPorCategoria categorias={categorias} />
        </div>
      </div>

      <div className={styles.recent}>
        <h3>Últimas Transações</h3>
        <TabelaTransacoes transacoes={transacoes.slice(0, 5)} onDelete={handleDeleteTransacao} />
      </div>
    </div>
  );
};

export default Dashboard;