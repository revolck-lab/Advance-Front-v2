'use client';

import React from 'react';
import Link from 'next/link';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';

const menuLinks = [
  { title: 'Página inicial', href: '/' },
  { title: 'Sobre', href: '/sobre' },
  { title: 'Cursos', href: '/cursos' },
  {
    title: 'Soluções',
    href: '#',
    dropdown: [
      {
        title: 'Recrutamento & Seleção',
        href: '/recrutamento-selecao',
        description: 'Encontre os melhores talentos para sua empresa',
      },
      {
        title: 'Treinamento in company',
        href: '/treinamento-in-company',
        description: 'Capacitação personalizada para sua equipe',
      },
    ],
  },
  { title: 'Vagas', href: '/vagas' },
  { title: 'Blog', href: '/blog' },
  { title: 'Contato', href: '/contato' },
];

const Navigation = ({ className }: { className?: string }) => {
  return (
    <NavigationMenu className={cn('z-10', className)}>
      <NavigationMenuList className="gap-1">
        {menuLinks.map((link) => (
          <NavigationMenuItem key={link.title}>
            {link.dropdown ? (
              <>
                <NavigationMenuTrigger className="bg-transparent hover:bg-gray-100 data-[state=open]:bg-gray-100 h-9 px-4">
                  {link.title}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[280px] gap-3 p-4">
                    {link.dropdown.map((item) => (
                      <li key={item.title}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={item.href}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-100"
                          >
                            <div className="text-sm font-medium leading-none">{item.title}</div>
                            {item.description && (
                              <p className="line-clamp-2 mt-2 text-xs leading-snug text-gray-500">
                                {item.description}
                              </p>
                            )}
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </>
            ) : (
              <Link href={link.href} legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(
                    'bg-transparent px-4 py-2 hover:bg-gray-100 inline-flex h-9 items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:bg-gray-100 disabled:pointer-events-none disabled:opacity-50',
                  )}
                >
                  {link.title}
                </NavigationMenuLink>
              </Link>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default Navigation;
