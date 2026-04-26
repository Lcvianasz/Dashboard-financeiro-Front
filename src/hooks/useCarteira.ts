/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect, useCallback } from 'react';
import { investimentosApi } from '../api/investimentosApi';
import { CarteiraResponse } from '../types/investimentos';

export const useCarteira = () => {
  const [carteira, setCarteira] = useState<CarteiraResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const carregarCarteira = useCallback(async () => {
    try {
      setLoading(true);
      const data = await investimentosApi.getCarteira();
      setCarteira(data);
      setError(null);
    } catch (err) {
      const mensagem = err instanceof Error ? err.message : 'Erro ao carregar carteira';
      setError(mensagem);
      console.error(mensagem, err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    carregarCarteira();
  }, [carregarCarteira]);

  return { carteira, loading, error, recarregar: carregarCarteira };
};