import { useEffect, useState, useCallback } from 'react';
import api from '../../api/axiosConfig';
import { Meta, AlertaDTO } from '../../types';
import styles from './Metas.module.css';

const Metas = () => {
  const [metas, setMetas] = useState<Meta[]>([]);
  const [alertas, setAlertas] = useState<AlertaDTO[]>([]);
  const [mes, setMes] = useState(new Date().getMonth() + 1);
  const [ano, setAno] = useState(new Date().getFullYear());
  const [novaMeta, setNovaMeta] = useState({ categoria: '', valorMeta: 0 });

  const carregarDados = useCallback(async () => {
    try {
      const [metasRes, alertasRes] = await Promise.all([
        api.get<Meta[]>(`/metas?mes=${mes}&ano=${ano}`),
        api.get<AlertaDTO[]>(`/dashboard/alertas?mes=${mes}&ano=${ano}`),
      ]);
      setMetas(metasRes.data);
      setAlertas(alertasRes.data);
    } catch (error) {
      console.error('Erro ao carregar metas/alertas', error);
    }
  }, [mes, ano]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    carregarDados();
  }, [carregarDados]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!novaMeta.categoria || novaMeta.valorMeta <= 0) return;
    try {
      await api.post('/metas', {
        categoria: novaMeta.categoria,
        valorMeta: novaMeta.valorMeta,
        mes,
        ano,
      });
      setNovaMeta({ categoria: '', valorMeta: 0 });
      carregarDados();
    } catch (error) {
      console.error('Erro ao criar meta', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Tem certeza que deseja excluir esta meta?')) return;
    try {
      await api.delete(`/metas/${id}`);
      carregarDados();
    } catch (error) {
      console.error('Erro ao deletar meta', error);
    }
  };

  // Obter gasto atual de uma categoria (vindo dos alertas)
  const getGastoAtual = (categoria: string): number => {
    const alerta = alertas.find(a => a.categoria === categoria);
    return alerta ? alerta.gastos : 0;
  };

  // Calcular percentual de progresso
  const getPercentual = (gasto: number, meta: number): number => {
    if (meta === 0) return 0;
    const percent = (gasto / meta) * 100;
    return Math.min(percent, 100); // Limita a 100%
  };

  return (
    <div className={styles.metas}>
      <h1>Metas Financeiras</h1>

      {/* Filtros e botão atualizar */}
      <div className={styles.filters}>
        <label>
          Mês:
          <input
            type="number"
            value={mes}
            onChange={(e) => setMes(Number(e.target.value))}
            min={1}
            max={12}
          />
        </label>
        <label>
          Ano:
          <input
            type="number"
            value={ano}
            onChange={(e) => setAno(Number(e.target.value))}
            min={2020}
            max={2030}
          />
        </label>
        <button onClick={carregarDados} className={styles.refreshBtn}>
          🔄 Atualizar
        </button>
      </div>

      {/* Formulário para nova meta */}
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Categoria (ex: Alimentação)"
          value={novaMeta.categoria}
          onChange={(e) => setNovaMeta({ ...novaMeta, categoria: e.target.value })}
          required
        />
        <input
          type="number"
          step="0.01"
          placeholder="Valor da meta (R$)"
          value={novaMeta.valorMeta || ''}
          onChange={(e) => setNovaMeta({ ...novaMeta, valorMeta: parseFloat(e.target.value) || 0 })}
          required
        />
        <button type="submit">Adicionar Meta</button>
      </form>

      {/* Lista de metas com progresso e alertas */}
      <div className={styles.lista}>
        {metas.length === 0 && <p>Nenhuma meta cadastrada para este período.</p>}
        {metas.map((meta) => {
          const gastoAtual = getGastoAtual(meta.categoria);
          const percentual = getPercentual(gastoAtual, meta.valorMeta);
          const excedeu = gastoAtual > meta.valorMeta;
          const cumprida = !excedeu && gastoAtual > 0; // marcador opcional: se gastou algo mas não excedeu

          return (
            <div
              key={meta.id}
              className={`${styles.metaCard} ${excedeu ? styles.excedeu : cumprida ? styles.cumprida : ''}`}
            >
              <div className={styles.cardHeader}>
                <h3>{meta.categoria}</h3>
                <div className={styles.cardActions}>
                  {cumprida && <span className={styles.checkIcon}>✅</span>}
                  <button
                    className={styles.deleteBtn}
                    onClick={() => handleDelete(meta.id!)}
                    title="Excluir meta"
                  >
                    🗑️
                  </button>
                </div>
              </div>
              <div className={styles.valores}>
                <span>Meta: R$ {meta.valorMeta.toFixed(2)}</span>
                <span className={excedeu ? styles.gastoExcedido : styles.gastoNormal}>
                  Gasto: R$ {gastoAtual.toFixed(2)}
                </span>
              </div>
              <div className={styles.progressBar}>
                <div
                  className={`${styles.progressFill} ${excedeu ? styles.excedeuFill : cumprida ? styles.cumpridaFill : ''}`}
                  style={{ width: `${percentual}%` }}
                ></div>
              </div>
              {excedeu && (
                <div className={styles.alerta}>
                  ⚠️ Atenção! Você já excedeu a meta em R$ {(gastoAtual - meta.valorMeta).toFixed(2)}
                </div>
              )}
              {cumprida && !excedeu && (
                <div className={styles.sucesso}>
                  🎯 Meta cumprida! Você gastou R$ {(meta.valorMeta - gastoAtual).toFixed(2)} abaixo da meta.
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Metas;