import { NextResponse, NextRequest } from "next/server";
import { verifyToken } from "@/services/auth/auth";
import { checkRoleAccess } from "@/services/permissions";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const pathname = req.nextUrl.pathname;

  // Sem token, redireciona para login
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    const decoded = await verifyToken(token);
    const userRole = decoded.role_id;
    const requiredRoles = getRequiredRoles(pathname);

    // Verifica se o usuário tem permissão para a rota
    if (!checkRoleAccess(userRole, requiredRoles)) {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }
  } catch {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

// Função auxiliar para mapear roles por rota
function getRequiredRoles(pathname: string): number[] {
  const roleMap: { [key: string]: number[] } = {
    "/dashboard/professor": [1], // Professores
    "/dashboard/aluno": [2], // Alunos/Candidatos
    "/dashboard/empresa": [3], // Empresas
    "/dashboard/administrador": [4], // Administradores
    "/dashboard/recrutador": [5], // Recrutadores
    "/dashboard/pedagogico": [6], // Setor Pedagógico
    "/dashboard/rh": [7], // Recursos Humanos
    "/dashboard/super-admin": [8], // Super Administradores
  };

  for (const [path, roles] of Object.entries(roleMap)) {
    if (pathname.startsWith(path)) {
      return roles;
    }
  }
  return []; // Bloqueia por padrão se não houver correspondência
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
