"use client";

import { useLoading } from "@/hooks/useLoading"; // Ajuste o caminho conforme sua estrutura
import { Loading } from "@/components/loadings/loading"; // Componente de carregamento
import { SSRWrapper } from "@/components/SSRWrapper"; // Wrapper para SSR, se necessário

export default function Layout({ children }: { children: React.ReactNode }) {
  const loading = useLoading();

  return (
    <html lang="pt">
      <body>
        <SSRWrapper>
          {loading && <Loading />}
          {children}
        </SSRWrapper>
      </body>
    </html>
  );
}
