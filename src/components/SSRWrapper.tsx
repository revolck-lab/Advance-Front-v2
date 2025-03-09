"use client";

import { SSRProvider } from "@react-aria/ssr";
import { HeroUIProvider } from "@heroui/react";
import React from "react";

export function SSRWrapper({ children }: { children: React.ReactNode }) {
  return (
    <SSRProvider>
      <HeroUIProvider>{children}</HeroUIProvider>
    </SSRProvider>
  );
}
