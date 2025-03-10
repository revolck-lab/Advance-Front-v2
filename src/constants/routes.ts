/**
 * Constantes para rotas internas do app
 * Organiza a navegação do frontend e evita hardcoding de URLs
 */
export const APP_ROUTES = {
  // Rotas públicas
  PUBLIC: {
    HOME: "/",
    ABOUT: "/sobre",
    COURSES: "/cursos",
    COURSE_DETAILS: (id: string | number) => `/cursos/${id}`,
    VACANCIES: "/vagas",
    VACANCY_DETAILS: (id: string | number) => `/vagas/${id}`,
    RECRUITMENT: "/recrutamento-selecao",
    TRAINING: "/treinamento-in-company",
    BLOG: "/blog",
    BLOG_POST: (slug: string) => `/blog/${slug}`,
    CONTACT: "/contato",
    PRIVACY: "/politica-privacidade",
  },

  // Rotas de autenticação
  AUTH: {
    LOGIN: "/login",
    REGISTER: "/registro",
    PASSWORD_RECOVERY: "/recuperar-senha",
    PASSWORD_RESET: "/redefinir-senha",
  },

  // Rotas do dashboard
  DASHBOARD: {
    HOME: "/dashboard",
    PROFILE: "/dashboard/perfil",

    // Professor (Nível 1)
    TEACHER: {
      HOME: "/dashboard/professor",
      COURSES: "/dashboard/professor/cursos",
      COURSE_DETAILS: (id: string | number) =>
        `/dashboard/professor/cursos/${id}`,
      STUDENTS: (courseId: string | number) =>
        `/dashboard/professor/cursos/${courseId}/alunos`,
    },

    // Aluno (Nível 2)
    STUDENT: {
      HOME: "/dashboard/aluno",
      COURSES: "/dashboard/aluno/cursos",
      COURSE_DETAILS: (id: string | number) => `/dashboard/aluno/cursos/${id}`,
      APPLICATIONS: "/dashboard/aluno/candidaturas",
    },

    // Empresa (Nível 3)
    COMPANY: {
      HOME: "/dashboard/empresa",
      VACANCIES: "/dashboard/empresa/vagas",
      VACANCY_CREATE: "/dashboard/empresa/vagas/criar",
      VACANCY_DETAILS: (id: string | number) =>
        `/dashboard/empresa/vagas/${id}`,
      CANDIDATES: (vacancyId: string | number) =>
        `/dashboard/empresa/vagas/${vacancyId}/candidatos`,
      SUBSCRIPTION: "/dashboard/empresa/assinatura",
    },

    // Admin (Nível 4)
    ADMIN: {
      HOME: "/dashboard/administrador",
      USERS: "/dashboard/administrador/usuarios",
      USER_DETAILS: (id: string | number) =>
        `/dashboard/administrador/usuarios/${id}`,
      CMS: "/dashboard/administrador/cms",
      CMS_BANNERS: "/dashboard/administrador/cms/banners",
      CMS_SLIDERS: "/dashboard/administrador/cms/sliders",
      CMS_BUSINESS: "/dashboard/administrador/cms/business-info",
      REPORTS: "/dashboard/administrador/relatorios",
    },

    // Demais níveis seguem o mesmo padrão...
  },
};
