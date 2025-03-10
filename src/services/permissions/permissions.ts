import { RoleLevel } from "@/types/roles";
import { PERMISSIONS } from "@/constants/permissions";

// Definição de tipos para facilitar o uso do TypeScript
type PermissionAction = RoleLevel[];
type ResourcePermissions = Record<string, PermissionAction>;

/**
 * Serviço para verificação de permissões baseado em roles
 * Implementa lógica de verificação isolada do resto da aplicação
 */
export const permissionsService = {
  /**
   * Verifica se um role específico tem permissão para uma ação em um recurso
   */
  hasPermission(
    roleLevel: RoleLevel,
    resource: keyof typeof PERMISSIONS,
    action: string,
  ): boolean {
    if (!roleLevel || !resource || !action) {
      return false;
    }

    // Verifica se recurso existe nas permissões
    const resourcePermissions = PERMISSIONS[resource] as ResourcePermissions;
    if (!resourcePermissions) {
      return false;
    }

    // Verifica se ação existe para o recurso
    const actionPermissions = resourcePermissions[action];
    if (!actionPermissions) {
      return false;
    }

    // Verifica se o role está na lista de roles permitidos
    return actionPermissions.includes(roleLevel);
  },

  /**
   * Verifica se um usuário tem acesso a um determinado nível
   * Útil para controle de acesso em diferentes seções do dashboard
   */
  canAccessLevel(userLevel: RoleLevel, targetLevel: RoleLevel): boolean {
    // SUPER_ADMIN tem acesso a tudo
    if (userLevel === RoleLevel.SUPER_ADMIN) {
      return true;
    }

    // ADMIN tem acesso a níveis abaixo (exceto SUPER_ADMIN)
    if (userLevel === RoleLevel.ADMIN) {
      return targetLevel !== RoleLevel.SUPER_ADMIN;
    }

    // Casos especiais baseados na lógica de negócio
    switch (userLevel) {
      case RoleLevel.HR:
        // RH tem acesso a COMPANY e RECRUITER
        return [RoleLevel.COMPANY, RoleLevel.RECRUITER].includes(targetLevel);

      case RoleLevel.PEDAGOGICAL:
        // Pedagógico tem acesso a TEACHER e STUDENT
        return [RoleLevel.TEACHER, RoleLevel.STUDENT].includes(targetLevel);

      default:
        // Por padrão, um usuário só tem acesso ao seu próprio nível
        return userLevel === targetLevel;
    }
  },

  /**
   * Obtém todos os recursos que um usuário pode acessar
   * Útil para construir menus dinâmicos
   */
  getAccessibleResources(roleLevel: RoleLevel): Record<string, string[]> {
    const accessibleResources: Record<string, string[]> = {};

    // Percorre todos os recursos e ações
    Object.entries(PERMISSIONS).forEach(([resource, actions]) => {
      const accessibleActions: string[] = [];

      // Verifica cada ação no recurso
      Object.entries(actions as ResourcePermissions).forEach(
        ([action, allowedRoles]) => {
          if (allowedRoles.includes(roleLevel)) {
            accessibleActions.push(action);
          }
        },
      );

      // Adiciona ao resultado se houver ações permitidas
      if (accessibleActions.length > 0) {
        accessibleResources[resource] = accessibleActions;
      }
    });

    return accessibleResources;
  },
};
