import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { vacancyService } from "@/services/api-client/vacancies";
import {
  VacancyFilters,
  CreateVacancyDTO,
  UpdateVacancyDTO,
  CreateApplicationDTO,
} from "@/types/vacancies";
import { usePermissions } from "@/hooks/usePermissions";
import { RoleLevel } from "@/types/roles";
import { useAuthStore } from "@/store/auth-store";

/**
 * Hook para gerenciar operações relacionadas a vagas
 */
export function useVacancies() {
  const queryClient = useQueryClient();
  const { userRoleLevel } = usePermissions();
  const { user } = useAuthStore();

  // Query keys para React Query
  const QUERY_KEYS = {
    ALL_VACANCIES: ["vacancies"],
    VACANCY_DETAILS: (id: number) => ["vacancies", id],
    COMPANY_VACANCIES: (companyId: number) => [
      "vacancies",
      "company",
      companyId,
    ],
    USER_APPLICATIONS: ["applications", "user"],
    VACANCY_APPLICATIONS: (vacancyId: number) => [
      "applications",
      "vacancy",
      vacancyId,
    ],
    AREAS: ["vacancies", "areas"],
  };

  /**
   * Obtém lista de vagas com paginação e filtros
   */
  const useVacanciesList = (filters?: VacancyFilters, page = 1, limit = 10) => {
    return useQuery({
      queryKey: [...QUERY_KEYS.ALL_VACANCIES, { filters, page, limit }],
      queryFn: () => vacancyService.getVacancies(filters, page, limit),
    });
  };

  /**
   * Obtém detalhes de uma vaga específica
   */
  const useVacancyDetails = (id: number) => {
    return useQuery({
      queryKey: QUERY_KEYS.VACANCY_DETAILS(id),
      queryFn: () => vacancyService.getVacancyDetails(id),
      enabled: !!id,
    });
  };

  /**
   * Obtém vagas da empresa logada (para empresas)
   */
  const useCompanyVacancies = (page = 1, limit = 10) => {
    const isCompany = userRoleLevel === RoleLevel.COMPANY;
    const companyId = user?.id || 0;

    return useQuery({
      queryKey: [...QUERY_KEYS.COMPANY_VACANCIES(companyId), { page, limit }],
      queryFn: () => vacancyService.getCompanyVacancies(companyId, page, limit),
      enabled: isCompany && !!companyId,
    });
  };

  /**
   * Cria uma nova vaga
   */
  const useCreateVacancy = () => {
    return useMutation({
      mutationFn: (data: CreateVacancyDTO) =>
        vacancyService.createVacancy(data),
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ALL_VACANCIES });
        if (user?.id) {
          queryClient.invalidateQueries({
            queryKey: QUERY_KEYS.COMPANY_VACANCIES(user.id),
          });
        }
      },
    });
  };

  /**
   * Atualiza uma vaga existente
   */
  const useUpdateVacancy = (id: number) => {
    return useMutation({
      mutationFn: (data: UpdateVacancyDTO) =>
        vacancyService.updateVacancy(id, data),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.VACANCY_DETAILS(id),
        });
        queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ALL_VACANCIES });
        if (user?.id) {
          queryClient.invalidateQueries({
            queryKey: QUERY_KEYS.COMPANY_VACANCIES(user.id),
          });
        }
      },
    });
  };

  /**
   * Remove uma vaga
   */
  const useDeleteVacancy = () => {
    return useMutation({
      mutationFn: (id: number) => vacancyService.deleteVacancy(id),
      onSuccess: (_, id) => {
        queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ALL_VACANCIES });
        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.VACANCY_DETAILS(id),
        });
        if (user?.id) {
          queryClient.invalidateQueries({
            queryKey: QUERY_KEYS.COMPANY_VACANCIES(user.id),
          });
        }
      },
    });
  };

  /**
   * Candidata-se a uma vaga
   */
  const useApplyToVacancy = () => {
    return useMutation({
      mutationFn: (data: CreateApplicationDTO) =>
        vacancyService.applyToVacancy(data),
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.USER_APPLICATIONS,
        });
        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.VACANCY_APPLICATIONS(variables.vacancy_id),
        });
      },
    });
  };

  /**
   * Obtém candidaturas do usuário logado
   */
  const useUserApplications = (page = 1, limit = 10) => {
    const isStudent = userRoleLevel === RoleLevel.STUDENT;

    return useQuery({
      queryKey: [...QUERY_KEYS.USER_APPLICATIONS, { page, limit }],
      queryFn: () => vacancyService.getUserApplications(page, limit),
      enabled: isStudent,
    });
  };

  /**
   * Obtém candidaturas de uma vaga específica (para empresas)
   */
  const useVacancyApplications = (vacancyId: number, page = 1, limit = 10) => {
    const isCompany = userRoleLevel === RoleLevel.COMPANY;

    return useQuery({
      queryKey: [
        ...QUERY_KEYS.VACANCY_APPLICATIONS(vacancyId),
        { page, limit },
      ],
      queryFn: () =>
        vacancyService.getVacancyApplications(vacancyId, page, limit),
      enabled: isCompany && !!vacancyId,
    });
  };

  /**
   * Obtém áreas de trabalho (para filtros e cadastro)
   */
  const useAreas = () => {
    return useQuery({
      queryKey: QUERY_KEYS.AREAS,
      queryFn: () => vacancyService.getAreas(),
    });
  };

  return {
    useVacanciesList,
    useVacancyDetails,
    useCompanyVacancies,
    useCreateVacancy,
    useUpdateVacancy,
    useDeleteVacancy,
    useApplyToVacancy,
    useUserApplications,
    useVacancyApplications,
    useAreas,
  };
}
