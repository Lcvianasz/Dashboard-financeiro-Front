import { useEffect, useState, useCallback } from 'react';
import api from '../../api/axiosConfig';
import TabelaTransacoes from '../../components/TabelaTransacoes/TabelaTransacoes';
import { TransacaoResponse, TransacaoRequest } from '../../types';
import styles from './Transacoes.module.css';

const Transacoes = () => {
  const [transacoes, setTransacoes] = useState<TransacaoResponse[]>([]);
  const [form, setForm] = useState<TransacaoRequest>({
    descricao: '',
    valor: 0,
    tipo: 'SAIDA',
    categoria: '',
    data: new Date().toISOString().split('T')[0],
  });

  const carregarTransacoes = useCallback(async () => {
    try {
      const res = await api.get<TransacaoResponse[]>('/transacoes');
      setTransacoes(res.data);
    } catch (error) {
      console.error('Erro ao carregar transações', error);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    carregarTransacoes();
  }, [carregarTransacoes]);

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
      carregarTransacoes();
    } catch (error) {
      console.error('Erro ao adicionar transação', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/transacoes/${id}`);
      carregarTransacoes();
    } catch (error) {
      console.error('Erro ao deletar', error);
    }
  };

  return (
    <div className={styles.transacoes}>
      <h1>Gerenciar Transações</h1>
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
      <TabelaTransacoes transacoes={transacoes} onDelete={handleDelete} />
    </div>
  );
};

export default Transacoes;