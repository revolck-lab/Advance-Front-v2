/**
 * Chaves para o React Query
 * Organizadas de forma hierárquica para evitar conflitos e facilitar invalidação
 */
export const QUERY_KEYS = {
  AUTH: {
    USER: "auth-user",
    SESSION: "auth-session",
  },
  USERS: {
    ALL: "users",
    DETAILS: (id: string | number) => ["users", id],
    PROFILE: "user-profile",
  },
  COMPANIES: {
    ALL: "companies",
    DETAILS: (id: string | number) => ["companies", id],
    PROFILE: "company-profile",
  },
  COURSES: {
    ALL: "courses",
    DETAILS: (id: string | number) => ["courses", id],
    BY_CATEGORY: (categoryId: string | number) => [
      "courses",
      "category",
      categoryId,
    ],
  },
  VACANCIES: {
    ALL: "vacancies",
    DETAILS: (id: string | number) => ["vacancies", id],
    BY_COMPANY: (companyId: string | number) => [
      "vacancies",
      "company",
      companyId,
    ],
  },
  CMS: {
    BANNERS: "banners",
    SLIDERS: "sliders",
    CAROUSEL: "carousel",
    CAROUSEL_COMPANY: "carousel-company",
    BUSINESS_INFO: "business-info",
    SMTP: "smtp",
    SITE_INFO: "site-info",
  },
  DASHBOARD: {
    STATS: "dashboard-stats",
    RECENT_ACTIVITIES: "recent-activities",
  },
};
