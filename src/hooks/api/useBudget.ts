import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { budgetService } from "@/services/api-client/budget";
import { CreateBudgetDTO } from "@/types/budget";
import { usePermissions } from "@/hooks/usePermissions";

/**
 * Hook para gerenciar operações relacionadas a orçamentos
 */
export function useBudget() {
  const queryClient = useQueryClient();
  const { hasPermission } = usePermissions();

  // Query keys para React Query
  const QUERY_KEYS = {
    ALL_BUDGETS: ["budgets"],
    BUDGET_DETAILS: (id: number) => ["budgets", id],
    SERVICES: ["budgets", "services"],
  };

  /**
   * Verifica se o usuário tem permissão para acessar orçamentos
   */
  const canAccessBudgets = hasPermission("BUDGETS", "VIEW_ALL");

  /**
   * Obtém lista de orçamentos
   */
  const useBudgetsList = (page = 1, limit = 10) => {
    return useQuery({
      queryKey: [...QUERY_KEYS.ALL_BUDGETS, { page, limit }],
      queryFn: () => budgetService.getBudgets(page, limit),
      enabled: canAccessBudgets,
    });
  };

  /**
   * Obtém detalhes de um orçamento específico
   */
  const useBudgetDetails = (id: number) => {
    return useQuery({
      queryKey: QUERY_KEYS.BUDGET_DETAILS(id),
      queryFn: () => budgetService.getBudgetById(id),
      enabled: !!id && canAccessBudgets,
    });
  };

  /**
   * Cria uma nova solicitação de orçamento
   */
  const useCreateBudget = () => {
    return useMutation({
      mutationFn: (data: CreateBudgetDTO) => budgetService.createBudget(data),
      onSuccess: () => {
        if (canAccessBudgets) {
          queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ALL_BUDGETS });
        }
      },
    });
  };

  /**
   * Remove uma solicitação de orçamento
   */
  const useDeleteBudget = () => {
    return useMutation({
      mutationFn: (id: number) => budgetService.deleteBudget(id),
      onSuccess: (_, id) => {
        queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ALL_BUDGETS });
        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.BUDGET_DETAILS(id),
        });
      },
    });
  };

  /**
   * Obtém serviços disponíveis para orçamento
   */
  const useServices = () => {
    return useQuery({
      queryKey: QUERY_KEYS.SERVICES,
      queryFn: () => budgetService.getServices(),
    });
  };

  return {
    useBudgetsList,
    useBudgetDetails,
    useCreateBudget,
    useDeleteBudget,
    useServices,
  };
}
