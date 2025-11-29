'use client'

import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Home() {
  const { t } = useTranslation()
  return (
    <div className="space-y-4 p-8">
      {/* Language & Theme Switchers */}
      <div className="flex justify-end gap-4">
        <ThemeToggle />
        <LanguageSwitcher />
      </div>

      {/* Content with translations */}
      <div className="bg-sky-700 px-4 py-2 text-white hover:bg-sky-800 sm:px-8 sm:py-3 rounded-lg space-y-2">
        <p className="text-xl font-bold">عزّز أسلوبك في التدريس عبر منصة ذكية واحدة</p>
        <p>{t('welcome')}</p>
        <p>{t('dashboard')}</p>
        <p>{t('logout')}</p>
        <p>{t('settings')}</p>
      </div>
    </div>
  );
}