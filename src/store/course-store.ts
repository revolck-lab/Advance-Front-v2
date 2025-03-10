import { create } from "zustand";
import { courseService } from "@/services/api-client/course";
import { CourseDetails, CourseFilters } from "@/types/course";

interface CourseState {
  // Estado
  courses: CourseDetails[];
  selectedCourse: CourseDetails | null;
  filters: CourseFilters;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  isLoading: boolean;
  error: string | null;

  // Ações
  fetchCourses: (page?: number, limit?: number) => Promise<void>;
  fetchCourseDetails: (id: number) => Promise<void>;
  setFilters: (filters: Partial<CourseFilters>) => void;
  clearFilters: () => void;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  clearSelectedCourse: () => void;
  clearError: () => void;
}

export const useCourseStore = create<CourseState>()((set, get) => ({
  // Estado inicial
  courses: [],
  selectedCourse: null,
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
  fetchCourses: async (page = 1, limit = 10) => {
    const { filters } = get();
    set({ isLoading: true, error: null });

    try {
      const response = await courseService.getCourses(filters, page, limit);

      set({
        courses: response.data || [],
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
        error: error.message || "Erro ao buscar cursos",
      });
    }
  },

  fetchCourseDetails: async (id: number) => {
    set({ isLoading: true, error: null });

    try {
      const response = await courseService.getCourseDetails(id);
      set({
        selectedCourse: response.data,
        isLoading: false,
      });
    } catch (error: any) {
      set({
        isLoading: false,
        error: error.message || "Erro ao buscar detalhes do curso",
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
    get().fetchCourses(page, get().pagination.limit);
  },

  setLimit: (limit) => {
    set((state) => ({
      pagination: { ...state.pagination, limit, page: 1 }, // Reinicia para página 1 ao alterar limite
    }));

    // Opcionalmente, recarrega os dados automaticamente
    get().fetchCourses(1, limit);
  },

  clearSelectedCourse: () => {
    set({ selectedCourse: null });
  },

  clearError: () => {
    set({ error: null });
  },
}));
