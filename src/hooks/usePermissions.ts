import { useMemo } from "react";
import { useAuthStore } from "@/store/auth-store";
import { permissionsService } from "@/services/permissions/permissions";
import { RoleLevel } from "@/types/roles";
import { ROLE_NAMES } from "@/constants/permissions";

/**
 * Hook personalizado para verificação de permissões na UI
 * Fornece funções de verificação de permissão com base no usuário atual
 */
export function usePermissions() {
  const { user } = useAuthStore();
  const userRoleLevel = user?.role_id as RoleLevel | undefined;

  // Memo para evitar recálculos desnecessários
  const accessibleResources = useMemo(() => {
    if (!userRoleLevel) return {};
    return permissionsService.getAccessibleResources(userRoleLevel);
  }, [userRoleLevel]);

  // Verificação de permissão para uma ação em um recurso
  const hasPermission = (
    resource: keyof typeof permissionsService.accessibleResources,
    action: string,
  ): boolean => {
    if (!userRoleLevel) return false;
    return permissionsService.hasPermission(userRoleLevel, resource, action);
  };

  // Verifica se o usuário pode acessar uma seção do dashboard
  const canAccessSection = (sectionLevel: RoleLevel): boolean => {
    if (!userRoleLevel) return false;
    return permissionsService.canAccessLevel(userRoleLevel, sectionLevel);
  };

  // Nome legível do papel do usuário
  const userRoleName = userRoleLevel ? ROLE_NAMES[userRoleLevel] : "";

  // Lista de recursos que o usuário pode acessar
  const userAccessibleResources = Object.keys(accessibleResources);

  return {
    userRoleLevel,
    userRoleName,
    hasPermission,
    canAccessSection,
    accessibleResources,
    userAccessibleResources,
    isAdmin:
      userRoleLevel === RoleLevel.ADMIN ||
      userRoleLevel === RoleLevel.SUPER_ADMIN,
    isSuperAdmin: userRoleLevel === RoleLevel.SUPER_ADMIN,
  };
}
