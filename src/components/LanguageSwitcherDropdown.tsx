'use client';

import { useTranslation } from 'react-i18next';
import { Check, Globe } from 'lucide-react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useEffect, useState } from 'react';

const languages = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
];

export function LanguageSwitcherDropdown() {
    const { i18n } = useTranslation();
    const [currentLang, setCurrentLang] = useState('en');

    useEffect(() => {
        setCurrentLang(i18n.language);
    }, [i18n.language]);

    const handleLanguageChange = (langCode: string) => {
        i18n.changeLanguage(langCode);
        setCurrentLang(langCode);

        // Update document direction for RTL support
        document.documentElement.dir = langCode === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = langCode;
    };

    return (
        <Select value={currentLang} onValueChange={handleLanguageChange}>
            <SelectTrigger className="w-[140px]">
                <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    <SelectValue />
                </div>
            </SelectTrigger>
            <SelectContent>
                {languages.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                        <div className="flex items-center justify-between gap-2">
                            <span>{lang.nativeName}</span>
                            {currentLang === lang.code && <Check className="h-4 w-4" />}
                        </div>
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
