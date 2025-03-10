import { TimeStamps } from "@/types/shared/common";

// Tipo para curso
export interface Course extends TimeStamps {
  id: number;
  title: string;
  description: string;
  category_id: number;
  instructor_id: number;
  course_image_id: number;
  thumbnail_id: number;
  modality_id: number;
  workload: number;
  vacancies: number;
  price: number;
  start_time: string;
  end_time: string;
}

// Tipo para detalhes completos do curso
export interface CourseDetails extends Course {
  category_name: string;
  modality_name: string;
  course_image_url: string;
  thumbnail_url: string;
  instructor_name?: string;
}

// Tipo para criação de curso
export interface CreateCourseDTO {
  title: string;
  description: string;
  category_id: number;
  instructor_id: number;
  modality_id: number;
  workload: number;
  vacancies: number;
  price: number;
  start_time: string;
  end_time: string;
  course_image: {
    url: string;
    title?: string;
    description?: string;
  };
  course_thumbnail: {
    thumbnail_url: string;
    title?: string;
    description?: string;
  };
}

// Tipo para atualização de curso
export interface UpdateCourseDTO {
  title?: string;
  description?: string;
  category_id?: number;
  instructor_id?: number;
  modality_id?: number;
  workload?: number;
  vacancies?: number;
  price?: number;
  start_time?: string;
  end_time?: string;
}

// Tipo para filtros de cursos
export interface CourseFilters {
  category_id?: number;
  modality_id?: number;
  instructor_id?: number;
  price_min?: number;
  price_max?: number;
  start_date?: string;
  end_date?: string;
}

// Tipo para categoria de curso
export interface Category {
  id: number;
  name: string;
}

// Tipo para modalidade de curso
export interface Modality {
  id: number;
  name: string;
}

// Tipo para imagem de curso
export interface CourseImage {
  id: number;
  url: string;
  title?: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

// Tipo para thumbnail de curso
export interface CourseThumbnail {
  id: number;
  thumbnail_url: string;
  title?: string;
  description?: string;
  created_at: string;
  updated_at: string;
}
