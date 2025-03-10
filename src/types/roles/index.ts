import { TimeStamps } from "@/types/shared/common";

// Tipo para papéis/funções
export interface Role extends TimeStamps {
  id: number;
  name: string;
  level: number;
  status: 0 | 1; // 0 = inativo, 1 = ativo
}

// Tipo para criação de papel/função
export interface CreateRoleDTO {
  name: string;
  level: number;
  status: 0 | 1;
}

// Tipo para atualização de papel/função
export interface UpdateRoleDTO {
  name?: string;
  level?: number;
  status?: 0 | 1;
}

// Níveis de acesso definidos pelo sistema
export enum RoleLevel {
  TEACHER = 1, // Professor
  STUDENT = 2, // Aluno/Candidato
  COMPANY = 3, // Empresa
  ADMIN = 4, // Administrador
  RECRUITER = 5, // Recrutador
  PEDAGOGICAL = 6, // Setor Pedagógico
  HR = 7, // Recursos Humanos
  SUPER_ADMIN = 8, // Super Administrador
}

// Mapeamento de permissões por nível
export const AccessLevelMap: Record<
  RoleLevel,
  {
    name: string;
    accessibleLevels: RoleLevel[];
  }
> = {
  [RoleLevel.TEACHER]: {
    name: "Professor",
    accessibleLevels: [RoleLevel.TEACHER],
  },
  [RoleLevel.STUDENT]: {
    name: "Aluno/Candidato",
    accessibleLevels: [RoleLevel.STUDENT],
  },
  [RoleLevel.COMPANY]: {
    name: "Empresa",
    accessibleLevels: [RoleLevel.COMPANY],
  },
  [RoleLevel.ADMIN]: {
    name: "Administrador",
    accessibleLevels: [
      RoleLevel.TEACHER,
      RoleLevel.STUDENT,
      RoleLevel.COMPANY,
      RoleLevel.ADMIN,
    ],
  },
  [RoleLevel.RECRUITER]: {
    name: "Recrutador",
    accessibleLevels: [RoleLevel.RECRUITER],
  },
  [RoleLevel.PEDAGOGICAL]: {
    name: "Setor Pedagógico",
    accessibleLevels: [
      RoleLevel.TEACHER,
      RoleLevel.STUDENT,
      RoleLevel.PEDAGOGICAL,
    ],
  },
  [RoleLevel.HR]: {
    name: "Recursos Humanos",
    accessibleLevels: [RoleLevel.COMPANY, RoleLevel.RECRUITER, RoleLevel.HR],
  },
  [RoleLevel.SUPER_ADMIN]: {
    name: "Super Administrador",
    accessibleLevels: [
      RoleLevel.TEACHER,
      RoleLevel.STUDENT,
      RoleLevel.COMPANY,
      RoleLevel.ADMIN,
      RoleLevel.RECRUITER,
      RoleLevel.PEDAGOGICAL,
      RoleLevel.HR,
      RoleLevel.SUPER_ADMIN,
    ],
  },
};

// Utilitário para verificar se um nível pode acessar outro nível
export const canAccessLevel = (
  userLevel: RoleLevel,
  targetLevel: RoleLevel,
): boolean => {
  return AccessLevelMap[userLevel].accessibleLevels.includes(targetLevel);
};

// Função para obter o nome de um nível de acesso
export const getRoleName = (level: RoleLevel): string => {
  return AccessLevelMap[level]?.name || "Desconhecido";
};
