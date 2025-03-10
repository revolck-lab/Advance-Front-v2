import { create } from "zustand";
import { vacancyService } from "@/services/api-client/vacancies";
import { VacancyDetails, VacancyFilters, Application } from "@/types/vacancies";

interface VacancyState {
  // Estado
  vacancies: VacancyDetails[];
  selectedVacancy: VacancyDetails | null;
  applications: Application[];
  filters: VacancyFilters;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  isLoading: boolean;
  error: string | null;

  // Ações
  fetchVacancies: (page?: number, limit?: number) => Promise<void>;
  fetchVacancyDetails: (id: number) => Promise<void>;
  fetchApplications: (
    vacancyId: number,
    page?: number,
    limit?: number,
  ) => Promise<void>;
  setFilters: (filters: Partial<VacancyFilters>) => void;
  clearFilters: () => void;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  clearSelectedVacancy: () => void;
  clearError: () => void;
}

export const useVacancyStore = create<VacancyState>()((set, get) => ({
  // Estado inicial
  vacancies: [],
  selectedVacancy: null,
  applications: [],
  filters: {},
  pagination: {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  },
  isLoading: false,
  error: null,

  // Ações
  fetchVacancies: async (page = 1, limit = 10) => {
    const { filters } = get();
    set({ isLoading: true, error: null });

    try {
      const response = await vacancyService.getVacancies(filters, page, limit);

      set({
        vacancies: response.data || [],
        pagination: {
          page: response.page || 1,
          limit: response.limit || 10,
          total: response.total || 0,
          totalPages: response.totalPages || 0,
        },
        isLoading: false,
      });
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.message || "Erro ao buscar vagas",
      });
    }
  },

  fetchVacancyDetails: async (id: number) => {
    set({ isLoading: true, error: null });

    try {
      const response = await vacancyService.getVacancyDetails(id);
      set({
        selectedVacancy: response.data,
        isLoading: false,
      });
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.message || "Erro ao buscar detalhes da vaga",
      });
    }
  },

  fetchApplications: async (vacancyId: number, page = 1, limit = 10) => {
    set({ isLoading: true, error: null });

    try {
      const response = await vacancyService.getVacancyApplications(
        vacancyId,
        page,
        limit,
      );
      set({
        applications: response.data || [],
        isLoading: false,
      });
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.message || "Erro ao buscar candidaturas",
      });
    }
  },

  setFilters: (newFilters) => {
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
      pagination: { ...state.pagination, page: 1 }, // Reinicia para página 1 ao alterar filtros
    }));
  },

  clearFilters: () => {
    set({
      filters: {},
      pagination: { ...get().pagination, page: 1 },
    });
  },

  setPage: (page) => {
    set((state) => ({
      pagination: { ...state.pagination, page },
    }));

    // Opcionalmente, recarrega os dados automaticamente
    get().fetchVacancies(page, get().pagination.limit);
  },

  setLimit: (limit) => {
    set((state) => ({
      pagination: { ...state.pagination, limit, page: 1 }, // Reinicia para página 1 ao alterar limite
    }));

    // Opcionalmente, recarrega os dados automaticamente
    get().fetchVacancies(1, limit);
  },

  clearSelectedVacancy: () => {
    set({ selectedVacancy: null });
  },

  clearError: () => {
    set({ error: null });
  },
}));
