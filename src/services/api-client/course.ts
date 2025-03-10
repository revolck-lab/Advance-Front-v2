import { apiClient } from "@/lib/axios-config";
import { API_ROUTES } from "@/constants/api-endpoints";
import {
  Course,
  CourseDetails,
  CreateCourseDTO,
  UpdateCourseDTO,
  CourseFilters,
} from "@/types/course";
import { ApiResponse, ApiListResponse } from "@/types/shared/api-responses";

/**
 * Serviço para gerenciamento de cursos
 */
export const courseService = {
  /**
   * Obtém lista de cursos com paginação e filtros
   */
  async getCourses(
    filters?: CourseFilters,
    page = 1,
    limit = 10,
  ): Promise<ApiListResponse<CourseDetails>> {
    const params = { ...filters, page, limit };
    const response = await apiClient.get<ApiListResponse<CourseDetails>>(
      API_ROUTES.COURSE.LIST,
      { params },
    );
    return response.data;
  },

  /**
   * Obtém detalhes de um curso específico
   */
  async getCourseDetails(id: number): Promise<ApiResponse<CourseDetails>> {
    const response = await apiClient.get<ApiResponse<CourseDetails>>(
      API_ROUTES.COURSE.DETAILS(id),
    );
    return response.data;
  },

  /**
   * Cria um novo curso
   */
  async createCourse(data: CreateCourseDTO): Promise<ApiResponse<Course>> {
    const response = await apiClient.post<ApiResponse<Course>>(
      API_ROUTES.COURSE.CREATE,
      data,
    );
    return response.data;
  },

  /**
   * Atualiza um curso existente
   */
  async updateCourse(
    id: number,
    data: UpdateCourseDTO,
  ): Promise<ApiResponse<Course>> {
    const endpoint = `${API_ROUTES.COURSE.BASE}/${id}`;
    const response = await apiClient.put<ApiResponse<Course>>(endpoint, data);
    return response.data;
  },

  /**
   * Remove um curso
   */
  async deleteCourse(id: number): Promise<ApiResponse<void>> {
    const endpoint = `${API_ROUTES.COURSE.BASE}/${id}`;
    const response = await apiClient.delete<ApiResponse<void>>(endpoint);
    return response.data;
  },

  /**
   * Obtém cursos do instrutor logado (para professores)
   */
  async getInstructorCourses(
    page = 1,
    limit = 10,
  ): Promise<ApiListResponse<CourseDetails>> {
    const endpoint = `${API_ROUTES.COURSE.BASE}/instructor`;
    const response = await apiClient.get<ApiListResponse<CourseDetails>>(
      endpoint,
      {
        params: { page, limit },
      },
    );
    return response.data;
  },

  /**
   * Obtém cursos matriculados (para alunos)
   */
  async getEnrolledCourses(
    page = 1,
    limit = 10,
  ): Promise<ApiListResponse<CourseDetails>> {
    const endpoint = `${API_ROUTES.COURSE.BASE}/enrolled`;
    const response = await apiClient.get<ApiListResponse<CourseDetails>>(
      endpoint,
      {
        params: { page, limit },
      },
    );
    return response.data;
  },

  /**
   * Matricula um aluno em um curso
   */
  async enrollInCourse(courseId: number): Promise<ApiResponse<any>> {
    const endpoint = `${API_ROUTES.COURSE.BASE}/${courseId}/enroll`;
    const response = await apiClient.post<ApiResponse<any>>(endpoint);
    return response.data;
  },

  /**
   * Obtém categorias de cursos
   */
  async getCategories(): Promise<ApiListResponse<any>> {
    const endpoint = `${API_ROUTES.COURSE.BASE}/categories`;
    const response = await apiClient.get<ApiListResponse<any>>(endpoint);
    return response.data;
  },

  /**
   * Obtém modalidades de cursos
   */
  async getModalities(): Promise<ApiListResponse<any>> {
    const endpoint = `${API_ROUTES.COURSE.BASE}/modalities`;
    const response = await apiClient.get<ApiListResponse<any>>(endpoint);
    return response.data;
  },
};
