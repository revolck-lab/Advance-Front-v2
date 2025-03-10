import { HeroUIProvider } from '@heroui/react';
import { Toaster } from '@/components/ui/sonner';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <HeroUIProvider>
      <Toaster richColors position="top-right" />
      {children}
    </HeroUIProvider>
  );
}
