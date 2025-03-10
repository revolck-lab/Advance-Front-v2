import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { APP_ROUTES } from "@/constants/routes";

/**
 * Middleware para proteção de rotas do dashboard
 * Executa automaticamente para todas as rotas dentro do grupo (dashboard)
 */
export function middleware(request: NextRequest) {
  // Verifica se existe token
  const token = request.cookies.get("auth-token")?.value;

  // Se não existir token, redireciona para login
  if (!token) {
    const url = new URL(APP_ROUTES.AUTH.LOGIN, request.url);
    url.searchParams.set("callbackUrl", request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  // Aqui poderíamos adicionar verificações de permissão por role
  // mas isso seria melhor feito no componente para preservar a UX

  return NextResponse.next();
}

// Define em quais rotas o middleware será executado
export const config = {
  matcher: "/dashboard/:path*",
};
