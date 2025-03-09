import { NextResponse, NextRequest } from "next/server";
import { verifyToken } from "@/services/auth/auth";

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const pathname = req.nextUrl.pathname;

  // Rotas públicas que não requerem autenticação
  const publicRoutes = [
    "/",
    "/login",
    "/signup",
    "/vagas",
    "/blog",
    "/contato",
    "/sobre",
    "/recrutamento-selecao",
    "/treinamento-in-company",
    "/contato/politica-privacidade",
  ];

  // Se não houver token e a rota não for pública, redireciona para /login
  if (!token && !publicRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Se houver token, valida sua autenticidade
  if (token) {
    try {
      await verifyToken(token); // Verifica o JWT
    } catch {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

// Configuração do matcher para aplicar o middleware corretamente
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
