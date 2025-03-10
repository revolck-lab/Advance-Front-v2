import { QueryClient, DefaultOptions } from "@tanstack/react-query";

/**
 * Configurações padrão para o React Query
 * Definidas de modo a otimizar desempenho e UX
 */
const defaultQueryOptions: DefaultOptions = {
  queries: {
    refetchOnWindowFocus: false, // Não recarrega dados ao focar na janela (produção)
    refetchOnMount: true, // Recarrega dados ao montar componente
    refetchOnReconnect: true, // Recarrega dados ao reconectar
    retry: 1, // Número de tentativas em caso de erro
    staleTime: 5 * 60 * 1000, // Dados considerados "frescos" por 5 minutos
    cacheTime: 10 * 60 * 1000, // Cache mantido por 10 minutos
  },
  mutations: {
    retry: 0, // Não retenta mutações automaticamente
  },
};

/**
 * Função que cria um novo cliente React Query com configurações customizáveis
 * Útil para testes ou para diferentes partes da aplicação
 */
export function createQueryClient(options: DefaultOptions = {}) {
  return new QueryClient({
    defaultOptions: {
      ...defaultQueryOptions,
      ...options,
    },
  });
}

/**
 * Cliente React Query padrão para uso na aplicação
 */
export const queryClient = createQueryClient();

/**
 * Função para invalidar queries relacionadas a um recurso
 * Facilita gerenciar o cache após mutações
 */
export const invalidateQueries = (key: string | string[]) => {
  const queryKey = Array.isArray(key) ? key : [key];
  return queryClient.invalidateQueries({ queryKey });
};

/**
 * Função para limpar o cache de um recurso específico
 */
export const clearQueries = (key: string | string[]) => {
  const queryKey = Array.isArray(key) ? key : [key];
  return queryClient.removeQueries({ queryKey });
};
