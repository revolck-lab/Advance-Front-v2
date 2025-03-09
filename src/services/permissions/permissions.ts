import { Role } from "@/types/roles";

export const hasPermission = (
  userRole: Role,
  requiredLevel: number
): boolean => {
  return userRole >= requiredLevel;
};

export const checkRoleAccess = (role: Role, allowedRoles: Role[]): boolean => {
  return allowedRoles.includes(role);
};
