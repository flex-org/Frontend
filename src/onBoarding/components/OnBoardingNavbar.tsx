'use client';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { ThemeToggle } from '@/components/ThemeToggle';
import Link from 'next/link';
import { Github, LogIn } from 'lucide-react';
import { navLinks } from '../lib/constants';
import MobileMenu from './MobileMenu';
import { useTranslation } from '@/i18n/client';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';

const OnBoardingNavbar = ({
    lng,
    children,
}: {
    lng: string;
    children: ReactNode;
}) => {
    const pathname = usePathname();
    const { t } = useTranslation(lng, 'common');
    // const data = useSession();
    const { data } = useSession();
    const isAuthenticated = data?.user.isAuthenticated;
    if (
        pathname === `/${lng}/signin` ||
        pathname === `/${lng}/signup` ||
        pathname === `/${lng}/signup/verify`
    )
        return;
    return (
        <nav className="sticky top-6 z-50 mx-auto w-full rounded-[20px] border border-gray-300 bg-white shadow-md backdrop-blur-2xl dark:border-gray-900 dark:bg-neutral-950">
            <div className="container mx-auto flex items-center justify-between px-6 py-3 md:px-12 md:py-4">
                <div className="flex w-full max-w-lg items-center justify-between">
                    <Link href={`/${lng}/`} className="flex items-center gap-2">
                        <Github className="text-green-800 dark:text-green-300" />
                        <p className="text-xl font-bold text-green-800 dark:text-green-300">
                            {' '}
                            {t('name')}
                        </p>
                    </Link>
                    <div className="hidden items-center justify-center gap-4 lg:flex">
                        {navLinks.map(({ id, key }) => (
                            <button type="button" key={id} id={id}>
                                {t(key)}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    {children}
                    <div className="flex items-center gap-2 lg:hidden">
                        {!isAuthenticated && (
                            <div>
                                <Button
                                    size="sm"
                                    className="bg-green-800 text-white hover:bg-green-900 active:bg-green-950"
                                >
                                    <Link
                                        href={`${lng}/signin`}
                                        className="flex items-center justify-between gap-2"
                                    >
                                        {t('login')}
                                        <LogIn className="text-white" />
                                    </Link>
                                </Button>
                            </div>
                        )}
                        <MobileMenu lng={lng} />
                    </div>
                    <div className="hidden h-8 w-0.5 rounded-full bg-gray-300 lg:block dark:bg-gray-600" />
                    <div className="hidden items-center justify-between gap-2 lg:flex">
                        <ThemeToggle />
                        <LanguageSwitcher currentLang={lng} />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default OnBoardingNavbar;
