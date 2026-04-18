import { TransacaoResponse } from '../../types';
import styles from './TabelaTransacoes.module.css';
import { Trash2, TrendingUp, TrendingDown } from 'lucide-react';

interface Props {
  transacoes: TransacaoResponse[];
  onDelete: (id: number) => void;
}

const TabelaTransacoes = ({ transacoes, onDelete }: Props) => {
  const formatarData = (data: string) => {
    return new Date(data).toLocaleDateString('pt-BR');
  };

  const formatarMoeda = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);
  };

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Categoria</th>
            <th>Data</th>
            <th>Valor</th>
            <th>Tipo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {transacoes.map((trans) => (
            <tr key={trans.id}>
              <td>{trans.descricao}</td>
              <td>{trans.categoria}</td>
              <td>{formatarData(trans.data)}</td>
              <td className={trans.tipo === 'ENTRADA' ? styles.entrada : styles.saida}>
                {formatarMoeda(trans.valor)}
              </td>
              <td>
                {trans.tipo === 'ENTRADA' ? (
                  <TrendingUp size={18} color="#10b981" />
                ) : (
                  <TrendingDown size={18} color="#ef4444" />
                )}
              </td>
              <td>
                <button onClick={() => onDelete(trans.id!)} className={styles.deleteBtn}>
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TabelaTransacoes;