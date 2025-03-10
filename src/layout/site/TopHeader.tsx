import React from 'react';
import Link from 'next/link';
import { Instagram, Facebook, Linkedin, Youtube, Twitter } from 'lucide-react';
import { cn } from '@/lib/utils';
import { socialMediaLinks, topHeaderLinks, SocialMediaLink, SiteLink } from '@/constants/site-data';

type TopHeaderProps = {
  className?: string;
  links?: SiteLink[];
  socials?: SocialMediaLink[];
};

/**
 * TopHeader component displaying links on the left and social media icons on the right
 * Uses centralized data from constants/site-data.ts that can be managed via CMS
 */
const TopHeader = ({
  className,
  links = topHeaderLinks,
  socials = socialMediaLinks,
}: TopHeaderProps) => {
  // Filtrar apenas links ativos
  const activeLinks = links.filter((link) => link.isActive);
  const activeSocials = socials.filter((social) => social.isActive);

  // Função auxiliar para renderizar o ícone correto baseado no nome
  const renderSocialIcon = (iconName: string, size = 16) => {
    switch (iconName) {
      case 'Instagram':
        return <Instagram size={size} />;
      case 'Facebook':
        return <Facebook size={size} />;
      case 'Linkedin':
        return <Linkedin size={size} />;
      case 'Youtube':
        return <Youtube size={size} />;
      case 'Twitter':
        return <Twitter size={size} />;
      default:
        return <span className="w-4 h-4 block" />;
    }
  };

  return (
    <div className={cn('w-full bg-primary-800 text-white', className)}>
      <div className="container mx-auto px-4">
        <div className="flex h-10 items-center justify-between text-xs sm:text-sm">
          {/* Left side links */}
          <div className="flex items-center space-x-4 sm:space-x-6">
            {activeLinks.map((link, index) => (
              <React.Fragment key={link.id}>
                {index > 0 && <span className="text-primary-300/60">|</span>}
                <Link
                  href={link.href}
                  className="transition-colors hover:text-primary-200"
                  {...(link.isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  {link.label}
                </Link>
              </React.Fragment>
            ))}
          </div>

          {/* Right side social media icons */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {activeSocials.map((social) => (
              <Link
                key={social.id}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-opacity hover:opacity-80"
                aria-label={social.platform}
              >
                {renderSocialIcon(social.icon)}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
