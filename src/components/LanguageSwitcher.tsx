'use client';

import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';
import { useState, useEffect } from 'react';

export function LanguageSwitcher() {
    const { i18n } = useTranslation();
    const [currentLang, setCurrentLang] = useState('en');

    useEffect(() => {
        setCurrentLang(i18n.language);
    }, [i18n.language]);

    const toggleLanguage = () => {
        const newLang = currentLang === 'en' ? 'ar' : 'en';
        i18n.changeLanguage(newLang);
        setCurrentLang(newLang);

        // Update document direction for RTL
        document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = newLang;
    };

    return (
        <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-white/20"
            aria-label="Toggle language"
        >
            <Globe className="h-4 w-4" />
            <span className='text-black'>{currentLang === 'en' ? 'العربية' : 'English'}</span>
        </button>
    );
}
