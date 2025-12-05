import LanguageSwitcher from '@/components/LanguageSwitcher';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';
import { getTranslation } from '@/i18n/server';
import { Github } from 'lucide-react';
import Link from 'next/link';
const navLinks = [
    {
        key: 'nav-explore',
        id: '#explore',
    },
    {
        key: 'nav-features',
        id: '#features',
    },
    {
        key: 'nav-plans',
        id: '#plans',
    },
    {
        key: 'nav-faqs',
        id: '#faqs',
    },
    {
        key: 'nav-contact-us',
        id: '#contact-us',
    },
];

const OnBoardingNavbar = async ({ lng }: { lng: string }) => {
    const { t } = await getTranslation(lng, 'common');
    return (
        <nav className="sticky top-6 z-50 mx-auto w-full rounded-[20px] border border-gray-300 bg-white shadow-md backdrop-blur-2xl dark:border-gray-900 dark:bg-neutral-950">
            <div className="container mx-auto flex items-center justify-between px-12 py-3 sm:py-4">
                <div className="flex w-full max-w-lg items-center justify-between">
                    <Link href={'/'} className="flex items-center gap-2">
                        <Github />
                        <p className="text-xl font-bold text-green-800">
                            {' '}
                            {t('name')}
                        </p>
                    </Link>
                    <div className="flex items-center justify-center gap-4">
                        {navLinks.map(({ id, key }) => (
                            <button type="button" key={id} id={id}>
                                {t(key)}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <div className="flex items-center justify-between gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            className="border-green-200 hover:bg-green-50"
                        >
                            {t('login')}
                        </Button>
                        <Button
                            size="sm"
                            variant={null}
                            className="bg-green-800 text-white hover:bg-green-900"
                        >
                            {t('sign-up')}
                        </Button>
                    </div>
                    <div className="h-8 w-0.5 rounded-full bg-gray-300 dark:bg-gray-600" />
                    <div className="flex items-center justify-between gap-2">
                        <ThemeToggle />
                        <LanguageSwitcher currentLang={lng} />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default OnBoardingNavbar;
