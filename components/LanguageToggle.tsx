'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

export function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const toggleLocale = () => {
    const nextLocale = locale === 'en' ? 'ar' : 'en';
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <Button
      variant="outline"
      onClick={toggleLocale}
      className="rounded-full bg-white border-neutral-200 text-neutral-900 hover:bg-neutral-100 transition-colors flex items-center gap-2 px-4"
      title={locale === 'en' ? "Switch to Arabic" : "التبديل إلى الإنجليزية"}
    >
      <Globe className="w-4 h-4" />
      <span className="font-bold text-sm">
        {locale === 'en' ? 'العربية' : 'English'}
      </span>
    </Button>
  );
}
