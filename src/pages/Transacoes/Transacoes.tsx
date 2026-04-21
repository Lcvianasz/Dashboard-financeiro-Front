import { useEffect, useState, useCallback } from 'react';
import api from '../../api/axiosConfig';
import TabelaTransacoes from '../../components/TabelaTransacoes/TabelaTransacoes';
import { TransacaoResponse, TransacaoRequest } from '../../types';
import styles from './Transacoes.module.css';

const Transacoes = () => {
  const [transacoes, setTransacoes] = useState<TransacaoResponse[]>([]);
  const [transacoesFiltradas, setTransacoesFiltradas] = useState<TransacaoResponse[]>([]);
  const [mesFiltro, setMesFiltro] = useState(new Date().getMonth() + 1);
  const [anoFiltro, setAnoFiltro] = useState(new Date().getFullYear());
  const [form, setForm] = useState<TransacaoRequest>({
    descricao: '',
    valor: 0,
    tipo: 'SAIDA',
    categoria: '',
    data: new Date().toISOString().split('T')[0],
  });

  // Carregar transações da API
  const carregarTransacoes = useCallback(async () => {
    try {
      const res = await api.get<TransacaoResponse[]>('/transacoes');
      setTransacoes(res.data);
    } catch (error) {
      console.error('Erro ao carregar transações', error);
    }
  }, []);

  // Efeito para carregar dados iniciais
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    carregarTransacoes();
  }, [carregarTransacoes]);

  // Efeito para aplicar filtro sempre que transações ou filtros mudarem
  useEffect(() => {
    const filtrar = () => {
      const filtradas = transacoes.filter((t) => {
        const data = new Date(t.data);
        const mes = data.getMonth() + 1;
        const ano = data.getFullYear();
        return mes === mesFiltro && ano === anoFiltro;
      });
      setTransacoesFiltradas(filtradas);
    };
    filtrar();
  }, [transacoes, mesFiltro, anoFiltro]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'valor' ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/transacoes', form);
      setForm({
        descricao: '',
        valor: 0,
        tipo: 'SAIDA',
        categoria: '',
        data: new Date().toISOString().split('T')[0],
      });
      carregarTransacoes(); // recarrega a lista após adicionar
    } catch (error) {
      console.error('Erro ao adicionar transação', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/transacoes/${id}`);
      carregarTransacoes();
    } catch (error) {
      console.error('Erro ao deletar transação', error);
    }
  };

  const limparFiltros = () => {
    setMesFiltro(new Date().getMonth() + 1);
    setAnoFiltro(new Date().getFullYear());
  };

  return (
    <div className={styles.transacoes}>
      <h1>Gerenciar Transações</h1>

      {/* Filtros por mês/ano */}
      <div className={styles.filtros}>
        <label>
          Mês:
          <input
            type="number"
            value={mesFiltro}
            onChange={(e) => setMesFiltro(Number(e.target.value))}
            min={1}
            max={12}
          />
        </label>
        <label>
          Ano:
          <input
            type="number"
            value={anoFiltro}
            onChange={(e) => setAnoFiltro(Number(e.target.value))}
            min={2020}
            max={2030}
          />
        </label>
        <button onClick={limparFiltros} className={styles.limparBtn}>
          Limpar Filtros
        </button>
      </div>

      {/* Formulário de adição */}
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          name="descricao"
          placeholder="Descrição"
          value={form.descricao}
          onChange={handleChange}
          required
        />
        <input
          name="valor"
          type="number"
          step="0.01"
          placeholder="Valor"
          value={form.valor || ''}
          onChange={handleChange}
          required
        />
        <select name="tipo" value={form.tipo} onChange={handleChange}>
          <option value="ENTRADA">Entrada</option>
          <option value="SAIDA">Saída</option>
        </select>
        <input
          name="categoria"
          placeholder="Categoria"
          value={form.categoria}
          onChange={handleChange}
          required
        />
        <input name="data" type="date" value={form.data} onChange={handleChange} required />
        <button type="submit">Adicionar</button>
      </form>

      {/* Tabela de transações filtradas */}
      <TabelaTransacoes transacoes={transacoesFiltradas} onDelete={handleDelete} />
    </div>
  );
};

export default Transacoes;