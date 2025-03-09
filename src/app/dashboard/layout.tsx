import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt">
      <body>
        <header>Header do Dashboard</header>
        {children}
        <footer>Footer do Dashboard</footer>
      </body>
    </html>
  );
}
