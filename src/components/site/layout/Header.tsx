'use client';

import React from 'react';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import Navigation from './Navigation';

const menuItems = [
  { title: 'Página inicial', href: '/' },
  { title: 'Sobre', href: '/sobre' },
  { title: 'Cursos', href: '/cursos' },
  {
    title: 'Soluções',
    href: '#',
    children: [
      { title: 'Recrutamento & Seleção', href: '/recrutamento-selecao' },
      { title: 'Treinamento in company', href: '/treinamento-in-company' },
    ],
  },
  { title: 'Vagas', href: '/vagas' },
  { title: 'Blog', href: '/blog' },
  { title: 'Contato', href: '/contato' },
];

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex shrink-0 items-center">
            <Link href="/" className="flex items-center">
              <div className="relative mr-2">
                <div className="h-6 w-6 bg-primary transform rotate-45"></div>
              </div>
              <span className="font-bold text-xl text-primary">Advancemais</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden flex-1 justify-center px-4 md:flex">
            <Navigation />
          </div>

          {/* Auth Buttons */}
          <div className="hidden shrink-0 items-center space-x-3 md:flex">
            <Link href="/login">
              <Button
                variant="ghost"
                className="font-medium text-primary hover:text-primary-dark hover:bg-primary-50"
              >
                Entrar
              </Button>
            </Link>
            <Link href="/registro">
              <Button className="bg-primary text-white hover:bg-primary-dark">Matricule-se</Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu />
                <span className="sr-only">Abrir menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex flex-col">
              <nav className="flex flex-col gap-4 mt-8">
                {menuItems.map((item) => (
                  <React.Fragment key={item.title}>
                    {item.children ? (
                      <>
                        <h3 className="font-medium">{item.title}</h3>
                        <div className="flex flex-col gap-2 ml-4">
                          {item.children.map((child) => (
                            <Link
                              key={child.title}
                              href={child.href}
                              className="text-gray-600 hover:text-primary transition-colors py-1"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {child.title}
                            </Link>
                          ))}
                        </div>
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        className="text-gray-700 hover:text-primary transition-colors py-2"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.title}
                      </Link>
                    )}
                  </React.Fragment>
                ))}
              </nav>

              <div className="flex flex-col gap-2 mt-8">
                <Link href="/login">
                  <Button
                    variant="outline"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full"
                  >
                    Entrar
                  </Button>
                </Link>
                <Link href="/registro">
                  <Button onClick={() => setMobileMenuOpen(false)} className="w-full">
                    Matricule-se
                  </Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
