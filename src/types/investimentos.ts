export interface PosicaoResponse {
  simbolo: string;
  nomeEmpresa: string;
  quantidade: number;
  precoMedioCompra: number;
  precoAtual: number;
  valorTotalInvestido: number;
  valorAtual: number;
  lucroPrejuizo: number;
  rentabilidadePercentual: number;
}

export interface CarteiraResponse {
  id: number;
  nome: string;
  descricao: string;
  dataCriacao: string;
  posicoes: PosicaoResponse[];
}

export interface CompraVendaRequest {
  simbolo: string;
  quantidade: number;
  precoUnitario: number;
  observacao?: string;
}