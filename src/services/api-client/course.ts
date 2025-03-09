import apiClient from "@/services/api-client";
import { Course } from "@/types/course";
import { ApiResponse } from "@/types/shared";

export const getCourses = async (params: {
  category_id?: number;
  modality_id?: number;
}) => {
  const response = await apiClient.get<ApiResponse<Course[]>>(
    "/api/course/get",
    { params }
  );
  return response.data;
};

export const getCourseDetails = async (id: number) => {
  const response = await apiClient.get<ApiResponse<Course>>(
    `/api/course/getDetails/${id}`
  );
  return response.data;
};
