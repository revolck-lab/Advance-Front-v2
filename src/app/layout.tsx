import { Providers } from "@/providers";
import { Inter } from "next/font/google";
import "./globals.css"; // Altere para o caminho correto

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Advancemais - Sistema Integrado",
  description: "Plataforma para gerenciamento de cursos, vagas e recrutamento",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
