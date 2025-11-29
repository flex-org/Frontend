import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
// Import translations
import enCommon from './locales/en/common.json';
import arCommon from './locales/ar/common.json';
i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                common: enCommon,
            },
            ar: {
                common: arCommon,
            },
        },
        fallbackLng: 'en',
        defaultNS: 'common',
        interpolation: {
            escapeValue: false, // React already escapes
        },
    });
export default i18n;