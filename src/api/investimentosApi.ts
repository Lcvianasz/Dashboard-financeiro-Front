import api from './axiosConfig';
import { CarteiraResponse, CompraVendaRequest } from '../types/investimentos';

export const investimentosApi = {
  getCarteira: async (): Promise<CarteiraResponse> => {
    const response = await api.get('/investimentos/carteira');
    return response.data;
  },
  comprar: async (data: CompraVendaRequest): Promise<string> => {
    const response = await api.post('/investimentos/comprar', data);
    return response.data;
  },
  vender: async (data: CompraVendaRequest): Promise<string> => {
    const response = await api.post('/investimentos/vender', data);
    return response.data;
  }
};