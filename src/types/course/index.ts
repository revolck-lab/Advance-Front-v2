export interface Course {
  id: number;
  title: string;
  description: string;
  price: number;
  workload: number;
  vacancies: number;
  category_name: string;
  modality_name: string;
  image_url: string;
  thumbnail_url: string;
  category_id: number;
  modality_id: number;
}
