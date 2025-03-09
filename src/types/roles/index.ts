export enum Role {
  TEACHER = 1,
  STUDENT = 2,
  COMPANY = 3,
  ADMIN = 4,
  RECRUITER = 5,
  PEDAGOGICAL = 6,
  HR = 7,
  SUPER_ADMIN = 8,
}

export interface RoleDetails {
  id: number;
  name: string;
  level: number;
}
