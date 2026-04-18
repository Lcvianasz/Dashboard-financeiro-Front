import styles from './CardResumo.module.css';

interface CardResumoProps {
  titulo: string;
  valor: number;
  tipo?: 'entrada' | 'saida' | 'saldo';
}

const CardResumo = ({ titulo, valor, tipo = 'saldo' }: CardResumoProps) => {
  const formatarMoeda = (value: number) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  };

  let cor = '#eef2ff';
  if (tipo === 'entrada') cor = '#10b981';
  if (tipo === 'saida') cor = '#ef4444';
  if (tipo === 'saldo') cor = valor >= 0 ? '#2dd4bf' : '#f97316';

  return (
    <div className={styles.card}>
      <h3>{titulo}</h3>
      <p style={{ color: cor }}>{formatarMoeda(valor)}</p>
    </div>
  );
};

export default CardResumo;