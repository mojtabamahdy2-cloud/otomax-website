'use client';
import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

import {
  SiGoogle,
  SiTiktok,
  SiFacebook,
  SiInstagram,
  SiGmail,
  SiX,
} from 'react-icons/si';

const brands = [
  { id: 'gmail', name: 'Email', Icon: SiGmail, url: 'mailto:info@otomax.com' },
  { id: 'Tiktok', name: 'Tiktok', Icon: SiTiktok, url: 'https://vm.tiktok.com/ZN9NbUCed6HLv-uXPYT/' },
  { id: 'facebook', name: 'Facebook', Icon: SiFacebook, url: 'https://www.facebook.com/profile.php?id=61588871773905' },
  { id: 'Instagram', name: 'Instagram', Icon: SiInstagram, url: 'https://www.instagram.com/otomaxtech?igsh=MXV0OHRxN3BmMW12eA==' },
  { id: 'LinkedIn', name: 'LinkedIn', Icon: FaLinkedin, url: 'https://www.linkedin.com/in/otomax-tech-626707405' },
  { id: 'X', name: 'X', Icon: SiX, url: 'https://X.com' },
];

import { useTranslations } from "next-intl";

export default function HoverBrandLogo() {
  const t = useTranslations("Social");
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const activeBrand = brands.find(b => b.id === hoveredId);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-8 lg:gap-16 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Left: text */}
      <div className="flex-shrink-0 w-full sm:w-auto text-center sm:text-start">
        <p className="text-sm sm:text-base text-muted-foreground font-medium mb-0 tracking-tight">
          {t("findUs")}
        </p>
        <div className="relative">
          <p
            aria-hidden
            className="text-3xl lg:text-3xl font-bold tracking-tight whitespace-nowrap opacity-0 pointer-events-none select-none leading-none sm:leading-tight"
          >
            {t("socialMedia")}
          </p>
          <div className="absolute inset-0 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.p
                key={hoveredId ?? 'default'}
                initial={{ y: 16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -16, opacity: 0 }}
                transition={{ duration: 0.16, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground leading-none sm:leading-tight tracking-tight whitespace-nowrap"
              >
                {activeBrand?.name ?? t("socialMedia")}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Right: icon grid */}
      <div className="grid grid-cols-4 sm:flex sm:flex-wrap items-center justify-center sm:justify-end gap-1.5 sm:gap-2 w-full sm:w-auto md:mt-6 sm:mt-0">
        {brands.map(({ id, name, Icon, url }) => {
          const isActive = hoveredId === id;
          const isDimmed = hoveredId !== null && !isActive;
          return (
            <a
              key={id}
              href={url}
              target={url.startsWith('mailto:') ? undefined : "_blank"}
              rel="noopener noreferrer"
              aria-label={name}
              className={[
                'flex items-center justify-center p-2.5 sm:p-3 lg:p-3.5 rounded-lg border transition-all duration-200',
                isActive
                  ? 'border-foreground/30 text-foreground bg-foreground/5'
                  : 'border-transparent text-foreground/30 hover:text-foreground/50',
                isDimmed ? 'opacity-40 ' : '',
              ].join(' ')}
              onMouseEnter={() => setHoveredId(id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <Icon className="w-8 h-8 sm:w-6 sm:h-6" />
            </a>
          );
        })}
      </div>
    </div>
  );
}
