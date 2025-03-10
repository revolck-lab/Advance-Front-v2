import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { courseService } from "@/services/api-client/course";
import {
  CourseFilters,
  CreateCourseDTO,
  UpdateCourseDTO,
} from "@/types/course";
import { usePermissions } from "@/hooks/usePermissions";
import { RoleLevel } from "@/types/roles";

/**
 * Hook para gerenciar operações relacionadas a cursos
 */
export function useCourses() {
  const queryClient = useQueryClient();
  const { userRoleLevel } = usePermissions();

  // Query keys para React Query
  const QUERY_KEYS = {
    ALL_COURSES: ["courses"],
    COURSE_DETAILS: (id: number) => ["courses", id],
    INSTRUCTOR_COURSES: ["courses", "instructor"],
    ENROLLED_COURSES: ["courses", "enrolled"],
    CATEGORIES: ["courses", "categories"],
    MODALITIES: ["courses", "modalities"],
  };

  /**
   * Obtém lista de cursos com paginação e filtros
   */
  const useCoursesList = (filters?: CourseFilters, page = 1, limit = 10) => {
    return useQuery({
      queryKey: [...QUERY_KEYS.ALL_COURSES, { filters, page, limit }],
      queryFn: () => courseService.getCourses(filters, page, limit),
    });
  };

  /**
   * Obtém detalhes de um curso específico
   */
  const useCourseDetails = (id: number) => {
    return useQuery({
      queryKey: QUERY_KEYS.COURSE_DETAILS(id),
      queryFn: () => courseService.getCourseDetails(id),
      enabled: !!id,
    });
  };

  /**
   * Obtém cursos do instrutor logado (para professores)
   */
  const useInstructorCourses = (page = 1, limit = 10) => {
    const isInstructor = userRoleLevel === RoleLevel.TEACHER;

    return useQuery({
      queryKey: [...QUERY_KEYS.INSTRUCTOR_COURSES, { page, limit }],
      queryFn: () => courseService.getInstructorCourses(page, limit),
      enabled: isInstructor,
    });
  };

  /**
   * Obtém cursos matriculados (para alunos)
   */
  const useEnrolledCourses = (page = 1, limit = 10) => {
    const isStudent = userRoleLevel === RoleLevel.STUDENT;

    return useQuery({
      queryKey: [...QUERY_KEYS.ENROLLED_COURSES, { page, limit }],
      queryFn: () => courseService.getEnrolledCourses(page, limit),
      enabled: isStudent,
    });
  };

  /**
   * Cria um novo curso
   */
  const useCreateCourse = () => {
    return useMutation({
      mutationFn: (data: CreateCourseDTO) => courseService.createCourse(data),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ALL_COURSES });
        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.INSTRUCTOR_COURSES,
        });
      },
    });
  };

  /**
   * Atualiza um curso existente
   */
  const useUpdateCourse = (id: number) => {
    return useMutation({
      mutationFn: (data: UpdateCourseDTO) =>
        courseService.updateCourse(id, data),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.COURSE_DETAILS(id),
        });
        queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ALL_COURSES });
        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.INSTRUCTOR_COURSES,
        });
      },
    });
  };

  /**
   * Remove um curso
   */
  const useDeleteCourse = () => {
    return useMutation({
      mutationFn: (id: number) => courseService.deleteCourse(id),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ALL_COURSES });
        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.INSTRUCTOR_COURSES,
        });
      },
    });
  };

  /**
   * Matricula um aluno em um curso
   */
  const useEnrollInCourse = () => {
    return useMutation({
      mutationFn: (courseId: number) => courseService.enrollInCourse(courseId),
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.ENROLLED_COURSES,
        });
      },
    });
  };

  /**
   * Obtém categorias de cursos
   */
  const useCourseCategories = () => {
    return useQuery({
      queryKey: QUERY_KEYS.CATEGORIES,
      queryFn: () => courseService.getCategories(),
    });
  };

  /**
   * Obtém modalidades de cursos
   */
  const useCourseModalities = () => {
    return useQuery({
      queryKey: QUERY_KEYS.MODALITIES,
      queryFn: () => courseService.getModalities(),
    });
  };

  return {
    useCoursesList,
    useCourseDetails,
    useInstructorCourses,
    useEnrolledCourses,
    useCreateCourse,
    useUpdateCourse,
    useDeleteCourse,
    useEnrollInCourse,
    useCourseCategories,
    useCourseModalities,
  };
}
