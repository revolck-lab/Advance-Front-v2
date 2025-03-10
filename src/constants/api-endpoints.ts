/**
 * Constantes de endpoints da API organizadas por domínio
 * Facilita manutenção centralizada e previne erros de digitação
 */
export const API_ROUTES = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    REFRESH_TOKEN: "/auth/refresh",
    PASSWORD_RECOVERY: "/password/recovery",
    PASSWORD_RESET: "/password/reset",
  },
  USERS: {
    BASE: "/users",
    PROFILE: "/users/profile",
    ADDRESS: "/users/address",
  },
  COMPANY: {
    BASE: "/company",
    PROFILE: "/company/profile",
  },
  COURSE: {
    BASE: "/course",
    DETAILS: (id: string | number) => `/course/getDetails/${id}`,
    LIST: "/course/get",
    CREATE: "/course/create",
  },
  VACANCY: {
    BASE: "/vacancy",
    DETAILS: (id: string | number) => `/vacancy/${id}`,
    LIST: "/vacancy",
    CREATE: "/vacancy",
    DELETE: (id: string | number) => `/vacancy/${id}`,
    UPDATE: (id: string | number) => `/vacancy/${id}`,
  },
  BUDGET: {
    BASE: "/budget",
    DETAILS: (id: string | number) => `/budget/${id}`,
    LIST: "/budget",
    CREATE: "/budget",
  },
  CMS: {
    BANNER: {
      BASE: "/banner",
      LIST: "/banner",
      CREATE: "/banner",
      UPDATE: (id: string | number) => `/banner/${id}`,
      DELETE: (id: string | number) => `/banner/${id}`,
    },
    SLIDER: {
      BASE: "/slider",
      LIST: "/slider",
      CREATE: "/slider",
      UPDATE: (id: string | number) => `/slider/${id}`,
      DELETE: (id: string | number) => `/slider/${id}`,
    },
    CAROUSEL: {
      BASE: "/carousel",
      LIST: "/carousel",
      CREATE: "/carousel",
      UPDATE: (id: string | number) => `/carousel/${id}`,
      DELETE: (id: string | number) => `/carousel/${id}`,
    },
    CAROUSEL_COMPANY: {
      BASE: "/carouselCompany",
      LIST: "/carouselCompany",
      CREATE: "/carouselCompany",
      UPDATE: (id: string | number) => `/carouselCompany/${id}`,
      DELETE: (id: string | number) => `/carouselCompany/${id}`,
    },
    BUSINESS_INFO: {
      BASE: "/business_info",
      LIST: "/business_info",
      CREATE: "/business_info",
      UPDATE: (id: string | number) => `/business_info/${id}`,
      DELETE: (id: string | number) => `/business_info/${id}`,
    },
    SUPER_ADMIN: {
      BASE: "/superAdmin",
      SMTP: "/superAdmin/smtp",
      SMTP_UPDATE: (id: string | number) => `/superAdmin/smtp/${id}`,
      SITE_INFO: (id: string | number) => `/superAdmin/site-info/${id}`,
      SITE_INFO_CREATE: "/superAdmin/site-info",
      SITE_INFO_UPDATE: (id: string | number) => `/superAdmin/site-info/${id}`,
    },
  },
};
