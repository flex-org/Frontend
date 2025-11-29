'use client';

import { useEffect } from 'react';
import i18n from './config';

export function I18nProvider({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        // Initialize i18n
        const currentLang = i18n.language || 'en';
        document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = currentLang;
    }, []);

    return <>{children}</>;
}
