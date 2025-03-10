import { RoleLevel } from "@/types/roles";

/**
 * Definição de permissões baseadas em recursos
 * Cada recurso tem um mapa de permissões por nível de acesso
 */
export const PERMISSIONS = {
  /**
   * Permissões para gerenciamento de usuários
   */
  USERS: {
    VIEW_ALL: [RoleLevel.ADMIN, RoleLevel.HR, RoleLevel.SUPER_ADMIN], // Quem pode ver todos os usuários
    CREATE: [RoleLevel.ADMIN, RoleLevel.SUPER_ADMIN], // Quem pode criar usuários
    UPDATE: [RoleLevel.ADMIN, RoleLevel.SUPER_ADMIN], // Quem pode atualizar usuários
    DELETE: [RoleLevel.SUPER_ADMIN], // Quem pode excluir usuários
  },

  /**
   * Permissões para gerenciamento de empresas
   */
  COMPANIES: {
    VIEW_ALL: [RoleLevel.ADMIN, RoleLevel.HR, RoleLevel.SUPER_ADMIN],
    CREATE: [RoleLevel.ADMIN, RoleLevel.SUPER_ADMIN],
    UPDATE: [RoleLevel.ADMIN, RoleLevel.SUPER_ADMIN],
    DELETE: [RoleLevel.SUPER_ADMIN],
  },

  /**
   * Permissões para gerenciamento de cursos
   */
  COURSES: {
    VIEW_ALL: [
      RoleLevel.TEACHER,
      RoleLevel.ADMIN,
      RoleLevel.PEDAGOGICAL,
      RoleLevel.SUPER_ADMIN,
    ],
    VIEW_OWN: [RoleLevel.STUDENT],
    CREATE: [
      RoleLevel.TEACHER,
      RoleLevel.ADMIN,
      RoleLevel.PEDAGOGICAL,
      RoleLevel.SUPER_ADMIN,
    ],
    UPDATE: [
      RoleLevel.TEACHER,
      RoleLevel.ADMIN,
      RoleLevel.PEDAGOGICAL,
      RoleLevel.SUPER_ADMIN,
    ],
    DELETE: [RoleLevel.ADMIN, RoleLevel.SUPER_ADMIN],
  },

  /**
   * Permissões para gerenciamento de vagas
   */
  VACANCIES: {
    VIEW_ALL: [RoleLevel.ADMIN, RoleLevel.HR, RoleLevel.SUPER_ADMIN],
    VIEW_OWN: [RoleLevel.COMPANY, RoleLevel.STUDENT],
    CREATE: [
      RoleLevel.COMPANY,
      RoleLevel.ADMIN,
      RoleLevel.HR,
      RoleLevel.SUPER_ADMIN,
    ],
    UPDATE: [
      RoleLevel.COMPANY,
      RoleLevel.ADMIN,
      RoleLevel.HR,
      RoleLevel.SUPER_ADMIN,
    ],
    DELETE: [
      RoleLevel.COMPANY,
      RoleLevel.ADMIN,
      RoleLevel.HR,
      RoleLevel.SUPER_ADMIN,
    ],
  },

  /**
   * Permissões para gerenciamento de orçamentos
   */
  BUDGETS: {
    VIEW_ALL: [RoleLevel.ADMIN, RoleLevel.HR, RoleLevel.SUPER_ADMIN],
    CREATE: [RoleLevel.COMPANY, RoleLevel.ADMIN, RoleLevel.SUPER_ADMIN],
    UPDATE: [RoleLevel.ADMIN, RoleLevel.SUPER_ADMIN],
    DELETE: [RoleLevel.ADMIN, RoleLevel.SUPER_ADMIN],
  },

  /**
   * Permissões para gerenciamento de CMS
   */
  CMS: {
    MANAGE_BANNER: [RoleLevel.ADMIN, RoleLevel.SUPER_ADMIN],
    MANAGE_SLIDER: [RoleLevel.ADMIN, RoleLevel.SUPER_ADMIN],
    MANAGE_CAROUSEL: [RoleLevel.ADMIN, RoleLevel.SUPER_ADMIN],
    MANAGE_BUSINESS_INFO: [RoleLevel.ADMIN, RoleLevel.SUPER_ADMIN],
    MANAGE_SITE_INFO: [RoleLevel.SUPER_ADMIN],
    MANAGE_SMTP: [RoleLevel.SUPER_ADMIN],
  },

  /**
   * Permissões para relatórios e analytics
   */
  REPORTS: {
    VIEW_BASIC: [
      RoleLevel.ADMIN,
      RoleLevel.HR,
      RoleLevel.PEDAGOGICAL,
      RoleLevel.SUPER_ADMIN,
    ],
    VIEW_FINANCIAL: [RoleLevel.ADMIN, RoleLevel.SUPER_ADMIN],
    EXPORT_DATA: [RoleLevel.ADMIN, RoleLevel.SUPER_ADMIN],
  },
};

/**
 * Mapeamento de níveis para nomes legíveis
 */
export const ROLE_NAMES = {
  [RoleLevel.TEACHER]: "Professor",
  [RoleLevel.STUDENT]: "Aluno/Candidato",
  [RoleLevel.COMPANY]: "Empresa",
  [RoleLevel.ADMIN]: "Administrador",
  [RoleLevel.RECRUITER]: "Recrutador",
  [RoleLevel.PEDAGOGICAL]: "Setor Pedagógico",
  [RoleLevel.HR]: "Recursos Humanos",
  [RoleLevel.SUPER_ADMIN]: "Super Administrador",
};
