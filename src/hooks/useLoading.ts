"use client"; // Necessário porque este é um hook do lado do cliente

import { useState, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export function useLoading() {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname(); // Pega o caminho atual da URL
  const searchParams = useSearchParams(); // Pega os parâmetros de busca da URL

  useEffect(() => {
    setLoading(true); // Inicia o estado de carregamento
    const timer = setTimeout(() => setLoading(false), 500); // Simula o fim do carregamento após 500ms

    return () => clearTimeout(timer); // Limpa o timer ao desmontar ou mudar a rota
  }, [pathname, searchParams]); // Executa o efeito quando o caminho ou parâmetros mudam

  return loading;
}
