/**
 * Arquivo de dados do site
 * Contém informações centralizadas que podem ser gerenciadas por um CMS
 */

// Tipos para os dados do site
export interface SocialMediaLink {
  id: string; // Identificador único (útil para CMS)
  platform: string; // Nome da plataforma
  url: string; // URL completo da rede social
  icon: string; // Nome do ícone (para compatibilidade com diversos pacotes de ícones)
  isActive: boolean; // Controla se o link deve ser exibido
}

export interface SiteLink {
  id: string; // Identificador único (útil para CMS)
  label: string; // Texto a ser exibido
  href: string; // Caminho do link
  isExternal: boolean; // Se o link é externo (abre em nova aba)
  isActive: boolean; // Controla se o link deve ser exibido
}

export interface CompanyContact {
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  whatsapp?: string;
}

// Dados de redes sociais
export const socialMediaLinks: SocialMediaLink[] = [
  {
    id: 'instagram',
    platform: 'Instagram',
    url: 'https://instagram.com/advancemais',
    icon: 'Instagram',
    isActive: true,
  },
  {
    id: 'facebook',
    platform: 'Facebook',
    url: 'https://facebook.com/advancemais',
    icon: 'Facebook',
    isActive: true,
  },
  {
    id: 'linkedin',
    platform: 'LinkedIn',
    url: 'https://linkedin.com/company/advancemais',
    icon: 'Linkedin',
    isActive: true,
  },
  {
    id: 'youtube',
    platform: 'YouTube',
    url: 'https://youtube.com/c/advancemais',
    icon: 'Youtube',
    isActive: true,
  },
  {
    id: 'twitter',
    platform: 'Twitter',
    url: 'https://twitter.com/advancemais',
    icon: 'Twitter',
    isActive: false, // Exemplo de rede social desativada
  },
];

// Links do top header
export const topHeaderLinks: SiteLink[] = [
  {
    id: 'empresas',
    label: 'Empresas',
    href: '/empresas',
    isExternal: false,
    isActive: true,
  },
  {
    id: 'sobre',
    label: 'Estudantes',
    href: '/sobre',
    isExternal: false,
    isActive: true,
  },
  {
    id: 'politica-privacidade',
    label: 'Empregos',
    href: '/politica-privacidade',
    isExternal: false,
    isActive: true,
  },
];

// Links principais de navegação
export const mainNavigationLinks: SiteLink[] = [
  {
    id: 'home',
    label: 'Início',
    href: '/',
    isExternal: false,
    isActive: true,
  },
  {
    id: 'cursos',
    label: 'Cursos',
    href: '/cursos',
    isExternal: false,
    isActive: true,
  },
  {
    id: 'vagas',
    label: 'Vagas',
    href: '/vagas',
    isExternal: false,
    isActive: true,
  },
  {
    id: 'blog',
    label: 'Blog',
    href: '/blog',
    isExternal: false,
    isActive: true,
  },
  {
    id: 'recrutamento',
    label: 'Recrutamento',
    href: '/recrutamento-selecao',
    isExternal: false,
    isActive: true,
  },
  {
    id: 'treinamento',
    label: 'Treinamentos',
    href: '/treinamento-in-company',
    isExternal: false,
    isActive: true,
  },
];

// Links do rodapé - organizados por seção
export const footerLinks = {
  company: [
    {
      id: 'sobre-footer',
      label: 'Sobre Nós',
      href: '/sobre',
      isExternal: false,
      isActive: true,
    },
    {
      id: 'equipe',
      label: 'Nossa Equipe',
      href: '/equipe',
      isExternal: false,
      isActive: true,
    },
    {
      id: 'depoimentos',
      label: 'Depoimentos',
      href: '/depoimentos',
      isExternal: false,
      isActive: true,
    },
  ],
  services: [
    {
      id: 'recrutamento-footer',
      label: 'Recrutamento & Seleção',
      href: '/recrutamento-selecao',
      isExternal: false,
      isActive: true,
    },
    {
      id: 'treinamento-footer',
      label: 'Treinamento In Company',
      href: '/treinamento-in-company',
      isExternal: false,
      isActive: true,
    },
    {
      id: 'cursos-footer',
      label: 'Cursos Online',
      href: '/cursos',
      isExternal: false,
      isActive: true,
    },
  ],
  support: [
    {
      id: 'faq',
      label: 'Perguntas Frequentes',
      href: '/faq',
      isExternal: false,
      isActive: true,
    },
    {
      id: 'contato-footer',
      label: 'Contato',
      href: '/contato',
      isExternal: false,
      isActive: true,
    },
    {
      id: 'termos',
      label: 'Termos de Uso',
      href: '/termos-de-uso',
      isExternal: false,
      isActive: true,
    },
    {
      id: 'privacidade-footer',
      label: 'Política de Privacidade',
      href: '/politica-privacidade',
      isExternal: false,
      isActive: true,
    },
  ],
};

// Informações de contato da empresa
export const companyContact: CompanyContact = {
  email: 'contato@advancemais.com.br',
  phone: '(11) 1234-5678',
  whatsapp: '(11) 98765-4321',
  address: 'Av. Paulista, 1000',
  city: 'São Paulo',
  state: 'SP',
  zipCode: '01310-100',
};

// Informações da empresa
export const companyInfo = {
  name: 'Advancemais',
  legalName: 'Advancemais Treinamento e Recrutamento Ltda.',
  cnpj: '12.345.678/0001-90',
  foundedYear: 2015,
  slogan: 'Avançando com seu potencial',
  description: 'Soluções integradas para educação corporativa e recrutamento especializado.',
};
