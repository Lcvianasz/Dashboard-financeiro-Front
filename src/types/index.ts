export type TipoTransacao = 'ENTRADA' | 'SAIDA';

export interface DashboardDTO {
  totalEntradas: number;
  totalSaidas: number;
  saldo: number;
}

export interface CategoriaDTO {
  categoria: string;
  total: number;
  porcentagem: number;
}

export interface AlertaDTO {
  categoria: string;
  gastos: number;
  meta: number;
  excedeu: boolean;
}

export interface Meta {
  id?: number;
  categoria: string;
  valorMeta: number;
  mes: number;
  ano: number;
}

export interface TransacaoRequest {
  descricao: string;
  valor: number;
  tipo: TipoTransacao;
  categoria: string;
  data: string; // formato "yyyy-MM-dd"
}

export interface TransacaoResponse extends TransacaoRequest {
  id: number;
}