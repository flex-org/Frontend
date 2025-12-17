'use client';
import { usePathname, useRouter } from 'next/navigation';
import { ChevronDown, Globe } from 'lucide-react';
import { Button } from './ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTranslation } from '@/i18n/client';
import { memo, useCallback, useMemo } from 'react';

const LanguageSwitcher = ({ currentLang }: { currentLang: string }) => {
    const { t } = useTranslation(currentLang, 'common');
    const router = useRouter();
    const pathname = usePathname();
    const toggle = useCallback(
        (lang: string) => {
            const newLang = lang === 'en' ? 'ar' : 'en';
            const segments = pathname.split('/');
            segments[1] = newLang;
            const newPath = segments.join('/');
            router.push(newPath);
        },
        [pathname, router],
    );
    const displayName = useMemo(() => {
        return currentLang === 'en' ? 'English' : 'العربية';
    }, [currentLang]);

    return (
        <DropdownMenu dir={currentLang === 'en' ? 'ltr' : 'rtl'}>
            <DropdownMenuTrigger asChild>
                <Button size={'sm'} type="button" variant={'outline'}>
                    <Globe className="h-4 w-4" />
                    <span className="hidden lg:inline">{displayName}</span>
                    <span className="inline lg:hidden">
                        {currentLang === 'en' ? 'English' : 'العربية'}
                    </span>
                    <ChevronDown />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>{t('pick-lang')}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => toggle('en')}>
                    العربية
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => toggle('ar')}>
                    English
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
export default memo(LanguageSwitcher);
