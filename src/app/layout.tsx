import { Providers } from '@/providers';
import TopHeader from '@/layout/site/TopHeader';
import '@/styles/globals.css';

export const metadata = {
  title: 'Advancemais - Sistema Integrado',
  description: 'Plataforma para gerenciamento de cursos, vagas e recrutamento',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        {/* Precarregamento da fonte para melhorar a performance de carregamento */}
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=SF+Pro+Display:wght@300;400;500;600;700&display=swap"
          as="style"
        />
      </head>
      <body className="min-h-screen bg-background antialiased">
        <Providers>
          <TopHeader />
          {children}
        </Providers>
      </body>
    </html>
  );
}
