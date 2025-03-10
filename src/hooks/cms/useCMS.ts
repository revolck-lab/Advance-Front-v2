import { useBanners } from "./useBanners";
import { useSliders } from "./useSliders";
import { useSuperAdmin } from "./useSuperAdmin";
import { usePermissions } from "@/hooks/usePermissions";

/**
 * Hook principal para gerenciamento de CMS
 * Centraliza acesso a todos os hooks de CMS específicos
 * e verifica permissões de acesso
 */
export function useCMS() {
  const { hasPermission } = usePermissions();

  // Verifique permissões para diferentes recursos do CMS
  const canManageBanners = hasPermission("CMS", "MANAGE_BANNER");
  const canManageSliders = hasPermission("CMS", "MANAGE_SLIDER");
  const canManageSiteInfo = hasPermission("CMS", "MANAGE_SITE_INFO");
  const canManageSmtp = hasPermission("CMS", "MANAGE_SMTP");

  // Crie instâncias dos hooks específicos
  const bannersHook = useBanners();
  const slidersHook = useSliders();
  const superAdminHook = useSuperAdmin();

  // Retorne um objeto combinado com todos os hooks e verificações de permissão
  return {
    // Acesso aos hooks específicos
    banners: bannersHook,
    sliders: slidersHook,
    superAdmin: superAdminHook,

    // Verificações de permissão
    permissions: {
      canManageBanners,
      canManageSliders,
      canManageSiteInfo,
      canManageSmtp,
    },
  };
}
