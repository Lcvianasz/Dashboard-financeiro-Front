export const formatarMoeda = (valor: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(valor);
};

export const formatarPercentual = (valor: number): string => {
  return `${valor.toFixed(2)}%`;
};

export const formatarQuantidade = (quantidade: number): string => {
  return quantidade.toFixed(2);
};