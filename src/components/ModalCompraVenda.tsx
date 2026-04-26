import React, { useState } from 'react';
import { CompraVendaRequest } from '../types/investimentos';

type TipoOperacao = 'COMPRA' | 'VENDA';

interface Props {
  tipo: TipoOperacao;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CompraVendaRequest) => Promise<void>;
}

export const ModalCompraVenda: React.FC<Props> = ({ tipo, isOpen, onClose, onSubmit }) => {
  const [simbolo, setSimbolo] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [precoUnitario, setPrecoUnitario] = useState('');
  const [observacao, setObservacao] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await onSubmit({
        simbolo: simbolo.toUpperCase(),
        quantidade: parseFloat(quantidade),
        precoUnitario: parseFloat(precoUnitario),
        observacao: observacao || undefined,
      });
      onClose();
      // Limpar formulário
      setSimbolo('');
      setQuantidade('');
      setPrecoUnitario('');
      setObservacao('');
    } catch (err: unknown) {                 // ← unknown em vez de any
      const mensagem = err instanceof Error ? err.message : 'Erro ao registrar operação';
      setError(mensagem);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2>{tipo === 'COMPRA' ? 'Comprar Ativo' : 'Vender Ativo'}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Símbolo (ex: PETR4)"
            value={simbolo}
            onChange={(e) => setSimbolo(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="number"
            step="any"
            placeholder="Quantidade"
            value={quantidade}
            onChange={(e) => setQuantidade(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="number"
            step="any"
            placeholder="Preço unitário"
            value={precoUnitario}
            onChange={(e) => setPrecoUnitario(e.target.value)}
            required
            style={styles.input}
          />
          <textarea
            placeholder="Observação (opcional)"
            value={observacao}
            onChange={(e) => setObservacao(e.target.value)}
            style={styles.textarea}
          />
          {error && <p style={styles.error}>{error}</p>}
          <div style={styles.botoes}>
            <button type="button" onClick={onClose} style={styles.botaoCancelar}>
              Cancelar
            </button>
            <button type="submit" disabled={loading} style={styles.botaoConfirmar}>
              {loading ? 'Processando...' : tipo === 'COMPRA' ? 'Comprar' : 'Vender'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: '#fff',
    padding: '24px',
    borderRadius: '8px',
    width: '400px',
    maxWidth: '90%',
  },
  input: {
    width: '100%',
    padding: '10px',
    margin: '8px 0',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  textarea: {
    width: '100%',
    padding: '10px',
    margin: '8px 0',
    borderRadius: '4px',
    border: '1px solid #ccc',
    minHeight: '80px',
  },
  error: { color: 'red', margin: '8px 0' },
  botoes: { display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '16px' },
  botaoCancelar: {
    padding: '8px 16px',
    backgroundColor: '#ccc',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  botaoConfirmar: {
    padding: '8px 16px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};